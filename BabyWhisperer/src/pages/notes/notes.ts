import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NotesProvider, Note} from '../../providers/database/notes';

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {

   notes:any[]=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public database:NotesProvider, public toast:ToastController) {
  }

  ionViewDidEnter(){
    this.database.getAllNotes().then((result:any[])=>{
      this.notes = result;
    })
  }

  public goToNewNote(){
    let data = {
      newNote: true
    }
    this.navCtrl.push('NewNotePage', data);
  }

  public editNote(id:number){
    let data = {
      newNote: false,
      noteId: id
    }
    this.navCtrl.push('NewNotePage', data);
  }

  public deleteDoc(note:Note){
    this.database.remove(note.id).then(() => {
      var index = this.notes.indexOf(note);
      this.notes.splice(index, 1);
      this.toast.create({ message: 'Usunięto', duration: 3000, position: 'botton' }).present();
    })
  }

}
