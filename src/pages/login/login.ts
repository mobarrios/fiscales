import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { ConnectionProvider } from '../../providers/connection/connection';
import { DbProvider } from '../../providers/db/db';
import { Storage } from '@ionic/storage';



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
    public dbProv:DbProvider,
    private storage: Storage
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
         console.log(data);
      //    this.conn.getMesasByUsers(this.user).subscribe((data)=>{      
      //      for(let r of data['results'])
      //      {
      //        this.dbProv.insertOperativosMesas(r);
      //        this.dbProv.insertOperativos(r);
      //        this.dbProv.insertMesas(r);
      //     }
      //  });

        this.navCtrl.setRoot(TabsPage);   

    },
      (error) =>{
        console.error(JSON.stringify(error));
        this.error = error.statusText;
      }
    );
  }

  storeData(data)
  {
    //this.dbProv.getUser(this.user,token);
    this.storage.set('user_id',data.id);
    this.storage.set('user_name',data.user_name);
    this.storage.set('token',data.remember_token);
  }

}
