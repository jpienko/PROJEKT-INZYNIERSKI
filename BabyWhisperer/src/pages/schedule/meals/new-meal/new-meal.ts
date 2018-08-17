import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from  '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MealProvider,Meals} from "./../../../../providers/database/meal-schedule-provider";
import {MealsTypes} from "./../../../../assets/enums/meals-types.enum"

@IonicPage()
@Component({
  selector: 'page-new-meal',
  templateUrl: 'new-meal.html',
})
export class NewMealPage {
  model = new Meals;
  private meals : FormGroup;
  protected types: string[] = Object.keys(MealsTypes);
  
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, 
              private formBuilder: FormBuilder, private database:MealProvider) {
                
      this.meals = this.formBuilder.group({
      hour: ['', Validators.required],
      type: [''],
      description: [''],
    });
  }

  ionViewDidLoad() {
    this.types = this.types.slice(this.types.length / 2);
  }
  
  
  saveForm(){
    this.model.hour = this.meals.controls.hour.value;
    this.model.type = this.meals.controls.type.value;
    this.model.description = this.meals.controls.description.value;
    console.log(this.model);
    
    this.database.insert(this.model)
      .then((data)=>{
        console.log(data);
      },(error)=>{
        console.log(error);
      })
    this.meals.reset();
   }
    
}
