export interface Lease {
    _id?: string;
    userId: string;
    tenantId: string;
    listingId: string;
    startDate: string;
    endDate: string;
    comment: string;
}
  