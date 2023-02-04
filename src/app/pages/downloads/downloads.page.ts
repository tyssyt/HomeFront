import { Component, OnDestroy, OnInit } from '@angular/core';
import { Downloadable, Scannable } from 'src/app/model/scannable';
import { BackendService } from 'src/app/services/backend.service';
import { Download } from 'src/app/model/download';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { interval, Subscription } from 'rxjs';

const pages = ['First', 'Second', 'Third'];

@Component({
  selector: 'page-downloads',
  templateUrl: './downloads.page.html',
  styleUrls: ['./downloads.page.scss']
})
export class DownloadsPage implements OnInit, OnDestroy {

  refresher: Subscription | undefined;
  scannables?: Scannable[];
  downloads?:  Download[];
  hasActiveDownload?: boolean;

  constructor(
    private backend: BackendService
  ) { }

  ngOnInit(): void {
    this.backend.getAllScannables().subscribe(scannables => this.scannables = scannables.map(name => new Scannable(name)));
    this.loadDownloads();
    this.refresher = interval(1000).subscribe(() => this.loadDownloads());
  }

  ngOnDestroy(): void {
    if (this.refresher != undefined) {
      this.refresher.unsubscribe();
      this.refresher = undefined;
    }
    this.hasActiveDownload = undefined;
  }

  loadDownloads() {
    this.backend.getAllDownloads().subscribe(downloads => {
      this.downloads = downloads.active_downloads.concat(downloads.queue);

      if (downloads.active_downloads.length == 0)
        this.setSlowRefresher();
      else
        this.setFastRefresher()
    });
  }

  setFastRefresher() {
    if (this.hasActiveDownload !== true) {
      this.refresher?.unsubscribe();
      this.refresher = interval(100).subscribe(() => this.loadDownloads());
      this.hasActiveDownload = true;
    }
  }
  setSlowRefresher() {
    if (this.hasActiveDownload !== false) {
      this.refresher?.unsubscribe();
      this.refresher = interval(10000).subscribe(() => this.loadDownloads());
      this.hasActiveDownload = false;
    }
  }

  openScannable(scannable: Scannable) {
    scannable.loadUrls(this.backend);
  }

  startAllDownloads(urls: Downloadable[], source: Scannable) {
    for (const url of urls)
      this.startDownload(url, source);
  }

  startDownload(url: Downloadable, source: Scannable) {
    let folder = source.name.substring(0, source.name.indexOf('.'));
    this.backend.startDownload(url.url, folder + "/" + url.name, "jtoken=d14a57a72d").subscribe(download => this.downloads?.push(download));
    this.setFastRefresher();
  }

  cancelDownload(download: Download) {
    this.backend.cancelDownload(download.uuid).subscribe();
  }



  getIcon(download: Download): string {
    switch (download.status) {
      case "Created":  return "pending"
      case "Running":  return "downloading"
      case "Cancelled": return "block"
      case "Error":    return "error"
    }
  }
  getIconColor(download: Download): string {
    switch (download.status) {
      case "Created":  return ""
      case "Running":  return "accent"
      case "Cancelled": return "warn"
      case "Error":    return "warn"
    }
  }
  getProgressBarMode(download: Download): ProgressBarMode {
    if (download.status == "Created")
      return "query"
    if (download.size == 0)
      return "indeterminate"
    return "determinate"
  }
  getProgressBarColor(download: Download): string {
    switch (download.status) {
      case "Created":  return "accent"
      case "Running":  return "accent"
      case "Cancelled": return "warn"
      case "Error":    return "warn"
    }
  }

  readableByteCount(bytes: number): string {
    let mb = bytes / 1048576; //MB
    let gb = mb / 1024;

    if (gb > 1)
      return gb.toLocaleString("en-US", {minimumFractionDigits: 3, maximumFractionDigits: 3}) + " GB"
    else
      return mb.toLocaleString("en-US", {minimumFractionDigits: 1, maximumFractionDigits: 1}) + " MB"
  }

  trackById(i: number, dl: Download): string {
    return dl.uuid;
  }

}
