import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MesaDetallePage } from '../mesa-detalle/mesa-detalle';
import { MapPage } from '../map/map';
import { ConnectionProvider } from '../../providers/connection/connection';


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


  operativos: any[] = [];
  escuelas: any[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,  public ConnectionPrv: ConnectionProvider) {
  };
  

  ionViewDidLoad() {

    this.ConnectionPrv.getOperativos()
    .subscribe(
      (data) => { // Success
        this.operativos = data['results'];
        console.log( data['results']);
      },
      (error) =>{
        console.error(error);
      }
    );

    this.ConnectionPrv.getEscuelas()
    .subscribe(
      (data) => { // Success
        this.escuelas = data['results'];
      },
      (error) =>{
        console.error(error);
      }
    );

  }

  goToMesa(mesas_id,  operativos_id)
  {

    this.navCtrl.push(MesaDetallePage,{mesas_id : mesas_id , operativos_id : operativos_id});
  }

  map()
  {
    this.navCtrl.push(MapPage);
  }

}
