import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import { first, map } from 'rxjs/operators';
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class MultiRegionService {

  multiRegionRef = this.afs.collection('features').doc('multiRegion').collection('regions');
  multiVendorRef = this.afs.collection('features').doc('multiVendor').collection('vendors');
  constructor(private events: Events,
              private afs: AngularFirestore,
              private logglyService: LogglyLoggerService) { }

  initializeSubscriptions() {
    this.events.subscribe('multi-region:saveRegion', (regionData) => {
      this.saveRegion(regionData);
    });
    this.events.subscribe('multi-region:saveRegionArea', (regionData, center, radius) => {
      this.saveRegionArea(regionData, center, radius);
    });
    this.events.subscribe('multi-region:toggleMultiRegionActive', (status) => {
      this.toggleMultiRegionActive(status);
    });
    this.events.subscribe('multi-region:toggleRegionType', (type) => {
      this.toggleRegionType(type);
    });
    this.events.subscribe('multi-region:getActiveStatus', () => {
      this.getActiveStatus();
    });
    this.events.subscribe('multi-region:getAllRegions', () => {
      this.getAllRegions();
    });
    this.events.subscribe('multi-region:toggleRegionActive', (status, id) => {
      this.toggleRegionActive(status, id);
    });
    this.events.subscribe('multi-region:deleteRegion', (id) => {
      this.deleteRegion(id);
    });
    this.events.subscribe('multi-region:getAllActiveRegions', () => {
      this.getAllActiveRegions();
    });
    this.events.subscribe('multi-region:getAllActiveRegionsVendor', () => {
      this.getAllActiveRegionsVendor();
    });
  }

  async saveRegion(regionData: any) {
    try {
      regionData['createdAt'] = new Date();
      if (regionData.id) {
        await this.multiRegionRef.doc(regionData.id).update(regionData);
      } else {
        await this.multiRegionRef.add(regionData);
      }
      this.events.publish('multi-region:regionSaved');
      this.events.publish('multi-region:getAllRegions');
    } catch (error) {
      console.dir(error);
      error['location'] = 'multi-region-service:saveRegion';
      this.logglyService.log(error);
    }
  }

  async saveRegionArea(regionData: any, center, radius) {
    try {
      let regionId = '';
      let regionClone = { ...regionData };
      regionClone['createdAt'] = new Date();
      regionClone['center'] = center;
      regionClone['radius'] = radius;
      if(regionClone.hasOwnProperty('id')) {
        regionId = regionClone.id;
        delete regionClone.id;
        await this.multiRegionRef.doc(regionId).update(regionClone);
      } else {
        // regionId = this.multiRegionRef.ref.doc().id;
        // await this.multiRegionRef.doc(regionId).update(regionClone);
        await this.multiRegionRef.add(regionClone);
      }
      this.events.publish('multi-region:regionSaved');
    } catch (error) {
      console.dir(error);
      error['location'] = 'multi-region-service:saveRegionArea'; 
      this.logglyService.log(error);
    }
  }

  async toggleMultiRegionActive(status: boolean) {
    try {
      // await this.afs.collection('features').doc('multiRegion').update({active:status});
      let docRef = this.afs.collection('features').doc('multiRegion');
      docRef.get().toPromise().then(async (doc) => {
        if (doc.exists) {
          docRef.update({ active: status });
        } else {
          docRef.set({ active: status });
        }
      });
      this.events.publish('multi-region:multiRegionActiveChanged');
    } catch (error) {
      console.dir(error);
      error['location'] = 'multi-region-service:toogleMultiRegionActive'; 
      this.logglyService.log(error);
    }
  }

  async toggleRegionType(type) {
    try {
      // await this.afs.collection('features').doc('multiRegion').update({regionType:type});
      let docRef = this.afs.collection('features').doc('multiRegion');
      docRef.get().toPromise().then(async (doc) => {
        if (doc.exists) {
          docRef.update({ regionType: type });
        } else {
          docRef.set({ regionType: type });
        }
      });
      this.events.publish('multi-region:multiRegionTypeChanged');
    } catch (error) {
      console.dir(error);
      error['location'] = 'multi-region-service:toggleRegionType'; 
      this.logglyService.log(error);
    }
  }

  async getActiveStatus(route?) {
    try {
      const multiRegionDoc = await this.afs.collection('features').doc('multiRegion').valueChanges().pipe(first()).toPromise();
      if(route === 'service') {
        return multiRegionDoc;
      } else {
        this.events.publish('multi-region:publishActiveStatus', multiRegionDoc);
      }
    } catch (error) {
      console.dir(error);
      error['location'] = 'multi-region-service:getActiveStatus'; 
      this.logglyService.log(error);
    }
  }

  async getAllRegions(route?) {
    try {
      const multiRegions = await this.afs.collection('features').doc('multiRegion').collection('regions', ref => ref
      .orderBy('createdAt', 'desc')).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      if (route == 'service') {
        return multiRegions;
      }
      console.log('multiRegions', multiRegions);
      this.events.publish('multi-region:publishAllRegions', multiRegions);
    } catch (error) {
      console.dir(error);
      error['location'] = 'multi-region-service:getAllRegions'; 
      this.logglyService.log(error);
    }
  }

  async toggleRegionActive(status, id) {
    try {
      await this.multiRegionRef.doc(id).update({active: status});
      this.events.publish('multi-region:regionActiveChanged');
    } catch (error) {
      console.dir(error);
      error['location'] = 'multi-region-service:toggleRegionActive'; 
      this.logglyService.log(error);
    }
  }

  async deleteRegion(id) {
    try {
      let currentData:any = await this.multiRegionRef.doc(id).valueChanges().pipe(first()).toPromise();
      if (currentData.vendorId){
        await this.multiVendorRef.doc(currentData['vendorId']).update({regionId: firebase.firestore.FieldValue.delete() });
      }
      await this.multiRegionRef.doc(id).delete();
      this.events.publish('multi-region:regionDeleted');
    } catch (error) {
      console.dir(error);
      error['location'] = 'multi-region-service:deleteRegion'; 
      this.logglyService.log(error);
    }
  }

  async getAllActiveRegions(route?) {
    try {
      const multiRegions = await this.afs.collection('features').doc('multiRegion').collection('regions', ref => ref
      .where('active', '==', true)).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      if (route == 'service') {
        return multiRegions;
      }
      console.log('multiRegions', multiRegions);
      this.events.publish('multi-region:publishAllActiveRegions', multiRegions);
    } catch (error) {
      console.dir(error);
      error['location'] = 'multi-region-service:getAllRegions'; 
      this.logglyService.log(error);
    }
  }

  async getAllActiveRegionsVendor() {
    try {
      const multiRegions = await this.afs.collection('features').doc('multiRegion').collection('regions', ref => ref
      .where('active', '==', true)).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      let multiRegionsavailable = []
      for (let i = 0; i < multiRegions.length; i++) {
        if (!multiRegions[i]['vendorId']){
          multiRegionsavailable.push(multiRegions[i])
        }
      }
      this.events.publish('multi-region:publishAllActiveRegionsVendor', multiRegionsavailable);
    } catch (error) {
      console.dir(error);
      error['location'] = 'multi-region-service:getAllRegions'; 
      this.logglyService.log(error);
    }
  }

}
