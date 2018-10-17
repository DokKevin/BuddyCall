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
    public filteredContacts: any

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.allContacts = navParams.get('contacts');
        // Filter out contacts with no Display Name: We are assuming that
        // contacts with no display name are organizations and you don't want to
        // catch up with them anyway.
        this.filteredContacts = this.allContacts.filter(contact => contact.displayName != null);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyContactsPage');
  }

}
