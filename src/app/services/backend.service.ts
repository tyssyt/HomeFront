import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TwitchStream } from 'src/app/model/twitchStream';
import { Download } from '../model/download';

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

  getStream(): Observable<string> {
    return this.client.get('http://back.home/stream') as Observable<string>;
  }

  startStream(stream: string): Observable<string>  {
    return this.client.put('http://back.home/stream', stream, httpOptions) as Observable<string>;
  }

  stopStream(): Observable<Object>  {
    return this.client.delete('http://back.home/stream');
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

  getAllDownloads(): Observable<Download[]> {
    return this.client.get('http://back.home/download') as Observable<Download[]>;
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

}
