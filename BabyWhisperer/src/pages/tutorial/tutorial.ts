import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { TutorialCategories } from '../../assets/enums/tutorial-categories.enum'

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  private steps;
  protected stepsToShow =[];
  protected categories;

  constructor(public navCtrl: NavController, public navParams: NavParams, private file:File) {
  }

  private getSteps(){
    this.file.checkDir(this.file.applicationDirectory , "www/assets/mock").then(_=>{
      this.file.readAsText(this.file.applicationDirectory + "www/assets/mock", "tutorial.json").then(text => {
        this.steps = JSON.parse(text);
      }).catch(err => {})
    });
  }
  
  ionViewDidLoad() {
    this.getSteps();
    this.categories = Object.keys(TutorialCategories);
    this.categories = this.categories.slice(this.categories.length / 2);
  }

  protected onChange(value:any){
    this.stepsToShow = [];
    if(value == "Wszystko"){
      this.stepsToShow = this.steps;
    }else{
      this.steps.forEach(element => {
      if (element.category==value)
        this.stepsToShow.push(element);
    });
    }

    
  }
}
