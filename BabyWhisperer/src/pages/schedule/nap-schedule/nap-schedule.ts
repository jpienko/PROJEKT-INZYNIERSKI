import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NapScheduleProvider, Naps } from '../../../providers/database/nap-schedule';
import { GlobalsProvider } from '../../../providers/globals/globals'


@IonicPage()
@Component({
  selector: 'page-nap-schedule',
  templateUrl: 'nap-schedule.html',
})
export class NapSchedulePage {
  protected isEdited:boolean = false;
  protected naps: any[] = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private database:NapScheduleProvider, private toast: ToastController,
              public global:GlobalsProvider) {}

  ionViewDidEnter() {
    this.database.GetAllNaps(this.global.activeChild).then((result: any[]) => {
      this.naps = result;
    });
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

  protected deleteNap(nap:Naps){
    this.database.remove(nap.id).then(() => {
      var index = this.naps.indexOf(nap);
      this.naps.splice(index, 1);
      this.toast.create({ message: 'Usunięto', duration: 3000, position: 'botton' }).present();
    })
  }

}
