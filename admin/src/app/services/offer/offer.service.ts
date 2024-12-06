import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private events: Events,
              private afs: AngularFirestore,
              private fbStorage: AngularFireStorage, private sharedService: SharedService) { }

  initializeSubscriptions() {
    this.events.subscribe('offer:saveOffer', (data, images, oid) => {
      this.saveOffer(data, images, oid);
    });
    this.events.subscribe('offer:getOffers', () => {
      this.getOffers();
    });
    this.events.subscribe('offer:deleteOffer', (oid) => {
      this.deleteOffer(oid);
    });
  }

  async saveOffer(data: any, images: any, oid: string) {
    try {
      let offerId = oid; 
      console.log('images', images);
      let base64Imgs = [];
      let storageUrlImgs = [];
      if(!oid) {
        offerId = this.afs.collection('offers').ref.doc().id;
      }
      if(images.length) {
        for (let index = 0; index < images.length; index++) {
          if(images[index].url.includes('data:image/jpeg;base64,') || images[index].url.includes('data:image/jpg;base64,') || images[index].url.includes('data:image/png;base64,')) {
            base64Imgs.push(images[index]);
          } else {
            storageUrlImgs.push(images[index]);
          }
        }
      }
      console.log('base64Imgs', base64Imgs);
      console.log('storageUrlImgs', storageUrlImgs);
      await this.afs.collection('offers').doc(offerId).set({
        name: data.name,
        description: data.description,
        images: storageUrlImgs,
        sortedAt: data.sortedAt,
        link: data.link
      });
      base64Imgs.forEach(async (img) => {
        let imgType  = this.sharedService.getImageType(img.url);
        const imgRef: any = this.fbStorage.ref(`offers/${offerId}/images/` + new Date().getTime().toString() + imgType);
        await imgRef.putString(img.url, 'data_url');
      });
      this.events.publish('offer:saveOfferSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async getOffers() {
    try {
      const offersRef = this.afs.collection('offers', ref => ref.orderBy('sortedAt', 'desc'));
      const offersSnap = offersRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      offersSnap.subscribe((res) => {
        this.events.publish('offer:publishOffers', res);
        console.log('offers', res);
      });
    } catch (error) {
      console.dir(error);
    }
  }
  async updateOffersPosition(id: string, changedDate: any) {
    console.log('id & cdate', id, changedDate);
    await this.afs.doc(`offers/${id}`).update({sortedAt: changedDate});
    this.events.publish('offer:updateOffersPostionSucess');
 }

 async deleteOffer(oid: string) {
   try {
     await this.afs.collection('offers').doc(oid).delete();
     this.events.publish('offer:deleteOfferSucess');
   } catch (error) {
     
   }
 }
}
