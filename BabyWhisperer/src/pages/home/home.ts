import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MealScheduleProvider} from '../../providers/database/meals-schedule'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public navCtrl: NavController, private ms:MealScheduleProvider) {}
 
  ngOnInit(){
    this.ms.createDatabase();
  }
  goToDaybook(){
    this.navCtrl.push('DaybookPage');
  }
  
  goToSchedules(){
    this.navCtrl.push('SchedulesPage');
  }
}
