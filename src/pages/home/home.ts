import { ServicesProvider } from './../../providers/services/services';
import { AuthenticationProvider } from './../../providers/authentication/authentication';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { Item, subCollection } from './../../models/ItemModel';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { ENVIRONMENT } from './../../environments/environment.default';
import { Category } from './../../models/category';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { ViewChild } from '@angular/core';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  environment: any;
  category: Observable<Category[]>;

  @ViewChild(Content) content: Content;
  public loggedIn: boolean = false;

  constructor(public navCtrl: NavController,
    private firebase: FirebaseProvider,
    private AuthenticationProvider: AuthenticationProvider,
    public ServicesProvider: ServicesProvider) {
    this.category = this.ServicesProvider.getServiceCategories();//this.firebase.getSnapshotBase<Category>(ENVIRONMENT.firebaseDataPaths.ServiceCategories);
  }


  ionViewWillEnter() {
    this.AuthenticationProvider.redirectIfNotLoggedIn(this.navCtrl).then(loggedIn => {
      this.loggedIn = loggedIn;
      this.content.resize();
      console.log("logged in")


    })
  }

  servicesByCategory(Category: Category) {
    this.navCtrl.push("ServicesbycategoryPage", Category);

  }


}
