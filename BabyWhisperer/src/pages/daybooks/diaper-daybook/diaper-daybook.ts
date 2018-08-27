import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DiaperDaybookProvider, Diaper } from '../../../providers/database/diaper-daybook';
import { isType } from '../../../../node_modules/@angular/core/src/type';



@IonicPage()
@Component({
  selector: 'page-diaper-daybook',
  templateUrl: 'diaper-daybook.html',
})
export class DiaperDaybookPage {

  isEdited:boolean = false;
  diapers: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DiaperDaybookProvider,
              public toast:ToastController) {
  }


  ionViewDidEnter() {
    this.database.GetAllDiapers().then((result: any[]) => {
      this.diapers = result;
      console.log(this.diapers);
      
    }); 
  }

  public goToNewDiaper(){
    let data = {
      editDiaper: false
    }
    this.navCtrl.push('NewDiaperPage', data);
  }

  public editDiaper(diaper){
    let data = {
      editDiaper:true,
      diaperId: diaper.id
    }
    this.navCtrl.push('NewDiaperPage', data);
  }

  public deleteNap(diaper:Diaper){
    console.log(diaper);
    this.database.remove(diaper.id).then(() => {
      var index = this.diapers.indexOf(diaper);
      this.diapers.splice(index, 1);
      this.toast.create({ message: 'Usunięto', duration: 3000, position: 'botton' }).present();
    })
  }
  public getType(type:boolean):string{
    if(type){
      var isType:string = "TAK";
    }else{
      var isType:string = "NIE";
    }
    return isType
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiaperDaybookPage');
  }

}
