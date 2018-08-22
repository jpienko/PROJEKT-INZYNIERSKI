import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DoctorsListProvider, Docs} from '../../providers/database/doctors';

@IonicPage()
@Component({
  selector: 'page-docs-list',
  templateUrl: 'docs-list.html',
})
export class DocsListPage {
  docs:any[]=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public database:DoctorsListProvider,
              public toast:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocsListPage');
  }
  ionViewDidEnter(){
    this.database.GetAllDocs().then((result:any[])=>{
      this.docs = result;
      console.log(this.docs);
      
    })
  }

  public goToNewDoctor(){
    let data = {
      newDoc: true
    }
    this.navCtrl.push('NewDoctorPage', data);
  }

  public editDoc(doc){
    let data = {
      newDoc: false,
      docId: doc.id
    }
    this.navCtrl.push('NewDoctorPage', data);
  }

  public deleteNap(doc:Docs){
    console.log(doc);
    this.database.remove(doc.id).then(() => {
      var index = this.docs.indexOf(doc);
      this.docs.splice(index, 1);
      this.toast.create({ message: 'Usunięto', duration: 3000, position: 'botton' }).present();
    })
  }

}
