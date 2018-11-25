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
    public retrievedContacts: Contact[] = []
    public alphContacts: Contact[] = []
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
        // TODO: Check if storing again will overwrite that data or will leave
        // it alone
        // The answer to the above will determine if I need to check for new
        // contacts or if I can simply mass store every time.
        for(let index in this.allContacts){
            this.set(this.allContacts[index].displayName,this.allContacts[index]).then(() => {
                console.log("Stored Contact " + index);
            });
        }

        this.contactStorage.length().then( storeLength => {
            this.length = storeLength;
        });

        this.storage.forEach( (value, key, index) => {
           this.retrievedContacts = [...this.retrievedContacts, value._objectInstance];
        })

        // Alphabetize now so I don't have to store them alphabetically.
        this.alphabetizeContacts().then(sorted => {
            this.alphContacts = sorted;
        });
    }

    // Storage Functions -> TODO: Look into moving into a storage object
    public set(settingName,value){
        return this.contactStorage.set(settingName,value);
    }

    public async get(settingName){
        return await this.contactStorage.get(settingName);
    }

    public async remove(settingName){
        return await this.contactStorage.remove(settingName);
    }

    public clear() {
        this.contactStorage.clear().then(() => {
            console.log('all keys cleared');
        });
    }

    public async alphabetizeContacts(){
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
        return await sortedContacts;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyContactsPage');
  }

}
