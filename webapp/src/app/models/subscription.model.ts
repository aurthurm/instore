export interface Subscription {
    _id?: string;
    subscriptionType: string;
    startDate:Date;
    endDate:Date;
    userId:string;
    transactionId:string;
}