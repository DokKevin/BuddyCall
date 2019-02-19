import { Component, OnInit } from '@angular/core';
import { Contacts, Contact } from '@ionic-native/contacts/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-manage-contacts',
  templateUrl: './manage-contacts.page.html',
  styleUrls: ['./manage-contacts.page.scss'],
})
export class ManageContactsPage implements OnInit {

    public allContacts: any;
    public retrievedContacts: Contact[] = [];
    public alphContacts: Contact[] = [];
    private contactStorage: Storage;
    public length: any

  constructor(private contacts: Contacts, private storage: Storage) {
      this.contactStorage = storage;
  }

  ngOnInit() {
      // Grab Contacts From phone
      this.contacts.find(['displayName', 'name', 'phoneNumbers'], {filter: "", multiple: true})
      .then(data => {
          this.allContacts = data;

          this.filterContacts().then(() => {
              this.updateContacts();
          });
      });
  }

  public async filterContacts(){
      // Filter out contacts with no Display Name: We are assuming that
      // contacts with no display name are organizations and you don't want
      // to catch up with them anyway.
      this.allContacts = this.allContacts.filter(contact => contact.displayName != null);
      // Filter out contacts starting with #, assuming these are for your phone
      // service.
      this.allContacts = this.allContacts.filter(contact => contact.displayName.charAt(0) != '#');
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

  // Storage Functions
  // TODO: Look into moving into a storage object/provider
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

}
