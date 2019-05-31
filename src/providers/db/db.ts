import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

 // public properties
 db: SQLiteObject = null;

 constructor() {}


 insertOperativosMesas(r)
  {
    return this.db.executeSql('INSERT INTO operativos_mesas(operativos_id, mesas_id) VALUES(?,?)', [ r['operativos_id'],r['mesas_id'] ]).then(res => {

      console.log('ACA'+res.rows.length);

    });
  }

 insertOperativos(r)
  {
      return this.db.executeSql('INSERT INTO operativos(operativos_id, operativos_nombre, niveles_operativos_id, niveles_operativos_nombre) VALUES(?,?,?,?)', [r['operativos_id'],r['operativos_nombre'],r['niveles_operativos_id'],r['niveles_operativos_nombre']]); 
  } 

 insertMesas(r)
 {
    return this.db.executeSql('INSERT INTO mesas(mesas_id, mesas_numero, escuelas_id, escuelas_nombre) VALUES(?,?,?,?)', [r['mesas_id'],r['mesas_numero'],r['escuelas_id'],r['escuelas_nombre']]); 
 }



 // public methods
 setDatabase(db: SQLiteObject){
   if(this.db === null){
     this.db = db;
   }
 }

 create(){
   let sql = 'INSERT INTO users(token, username) VALUES(?,?)';
   return this.db.executeSql(sql, ['dasdsa', 'elclu']);
 }

 getUser(username:string,token:string)
 {
  
  let sql = 'SELECT * FROM users where username = ?';
    
   this.db.executeSql(sql, [username])
    .then(response => {

      if(response.rows.length > 0)
        {
              let sql = 'UPDATE users SET token=? WHERE username=?';
              this.db.executeSql(sql, [token, username]);
        }
      else
        {
          let sql = 'INSERT INTO users(token, username) VALUES(?,?)';
          this.db.executeSql(sql, [token, username]);
        }
    })
    .catch(error => Promise.reject(error));
 }
 

 // createTable(){
 //   //let sql = 'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT, club TEXT)';
 //   // return this.db.executeSql(sql, []);
 //    this.createTableEncuentros();
 //    this.createTableEncuentrosJugadores();
 //   // this.createTableEncuentrosResultados();
 //   // this.createTableJugadores();
 //    this.createTableUsers();
 // }

 delete(task: any){
   let sql = 'DELETE FROM users WHERE id=?';
   return this.db.executeSql(sql, [task.id]);
 }

 getAll(){
   let sql = 'SELECT * FROM users';
   return this.db.executeSql(sql, [])
   .then(response => {
     let tasks = [];
     for (let index = 0; index < response.rows.length; index++) {
       tasks.push( response.rows.item(index) );
     }
     return Promise.resolve( tasks );
   })
   .catch(error => Promise.reject(error));
 }

 update(task: any){
   let sql = 'UPDATE users SET title=?, completed=? WHERE id=?';
   return this.db.executeSql(sql, [task.title, task.completed, task.id]);
 }

 createTableUsers(){
   let sql = 'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT ,token TEXT ,username TEXT)';
   return this.db.executeSql(sql, []);
 }

  createTableOperativos(){
   let sql = 'CREATE TABLE IF NOT EXISTS operativos(id INTEGER PRIMARY KEY AUTOINCREMENT, operativos_id INTEGER, operativos_nombre TEXT, niveles_operativos_id INTEGER , niveles_operativos_nombre TEXT)';
   return this.db.executeSql(sql, []);
 }

 createTableListas(){
   let sql = 'CREATE TABLE IF NOT EXISTS listas(id INTEGER PRIMARY KEY AUTOINCREMENT, listas_id INTEGER, listas_nombre TEXT, partidos_id INTEGER , partidos_nombre TEXT, partidos_img text, tipo_operativos_id INTEGER , tipo_operativos_nombre TEXT)';
   return this.db.executeSql(sql, []);
 }

 createTableMesas(){
  let sql = 'CREATE TABLE IF NOT EXISTS mesas(id INTEGER PRIMARY KEY AUTOINCREMENT, mesas_id INTEGER, mesas_numero TEXT, escuelas_id INTEGER , escuelas_nombre TEXT)';
  return this.db.executeSql(sql, []);
}

createTableVotos(){
  let sql = 'CREATE TABLE IF NOT EXISTS votos(id INTEGER PRIMARY KEY AUTOINCREMENT, mesas_id INTEGER, listas_id INTEGER, operativos_id INTEGER , total TEXT, image )';
  return this.db.executeSql(sql, []);
}

createTableOperativosListas(){
  let sql = 'CREATE TABLE IF NOT EXISTS operativos_listas(id INTEGER PRIMARY KEY AUTOINCREMENT, operativos_id INTEGER, listas_id INTEGER )';
  return this.db.executeSql(sql, []);
}

createTableOperativosMesas(){
  let sql = 'CREATE TABLE IF NOT EXISTS operativos_mesas(id INTEGER PRIMARY KEY AUTOINCREMENT, operativos_id INTEGER, mesas_id INTEGER )';
  return this.db.executeSql(sql, []);
}

createTableUsersOperativosMesas(){
  let sql = 'CREATE TABLE IF NOT EXISTS users_operativos_mesas(id INTEGER PRIMARY KEY AUTOINCREMENT, operativos_mesas_id INTEGER, users_id INTEGER )';
  return this.db.executeSql(sql, []);
}


//  createTableEncuentrosJugadores(){
//    let sql = 'CREATE TABLE IF NOT EXISTS encuentros_jugadores(id INTEGER PRIMARY KEY AUTOINCREMENT, encuentro_id INTEGER, lv TEXT , partido TEXT, jugador_id INTEGER, jugador_nombre TEXT, jugador_id_store INTEGER)';
//    return this.db.executeSql(sql, []);
//  }

//  createTableJugadores(){
//    let sql = 'CREATE TABLE IF NOT EXISTS jugadores(id INTEGER PRIMARY KEY AUTOINCREMENT, id_jugador INTEGER, dni INTEGER, nombre TEXT)';
//    return this.db.executeSql(sql, []);
//  }


//  createTableEncuentrosResultados(){
//    let sql = 'CREATE TABLE IF NOT EXISTS encuentros_resultados(id INTEGER PRIMARY KEY AUTOINCREMENT, encuentro_id INTEGER, lv TEXT, partido TEXT ,n_set INTEGER, puntos INTEGER)';
//    return this.db.executeSql(sql, []);
//  }

}
