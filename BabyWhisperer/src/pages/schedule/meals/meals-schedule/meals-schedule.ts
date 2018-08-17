import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { MealProvider, Meals } from '../../../../providers/database/meal-schedule-provider';



@IonicPage()
@Component({
  selector: 'page-meals-schedule',
  templateUrl: 'meals-schedule.html',
})
export class MealsSchedulePage {
  isEdited:boolean = false;
  meals: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private database:MealProvider, private toast: ToastController) {
  }

  ionViewDidEnter() {
    this.database.GetAllMeals().then((result: any[]) => {
      this.meals = result;
    });
    console.log('ionViewDidLoad MealsSchedulePage');
    console.log(this.meals);
    
  }

  loadSchedule(){
  }

  goToNewMeal(){
    this.navCtrl.push('NewMealPage');
  }
  editSchedule(){
    this.isEdited = !this.isEdited;
  }

}
