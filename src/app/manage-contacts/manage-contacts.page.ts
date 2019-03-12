import { Component, OnInit } from '@angular/core';
import { Contacts, Contact } from '@ionic-native/contacts/ngx';
import { Storage } from '@ionic/storage';
import { NavController , ModalController } from '@ionic/angular';

import { ModalcompComponent } from '../modalcomp/modalcomp.component';
import { AddContactComponent } from '../addcontact/addcontact.component';

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

  constructor(private contacts: Contacts, private storage: Storage,
              public navCtrl: NavController, public modalController: ModalController) {
      this.contactStorage = storage;
  }

  ngOnInit() {
      this.updateContacts();
  }

  public getContactsFromPhone(){
      // Grab Contacts From phone
      this.contacts.find(['displayName', 'name', 'phoneNumbers'], {filter: "", multiple: true})
      .then(data => {
          this.allContacts = data;

          this.filterContacts().then( () => {
              this.retrievedContacts = this.allContacts;
              this.alphabetizeContacts().then(sorted => {
                  // It's not happening in the right oreder, this is happening too soon
                  this.allContacts = sorted;
                  console.log("After Sorted");
                  console.log(this.allContacts);
                  this.displayAddModal();
              });
          });
      });
  }

  public async displayAddModal(){
      const modal = await this.modalController.create({
          component: AddContactComponent,
          componentProps: { value: this.allContacts },
          showBackdrop: true,
          cssClass: 'addcontact-popup'
      });
      await modal.present();
      let toAdd = await modal.onDidDismiss();

      for(let person of toAdd.data.result){
          this.set(person.displayName, person).then(() => {
              console.log("Stored Contact: " + person.displayName);
          });
      }

      this.updateContacts();
  }

  public async filterContacts(){
      // Filter out contacts with no Display Name: We are assuming that
      // contacts with no display name are organizations and you don't want
      // to catch up with them anyway.
      this.allContacts = this.allContacts.filter(contact => contact.displayName != null);

      // Filter out contacts starting with #, assuming these are for your phone
      // service.
      this.allContacts = this.allContacts.filter(contact => contact.displayName.charAt(0) != '#');

      // TODO: Filter based on contacts already stored
      this.contactStorage.forEach( (value, key, index) => {
          this.allContacts = this.allContacts.filter(contact => contact.displayName != value._objectInstance.displayName);
          console.log("Inside Filtered");
          console.log(this.allContacts);
      });

      console.log("Filtered");
      console.log(this.allContacts);
  }

  updateContacts(){
      // for(let index in this.allContacts){
      //     this.set(this.allContacts[index].displayName,this.allContacts[index]).then(() => {
      //         console.log("Stored Contact " + index + ": " + this.allContacts[index].displayName);
      //     });
      // }

      this.retrievedContacts = [];

      this.contactStorage.length().then( storeLength => {
          console.log("storeLength: " + storeLength);
          this.length = storeLength;
          console.log("length: " + this.length);
      });

      this.contactStorage.forEach( (value, key, index) => {
         this.retrievedContacts = [...this.retrievedContacts, value._objectInstance];
         console.log("Index from Storage: " + index);
     }).then( () => {
         // Alphabetize now so I don't have to store them alphabetically.
         this.alphabetizeContacts().then(sorted => {
             this.alphContacts = sorted;
         });
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

  async openModal(toDelete : Contact) {
      console.log("FirstName: " + toDelete.firstName);
    const modal = await this.modalController.create({
      component: ModalcompComponent,
      componentProps: { value: toDelete.firstName },
      showBackdrop: true,
      cssClass: 'modal-popup'
    });
    await modal.present();
    let shouldDelete = await modal.onDidDismiss();

    console.log(shouldDelete);
    console.log("ShouldDelete[0]: " + shouldDelete.data.result);

    if(shouldDelete.data.result == 1){
        console.log("Should Delete 1")
        this.clickDelete(toDelete);
    } else {
        console.log("Should Delete 0")
        // Do Nothing
    }
  }

  public clickDelete(toDelete : Contact){
      this.alphContacts = this.alphContacts.filter(item => item != toDelete);

      this.remove(toDelete.displayName).then(() => {
          this.updateContacts();
      });
  }

  public async alphabetizeContacts(){
      let sortedIndexes: number[]
      let sortedContacts: any

      // Sort by displayName of contact and save indexes to sortedIndexes
      for(let contactIndex in this.retrievedContacts){
          if(parseInt(contactIndex) === 0){
              sortedIndexes = [parseInt(contactIndex)];
          } else {
              for(let sortIndex in sortedIndexes){
                  if(parseInt(sortIndex) === 0 && this.retrievedContacts[parseInt(contactIndex)].displayName.localeCompare(this.retrievedContacts[sortedIndexes[parseInt(sortIndex)]].displayName) < 0){
                      sortedIndexes = [parseInt(contactIndex), ...sortedIndexes];
                      break;
                  } else if(parseInt(sortIndex) === sortedIndexes.length - 1 && this.retrievedContacts[parseInt(contactIndex)].displayName.localeCompare(this.retrievedContacts[sortedIndexes[parseInt(sortIndex)]].displayName) > 0){
                      sortedIndexes = [...sortedIndexes, parseInt(contactIndex)];
                      break;
                  } else if(this.retrievedContacts[parseInt(contactIndex)].displayName.localeCompare(this.retrievedContacts[sortedIndexes[parseInt(sortIndex)]].displayName) < 0){
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
              sortedContacts = [this.retrievedContacts[sortedIndexes[parseInt(sortIndex)]]];
          } else {
              sortedContacts = [...sortedContacts, this.retrievedContacts[sortedIndexes[parseInt(sortIndex)]]];
          }
      }

      return await sortedContacts;
  }

  navHome(){
      this.navCtrl.navigateBack('/home');
  }
}
