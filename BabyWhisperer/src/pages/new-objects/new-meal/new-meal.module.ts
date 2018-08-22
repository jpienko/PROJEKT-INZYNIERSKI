import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewMealPage } from './new-meal';

@NgModule({
  declarations: [
    NewMealPage,
  ],
  imports: [
    IonicPageModule.forChild(NewMealPage),
  ],
})
export class NewMealPageModule {}
