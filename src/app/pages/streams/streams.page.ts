import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { interval, Subscription } from 'rxjs';
import { TwitchStream } from 'src/app/model/twitchStream';
import { BackendService } from 'src/app/services/backend.service';
import { PiPlayer } from 'src/app/services/piPlayer';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.page.html',
  styleUrls: ['./streams.page.scss']
})
export class StreamsPage implements OnInit, OnDestroy {

  refresher: Subscription | undefined;
  userName: string | undefined;
  twitchStreams: TwitchStream[] = [];

  constructor(
    public piPlayer: PiPlayer,
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
    if (this.refresher != undefined)
      this.refresher.unsubscribe();
  }

  updateUsername(newName: string) {
    if (this.userName != undefined && newName.toLowerCase() == this.userName.toLowerCase())
      return;

    if (this.refresher != undefined)
      this.refresher.unsubscribe();
    this.twitchStreams = [];

    this.userName = newName;
    this.cookies.put("twitchUserName", newName);

    this.loadTwitchStreams();
    this.refresher = interval(20000).subscribe(() => this.loadTwitchStreams());
  }

  private loadTwitchStreams() {
    this.backend.getTwitchStreams(this.userName!).subscribe(streams => this.twitchStreams = streams.sort((one, two) => two.viewer_count - one.viewer_count));
  }

  getThumbUrl(stream: TwitchStream): string {
    return stream.thumbnail_url.replace("{width}", "480").replace("{height}", "270") + '?' + Math.floor(new Date().getTime() / 1000 / 60); //reload every minute
  }

  getUptime(stream: TwitchStream): string {
    let uptime_minutes = Math.floor( (new Date().getTime() - Date.parse(stream.started_at)) / 1000 / 60 );
    let uptime_hours = Math.floor( uptime_minutes / 60 );
    if (uptime_hours == 0)
      return uptime_minutes + "m";
    uptime_minutes = uptime_minutes-60*uptime_hours;
    return uptime_hours + "h " + uptime_minutes + "m";
  }

  startStream(stream: TwitchStream) {
    this.piPlayer.start('"https://twitch.tv/' + stream.user_login + '"');
    this.snackBar.open('Stream is starting, please wait (pre-roll Ads may be running)' , 'Ok', {duration: 2500, panelClass: ['snack-style']});
  }

}
