import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Events, AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, first } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private afs: AngularFirestore,
    private events: Events,
    private fbStorage: AngularFireStorage,
    private storage: Storage) { }
  initializeSubscriptions() {
    this.events.subscribe('delivery:getAllOrdersOfDeliveryAgent', (uid) => {
      this.getAllOrdersOfDeliveryAgent(uid);
    });
    this.events.subscribe('delivery:updateLatLongOfDeliveryAgent', (lat, lng) => {
      this.updateLatLongOfDeliveryAgent(lat, lng);
    });
    this.events.subscribe('delivery:updateDeliveryStatus', (oid, status) => {
      this.updateDeliveryStatus(oid, status);
    });
    this.events.subscribe('delivery:getLatestLatLngOfDeliveryAgent', (agentId) => {
      this.getLatestLatLngOfDeliveryAgent(agentId);
    });
    this.events.subscribe('delivery:startDelivery', (orderId, address) => {
      this.startDelivery(orderId, address);
    });
    this.events.subscribe('delivery:setDeliveryPartnerSetting', (settings, deliveryPartnerChoice) => {
      this.setDeliveryPartnerSetting(settings, deliveryPartnerChoice);
    });
    this.events.subscribe('delivery:getDeliveryPartnerSetting', (deliveryPartnerChoice) => {
      this.getDeliveryPartnerSetting(deliveryPartnerChoice);
    });
    this.events.subscribe('delivery:getDeliveryAgentName', (deliveryAgentId) => {
      this.getDeliveryAgentName(deliveryAgentId);
    });
  }
  async startDelivery(orderId: number, address) {
    try {
      if (!address.lat) {
        let getLatLng = firebase.functions().httpsCallable('location-getLatLng');
        getLatLng({
          deliveryAddress: address.address,
          orderId: orderId
        }).then((res) => {
          console.log('response form server...', res);
          const status = res.data.status ? res.data.status : 'failed';
          if (status === 'OK') {
            this.updateDeliveryStatus(orderId, 'inProgress', res.data.results[0].geometry.location);
            this.events.publish('delivery:startDeliverySuccess', orderId, res.data.results[0].geometry.location);
          } else if (status === 'ZERO_RESULTS') {
            this.events.publish('delivery:startDeliveryUnsuccessful', "Delivery Address is not existed!");
          } else {
            this.events.publish('delivery:startDeliveryUnsuccessful', "There is some problem in fetching address location. Please try again later.");
          }
        }).catch((error) => {
          console.log(error);
        })
      } else {
        this.events.publish('delivery:startDeliverySuccess', orderId, { lat: address.lat, lng: address.lng });
        this.updateDeliveryStatus(orderId, 'inProgress', { lat: address.lat, lng: address.lng });
      }

    } catch (error) {
      console.dir(error);
    }
  }
  async getAllOrdersOfDeliveryAgent(uid: string) {
    try {
      const orderRef = this.afs.collection('orders', ref => ref
        .orderBy('createdAt', 'desc')
        .where('deliveryAgentId', '==', uid));
      const orderData: any = await orderRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      orderData.subscribe((orders) => {
        if (!orders.length) {
          this.events.publish('delivery:noOrdersOfDeliveryAgent');
          return false;
        } else {
          console.log('getAllOrdersOfDeliveryAgent', orders);
          this.events.publish('delivery:publishAllOrdersOfDeliveryAgent', orders);
        }
      })
    } catch (error) {
      console.dir(error);
    }
  }
  async updateDeliveryStatus(oid, status, location?) {
    try {
      const orderRef = this.afs.collection('orders', ref => ref.where('orderId', '==', oid));
      const orderData: any = await orderRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      if (status === 'inProgress') {
        await this.afs.collection('orders').doc(orderData[0].id).update({ deliveryStatus: status, status: 'Dispatched' });
        const deliverStartedMsg = {
          author: 'admin',
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          isRead: true,
          orderId: orderData[0].orderId,
          published: true,
          status: 'deliveryStarted',
          type: 'order',
          agentId: orderData[0].deliveryAgentId,
          deliveryLatLng: location
        }
        this.events.publish('chat:sendMsg', deliverStartedMsg, orderData[0].userId);
      }
      if (status === 'delivered') {
        await this.afs.collection('orders').doc(orderData[0].id).update({ deliveryStatus: status, status: 'Delivered' });
        this.events.publish('delivery:finishedNavigationSuccess');
      }
    } catch (error) {
      console.dir(error);
    }
  }
  async updateLatLongOfDeliveryAgent(lat, lng) {
    this.storage.get('uid').then(async (uid) => {
      try {
        await this.afs.collection('users').doc(uid).update({
          latitude: lat,
          longitude: lng
        });
      } catch (error) {
        console.dir(error);
      }
    });
  }
  getLatestLatLngOfDeliveryAgent(agentId) {
    try {
      const agentRef = this.afs.collection('users').doc(agentId);
      const agentSnap = agentRef.valueChanges();
      agentSnap.subscribe((res: any) => {
        console.log('res', res);
        this.events.publish('delivery:publishLatestLatLngOfDeliveryAgent', res.latitude, res.longitude);
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async setDeliveryPartnerSetting(settings, deliveryPartnerChoice) {
    try {
      await this.afs.collection('delivery').doc(deliveryPartnerChoice).set(settings);
      this.events.publish('delivery:setDeliveryPartnerSettingSuccess', deliveryPartnerChoice);
    } catch (error) {
      this.events.publish('delivery:setDeliveryPartnerSettingFailure', error);
      console.log(error);
    }
  }

  async getDeliveryPartnerSetting(deliveryPartnerChoice) {
    try {
      const doc = await this.afs.collection('delivery').doc(deliveryPartnerChoice).valueChanges().pipe(first()).toPromise();
      this.events.publish('delivery:getDeliveryPartnerSettingSuccess', doc);
    } catch (error) {
      this.events.publish('delivery:getDeliveryPartnerSettingFailure', error || 'Oops! Some error occured, Please try again later.');
      console.log(error);
    }
  }

  async getDeliveryAgentName(id) {
    try {
      let currentData = await this.afs.collection('users').doc(id).valueChanges().pipe(first()).toPromise();
      this.events.publish('delivery:getDeliveryAgentNameSuccess', currentData);
    } catch (error) {
      // console.log(error)
    }
  }

}
