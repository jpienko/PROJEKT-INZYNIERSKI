import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './database';


@Injectable()
export class ProfilesProvider {
  constructor(private dbProvider: DatabaseProvider) {}
 
  public insert(child: Profiles) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into profile(name, birthday, picture) values (?, ?, ?)';
        let data = [child.name,child.birthday, child.picture];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(child: Profiles) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update profile set name = ?, birthday = ?, picture = ? where id = ?';
        let data = [child.name, child.birthday, child.picture, child.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from profile where id = ?';
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
         db.executeSql("SELECT * FROM profile where id = ?",[id])
         .then((data)=>{
           let arrayChild = [];
           if (data.rows.length>0){
             for(var i  = 0; i<data.rows.length;i++)
             {
               arrayChild.push({
                 name: data.rows.item(i).name,
                 id: data.rows.item(i).id,
                 birthday: data.rows.item(i).birthday,
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
          db.executeSql("SELECT * FROM profile",[])
          .then((data)=>{
            let arrayChild = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayChild.push({
                  name: data.rows.item(i).name,
                  id: data.rows.item(i).id,
                  birthday: data.rows.item(i).birthday,
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
  public getLength(){
    return new Promise((resolve,reject)=>{
      this.dbProvider.getDB()
       .then((db: SQLiteObject)=>{
         db.executeSql("SELECT COUNT(name) as sized FROM profile",[])
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

  

 
export class Profiles{
    id:number;
    name:string;
    birthday: Date;
    picture:string;
}
