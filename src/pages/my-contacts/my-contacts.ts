import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@IonicPage()
@Component({
  selector: 'page-my-contacts',
  templateUrl: 'my-contacts.html',
})
export class MyContactsPage {

    public allContacts: any
    private contactStorage: Storage
    // Temporary
    public length: any
    public testContact: Contact = this.contacts.create();

    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private contacts: Contacts) {
        this.allContacts = navParams.get('contacts');
        this.contactStorage = storage;

        this.updateContacts();
    }

    updateContacts(){
        // Temporary, clear it for now so I know it's empty.
        // this.contactStorage.clear();

        // Alphabetize now so I don't have to store them alphabetically.
        this.alphabetizeContacts();

        // Test storage below here, usually want to alphebetize after getting from storage
        // this.contactStorage.set(this.allContacts[0].displayName, JSON.stringify(this.allContacts[0]));

        this.contactStorage.length().then( storeLength => {
            this.length = storeLength;
        });

        this.contactStorage.get(this.allContacts[0].displayName).then(gotContact => {
            this.testContact = JSON.parse(gotContact)._objectInstance;
        });

    }

    alphabetizeContacts(){
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyContactsPage');
  }

}
