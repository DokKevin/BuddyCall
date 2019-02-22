import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManageContactsPage } from './manage-contacts.page';
import { ModalcompComponentModule } from '../modalcomp/modalcomp.component.module';

const routes: Routes = [
  {
    path: '',
    component: ManageContactsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalcompComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManageContactsPage]
})
export class ManageContactsPageModule {}
