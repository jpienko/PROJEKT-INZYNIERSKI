import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database'
import { newDB } from '../../providers/database/new-database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public navCtrl: NavController, private ms:DatabaseProvider) {}
 
  ngOnInit(){
    if(newDB){
      this.ms.dropDB();
    }
    this.ms.createDatabase();
  
  }
  goToDaybook(){
    this.navCtrl.push('DaybookPage');
  }
  
  goToSchedules(){
    this.navCtrl.push('SchedulesPage');
  }

  goToStats(){
    this.navCtrl.push('StatsPage');
  }
  
  goToDocsList(){
    this.navCtrl.push('DocsListPage');
  }
}
