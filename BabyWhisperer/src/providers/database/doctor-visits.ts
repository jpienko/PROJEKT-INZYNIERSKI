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
        let sql = 'insert into visits(title,startTime, endTime, allDay, place) values (?, ?, ?, ?, ?)';
        let data = [visits.title, visits.startTime, visits.endTime, visits.allDay, visits.place];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(visits: Visits) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update visits set title = ?, startTime = ?, endTime = ?, allDay = ?, place = ? where id = ?';
        let data = [visits.title, visits.startTime, visits.endTime, visits.allDay, visits.place, visits.id];
 
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
              naps.title = item.title;
              naps.id = item.id;
              naps.startTime = item.startTime;
              naps.endTime = item.stop;
              naps.allDay= item.allDay;
              naps.place= item.place;

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
                  title: data.rows.item(i).title,
                  id: data.rows.item(i).id,
                  startTime: data.rows.item(i).startTime,
                  endTime: data.rows.item(i).endTime,
                  allDay: data.rows.item(i).allDay,
                  place: data.rows.item(i).place,
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

 
export class Visits{
    id:number;
    title:string;
    startTime: string;
    endTime:string;
    allDay:boolean;
    place: string;s
}