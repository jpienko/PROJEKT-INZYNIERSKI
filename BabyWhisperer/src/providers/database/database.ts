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
        this.insertDefaultItems(db);
      })
      .catch(e => console.log(e));
  }
  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS schedule(id INTEGER PRIMARY KEY AUTOINCREMENT, hour TEXT, type TEXT, description TEXT)'],
      ['CREATE TABLE IF NOT EXISTS meals(id INTEGER PRIMARY KEY AUTOINCREMENT, hour TEXT, type TEXT, description TEXT, date TEXT)'],
      ['CREATE TABLE IF NOT EXISTS naps(id INTEGER PRIMARY KEY AUTOINCREMENT,date TEXT, hourStart TEXT, hourStop TEXT, time NUMBER)'],
      ['CREATE TABLE IF NOT EXISTS napsSchedule(id INTEGER PRIMARY KEY AUTOINCREMENT,date TEXT, hourStart TEXT, hourStop TEXT, time NUMBER)'],
      ['CREATE TABLE IF NOT EXISTS visits(id INTEGER PRIMARY KEY AUTOINCREMENT, purpose TEXT, startTime TEXT, adress TEXT)'],
      ['CREATE TABLE IF NOT EXISTS docs(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, surname TEXT, specialisation TEXT, adress TEXT, tel NUMBER)'],
      ['CREATE TABLE IF NOT EXISTS diapers(id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, hour TEXT, type TEXT)'],
      ['CREATE TABLE IF NOT EXISTS child(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, birthday TEXT, weight NUMBER, height NUMBER, foot NUMBER, picture TEXT, date TEXT)']

    ])
      .catch(e => console.error(e));
  }
  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from child', <any>{})
    .then((data: any) => {
      if (data.rows.item(0).qtd == 0) {
 
        db.sqlBatch([
          ['insert into child (name, birthday, weight, height, foot, picture, date) values (?,?,?,?,?,?,?)', ['Imię dziecka', 'data urodzenia', 0, 0, 0, 'ścieżka', 'data' ]],
        ])
          .then(() => console.log('Dane domyślne dodane'))
          .catch(e => console.error(e));
 
      }
    })
    .catch(e => console.error( e));
  }
 
}
 