import { Component, OnInit, NgZone } from '@angular/core';
import { Events, LoadingController, AlertController, ModalController, ToastController  } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { CouponCodeModalPage } from '../coupon-code-modal/coupon-code-modal.page';
import { LabelService } from 'src/app/services/label/label.service';
import { UsersModalPage } from '../users-modal/users-modal.page';
import { SelectCategoriesPage } from '../select-categories/select-categories.page';
import { CouponCodesService } from 'src/app/services/coupon-codes/coupon-codes.service'

@Component({
  selector: 'app-add-coupon-codes',
  templateUrl: './add-coupon-codes.page.html',
  styleUrls: ['./add-coupon-codes.page.scss'],
})
export class AddCouponCodesPage implements OnInit {

  minDate = new Date().toISOString();
  name: string = '';
  description = '';
  qty: number;
  perUser: number = 1;
  minOrderAmount: number;
  type: string = 'percentage';
  amount: number;
  maxDiscount: number;
  validUpto: any= new Date().toISOString();
  usage: number = 0;
  editCodeData: any;
  loading:  any;
  SHARED_LABELS: any = {};
  ADD_COUPON_CODES_LABELS: any = {};
  applicableStatus = 'all';
  selectDatePh = '';
  codAvailable = false;
  specificUsers = {
    isAllowed: false,
    users: []
};
  constructor(private events: Events,
              private router: Router,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private route: ActivatedRoute,
              private modalController: ModalController,
              private labelService: LabelService,
              private toastController: ToastController,
              private ngZone: NgZone,
              private couponCodesService : CouponCodesService) { 
              this.route.queryParams.subscribe(params => {
                if (this.router.getCurrentNavigation().extras.state) {
                  this.editCodeData = this.router.getCurrentNavigation().extras.state.editCodeData;
                //  //console.log('editproductData', this.editCodeData);
                  this.name = this.editCodeData.name;
                  this.description = this.editCodeData.description ? this.editCodeData.description : '';
                  this.qty = this.editCodeData.qty;
                  this.perUser = this.editCodeData.perUser;
                  this.minOrderAmount = this.editCodeData.minOrderAmount;
                  this.type = this.editCodeData.type;
                  this.amount = this.editCodeData.amount;
                  this.maxDiscount = this.editCodeData.maxDiscount;
                  this.validUpto = this.editCodeData.validUpto;
                  this.codAvailable = this.editCodeData.codAvailable ? this.editCodeData.codAvailable : false;
                  this.specificUsers = this.editCodeData.specificUsers ? this.editCodeData.specificUsers: this.specificUsers;
                  this.ngZone.run(()=> {
                  this.applicableStatus = this.editCodeData && this.editCodeData.hasOwnProperty('applicableStatus') ? this.editCodeData.applicableStatus : 'all'
                  })
                }
              });
              }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initializeSubscriptions();
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.ADD_COUPON_CODES_LABELS = this.labelService.labels['ADD_COUPON_CODES'];
    this.selectDatePh = this.ADD_COUPON_CODES_LABELS['select_date'];
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('coupon-codes:addNewCouponCodeSuccess', () => {
      if(this.loading){this.loading.dismiss();}
      this.presentAlert('New Coupon Code generated successfully!', false);
    });
    this.events.subscribe('coupon-codes:editCouponCodeSuccess', () => {
      if(this.loading){this.loading.dismiss();}
      this.presentAlert('Coupon Code edited successfully!', false);
    });
    this.events.subscribe('coupon-codes:deleteEditCouponCodeSuccess', () => {
      if(this.loading){this.loading.dismiss();}
      this.presentAlert('Coupon Code deleted successfully!', true);
    });
    this.events.subscribe('coupon-codes:removeNotApplicableProductSuccess', () => {
      if(this.loading){this.loading.dismiss();}
      this.presentAlert('Product removed successfully!', false);
    });
    this.events.subscribe('coupon-codes:couponCodeAlreadyExists', (name) => {
      if(this.loading){this.loading.dismiss();}
      this.presentAlert(`Coupon code with name <b>${name}</b> already exists!`);
    });
    this.events.subscribe('coupon-codes:updateApplicableStatusSuccess', () => {
      if(this.loading){this.loading.dismiss();}
      this.presentToast(this.ADD_COUPON_CODES_LABELS['status_changed']);
    });
    this.events.subscribe('coupon-codes:dataNotSaved', () => {
      if(this.loading){this.loading.dismiss();}
      this.presentToast(this.SHARED_LABELS['some_issue']);
    })
  }

  async addNewCouponCode() {
    if(this.name === '' || !this.qty || !this.amount || !this.perUser || !this.minOrderAmount || (this.type === 'percentage' && !this.maxDiscount)) {
      this.presentAlert("Please fill all the details!");
    } else if(this.name.includes(' ')) {
      this.presentAlert('Please remove space from the code name');
    }
     else {
      await this.presentLoading();
      if(this.type === 'flat') {
        this.maxDiscount = 0;
      }
      const codeData = {
        name: this.name.toUpperCase(),
        description: this.description,
        qty: this.qty,
        perUser: this.perUser,
        minOrderAmount: this.minOrderAmount,
        type: this.type,
        amount: this.amount,
        maxDiscount: this.maxDiscount,
        validUpto: this.validUpto,
        usage: this.usage,
        notApplicableProducts: [],
        applicableStatus: this.applicableStatus,
        codAvailable: this.codAvailable,
        specificUsers: this.specificUsers,
      }
      this.events.publish('coupon-codes:addNewCouponCode', codeData)
    }
  }

  async editCouponCode() {
    if(this.name === '' || !this.qty || !this.amount || !this.perUser || !this.minOrderAmount || (this.type === 'percentage' && !this.maxDiscount)) {
      this.presentAlert("Please fill all the details!");
    } else if(this.name.includes(' ')) {
      this.presentAlert('Please remove space from the code name');
    } 
    else {
      await this.presentLoading();
      if(this.type === 'flat') {
        this.maxDiscount = 0;
      }
      const codeData = {
        name: this.name.toUpperCase(),
        description: this.description,
        qty: this.qty,
        perUser: this.perUser,
        minOrderAmount: this.minOrderAmount,
        type: this.type,
        amount: this.amount,
        maxDiscount: this.maxDiscount,
        validUpto: this.validUpto,
        applicableStatus: this.applicableStatus,
        codAvailable: this.codAvailable,
        specificUsers: this.specificUsers,
        notApplicableProducts: this.editCodeData.notApplicableProducts
      }
      this.events.publish('coupon-codes:editCouponCode', this.editCodeData.id, codeData)
    }
  }

  async deleteCouponCode() {
    await this.presentLoading();
    this.events.publish('coupon-codes:deleteEditCouponCode', this.editCodeData.id);
  }

  changeDiscountType() {
    if(this.type === 'percentage') {
      this.type = 'flat';
    } else {
      this.type = 'percentage';
    }
  }

  async presentLoading(duration = 10000) {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: duration,
    });
    await this.loading.present();
  }

  async presentAlert(msg: string, action?) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
          if(action) {
            this.router.navigate(['coupon-codes']);
          }
        }
      }]
    });
  
    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete this coupon code?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteCouponCode();
          }
        }
      ]
    });
  
    await alert.present();
  }

  async applicableStatusToggle(status: string) {
    this.applicableStatus = status;
    await this.presentLoading();
    this.events.publish('coupon-codes:updateApplicableStatus', status, this.editCodeData.id);
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async openCouponCodeModal() {
    const modal = await this.modalController.create({
        component: CouponCodeModalPage,
        componentProps: {
            codeId: this.editCodeData.id,
            alreadyAddedProducts: this.editCodeData.notApplicableProducts,
            applicableStatus: this.applicableStatus
        },
        cssClass: 'coupon-code-modal'
    });
    modal.onDidDismiss().then(res => {
      //console.log('modal onDidDismiss...',res);
        if (res && res.data) {
          const products = [];
          res.data.forEach(product => {
            products.push(this.getProductDataForNotApplicableArray(product))
          });
          this.editCodeData.notApplicableProducts = products;
        }
    });
    await modal.present();

} 

  async openSelectProductModal(type) {
    const modal = await this.modalController.create({
      component: SelectCategoriesPage,
      componentProps: { type:type, linkedList: [] }
    });

    modal.onDidDismiss().then(async res => {
      if (res.data && res.data.list.length) {
        let linkedList = [];
        res.data.list.forEach(parent => {
          if(parent.active) {
            linkedList.push(parent.id);
            if(parent.sublist.length) {
              parent.sublist.forEach(child => {
                if(child.active) {
                  linkedList.push(child.id);
                }
              });
            }
          }
        });
        let dataArray = linkedList;
        if (type == 'categories'){
          await this.presentLoading(1000000);
          for (const cid of dataArray) {
            let productList = await this.couponCodesService.getProductsForCategory(cid);
            console.log('productList', productList);
            productList.forEach(async product => {
              if (product && !this.editCodeData.notApplicableProducts.some(p => p.id == product.id)){
                this.editCodeData.notApplicableProducts.push(this.getProductDataForNotApplicableArray(product))
              }
            });
            console.log('this.editCodeData.notApplicableProducts', this.editCodeData.notApplicableProducts);
          }
          this.loading.dismiss();
        }
        else if (type == 'brands'){
          await this.presentLoading(1000000);
          for (const cid of dataArray) {
            let productList = await this.couponCodesService.getProductsForBrands(cid);
            productList.forEach(async product => {
              if (product && this.editCodeData.notApplicableProducts.includes(product) != true){
                this.editCodeData.notApplicableProducts.push(this.getProductDataForNotApplicableArray(product))
              }
            });
          }
          this.loading.dismiss();
        }
      }
  });

  await modal.present();
  }  

  async removeNotApplicableProduct(i) {
    await this.presentLoading();
    this.editCodeData.notApplicableProducts.splice(i, 1);
    this.events.publish('coupon-codes:removeNotApplicableProduct', this.editCodeData.notApplicableProducts, this.editCodeData.id)
  }

  toUpperCaseInput(name) {
    this.name = name.toUpperCase();
    if(this.name.includes(' ')) {
      this.name = this.name.replace(/\s/g,''); 
    }
  }
  
  async openUsersModal() {
    const modal = await this.modalController.create({
        component: UsersModalPage,
        componentProps: {
          alreadyAddedUsers: this.specificUsers.users
        },
        cssClass: 'coupon-code-modal'
    });
    modal.onDidDismiss().then(res => {
        if (res && res.data) {
          //console.log('res.data', res.data);
          this.specificUsers.users = res.data;
        }
        //console.log('specificUSers:',this.specificUsers.users);
    });
    await modal.present();
}

async removeUser(i){
  this.specificUsers.users.splice(i, 1);
}

getProductDataForNotApplicableArray(product) {
  return {
    id: product.id,
    coverPic: {thumb: product.coverPic && Object.keys(product.coverPic).length ? product.coverPic.thumb || product.coverPic.url : ''},
    prodName: product.prodName
  }
}

  removeSubscriptions() {
    this.events.unsubscribe('coupon-codes:addNewCouponCodeSuccess');
    this.events.unsubscribe('coupon-codes:editCouponCodeSuccess');
    this.events.unsubscribe('coupon-codes:deleteEditCouponCodeSuccess');
    this.events.unsubscribe('coupon-codes:removeNotApplicableProductSuccess');
    this.events.unsubscribe('coupon-codes:couponCodeAlreadyExists');
    this.events.unsubscribe('coupon-codes:updateApplicableStatusSuccess');
    this.events.unsubscribe('coupon-codes:dataNotSaved');
  }

}
