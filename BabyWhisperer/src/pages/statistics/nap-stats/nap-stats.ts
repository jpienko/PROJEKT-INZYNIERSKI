import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as HighCharts from 'highcharts';
import {NapDaybookProvider} from '../../../providers/database/nap-daybook'
import { GlobalsProvider } from '../../../providers/globals/globals'

@IonicPage()
@Component({
  selector: 'page-nap-stats',
  templateUrl: 'nap-stats.html',
})
export class NapStatsPage {
  naps: any[] = [];
  dates:string[]=[];
  sum:string[] =[];
  avg:string[] = [];
  avgAvgNap:string = '0';
  avgSumNap:string = '0';
  constructor(public navCtrl: NavController, public navParams: NavParams, private database:NapDaybookProvider,
              public global: GlobalsProvider) {
  }
  
  ionViewDidLoad() {
    this.getNapData(); 
  }

  private getNapData() {
    this.database.GetAvrageNap(this.global.activeChild).then((result: any[]) => {
      this.naps = result;
      var i = 0;
      this.naps.forEach(element => {
        this.dates[i] = element.date;
        this.sum[i] = element.sum;
        this.avg[i] = element.avg;
        i++;
      });
      this.getChart();
      this.getAvgAvg();
      this.getAvgSum();
    });
  }

  getChart(){
    HighCharts.chart('container', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Dzienny wykres drzemek'
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
        name: 'Łączna długośc snu',
        data: this.sum
      },
      {
        name: 'Średnia długośc snu',
        data: this.avg
      }]
    });
  }

  private getAvgSum(){
    var sumNap = 0;
    this.sum.forEach(element => {
      sumNap = sumNap + parseFloat(element)
    });
    this.avgSumNap = this.getTimeOfNap(sumNap/this.sum.length);
  }

  private getAvgAvg(){
    var avgNap = 0;
    this.avg.forEach(element => {
      avgNap = avgNap + parseFloat(element)
    });
    this.avgAvgNap = this.getTimeOfNap(avgNap/this.avg.length);
  }

  public getTimeOfNap(time:number):string{
    let x = time.toString().split(".");
    var hours = x[0];    
    var minutes = (parseFloat("0."+x[1])*60).toPrecision(2);
    return hours + " godzin " + minutes + " minut"
  } 
}
