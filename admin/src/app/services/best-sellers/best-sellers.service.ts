import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BestSellersService {
  getBSProductsSub: Subscription;
  productsDataForBestSellers: any = [];
  lastResponseForBestSellers: any;
  firstResponseForBestSellers: any;

  constructor(private events: Events,
              private afs: AngularFirestore) { }
  initializeSubscriptions() {
    this.events.subscribe('best-sellers:getBestSellers', () => {
      this.getBestSellers();
    });
    this.events.subscribe('best-sellers:getBestSellersActiveStatus', () => {
      this.getBestSellersActiveStatus();
    });
    this.events.subscribe('best-sellers:changeBestSellersStatus', (status) => {
      this.changeBestSellersStatus(status);
    });
    this.events.subscribe('best-sellers:addBestSellerProduct', (product) => {
      this.addBestSellerProduct(product);
    });
    this.events.subscribe('best-sellers:deleteBestSellerProduct', (id) => {
      this.deleteBestSellerProduct(id);
    });
    this.events.subscribe('best-sellers:removeSubscriptions', () => {
      if(this.getBSProductsSub) {
        this.getBSProductsSub.unsubscribe();
      }
    });
    this.events.subscribe('best-sellers:getProductsForBestSellers', () => {
      this.getProductsForBestSellers();
    });
    this.events.subscribe('best-sellers:loadMoreProductsForBestSellers', () => {
      this.loadMoreProductsForBestSellers();
    });
    this.events.subscribe('best-sellers:loadPreviousProductsForBestSellers', () => {
      this.loadPreviousProductsForBestSellers();
    });
    this.events.subscribe('best-sellers:getBestSellersForShopCategory', () => {
      this.getBestSellersForShopCategory();
    });
  }
  getBestSellers() {
    try {
      const bsProductsRef = this.afs.collection('features').doc('bestsellers').collection('products', ref => ref
        .orderBy('sortedAt', 'desc'));
      const bsProductsSnap = bsProductsRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      this.getBSProductsSub = bsProductsSnap.subscribe((res) => {
        if(!res.length) {
          this.events.publish('best-sellers:noBestSellers');
        } else {
          this.events.publish('best-sellers:publishBestSellers', res);
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }
  async getBestSellersActiveStatus() {
    try {
      const activeStatus = await this.afs.collection('features').doc('bestsellers').valueChanges().pipe(first()).toPromise();
      this.events.publish('best-sellers:publishBestSellersActiveStatus', activeStatus);
    } catch (error) {
      console.dir(error);
    }
  }
  async changeBestSellersStatus(status) {
    try {
      console.log('status in service', status);
      await this.afs.collection('features').doc('bestsellers').set({
        isActive: status
      });
      this.events.publish('best-sellers:changeBestSellersStatusSuccess');
    } catch (error) {
      console.dir(error);
    }
  }
  async addBestSellerProduct(product: any) {
    try {
      let bestSellersData: any = [];
      bestSellersData = await this.afs.collection('features').doc('bestsellers').collection('products').valueChanges().pipe(first()).toPromise();
      if(bestSellersData.length && bestSellersData.length === 10) {
        this.events.publish('best-sellers:maxProductsinBestSellers');
      } else {
        await this.afs.collection('features').doc('bestsellers').collection('products').doc(product.id).set({
          data: product.data,
          sortedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        this.events.publish('best-sellers:addBestSellerProductSuccess');
      }
    } catch (error) {
      console.dir(error);
    }
  }
  async deleteBestSellerProduct(id: string) {
    try {
      await this.afs.collection('features').doc('bestsellers').collection('products').doc(id).delete();
      this.events.publish('best-sellers:deleteBestSellerProductSuccess');
    } catch (error) {
      console.dir(error);
    }
  }
  
  async updateBestSellersPosition(id: string, changedDate: any) {
    console.log('id & cdate', id, changedDate);
    await this.afs.collection('features').doc('bestsellers').collection('products').doc(id).update({sortedAt: changedDate});
    this.events.publish('best-sellers:updateBestSellersPositionSuccess');
 }

 async getProductsForBestSellers() {
  this.productsDataForBestSellers = [];
  this.afs.collection('products', ref => ref
    .orderBy('sortedAt', 'desc')
    .limit(10)
  ).snapshotChanges()
    .subscribe(async (response: any) => {

      if (!response.length) {
        console.log('No Data Available');
        this.events.publish('best-sellers:noProductsAvailable');
        return false;
      }
      this.productsDataForBestSellers = [];
      this.lastResponseForBestSellers = response[response.length - 1].payload.doc;
      let bestSellersIds: any = [];
        const bestSellersref = this.afs.collection('features').doc('bestsellers').collection('products');
        const bestSellersData = await bestSellersref.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).pipe(first()).toPromise();
        for (let index = 0; index < bestSellersData.length; index++) {
          bestSellersIds.push(bestSellersData[index].id);
        }
      for (const product of response) {
        if(bestSellersIds.indexOf(product.payload.doc.id) === -1) {
          this.productsDataForBestSellers.push({id: product.payload.doc.id, data: product.payload.doc.data(), isAdded: false});
        } else {
          this.productsDataForBestSellers.push({id: product.payload.doc.id, data: product.payload.doc.data(), isAdded: true});
        }
      }
      this.events.publish('best-sellers:publishProductsForBestSellers', this.productsDataForBestSellers, this.productsDataForBestSellers.length);
    }, error => {
    });
}

async loadMoreProductsForBestSellers() {
  this.afs.collection('products', ref => ref
    .orderBy('sortedAt', 'desc')
    .limit(10)
    .startAfter(this.lastResponseForBestSellers)
  ).snapshotChanges()
    .subscribe(async (response: any) => {
      if (!response.length) {
        console.log('No Data Available');
        this.events.publish('best-sellers:productsForBestSellersLimitReached');
        return false;
      }
      this.productsDataForBestSellers = [];
      this.firstResponseForBestSellers = response[0].payload.doc
      this.lastResponseForBestSellers = response[response.length - 1].payload.doc;
      let bestSellersIds: any = [];
        const bestSellersref = this.afs.collection('features').doc('bestsellers').collection('products');
        const bestSellersData = await bestSellersref.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).pipe(first()).toPromise();
        for (let index = 0; index < bestSellersData.length; index++) {
          bestSellersIds.push(bestSellersData[index].id);
        }
      for (const product of response) {
        if(bestSellersIds.indexOf(product.payload.doc.id) === -1) {
          this.productsDataForBestSellers.push({id: product.payload.doc.id, data: product.payload.doc.data(), isAdded: false});
        } else {
          this.productsDataForBestSellers.push({id: product.payload.doc.id, data: product.payload.doc.data(), isAdded: true});
        }
      }
      this.events.publish('best-sellers:publishProductsForBestSellers', this.productsDataForBestSellers);
    }, error => {
    });
}
async loadPreviousProductsForBestSellers() {
  this.afs.collection('products', ref => ref
    .orderBy('sortedAt', 'desc')
    .endBefore(this.firstResponseForBestSellers)
    .limitToLast(10)
  ).snapshotChanges()
    .subscribe(async (response: any) => {
      if (!response.length) {
        console.log('No Data Available');
        this.events.publish('best-sellers:previousProductsForBestSellersLimitReached');
        return false;
      }
      this.productsDataForBestSellers = [];
      this.firstResponseForBestSellers = response[0].payload.doc;
      this.lastResponseForBestSellers = response[response.length - 1].payload.doc;
      let bestSellersIds: any = [];
        const bestSellersref = this.afs.collection('features').doc('bestsellers').collection('products');
        const bestSellersData = await bestSellersref.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).pipe(first()).toPromise();
        for (let index = 0; index < bestSellersData.length; index++) {
          bestSellersIds.push(bestSellersData[index].id);
        }
      for (const product of response) {
        if(bestSellersIds.indexOf(product.payload.doc.id) === -1) {
          this.productsDataForBestSellers.push({id: product.payload.doc.id, data: product.payload.doc.data(), isAdded: false});
        } else {
          this.productsDataForBestSellers.push({id: product.payload.doc.id, data: product.payload.doc.data(), isAdded: true});
        }
      }
      this.events.publish('best-sellers:publishProductsForBestSellers', this.productsDataForBestSellers);
    }, error => {
    });
}
getBestSellersForShopCategory() {
  try {
    const bsProductsRef = this.afs.collection('features').doc('bestsellers').collection('products', ref => ref
      .orderBy('sortedAt', 'desc'));
    const bsProductsSnap = bsProductsRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    this.getBSProductsSub = bsProductsSnap.subscribe((res) => {
      if(!res.length) {
        this.events.publish('best-sellers:noBestSellers');
      } else {
        this.events.publish('best-sellers:publishBestSellersForShopCategory', res);
      }
    });
  } catch (error) {
    console.dir(error);
  }
}
}

