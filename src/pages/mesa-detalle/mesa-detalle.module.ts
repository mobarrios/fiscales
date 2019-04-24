import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MesaDetallePage } from './mesa-detalle';

@NgModule({
  declarations: [
    MesaDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(MesaDetallePage),
  ],
})
export class MesaDetallePageModule {}
