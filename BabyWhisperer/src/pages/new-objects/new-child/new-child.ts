import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '../../../../node_modules/@angular/forms';
import { ProfilesProvider, Profiles } from '../../../providers/database/profiles';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-new-child',
  templateUrl: 'new-child.html',
})
export class NewChildPage {

  protected child : FormGroup;
  protected model = new Profiles;
  protected imageSrc:string = "";
  protected profile:any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder, 
              public database:ProfilesProvider, private camera: Camera) {
    this.child = this.formBuilder.group({
      name:['', Validators.required],
      birthday: ['', Validators.required],
    });
  }

  protected saveProfile(){
    this.model.name = this.child.controls.name.value;
    this.model.birthday = this.child.controls.birthday.value;
    this.model.picture = this.imageSrc;
    console.log(this.model);

    this.database.insert(this.model)
        .then((data)=>{},
        (error)=>{}
      );
    this.navCtrl.pop();
  }

  protected openGallery () {
    let cameraOptions:CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,      
      quality: 70,
      saveToPhotoAlbum:false,
      correctOrientation: true
    }

    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.imageSrc = 'data:image/jpeg;base64,' + imageData;  
    });  
  }


}