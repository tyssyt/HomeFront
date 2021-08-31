import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { PiPlayer } from 'src/app/services/piPlayer';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

const pages = ['First', 'Second', 'Third'];

@Component({
  selector: 'page-streams',
  templateUrl: './streams.page.html',
  styleUrls: ['./streams.page.scss']
})
export class StreamsPage implements OnInit {
  route: string = '';

  constructor(
    private location: Location,
    private router: Router,
    public piPlayer: PiPlayer,
  ) { }

  ngOnInit(): void {
    this.route = this.location.path().substr(this.location.path().lastIndexOf('/')+1);
    this.router.events.subscribe(val => {
      this.route = this.location.path().substr(this.location.path().lastIndexOf('/')+1);
    });
  }

  showChatToggle(): boolean {
    let playing = this.piPlayer.getPlaying();
    return playing != undefined && playing.startsWith("twitch.tv/");
  }

  onChatToggle(event: MatSlideToggleChange) {
    if (event.checked) {
      let playing = this.piPlayer.getPlaying();
      if (playing != undefined) {
        this.piPlayer.openChat(playing.substr(10));
      }
    } else {
      this.piPlayer.closeChat();
    }
  }
}
