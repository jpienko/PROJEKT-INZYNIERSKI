import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from  '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MealScheduleProvider,Meals} from "../../../providers/database/meal-schedule-provider";
import { MealsTypes} from "../../../assets/enums/meals-types.enum"
import { MealDaybookProvider } from '../../../providers/database/meal-daybook';

@IonicPage()
@Component({
  selector: 'page-new-nap',
  templateUrl: 'new-nap.html',
})
export class NewNapPage {

  model = new Meals;
  private meals : FormGroup;
  public isEdit:boolean;
  private editMeals: any[] = [];
  private title:string = "Dodaj posiłek do harmonogramu";
  private buttonName:string = "Zapisz posiłek";

  protected types: string[] = Object.keys(MealsTypes);
  
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, 
              private formBuilder: FormBuilder, private database:MealScheduleProvider, private database2:MealDaybookProvider) {
                
      this.meals = this.formBuilder.group({
      hour: ['', Validators.required],
      type: [''],
      description: [''],
    });
  }

  ionViewDidEnter() {
    this.types = this.types.slice(this.types.length / 2);
    this.isEdit = false;
    this.isEdit = this.navParams.get('edit') 

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
        });    
      }
    }
    
  }
  
  
  saveForm(){
    
    this.model.hour = this.meals.controls.hour.value;
    this.model.type = this.meals.controls.type.value;
    this.model.description = this.meals.controls.description.value;
    console.log(this.model);

    if (this.navParams.get('name')){  
      this.database.insert(this.model)
        .then((data)=>{
          console.log(data);
        },(error)=>{
          console.log(error);
        })
    } 
    else{   
      if(this.isEdit) {
        this.model.id = this.navParams.get('mealId');
        this.database2.update(this.model)
        .then((data)=>{
          console.log(data);
        },(error)=>{
          console.log(error);
        })
      }
      else{
      this.database2.insert(this.model)
        .then((data)=>{
          console.log(data);
        },(error)=>{
          console.log(error);
        })
      }
    }
   this.meals.reset();
  }

}
