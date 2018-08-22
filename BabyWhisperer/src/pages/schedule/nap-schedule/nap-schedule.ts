import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DoctorVisitsProvider} from '../../../providers/database/doctor-visits'


@IonicPage()
@Component({
  selector: 'page-nap-schedule',
  templateUrl: 'nap-schedule.html',
})
export class NapSchedulePage {
 visits: any[] =[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public database:DoctorVisitsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NapSchedulePage');
  }
  ionViewDidEnter(){
    this.database.GetAllVisits().then((result: any[]) => {
      this.visits = result;
      console.log(this.visits);
    }); 
  }

}
