import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

constructor(private afs: AngularFirestore) { }

async getAllQueries() {
  try {
    // tslint:disable-next-line: max-line-length
    const docWithId: any = this.afs.collection('contactUs', ref => ref.orderBy('createdAt', 'desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data: any = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    const docs: any = await docWithId.pipe(first()).toPromise();
    return docs;
  } catch (error) {
    console.log(error);
  }
}

  async saveContactPgDetails(data: any) {
    console.log("ContactPgDetails", data);
    try {
      const docRef = this.afs.collection('settings').doc('contactUs');
      docRef.get().toPromise().then(async (doc) => {
        if (doc.exists) {
          await docRef.update(data);
        } else {
          await docRef.set(data);
        }
      })
      return true;
    } catch (error) {
      console.log("contactUs error", error);
    }
  }


async getContactPgDetails() {
  try {
    const doc: any = this.afs.collection('settings').doc('contactUs').valueChanges().pipe(first()).toPromise();
    return doc;
  } catch (error) {
    console.log(error);
  }
}


}
