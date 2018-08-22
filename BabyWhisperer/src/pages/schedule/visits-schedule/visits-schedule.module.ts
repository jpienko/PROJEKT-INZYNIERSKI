import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitsSchedulePage } from './visits-schedule';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [
    VisitsSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(VisitsSchedulePage),
    NgCalendarModule,
  ],
})
export class VisitsSchedulePageModule {}
