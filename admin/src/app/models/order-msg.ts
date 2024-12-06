export interface OrderMsg {
    type: string;
    status: string;
    createdAt: Date;
    author: string;
    isRead: boolean;
    published: boolean;
    products: any;
}
