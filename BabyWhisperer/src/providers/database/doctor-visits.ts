import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite'

/*
  Generated class for the MealDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DoctorVisitsProvider {
public db:SQLiteObject;

private isopen:boolean;
  constructor(public http: HttpClient, public storage:SQLite) {
    if(!this.isopen){
      this.storage = new SQLite();
      this.storage.create({name:"meals.db", location:"default"}).then((db:SQLiteObject)=>{
        db.executeSql("CREATE TABLE IF NOT EXISTS visits(id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, hour TEXT, where TEXT, doctor TEXT, purpose TEXT)",<any>{})
        this.db = db;
        this.isopen = true;
      }).catch((error)=> {
        console.log(error);
      })
    }
  }
  CreateMeal(date:string, hour:string,where:string,doctor:string, purpose:string){
    return new Promise((resolve,reject)=>{
      let sql = "INSERT INTO visits(date,hour,where,doctor,purpose) VALUES (?,?,?,?,?)";
      this.db.executeSql(sql,[date,hour,where,doctor,purpose]).then((data)=>{
        resolve(data);
      },(error)=> {
        reject(error);
      });

    });
  }
  GetAllMeals(){
    return new Promise((resolve, reject)=>{
      this.db.executeSql("SELECT * FROM visits",[]).then((data)=>{
        let arrayVisits = [];
        if (data.rows.length>0){
          for(var i  = 0; i<data.rows.length;i++)
          {
            arrayVisits.push({
              id:data.rows.item(i).id,
              date:data.rows.item(i).date,
              hour:data.rows.item(i).hour,
              where:data.rows.item(i).where,
              doctor:data.rows.item(i).doctor,
              purpose:data.rows.item(i).purpose
            });
          }
        }
        resolve(arrayVisits);
      },(error)=> {
        reject(error);
      });
    })
  }
}
 