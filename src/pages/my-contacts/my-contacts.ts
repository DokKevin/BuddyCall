import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-my-contacts',
  templateUrl: 'my-contacts.html',
})
export class MyContactsPage {

    public allContacts: any

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.allContacts = navParams.get('contacts');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyContactsPage');
  }

}
