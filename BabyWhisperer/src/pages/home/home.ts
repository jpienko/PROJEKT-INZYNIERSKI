import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public navCtrl: NavController) {}
 
  goToDaybook(){
    this.navCtrl.push('DaybookPage');
  }
  
  goToSchedules(){
    this.navCtrl.push('SchedulesPage');
  }


}
