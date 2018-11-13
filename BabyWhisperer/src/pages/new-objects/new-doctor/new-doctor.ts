import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from  '@angular/forms';
import { DoctorsListProvider, Docs } from '../../../providers/database/doctors';

@IonicPage()
@Component({
  selector: 'page-new-doctor',
  templateUrl: 'new-doctor.html',
})
export class NewDoctorPage {
  private isEdit:boolean;
  protected title:string = "Dodaj zaufanego lekarza";
  private docs : FormGroup;
  private editDoctor:any[] = [];
  private model = new Docs();


  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private formBuilder: FormBuilder, private database: DoctorsListProvider) {
    this.docs = this.formBuilder.group({
      name: ['', Validators.required],
      surname: [''],
      specialisation: [''],
      adress: [''],
      tel: ['', Validators.pattern("[0-9]{9}")],
    });
  }

  ionViewDidEnter() {
    this.isEdit = false;
    this.isEdit = !this.navParams.get('newDoc') 
    
    if(this.isEdit){
      this.title = "Edytuj zaufanego lekarza" 
      this.database.get(this.navParams.get('docId')).then((result:any[]) => {
        this.editDoctor = result; 
        this.docs.controls.name.setValue(this.editDoctor[0].name);
        this.docs.controls.surname.setValue(this.editDoctor[0].surname);
        this.docs.controls.specialisation.setValue(this.editDoctor[0].specialisation);
        this.docs.controls.adress.setValue(this.editDoctor[0].adress);
        this.docs.controls.tel.setValue(this.editDoctor[0].tel);
      });    
    }
  }

  protected saveDoc(){
    if(this.docs.valid){
      if(this.isEdit) {
        this.model.id = this.navParams.get('docId');
        this.database.update(this.model);
      }else{
      this.database.insert(this.model);
      }
      this.navCtrl.pop();
    }
  }
   
}


