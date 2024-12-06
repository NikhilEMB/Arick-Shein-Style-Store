export interface FoodItem {
    approved: boolean;
    prodName: string;
    nameToSearch: string;
    prodDesc: string;
    prodShortDesc: string;
    prodPrice: number;
    status: boolean;
    createdAt: any;
    updatedAt: any;
    sortedAt: any;
    categories: any;
    brands: any;
    images: any[];
    gst: number;
    discountedPrice: any;
    searchKeywords: any;
    productCode: string,
    productQty: string,
    stopWhenNoQty: boolean,
    coverPic: {
        imageId: string,
        mob: string,
        thumb: string,
        url: string
    };
    minQty: number;
    maxQty: number;
    hsnCode: string;
    purchasePrice: number;
    discount: number;
    subscription: any;
    deal: any;
    metaData: {
        pageTitle: string,
        metaDescription: string,
        metaKeywords: string
    };
    barcodeNo: any;
    extraCharges: {
        active: boolean,
        label: string,
        charge: Number,
        chargeAllQty: boolean
    },
    gstExclusive: boolean;
    isCod: boolean,
    allowPayment: boolean,
    regions: any[],
    templateId: string,
    productType: string,
    foodType: string,
    slug: {
        name: string,
        updatedAt: any,
        updatedBy: string
    }
}
