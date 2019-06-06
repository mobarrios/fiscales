import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { MesaDetallePage } from '../pages/mesa-detalle/mesa-detalle';
import { ModalVotosPage } from '../pages/modal-votos/modal-votos';
import { MapPage } from '../pages/map/map';

import { IonicStorageModule } from '@ionic/storage';
import { DbProvider } from '../providers/db/db';
import { ConnectionProvider } from '../providers/connection/connection';

import { HttpClientModule } from '@angular/common/http';

import { Camera } from '@ionic-native/camera';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



//plugins
// import { Geolocation } from '@ionic-native/geolocation';
// import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    MesaDetallePage,
    ModalVotosPage,
    MapPage,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(
      {
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }
    ),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBL6iZxjchld5wWphF_4FH8926oOsWs2F0'
    // })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    MesaDetallePage,
    ModalVotosPage,
    MapPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectionProvider,
    Camera,
    DbProvider,
    SQLite
    // Geolocation
  ]
})
export class AppModule {}
