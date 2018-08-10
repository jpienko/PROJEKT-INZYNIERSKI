import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DaybookPage } from './daybook';

@NgModule({
  declarations: [
    DaybookPage,
  ],
  imports: [
    IonicPageModule.forChild(DaybookPage),
  ],
})
export class DaybookPageModule {}
