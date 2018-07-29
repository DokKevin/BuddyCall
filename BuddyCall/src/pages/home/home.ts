import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyContactsPage } from '../my-contacts/my-contacts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  navToGetContacts(){
    // TODO: This lets me hit back button to gather contacts again. Do I want this?
    this.navCtrl.push(MyContactsPage);
  }

}
