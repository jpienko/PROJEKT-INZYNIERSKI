import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiaperDaybookPage } from './diaper-daybook';

@NgModule({
  declarations: [
    DiaperDaybookPage,
  ],
  imports: [
    IonicPageModule.forChild(DiaperDaybookPage),
  ],
})
export class DiaperDaybookPageModule {}
