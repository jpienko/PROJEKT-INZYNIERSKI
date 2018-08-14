import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from  '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MealDatabaseProvider} from "./../../../providers/database/meal-database";

@IonicPage()
@Component({
  selector: 'page-meals-daybook',
  templateUrl: 'meals-daybook.html',
})
export class MealsDaybookPage {
  
  private meals : FormGroup;
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, 
              private formBuilder: FormBuilder, private database:MealDatabaseProvider) {
      this.meals = this.formBuilder.group({
      hour: ['', Validators.required],
      type: [''],
      amount: [''],
    });
  }

  ionViewDidLoad() {
  }
  
  saveForm(){
    this.database.CreateMeal(this.meals.controls.hour.value,this.meals.controls.type.value,
                             this.meals.controls.amount.value)
      .then((data)=>{
        console.log(data);
      },(error)=>{
        console.log(error);
      })
        this.database.GetAllMeals()
        .then((data)=>{
          console.log(data);
        },(error)=>{console.log(error);
        })

        this.navCtrl.push('DaybookPage');
   }
  
    
}
