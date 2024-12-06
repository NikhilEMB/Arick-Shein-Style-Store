import { Component, OnInit } from '@angular/core';
import { AlertController, Events, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { StatesModalPage } from 'src/app/states-modal/states-modal.page';
import { ConfigService } from 'src/app/services/config/config.service';
import { ProductVariantPage } from './product-variant/product-variant.page';
import { Router } from '@angular/router';
import { CreateSubscriptionPage } from './create-subscription/create-subscription.page';
import { ProductSubscriptionsService } from 'src/app/services/product-subscriptions/product-subscriptions.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user/user.service';
import { Storage } from '@ionic/storage';
import { SearchEngineService } from 'src/app/services/search-engine/search-engine.service';
import { CouponsListPage } from '../coupons-list/coupons-list.page';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.page.html',
  styleUrls: ['./create-order.page.scss'],
})
export class CreateOrderPage implements OnInit {
  loading: any;
  // Step 1
  userName = '';
  userList:any = [];
  selectedUser = {
    id: '',
    name: '',
    phoneNo: '',
    subRole: ''
  };
  statusIndex = 1;
  typingTimer;
  doneTypingInterval = 1000;

  // Step 2
  userAddressExists = false;
  userAddress = {
    address: '',
    city: '',
    state: '',
    stateCode: '',
    pincode: '',
    phoneNo: '',
    createdAt: new Date(),
    defaultAddress: true,
    name: ''
  };
  shippingSameAsBilling = true;
  billingAddress = {
    address: '',
    city: '',
    state: '',
    stateCode: '',
    pincode: '',
    phoneNo: '',
    createdAt: new Date(),
    name: ''
  }
  taxType;
  
  // Step 3
  searchProduct: string = '';
  productList = [];
  productsAdded =[];
  page: number = 0;
  noMoreSearchProducts: boolean = false;
  subscriptionFeature = false;

  // Step 4
  currencyCode: any;
  delivery = 0;
  additionalDiscount = 0;
  orderObj = {
    orderId: null,
    status: 'Confirmed',
    createdAt: new Date(),
    payment: {
      completed: false,
      mode: 'cash',
      details: {
        amount: null
      }
    },
    discount: 0,
    // couponDiscount: 0,
    // couponId: '',
    // couponName: '',
    scheduledDate: '',
    scheduledTime: '',
    deliveryGstObj: {
      value: 0,
      total: 0
    },
    customerGstNo: '',
    storePickupObj: {},
    region: '',
    vendorId: '',
    membershipDiscount: 0
  };
  productsPrice = 0;
  totalGst = 0;
  customerGstNo = '';
  searchUser: string = '';
  searchUserPhone: string = '';
  phoneLimit = 10;
  orderBy = {
    role: '',
    id: '',
    name: '' 
  };
  isQuotationOrder = false;
  isRFQ = false;
  userRole = "";
  searchValue = '';
  defaultCountryCode;
  couponCode: string = '';
  couponApplied: boolean = false;
  couponDiscount: number = 0;
  couponId:string='';
  isCodAvailableForCoupon: boolean = true;
  // loader: any;
  isGstApplicable: boolean = true;
  paymentDetails = {
    products:[],
    totalMrp:0,
    discountOnMrp:0,
    totalGst:0,
    totalPayable:0,
    delivery: {
      deliveryCost:0,
    },
    deliveryGstObj:{
      value: 0
    }
  };
  totalAmountToPaid=0;
  totalMrp=0;
  discountOnMrp=0;
  listOfCommentImages = {};
  showCommentBoxAndImage: boolean = false;

  // isInventoryManaged = false;

  constructor(
    private events: Events,
    private modalController: ModalController,
    private toastController: ToastController,
    private configService: ConfigService,
    private loadingController: LoadingController,
    private router: Router,
    private productSubscriptionsService: ProductSubscriptionsService,
    private alertController: AlertController,
    private sharedService: SharedService,
    private userService: UserService,
    private storage: Storage,
    private searchEngineService: SearchEngineService
  ) { }

  async ngOnInit() {
    console.log('orderBy:', this.orderBy);
    this.phoneLimit = this.configService.environment.phoneLength
    this.orderBy.role = await this.storage.get('userRole');
    this.orderBy.id = await this.storage.get('uid');
    this.orderBy.name = await this.storage.get('userName');
    this.userRole = await this.storage.get('userRole');
  }

