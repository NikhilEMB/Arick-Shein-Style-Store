import { LabelService } from './../label/label.service';
import { UserService } from 'src/app/services/user/user.service';
import { Storage } from '@ionic/storage';
import { first, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesFeatureService {
  serviceRef = this.afs.collection('services');
  constructor(private events: Events,
              private afs: AngularFirestore,
              private fbStorage: AngularFireStorage,
              private storage: Storage,
              private userService: UserService,
              private logglyService: LogglyLoggerService,
              private labelService: LabelService, private sharedService: SharedService) { }

  initializeSubscriptions() {
    this.events.subscribe('services-feature:getAllServices', () => {
      this.getAllServices();
    });
    this.events.subscribe('services-feature:getAllServicesForHome', () => {
      this.getAllServicesForHome();
    });
    this.events.subscribe('services-feature:getServicesActiveStatus', () => {
      this.getServicesActiveStatus();
    });
    this.events.subscribe('services-feature:changeServiceStatus', (status) => {
      this.changeServiceStatus(status);
    });
    this.events.subscribe('services-feature:deleteService', (sid) => {
      this.deleteService(sid);
    });
    this.events.subscribe('services-feature:saveService', (data, banner, sid) => {
      this.saveService(data, banner, sid);
    });
    this.events.subscribe('services-feature:submitResponse', (res, imgs) => {
      this.submitResponse(res, imgs);
    });
    this.events.subscribe('services-feature:getUserRequests', () => {
      this.getUserRequests();
    });
    this.events.subscribe('services-feature:completeRequest', (rid, name, uid) => {
      this.completeRequest(rid, name, uid);
    });
    this.events.subscribe('services-feature:getAllRequests', () => {
      this.getAllRequests();
    });
  }

  async getAllServices() {
    try {
      const services = await this.afs.collection('services', ref => ref
      .orderBy('createdAt', 'desc')).snapshotChanges().pipe(
        map((actions: any) => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      this.events.publish('services-feature:publishAllServices', services);
    } catch (error) {
      console.dir(error);
      this.logglyService.log(error);
    }
  }
  async getAllServicesForHome(route?) {
    try {
      const services = await this.afs.collection('services', ref => ref
      .orderBy('createdAt', 'desc')).snapshotChanges().pipe(
        map((actions: any) => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      if(!route) {
        this.events.publish('services-feature:publishAllServicesForHome', services);
      } else {
        return services;
      }
    } catch (error) {
      console.dir(error);
      this.logglyService.log(error);
    }
  }

  async getServicesActiveStatus(route?) {
    try {
      const status = await this.afs.collection('features').doc('services').valueChanges().pipe(first()).toPromise();
      if (!route) {
        this.events.publish('services-feature:publishServicesActiveStatus', status);
      } else {
        return status;
      }
    } catch (error) {
      console.dir(error);
      this.logglyService.log(error);
    }
  }

  async changeServiceStatus(status: boolean) {
    try {
      await this.afs.collection('features').doc('services').set({isActive: status});
      this.events.publish('services-feature:statusChangeSuccess');
      this.events.publish('services-feature:getAllServicesForHome');
    } catch (error) {
      console.dir(error);
      this.logglyService.log(error);
    }
  }

  async deleteService(sid: string) {
    try {
      await this.serviceRef.doc(sid).delete();
      this.events.publish('services-feature:getAllServices');
      this.events.publish('services-feature:deleteServiceSuccess');
    } catch (error) {
      console.dir(error);
      this.logglyService.log(error);
    }
  }

  async saveService(data: any, banner: any, sid: string) {
    try {
      let baseImg: any = {};
      let storageImg: any = {};
      if (!sid) {
        sid = this.afs.collection('services').ref.doc().id;
      }
      if (banner.length) {
        banner.forEach(i => {
          if (i.url.includes('data:image/jpeg;base64,') || i.url.includes('data:image/jpg;base64,') || i.url.includes('data:image/png;base64,') || i.url.includes('data:image/gif;base64,')) {
            baseImg = i;
          } else {
            storageImg = i;
          }
        });
      }
      data['banner'] = storageImg;
      await this.afs.collection('services').doc(sid).set(data);
      if (baseImg.hasOwnProperty('url')) {
        let imgType  = this.sharedService.getImageType(baseImg.url);
        const imgRef: any = this.fbStorage.ref(`services/${sid}/banner/` + new Date().getTime().toString() + imgType);
        await imgRef.putString(baseImg.url, 'data_url');
        const downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
        await this.afs.collection('services').doc(sid).update({banner: {url: downloadURL}});
      }
      this.events.publish('services-feature:saveServiceSuccess');
      this.getAllServices();
    } catch (error) {
      console.dir(error);
      this.logglyService.log(error);
    }
  }

  async submitResponse(res: any, imgs: any) {
    try {
      res['userName'] = this.userService.getUserName();
      res['userPhone'] = this.userService.getPhoneNo();
      res['userId'] = this.userService.getUserId();
      const sid = this.afs.collection('serviceRequests').ref.doc().id;
      await this.afs.collection('serviceRequests').doc(sid).set(res);
      if (imgs.length) {
          for (const img of imgs) {
            let imgType  = this.sharedService.getImageType(img.url);
            const imgRef: any = this.fbStorage.ref(`serviceRequests/${sid}/images/` + new Date().getTime().toString() + imgType);
            await imgRef.putString(img.url, 'data_url');
          }
        }
      this.events.publish('services-feature:submitResponseSuccess');
      this.getUserRequests();
      const chatObj = {
        type: 'txt',
        createdAt: new Date(),
        isRead: false,
        author: 'user',
        published: false,
        message: `${this.labelService.labels['SERVICES_FEATURE_SERVICE']['service_submit_request_msg']} ${res.serviceName}`
      };
      this.events.publish('chat:sendMsg', chatObj, res.userId);
    } catch (error) {
      console.dir(error);
      this.events.publish('services-feature:submitResponseFailure');
      this.logglyService.log(error);
    }

  }

  async getUserRequests() {
    try {
      const uid = await this.getStorageUid();
      const requests = await this.afs.collection('serviceRequests', ref => ref
        .orderBy('responseAt', 'desc')
        .where('userId', '==', uid))
        .snapshotChanges().pipe(
          map((actions: any) => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).pipe(first()).toPromise();
      this.events.publish('services-feature:publishUserRequests', requests);
    } catch (error) {
      this.logglyService.log(error);
    }

  }

  async getStorageUid(): Promise<string> {
    try {
      return new Promise(async (resolve, reject) => {
        this.storage.get('uid').then((val: string) => {
          resolve(val);
        });
      });
    } catch (error) {
      this.logglyService.log(error);
    }

  }

  async getAllRequests() {
    try {
      const requests = await this.afs.collection('serviceRequests', ref => ref
      .orderBy('responseAt', 'desc'))
      .snapshotChanges().pipe(
        map((actions: any) => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
    this.events.publish('services-feature:publishAllRequests', requests);
    } catch (error) {
      this.logglyService.log(error);
    }

  }

  async completeRequest(rid: string, name: string, uid: string) {
    try {
      await this.afs.collection('serviceRequests').doc(rid).update({status: 'Completed'});
      this.events.publish('services-feature:completeRequestSuccess');
      const chatObj = {
        type: 'txt',
        createdAt: new Date(),
        isRead: null,
        author: 'admin',
        published: false,
        message: `${this.labelService.labels['SERVICES_FEATURE_SERVICE']['service_complete_msg']} ${name}`
      };
      this.events.publish('chat:sendMsg', chatObj, uid);
    } catch (error) {
      console.dir(error);
      this.logglyService.log(error);
    }
  }

  async setLoyaltyPointsDetails(data:any) {
    try {
      await this.afs.collection('features').doc('points').set(data);
      return true;
    } catch (error) {
      console.dir(error);
      this.logglyService.log(error);
    }
  }

 
  getLoyaltyPointsDetails() {
    return this.afs
      .collection('features')
      .doc('points')
      .get()
      .pipe(
        map((doc) => {
          if (doc.exists) {
            return { id: doc.id, ...doc.data() };
          } else {
            // Handle the case where the document doesn't exist
            return null;
          }
        })
      );
  }

}
