import { Component, OnInit } from '@angular/core';
import { PiPlayer } from 'src/app/services/piPlayer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public piPlayer: PiPlayer
  ) { }

  ngOnInit(): void {
  }

}
