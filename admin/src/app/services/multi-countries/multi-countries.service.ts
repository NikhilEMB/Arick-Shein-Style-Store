import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MultiCountriesService {

  constructor(private afs: AngularFirestore) { }

  async getMultiCountries() {
    try {
      let data = await this.afs.collection('features').doc('multiCountries').valueChanges().pipe(first()).toPromise();      // console.log(data);
      return data;
    }
    catch (err) {
      console.log('ERROR:', err);
    }
  }

  async saveMultiCountries(dataObj) {
    try {
      await this.afs.collection('features').doc('multiCountries').update(dataObj);
      return true;
    }
    catch (err) {
      console.log('ERROR', err);
    }
  }

}
