import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './database';

@Injectable()
export class DoctorsListProvider {
 
  constructor(private dbProvider: DatabaseProvider) { 
  }
 
  public insert(docs: Docs) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into docs(name, surname, specialisation, adress, tel) values (?, ?, ?, ?, ?)';
        let data = [docs.name, docs.surname, docs.specialisation, docs.adress, docs.tel];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(docs: Docs) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update docs set name = ?, surname = ?, specialisation = ?, adress = ?, tel=? where id = ?';
        let data = [docs.name, docs.surname, docs.specialisation,docs.adress,docs.tel, docs.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from docs where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from docs where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let docs = new Docs();
              docs.id = item.id;
              docs.name = item.name;
              docs.surname = item.surname;
              docs.specialisation= item.specialisation;
              docs.adress= item.adress;
              docs.tel= item.tel;
              return docs;
            }
 
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 


  public GetAllDocs(){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT * FROM docs ORDER BY surname ASC",[])
          .then((data)=>{
            let arrayDocs = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayDocs.push({
                  id:data.rows.item(i).id,
                  name:data.rows.item(i).name,
                  surname:data.rows.item(i).surname,
                  specialisation:data.rows.item(i).specialisation,
                  adress:data.rows.item(i).adress,
                  tel:data.rows.item(i).tel

                });
              }
            }
            resolve(arrayDocs)
          },(error)=> {
            reject(error);
          });
        },(error)=> {
          reject(error);
        });
    })
  }
  
}

 
export class Docs{
    id:number;
    name: string;
    surname:string;
    specialisation:string;
    adress:string;
    tel: number;
}