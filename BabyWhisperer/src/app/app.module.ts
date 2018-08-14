import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HeaderColor } from '../../node_modules/@ionic-native/header-color';
import { SQLite} from '@ionic-native/sqlite';
import {File} from '@ionic-native/file';
import { HttpClientModule } from '@angular/common/http';
import { OtherDatabaseProvider } from '../providers/other-database/other-database';
import { MealDatabaseProvider } from '../providers/meal-database/meal-database';



@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
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
    File,
    OtherDatabaseProvider,
    MealDatabaseProvider
  ]
})
export class AppModule {} 
