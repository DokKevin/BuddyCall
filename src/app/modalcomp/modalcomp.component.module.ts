import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ModalcompComponent } from './modalcomp.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [ModalcompComponent],
  exports: [ModalcompComponent]
})
export class ModalcompComponentModule {}
