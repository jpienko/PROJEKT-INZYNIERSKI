import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-new-visit',
  templateUrl: 'new-visit.html',
})
export class NewVisitPage {
 
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false};
  minDate = new Date().toISOString();
 
  constructor(public navCtrl: NavController, private navParams: NavParams, 
              public viewCtrl: ViewController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewVisitPage');
  }
  cancel() {
    this.viewCtrl.dismiss();
  }
 
  save() {
    this.viewCtrl.dismiss(this.event);
  }

  

}
