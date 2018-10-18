import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewChildPage } from './new-child';

@NgModule({
  declarations: [
    NewChildPage,
  ],
  imports: [
    IonicPageModule.forChild(NewChildPage),
  ],
})
export class NewChildPageModule {}
