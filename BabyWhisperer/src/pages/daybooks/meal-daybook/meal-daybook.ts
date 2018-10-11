import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Meals } from '../../../providers/database/meal-schedule-provider';
import { MealDaybookProvider } from '../../../providers/database/meal-daybook'

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
  childId:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database:MealDaybookProvider,
              public toast:ToastController) {
  }


  ionViewDidEnter() {
    this.database.GetAllDates(this.childId).then((result: any[]) => {
      this.dates = result;
      this.dates.forEach(element => {
       this.database.getByDate(element.date, this.childId).then((result:any[])=>{
          this.meals = result;
          this.all.push({
            date: element.date,
            meal:this.meals
          })
       }) 
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
    this.database.remove(meal.id).then(() => {
      var index = this.meals.indexOf(meal);
      this.meals.splice(index, 1);
      this.toast.create({ message: 'Usunięto', duration: 3000, position: 'botton' }).present();
    })
    
  }
}
