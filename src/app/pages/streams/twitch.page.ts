import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { interval, Subscription } from 'rxjs';
import { TwitchStream } from 'src/app/model/twitchStream';
import { BackendService } from 'src/app/services/backend.service';
import { PiPlayer } from 'src/app/services/piPlayer';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'page-twitch',
  templateUrl: './twitch.page.html',
  styleUrls: ['./twitch.page.scss']
})
export class TwitchPage implements OnInit, OnDestroy {

  refresher: Subscription | undefined;
  userName: string | undefined;
  twitchStreams: TwitchStream[] = [];
  twitchStreamsMap: Map<string, number> = new Map();

  constructor(
    private piPlayer: PiPlayer,
    private backend: BackendService,
    private cookies: CookieService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    let newName = this.cookies.get("twitchUserName");
    if (newName != undefined)
      this.updateUsername(newName);
  }

  ngOnDestroy(): void {
    if (this.refresher != undefined) {
      this.refresher.unsubscribe();
      this.refresher = undefined;
    }
    this.twitchStreams = [];
    this.twitchStreamsMap.clear();
  }

  updateUsername(newName: string) {
    if (this.userName != undefined && newName.toLowerCase() == this.userName.toLowerCase())
      return;

    if (this.refresher != undefined)
      this.refresher.unsubscribe();
      this.twitchStreams = [];
      this.twitchStreamsMap.clear();

    this.userName = newName;
    this.cookies.put("twitchUserName", newName);

    this.loadTwitchStreams();
    this.refresher = interval(20000).subscribe(() => this.loadTwitchStreams());
  }

  private loadTwitchStreams() {
    this.backend.getTwitchStreams(this.userName!).subscribe(s => this.updateTwitchStreams(s));
  }

  private updateTwitchStreams(newStreams: TwitchStream[]) {
    newStreams.sort((one, two) => two.viewer_count - one.viewer_count);

    if (this.twitchStreams.length == 0) {
      for (let i=0; i<newStreams.length; i++)
        this.twitchStreamsMap.set(newStreams[i].id, i);
      this.twitchStreams = newStreams;
      return;
    }

    // set all viewer counts to 0
    for (const stream of this.twitchStreams) {
      stream.viewer_count = 0;
    }

    // update viewer counts for existing streams, add new streams add the end
    for (const stream of newStreams) {
      const i = this.twitchStreamsMap.get(stream.id);
      if (i === undefined) {
        const j = this.twitchStreams.push(stream);
        this.twitchStreamsMap.set(stream.id, j-1);
      } else {
        this.twitchStreams[i] = stream;
      }
    }
  }

  getThumbUrl(stream: TwitchStream): string {
    return stream.thumbnail_url.replace("{width}", "480").replace("{height}", "270") + '?' + this.getUptimeMin(stream); //reload every minute
  }

  getUptime(stream: TwitchStream): string {
    let uptime_minutes = this.getUptimeMin(stream);
    let uptime_hours = Math.floor( uptime_minutes / 60 );
    if (uptime_hours == 0)
      return uptime_minutes + "m";
    uptime_minutes = uptime_minutes-60*uptime_hours;
    return uptime_hours + "h " + uptime_minutes + "m";
  }

  getUptimeMin(stream: TwitchStream): number {
    return Math.floor( (new Date().getTime() - Date.parse(stream.started_at)) / 1000 / 60 );
  }

  startStream(stream: TwitchStream) {
    this.piPlayer.start( { 'type': 'Twitch', 'uri': 'twitch.tv/' + stream.user_login });
    this.snackBar.open('Stream is starting, please wait (pre-roll Ads may be running)' , 'Ok', {duration: 2500, panelClass: ['snack-style']});
  }

  trackById(i: number, stream: TwitchStream): string {
    return stream.id;
  }

}
