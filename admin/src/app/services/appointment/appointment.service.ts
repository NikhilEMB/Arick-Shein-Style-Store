import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private afs: AngularFirestore, private storage: Storage) { }

  async getAppointments() {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.afs.collection('appointments', ref => ref
          .orderBy('createdAt', 'desc')).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          ).pipe(first()).toPromise());
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getVendorAppointments(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.afs.collection('features').doc('multivendor').collection('vendors').doc(userId).collection('appointments', ref => ref
          .orderBy('createdAt', 'desc')).valueChanges().pipe(first()).toPromise());
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getVendorName(id: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let currentData = await this.afs.collection('users').doc(id).valueChanges().pipe(first()).toPromise();
        resolve(currentData)
      } catch (error) {
        console.log(error);
      }
    });
  }

  async returnOrderDetailsWithOrderId(orderId: number) {
    try {
      let userId = await this.storage.get('uid')
      let role = await this.storage.get('userRole')
      if (role == 'vendor') {
        const orderData: any = await this.afs.collection('appointments', ref => ref
          .where('appointmentId', '==', orderId).where('vendorId', '==', userId))
          .snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          ).pipe(first()).toPromise()
        return orderData
      }
      else {
        const orderData: any = await this.afs.collection('appointments', ref => ref
          .where('appointmentId', '==', orderId))
          .snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          ).pipe(first()).toPromise()
        return orderData
      }
    } catch (error) {
      console.dir(error);
    }
  }

  async getAppoinmentSettings() {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await this.afs.collection('features').doc('appointment')
        data.get().toPromise().then((doc) => {
          if (doc.exists){
            resolve(doc.data())
          }
          else{
            resolve(false)
          }
        })
      } catch (error) {
        console.log(error);
      }
    });
  }


  async saveAppointmentSettings(daysData, maxDaysData) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.afs.collection('features').doc('appointment').set({days: daysData, maxDays: maxDaysData})
        resolve(true)
      } catch (error) {
        console.log(error);
      }
    });
  }

  async rejectAppoinment(id: any) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.afs.collection('appointments').doc(id).update({status: 'rejected'})
        resolve(true)
      } catch (error) {
        console.log(error);
      }
    });
  }


}
