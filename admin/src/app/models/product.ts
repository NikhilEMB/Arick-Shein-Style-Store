export interface Product {
    showSubheading: boolean;
    prodName: string;
    nameToSearch: string;
    prodDesc: string;
    prodShortDesc: string;
    prodPrice: number;
    status: boolean;
    createdAt: any;
    updatedAt: any;
    sortedAt: any;
    productType: any;
    categories: any;
    brands: any;
    images: any[];
    isPriceList: boolean;
    priceList: any;
    gst: number;
    discountedPrice: any;
    searchKeywords: any;
    productCode: string,
    productQty: string,
    stopWhenNoQty: boolean,
    shippingWeight: number;
    variantType: string;
    color: any;
    minQty: number;
    maxQty: number;
    hsnCode: string;
    purchasePrice: number;
    discount: number;
    subscription: any;
    retailDiscount: number;
    retailDiscountType: string;
    deal: any;
    vendorId: string;
    filters: any;
    metaData : {};
    barcodeNo: any;
    extraCharges : { active: boolean,
        label: string,
        charge:  Number,
        chargeAllQty: boolean },
    gstExclusive : boolean;
    isCod : boolean,
    priceSlabs : {
        active: boolean,
        singleSlabs: any[],
        variantSlabs: {}
    },
    variantGroups : {
        active: boolean,
        groups: any[]
    },
    appointment : {},
    attributes: {},
    additionalInfo: {
        link: {
          active: boolean,
          name: string,
          type: string,
          value: string
        },
        showPrice: boolean,
        sizeChart:{
            active: boolean,
            name: string,
            img:{
                url: string
            }
        },
        countryOfOrigin: string;
    },
    stockAttributes: {
        expiryDate: string,
        manufacturedDate: string,
        shelfLife: string,
    },
    bundleProducts: {
      active: boolean,
      title: string,
      maxProducts: number,
      products: any[]
    },
    allRegions: {
        active: boolean,
        regions: any[]
    }
    templateId: string;
    instaCoverImage: '';
    instaReelUrl: ''
}
