import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomCodeService {

  constructor(private afs: AngularFirestore) { }

  async setCustomCode(settings){
    return new Promise(async (resolve, reject) => {
      try {
        await this.afs.collection('settings').doc('customCode').set(settings);
        resolve(true);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getCustomCode(){
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.afs.collection('settings').doc('customCode').valueChanges().pipe(first()).toPromise());
      } catch (error) {
        console.log(error);
      }
    });
  }

}
