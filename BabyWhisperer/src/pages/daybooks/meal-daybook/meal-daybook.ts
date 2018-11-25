import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, AlertController } from 'ionic-angular';
import { Meals } from '../../../providers/database/meal-schedule-provider';
import { MealDaybookProvider } from '../../../providers/database/meal-daybook'
import { GlobalsProvider } from '../../../providers/globals/globals'

@IonicPage()
@Component({
  selector: 'page-meal-daybook',
  templateUrl: 'meal-daybook.html',
})
export class MealDaybookPage {
  protected isEdited:boolean = false;
  protected meals: any[] = [];
  protected dates: any[]=[];
  protected all:any[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private database:MealDaybookProvider,
              public toast:ToastController, private alert:AlertController, public global:GlobalsProvider) {
  }


  ionViewDidEnter() {
    this.getAllMeals(); 
  }

  private getAllMeals() {
    this.all = [];
    this.database.GetAllDates(this.global.activeChild).then((result: any[]) => {
      this.dates = result;
      this.dates.forEach(element => {
        if((+new Date() - +new Date(element.date))/(1000*3600*24)<7){
          this.database.getByDate(element.date, this.global.activeChild).then((result: any[]) => {
            this.meals = result;
            this.all.push({
              date: element.date,
              meal: this.meals
            });
          });
        }
      });
    });
  }

  goToNewMeal(){
    let data = {
      name: false
    }
    this.navCtrl.push('NewMealPage', data);
  }
  editDaybook(){
    this.isEdited = !this.isEdited;
  }

  editMeal(meal){
    let data = {
      name: false,
      edit:true,
      mealId: meal.id
    }
    this.navCtrl.push('NewMealPage', data);
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
              this.ionViewDidEnter();
            })
          }
        }
      ]
    });
    alert.present(); 
  }
}
