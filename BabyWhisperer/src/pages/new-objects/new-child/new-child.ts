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
  protected isEdit:boolean;
  protected title:string = "Dodaj profil dziecka";
  protected currentProfile:any[]= [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder, 
              public database:ProfilesProvider, private camera: Camera) {
    this.child = this.formBuilder.group({
      name:['', Validators.required],
      birthday: ['', Validators.required],
    });
  }

  ionViewDidEnter() {
    this.isEdit = this.navParams.get('editChild');    
    if(this.isEdit){
      this.title = "Edytuj profil dziecka"
      this.database.get(this.navParams.get('childId')).then((result: any[]) => {
        this.currentProfile = result;         
        this.imageSrc = this.currentProfile[0].picture;
        this.child.controls.name.setValue(this.currentProfile[0].name);
        this.child.controls.birthday.setValue(this.currentProfile[0].birthday);
      });    
    }   
  }

  protected saveProfile(){
    this.model.name = this.child.controls.name.value;
    this.model.birthday = this.child.controls.birthday.value;
    this.model.picture = this.imageSrc;
    this.model.id = this.navParams.get('childId');

    console.log(this.model);
    
    if(this.isEdit){
      this.database.update(this.model)
      .then((data)=>{
      },
      (error)=>{ }
    );

    }else{
      this.database.insert(this.model)
       .then((data)=>{ },
       (error)=>{}
      );
    }
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