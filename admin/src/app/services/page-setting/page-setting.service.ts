import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import { map, first } from 'rxjs/operators';
import { convertSnaps } from '../../services/db-utilis';

@Injectable({
  providedIn: 'root'
})
export class PageSettingService {

  constructor(
    private afs: AngularFirestore,
    private events: Events,
  ) { }

  initializeSubscriptions() {
    this.events.subscribe('page-setting:getPages', (route?) => {
      this.getPages(route);
    });
    this.events.subscribe('page-setting:deletePage', (id) => {
      this.deletePage(id);
    });
    this.events.subscribe('page-setting:addPage', (name, route?) => {
      this.addPage(name, route);
    });
  }

  async getPages(route?: any) {
    try {
      let type: string;
      if (route == "blog") {
        type = 'blog'
      }
      // else {
      //   type = 'page'
      // }

      let docRef: any = this.afs.collection('pages');
      if (type == "blog") {
        docRef = this.afs.collection('pages', ref => ref.where('type', '==', type));
      }

      let pageData = await docRef.snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();

      // console.log("pageData: ", pageData);
      this.events.publish('page-setting:publishPagesSuccess', pageData);
    } catch (error) {
      console.log("err", error);
    }
  }

  async deletePage(pageId: any){
    try {
      await this.afs.collection('pages').doc(pageId).delete();
      this.events.publish('page-setting:deletePageSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async addPage(pageName: string, route?: string) {
    let dataObj: any;
    if (route == "blog") {
      dataObj = {
        name: pageName,
        type: "blog"
      }
    } else {
      dataObj = {
        name: pageName,
        type: "page"
      };
    }

    await this.afs.collection('pages').add(dataObj).then(docRef => {
        this.events.publish('page-setting:pageAddedSuccess', docRef.id);
    })
    .catch(error => {
        console.log("Error adding document: ", error);
        this.events.publish('page-setting:pageAddedError');
    });
  }

}
