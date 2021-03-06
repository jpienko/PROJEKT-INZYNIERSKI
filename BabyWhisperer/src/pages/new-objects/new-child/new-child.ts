import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
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
  protected isNotValid:boolean = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder, 
              public database:ProfilesProvider, private camera: Camera) {
    this.child = this.formBuilder.group({
      name: new FormControl('',Validators.required),
      birthday: new FormControl('', Validators.required)
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
    if(this.child.valid){
      this.model.picture = this.imageSrc;
      this.model.id = this.navParams.get('childId');
      if(this.isEdit){
        this.database.update(this.model);
      }else{
        this.database.insert(this.model);
      }
      this.navCtrl.pop();
   }else{
    this.isNotValid = true;
   }
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