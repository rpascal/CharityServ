import { baseInterface } from './../../models/baseModel';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class FirebaseProvider {

  constructor(private afs: AngularFirestore) {
  }


  public getCollectionList<T>(path: string, states?: any[]): Observable<T[]> {
    // .valueChanges() is simple. It just returns the 
    // JSON data without metadata. If you need the 
    // doc.id() in the value you must persist it your self
    // or use .snapshotChanges() instead. See the addItem()
    // method below for how to persist the id with
    // valueChanges()
    return this.afs.collection<T>(path).valueChanges(states);
  }

  public getSnapshot<T>(path: string): Observable<{ id: string, data: T }[]> {
    return this.afs.collection<T>(path).snapshotChanges().map(actions => {
      return actions.map(a => {
        // .snapshotChanges() returns a DocumentChangeAction[], which contains
        // a lot of information about "what happened" with each change. If you want to
        // get the data and the id use the map operator.
        const data = a.payload.doc.data() as T;
        const id = a.payload.doc.id;
        return { id: id, data: data };
      });
    });

  }

  public getPlainSnapshot(path: string){
    return this.afs.collection<any>(path).snapshotChanges();
  }

  public getSnapshotBase<T extends baseInterface>(path: string): Observable<T[]> {
    return this.afs.collection<T>(path).snapshotChanges().map(actions => {
      return actions.map(a => {
        // .snapshotChanges() returns a DocumentChangeAction[], which contains
        // a lot of information about "what happened" with each change. If you want to
        // get the data and the id use the map operator.
        const data = a.payload.doc.data() as T;
        const id = a.payload.doc.id;
        return Object.assign(data, { id: id });
      });
    });

  }


  public stateChange<T>(path: string, states: any[]): Observable<{ id: string, data: T }[]> {
    //['added']  "added" | "removed" | "modified"
    return this.afs.collection<T>(path).stateChanges(states)
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as T;
          const id = a.payload.doc.id;
          return { id: id, data: data };
        })
      });
  }
  public stateChangeBase<T extends baseInterface>(path: string, states: any[]): Observable<T[]> {
    //['added']  "added" | "removed" | "modified"
    return this.afs.collection<T>(path).stateChanges(states)
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as T;
          const id = a.payload.doc.id;
          return Object.assign(data, { id: id });
        })
      });
  }


  getID(): string {
    const id = this.afs.createId();
    return id;
  }

  setItem<T extends baseInterface>(path: string, object: T) {
    console.log(path)
    const id = this.getID();
    const item: T = Object.assign({ id: id }, object);
    return this.afs.collection<T>(path).doc(id).set(item);
  }

  updateItem<T extends baseInterface>(path: string,id: string, object: T) {
    return this.afs.collection<T>(path).doc(id).update(object);
  }
  deleteItem<T extends baseInterface>(path: string,id: string, object: T) {
    return this.afs.collection<T>(path).doc(id).delete();
  }

  addItem<T>(path: string, object: T) {
    return this.afs.collection<T>(path).add(object);
  }

}
