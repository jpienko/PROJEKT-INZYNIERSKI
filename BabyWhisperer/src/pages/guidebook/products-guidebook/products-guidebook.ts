import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { File } from '@ionic-native/file';


@IonicPage()
@Component({
  selector: 'page-products-guidebook',
  templateUrl: 'products-guidebook.html',
})

export class ProductsGuidebookPage {
  protected rulesList;
  protected productsList: Array<Products> =[];
  protected filtred: Array<Products> = [];
  protected showRules:boolean = false;
  protected showProducts:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private file:File) {
  }

  private getRules(){
    this.file.checkDir(this.file.applicationDirectory , "www/assets/mock").then(_=>{
      this.file.readAsText(this.file.applicationDirectory + "www/assets/mock", "rules-of-diet.json").then(text => {
        this.rulesList = JSON.parse(text);
      }).catch(err => {})
    });
  }

  private getProducts(){
    this.file.checkDir(this.file.applicationDirectory , "www/assets/mock").then(_=>{
      this.file.readAsText(this.file.applicationDirectory + "www/assets/mock", "products-timetable.json").then(text => {
        this.productsList = JSON.parse(text);
        this.ProductsShowHide();
      }).catch(err => {})
    });
  }

  ionViewDidLoad() {
    this.getRules();
    this.getProducts();
  }

  protected RulesShowHide(){
      this.showRules = true;
      this.showProducts = false;
  }

  protected ProductsShowHide(){
    this.showProducts = true;
    this.showRules = false;
    this.filtred = this.productsList;
  }

  protected filterItems(ev: any) {
    this.filtred = this.productsList;
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.getProducts();
      this.filtred = this.filtred.filter(function(product) {
        return product.name.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

}

export class Products{
id:number;
name:string;
time:string;
}