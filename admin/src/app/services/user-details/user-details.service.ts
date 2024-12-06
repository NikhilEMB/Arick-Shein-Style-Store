import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { first,map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private events: Events,
              private afs: AngularFirestore,
              private storage: Storage) { }

  initializeSubscriptions() {
    this.events.subscribe('user-details:getUserOrders', (uid) => {
      this.getUserOrders(uid);
    });
    this.events.subscribe('user-details:getUserAddresses', (uid) => {
      this.getUserAddresses(uid);
    });
  }

  async getUserOrders(uid: string) {
    try {
      let getOrders = firebase.functions().httpsCallable('users-getUserOrders');
      getOrders(uid).then((res) => {
        console.log(res.data);
        this.events.publish('user-details:publishUserOrders', res.data);
      })
    } catch (error) {
      console.dir(error);
    }
  }

  async getUserAddresses(uid: string) {
    try {
      const userAddresses = await this.afs.collection('users').doc(uid).collection('addresses').snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      this.events.publish('user-details:publishUserAddresses', userAddresses);
    } catch (error) {
      console.dir(error);
    }
  }

  async getCartItems(uid){
    return new Promise(async (resolve, reject) => {
      try {
        let currentData = await this.afs.collection('users').doc(uid).collection('cart').valueChanges().pipe(first()).toPromise();
        resolve(currentData);
      } catch (error) {
        console.log(error);
      }
    })
  }

  async getSearchItems(uid){
    return new Promise(async (resolve, reject) => {
      try {
        let currentData = await this.afs.collection('users').doc(uid).collection('analytics').doc('search').collection('data', ref => ref.orderBy('searchedAt', 'desc')).valueChanges().pipe(first()).toPromise();
        resolve(currentData);
      } catch (error) {
        console.log(error);
      }
    })
  }

  async saveUserDetails(uid,userData,addresses){
    return new Promise(async (resolve, reject) => {
      try {
        await this.afs.collection('users').doc(uid).update(userData)
        for (let i = 0; i < addresses.length; i++) {
          let {id, ...data} = addresses[i]
          await this.afs.collection('users').doc(uid).collection('addresses').doc(addresses[i].id).update(data)
        }
        resolve(true);
      } catch (error) {
        console.log(error);
      }
    })
  }

}
