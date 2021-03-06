import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './database';

@Injectable()
export class MealScheduleProvider {
 
  constructor(private dbProvider: DatabaseProvider) { 
  }
 
  public insert(meal: Meals) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into schedule(childId, hour, type, description) values (?, ?, ?, ?)';
        let data = [meal.childID, meal.hour, meal.type, meal.description];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(meal: Meals) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update schedule set hour = ?, type = ?, description = ? where id = ?';
        let data = [meal.hour, meal.type, meal.description, meal.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from schedule where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public deleteByChildID(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from schedule where childId = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from schedule where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let meal = new Meals();
              meal.id = item.id;
              meal.hour = item.hour;
              meal.type = item.type;
              meal.description= item.description;
              return meal;
            }
 
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 


  public GetAllMeals(id:number){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT * FROM schedule WHERE childId = ? ORDER BY hour ASC",[id])
          .then((data)=>{
            let arrayMeals = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayMeals.push({
                  id:data.rows.item(i).id,
                  hour:data.rows.item(i).hour,
                  type:data.rows.item(i).type,
                  description:data.rows.item(i).description
                });
              }
            }
            resolve(arrayMeals)
          },(error)=> {
            reject(error);
          });
        },(error)=> {
          reject(error);
        });
    })
  }
  
}

 
export class Meals{
    id:number;
    childID:number;
    hour: string;
    type:string;
    description:string;
    date:string;
}