
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilesProvider } from '../../providers/database/profiles';
import {ProfilePage} from '../profile/profile';
import {GlobalsProvider} from '../../providers/globals/globals'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  protected profiles: any[];
  protected rootPage:any = ProfilePage;

  constructor(public navCtrl: NavController, private database: ProfilesProvider,
              public global:GlobalsProvider) {}
  
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
    this.global.activeChild = id;
    this.navCtrl.push(ProfilePage);
  }
  
}
