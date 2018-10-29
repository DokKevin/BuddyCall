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
          this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails', 'organizations'], {filter: "", multiple: true})
          .then(data => {
              this.allContacts = data
          });
      });
  }

  navToGetContacts(){
      this.alphabetizeContacts();

      // TODO: This lets me hit back button to gather contacts again. Do I want this?
      this.navCtrl.push(MyContactsPage, {contacts: this.allContacts});
  }

  alphabetizeContacts(){
      // Filter out contacts with no Display Name: We are assuming that
      // contacts with no display name are organizations and you don't want
      // to catch up with them anyway.
      this.allContacts = this.allContacts.filter(contact => contact.displayName != null);

      let sortedIndexes: number[]
      let sortedContacts: any

      // Sort by displayName of contact and save indexes to sortedIndexes
      for(let contactIndex in this.allContacts){
          if(parseInt(contactIndex) === 0){
              sortedIndexes = [parseInt(contactIndex)];
          } else {
              for(let sortIndex in sortedIndexes){
                  if(parseInt(sortIndex) === 0 && this.allContacts[parseInt(contactIndex)].displayName.localeCompare(this.allContacts[sortedIndexes[parseInt(sortIndex)]].displayName) < 0){
                      sortedIndexes = [parseInt(contactIndex), ...sortedIndexes];
                      break;
                  } else if(parseInt(sortIndex) === sortedIndexes.length - 1 && this.allContacts[parseInt(contactIndex)].displayName.localeCompare(this.allContacts[sortedIndexes[parseInt(sortIndex)]].displayName) > 0){
                      sortedIndexes = [...sortedIndexes, parseInt(contactIndex)];
                      break;
                  } else if(this.allContacts[parseInt(contactIndex)].displayName.localeCompare(this.allContacts[sortedIndexes[parseInt(sortIndex)]].displayName) < 0){
                      let arrayFront: any
                      let arrayBack: any

                      arrayFront = sortedIndexes.slice(0,parseInt(sortIndex));
                      arrayBack = sortedIndexes.slice(parseInt(sortIndex));

                      sortedIndexes = [...arrayFront, parseInt(contactIndex), ...arrayBack];
                      break;
                  }
              }
          }
      }

      // Sort contacts by gathering contact from allContacts based on sorted
      // indexes in sortedIndexes.
      for(let sortIndex in sortedIndexes){
          if(parseInt(sortIndex) === 0){
              sortedContacts = [this.allContacts[sortedIndexes[parseInt(sortIndex)]]];
          } else {
              sortedContacts = [...sortedContacts, this.allContacts[sortedIndexes[parseInt(sortIndex)]]];
          }
      }

      // Reassign sortedContacts to allContacts
      this.allContacts = sortedContacts;
  }
}
