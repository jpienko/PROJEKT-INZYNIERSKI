import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NapSchedulePage } from './nap-schedule';

@NgModule({
  declarations: [
    NapSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(NapSchedulePage),
  ],
})
export class NapSchedulePageModule {}
