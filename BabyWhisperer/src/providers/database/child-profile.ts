import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './database';

@Injectable()
export class ChildProfileProvider {
 
  constructor(private dbProvider: DatabaseProvider) { 
  }
 
  public insert(child: Child) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into child(childID, weight, height, foot, date) values ( ?, ?, ?, ?, ?)';
        let data = [child.childId, child.weight, child.height, child.foot, child.date];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(child: Child) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update child set weight = ?, height = ?, foot = ?, date = ? where id = ?';
        let data = [child.weight, child.height, child.foot, child.date, child.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from child where id = ?';
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
         db.executeSql("SELECT * FROM child where id = ?",[id])
         .then((data)=>{
           let arrayChild = [];
           if (data.rows.length>0){
             for(var i  = 0; i<data.rows.length;i++)
             {
               arrayChild.push({
                 id: data.rows.item(i).id,
                 weight: data.rows.item(i).weight,
                 height: data.rows.item(i).height,
                 foot: data.rows.item(i).foot,
                 date: data.rows.item(i).date
               });
             }
           }
           resolve(arrayChild)
         },(error)=> {
           reject(error);
         });
       },(error)=> {
         reject(error);
      });
   })
  }


  public GetAllChildProfiles(id:number){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT * FROM child WHERE childId = ? GROUP BY date",[id])
          .then((data)=>{
            let arrayChild = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayChild.push({
                  id: data.rows.item(i).id,
                  weight: data.rows.item(i).weight,
                  height: data.rows.item(i).height,
                  date: data.rows.item(i).date
                });
              }
            }
            resolve(arrayChild)
          },(error)=> {
            reject(error);
          });
        },(error)=> {
          reject(error);
        });
    })
  }
  public getLength(id:number){
    return new Promise((resolve,reject)=>{
      this.dbProvider.getDB()
       .then((db: SQLiteObject)=>{
         db.executeSql("SELECT COUNT(childId) as sized FROM child WHERE childId = ?",[id])
         .then((data)=>{
          let arrayChild = [];
          if (data.rows.length>0){
            for(var i  = 0; i<data.rows.length;i++)
            {
              arrayChild.push({
                sized: data.rows.item(i).sized,
              });
            }
          }
          resolve(arrayChild)
         },(error)=> {
           reject(error);
         });
       },(error)=> {
         reject(error);
      });
   })
  }

  public GetCurrentProfile(id:number){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT * FROM child WHERE childId = ? ORDER BY date DESC",[id])
          .then((data)=>{
            let arrayChild = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayChild.push({
                  id: data.rows.item(i).id,
                  weight: data.rows.item(i).weight,
                  height: data.rows.item(i).height,
                  foot:data.rows.item(i).foot,
                  date: data.rows.item(i).date
                });
              }
            }
            resolve(arrayChild)
          },(error)=> {
            reject(error);
          });
        },(error)=> {
          reject(error);
        });
    })
  }

  public deleteByChildID(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from child where childId = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
}

  

 
export class Child{
  id:number;
  childId: number;
  weight:number;
  height:number;
  foot:number;
  date: string;
}