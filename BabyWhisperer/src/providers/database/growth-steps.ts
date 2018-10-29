import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './database';

@Injectable()
export class GrowthStepsProvider {
 
  constructor(private dbProvider: DatabaseProvider) { 
  }

  public insert(step: Steps) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into steps(childId, date, stepId) values (?, ?, ?)';
        let data = [step.childId, step.date, step.stepId];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
    }
  public update(steps: Steps) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update steps set date = ?, stepId = ? where id = ?';
        let data = [steps.date, steps.stepId, steps.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from steps where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public deleteByChildID(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from steps where childId = ?';
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
         db.executeSql("SELECT * FROM steps where id = ?",[id])
         .then((data)=>{
           let arraySteps = [];
           if (data.rows.length>0){
             for(var i  = 0; i<data.rows.length;i++)
             {
               arraySteps.push({
                 date: data.rows.item(i).date,
                 id: data.rows.item(i).id,
                 stepId: data.rows.item(i).stepId
               });
             }
           }
           resolve(arraySteps)
         },(error)=> {
           reject(error);
         });
       },(error)=> {
         reject(error);
       });
   })
  }
 


  public GetAllSteps(id:number){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT * FROM steps WHERE childId = ? ",[id])
          .then((data)=>{
            let arraySteps = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arraySteps.push({
                  date: data.rows.item(i).date,
                  id: data.rows.item(i).id,
                  stepId: data.rows.item(i).stepId
                });
              }
            }
            resolve(arraySteps)
          },(error)=> {
            reject(error);
          });
        },(error)=> {
          reject(error);
        });
    })
  }
  
}

 
export class Steps{
    id:number;
    childId: number;
    date:string;
    stepId:number;
}