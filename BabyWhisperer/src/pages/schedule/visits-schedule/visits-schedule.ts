import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {DoctorVisitsProvider, Visits} from '../../../providers/database/doctor-visits';
import  localePl  from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';



@IonicPage()
@Component({
  selector: 'page-visits-schedule',
  templateUrl: 'visits-schedule.html',
})
export class VisitsSchedulePage {
  protected eventSource=[];
  protected viewTitle: string;
  protected selectedDay = new Date();
  protected visits: any[] = [];
  protected visits1: any[] = [];
  protected isToday:boolean;    

  protected calendar = {
    mode: 'month',
    currentDate: new Date(),
    queryMode: 'remote',
    locale: 'pl',
    dateFormater:{
      formatMonthViewDay: function(date:Date) {
        return date.getDate().toString();
      }
    }
  };
 
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private modalCtrl: ModalController, private database:DoctorVisitsProvider) {
              
    registerLocaleData(localePl);

  }
 
  ionViewDidEnter() { 
    this.database.GetAllVisits().then((result: any[]) => {
      this.visits1 = result;
      this.visits =[];      
      this.visits1.forEach(element => {
        if( new Date(element.startTime).getDate().toString() == this.selectedDay.getDate().toString()&&new Date(element.startTime).getMonth().toString() == this.selectedDay.getMonth().toString()){
          this.visits.push(element);
        }
      });
      this.eventSource = this.getEvents(this.visits1)
    }); 
   }

  protected addEvent() {
    let modal = this.modalCtrl.create('NewVisitPage', {selectedDay: this.selectedDay, isEdit:false});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
        this.database.insert(eventData).then(value=>
          this.ionViewDidEnter()
        );
      }
    });
  }
 
  protected onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  
  protected getHour(date:string){
    let hour = new Date(date).getHours().toString();
    let minutes = new Date(date).getMinutes().toString();
    var hours;
    if (minutes.length<2){
      hours = hour + ":0" +minutes
    }else{
      hours = hour + ":" +minutes
    }
    return hours;
  }

  protected prevMonth() {
    this.calendar.currentDate = new Date(this.calendar.currentDate.setMonth(this.calendar.currentDate.getMonth() - 1));
  }

  protected nextMonth() {
    this.calendar.currentDate = new Date(this.calendar.currentDate.setMonth(this.calendar.currentDate.getMonth() + 1));
  }

  protected getEvents(visits:Visits[]) {
    var events = []
    visits.forEach(element => {
      events.push({
          title: element.purpose,
          startTime: new Date(element.startTime),
          endTime: new Date(element.startTime),
          allDay: false
      });
    });
    return events
  }

  protected changeMode(mode) {
      this.calendar.mode = mode;
  }
  
  protected today() {
      this.calendar.currentDate = new Date();
  }
  
  protected onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
    
    this.database.GetAllVisits().then((result: any[]) => {
      this.visits1 = result;
      this.visits =[];      
      this.visits1.forEach(element => {
        if( new Date(element.startTime).getDate().toString() == this.selectedDay.getDate().toString()&&new Date(element.startTime).getMonth().toString() == this.selectedDay.getMonth().toString()){
          this.visits.push(element);
        }
      });
    }); 

  }
  protected onCurrentDateChanged(event:Date) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();
  }

  protected markDisabled = (date:Date) => {
      var current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
  };

  protected editVisit(visit:Visits){
    let modal = this.modalCtrl.create('NewVisitPage', {id:visit.id, selectedDay: visit.startTime, purpose:visit.purpose, adress:visit.adress, isEdit:true});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
        this.database.update(eventData).then(value=>
          this.ionViewDidEnter()
        );
      }   
    });
  }

  protected deleteVisit(visit:Visits){
    this.database.remove(visit.id).then(data=>{
        this.ionViewDidEnter()
    }
    )
  }
}
