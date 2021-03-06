import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from  '@angular/forms';
import { NotesProvider, Note} from "./../../../providers/database/notes";
import { NotesCategories} from "./../../../assets/enums/notes-categories.enum";
import { GlobalsProvider } from '../../../providers/globals/globals'

@IonicPage()
@Component({
  selector: 'page-new-note',
  templateUrl: 'new-note.html',
})
export class NewNotePage {
  private model = new Note;
  private notes : FormGroup;
  public isEdit:boolean;
  private editNotes: any[] = [];
  protected title:string = "Nowa notatka";
  protected buttonName:string = "Zapisz notatkę";
  protected isNotValid:boolean = false;
  protected categories: string[] = Object.keys(NotesCategories);
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private formBuilder: FormBuilder, private globals:GlobalsProvider,
              private database:NotesProvider) {
                
      this.notes = this.formBuilder.group({
      title:['', Validators.required],
      categories: ['', Validators.required],
      description: [''],
    });
  }

  ionViewDidEnter() {
    if(this.navParams.get('back')){
      this.navCtrl.popAll();
    }
    this.getTypeOfPage();
  }
  
  private getTypeOfPage() {
    this.categories = this.categories.slice(this.categories.length / 2);
    this.isEdit = false;
    this.isEdit = !this.navParams.get('newNote');
    if (this.isEdit) {
      this.title = "Edytuj notatkę";
      this.buttonName = "Zapisz notatkę";
      this.database.get(this.navParams.get('noteId')).then((result: any[]) => {
        this.editNotes = result;
        this.notes.controls.description.setValue(this.editNotes[0].note);
        this.notes.controls.title.setValue(this.editNotes[0].title);
        this.notes.controls.categories.setValue(this.editNotes[0].category);
      });
    }
  }

  protected saveNote(){
    if(this.notes.valid){
    var today = new Date;
    this.model.title = this.notes.controls.title.value;
    this.model.category = this.notes.controls.categories.value;
    this.model.note = this.notes.controls.description.value;
    this.model.date = today.getDate().toString() +"-" + (today.getMonth()+1).toString()+ "-" + today.getFullYear().toString();
    this.model.childId = this.globals.activeChild;

    if(this.isEdit){
      this.model.id = this.navParams.get('noteId');
      this.database.update(this.model).then((data)=>{},(error)=>{})
      this.navCtrl.pop();
    }else{
      this.database.insert(this.model).then((data)=>{},(error)=>{})
      this.navCtrl.pop();
    }
   this.notes.reset();
  }else{
    this.isNotValid = true;
  }
}
}
