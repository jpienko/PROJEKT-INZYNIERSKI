import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { MealScheduleProvider } from '../database/meals-schedule';

@Injectable()
export class MealProvider {
 
  constructor(private dbProvider: MealScheduleProvider) { }
 
  public insert(meal: Meals) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into schedule(hour, type, description) values (?, ?, ?)';
        let data = [meal.hour, meal.type, meal.description];
 
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
 
  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM schedule';
 
        
        return db.executeSql(sql)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let meals: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var meal = data.rows.item(i);
                meals.push(meal);
              }
              return meals;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}

 
export class Meals{
    id:number;
    hour: string;
    type:string;
    description:string;
}