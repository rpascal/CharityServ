import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Category } from './../../models/category';
import { AngularFirestore } from 'angularfire2/firestore';
import { service } from './../../models/Service';
import { ENVIRONMENT } from './../../environments/environment.default';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
  //pull from db.
  constructor(public AFS: AngularFirestore) {
    console.log('Hello ServicesProvider Provider');
  }

  public getServiceCategories() {
    return this.AFS.collection<Category>(ENVIRONMENT.firebaseDataPaths.ServiceCategories, ref => ref.where("isActive", "==", true).orderBy('name')).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Category;
        const id = a.payload.doc.id;
        return Object.assign(data, { id: id });
      });
    });

  }

  public getServicesFromCategory(Category: Category) {
    return this.AFS.collection<service>(ENVIRONMENT.firebaseDataPaths.service, ref => ref.where("MainCategory", '==', Category.name).where("isActive", "==", true)).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as service;
        const id = a.payload.doc.id;
        return Object.assign(data, { id: id });
      });
    });


  }

}
