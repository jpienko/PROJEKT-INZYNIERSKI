import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsGuidebookPage } from './products-guidebook';

@NgModule({
  declarations: [
    ProductsGuidebookPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductsGuidebookPage),
  ],
})
export class ProductsGuidebookPageModule {}
