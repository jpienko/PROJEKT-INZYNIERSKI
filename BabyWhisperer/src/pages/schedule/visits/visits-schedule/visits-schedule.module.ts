import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitsSchedulePage } from './visits-schedule';

@NgModule({
  declarations: [
    VisitsSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(VisitsSchedulePage),
  ],
})
export class VisitsSchedulePageModule {}
