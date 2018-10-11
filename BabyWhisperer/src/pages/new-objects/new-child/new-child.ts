import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '../../../../node_modules/@angular/forms';
import { ProfilesProvider, Profiles } from '../../../providers/database/profiles';


@IonicPage()
@Component({
  selector: 'page-new-child',
  templateUrl: 'new-child.html',
})
export class NewChildPage {

  protected child : FormGroup;
  protected model = new Profiles;
  protected profile:any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder, 
              public database:ProfilesProvider) {
    this.child = this.formBuilder.group({
      name:['', Validators.required],
      birthday: ['', Validators.required],
    });
  }

  protected saveProfile(){
    this.model.name = this.child.controls.name.value;
    this.model.birthday = this.child.controls.birthday.value;
    console.log(this.model);

    this.database.insert(this.model)
        .then((data)=>{
          console.log(data);
        },(error)=>{
          console.log(error);
    });

    this.navCtrl.pop();
  }
}