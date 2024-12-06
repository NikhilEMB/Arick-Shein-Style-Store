import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  analtyticsRef = this.afs.collection('analytics');

  constructor(private events: Events,
              private afs: AngularFirestore) { }

  initializeSubscriptions() {
    this.events.subscribe('analytics:getProdcutsAnalytics', () => {
      this.getProdcutsAnalytics();
    });
    this.events.subscribe('analytics:getUsersAnalytics', () => {
      this.getUsersAnalytics();
    });
    this.events.subscribe('analytics:getSmsAnalytics', () => {
      this.getSmsAnalytics();
    });
    this.events.subscribe('analytics:getEmailsAnalytics', () => {
      this.getEmailsAnalytics();
    });
  }

  async getProdcutsAnalytics() {
    try {
      const pAnlts = await this.getAnalytics('products');
      this.events.publish('analytics:prodcutsAnalytics', pAnlts);
    } catch (error) {
      console.dir(error);
    }
  }
  async getUsersAnalytics() {
    try {
      const uAnlts = await this.getAnalytics('users');
      this.events.publish('analytics:usersAnalytics', uAnlts);
    } catch (error) {
      console.dir(error);
    }
  }
  async getSmsAnalytics() {
    try {
      console.log('sms')
      const sAnlts = await this.getAnalytics('sms');
      this.events.publish('analytics:smsAnalytics', sAnlts);
    } catch (error) {
      console.dir(error);
    }
  }
  async getEmailsAnalytics() {
    try {
      const eAnlts = await this.getAnalytics('emails');
      this.events.publish('analytics:emailsAnalytics', eAnlts);
    } catch (error) {
      console.dir(error);
    }
  }

  async getAnalytics(type: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const anlts = await this.analtyticsRef.doc(type).valueChanges().pipe(first()).toPromise();
      resolve(anlts);
    });
  }

  async getProductViews(productId: string) {
    try {
      if (productId) {
        const docRef = this.afs.collection('products').doc(productId).collection('analytics').doc('data')
        let productAnalytics: any = await docRef.valueChanges().pipe(first()).toPromise();
        console.log("productViews : ", productAnalytics.viewsCount);
        
        if (productAnalytics) {
          return productAnalytics;
        }
        else {
          return false;
        }
      }
    }
    catch (error) {
      console.log("Error getting product views : ", error);
      return false;
    }
  }

}
