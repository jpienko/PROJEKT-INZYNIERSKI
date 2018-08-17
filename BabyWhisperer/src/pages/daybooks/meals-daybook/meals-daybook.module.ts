import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealsDaybookPage } from './meals-daybook';

@NgModule({
  declarations: [
    MealsDaybookPage,
  ],
  imports: [
    IonicPageModule.forChild(MealsDaybookPage),
  ],
})
export class MealsDaybookPageModule {}
