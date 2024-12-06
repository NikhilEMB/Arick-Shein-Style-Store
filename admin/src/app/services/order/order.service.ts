import { Injectable } from '@angular/core';
import { Events, NavController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
import * as firebase from 'firebase';
import { map, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { resolve } from 'url';
import { AngularFireStorage } from '@angular/fire/storage';

declare var RazorpayCheckout: any;
declare var paytm: any;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  loading: any;
  orderMsgsSub: Subscription;
  orderMsgs = new BehaviorSubject([]);
  constructor(private events: Events,
              private storage: Storage,
              private afs: AngularFirestore,
              private userService: UserService,
              private navController: NavController,
              private router: Router,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private fbStorage: AngularFireStorage) { }

  initializeSubscriptions() {
    this.events.subscribe('order:payWithRazorPay', (order, razorpayId, method) => {
      this.payWithRazorPay(order, razorpayId, method);
    });
    this.events.subscribe('order:payWithPaytm', (order) => {
      this.payWithPaytm(order);
    });
    this.events.subscribe('order:sendPaymentRequest', (orderId, userId) => {
      this.sendPaymentRequest(orderId, userId);
    });
    this.events.subscribe('order:payWithCash', (orderId, orderAmount) => {
      this.payWithCash(orderId, orderAmount);
    });
    this.events.subscribe('order:updatePaymentComplete', (orderId) => {
      this.updatePaymentComplete(orderId);
    });
    this.events.subscribe('order:completePaymentWithWallet', (order) => {
      this.completePaymentWithWallet(order);
    });
    this.events.subscribe('order:placeOrderForUser', (orderDetails, listOfCommentImages?) => {
      this.placeOrderForUser(orderDetails, listOfCommentImages);
    });
    this.events.subscribe('order:updateOrderArchive', (orderId, obj) => {
      this.updateOrderArchive(orderId, obj);
    });
    this.events.subscribe('order:removeOrderArchive', (orderId, obj) => {
      this.removeOrderArchive(orderId, obj);
    });
    //auto confirm...
    this.events.subscribe('order:ac_payWithRazorPay', (order, razorpayId, method) => {
      this.ac_payWithRazorPay(order, razorpayId, method);
    });
    this.events.subscribe('order:ac_payWithPaytm', (order) => {
      this.ac_payWithPaytm(order);
    });
    this.events.subscribe('order:ac_payWithCash', (order) => {
      this.ac_payWithCash(order);
    });
    this.events.subscribe('order:ac_completePaymentWithWallet', (order) => {
      this.ac_completePaymentWithWallet(order);
    });
  }
  payWithRazorPay(order: any, razorpayId: any, method: string) {
    try {
      this.storage.get('storeInfo').then((data) => {
        var options = {
          description: environment.razorpay.description,
          currency: environment.razorpay.currency,
          key: razorpayId,
          amount: (order.totalAmountToPaid - order.walletAmount) * 100,
          name: data.storeName,
          image: environment.razorpay.image,
          prefill: {
            method: method,
            contact: this.userService.getPhoneNo(),
            name: this.userService.getUserName(),          
          },
          theme: environment.razorpay.theme
        };
        let successCallback = (async(payment_id: any) => {
          //console.log(payment_id);
          await this.presentLoading();
          const paymentDetails = {
            order: order,
            mode: 'razorpay',
            txnRes: {paymentId: payment_id},
            amount: options.amount
          }
          let saveOrderPaymentDetails = firebase.functions().httpsCallable('payments-saveOrderPaymentDetails');
          saveOrderPaymentDetails(paymentDetails).then(async (res) => {
            if(res.data.status && res.data.status === 'success') {
              this.loading.dismiss();
              const paymentChatMsg = {
                author: 'user',
                createdAt: new Date(),
                isRead: true,
                orderId: order.orderId,
                published: true,
                status: 'PaymentMsg',
                type: 'order',
                paymentMode: 'razorpay'
              }
              await this.paymentChatMsgs(paymentChatMsg, order);
              this.presentAlert('Payment is successful!');
            }
          });     
        });
        let cancelCallback = (error) => {
          if(error.code !== 0) {
            this.presentFailureAlert();
          }
        }
        RazorpayCheckout.open(options, successCallback, cancelCallback);
      });
    } catch (error) {
      console.dir(error);
      this.events.publish('order:paymentFailure');
    }
  }
  payWithPaytm(order:any) {
    const mobileNo = this.userService.getPhoneNo().slice(3);
    //console.log(typeof mobileNo, mobileNo);
    let getCheckSum = firebase.functions().httpsCallable('payments-getCheckSumApi');
    getCheckSum({
      orderId: order.orderId.toString(),
      customerId: order.userId,
      phoneNo: mobileNo,
      txnAmount: (order.totalAmountToPaid - order.walletAmount).toString(),
    }).then((result) => {
      //console.log('checksum:', result.data.checksum);

      const paytmParams: any = {
          MID: result.data.mid,
          ORDER_ID: order.orderId.toString(),
          CUST_ID: order.userId,
          CHANNEL_ID: 'WAP',
          TXN_AMOUNT: (order.totalAmountToPaid - order.walletAmount).toString(),
          WEBSITE: 'WEBSTAGING',
          CALLBACK_URL: "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=" + order.orderId,
          INDUSTRY_TYPE_ID: 'Retail',
          MOBILE_NO: mobileNo,
          CHECKSUMHASH: result.data.checksum,
          ENVIRONMENT: 'staging'
      };
      let successCallback = async (response: any) => {
        if (response.STATUS == "TXN_SUCCESS") {
            await this.presentLoading();
            const paymentDetails = {
              order: order,
              mode: 'paytm',
              txnRes: response,
              amount: paytmParams.TXN_AMOUNT
            }
            let saveOrderPaymentDetails = firebase.functions().httpsCallable('payments-saveOrderPaymentDetails');
            saveOrderPaymentDetails(paymentDetails).then(async (res) => {
              //console.log('res of pd', res.data);
              if(res.data.status && res.data.status === 'success') {
                this.loading.dismiss();
                const paymentChatMsg = {
                  author: 'user',
                  createdAt: new Date(),
                  isRead: true,
                  orderId: order.orderId,
                  published: true,
                  status: 'PaymentMsg',
                  type: 'order',
                  paymentMode: 'paytm'
                }
                await this.paymentChatMsgs(paymentChatMsg, order);
                this.presentAlert('Payment is successful!');
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
      //console.log("Error", code, message, details);
      this.presentFailureAlert();
    });
  }
  
  async sendPaymentRequest(orderId: any, userId: string) {
    try {
      const paymentReqMsg = {
        author: 'admin',
        createdAt: new Date(),
        isRead: true,
        orderId: orderId,
        published: true,
        status: 'PaymentRequest',
        type: 'order'
      }
      this.events.publish('chat:sendMsg', paymentReqMsg, userId);
      this.events.publish('order:sendPaymentRequestSuccess');

      const docRef = this.afs.collection('whatsapp').doc('account');
      docRef.get().toPromise().then(res=>{
        if(res.exists && res.data() && res.data().setting && res.data().setting.paymentReminder) {
          const paymentReminder = firebase.functions().httpsCallable('whatsappExpress-sendPaymentReminder');
          paymentReminder({orderId:orderId}).then((res) => {console.log('PaymentReminder...',res.data);});
        }
      });
      
    } catch (error) {
      console.dir(error);
    }
  }
  async payWithCash(orderId: any, orderAmount: any) {
    try {
      const orderRef = this.afs.collection('orders', ref => ref.where('orderId', '==', orderId));
      const orderData: any = await orderRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      await this.afs.collection('orders').doc(orderData[0].id).update({
        payment: {
          completed: false,
          mode: 'cash',
          details: {
            amount: orderAmount
          }
      }});
      const chatRef = this.afs.collection('chats').doc(orderData[0].userId).collection('messages', ref => ref
      .where('orderId', '==', orderId)
      .where('status', 'in', ['Confirmed', 'PaymentRequest']));
      const chatSnap = await chatRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      for (let index = 0; index < chatSnap.length; index++) {
        //console.log('msg id of do payment', chatSnap[index].id);
        await this.afs.collection('chats').doc(orderData[0].userId).collection('messages').doc(chatSnap[index].id).delete();
      }
      this.events.publish('order:modeSetToCashSuccess');
    } catch (error) {
      console.dir(error);
    }
  }
  async updatePaymentComplete(orderId) {
    try {
      const orderRef = this.afs.collection('orders', ref => ref.where('orderId', '==', orderId));
      const orderData: any = await orderRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      await this.afs.collection('orders').doc(orderData[0].id).update({
        "payment.completed": true
      });
      this.events.publish('order:updatePaymentCompleteSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async completePaymentWithWallet(order: any) {
    try {
        let paymentWithWallet = firebase.functions().httpsCallable('payments-completePaymentWithWallet');
        paymentWithWallet(order).then(async (res) => {
          if(res.data.status && res.data.status === 'success') {
            this.events.publish('order:completePaymentWithWalletSuccess');
            const paymentChatMsg = {
              author: 'user',
              createdAt: new Date(),
              isRead: true,
              orderId: order.orderId,
              published: true,
              status: 'PaymentMsg',
              type: 'order',
              paymentMode: 'wallet'
            }
            await this.paymentChatMsgs(paymentChatMsg, order);
            
          } else {
            this.presentFailureAlert();
          }
        });
      
    } catch (error) {
      console.dir(error);
    }
  }

  async paymentChatMsgs(chatObj, order) {
      const chatRef = this.afs.collection('chats').doc(order.userId).collection('messages', ref => ref
      .where('orderId', '==', order.orderId)
      .where('status', 'in', ['Confirmed', 'PaymentRequest']));
      const chatSnap = await chatRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      for (let index = 0; index < chatSnap.length; index++) {
        //console.log('msg id of do payment', chatSnap[index].id);
        await this.afs.collection('chats').doc(order.userId).collection('messages').doc(chatSnap[index].id).delete();
      }
      this.events.publish('chat:sendMsg', chatObj, order.userId);
  }

  //Auto confrim order functions

  ac_payWithRazorPay(order: any, razorpayId: any, method: string) {
    try {
      this.storage.get('storeInfo').then((data) => {
        var options = {
          description: environment.razorpay.description,
          currency: environment.razorpay.currency,
          key: razorpayId,
          amount: (order.totalAmountToPaid - order.walletAmount) * 100,
          name: data.storeName,
          image: environment.razorpay.image,
          prefill: {
            method: method,
            contact: this.userService.getPhoneNo(),
            name: this.userService.getUserName(),          
          },
          theme: environment.razorpay.theme
        };
        let successCallback = (async(payment_id: any) => {
          //console.log(payment_id);
          await this.presentLoading();
          const paymentDetails = {
            order: order,
            mode: 'razorpay',
            txnRes: {paymentId: payment_id},
            amount: options.amount
          }
          let ac_saveOrderPaymentDetails = firebase.functions().httpsCallable('payments-ac_saveOrderPaymentDetails');
          ac_saveOrderPaymentDetails(paymentDetails).then((res) => {
            if(res.data.status && res.data.status === 'success') {
              this.loading.dismiss();
              this.presentAlert('Order has been placed successfully!');
              this.clearProductsInCartIfAny(order.userId);
            }
          })          
        });
        let cancelCallback = (error) => {
          if(error.code !== 0) {
            this.presentFailureAlert();
          }
        }
        RazorpayCheckout.open(options, successCallback, cancelCallback);
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async ac_payWithPaytm(order: any) {
    //console.log('order obj in paytm', order);
    const mobileNo = this.userService.getPhoneNo().slice(3);
    //console.log(typeof mobileNo, mobileNo);
    const orderRefId = this.afs.collection('orders').ref.doc().id;
    let getCheckSum = firebase.functions().httpsCallable('payments-getCheckSumApi');
    getCheckSum({
      orderId: orderRefId.toString(),
      customerId: order.userId,
      phoneNo: mobileNo,
      txnAmount: (order.totalAmountToPaid - order.walletAmount).toString(),
    }).then((result) => {
      //console.log('checksum:', result.data.checksum);

      const paytmParams: any = {
          MID: result.data.mid,
          ORDER_ID: orderRefId.toString(),
          CUST_ID: order.userId,
          CHANNEL_ID: 'WAP',
          TXN_AMOUNT: (order.totalAmountToPaid - order.walletAmount).toString(),
          WEBSITE: 'WEBSTAGING',
          CALLBACK_URL: "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=" + orderRefId.toString(),
          INDUSTRY_TYPE_ID: 'Retail',
          MOBILE_NO: mobileNo,
          CHECKSUMHASH: result.data.checksum,
          ENVIRONMENT: 'staging'
      };
      let successCallback = async (response: any) => {
        if (response.STATUS == "TXN_SUCCESS") {
            await this.presentLoading();
            const paymentDetails = {
              order: order,
              mode: 'paytm',
              txnRes: response,
              amount: paytmParams.TXN_AMOUNT
            }
            let ac_saveOrderPaymentDetails = firebase.functions().httpsCallable('payments-ac_saveOrderPaymentDetails');
            ac_saveOrderPaymentDetails(paymentDetails).then((res) => {
              if(res.data.status && res.data.status === 'success') {
                this.loading.dismiss();
                this.presentAlert('Order has been placed successfully!');
                this.clearProductsInCartIfAny(order.userId);
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
      //console.log("Error", code, message, details);
      this.presentFailureAlert();
    });
  }

  async ac_completePaymentWithWallet(order: any) {
    try {
        let orderPaymentWithWallet = firebase.functions().httpsCallable('wallet-orderPaymentWithWallet');
        orderPaymentWithWallet(order).then((res) => {
          if(res.data.status && res.data.status === 'success') {
            this.events.publish('order:ac_completePaymentWithWalletSuccess');
            this.clearProductsInCartIfAny(order.userId);
          } else {
            this.presentFailureAlert();
          }
        });
      
    } catch (error) {
      console.dir(error);
    }
  }

  async clearProductsInCartIfAny(userId) {
    this.storage.get('buyNowOrder').then(async (val) => {
      if(!val) {
        const cartRef = this.afs.collection('users').doc(userId).collection('cart');
        const cartData:any = await cartRef.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).pipe(first()).toPromise();
        for (let i = 0; i < cartData.length; i++) {
          await this.afs.collection('users').doc(userId).collection('cart').doc(cartData[i].id).delete();
        }
        this.events.publish('user:getAllProductIdsOfCart');
        this.events.publish('user:orderSuccessfullyPlaced');
      } else {
        this.events.publish('user:getAllProductIdsOfCart');
        this.events.publish('user:orderSuccessfullyPlaced');
      }
    });
  }

  async ac_payWithCash(order: any) {
    try {
      order['payment'] = {
        completed: false,
        mode: 'cash',
        details: {
          amount: order.totalAmountToPaid
        }
      }
      order['createdAt'] = new Date();
      await this.afs.collection('orders').add(order);
      this.clearProductsInCartIfAny(order.userId);
      this.events.publish('order:ac_modeSetToCashSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async placeOrderForUser(orderDetails, listOfCommentImages?) {
    try {
      orderDetails['msgId'] = this.afs.collection('chats').doc(orderDetails.userId).collection('messages').ref.doc().id;
      let orderDocId = this.afs.collection('orders').ref.doc().id;
    //  const docResponse = await this.afs.collection('orders').add(orderDetails);

    //  const orderDocId = docResponse.id;
     console.log("orderDocId",orderDocId);
     orderDetails.products = await this.addCommentImgs(listOfCommentImages, orderDocId, orderDetails.products);
     await this.afs.collection('orders').doc(orderDocId).set(orderDetails);
      this.events.publish('order:placeOrderForUserSuccess');
    } catch (error) {
      console.log("error: order-placeOrderForUser", error);
      this.events.publish('order:placeOrderForUserFailure');
    }
  }

  async addCommentImgs(listOfCommentImages: any, orderDocId: string, products: any[]) {
    console.log("addCommentImgs-listOfCommentImages", listOfCommentImages);
    if (Object.keys(listOfCommentImages).length !== 0) {
      for (let pid of Object.keys(listOfCommentImages)) {
        const imgs = listOfCommentImages[pid];
        const imgsUrls = [];
        for (const img of imgs) {
          const imgRef: any = this.fbStorage.ref(`ordersCommentImgs/${orderDocId}/images/${pid}/` + new Date().getTime() + '.png');
          await imgRef.putString(img, 'data_url');
          const downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
          console.log("downloadURL", downloadURL);
          imgsUrls.push({ url: downloadURL });
        }
        const productIndex = products.findIndex(p => p.productId === pid);
        if (productIndex !== -1) {
          products[productIndex].commentImgs = imgsUrls;
        }
      }
    }
    return products;
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
            this.navController.navigateRoot(['user-order-history']);
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
  
    await alert.present();
  }

  
  async saveUnavailableProducts(unavailable: any, unavailablePrice: number, order: any) {
    try {
        const updateObj = {
            unavailable,
            unavailablePrice: unavailablePrice + (order.unavailablePrice || 0),
        }
        let unavailableGst = 0;
        let unavailableExclusiveGst = 0;
        for (const key in unavailable) {
          const {gstValue, exclusiveGst} = this.calcProductGst(order.products[key], unavailable[key]);
          unavailableGst += gstValue;
          unavailableExclusiveGst += exclusiveGst;
        }
        if (!order.autoConfirmOrder || (order.autoConfirmOrder && (!order.payment.completed))) {
            updateObj['totalAmountToPaid'] = order.totalAmountToPaid - unavailablePrice - (unavailableExclusiveGst || 0);
            updateObj['unavailableGst'] = unavailableGst;
            if (order.payment.mode === 'cash') {
                let cashAmnt = order.payment.hasOwnProperty('details') ? (order.payment.details.amount || 0) : 0;
                if (cashAmnt) {
                    cashAmnt -= unavailablePrice;
                    updateObj['payment.details.amount'] = cashAmnt;
                }
            }
        }
        await this.afs.collection('orders').doc(order.id).update(updateObj);
    } catch (error) {
        console.dir(error);
        error['location'] = 'order-service:saveUnavailableProducts';
        //this.logglyService.log(error);
    }
}

  calcProductGst(product, qty) {
    let gstValue = 0;
    let exclusiveGst = 0;
    if (product.gst) {
      if ('gstExclusive' in product && product.gstExclusive) {
        gstValue = (product.price * (product.gst / 100)) * qty;
        exclusiveGst += gstValue
      } else {
        gstValue = (product.price - (product.price / (1 + (product.gst / 100)))) * qty;
      }
    }
    return {gstValue, exclusiveGst};
  }

  async generateInvoice(orderId: any, customInvoiceNo?) {
    return new Promise(async (resolve, reject) => {
        try {
          if (customInvoiceNo && customInvoiceNo.active) {
            const invoiceGen = firebase.functions().httpsCallable('orders-generateInvoiceByAdmin');
            invoiceGen({orderId, invoiceNo: customInvoiceNo.invoiceNo}).then(response => {
                console.log('generateInvoice res', response);
                resolve(response.data);
            });
          } else {
            const invoiceGen = firebase.functions().httpsCallable('orders-generateInvoiceByAdmin');
            invoiceGen({orderId}).then(response => {
                console.log('generateInvoice res', response);
                resolve(response.data);
            });
          }
        } catch (error) {
            console.dir(error);
            reject({status: 'not_generated'});
        }
    });
}

async updateOrderArchive(orderId, obj) {
  try {
    await this.afs.collection('orders').doc(orderId).update(obj);
    this.events.publish('order:updateOrderArchiveSuccess');
  } catch (error) {
    this.events.publish('order:updateOrderArchiveFailure');
    console.dir(error);
  }
}

async removeOrderArchive(orderId, obj) {
  try {
    await this.afs.collection('orders').doc(orderId).update(obj);
    this.events.publish('order:removeOrderArchiveSuccess');
  } catch (error) {
    this.events.publish('order:removeOrderArchiveFailure');
    console.dir(error);
  }
}

async getOrderDetails(orderId){
  try {
    let orderDetails:any = await this.afs.collection('orders').doc(orderId).valueChanges().pipe(first()).toPromise();
    return orderDetails;
  } catch (error) {
    console.dir(error);
  }
}

async getOrderMessages(id){
  return new Promise(async (resolve) => {
    try {
      let msgs = [];
      this.orderMsgsSub = this.afs.collection('orders').doc(id).collection('messages', ref => ref.orderBy('createdAt', 'asc')).snapshotChanges().subscribe(async response => {
        if(!response.length) {
          this.orderMsgs.next([]);
          resolve([]);
      } else {
        msgs = [];
        for (const res of response) {
          msgs.push({ id: res.payload.doc.id, ...res.payload.doc.data() });
        }
        msgs = [...msgs];
        this.orderMsgs.next([...msgs]);
        resolve(msgs);
      }
      })
    } catch (error) {
      console.dir(error);
      this.orderMsgs.next([]);
      resolve([]);
    }
  })
}

async addOrderMessages(id, msgObj){
  return new Promise(async (resolve) => {
    try {
      await this.afs.collection('orders').doc(id).collection('messages').add(msgObj);
      resolve(true);
    } catch (error) {
      resolve(false);
    }
  })
}

  async getArchiveOrders() {
    return new Promise(async (resolve) => {
      try {
        let ordersArchive = [];
        const ordersArchiveRef = this.afs.collection('orders', ref => ref
          .orderBy('createdAt', 'desc')
          .where('subStatus.isArchive', '==', true));

        ordersArchiveRef.get().subscribe((querySnapshot: any) => {
          querySnapshot.forEach((doc: any) => {
            ordersArchive.push({ ...doc.data(), id: doc.id });
          });
          console.log(ordersArchive);
          resolve(ordersArchive);
        });

      } catch (error) {
        console.log("getArchiveOrders error: ", error);
      }
    });
  }

  async saveEditQuotation(id: any, products: any, price: any) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.afs.collection('orders').doc(id).update({products: products, totalAmountToPaid: price});
        resolve(true);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getCurrentPrice(products){
    return new Promise(async (resolve, reject) => {
      try {
        let data = []
        for (let i = 0; i < products.length; i++){
          data.push( await this.afs.collection('products').doc(products).update({products: products}))
        }
        resolve(data);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async generatePrintingInvoice(orderId: any) {
    return new Promise((resolve) => {
      try {
        const invoiceGen = firebase.functions().httpsCallable('orders-generatePrintingInvoiceByAdmin');
        invoiceGen({ orderId }).then(response => {
          console.log('generatePrintingInvoice res', response);
          resolve(response.data);
        }).catch(error => {
          console.log("invoiceGen error", error);
          resolve({ status: 'not_generated' });
        });

      } catch (error) {
        console.log("error", error);
        resolve({ status: 'not_generated' });
      }
    });
  }
  async updateOrderData(orderId: string, obj: any) {
    console.log("orderId: string, obj: any", orderId, obj);
    return new Promise(async (resolve) => {
      await this.afs.collection('orders').doc(orderId).update(obj).then(res => {
        console.log("updateOrderData query success", res);
        resolve(true);
      }).catch(e => {
        console.log("updateOrderData query error", e);
        resolve(false);
      });
    }).catch(e => {
      console.log("updateOrderData error", e);
      return false;
    });
  }
}
