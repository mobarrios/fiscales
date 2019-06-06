import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SQLite } from '@ionic-native/sqlite';
import { DbProvider } from '../providers/db/db';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, public splashScreen: SplashScreen,public sqlite:SQLite, public _dbs:DbProvider,
    storage:Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

     // this.createDatabase();

     storage.get('user_id').then((val) => 
      {
        if(val == null)
        {
          this.rootPage = LoginPage;
        }else{
          this.rootPage = TabsPage;
        }

      });
  
    });
  }


  // private createDatabase(){
   
  //   this.sqlite.create({
  //     name: 'data.db',
  //     location: 'default' // the location field is required
  //   })
  //   .then((db) => {
  //     this._dbs.setDatabase(db);
  //     this._dbs.createTableUsers().then(res=>{console.log('tabla createTableUsers creada')});
  //     this._dbs.createTableOperativos().then(res=>{console.log('tabla createTableOperativos creada')});
  //     this._dbs.createTableListas().then(res=>{console.log('tabla createTableListas creada')});
  //     this._dbs.createTableMesas().then(res=>{console.log('tabla createTableMesas creada')});
  //     this._dbs.createTableVotos().then(res=>{console.log('tabla createTableVotos creada')});
  //     this._dbs.createTableOperativosListas().then(res=>{console.log('tabla createTableOperativosListas creada')});
  //     this._dbs.createTableOperativosMesas().then(res=>{console.log('tabla createTableOperativosMesas creada')});
  //     this._dbs.createTableUsersOperativosMesas().then(res=>{console.log('tabla createTableUsersOperativosMesas creada')});
  //   })
  //   .then(() =>{
  //     this.splashScreen.hide();
  //     //this.splashScreen.hide();
  //     //this.rootPage = 'HomePage';
  //   })
  //   .catch(error =>{
  //     console.error(error);
  //   });
  // }
}

