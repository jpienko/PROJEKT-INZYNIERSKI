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

  ionViewDidLoad() {
    
  }
  
  
  goToDaybookOfMeals(){
    this.navCtrl.push('MealsDaybookPage');
  }
}
