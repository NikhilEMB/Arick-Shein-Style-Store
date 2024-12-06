import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { firebase } from '@firebase/app';
import { Storage } from '@ionic/storage';
import { first, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SupportService {

  issuesRef = this.afs.collection('support').doc('issues').collection('list');
  queriesRef = this.afs.collection('support').doc('queries').collection('list');
  requirementsRef = this.afs.collection('support').doc('requirements').collection('list');


  constructor(public afs: AngularFirestore,private fbStorage: AngularFireStorage,
              private storage: Storage) { }

  async addDetailsOfSupport(data, supportType) {
    return new Promise(async(resolve) => {
      if(supportType === 'issue'){
        console.log(supportType);
        let imageArray = [];
            const issueId = this.issuesRef.ref.doc().id;

        for (const item of data.attachments.imageUrl) {
          const imageUrl = await this.getDownloadUrl(item, issueId);
          imageArray.push(imageUrl)  
      }
         data.attachments.imageUrl = imageArray;

        console.log('data.attachments.pdfUrl',data.attachments.pdfUrl);
        data.attachments.pdfUrl = await this.saveDocument(data.attachments.pdfUrl, issueId);
        // console.log('pdf array ',pdfUrl);
        await this.issuesRef.doc(issueId).set(data);
      }

      else if(supportType === 'queries'){
        console.log(supportType);
          let imageArray = [];
            const queriesId = this.queriesRef.ref.doc().id;

        for (const item of data.attachments.imageUrl) {
          const imageUrl = await this.getDownloadUrl(item, queriesId);
          imageArray.push(imageUrl)  
      }
         data.attachments.imageUrl = imageArray;

        console.log('data.attachments.pdfUrl',data.attachments.pdfUrl);
        data.attachments.pdfUrl = await this.saveDocument(data.attachments.pdfUrl, queriesId);
        // console.log('pdf array ',pdfUrl);
        await this.queriesRef.doc(queriesId).set(data);
      }
      
      else if(supportType === 'requirements'){
        console.log(supportType);
        let imageArray = [];
            const requirementId = this.requirementsRef.ref.doc().id;

        for (const item of data.attachments.imageUrl) {
          const imageUrl = await this.getDownloadUrl(item, requirementId);
          imageArray.push(imageUrl)  
      }
         data.attachments.imageUrl = imageArray;

        console.log('data.attachments.pdfUrl',data.attachments.pdfUrl);
        data.attachments.pdfUrl = await this.saveDocument(data.attachments.pdfUrl, requirementId);
        // console.log('pdf array ',pdfUrl);
        await this.requirementsRef.doc(requirementId).set(data);
      }
        resolve(true);
    })
  
    
  }

  // async addQueries(data) {
  //   console.log(data);
  //   const issueId = this.queriesRef.ref.doc().id;
  //   for (const item of data.attachments) {
  //     const url = await this.getDownloadUrl(item.url, issueId);
  //     item.url = url;

  //   }
  //   return await this.queriesRef.doc(issueId).set(data);
  // }

  // async addRequirements(data) {
  //   console.log(data);
  //   const issueId = this.requirementsRef.ref.doc().id;
  //   for (const item of data.attachments) {
  //     const url = await this.getDownloadUrl(item.url, issueId);
  //     item.url = url;

  //   }
  //   return await this.requirementsRef.doc(issueId).set(data);
  // }

  async getDownloadUrl(base64Image: any, issueId) {
    try {
      const imgRef: any = this.fbStorage.ref(`support/issues/${issueId}/attachments/` + new Date().getTime().toString() + '.png');
      await imgRef.putString(base64Image, 'data_url');
      const downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
      console.log('user image download url');
      console.log(downloadURL);
      return downloadURL;


    } catch (err) {
      console.dir(err);
    }
  }

  async saveDocument(file, issueId) {
    try {
      console.log('file',file);
                const pdfRef = this.fbStorage.ref(`support/issues/${issueId}/attachments`);
                const metadata = {
                    contentType: 'application/pdf',
                };
                await pdfRef.put(file, metadata);
                let downloadURL = await pdfRef.getDownloadURL().pipe(first()).toPromise();
                console.log('url pdf',downloadURL);
                return downloadURL           
    }
    catch (error) {
        console.dir(error);
    }
}  

  async getSupportTypeData(supportType) {
    return new Promise(async (resolve) => {
      const issues = await this.afs.collection('support').doc(supportType).collection('list', ref => ref.orderBy('createdAt', 'desc')).snapshotChanges().pipe(
        map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
        }))
    ).pipe(first()).toPromise();
    resolve(issues);
    });
  }

  async addComment(supportType, id, data){
    console.log(data);
    return await this.afs.collection('support').doc(supportType).collection('list').doc(id.toString()).collection('comments').add(data);
  }

  async getAllComment(supportType, id) {
    return new Promise(async (resolve) => {
      const comment = await this.afs.collection('support').doc(supportType).collection('list').doc(id.toString()).collection('comments', ref => ref.orderBy('postedAt','desc')).snapshotChanges().pipe(
        map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
        }))
    ).pipe(first()).toPromise();
    resolve(comment);
    });
  }
}
