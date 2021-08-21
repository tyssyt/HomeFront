import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StreamsPage } from './pages/streams/streams.page';

const routes: Routes = [
  { path: 'streams', component: StreamsPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
