import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from  '@angular/forms';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-meals-daybook',
  templateUrl: 'meals-daybook.html',
})
export class MealsDaybookPage {
  
  private meals : FormGroup;
  

  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, 
              private formBuilder: FormBuilder) {
      this.meals = this.formBuilder.group({
      hour: ['', Validators.required],
      type: [''],
      amount: [''],
    });
  }

  ionViewDidLoad() {
    
  }
  
  
    
}
