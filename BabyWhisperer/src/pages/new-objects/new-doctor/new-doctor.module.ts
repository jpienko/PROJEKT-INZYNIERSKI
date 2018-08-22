import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDoctorPage } from './new-doctor';

@NgModule({
  declarations: [
    NewDoctorPage,
  ],
  imports: [
    IonicPageModule.forChild(NewDoctorPage),
  ],
})
export class NewDoctorPageModule {}
