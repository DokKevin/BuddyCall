import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FormsModule } from '@angular/forms';

import { AddContactComponent } from './addcontact.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [AddContactComponent],
  exports: [AddContactComponent]
})
export class AddContactComponentModule {}
