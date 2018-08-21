import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocsListPage } from './docs-list';

@NgModule({
  declarations: [
    DocsListPage,
  ],
  imports: [
    IonicPageModule.forChild(DocsListPage),
  ],
})
export class DocsListPageModule {}
