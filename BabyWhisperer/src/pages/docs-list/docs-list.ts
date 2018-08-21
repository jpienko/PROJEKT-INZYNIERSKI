import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DoctorsListProvider} from '../../providers/database/doctors';

@IonicPage()
@Component({
  selector: 'page-docs-list',
  templateUrl: 'docs-list.html',
})
export class DocsListPage {
  docs:any[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public database:DoctorsListProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocsListPage');
  }
  ionViewDidEnter(){
    this.database.GetAllDocs().then((result:any[])=>{
      this.docs = result;
    })
  }

}
