import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  protected steps;

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
  }

}
