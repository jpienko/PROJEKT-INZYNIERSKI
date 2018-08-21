import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HeaderColor } from '@ionic-native/header-color';
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
import { CalendarService } from '../../node_modules/ionic2-calendar/calendar.service';
import { DoctorsListProvider } from '../providers/database/doctors';



@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    NgCalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HeaderColor,
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
    DoctorsListProvider

  ]
})
export class AppModule {} 