  async ionViewWillEnter() {
      this.initializeSubscriptions();
      this.currencyCode = this.configService.environment.currencyCode;
      this.subscriptionFeature = this.configService.environment.subscriptionFeature;
      this.taxType = this.configService.environment.taxType;
      this.isRFQ = this.configService.environment.RFQFeature;
      
      this.storage.get('storeInfo').then((data) => {
        console.log("storeInfo",data);
        this.showCommentBoxAndImage = data.allowComment || false;
      });

    // console.log("projectId: ", environment.firebase.projectId);
    // if (environment.firebase.projectId == 'bwi-aarkay') {
    //   this.isInventoryManaged = true;
    // } else {
    //   this.isInventoryManaged = false
    // }
    // console.log("isInventoryManaged: ", this.isInventoryManaged);

  }

  ionViewWillLeave() {
      this.removeSubscriptions();
  }
  async presentLoading(msg: string) {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: 4000
    });
    this.loading.present();
  }
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
        message: msg,
        buttons:['ok']
    });

    await alert.present();
}

  async filterProductsByVendor(productList: any) {
    console.log("userRole", this.userRole);
    console.log("userRole", this.orderBy.id);
    if (this.userRole == 'vendor') {
      let vendorProducts = productList.filter(product => product.vendorId === this.orderBy.id);
      console.log("vendorProducts", vendorProducts);
      return vendorProducts;
    } else {
      return productList;
    }
  }

  async initializeSubscriptions() {
    this.events.subscribe('user:getUserToCreateOrderSuccess', (userList) => {
      userList.forEach(user => {
        user['selected'] = false;
        this.userList.push(user);
      });
      this.userList = userList;
      console.log('searchedUsersDocs', userList);
    });
    this.events.subscribe('search-engine:publishProductsToCreateOrder', async (productList) => {
      console.log('productList:', productList);
      // let fetchedProducts = productList;
      let fetchedProducts = await this.filterProductsByVendor(productList);
      for (let index1 = 0; index1 < fetchedProducts.length; index1++) {
        fetchedProducts[index1]['added'] = false;
        for (let index2 = 0; index2 < this.productsAdded.length; index2++) {
          if (fetchedProducts[index1].id === this.productsAdded[index2].productId) {
            console.log('prod found with id:', fetchedProducts[index1].id);
            fetchedProducts[index1]['added'] = true;
            if (fetchedProducts[index1].isPriceList) {
              let variantType = fetchedProducts[index1].variantType;
              fetchedProducts[index1].priceList.forEach(prodVariant => {
                //console.log('variantType:', variantType, ' prodVariant:', prodVariant);
                if (prodVariant[variantType] === this.productsAdded[index2].pack[variantType]) {
                  prodVariant.added = true;
                }
              });
            }
          }
        }
      }
      console.log('fetchedProducts:', fetchedProducts);
      fetchedProducts.forEach(async(product) => {
        product = await this.prepareProductData(product);
      });
      this.productList = fetchedProducts;
    });

    this.events.subscribe('user:publishUserDetails', async (userData) => {
      console.log('usersData::',userData);
      if (userData.defaultAddress && userData.defaultAddress.defaultAddress) {
        this.userAddressExists = true;
        this.userAddress = userData.defaultAddress;
        this.statusIndex = 3;
      } else {
        const address: any = await this.userService.getAllUserAddresses(this.selectedUser.id);
        if (address && address.length) {
          const defaultAddress = address.find(a => a.defaultAddress === true);
          if(defaultAddress) {
            this.userAddress = defaultAddress;
          } else {
            this.userAddress = address[0];
          }
          await this.userService.saveToDefaultAddress(this.selectedUser.id, this.userAddress);
          this.statusIndex = 3;
          this.userAddressExists = true;
          console.log('address:', address);
        } else{
          this.userAddressExists = false;
          this.userAddress = {
            address: '',
            city: '',
            state: '',
            stateCode: '',
            pincode: '',
            phoneNo: '',
            createdAt: new Date(),
            defaultAddress: true,
            name: ''
          };
        }
      }
      this.customerGstNo = userData.customerGstNo ? userData.customerGstNo : this.customerGstNo;
    });

    this.events.subscribe('user:saveUserAddressToCreateOrderSuccess', ()=>{
      this.presentToast('Details saved successfully & Address is added to users Address List');
      this.statusIndex = 3;
    });
    this.events.subscribe('user:saveUserAddressToCreateOrderFailure', ()=>{
      this.presentToast('An error occured while saving user details');
    });
    
    this.events.subscribe('order:placeOrderForUserSuccess', ()=>{
      this.loading.dismiss();
      if (this.userRole == 'vendor') {
        this.router.navigate(['vendor-orders']);
      } else {
        this.router.navigate(['admin-orders']);
      }
    });

    this.events.subscribe('productVariantSubscribed', (prodObj) => {
      if (Object.entries(prodObj).length != 0) {
        this.productsAdded.push(prodObj);
        this.statusIndex = 4;
        this.setBillingAddress();
      }
    });
    this.events.subscribe('coupon-codes:couponCodeNotApplied', (msg) => {
      this.couponCode = '';
      this.loading.dismiss();
      this.presentAlert(msg);
  });
  this.events.subscribe('coupon-codes:couponCodeApplied', (response) => {
      if (response.details.totalCouponDiscount === 0) {
          this.loading.dismiss();
          this.presentAlert('coupon not applicable');
      } else {
          let coupon = response.data;
          this.couponApplied = true;
          this.couponId = coupon.couponId;
          this.isCodAvailableForCoupon = 'codAvailable' in coupon ? coupon.codAvailable : true;
          this.totalGst = response.details.totalGst;
          this.productsAdded = response.details.products;
          this.totalAmountToPaid = response.details.totalAmountToPaid;
          this.couponDiscount = response.details.totalCouponDiscount;
          this.totalMrp = 'totalMrp' in response.details ? response.details.totalMrp : this.totalMrp;
          this.discountOnMrp = 'discountOnMrp' in response.details ? response.details.discountOnMrp : this.discountOnMrp;
          let price = 0;
          let totalGst = 0;
          this.productsAdded.map((p) => {
              price += p.price * p.quantity;
              if (p.gstObj) {
                  totalGst += p.gstObj.total;
              }
            //   if (price >= this.freeDeliveryAmt) {
            //     this.deliveryFree();
            // }
            // if (this.deliveryType === 'pickup' && this.isStorePickup && this.storeAddress.hasOwnProperty('address')) {
            //     this.setStorePickupPayment();
            // }
            // this.checkUserMembership();
            // this.checkFreeProductStatus();
            this.loading.dismiss();
          });

      }
  });
  }
  removeSubscriptions() {
    this.events.unsubscribe('user:getUserToCreateOrderSuccess');
    this.events.unsubscribe('search-engine:publishProductsToCreateOrder');
    this.events.unsubscribe('user:publishUserDetails');
    this.events.unsubscribe('user:saveUserAddressToCreateOrderSuccess');
    this.events.unsubscribe('user:saveUserAddressToCreateOrderFailure');
    this.events.unsubscribe('order:placeOrderForUserSuccess');
    this.events.unsubscribe('coupon-codes:couponCodeNotApplied');
        this.events.unsubscribe('coupon-codes:couponCodeApplied');
  }

  close() {
    this.modalController.dismiss();
  }

