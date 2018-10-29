import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-schedules',
  templateUrl: 'schedules.html',
})
export class SchedulesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  goToMealsSchedule(){
    this.navCtrl.push('MealsSchedulePage');
  }
  
  goToVisitSchedule(){
    this.navCtrl.push('VisitsSchedulePage');
  }
  goToNapsSchedule(){
    this.navCtrl.push('NapSchedulePage');
  }
}
