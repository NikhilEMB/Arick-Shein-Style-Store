import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(private events: Events,
              private afs: AngularFirestore) { }

  initializeSubscriptions() {
    this.events.subscribe('help:getHelpData', () => {
      this.getHelpData();
    });
  }

  async getHelpData() {
    try {
      const helpData = await this.afs.collection('help', ref => ref
      .orderBy('order', 'asc')).valueChanges().pipe(first()).toPromise();
      this.events.publish('help:publishHelpData', helpData);
    } catch (error) {
      console.dir(error);
    }
  }
}