fireSearchQueryForProduct() {
  clearTimeout(this.typingTimer);
  if(this.searchProduct.length > 2) {
    this.typingTimer = setTimeout(() => {
      console.log('in fireSearchQuery...');
      // this.showSearchLoader = true;
      // this.showNoProducts = false;
      this.events.publish('search-engine:alogoliaSearchProductsToCreateOrder', this.searchProduct, 0, 'new_search');
    }, this.doneTypingInterval);

  } else {
    if (!this.searchProduct.length) {
      // this.showNoProducts = true;
    }
  }
}

async searchMoreProducts(event) {
  console.log('loading more data...');
  this.page = this.page + 1;
  this.events.publish('search-engine:alogoliaSearchProductsToCreateOrder', this.searchProduct, this.page, 'existing_search');
  setTimeout(() => {
    event.target.complete();
  }, 1000);
  if (this.noMoreSearchProducts === true) {
    event.target.disabled = true;
  }
}

// async presentLoading(msg: string) {
//   this.loader = await this.loadingController.create({
//       message: msg,
//       duration: 30000
//   });
//   await this.loader.present();
// }

async openStateModal(choice: string) {
    const modal = await this.modalController.create({
    component: StatesModalPage,
    });
    modal.onDidDismiss()
    .then((res) => {
      if(res.data) {
        console.log(res.data);
        if (choice == 'shipping') {
          this.userAddress.state = res.data.state;
          this.userAddress.stateCode = res.data.code;
        } else if (choice == 'billing') {
          this.billingAddress.state = res.data.state;
          this.billingAddress.stateCode = res.data.code;
        }
  
      }
  });
    await modal.present();
}

selectUser(userName, userPhoneNo, userId, userIndex, subRole){
  this.statusIndex = 2;
  this.userList.forEach(user => {
    user['selected'] = false;
  });
  this.userList[userIndex].selected = true;
  this.selectedUser.id = userId;
  this.selectedUser.name = userName;
  this.selectedUser.phoneNo = userPhoneNo;
  this.selectedUser.subRole = subRole || '';
  this.events.publish('user:getUserDetails', userId);
}

async saveAddress(){
  if (this.userAddress.address && this.userAddress.city && this.userAddress.state && this.userAddress.pincode) {
    this.statusIndex = 3;
    this.userAddress.phoneNo = this.selectedUser.phoneNo;
    this.userAddress.name = this.selectedUser.name;
    this.events.publish('user:saveUserAddressToCreateOrder', this.selectedUser.id, this.userAddress);
    const userDetails = await this.userService.updateUserInfo(this.selectedUser.id, {customerGstNo: this.customerGstNo});
  } else {
    this.presentToast('Please fill all details in address');
  }
}

