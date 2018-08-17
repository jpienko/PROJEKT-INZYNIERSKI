import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MealsDatabaseProvider } from '../../providers/database/meals-database'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public navCtrl: NavController, private ms:MealsDatabaseProvider) {}
 
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
