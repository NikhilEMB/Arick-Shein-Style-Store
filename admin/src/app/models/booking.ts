export interface Booking {
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
    // productQty: string,
    // stopWhenNoQty: boolean,
    coverPic: {
        imageId: string,
        mob: string,
        thumb: string,
        url: string
    };
    // minQty: number;
    // maxQty: number;
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
    scheduleData: {
        active: boolean,
        isPredefined: boolean;
        maxDays: number,
        duration: {
            months: number,
            days: number,
            hours: number,
            minutes: number,
        }
        schedules: any[],
    },
    allowPayment: boolean,
    allRegions: {
        active: boolean,
        regions: any[]
    }
    templateId: string,
    productType: string,
    allowAddress: boolean,
    slug: {
        name: string,
        updatedAt: any,
        updatedBy: string
    }
    additionalInfo: {
        customInput: {
            active: boolean,
            label: string,
            required: boolean
        }
    },
    vendorId: string;
}