async presentToast(msg: string) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000
  });
  toast.present();
}

async presentProductVariantModal(product, index){
  const modal = await this.modalController.create({
  component: ProductVariantPage,
  backdropDismiss: false,
  cssClass: 'custom-modal',
  componentProps: {
    product: product,
  }
  });
  modal.onDidDismiss()
  .then((res) => {
    if(res.data) {
      res.data.forEach(variantIndex => {
        this.productsAdded.push(this.getCartObj(product, variantIndex));
        this.statusIndex = 4;
        this.setBillingAddress();
      });
    }
});
  await modal.present();
}
getCartObj(product, plIndex?) {
  const cartObj: any = {
      name: product.prodName,
      quantity: 1,
      img: product.coverPic,
      productId: product.id,
      commentMsg: '',
      commentImgs: [],
      maxQty: product.maxQty ? product.maxQty : null,
      minQty: product.minQty ? product.minQty : null,
      gst: product.gst ? product.gst : 0,
      status: typeof product.status !== 'undefined' ? product.status : true,
      stopWhenNoQty: product.hasOwnProperty('stopWhenNoQty') && typeof product.stopWhenNoQty !== 'undefined' ? product.stopWhenNoQty : false,
      hsn: product.hsnCode ? product.hsnCode : '',
      sku: product.productCode ? product.productCode : '',
      description: '',
      gstExclusive: product.gstExclusive || false,
      extraCharges: ('extraCharges' in product) && (typeof product.extraCharges === 'object') && product.extraCharges.active ? product.extraCharges : { charge: 0 },
      isCod: 'isCod' in product ? product.isCod : true,
      vendorId: product.vendorId || '',
      priceSlabs: 'priceSlabs' in product ? { active: product.priceSlabs.active } : { active: false },
      batches: 'batches' in product ? product.batches : [],
      slug: 'slug' in product ? product.slug : {},
  }
  if(product.ptype === 'child') {
      cartObj['parentProductId'] = product.parentId;
  }
  if (product.hasOwnProperty('color') && product.color.hasOwnProperty('name')) {
      cartObj['color'] = product.color;
  }
  if(!product.isPriceList) {
      cartObj['totalQty'] = product.productQty ? product.productQty : '';
      cartObj['barcode'] = product.barcode ? product.barcode : '';
      cartObj['shippingWt'] = product.shippingWeight || 0;
      cartObj['mrpPrice'] = product.prodPrice;
      cartObj['price'] = product.discountedPrice;
      cartObj['barcodeNo'] = product.barcodeNo || '';
  } else {
      cartObj['description'] = product.priceList[plIndex].weight,
      cartObj['totalQty'] = product.priceList[plIndex].totalQuantity || '';
      cartObj['barcode'] = product.priceList[plIndex].barcode || '';
      cartObj['shippingWt'] = product.priceList[plIndex].shippingWeight || 0;
      cartObj['barcodeNo'] = product.priceList[plIndex].barcodeNo || '';
      cartObj['pack'] = {
          weight: product.priceList[plIndex].weight,
          variantType: product.variantType || 'variant'
      }
      if (product.variantType && product.variantType === 'pieces') {
        cartObj['mrpPrice'] = product.priceList[plIndex].price * parseInt(product.priceList[plIndex].weight);
        cartObj['price'] = product.priceList[plIndex].discountedPrice * parseInt(product.priceList[plIndex].weight);
        cartObj.pack['price'] = product.priceList[plIndex].discountedPrice * parseInt(product.priceList[plIndex].weight);
        cartObj.pack['perPcPrice'] = product.priceList[plIndex].discountedPrice;
      } else {
        cartObj['mrpPrice'] = product.priceList[plIndex].price;
        cartObj['price'] = product.priceList[plIndex].discountedPrice;
        cartObj.pack['price'] = product.priceList[plIndex].discountedPrice;
      }
  }
  cartObj['price'] = parseFloat(cartObj['price'].toFixed(2));
  if (cartObj.pack) {
    cartObj.pack['price'] = parseFloat(cartObj.pack['price'].toFixed(2));
  }
  console.log("getCartObj()", cartObj);
  return cartObj;
}

