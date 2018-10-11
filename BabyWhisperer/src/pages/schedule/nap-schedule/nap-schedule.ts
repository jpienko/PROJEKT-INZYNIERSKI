import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NapScheduleProvider, Naps } from '../../../providers/database/nap-schedule';


@IonicPage()
@Component({
  selector: 'page-nap-schedule',
  templateUrl: 'nap-schedule.html',
})
export class NapSchedulePage {
  isEdited:boolean = false;
  naps: any[] = [];
  childId:number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private database:NapScheduleProvider, private toast: ToastController) {
  }

  ionViewDidEnter() {
    this.database.GetAllNaps(this.childId).then((result: any[]) => {
      this.naps = result;
    });
    console.log(this.naps);
    
  }

  protected goToNewNap(){
    let data = {
      napSchedule: true
    }
    this.navCtrl.push('NewNapPage',data);
  }

  protected editSchedule(){
    this.isEdited = !this.isEdited;
  }

  protected deleteMeal(nap:Naps){
    console.log(nap);
    this.database.remove(nap.id).then(() => {
      var index = this.naps.indexOf(nap);
      this.naps.splice(index, 1);
      this.toast.create({ message: 'Usunięto', duration: 3000, position: 'botton' }).present();
    })
    
  }

}
