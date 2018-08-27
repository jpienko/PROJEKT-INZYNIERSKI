import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiaperStatsPage } from './diaper-stats';

@NgModule({
  declarations: [
    DiaperStatsPage,
  ],
  imports: [
    IonicPageModule.forChild(DiaperStatsPage),
  ],
})
export class DiaperStatsPageModule {}
