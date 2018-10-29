import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as HighCharts from 'highcharts';
import { DiaperDaybookProvider } from '../../../providers/database/diaper-daybook';
import { GlobalsProvider } from '../../../providers/globals/globals'

@IonicPage()
@Component({
  selector: 'page-diaper-stats',
  templateUrl: 'diaper-stats.html',
})
export class DiaperStatsPage {

  diapers: any[] = [];
  diapers1: any[] = [];
  dates:string[]=[];
  sum:string[] =[];
  sumDiaper:string[] = [];
  avgDiaper:string = '0';
  avgSumDiaper:string = '0';

  constructor(public navCtrl: NavController, public navParams: NavParams, private database:DiaperDaybookProvider,
              public global:GlobalsProvider) {
  }
  
  ionViewDidLoad() {
    this.getSumOfDiapers(); 
    this.getAverageOfDiapers();
  }

  private getAverageOfDiapers() {
    this.database.GetAvrageDiaper(this.global.activeChild).then((result: any[]) => {
      this.diapers1 = result;
      var i = 0;
      this.diapers1.forEach(element => {
        this.sum[i] = element.avg;
        i++;
      });
      this.getChart();
      this.getAvgSum();
    });
  }

  private getSumOfDiapers() {
    this.database.GetSumDiapers(this.global.activeChild).then((result: any[]) => {
      this.diapers = result;
      var i = 0;
      this.diapers.forEach(element => {
        this.dates[i] = element.date;
        this.sumDiaper[i] = element.sum;
        i++;
      });
      this.getAvgAvg();
    });
  }

  getChart(){
    HighCharts.chart('container', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Dzienny wykres wypróżnień'
      },
      xAxis: {
        categories: this.dates
      },
      yAxis: {
        title: {
          text: 'Godziny snu'
        }
      },
      series: [{
        name: 'Ilość wypróznień',
        data: this.sum
      },
      {
        name: 'Zużyte pieluchy',
        data: this.sumDiaper
      }]
    });
  }

  private getAvgSum(){
    let sum = 0;
    this.sum.forEach(element=>{
      sum += parseInt(element);
    })
    this.avgDiaper = (sum/this.sum.length).toPrecision(1).toString();
  }

  private getAvgAvg(){
    let sum = 0;
    this.sumDiaper.forEach(element=>{
      sum += parseInt(element);
    })
    this.avgSumDiaper = (sum/this.sumDiaper.length).toPrecision(1).toString();
  }

}
