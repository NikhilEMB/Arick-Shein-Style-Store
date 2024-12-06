import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { first, map } from 'rxjs/operators';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class BannersService {

  constructor(private events: Events,
              private afs: AngularFirestore,
              private fbStorage: AngularFireStorage,
              private sharedService: SharedService) { }
  initializeSubscriptions() {

    this.events.subscribe('banners:uploadBanner', (index, base64Image, size) => {
      this.uploadBanner(index, base64Image, size);
    });

    this.events.subscribe('banners:uploadWebBanner', (index, base64Image, size) => {
      this.uploadWebBanner(index, base64Image, size);
    });

    this.events.subscribe('banners:getAppBanners', () => {
      this.getAppBanners();
    });

    this.events.subscribe('banners:getWebBanners', () => {
      this.getWebBanners();
    });

    this.events.subscribe('banners:getSubscribedBanners', () => {
      this.getSubscribedBanners();
    });

   this.events.subscribe('banners:getBannersActiveStatus', () => {
      this.getBannersActiveStatus();
    });

    this.events.subscribe('banners:getWebBannersActiveStatus', () => {
      this.getWebBannersActiveStatus();
    });

    this.events.subscribe('banners:changeBannersStatus', (status) => {
      this.changeBannersStatus(status);
    });

    this.events.subscribe('banners:changeWebBannersStatus', (status) => {
      this.changeWebBannersStatus(status);
    });

    this.events.subscribe('banners:removeBanner', (index) => {
      this.removeBanner(index);
    });

    this.events.subscribe('banners:removeWebBanner', (index) => {
      this.removeWebBanner(index);
    });
  }

  async uploadBanner(index: any, base64Image: string, size: number) {
    try {
      await this.afs.collection('features').doc('banners').collection('images').doc(`image${index}`).set({
        uploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
        size: size
      });
      let imgType  = this.sharedService.getImageType(base64Image);
      const imgRef: any = this.fbStorage.ref(`banners/images/image${index}/image${index}` + imgType);
      await imgRef.putString(base64Image, 'data_url');
      this.events.publish('banners:uploadBannerSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async uploadWebBanner(index: any, base64Image: string, size: number) {
    try {
      await this.afs.collection('features').doc('webbanners').collection('images').doc(`image${index}`).set({
        uploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
        size: size
      });
      let imgType  = this.sharedService.getImageType(base64Image);
      const imgRef: any = this.fbStorage.ref(`webbanners/images/image${index}/image${index}` + imgType);
      await imgRef.putString(base64Image, 'data_url');
      this.events.publish('banners:uploadWebBannerSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async getAppBanners() {
    const bannersRef = this.afs.collection('features').doc('banners').collection('images');
    const bannersData = await bannersRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).pipe(first()).toPromise();
    this.events.publish('banners:publishAppBanners', bannersData);
  }

  async getWebBanners() {
    console.log('service getWebBanners')
    const bannersRef = this.afs.collection('features').doc('webbanners').collection('images');
    const bannersData = await bannersRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).pipe(first()).toPromise();
    console.log('bannersData', bannersData)
    this.events.publish('banners:publishWebBanners', bannersData);
  }


  async getSubscribedBanners() {
    const bannersRef = this.afs.collection('features').doc('banners').collection('images');
    const bannersData = await bannersRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    bannersData.subscribe((banners) => {
      this.events.publish('banners:publishSubscribedBanners', banners);
    })
  }

  async getBannersActiveStatus() {
    try {
      const activeStatus = await this.afs.collection('features').doc('banners').valueChanges().pipe(first()).toPromise();
      this.events.publish('banners:publishBannersActiveStatus', activeStatus);
    } catch (error) {
      console.dir(error);
    }
  }

  async getWebBannersActiveStatus() {
    try {
      const activeStatus = await this.afs.collection('features').doc('webbanners').valueChanges().pipe(first()).toPromise();
      this.events.publish('banners:publishWebBannersActiveStatus', activeStatus);
    } catch (error) {
      console.dir(error);
    }
  }

  async changeBannersStatus(status) {
    try {
      console.log('status in service', status);
      await this.afs.collection('features').doc('banners').set({
        isActive: status
      });
      this.events.publish('banners:changeBannersStatusSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async changeWebBannersStatus(status) {
    try {
      console.log('status in service', status);
      await this.afs.collection('features').doc('webbanners').set({
        isActive: status
      });
      this.events.publish('banners:changeWebBannersStatusSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async removeBanner(index: number) {
    try {
      await this.afs.collection('features').doc('banners').collection('images').doc(`image${index}`).delete();
      this.events.publish('banners:removeBannerSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async removeWebBanner(index: number) {
    
    try {
      console.log('removeWebBanner', index);
       this.afs.collection('features').doc('webbanners').collection('images').doc(`image${index}`).delete();
      this.events.publish('banners:removeWebBannerSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

}
