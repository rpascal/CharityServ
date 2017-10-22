import { baseInterface } from './baseModel';
export interface UserModel extends baseInterface{
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    
    declinedCount: number;
    acceptedCount: number;
    pendingCount: number;
}