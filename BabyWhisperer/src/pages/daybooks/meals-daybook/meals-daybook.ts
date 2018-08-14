import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from  '@angular/forms';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import {map } from 'rxjs/operators';
import {Meals} from './meals';
import { MealDatabaseProvider} from "./../../../providers/meal-database/meal-database";

@IonicPage()
@Component({
  selector: 'page-meals-daybook',
  templateUrl: 'meals-daybook.html',
})
export class MealsDaybookPage {
   newMeal:Meals;
  private meals : FormGroup;
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, 
    private formBuilder: FormBuilder,private storage: Storage, private database:MealDatabaseProvider) {
    
      this.meals = this.formBuilder.group({
      hour: ['', Validators.required],
      type: [''],
      amount: [''],
    });
  }

  ionViewDidLoad() {

  }


  saveForm(){
  // console.log(this.meals.value)
    //this.storage.set('Test',this.meals.value);

    // Or to get a key/value pair
   //this.storage.get('Test').then((val) => {
    //  console.log('New meal:', val);
   // });
    this.newMeal = this.meals.value;
    this.database.CreateMeal("10:22","obiad","dużo").then((data)=>{
      console.log(data);
      },(error)=>{
        console.log(error);
      })
      this.database.GetAllMeals().then((data)=>{
        console.log(data);
        },(error)=>{
          console.log(error);
        })
   }
    
  
  getLocalData() {
    this.http
      .get('../assets/mock/meals.json')
      .pipe(map(data => data as Array<Meals>))
      .subscribe(data => {
        console.log(data);
      }); 
  }
}
