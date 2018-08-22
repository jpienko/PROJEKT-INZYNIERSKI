import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NapStatsPage } from './nap-stats';

@NgModule({
  declarations: [
    NapStatsPage,
  ],
  imports: [
    IonicPageModule.forChild(NapStatsPage),
  ],
})
export class NapStatsPageModule {}
