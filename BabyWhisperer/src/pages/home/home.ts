import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database'
import { newDB } from '../../providers/database/new-database';
import { ChildProfileProvider } from '../../providers/database/child-profile';
import { NewDoctorPage } from '../new-objects/new-doctor/new-doctor';


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
  protected picture: string;
  protected id:number;
  protected age:number;

  constructor(public navCtrl: NavController, private ms:DatabaseProvider, private database: ChildProfileProvider, 
              public platform:Platform, public dB:DatabaseProvider) {}
  

  ionViewDidEnter(){
    this.platform.ready().then(()=>{      
      this.database.get(1).then((result: any[]) => {
      this.child = result;
      this.child.forEach(element => {
        this.name = element.name;
        this.birthday = this.getBirthDate(element.birthday);
        this.height = element.height;
        this.weight = element.weight;
        this.foot = element.foot;
        this.picture = element.picture;
        this.time = this.getTimeDiff(element.birthday);
        this.id = element.id;
        this.age  = this.getAge(element.birthday);
      });
      console.log(this.child);
    }); 
    })
    
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
}
