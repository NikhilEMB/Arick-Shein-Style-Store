import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  constructor(private afs: AngularFirestore) { }


  async setProductAttributes(data: any) {
    // console.warn(data);
    return new Promise(async (resolve, reject) => {
      const docRef = this.afs.collection('attributes').doc('product');
      docRef.get().toPromise().then(async (doc) => {
        if (doc.exists) {
          console.log('exists');
          docRef.update(data);
          resolve(data);

        } else {
          console.log('not exists');
          docRef.set(data);
          resolve(data);
        }

      }).catch((error) => {
        console.error('your error', error);
        reject(data);
      })
      // resolve(true)
    })
  }

  async getProductAttributes() {
    return new Promise(async (resolve, reject) => {
      let data: any;
      const getDocRef = this.afs.collection('attributes').doc('product');
      data = await getDocRef.valueChanges().pipe(first()).toPromise();
      resolve(data);
    })
  }


}
