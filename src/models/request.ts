import { baseInterface } from './baseModel';
export interface request extends baseInterface{
    charityID : string;
    serviceID : string;
    opened : Date;
    closed? : Date;
    status : 'accepted' | 'declined' | 'pending';
    userID : string;
}