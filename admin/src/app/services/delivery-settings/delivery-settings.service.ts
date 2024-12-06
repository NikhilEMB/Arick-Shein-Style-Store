import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class DeliverySettingsService {
  deliveryRef = this.afs.collection('features').doc('delivery');
  constructor(private events: Events,
    private afs: AngularFirestore,
    private storage: Storage,
    private logglyService: LogglyLoggerService) { }

  initializeSubscriptions() {
    this.events.subscribe('delivery-settings:saveDeliverySettings', (data, type) => {
      this.saveDeliverySettings(data, type);
    });
    this.events.subscribe('delivery-settings:getDeliverySettingsData', () => {
      this.getDeliverySettingsData();
    });
    this.events.subscribe('delivery-settings:getOrderPaymentDetails', (address, products, isGstApplicable) => {
      this.getOrderPaymentDetails(address, products, isGstApplicable);
    });
    this.events.subscribe('delivery-settings:checkPincode', (pincode) => {
      this.checkPincode(pincode);
    });
    this.events.subscribe('delivery-settings:getSlotsWithDate', (date) => {
      this.getSlotsWithDate(date);
    });
    this.events.subscribe('delivery-settings:updateSlot', (data) => {
      this.updateSlot(data);
    });
    this.events.subscribe('delivery-settings:getManageSlots', () => {
      this.getManageSlots();
    });
    this.events.subscribe('delivery-settings:getLatLongFromAddress', (address) => {
      this.getLatLongFromAddress(address);
    });
  }

  async saveDeliverySettings(data: any, type: any) {
    try {
      const deliveryRef = this.afs.collection('features').doc('delivery');
      if (type == 'standard') {
        deliveryRef.get().subscribe(async (doc) => {
          if(doc.exists) {
            await deliveryRef.update(data);
          } else {
            await deliveryRef.set(data);
          }
        });
      } else {
        const customRef = deliveryRef.collection('custom').doc(type);
        customRef.get().subscribe(async (doc) => {
          if(doc.exists) {
            await customRef.update(data);
          } else {
            await customRef.set(data);
          }
        });
      }
      this.events.publish('delivery-settings:saveDeliverySettingsSuccess');
    } catch (error) {
      console.dir(error);
    }
  }
  async getSlotsWithDate(date: any) {
    try {
      const slotsDoc: any = await this.deliveryRef.collection('manageSlots').doc(date).valueChanges().pipe(first()).toPromise();
      this.events.publish('delivery-settings:slotsWithDate', slotsDoc);
    } catch (error) {
      console.dir(error);
      error['location'] = 'delivery-settings-service:getSlotsWithDate';
      this.logglyService.log(error);
    }
  }

  async updateSlot(slotData: any) {
    try {
      const date = slotData.date.toDateString();
      await this.deliveryRef.collection('manageSlots').doc(date).set({ slots: slotData.slots });
      this.events.publish('delivery-settings:slotUpdated');
    } catch (error) {
      console.dir(error);
      error['location'] = 'delivery-settings-service:updateSlot';
      this.logglyService.log(error);
    }

  }

  async getManageSlots() {
    try {
      const manageSlots = await this.deliveryRef.collection('manageSlots').snapshotChanges().pipe(
        map((actions: any) => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      this.events.publish('delivery-settings:publishManageSlots', manageSlots);
    } catch (error) {
      console.dir(error);
      error['location'] = 'delivery-settings-service:getManageSlots';
      this.logglyService.log(error);
    }
  }

  async getDeliverySettingsData() {
    try {
      const deliveryData: any = await this.afs.collection('features').doc('delivery').valueChanges().pipe(first()).toPromise();
      this.events.publish('delivery-settings:publishDeliverySettingsData', deliveryData);
    } catch (error) {
      console.dir(error);
    }
  }

  async deliverySettingsDataInStorage() {
    try {
      const deliveryData: any = await this.afs.collection('features').doc('delivery').valueChanges().pipe(first()).toPromise();
      console.log('deliveryData', deliveryData);
      this.storage.set('deliverySettings', deliveryData);
    } catch (error) {
      console.dir(error);
    }
  }

  async getOrderPaymentDetails(address, products, isGstApplicable) {
    try {
      let orderPaymentDetails = firebase.functions().httpsCallable('orders-getOrderPaymentDetails');
      orderPaymentDetails({ address: address, products: products, isGstApplicable: isGstApplicable }).then((response) => {
        console.log('response orderPaymentDetails', response.data);
        this.events.publish('delivery-settings:publishOrderPaymentDetails', response.data);
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async checkPincode(pincode: number) {
    try {
      const deliveryData: any = await this.afs.collection('features').doc('delivery').valueChanges().pipe(first()).toPromise();
      const pincodes = deliveryData.deliveryPincodes;
      let isAvailable = false;
      for (const p of pincodes) {
        if (p.pincode === pincode) {
          isAvailable = true;
          break;
        }
      }
      if (deliveryData.isAllowAllPincodes) {
        this.events.publish('delivery-settings:pincodeDeliverable');
      } else {
        if (isAvailable) {
          this.events.publish('delivery-settings:pincodeDeliverable');
        } else {
          this.events.publish('delivery-settings:pincodeNotDeliverable');
        }
      }
    } catch (error) {
      console.dir(error);
    }
  }

  async getLatLongFromAddress(address) {
    let latLongObj = firebase.functions().httpsCallable('location-getLatLngFromAddress');
    latLongObj(address).then(async (res) => {
      if (res.data) {
        this.events.publish('delivery-settings:getLatLongFromAddressSuccess', res.data);
      } else {
        this.events.publish('delivery-settings:getLatLongFromAddressFailure');
      }
    });
  }

  async getDeliveryType() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        let currentData = await this.afs.collection('features').doc('delivery').collection('custom').snapshotChanges().pipe(
          map((actions: any) => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, settings: data };
          }))
        ).pipe(first()).toPromise();
        resolve(currentData);
      } catch (error) {
        console.log(error);
      }
    })
  }

  async getDeliveryTypeData(type: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let currentData = await this.afs.collection('features').doc('delivery').collection('custom').doc(type).valueChanges().pipe(first()).toPromise();
        resolve(currentData);
        // this.events.publish('delivery-settings:publishDeliverySettingsData', currentData);
        console.log('currentdata :', currentData);
      } catch (error) {
        console.log(error);
      }
    })
  }

  async deleteDeliverySettings(type: any) {
    try {
      let currentData = await this.afs.collection('features').doc('delivery').collection('custom').doc(type).delete();
    } catch (error) {
      console.log(error);
    }
  }

  async getLocations(){
    return new Promise<any>(async (resolve)=>{
      try {
        let availableLocations = {
          states: [],
          pincodes: []
        };
        let standard: any = await this.deliveryRef.valueChanges().pipe(first()).toPromise();
        let custom = await this.deliveryRef.collection('custom').snapshotChanges().pipe(
          map((actions: any) => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).pipe(first()).toPromise();
        if ('availableLocations' in standard) {
          for (const stateObj of standard.availableLocations.states) {
            availableLocations['states'].push({...stateObj, types:['standard']})
          }
          for (const pincode of standard.availableLocations.pincodes) {
            availableLocations['pincodes'].push({pincode, types:['standard']})
          }
        }
        for (const customType of custom) {
          if ('availableLocations' in customType) {
            for (const stateObj of customType.availableLocations.states) {
              let obj = availableLocations['states'].find(element=> element.stateCode == stateObj.stateCode);
              let index = availableLocations['states'].indexOf(obj)
              if (index > -1) {
                availableLocations['states'][index].types.push(customType.id);
              } else {
                availableLocations['states'].push({...stateObj, types:[customType.id]});
              }
            }
            console.log('customType:', customType);
            for (const pincode of customType.availableLocations.pincodes) {
              let obj = availableLocations['pincodes'].find(element=> element == pincode);
              let index = availableLocations['pincodes'].indexOf(obj)
              if (index > -1) {
                availableLocations['pincodes'][index].types.push(customType.id);
              } else {
                availableLocations['pincodes'].push({pincode, types:[customType.id]});
              }
            }
          }
        }
        resolve(availableLocations);
      } catch (error) {
        console.log('error:', error);
      }
    })
  }

  async setLocations(availableLocations){
    return new Promise(async (resolve) => {
      try {
        let globalAvailableLocations = [];
        for (const state of availableLocations.states) {
          let types = state.types;
          for (const type of types) {
              let obj = globalAvailableLocations.find(element=> element.custom == type);
              let index = globalAvailableLocations.indexOf(obj);
              console.log('index:', index);
              if (index > -1) {
                globalAvailableLocations[index].states.push({state: state.state, stateCode: state.stateCode});
              } else {
                let states = [{state: state.state, stateCode: state.stateCode}];
                globalAvailableLocations.push({custom: type, states, pincodes: []});
              }
          }
        }
        for (const pincode of availableLocations.pincodes) {
          let types = pincode.types;
          for (const type of types) {
              let obj = globalAvailableLocations.find(element=> element.custom == type);
              let index = globalAvailableLocations.indexOf(obj);
              if (index > -1) {
                globalAvailableLocations[index].pincodes.push(pincode.pincode);
              } else {
                globalAvailableLocations.push({custom: type, states: [], pincodes: [pincode.pincode]});
              }
          }
        }
        for (const x of globalAvailableLocations) {
          if (x.custom == 'standard') {
            await this.deliveryRef.update({availableLocations: {states:x.states, pincodes: x.pincodes}});
          } else {
            await this.deliveryRef.collection('custom').doc(x.custom).update({availableLocations: {states:x.states, pincodes: x.pincodes}});
          }
        }
        resolve(true);
      } catch (error) {
        console.log('error:', error);
      }
    })
  }
}
