import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GrowthStepsProvider, Steps} from '../../providers/database/growth-steps';

@IonicPage()
@Component({
  selector: 'page-growing-steps',
  templateUrl: 'growing-steps.html',
})
export class GrowingStepsPage {
  steps:any[]=[];


  constructor(public navCtrl: NavController, public navParams: NavParams, public database: GrowthStepsProvider) {
  }

  ionViewDidEnter() {
    this.database.GetAllSteps().then((result:any[])=>{
      this.steps = result;
      this.steps.forEach(element => {
        if(element.passed=="false"){
          element.passed = false;
        }else{
          element.passed = true;
        }
      });
    })
  }

  protected passed(step:Steps){
    step.passed = !step.passed;
  
    if(step.passed)
    {
      step.date = new Date().getDate() +"-"+ new Date().getMonth() + "-"+ new Date().getFullYear()
    }else{
      step.date = '';
    }
    
    this.database.update(step).then((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error);
    })
  
    this.ionViewDidEnter();
    
  }

  public getType(type:boolean):string{
    if(type){
      var isType:string = "TAK";
    }else{
      var isType:string = "NIE";
    }
    return isType
  } 
}
