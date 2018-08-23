import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './database';

@Injectable()
export class DoctorVisitsProvider {
  
  constructor(private dbProvider: DatabaseProvider) { 
  }
 
  public insert(visits: Visits) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into visits(purpose, startTime, adress) values (?, ?, ?)';
        let data = [visits.purpose, visits.startTime, visits.adress];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(visits: Visits) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update visits set purpose = ?, startTime = ?, adress = ? where id = ?';
        let data = [visits.purpose, visits.startTime, visits.adress, visits.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from visits where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from visits where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let naps = new Visits();
              naps.purpose = item.purpose;
              naps.id = item.id;
              naps.startTime = item.startTime;
              naps.adress = item.adress;
             

              return naps;
            }
 
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 


  public GetAllVisits(){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT * FROM visits",[])
          .then((data)=>{
            let arrayNaps = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayNaps.push({
                  purpose: data.rows.item(i).title,
                  id: data.rows.item(i).id,
                  startTime: data.rows.item(i).startTime,
                  adress: data.rows.item(i).adress,
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
  public GetAllDates(){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT startTime FROM visits",[])
          .then((data)=>{
            let arrayDates= [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayDates.push({
                  startTime: data.rows.item(i).startTime
                });
              }
            }
            resolve(arrayDates)
          },(error)=> {
            reject(error);
          });
        },(error)=> {
          reject(error);
        });
    })
  }
}

 
export class Visits{
    id:number;
    purpose:string;
    startTime: string;
    adress:string;
    
}