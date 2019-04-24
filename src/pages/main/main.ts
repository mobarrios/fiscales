import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MesaDetallePage } from '../mesa-detalle/mesa-detalle';
import { MapPage } from '../map/map';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  goToMesa()
  {
    this.navCtrl.push(MesaDetallePage);
  }

  map()
  {
    this.navCtrl.push(MapPage);
  }

}
