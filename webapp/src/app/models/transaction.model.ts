import { User } from "./user.model";

export interface Transaction{
    _id?: string;
    amount: number;
    transactionType: string;
    description: string;
    currency: string;
    reference: string;
    user: User;
}