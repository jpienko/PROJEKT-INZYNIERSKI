import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DaybookPage }from '../pages/daybooks/daybook/daybook'
import { DocsListPage }from '../pages/docs-list/docs-list'
import { GuidebooksPage }from '../pages/guidebook/guidebooks/guidebooks'
import { StatsPage }from '../pages/statistics/stats/stats'
import { SchedulesPage }from '../pages/schedule/schedules/schedules'
import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database'
import { newDB } from '../providers/database/new-database';
import { GrowingStepsPage } from '../pages/growing-steps/growing-steps';
import { NotesPage } from '../pages/notes/notes';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav:Nav;
  protected rootPage:any = HomePage;
  protected pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menu: MenuController, private dB: DatabaseProvider) {
    
    platform.ready().then(() => {
      if(newDB){
        this.dB.dropDB();
      }
      
      dB.createDatabase()
        .then(() => {
          splashScreen.hide();
          statusBar.styleDefault();
        })
        .catch(() => {
          splashScreen.hide();
        });
      
    });
    this.pages=[
        {title: "Strona główna", component: HomePage},
        {title: "Dzienniki", component: DaybookPage},
        {title: "Harmonogramy", component:SchedulesPage },
        {title: "Lista zaufanych lekarzy", component:DocsListPage},
        {title: "Statystyki", component: StatsPage},
        {title: "Poradniki", component: GuidebooksPage},
        {title: "Notatki", component: NotesPage},
        {title: "Etapy rozwojowe", component: GrowingStepsPage}
      ];
  }
  public openPage(page){
    var name:string = page
     this.nav.push(name)
  }
}

