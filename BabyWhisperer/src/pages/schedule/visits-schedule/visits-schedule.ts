import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import {DoctorVisitsProvider, Visits} from '../../../providers/database/doctor-visits';



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
      },
      formatMonthViewTitle: function(date:Date) {
        const monthNames:Array<string>=['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 
                                    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 
                                    'Grudzień' ];
        let moisSelec:string=monthNames[date.getMonth()];
        return moisSelec+" "+String(date.getFullYear());
      },

      formatMonthViewDayHeader: function(date:Date) {
        const DaysLetter:Array<string>=["Pn","Wt","Śr","Czw","Pt","So","Nd"];
        return DaysLetter[date.getDay()];
      }
    }

};
 
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private modalCtrl: ModalController, private database:DoctorVisitsProvider) {
    
  }

  ionViewDidLoad(){
    this.ionViewDidEnter()
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
    let modal = this.modalCtrl.create('NewVisitPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
        this.database.insert(eventData);
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
  
  protected onRangeChanged(ev) {
      console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  protected markDisabled = (date:Date) => {
      var current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
  };
}
