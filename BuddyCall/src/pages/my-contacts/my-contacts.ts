import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@IonicPage()
@Component({
  selector: 'page-my-contacts',
  templateUrl: 'my-contacts.html',
  providers: [Contacts],
})
export class MyContactsPage {

    public allContacts: any
    public heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];

    constructor(public navCtrl: NavController, public navParams: NavParams, private contacts: Contacts) {
        // This gives an error -> it says the plugin isn't installed. Seems like it may be 
        // this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], {filter: "", multiple: true})
        // .then(data => {
        //     this.allContacts = data
        // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyContactsPage');
  }

}
