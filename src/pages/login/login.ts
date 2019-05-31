import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { ConnectionProvider } from '../../providers/connection/connection';
import { DbProvider } from '../../providers/db/db';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private user:string;
  private pass:string;
  public  error:string;
 
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public conn:ConnectionProvider,
    public dbProv:DbProvider
    ){
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Ingresar()
  {
    this.conn.getUsuarios(this.user,this.pass).subscribe(
      (data) => { // Success
         this.storeData(data);
         
         this.conn.getMesasByUsers(this.user).subscribe((data)=>{
          
           for(let r of data['results'])
           {
             this.dbProv.insertOperativosMesas(r);
             this.dbProv.insertOperativos(r);
             this.dbProv.insertMesas(r);
          }
       });
        this.navCtrl.setRoot(TabsPage);   

    },
      (error) =>{
        console.error(error);
        this.error = error.statusText;
      }
    );
  }

  storeData(token)
  {
    this.dbProv.getUser(this.user,token);
  }

}
