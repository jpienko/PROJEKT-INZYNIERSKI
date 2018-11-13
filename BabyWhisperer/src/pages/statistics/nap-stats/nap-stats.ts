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
  protected naps: any[] = [];
  protected weekDays:string[]=[];
  protected weekSum:string[] =[];
  protected weekAvg:string[] = [];
  protected avgWeekNap:string;
  protected avgWeekSumNap:string;
  
  protected monthDays:string[]=[];
  protected monthSum:string[] =[];
  protected monthAvg:string[] = [];
  protected avgMonthlyNap:string;
  protected avgMonthlySumNap:string;
  
  protected yearDays:string[]=[];
  protected yearSum:string[] =[];
  protected yearAvg:string[] = [];
  protected avgYearNap:string;
  protected avgYearSumNap:string;



  constructor(public navCtrl: NavController, public navParams: NavParams, private database:NapDaybookProvider,
              public global: GlobalsProvider) {
  }
  
  ionViewDidLoad() {
    this.getNapData(); 
  }

  private getNapData() {
    this.database.GetAvrageNap(this.global.activeChild).then((result: any[]) => {
      this.naps = result;
      this.getWeekNaps(this.naps);
      this.getWeeklyChart();
      this.getMonthNaps(this.naps);
      this.getMonthChart();
    });
  }

  protected getWeeklyChart(){
    HighCharts.chart('weekly', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Dzienny wykres drzemek ostanich 7 dni'
      },
      xAxis: {
        categories: this.weekDays
      },
      yAxis: {
        title: {
          text: 'Godziny snu'
        }
      },
      series: [{
        name: 'Łączna długośc snu',
        data: this.weekSum
      },
      {
        name: 'Średnia długośc snu',
        data: this.weekAvg
      }]
    });
  }

  private getWeekNaps(allNaps:Array<NapsData>){
    allNaps.forEach(element=>{
      if((+new Date() - +new Date(element.date))/(1000*3600*24)<7){
        this.weekDays.push(element.date);
        this.weekAvg.push(element.avg);
        this.weekSum.push(element.sum)
      }
    })
    this.avgWeekNap = this.getAvgAvg(this.weekAvg);
    this.avgWeekSumNap = this.getAvgSum(this.weekSum);
  }

  protected getMonthChart(){
    HighCharts.chart('monthly', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Dzienny wykres drzemek obecnego miesiąca'
      },
      xAxis: {
        categories: this.monthDays
      },
      yAxis: {
        title: {
          text: 'Godziny snu'
        }
      },
      series: [{
        name: 'Łączna długośc snu',
        data: this.monthSum
      },
      {
        name: 'Średnia długośc snu',
        data: this.monthAvg
      }]
    });
  }

  private getMonthNaps(allNaps:Array<NapsData>){
    var today = new Date();
    
    allNaps.forEach(element=>{
      var date = new Date(element.date);
      if((today.getMonth() == date.getMonth())&&(today.getFullYear()==date.getFullYear())){
        this.monthDays.push(element.date);
        this.monthAvg.push(element.avg);
        this.monthSum.push(element.sum)
      }
    })

    this.avgMonthlyNap = this.getAvgAvg(this.monthAvg);
    this.avgMonthlySumNap = this.getAvgSum(this.monthSum);
  }

  protected getYearChart(){
    HighCharts.chart('pYear', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Średni miesięczny wykres drzemek'
      },
      xAxis: {
        categories: this.weekDays
      },
      yAxis: {
        title: {
          text: 'Godziny snu'
        }
      },
      series: [{
        name: 'Łączna długośc snu',
        data: this.weekSum
      },
      {
        name: 'Średnia długośc snu',
        data: this.weekAvg
      }]
    });
  }

  private getYearNaps(allNaps:Array<NapsData>){
    allNaps.forEach(element=>{
      if((+new Date() - +new Date(element.date))/(1000*3600*24)<7){
        this.weekDays.push(element.date);
        this.weekAvg.push(element.avg);
        this.weekSum.push(element.sum)
      }
    })
  }

  private getAvgSum(sum:string[]){
    var sumNap = 0;
    sum.forEach(element => {
      sumNap = sumNap + parseFloat(element)
    });
    return this.getTimeOfNap(sumNap/sum.length);
  }

  private getAvgAvg(avg:string[]){
    var avgNap = 0;
    avg.forEach(element => {
      avgNap = avgNap + parseFloat(element)
    });
    return  this.getTimeOfNap(avgNap/avg.length);
  }

  public getTimeOfNap(time:number):string{
    let x = time.toString().split(".");
    var hours = x[0];    
    var minutes = (parseFloat("0."+x[1])*60).toPrecision(2);
    return hours + " godzin " + minutes + " minut"
  } 

  
}

export class NapsData{
  public date:string;
  public avg:string;
  public sum:string;
}
