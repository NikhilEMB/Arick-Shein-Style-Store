import { first, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';
import { SharedService } from '../shared/shared.service';
@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  brandsSubs: Subscription;
  constructor(private events: Events,
    private afs: AngularFirestore,
    private fbStorage: AngularFireStorage,
    private storage: Storage, private sharedService: SharedService) { }

  initializeSubscriptions() {
    this.events.subscribe('brands:getAllBrandsForAdmin', () => {
      this.getAllBrandsForAdmin();
    });
    this.events.subscribe('brands:getAllBrandsForUser', () => {
      this.getAllBrandsForUser();
    });
    this.events.subscribe('brands:saveBrand', (data, img, banner, bid) => {
      this.saveBrand(data, img, banner, bid);
    });
    this.events.subscribe('brands:deleteBrand', (bid) => {
      this.deleteBrand(bid);
    });
    this.events.subscribe('brands:getBrandsBanner', (bid) => {
      this.getBrandsBanner(bid);
    });


    this.events.subscribe('brands:removeBrandsSubs', () => {
      if (this.brandsSubs) {
        this.brandsSubs.unsubscribe();
      }
    });
  }

  async getAllBrandsForAdmin() {
    const brandsData: any = await this.getAllBrands();
    if (!brandsData.length) {
      this.events.publish('brands:noBrandAvailableForAdmin');
    } else {
      this.events.publish('brands:publishAllBrandsForAdmin', brandsData);
    }
  }

  async getAllBrandsForUser() {
    const brandsData: any = await this.getAllBrands();
    if (!brandsData.length) {
      this.events.publish('brands:noBrandAvailableForUser');
    } else {
      this.events.publish('brands:publishAllBrandsForUser', brandsData);
    }
  }

  async getAllBrands() {
    return new Promise(async (resolve, reject) => {
      this.storage.get('userRole').then((role) => {
        let brandsRef;
        if (role === 'admin') {
          brandsRef = this.afs.collection('brands', ref => ref.orderBy('sortedAt', 'desc'));
        } else {
          brandsRef = this.afs.collection('brands', ref => ref
            .where('status', '==', true)
            .orderBy('sortedAt', 'desc'));
        }
        const brandsSnap = brandsRef.snapshotChanges().pipe(
          map((actions: any) => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
        this.brandsSubs = brandsSnap.subscribe((brandsData) => {
          resolve(brandsData);
        });
      });
    });
  }


  async saveBrand(data: any, img: any, banner: any, bid: string) {
    try {
      let brandId = bid;
      let baseImg: any = {};
      let storageImg: any = {};
      let bannerBaseImg: any = {};
      let bannerStorageImg: any = {};
      if (img.length) {
        img.forEach(i => {
          if (i.url.includes('data:image/jpeg;base64,') || i.url.includes('data:image/jpg;base64,') || i.url.includes('data:image/png;base64,')) {
            baseImg = i;
          } else {
            storageImg = i;
          }
        });
      }
      if (banner.length) {
        banner.forEach(i => {
          if (i.url.includes('data:image/jpeg;base64,') || i.url.includes('data:image/jpg;base64,') || i.url.includes('data:image/png;base64,')) {
            bannerBaseImg = i;
          } else {
            bannerStorageImg = i;
          }
        });
      }
      data['image'] = storageImg;
      data['banner'] = bannerStorageImg;
      if(!brandId) {
        let docRef = await this.afs.collection('brands').add(data);
        brandId = docRef.id;
      } else {
        await this.afs.collection('brands').doc(brandId).update(data);
      }
      if (baseImg.hasOwnProperty('url')) {
        let imgType = this.sharedService.getImageType(baseImg.url);
        const imgRef: any = this.fbStorage.ref(`brands/${brandId}/image/` + new Date().getTime().toString() + imgType);
        await imgRef.putString(baseImg.url, 'data_url');
      }
      if (bannerBaseImg.hasOwnProperty('url')) {
        let imgType = this.sharedService.getImageType(bannerBaseImg.url);
        const imgRef: any = this.fbStorage.ref(`brandsBanner/${brandId}/image/` + new Date().getTime().toString() + imgType);
        await imgRef.putString(bannerBaseImg.url, 'data_url');
      }
      this.events.publish('brands:saveBrandSuccess');
    } catch (error) {
      console.dir(error);
    }
  }
  async deleteBrand(bid: string) {
    console.log('delete id', bid);
    try {
      await this.afs.collection('brands').doc(bid).delete();
      this.events.publish('brands:deleteBrandSuccess');
    } catch (error) {
      console.log(error);
    }
  }

  async updateBrandsPosition(id: string, changedDate: any) {
    await this.afs.doc(`brands/${id}`).update({ sortedAt: changedDate });
    this.events.publish('brands:updateBrandsPostionSucess');
  }

  async getBrandsBanner(bid: string) {
    try {
      const brandBanner: any = await this.afs.collection('brands').doc(bid).valueChanges().pipe(first()).toPromise();
      this.events.publish('brands:publishBrandsBanner', brandBanner.banner);
    } catch (error) {
      console.dir(error);
    }
  }

  async getAllBrandsForSideMenu() {
    try {
      const brandsRef = this.afs.collection('brands', ref => ref.orderBy('sortedAt', 'desc').where('status', '==', true));
      const brandsSnap = brandsRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      const brandsData = await brandsSnap.pipe(first()).toPromise();
      console.log('brandsData sm', brandsData);
      return brandsData;
    } catch (error) {
      console.dir(error);
    }
  }
}
