import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase';
import { firestore } from 'firebase';
import { UserService } from '../user/user.service';
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CouponCodesService {
  getCouponsSub: Subscription;

  constructor(private events: Events,
              private afs: AngularFirestore,
              private userService: UserService,
              private logglyService: LogglyLoggerService,
              private storage :Storage) { }
  
  initializeSubscriptions() {
    this.events.subscribe('coupon-codes:getAllCouponCodes', () => {
      this.getAllCouponCodes();
    });
    this.events.subscribe('coupon-codes:addNewCouponCode', (data) => {
      this.addNewCouponCode(data);
    });
    this.events.subscribe('coupon-codes:editCouponCode', (id, data) => {
      this.editCouponCode(id, data);
    });
    this.events.subscribe('coupon-codes:deleteCouponCode', (id) => {
      this.deleteCouponCode(id);
    });
    this.events.subscribe('coupon-codes:deleteEditCouponCode', (id) => {
      this.deleteEditCouponCode(id);
    });
    this.events.subscribe('coupon-codes:addProductAsNotApplicable', (product, codeId) => {
      this.addProductAsNotApplicable(product, codeId);
    });
    this.events.subscribe('coupon-codes:removeNotApplicableProduct', (product, codeId) => {
      this.removeNotApplicableProduct(product, codeId);
    });
    this.events.subscribe('coupon-codes:verifyCouponCode', (data) => {
      this.verifyCouponCode(data);
    });
    this.events.subscribe('coupon-codes:updateApplicableStatus', (status, id) => {
      this.updateApplicableStatus(status, id);
    });
    this.events.subscribe('coupon-codes:removeSubs', () => {
      if(this.getCouponsSub) {
        this.getCouponsSub.unsubscribe();
      }
    });

  }

  getAllCouponCodes() {
    try {
      const couponsRef = this.afs.collection('features').doc('coupons').collection('codes', ref => ref
        .orderBy('createdAt', 'desc'));
      const couponsSnap = couponsRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      this.getCouponsSub = couponsSnap.subscribe((res) => {
        if(!res.length) {
          this.events.publish('coupon-codes:noCouponCodes');
        } else {
          this.events.publish('coupon-codes:publishAllCouponCodes', res);
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async addNewCouponCode(data: any) {
    try {
      const couponCode = await this.afs.collection('features').doc('coupons').collection('codes', ref => ref
      .where('name', '==', data.name)).valueChanges().pipe(first()).toPromise();
      if(couponCode && couponCode.length > 0) {
        this.events.publish('coupon-codes:couponCodeAlreadyExists', data.name);
      } else {
        data["createdAt"] = firebase.firestore.FieldValue.serverTimestamp();
        await this.afs.collection('features').doc('coupons').collection('codes').add(data);
        this.events.publish('coupon-codes:addNewCouponCodeSuccess');
      }
    } catch (error) {
      console.dir(error);
      this.events.publish('coupon-codes:dataNotSaved');
    }
  }

  async editCouponCode(id: string, data: any) {
    try {
      await this.afs.collection('features').doc('coupons').collection('codes').doc(id).update(data);
      this.events.publish('coupon-codes:editCouponCodeSuccess');
    } catch (error) {
      console.dir(error);
      this.events.publish('coupon-codes:dataNotSaved');
    }
  }

  async deleteCouponCode(id: string) {
    try {
      await this.afs.collection('features').doc('coupons').collection('codes').doc(id).delete();
      this.events.publish('coupon-codes:deleteCouponCodeSuccess');
    } catch (error) {
      console.dir(error);
    }
  }
  
  async deleteEditCouponCode(id: string) {
    try {
      await this.afs.collection('features').doc('coupons').collection('codes').doc(id).delete();
      this.events.publish('coupon-codes:deleteEditCouponCodeSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async addProductAsNotApplicable(product, codeId) {
    try {
      if (product._highlightResult){
        delete product._highlightResult
      }
      await this.afs.collection('features').doc('coupons').collection('codes').doc(codeId).update({
        notApplicableProducts: firestore.FieldValue.arrayUnion(product)
      });
      this.events.publish('coupon-codes:addProductAsNotApplicableSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async removeNotApplicableProduct(product, id) {
    try {
      await this.afs.collection('features').doc('coupons').collection('codes').doc(id).update({
        notApplicableProducts: product
      });
      this.events.publish('coupon-codes:removeNotApplicableProductSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async updateApplicableStatus(status, id) {
    try {
      await this.afs.collection('features').doc('coupons').collection('codes').doc(id).update({
        applicableStatus: status
      });
      this.events.publish('coupon-codes:updateApplicableStatusSuccess');
    } catch (error) {
      console.dir(error);
      this.logglyService.log(error);
    }
  }

  async verifyCouponCode(data: any) {
    try {
      // data['userId'] = this.userService.getUserId();
      let verifyCouponCode = firebase.functions().httpsCallable('orders-verifyCouponCode');
      verifyCouponCode(data).then((response) => {
        console.log('res for cc', response);
        if(response && response.data) {
          if(response.data.success === false) {
            this.events.publish('coupon-codes:couponCodeNotApplied', response.data.failureMsg);
          } else {
            this.events.publish('coupon-codes:couponCodeApplied', response.data);
          }
        }
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async setCouponDetails(details){
    try {
      await this.afs.collection('features').doc('coupons').set(details);
      return true;
    } catch (error) {
      console.dir(error);
    }
  }

  async getCouponDetails(){
    try {
      const couponDetails = await this.afs.collection('features').doc('coupons').valueChanges().pipe(first()).toPromise();
      return couponDetails;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsForCategory(cid) {
    const productRef = this.afs.collection('products', ref => ref.orderBy('sortedAt', 'desc').where("categories", "array-contains", cid));
    const productSnap = await productRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
        }))
    ).pipe(first()).toPromise();
    return productSnap
  }

  async getProductsForBrands(cid) {
    const productRef = this.afs.collection('products', ref => ref.orderBy('sortedAt', 'desc').where("brands", "array-contains", cid));
    const productSnap = await productRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
        }))
    ).pipe(first()).toPromise();
    return productSnap
  }
  async getCouponCodesForUser(uid) {
    try {
        const couponData: any = await this.afs.collection('features').doc('coupons').valueChanges().pipe(first()).toPromise() || { showAllCoupons: true };
        if (Object.keys(couponData).length && !couponData.showAllCoupons) {
            return [];
        }
        // const uid = await this.storage.get('uid');
        const allCoupons = await this.afs.collection('features').doc('coupons').collection('codes', ref => ref
            .orderBy('createdAt', 'desc')).valueChanges().pipe(first()).toPromise();

        const availableCoupons = allCoupons.filter(coupon => {
            if (moment().isSameOrBefore(moment(coupon.validUpto), 'day') && (coupon.qty - coupon.usage >= 1)) {
                if (coupon.specificUsers.isAllowed) {
                    if (coupon.specificUsers.users.some(u => u.id === uid)) {
                        return coupon;
                    }
                }
                 else {
                    return coupon;
                }
            }
        });
        console.log('availableCoupons', availableCoupons);
        return availableCoupons;
    } catch (error) {
        console.dir(error);
    }
}

}
