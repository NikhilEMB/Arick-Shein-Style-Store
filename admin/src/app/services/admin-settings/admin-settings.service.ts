import { SharedService } from 'src/app/services/shared/shared.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, first } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { LogglyLoggerService } from './../loggly-logger/loggly-logger.service';

@Injectable({
  providedIn: 'root'
})
export class AdminSettingsService {

  constructor(private afs: AngularFirestore,
    private events: Events,
    private fbStorage: AngularFireStorage,
    private storage: Storage,
    private sharedService: SharedService,
    private logglyService: LogglyLoggerService) { }
  initializeSubscriptions() {
    this.events.subscribe('admin-settings:saveSettingsData', (data, invoiceData, appData, notification?) => {
      this.saveSettingsData(data, invoiceData, appData, notification);
    });
    this.events.subscribe('admin-settings:getSettingsData', () => {
      this.getSettingsData();
    });
    this.events.subscribe('admin-settings:getSettingsDataForHome', () => {
      this.getSettingsDataForHome();
    });
    this.events.subscribe('admin-settings:getInvoiceData', () => {
      this.getInvoiceData();
    });
    this.events.subscribe('admin-settings:getAppData', (route) => {
      this.getAppData(route);
    });
    this.events.subscribe('admin-settings:getStatesData', () => {
      this.getStatesData();
    });
    this.events.subscribe('admin-settings:savePaymentSettingsData', (data) => {
      this.savePaymentSettingsData(data);
    });
    this.events.subscribe('admin-settings:getPaytmData', () => {
      this.getPaytmData();
    });
    this.events.subscribe('admin-settings:getRazorPayData', () => {
      this.getRazorPayData();
    });
    this.events.subscribe('admin-settings:getPaymentInfoData', () => {
      this.getPaymentInfoData();
    });
    this.events.subscribe('admin-settings:saveTermsAndPrivacy', (data) => {
      this.saveTermsAndPrivacy(data);
    });
    this.events.subscribe('admin-settings:getTermsAndPrivacyData', () => {
      this.getTermsAndPrivacyData();
    });
    this.events.subscribe('admin-settings:getStoreInfo', () => {
      this.getStoreInfo();
    });
    this.events.subscribe('admin-settings:getPlanDetails', () => {
      this.getPlanDetails();
    });

    this.events.subscribe('admin-settings:saveWebsiteSEOData', (data) => {
      this.saveWebsiteSEOData(data);
    });

    this.events.subscribe('admin-settings:getWebsiteSEOData', () => {
      this.getSEOData();
    });

  }

  async uploadSEOBanner(socialMediaBannerImg) {
    let imgType = this.sharedService.getImageType(socialMediaBannerImg);
    const imgRef = this.fbStorage.ref('websiteSEOData/socialMediaBanner' + imgType);
    await imgRef.putString(socialMediaBannerImg, 'data_url');
    let downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
    return downloadURL;
  }

  async saveWebsiteSEOData(data) {
    /*if(socialMediaBannerImg){
      const imgRef = this.fbStorage.ref('websiteSEOData/socialMediaBanner.png');
      await imgRef.putString(socialMediaBannerImg, 'data_url');
       data.socialMediaBannerURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
       //console.log(data.socialMediaBannerURL);
    }*/


    const seoRef = this.afs.collection('settings').doc('seo');
    seoRef.get().subscribe(async (doc) => {
      if (doc.exists) {
        await seoRef.update(data);
        this.events.publish('admin-settings:saveWebsiteSEODataSuccess');
      } else {
        await seoRef.set(data);
        this.events.publish('admin-settings:saveWebsiteSEODataSuccess');
      }
    });
  }

  async getSEOData() {
    try {
      const seoData: any = await this.afs.collection('settings').doc('seo').valueChanges().pipe(first()).toPromise();
      console.log(seoData);
      if (seoData) {
        this.events.publish('admin-settings:publishSEOData', seoData);
      }

    } catch (error) {
      console.dir(error);
    }
  }


