import { ToastProvider } from './../../providers/toast/toast';
import { AuthenticationProvider } from './../../providers/authentication/authentication';
import { request } from './../../models/request';
import { RequestsProvider } from './../../providers/requests/requests';
import { service } from './../../models/Service';
import { Observable } from 'rxjs/Observable';
import { ServicesProvider } from './../../providers/services/services';
import { Category } from './../../models/category';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-servicesbycategory',
  templateUrl: 'servicesbycategory.html',
})
export class ServicesbycategoryPage {

  selectedCategory: Category;

  services: Observable<service[]>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ServicesProvider: ServicesProvider,
    public RequestsProvider: RequestsProvider,
    public AuthenticationProvider: AuthenticationProvider,
    public ToastProvider: ToastProvider) {
    this.selectedCategory = navParams.data;
    this.services = this.ServicesProvider.getServicesFromCategory(this.selectedCategory);
  }

  ionViewDidLoad() {
  }

  request(service: service) {
    this.AuthenticationProvider.getUserID().then(id => {



      let request: request = {
        charityID: service.charityID,
        serviceID: service.id,
        status: 'pending',
        userID: id,
        opened: moment().toDate(),
      };


      this.RequestsProvider.makeRequest(request).then(() => {
        this.ToastProvider.presentToast("Request Made");

      })

    })

  }

}
