import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-daybook',
  templateUrl: 'daybook.html',
})
export class DaybookPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  goToDaybookOfMeals(){
    this.navCtrl.push('MealDaybookPage');
  }

  goToDaybookOfNaps(){
    this.navCtrl.push('NapDaybookPage');
  }

  goToDaybookOfDiapers(){
    this.navCtrl.push('DiaperDaybookPage');
  }
}
