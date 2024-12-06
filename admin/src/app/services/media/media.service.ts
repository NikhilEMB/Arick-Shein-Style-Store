import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import { FirebaseStorage } from '@angular/fire';
import { Observable } from 'rxjs';
import { map, first, take } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProductImage } from 'src/app/models/image';
import { ChatImage } from 'src/app/models/chat-image';
import { ChatMsg } from 'src/app/models/message';
import { firestore } from 'firebase';
import { Storage } from '@ionic/storage';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  mediaRef: AngularFirestoreCollection<unknown>;
  chatImage: ChatImage = {
    url: null,
    size: null,
    uploadedAt: null,
    userId: null
  };
  msgId: string;
  uid: string = '';
  constructor(private afs: AngularFirestore, private events: Events, private fbStorage: AngularFireStorage, private storage: Storage, private sharedService: SharedService) { }
  initializeSubscriptions() {
      this.events.subscribe('media:addChatImage', (uid, msg, imageResponse) => {
        console.log('in media service 1');
        this.addChatImage(uid, msg, imageResponse);
      });
      this.events.subscribe('media:broadcastMessage', (imageResponse, msg) => {
        console.log('in media service 2');
        this.broadcastMessage(imageResponse, msg);
      });
      this.mediaRef = this.afs.collection('media');
      
      this.events.subscribe('media:PermissionToBroadcast', () => {
        this.PermissionToBroadcast();
      });

      this.events.subscribe('media:getAllBroadcastMessages', () => {
        this.getAllBroadcastMessages();
      });
    }


    async addChatImage(uid: string, msg: any, imageResponse) {
      const listofImageId: string[] = [];
      const listOfDownloadUrls: string[] = [];
      let msgRef;
      msg.imageCount = imageResponse.length;
      const lastMsgData: any = await this.afs.collection('chats').doc(uid).valueChanges().pipe(first()).toPromise();
      if(msg.author === "user") {
        if (lastMsgData.adminActive === false) {
          msgRef = await this.afs.collection('chats').doc(uid).collection('messages').add(msg);
          this.afs.collection('chats').doc(uid).update({unreadMsgs: lastMsgData.unreadMsgs + 1});
        } else {
          msg.isRead = true;
          msgRef = await this.afs.collection('chats').doc(uid).collection('messages').add(msg);
        }
        
      } 
      else{
        if (lastMsgData.userActive === false) {
          msgRef = await this.afs.collection('chats').doc(uid).collection('messages').add(msg);
          this.afs.collection('chats').doc(uid).update({unreadAdminMsgs: lastMsgData.unreadAdminMsgs + 1});
        } else {
          msg.isRead = true;
          msgRef = await this.afs.collection('chats').doc(uid).collection('messages').add(msg);
        }
      }
      console.log('msg.images.length', imageResponse.length);
      this.events.publish('media:showUnsavedImages', msgRef.id, imageResponse);
      for ( let i = 0; i < imageResponse.length; i++) {
        console.log('i in loop:', i);
        this.chatImage.url = "";
        this.chatImage.size = imageResponse[i].size;
        this.chatImage.uploadedAt = new Date();
        this.chatImage.userId = uid;
        const mediaDocRef = await this.mediaRef.doc('images').collection('chats').add(this.chatImage);
        let imgType  = this.sharedService.getImageType(imageResponse[i].url);
        const imgRef: any = this.fbStorage.ref(`chats/${uid}/messages/${msgRef.id}/images/` + mediaDocRef.id + imgType);
        await imgRef.putString(imageResponse[i].url, 'data_url');
      }
      this.afs.collection('chats').doc(uid).update({lastMessage: 'Uploaded an image, click here to see details.',
                                                    lastMessageAt: msg.createdAt, totalMsgs: lastMsgData.totalMsgs + 1});
      this.events.publish('media:chatImageSuccess');
            
    }
    async broadcastMessage(imageResponse: any, msg: any) {
      try {
        console.log('bm', msg);
        let broadcastDocId = this.afs.collection('broadcast').ref.doc().id;
        console.log('broadcastDocId', broadcastDocId);
        if(imageResponse.length !== 0) {
          for ( let j = 0; j < imageResponse.length; j++) {
            if(imageResponse[j].url.includes('data:image/jpeg;base64,')  || imageResponse[j].url.includes('data:image/jpg;base64,')  || imageResponse[j].url.includes('data:image/png;base64,')  || imageResponse[j].url.includes('data:image/gif;base64,')) {
              let imgType  = this.sharedService.getImageType(imageResponse[j].url);
              const imgRef: any = this.fbStorage.ref(`broadcast/${broadcastDocId}/images/` + new Date().getTime().toString() + imgType);
              await imgRef.putString(imageResponse[j].url, 'data_url');
              const downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
              msg.images.push({url: downloadURL});
            }
            else{
              msg.images.push({url: imageResponse[j].url});
            }
          }
          await this.afs.collection('broadcast').doc(broadcastDocId).set(msg);
        } else {
          await this.afs.collection('broadcast').doc(broadcastDocId).set(msg);
        }
        this.events.publish('media:broadcastMessageSuccess')        
      } catch (error) {
        console.dir(error);
        this.events.publish('media:broadcastMessageFailure');
      }
    }
    
  async PermissionToBroadcast() {
    this.afs.collection('broadcast', ref => ref
      .orderBy('createdAt', 'desc')
      .limit(1)
    ).snapshotChanges().pipe(first())
      .subscribe((response) => {
        this.events.publish('media:PermissionToBroadcastSuccess', response[0].payload.doc.data());
      }, error => {
        this.events.publish('media:PermissionToBroadcastFailure', 'Something Went wrong');
      });
  }

  getAllBroadcastMessages(){
    try {
      const allMsgRef = this.afs.collection('broadcast', ref => ref.orderBy('createdAt', 'desc'));
      const allMessages = allMsgRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      allMessages.subscribe((res) => {
          this.events.publish('media:publishAllBroadcastMessages', res);
      });
    } catch (err) {
      console.dir(err);
    }
  }


  removeSubscriptions(){
    this.events.unsubscribe('media:addChatImage');
    this.events.unsubscribe('media:broadcastMessage');
    this.events.unsubscribe('media:PermissionToBroadcast');
  }

}
