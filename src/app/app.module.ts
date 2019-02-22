import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {CommonModule} from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Contacts } from '@ionic-native/contacts/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { ModalcompComponent } from './modalcomp/modalcomp.component';
import { ModalcompComponentModule } from './modalcomp/modalcomp.component.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [ModalcompComponent],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      ModalcompComponentModule,
      IonicStorageModule.forRoot({
         name: '__buddyStorage',
         driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
     })],
  providers: [
    StatusBar,
    SplashScreen,
    Contacts,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
