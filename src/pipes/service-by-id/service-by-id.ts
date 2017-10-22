import { Observable } from 'rxjs/Observable';
import { ENVIRONMENT } from './../../environments/environment.default';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { service } from './../../models/Service';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ServiceByIdPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'serviceById',
})
export class ServiceByIdPipe implements PipeTransform {
  constructor(public FirebaseProvider: FirebaseProvider) {

  }
  transform(serviceKey: string): Observable<service> {
    var service = this.FirebaseProvider.getDocument<service>(ENVIRONMENT.firebaseDataPaths.service, serviceKey);
    return service;
  }
}
