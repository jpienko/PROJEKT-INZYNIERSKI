import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { MealScheduleProvider, Meals } from '../../../providers/database/meal-schedule-provider';



@IonicPage()
@Component({
  selector: 'page-meals-schedule',
  templateUrl: 'meals-schedule.html',
})
export class MealsSchedulePage {
  isEdited:boolean = false;
  meals: any[] = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private database:MealScheduleProvider, private toast: ToastController) {
  }

  ionViewDidEnter() {
    this.database.GetAllMeals().then((result: any[]) => {
      this.meals = result;
    });
  }

  loadSchedule(){
  }

  goToNewMeal(){
    let data = {
      napSchedule: true
    }
    this.navCtrl.push('NewMealPage',data);
  }
  editSchedule(){
    this.isEdited = !this.isEdited;
  }

  deleteMeal(meal:Meals){
    console.log(meal);
    this.database.remove(meal.id).then(() => {
      var index = this.meals.indexOf(meal);
      this.meals.splice(index, 1);
      this.toast.create({ message: 'Usunięto', duration: 3000, position: 'botton' }).present();
    })
    
  }
}
