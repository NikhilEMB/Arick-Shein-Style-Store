export interface CustomOrder {
    order_id: string;
    order_date: string;
    pickup_location: string;
    billing_customer_name: string;
    billing_last_name: string;
    billing_address: string;
    billing_city: string;
    billing_pincode: number;
    billing_state: string;
    billing_country: string;
    billing_email: string;
    billing_phone: string;
    shipping_is_billing: boolean;
    shipping_customer_name: string;
    shipping_address: string;
    shipping_city: string;
    shipping_pincode: number;
    shipping_country: string;
    shipping_state: string;
    shipping_email: string;
    shipping_phone: number;
    order_items: any[];
    payment_method: string;
    sub_total: number;
    length: number;
    breadth: number;
    height: number;
    weight: number;
};

export interface CourierServiceability {
    pickup_postcode: number;
    delivery_postcode: number;
    order_id: number;
}

export interface GenerateAWB {
    shipment_id: number;
    courier_id: number;
    status?: string;
}

export interface PickupRequest {
    shipment_id: any[];
}

export interface GenerateManifest {
    shipment_id: any[];
}

export interface GenerateLabel {
    shipment_id: any[];
}

export interface GenerateInvoice {
    ids: any[];
}

export interface GenerateTrackingLink {
    shipment_id: number;
}

export interface CancelOrder {
    ids: any[];
}