export interface VendorMembership {
    active: boolean;
    name: string;
    description: string;
    plans: VendorMembershipPlans[];
}

export interface VendorMembershipPlans {
    name: string;
    months: number;
    price: number;
    discountedPrice: number;
}