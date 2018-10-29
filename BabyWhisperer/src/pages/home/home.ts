
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilesProvider } from '../../providers/database/profiles';
import { ProfilePage } from '../profile/profile';
import { GlobalsProvider } from '../../providers/globals/globals';
import { ChildProfileProvider } from '../../providers/database/child-profile';
import { DiaperDaybookProvider } from '../../providers/database/diaper-daybook';
import { DoctorsListProvider } from '../../providers/database/doctors';
import { GrowthStepsProvider } from '../../providers/database/growth-steps';
import { MealDaybookProvider } from '../../providers/database/meal-daybook';
import { MealScheduleProvider } from '../../providers/database/meal-schedule-provider';
import { NapDaybookProvider } from '../../providers/database/nap-daybook';
import { NapScheduleProvider} from '../../providers/database/nap-schedule';
import { NotesProvider} from '../../providers/database/notes';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  protected profiles: any[];
  protected rootPage:any = ProfilePage;

  constructor(public navCtrl: NavController, private database: ProfilesProvider,
              public global:GlobalsProvider, private childProfile: ChildProfileProvider,
              private diaperDaybook: DiaperDaybookProvider, private docs: DoctorsListProvider,
              private growthSteps: GrowthStepsProvider, private mealDaybook: MealDaybookProvider,
              private mealSchedule: MealScheduleProvider, private napDaybook: NapDaybookProvider,
              private napSchedule:NapScheduleProvider, private notes:NotesProvider ) {}
  
  ionViewDidLoad(){
    this.ionViewDidEnter();
  }

  ionViewDidEnter(){
    this.database.GetAllChildProfiles().then((result: any[]) => {
      this.profiles = result;
    }); 
  }

  protected goToNewChildProfile(){
    let data = {
      editChild: false
    }
    this.navCtrl.push('NewChildPage', data)
  }

  protected editChildProfile(id:number){
    let data = {
      editChild: true,
      childId: id
    }
    this.navCtrl.push('NewChildPage', data)
  }

  protected goToChild(id:number){
    this.global.activeChild = id;
    this.navCtrl.push(ProfilePage);
  }
  
  protected deleteProfile(id:number){
    this.diaperDaybook.deleteByChildID(id).then( x =>
      this.docs.deleteByChildID(id).then( x=>
        this.growthSteps.deleteByChildID(id).then(x =>
          this.mealDaybook.deleteByChildID(id).then(x=>
            this.mealSchedule.deleteByChildID(id).then(x=>
              this.napDaybook.deleteByChildID(id).then(x=>
                this.napSchedule.deleteByChildID(id).then(x=>
                  this.childProfile.deleteByChildID(id).then(x=>
                    this.notes.deleteByChildID(id).then(x=>
                      this.database.remove(id).then( x=>
                        this.ionViewDidEnter()
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  }
}
