import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,AlertController } from 'ionic-angular';
import { DiaperDaybookProvider, Diaper } from '../../../providers/database/diaper-daybook';
import { GlobalsProvider } from '../../../providers/globals/globals'

@IonicPage()
@Component({
  selector: 'page-diaper-daybook',
  templateUrl: 'diaper-daybook.html',
})
export class DiaperDaybookPage {

  isEdited:boolean = false;
  diapers: any[] = [];
  dates:any[]=[];
  all:any[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DiaperDaybookProvider,
              public toast:ToastController, private alert:AlertController, private global:GlobalsProvider) {
  }

  ionViewDidEnter() {
    this.getAllDiapers(); 
  }

  private getAllDiapers() {
    this.all = [];
    this.database.GetAllDates(this.global.activeChild).then((result: any[]) => {
      this.dates = result;
      this.dates.forEach(element => {
        if((+new Date() - +new Date(element.date))/(1000*3600*24)<7){
          this.database.getByDate(element.date, this.global.activeChild).then((result: any[]) => {
            this.diapers = result;
            this.all.push({
              date: element.date,
              diaper: this.diapers
            });
          });
        }
      });
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
    let alert = this.alert.create({
      title: 'Wymagane potwierdzenie',
      message: 'Czy na pewno chcesz usunąć? Po zatwierdzeniu odzyskanie danych jest niemożliwe.',
      buttons: [
        {
          text: 'Anuluj',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Usuń',
          handler: () => {
            this.database.remove(diaper.id).then(() => {
              var index = this.diapers.indexOf(diaper);
              this.diapers.splice(index, 1);
              this.toast.create({ message: 'Usunięto', duration: 3000, position: 'botton' }).present();
              this.ionViewDidEnter();
            })
          }
        }
      ]
    });
    alert.present(); 
  }

  public getType(type:string):string{
    var isType:string;
    if(type=='true'){
       isType = "TAK";
    }else{
       isType = "NIE";
    }
    return isType;
  } 

}
