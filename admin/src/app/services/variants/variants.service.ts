import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VariantsService {

  constructor(private events: Events,
              private afs: AngularFirestore) { }

  initializeSubscriptions() {
    this.events.subscribe('variants:getAllColors', () => {
      this.getAllColors();
    });
    this.events.subscribe('variants:deleteColor', (cid, i) => {
      this.deleteColor(cid, i);
    });
    this.events.subscribe('variants:getVariantsTypeData', () => {
      this.getVariantsTypeData();
    });
    this.events.subscribe('variants:getAllTemplates', () => {
      this.getAllTemplates();
    });
  }

  async getAllColors() {
    try {
      const colorsData = await this.afs.collection('variants').doc('colors').collection('options', ref => ref
      .orderBy('createdAt', 'desc')).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      this.events.publish('variants:publishAllColors', colorsData);
    } catch (error) {
      console.dir(error);
    }
  }

  async deleteColor(cid, i) {
    try {
      await this.afs.collection('variants').doc('colors').collection('options').doc(cid).delete();
      this.events.publish('variants:deleteColorSuccess', i);
    } catch (error) {
      console.dir(error);
    }
  }

  async getVariantsTypeData () {
    try {
      let attributes = [];
      this.afs.collection('variants').doc('types').valueChanges().subscribe((data: any) => {
        for (let index = 0; index < data.attributes.length; index++) {
         if(data.attributes[index].active) {
           attributes.push(data.attributes[index]);
         }
        }
        this.events.publish('variants:publishVariantsTypeData', attributes);
      })
    } catch (error) {
      console.dir(error);
    }
  }

  async getAllTemplates() {
    try {
      const templatesData = await this.afs.collection('variants').doc('templates').collection('options')
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      this.events.publish('variants:publishAllTemplates', templatesData);
    } catch (error) {
      console.dir(error);
    }
  }
  
}
