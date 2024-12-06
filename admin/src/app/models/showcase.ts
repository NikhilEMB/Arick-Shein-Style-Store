export interface Showcase {
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
    discountedPrice: any;
    searchKeywords: any;
    productCode: string,
    coverPic: {
        imageId: string,
        mob: string,
        thumb: string,
        url: string
    };
    hsnCode: string;
    discount: number;
    metaData: {
        pageTitle: string,
        metaDescription: string,
        metaKeywords: string
    };
    productType: string,
    slug: {
        name: string,
        updatedAt: any,
        updatedBy: string
    }
    additionalInfo: {
        countryOfOrigin: string,
    },
    priceSlabs: {
        active: boolean,
        singleSlabs: any[],
        // variantSlabs: {}
    },
    color: any;
    vendorId: string;
    filters: any;
}
