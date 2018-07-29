import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-contacts',
  templateUrl: 'my-contacts.html',
})
export class MyContactsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      // Installed Contacts Thingy, now gather and display them.
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyContactsPage');
  }

}
