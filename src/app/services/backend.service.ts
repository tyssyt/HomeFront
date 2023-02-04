import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TwitchStream } from 'src/app/model/twitchStream';
import { Download, Downloads } from '../model/download';
import { ChannelPreview } from '../model/channelPreview';
import { Video } from '../model/video';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(
    private client:HttpClient
  ) { }

  getTwitchStreams(channel: string): Observable<TwitchStream[]> {
    return this.client.get('http://back.home/twitch/live/' + channel.toLowerCase()) as Observable<TwitchStream[]>;
  }

  getVideo(): Observable<Video> {
    return this.client.get('http://back.home/videoplayer') as Observable<Video>;
  }

  startVideo(video: Video): Observable<Video>  {
    return this.client.put('http://back.home/videoplayer', video, httpOptions) as Observable<Video>;
  }

  stopStream(): Observable<Object>  {
    return this.client.delete('http://back.home/videoplayer');
  }

  getChat(): Observable<string> {
    return this.client.get('http://back.home/chat') as Observable<string>;
  }

  openChat(stream: string): Observable<string>  {
    return this.client.put('http://back.home/chat', stream, httpOptions) as Observable<string>;
  }

  closeChat(): Observable<Object>  {
    return this.client.delete('http://back.home/chat');
  }

  getAllScannables(): Observable<string[]> {
    return this.client.get('http://back.home/download/scan') as Observable<string[]>;
  }

  getScannable(scannable: string): Observable<string[]> {
    return this.client.get('http://back.home/download/scan/' + scannable) as Observable<string[]>;
  }

  getAllDownloads(): Observable<Downloads> {
    return this.client.get('http://back.home/download') as Observable<Downloads>;
  }

  startDownload(url: string, path: string, query?: string): Observable<Download> {
    var body;
    if (query) {
      body = {"url": url, "path": path, "query": query}
    } else {
      body = {"url": url, "path": path}
    }
    return this.client.post('http://back.home/download', body) as Observable<Download>;
  }

  cancelDownload(uuid: string): Observable<Object> {
    return this.client.delete('http://back.home/download/' + uuid);
  }

  getTvChannels(): Observable<string[]> {
    return this.client.get('http://back.home/dvbc/tv') as Observable<string[]>;
  }

  getChannelPreviews(channels: string[]): Observable<ChannelPreview[]> {
    return this.client.post('http://back.home/dvbc/tv/previews', channels) as Observable<ChannelPreview[]>;
  }

}
