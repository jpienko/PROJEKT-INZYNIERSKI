import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NotesProvider, Note} from '../../providers/database/notes';
import { NotesCategories} from "./../../assets/enums/notes-categories.enum"

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {
  protected all:any[]=[];
  protected notes:any[]=[];
  protected categories: string[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public database:NotesProvider, public toast:ToastController) {
  }

  ionViewDidEnter(){
    this.all = [];
    this.categories = Object.keys(NotesCategories);
    this.categories = this.categories.slice(this.categories.length / 2);
    this.categories.forEach(element => {
      this.database.getNotes(element).then((result:any[])=>{
        this.notes = result;
        this.all.push(
          {
            category: element,
            notes:this.notes
          }
        )
      })
    });  
  }

  protected goToNewNote(){
    let data = {
      newNote: true
    }
    this.navCtrl.push('NewNotePage', data);
  }

  protected editNote(id:number){
    let data = {
      newNote: false,
      noteId: id
    }
    this.navCtrl.push('NewNotePage', data);
  }

  protected deleteDoc(note:Note){
    this.database.remove(note.id).then(() => {
      var index = this.notes.indexOf(note);
      this.notes.splice(index, 1);
      this.toast.create({ message: 'Usunięto', duration: 3000, position: 'botton' }).present();
    })
  }

}
