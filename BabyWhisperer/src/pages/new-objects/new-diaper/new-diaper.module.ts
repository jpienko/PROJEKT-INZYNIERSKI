import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDiaperPage } from './new-diaper';

@NgModule({
  declarations: [
    NewDiaperPage,
  ],
  imports: [
    IonicPageModule.forChild(NewDiaperPage),
  ],
})
export class NewDiaperPageModule {}
