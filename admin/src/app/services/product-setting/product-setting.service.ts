import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductSettingService {

  constructor(
    private afs: AngularFirestore
  ) { }

  async getProductSettings() {
    try {
      let data: any = [];
      let docRef = this.afs.collection("settings").doc("product");
      data = await docRef.valueChanges().pipe(first()).toPromise();
      return data;
    }
    catch (err) {
      console.log("Error getting product settings: " + err);
      return false;
    }
  }

  async saveProductSettings(data: any) {
    try {
      let docRef = this.afs.collection("settings").doc("product");
      docRef.get().toPromise().then(async (doc) => {
        if (doc.exists) {
          await docRef.update(data);
        } else {
          await docRef.set(data);
        }
      });
      return true;
    }
    catch (err) {
      console.log("Error saving product settings: " + err);
      return false;
    }
  }

}
