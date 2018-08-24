import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuidebooksPage } from './guidebooks';

@NgModule({
  declarations: [
    GuidebooksPage,
  ],
  imports: [
    IonicPageModule.forChild(GuidebooksPage),
  ],
})
export class GuidebooksPageModule {}
