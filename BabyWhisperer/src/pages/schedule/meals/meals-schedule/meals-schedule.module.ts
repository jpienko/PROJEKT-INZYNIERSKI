import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealsSchedulePage } from './meals-schedule';

@NgModule({
  declarations: [
    MealsSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(MealsSchedulePage),
  ],
})
export class MealsSchedulePageModule {}
