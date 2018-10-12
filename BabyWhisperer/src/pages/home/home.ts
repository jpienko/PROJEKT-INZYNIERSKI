
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database'
import { ProfilesProvider, Profiles } from '../../providers/database/profiles';
import {ProfilePage} from '../profile/profile'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  protected profiles: any[];
  protected rootPage:any = ProfilePage;

  constructor(public navCtrl: NavController, private ms:DatabaseProvider, private database: ProfilesProvider) {}
  
  ionViewDidLoad(){
    this.ionViewDidEnter();
  }

  ionViewDidEnter(){
    this.database.GetAllChildProfiles().then((result: any[]) => {
      this.profiles = result;
    }); 
  }

  protected goToNewChildProfile(){
    this.navCtrl.push('NewChildPage')
  }

  protected goToChild(id:number){
    let data = {
      childId: id
    }
    this.navCtrl.push(ProfilePage,data);
  }
  
}
