import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ProductAddonsService {

  constructor(private afs: AngularFirestore) { }

  async setAddons(id: any, addOns: any) {
    return new Promise(async (resolve) => {
      try {
        if (id) {
          await this.afs.collection('templates').doc(id).update(addOns);
        } else {
          await this.afs.collection('templates').add(addOns);
        }
        resolve(true);
      } catch (err) {
        console.log('err:', err);
        resolve(false);
      }
    })

  }

  async getAddOns() {
    return new Promise(async (resolve) => {
      try {
        let addOnsArray = [];
        const docRef = this.afs.collection('templates', ref => ref.where('type', '==', 'product-addOn'));

        docRef.get().subscribe((snapShot) => {
          snapShot.forEach((doc) => {
            addOnsArray.push({ id: doc.id, ...doc.data() });
          });
          resolve(addOnsArray);
        });
      }
      catch (err) {
        console.log('err:', err);
        resolve(false);
      }
    })
  }

  async deleteAddOn(id: any) {
    return new Promise(async (resolve) => {
      try {
        if (id) {
          await this.afs.collection('templates').doc(id).delete();
          resolve(true);
        }
      } catch (err) {
        console.log('err:', err);
        resolve(false);
      }
    })

  }
}
