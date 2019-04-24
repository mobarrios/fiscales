import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { Storage } from '@ionic/storage';


/**
 * Generated class for the ModalVotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-votos',
  templateUrl: 'modal-votos.html',
})
export class ModalVotosPage {

  public votos;
  public cant;


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public platform:Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalVotosPage');
  }

  guardar()
  {
      let lista  = this.votos; 
      let q = this.cant;

      if(this.platform.is('cordova'))
      {
        this.storage.get('1').then((val) => {
          if(val)
          {
            let t =  parseFloat(val) + parseFloat(q) ;
            this.storage.set(lista,t);
          }
        });

      }else{

        let tDb = localStorage.getItem(lista);
        let t; 

        if(tDb == 'NaN')
          t = parseInt(q);
        else
          t = parseInt(tDb) + parseInt(q); 

      
        localStorage.setItem(lista, t.toString());

      } 

      
      this.navCtrl.pop();
  }

}
