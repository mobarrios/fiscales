import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConnectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConnectionProvider {

  private url ;


  constructor(public http: HttpClient) {
    console.log('Hello ConnectionProvider Provider');

  //this.url = 'http://18.229.27.230/votar_back/public/api/';
  //this.url = 'http://localhost/votar_back/public/api/';

  this.url = 'http://fiscales.kuix.la/api/';
  }


  getMesasByUsers(userName:string)
  {
    return this.http.get(this.url + 'getMesasByUsers'+'/'+userName);
  }

  getUsuarios(user:string, pass:string) {

       // return this.http.get('http://votar.coders.com.ar/public/api/getOperativos');

    
    //return this.http.get('https://randomuser.me/api/?results=25');
    return this.http.get(this.url + 'getUsers'+'/'+user+'/'+pass);
  }

  getOperativos(userId) {
    //return this.http.get('https://randomuser.me/api/?results=25');
    return this.http.get(this.url + 'getOperativos/'+userId);
  }

  getEscuelas() {
    //return this.http.get('https://randomuser.me/api/?results=25');
    return this.http.get(this.url +'getEscuelas');
  }

  getMesas(id:number) {
    //return this.http.get('https://randomuser.me/api/?results=25');
    return this.http.get(this.url +'getMesas/'+id);
  }

  getCandidatos(id:number) {
    //return this.http.get('https://randomuser.me/api/?results=25');
    return this.http.get(this.url +'getCandidatos/'+id);
  }

  getListas(id:number) {
    //return this.http.get('https://randomuser.me/api/?results=25');
    return this.http.get(this.url +'getListas/'+id);
  }

  postVotos(cantVotos:number,idOperativos:number, idMesas:number, idListas:number, recurridos:number, nulos:number, impugnados:number,blancos:number)
  {
    // let httpOptions = {
    //   headers: new HttpHeaders({
    //       'Content-Type':  'application/json',
    //       'X-XSRF-TOKEN': 'dassdasdasdad131312312',

    //       // 'Authorization': 'Bearer '+ this._us.getToken(),
    //       'Access-Control-Allow-Origin':'*',
    //     })
    // };

    return this.http.get(this.url +'postVotos/'+cantVotos+'/'+idOperativos+'/'+idMesas+'/'+idListas+'/'+recurridos+'/'+nulos+'/'+impugnados+'/'+blancos);

  }
}
