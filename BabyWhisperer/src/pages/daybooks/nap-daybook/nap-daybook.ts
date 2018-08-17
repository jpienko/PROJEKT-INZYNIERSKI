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

  constructor(public navCtrl: NavController, public navParams: NavParams, private database:NapDaybookProvider,
              public toast:ToastController) {
  }


  ionViewDidEnter() {
    this.database.GetAllNaps().then((result: any[]) => {
      this.naps = result;
    }); 
  }

  goToNewNap(){
    let data = {
      name: false
    }
    this.navCtrl.push('NewNapPage', data);
  }
  editDaybook(){
    this.isEdited = !this.isEdited;
  }

  editNap(nap){
    let data = {
      name: false,
      edit:true,
      napId: nap.id
    }
    this.navCtrl.push('NewNapPage', data);
  }

  deleteMeal(nap:Naps){
    console.log(nap);
    this.database.remove(nap.id).then(() => {
      var index = this.naps.indexOf(nap);
      this.naps.splice(index, 1);
      this.toast.create({ message: 'Usunięto', duration: 3000, position: 'botton' }).present();
    })
    
  }
}

