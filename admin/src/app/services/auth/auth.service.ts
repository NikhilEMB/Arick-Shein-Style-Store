import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Events, NavController } from '@ionic/angular';
import { first, map} from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Router } from '@angular/router';
import { ProductService } from '../product/product.service';
import { MediaService } from '../media/media.service';
import { ChatService } from '../chat.service';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import * as firebase from 'firebase';
import { OrderService } from '../order/order.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  verificationId: any;
  routeFromLoginPage: boolean = false;
  loggedOut: boolean = false;
  permissionData=[]
  constructor(private afs: AngularFirestore, private fireAuth: AngularFireAuth, private events: Events,
              private userService: UserService, private firebaseAuthentication: FirebaseAuthentication, private router: Router,
              private ngZone: NgZone,private productService: ProductService,
              private mediaService: MediaService,private storage: Storage,
              private chatService: ChatService,private navController: NavController, private fcm: FCM,
              private orderService: OrderService) { 
              }
  initializeSubscriptions() {
    this.events.subscribe('manager:getManagerDataSuccess', async (receivedData) => {
      let userRole = await this.storage.get('userRole')
      if(userRole=='manager'){
        if (receivedData.permissions && receivedData.active){
          this.permissionData = receivedData.permissions
          if (this.permissionData.length==0){
            this.ngZone.run(() => {
              this.navController.navigateRoot(['no-user-access']);
            });
          }
          this.ngZone.run(() => {
            this.navController.navigateRoot([this.permissionData[0]]);
          });
        }
        else{
          this.ngZone.run(() => {
            this.navController.navigateRoot(['no-user-access']);
          });
        }
      }
      // console.log(this.currentPages)
    });
    this.events.subscribe('auth:login', (phoneNo) => {
      this.login(phoneNo);
       });
    this.events.subscribe('auth:sendotp', (otp) => {
      this.sendotp(otp);
       });
    this.fireAuth.authState.subscribe(async (user) => {
      console.log('user:', user);
      if (user) {
        console.log('user from Auth:', user);
        this.storage.set('uid', user.uid);
        this.userService.addUserId(user.uid);
        this.userService.addPhoneNo(user.phoneNumber);
        this.checkSearchKey();
        const usersData: any = await this.afs.doc(`users/${user.uid}`).valueChanges().pipe(first()).toPromise();
        console.log('usersData', usersData);
        // //console.log('usersData role', usersData.role);
        if (usersData) {
          this.storage.set('userName', usersData.name);
          this.storage.set('userPic', usersData.dP);
          this.storage.set('userRole', usersData.role);
          this.storage.set('userDefaultAddress', usersData.defaultAddress);
          this.userService.addUserName(usersData.name);
          this.afs.doc(`users/${user.uid}`).update({lastAccessAt: new Date()});
          if(!this.routeFromLoginPage) {
            if (usersData.role === 'user') {
            this.ngZone.run(() => {
                this.navController.navigateRoot(['no-user-access']);
            });
          } else if(usersData.role === 'deliveryAgent') {
            // //console.log('in if...');
             this.navController.navigateRoot(['no-user-access']);
          } else if(usersData.role === 'vendor') {
            // //console.log('in if...');
             this.navController.navigateRoot(['vendor-orders']);
          }
           else {
            if(usersData.readTerms === false) {
              this.ngZone.run(() => {
                 this.navController.navigateRoot(['terms-conditions']);
              });
            } else {
              if (usersData.role == 'manager'){
                  let managerId = await this.storage.get('uid')
                  this.events.publish('manager:getManagerData',managerId);
              }
              else{
                this.ngZone.run(() => {
                  this.navController.navigateRoot(['admin-orders']);
                });
              }
            }
          }
        }
        this.pushFCMToken(user.uid,usersData);
        }
        this.events.publish('user:getAllProductIdsOfCart');
        this.events.publish('version-compare:versionCompare');
      } else {
        // //console.log('in shop category page...');
        if(!this.loggedOut){
          this.ngZone.run(() => {
          this.navController.navigateRoot(['homepage']);
        });
      }
      }
      this.events.publish('admin-settings:getStoreInfo');
      this.events.publish('auth:hideSplashScreen');
    });
    this.events.subscribe('auth:logout', () => {
      this.loggedOut = true;
      this.logout();
       });
  }
  async login(phoneNo) {
    // //console.log('phoneNo in service', phoneNo);
    this.firebaseAuthentication.verifyPhoneNumber(phoneNo, 0).then((verificationId) => {
        this.verificationId = verificationId;
        // //console.log('verificationId', this.verificationId);
        this.events.publish('auth:gotVerificationId');
        this.userService.addPhoneNo(phoneNo);
        this.routeFromLoginPage = true;
    }).catch((err) => {
      // //console.log(err);
      if(err = "We have blocked all requests from this device due to unusual activity. Try again later.") {
        this.events.publish('auth:blockUserForTooManyOTP');
      }
    });
  }
  async sendotp(otp) {
     var credential =  await firebase.auth.PhoneAuthProvider.credential(this.verificationId, otp);
        // //console.log(credential);
     firebase.auth().signInWithCredential(credential).then((res) => {
       // //console.log('res in correct otp...', res.user.uid);
       this.userService.checkUserAlreadyExistsOrNot(res.user.uid);
     }).catch((err) => {
        // //console.log('error message', err);
        if(err === "The user account has been disabled by an administrator.") {
          this.events.publish('auth:incorrectOTP', 'Admin has blocked you!');
        } else {
          this.events.publish('auth:incorrectOTP', 'OTP did not match');
        }
      });
  }
  logout() {
    try {
    this.storage.get('storeInfo').then((storeInfo) => {
      this.storage.get('listOfProductIdsInCart').then((listOfProductIdsInCart) => {
        this.storage.clear();
        this.storage.set('storeInfo', storeInfo);
        this.storage.set('listOfProductIdsInCart', listOfProductIdsInCart);
        this.ngZone.run(() => {
          this.navController.navigateRoot(['homepage']);
        });
      })
    })
    this.fireAuth.auth.signOut();
    this.firebaseAuthentication.signOut();
    this.userService.addUserId('');
    this.userService.addPhoneNo('');
    this.events.publish('auth:logoutSuccess');
  } catch(err){
    // console.dir(err);
  }
  }
  async pushFCMToken(uid,userData){
    let token = await this.fcm.getToken();
    let deviceTokens = userData.deviceTokens ? userData.deviceTokens : [];

     if(!deviceTokens.includes(token)){
          deviceTokens.push(token);
          this.afs.doc(`users/${uid}`).update({deviceTokens:deviceTokens});
     }
}

checkSearchKey() {

  console.log('in checkSearchKey...');
  const uid = this.userService.getUserId();
  if (uid) {
  this.storage.get('searchKey').then((val) => {
    let createdAt = val && val.createdAt ? val.createdAt : moment();
    let hours = moment().diff(moment(createdAt), 'hours');
    if (hours >= 24 || !val) {
      firebase.auth().currentUser.getIdToken()
    .then(function(token) {
      return fetch('https://us-central1-' + environment.firebase.projectId + '.cloudfunctions.net/search-getSearchKey/', {
          headers: { Authorization: 'Bearer ' + token },
      });
    })
    .then(function(response) {
      return response.json();
    })
    .then((data) => {
      console.log('key', data.key);
      this.storage.set('searchKey', {key: data.key, createdAt: new Date()});
        });
      }
    });
  }
}

}
