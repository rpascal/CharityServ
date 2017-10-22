export interface request{
    charityID : string;
    serviceID : string;
    opened : Date;
    closed? : Date;
    status : 'accepted' | 'declined' | 'pending';
    userID : string;
}