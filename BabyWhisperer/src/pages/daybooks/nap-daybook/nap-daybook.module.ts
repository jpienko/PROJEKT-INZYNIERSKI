import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NapDaybookPage } from './nap-daybook';

@NgModule({
  declarations: [
    NapDaybookPage,
  ],
  imports: [
    IonicPageModule.forChild(NapDaybookPage),
  ],
})
export class NapDaybookPageModule {}
