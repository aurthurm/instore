export interface Listing {
    _id?: string;
    listingReference: string;
    title: string;
    gallery: string[];
    descriptors: string[];
    advertiserId: string;
    price: number;
    amenities: string[];
    expirationDate: string;
    priority: number;
    address: string;
    city: string;
    suburb: string;
    street: string;
    subscriptionId: string;
}