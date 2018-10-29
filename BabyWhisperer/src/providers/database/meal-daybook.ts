import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider} from './database';
import { Meals } from './meal-schedule-provider'

@Injectable()
export class MealDaybookProvider {
 
  constructor(private dbProvider: DatabaseProvider) { 
  }
 
  public insert(meal: Meals) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into meals(childId, hour, type, description, date) values (?, ?, ?, ?, ?)';
        let data = [meal.childID, meal.hour, meal.type, meal.description, meal.date];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(meal: Meals) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update meals set childId = ? hour = ?, type = ?, description = ?, date=? where id = ?';
        let data = [meal.childID, meal.hour, meal.type, meal.description, meal.date, meal.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from meals where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public deleteByChildID(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from meals where childId = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public get(id: number) {
    return new Promise((resolve,reject)=>{
      this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT * FROM meals WHERE id = ?",[id])
            .then((data)=>{
              let arrayMeals = [];
              if (data.rows.length>0){
                for(var i  = 0; i<data.rows.length;i++){
                  arrayMeals.push({
                  id:data.rows.item(i).id,
                  hour:data.rows.item(i).hour,
                  type:data.rows.item(i).type,
                  description:data.rows.item(i).description,
                  date:data.rows.item(i).date
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
 


  public GetAllMeals(id:number){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT * FROM meals WHERE childId = ? ORDER BY date DESC, hour DESC",[id])
          .then((data)=>{
            let arrayMeals = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayMeals.push({
                  id:data.rows.item(i).id,
                  hour:data.rows.item(i).hour,
                  type:data.rows.item(i).type,
                  description:data.rows.item(i).description,
                  date:data.rows.item(i).date
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

  public GetAllDates(id:number){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT DISTINCT date FROM meals WHERE childId = ? ORDER BY date DESC",[id])
          .then((data)=>{
            let arrayMeals = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayMeals.push({
                  date:data.rows.item(i).date
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

  public getByDate(date: string, id:number) {
    return new Promise((resolve,reject)=>{
      this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT * FROM meals WHERE date = ? AND childId = ?",[date,id])
            .then((data)=>{
              let arrayMeals = [];
              if (data.rows.length>0){
                for(var i  = 0; i<data.rows.length;i++){
                  arrayMeals.push({
                  id:data.rows.item(i).id,
                  hour:data.rows.item(i).hour,
                  type:data.rows.item(i).type,
                  description:data.rows.item(i).description,
                  date:data.rows.item(i).date
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
