import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { MealScheduleProvider, Meals } from '../../../providers/database/meal-schedule-provider';
import { GlobalsProvider } from '../../../providers/globals/globals'
import { AlertController } from 'ionic-angular';

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
              public global:GlobalsProvider,private alert:AlertController) {}

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
    let alert = this.alert.create({
      title: 'Wymagane potwierdzenie',
      message: 'Czy na pewno chcesz usunąć? Po zatwierdzeniu odzyskanie danych jest niemożliwe.',
      buttons: [
        {
          text: 'Anuluj',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Usuń',
          handler: () => {
            this.database.remove(meal.id).then(() => {
              var index = this.meals.indexOf(meal);
              this.meals.splice(index, 1);
              this.toast.create({ message: 'Usunięto', duration: 3000, position: 'botton' }).present();
            })
          }
        }
      ]
    });
    alert.present(); 
  }
}
