import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider} from './database';
import { Naps } from './nap-schedule'

@Injectable()
export class NapDaybookProvider {
 
  constructor(private dbProvider: DatabaseProvider) { 
  }
 
  public insert(naps: Naps) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into naps(date,hourStart, hourStop, time) values (?, ?, ?, ?)';
        let data = [naps.date,naps.hourStart, naps.hourStop, naps.time];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(naps: Naps) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update naps set date = ?, hourStart = ?, hourStop = ?, time = ? where id = ?';
        let data = [naps.date, naps.hourStart, naps.hourStop, naps.time, naps.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from naps where id = ?';
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
          db.executeSql("SELECT * FROM naps WHERE id = ?",[id])
            .then((data)=>{
              let arrayNaps = [];
              if (data.rows.length>0){
                for(var i  = 0; i<data.rows.length;i++){
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
 


  public getByDateNaps(date:string){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT * FROM naps WHERE date = ?",[date])
          .then((data)=>{
            let arrayNaps = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayNaps.push({
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

  public getAllDates(){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT DISTINCT date FROM naps ORDER BY date DESC",[])
          .then((data)=>{
            let arrayNaps = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayNaps.push({
                  date: data.rows.item(i).date,
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


  public GetAvrageNap(){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT DISTINCT SUM(time) as sum, AVG(time) as avg ,date FROM naps GROUP BY date",[])
          .then((data)=>{
            let arrayNaps = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayNaps.push({
                  date: data.rows.item(i).date,
                  sum: data.rows.item(i).sum,
                  avg: data.rows.item(i).avg,
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
