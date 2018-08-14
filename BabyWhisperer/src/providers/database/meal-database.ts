import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite'

/*
  Generated class for the MealDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MealDatabaseProvider {
public db:SQLiteObject;

private isopen:boolean;
  constructor(public http: HttpClient, public storage:SQLite) {
    if(!this.isopen){
      this.storage = new SQLite();
      this.storage.create({name:"meals.db", location:"default"}).then((db:SQLiteObject)=>{
        db.executeSql("CREATE TABLE IF NOT EXISTS meals(id INTEGER PRIMARY KEY AUTOINCREMENT, hour TEXT, type TEXT, amount TEXT)",<any>{})
        this.db = db;
        this.isopen = true;
      }).catch((error)=> {
        console.log(error);
      })
    }
  }
  CreateMeal(hour:string, type:string,amount:string){
    return new Promise((resolve,reject)=>{
      let sql = "INSERT INTO meals(hour,type, amount) VALUES (?,?,?)";
      this.db.executeSql(sql,[hour,type,amount]).then((data)=>{
        resolve(data);
      },(error)=> {
        reject(error);
      });

    });
  }
  GetAllMeals(){
    return new Promise((resolve, reject)=>{
      this.db.executeSql("SELECT * FROM meals",[]).then((data)=>{
        let arrayMeals = [];
        if (data.rows.length>0){
          for(var i  = 0; i<data.rows.length;i++)
          {
            arrayMeals.push({
              id:data.rows.item(i).id,
              hour:data.rows.item(i).hour,
              type:data.rows.item(i).type,
              amount:data.rows.item(i).amount
            });
          }
        }
        resolve(arrayMeals);
      },(error)=> {
        reject(error);
      });
    })
  }
}
 