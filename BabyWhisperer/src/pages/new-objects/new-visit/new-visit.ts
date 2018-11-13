import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-new-visit',
  templateUrl: 'new-visit.html',
})
export class NewVisitPage {
 
  protected event = { id:'', purpose: '', startTime: new Date().toISOString(), adress:'' };
  protected maxDate = new Date(2018,12,31).toISOString().replace(new Date().getFullYear().toString(), (new Date().getFullYear() + 1).toString());
  protected title:string = "Nowa wizyta"
  protected button:string = "Dodaj wizytę"

  constructor(public navCtrl: NavController, private navParams: NavParams, 
              public viewCtrl: ViewController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    if (this.navParams.get('isEdit')){
      this.event.adress = this.navParams.get('adress');
      this.event.purpose = this.navParams.get('purpose');
      this.event.id = this.navParams.get('id');
    }
  }

  ionViewDidEnter(){
  
    if(this.navParams.get('id')!=undefined){
      this.title = "Edytuj wizytę";
      this.button = "Zapisz"
    }

  }

  protected cancel() {
    this.viewCtrl.dismiss();
  }
 
  protected save() {
    this.viewCtrl.dismiss(this.event);
  }

}
