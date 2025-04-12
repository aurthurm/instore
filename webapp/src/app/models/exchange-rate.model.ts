export interface ExchangeRate {
    _id?: string;
    currency: string;
    base: boolean;
    rate: number;
    dateEffective: Date
    
}