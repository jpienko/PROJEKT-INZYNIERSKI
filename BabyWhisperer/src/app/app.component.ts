import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DaybookPage }from '../pages/daybooks/daybook/daybook'
import { DocsListPage }from '../pages/docs-list/docs-list'
import { StatsPage }from '../pages/statistics/stats/stats'
import { SchedulesPage }from '../pages/schedule/schedules/schedules'
import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database'
import { GrowingStepsPage } from '../pages/steps/growing-steps/growing-steps';
import { NotesPage } from '../pages/notes/notes';
import { ProfilePage } from '../pages/profile/profile';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { ProductsGuidebookPage } from '../pages/products-guidebook/products-guidebook';



@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav:Nav;
  protected rootPage:any = HomePage;
  protected pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private dB: DatabaseProvider,
              public menuCtrl: MenuController) {
    
    platform.ready().then(() => {      
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
        {title: "Wybierz dziecko", component: HomePage},
        {title: "Profil dziecka", component: ProfilePage},
        {title: "Dzienniki", component: DaybookPage},
        {title: "Harmonogramy", component:SchedulesPage },
        {title: "Lista zaufanych lekarzy", component:DocsListPage},
        {title: "Statystyki", component: StatsPage},
        {title: "Poradnik żywieniowy", component: ProductsGuidebookPage},
        {title: "Notatki", component: NotesPage},
        {title: "Etapy rozwojowe", component: GrowingStepsPage},
        {title: "Pomoc", component: TutorialPage}
      ];
  }
  public openPage(page){
    this.nav.push(page)
  }
}

