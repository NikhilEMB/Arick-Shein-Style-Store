import { SharedService } from './../shared/shared.service';
import { UserService } from './../user/user.service';
import { ConfigService } from './../config/config.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Events, Platform } from '@ionic/angular';
import { first, map } from 'rxjs/operators';
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';
import * as firebase from 'firebase';

declare var RazorpayCheckout: any;
declare var paytm: any;

@Injectable({
  providedIn: 'root'
})
export class ProductSubscriptionsService {
  subscriptionCollectionRef = this.afs.collection('subscriptions');
  constructor(private events: Events,
              private afs: AngularFirestore,
              private logglyService: LogglyLoggerService,
              private configService: ConfigService,
              private userService: UserService,
              private platform: Platform,
              private sharedService: SharedService) { }

  initializeSubscriptions() {
    this.events.subscribe('product-subscriptions:saveSettings', (data) => {
      this.saveSettings(data);
    });
    this.events.subscribe('product-subscriptions:getSettings', () => {
      this.getSettings();
    });
    this.events.subscribe('product-subscriptions:payWithCash', (subData) => {
      this.payWithCash(subData);
    });
    this.events.subscribe('product-subscriptions:payWithRazorpay', (subData, mode, razorpayId) => {
      this.payWithRazorpay(subData, mode, razorpayId);
    });
    this.events.subscribe('product-subscriptions:payWithPaytm', (subData) => {
      this.payWithPaytm(subData);
    });
    this.events.subscribe('product-subscriptions:getSubscriptionsOfUser', () => {
      this.getSubscriptionsOfUser();
    });
    this.events.subscribe('product-subscriptions:toggleActive', (sid, status, index) => {
      this.toggleActive(sid, status, index);
    });
    this.events.subscribe('product-subscriptions:removeSub', (sid, index) => {
      this.removeSub(sid, index);
    });
    this.events.subscribe('product-subscriptions:getSubscriptions', () => {
      this.getSubscriptions();
    });

  }

  async saveSettings(data: any) {
    try {
      await this.afs.collection('settings').doc('subscription').set(data);
      this.events.publish('product-subscriptions:saveSettingsSuccess');
    } catch (error) {
      console.dir(error);
      error['location'] = 'product-subscriptions-service:saveSettings'; 
      this.logglyService.log(error);
    }
  }
  async getSettings(returnType?) {
    try {
      const settings = await this.afs.collection('settings').doc('subscription').valueChanges().pipe(first()).toPromise();
      if (returnType == 'return') {
        return settings;
    }
    else {
        this.events.publish('product-subscriptions:publishSettings', settings);
    }
    } catch (error) {
      console.dir(error);
      error['location'] = 'product-subscriptions-service:getSettings'; 
      this.logglyService.log(error);
    }
  }

  async payWithCash(subData: any) {
    console.log('subData in payWithCash', subData);
    try {
      subData['createdAt'] = new Date();
      subData['payment'] = {
        mode: 'cash'
      };
      subData['user'] = {
        id: await this.sharedService.getStorageUid(),
        name: this.userService.getUserName()
      };
      await this.subscriptionCollectionRef.add(subData);
      this.events.publish('product-subscriptions:subscriptionCreatedSuccess');
    } catch (error) {
      console.dir(error);
      this.events.publish('product-subscriptions:subscriptionFailed');
      error['location'] = 'product-subscriptions-service:payWithCash'; 
      this.logglyService.log(error);
    }
  }

