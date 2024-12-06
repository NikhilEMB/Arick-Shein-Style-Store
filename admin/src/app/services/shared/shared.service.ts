import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { ModalController, AlertController, NavController, LoadingController, ToastController, Events } from '@ionic/angular';
import { HomePage } from 'src/app/home/home.page';
//import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavigationExtras } from '@angular/router';
//import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
import { environment } from './../../../environments/environment';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';
import { ConfigService } from '../config/config.service';
import { MultiRegionService } from '../multi-region/multi-region.service';
import { VendorService } from '../vendor/vendor.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  loading: any;
  constructor(private modalController: ModalController,
    private storage: Storage,
    private alertController: AlertController,
    //private socialSharing: SocialSharing,
    //private firebaseDynamicLinks: FirebaseDynamicLinks,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private logglyService: LogglyLoggerService,
    private toastController: ToastController,
    private multiRegionService: MultiRegionService,
    private configService: ConfigService,
    private vendorService: VendorService,
    private afs: AngularFirestore
  ) { }

  async openLoginModal() {
    const modal = await this.modalController.create({
      component: HomePage,
      cssClass: 'login-modal auto-height',
      backdropDismiss: false,
      showBackdrop: true
    });
    await modal.present();
  }

  async openLoginModalForIdentity(uid: string, name: string, email: string, phoneNo: string) {
    const modal = await this.modalController.create({
      component: HomePage,
      cssClass: 'login-modal auto-height',
      backdropDismiss: false,
      showBackdrop: true,
      componentProps: {
        showIdentity: true,
        showSignin: false,
        showPincode: false,
        showVerifyOtp: false,
        showPhoneNo: false,
        userId: uid,
        btnTxt: 'Save',
        userName: name,
        userEmail: email,
        phoneNo: phoneNo,
        onlyIdentity: true
      }
    });
    await modal.present();
  }

  generateSearchKey() {
    try {
      return new Promise(async (resolve, reject) => {
        const uid = await this.getStorageUid();
        if (uid) {
          this.storage.get('searchKey').then((val) => {
            let createdAt = val && val.createdAt ? val.createdAt : moment();
            let hours = moment().diff(moment(createdAt), 'hours');
            if (hours >= 24 || !val) {
              firebase.auth().currentUser.getIdToken()
                .then(function (token) {
                  return fetch('https://us-central1-' + environment.firebase.projectId + '.cloudfunctions.net/search-getSearchKey/', {
                    headers: { Authorization: 'Bearer ' + token }
                  });
                })
                .then(function (response) {
                  return response.json();
                })
                .then((data) => {
                  this.storage.set('searchKey', { key: data.key });
                });
            }
          });
        } else {
          // if (environment.openAlgoliaSearch) {
          //     this.storage.get('searchKey').then((val) => {
          //         let createdAt = val && val.createdAt ? val.createdAt : moment();
          //         let hours = moment().diff(moment(createdAt), 'hours');
          //         console.log(hours);
          //         console.log(val);
          //         if (hours >= 24 || !val) {
          //             fetch('https://us-central1-' + environment.firebase.projectId + '.cloudfunctions.net/search-getSearchKey/', {
          //                 headers: { Authorization: 'Bearer ' + '' }
          //             }).then(function(response) {
          //                 return response.json();
          //             }).then((data) => {
          //                 this.storage.set('searchKey', { key: data.key });
          //             });
          //         }
          //     });
          // }
        }
        resolve(true);
      });
    } catch (error) {
      error['location'] = 'search-engine-service:generateSearchKey';
      this.logglyService.log(error);
    }
  }

  async checkRegionIdForApi(): Promise<string> {
    try {
      return new Promise(async (resolve, reject) => {
        let regionId = '';
        const role = await this.getStorageRole();
        if (role !== 'admin') {
          let isMultiRegion = this.configService.environment.multiRegion;
          if (isMultiRegion) {
            const dbMultiRegion: any = await this.multiRegionService.getActiveStatus('service');
            if (dbMultiRegion && dbMultiRegion.active) {
              isMultiRegion = true;
            } else {
              isMultiRegion = false;
            }
          }
          if (isMultiRegion) {
            const userRegion: any = await this.getStorageRegion();
            if (userRegion) {
              regionId = userRegion.id;
            }
          }
        }
        resolve(regionId);
      });
    } catch (error) {
      error['location'] = 'shared-service:checkRegionIdForApi';
      this.logglyService.log(error);
    }
  }

  async getStorageRegion(): Promise<any> {
    try {
      return new Promise(async (resolve, reject) => {
        this.storage.get('region').then((region: any) => {
          resolve(region);
        });
      });
    } catch (error) {
      error['location'] = 'shared-service:getStorageRegionId';
      this.logglyService.log(error);
    }

  }

  async checkLoginStatus(msg: string) {
    const uid = await this.getStorageUid();
    if (!uid || uid === undefined) {
      this.openLoginModal();
    } else {
      const role = await this.getStorageRole();
      if (role === 'admin') {
        this.presentAlert(msg);
      } else if (role === 'deliveryAgent') {
        this.presentAlert(msg);
      } else {
        return true;
      }
    }
  }

  /* async socialShare(name: string, subject: string, img: string, link: string) {

     this.socialSharing.share(name, subject, img, link).then(() => {
       console.log('app sharing works!');
     }) .catch((err) => {
       console.log('app sharing not works!', err);
     });

   }*/

  /* handleProductSharing() {
     this.firebaseDynamicLinks.onDynamicLink()
     .subscribe((res: any) => this.navigateToProduct(res.deepLink), (error: any) => console.log(error));
    }*/

  navigateToProduct(link: string) {
    console.log('link', link);
    let pid = '';
    for (let index = link.length - 2; index > 0; index--) {
      if (link[index] === '/') {
        break;
      } else {
        pid += link[index];
      }
    }
    pid = pid.split('').reverse().join('');
    console.log('pid from dynamic link:', pid);
    const navigationExtras: NavigationExtras = {
      state: {
        productId: pid
      }
    };
    this.navCtrl.navigateRoot(['product-details'], navigationExtras);
  }

  async getStorageUid(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      this.storage.get('uid').then((val: string) => {
        resolve(val);
      });
    });
  }

  getStarColor(rating) {
    if (rating >= 3) {
      return '#20c020';
    } else if (rating < 3 && rating >= 2) {
      return '#FF9F00';
    } else {
      return '#ff6161';
    }
  }

  async getStorageRole(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      this.storage.get('userRole').then((val: string) => {
        resolve(val);
      });
    });
  }

  async getStorageDeliverySettings(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      this.storage.get('deliverySettings').then((val: string) => {
        resolve(val);
      });
    });
  }

  async getStorageCheckPincode(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      this.storage.get('checkPincode').then((val: string) => {
        resolve(val);
      });
    });
  }

  async presentAlert(msg: string, backdropDismiss: boolean = true, button: string = 'OK') {
    const alert = await this.alertController.create({
      message: msg,
      backdropDismiss,
      buttons: button !== 'none' ? ['OK'] : []
    });
    await alert.present();
  }

  async presentLoading(msg?, duration?) {
    this.loading = await this.loadingController.create({
      message: msg || 'Please Wait...',
      duration: duration || 5000,
    });
    await this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      color: 'medium',
      message: msg,
      duration: 2000,
      showCloseButton: true,
      cssClass: 'toast',
      animated: true
    });
    toast.present();
  }

  async getMultiVendorStatus() {
    let multiVendorEnv = this.configService.environment.multiVendor;
    const vendor: any = await this.vendorService.getActiveStatus('service');
    if (multiVendorEnv && vendor.active) {
      return true;
    } else {
      return false;
    }
  }

  getImageType(base64Img) {
    let imgType = '.png';
    if (base64Img.includes('data:image/gif')) {
      imgType = '.gif';
    }
    return imgType;
  }

  async getReportDate() {
    let startDate;
    let endDate;
    let tempDate = new Date();
    const storageStartDate = await this.storage.get('reportStartDate');
    if (storageStartDate) {
      startDate = storageStartDate;
    } else {
      startDate = new Date(tempDate.setDate(tempDate.getDate() - 7)).toISOString();
    }
    const storageEndDate = await this.storage.get('reportEndDate');
    if (storageEndDate) {
      endDate = storageEndDate;
    } else {
      endDate = new Date().toISOString();
    }
    return { startDate, endDate }
  }

  createSlugName(slugName){
    return slugName.toString()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');
  }

  async presentSlugAlert(){
    const alert = await this.alertController.create({
      header: 'Slug Instructions',
      message: 'Your slug will get</br>' +
        '1. Replace spaces with - </br>' +
        '2. Remove all non-word chars </br>' +
        '3. Replace multiple - with single -',
      buttons: ['ok']
  });
  await alert.present();
  }

  isUniversal(){
    const universalValue = 'isUniversal' in this.configService.environment ? this.configService.environment.isUniversal : false;
    return universalValue;
  }

  async sameSlugExists(collectionName, docId, slugName, catId?){
    return new Promise(async (resolve, reject) => {
      try {
        if (slugName == null || slugName.length == 0) {
          this.presentAlert('Slug Name cannot be empty');
          return;
        }
        let sameSlug = [];
        // products, brands, categories, pages
        let collectionRef = this.afs.collection(collectionName, ref => ref.where("slug.name", "==", slugName));
        if(collectionName == 'vendors'){
          collectionRef = this.afs.collection('features').doc('multiVendor').collection(collectionName, ref => ref.where("slug.name", "==", slugName));
        }
        else if(collectionName == 'subcategories'){
          collectionRef = this.afs.collection('categories').doc(catId).collection(collectionName, ref => ref.where("slug.name", "==", slugName));
        }
        else if(collectionName == 'subsubcategories') {
          collectionRef = this.afs.collection('categories').doc(catId).collection('subcategories').doc(docId.subCatId).collection('subcategories', ref => ref.where("slug.name", "==", slugName));
          docId = docId.subSubCatId;
        }
        sameSlug = await collectionRef.snapshotChanges().pipe(
          map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data as {}};
          }))
        ).pipe(first()).toPromise();
        if (sameSlug) {
          console.log('id:', docId);
          console.log('sameSlug before:', sameSlug);
          sameSlug = sameSlug.filter(x => x.id != docId);
          console.log('sameSlug after:', sameSlug);
        }
        (sameSlug && sameSlug.length) ? resolve(true) : resolve(false);
      } catch (error) {
        console.log('error:', error);
        resolve(true);
      }
    })
  }

  getSubTotalPrice(order: any) {
    if (order.deliveryGstObj) {
      if (order.deliveryGstObj.isExclusive) {
        return order.totalMrp - order.defaultGst + (order.deliveryGstObj.extraChargeGst || 0)
      } else {
        return order.totalMrp - order.defaultGst + ((order.deliveryGstObj.total || 0) + (order.deliveryGstObj.extraChargeGst || 0))
      }
    }
  }

  getTotalGst(order: any) {
    if (order.deliveryGstObj) {
      if (order.deliveryGstObj.isExclusive) {
        return order.defaultGst - (order.deliveryGstObj.extraChargeGst || 0);
      } else {
        return order.defaultGst - ((order.deliveryGstObj.total || 0) + (order.deliveryGstObj.extraChargeGst || 0));
      }
    }
  }

  getDatesBetween(fromDate: any, toDate: any) {
	let dateArr = [];
	for(let dt = new Date(fromDate); dt <= new Date(toDate); dt.setDate(dt.getDate()+1)) {
        dateArr.push(new Date(dt));
    }
    return dateArr;
  }

  convertInvalidDateObjectToTimestamp(dateObj) {
    if (typeof dateObj.toDate === 'function') {
      return dateObj;
    }
    let date;
    if (dateObj._seconds) {
      date = new Date(dateObj._seconds * 1000);
    } else {
      date = new Date(dateObj.seconds * 1000);
    }
    return firebase.firestore.Timestamp.fromDate(new Date(date));
  }

}
