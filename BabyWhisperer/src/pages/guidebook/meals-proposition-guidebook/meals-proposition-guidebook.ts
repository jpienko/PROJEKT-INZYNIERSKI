import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { File } from "@ionic-native/file"

@IonicPage()
@Component({
  selector: 'page-meals-proposition-guidebook',
  templateUrl: 'meals-proposition-guidebook.html',
})
export class MealsPropositionGuidebookPage {

protected propositions;
protected showSchedule:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public file:File) {
  }

  private getPropositions(){
    this.file.checkDir(this.file.applicationDirectory , "www/assets/mock").then(_=>{
      this.file.readAsText(this.file.applicationDirectory + "www/assets/mock", "meals-proposition.json").then(text => {
        this.propositions = JSON.parse(text);
      }).catch(err => {})
    });
  }

  ionViewDidLoad() {
    this.getPropositions();
  }

  protected showHideSchedule(){
    this.showSchedule = !this.showSchedule;
  }
  
}
