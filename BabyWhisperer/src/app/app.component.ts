import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DaybookPage }from '../pages/daybooks/daybook/daybook'
import { SchedulesPage }from '../pages/schedule/schedules/schedules'
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav:Nav;
  rootPage:any = HomePage;
  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menu: MenuController) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
      
    });
    this.pages=[
        {title: "Dzienniki", component: DaybookPage},
        {title: "Harmonogramy", component:SchedulesPage }
      ];
  }
  public openPage(page){
    var name:string = page
     this.nav.push(name)
  }
}

