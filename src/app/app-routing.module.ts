import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadsPage } from './pages/downloads/downloads.page';
import { StreamsPage } from './pages/streams/streams.page';
import { TvPage } from './pages/streams/tv.page';
import { TwitchPage } from './pages/streams/twitch.page';
import { WeatherPage } from './pages/weather/weather.page';

const routes: Routes = [
  {
    path: 'streams',
    component: StreamsPage,
    children: [
      {
        path: 'tv',
        component: TvPage
      },
      {
        path: 'twitch',
        component: TwitchPage
      },
      {
        path: '**',
        redirectTo: '/streams/tv'
      }
    ]
  },
  {
    path: 'downloads',
    component: DownloadsPage,
  },
  {
    path: 'weather',
    component: WeatherPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
