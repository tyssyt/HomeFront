import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PiPlayer } from 'src/app/services/piPlayer';

@Component({
  selector: 'page-tv',
  templateUrl: './tv.page.html',
  styleUrls: ['./tv.page.scss']
})
export class TvPage implements OnInit {

  constructor(
    private piPlayer: PiPlayer,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  startStream(stream: string) {
    this.piPlayer.start(stream);
    this.snackBar.open('Stream is starting, please wait' , 'Ok', {duration: 2500, panelClass: ['snack-style']});
  }

}
