import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomLanguageService {

  constructor(private afs: AngularFirestore) { }

  async setCustomLanguage(formData) {
    let platform = formData.platform;
    let languageCode = formData.languageCode;
    let parentKeyName = formData.parentKeyName;
    let childKeyName = formData.childKeyName;
    let message = formData.message;
    let msgObject = {};
    msgObject[childKeyName] = message;

    return new Promise(async (resolve, reject) => {
      // const docRef = await this.afs.collection('advanced').doc('website').collection('en').doc('SHOP')
      const docRef = await this.afs.collection('advanced').doc(platform).collection(languageCode).doc(parentKeyName);
      docRef.get().toPromise().then(async (doc) => {
        if (doc.exists) {
          // console.warn('exist');
          docRef.update(msgObject);
        } else {
          // console.warn("not exist");
          docRef.set(msgObject);
        }
      }).catch((error) => {
        console.error("Your Error Message", error);
      })
      resolve(true);
    })
  }

  async getCustomLanguage(data: any) {
    let getPlatform = data.getPlatform;
    let getLanguageCode = data.getLanguageCode;
    let getParentKey = data.getParentKeyName;
    // console.warn(data.value);

    return new Promise(async (resolve, reject) => {
      let data: any = [];
      const getDocRef = this.afs.collection('advanced').doc(getPlatform).collection(getLanguageCode).doc(getParentKey);
      data = await getDocRef.valueChanges().pipe(first()).toPromise();
      // if(data){
      //   console.log("no Data");

      // }
      resolve(data);

    });
  }

  async updateCustomLanguage(formData, result) {
    let getPlatform = formData.getPlatform;
    let getLanguageCode = formData.getLanguageCode;
    let getParentKey = formData.getParentKeyName;
    // console.warn(formData, result);

    return new Promise(async (resolve, reject) => {
      const ref = this.afs.collection('advanced').doc(getPlatform).collection(getLanguageCode).doc(getParentKey);
      ref.set(result);
      resolve(true);
      // console.log("run");
      
    })
  }

}
