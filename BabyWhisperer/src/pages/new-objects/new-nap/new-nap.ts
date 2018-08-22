import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from  '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NapScheduleProvider,Naps} from "../../../providers/database/nap-schedule";
import { NapDaybookProvider } from '../../../providers/database/nap-daybook';

@IonicPage()
@Component({
  selector: 'page-new-nap',
  templateUrl: 'new-nap.html',
})
export class NewNapPage {

  model = new Naps;
  private naps : FormGroup;
  public isEdit:boolean;
  private editNaps: any[] = [];
  protected title:string = "Dodaj drzemkę do harmonogramu";
  protected buttonName:string = "Zapisz drzemkę";

 
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, 
              private formBuilder: FormBuilder, private database:NapScheduleProvider, private database2:NapDaybookProvider) {
                
      this.naps = this.formBuilder.group({
      date:['', Validators.required],
      hourStart: ['', Validators.required],
      hourStop: ['']
    });
  }

  ionViewDidEnter() {
    this.isEdit = false;
    this.isEdit = this.navParams.get('editNap') 

    if(!this.navParams.get('napSchedule')){
      this.title = "Dodaj drzemkę do dziennika";
      if(this.isEdit){
        this.title = "Edytuj drzemkę"
        this.buttonName = "Edytuj drzemkę";
        this.database2.get(this.navParams.get('napId')).then((result: any[]) => {
          this.editNaps = result;     
          this.naps.controls.hourStart.setValue(this.editNaps[0].hourStart);
          this.naps.controls.hourStop.setValue(this.editNaps[0].hourStop);    
          this.naps.controls.date.setValue(this.editNaps[0].date);
        });    
      }
    }
    
  }
  
  
  protected saveNap(){
    
    this.model.hourStart = this.naps.controls.hourStart.value;
    this.model.hourStop = this.naps.controls.hourStop.value;
    this.model.date = this.naps.controls.date.value;
    this.model.time = this.getDiff(this.model.hourStart,this.model.hourStop);
    
    
    if (this.navParams.get('napSchedule')){  
      this.database.insert(this.model)
        .then((data)=>{
          console.log(data);
        },(error)=>{
          console.log(error);
        })
    } 
    else{   
      if(this.isEdit) {
        this.model.id = this.navParams.get('napId');
        this.database2.update(this.model)
        .then((data)=>{
          console.log(data);
        },(error)=>{
          console.log(error);
        })
        this.navCtrl.pop();
      }
      else{
      this.database2.insert(this.model)
        .then((data)=>{
          console.log(data);
        },(error)=>{
          console.log(error);
        })
      }
    }
  
   this.naps.reset();
  }

  public getDiff(start,stop):number {
    
    let startNap = start.split(":");
    let stopNap = stop.split(":");

    console.log(startNap);
    console.log(stopNap);

    if(stopNap[1]>startNap[1]){
      var mins = stopNap[1]-startNap[1];
      var hours = stopNap[0]-startNap[0];
    }else{
      var mins = stopNap[1]-startNap[1]+60;
      var hours = stopNap[0]-startNap[0]-1;
    }
     console.log(mins);
     console.log(hours);
     
     
    return hours + (mins/60);
    
  }
}
