import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from  '@angular/forms';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-meals-daybook',
  templateUrl: 'meals-daybook.html',
})
export class MealsDaybookPage {
  private meals : FormGroup;
  constructor(public navCtrl: NavController, private sqlite: SQLite, public navParams: NavParams, private formBuilder: FormBuilder,private storage: Storage ) {
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
  }
}