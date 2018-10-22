import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GrowthStepsProvider, Steps} from '../../../providers/database/growth-steps';
import { File } from '@ionic-native/file';
import { GlobalsProvider } from '../../../providers/globals/globals'
import { Step } from '../../../../node_modules/ionic2-calendar/calendar';


@IonicPage()
@Component({
  selector: 'page-growing-steps',
  templateUrl: 'growing-steps.html',
})
export class GrowingStepsPage {
  steps:any[]=[];

  protected stepsDescription:StepDesc[];
  protected stepsToShow:StepDesc[];



  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public database: GrowthStepsProvider, private file:File, private globals:GlobalsProvider) {
  }

 protected getSteps(){
  this.file.checkDir(this.file.applicationDirectory , "www/assets/mock").then(_=>{
    this.file.readAsText(this.file.applicationDirectory + "www/assets/mock", "growth-steps.json").then(text => {
      this.stepsToShow = JSON.parse(<string>text);   
      this.steps.forEach(element=>{    
         this.stepsToShow.splice(this.stepsToShow.indexOf(this.stepsToShow.find(item => item.id === element.stepId)),1);
    }) 
    
    }).catch(err => {})
    
  });
 }

 protected getPassedSteps(){
    this.database.GetAllSteps(this.globals.activeChild).then((result:any[])=>{
      this.steps = result;      
    })
 }
  ionViewDidEnter() { 
   this.getSteps();
   this.getPassedSteps();
  
  }

  protected passed(stepId:number){
     var newStep = new Steps;

    newStep.date = new Date().getDate() +"-"+ new Date().getMonth() + "-"+ new Date().getFullYear()
    
    newStep.childId = this.globals.activeChild;
    newStep.stepId = stepId;

    this.database.insert(newStep).then((data)=>{
      console.log(data);
      this.ionViewDidEnter();
    },(error)=>{
      console.log(error);
    })
  
    
    
  }

  
  public goToPassed(){
    this.navCtrl.push('PassedStepsPage');
  }
}

export class StepDesc {
  public id:number;
  public title:string;
  public content:string;
  public date:string;
}