  async saveSettingsData(data: any, invoiceData: any, appData: any, notification?) {
    try {
      const settingsRef = this.afs.collection('settings').doc('store');
      const invoiceRef = this.afs.collection('settings').doc('invoice');
      const appRef = this.afs.collection('settings').doc('app');
      const notificationRef = this.afs.collection('settings').doc('notification');
      settingsRef.get().subscribe(async (doc) => {
        if (doc.exists) {
          console.log(data);
          if (data.splashScreen && data.splashScreen.active) {
            if (data.splashScreen.logo.includes('data:image/jpeg;base64,') || data.splashScreen.logo.includes('data:image/jpg;base64,') || data.splashScreen.logo.includes('data:image/png;base64,') || data.splashScreen.logo.includes('data:image/gif;base64,')) {
              const imgRef: any = this.fbStorage.ref('splashScreen/logo.png');
              await imgRef.putString(data.splashScreen.logo, 'data_url');
              const downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
              console.log('splace screen logo',downloadURL);
              data.splashScreen.logo = downloadURL;
            }
          }
          await settingsRef.update(data);
          // this.events.publish('admin-settings:saveSettingsDataSuccess');
        } else {
          await settingsRef.set(data);
        }
      });
      invoiceRef.get().subscribe(async (doc) => {
        if (doc.exists) {
          await invoiceRef.update(invoiceData);
        } else {
          await invoiceRef.set(invoiceData);
        }
      });
      appRef.get().subscribe(async (doc) => {
        if (doc.exists) {
          await appRef.update({ appStoreUrl: appData.appStoreUrl, playstoreUrl: appData.playstoreUrl });
        } else {
          await appRef.set({ appStoreUrl: appData.appStoreUrl, playstoreUrl: appData.playstoreUrl });
        }
      });
      notificationRef.get().subscribe(async (doc) => {
        if (doc.exists) {
          await notificationRef.update(notification);
        } else {
          await notificationRef.set(notification);
        }
      });
      this.events.publish('admin-settings:saveSettingsDataSuccess');
    } catch (error) {
      console.dir(error);
    }
  }
  async getSettingsData() {
    try {
      const settingsData: any = await this.afs.collection('settings').doc('store').valueChanges().pipe(first()).toPromise();
      console.log(settingsData);
      this.events.publish('admin-settings:publishSettingsData', settingsData);
    } catch (error) {
      console.dir(error);
    }
  }
  async getSettingsDataForHome() {
    try {
      const settingsData: any = await this.afs.collection('settings').doc('store').valueChanges().pipe(first()).toPromise();
      console.log(settingsData);
      this.events.publish('admin-settings:publishSettingsDataForHome', settingsData);
    } catch (error) {
      console.dir(error);
    }
  }
  async getInvoiceData(choice?) {
    try {
      const invoiceData: any = await this.afs.collection('settings').doc('invoice').valueChanges().pipe(first()).toPromise();
      console.log(invoiceData);
      this.events.publish('admin-settings:publishInvoiceData', invoiceData);
      if (choice == 'getInvoiceData') {
        return invoiceData;
      }
    } catch (error) {
      console.dir(error);
    }
  }
  async getAppData(route?) {
    try {
      const appData: any = await this.afs.collection('settings').doc('app').valueChanges().pipe(first()).toPromise();
      if (route) {
        return appData;
      } else {
        this.events.publish('admin-settings:publishAppData', appData);
      }
    } catch (error) {
      console.dir(error);
    }
  }

  async getNotificationData(){
    try {
      const data: any = await this.afs.collection('settings').doc('notification').valueChanges().pipe(first()).toPromise();
      return data;
    } catch (error) {
      console.log("error:", error);
      return false;
    }
  }

