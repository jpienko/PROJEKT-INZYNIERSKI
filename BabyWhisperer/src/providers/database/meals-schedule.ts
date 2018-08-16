import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite'

@Injectable()
export class MealScheduleProvider {
public db:SQLiteObject;

  constructor(public http: HttpClient, public storage:SQLite) {

  }

  public getDB(){
    return this.storage.create({
      name: 'mealsDB.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.createTables(db);
      })
      .catch(e => console.log(e));
  }
  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS schedule(id INTEGER PRIMARY KEY AUTOINCREMENT, hour TEXT, type TEXT, description TEXT)'],
     // ['CREATE TABLE IF NOT EXISTS mseals (id integer primary key AUTOINCREMENT NOT NULL, name TEXT, price REAL, duedate DATE, active integer, category_id integer, FOREIGN KEY(category_id) REFERENCES categories(id))']
    ])
      .catch(e => console.error(e));
  }
 
}
 