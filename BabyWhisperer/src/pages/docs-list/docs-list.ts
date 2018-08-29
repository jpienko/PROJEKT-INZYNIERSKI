import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DoctorsListProvider, Docs} from '../../providers/database/doctors';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-docs-list',
  templateUrl: 'docs-list.html',
})
export class DocsListPage {
  docs:any[]=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public database:DoctorsListProvider,
              public toast:ToastController, private callNumber: CallNumber) {
  }

  ionViewDidEnter(){
    this.database.GetAllDocs().then((result:any[])=>{
      this.docs = result;
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

  public deleteDoc(doc:Docs){
    this.database.remove(doc.id).then(() => {
      var index = this.docs.indexOf(doc);
      this.docs.splice(index, 1);
      this.toast.create({ message: 'Usunięto', duration: 3000, position: 'botton' }).present();
    })
  }

  public call(tel:number){
    this.callNumber.callNumber(tel.toString(), true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

}
