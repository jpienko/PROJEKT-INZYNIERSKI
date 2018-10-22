import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GrowthStepsProvider } from '../../../providers/database/growth-steps';
import { GlobalsProvider } from '../../../providers/globals/globals'
import { StepDesc }from "../growing-steps/growing-steps"
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-passed-steps',
  templateUrl: 'passed-steps.html',
})
export class PassedStepsPage {

  protected steps:any[]=[];
  protected stepsToShow:StepDesc[]=[];
  protected stepsDesc:StepDesc[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: GrowthStepsProvider,
              private globals:GlobalsProvider, private file:File) {
  }

  protected getSteps(){
    this.file.checkDir(this.file.applicationDirectory , "www/assets/mock").then(_=>{
      this.file.readAsText(this.file.applicationDirectory + "www/assets/mock", "growth-steps.json").then(text => {
        this.stepsDesc = JSON.parse(<string>text);  
        this.stepsToShow = [];
        this.steps.forEach(element=>{ 
          var step:StepDesc = this.stepsDesc.find(item => item.id === element.stepId);
          step.date = element.date;
          step.id = element.id;
           this.stepsToShow.push(step);
        }) 
      }).catch(err => {})  
    });
   }

  protected getPassedSteps(){
    this.database.GetAllSteps(this.globals.activeChild ).then((result:any[])=>{
      this.steps = result;
    })
  }

  ionViewDidEnter() {
   this.getPassedSteps();
   this.getSteps();
  }

  protected passed(id:number){ 
    this.database.remove(id).then((data)=>{
      console.log(data); 
      this.ionViewDidEnter();
    },(error)=>{
      console.log(error);
    })
  }

  public goToUnpassed(){
    this.navCtrl.pop();
  }
}

