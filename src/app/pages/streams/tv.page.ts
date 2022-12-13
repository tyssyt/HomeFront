import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from 'src/app/services/backend.service';
import { PiPlayer } from 'src/app/services/piPlayer';
import { ChannelInfo, channelInfoMap } from 'src/app/model/channelInfo';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'page-tv',
  templateUrl: './tv.page.html',
  styleUrls: ['./tv.page.scss']
})
export class TvPage implements OnInit {

  channels: {names: string[], info: ChannelInfo}[] = [];
  refresher: Subscription | undefined;

  constructor(
    private piPlayer: PiPlayer,
    private backend: BackendService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.backend.getTvChannels().subscribe(channels => this.addChannels(channels));
  }

  ngOnDestroy(): void {
    this.channels = [];
    this.refresher?.unsubscribe()
  }

  addChannels(channelNames: string[]) {
    const channelMap: Map<ChannelInfo, string[]> = new Map();
    for (const channelName of channelNames) {
      // find the channel info
      let info = channelInfoMap.get(channelName);

      // if there is no info, create one
      if (!info) {
        info = new ChannelInfo(channelName, [], "", "", "", false);
      }
      if (info.hidden)
        continue;

      const names = channelMap.get(info);
      if (names) {
        names.push(channelName); // group names belonging to the same info
      } else {
        channelMap.set(info, [channelName]); // add new entry for new info
      }
    }

    // pack the map back into an array
    const channels = []
    for (const [info, names] of channelMap.entries()) {
      channels.push({names: names, info: info});
    }
    this.channels = channels;
    this.loadPreviews();
    this.refresher = interval(10000).subscribe(() => this.loadPreviews());
  }

  loadPreviews() {

    this.backend.getChannelPreviews(this.channels.map(channel => channel.names[0])).subscribe(previews => {
      if (this.channels.length != previews.length)
        return;

        for (const i in previews) {
          const { url, created } = previews[i];
          this.channels[i].info.preview = "http://back.home" + url + "?created=" + created;
        }
    });
  }

  openChannel(channel: string) {
    //this.piPlayer.start(channel);
    console.log("opening " + channel);
    this.backend.startVideo( { 'type': 'DvbC', "uri": channel } ).subscribe();
    this.snackBar.open("Stream is starting, please wait" , "Ok", {duration: 2500, panelClass: ['snack-style']});
  }

}