  async getStatesData() {
    try {
      const statesData: any = await this.afs.collection('settings').doc('states').valueChanges().pipe(first()).toPromise();
      console.log(statesData);
      this.events.publish('admin-settings:publishStatesData', statesData.codes);
    } catch (error) {
      console.dir(error);
    }
  }
  async savePaymentSettingsData(data) {
    try {
      const paytmRef = this.afs.collection('payment').doc('paytm');
      const razorpayRef = this.afs.collection('payment').doc('razorpay');
      const infoRef = this.afs.collection('payment').doc('info');
      if (data.custom && data.custom.active) {
        if (data.custom.image.url.includes('data:image/jpeg;base64,') || data.custom.image.url.includes('data:image/jpg;base64,') || data.custom.image.url.includes('data:image/png;base64,') || data.custom.image.url.includes('data:image/gif;base64,')) {
          const imgRef: any = this.fbStorage.ref('paymentSettings/custom/image/custom.png');
          await imgRef.putString(data.custom.image.url, 'data_url');
          const downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
          data.custom.image.url = downloadURL;
        }
      } else {
        if (data.upiManual.qrCode.includes('data:image/jpeg;base64,') || data.upiManual.qrCode.includes('data:image/jpg;base64,') || data.upiManual.qrCode.includes('data:image/png;base64,') || data.upiManual.qrCode.includes('data:image/gif;base64,')) {
          const imgRef: any = this.fbStorage.ref('paymentSettings/QRCode/image/qrCode.png');
          await imgRef.putString(data.upiManual.qrCode, 'data_url');
          const downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
          data.upiManual.qrCode = downloadURL;
        }
      }
      await paytmRef.set({
        active: data.paytmActive,
        merchantId: data.paytmMerchantId,
        key: data.paytmKey,
        extraChargePaytm: {
          type: data.extraChargePaytm.type,
          charge: data.extraChargePaytm.charge,
          maxCharge: data.extraChargePaytm.maxCharge,
          chargeName: data.extraChargePaytm.chargeName
        }
      });
      await razorpayRef.set({
        active: data.razorpayActive,
        id: data.razorpayId,
        keySecret: data.razorpayKeySecret,
        instantRefund: data.razorpayInstantRefund,
        extraChargeRazorpay: {
          type: data.extraChargeRazorpay.type,
          charge: data.extraChargeRazorpay.charge,
          maxCharge: data.extraChargeRazorpay.maxCharge,
          chargeName: data.extraChargeRazorpay.chargeName
        }
      });
      await infoRef.set({
        autoConfirmOrder: data.autoConfirmOrder,
        gstNo: data.gstNo,
        defaultGst: data.defaultGst,
        minOrderAmount: data.minOrderAmount,
        maxOrderAmount: data.maxOrderAmount,
        isPackagingCharges: data.isPackagingCharges,
        packaging: {
          label: data.packaging.label,
          price: data.packaging.price
        },
        isGstApplicable: data.isGstApplicable,
        panNo: data.panNo,
        isCod: data.isCod,
        codPercentage: data.codPercentage,
        upiManual: data.upiManual,
        generateInvoice: data.generateInvoice,
        custom: data.custom,
        extraCharge: {
          type: data.extraCharge.type,
          charge: data.extraCharge.charge,
          maxCharge: data.extraCharge.maxCharge,
          chargeName: data.extraCharge.chargeName
        }
      });
      this.events.publish('admin-settings:savePaymentSettingsDataSuccess');
    } catch (error) {
      console.dir(error);
    }
  }
  async getPaytmData() {
    try {
      const paytmData: any = await this.afs.collection('payment').doc('paytm').valueChanges().pipe(first()).toPromise();
      this.events.publish('admin-settings:publishPaytmData', paytmData);
    } catch (error) {
      console.dir(error);
    }
  }
  async getRazorPayData() {
    try {
      const razorpayData: any = await this.afs.collection('payment').doc('razorpay').valueChanges().pipe(first()).toPromise();
      this.events.publish('admin-settings:publishRazorPayData', razorpayData);
    } catch (error) {
      console.dir(error);
    }
  }
  async getPaymentInfoData() {
    try {
      const uid = await this.sharedService.getStorageUid();
      if (uid) {
        const infoData: any = await this.afs.collection('payment').doc('info').valueChanges().pipe(first()).toPromise();
        this.events.publish('admin-settings:publishPaymentInfoData', infoData);
      }
    } catch (error) {
      console.dir(error);
    }
  }
  async saveTermsAndPrivacy(data) {
    console.log('service', data)
    try {
      const settingsRef = this.afs.collection('settings').doc('policies');
      settingsRef.get().subscribe(async (doc) => {
        if (doc.exists) {
          await settingsRef.update({
            terms: data.terms ? data.terms : '',
            privacy: data.privacy ? data.privacy : '',
            cancel: data.cancel ? data.cancel : '',
            refund: data.refund ? data.refund : '',
            shipping: data.shipping ? data.shipping : '',
            termsActiveStatus: data.termsActiveStatus ? data.termsActiveStatus : false,
            privacyActiveStatus: data.privacyActiveStatus ? data.privacyActiveStatus : false,
            cancelActiveStatus: data.cancelActiveStatus ? data.cancelActiveStatus : false,
            refundActiveStatus: data.refundActiveStatus ? data.refundActiveStatus : false,
            shippingActiveStatus: data.shippingActiveStatus ? data.shippingActiveStatus : false
          });
        } else {
          await settingsRef.set({
            terms: data.terms ? data.terms : '',
            privacy: data.privacy ? data.privacy : '',
            cancel: data.cancel ? data.cancel : '',
            refund: data.refund ? data.refund : '',
            shipping: data.shipping ? data.shipping : '',
            termsActiveStatus: data.termsActiveStatus ? data.termsActiveStatus : false,
            privacyActiveStatus: data.privacyActiveStatus ? data.privacyActiveStatus : false,
            cancelActiveStatus: data.cancelActiveStatus ? data.cancelActiveStatus : false,
            refundActiveStatus: data.refundActiveStatus ? data.refundActiveStatus : false,
            shippingActiveStatus: data.shippingActiveStatus ? data.shippingActiveStatus : false
          });
        }
      });
      this.events.publish('admin-settings:saveTermsAndPrivacySuccess');
    } catch (error) {
      console.dir(error);
    }
  }
  async getTermsAndPrivacyData() {
    try {
      const policiesData: any = await this.afs.collection('settings').doc('policies').valueChanges().pipe(first()).toPromise();
      console.log(policiesData);
      this.events.publish('admin-settings:publishTermsAndPrivacyData', policiesData);
    } catch (error) {
      console.dir(error);
    }
  }
  async getStoreInfo() {
    try {
      this.afs.collection('settings').doc('store').valueChanges()
        .subscribe((res) => {
          console.log('store info in storage', res);
          this.storage.set('storeInfo', res);
        });
    } catch (error) {
      console.dir(error);
      error['location'] = 'admin-settings-service:getStoreInfo';
      this.logglyService.log(error);
    }
  }

