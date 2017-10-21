import { Component,ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Subject } from 'rxjs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage: any = "HomePage";

  activePage = new Subject();

  public pages: Array<{ title: string, component: any, active: boolean, icon: string }>;
  state: any;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


    this.pages = [
      { title: 'Home', component: 'HomePage', active: true, icon: 'home' },
      { title: 'My Address', component: 'TestPage', active: false, icon: 'map' },
      {
        title: 'My Orders',
        component: 'HomePage', active: false, icon: 'ionic'
      },
      { title: 'My Cart', component: 'HomePage', active: false, icon: 'ionic' },
      { title: 'Login', component: 'TestPage', active: false, icon: 'archive' },
      { title: 'Offer Zone', component: 'HomePage', active: false, icon: 'body' },
      { title: 'Need Help', component: 'TestPage', active: false, icon: 'bookmarks' },
      { title: 'Rate Us', component: 'HomePage', active: false, icon: 'book' },
      { title: 'Settings', component: 'TestPage', active: false, icon: 'map' },

    ];

    this.activePage.subscribe((selectedPage: any) => {
      this.pages.map(page => {
        page.active = page.title === selectedPage.title;
      });
    });




  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage.next(page);
  }

}

