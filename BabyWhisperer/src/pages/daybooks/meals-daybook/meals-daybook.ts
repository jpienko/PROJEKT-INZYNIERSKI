import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from  '@angular/forms';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import {map } from 'rxjs/operators';
import {Meals} from './meals'

@IonicPage()
@Component({
  selector: 'page-meals-daybook',
  templateUrl: 'meals-daybook.html',
})
export class MealsDaybookPage {
   meals2: Array<Meals>;
  private meals : FormGroup;
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, private formBuilder: FormBuilder,private storage: Storage) {
    this.meals = this.formBuilder.group({
      hour: ['', Validators.required],
      type: [''],
      amount: [''],
    });
  }

  ionViewDidLoad() {

  }


  saveForm(){
    console.log(this.meals.value)
    console.log('abc')
    this.storage.set('Test',this.meals.value);

    // Or to get a key/value pair
    this.storage.get('Test').then((val) => {
      console.log('New meal:', val);
    });
    this.getLocalData();
    this.pushLocalFile();
    this.getLocalData();
  }
  getLocalData() {
    this.http
      .get('../assets/mock/meals.json')
      .pipe(map(data => data as Array<Meals>))
      .subscribe(data => {
        console.log(data);
        
      }); 
  }

  pushLocalFile(){
    this.http
    .post('../assets/mock/meals.json',{hour:"10:24", type:"kk", amount:"ll"});
  }
}