  async getPlanDetails() {
    try {
      this.afs.collection('settings').doc('plan').valueChanges()
        .subscribe((res) => {
          this.events.publish('admin-settings:publishPlanDetails', res)
        });
    } catch (error) {
      console.dir(error);
    }
  }

  async getFreeProdLimit() {
    try {
      const freeProdLimitRef = this.afs.collection('settings').doc('freeProductsLimit');
      const freeProdLimit = await freeProdLimitRef.valueChanges().pipe(first()).toPromise();
      const limits = await freeProdLimitRef.collection('limits').snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      let obj = {
        freeProdLimit: freeProdLimit,
        limits: limits
      }
      return obj;
    } catch (error) {
      console.dir(error);
    }
  }


  async saveFreeProdLimit(limitDetails) {
    try {
      const freeProdLimitRef = this.afs.collection('settings').doc('freeProductsLimit');
      await freeProdLimitRef.set(limitDetails);
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async saveFreeProdLimits(limitDetails) {
    try {
      let id;
      const freeProdLimitRef = this.afs.collection('settings').doc('freeProductsLimit');
      if (limitDetails.id) {
        console.log('limitDetails', limitDetails);
        await freeProdLimitRef.collection('limits').doc(limitDetails.id).set(limitDetails);
      } else {
        id = await freeProdLimitRef.collection('limits').add(limitDetails);
      }
      return { success: true, id: id };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFreeProdLimit(limitDetails) {
    try {
      const freeProdLimitRef = this.afs.collection('settings').doc('freeProductsLimit');
      if (limitDetails.id.length) {
        await freeProdLimitRef.collection('limits').doc(limitDetails.id).delete();
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async removeTimeLimit() {
    return new Promise(async (resolve, reject) => {
      try {
        await this.afs.collection('settings').doc('store').update({ cancelTimeForUser: '' });
        resolve(true);
      } catch (error) {
        console.log(error);
      }
    });
  }

  // ? START Branch Feature 

  async getAllBranch() {
    return new Promise(async (resolve) => {
      const branchArray = [];
      const docRef = this.afs.collection('branches');

      docRef.get().subscribe(snapShot => {
        snapShot.forEach((doc) => {
          branchArray.push({ id: doc.id, ...doc.data() });
        });
        resolve(branchArray);
      });

    }).catch(e => {
      console.log("getBranch error", e);
      return [];
    });
  }

  async updateBranch(data: any) {
    return new Promise(async (resolve) => {
      if ('id' in data) {
        await this.afs.collection('branches').doc(data.id).update(data).then(r => {
          resolve(true);
        }).catch(e => {
          console.log("branches update query error:", e);
          resolve(false);
        });;
      }
      else {
        await this.afs.collection('branches').add(data).then(r => {
          resolve(true);
        }).catch(e => {
          console.log("branches set query error:", e);
          resolve(false);
        });;
      }
      resolve(true);
    }).catch(e => {
      console.log("updateBranch e", e);
      return false;
    });
  }

  async deleteBranch(docId: string) {
    return new Promise(async (resolve) => {
      await this.afs.collection('branches').doc(docId).delete().then(r => {
        resolve(true);
      }).catch(e => {
        console.log("branches query error:", e);
        resolve(false);
      });
    }).catch(e => {
      console.log("updateBranch e", e);
      return false;
    });
  }

}
