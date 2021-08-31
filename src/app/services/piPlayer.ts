import { Injectable } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { BackendService } from './backend.service';


@Injectable({
  providedIn: 'root'
})
export class PiPlayer {
  refresher!: Subscription;
  nowPlaying: string | undefined;
  chat: string | undefined;

  constructor(
    private backendService: BackendService
  ) {
    this.updateStatus();
    this.refresher = interval(5000).subscribe(() => this.updateStatus());
  }

  updateStatus() {
    this.backendService.getStream().subscribe( stream => this.nowPlaying = stream);
    this.backendService.getChat().subscribe( chat => this.chat = chat);
  }

  public isPlaying(): boolean {
    return this.nowPlaying != undefined;
  }

  public getPlaying(): string | undefined {
    return this.nowPlaying;
  }

  public start(stream: string) {
    this.backendService.startStream('"' + stream + '"').subscribe();
  }

  public stop() {
    this.backendService.stopStream().subscribe();
    this.nowPlaying = undefined;
  }

  public hasChat(): boolean {
    return this.chat != undefined;
  }

  public getChat(): string | undefined {
    return this.chat;
  }

  public openChat(chat: string) {
    this.backendService.openChat('"' + chat + '"').subscribe();
  }

  public closeChat() {
    this.backendService.closeChat().subscribe();
    this.chat = undefined;
  }

}
