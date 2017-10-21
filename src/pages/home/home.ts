import { AuthenticationProvider } from './../../providers/authentication/authentication';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';

import { Item, subCollection } from './../../models/ItemModel';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { ENVIRONMENT } from './../../environments/environment.default';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import {  ViewChild } from '@angular/core';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild(Content) content: Content;
  public loggedIn: boolean = false;

  environment: any;
  
    items: Observable<Item[]>;
  
    

  

    constructor(public navCtrl: NavController, private firebase: FirebaseProvider, 
      private AuthenticationProvider : AuthenticationProvider) {
      this.environment = ENVIRONMENT.environment;
      console.log(JSON.stringify(ENVIRONMENT))
  


      this.items = this.firebase.getSnapshotBase<Item>("items").map(data => {
        data.forEach(item => {
          item.subCollection = this.firebase.getCollectionList<subCollection>(`items/${item.id}/subCollection`);
        });
        return data;
  
      })
  
    }


    ionViewWillEnter() {
      this.AuthenticationProvider.redirectIfNotLoggedIn(this.navCtrl).then(loggedIn => {
        this.loggedIn = loggedIn;
        this.content.resize();
      })
    }
  
    public innerAdd(id) {
      const newItem: subCollection = { blah: "Testing" + id };
      this.firebase.setItem(`items/${id}/subCollection`, newItem);
  
    }
  
    public add() {
      const newItem: Item = { name: "Testing" };
      this.firebase.setItem("items", newItem);
    }
  


}
