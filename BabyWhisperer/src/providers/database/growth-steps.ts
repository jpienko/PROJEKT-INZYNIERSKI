import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './database';

@Injectable()
export class GrowthStepsProvider {
 
  constructor(private dbProvider: DatabaseProvider) { 
  }

  public update(steps: Steps) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update steps set date = ?, name = ?, description = ?, passed = ? where id = ?';
        let data = [steps.date, steps.name, steps.description, steps.passed, steps.id];
 
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
                 name: data.rows.item(i).name,
                 description: data.rows.item(i).description,
                 passed: data.rows.item(i).passed
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
 


  public GetAllSteps(pass:string){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT * FROM steps WHERE passed = ?",[pass])
          .then((data)=>{
            let arraySteps = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arraySteps.push({
                  date: data.rows.item(i).date,
                  id: data.rows.item(i).id,
                  name: data.rows.item(i).name,
                  description: data.rows.item(i).description,
                  passed: data.rows.item(i).passed
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
    date:string;
    name: string;
    description:string;
    passed:boolean;
}