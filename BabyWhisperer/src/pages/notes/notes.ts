import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,AlertController } from 'ionic-angular';
import { NotesProvider, Note} from '../../providers/database/notes';
import { NotesCategories} from "./../../assets/enums/notes-categories.enum"
import { GlobalsProvider } from '../../providers/globals/globals'

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
              public database:NotesProvider, public toast:ToastController,
              private alert:AlertController, private globals:GlobalsProvider) {
  }

  ionViewDidEnter(){
    this.all = [];
    this.categories = Object.keys(NotesCategories);
    this.categories = this.categories.slice(this.categories.length / 2);
    this.categories.forEach(element => {
      this.all.push(
        {
          category: element,
          notes:[]
        }
      )
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
    let alert = this.alert.create({
      title: 'Wymagane potwierdzenie',
      message: 'Czy na pewno chcesz usunąć? Po zatwierdzeniu odzyskanie danych jest niemożliwe.',
      buttons: [
        {
          text: 'Anuluj',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Usuń',
          handler: () => {
            this.database.remove(note.id).then(() => {
              var index = this.notes.indexOf(note);
              this.notes.splice(index, 1);
              this.toast.create({ message: 'Usunięto', duration: 3000, position: 'botton' }).present();
            })
          }
        }
      ]
    });
    alert.present(); 
    
  }

  protected loadNotes(category){
    this.all.forEach(element => {
      if (element.category == category){
        this.database.getNotes(element.category, this.globals.activeChild).then((result:any[])=>{
          this.notes = result; 
          element.notes = this.notes
        })
      }else{
        element.notes = [];
      }  
    });  
  }
}
