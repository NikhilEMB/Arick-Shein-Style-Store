import { first } from 'rxjs/operators';
import { UserService } from './../user/user.service';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private events: Events,
              private afs: AngularFirestore,
              private fbStorage: AngularFireStorage,
              private storage: Storage,
              private userService: UserService, private sharedService: SharedService) { }

  initializeSubscriptions() {
    this.events.subscribe('feedback:saveFeedback', (desc, images) => {
      this.saveFeedback(desc, images);
    });
    this.events.subscribe('feedback:getFeedbacks', () => {
      this.getFeedbacks();
    });
  }
  async getFeedbacks() {
    try {
      const feedbacks = await this.afs.collection('feedbacks', ref => ref
      .orderBy('createdAt', 'desc')).valueChanges().pipe(first()).toPromise();
      this.events.publish('feedback:publishFeedbacks', feedbacks);
    } catch (error) {
      console.dir(error);
    }
  }
  async saveFeedback(desc: string, images: any) {
    try {
      const name = await this.nameInStorage();
      const uid = await this.uidInStorage();
      const fid = this.afs.collection('feedbacks').ref.doc().id;
      await this.afs.collection('feedbacks').doc(fid).set({
        userName: name,
        userPhone: this.userService.getPhoneNo(),
        userId: uid,
        description: desc,
        images: [],
        createdAt: new Date()
      });
      if (images.length) {
        images.forEach(async (img) => {
          let imgType  = this.sharedService.getImageType(img.url);
          const imgRef: any = this.fbStorage.ref(`feedbacks/${fid}/images/` + new Date().getTime().toString() + imgType);
          await imgRef.putString(img.url, 'data_url');
        });
      }
      this.events.publish('feedback:saveFeedbackSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async nameInStorage() {
    return new Promise((resolve, reject) => {
      this.storage.get('userName').then(name => {
        resolve(name);
      });
    });
  }
  async uidInStorage() {
    return new Promise((resolve, reject) => {
      this.storage.get('uid').then(uid => {
        resolve(uid);
      });
    });
  }
}
