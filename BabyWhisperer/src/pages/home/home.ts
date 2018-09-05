
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database'
import { File } from '@ionic-native/file';
import { ChildProfileProvider, Child } from '../../providers/database/child-profile';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  protected name:string = ""
  protected birthday:string = "";
  protected height:string = ""
  protected weight:string = ""
  protected foot:string = ""
  protected size:string = ""
  protected diaper:string = ""
  protected time:string = ""
  protected child: any[] = [];
  protected id:number;
  protected age:number;
  protected imageSrc: any;

  constructor(public navCtrl: NavController, private ms:DatabaseProvider, private database: ChildProfileProvider, 
              public platform:Platform, public dB:DatabaseProvider, private camera: Camera, private file:File) {}
  
  ionViewDidLoad(){
    this.ionViewDidEnter();
  }

  ionViewDidEnter(){
          
      this.database.get(1).then((result: any[]) => {
        this.child = result;
        this.child.forEach(element => {
          this.name = element.name;
          this.birthday = this.getBirthDate(element.birthday);
          this.height = element.height;
          this.weight = element.weight;
          this.foot = element.foot;
          this.imageSrc = element.picture;
          this.time = this.getTimeDiff(element.birthday);
          this.id = element.id;
          this.age  = this.getAge(element.birthday);
        });
        this.getClothesSizes();
        this.getDiapersSizes();
      }); 
    
  }

  private getTimeDiff(birthday:string){
    let birthDate = new Date(this.getNextBirthDate(birthday));
    let today = new Date();   
    return parseInt(((+birthDate - +today)/(1000*3600*24)).toString()).toString();
  }

  private getNextBirthDate(birth:string){
    var today = new Date();
    var birthDate = new Date(birth);
    var birthday:string;
    
    if (today.getMonth()<= birthDate.getMonth()){
      if (today.getDay()<= birthDate.getDay()){
       birthday = today.getFullYear().toString() +"-"+(birthDate.getMonth()+1).toString() + "-"+birthDate.getDate().toString()
      }else{
        birthday = (today.getFullYear()+1).toString() +"-"+ (birthDate.getMonth()+1).toString() + "-"+birthDate.getDate().toString()
      }
    }else{
      birthday = (today.getFullYear()+1).toString() +"-"+(birthDate.getMonth()+1).toString() + "-"+birthDate.getDate().toString()
    }  
    return birthday;
  } 

  private getBirthDate(birth:string){
   var birthday = new Date(birth);
   return birthday.getDate().toString() + "-"+ (birthday.getMonth()+1).toString()+ "-" +birthday.getFullYear().toString();
  }

  private getAge(birthDate:string){
    let birthday = new Date(birthDate);
    let today = new Date();
    return parseInt(((+today - +birthday)/(1000*3600*24*30)).toString());
  }

  protected goToNewProfile(){
    let data = {
      id: this.id
    }
    this.navCtrl.push("NewProfilePage", data);
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
      this.child[0].picture = this.imageSrc;  
      this.database.update(this.child[0]).then((data)=>{
        console.log(data);
      },(error)=>{
        console.log(error);
      });
     },(err) => {
      console.log(err);  
    });  
  }

  private getClothesSizes(){
    let sizes;
    this.file.checkDir(this.file.applicationDirectory , "www/assets/mock").then(_=>{
      this.file.readAsText(this.file.applicationDirectory + "www/assets/mock", "clothes-sizes.json").then(text => {
        sizes = JSON.parse(text); 
        sizes.forEach(element => {
          if(element.max>this.height){
            if(element.min<this.height){
               this.size = element.size;
            
            }
          }
        });
      }).catch(err => {})
    });
    
  }

  private getDiapersSizes(){
    this.diaper = "";
    let sizes;
    this.file.checkDir(this.file.applicationDirectory , "www/assets/mock").then(_=>{
      this.file.readAsText(this.file.applicationDirectory + "www/assets/mock", "diapers-sizes.json").then(text => {
        sizes = JSON.parse(text);
        sizes.forEach(element => {
          if(element.min<=this.weight && element.max>this.weight){
            if (this.diaper==""){
              this.diaper = element.size
            }else{
              this.diaper = this.diaper + " lub " + element.size
            } 
          }
        });
      }).catch(err => {})
    });
  }

  
}
