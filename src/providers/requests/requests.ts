import { ENVIRONMENT } from './../../environments/environment.default';
import { FirebaseProvider } from './../firebase/firebase';
import { request } from './../../models/request';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RequestsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestsProvider {

  constructor(public firebase: FirebaseProvider) {
  }

  makeRequest(request: request) {
    return this.firebase.addItem(ENVIRONMENT.firebaseDataPaths.request, request);

  }


}
