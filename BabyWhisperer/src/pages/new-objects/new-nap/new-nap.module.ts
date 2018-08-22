import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewNapPage } from './new-nap';

@NgModule({
  declarations: [
    NewNapPage,
  ],
  imports: [
    IonicPageModule.forChild(NewNapPage),
  ],
})
export class NewNapPageModule {}
