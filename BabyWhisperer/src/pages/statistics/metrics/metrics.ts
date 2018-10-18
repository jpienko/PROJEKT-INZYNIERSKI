import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as HighCharts from 'highcharts';
import {ChildProfileProvider} from '../../../providers/database/child-profile'
import { File } from '@ionic-native/file';
import { GlobalsProvider } from '../../../providers/globals/globals'

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
  centilHeight:string ="";
  centilWeight:string="";
  age:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database:ChildProfileProvider,
              private file:File, public global:GlobalsProvider) {
  }
  
  ionViewDidLoad() {
    this.database.GetAllChildProfiles(this.global.activeChild).then((result: any[]) => {
    this.child = result;
    console.log(this.child);
    
    var i =0;
      this.child.forEach(element => {
        this.dates[i] = element.date;
        this.height[i] = element.height;
        this.weight[i] = element.weight;
        i++;
      }); 
      this.age = this.getAge(this.child[0].birthday)
      this.getChart();
      this.getCentils();
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

  public getCentils(){
    let sizes;
    this.file.checkDir(this.file.applicationDirectory , "www/assets/mock").then(_=>{
      this.file.readAsText(this.file.applicationDirectory + "www/assets/mock", "growth-chart.json").then(text => {
        sizes = JSON.parse(text); 
        sizes.forEach(element => {
            this.getHeightCentil(element.height);
            this.getWeightCentil(element.weight);
        });
      }).catch(err => {})
    });
  }

  private getHeightCentil(heights:any){
    if(heights[this.age-1].max>this.height[0]){
      if(heights[this.age-1].min<this.height[0]){
        this.centilHeight = "Dziecko mieści się w siatce centylowej wzrostu"
      }
      else{
        this.centilHeight = "Dziecko nie mieści się w siatce centylowej - mały wzrost"
      }
    }else{
      this.centilHeight = "Dziecko nie mieści się w siatce centylowej - duży wzrost"
    }
  }

  private getWeightCentil(weights:any){
    if(weights[this.age-1].max>this.weight[0]){
      if(weights[this.age-1].min<this.weight[0]){
        this.centilWeight = "Dziecko mieści się w siatce centylowej wagi"
      }
      else{
        this.centilWeight = "Dziecko nie mieści się w siatce centylowej - mała waga"
      }
    }else{
      this.centilWeight = "Dziecko nie mieści się w siatce centylowej - duża waga"
    }
  }

  private getAge(birthDate:string){
    let birthday = new Date(birthDate);
    let today = new Date();
    return parseInt(((+today - +birthday)/(1000*3600*24*30)).toString());
  }

}
