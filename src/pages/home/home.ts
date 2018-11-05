import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyContactsPage } from '../my-contacts/my-contacts';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Contacts],
})
export class HomePage {

  public allContacts: any

  constructor(public navCtrl: NavController, private contacts: Contacts, public platform: Platform) {
      this.platform.ready().then(() =>{
          // Grab contacts from phone
          this.contacts.find(['displayName', 'name', 'phoneNumbers'], {filter: "", multiple: true})
          .then(data => {
              this.allContacts = data
          });
      });
  }

  navToGetContacts(){
      this.filterContacts();

      // TODO: This lets me hit back button to gather contacts again. Do I want this?
      this.navCtrl.push(MyContactsPage, {contacts: this.allContacts});
  }

  filterContacts(){
      // Filter out contacts with no Display Name: We are assuming that
      // contacts with no display name are organizations and you don't want
      // to catch up with them anyway.
      this.allContacts = this.allContacts.filter(contact => contact.displayName != null);
      // Filter out contacts starting with #, assuming these are for your phone
      // service.
      this.allContacts = this.allContacts.filter(contact => contact.displayName.charAt(0) != '#');
  }
}
