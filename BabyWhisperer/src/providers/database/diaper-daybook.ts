import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider} from './database';


@Injectable()
export class DiaperDaybookProvider {
 
  constructor(private dbProvider: DatabaseProvider) { 
  }
 
  public insert(diaper: Diaper) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into diapers( childId, date, hour, type) values (?, ?, ?, ?)';
        let data = [diaper.childID, diaper.date, diaper.hour, diaper.type ];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(diaper: Diaper) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update diapers set childID = ?, date = ?, hour = ?, type = ? where id = ?';
        let data = [diaper.childID ,diaper.date, diaper.hour, diaper.type, diaper.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from diapers where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public deleteByChildID(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from diapers where childId = ?';
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
          db.executeSql("SELECT * FROM diapers WHERE id = ?",[id])
            .then((data)=>{
              let arrayDiapers = [];
              if (data.rows.length>0){
                for(var i  = 0; i<data.rows.length;i++){
                  arrayDiapers.push({
                  id:data.rows.item(i).id,
                  hour:data.rows.item(i).hour,
                  type:data.rows.item(i).type,
                  date:data.rows.item(i).date
                });
              }
            }
            resolve(arrayDiapers)
          },(error)=> {
            reject(error);
          });
        },(error)=> {
          reject(error);
        });
    })
  }
 


  public getByDate(date: string, id:number){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT * FROM diapers WHERE date = ? AND childId = ?",[date, id])
          .then((data)=>{
            let arrayDiapers = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayDiapers.push({
                  id:data.rows.item(i).id,
                  hour:data.rows.item(i).hour,
                  type:data.rows.item(i).type,
                });
              }
            }
            resolve(arrayDiapers)
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
          db.executeSql("SELECT DISTINCT date FROM diapers WHERE childId = ? ORDER BY date DESC",[id])
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

  public GetSumDiapers(id:number){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT DISTINCT date, COUNT(hour) as sum  FROM diapers WHERE childId = ? GROUP BY date",[id])
          .then((data)=>{
            let arrayNaps = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayNaps.push({
                  date: data.rows.item(i).date,
                  sum: data.rows.item(i).sum,
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


  public GetAvrageDiaper(id:number){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT COUNT(type) as avg FROM diapers WHERE type like ? AND  childId = ? GROUP BY date",['true',id])
          .then((data)=>{
            let arrayNaps = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayNaps.push({
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

export class Diaper{
    id:number;
    childID:number;
    date:string;
    hour: string;
    type: boolean;
}