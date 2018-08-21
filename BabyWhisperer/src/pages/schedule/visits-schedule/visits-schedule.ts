import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
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
  visit = new Visits;
  visits: any[] = [];

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'pl-PL'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private modalCtrl: ModalController, private alertCtrl: AlertController,
              private database:DoctorVisitsProvider) {
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitsSchedulePage');
  } 

  onViewDidEnter(){
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
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
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
