import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './database';

@Injectable()
export class NapScheduleProvider {
 
  constructor(private dbProvider: DatabaseProvider) { 
  }
 
  public insert(naps: Naps) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into napsSchedule(childId, date,hourStart, hourStop, time) values (?, ?, ?, ?, ?)';
        let data = [naps.childId, naps.date,naps.hourStart, naps.hourStop, naps.time];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(naps: Naps) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update napsSchedule set date = ?, hourStart = ?, hourStop = ?, time = ? where id = ?';
        let data = [naps.date, naps.hourStart, naps.hourStop, naps.time, naps.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from napsSchedule where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public deleteByChildID(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from napsSchedule where childId = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from napsSchedule where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let naps = new Naps();
              naps.date = item.date;
              naps.id = item.id;
              naps.hourStart = item.hourStart;
              naps.hourStop = item.hourStop;
              naps.time= item.time;
              return naps;
            }
 
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 


  public GetAllNaps(id:number){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT * FROM napsSchedule WHERE childId = ? ORDER BY hourStart ASC",[id])
          .then((data)=>{
            let arrayNaps = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayNaps.push({
                  date: data.rows.item(i).date,
                  id: data.rows.item(i).id,
                  hourStart: data.rows.item(i).hourStart,
                  hourStop: data.rows.item(i).hourStop,
                  time: data.rows.item(i).time
                });
              }
            }
            resolve(arrayNaps)
          },(error)=> {
            reject(error);
          });
        },(error)=> {
          reject(error);
        });
    })
  }
  
}

 
export class Naps{
    id:number;
    childId:number;
    date:string;
    hourStart: string;
    hourStop:string;
    time:number;
}