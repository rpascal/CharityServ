import { baseInterface } from './baseModel';
import { Observable } from 'rxjs/Observable';


export interface Item extends baseInterface {
    name: string;
    subCollection? : Observable<subCollection[]>;
}

export interface subCollection extends baseInterface{
    blah : string
}