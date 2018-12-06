import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database'
import { File } from '@ionic-native/file';
import { ChildProfileProvider} from '../../providers/database/child-profile';
import { ProfilesProvider } from '../../providers/database/profiles';
import { GlobalsProvider } from '../../providers/globals/globals'
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  protected name:string = ""
  protected birthday:string = "";
  protected height:string = ""
  protected weight:string = ""
  protected foot:string = ""
  protected size:string = ""
  protected diaper:string = ""
  protected time:string = ""
  protected child: any[] = [];
  protected profile:any[]=[];
  protected id:number;
  protected age:string;
  protected imageSrc: any;

  constructor(public navCtrl: NavController, public navParams:NavParams, 
              private database: ChildProfileProvider, private database2: ProfilesProvider, 
              public platform:Platform, public dB:DatabaseProvider, private camera: Camera, 
              private global: GlobalsProvider, private file:File) {}
  
  ionViewDidLoad(){
    this.ionViewDidEnter();
  }

  ionViewDidEnter(){
    this.getChildDetails();
    this.getChildMainInfo();
  }

  private getChildDetails(){
    this.database.GetCurrentProfile(this.global.activeChild).then((result: any[]) => {
      this.child = result;
      this.height = this.child[0].height;
      this.weight = this.child[0].weight;
      this.foot = this.child[0].foot;
      this.id = this.child[0].id;
      this.getClothesSizes();
      this.getDiapersSizes();
    }); 
  }

  private getChildMainInfo(){
    this.database2.get(this.global.activeChild).then((result: any[]) => {
      this.profile = result;
      this.profile.forEach(element => {
       this.name = element.name;
       this.birthday = this.getBirthDate(element.birthday);
       this.time = this.getTimeDiff(element.birthday);
       this.age  = this.getAgeSubtext(this.getAge(element.birthday));
       this.imageSrc = element.picture;
      });
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
    
    if (today.getMonth()< birthDate.getMonth()){
       birthday = (today.getFullYear()).toString() +"-"+(birthDate.getMonth()+1).toString() + "-"+birthDate.getDate().toString()
    }else{
      if (today.getMonth() == birthDate.getMonth()){
        if (today.getDate()>= birthDate.getDate()){
          birthday = (today.getFullYear()+1).toString() +"-"+(birthDate.getMonth()+1).toString() + "-"+birthDate.getDate().toString()
         }else{
           birthday = (today.getFullYear()).toString() +"-"+ (birthDate.getMonth()+1).toString() + "-"+birthDate.getDate().toString()
         }      
      }else{
        birthday = (today.getFullYear()+1).toString() +"-"+(birthDate.getMonth()+1).toString() + "-"+birthDate.getDate().toString()
      }
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

  private getAgeSubtext(age:number){
    if(age==0 || age>4){
      if(age>12){
        return '1 rok'
      }else if(age>24){
        return '2 lata'
      }else{
        return age.toString() + ' miesięcy'
      }
    }else if(age==1){
      return age.toString() + ' miesiąc'
    }else if(age>1 && age<5){
      return age.toString() + ' miesiące'
    }

  }

  protected goToNewProfile(){
    let data = {
      id: this.id,
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
      this.profile[0].picture = this.imageSrc;  
      this.database2.update(this.profile[0]).then((data)=>{},(error)=>{});
    },(err) => {});  
  }

  private getClothesSizes(){
    let sizes;
    this.file.checkDir(this.file.applicationDirectory , "www/assets/mock").then(_=>{
      this.file.readAsText(this.file.applicationDirectory + "www/assets/mock", "clothes-sizes.json").then(text => {
        sizes = JSON.parse(text); 
        sizes.forEach(element => {
          if(element.max>this.height){
            if(element.min<=this.height){
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
