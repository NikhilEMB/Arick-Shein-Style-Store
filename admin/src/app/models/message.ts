export interface ChatMsg {
    type: string;
    message: string;
    createdAt: Date;
    images: any;
    isRead: boolean;
    author: string;
    published: boolean;
    thumb: any;
    mob: any;
    imageCount: number
}
