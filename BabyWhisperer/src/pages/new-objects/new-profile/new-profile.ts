import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '../../../../node_modules/@angular/forms';
import { ChildProfileProvider, Child } from '../../../providers/database/child-profile';
import { GlobalsProvider } from '../../../providers/globals/globals'


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
              public database:ChildProfileProvider, public global:GlobalsProvider) {
    this.child = this.formBuilder.group({
      weight: [''],
      height:[''],
      foot:[''],
    });
  }

  ionViewDidLoad() {
    this.database.GetCurrentProfile(this.global.activeChild).then((result: any[]) => {
      this.profile = result;       
      if(this.profile!=[])
      {
      this.child.controls.weight.setValue(this.profile[0].weight);
      this.child.controls.height.setValue(this.profile[0].height);
      this.child.controls.foot.setValue(this.profile[0].foot);
      }
    });    
  }

  protected saveProfile(){
    this.model.childId = this.global.activeChild;
    this.model.weight = this.correctNumber(this.child.controls.weight.value);
    this.model.height = this.correctNumber(this.child.controls.height.value);
    this.model.foot = this.correctNumber(this.child.controls.foot.value);
    this.model.date = new Date().getDate().toString() +"."+ new Date().getMonth().toString() + "."+new Date().getFullYear().toString();
    console.log(this.model);
    
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
