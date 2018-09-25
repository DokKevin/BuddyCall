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
          this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], {filter: "", multiple: true})
          .then(data => {
              this.allContacts = data
          });
      });
  }

  navToGetContacts(){
    // TODO: This lets me hit back button to gather contacts again. Do I want this?
    this.navCtrl.push(MyContactsPage, {contacts: this.allContacts});
  }

}
