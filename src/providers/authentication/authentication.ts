import { ENVIRONMENT } from './../../environments/environment.default';
import { UserModel } from './../../models/user';
import { FirebaseProvider } from './../firebase/firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from "rxjs/Subscription"
import 'rxjs/add/operator/takeUntil';

import 'rxjs/add/operator/take';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthenticationProvider {

  private subscriptions: Subscription[] = [];

  constructor(public angularfireAuth: AngularFireAuth,
    public db: AngularFirestore,
    public firebase: FirebaseProvider) {
  }

  public redirectIfNotLoggedIn(navCtrl: NavController): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.isLoggedIn().then(loggedIn => {
        if (loggedIn) {
          resolve(true)
        } else {
          navCtrl.setRoot("LoginPage")
          resolve(false)
        }
      });
    });
  }

  public getUserID(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.angularfireAuth.authState.take(1).subscribe(user => {
        if (user) {
          resolve(user.uid);
        }
        else
          resolve(null)
      })
    });

  }


  public isLoggedIn() {
    return new Promise((resolve, reject) => {
      this.angularfireAuth.authState.take(1).subscribe(user => {
        console.log("user", user)
        if (user)
          this.firebase.checkExist(ENVIRONMENT.firebaseDataPaths.users, user.uid).then(val => {
            resolve(val)
          })
        else
          resolve(false)
      })
    });
  }

  public loginWithEmail(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.angularfireAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }



  public createUserWithEmailAndPassword(newuser: UserModel, email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.angularfireAuth.auth.createUserWithEmailAndPassword(email, password).then(res => {
        this.loginWithEmail(email, password).then(user => {
          console.log(user.uid, ENVIRONMENT.firebaseDataPaths.users, newuser);
          this.firebase.setItemWithID(user.uid, ENVIRONMENT.firebaseDataPaths.users, newuser);
          resolve(user);
        }).catch(error => {
          reject(error);
        });
      }).catch(error => {
        reject(error);
      });
    });
  }

  public logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dispose();
      this.angularfireAuth.auth.signOut().then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }

  dispose() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

}
