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

  protected diapers: any[] = [];
  protected diapers1: any[] = [];


  protected weekDays:string[]=[];
  protected weekSum:string[] =[];
  protected weekAvg:string[] = [];
  protected avgWeekDiaper:string;
  protected avgWeekSumDiaper:string;
  
  protected monthDays:string[]=[];
  protected monthSum:string[] =[];
  protected monthAvg:string[] = [];
  protected avgMonthlyDiaper:string;
  protected avgMonthlySumDiaper:string;
  
  protected yearDays:string[]=[];
  protected yearSum:any[] =[];
  protected yearAvg:any[] = [];
  protected avgYearDiaper:string;
  protected avgYearSumDiaper:string;

  protected dataIsEmpty:boolean = true;

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
      this.getWeekDiaperAvg(this.diapers1);
      this.getMonthDiaperAvg(this.diapers1);
      this.getYearDiaperAvg(this.diapers1);
      console.log(this.diapers1);
      
      console.log(this.weekAvg, this.weekDays, this.weekSum, this.avgWeekDiaper, this.avgWeekSumDiaper);
      console.log(this.monthAvg, this.monthDays, this.monthSum, this.avgMonthlyDiaper, this.avgMonthlySumDiaper);
      console.log(this.yearAvg, this.yearDays, this.yearSum, this.avgYearDiaper, this.avgYearSumDiaper);
      this.getMonthChart();
      this.getWeekChart();
      this.getYearChart();
  
    });
  }

  private getWeekDiaperAvg(allDiapers:Array<DiaperAvgData>){
    allDiapers.forEach(element=>{
      if((+new Date() - +new Date(element.date))/(1000*3600*24)<7){
        this.weekDays.push(element.date);
        this.weekAvg.push(element.avg);
      }
    })

    this.avgWeekDiaper = this.getAvgAvg(this.weekAvg);
  }

  private getMonthDiaperAvg(allDiapers:Array<DiaperAvgData>){
    var today = new Date();
    
    allDiapers.forEach(element=>{
      var date = new Date(element.date);
      if((today.getMonth() == date.getMonth())&&(today.getFullYear()==date.getFullYear())){
        this.monthDays.push(element.date);
        this.monthAvg.push(element.avg);
      }
    })
    this.avgMonthlyDiaper = this.getAvgAvg(this.monthAvg);
  }

  private getYearDiaperAvg(allDiapers:Array<DiaperAvgData>){
    var avg:string[]=[];
    var exists:boolean = false;
    for (let index = 0; index < 12; index++) {
      allDiapers.forEach(element=>{
        if((new Date().getFullYear() == new Date(element.date).getFullYear())&& (new Date(element.date).getMonth()==index)){
          avg.push(element.avg);
          exists = true;
        }
      })
      
      if(exists){
        this.yearDays.push((index+1).toString());
        this.yearAvg.push(parseInt(this.getAvgAvg(avg)));
        avg=[];
        exists= false;
      }
    }
    this.avgYearDiaper = this.getAvgAvg(this.yearAvg);
  }

  private getSumOfDiapers() {
    this.database.GetSumDiapers(this.global.activeChild).then((result: any[]) => {
      this.diapers = result;    
      this.getWeekSumDiaper(this.diapers);
      this.getMonthSumDiaper(this.diapers);
      this.getYearSumDiaper(this.diapers);
      if(this.diapers.length==0){
        this.dataIsEmpty = true;
      }else{
        this.dataIsEmpty = false;
      }
    });
  }

  private getWeekSumDiaper(allDiapers:Array<DiaperSumData>){
    allDiapers.forEach(element=>{
      if((+new Date() - +new Date(element.date))/(1000*3600*24)<7){
        this.weekSum.push(element.sum);
      }
    })
    this.avgWeekSumDiaper = this.getAvgSum(this.weekSum);
  }

  private getMonthSumDiaper(allDiapers:Array<DiaperSumData>){
    var today = new Date();
    allDiapers.forEach(element=>{
      var date = new Date(element.date);
      if((today.getMonth() == date.getMonth())&&(today.getFullYear()==date.getFullYear())){
        this.monthSum.push(element.sum);
      }
    })
    this.avgMonthlySumDiaper = this.getAvgSum(this.monthSum)
  }

  private getYearSumDiaper(allDiapers:Array<DiaperSumData>){
    var sum:string[]=[];
    var exists:boolean = false;
    for (let index = 0; index < 12; index++) {
      allDiapers.forEach(element=>{
        if((new Date().getFullYear() == new Date(element.date).getFullYear())&& (new Date(element.date).getMonth()==index)){
          sum.push(element.sum);
          exists = true;
        }
      })
      
      if(exists){
        this.yearSum.push(parseInt(this.getAvgSum(sum)));
        sum=[];  
        exists= false;
      }
    }
    this.avgYearSumDiaper = this.getAvgSum(this.yearSum)
  }

  protected getWeekChart(){
    HighCharts.chart('weekly', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Dzienny wykres przewijania ostatnich 7 dni'
      },
      xAxis: {
        categories: this.weekDays
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      series: [{
        name: 'Ilość wypróznień',
        data: this.weekSum
      },
      {
        name: 'Zużyte pieluchy',
        data: this.weekAvg
      }]
    });
  }

  protected getMonthChart(){
    HighCharts.chart('monthly', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Dzienny wykres przewijania ostatniego miesiąca'
      },
      xAxis: {
        categories: this.monthDays
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      series: [{
        name: 'Ilość wypróznień',
        data: this.monthSum
      },
      {
        name: 'Zużyte pieluchy',
        data: this.monthAvg
      }]
    });
  }

  protected getYearChart(){
    HighCharts.chart('pYear', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Miesięczny wykres przewijania obecnego roku'
      },
      xAxis: {
        categories: this.yearDays
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      series: [{
        name: 'Ilość wypróznień',
        data: this.yearSum
      },
      {
        name: 'Zużyte pieluchy',
        data: this.yearAvg
      }]
    });
  }

  private getAvgSum(sum:string[]){
    let sumDiaper = 0;
    sum.forEach(element=>{
      sumDiaper += parseInt(element);
    })
    return (sumDiaper/sum.length).toPrecision(2);
  }

  private getAvgAvg(avg:string[]){
    var sumDiaper = 0;
    avg.forEach(element=>{
      sumDiaper += parseInt(element);
    })
    return (sumDiaper/avg.length).toPrecision(2);
  }

}

export class DiaperAvgData{
  public date:string;
  public avg:string;
}

export class DiaperSumData{
  public date:string;
  public sum:string;
}
