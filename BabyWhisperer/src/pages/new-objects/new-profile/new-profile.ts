import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '../../../../node_modules/@angular/forms';
import { ChildProfileProvider, Child } from '../../../providers/database/child-profile';



@IonicPage()
@Component({
  selector: 'page-new-profile',
  templateUrl: 'new-profile.html',
})
export class NewProfilePage {
  protected child : FormGroup;
  protected model = new Child;
  protected profile:any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder, 
              public database:ChildProfileProvider) {
    this.child = this.formBuilder.group({
      name:['', Validators.required],
      birthday: ['', Validators.required],
      weight: [''],
      height:[''],
      foot:[''],
    });
  }

  ionViewDidLoad() {
    this.database.get(this.navParams.get('id')).then((result: any[]) => {
      this.profile = result;     
      this.child.controls.name.setValue(this.profile[0].name);
      this.child.controls.birthday.setValue(this.profile[0].birthday);    
      this.child.controls.weight.setValue(this.profile[0].weight);
      this.child.controls.height.setValue(this.profile[0].height);
      this.child.controls.foot.setValue(this.profile[0].foot);
    });    
  }

  protected saveProfile(){
    this.model.name = this.child.controls.name.value;
    this.model.birthday = this.child.controls.birthday.value;
    this.model.weight = this.correctNumber(this.child.controls.weight.value);
    this.model.height = this.correctNumber(this.child.controls.height.value);
    this.model.foot = this.correctNumber(this.child.controls.foot.value);
    this.model.id = this.navParams.get("id");
    this.model.date = new Date().toDateString();
    console.log(this.model);
    
    this.database.update(this.model)
        .then((data)=>{
          console.log(data);
        },(error)=>{
          console.log(error);
    });

    this.database.insert(this.model)
        .then((data)=>{
          console.log(data);
        },(error)=>{
          console.log(error);
    });

    this.navCtrl.pop();
  }

  private correctNumber(value:any){ 
    return parseFloat(value.toString().replace(',','.')) 
  }
}
