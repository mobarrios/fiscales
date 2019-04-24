import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { ModalVotosPage } from '../modal-votos/modal-votos';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MesaDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mesa-detalle',
  templateUrl: 'mesa-detalle.html',
})
export class MesaDetallePage {

   public porcentajeA:number = 0;
   public porcentajeB:number = 0;
   public porcentajeC:number = 0;

   public totalA;
   public totalB;
   public totalC;

   public listas:object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController , public storage:Storage, public platform:Platform) {

      this.getData();
  }

 

  openModal()
  {
    let modal = this.modalCtrl.create(ModalVotosPage)
      modal.present();
      modal.onDidDismiss(()=>{
      this.getData();
    });
  }


  getData()
  {

    if(this.platform.is('cordova'))
      {
        this.storage.get('1').then((val) => {
          if(val)
          this.totalA = val;
        });
        this.storage.get('2').then((val) => {
          if(val)
          this.totalB = val;
        });
        this.storage.get('3').then((val) => {
          if(val)
          this.totalC = val;
        });

        // this.totalA = this.storage.get('1');
        // this.totalB = this.storage.get('2');
        // this.totalC = this.storage.get('3');

      }else{
        this.totalA = localStorage.getItem('1');
        this.totalB = localStorage.getItem('2');
        this.totalC = localStorage.getItem('3');
      } 
    
      if(this.totalA == null)
        this.totalA = 0;
      if(this.totalB == null)
        this.totalB = 0;
      if(this.totalC == null)
        this.totalC = 0;


      let total = (parseFloat(this.totalA) + parseFloat(this.totalB) + parseFloat(this.totalC));

      this.porcentajeA = (parseFloat(this.totalA) * 100) / total;
      this.porcentajeB = (parseFloat(this.totalB) * 100) / total;
      this.porcentajeC = (parseFloat(this.totalC) * 100) / total;


     let a = 
        [
          {
          'nombre' : 'PARTIDO_1',
          'persona' : 'CANDIDATO X',
          'porcentaje'  : this.porcentajeA.toFixed(2),
          'total' : this.totalA,
          'img' : '../../assets/imgs/1X.jpg'
         },
         {
          'nombre' : 'PARTIDO_2',
          'persona' : 'CANDIDATO Y',
          'porcentaje'  : this.porcentajeB.toFixed(2),
          'total' : this.totalB,
          'img' : '../../assets/imgs/2X.jpg'
         },
         {
          'nombre' : 'PARTIDO_3',
          'persona' : 'CANDIDATO  Z',
          'porcentaje'  : this.porcentajeC.toFixed(2),
          'total' : this.totalC,
          'img' : '../../assets/imgs/3X.jpg'
         },
      ]

      this.listas = a.sort(function(a, b) {
        return parseFloat(b.total) - parseFloat(a.total);
    }) ;


  }

}