checkPdtStock(pdt, priceListIndex) {
  let isOutOfStock = false;
  if (!pdt.isPriceList) {
      if (pdt.productQty === '0' && pdt.stopWhenNoQty) {
          isOutOfStock = true;
      }
  } else {
      if (pdt.stopWhenNoQty) {
          if(pdt.priceList[priceListIndex].totalQuantity !== '0') {
              isOutOfStock = false;
          } else {
              isOutOfStock = true;
          }
      }
  }
  return isOutOfStock;
}
textUppercase() {
  this.couponCode = this.couponCode.toUpperCase();
  if (this.couponCode.includes(' ')) {
      this.couponCode = this.couponCode.replace(/\s/g, '');
  }
}

addProduct(product, index) {
  if (product.isPriceList) {
    this.presentProductVariantModal(product, index);
  } else {
    const outOfStock = this.checkPdtStock(product, 0);
    if(outOfStock) {
      this.sharedService.presentAlert('This product is out of stock.');
      return;
    }
    this.productList[index].added = true;
    this.productsAdded.push(this.getCartObj(product));
    this.statusIndex = 4;
    this.setBillingAddress();
  }
  console.log('productsAdded:', this.productsAdded);
}

setBillingAddress(){
  if (this.shippingSameAsBilling) {
    this.billingAddress = this.userAddress;
  } else {
    this.billingAddress['name'] = this.selectedUser.name;
  }
}

increment(index){
  if(this.productsAdded[index].quantity < this.productsAdded[index].totalQty){
  this.productsAdded[index].quantity += 1;
  }else if(this.productsAdded[index].quantity >= this.productsAdded[index].totalQty){
    this.sharedService.presentAlert(`Only ${this.productsAdded[index].totalQty} Quantity Available`);
      return;
  }

}
decrement(index){
  console.log("index", index);
  console.log("productsAdded", this.productsAdded);
  if (this.productsAdded[index].quantity != 0 || this.productsAdded[index].quantity > 0) {
    this.productsAdded[index].quantity -= 1;
  }
  else if (this.productsAdded[index].quantity === 0) {
    console.log("productList", this.productList);
    // this.productList[index].added = false;
    for (const product of this.productList) {
      if (product.id === this.productsAdded[index].productId) {
        product.added = false;
        if (product.isPriceList) {
          let variantType = product.variantType;
          for (const prodVariant of product.priceList) {
            if (prodVariant[variantType] === this.productsAdded[index].pack[variantType]) {
              prodVariant.added = false;
            }
          }
        }
      }
    }
    this.productsAdded.splice(index, 1);
  }
  if (this.productsAdded.length === 0) {
    this.statusIndex = 3;
  }
}
calcOrderSummaryPrice(){
  let subtotal = 0;
    this.productsAdded.map((p) => {
        let price = 0;
        price = p.price;
        if ('gstExclusive' in p && p.gstExclusive && p.gst) {
          price += (p.price * (p.gst / 100));
          // console.log('price:', price);
        }
        subtotal += price * p.quantity;

    });
    
    return subtotal - this.calcOrderSummaryGst() + (this.orderObj.deliveryGstObj.total || 0);
    // 
  // let price = 0;
  // this.productsAdded.forEach(product => {
  //   price += product.price * product.quantity;
  // });
  // return price - this.calcOrderSummaryGst();
};
calcOrderSummaryGst(){
  let totalGst = 0;
  let allGst = [];
  let minGst = 0;
  let gstOnDelivery = 0;
  this.productsAdded.map((p) => {      
    if (p.gst) {
      let gstValue = 0;
      if('gstExclusive' in p && p.gstExclusive) {
        gstValue = (p.price * (p.gst / 100)) * p.quantity;
    } else {
        gstValue = (p.price - (p.price / (1 + (p.gst / 100)))) * p.quantity;
    }
      //let gstValue = (p.price - (p.price / (1 + (p.gst / 100)))) * p.quantity;
      allGst.push(p.gst);
      //this.totalGst += gstValue;
      totalGst += gstValue;
            p.gstObj = {
                value: p.gst,
                total: gstValue,
                cgst: p.gst / 2,
                sgst: p.gst / 2,
                igst: p.gst
            }
  } else {
          p.gstObj = {
              value: 0,
              total: 0,
              cgst: 0,
              sgst: 0,
              igst: 0
          }
      }
});
if (allGst.length) {
  minGst = Math.min(...allGst);
  //console.log('minGst', minGst);
  gstOnDelivery = (this.delivery - (this.delivery / (1 + (( minGst) / 100))));
  //this.delivery * (minGst / 100);
  totalGst += gstOnDelivery;
}
this.orderObj.deliveryGstObj = {
  value: minGst,
  total: gstOnDelivery
}
return totalGst;
};