  async payWithRazorpay(subData: any, mode: string, razorpayId: string) {
    try {
      const paymentMode = 'razorpay';
      const userId = await this.sharedService.getStorageUid();
      subData['createdAt'] = new Date();
      subData['payment'] = {
        completed: false,
        mode: paymentMode,
        details: null,
        status: 'pending'
      };
      subData['user'] = {
        id: userId,
        name: this.userService.getUserName()
      };
      const subDoc = await this.subscriptionCollectionRef.add(subData);
      const subDocId = subDoc.id;
      const options = {
        description: this.configService.environment.razorpay.description,
        currency: this.configService.environment.razorpay.currency,
        key: razorpayId,
        amount: subData.amountPayable * 100,
        name: this.configService.environment.storeName ? this.configService.environment.storeName : '',
        image: this.configService.environment.razorpay.image,
        prefill: {
          method: mode,
          contact: this.userService.getPhoneNo(),
          name: this.userService.getUserName(),
          email: this.userService.getUserEmail() ? this.userService.getUserEmail() : ''
        },
        theme: this.configService.environment.razorpay.theme,
        payment_capture: 1
      };
      const successCallback = (async(payment_id: any) => {
        const successPayment = {
          completed: true,
          mode: paymentMode,
          details: {paymentId: payment_id},
          status: 'completed'
        };
        await this.subscriptionCollectionRef.doc(subDocId).update({payment: successPayment});
        const paymnetHistory = {
          paidAt: new Date(),
          subscriptionId: subDocId,
          userId: userId,
          mode: paymentMode,
          details: {paymentId: payment_id},
          type: 'subscription',
          status: 'pending',
          amount: subData.amountPayable
      };
        await this.addPaymentHistory(paymnetHistory);
        this.events.publish('product-subscriptions:subscriptionCreatedSuccess');
      });
      const cancelCallback = async (error) => {
        await this.paymentFailedUpdate(subDocId);
        if (error.code !== 0) {
          this.events.publish('product-subscriptions:subscriptionFailed');
        }
      };
      this.platform.resume.subscribe((event) => {
        RazorpayCheckout.on('payment.success', successCallback);
        RazorpayCheckout.on('payment.cancel', cancelCallback);
        RazorpayCheckout.onResume(event);
      });
      RazorpayCheckout.on('payment.success', successCallback);
      RazorpayCheckout.on('payment.cancel', cancelCallback);
      RazorpayCheckout.open(options);

    } catch (error) {
      console.dir(error);
      this.events.publish('product-subscriptions:subscriptionFailed');
      error['location'] = 'product-subscriptions-service:payWithRazorpay'; 
      this.logglyService.log(error);
    }
  }

  async payWithPaytm(subData: any) {
    try {
      const mobileNo = this.userService.getPhoneNo() ? this.userService.getPhoneNo().slice(3) : '';
      const paymentMode = 'paytm';
      const userId = await this.sharedService.getStorageUid();
      subData['createdAt'] = new Date();
      subData['payment'] = {
        completed: false,
        mode: paymentMode,
        details: null,
        status: 'pending'
      };
      subData['user'] = {
        id: userId,
        name: this.userService.getUserName()
      };
      const subDoc = await this.subscriptionCollectionRef.add(subData);
      const subDocId = subDoc.id;
      const getCheckSum = firebase.functions().httpsCallable('payments-getCheckSumApi');
      getCheckSum({
      orderId: subDocId.toString(),
      customerId: userId,
      phoneNo: mobileNo,
      txnAmount: subData.amountPayable.toString(),
    }).then((result) => {
      console.log('checksum:', result.data.checksum);

      const paytmParams: any = {
          MID: result.data.mid,
          ORDER_ID: subDocId.toString(),
          CUST_ID: userId,
          CHANNEL_ID: this.configService.environment.paytm.CHANNEL_ID,
          TXN_AMOUNT: subData.amountPayable.toString(),
          WEBSITE: this.configService.environment.paytm.WEBSITE,
          CALLBACK_URL: "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=" + subDocId.toString(),
          INDUSTRY_TYPE_ID: this.configService.environment.paytm.INDUSTRY_TYPE_ID,
          MOBILE_NO: mobileNo,
          CHECKSUMHASH: result.data.checksum,
          ENVIRONMENT: this.configService.environment.paytm.ENVIRONMENT
      };
      const successCallback = async (response: any) => {
        if (response.STATUS === 'TXN_SUCCESS') {
          const successPayment = {
            completed: true,
            mode: paymentMode,
            details: response,
            status: 'completed'
          };
          await this.subscriptionCollectionRef.doc(subDocId).update({payment: successPayment});
          const paymnetHistory = {
            paidAt: new Date(),
            subscriptionId: subDocId,
            userId: userId,
            mode: paymentMode,
            details: response,
            type: 'subscription',
            status: 'successful',
            amount: subData.amountPayable
        };
          await this.addPaymentHistory(paymnetHistory);
          this.events.publish('product-subscriptions:subscriptionCreatedSuccess');
        } else {
          await this.paymentFailedUpdate(subDocId);
          this.events.publish('product-subscriptions:subscriptionFailed');
        }
    };

      const failureCallback = async (error: any) => {
        await this.paymentFailedUpdate(subDocId);
        this.events.publish('product-subscriptions:subscriptionFailed');
      };

      paytm.startPayment(paytmParams, successCallback, failureCallback);

    }).catch(function(error) {
      const code = error.code;
      const message = error.message;
      const details = error.details;
      console.log('Error', code, message, details);
      this.events.publish('product-subscriptions:subscriptionFailed');
      error['location'] = 'product-subscriptions-service:payWithPaytm_1'; 
      this.logglyService.log(error);
    });
    } catch (error) {
      console.dir(error);
      this.events.publish('product-subscriptions:subscriptionFailed');
      error['location'] = 'product-subscriptions-service:payWithPaytm_2'; 
      this.logglyService.log(error);
    }
  }

