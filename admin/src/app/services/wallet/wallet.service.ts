import { Injectable } from '@angular/core';
import { Events, NavController, LoadingController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
import { ConfigService } from 'src/app/services/config/config.service';

declare var RazorpayCheckout: any;
declare var paytm: any;

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  loading: any;
  transcations: any = [];
  lastTxn: any;
  constructor(private events: Events,
              private afs: AngularFirestore,
              private storage: Storage,
              private userService: UserService,
              private navController: NavController,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private configService: ConfigService) { }

  initializeSubscriptions() {
    this.events.subscribe('wallet:getWalletSettings', () => {
      this.getWalletSettings();
    });
    this.events.subscribe('wallet:saveWalletSettings', (data) => {
      this.saveWalletSettings(data);
    });
    this.events.subscribe('wallet:getCashbackList', () => {
      this.getCashbackList();
    });
    this.events.subscribe('wallet:addNewCashback', (data) => {
      this.addNewCashback(data);
    });
    this.events.subscribe('wallet:deleteCashback', (cid) => {
      this.deleteCashback(cid);
    });
    this.events.subscribe('wallet:addAmountToUsersByAdmin', (amount) => {
      this.addAmountToUsersByAdmin(amount);
    });
    this.events.subscribe('wallet:addMoneyToSingleUserWallet', (data, uid, type) => {
      this.addMoneyToSingleUserWallet(data, uid, type);
    });
    this.events.subscribe('wallet:getUserWalletDetails', (uid) => {
      this.getUserWalletDetails(uid);
    });
    this.events.subscribe('wallet:getWalletTrans', (uid) => {
      this.getWalletTrans(uid);
    });
    this.events.subscribe('wallet:getMoreWalletTrans', (uid) => {
      this.getMoreWalletTrans(uid);
    });
    this.events.subscribe('wallet:addMoneyWithRazorPay', (uid, amount, rid, mode, balance) => {
      this.addMoneyWithRazorPay(uid, amount, rid, mode, balance);
    });
    this.events.subscribe('wallet:addMoneyWithPaytm', (uid, amount, balance) => {
      this.addMoneyWithPaytm(uid, amount, balance);
    });
    this.events.subscribe('wallet:chargeUser', (charge, uid, type) => {
      this.chargeUser(charge, uid, type);
    });
  }

  async getWalletSettings(routeFrom?) {
    try {
      const walletData = await this.afs.collection('settings').doc('wallet').valueChanges().pipe(first()).toPromise();
      if(!routeFrom) {
        this.events.publish('wallet:publishWalletSettings', walletData);
      } else {
        return walletData;
      }
    } catch (error) {
      console.dir(error);
    }
  }

  async saveWalletSettings(data: any) {
    try {
      await this.afs.collection('settings').doc('wallet').set(data);
      this.events.publish('wallet:saveWalletSettingsSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async getCashbackList() {
    try {
      const cashbacksRef = this.afs.collection('settings').doc('wallet').collection('cashbacks', ref => ref.orderBy('createdAt', 'desc'));
      const cashbacksSnap = cashbacksRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      cashbacksSnap.subscribe((res) => {
        this.events.publish('wallet:publishCashbackList', res);
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async addNewCashback(data) {
    try {
      const cashback = {
        createdAt: new Date(),
        orderAmount: parseInt(data.orderAmnt),
        cashback: parseInt(data.cashback),
        perUser: parseInt(data.perUser)
      }
      await this.afs.collection('settings').doc('wallet').collection('cashbacks').add(cashback);
      this.events.publish('wallet:addNewCashbackSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async deleteCashback(cid: string) {
    try {
      await this.afs.collection('settings').doc('wallet').collection('cashbacks').doc(cid).delete();
      this.events.publish('wallet:deleteCashbackSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async addAmountToUsersByAdmin(amount: number) {
    try {
     
        const amntData = {
          amount: amount,
          storeName: this.configService.environment.storeName
        }
        await this.afs.collection('settings').doc('wallet').collection('transactions').add(amntData);
        this.events.publish('wallet:addAmountToUsersByAdminSuccess', `<strong>${this.configService.environment.currencyCode}${amount}</strong> has been added to all users wallet successfully. It may take upto 10 mins to reflect amount in wallet for all users.`);
        // let addAmount = firebase.functions().httpsCallable('wallet-addAmountToUsersByAdmin');
        // addAmount(amntData).then((res) => {
        //   console.log(res.data);
        //   if(res.data.status) {
        //     this.events.publish('wallet:addAmountToUsersByAdminSuccess', `<strong>${environment.currencyCode}${amount}</strong> has been added to all users wallet successfully`);
        //   } else {
        //     this.events.publish('wallet:addAmountToUsersByAdminSuccess', 'There is some problem in adding money to all users wallet. Please try again later.');
        //   }
        // });
    

    } catch (error) {
      console.dir(error);
    }
  }

  async addMoneyToSingleUserWallet(data: any, uid: string, type: string) {
    try {
      const amountData = {
        amount: parseFloat(data.amount),
        storeName: this.configService.environment.storeName,
        uid: uid,
        type,
        message: data.msg,
      }
      let addMoney = firebase.functions().httpsCallable('wallet-addMoneyToSingleUserWallet');
      addMoney(amountData).then((res) => {
        // console.log(res.data);
        if (res.data.status) {
          this.events.publish('wallet:addMoneyToSingleUserWalletSuccess', `<strong>${this.configService.environment.currencyCode}${data.amount}</strong> has been added successfully`);
        } else {
          this.events.publish('wallet:addMoneyToSingleUserWalletSuccess', 'There is some problem in adding money to the user wallet. Please try again later.');
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async getUserWalletDetails(uid: string) {
    try {
      this.afs.collection('users').doc(uid).valueChanges().subscribe((res) => {
       // console.log(res);
        this.events.publish('wallet:publishUserWalletDetails', res);
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async getWalletTrans(uid: string) {
    try {
      this.transcations = [];
      const txns: any = await this.afs.collection('users').doc(uid).collection('walletTransactions', ref => ref
      .orderBy('createdAt', 'desc')
      .limit(this.configService.environment.scrollLimit)).snapshotChanges().pipe(first()).toPromise();
      if(txns.length > 0) {
        this.lastTxn = txns[txns.length - 1].payload.doc;
        for(const txn of txns) {
          this.transcations.push({id: txn.payload.doc.id, ...txn.payload.doc.data()})
        }
      }
      this.events.publish('wallet:publishWalletTrans', this.transcations);
    } catch (error) {
      console.dir(error);
    }
  }

  async getMoreWalletTrans(uid: string) {
    try {
      const txns: any = await this.afs.collection('users').doc(uid).collection('walletTransactions', ref => ref
      .orderBy('createdAt', 'desc')
      .limit(this.configService.environment.scrollLimit)
      .startAfter(this.lastTxn)).snapshotChanges().pipe(first()).toPromise();
      if(txns.length > 0) {
        this.lastTxn = txns[txns.length - 1].payload.doc;
        for(const txn of txns) {
          this.transcations.push({id: txn.payload.doc.id, ...txn.payload.doc.data()})
        }
      } else {
        this.events.publish('wallet:noMoreWalletTrans');
      }
      this.events.publish('wallet:publishWalletTrans', this.transcations);
    } catch (error) {
      console.dir(error);
    }
  }

  addMoneyWithRazorPay(uid: string, amount: number, rid: string, mode: string, balance: number) {
    try {
     
        var options = {
          description: this.configService.environment.razorpay.description,
          currency: this.configService.environment.razorpay.currency,
          key: rid,
          amount: amount * 100,
          name: this.configService.environment.storeName,
          image: this.configService.environment.razorpay.image,
          prefill: {
            method: mode,
            contact: this.userService.getPhoneNo(),
            name: this.userService.getUserName(),
            email: this.userService.getUserEmail() ? this.userService.getUserEmail() : ''
          },
          theme: this.configService.environment.razorpay.theme
        };
        let successCallback = (async(payment_id: any) => {
          console.log(payment_id);
          const walletPaymentObj = {
            uid: uid,
            mode: 'razorpay',
            txnDetails: {paymentId: payment_id},
            amount: amount,
            balance: balance
          }
          await this.presentLoading();
          const txnId = this.afs.collection('users').doc(uid).collection('walletTransactions').ref.doc().id;
          walletPaymentObj['txnId'] = txnId;
          let addMoneyToWalletByUser = firebase.functions().httpsCallable('wallet-addMoneyToWalletByUser');
          addMoneyToWalletByUser(walletPaymentObj).then((res) => {
            console.log(res.data);
            if(res.data.status && res.data.status === 'success') {
              this.loading.dismiss();
              this.presentAlert(`<strong>${this.configService.environment.currencyCode}${amount}</strong> successfully added to your wallet.`);
            } else {
              this.loading.dismiss();
              this.presentAlert('Payment failed. Any amount debited will be refunded in 4 - 5 working days.');
            }
          });

        });
        let cancelCallback = (error) => {
          if(error.code !== 0) {
            this.presentFailureAlert();
          }
        }
        RazorpayCheckout.open(options, successCallback, cancelCallback);
      
    } catch (error) {
      console.dir(error);
      this.events.publish('order:paymentFailure');
    }
  }

  addMoneyWithPaytm(uid: string, amount: number, balance: number) {
    const mobileNo = this.userService.getPhoneNo().slice(3);
    console.log(typeof mobileNo, mobileNo);
    const txnId = this.afs.collection('users').doc(uid).collection('walletTransactions').ref.doc().id;
    let getCheckSum = firebase.functions().httpsCallable('payments-getCheckSumApi');
    getCheckSum({
      orderId: txnId,
      customerId: uid,
      phoneNo: mobileNo,
      txnAmount: amount.toString(),
    }).then((result) => {
      console.log('checksum:', result.data.checksum);

      const paytmParams: any = {
          MID: result.data.mid,
          ORDER_ID: txnId,
          CUST_ID: uid,
          CHANNEL_ID: this.configService.environment.paytm.CHANNEL_ID,
          TXN_AMOUNT: amount.toString(),
          WEBSITE: this.configService.environment.paytm.WEBSITE,
          CALLBACK_URL: "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=" + txnId,
          INDUSTRY_TYPE_ID: this.configService.environment.paytm.INDUSTRY_TYPE_ID,
          MOBILE_NO: mobileNo,
          CHECKSUMHASH: result.data.checksum,
          ENVIRONMENT: this.configService.environment.paytm.ENVIRONMENT
      };
      let successCallback = async (response: any) => {
        if (response.STATUS == "TXN_SUCCESS") {
            console.log('response from paytm', response);
            const walletPaymentObj = {
              uid: uid,
              mode: 'paytm',
              txnDetails: response,
              amount: amount,
              balance: balance,
              txnId: txnId
            }
            await this.presentLoading();
            let addMoneyToWalletByUser = firebase.functions().httpsCallable('wallet-addMoneyToWalletByUser');
            addMoneyToWalletByUser(walletPaymentObj).then((res) => {
              console.log(res.data);
              if(res.data.status && res.data.status === 'success') {
                this.loading.dismiss();
                this.presentAlert(`<strong>${this.configService.environment.currencyCode}${amount}</strong> successfully added to your wallet.`);
              } else {
                this.loading.dismiss();
                this.presentAlert('Payment failed. Any amount debited will be refunded in 4 - 5 working days.');
              }
            });
        } else {
          this.presentFailureAlert();
        }
    }

    let failureCallback = (error: any) => {
      this.presentFailureAlert();
    };

    paytm.startPayment(paytmParams, successCallback, failureCallback);

    }).catch(function(error) {
      var code = error.code;
      var message = error.message;
      var details = error.details;
      console.log("Error", code, message, details);
      this.presentFailureAlert();
    });
  }

  chargeUser(charge: any, uid: string, type: string) {
    try {
      const amountData = {
        amount: parseFloat(charge.amount),
        message: charge.msg,
        storeName: this.configService.environment.storeName,
        uid: uid,
        type: type
      };
      // console.log("amountData",amountData);
      
      let deductMoney = firebase.functions().httpsCallable('wallet-chargeUser');
      deductMoney(amountData).then((res) => {
        // console.log(res.data);
        if (res.data.status) {
          this.events.publish('wallet:chargeUserSuccess', `<strong>${this.configService.environment.currencyCode} ${charge.amount}</strong> has been deducted from the user wallet successfully`);
        } else {
          this.events.publish('wallet:chargeUserSuccess', 'There is some problem in deducting money from the user wallet. Please try again later.');
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
    });
    await this.loading.present();
  }
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      backdropDismiss: false,
      buttons: [{
        text: 'Ok',
        handler: () => {
            this.navController.navigateRoot(['user-wallet']);
        }
      }]
    });

    await alert.present();
  }
  async presentFailureAlert() {
    const alert = await this.alertController.create({
      message: 'Payment is failed! Please try again.',
      buttons: ['Try Again']
    });
  }

  async getPointTransactions(uid: string) {
    try {
      const pointTransactions = [];
      const txns: any = await this.afs.collection('users').doc(uid).collection('pointTransactions', ref => ref
        .orderBy('createdAt', 'desc'))
        .snapshotChanges()
        .pipe(first())
        .toPromise();
      if (txns.length > 0) {
        for (const txn of txns) {
          pointTransactions.push({ id: txn.payload.doc.id, ...txn.payload.doc.data() });
        }
      }
      return pointTransactions;
    } catch (error) {
      console.dir(error);
      return [];
    }
  }

  async addLoyaltyPoints(data:any) {
    try {
      console.log('pointdata', data)
      let addPoints = firebase.functions().httpsCallable('points-addPointToUserWallet');
      const response = await addPoints(data);
      console.log('response', response)
      return response.data;
    } catch (error) {
      console.log('Error while adding loyalty points: ', error)
      return false;
    }
  }
  

  
}
