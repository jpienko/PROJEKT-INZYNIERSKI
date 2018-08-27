import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { DiaperDaybookProvider, Diaper } from '../../../providers/database/diaper-daybook';


@IonicPage()
@Component({
  selector: 'page-new-diaper',
  templateUrl: 'new-diaper.html',
})
export class NewDiaperPage {

  private model = new Diaper;
  private diapers : FormGroup;
  public isEdit:boolean = false;
  private editDiaper: any[] = [];
  protected title:string = "Dodaj przewijanie do dziennika";
  protected buttonName:string = "Zapisz przewijanie";
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private formBuilder: FormBuilder, private database: DiaperDaybookProvider) {
                
      this.diapers = this.formBuilder.group({
      date:[''],
      hour: ['', Validators.required],
      type: [''],
    });
    this.diapers.controls.type.setValue(false);
  }

  ionViewDidEnter() {
    this.isEdit = this.navParams.get('editDiaper');
    if(this.isEdit){
      this.title = "Edytuj posiłek"
      this.buttonName = "Edytuj posiłek";
      this.database.get(this.navParams.get('diaperId')).then((result: any[]) => {
        this.editDiaper = result;     
        console.log(this.editDiaper);
        
        this.diapers.controls.type.setValue(this.editDiaper[0].type);
        this.diapers.controls.hour.setValue(this.editDiaper[0].hour);
        this.diapers.controls.date.setValue(this.editDiaper[0].date);
      });    
    }   
  }

  protected saveForm(){
    this.model.hour = this.diapers.controls.hour.value;
    this.model.type = this.diapers.controls.type.value;

    this.model.date = this.diapers.controls.date.value;
    console.log(this.model);

    if(this.isEdit) {
      this.model.id = this.navParams.get('diaperId');
      this.database.update(this.model)
        .then((data)=>{
          console.log(data);
        },(error)=>{
          console.log(error);
        })
        this.navCtrl.pop();
    }else{
    this.database.insert(this.model)
        .then((data)=>{
          console.log(data);
        },(error)=>{
          console.log(error);
        })
      }
    this.diapers.reset();
  }
   
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewDiaperPage');
  }

}
