import { FirebaseProvider } from './../../providers/firebase/firebase';
import { ENVIRONMENT } from './../../environments/environment.default';
import { AuthenticationProvider } from './../../providers/authentication/authentication';
import { RequestsProvider } from './../../providers/requests/requests';
import { request } from './../../models/request';
import { Observable } from 'rxjs/Observable';
import { service } from './../../models/service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-requests',
  templateUrl: 'view-requests.html',
})
export class ViewRequestsPage {



  currentStatus: 'accepted' | 'declined' | 'pending' = 'pending';

  requests: Observable<request[]>

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public RequestsProvider: RequestsProvider,
    public AuthenticationProvider: AuthenticationProvider,
    public firebase: FirebaseProvider) {
    this.AuthenticationProvider.getUserID().then(id => {
      this.requests = this.RequestsProvider.getRequest(id);
    })
  }

  ionViewDidLoad() {
  }

  statusChange() {
    this.RequestsProvider.filterByStatus(this.currentStatus);
  }


  delete(request: request) {
    this.firebase.deleteItem(ENVIRONMENT.firebaseDataPaths.request, request.id, request)
  }


}
