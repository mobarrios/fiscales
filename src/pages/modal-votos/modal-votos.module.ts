import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalVotosPage } from './modal-votos';

@NgModule({
  declarations: [
    ModalVotosPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalVotosPage),
  ],
})
export class ModalVotosPageModule {}
