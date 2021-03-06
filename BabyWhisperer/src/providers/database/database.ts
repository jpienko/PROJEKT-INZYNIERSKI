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
      name: 'database.db',
      location: 'default'
    });
  }

  public dropDB(){
    return this.storage.deleteDatabase({
      name: 'database.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.createTables(db);
      })
      .catch(e => e);
  }
  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS schedule(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, hour TEXT, type TEXT, description TEXT)'],
      ['CREATE TABLE IF NOT EXISTS meals(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, hour TEXT, type TEXT, description TEXT, date TEXT)'],
      ['CREATE TABLE IF NOT EXISTS naps(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, date TEXT, hourStart TEXT, hourStop TEXT, time NUMBER)'],
      ['CREATE TABLE IF NOT EXISTS napsSchedule(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, date TEXT, hourStart TEXT, hourStop TEXT, time NUMBER)'],
      ['CREATE TABLE IF NOT EXISTS visits(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, purpose TEXT, startTime TEXT, adress TEXT)'],
      ['CREATE TABLE IF NOT EXISTS docs(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, name TEXT, surname TEXT, specialisation TEXT, adress TEXT, tel NUMBER)'],
      ['CREATE TABLE IF NOT EXISTS diapers(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, date TEXT, hour TEXT, type TEXT)'],
      ['CREATE TABLE IF NOT EXISTS child(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, weight NUMBER, height NUMBER, foot NUMBER, date TEXT)'],
      ['CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, title TEXT, date TEXT, note TEXT, category TEXT)'],
      ['CREATE TABLE IF NOT EXISTS steps(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, date TEXT, stepId number)'],
      ['CREATE TABLE IF NOT EXISTS profile(id INTEGER PRIMARY KEY AUTOINCREMENT, birthday TEXT, name TEXT, picture TEXT)']
    ])
      .catch(e => console.error(e));
  }

}
 