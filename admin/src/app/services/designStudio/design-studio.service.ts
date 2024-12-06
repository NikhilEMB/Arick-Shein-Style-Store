import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { first, map } from 'rxjs/operators';
import { convertSnaps } from '../../services/db-utilis';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class DesignStudioService {

  constructor(private afs: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    private sharedService: SharedService) { }

  async getActiveStatus() {
    return new Promise(async (resolve, reject) => {
      let data;
      data = await this.afs.collection('studio').doc('website').valueChanges().pipe(first()).toPromise();
      resolve(data);
    });
  }

  async setActiveStatus(status) {
    return new Promise(async (resolve, reject) => {
      await this.afs.collection('studio').doc('website').set({ active: status })
      resolve(true);
    });
  }

  async getPageData() {
    let list = [];
    return new Promise(async (resolve, reject) => {
      const pages: any = await this.afs.collection('pages').snapshotChanges().pipe(
        map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();

      for (const p of pages) {
        let sections = [];
        // console.log('page:', p);
        if (p.sections) {
          for (const s of p.sections) {
            // if (s.widgetType == 'categories' || s.widgetType == 'brands' || s.widgetType == 'services' || s.widgetType == 'vendors'
            //   || s.widgetType == 'product-carousel' || s.widgetType == 'product-list' || s.widgetType == 'image-banner'
            //   || s.widgetType == 'banner-slider' || s.widgetType == 'image-block' || s.widgetType == 'video-block' || s.widgetType == 'text-block'
            //   || s.widgetType == 'form' || s.widgetType == 'document') {
            //   sections.push(s);
            //   console.log('pushed:', sections);
            // }
            sections.push(s);
            // console.log('pushed sections:', sections);
          }
          if (sections && sections.length > 0) {
            list.push({ id: p.id, name: p.name, sections: sections, active: false, slug: 'slug' in p ? p.slug : {} });
            // console.log('list:', list);
          }
        }
      }
      console.log('list:', list);
      resolve(list);
    });
  }

  async getGlobalStyleData() {
    return new Promise(async (resolve, reject) => {
      let data;
      data = await this.afs.collection('studio').doc('website').collection('sections').doc('global').valueChanges().pipe(first()).toPromise();
      resolve(data);
    });
  }

  async updateGlobalStyleData(id, type, styleObj) {
    return new Promise(async (resolve, reject) => {
      let docRef = await this.afs.collection('studio').doc('website').collection('sections').doc('global');
      docRef.get().toPromise().then(async (doc) => {
        if (doc.exists) {
          if (type == 'itemStyle') {
            await this.afs.collection('studio').doc('website').collection('sections').doc('global').update({ itemStyle: styleObj })
          }
          if (type == 'productStyle') {
            await this.afs.collection('studio').doc('website').collection('sections').doc('global').update({ productStyle: styleObj })
          }
          if (type == 'productDetailStyle') {
            await this.afs.collection('studio').doc('website').collection('sections').doc('global').update({ productDetailPage: styleObj })
          }
        } else {
          if (type == 'itemStyle') {
            await this.afs.collection('studio').doc('website').collection('sections').doc('global').set({ itemStyle: styleObj })
          }
          if (type == 'productStyle') {
            await this.afs.collection('studio').doc('website').collection('sections').doc('global').set({ productStyle: styleObj })
          }
          if (type == 'productDetailStyle') {
            await this.afs.collection('studio').doc('website').collection('sections').doc('global').set({ productDetailPage: styleObj })
          }
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
      resolve(true);
    });
  }

  async updateStyleData(id, type, styleObj) {
    return new Promise(async (resolve, reject) => {
      if (type == 'brands') {
        await this.afs.collection('brands').doc(id).update({ style: styleObj })
      }
      if (type == 'categories') {
        await this.afs.collection('categories').doc(id).update({ style: styleObj })
      }
      resolve(true);
    });
  }

  async updateSubStyleData(catId, subcatId, styleObj) {
    return new Promise(async (resolve, reject) => {
      await this.afs.collection('categories').doc(catId).collection('subcategories').doc(subcatId).update({ style: styleObj })
      resolve(true);
    });
  }

  async updateSectionData(sectionId, styleObj) {
    return new Promise(async (resolve, reject) => {
      await this.afs.collection('widgets').doc(sectionId).update({ style: styleObj })
      resolve(true);
    });
  }

  async headerStyleData(object) {
    return new Promise(async (resolve, reject) => {
      const headerRef = await this.afs.collection('studio').doc('website').collection('sections').doc('header')
      headerRef.get().toPromise()
        .then(async (docSnapshot) => {
          if (docSnapshot.exists) {
            await headerRef.update(object)
            resolve(true);
          } else {
            await headerRef.set(object)
            resolve(true);
          }
        });
    });
  }

  async getHeaderStyleData() {
    return new Promise(async (resolve, reject) => {
      let data: any = []
      const headerRef = await this.afs.collection('studio').doc('website').collection('sections').doc('header')
      headerRef.get().toPromise()
        .then(async (docSnapshot) => {
          if (docSnapshot.exists) {
            data = await headerRef.valueChanges().pipe(first()).toPromise();
            resolve(data);
          } else {
            data = await this.afs.collection('studio').doc('website').collection('sections').doc('defaultHeader').valueChanges().pipe(first()).toPromise();
            resolve(data);
          }
        });
    });
  }

  async getStyleData(id, type) {
    return new Promise(async (resolve, reject) => {
      let data;
      if (type == 'brands') {
        data = await this.afs.collection('brands').doc(id).valueChanges().pipe(first()).toPromise()
      }
      if (type == 'categories') {
        data = await this.afs.collection('categories').doc(id).valueChanges().pipe(first()).toPromise()
      }
      resolve(data);
    });
  }

  async getSubStyleData(catId, subcatId) {
    return new Promise(async (resolve, reject) => {
      let data = await this.afs.collection('categories').doc(catId).collection('subcategories').doc(subcatId).valueChanges().pipe(first()).toPromise()
      resolve(data);
    });
  }

  async getSectionData(sectionId) {
    return new Promise(async (resolve, reject) => {
      let data = await this.afs.collection('widgets').doc(sectionId).valueChanges().pipe(first()).toPromise()
      resolve(data);
    });
  }

  async uploadLogoImg(logoImg) {
    let imgType = this.sharedService.getImageType(logoImg);
    const imgRef = this.angularFireStorage.ref('logo/logoImg' + imgType);
    await imgRef.putString(logoImg, 'data_url');
    let downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
    return downloadURL;
  }

  async getSectionBannerLength(sectionId) {
    // console.log(sectionId);    
    return new Promise(async (resolve) => {
      let data = this.afs.collection('widgets').doc(sectionId).collection('webSlides').get().subscribe(doc => {
        resolve(doc ? doc.size : 0);
      });
    })
  }

  async uploadWidgetBgImg(Img, id) {
    let imgType = this.sharedService.getImageType(Img);
    const imgRef = this.angularFireStorage.ref(`widgets/${id}/bgImage` + imgType);
    await imgRef.putString(Img, 'data_url');
    let downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
    return downloadURL;
  }

  // async deleteLogoImg(imgUrl) {
  //   let imgRef = this.angularFireStorage.storage.refFromURL(imgUrl);
  //   imgRef.delete();
  // }

}
