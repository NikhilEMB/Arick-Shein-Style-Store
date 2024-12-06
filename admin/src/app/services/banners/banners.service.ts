import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { first, map } from 'rxjs/operators';
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';
import { ImageLoaderService } from 'ionic-image-loader';
import { SharedService } from '../shared/shared.service';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class BannersService {
  appBannerRef = this.afs.collection('features').doc('banners').collection('images');
  webBannerRef = this.afs.collection('features').doc('webbanners').collection('images');
  constructor(private events: Events,
      private afs: AngularFirestore,
      private fbStorage: AngularFireStorage,
      private logglyService: LogglyLoggerService,
      private imageLoader: ImageLoaderService,
      private storage: Storage,
      private sharedService: SharedService,
      private network: Network) {}
  initializeSubscriptions() {

      /* this.events.subscribe('banners:uploadBanner', (index, base64Image, size) => {
         this.uploadBanner(index, base64Image, size);
       });*/
      this.events.subscribe('banners:getWebBanners', () => {
          this.getWebBanners();
      });

      this.events.subscribe('banners:getAppBanners', () => {
          this.getAppBanners();
      });

      /* this.events.subscribe('banners:getSubscribedBanners', () => {
         this.getSubscribedBanners();
       });*/
      this.events.subscribe('banners:getBannersActiveStatus', () => {
          this.getBannersActiveStatus();
      });
      this.events.subscribe('banners:changeBannersStatus', (status) => {
          this.changeBannersStatus(status);
      });

      this.events.subscribe('banners:changeBannerStatus', (ID, status, bannerType) => {
        this.changeBannerStatus(ID, status, bannerType);
    });

      /*this.events.subscribe('banners:removeBanner', (index, type) => {
          this.removeBanner(index, type);
      });*/

      this.events.subscribe('banners:saveBanner', (data, index, bannerType) => {
          this.saveBanner(data, index, bannerType);
      });

      this.events.subscribe('banners:addBanner', (data, index, bannerType) => {
        this.addBanner(data, index, bannerType);
    });
  }

  async getAppBanners() {
      try {
          const bannersRef = this.afs.collection('features').doc('banners').collection('images');
          const bannersData = await bannersRef.snapshotChanges().pipe(
              map(actions => actions.map(a => {
                  const data = a.payload.doc.data();
                  const id = a.payload.doc.id;
                  return {
                      id,
                      ...data
                  };
              }))
          ).pipe(first()).toPromise();
          this.events.publish('banners:publishAppBanners', bannersData);
         // console.log('bannersData in getBanners', bannersData);
      } catch (error) {
          this.logglyService.log(error);
      }
  }

  async getWebBanners() {
      try {
          const bannersRef = this.afs.collection('features').doc('webbanners').collection('images');
          const bannersData = await bannersRef.snapshotChanges().pipe(
              map(actions => actions.map(a => {
                  const data = a.payload.doc.data();
                  const id = a.payload.doc.id;
                  return {
                      id,
                      ...data
                  };
              }))
          ).pipe(first()).toPromise();
          this.events.publish('banners:publishWebBanners', bannersData);

         // console.log('bannersData in getBanners', bannersData);
      } catch (error) {
          this.logglyService.log(error);
      }
  }

  async addBanner(data: any, index: number, bannerType) {

    if (bannerType == 'app') {
      try {
        let baseImg = '';
        let bannerClone = JSON.parse(JSON.stringify(data));
        //console.log('bannerClone', bannerClone);
        if (bannerClone.org.includes('data:image/jpeg;base64,') || bannerClone.org.includes('data:image/jpg;base64,') || bannerClone.org.includes('data:image/png;base64,') || bannerClone.org.includes('data:image/gif;base64,')) {
            baseImg = bannerClone.org;
            delete bannerClone.org;
        }
        bannerClone['uploadedAt'] = new Date();
        await this.appBannerRef.add(bannerClone).then(async docRef => {
          //console.log("Document written with ID: ", docRef.id);
          let imgType  = this.sharedService.getImageType(baseImg);
          const imgRef: any = this.fbStorage.ref(`banners/images/${docRef.id}/${docRef.id}` + imgType);
          await imgRef.putString(baseImg, 'data_url');
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
            this.events.publish('banners:saveBannerSuccess');
    } catch (error) {
        console.dir(error);
        this.logglyService.log(error);
    }
    }
    else{
      try {
        let baseImg = '';
        let bannerClone = JSON.parse(JSON.stringify(data));
       // console.log('bannerClone', bannerClone);
        if (bannerClone.org.includes('data:image/jpeg;base64,') || bannerClone.org.includes('data:image/jpg;base64,') || bannerClone.org.includes('data:image/png;base64,') || bannerClone.org.includes('data:image/gif;base64,')) {
            baseImg = bannerClone.org;
            delete bannerClone.org;
        }
        bannerClone['uploadedAt'] = new Date();
        await this.webBannerRef.add(bannerClone).then(async docRef => {
         // console.log("Document written with ID: ", docRef.id);
         let imgType  = this.sharedService.getImageType(baseImg);
          const imgRef: any = this.fbStorage.ref(`webbanners/images/${docRef.id}/${docRef.id}` + imgType);
          await imgRef.putString(baseImg, 'data_url');
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
            this.events.publish('banners:saveBannerSuccess');
    } catch (error) {
        console.dir(error);
        this.logglyService.log(error);
    }
    }

      
  }

  async saveBanner(data: any, index: number, bannerType) {
     // console.log('index', index);
      if (bannerType == 'app') {
          try {
              let baseImg = '';
              let bannerClone = JSON.parse(JSON.stringify(data));
              //console.log('bannerClone', bannerClone);
              if (bannerClone.org.includes('data:image/jpeg;base64,') || bannerClone.org.includes('data:image/jpg;base64,') || bannerClone.org.includes('data:image/png;base64,') || bannerClone.org.includes('data:image/gif;base64,')) {
                  baseImg = bannerClone.org;
                  delete bannerClone.org;
              }
              bannerClone['uploadedAt'] = new Date();
              await this.appBannerRef.doc(`image${index}`).set(bannerClone);
              if (baseImg) {
                let imgType  = this.sharedService.getImageType(baseImg);
                  const imgRef: any = this.fbStorage.ref(`banners/images/image${index}/image${index}` + imgType);
                  await imgRef.putString(baseImg, 'data_url');
              }
              this.events.publish('banners:saveBannerSuccess');
          } catch (error) {
              console.dir(error);
              this.logglyService.log(error);
          }
      } 

      else {
          try {
              let baseImg = '';
              let bannerClone = JSON.parse(JSON.stringify(data));
             // console.log('bannerClone', bannerClone);
              if (bannerClone.org.includes('data:image/jpeg;base64,') || bannerClone.org.includes('data:image/jpg;base64,') || bannerClone.org.includes('data:image/png;base64,') || bannerClone.org.includes('data:image/gif;base64,')) {
                  baseImg = bannerClone.org;
                  delete bannerClone.org;
              }
              bannerClone['uploadedAt'] = new Date();
              await this.webBannerRef.doc(`image${index}`).set(bannerClone);
              if (baseImg) {
                let imgType  = this.sharedService.getImageType(baseImg);
                  const imgRef: any = this.fbStorage.ref(`webbanners/images/image${index}/image${index}` + imgType);
                  await imgRef.putString(baseImg, 'data_url');
              }
              this.events.publish('banners:saveBannerSuccess');
          } catch (error) {
              console.dir(error);
              this.logglyService.log(error);
          }

      }
  }


  async getBanners() {
      try {
          const bannersRef = this.afs.collection('features').doc('banners').collection('images');
          const bannersData = await bannersRef.snapshotChanges().pipe(
              map(actions => actions.map(a => {
                  const data = a.payload.doc.data();
                  const id = a.payload.doc.id;
                  return {
                      id,
                      ...data
                  };
              }))
          ).pipe(first()).toPromise();
          this.events.publish('banners:publishBanners', bannersData);
          //console.log('bannersData in getBanners', bannersData);
      } catch (error) {
          this.logglyService.log(error);
      }

  }

  async getBannersActiveStatus() {
      try {
          const activeStatus = await this.afs.collection('features').doc('banners').valueChanges().pipe(first()).toPromise();
          this.events.publish('banners:publishBannersActiveStatus', activeStatus);
      } catch (error) {
          console.dir(error);
          this.logglyService.log(error);
      }
  }
  async changeBannersStatus(status) {
      try {
          //console.log('status in service', status);
          await this.afs.collection('features').doc('banners').set({
              isActive: status
          });
          this.events.publish('banners:changeBannersStatusSuccess');
      } catch (error) {
          console.dir(error);
          this.logglyService.log(error);
      }
  }

  /*
  async removeBanner(index: number, type) {
    if (type == 'app') {
      try {
        await this.afs.collection('features').doc('banners').collection('images').doc(`${index}`).delete();
        this.events.publish('banners:removeAppBannerSuccess');
    } catch (error) {
        console.dir(error);
        this.logglyService.log(error);
    }
      
    } else {
      try {
        await this.afs.collection('features').doc('webbanners').collection('images').doc(`${index}`).delete();
        this.events.publish('banners:removeWebBannerSuccess');
    } catch (error) {
        console.dir(error);
        this.logglyService.log(error);
    }
      
    }
     
  }*/

  async preloadBannerImgs(banners: any) {
      for (let index = 0; index < banners.length; index++) {
          if (banners[index].mob) {
              await this.imageLoader.preload(banners[index].mob);
          }
          if (banners[index].org) {
              await this.imageLoader.preload(banners[index].org);
          }
      }
      this.storage.set('bannersImgPreloader', true);
  }

  async changeBannerStatus(index, status, bannerType){
    

    if(bannerType == 'app'){
        console.log('changeBannerStatus app' )
        try {
            await this.appBannerRef.doc(`image${index}`).update({'active':status});
            this.events.publish('banners:updateBannerStatusSuccess');
            
        } catch (error) {
            this.logglyService.log(error);
           // console.log(error )
        }

    }
    else{
        try {
            console.log('changeBannerStatus web', status, index )
            ///await this.afs.collection('features').doc('webbanners').collection('images')
            await this.webBannerRef.doc(`image${index}`).update({'active':status});
            this.events.publish('banners:updateBannerStatusSuccess');
            
        } catch (error) {
            this.logglyService.log(error);
            console.log(error)
        }

    }

  }
}