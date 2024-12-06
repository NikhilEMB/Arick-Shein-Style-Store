import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { BehaviorSubject, Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WhatsappDashboardService {
  menuItemsRef = this.afs.collection('whatsapp').doc('menu').collection('menu-items');
  broadcastLogsSub: Subscription;
  broadcastLogs = new BehaviorSubject([]);

  constructor(private afs: AngularFirestore, private fbStorage: AngularFireStorage,) { }

  async saveWhatsappCredentials(credentials: any) {
    return new Promise(async (resolve)=>{
      try {
        const docRef = await this.afs.collection('whatsapp').doc('account');
        docRef.get().toPromise().then(async (doc) => {
          if (doc.exists) {
            console.log('exists, updating data');
            docRef.update({credentials});
          } else {
            console.log('not exists setting data');
            docRef.set({credentials});
          }
          resolve(true);
        }).catch((error) => {
          console.error('your error', error);
          resolve(false);
        })
        await this.afs.collection('payment').doc('info').update({autoConfirmOrder: true});
      } catch (error) {
          console.log(error);
          resolve(false);
      }
    })
  }

  async getWhatsappCredentials() {
    return new Promise(async (resolve)=>{
      try {
          const doc = await this.afs.collection('whatsapp').doc('account').valueChanges().pipe(first()).toPromise();
          resolve(doc);
      } catch (error) {
          console.log(error);
      }
    })
  }

  async uploadMenuImg(base64Img){
    let downloadURL;
    if (base64Img.includes('data:image/jpeg;base64,') || base64Img.includes('data:image/jpg;base64,') || base64Img.includes('data:image/png;base64,') || base64Img.includes('data:image/gif;base64,')) {
      const imgRef: any = this.fbStorage.ref('whatsapp/menu/menu.png');
      await imgRef.putString(base64Img, 'data_url');
      downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
      console.log('imgUrl:',downloadURL);
    } else{
      return base64Img;
    }
    return downloadURL;
  }

  async getMenuItems(){
    try {
        const doc = await this.menuItemsRef.snapshotChanges().pipe( map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { ...data };
        }))
      ).pipe(first()).toPromise();
        return doc || [];
    } catch (error) {
        console.log(error);
    }
  }

  async setMenuItems(menuEntryPoint, menuButton1, menuButton2, menuButton3, deleteData){
    try {
      if (menuEntryPoint.header && menuEntryPoint.header.mediaUrl && menuEntryPoint.header.mediaUrl.length) {
        menuEntryPoint.header.mediaUrl = await this.uploadMenuImg(menuEntryPoint.header.mediaUrl)
        menuEntryPoint.header.type = 'image';
      }
      // console.log('menuEntryPoint:',menuEntryPoint);
      console.log('deleteData:',deleteData);
      if (deleteData && deleteData.deleteMenu3Items) {
        for (const [index, item] of menuButton3.list.entries()) {
          try {
            await this.deleteList(deleteData.menuItems, menuButton3, index);
          } catch (error) {
            console.log(`eror deleting menuButton3.list ${menuButton3.list[index]}`);
          }
        }
      }
      await this.menuItemsRef.doc('menu-entry-point').set(menuEntryPoint);
      await this.menuItemsRef.doc('menu-button-1').set(menuButton1);
      await this.menuItemsRef.doc('menu-button-2').set(menuButton2);
      await this.menuItemsRef.doc('menu-button-3').set(menuButton3);
      return true;
    } catch (error) {
        console.log(error);
        return false;
    }
  }

  async setListProducts(menuButton3, selectedCatProducts){
    try {
      console.log('menuButton3:',menuButton3);
      console.log('selectedCatProducts:',selectedCatProducts);
      await this.menuItemsRef.doc('menu-button-3').update({list: menuButton3.list});
      await this.menuItemsRef.doc(selectedCatProducts.id).set(selectedCatProducts);
      return true;
    } catch (error) {
        console.log(error);
        return false;
    }
  }

  async setListWithSubcat(selectedCatSubcategories, selectedCatProducts){
    try {
      console.log('selectedCatSubcategories:',selectedCatSubcategories);
      console.log('selectedCatProducts:',selectedCatProducts);
      await this.menuItemsRef.doc(selectedCatSubcategories.id).update({list: selectedCatSubcategories.list});
      await this.menuItemsRef.doc(selectedCatProducts.id).set(selectedCatProducts);
      return true;
    } catch (error) {
        console.log(error);
        return false;
    }
  }

  async deleteList(menuItems,menuButton3, index){
    try {
      if (menuButton3.list[index].isSubcategories) {
        for (const menuItem of menuItems) {
          if (menuItem.id == menuButton3.list[index].id) {
            for (const subcat of menuItem.list) {
              console.log('deleted subcat.id:',subcat.id);
              await this.menuItemsRef.doc(subcat.id).delete();
            }
            console.log('deleted menuItem.id:',menuItem.id);
            await this.menuItemsRef.doc(menuItem.id).delete();
          }
        }
      } else {
        await this.menuItemsRef.doc(menuButton3.list[index].id).delete();
        let tempMenuButton3 = JSON.parse(JSON.stringify(menuButton3));
        tempMenuButton3.list.splice(index,1);
        await this.menuItemsRef.doc('menu-button-3').set(tempMenuButton3);
      }
      return true;
    } catch (error) {
        console.log(error);
        return false;
    }
  }

  async deleteSubcat(catId, selectedCatSubcategories, index){
    try {
      await this.menuItemsRef.doc(selectedCatSubcategories.list[index].id).delete();
      console.log('delete doc selectedCatSubcategories.list[index].id:',selectedCatSubcategories.list[index].id);
      selectedCatSubcategories.list.splice(index,1);
      console.log('delete doc catId:',catId, 'updatedList:', selectedCatSubcategories.list);
      await this.menuItemsRef.doc(catId).update({list: selectedCatSubcategories.list});
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async changeSubcategoryStatus(menuButton3, selectedCatIndex) {
    try {
      console.log('menuButton3:',menuButton3);
      await this.menuItemsRef.doc('menu-button-3').update({list: menuButton3.list});
      
      const docRef = this.menuItemsRef.doc(menuButton3.list[selectedCatIndex].id);
      docRef.get().toPromise().then(async (doc) => {
        if (doc.exists) {
          let type = menuButton3.list[selectedCatIndex].isSubcategories ? 'list' : 'product_list';
          let obj = { type };
          if (type == 'list') {
            obj['list'] = [];
          }
          await this.menuItemsRef.doc(menuButton3.list[selectedCatIndex].id).update(obj);
          console.log(menuButton3.list[selectedCatIndex].id,' exists');
        } else {
          console.log('not exists setting data');
          let selectedCatProducts = {
            bodyText: '',
            headerText: '',
            id: '',
            list: [],
            type: 'list'
          };
          selectedCatProducts.id = menuButton3.list[selectedCatIndex].id;
          selectedCatProducts.bodyText = menuButton3.list[selectedCatIndex].title;
          selectedCatProducts.headerText = menuButton3.list[selectedCatIndex].title;
          await this.setListProducts(menuButton3, selectedCatProducts);
        }
        return true;
      }).catch((error) => {
        console.error('your error', error);
        return false;
      })
      return true;
    } catch (error) {
      console.dir(error);
      return false;
    }
  }

  async getAllTemplates() {
    return new Promise(async (resolve) => {
      try {
        const docWithId: any = this.afs.collection('whatsapp').doc('templates').collection('list', ref => ref
        .orderBy('createdAt', 'desc')).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data as {} };
          }))
        );
        const templates: any = await docWithId.pipe(first()).toPromise();
        resolve(templates || []);
      } catch (error) {
        resolve([]);
        console.log('err:', error);
      }
    });
  }

  async uploadFile(templateName, mediaType, base64){
    try {
      let mediaRef;
      mediaRef = this.fbStorage.ref(`whatsapp/templates/${templateName}/` + new Date().getTime().toString());
      if (mediaType == 'image') {
        await mediaRef.putString(base64, 'data_url');
      } else if (mediaType == 'document'){
        const metadata = {
            contentType: 'application/pdf',
        };
        console.log('base64:', base64);
        await mediaRef.put(base64, metadata);
      } else if (mediaType == 'video'){
        await mediaRef.put(base64);
      }
      const downloadURL = await mediaRef.getDownloadURL().pipe(first()).toPromise();
      console.log('downloadURL:',downloadURL);
      return downloadURL;
    } catch (err) {
      console.dir(err);
    }
  }

  async addTemplate(templateType, docId, templateDetails){
    try {
      if (templateType == 'advance' && (templateDetails.components[0].format == 'image' || templateDetails.components[0].format == 'video' || templateDetails.components[0].format == 'document')) {
        const downloadUrl = await this.uploadFile(templateDetails.name, templateDetails.components[0].format, templateDetails.components[0].mediaUrl);
        templateDetails.components[0].mediaUrl = downloadUrl;
      }
      await this.afs.collection('whatsapp').doc('templates').collection('list').doc(docId).set(templateDetails);
      return true;
    } catch (error) {
      console.log('error:', error);
      return false;
    }
  }

  async doBroadcast(data){
    try {
      console.log('data:', data);
      let getOrders = firebase.functions().httpsCallable('whatsappExpress-broadcast');
      getOrders(data).then((res) => {
        console.log('res:', res);
      })
      return true;
    } catch (error) {
      console.log('error:', error);
      return false;
    }
  }

  async getBroadcastLogs(templateId){
    return new Promise(async (resolve) => {
      try {
        let logs = [];
        this.broadcastLogsSub = this.afs.collection('whatsapp').doc('broadcast').collection('history', ref => ref.orderBy('createdAt', 'desc').where('templateName', '==', templateId)).snapshotChanges().subscribe(async response => {
          if(!response.length) {
            this.broadcastLogs.next([]);
            resolve([]);
        } else {
          logs = [];
          for (const res of response) {
            logs.push({ id: res.payload.doc.id, ...res.payload.doc.data() });
          }
          logs = [...logs];
          this.broadcastLogs.next([...logs]);
          resolve(logs);
        }
        })
      } catch (error) {
        console.dir(error);
        this.broadcastLogs.next([]);
        resolve([]);
      }
    });
  }

  async getLastBroadcastDetails(){
    try {
      const docWithId: any = this.afs.collection('whatsapp').doc('broadcast').collection('history', ref => ref.orderBy('createdAt', 'desc').limit(1)).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      const doc: any = await docWithId.pipe(first()).toPromise();
      return doc || [];
    } catch (error) {
      console.log(error);
    }
  }

  async syncProducts(){
    try {
      let syncProducts = firebase.functions().httpsCallable('whatsappExpress-syncCatalogue');
      syncProducts().then((res) => {
        console.log('res:', res);
      })
      return true;
    } catch (error) {
      console.log('error:', error);
      return false;
    }

  }
}
