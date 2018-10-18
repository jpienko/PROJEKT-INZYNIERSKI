import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GrowingStepsPage } from './growing-steps';

@NgModule({
  declarations: [
    GrowingStepsPage,
  ],
  imports: [
    IonicPageModule.forChild(GrowingStepsPage),
  ],
})
export class GrowingStepsPageModule {}
