import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from  '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-new-doctor',
  templateUrl: 'new-doctor.html',
})
export class NewDoctorPage {
  private docs : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.docs = this.formBuilder.group({
      name: ['', Validators.required],
      surname: [''],
      specialisation: [''],
      adress: [''],
      tel: [''],

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewDoctorPage');
  }

}
