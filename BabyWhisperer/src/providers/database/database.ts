import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite'

@Injectable()
export class DatabaseProvider {
public db:SQLiteObject;

  constructor(public http: HttpClient, public storage:SQLite) {

  }

  public getDB(){
    return this.storage.create({
      name: 'mealsDB.db',
      location: 'default'
    });
  }

  public dropDB(){
    return this.storage.deleteDatabase({
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
      ['CREATE TABLE IF NOT EXISTS meals(id INTEGER PRIMARY KEY AUTOINCREMENT, hour TEXT, type TEXT, description TEXT)'],
      ['CREATE TABLE IF NOT EXISTS naps(id INTEGER PRIMARY KEY AUTOINCREMENT,date TEXT, hourStart TEXT, hourStop TEXT, time number)'],
      ['CREATE TABLE IF NOT EXISTS napsSchedule(id INTEGER PRIMARY KEY AUTOINCREMENT,date TEXT, hourStart TEXT, hourStop TEXT, time number)'],
      ['CREATE TABLE IF NOT EXISTS visits(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, startTime TEXT, endTime TEXT, allDay TEXT, place TEXT)']

    ])
      .catch(e => console.error(e));
  }
 
}
 