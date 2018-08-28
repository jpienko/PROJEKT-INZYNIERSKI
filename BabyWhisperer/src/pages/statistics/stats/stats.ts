import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatsPage');
  }
  goToStatsOfMeals(){
    //this.navCtrl.push('MealStatsPage');
  }

  goToStatsOfNaps(){
    this.navCtrl.push('NapStatsPage');
  }

  goToStatsOfDiapers(){
    this.navCtrl.push('DiaperStatsPage');
  }

  goToStatsOfMetrics(){
    this.navCtrl.push('MetricsPage');
  }
}
