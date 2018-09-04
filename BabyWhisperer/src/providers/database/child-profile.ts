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
        let sql = 'insert into child(name, birthday, weight, height, foot, picture, date) values (?, ?, ?, ?, ?, ?, ?)';
        let data = [child.name,child.birthday, child.weight, child.height, child.foot, child.picture, child.date];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(child: Child) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update child set name = ?, birthday = ?, weight = ?, height = ?, foot = ?, picture = ?, date = ? where id = ?';
        let data = [child.name,child.birthday, child.weight, child.height, child.foot, child.picture, child.date, child.id];
 
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
                 name: data.rows.item(i).name,
                 id: data.rows.item(i).id,
                 birthday: data.rows.item(i).birthday,
                 weight: data.rows.item(i).weight,
                 height: data.rows.item(i).height,
                 foot: data.rows.item(i).foot,
                 picture: data.rows.item(i).picture,
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


  public GetAllChildProfiles(){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT * FROM child GROUP BY date ORDER BY date ASC",[])
          .then((data)=>{
            let arrayChild = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayChild.push({
                  name: data.rows.item(i).name,
                  id: data.rows.item(i).id,
                  birthday: data.rows.item(i).birthday,
                  weight: data.rows.item(i).weight,
                  height: data.rows.item(i).height,
                  foot: data.rows.item(i).foot,
                  picture: data.rows.item(i).picture,
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
  public getLength(){
    return new Promise((resolve,reject)=>{
      this.dbProvider.getDB()
       .then((db: SQLiteObject)=>{
         db.executeSql("SELECT COUNT(name) as sized FROM child",[])
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
}

  

 
export class Child{
    id:number;
    name:string;
    birthday: Date;
    weight:number;
    height:number;
    foot:number;
    picture:string;
    date: string;
}