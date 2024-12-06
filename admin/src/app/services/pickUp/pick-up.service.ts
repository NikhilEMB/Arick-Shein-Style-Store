import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PickUpService {

  constructor(private afs: AngularFirestore, private storage: Storage ) { }

  async getUserDetails(id){
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.afs.collection('users').doc(id).valueChanges().pipe(first()).toPromise());
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getWalletSettings(){
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.afs.collection('settings').doc('wallet').valueChanges().pipe(first()).toPromise());
      } catch (error) {
        console.log(error);
      }
    });
  }

  async setPickUpSettings(settings){
    return new Promise(async (resolve, reject) => {
      try {
        let settingsObj = {
          active: settings.active,
          gst: settings.gst,
          deliveryByWeight: {
            baseCost: settings.baseCost,
            baseWeight: settings.baseWeight,
            cost: settings.cost
          },
          deliveryByKm: {
            cost: settings.cost
          },
          weightSlab:{
            active: settings.weightActive,
            slabs: settings.slabs
          }
        }
        console.log('settingsObj:',settingsObj);
        // console.log('kmSlabsObj:',kmSlabsObj);
        console.log('settings:',settings);

        await this.afs.collection('features').doc('pickDrop').set(settingsObj);
        // await this.afs.collection('features').doc('pickDrop').update(kmSlabsObj);
        resolve(true);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getPickUpSettings(){
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.afs.collection('features').doc('pickDrop').valueChanges().pipe(first()).toPromise());
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getPendingOrders(){
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref
        .orderBy('createdAt', 'desc')
        .where('status', '==', 'pending')).valueChanges().pipe(first()).toPromise());
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getPickedOrders(){
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref
        .orderBy('createdAt', 'desc')
        .where('status', 'in', ['picked'])).valueChanges().pipe(first()).toPromise());
      } catch (error) {
        console.log(error);
      }
    });
  }
  
  async getDeliveredOrders(){
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref
        .orderBy('createdAt', 'desc')
        .where('status', 'in', ['delivered'])).valueChanges().pipe(first()).toPromise());
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getCancelledOrders(){
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref
        .orderBy('createdAt', 'desc')
        .where('status', 'in', ['cancelled'])).valueChanges().pipe(first()).toPromise());
      } catch (error) {
        console.log(error);
      }
    });
  }
  
  async getOrderData(id){
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref.where('orderId', '==', id)).valueChanges().pipe(first()).toPromise());
      } catch (error) {
        console.log(error);
      }
    });
  }

  async cancelOrderByAdmin(orderId: number, cancelReason: string, name:string) {
    return new Promise(async (resolve, reject) => {
      try {
        const orderRef = this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref.where('orderId', '==', orderId));
        const orderData: any = await orderRef.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).pipe(first()).toPromise();
  
        let role = await this.storage.get('userRole');
        role = role === 'admin' ? 'Store' : role;
        const updateObj = {
          cancelData: {
            reason: cancelReason,
            by: `${name} (${role})`
          },
          status: 'cancelled'
        }
        await this.afs.collection('features').doc('pickDrop').collection('orders').doc(orderData[0].id).update(updateObj);
        resolve(true)
      } catch (error) {
        console.log(error);
      }
    });
  }

  async changeOrderStatus(id,status){
    return new Promise(async (resolve, reject) => {
      try {
        let order = await this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref.where('orderId', '==', id)).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).pipe(first()).toPromise();
        await this.afs.collection('features').doc('pickDrop').collection('orders').doc(order[0].id).update({status: status})
        resolve(true)
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getAllDeliveryAgents() {
    return new Promise(async (resolve, reject) => {
      try {
        const allDeliveryAgents = await this.afs.collection('users', ref => ref.where('role', '==', 'deliveryAgent')).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).pipe(first()).toPromise();
        resolve(allDeliveryAgents)
      } catch (error) {
        console.log(error);
      }
    })
  }

  async assignDeliveryAgent(agentId, orderId) {
    return new Promise(async (resolve, reject) => {
      try {
        let order = await this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref.where('orderId', '==', orderId)).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).pipe(first()).toPromise();
        await this.afs.collection('features').doc('pickDrop').collection('orders').doc(order[0].id).update({"delivery.agentId": agentId})
        resolve(true)
      } catch (error) {
        console.log(error);
      }
    })
  }

  async getDeliveryAgentName(id){
    return new Promise(async (resolve, reject) => {
      try {
        let currentData = await this.afs.collection('users').doc(id).valueChanges().pipe(first()).toPromise();
        resolve(currentData);
      } catch (error) {
        console.log(error);
      }
    })
  }

  async getOrderLogs(id){
    return new Promise(async (resolve, reject) => {
      try {
        let order = await this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref.where('orderId', '==', id)).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).pipe(first()).toPromise();
        let logData = await this.afs.collection('features').doc('pickDrop').collection('orders').doc(order[0].id).collection('logs', ref => ref.orderBy('time', 'asc')).valueChanges().pipe(first()).toPromise();
        resolve(logData);
      } catch (error) {
        console.log(error);
      }
    });
  }
  
}
