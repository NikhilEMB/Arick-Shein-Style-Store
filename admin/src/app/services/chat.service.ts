import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/app/services/config/config.service';
import * as firebase from 'firebase';
import { SharedService } from './shared/shared.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatRef: any;
  firstResponse: any;
  allMsgs: any[] = [];
  lastMsgsSub: Subscription;
  getMsgsSub: Subscription;
  lastResponseForAdminMsgs: any;
  lastMsgsData: any = [];
  constructor(private events: Events, private afs: AngularFirestore,private configService: ConfigService, private sharedService: SharedService, private fbStorage: AngularFireStorage) { }
  initializeSubscriptions() {
    this.events.subscribe('chat:sendMsg', (msg, uid) => {
      this.sendMsg(msg, uid);
    });
    this.events.subscribe('chat:getMsgs', (id, role) => {
      this.getMsgs(id, role);
    });
    this.events.subscribe('chat:getMoreMsgs', (id) => {
      this.getMoreMsgs(id);
    });
    this.events.subscribe('chat:getLastMsgs', (groups?) => {
      this.getLastMsgs(groups);
    });
    this.events.subscribe('chat:searchUser', (searchValue: string) => {
      this.searchUser(searchValue);
    });
    this.events.subscribe('chat:searchUserByPhone', (searchValue: string) => {
      this.searchUserByPhone(searchValue);
    });
    this.events.subscribe('chat:loadMoreMessagesForAdminHome', (groups?) => {
      this.loadMoreMessagesForAdminHome(groups);
    });
    this.events.subscribe('chat:getPaymentDetails', () => {
      this.getPaymentDetails();
    });
    this.events.subscribe('chat:removeLastMsgSubscription', () => {
      if(this.lastMsgsSub) {
        console.log('removeLastMsgSucscription...');
        this.lastMsgsSub.unsubscribe();
      }
    });
    this.events.subscribe('chat:removeGetMsgsSubscription', () => {
      if(this.getMsgsSub) {
        console.log('removeGetMsgsSubscription...');
        this.getMsgsSub.unsubscribe();
      }
    });


    this.events.subscribe('chat:getUnreadMsgOfAdmin', (uid) => {
      this.getUnreadMsgOfAdmin(uid);
    });
    this.chatRef = this.afs.collection('chats');
  }
  async sendMsg(msg: any, uid: string) {
    console.log('msg in chat service,', msg);
    const lastMsgData = await this.chatRef.doc(uid).valueChanges().pipe(first()).toPromise();
    msg.published = true;
    if (msg.type === 'txt') {
      this.chatRef.doc(uid).update({lastMessage: msg.message, lastMessageAt: msg.createdAt, totalMsgs: lastMsgData.totalMsgs + 1});
    } else if(msg.type === 'order' && msg.status === 'Rejected') {
      this.chatRef.doc(uid).update({lastMessage: 'Your order is Rejected.',
                                          lastMessageAt: msg.createdAt, totalMsgs: lastMsgData.totalMsgs + 1});
    } else if(msg.type === 'order' && msg.status === 'Cancelled') {
      this.chatRef.doc(uid).update({lastMessage: 'Your order is cancelled.',
                                          lastMessageAt: msg.createdAt, totalMsgs: lastMsgData.totalMsgs + 1});
    } else if(msg.type === 'order' && msg.status === 'Confirmed') {
      this.chatRef.doc(uid).update({lastMessage: 'Your order is confirmed.',
                                          lastMessageAt: msg.createdAt, totalMsgs: lastMsgData.totalMsgs + 1});
    } else if(msg.type === 'order' && msg.status === 'Dispatched') {
      this.chatRef.doc(uid).update({lastMessage: 'Your order is dispatched.',
                                          lastMessageAt: msg.createdAt, totalMsgs: lastMsgData.totalMsgs + 1});
    } else if(msg.type === 'order' && msg.status === 'Delivered') {
      this.chatRef.doc(uid).update({lastMessage: 'Your order is delivered.',
                                          lastMessageAt: msg.createdAt, totalMsgs: lastMsgData.totalMsgs + 1});
    } else if(msg.type === 'order' && msg.status === 'Returned') {
      this.chatRef.doc(uid).update({lastMessage: 'Your order is returned.',
                                          lastMessageAt: msg.createdAt, totalMsgs: lastMsgData.totalMsgs + 1});
    } else if(msg.type === 'order' && msg.status === 'PaymentMsg') {
      this.chatRef.doc(uid).update({lastMessage: 'Payment is successful.',
                                          lastMessageAt: msg.createdAt, totalMsgs: lastMsgData.totalMsgs + 1});
    } else if(msg.type === 'order' && msg.status === 'PaymentRequest') {
      this.chatRef.doc(uid).update({lastMessage: 'Please do the payment of your order.',
                                          lastMessageAt: msg.createdAt, totalMsgs: lastMsgData.totalMsgs + 1});
    } else if(msg.type === 'order' && msg.status === 'deliveryStarted') {
      this.chatRef.doc(uid).update({lastMessage: 'Delivery has started of this order.',
                                          lastMessageAt: msg.createdAt, totalMsgs: lastMsgData.totalMsgs + 1});
    }
    if (msg.author === 'user') {
      if (lastMsgData.adminActive === false) {
        await this.chatRef.doc(uid).collection('messages').add(msg);
        this.chatRef.doc(uid).update({unreadMsgs: lastMsgData.unreadMsgs + 1});
      } else {
        msg.isRead = true;
        await this.chatRef.doc(uid).collection('messages').add(msg);
      }
    } else {
      if (lastMsgData.userActive === false) {
        await this.chatRef.doc(uid).collection('messages').add(msg);
        this.chatRef.doc(uid).update({unreadAdminMsgs: lastMsgData.unreadAdminMsgs + 1});
      } else {
        msg.isRead = true;
        await this.chatRef.doc(uid).collection('messages').add(msg);
      }
    }
  }
  async getTotalMsg(uid: string) {
    const chatData = await this.chatRef.doc(uid).valueChanges().pipe(first()).toPromise();
    console.log('chatData', chatData);
    return chatData.totalMsgs;
  }
  getMsgs(uid: string, role: string) {
   this.getMsgsSub = this.afs.collection('chats').doc(uid).collection('messages', ref => ref.orderBy('createdAt', 'desc').limit(30))
    .snapshotChanges().subscribe(response => {
      if (!response.length) {
        console.log('No msgs');
        return false;
      }
      this.allMsgs = [];
      this.firstResponse = response[response.length - 1].payload.doc;
      for (const msg of response) {
        this.allMsgs.push({msgData: msg.payload.doc.data(), id: msg.payload.doc.id});
        if(role === 'admin') {
          this.afs.collection('chats').doc(uid).collection('messages').doc(msg.payload.doc.id).update({isRead: true});
        }
      }
      if(role === 'admin') {
        this.chatRef.doc(uid).update({unreadMsgs: 0});
      } else {
        this.chatRef.doc(uid).update({unreadAdminMsgs: 0});
      }
      this.events.publish('chat:publishMsgs', this.allMsgs.reverse());
    });
  }
  async getMoreMsgs(uid: string) {
    this.afs.collection('chats').doc(uid).collection('messages', ref => ref.orderBy('createdAt', 'desc')
    .limit(30).startAfter(this.firstResponse)).snapshotChanges().pipe(first()).subscribe(response => {
      if (!response.length) {
        console.log('No msgs');
        this.events.publish('chat:noMoreMsgs');
        return false;
      }
      this.firstResponse = response[response.length - 1].payload.doc;
      for (const msg of response) {
        this.allMsgs.unshift({msgData: msg.payload.doc.data(), id: msg.payload.doc.id});
      }
      this.events.publish('chat:publishMoreMsgs', this.allMsgs);
    });
  }
  async getLastMsgs(groups?) {
    console.log('in getLastMsgs');
    this.lastMsgsData = [];
    let lastMsgRef;
    if (groups && groups.length) {
      let usersId=[];
      let usersDocs: any = await this.afs.collection('users', ref => ref
        .where('groups', 'array-contains-any', groups));
      let allUsersref: Subscription = await usersDocs.get().subscribe(async (querySnapshot: any) => {
        querySnapshot.forEach(async (doc) => {
          usersId.push(doc.id);
        });
        allUsersref.unsubscribe();
        console.log('usersId', usersId);
      lastMsgRef = await this.afs.collection('chats', ref => ref
      //.orderBy('lastMessageAt', 'desc')
      .where(firebase.firestore.FieldPath.documentId(), 'in', usersId)
      .limit(this.configService.environment.scrollLimit));
      const lastMsgs = lastMsgRef.snapshotChanges();
      this.lastMsgsSub = lastMsgs.subscribe((res: any) => {
        this.lastResponseForAdminMsgs = res[res.length - 1].payload.doc;
        for (let msg of res) {
          const index = this.lastMsgsData.findIndex(m => m.id === msg.payload.doc.id);
          const data = {id: msg.payload.doc.id, ...msg.payload.doc.data()};
          if(index === -1) {
            this.lastMsgsData.push(data);
          } else {
            this.lastMsgsData[index] = data;
          }
        }
        this.events.publish('chat:publishLastMsgs', this.lastMsgsData);
      });
    })
    } else {
      lastMsgRef = await this.afs.collection('chats', ref => ref
      .orderBy('lastMessageAt', 'desc')
      .limit(this.configService.environment.scrollLimit));
      const lastMsgs = lastMsgRef.snapshotChanges();
      this.lastMsgsSub = lastMsgs.subscribe((res: any) => {
        this.lastResponseForAdminMsgs = res[res.length - 1].payload.doc;
        for (let msg of res) {
          const index = this.lastMsgsData.findIndex(m => m.id === msg.payload.doc.id);
          const data = {id: msg.payload.doc.id, ...msg.payload.doc.data()};
          if(index === -1) {
            this.lastMsgsData.push(data);
          } else {
            this.lastMsgsData[index] = data;
          }
        }
        this.events.publish('chat:publishLastMsgs', this.lastMsgsData);
      });
    }
  }

  async loadMoreMessagesForAdminHome(groups) {
    console.log('in loadMoreMessagesForAdminHome');
    try{
      if (groups && groups.length) {
        let usersId=[];
        let usersDocs: any = await this.afs.collection('users', ref => ref
          .where('groups', 'array-contains-any', groups))
          .snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data as {} };
            }))
          ).pipe(first()).toPromise();
          for (const userDoc of usersDocs) {
            usersId.push(userDoc.id);
          }
          this.lastMsgsSub = this.afs.collection('chats', ref => ref
          .orderBy('lastMessageAt', 'desc')
          .where(firebase.firestore.FieldPath.documentId(), 'in', usersId)
          .limit(this.configService.environment.scrollLimit)
          .startAfter(this.lastResponseForAdminMsgs))
          .snapshotChanges()
          .subscribe((response: any) => {
            if (!response.length) {
              console.log('No Data Available');
              this.events.publish('chat:msgsForAdminHomeLimitReached');
              return false;
            } 
            this.lastResponseForAdminMsgs = response[response.length - 1].payload.doc;
            for (let msg of response) {
              if(this.lastMsgsData.findIndex(m => m.id === msg.payload.doc.id) === -1) {
                this.lastMsgsData.push({id: msg.payload.doc.id, ...msg.payload.doc.data()});
              }
            }
            this.events.publish('chat:publishMoreLastMsgs', this.lastMsgsData);
          });
      } else {
        this.lastMsgsSub = this.afs.collection('chats', ref => ref
        .orderBy('lastMessageAt', 'desc')
        .limit(this.configService.environment.scrollLimit)
        .startAfter(this.lastResponseForAdminMsgs))
        .snapshotChanges()
        .subscribe((response: any) => {
          if (!response.length) {
            console.log('No Data Available');
            this.events.publish('chat:msgsForAdminHomeLimitReached');
            return false;
          } 
          this.lastResponseForAdminMsgs = response[response.length - 1].payload.doc;
          for (let msg of response) {
            if(this.lastMsgsData.findIndex(m => m.id === msg.payload.doc.id) === -1) {
              this.lastMsgsData.push({id: msg.payload.doc.id, ...msg.payload.doc.data()});
            }
          }
          this.events.publish('chat:publishMoreLastMsgs', this.lastMsgsData);
        });
      }
    }catch(err) {
      console.dir(err);
    }
  }
  getUnreadMsgOfAdmin(uid: string) {
    try {
      console.log('in getUnreadMsgOfAdmin...');
        this.afs.collection('chats').doc(uid).valueChanges().subscribe((response: any) => {
          console.log('getUnreadMsgOfAdmin number', response.unreadAdminMsgs);
          this.events.publish('chat:publishUnreadMsgOfAdmin', response.unreadAdminMsgs);
        });
    } catch (error) {
      console.dir(error);
    }
    
  }
  makeadminActiveTrue(uid: string) {
    this.chatRef.doc(uid).update({adminActive: true});
  }
  makeadminActiveFalse(uid: string) {
    this.chatRef.doc(uid).update({adminActive: false});
  }
  makeUserActiveTrue(uid: string) {
    this.chatRef.doc(uid).update({userActive: true});
  }
  makeUserActiveFalse(uid: string) {
    this.chatRef.doc(uid).update({userActive: false});
  }
  async getPaymentDetails() {
    const paymentData = await this.afs.collection('info').doc('payment').valueChanges().pipe(first()).toPromise();
    this.events.publish('chat:publishPaymentDetails', paymentData);
  }

  async searchUser(searchValue: string) {
    let searchMsgsData = [];
    const lastMsgRef = await this.afs.collection('chats', ref => ref
    .orderBy('name')
    .startAt(searchValue.charAt(0).toUpperCase() + searchValue.slice(1))
    .endAt(searchValue.charAt(0).toUpperCase() + searchValue.slice(1)+"\uf8ff"));
    const lastMsgs = lastMsgRef.snapshotChanges();
    let searchMsgsSub = lastMsgs.subscribe(async (res: any) => {
      for (let msg of res) {
        if(searchMsgsData.findIndex(m => m.id === msg.payload.doc.id) === -1) {
          searchMsgsData.push({id: msg.payload.doc.id, ...msg.payload.doc.data()});
        }
      }
      searchMsgsSub.unsubscribe()
      const lastMsgRef2 = await this.afs.collection('chats', ref => ref
      .orderBy('name')
      .startAt(searchValue.toLowerCase())
      .endAt(searchValue.toLowerCase()+"\uf8ff"));
      const lastMsgs2 = lastMsgRef2.snapshotChanges();
      let searchMsgsSub2 = lastMsgs2.subscribe((res: any) => {
        for (let msg of res) {
          if(searchMsgsData.findIndex(m => m.id === msg.payload.doc.id) === -1) {
            searchMsgsData.push({id: msg.payload.doc.id, ...msg.payload.doc.data()});
          }
        }
        searchMsgsSub2.unsubscribe()
        this.events.publish('chat:publishLastMsgs', searchMsgsData);
      });
    
      });
  }

  async searchUserByPhone(searchValue: string) {
    let searchMsgsData = [];
    const lastMsgRef = await this.afs.collection('chats', ref => ref
    .orderBy('userPhoneNo')
    .startAt(searchValue.toLowerCase())
    .endAt(searchValue.toLowerCase()+"\uf8ff"));
    const lastMsgs = lastMsgRef.snapshotChanges();
    let searchMsgsSub = lastMsgs.subscribe((res: any) => {
      for (let msg of res) {
        if(searchMsgsData.findIndex(m => m.id === msg.payload.doc.id) === -1) {
          searchMsgsData.push({id: msg.payload.doc.id, ...msg.payload.doc.data()});
        }
      }
      searchMsgsSub.unsubscribe()
      this.events.publish('chat:publishLastMsgs', searchMsgsData);
    });
  
  }

  async getLastWhatsappMsg(chatId){
    let lastWhatsappMsg: any = await this.afs.collection('chats').doc(chatId).collection('messages', ref => ref
      .orderBy('createdAt', 'desc')
      .where('source.name', '==', 'whatsapp').limit(1))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data as {} };
        }))
      ).pipe(first()).toPromise();
      return lastWhatsappMsg[0];
  }

  async sendMsgOnWhatsapp(details){
    let adminTemplate = firebase.functions().httpsCallable('whatsappExpress-sendAdminMsg');
    const res = await adminTemplate(details);
    if(res.data.success && res.data.success === true) {
      console.log('msg send with res:', res);
      return true;
    }
    else{
      console.log('msg send not send with res:', res);
      return false;
    }
  }

  async sendImgOnWhatsapp(uid: string, msg: any, imageResponse, phoneNo) {
    let chatImage = {
      url: null,
      size: null,
      uploadedAt: null,
      userId: null
    };
    let msgRef;
    msg.imageCount = imageResponse.length;
    const lastMsgData: any = await this.afs.collection('chats').doc(uid).valueChanges().pipe(first()).toPromise();
      if (lastMsgData.userActive === false) {
        msgRef = await this.afs.collection('chats').doc(uid).collection('messages').add(msg);
        this.afs.collection('chats').doc(uid).update({unreadAdminMsgs: lastMsgData.unreadAdminMsgs + 1});
      } else {
        msg.isRead = true;
        msgRef = await this.afs.collection('chats').doc(uid).collection('messages').add(msg);
      }
    console.log('msg.images.length', imageResponse.length);
    // this.events.publish('media:showUnsavedImages', msgRef.id, imageResponse);
    for ( let i = 0; i < imageResponse.length; i++) {
      console.log('i in loop:', i);
      chatImage.url = "";
      chatImage.size = imageResponse[i].size;
      chatImage.uploadedAt = new Date();
      chatImage.userId = uid;
      const mediaDocRef = await this.afs.collection('media').doc('images').collection('chats').add(chatImage);
      let imgType  = this.sharedService.getImageType(imageResponse[i].url);
      const imgRef: any = this.fbStorage.ref(`chats/${uid}/messages/${msgRef.id}/images/` + mediaDocRef.id + imgType);
      await imgRef.putString(imageResponse[i].url, 'data_url');
    }
    this.afs.collection('chats').doc(uid).update({lastMessage: 'Uploaded an image, click here to see details.',
                                                  lastMessageAt: msg.createdAt, totalMsgs: lastMsgData.totalMsgs + 1});
    // this.events.publish('media:chatImageSuccess');
    let sendAdminMsg = firebase.functions().httpsCallable('whatsappExpress-sendAdminMsg');
    const res = await sendAdminMsg({userId: uid, phoneNo, msgId: msgRef.id, fileName: '', type: 'image'});
    if(res.data.success && res.data.success === true) {
      console.log('msg send with res:', res);
      return true;
    }
    else{
      console.log('msg send not send with res:', res);
      return false;
    }
          
  }

  removeSubscriptions() {
    this.events.unsubscribe('chat:sendMsg');
    this.events.unsubscribe('chat:getMsgs');
    this.events.unsubscribe('chat:getMoreMsgs');
    this.events.unsubscribe('chat:getLastMsgs');
    this.events.unsubscribe('chat:getPaymentDetails');
  }
}
