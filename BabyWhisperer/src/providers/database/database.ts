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
        this.insertDefaultChild(db);
        this.insertDefaultItemsSteps(db);

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
      ['CREATE TABLE IF NOT EXISTS child(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, birthday TEXT, weight NUMBER, height NUMBER, foot NUMBER, picture TEXT, date TEXT)'],
      ['CREATE TABLE IF NOT EXISTS steps(id INTEGER PRIMARY KEY AUTOINCREMENT,date TEXT, name TEXT, description TEXT, passed TEXT)']

    ])
      .catch(e => console.error(e));
  }
  private insertDefaultChild(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from child', <any>{})
    .then((data: any) => {
      if (data.rows.item(0).qtd == 0) {
 
        db.sqlBatch([
          ['insert into child (name, birthday, weight, height, foot, picture, date) values (?,?,?,?,?,?,?)', ['', '2018-08-29', 0, 0, 0, '', '' ]]
        ])
          .then(() => console.log('Dane domyślne dodane'))
          .catch(e => console.error(e));
 
      }
    })
    .catch(e => console.error( e));
  }
  private insertDefaultItemsSteps(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from steps', <any>{})
    .then((data: any) => {
      if (data.rows.item(0).qtd == 0) {
 
        db.sqlBatch([
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Krok1', 'Opis1', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Krok2', 'Opis2', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Krok3', 'Opis3', 'false' ]]
        ])
          .then(() => console.log('Dane domyślne dodane'))
          .catch(e => console.error(e));
 
      }
    })
    .catch(e => console.error( e));
  }
}
 