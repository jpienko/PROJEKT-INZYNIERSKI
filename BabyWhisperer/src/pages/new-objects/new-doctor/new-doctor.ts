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
      tel: [''],
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
    this.model.name = this.docs.controls.name.value;
    this.model.surname = this.docs.controls.surname.value;
    this.model.specialisation = this.docs.controls.specialisation.value;
    this.model.adress = this.docs.controls.adress.value;
    this.model.tel = this.docs.controls.tel.value;
     
    if(this.isEdit) {
      this.model.id = this.navParams.get('mealId');
      this.database.update(this.model).then((data)=>{
        },(error)=>{
        })
      this.navCtrl.pop();
    }else{
    this.database.insert(this.model).then((data)=>{
      },(error)=>{
      })
    }
    this.docs.reset();
    this.navCtrl.pop();
  }
   
}


