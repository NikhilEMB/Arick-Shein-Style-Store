import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import * as firebase from 'firebase';
import { map, first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PriceRequestService {
  reqSubs: Subscription;
  constructor(private events: Events,
              private afs: AngularFirestore,
              private storage: Storage) { }

  initializeSubscriptions() {
    this.events.subscribe('price-req:sendPriceRequest', (uid) => {
      this.sendPriceRequest(uid);
    });
    this.events.subscribe('price-req:getAllPriceRequests', () => {
      this.getAllPriceRequests();
    });
    this.events.subscribe('price-req:rejectPriceRequest', (uid) => {
      this.rejectPriceRequest(uid);
    });
    this.events.subscribe('price-req:acceptPriceRequest', (uid) => {
      this.acceptPriceRequest(uid);
    });
    // this.events.subscribe('price-req:getUserPriceRequestData', (uid) => {
    //   this.getUserPriceRequestData(uid);
    // });

    this.events.subscribe('price-req:removePriceRequestsSubs', () => {
      if(this.reqSubs) {
        this.reqSubs.unsubscribe();
      }
    });
  }

  sendPriceRequest(uid: string) {
    try {
      let priceRequest = firebase.functions().httpsCallable('products-sendPriceRequest');
      priceRequest(uid).then((response) => {
        console.log(response);
        if(response.data.status && response.data.status === 'sent') {
          this.events.publish('price-req:sendPriceRequestSuccess', 'Request has been send succesfully.');
        } else if(response.data.status && response.data.status === 'already_sent') {
          this.events.publish('price-req:sendPriceRequestSuccess', 'Request has been already send.');
        } else {
          this.events.publish('price-req:sendPriceRequestSuccess', 'There is some problem in sending request. Please try again.');
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }

  getAllPriceRequests() {
    try {
      const reqRef = this.afs.collection('priceRequests', ref => ref.orderBy('createdOn', 'desc')).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data as {} };
        }))
      );
      this.reqSubs = reqRef.subscribe((requests) => {
        this.events.publish('price-req:publishAllPriceRequests', requests);
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async rejectPriceRequest(uid: string) {
    try {
      await this.afs.collection('priceRequests').doc(uid).update({
        active: false
      });
      await this.afs.collection('users').doc(uid).update({
        showPrices: false
      });
      this.events.publish('price-req:rejectPriceRequestSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async acceptPriceRequest(uid: string) {
    try {
      let prAccept = firebase.functions().httpsCallable('products-acceptPriceRequest');
      prAccept(uid).then((response) => {
        console.log(response.data);
        if(response.data.status === 'accepted') {
          this.events.publish('price-req:acceptPriceRequestSuccess', 'Prices are now active for this user.');
        } else {
          this.events.publish('price-req:acceptPriceRequestSuccess', 'There is some problem in activating prices. Please try again.');
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }

  // async getUserPriceRequestData(uid) {
  //   try {
  //     const reqData: any = await this.afs.collection('priceRequests').doc(uid).valueChanges().pipe(first()).toPromise();
  //     if(reqData.hasOwnProperty('active')) {
  //       this.storage.set('')
  //     }
  //   } catch (error) {
  //     console.dir(error);
  //   }
  // }
}
