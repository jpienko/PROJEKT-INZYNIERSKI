import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Naps } from '../../../providers/database/nap-schedule';
import { NapDaybookProvider } from '../../../providers/database/nap-daybook'
import { GlobalsProvider } from '../../../providers/globals/globals'

@IonicPage()
@Component({
  selector: 'nap-meal-daybook',
  templateUrl: 'nap-daybook.html',
})
export class NapDaybookPage {
  isEdited:boolean = false;
  naps: any[] = [];
  time:string="";
  dates: any[] =[];
  all:any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private database:NapDaybookProvider,
              public toast:ToastController, public global: GlobalsProvider) {
  }


  ionViewDidEnter() {
    this.getAllNaps(); 
  }

  private getAllNaps() {
    this.all = [];
    this.database.getAllDates(this.global.activeChild).then((result: any[]) => {
      this.dates = result;
      this.dates.forEach(element => {
        if((+new Date() - +new Date(element.date))/(1000*3600*24)<7){
          this.database.getByDateNaps(element.date, this.global.activeChild).then((result: any[]) => {
            this.naps = result;
            this.naps.forEach(element => {
              element.time = this.getTimeOfNap(element.time);
            });
            this.all.push({
              date: element.date,
              nap: this.naps
            });
          });
        }
      });
    });
  }

  protected goToNewNap(){
    let data = {
      napsSchedule: false
    }
    this.navCtrl.push('NewNapPage', data);
  }
  protected editDaybook(){
    this.isEdited = !this.isEdited;
  }

  protected editNap(nap){
    let data = {
      napsSchedule: false,
      editNap:true,
      napId: nap.id
    }
    this.navCtrl.push('NewNapPage', data);
  }

  protected deleteNap(nap:Naps){
    this.database.remove(nap.id).then(() => {
      var index = this.naps.indexOf(nap);
      this.naps.splice(index, 1);
      this.toast.create({ message: 'Usunięto', duration: 3000, position: 'botton' }).present();
      this.ionViewDidEnter();
    })
    
  }

  private getTimeOfNap(time:number):string{
    let x = time.toString().split(".");
    var hours = x[0];    
    var minutes = (parseFloat("0."+x[1])*60).toPrecision(2);
    return hours + " godzin " + minutes + " minut"
  } 
}