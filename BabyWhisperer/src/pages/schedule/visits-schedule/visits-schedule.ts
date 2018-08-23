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
  visits1: any[] = [];

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
    
    this.database.GetAllVisits().then((result: any[]) => {
      this.visits1 = result;
      this.visits =[];      
      this.visits1.forEach(element => {
        if( new Date(element.startTime).getDate().toString() == this.selectedDay.getDate().toString()&&new Date(element.startTime).getMonth().toString() == this.selectedDay.getMonth().toString()){
          this.visits.push(element);
        }
      });
      console.log(this.visits);
    }); 

  }
  
  public getHour(date:string){
    let hour = new Date(date).getHours().toString();
    let minutes = new Date(date).getMinutes().toString();
    if (minutes.length<2){
      var hours = hour + ":0" +minutes
    }else{
      var hours = hour + ":" +minutes
    }
    return hours;
  }

  prevMonth() {
    this.calendar.currentDate = new Date(this.calendar.currentDate.setMonth(this.calendar.currentDate.getMonth() - 1));
  }

  nextMonth() {
    this.calendar.currentDate = new Date(this.calendar.currentDate.setMonth(this.calendar.currentDate.getMonth() + 1));
  }
}
