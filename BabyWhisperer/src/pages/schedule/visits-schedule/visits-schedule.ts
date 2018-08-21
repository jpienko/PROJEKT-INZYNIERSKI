import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {DoctorVisitsProvider,Visits} from '../../../providers/database/doctor-visits';


@IonicPage()
@Component({
  selector: 'page-visits-schedule',
  templateUrl: 'visits-schedule.html',
})
export class VisitsSchedulePage {
  eventSource=[];
  viewTitle: string;
  selectedDay = new Date();
  visits: any[] = [];

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'pl-PL'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private modalCtrl: ModalController,
              private database:DoctorVisitsProvider) {
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitsSchedulePage');
  } 

  ionViewDidEnter(){
    this.database.GetAllVisits().then((result: any[]) => {
      this.visits = result;
      console.log(this.visits);
    }); 
  }
  addEvent() {
    let modal = this.modalCtrl.create('NewVisitPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
        this.database.insert(eventData);
      }
    });
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
}
