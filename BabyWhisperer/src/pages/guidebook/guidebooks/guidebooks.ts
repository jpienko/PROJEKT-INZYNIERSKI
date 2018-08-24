import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-guidebooks',
  templateUrl: 'guidebooks.html',
})
export class GuidebooksPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuidebooksPage');
  }

  goToProductsGuidebook(){
    this.navCtrl.push('ProductsGuidebookPage');
  }
  goToProgressSteps(){
    this.navCtrl.push('ProgressStepsGuidebookPage');
  }
}
