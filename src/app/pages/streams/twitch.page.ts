import { Component, OnInit, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { interval, Subscription } from 'rxjs';
import { TwitchStream } from 'src/app/model/twitchStream';
import { BackendService } from 'src/app/services/backend.service';
import { PiPlayer } from 'src/app/services/piPlayer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TwitchLogin } from 'src/app/model/twitchLogin';

@Component({
  selector: 'page-twitch',
  templateUrl: './twitch.page.html',
  styleUrls: ['./twitch.page.scss']
})
export class TwitchPage implements OnInit, OnDestroy {

  login: TwitchLogin | undefined;
  loginRetrier: Subscription  | undefined;

  refresher: Subscription | undefined;
  twitchStreams: TwitchStream[] = [];
  filteredStreams: TwitchStream[] = [];
  twitchStreamsMap: Map<string, number> = new Map();

  filteredGames: string[] = [];

  constructor(
    private piPlayer: PiPlayer,
    private backend: BackendService,
    private cookies: CookieService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    let loginId = this.cookies.get("twitchLogin");
    if (loginId != undefined) {
      this.updateLogin(loginId);
      this.loginRetrier = interval(1000).subscribe(() => this.updateLogin(loginId));
    } else {
      this.startNewLogin();
    }
  }

  ngOnDestroy(): void {
    if (this.refresher != undefined) {
      this.refresher.unsubscribe();
      this.refresher = undefined;
    }
    if (this.loginRetrier != undefined) {
      this.loginRetrier.unsubscribe();
      this.loginRetrier = undefined;
    }
    this.twitchStreams = [];
    this.twitchStreamsMap.clear();
    this.filteredStreams = [];
    this.filteredGames = [];
  }

  startNewLogin() {
    this.ngOnDestroy();

    this.backend.createTwitchLogin().subscribe(login => {
      this.cookies.put("twitchLogin", login.id);
      this.login = login;
      this.loginRetrier = interval(1000).subscribe(() => this.updateLogin(login.id));
    });
  }

  updateLogin(id: string) {
    this.backend.getTwitchLogin(id).subscribe(login => {
      this.login = login;
      if (login.logged_in) {
        this.loginRetrier?.unsubscribe();
        console.log("Log In Successful: " + id);
        this.onLoginSuccess();
      }
    }, error => {
      this.startNewLogin();
    })
  }


  onLoginSuccess() {
    if (this.refresher != undefined)
      this.refresher.unsubscribe();
    this.twitchStreams = [];
    this.twitchStreamsMap.clear();

    this.loadTwitchStreams();
    this.refresher = interval(20000).subscribe(() => this.loadTwitchStreams());
  }

  private loadTwitchStreams() {
    this.backend.getTwitchStreams(this.login!.id).subscribe(s => this.updateTwitchStreams(s));
  }

  private updateTwitchStreams(newStreams: TwitchStream[]) {
    newStreams.sort((one, two) => two.viewer_count - one.viewer_count);

    if (this.twitchStreams.length == 0) {
      for (let i=0; i<newStreams.length; i++)
        this.twitchStreamsMap.set(newStreams[i].id, i);
      this.twitchStreams = newStreams;
      this.updateFilteredStreams();
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
    this.updateFilteredStreams();
  }

  getThumbUrl(stream: TwitchStream): string {
    if (stream.viewer_count == 0) {
      return stream.offline_image_url;
    }
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

  addFilteredGame(game: string) {
    if (this.filteredGames.indexOf(game) < 0) {
      this.filteredGames.push(game);
    }
    this.updateFilteredStreams();
  }

  removeFilteredGame(game: string) {
    const index = this.filteredGames.indexOf(game);

    if (index >= 0) {
      this.filteredGames.splice(index, 1);
    }
    this.updateFilteredStreams();
  }

  updateFilteredStreams() {
    this.filteredStreams = this.twitchStreams.filter(s => this.filteredGames.indexOf(s.game_name) < 0);
  }

}
