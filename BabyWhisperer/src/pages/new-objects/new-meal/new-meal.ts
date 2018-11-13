import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from  '@angular/forms';
import { MealScheduleProvider, Meals} from "./../../../providers/database/meal-schedule-provider";
import { MealsTypes} from "./../../../assets/enums/meals-types.enum"
import { MealDaybookProvider } from '../../../providers/database/meal-daybook';
import { GlobalsProvider } from '../../../providers/globals/globals'

@IonicPage()
@Component({
  selector: 'page-new-meal',
  templateUrl: 'new-meal.html',
})
export class NewMealPage {
  private model = new Meals;
  private meals : FormGroup;
  public isEdit:boolean;
  public isDaybook:boolean;
  private editMeals: any[] = [];
  protected title:string = "Dodaj posiłek do harmonogramu";
  protected buttonName:string = "Zapisz posiłek";
  protected maxDate = new Date().toISOString();
  protected types: string[] = Object.keys(MealsTypes);
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private formBuilder: FormBuilder, private database:MealScheduleProvider, 
              private database2:MealDaybookProvider, private global:GlobalsProvider) {
                
      this.meals = this.formBuilder.group({
      date:[''],
      hour: ['', Validators.required],
      type: [''],
      description: [''],
    });
  }

  ionViewDidEnter() {
    this.types = this.types.slice(this.types.length / 2);
    this.isEdit = false;
    this.isEdit = this.navParams.get('edit');
    this.isDaybook = !this.navParams.get('name');

    if(!this.navParams.get('name')){
      this.title = "Dodaj posiłek do dziennika";
      if(this.isEdit){
        this.title = "Edytuj posiłek"
        this.buttonName = "Edytuj posiłek";
        this.database2.get(this.navParams.get('mealId')).then((result: any[]) => {
          this.editMeals = result;     
          this.meals.controls.description.setValue(this.editMeals[0].description);
          this.meals.controls.type.setValue(this.editMeals[0].type);
          this.meals.controls.hour.setValue(this.editMeals[0].hour);
          this.meals.controls.date.setValue(this.editMeals[0].date);
        });    
      }
    }
  }
  
  
  protected saveForm(){
    
    this.model.hour = this.meals.controls.hour.value;
    this.model.type = this.meals.controls.type.value;
    this.model.description = this.meals.controls.description.value;
    this.model.date = this.meals.controls.date.value;
    this.model.childID = this.global.activeChild;

    if (this.navParams.get('name')){  
      this.database.insert(this.model)
        .then((data)=>{
        },(error)=>{
        })
    }else{   
      if(this.isEdit) {
        this.model.id = this.navParams.get('mealId');
        this.database2.update(this.model)
        .then((data)=>{
        },(error)=>{
        })
        this.navCtrl.pop();
      }else{
      this.database2.insert(this.model)
        .then((data)=>{
        },(error)=>{
        })
      }
    }
   this.meals.reset();
   this.navCtrl.pop();
  }
    
}
