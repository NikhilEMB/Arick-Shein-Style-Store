export interface User {
    name: string;
    email: string;
    phoneNo: string;
    createdAt: Date;
    lastAccessAt: Date;
    active: boolean;
    dP: string;
    role: string;
    vacations: any;
    paymentInfo: string;
    defaultAddress: any;
    readTerms: boolean;
    wallet: any;
    loginMode: string;
}
