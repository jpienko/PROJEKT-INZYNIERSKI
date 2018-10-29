import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { MealScheduleProvider, Meals } from '../../../providers/database/meal-schedule-provider';
import { GlobalsProvider } from '../../../providers/globals/globals'



@IonicPage()
@Component({
  selector: 'page-meals-schedule',
  templateUrl: 'meals-schedule.html',
})
export class MealsSchedulePage {
  protected isEdited:boolean = false;
  protected meals: any[] = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private database:MealScheduleProvider, private toast: ToastController,
              public global:GlobalsProvider) {}

  ionViewDidEnter() {
    this.database.GetAllMeals(this.global.activeChild).then((result: any[]) => {
      this.meals = result;
    });
  }

  goToNewMeal(){
    let data = {
      name: true
    }
    this.navCtrl.push('NewMealPage',data);
  }

  editSchedule(){
    this.isEdited = !this.isEdited;
  }

  deleteMeal(meal:Meals){
    this.database.remove(meal.id).then(() => {
      var index = this.meals.indexOf(meal);
      this.meals.splice(index, 1);
      this.toast.create({ message: 'Usunięto', duration: 3000, position: 'botton' }).present();
    })
  }
}
