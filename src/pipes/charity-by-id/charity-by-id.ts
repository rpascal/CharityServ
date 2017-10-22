import { ENVIRONMENT } from './../../environments/environment.default';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Observable } from 'rxjs/Observable';
import { charity } from './../../models/charity';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CharityByIdPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'charityById',
})
export class CharityByIdPipe implements PipeTransform {
  constructor(public FirebaseProvider: FirebaseProvider) {
    
      }
      transform(charityKey: string): Observable<charity> {
        var charity = this.FirebaseProvider.getDocument<charity>(ENVIRONMENT.firebaseDataPaths.charity, charityKey);
        return charity;
      }
}
