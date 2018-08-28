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
        let sql = 'insert into child(name, birthday, weight, hight, foot, picture) values (?, ?, ?, ?, ?, ?)';
        let data = [child.name,child.birthday, child.weight, child.hight, child.foot, child.picture];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(child: Child) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update child set name = ?, birthday = ?, weight = ?, hight = ?, foot = ?, picture = ? where id = ?';
        let data = [child.name,child.birthday, child.weight, child.hight, child.foot, child.picture, child.id];
 
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
                 hight: data.rows.item(i).hight,
                 foot: data.rows.item(i).foot,
                 picture: data.rows.item(i).picture
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
          db.executeSql("SELECT * FROM child",[])
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
                  hight: data.rows.item(i).hight,
                  foot: data.rows.item(i).foot,
                  picture: data.rows.item(i).picture
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
  
  public GetPresentProfile(){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT * FROM child ORDER BY id DESC limit 1",[])
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
                  hight: data.rows.item(i).hight,
                  foot: data.rows.item(i).foot,
                  picture: data.rows.item(i).picture
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
    hight:number;
    foot:number;
    picture:string;
}