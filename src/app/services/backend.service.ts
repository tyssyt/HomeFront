import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TwitchStream } from 'src/app/model/twitchStream';

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
}
