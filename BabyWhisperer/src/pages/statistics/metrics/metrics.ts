import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as HighCharts from 'highcharts';
import {ChildProfileProvider} from '../../../providers/database/child-profile'

@IonicPage()
@Component({
  selector: 'page-metrics',
  templateUrl: 'metrics.html',
})
export class MetricsPage {
  child: any[] = [];
  dates:string[]=[];
  height:string[] =[];
  weight:string[] = [];
  avgAvgNap:string = '0';
  avgSumNap:string = '0';

  constructor(public navCtrl: NavController, public navParams: NavParams, private database:ChildProfileProvider) {
  }
  
  ionViewDidLoad() {
    this.database.GetAllChildProfiles().then((result: any[]) => {
    this.child = result;
    var i =0;
      this.child.forEach(element => {
        this.dates[i] = element.date;
        this.height[i] = element.height;
        this.weight[i] = element.weight;
        i++;
      }); 
      this.getChart();
    }); 
  }

  getChart(){
    HighCharts.chart('container', {
        chart: {
          type: 'line'
        },
        title: {
          text: 'Wykres wzrostu i wagi'
        },
        xAxis: {
          categories: this.dates
        },
        yAxis: {
          title: {
            text: 'Waga [kg] wzrost [cm]'
          }
        },
        series: [{
          name: 'Waga',
          data: this.weight
        },
        {
          name: 'Wzrost',
          data: this.height
      }]
    });
  }

  
}