calcOrderSummaryTotalAmtToPaid(){
  let totalAmount = 0;
  totalAmount = parseFloat(((this.calcTotalMrp(this.productsAdded) - this.calcDiscountOnMrp(this.productsAdded)) + this.delivery - this.additionalDiscount -this.couponDiscount).toFixed(2));
  this.totalAmountToPaid =totalAmount;
  return totalAmount  ;
}
calcTotalMrp(products) {
  let totalMrp = 0;
  products.map((p) => {
      let price = 0;
      price = p.hasOwnProperty('mrpPrice') ? p.mrpPrice : p.price;
      if('gstExclusive' in p && p.gstExclusive && p.gst) {
          price += (price * (p.gst / 100));
      }
      totalMrp += price * p.quantity;

  });
  this.totalMrp = totalMrp;
  return totalMrp;
}
calcDiscountOnMrp(products) {
  let discountOnMrp = 0;
  products.map((p) => {
      let discountedPrice = p.hasOwnProperty('mrpPrice') ? (p.mrpPrice - p.price) : 0;
      if('gstExclusive' in p && p.gstExclusive && p.gst) {
          discountedPrice += (discountedPrice * (p.gst / 100));
      }
      if (p.hasOwnProperty('mrpPrice')) {
          discountOnMrp += discountedPrice * p.quantity;
      }
  });
  this.discountOnMrp = discountOnMrp;
  return discountOnMrp;
}
saveOrder() {
  this.presentLoading('Please Wait...');
  this.productsAdded.map((p) => {
    this.productsPrice += p.price * p.quantity;
    if ('pack' in p && p.pack.variantType == 'pieces') {
      p.pack.price = p.price;
      p.pack.perPcPrice = parseFloat((p.price / parseInt(p.pack.weight)).toFixed(2));
    }
});
  this.userAddress['name'] = this.selectedUser.name;
  this.orderObj['products'] = this.productsAdded;
  this.orderObj['additionalDiscount'] = this.additionalDiscount;
  this.orderObj['address'] = this.userAddress;
  this.orderObj['billingAddress'] = this.billingAddress;
  this.orderObj['userId'] = this.selectedUser.id;
  this.orderObj['userName'] = this.selectedUser.name;
  this.orderObj['delivery'] = this.delivery;
  //this.orderObj['billingAddress'] = this.userAddress;
  this.orderObj['productsPrice'] = this.productsPrice;
  this.orderObj['totalAmountToPaid'] = this.totalAmountToPaid;
  // this.orderObj['totalAmountToPaid'] = this.calcOrderSummaryTotalAmtToPaid();
  this.orderObj.payment.details.amount = this.orderObj['totalAmountToPaid'];
  this.orderObj['totalMrp'] = this.totalMrp;
  // this.orderObj['TotalMrp'] = this.calcTotalMrp(this.productsAdded);
  this.orderObj['discountOnMrp'] = this.discountOnMrp;
  // this.orderObj['discountOnMrp'] = this.calcDiscountOnMrp(this.productsAdded);
  this.orderObj['defaultGst'] = this.calcOrderSummaryGst();
  this.orderObj['customerGstNo'] = this.customerGstNo;
  this.orderObj['autoConfirmOrder'] = true;
  this.orderObj['cashbackAmount'] = 0;
  this.orderObj['couponDiscount'] = this.couponDiscount;
  this.orderObj['couponId'] = this.couponId;
  this.orderObj['couponName'] = this.couponCode;
  this.orderObj['metaData'] = {
    source: 'manual',
    orderBy: this.orderBy,
    inventoryManaged: false
    // inventoryManaged: this.isInventoryManaged || false
  }
  if (this.isQuotationOrder) {
    this.orderObj['orderType'] = 'quotation';
    this.orderObj.status = 'Pending';
  }

  if (this.userRole === 'vendor') {
    this.orderObj.vendorId = this.orderBy.id;
  }

  console.log("this.orderObj",this.orderObj);
  this.events.publish('order:placeOrderForUser', this.orderObj, this.listOfCommentImages);
}

async subscribeProduct(productData) {
  let subsData:any = await this.productSubscriptionsService.getSettings('return');
  const productObj = {
      id: productData.id,
      data: productData,
  };
  const modal = await this.modalController.create({
      component: CreateSubscriptionPage,
      backdropDismiss: false,
      cssClass: 'custom-modal',
      componentProps: {
          product: productObj,
          subSettings: subsData
      }
  });
  modal.onDidDismiss()
  .then((prodObj) => {
    if (Object.entries(prodObj.data).length != 0) {
      this.productsAdded.push(prodObj.data);
      this.statusIndex = 4;
      this.setBillingAddress();
    }
});

return await modal.present();
}

removeSubscribedProduct(i) {
  this.productsAdded.splice(i, 1);
  if (this.productsAdded.length === 0) {
    this.statusIndex = 3;
  }
}

