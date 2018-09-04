import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassedStepsPage } from './passed-steps';

@NgModule({
  declarations: [
    PassedStepsPage,
  ],
  imports: [
    IonicPageModule.forChild(PassedStepsPage),
  ],
})
export class PassedStepsPageModule {}
