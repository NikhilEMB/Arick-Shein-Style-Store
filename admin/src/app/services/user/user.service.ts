import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { first, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { OrderMsg } from 'src/app/models/order-msg';
import { ChatMsg } from 'src/app/models/message';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import * as firebase from 'firebase';
import { ConfigService } from 'src/app/services/config/config.service';
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';
import { LabelService } from './../label/label.service';
import { convertSnaps } from '../db-utilis';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserGroupsService } from '../user-groups/user-groups.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId: string = '';
  userRef: AngularFirestoreCollection<unknown>;
  phoneNo: string;
  userName: string;
  user: User = {
    name: null,
    email: null,
    phoneNo: null,
    createdAt: null,
    lastAccessAt: null,
    active: null,
    dP: null,
    role: null,
    vacations: null,
    paymentInfo: null,
    defaultAddress: null,
    readTerms: null,
    loginMode: '',
    wallet: {
      balance: 0,
      lastTransactions: {}
    }
  };
  orderMsg: OrderMsg = {
    type: null,
    status: null,
    createdAt: null,
    author: null,
    isRead: null,
    published: null,
    products: null
  };
  msg: ChatMsg = {
    type: null,
    message: null,
    createdAt: null,
    images: null,
    isRead: null,
    author: null,
    published: null,
    mob: null,
    thumb: null,
    imageCount: null
  };
  orders: any[] = [];
  lastOrderData: any;
  lastMsgData: any;
  usersDataForAdminProducts: any[] = [];
  lastResponseForUserProducts: any;
  mediaRef: AngularFirestoreCollection<unknown>;
  pendingOrdersForAdmin: any = [];
  allPendingOrdersForAdmin: any = [];
  lastResponseOfPendingOrdersForAdmin: any;
  dispatchedOrdersForAdmin: any = [];
  paymentPendingOrders: any = [];
  allPaymentPendingOrders: any = [];
  lastResponseOfPaymentPendingOrders: any;
  paymentFailedOrders: any = [];
  allPaymentFailedOrders: any = [];
  lastResponseOfPaymentFailedOrders: any;
  cancelledOrders: any = [];
  allCancelledOrders: any = [];
  lastResponseOfCancelledOrders: any;
  // rejected
  rejectedOrders: any = [];
  allRejectedOrders: any = [];
  lastResponseOfRejectedOrders: any;

  returnedOrders: any = [];
  allReturnedOrders: any = [];
  lastResponseOfReturnedOrders: any;
  allDispatchedOrdersForAdmin: any = [];
  lastResponseOfDispatchedOrdersForAdmin: any;
  completedOrdersForAdmin: any = [];
  allCompletedOrdersForAdmin: any = [];
  lastResponseOfCompletedOrdersForAdmin: any;
  productsNeedToDeliverForAdmin: any = [];
  lastResponseOfProductsNeedToDeliverForAdmin: any;
  userEmail: string;
  loading: any;

  unAssignOrders$ = new BehaviorSubject<any>([]);
  unAssignOrdersSub: Subscription;
  // unAssignOrders = [];

  assignedOrders$ = new BehaviorSubject<any>([]); 
  assignedOrdersSub: Subscription;

  constructor(private afs: AngularFirestore, private events: Events,
    private fbStorage: AngularFireStorage, private storage: Storage,
    private router: Router,
    private configService: ConfigService,
    private logglyService: LogglyLoggerService, private labelService: LabelService,
    private userGroupsService: UserGroupsService) { }
  initializeSubscriptions() {
    this.events.subscribe('user:getUserInfo', () => {
      this.getUserInfo();
    });
    this.events.subscribe('user:addUserImage', (base64Image) => {
      this.addUserImage(base64Image);
    });
    this.events.subscribe('user:getUserDetails', (uid) => {
      this.getUserDetails(uid);
    });
    this.events.subscribe('user:setActiveVacation', (vacationDetails) => {
      this.setActiveVacation(vacationDetails);
    });
    this.events.subscribe('user:getVacationsDetails', () => {
      this.getVacationsDetails();
    });
    this.events.subscribe('user:getAllUsers', () => {
      this.getAllUsers();
    });
    this.events.subscribe('user:getUsersForAdminUsers', (sortType) => {
      this.getUsersForAdminUsers(sortType);
    });
    this.events.subscribe('user:loadMoreUsersForAdminUsers', (sortType) => {
      this.loadMoreUsersForAdminUsers(sortType);
    });
    this.events.subscribe('user:getAllUsersCount', () => {
      this.getAllUsersCount();
    });
    this.events.subscribe('user:changeRole', (role, id) => {
      this.changeRole(role, id);
    });
    this.events.subscribe('user:completeOrder', (uid, oid) => {
      this.completeOrder(uid, oid);
    });
    this.events.subscribe('user:cancelOrder', (oid) => {
      this.cancelOrder(oid);
    });
    this.events.subscribe('user:setPaytmNo', (paytmNo) => {
      this.setPaytmNo(paytmNo);
    });
    this.events.subscribe('user:setPhonePeNo', (phonepeNo) => {
      //console.log('in setPhonePeNo sub..');
      this.setPhonePeNo(phonepeNo);
    });
    this.events.subscribe('user:setUpiId', (upiId) => {
      this.setUpiId(upiId);
    });
    this.events.subscribe('user:deletePrdouctFromChatAndOrders', (orderId, msgId, productId) => {
      //console.log('in deletePrdouctFromChatAndOrders subscribe');
      this.deletePrdouctFromChatAndOrders(orderId, msgId, productId);
    });
    this.events.subscribe('user:saveNewAddress', (addressInfo, type) => {
      this.saveNewAddress(addressInfo, type);
    });
    this.events.subscribe('user:editSavedAddress', (addressInfo, type) => {
      this.editSavedAddress(addressInfo, type);
    });
    this.events.subscribe('user:deleteAddress', (address) => {
      this.deleteAddress(address);
    });
    this.events.subscribe('user:addProductToCart', (product, temp?) => {
      this.addProductToCart(product, temp);
    });
    this.events.subscribe('user:addProductToCartForPriceModal', (product, index) => {
      this.addProductToCartForPriceModal(product, index);
    });
    this.events.subscribe('user:getAllSavedAddresses', () => {
      this.getAllSavedAddresses();
    });
    this.events.subscribe('user:getUserCartProducts', () => {
      this.getUserCartProducts();
    });
    this.events.subscribe('user:getUserCartProductsForPriceModal', () => {
      this.getUserCartProductsForPriceModal();
    });
    this.events.subscribe('user:getLengthOfCartProducts', (uid) => {
      this.getLengthOfCartProducts(uid);
    });
    this.events.subscribe('user:updateQuantityOfCartProduct', (quantity, id, temp?) => {
      this.updateQuantityOfCartProduct(quantity, id, temp);
    });
    this.events.subscribe('user:updateQuantityOfCartProductForPriceModal', (quantity, id, temp?) => {
      this.updateQuantityOfCartProductForPriceModal(quantity, id, temp);
    });
    this.events.subscribe('user:removeProductFromCart', (id, temp?) => {
      this.removeProductFromCart(id, temp);
    });
    this.events.subscribe('user:setAdditionalInfo', (id, info: string, appAccess, groups?) => {
      this.setAdditionalInfo(id, info, appAccess, groups);
    });
    this.events.subscribe('user:removeProductFromCartForPriceModal', (id, temp?) => {
      this.removeProductFromCartForPriceModal(id, temp);
    });
    this.events.subscribe('user:placeOrder', (products, listOfCommentImages, address, paymentObj) => {
      this.placeOrder(products, listOfCommentImages, address, paymentObj);
    });
    this.events.subscribe('user:autoConfirmPlaceOrder', (products, listOfCommentImages, address, paymentObj) => {
      this.autoConfirmPlaceOrder(products, listOfCommentImages, address, paymentObj);
    });
    this.events.subscribe('user:getAllProductIdsOfCart', () => {
      this.getAllProductIdsOfCart();
    });
    this.events.subscribe('user:getOrderDetailsWithOrderId', (orderId) => {
      this.getOrderDetailsWithOrderId(orderId);
    });
    this.events.subscribe('user:getAllOrdersOfUser', (uid) => {
      this.getAllOrdersOfUser(uid);
    });
    this.events.subscribe('user:getPendingOrdersForAdmin', (startDate, endDate, filters?) => {
      this.getPendingOrdersForAdmin(startDate, endDate, filters);
    });
    this.events.subscribe('user:loadMorePendingOrdersForAdmin', (startDate, endDate, filters?) => {
      this.loadMorePendingOrdersForAdmin(startDate, endDate, filters);
    });
    this.events.subscribe('user:getCompletedOrdersForAdmin', (startDate, endDate, filters?) => {
      this.getCompletedOrdersForAdmin(startDate, endDate, filters);
    });
    this.events.subscribe('user:getDispatchedOrdersForAdmin', (startDate, endDate, filters?) => {
      this.getDispatchedOrdersForAdmin(startDate, endDate, filters);
    });
    this.events.subscribe('user:getPaymentPendingOrders', (startDate, endDate, filters?) => {
      this.getPaymentPendingOrders(startDate, endDate, filters);
    });
    this.events.subscribe('user:getAllPaymentPendingOrders', () => {
      this.getAllPaymentPendingOrders();
    });
    this.events.subscribe('user:loadMorePaymentPendingOrders', (startDate, endDate, filters?) => {
      this.loadMorePaymentPendingOrders(startDate, endDate, filters);
    });
    this.events.subscribe('user:getPaymentFailedOrders', (startDate, endDate, filters?) => {
      this.getPaymentFailedOrders(startDate, endDate, filters);
    });
    this.events.subscribe('user:loadMorePaymentFailedOrders', (startDate, endDate, filters?) => {
      this.loadMorePaymentFailedOrders(startDate, endDate, filters);
    });
    this.events.subscribe('user:getCancelledOrders', (startDate, endDate, filters?) => {
      this.getCancelledOrders(startDate, endDate, filters);
    });
    this.events.subscribe('user:loadMoreCancelledOrders', (startDate, endDate, filters?) => {
      this.loadMoreCancelledOrders(startDate, endDate, filters);
    });
    this.events.subscribe('user:getRejectedOrders', (startDate, endDate, filters?) => {
      this.getRejectedOrders(startDate, endDate, filters);
    });
    this.events.subscribe('user:loadMoreRejectedOrders', (startDate, endDate, filters?) => {
      this.loadMoreRejectedOrders(startDate, endDate, filters);
    });
    this.events.subscribe('user:getReturnedOrders', (startDate, endDate, filters?) => {
      this.getReturnedOrders(startDate, endDate, filters);
    });
    this.events.subscribe('user:loadMoreReturnedOrders', (startDate, endDate, filters?) => {
      this.loadMoreReturnedOrders(startDate, endDate, filters);
    });
    this.events.subscribe('user:loadMoreDispatchedOrdersForAdmin', (startDate, endDate, filters?) => {
      this.loadMoreDispatchedOrdersForAdmin(startDate, endDate, filters);
    });
    this.events.subscribe('user:loadMoreCompletedOrdersForAdmin', (startDate, endDate, filters) => {
      this.loadMoreCompletedOrdersForAdmin(startDate, endDate, filters);
    });
    this.events.subscribe('user:getProductsNeedToDeliverForAdmin', () => {
      this.getProductsNeedToDeliverForAdmin();
    });
    this.events.subscribe('user:loadMoreProductsNeedToDeliverForAdmin', () => {
      this.loadMoreProductsNeedToDeliverForAdmin();
    });
    this.events.subscribe('user:rejectOrderByAdmin', (orderId) => {
      this.rejectOrderByAdmin(orderId);
    });
    this.events.subscribe('user:confirmOrderByAdmin', (orderDetails, orderId) => {
      this.confirmOrderByAdmin(orderDetails, orderId);
    });
    this.events.subscribe('user:cancelOrderByAdmin', (orderId, cancelReason) => {
      this.cancelOrderByAdmin(orderId, cancelReason);
    });
    this.events.subscribe('user:dispatchOrderByAdmin', (orderId, message) => {
      this.dispatchOrderByAdmin(orderId, message);
    });
    this.events.subscribe('user:deliverOrderByAdmin', (orderId) => {
      this.deliverOrderByAdmin(orderId);
    });
    this.events.subscribe('user:returnOrderByAdmin', (orderId, refundAmount, orderData) => {
      this.returnOrderByAdmin(orderId, refundAmount, orderData);
    });
    this.events.subscribe('user:cancelOrderByUser', (orderId) => {
      this.cancelOrderByUser(orderId);
    });
    this.events.subscribe('user:setPaymentModeOfOrderByUser', (paymentMode, orderId) => {
      this.setPaymentModeOfOrderByUser(paymentMode, orderId);
    });
    this.events.subscribe('user:blockUser', (uid) => {
      this.blockUser(uid);
    });
    this.events.subscribe('user:blockAndDeleteData', (uid) => {
      this.blockAndDeleteData(uid);
    });
    this.events.subscribe('user:unblockUser', (uid) => {
      this.unblockUser(uid);
    });
    this.events.subscribe('user:acceptTermsAndConds', (uid) => {
      this.acceptTermsAndConds(uid);
    });
    this.events.subscribe('user:updateNameOfNewUser', (uname, email, uid, phone) => {
      this.updateNameOfNewUser(uname, email, uid, phone);
    });
    this.events.subscribe('user:getAllDeliveryAgents', () => {
      this.getAllDeliveryAgents();
    });
    this.events.subscribe('user:assignDeliveryAgent', (agentId, orderId) => {
      this.assignDeliveryAgent(agentId, orderId);
    });
    this.events.subscribe('user:getAddressFromLatLng', (lat, lng) => {
      this.getAddressFromLatLng(lat, lng);
    });
    this.events.subscribe('user:getTotalUsers', () => {
      this.getTotalUsers();
    });
    this.events.subscribe('user:getUpdatedCartProducts', () => {
      this.getUpdatedCartProducts();
    });
    this.events.subscribe('user:setDefaultDeliveryAgentToUser', (agentId, uid) => {
      this.setDefaultDeliveryAgentToUser(agentId, uid);
    });
    this.events.subscribe('user:changeSubRole', (subRole, uid, sortValue) => {
      this.changeSubRole(subRole, uid, sortValue);
    });
    this.events.subscribe('user:addUserByAdmin', (userDetails) => {
      this.addUserByAdmin(userDetails);
    });
    this.events.subscribe('user:getUserToCreateOrder', (userName) => {
      this.getUserToCreateOrder(userName);
    });
    this.events.subscribe('user:saveUserAddressToCreateOrder', (userId, useraddress) => {
      this.saveUserAddressToCreateOrder(userId, useraddress);
    });
    this.events.subscribe('user:getAllUsersForAdminUsers', (sortType) => {
      this.getAllUsersForAdminUsers(sortType);
    });
    this.events.subscribe('user:getUserByRole', (role) => {
      this.getUserByRole(role);
    });


    this.userRef = this.afs.collection('users');
    this.mediaRef = this.afs.collection('media');
  }

  addUserId(uid: string) {
    //console.log('uid:', uid);
    this.userId = uid;
  }
  addPhoneNo(phoneNo: string) {
    //console.log(phoneNo, typeof phoneNo);
    this.phoneNo = phoneNo;
  }
  getUserId() {
    return this.userId;
  }
  async getStorageUid(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      this.storage.get('uid').then((val: string) => {
        resolve(val);
      });
    });
  }
  getPhoneNo() {
    return this.phoneNo;
  }
  addUserName(userName: string) {
    this.userName = userName;
  }
  addUserEmail(email: string) {
    this.userEmail = email;
  }
  getUserName() {
    return this.userName;
  }
  getUserEmail() {
    return this.userEmail;
  }
  async addUser(uid: string, name: string, email: string, phoneNo: string, type: string) {
    this.user.name = name;
    this.user.email = email;
    this.user.phoneNo = phoneNo;
    this.user.createdAt = new Date();
    this.user.lastAccessAt = new Date();
    this.user.active = true;
    this.user.role = 'user';
    this.user.vacations = { active: false, start: null, end: null };
    this.user.dP = 'assets/img/user-pic.gif';
    this.user.readTerms = false;
    this.user.loginMode = type;
    this.msg.type = 'txt';
    this.msg.createdAt = new Date();
    this.msg.isRead = false;
    this.msg.author = 'admin';
    this.msg.published = true;
    this.storage.get('storeInfo').then(async (data) => {
      this.msg.message = data.welcomeMsg;
      try {
        this.userRef.doc(uid).set(this.user);
        this.afs.doc(`chats/${uid}`).set({
          lastMessage: this.msg.message,
          lastMessageAt: new Date(),
          totalMsgs: 1,
          name: this.user.name,
          adminActive: false,
          unreadMsgs: 0,
          userActive: false,
          unreadAdminMsgs: 1,
          userPhoneNo: this.user.phoneNo
        });
        await this.afs.doc(`chats/${uid}`).collection('messages').add(this.msg);
        this.storage.set('userName', this.user.name);
        this.storage.set('userPic', this.user.dP);
        this.addUserName(this.user.name);
        this.events.publish('user:userCreatedSuccessfully', uid, name, email, phoneNo, type);
        // this.pushFCMToken(uid);
      } catch (err) {
        console.dir(err);
      }
    });
  }
  async checkUserAlreadyExistsOrNot(uid: string) {
    const usersRef = this.afs.collection('users').doc(uid);
    usersRef.get().subscribe(async (docSnap) => {
      if (docSnap.exists) {
        this.events.publish('user:userAlreadyExists', uid);
      } else {
        this.addUser(uid, 'user', '', this.getPhoneNo(), 'otp');
      }
    });
  }

  async socialSignInUserCheck(uid: string, name: string, email: string, phoneNo: string, loginType: string) {
    name = name ? name : 'user';
    phoneNo = phoneNo ? phoneNo : '';
    email = email ? email : '';
    this.storage.set('uid', uid);
    //console.log('uid in socialSignInUserCheck', uid);
    const usersRef: any = this.afs.collection('users').doc(uid);
    usersRef.get().subscribe(async (docSnap) => {
      if (docSnap.exists) {
        this.events.publish('user:userAlreadyExists', uid);
      } else {
        this.addUser(uid, name, email, phoneNo, loginType);
      }
    });
  }

  /*async pushFCMToken(uid) {
    let deviceTokens = [];
    let token = await this.fcm.getToken();
    deviceTokens.push(token);
    this.afs.doc(`users/${uid}`).update({deviceTokens:deviceTokens});
}*/
  async updateNameOfNewUser(uname: string, email: string, uid: string, phone: string) {
    try {
      if (!phone.includes(this.configService.environment.defaultCountryCode)) {
        phone = this.configService.environment.defaultCountryCode + phone;
      }
      await this.afs.collection('users').doc(uid).update({
        name: uname,
        email: email,
        phoneNo: phone
      });
      this.events.publish('user:updateNameOfNewUserSuccess');
      await this.afs.collection('chats').doc(this.getUserId()).update({ name: uname, userPhoneNo: phone });
      this.addUserName(uname);
      this.addUserEmail(email);
      this.addPhoneNo(phone);
      this.storage.set('userName', uname);
    } catch (error) {
      console.dir(error);
    }
  }
  async getUserInfo(route?, role?) {
    let userData;
    let uid = await this.storage.get('uid');
    if (role && role == 'vendor') {
      userData = await this.afs.collection('features').doc('multiVendor').collection('vendors').doc(uid).valueChanges().pipe(first()).toPromise();
    } else {
      userData = await this.userRef.doc(this.getUserId()).valueChanges().pipe(first()).toPromise();
    }
    if (route == 'service') {
      return userData;
    }
    this.events.publish('user:publishUserInfo', userData);
  }

  async addUserImage(base64Image: any) {
    try {
      const imgRef: any = this.fbStorage.ref(`profile/${this.userId}/images/` + new Date().getTime().toString() + '.png');
      await imgRef.putString(base64Image, 'data_url');
      const downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
      //console.log('user image download url');
      //console.log(downloadURL);
      await this.afs.collection('users').doc(this.userId).update({ dP: downloadURL });
      this.events.publish('user:uploadProdilePicSuccess', downloadURL);
      this.storage.set('userPic', downloadURL);

    } catch (err) {
      console.dir(err);
      this.events.publish('user:uploadProdilePicFailure');
    }
  }
  async getUserDetails(uid: string) {
    const usersData: any = await this.afs.doc(`users/${uid}`).valueChanges().pipe(first()).toPromise();
    this.events.publish('user:publishUserDetails', usersData);
  }
  async setActiveVacation(vacationDetails: any) {
    await this.userRef.doc(this.getUserId()).update({ vacations: vacationDetails });
    if (vacationDetails.active === false) {
      this.events.publish('user:vacationsSuccess');
    } else {
      this.events.publish('user:vacationsSuccess');
    }
  }
  async setPaytmNo(paytmNo: string) {
    try {
      await this.afs.collection('config').doc('paytm').set({ paytmNo: paytmNo });
      this.events.publish('user:setPaytmNoSuccess');
    } catch (err) {
      console.dir(err);
    }
  }
  async setPhonePeNo(phonepeNo: string) {
    try {
      await this.afs.collection('config').doc('phonepe').set({ phonepeNo: phonepeNo });
      this.events.publish('user:setPhonePeNoSuccess');
    } catch (err) {
      console.dir(err);
    }
  }
  async setUpiId(upiId: string) {
    try {
      await this.afs.collection('config').doc('upi').set({ upiId: upiId });
      this.events.publish('user:setUpiIdSuccess');
    } catch (err) {
      console.dir(err);
    }
  }
  async getVacationsDetails() {
    const userData: any = await this.userRef.doc(this.getUserId()).valueChanges().pipe(first()).toPromise();
    this.events.publish('user:publishVacationsDetails', userData.vacations, userData.name);
  }

  async setAdditionalInfo(id, info: string, appAccess, groups?) {
    try {
      let addInfo = ''
      if (info) {
        addInfo = info
      }
      if (groups) {
        await this.afs.collection('users').doc(id).update({ additionalInfo: addInfo, accessByAdmin: appAccess, groups });
      } else {
        await this.afs.collection('users').doc(id).update({ additionalInfo: addInfo, accessByAdmin: appAccess });
      }
      this.events.publish('user:setAdditionalInfoSuccess');
    } catch (err) {
      console.dir(err);
    }
  }

  async getAllUsers() {
    try {
      const allUsersRef = this.afs.collection('users');
      const allUsers = allUsersRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      allUsers.subscribe((res) => {
        if (!res.length) {
          this.events.publish('user:noUsers');
        } else {
          this.events.publish('user:publishAllUsersData', res);
        }
      });
    } catch (err) {
      console.dir(err);
    }
  }
  async getUsersForAdminUsers(sortType) {
    try {
      this.usersDataForAdminProducts = [];
      let userData: any;
      if (sortType == 'lowercaseName') {
        userData = this.afs.collection('users', ref => ref
          .limit(200).orderBy(sortType, 'asc')
        )
      }
      else {
        userData = this.afs.collection('users', ref => ref
          .limit(200).orderBy(sortType, 'desc')
        )
      }
      userData.snapshotChanges()
        .subscribe((response: any) => {
          if (!response.length) {
            console.log('No Data Available');
            this.events.publish('user:noUsers');
            return false;
          }
          this.usersDataForAdminProducts = [];
          this.lastResponseForUserProducts = response[response.length - 1].payload.doc;
          for (const user of response) {
            this.usersDataForAdminProducts.push({ id: user.payload.doc.id, data: user.payload.doc.data() });
          }
          this.events.publish('user:publishUsersForAdminUsers', this.usersDataForAdminProducts);
        }, error => {
        });
    } catch (err) {
      console.log(err);
    }
  }
  async getAllUsersForAdminUsers(sortType) {
    try {
      let allUsers = []
      let userData = await this.afs.collection('users', ref => ref.orderBy(sortType, 'desc'))
      let allUsersData: Subscription = userData.get().subscribe((querySnapshot: any) => {
        querySnapshot.forEach((doc) => {
          allUsers.push(doc.data())
        });
        this.events.publish('user:publishAllUsersForAdminUsers', allUsers);
        allUsersData.unsubscribe()
      })
    }
    catch (error) {
      console.log(error);
    };
  }
  async loadMoreUsersForAdminUsers(sortType) {
    try {
      //console.log('in loadMoreProducts service...', this.lastResponseForUserProducts.id);
      this.afs.collection('users', ref => ref
        .limit(200).orderBy(sortType, 'desc')
        .startAfter(this.lastResponseForUserProducts)
      ).snapshotChanges()
        .subscribe((response: any) => {
          if (!response.length) {
            //console.log('No Data Available');
            this.events.publish('user:usersForAdminProductsLimitReached');
            return false;
          }
          this.lastResponseForUserProducts = response[response.length - 1].payload.doc;
          //console.log('response in loadmore', response);
          for (const user of response) {
            this.usersDataForAdminProducts.push({ id: user.payload.doc.id, data: user.payload.doc.data() });
          }
          //console.log('load more users in loadMorepublishUsersForAdminUsers', this.usersDataForAdminProducts);
          this.events.publish('user:publishUsersForAdminUsers', this.usersDataForAdminProducts);
        }, error => {
        });
    } catch (err) {
      console.dir(err);
    }
  }
  async getAllUsersCount() {
    try {
      const users = await this.afs.collection('users').valueChanges().pipe(first()).toPromise();
      this.events.publish('user:publishAllUsersCount', users.length);
    } catch (err) {
      console.dir(err);
    }
  }
  async changeRole(role: string, id: string) {
    let multiVendorRef = await this.afs.collection('features').doc('multiVendor').collection('vendors');
    let managerRef = await this.afs.collection('features').doc('managers').collection('managersList');
    let multiVendor = this.afs.collection('features').doc('multiVendor');
    try {
      if (role === 'deliveryAgent') {
        await this.afs.doc(`users/${id}`).update({ role, subRole: "" });
      } else {
        await this.afs.doc(`users/${id}`).update({ role });
      }
      //console.log(await this.afs.doc(`users/${id}`).get())
      if (role == 'vendor') {
        let userDetails: any = await this.afs.collection('users').doc(id).valueChanges().pipe(first()).toPromise();
        let multiVendorDoc: any = await multiVendor.valueChanges().pipe(first()).toPromise();
        let vendorCount = multiVendorDoc.count ? multiVendorDoc.count : 0;
        await multiVendor.update({ count: vendorCount + 1 });
        let vendorData = {
          active: true,
          name: userDetails.name,
          displayName: userDetails.name,
          address: '',
          approveAllProducts: false,
          phoneNo: userDetails.phoneNo,
          image: {
            url: '',
            mob: '',
            thumb: ''
          },
          isExclusive: false,
          vendorAddress: {
            address: {
              address: '',
              city: '',
              state: '',
              pincode: 0
            }
          },
          categories: [],
          brands: []
        }
        await multiVendorRef.doc(id).set(vendorData);
      }
      if (role == 'manager') {
        console.log(role)
        await managerRef.doc(id).set({ active: true });
      }
      this.events.publish('user:changeRoleSuccess', role);
    } catch (err) {
      console.dir(err);
    }
  }

  async changeSubRole(subRole, uid, sortValue) {
    try {
      await this.afs.doc(`users/${uid}`).update({ subRole: subRole });
      if (subRole === 'retailer') {
        this.events.publish('user:changeSubRoleSuccess', `${this.labelService.labels['USER_SERVICE']['made_as_retailer']}`);
      }
      if (subRole === 'notRetailer') {
        this.events.publish('user:changeSubRoleSuccess', `${this.labelService.labels['USER_SERVICE']['removed_from_retailer']}`);
      }
      if (subRole === 'reseller') {
        this.events.publish('user:changeSubRoleSuccess', `${this.labelService.labels['USER_SERVICE']['made_as_reseller']}`);
      }
      if (subRole === 'notReseller') {
        this.events.publish('user:changeSubRoleSuccess', `${this.labelService.labels['USER_SERVICE']['removed_from_reseller']}`);
      }
      this.events.publish('user:getUsersForAdminUsers', sortValue);
    } catch (error) {
      console.dir(error);
      error['location'] = 'user-service:changeSubRole';
      this.logglyService.log(error);
    }
  }

  async updateUserDetails(userData, role) {
    try {
      let uid = await this.storage.get('uid');
      console.log('uid: ' + uid + 'userdata:', userData);
      await this.userRef.doc(uid).update({ name: userData.name });
      if (role == 'vendor') {
        if (userData.image.url.includes('data:image/jpeg;base64,') || userData.image.url.includes('data:image/jpg;base64,') || userData.image.url.includes('data:image/png;base64,') || userData.image.url.includes('data:image/gif;base64,')) {
          const imgRef: any = this.fbStorage.ref(`vendors/${uid}/image/dp.png`);
          await imgRef.putString(userData.image.url, 'data_url');
          const downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
          userData.image.url = downloadURL;
        }
        await this.afs.collection('features').doc('multiVendor').collection('vendors').doc(uid).update(userData);
      }
      if (role === 'user') {
        await this.afs.collection('chats').doc(uid).update({ name: userData.name });
      }
      return true;
    } catch (err) {
      return false;
      //console.log(err);
    }
  }

  async getOrdersWithId(uid: string) {
    //console.log('id of user', uid);
    const ordersRef = this.afs.collection('users').doc(uid).collection('orders');
    const ordersData = ordersRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).pipe(first());
    ordersData.subscribe((orders) => {
      //console.log('orders:::', orders);
      if (!orders.length) {
        return false;
      } else {
        this.orders = orders;
      }
    });
    return this.orders;
  }
  async completeOrder(uid: string, oid: string) {
    //console.log('oid and uid', oid, uid);
    try {
      await this.afs.doc(`users/${uid}`).collection('orders').doc(oid).update({ status: 'Completed' });
      const msgRef = this.afs.collection('chats').doc(uid).collection('messages', ref => ref.where('orderId', '==', oid));
      const msg = msgRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first());
      msg.subscribe(async (res: any) => {
        //console.log('my msg', res);
        await this.afs.collection('chats').doc(uid).collection('messages').doc(res[0].id).update({ status: 'Completed' });
      });
      this.events.publish('user:completeOrderSuccess');
    } catch (err) {
      console.dir(err);
    }
  }
  async cancelOrder(oid: string) {
    try {
      await this.userRef.doc(this.getUserId()).collection('orders').doc(oid).update({ status: 'Cancelled' });
      const msgRef = this.afs.collection('chats').doc(this.getUserId()).collection('messages', ref => ref.where('orderId', '==', oid));
      const msg = msgRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first());
      msg.subscribe(async (res: any) => {
        //console.log('my msg', res);
        await this.afs.collection('chats').doc(this.getUserId()).collection('messages').doc(res[0].id).update({ status: 'Cancelled' });
      });
      this.events.publish('user:cancelOrderSuccess');
    } catch (err) {
      console.dir(err);
    }
  }
  async deletePrdouctFromChatAndOrders(orderId: string, msgId: string, productId: string) {
    //console.log('productId', productId);
    //console.log('orderId', orderId);
    //console.log('msgId', msgId);
    const orderData: any = await this.afs.collection('users').doc(this.getUserId()).collection('orders').doc(orderId).valueChanges().pipe(first()).toPromise();
    const msgData: any = await this.afs.collection('chats').doc(this.getUserId()).collection('messages').doc(msgId).valueChanges().pipe(first()).toPromise();
    //console.log('order Data for delete', orderData);
    //console.log('msg Data for delete', msgData);
    for (let i = 0; i < orderData.products.length; i++) {
      if (orderData.products[i].productId === productId) {
        orderData.products.splice(i, 1);
      }
      if (msgData.products[i].productId === productId) {
        msgData.products.splice(i, 1);
      }
    }
    if (orderData.products.length === 0) {
      await this.afs.collection('users').doc(this.getUserId()).collection('orders').doc(orderId).delete();
    } else {
      await this.afs.collection('users').doc(this.getUserId()).collection('orders').doc(orderId).update({ products: orderData.products });
    }
    if (msgData.products.length === 0) {
      await this.afs.collection('chats').doc(this.getUserId()).collection('messages').doc(msgId).delete();
    } else {
      await this.afs.collection('chats').doc(this.getUserId()).collection('messages').doc(msgId).update({ products: msgData.products });
    }
    this.events.publish('user:deleteProductSuccesss');

  }
  async saveNewAddress(addressInfo: any, type: string) {
    try {
      const addressRef = await this.afs.collection('users').doc(this.getUserId()).collection('addresses').add(addressInfo);
      if (addressInfo.defaultAddress === true && type !== 'billing') {
        this.afs.collection('users').doc(this.getUserId()).update({ defaultAddress: addressInfo });
        this.storage.set('userDefaultAddress', addressInfo);
        const allAddressData = await this.afs.collection('users').doc(this.getUserId()).collection('addresses').snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).pipe(first()).toPromise();
        for (let index = 0; index < allAddressData.length; index++) {
          if (allAddressData[index].id !== addressRef.id) {
            this.afs.collection('users').doc(this.getUserId()).collection('addresses').doc(allAddressData[index].id).update({ defaultAddress: false })
          }
        }
      }
      if (type === 'billing') {
        this.storage.set('userBillingAddress', addressInfo);
      }
      this.events.publish('user:newAddressSaved');

    } catch (err) {
      console.dir(err);
    }
  }
  async editSavedAddress(addressInfo: any, type: string) {
    //console.log('type', type);
    try {
      await this.afs.collection('users').doc(this.getUserId()).collection('addresses').doc(addressInfo.id).update(addressInfo);
      if (addressInfo.defaultAddress === true && type !== 'billing') {
        this.afs.collection('users').doc(this.getUserId()).update({ defaultAddress: addressInfo });
        this.storage.set('userDefaultAddress', addressInfo);
        const allAddressData = await this.afs.collection('users').doc(this.getUserId()).collection('addresses').snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).pipe(first()).toPromise();
        for (let index = 0; index < allAddressData.length; index++) {
          if (allAddressData[index].id !== addressInfo.id) {
            this.afs.collection('users').doc(this.getUserId()).collection('addresses').doc(allAddressData[index].id).update({ defaultAddress: false })
          }
        }
      }
      if (type === 'billing') {
        this.storage.set('userBillingAddress', addressInfo);
      }
      this.events.publish('user:addressEditSuccess');
    } catch (err) {
      console.dir(err);
    }
  }
  async deleteAddress(address: any) {
    try {
      await this.afs.collection('users').doc(this.getUserId()).collection('addresses').doc(address.id).delete();
      if (address.defaultAddress === true) {
        const allAddressData: any = await this.afs.collection('users').doc(this.getUserId()).collection('addresses', ref => ref.orderBy('createdAt', 'desc')).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).pipe(first()).toPromise();
        if (allAddressData.length) {
          const addressInfo: any = {
            name: allAddressData[0].name,
            address: allAddressData[0].address,
            city: allAddressData[0].city,
            state: allAddressData[0].state,
            pincode: allAddressData[0].pincode,
            phoneNo: allAddressData[0].phoneNo,
            defaultAddress: true
          }
          this.afs.collection('users').doc(this.getUserId()).update({ defaultAddress: addressInfo });
          this.storage.set('userDefaultAddress', addressInfo);
          this.afs.collection('users').doc(this.getUserId()).collection('addresses').doc(allAddressData[0].id).update({ defaultAddress: true })
        } else {
          this.storage.set('userDefaultAddress', null);
          this.afs.collection('users').doc(this.getUserId()).update({ defaultAddress: null });
        }
      }
      this.events.publish('user:deleteAddressSuccess');
    } catch (err) {
      console.dir(err);
    }
  }
  async getAllSavedAddresses() {
    try {
      const addressRef = this.afs.collection('users').doc(this.getUserId()).collection('addresses', ref => ref.orderBy('createdAt', 'desc'));
      const addressSnap = addressRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      addressSnap.subscribe((result) => {
        this.events.publish('user:publishAllSavedAddresses', result);
      });
    } catch (err) {
      console.dir(err);
    }
  }
  async addProductToCart(product: any, temp?) {
    try {
      await this.afs.collection('users').doc(this.getUserId()).collection('cart').add(product);
      this.events.publish('user:getAllProductIdsOfCart');
      this.events.publish('user:productAddedToCart');
      this.events.publish('user:getLengthOfCartProducts', this.getUserId());
      if (temp) {
        this.events.publish('best-sellers:getBestSellersForShopCategory');
      }
    } catch (error) {
      console.dir(error);
    }
  }
  async addProductToCartForPriceModal(product: any, index: number) {
    try {
      const cartRef = await this.afs.collection('users').doc(this.getUserId()).collection('cart').add(product);
      //console.log('cartRef id in add product', cartRef.id, index);
      this.events.publish('user:getAllProductIdsOfCart');
      this.events.publish('user:productAddedToCartForPriceModal', cartRef.id, index);
      this.events.publish('user:getLengthOfCartProducts', this.getUserId());

    } catch (error) {
      console.dir(error);
    }
  }
  async getUserCartProducts() {
    try {
      const uid = await this.getStorageUid();
      if (uid) {
        const cartRef = this.afs.collection('users').doc(uid).collection('cart');
        const cartSnap = await cartRef.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
        cartSnap.subscribe((cartData) => {
          if (!cartData.length) {
            this.events.publish('user:noProductsInCart');
          } else {
            this.events.publish('user:publishUserCartProducts', cartData);
          }
        });
      }
    } catch (err) {
      console.dir(err);
    }
  }
  async getUserCartProductsForPriceModal() {
    try {
      const cartRef = this.afs.collection('users').doc(this.getUserId()).collection('cart');
      const cartSnap = await cartRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      cartSnap.subscribe((cartData) => {
        if (!cartData.length) {
          this.events.publish('user:noProductsInCartForPriceModal');
        } else {
          this.events.publish('user:publishUserCartProductsForPriceModal', cartData);
        }
      })
    } catch (err) {
      console.dir(err);
    }
  }
  async getLengthOfCartProducts(uid: string) {
    try {
      if (uid) {
        const cartLength = await this.afs.collection('users').doc(uid).collection('cart').valueChanges().pipe(first()).toPromise();
        this.events.publish('user:publishLengthOfCartProducts', cartLength.length);
      }
    } catch (err) {
      console.dir(err);
    }
  }
  async updateQuantityOfCartProduct(quantity, id, temp?) {
    try {
      await this.afs.collection('users').doc(this.getUserId()).collection('cart').doc(id).update({ quantity: quantity });
      this.events.publish('user:updateQuantityOfCartProductSuccess');
      this.events.publish('user:getLengthOfCartProducts', this.getUserId());
      if (temp) {
        this.events.publish('best-sellers:getBestSellersForShopCategory');
        this.events.publish('user:getUpdatedCartProducts');
      }
    } catch (error) {
      console.dir(error);
    }
  }
  async updateQuantityOfCartProductForPriceModal(quantity, id, temp?) {
    try {
      await this.afs.collection('users').doc(this.getUserId()).collection('cart').doc(id).update({ quantity: quantity });
      this.events.publish('user:updateQuantityOfCartProductSuccessForPriceModal');
      this.events.publish('user:getLengthOfCartProducts', this.getUserId());
      if (temp) {
        this.events.publish('best-sellers:getBestSellersForShopCategory');
      }
    } catch (error) {
      console.dir(error);
    }
  }
  async removeProductFromCart(id: string, temp?) {
    try {
      await this.afs.collection('users').doc(this.getUserId()).collection('cart').doc(id).delete();
      this.events.publish('user:productRemovedFromCart');
      this.events.publish('user:getAllProductIdsOfCart');
      this.events.publish('user:getLengthOfCartProducts', this.getUserId());
      if (temp) {
        //console.log('updating bestselers...');
        this.events.publish('best-sellers:getBestSellersForShopCategory');
        this.events.publish('user:getUpdatedCartProducts');
      }
    } catch (error) {
      console.dir(error);
    }
  }
  async removeProductFromCartForPriceModal(id: string, temp?) {
    try {
      await this.afs.collection('users').doc(this.getUserId()).collection('cart').doc(id).delete();
      this.events.publish('user:productRemovedFromCartForPriceModal');
      this.events.publish('user:getAllProductIdsOfCart');
      this.events.publish('user:getLengthOfCartProducts', this.getUserId());
      if (temp) {
        //console.log('updating bestselerssss.....');
        this.events.publish('best-sellers:getBestSellersForShopCategory');
      }
    } catch (error) {
      console.dir(error);
    }
  }
  async placeOrder(products, listOfCommentImages, address, paymentObj) {
    try {
      // const orderCommentMediaImage = {
      //   url: null,
      //   size: null,
      //   uploadedAt: null,
      //   productId: null
      // };
      var listOfProducts = JSON.parse(JSON.stringify(products));
      for (let i = 0; i < listOfProducts.length; i++) {
        listOfProducts[i].commentImgs = [];
      }

      //console.log('products after removing images', listOfProducts);
      const orderRef = await this.afs.collection('orders').add({
        orderId: null,
        products: listOfProducts,
        status: 'Pending',
        createdAt: new Date(),
        address: address,
        payment: {
          completed: false,
          mode: null,
          details: null
        },
        userId: this.getUserId(),
        msgId: this.afs.collection('chats').doc(this.getUserId()).collection('messages').ref.doc().id,
        userName: this.getUserName(),
        discount: 0,
        delivery: paymentObj.delivery,
        couponDiscount: paymentObj.couponDiscount,
        productsPrice: paymentObj.productsPrice,
        defaultGst: paymentObj.defaultGst,
        totalAmountToPaid: paymentObj.totalAmountToPaid,
        couponId: paymentObj.couponId,
        couponName: paymentObj.couponName,
        scheduledDate: paymentObj.scheduledDate,
        scheduledTime: paymentObj.scheduledTime,
        totalMrp: paymentObj.totalMrp,
        discountOnMrp: paymentObj.discountOnMrp,
        deliveryGstObj: paymentObj.deliveryGstObj,
        customerGstNo: paymentObj.customerGstNo,
        billingAddress: paymentObj.billingAddress,
        storePickupObj: paymentObj.storePickupObj ? paymentObj.storePickupObj : {}
      });
      if (address.lat) {
        await this.afs.collection('orders').doc(orderRef.id).update({
          deliveryLatLng: {
            lat: address.lat,
            lng: address.lng
          }
        });
      }
      // if(listOfCommentImages.length !== 0) {
      //   for(let i = 0; i < listOfCommentImages.length; i++) {
      //     orderCommentMediaImage.url = '';
      //     orderCommentMediaImage.size = listOfCommentImages[i].size;
      //     orderCommentMediaImage.uploadedAt = new Date();
      //     orderCommentMediaImage.productId = listOfCommentImages[i].productId;
      //     const mediaDocRef = await this.mediaRef.doc('images').collection('ordersCommentImgs').add(orderCommentMediaImage);
      //     const imgRef: any = this.fbStorage.ref(`ordersCommentImgs/${orderRef.id}/images/${listOfCommentImages[i].productId}/` + mediaDocRef.id + '.png');
      //     await imgRef.putString(listOfCommentImages[i].url, 'data_url');
      //     const downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
      //     //console.log('download url', downloadURL);
      //     this.mediaRef.doc('images').collection('ordersCommentImgs').doc(mediaDocRef.id).update({url: downloadURL});
      //   }
      // }
      this.storage.get('buyNowOrder').then(async (val) => {
        if (!val) {
          const cartRef = this.afs.collection('users').doc(this.getUserId()).collection('cart');
          const cartData: any = await cartRef.snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          ).pipe(first()).toPromise();
          for (let i = 0; i < cartData.length; i++) {
            await this.afs.collection('users').doc(this.getUserId()).collection('cart').doc(cartData[i].id).delete();
          }
          this.events.publish('user:getAllProductIdsOfCart');
          this.events.publish('user:orderSuccessfullyPlaced');
        } else {
          this.events.publish('user:getAllProductIdsOfCart');
          this.events.publish('user:orderSuccessfullyPlaced');
        }
      });

    } catch (error) {
      console.dir(error);
    }
  }
  async autoConfirmPlaceOrder(products, listOfCommentImages, address, paymentObj) {
    try {
      let listOfProducts = JSON.parse(JSON.stringify(products));
      for (let i = 0; i < listOfProducts.length; i++) {
        listOfProducts[i].commentImgs = [];
      }
      const orderObj = {
        orderId: null,
        products: listOfProducts,
        status: 'Confirmed',
        address: address,
        payment: {
          completed: false,
          mode: null,
          details: null
        },
        userId: this.getUserId(),
        msgId: this.afs.collection('chats').doc(this.getUserId()).collection('messages').ref.doc().id,
        userName: this.getUserName(),
        discount: 0,
        delivery: paymentObj.delivery,
        couponDiscount: paymentObj.couponDiscount,
        productsPrice: paymentObj.productsPrice,
        defaultGst: paymentObj.defaultGst,
        totalAmountToPaid: paymentObj.totalAmountToPaid,
        couponId: paymentObj.couponId,
        couponName: paymentObj.couponName,
        scheduledDate: paymentObj.scheduledDate,
        scheduledTime: paymentObj.scheduledTime,
        totalMrp: paymentObj.totalMrp,
        discountOnMrp: paymentObj.discountOnMrp,
        deliveryGstObj: paymentObj.deliveryGstObj,
        customerGstNo: paymentObj.customerGstNo,
        billingAddress: paymentObj.billingAddress,
        storePickupObj: paymentObj.storePickupObj ? paymentObj.storePickupObj : {}
      };
      if (address.lat) {
        orderObj['deliveryLatLng'] = {
          lat: address.lat,
          lng: address.lng
        };
      }
      const navigationExtras: NavigationExtras = {
        state: {
          orderData: orderObj
        }
      };
      this.router.navigate(['auto-confirm-payment'], navigationExtras);

    } catch (error) {
      console.dir(error);
    }
  }
  async getAllProductIdsOfCart() {
    let listOfProductIds = [];
    const cartData: any = await this.afs.collection('users').doc(this.getUserId()).collection('cart').valueChanges().pipe(first()).toPromise();
    for (let index = 0; index < cartData.length; index++) {
      listOfProductIds.push(cartData[index].productId);
    }
    //console.log('listOfProductIds in cart', listOfProductIds);
    this.storage.set('listOfProductIdsInCart', listOfProductIds);
  }
  async getOrderDetailsWithOrderId(orderId: number) {
    try {
      this.storage.get('userRole').then(async (role) => {
        if (role === 'user') {
          const orderData: any = await this.afs.collection('orders', ref => ref
            .where('orderId', '==', orderId)
            .where('userId', '==', this.getUserId()))
            .snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
          this.events.publish('user:publishOrderDetailsWithOrderId', orderData);
        } else if (role == 'vendor') {
          const orderData: any = await this.afs.collection('orders', ref => ref
            .where('orderId', '==', orderId).where('vendorId', '==', this.getUserId()))
            .snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
          this.events.publish('user:publishOrderDetailsWithOrderId', orderData);
        }
        else {
          const orderData: any = await this.afs.collection('orders', ref => ref
            .where('orderId', '==', orderId))
            .snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
          this.events.publish('user:publishOrderDetailsWithOrderId', orderData);
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }
  async getAllOrdersOfUser(uid?) {
    try {
      let userId = '';
      if (uid) {
        userId = uid;
      } else {
        userId = this.getUserId();
      }
      const ordersRef = this.afs.collection('orders', ref => ref
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc'));
      const ordersSnap = ordersRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      ordersSnap.subscribe((orders) => {
        if (!orders.length) {
          this.events.publish('user:noOrderHistoryOfUser');
        } else {
          this.events.publish('user:publishAllOrdersOfUser', orders);
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }
  async getPendingOrdersForAdmin(startDate, endDate, filters?) {
    try {
      let ordersRef: any;
      ordersRef = await this.makeOrdersRef('status', 'Confirmed', startDate, endDate, filters);
      const ordersSnap = ordersRef.snapshotChanges();
      ordersSnap.subscribe((orders) => {
        this.pendingOrdersForAdmin = [];
        if (!orders.length) {
          this.events.publish('user:noPendingOrdersForAdmin');
        } else {
          this.lastResponseOfPendingOrdersForAdmin = orders[orders.length - 1].payload.doc;
          for (let order of orders) {
            this.pendingOrdersForAdmin.push({ id: order.payload.doc.id, ...order.payload.doc.data() as {} })
          }
          console.log('confirmed orders:', this.pendingOrdersForAdmin);
          this.events.publish('user:publishPendingOrdersForAdmin', this.pendingOrdersForAdmin);
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }
  async getAllPendingOrdersForAdmin(date?) {
    return new Promise(async (resolve, reject) => {
      try {
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        if (userRole == 'vendor') {
          this.allPendingOrdersForAdmin = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc')
            .where('status', 'in', ['Confirmed']).where('vendorId', '==', loginId)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
        }
        else {
          let allOrders = [];
          let ordersData;
          if (date && date.start) {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Confirmed']).startAt(date.start).endAt(date.end));
          } else {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Confirmed']));
          }
          let allOrdersref: Subscription = ordersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc) => {
              allOrders.push({ id: doc.id, ...doc.data() })
            });
            resolve(allOrders)
            allOrdersref.unsubscribe()
          })
          // this.allPendingOrdersForAdmin = this.afs.collection('orders', ref => ref
          //   .orderBy('createdAt', 'desc')
          //   .where('status', 'in', ['Confirmed'])).snapshotChanges().pipe(
          //     map(actions => actions.map(a => {
          //       const data = a.payload.doc.data();
          //       const id = a.payload.doc.id;
          //       return { id, ...data };
          //     }))
          //   ).pipe(first()).toPromise();
        }
        //resolve(this.allPendingOrdersForAdmin);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async loadMorePendingOrdersForAdmin(startDate, endDate, filters?) {
    try {
      let ordersRef: any;
      ordersRef = await this.makeOrdersRef('status', 'Confirmed', startDate, endDate, filters, this.lastResponseOfPendingOrdersForAdmin);
      const ordersSnap = ordersRef.snapshotChanges();
      ordersSnap.subscribe((orders) => {
        if (!orders.length) {
          this.events.publish('user:noMorePendingOrdersForAdmin');
          return false;
        }
        this.lastResponseOfPendingOrdersForAdmin = orders[orders.length - 1].payload.doc;
        for (let order of orders) {
          this.pendingOrdersForAdmin.push({ id: order.payload.doc.id, ...order.payload.doc.data() as {} })
        }
        this.events.publish('user:publishPendingOrdersForAdmin', this.pendingOrdersForAdmin);
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async getDispatchedOrdersForAdmin(startDate, endDate, filters?) {
    try {
      let ordersRef: any;
      ordersRef = await this.makeOrdersRef('status', 'Dispatched', startDate, endDate, filters);
      const ordersSnap = ordersRef.snapshotChanges();
      ordersSnap.subscribe((orders) => {
        this.dispatchedOrdersForAdmin = [];
        if (!orders.length) {
          this.events.publish('user:noDispatchedOrdersForAdmin');
        } else {
          this.lastResponseOfDispatchedOrdersForAdmin = orders[orders.length - 1].payload.doc;
          for (let order of orders) {
            this.dispatchedOrdersForAdmin.push({ id: order.payload.doc.id, ...order.payload.doc.data() as {} })
          }
          this.events.publish('user:publishDispatchedOrdersForAdmin', this.dispatchedOrdersForAdmin);
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async getAllDispatchedOrdersForAdmin(date?) {
    return new Promise(async (resolve, reject) => {
      try {
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        if (userRole == 'vendor') {
          this.allDispatchedOrdersForAdmin = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc')
            .where('status', 'in', ['Dispatched']).where('vendorId', '==', loginId)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
        }
        else {
          let allOrders = [];
          let ordersData;
          if (date && date.start) {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Dispatched']).startAt(date.start).endAt(date.end));
          } else {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Dispatched']));
          }
          let allOrdersref: Subscription = ordersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc) => {
              allOrders.push({ id: doc.id, ...doc.data() })
            });
            resolve(allOrders)
            allOrdersref.unsubscribe()
          })
          // this.allDispatchedOrdersForAdmin = this.afs.collection('orders', ref => ref
          //   .orderBy('createdAt', 'desc')
          //   .where('status', 'in', ['Dispatched'])).snapshotChanges().pipe(
          //     map(actions => actions.map(a => {
          //       const data = a.payload.doc.data();
          //       const id = a.payload.doc.id;
          //       return { id, ...data };
          //     }))
          //   ).pipe(first()).toPromise();
        }
        //resolve(this.allDispatchedOrdersForAdmin);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async loadMoreDispatchedOrdersForAdmin(startDate, endDate, filters?) {
    try {
      let ordersRef: any;
      ordersRef = await this.makeOrdersRef('status', 'Dispatched', startDate, endDate, filters, this.lastResponseOfDispatchedOrdersForAdmin);
      const ordersSnap = ordersRef.snapshotChanges();
      ordersSnap.subscribe((orders) => {
        if (!orders.length) {
          this.events.publish('user:noMoreDispatchedOrdersForAdmin');
          return false;
        }
        this.lastResponseOfDispatchedOrdersForAdmin = orders[orders.length - 1].payload.doc;
        for (let order of orders) {
          this.dispatchedOrdersForAdmin.push({ id: order.payload.doc.id, ...order.payload.doc.data() as {} })
        }
        this.events.publish('user:publishDispatchedOrdersForAdmin', this.dispatchedOrdersForAdmin);
      });
    } catch (error) {
      console.dir(error);
    }
  }
  async getCompletedOrdersForAdmin(startDate, endDate, filters?) {
    try {
      let ordersRef: any;
      ordersRef = await this.makeOrdersRef('status', 'Delivered', startDate, endDate, filters);
      const ordersSnap = ordersRef.snapshotChanges();
      ordersSnap.subscribe((orders) => {
        this.completedOrdersForAdmin = [];
        if (!orders.length) {
          this.events.publish('user:noCompletedOrdersForAdmin');
        } else {
          this.lastResponseOfCompletedOrdersForAdmin = orders[orders.length - 1].payload.doc;
          for (let order of orders) {
            this.completedOrdersForAdmin.push({ id: order.payload.doc.id, ...order.payload.doc.data() as {} })
          }
          this.events.publish('user:publishCompletedOrdersForAdmin', this.completedOrdersForAdmin);
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }
  async getAllCompletedOrdersForAdmin(date?) {
    return new Promise(async (resolve, reject) => {
      try {
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        if (userRole == 'vendor') {
          this.allCompletedOrdersForAdmin = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc')
            .where('status', 'in', ['Delivered']).where('vendorId', '==', loginId)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
        }
        else {
          let allOrders = [];
          let ordersData;
          if (date && date.start) {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Delivered']).startAt(date.start).endAt(date.end));
          } else {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Delivered']));
          }
          let allOrdersref: Subscription = ordersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc) => {
              allOrders.push({ id: doc.id, ...doc.data() })
            });
            resolve(allOrders)
            allOrdersref.unsubscribe()
          })
          // this.allCompletedOrdersForAdmin = this.afs.collection('orders', ref => ref
          //   .orderBy('createdAt', 'desc')
          //   .where('status', 'in', ['Delivered'])).snapshotChanges().pipe(
          //     map(actions => actions.map(a => {
          //       const data = a.payload.doc.data();
          //       const id = a.payload.doc.id;
          //       return { id, ...data };
          //     }))
          //   ).pipe(first()).toPromise();
        }
        //resolve(this.allCompletedOrdersForAdmin);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getVendorNameCSV(id: any) {
    let vendorName: any = ''
    try {
      // const usersRef: any = this.afs.collection('users').doc(id).get().subscribe(users => {
      // if (users.data().name) {
      //   console.log('users : ', users.data().name);
      //   vendorName = users.data().name
      //   return vendorName
      // } else {
      //   return ''
      // }
      // })
      const usersRef: any = await this.afs.collection('users').doc(id).valueChanges().pipe(first()).toPromise()
      // console.log('usersRef: ', usersRef.name);
      return usersRef.name

    } catch (error) {
      return ''
    }
  }

  async loadMoreCompletedOrdersForAdmin(startDate, endDate, filters?) {
    try {
      let ordersRef: any;
      ordersRef = await this.makeOrdersRef('status', 'Delivered', startDate, endDate, filters, this.lastResponseOfCompletedOrdersForAdmin);
      const ordersSnap = ordersRef.snapshotChanges();
      ordersSnap.subscribe((orders) => {
        if (!orders.length) {
          this.events.publish('user:noMoreCompletedOrdersForAdmin');
          return false;
        }
        this.lastResponseOfCompletedOrdersForAdmin = orders[orders.length - 1].payload.doc;
        for (let order of orders) {
          this.completedOrdersForAdmin.push({ id: order.payload.doc.id, ...order.payload.doc.data() as {} })
        }
        this.events.publish('user:publishCompletedOrdersForAdmin', this.completedOrdersForAdmin);
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async getProductsNeedToDeliverForAdmin() {
    return new Promise<any[]>(async (resolve) => {
      this.productsNeedToDeliverForAdmin = [];
      let ordersRef: any
      let loginId = await this.storage.get('uid')
      let userRole = await this.storage.get('userRole');
      let orders = [];
      if (userRole == 'vendor') {
        ordersRef = this.afs.collection('orders', ref => ref
          .orderBy('createdAt', 'desc')
          .where('status', 'in', ['Pending', 'Confirmed']).where('vendorId', '==', loginId)).get().subscribe(docs => {
            docs.forEach(doc => {
              orders.push({ id: doc.id, ...doc.data() });
            });
            if (!orders.length) {
              resolve([]);
            } else {
              for (let order of orders) {
                if ((order.payment.completed || order.payment.mode === 'cash' || order.status === 'Confirmed') && ((order.subStatus && order.subStatus.isArchive == false) || !order.subStatus)) {
                  this.productsNeedToDeliverForAdmin.push(order);
                }
              }
              resolve(this.productsNeedToDeliverForAdmin)
            }
          });
      }
      else {
        ordersRef = this.afs.collection('orders', ref => ref
          .orderBy('createdAt', 'desc')
          .where('status', 'in', ['Pending', 'Confirmed'])).get().subscribe(docs => {
            docs.forEach(doc => {
              orders.push({ id: doc.id, ...doc.data() });
            });
            if (!orders.length) {
              resolve([]);
            } else {
              for (let order of orders) {
                if ((order.payment.completed || order.payment.mode === 'cash' || order.status === 'Confirmed') && ((order.subStatus && order.subStatus.isArchive == false) || !order.subStatus)) {
                  this.productsNeedToDeliverForAdmin.push(order);
                }
              }
              resolve(this.productsNeedToDeliverForAdmin)
            }
          });

      }
    })
  }
  loadMoreProductsNeedToDeliverForAdmin() {
    try {
      const ordersRef = this.afs.collection('orders', ref => ref
        .orderBy('createdAt', 'desc')
        .where('status', 'in', ['Pending', 'Confirmed'])
        .limit(this.configService.environment.scrollLimit)
        .startAfter(this.lastResponseOfProductsNeedToDeliverForAdmin));
      const ordersSnap = ordersRef.snapshotChanges();
      ordersSnap.subscribe((orders) => {
        if (!orders.length) {
          this.events.publish('user:noMoreProductsNeedToDeliverForAdmin');
          return false;
        }
        this.lastResponseOfProductsNeedToDeliverForAdmin = orders[orders.length - 1].payload.doc;
        for (let order of orders) {
          this.productsNeedToDeliverForAdmin.push({ id: order.payload.doc.id, ...order.payload.doc.data() as {} })
          this.events.publish('user:publishProductsNeedToDeliverForAdmin', this.productsNeedToDeliverForAdmin);
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async rejectOrderByAdmin(orderId) {
    try {
      const orderRef = this.afs.collection('orders', ref => ref.where('orderId', '==', orderId));
      const orderData: any = await orderRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      await this.afs.collection('orders').doc(orderData[0].id).update({ status: 'Rejected' });
      const rejectChatMsg = {
        author: 'admin',
        createdAt: new Date(),
        isRead: true,
        orderId: orderData[0].orderId,
        published: true,
        status: 'Rejected',
        type: 'order'
      }
      this.events.publish('chat:sendMsg', rejectChatMsg, orderData[0].userId);
      this.events.publish('user:rejectedOrderSuccessfully');
    } catch (error) {
      console.dir(error);
    }
  }
  async confirmOrderByAdmin(orderDetails, orderId) {
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
        status: 'Confirmed',
        products: orderDetails.products,
        productsPrice: orderDetails.productsPrice,
        totalAmountToPaid: orderDetails.totalAmountToPaid
      });
      const confrimChatMsg = {
        author: 'admin',
        createdAt: new Date(),
        isRead: true,
        orderId: orderData[0].orderId,
        published: true,
        status: 'Confirmed',
        type: 'order'
      }
      this.events.publish('chat:sendMsg', confrimChatMsg, orderData[0].userId);
      this.events.publish('user:confirmedOrderSuccessfully');
    } catch (error) {
      console.dir(error);
    }
  }
  async cancelOrderByAdmin(orderId: number, cancelReason: string) {
    try {
      const orderRef = this.afs.collection('orders', ref => ref.where('orderId', '==', orderId));
      const orderData: any = await orderRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();

      let role = await this.storage.get('userRole');
      role = role === 'admin' ? 'Store' : role;
      const updateObj = {
        cancelData: {
          reason: cancelReason,
          by: `${this.getUserName()} (${role})`
        },
        status: 'Cancelled'
      }

      await this.afs.collection('orders').doc(orderData[0].id).update(updateObj);
      const cancelChatMsg = {
        author: 'admin',
        createdAt: new Date(),
        isRead: true,
        orderId: orderData[0].orderId,
        published: true,
        status: 'Cancelled',
        type: 'order'
      }
      this.events.publish('chat:sendMsg', cancelChatMsg, orderData[0].userId);
      this.events.publish('user:cancelledOrderSuccessfully');
    } catch (error) {
      console.dir(error);
    }
  }
  async dispatchOrderByAdmin(orderId: any, message: string) {
    try {
      const orderRef = this.afs.collection('orders', ref => ref.where('orderId', '==', orderId));
      const orderData: any = await orderRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      await this.afs.collection('orders').doc(orderData[0].id).update({ status: 'Dispatched', message: message });
      const dispatchChatMsg = {
        author: 'admin',
        createdAt: new Date(),
        isRead: true,
        orderId: orderData[0].orderId,
        published: true,
        status: 'Dispatched',
        type: 'order'
      };
      this.events.publish('chat:sendMsg', dispatchChatMsg, orderData[0].userId);
      this.events.publish('user:dispatchedOrderSuccessfully');
    } catch (error) {
      console.dir(error);
    }
  }
  async deliverOrderByAdmin(orderId) {
    try {
      const orderRef = this.afs.collection('orders', ref => ref.where('orderId', '==', orderId));
      const orderData: any = await orderRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      await this.afs.collection('orders').doc(orderData[0].id).update({ status: 'Delivered' });
      const deliverChatMsg = {
        author: 'admin',
        createdAt: new Date(),
        isRead: true,
        orderId: orderData[0].orderId,
        published: true,
        status: 'Delivered',
        type: 'order'
      }
      this.events.publish('chat:sendMsg', deliverChatMsg, orderData[0].userId);
      this.events.publish('user:deliveredOrderSuccessfully');
    } catch (error) {
      console.dir(error);
    }
  }

  async getRequiredDataForOrders(order: any) {
    const {
      orderId,
      userId,
      id,
      ...requiredData
    } = order;
    return {
      orderId,
      userId,
      id,
    };
  }

  async returnOrderByAdmin(orderId, refundAmount: number, order: any) {
    try {
      order = await this.getRequiredDataForOrders(order);
      const returnOrder = firebase.functions().httpsCallable('orders-returnOrderByAdmin');
      returnOrder({ order, refundAmount }).then(res => {

        if (res && res.data && res.data.status) {
          const returnChatMsg = {
            author: 'admin',
            createdAt: new Date(),
            isRead: true,
            orderId: orderId,
            published: true,
            status: 'Returned',
            type: 'order'
          }

          this.events.publish('chat:sendMsg', returnChatMsg, order.userId);

          this.events.publish('user:returnedOrderSuccessfully');
        } else {
          this.events.publish('user:returnedOrderFailure');
        }
      }).catch(err => {
        console.log("returnOrder", err);
        this.events.publish('user:returnedOrderFailure');
      });
    } catch (error) {
      console.dir("returnOrderByAdmin", error);
      error['location'] = 'user-service:returnOrderByAdmin';
      this.logglyService.log(error);
      this.events.publish('user:returnedOrderFailure');
    }
  }
  async cancelOrderByUser(orderId) {
    try {
      const orderRef = this.afs.collection('orders', ref => ref.where('orderId', '==', orderId));
      const orderData: any = await orderRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      await this.afs.collection('orders').doc(orderData[0].id).update({ status: 'Cancelled' });
      const cancelChatMsg = {
        author: 'user',
        createdAt: new Date(),
        isRead: true,
        orderId: orderData[0].orderId,
        published: true,
        status: 'Cancelled',
        type: 'order'
      }
      this.events.publish('chat:sendMsg', cancelChatMsg, orderData[0].userId);
      this.events.publish('user:cancelledOrderByUserSuccessfully');
    } catch (error) {
      console.dir(error);
    }
  }
  async setPaymentModeOfOrderByUser(paymentMode, orderId) {
    try {
      const orderRef = this.afs.collection('orders', ref => ref.where('orderId', '==', orderId));
      const orderData: any = await orderRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      await this.afs.collection('orders').doc(orderData[0].id).update({ payment: { mode: paymentMode } });
      const paymentChatMsg = {
        author: 'user',
        createdAt: new Date(),
        isRead: true,
        orderId: orderData[0].orderId,
        published: true,
        status: 'PaymentMsg',
        type: 'order',
        paymentMode: paymentMode
      }
      this.events.publish('chat:sendMsg', paymentChatMsg, orderData[0].userId);
      this.events.publish('user:setPaymentModeOfOrderByUserSuccessfully');
    } catch (error) {
      console.dir(error);
    }
  }
  async blockUser(uid: string) {
    try {
      await this.userRef.doc(uid).update({ active: false });
      await this.afs.collection('block').doc(uid).set({ deleteData: false });
      this.events.publish('user:userBlockedSuccessfully');
    } catch (error) {
      console.dir(error.message);
    }
  }
  async unblockUser(uid: string) {
    try {
      await this.userRef.doc(uid).update({ active: true });
      await this.afs.collection('block').doc(uid).delete();
      this.events.publish('user:userUnblockedSuccessfully');
    } catch (error) {
      console.dir(error.message);
    }
  }
  async blockAndDeleteData(uid: string) {
    try {
      await this.afs.collection('block').doc(uid).set({ deleteData: true });
      this.events.publish('user:userBlockedAndDeleteDataSuccessfully');
    } catch (error) {
      console.dir(error.message);
    }
  }
  async acceptTermsAndConds(uid: string) {
    try {
      await this.afs.collection('users').doc(uid).update({ readTerms: true });
      this.events.publish('user:termsAndCondsAcceptedSuccess');
    } catch (error) {
      console.dir(error.message);
    }
  }
  async getAllDeliveryAgents() {
    try {
      const allDeliveryAgentsRef = this.afs.collection('users', ref => ref.where('role', '==', 'deliveryAgent'));
      const allDeliveryAgents = allDeliveryAgentsRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      allDeliveryAgents.subscribe((res) => {
        if (!res.length) {
          this.events.publish('user:noDeliveryAgents');
        } else {
          this.events.publish('user:publishAllDeliveryAgents', res);
        }
      });
    } catch (err) {
      console.dir(err);
    }
  }
  async assignDeliveryAgent(agentId, orderId) {
    try {
      const orderRef = this.afs.collection('orders', ref => ref.where('orderId', '==', orderId));
      const orderData: any = await orderRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      await this.afs.collection('orders').doc(orderData[0].id).update({ deliveryAgentId: agentId, deliveryStatus: 'notStarted' });
      this.events.publish('user:assignDeliveryAgentSuccess');
    } catch (error) {
      console.dir(error);
    }
  }
  async setDefaultDeliveryAgentToUser(agentId, uid) {
    try {
      await this.afs.doc(`users/${uid}`).update({ defaultDeliveryAgentId: agentId });
      this.events.publish('user:setDefaultDeliveryAgentToUserSuccess');
    } catch (error) {
      console.dir(error);
      error['location'] = 'user-service:setDefaultDeliveryAgentToUser';
      this.logglyService.log(error);
    }
  }
  async getAddressFromLatLng(lat, lng) {
    try {
      let getAddressFromLatLng = firebase.functions().httpsCallable('location-getAddressFromLatLng');
      getAddressFromLatLng({ lat: lat, lng: lng }).then((response) => {
        //console.log('response', response.data);
        if (response.data.status !== "OK" || response.data.success === false) {
          this.events.publish('user:errorInGettingAddress');
        } else {
          this.events.publish('user:addressValueFromLatLng', response.data);
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async getTotalUsers() {
    try {
      this.afs.collection('analytics').doc('users').valueChanges().subscribe((data: any) => {
        this.events.publish('user:publishTotalUsers', data.count);
      });
    } catch (error) {
      console.dir(error);
    }

  }

  async getUpdatedCartProducts() {
    try {
      let userId = this.getUserId();
      let updatedCartProducts = firebase.functions().httpsCallable('cart-getUpdatedCartProducts');
      updatedCartProducts(userId).then((res) => {
        //console.log(res.data);
        if (res.data.length) {
          this.events.publish('user:publishUpdatedCartProducts', res.data);
        } else {
          this.events.publish('user:noProductsInCart');
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }


  async addUserByAdmin(userDetails) {
    let addUserDetails = firebase.functions().httpsCallable('users-addUserByAdmin');
    addUserDetails(userDetails).then(async (res) => {
      if (res.data.status && res.data.status === 'success') {
        this.events.publish('user:addUserByAdminSuccess');
      } else {
        this.events.publish('user:addUserByAdminFailure');
      }
    });
  }

  async getUserToCreateOrder(userName) {
    try {
      console.log('name sent:', userName);
      this.afs.collection('users', ref => ref
        .orderBy('lowercaseName')
        .startAt(userName.toLowerCase())
        .endAt(userName.toLowerCase() + "\uf8ff")
      )
        .snapshotChanges().pipe(
          map(snaps => convertSnaps(snaps))).subscribe((result) => {
            if (!result.length) {
              return false;
            }
            let roleOnlyUser = result.filter(user => user.role == 'user');
            this.events.publish('user:getUserToCreateOrderSuccess', roleOnlyUser);
          });
    } catch (error) {
      console.dir(error);
    }
  }

  async saveUserAddressToCreateOrder(userId, useraddress) {
    try {
      await this.afs.collection('users').doc(userId).update({ defaultAddress: useraddress });
      await this.afs.collection('users').doc(userId).collection('addresses').add(useraddress);
      this.events.publish('user:saveUserAddressToCreateOrderSuccess');
    } catch (error) {
      this.events.publish('user:saveUserAddressToCreateOrderFailure');
    }
  }

  async saveToDefaultAddress(userId, userAddress) {
    try {
      await this.afs.collection('users').doc(userId).update({ defaultAddress: userAddress });
    } catch (error) {

    }
  }

  async getAllUserAddresses(userId) {
    try {
      const addresses = await this.afs.collection('users').doc(userId).collection('addresses').snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { ...data };
        }))
      ).pipe(first()).toPromise();
      return addresses;
    } catch (err) {
      console.dir(err);
    }
  }

  async makeOrdersRefWithLoadMore(whereField, status, startDate, endDate, filters, startAfter) {
    let ordersRef;
    let loginId = await this.storage.get('uid');
    let userRole = await this.storage.get('userRole')
    if (userRole == 'vendor') {
      ordersRef = this.afs.collection('orders', ref => ref
        .orderBy('createdAt', 'desc')
        .where(whereField, '==', status).where('vendorId', '==', loginId).startAt(startDate)
        .endAt(endDate)
        .limit(this.configService.environment.scrollLimit)
        .startAfter(startAfter));
    }
    else {
      let filterType;
      let filterValue;
      if (filters) {
        for (let key in filters) {
          if (filters[key].length > 0) {
            if (key == 'pincode') {
              filterType = 'address.pincode'
              filterValue = [filters[key]];
            }
            else if (key == 'group') {
              let arr = [];
              let users: any = await this.userGroupsService.getGroupUsers(filters.group);
              for (const user of users) {
                arr.push(user.id);
              }
              filterValue = arr;
              filterType = 'userId'
            } else {
              filterType = key;
              filterValue = [filters[key]];
            }
          }
        }
      }
      if (filterType && filterValue) {
        ordersRef = this.afs.collection('orders', ref => ref
          .orderBy('createdAt', 'desc')
          .where(whereField, '==', status)
          .where(filterType, 'in', filterValue).startAt(startDate)
          .endAt(endDate)
          .limit(this.configService.environment.scrollLimit)
          .startAfter(startAfter));
      } else {
        ordersRef = this.afs.collection('orders', ref => ref
          .orderBy('createdAt', 'desc')
          .where(whereField, '==', status).startAt(startDate)
          .endAt(endDate)
          .limit(this.configService.environment.scrollLimit)
          .startAfter(startAfter));
      }
    }
    return ordersRef;

  }
  async makeOrdersRefWithoutLoadMore(whereField, status, startDate, endDate, filters) {
    let ordersRef;
    let loginId = await this.storage.get('uid');
    let userRole = await this.storage.get('userRole')
    if (userRole == 'vendor') {
      ordersRef = this.afs.collection('orders', ref => ref
        .orderBy('createdAt', 'desc')
        .where(whereField, '==', status).where('vendorId', '==', loginId).startAt(startDate)
        .endAt(endDate)
        .limit(this.configService.environment.scrollLimit));
    }
    else {
      let filterType;
      let filterValue;
      if (filters) {
        for (let key in filters) {
          if (filters[key].length > 0) {
            if (key == 'pincode') {
              filterType = 'address.pincode'
              filterValue = [filters[key]];
            }
            else if (key == 'group') {
              let arr = [];
              let users: any = await this.userGroupsService.getGroupUsers(filters.group);
              console.log('users:', users)
              for (const user of users) {
                arr.push(user.id);
              }
              filterValue = arr;
              filterType = 'userId'
            }
            else {
              filterType = key;
              filterValue = [filters[key]];
            }
          }
        }
      }
      console.log('filterTypeValue:', filterType, filterValue)
      if (filterType && filterValue) {
        ordersRef = this.afs.collection('orders', ref => ref
          .orderBy('createdAt', 'desc')
          .where(whereField, '==', status)
          .where(filterType, 'in', filterValue).startAt(startDate)
          .endAt(endDate)
          .limit(this.configService.environment.scrollLimit));
      } else {
        ordersRef = this.afs.collection('orders', ref => ref
          .orderBy('createdAt', 'desc')
          .where(whereField, '==', status).startAt(startDate)
          .endAt(endDate)
          .limit(this.configService.environment.scrollLimit));
      }
    }
    return ordersRef;
  }

  async makeOrdersRef(whereField, status, startDate, endDate, filters, startAfter?) {
    let ordersRef: any;
    if (startAfter) {
      ordersRef = await this.makeOrdersRefWithLoadMore(whereField, status, startDate, endDate, filters, startAfter);
    } else {
      console.log('else')
      ordersRef = await this.makeOrdersRefWithoutLoadMore(whereField, status, startDate, endDate, filters);
    }
    return ordersRef;
  }

  async getPaymentPendingOrders(startDate, endDate, filters) {
    try {
      let ordersRef: any;
      ordersRef = await this.makeOrdersRef('payment.completed', false, startDate, endDate, filters);
      const ordersSnap = ordersRef.snapshotChanges();
      ordersSnap.subscribe((orders) => {
        this.paymentPendingOrders = [];
        if (!orders.length) {
          this.events.publish('user:noPaymentPendingOrders');
        } else {
          this.lastResponseOfPaymentPendingOrders = orders[orders.length - 1].payload.doc;
          for (let order of orders) {
            this.paymentPendingOrders.push({ id: order.payload.doc.id, ...order.payload.doc.data() as {} })
          }
          this.events.publish('user:publishPaymentPendingOrders', this.paymentPendingOrders);
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async getAllPaymentPendingOrders(date?) {
    return new Promise(async (resolve, reject) => {
      try {
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        if (userRole == 'vendor') {
          this.allPaymentPendingOrders = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc')
            .where("payment.completed", '==', false).where('vendorId', '==', loginId)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
        }
        else {
          let allOrders = [];
          let ordersData;
          if (date && date.start) {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("payment.completed", '==', false).startAt(date.start).endAt(date.end));
          } else {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("payment.completed", '==', false));

          }
          let allOrdersref: Subscription = ordersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc) => {
              allOrders.push({ id: doc.id, ...doc.data() })
            });
            resolve(allOrders)
            allOrdersref.unsubscribe()
          })
          // this.allPaymentPendingOrders = this.afs.collection('orders', ref => ref
          //   .orderBy('createdAt', 'desc')
          //   .where("payment.completed", '==', false)).snapshotChanges().pipe(
          //     map(actions => actions.map(a => {
          //       const data = a.payload.doc.data();
          //       const id = a.payload.doc.id;
          //       return { id, ...data };
          //     }))
          //   ).pipe(first()).toPromise();
        }
        //resolve(this.allPaymentPendingOrders);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async loadMorePaymentPendingOrders(startDate, endDate, filters?) {
    try {
      let ordersRef: any;
      ordersRef = await this.makeOrdersRef('payment.completed', false, startDate, endDate, filters, this.lastResponseOfPaymentPendingOrders);
      const ordersSnap = ordersRef.snapshotChanges();
      ordersSnap.subscribe((orders) => {
        if (!orders.length) {
          this.events.publish('user:noMorePaymentPendingOrders');
          return false;
        }
        this.lastResponseOfPaymentPendingOrders = orders[orders.length - 1].payload.doc;
        for (let order of orders) {
          this.paymentPendingOrders.push({ id: order.payload.doc.id, ...order.payload.doc.data() as {} })
        }
        this.events.publish('user:publishPaymentPendingOrders', this.paymentPendingOrders);
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async getPaymentFailedOrders(startDate, endDate, filters) {
    try {
      let ordersRef: any;
      ordersRef = await this.makeOrdersRef('status', 'Pending', startDate, endDate, filters);
      const ordersSnap = ordersRef.snapshotChanges();
      ordersSnap.subscribe((orders) => {
        this.paymentFailedOrders = [];
        if (!orders.length) {
          this.events.publish('user:noPaymentFailedOrders');
        } else {
          this.lastResponseOfPaymentFailedOrders = orders[orders.length - 1].payload.doc;
          for (let order of orders) {
            this.paymentFailedOrders.push({ id: order.payload.doc.id, ...order.payload.doc.data() as {} })
          }
          this.events.publish('user:publishPaymentFailedOrders', this.paymentFailedOrders);
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async getAllPaymentFailedOrders(date?) {
    return new Promise(async (resolve, reject) => {
      try {
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        if (userRole == 'vendor') {
          this.allPaymentFailedOrders = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc')
            .where("status", '==', 'Pending').where('vendorId', '==', loginId)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
        }
        else {
          let allOrders = [];
          let ordersData;
          if (date && date.start) {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", '==', 'Pending').startAt(date.start).endAt(date.end));
          } else {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", '==', 'Pending'));
          }
          let allOrdersref: Subscription = ordersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc) => {
              allOrders.push({ id: doc.id, ...doc.data() })
            });
            resolve(allOrders)
            allOrdersref.unsubscribe()
          })
          // this.allPaymentFailedOrders = this.afs.collection('orders', ref => ref
          //   .orderBy('createdAt', 'desc')
          //   .where("status", '==', 'Pending')).snapshotChanges().pipe(
          //     map(actions => actions.map(a => {
          //       const data = a.payload.doc.data();
          //       const id = a.payload.doc.id;
          //       return { id, ...data };
          //     }))
          //   ).pipe(first()).toPromise();
        }
        // resolve(this.allPaymentFailedOrders);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async loadMorePaymentFailedOrders(startDate, endDate, filters) {
    try {
      let ordersRef: any;
      ordersRef = await this.makeOrdersRef('status', 'Pending', startDate, endDate, filters, this.lastResponseOfPaymentFailedOrders);
      const ordersSnap = ordersRef.snapshotChanges();
      ordersSnap.subscribe((orders) => {
        if (!orders.length) {
          this.events.publish('user:noMorePaymentFailedOrders');
          return false;
        }
        this.lastResponseOfPaymentFailedOrders = orders[orders.length - 1].payload.doc;
        for (let order of orders) {
          this.paymentFailedOrders.push({ id: order.payload.doc.id, ...order.payload.doc.data() as {} })
        }
        this.events.publish('user:publishPaymentFailedOrders', this.paymentFailedOrders);
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async getCancelledOrders(startDate, endDate, filters?) {
    try {
      let ordersRef: any;
      ordersRef = await this.makeOrdersRef('status', 'Cancelled', startDate, endDate, filters);
      console.log('ordersRef:', ordersRef);
      const ordersSnap = ordersRef.snapshotChanges();
      ordersSnap.subscribe((orders) => {
        this.cancelledOrders = [];
        if (!orders.length) {
          this.events.publish('user:noCancelledOrders');
        } else {
          this.lastResponseOfCancelledOrders = orders[orders.length - 1].payload.doc;
          for (let order of orders) {
            this.cancelledOrders.push({ id: order.payload.doc.id, ...order.payload.doc.data() as {} })
          }
          this.events.publish('user:publishCancelledOrders', this.cancelledOrders);
          return this.cancelledOrders;
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async getAllCancelledOrders(date?) {
    return new Promise(async (resolve, reject) => {
      try {
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        if (userRole == 'vendor') {
          this.allCancelledOrders = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc').where("status", 'in', ['Rejected', 'Cancelled']).where('vendorId', '==', loginId)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
        }
        else {
          let allOrders = [];
          let ordersData;
          if (date && date.start) {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", 'in', ['Cancelled']).startAt(date.start).endAt(date.end));
          } else {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", 'in', ['Cancelled']));
          }
          let allOrdersref: Subscription = ordersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc) => {
              allOrders.push({ id: doc.id, ...doc.data() })
            });
            resolve(allOrders)
            allOrdersref.unsubscribe()
          })
          // this.allCancelledOrders = this.afs.collection('orders', ref => ref
          //   .orderBy('createdAt', 'desc').where("status", 'in', ['Rejected', 'Cancelled'])).snapshotChanges().pipe(
          //     map(actions => actions.map(a => {
          //       const data = a.payload.doc.data();
          //       const id = a.payload.doc.id;
          //       return { id, ...data };
          //     }))
          //   ).pipe(first()).toPromise();
        }
        //resolve(this.allCancelledOrders);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async loadMoreCancelledOrders(startDate, endDate, filters?) {
    try {
      let ordersRef: any;
      ordersRef = await this.makeOrdersRef('status', 'Cancelled', startDate, endDate, filters, this.lastResponseOfCancelledOrders);
      const ordersSnap = ordersRef.snapshotChanges();
      ordersSnap.subscribe((orders) => {
        if (!orders.length) {
          this.events.publish('user:noMoreCancelledOrders');
          return false;
        }
        this.lastResponseOfCancelledOrders = orders[orders.length - 1].payload.doc;
        for (let order of orders) {
          this.cancelledOrders.push({ id: order.payload.doc.id, ...order.payload.doc.data() as {} })
        }
        this.events.publish('user:publishCancelledOrders', this.cancelledOrders);
      });
    } catch (error) {
      console.dir(error);
    }
  }

  // Rejected orders
  async getRejectedOrders(startDate, endDate, filters?) {
    try {
      let ordersRef: any
      ordersRef = await this.makeOrdersRef('status', 'Rejected', startDate, endDate, filters);
      const ordersSnap = ordersRef.snapshotChanges();
      ordersSnap.subscribe((orders) => {
        this.rejectedOrders = [];
        if (!orders.length) {
          this.events.publish('user:noRejectedOrders');
        } else {
          this.lastResponseOfRejectedOrders = orders[orders.length - 1].payload.doc;
          for (let order of orders) {
            this.rejectedOrders.push({ id: order.payload.doc.id, ...order.payload.doc.data() as {} })
          }
          this.events.publish('user:publishRejectedOrders', this.rejectedOrders);
          return this.rejectedOrders;
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }
  async getAllRejectedOrders(date?) {
    return new Promise(async (resolve, reject) => {
      try {
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        if (userRole == 'vendor') {
          this.allRejectedOrders = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc').where("status", 'in', ['Rejected']).where('vendorId', '==', loginId)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
        }
        else {
          let allOrders = [];
          let ordersData;
          if (date && date.start) {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", 'in', ['Rejected']).startAt(date.start).endAt(date.end));
          } else {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", 'in', ['Rejected']));
          }
          let allOrdersref: Subscription = ordersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc) => {
              allOrders.push({ id: doc.id, ...doc.data() })
            });
            resolve(allOrders)
            allOrdersref.unsubscribe()
          })
          // this.allRejectedOrders = this.afs.collection('orders', ref => ref
          //   .orderBy('createdAt', 'desc').where("status", 'in', ['Rejected'])).snapshotChanges().pipe(
          //     map(actions => actions.map(a => {
          //       const data = a.payload.doc.data();
          //       const id = a.payload.doc.id;
          //       return { id, ...data };
          //     }))
          //   ).pipe(first()).toPromise();
        }
        //resolve(this.allRejectedOrders);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async loadMoreRejectedOrders(startDate, endDate, filters?) {
    try {
      let ordersRef: any;
      ordersRef = await this.makeOrdersRef('status', 'Rejected', startDate, endDate, filters, this.lastResponseOfRejectedOrders);
      const ordersSnap = ordersRef.snapshotChanges();
      ordersSnap.subscribe((orders) => {
        if (!orders.length) {
          this.events.publish('user:noMoreRejectedOrders');
          return false;
        }
        this.lastResponseOfRejectedOrders = orders[orders.length - 1].payload.doc;
        for (let order of orders) {
          this.rejectedOrders.push({ id: order.payload.doc.id, ...order.payload.doc.data() as {} })
        }
        this.events.publish('user:publishRejectedOrders', this.rejectedOrders);
      });
    } catch (error) {
      console.dir(error);
    }
  }
  async getReturnedOrders(startDate, endDate, filters?) {
    try {
      let ordersRef: any;
      ordersRef = await this.makeOrdersRef('status', 'Returned', startDate, endDate, filters);
      const ordersSnap = ordersRef.snapshotChanges();
      ordersSnap.subscribe((orders) => {
        this.returnedOrders = [];
        if (!orders.length) {
          this.events.publish('user:noReturnedOrders');
        } else {
          this.lastResponseOfReturnedOrders = orders[orders.length - 1].payload.doc;
          for (let order of orders) {
            this.returnedOrders.push({ id: order.payload.doc.id, ...order.payload.doc.data() as {} })
          }
          this.events.publish('user:publishReturnedOrders', this.returnedOrders);
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async getAllReturnedOrders(date?) {
    return new Promise(async (resolve, reject) => {
      try {
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        if (userRole == 'vendor') {
          this.allReturnedOrders = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc')
            .where("status", '==', 'Returned').where('vendorId', '==', loginId)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
        }
        else {
          let allOrders = [];
          let ordersData;
          if (date && date.start) {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", '==', 'Returned').startAt(date.start).endAt(date.end));
          } else {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", '==', 'Returned'));
          }
          let allOrdersref: Subscription = ordersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc) => {
              allOrders.push({ id: doc.id, ...doc.data() })
            });
            resolve(allOrders)
            allOrdersref.unsubscribe()
          })
          // this.allReturnedOrders = this.afs.collection('orders', ref => ref
          //   .orderBy('createdAt', 'desc')
          //   .where("status", '==', 'Returned')).snapshotChanges().pipe(
          //     map(actions => actions.map(a => {
          //       const data = a.payload.doc.data();
          //       const id = a.payload.doc.id;
          //       return { id, ...data };
          //     }))
          //   ).pipe(first()).toPromise();
        }
        //resolve(this.allReturnedOrders);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async loadMoreReturnedOrders(startDate, endDate, filters?) {
    try {
      let ordersRef: any;
      ordersRef = await this.makeOrdersRef('status', 'Returned', startDate, endDate, filters, this.lastResponseOfReturnedOrders);
      const ordersSnap = ordersRef.snapshotChanges();
      ordersSnap.subscribe((orders) => {
        if (!orders.length) {
          this.events.publish('user:noMoreReturnedOrders');
          return false;
        }
        this.lastResponseOfReturnedOrders = orders[orders.length - 1].payload.doc;
        for (let order of orders) {
          this.returnedOrders.push({ id: order.payload.doc.id, ...order.payload.doc.data() as {} })
        }
        this.events.publish('user:publishReturnedOrders', this.returnedOrders);
      });
    } catch (error) {
      console.dir(error);
    }
  }


  async getUserByRole(role) {
    try {
      const userRef = await this.afs.collection('users', ref => ref.where('role', '==', role));
      const userDocs = userRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      const userDocsWithId: any = await userDocs.pipe(first()).toPromise();
      this.events.publish('user:getUserByRoleSuccess', userDocsWithId);
    } catch (error) {
      this.events.publish('user:getUserByRoleFailure', error.message);
      console.log(error);
    }
  }

  async returnOrderDetailsWithOrderId(orderId: number) {
    try {
      let role = await this.storage.get('userRole')
      if (role == 'vendor') {
        const orderData: any = await this.afs.collection('orders', ref => ref
          .where('orderId', '==', orderId).where('vendorId', '==', this.getUserId()))
          .snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data: any = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          ).pipe(first()).toPromise()
        return orderData
      }
      else {
        const orderData: any = await this.afs.collection('orders', ref => ref
          .where('orderId', '==', orderId))
          .snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data: any = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          ).pipe(first()).toPromise()
        return orderData
      }
    } catch (error) {
      console.dir(error);
    }
  }

  async updateUserInfo(userId, details) {
    try {
      await this.afs.collection('users').doc(userId).update(details);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getOrderLogs(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let logData = await this.afs.collection('orders').doc(id).collection('logs', ref => ref.orderBy('time', 'asc')).valueChanges().pipe(first()).toPromise();
        resolve(logData);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getOrderLabels() {
    return new Promise(async (resolve, reject) => {
      try {
        let labelData = await this.afs.collection('ordersMetaData').doc('customLabel').valueChanges().pipe(first()).toPromise();
        resolve(labelData);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async updateOrderLabels(lablesData) {
    return new Promise(async (resolve, reject) => {
      try {
        let labelData = await this.afs.collection('ordersMetaData').doc('customLabel').valueChanges().pipe(first()).toPromise();
        if (labelData) {
          await this.afs.collection('ordersMetaData').doc('customLabel').update({ labels: lablesData })
        }
        else {
          await this.afs.collection('ordersMetaData').doc('customLabel').set({ labels: lablesData })
        }
        resolve(true)
      } catch (error) {
        console.log(error);
      }
    });
  }

  async deleteLabels(lablesData) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.afs.collection('ordersMetaData').doc('customLabel').set({ labels: lablesData })
        resolve(true);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async assignLabelToOrder(label, id) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.afs.collection('orders').doc(id).update({ label: label });
        resolve(true);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getOrdersByLabel(label, startDate, endDate) {
    return new Promise<any[]>(async (resolve) => {
      let ordersByLabel = []
      let ordersRef: any
      let orders = [];
      ordersRef = this.afs.collection('orders', ref => ref
        .orderBy('createdAt', 'desc')
        .where('label', '==', label).startAt(startDate)
        .endAt(endDate)).get().subscribe(docs => {
          docs.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
          });
          if (!orders.length) {
            resolve([]);
          } else {
            for (let order of orders) {
              ordersByLabel.push(order);
            }
            resolve(ordersByLabel)
          }
        });
    })
  }

  async removeLabel(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.afs.collection('orders').doc(id).update({ label: firebase.firestore.FieldValue.delete() });
        resolve(true);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async removeDefaultAgent(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.afs.collection('users').doc(id).update({ defaultDeliveryAgentId: '' });
        resolve(true);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async searchUserByName(searchValue: string) {
    return new Promise(async (resolve, reject) => {
      try {
        let searchedUsers = []
        let searchName = searchValue.toLowerCase()
        let usersRef = await this.afs.collection('users', ref => ref
          .orderBy('lowercaseName').startAt(searchName).endAt(searchName + "\uf8ff"));
        let allUsersref: Subscription = usersRef.get().subscribe((querySnapshot: any) => {
          querySnapshot.forEach((doc) => {
            searchedUsers.push({ id: doc.id, data: doc.data() })
          });
          resolve(searchedUsers)
          allUsersref.unsubscribe()
        })
        //   .snapshotChanges().pipe(
        //     map(actions => actions.map(a => {
        //       const data = a.payload.doc.data();
        //       const id = a.payload.doc.id;
        //       return { id, data };
        //     }))
        //   ).pipe(first()).toPromise();
        // resolve(usersResult);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async searchUserByNumber(searchValue: string) {
    return new Promise(async (resolve, reject) => {
      try {
        let usersResult = await this.afs.collection('users', ref => ref
          .orderBy('phoneNo').startAt(searchValue.toLowerCase())
          .endAt(searchValue.toLowerCase() + "\uf8ff")).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, data };
            }))
          ).pipe(first()).toPromise();
        resolve(usersResult);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async addComment(id, comment) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.afs.collection('orders').doc(id).update({ orderComment: comment });
        resolve(true);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async generateDeliveryAgentOrdersPdf(userId: any,) {
    // console.log("agentId:",userId);
    return new Promise(async (resolve) => {
      try {
        let getPdfLink = firebase.functions().httpsCallable('delivery-generatePdfDeliveryAgent');
        getPdfLink({ uid: userId, }).then(async (response) => {
          // console.log('responseLink:', response.data);
          if (response && response.data) {
            // resolve(response.data);
            console.log("response.data.success", response.data.success);
            if (response.data.pdfLink) {
              window.open(response.data.pdfLink, "_blank");
            }
          }
        });
      } catch (error) {
        resolve(false);
        console.dir('ERR:', error);
      }
    })
  }

  async checkProductAvailability(order) {
    return new Promise(async (resolve) => {
      try {
        let getAvailability = firebase.functions().httpsCallable('orders-checkProductsAvailability');
        getAvailability({ products: order.products }).then(async (response) => {
          // console.log('res',response);
          resolve(response.data);
        })
      } catch (error) {
        console.dir('ERR:', error);
      }
    })
  }

  async getAllUsersDeliveryAgents() {
    return new Promise(async (resolve) => {
      try {
        let userArray = [];
        const allDeliveryAgentsRef = this.afs.collection('users', ref => ref.where('role', '==', 'deliveryAgent'));
        allDeliveryAgentsRef.get().subscribe((snapShot) => {
          snapShot.forEach((doc) => {
            userArray.push({ id: doc.id, data: doc.data() });
          })
          resolve(userArray);
        })
      } catch (err) {
        resolve(false);
        console.log("err:", err);
      }
    })
  }

  async getAllUsersManager() {
    return new Promise(async (resolve) => {
      try {
        let userArray = [];
        const allDeliveryAgentsRef = this.afs.collection('users', ref => ref.where('role', '==', 'manager'));
        allDeliveryAgentsRef.get().subscribe((snapShot) => {
          snapShot.forEach((doc) => {
            userArray.push({ id: doc.id, data: doc.data() });
          })
          resolve(userArray);
        })
      } catch (err) {
        resolve(false);
        console.log("err:", err);
      }
    })
  }

  async autoRemoveUserFromGroup(id: any) {
    return new Promise(async (resolve) => {
      try {
        const docRef = this.afs.collection("users").doc(id);
        docRef.update({ groups: firebase.firestore.FieldValue.delete() });
        resolve(true);
      }
      catch (err) {
        console.log("err:", err);
        resolve(false)
      }
    });
  }

  async getDeliveryAgentOrders(userId: any) {
    console.log('service',userId);
    let ordersRef = this.afs.collection('orders', ref =>
      ref.where('deliveryAgentId', '==', userId)
        .where('status', 'in', ['Confirmed', 'Dispatched', 'Delivered'])
        .orderBy('createdAt', 'desc'));

    return new Promise<any>(async (resolve) => {
      try {
        let ordersArray = [];
         this.assignedOrdersSub = ordersRef.get().subscribe((snapShot) => {
          snapShot.forEach((doc) => {
            ordersArray.push({ id: doc.id, ...doc.data() });
          })
          console.log('orders', ordersArray);
          this.assignedOrders$.next(ordersArray);
          resolve(ordersArray);
        })

      } catch (err) {
        resolve(false);
        console.log('error:', err);
      }
    })

  }


  // ? Start Assigning Orders Function
  async getAllOrders(userId: string) {
    // console.log('service',userId,status);
    let ordersRef = this.afs.collection('orders', ref =>
      ref.where('status', 'in', ['Confirmed', 'Dispatched'])
      .orderBy('createdAt', 'desc'));

    return new Promise<any>(async (resolve) => {
      try {
        let ordersArray = [];
        this.unAssignOrdersSub =  ordersRef.get().subscribe((snapShot) => {
          snapShot.forEach((doc) => {
            ordersArray.push({ id: doc.id, ...doc.data() });
          });
          console.log('orders : ', ordersArray);
          let result = ordersArray.filter(order => order.deliveryAgentId !== userId);
          this.unAssignOrders$.next(result);
          // this.unAssignOrders = result;
          resolve(result);
        })

      } catch (err) {
        resolve(false);
        console.log('error : ', err);
      }
    })

  }

  getUnassignOrdersListener():Observable<any>{
   return this.unAssignOrders$.asObservable();
  }
  getAssignedOrdersListener():Observable<any>{
    return this.assignedOrders$.asObservable();
   }

  async returnOrderWithOrderId(orderId: number,userId: string) {
    try {
      const orderData: any = await this.afs.collection('orders', ref => ref
        .where('orderId', '==', orderId))
        .snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).pipe(first()).toPromise()

      console.log("orderData", orderData);
      let result = orderData.filter(order => order.deliveryAgentId !== userId);
      return result
    } catch (error) {
      console.log("error", error);
    }
  }

  async assignDeliveryAgentToOrders(agentId: string, orders:any) {
    if (orders.length > 0) {
      console.log("agentId", agentId, "orders", orders);

      return new Promise(async (resolve) => {
        const batch = this.afs.firestore.batch();
        for (const orderId of orders) {
          batch.update(this.afs.collection('orders').doc(orderId).ref, { deliveryAgentId: agentId, deliveryStatus: 'notStarted' });
        }

        batch.commit().then(() => {

          let unAssignOrd: any = this.unAssignOrders$.getValue();
          let ordToBeAssign =  unAssignOrd.filter(ord => orders.includes(ord.id));

          console.log("unassignOrd", unAssignOrd)
          unAssignOrd = unAssignOrd.filter(ord => !orders.includes(ord.id));
          console.log("unassignOrd-02", unAssignOrd);
          this.unAssignOrders$.next(unAssignOrd);

          let assignedOrd = this.assignedOrders$.getValue();
          console.log("assignedOrd", assignedOrd);

          let mergeArray = ordToBeAssign.concat(assignedOrd);
          console.log("mergeArray", mergeArray);
          this.assignedOrders$.next(mergeArray);

          resolve(true);

        }).catch(error => {
          console.log('Error updating agent in orders', error);
          resolve(false);
        })

      })
    }
  }
  // ? End Assigning Orders Function

  removeSubscriptions() {
    this.events.unsubscribe('user:getUserInfo');
    this.events.unsubscribe('user:addUserImage');
    this.events.unsubscribe('user:getTotalActiveUsers');
    this.events.unsubscribe('user:getUserDetails');
    this.events.unsubscribe('user:setActiveVacation');
    this.events.unsubscribe('user:getVacationsDetails');
    this.events.unsubscribe('user:getAllUsers');
    this.events.unsubscribe('user:getUsersForAdminUsers');
    this.events.unsubscribe('user:loadMoreUsersForAdminUsers');
    this.events.unsubscribe('user:changeRole');
    this.events.unsubscribe('user:completeOrder');
    this.events.unsubscribe('user:cancelOrder');
    this.events.unsubscribe('user:setPaytmNo');
    this.events.unsubscribe('user:setPhonePeNo');
    this.events.unsubscribe('user:setUpiId');
    this.events.unsubscribe('user:getPaytmNo');
    this.events.unsubscribe('user:getPhonePeNo');
    this.events.unsubscribe('user:getUpiId');
    this.events.unsubscribe('user:saveNewAddress');
    this.events.unsubscribe('user:editSavedAddress');
    this.events.unsubscribe('user:deleteAddress');
    this.events.unsubscribe('user:getAllSavedAddresses');
    this.events.unsubscribe('user:addProductToCart');
    this.events.unsubscribe('user:getUserCartProducts');
    this.events.unsubscribe('user:getLengthOfCartProducts');
    this.events.unsubscribe('user:updateQuantityOfCartProduct');
    this.events.unsubscribe('user:placeOrder');
    this.events.unsubscribe('user:getOrderDetailsWithOrderId');
    this.events.unsubscribe('user:getAllOrdersOfUser');
    this.events.unsubscribe('user:getAllOrdersForAdmin');
    this.events.unsubscribe('user:rejectOrderByAdmin');
    this.events.unsubscribe('user:confirmOrderByAdmin');
    this.events.unsubscribe('user:cancelOrderByAdmin');
    this.events.unsubscribe('user:dispatchOrderByAdmin');
    this.events.unsubscribe('user:deliverOrderByAdmin');
    this.events.unsubscribe('user:returnOrderByAdmin');
    this.events.unsubscribe('user:cancelOrderByUser');
    this.events.unsubscribe('user:setPaymentModeOfOrderByUser');
    this.events.unsubscribe('user:addUserByAdmin');
    this.events.unsubscribe('user:getUserToCreateOrder');
    this.events.unsubscribe('user:getPaymentPendingOrders');
    this.events.unsubscribe('user:getUserByRole');
  }
}