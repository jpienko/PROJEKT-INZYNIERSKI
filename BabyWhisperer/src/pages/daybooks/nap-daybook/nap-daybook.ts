import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Naps } from '../../../providers/database/nap-schedule';
import { NapDaybookProvider } from '../../../providers/database/nap-daybook'

@IonicPage()
@Component({
  selector: 'nap-meal-daybook',
  templateUrl: 'nap-daybook.html',
})
export class NapDaybookPage {
  isEdited:boolean = false;
  naps: any[] = [];
  time:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams, private database:NapDaybookProvider,
              public toast:ToastController) {
  }


  ionViewDidEnter() {
    this.database.GetAllNaps().then((result: any[]) => {
      this.naps = result;
      this.naps.forEach(element => {
        element.time = this.getTimeOfNap(element.time);
      });
    }); 
  }

  public goToNewNap(){
    let data = {
      napsSchedule: false
    }
    this.navCtrl.push('NewNapPage', data);
  }
  public editDaybook(){
    this.isEdited = !this.isEdited;
  }

  public editNap(nap){
    let data = {
      napsSchedule: false,
      editNap:true,
      napId: nap.id
    }
    this.navCtrl.push('NewNapPage', data);
  }

  public deleteNap(nap:Naps){
    console.log(nap);
    this.database.remove(nap.id).then(() => {
      var index = this.naps.indexOf(nap);
      this.naps.splice(index, 1);
      this.toast.create({ message: 'Usunięto', duration: 3000, position: 'botton' }).present();
    })
  }
  public getTimeOfNap(time:number):string{
    let x = time.toString().split(".");
    var hours = x[0];    
    var minutes = (parseFloat("0."+x[1])*60).toPrecision(2);
    return hours + " godzin " + minutes + " minut"
  } 

}