async onClickQty(index: number) {
  const alert = await this.alertController.create({
    subHeader: 'Enter Quantity',
    inputs: [
        {
            name: 'qty',
            type: 'number',
            placeholder: 'Enter Quantity Here'
        }
    ],
    buttons: [
        {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
                console.log('Confirm Cancel');
            }
        }, {
            text: 'Done',
            handler: (data) => {
              let qty = parseInt(data.qty)
                if (!(parseInt(data.qty) && parseInt(data.qty) > 0 )) {
                    this.sharedService.presentToast('Enter Valid Quantity');
                    return false;
                }else if(parseInt(data.qty) > this.productsAdded[index].totalQty){
                  this.sharedService.presentAlert(`Only ${this.productsAdded[index].totalQty} Quantity Available`);
                } else if(qty < this.productsAdded[index].minQty || qty > this.productsAdded[index].maxQty){
                  this.sharedService.presentAlert(`Min. & Max Quantity for ${this.productsAdded[index].name} is ${this.productsAdded[index].minQty ? this.productsAdded[index].minQty : 'NA'} and ${this.productsAdded[index].maxQty ? this.productsAdded[index].maxQty: 'NA'} respectively`)
                }
                else {
                    this.productsAdded[index].quantity = parseInt(data.qty);
                }
            }
        }
    ] 
});
await alert.present();
}

async prepareProductData(product: any) {
  let deal: any = await this.checkLimitedTimeDeal(product);
  if (deal.dealTime) {
      if (deal.discount > 0) {
          product.dealActive = true;
          if (!product.isPriceList) {
              product.discountedPrice = product.prodPrice - (product.prodPrice * (deal.discount / 100))
          } else {
              product.priceList.forEach(pl => {
                  pl.discountedPrice = pl.price - (pl.price * (deal.discount / 100));
              });
          }
      }
  }
  if (this.selectedUser.subRole && this.selectedUser.subRole === 'retailer' && this.configService.environment.priceForRetail) {
      let retailDiscount = product.retailDiscount ? product.retailDiscount : 0;
      if (retailDiscount) {
          if (!product.isPriceList) {
              product.discountedPrice = product.prodPrice - (product.prodPrice * (retailDiscount / 100))
          } else {
              product.priceList.forEach(pl => {
                  pl.discountedPrice = pl.price - (pl.price * (retailDiscount / 100))
              });
          }
      }
  }
  return product;
}
async checkLimitedTimeDeal(data): Promise<{ dealTime: any; discount: any; }> {
  if (data.hasOwnProperty('deal') && data.deal.isAllowed) {
      let discount = data.deal.discount;
      if('specificUsers' in data.deal && data.deal.specificUsers.active && data.deal.specificUsers.users && data.deal.specificUsers.users.length) {
          const index = data.deal.specificUsers.users.findIndex(u => u.id === this.selectedUser.id);
          if(index === -1) {
              return {dealTime: null, discount: null};
          } else {
              discount = data.deal.specificUsers.users[index].discount;
          }
      }
      const currentTime = moment();
      const startDate = moment(data.deal.start.date).format('YYYY-MM-DD');
      const startTime = moment(data.deal.start.time).format('HH:mm');
      const endDate = moment(data.deal.end.date).format('YYYY-MM-DD');
      const endTime = moment(data.deal.end.time).format('HH:mm');
      const startDateTime = moment(`${startDate} ${startTime}`);
      const endDateTime = moment(`${endDate} ${endTime}`);

      if (moment(currentTime).isBetween(startDateTime, endDateTime)) {
          //console.log('in between');
          const diff = moment(endDateTime, 'YYYY-MM-DD HH:mm:ss').diff(moment(currentTime, 'DD/MM/YYYY HH:mm:ss'));
          const duration = moment.duration(diff);
          // console.log('duration', duration);
          // console.log('moment.utc(diff).format(":mm:ss")', moment.utc(diff).format(":mm:ss"));
          const dealTime = Math.floor(duration.asHours()) + moment.utc(diff).format(":mm:ss");
          //console.log('dealTime', dealTime);
          return {dealTime, discount};
      } else {
          //console.log('not between');
          return {dealTime: null, discount: null};
      }
  } else {
      return {dealTime: null, discount: null};
  }
}

clearPhone(){
  this.searchUserPhone = ''
}

clearName(){
  this.searchUser = ''
}

