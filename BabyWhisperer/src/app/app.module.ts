import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SQLite} from '@ionic-native/sqlite';
import { HttpClientModule } from '@angular/common/http';
import { MealDaybookProvider } from '../providers/database/meal-daybook';
import { DatabaseProvider } from '../providers/database/database';
import { MealScheduleProvider } from '../providers/database/meal-schedule-provider';
import { NapDaybookProvider } from '../providers/database/nap-daybook';
import { NapScheduleProvider } from '../providers/database/nap-schedule';
import { Calendar } from '@ionic-native/calendar'
import { NgCalendarModule  } from 'ionic2-calendar';
import { DoctorVisitsProvider } from '../providers/database/doctor-visits';
import { CalendarComponent } from "ionic2-calendar/calendar";
import { CalendarService } from 'ionic2-calendar/calendar.service';
import { DoctorsListProvider } from '../providers/database/doctors';
import { HttpModule, JsonpModule, Http } from '@angular/http';
import { File } from '@ionic-native/file'
import { DiaperDaybookProvider } from '../providers/database/diaper-daybook';
import { DaybookPage } from '../pages/daybooks/daybook/daybook';
import { DocsListPage } from '../pages/docs-list/docs-list';
import { SchedulesPage } from '../pages/schedule/schedules/schedules';
import { StatsPage } from '../pages/statistics/stats/stats';
import { GuidebooksPage } from '../pages/guidebook/guidebooks/guidebooks';
import { ChildProfileProvider } from '../providers/database/child-profile';
import { Camera } from '@ionic-native/camera';
import { CallNumber } from '@ionic-native/call-number';
import { GrowingStepsPage } from '../pages/steps/growing-steps/growing-steps';
import { GrowthStepsProvider } from '../providers/database/growth-steps';
import { NotesProvider } from '../providers/database/notes';
import { NotesPage } from '../pages/notes/notes';
import { ProfilesProvider } from '../providers/database/profiles';
import { ProfilePage } from '../pages/profile/profile';
import { GlobalsProvider } from '../providers/globals/globals';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { AlertController } from 'ionic-angular';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DaybookPage,
    SchedulesPage,
    DocsListPage,
    StatsPage,
    GuidebooksPage,
    GrowingStepsPage,
    NotesPage,
    ProfilePage,
    TutorialPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      monthNames:['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień' ],
      dayNames:["Pn","Wt","Śr","Czw","Pt","So","Nd"]
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    NgCalendarModule,
    HttpModule,
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DaybookPage,
    DocsListPage,
    SchedulesPage,
    StatsPage,
    GuidebooksPage,
    GrowingStepsPage,
    NotesPage,
    ProfilePage,
    TutorialPage
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pl' },
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    MealDaybookProvider,
    DatabaseProvider,
    MealScheduleProvider,
    NapDaybookProvider,
    Calendar,
    NapScheduleProvider,
    DoctorVisitsProvider,
    CalendarComponent,
    CalendarService,
    DoctorsListProvider,
    DiaperDaybookProvider,
    Http,
    HttpModule,
    File,
    ChildProfileProvider,
    Camera,
    CallNumber,
    GrowthStepsProvider,
    NotesProvider,
    ProfilesProvider,
    GlobalsProvider,
    AlertController
  ]
})
export class AppModule {} 
