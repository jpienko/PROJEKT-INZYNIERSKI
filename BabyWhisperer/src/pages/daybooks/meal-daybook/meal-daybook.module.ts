import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealDaybookPage } from './meal-daybook';

@NgModule({
  declarations: [
    MealDaybookPage,
  ],
  imports: [
    IonicPageModule.forChild(MealDaybookPage),
  ],
})
export class MealDaybookPageModule {}