// async fireSearchQuery() {
//   if (this.searchUserPhone != ''){
//     let result:any = await this.userService.searchUserByNumber(this.configService.environment.defaultCountryCode + this.searchUserPhone)
//     for (let i = 0; i < result.length; i++) {
//       let data = result[i].data
//       data['id'] = result[i].id
//       result[i] = data
//     }
//     this.userList = []
//     result.forEach(user => {
//       if (user.role == 'user'){
//         user['selected'] = false;
//         this.userList.push(user);
//       }
//     });
//   }
//   if (this.searchUser != ''){
//     let result:any = await this.userService.searchUserByName(this.searchUser)
//     for (let i = 0; i < result.length; i++) {
//       let data = result[i].data
//       data['id'] = result[i].id
//       result[i] = data
//     }
//     this.userList = []
//     result.forEach(user => {
//       if (user.role == 'user'){
//         user['selected'] = false;
//         this.userList.push(user);
//       }
//     });
//   }
// }

  async typeSenseSearchQuery() {
    if (this.searchValue != '') {
      await this.sharedService.presentLoading();
      let page = 1;
      const typeSenseResponse = await this.searchEngineService.getSearchUsersFromTypesenseUsingSingleSearch(this.searchValue, page, 'new_search', []);
      console.log("typeSenseResponse", typeSenseResponse);
      await this.sharedService.loading.dismiss();
      if (typeSenseResponse && typeSenseResponse.status === 'available' && typeSenseResponse.users.length) {
        for (let i = 0; i < typeSenseResponse.users.length; i++) {
          let data = typeSenseResponse.users[i].data
          data['id'] = typeSenseResponse.users[i].id
          typeSenseResponse.users[i] = data;
        }
        this.userList = []
        typeSenseResponse.users.forEach(user => {
          if (user.role == 'user') {
            user['selected'] = false;
            // if (user.phoneNo) {
            //   if (!user.phoneNo.startsWith(this.defaultCountryCode)) {
            //     user.phoneNo = this.defaultCountryCode + user.phoneNo;
            //   }
            // }
            this.userList.push(user);
          }
        });
      }
    }
    else {
      await this.sharedService.presentAlert("Please enter valid details!");
    }
  }
  async openCouponsModal() {
    if(this.couponApplied) {
        return;
    } else {
        const modal = await this.modalController.create({
            component: CouponsListPage,
            componentProps:{
              uid : this.selectedUser.id
            },
            cssClass: 'coupons-list-modal modal-bg'
        });
        modal.onDidDismiss().then(async (res) => {
            if (res && res.data) {
                this.couponCode = res.data.couponName;
                this.applyCouponCode();
            }
        });
        await modal.present();
    }
}
async applyCouponCode() {
  // this.paymentDetails.products = this.productsAdded.filter(p => p.orderType !== 'free');
  this.paymentDetails.products = this.productsAdded;
  this.paymentDetails.totalMrp = this.calcTotalMrp(this.productsAdded);
  this.paymentDetails.discountOnMrp = this.calcDiscountOnMrp(this.productsAdded);
  this.paymentDetails.totalGst = this.calcOrderSummaryGst();
  this.paymentDetails.totalPayable = this.calcOrderSummaryTotalAmtToPaid();
  this.paymentDetails.delivery.deliveryCost = this.delivery;
  console.log('...',this.paymentDetails);
  
  await this.presentLoading('verifying coupon code');
  const data = {
      code: this.couponCode,
      paymentDetails: this.paymentDetails,
      isGstApplicable: this.isGstApplicable,
      userId:this.selectedUser.id
  };
  this.events.publish('coupon-codes:verifyCouponCode', data);
}
async removeCouponCode() {
  this.couponApplied = false;
  this.couponDiscount = 0;
  this.couponCode = '';
  this.couponId = '';
  this.isCodAvailableForCoupon = true;
  // this.initPaymentInfo();
  // this.checkFreeProductStatus();
}

onChangeDiscountedPrice() {
  // if(this.couponApplied) {
  //   this.removeCouponCode()
  // }
}

  // ? Attach image functionality Start
  readBase64(file: any) {
    return new Promise(async (resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        resolve(event.target.result);
      }
    });
  }

  async uploadCommentImgs(files: FileList, pid: string) {
    let imgs = this.listOfCommentImages[pid] || [];
    console.log("imgs", imgs);
    console.log("uploadCommentImgs", this.listOfCommentImages[pid]);

    for (let i = 0; i < files.length; i++) {
      const base64Image = await this.readBase64(files.item(i));
      if (imgs.length !== 0) {
        imgs.push(base64Image);
      } else {
        imgs = [base64Image];
      }
      this.listOfCommentImages[pid] = imgs;
    }
    console.log("listOfCommentImages", this.listOfCommentImages);
  }

  removeCommentImage(imgIndex: number, pid: string) {
    this.listOfCommentImages[pid].splice(imgIndex, 1);
    console.log('listOfCommentImages', this.listOfCommentImages);
  }

  imgZoom(img: any) {
    this.modalController.create({
      component: ImageModalPage,
      cssClass: 'photo-modal-class',
      componentProps: {
        imgs: [{ url: img }],
        index: 0
      }
    }).then(modal => modal.present());
  }
  // ? Attach image functionality Start

}
