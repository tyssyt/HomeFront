import { Injectable } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { Video } from '../model/video';
import { BackendService } from './backend.service';


@Injectable({
  providedIn: 'root'
})
export class PiPlayer {
  refresher!: Subscription;
  nowPlaying: Video | undefined;
  chat: string | undefined;

  constructor(
    private backendService: BackendService
  ) {
    this.updateStatus();
    this.refresher = interval(5000).subscribe(() => this.updateStatus());
  }

  updateStatus() {
    this.backendService.getVideo().subscribe( stream => this.nowPlaying = stream);
    this.backendService.getChat().subscribe( chat => this.chat = chat);
  }

  public isPlaying(): boolean {
    return this.nowPlaying != undefined;
  }

  public getPlaying(): Video | undefined {
    return this.nowPlaying;
  }

  public start(video: Video) {
    this.backendService.startVideo(video).subscribe();
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