  async addPaymentHistory(data: any) {
    try {
      await this.afs.collection('payment').doc('history').collection('payments').add(data);
    } catch (error) {
      console.dir(error);
      error['location'] = 'product-subscriptions-service:addPaymentHistory'; 
      this.logglyService.log(error);
    }
  }

  async paymentFailedUpdate(subId: string) {
    try {
      await this.subscriptionCollectionRef.doc(subId).update({
        payment: {
          completed: false,
          mode: null,
          details: null,
          status: 'failed'
        }
      });
    } catch (error) {
      error['location'] = 'product-subscriptions-service:paymentFailedUpdate'; 
      this.logglyService.log(error);
    }
  }

  async getSubscriptionsOfUser() {
    try {
      const uid = await this.sharedService.getStorageUid();
      if(uid) {
        const subsRef = this.afs.collection('subscriptions', ref => ref
        .where('userId', '==', uid)
        .orderBy('createdAt', 'desc'));
        const subs = await subsRef.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data as {} };
          }))
        ).pipe(first()).toPromise();
        this.events.publish('product-subscriptions:publishSubscriptionsOfUser', subs);
      }
    } catch (error) {
      console.dir(error);
      error['location'] = 'product-subscriptions-service:getSubscriptionsOfUser'; 
      this.logglyService.log(error);
    }
  }

  async toggleActive(sid, status, index) {
    try {
      await this.afs.collection('subscriptions').doc(sid).update({active: status});
      this.events.publish('product-subscriptions:toggleActiveSuccess', index);
    } catch (error) {
      console.dir(error);
      error['location'] = 'product-subscriptions-service:toggleActive'; 
      this.logglyService.log(error);
    }
  }

  async removeSub(sid, index) {
    try {
      await this.afs.collection('subscriptions').doc(sid).delete();
      this.events.publish('product-subscriptions:removeSubSuccess', index);
    } catch (error) {
      console.dir(error);
      error['location'] = 'product-subscriptions-service:removeSub'; 
      this.logglyService.log(error);
    }
  }

  async getSubscriptions() {
    try {
      const subsRef = this.afs.collection('subscriptions', ref => ref
        .orderBy('createdAt', 'desc'));
        const subs = await subsRef.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data as {} };
          }))
        ).pipe(first()).toPromise();
        this.events.publish('product-subscriptions:publishSubscriptions', subs);
    } catch (error) {
      console.dir(error);
      error['location'] = 'product-subscriptions-service:getSubscriptions'; 
      this.logglyService.log(error);
    }
  }

}
