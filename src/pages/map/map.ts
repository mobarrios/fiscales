import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as mapboxgl from 'mapbox-gl';



/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {


map:mapboxgl.Map;
lat = -34.5970432; 
lon = -58.6431925;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) 
  {
    mapboxgl.accessToken = 'pk.eyJ1IjoibW9iYXJyaW9zIiwiYSI6ImNqdXg3YTlsYzAwMm00MG8wOGdwZjY2NnEifQ.GLzsC9lze867YtvXJ7lgWQ';
  }

  ionViewDidLoad() {
    this.buildMap();
  }

  buildMap()
  {


    if (!mapboxgl.supported()) {
      this.alertCtrl.create({
        title: 'Your browser does not support Mapbox GL',
        buttons: ['OK']
      }).present
     
    } else {

      this.map  = new mapboxgl.Map({
        container : 'map',
        style : 'mapbox://style/mapbox/streets-v11',
        zoom : 14,
        center : [this.lon,this.lat]
      });
    }

  

    console.log(this.map);
  }

}
