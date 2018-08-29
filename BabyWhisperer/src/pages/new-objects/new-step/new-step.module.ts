import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewStepPage } from './new-step';

@NgModule({
  declarations: [
    NewStepPage,
  ],
  imports: [
    IonicPageModule.forChild(NewStepPage),
  ],
})
export class NewStepPageModule {}
