import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { MesaDetallePage } from '../mesa-detalle/mesa-detalle';
import { MapPage } from '../map/map';
import { ConnectionProvider } from '../../providers/connection/connection';

import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  userId:any;
  operativos: any[] = [];
  escuelas: any[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,  public ConnectionPrv: ConnectionProvider,private storage: Storage
    , public platform: Platform) {

      this.ConnectionPrv.getEscuelas()
      .subscribe(
        (data) => { // Success
          this.escuelas = data['results'];
        },
        (error) =>{
          console.error(error);
        }
      );
  };
  

  ionViewDidLoad() {
    
    this.storage.get('user_id').then((val) => 
      {
        // console.log(val);
        this.ConnectionPrv.getOperativos(val)
          .subscribe(
            (data) => { 
              // Success
              this.operativos = data['results'];
              console.log(data['results']);

              
            },
            (error) =>{
              console.error(error);
            }
          );
      });
  
      
  
     

      
  }

  goToMesa(mesas_id,operativos_id)
  {
    this.navCtrl.push(MesaDetallePage,{mesas_id : mesas_id , operativos_id : operativos_id});
  }

  logout()
  {
    console.log('logout');
    this.storage.clear().then(res=>{
      this.platform.exitApp();
    });
  }

  // map()
  // {
  //   this.navCtrl.push(MapPage);
  // }

 
}
