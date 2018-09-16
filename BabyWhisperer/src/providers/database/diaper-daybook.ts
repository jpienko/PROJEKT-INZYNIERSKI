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
        let sql = 'insert into diapers( date, hour, type) values (?, ?, ?)';
        let data = [diaper.date, diaper.hour, diaper.type ];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(diaper: Diaper) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update diapers set date = ?, hour = ?, type = ? where id = ?';
        let data = [diaper.date, diaper.hour, diaper.type, diaper.id];
 
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
 


  public getByDate(date: string){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT * FROM diapers WHERE date = ?",[date])
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

  public GetAllDates(){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT DISTINCT date FROM diapers ORDER BY date DESC",[])
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

  public GetSumDiapers(){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT DISTINCT date, COUNT(hour) as sum  FROM diapers GROUP BY date",[])
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


  public GetAvrageDiaper(){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT COUNT(type) as avg FROM diapers WHERE type like ? GROUP BY date",['true'])
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
    date:string;
    hour: string;
    type: boolean;
}