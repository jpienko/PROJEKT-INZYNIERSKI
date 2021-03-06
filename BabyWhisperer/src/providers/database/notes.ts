
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './database';

@Injectable()
export class NotesProvider {

  constructor(private dbProvider: DatabaseProvider) {}


  public insert(note: Note) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into notes(childId, title, date, note, category) values (?, ?, ?, ?, ?)';
        let data = [note.childId, note.title, note.date, note.note, note.category];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(note: Note) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update notes set title = ?, date = ?, note = ?, category = ? where id = ?';
        let data = [note.title, note.date, note.note, note.category, note.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from notes where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public deleteByChildID(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from notes where childId = ?';
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
         db.executeSql("SELECT * FROM notes where id = ?",[id])
         .then((data)=>{
           let arrayChild = [];
           if (data.rows.length>0){
             for(var i  = 0; i<data.rows.length;i++)
             {
               arrayChild.push({
                 title: data.rows.item(i).title,
                 id: data.rows.item(i).id,
                 date: data.rows.item(i).date,
                 note: data.rows.item(i).note,
                 category: data.rows.item(i).category
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


  public getNotes(category:string, id:number){
    return new Promise((resolve,reject)=>{
       this.dbProvider.getDB()
        .then((db: SQLiteObject)=>{
          db.executeSql("SELECT * FROM notes WHERE category = ? AND childId = ? ORDER BY date ASC",[id, category])
          .then((data)=>{
            let arrayChild = [];
            if (data.rows.length>0){
              for(var i  = 0; i<data.rows.length;i++)
              {
                arrayChild.push({
                  title: data.rows.item(i).title,
                  id: data.rows.item(i).id,
                  date: data.rows.item(i).date,
                  category: data.rows.item(i).category
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

 
export class Note{
    id:number;
    childId:number;
    title:string;
    date: string;
    note:string;
    category:string;
}
