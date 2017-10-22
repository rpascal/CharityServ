import { ENVIRONMENT } from './../environments/environment.default';
import { FirebaseProvider } from './../providers/firebase/firebase';
import { UserModel } from './../models/user';
import { Observable } from 'rxjs/Observable';
import { AuthenticationProvider } from './../providers/authentication/authentication';
import { AlertProvider } from './../providers/alert/alert';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Subject } from 'rxjs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  curUser: Observable<UserModel>;

  rootPage: any = "HomePage";

  activePage = new Subject();

  public pages: Array<{ title: string, component: any, active: boolean, icon: string, logout?: boolean }>;
  state: any;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public alert: AlertProvider,
    public AuthenticationProvider: AuthenticationProvider,
    public firebase: FirebaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });



    this.pages = [
      { title: 'Home', component: 'HomePage', active: true, icon: 'home' },
      { title: 'Requests', component: 'ViewRequestsPage', active: false, icon: 'archive' },

      // { title: 'Profile', component: 'ProfilePage', active: false, icon: 'person' },
      { title: 'Logout', component: 'TestPage', active: false, icon: 'exit', logout: true },

    ];

    //jkdshkd
    this.activePage.subscribe((selectedPage: any) => {
      this.pages.map(page => {
        page.active = page.title === selectedPage.title;
      });
    });


    this.AuthenticationProvider.getUserID().then(val => {
      console.log(val)
      if (val) {
        //this.userID = val;
        this.curUser = this.firebase.getDocument(ENVIRONMENT.firebaseDataPaths.users, val);
      } else {

      }
    });


  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario


    if (page.logout) {
      this.logout()
    } else {
      this.nav.setRoot(page.component);
      this.activePage.next(page);
    }
  }

  logout() {
    this.alert.showConfirm("Confirm Logout", "Are you sure?", "Cancel", "Logout").then(confirm => {
      if (confirm) {
        // this.Loader.showSpinner();
        this.AuthenticationProvider.logout().then(() => {
          // this.Loader.hide();
          this.nav.setRoot('LoginPage');
        });
      }
    });
  }

}

