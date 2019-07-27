import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ConnectionProvider } from '../../providers/connection/connection';
import { Camera , CameraOptions} from '@ionic-native/camera';
// import { DbProvider } from '../../providers/db/db';
// import { SQLiteObject } from '@ionic-native/sqlite';

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


  // db: SQLiteObject = null;


   public porcentajeA:number = 0;
   public porcentajeB:number = 0;
   public porcentajeC:number = 0;

   public totalA;
   public totalB;
   public totalC;

   public blancos:number = 0;
   public nulos:number = 0;
   public recurridos:number = 0;
   public impugnados:number = 0;


  //  public listas:object;

   public mesas_id:number;
   public operativos_id:number;

   mesas:any[] = [];
   listas:any[] = [];
   listasAll:any[] = [];

   imagenPreview:string;
   enviado:string;




  constructor(  public navCtrl: NavController, public navParams: NavParams, 
                public modalCtrl:ModalController , public storage:Storage, 
                public platform:Platform , public connPrv:ConnectionProvider,
                public alert:AlertController,
                private camara:Camera,
                // public dB:DbProvider,
                ) {

      this.mesas_id = navParams.get('mesas_id');
      this.operativos_id = navParams.get('operativos_id');


      this.storage.get(this.operativos_id+'_'+this.mesas_id).then((data)=>{
        if(data)
         {
          this.alert.create({
            title: '¡Esta mesa ya fue cargada !',
            subTitle: '¡Sus votos han sido enviados correctamente al centro de computos!',
            buttons: ['OK']
          }).present();

          this.navCtrl.pop();
         }
      });

      // dB.create();
    
      this.getData();
  }
 

  // openModal()
  // {
  //   let modal = this.modalCtrl.create(ModalVotosPage)
  //     modal.present();
  //     modal.onDidDismiss(()=>{
  //     this.getData();
  //   });
  // }


  getData()
  {


    // get mesas
    this.connPrv.getMesas(this.mesas_id)
    .subscribe(
      (data) => { // Success
        this.mesas = data['results'];
    },
      (error) =>{
        console.error(error);
      }
    );


    //get listas
    this.connPrv.getListas(this.operativos_id)
    .subscribe(
      (data) => { // Success
        this.listas = data['results'];
        this.listasAll = data['results'].listas;

        console.log(data['results'].listas);
      },
      (error) =>{
        console.error(error);
      }
    );
  }


    enviarVotos()
    {
      // this.connPrv.postVotos(20,1,1,1);


          for(let list of this.listasAll)
          {
              let total = document.getElementsByName(list.id)[0];
              let lista = document.getElementsByName(list.id)[0];              
    
              if(total['value'] > 500)
              {
                this.alert.create({
                  title: '¡Votos Superados!',
                  subTitle: '¡La cantidad de votos no deben superar los 500 !',
            

                  buttons: [
                    {
                      text: 'Ok',
                      role: 'cancel'                      
                    }
                  ]
                }).present();
                return;
              }


              //envia los datos x API
               this.connPrv.postVotos(total['value'],this.operativos_id,this.mesas_id,lista['name'],0,0,0,0)
              .subscribe(
                (data) => { // Success
                  console.log('enviado');
                },
                (error) =>{
                  console.error(error);
                }
              );
              // let sql = 'INSERT INTO votos(mesas_id, listas_id, operativos_id , total) VALUES(?,?,?,?)';
              // let qry = this.db.executeSql(sql, [this.mesas_id,lista['name'],this.operativos_id,total['value']]);

          }

          //envia los datos x API
          this.connPrv.postVotos(0,this.operativos_id,this.mesas_id,99, this.recurridos, this.nulos, this.impugnados, this.blancos)
          .subscribe(
            (data) => { // Success
              console.log('enviado');
            },
            (error) =>{
              console.error(error);
            }
          );

          this.alert.create({
            title: '¡Votos Enviados!',
            subTitle: '¡Sus votos han sido enviados correctamente al centro de computos!',
            buttons: ['OK']
          }).present();

          this.storage.set( this.operativos_id +'_'+this.mesas_id,'true');

          this.navCtrl.pop();
      

    
    }


    abrirCamara()
    {
      console.log('abrio camara');
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camara.DestinationType.FILE_URI,
        encodingType: this.camara.EncodingType.JPEG,
        mediaType: this.camara.MediaType.PICTURE
      }
      
      this.camara.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
       this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
       console.log(imageData);
      }, (err) => {
       // Handle error
       console.log('ERROR EN LA CAMARA', JSON.stringify(err));
      });

    }
    // if(this.platform.is('cordova'))
    //   {
    //     this.storage.get('1').then((val) => {
    //       if(val)
    //       this.totalA = val;
    //     });
    //     this.storage.get('2').then((val) => {
    //       if(val)
    //       this.totalB = val;
    //     });
    //     this.storage.get('3').then((val) => {
    //       if(val)
    //       this.totalC = val;
    //     });

    //     // this.totalA = this.storage.get('1');
    //     // this.totalB = this.storage.get('2');
    //     // this.totalC = this.storage.get('3');

    //   }else{
    //     this.totalA = localStorage.getItem('1');
    //     this.totalB = localStorage.getItem('2');
    //     this.totalC = localStorage.getItem('3');
    //   } 
    
    //   if(this.totalA == null)
    //     this.totalA = 0;
    //   if(this.totalB == null)
    //     this.totalB = 0;
    //   if(this.totalC == null)
    //     this.totalC = 0;


    //   let total = (parseFloat(this.totalA) + parseFloat(this.totalB) + parseFloat(this.totalC));

    //   this.porcentajeA = (parseFloat(this.totalA) * 100) / total;
    //   this.porcentajeB = (parseFloat(this.totalB) * 100) / total;
    //   this.porcentajeC = (parseFloat(this.totalC) * 100) / total;


    //  let a = 
    //     [
    //       {
    //       'nombre' : 'PARTIDO_1',
    //       'persona' : 'CANDIDATO X',
    //       'porcentaje'  : this.porcentajeA.toFixed(2),
    //       'total' : this.totalA,
    //       'img' : '../../assets/imgs/1X.jpg'
    //      },
    //      {
    //       'nombre' : 'PARTIDO_2',
    //       'persona' : 'CANDIDATO Y',
    //       'porcentaje'  : this.porcentajeB.toFixed(2),
    //       'total' : this.totalB,
    //       'img' : '../../assets/imgs/2X.jpg'
    //      },
    //      {
    //       'nombre' : 'PARTIDO_3',
    //       'persona' : 'CANDIDATO  Z',
    //       'porcentaje'  : this.porcentajeC.toFixed(2),
    //       'total' : this.totalC,
    //       'img' : '../../assets/imgs/3X.jpg'
    //      },
    //   ]

    //   this.listas = a.sort(function(a, b) {
    //     return parseFloat(b.total) - parseFloat(a.total);
    // }) ;


  

}
