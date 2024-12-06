import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PlatformMediaService {

  constructor(
    private afs: AngularFirestore,
    private fbStorage: AngularFireStorage,
  ) { }

  async getPlatformMedia() {
    try {
      const docRef = this.afs.collection('platformMedia').doc('instagram');
      const query = await docRef.get().toPromise();
      return query.exists ? query.data() : {};
    }
    catch (err) {
      console.error('Failed to get platform media', err);
      return {};
    }
  }

  async updatePlatformMedia(data: any) {
    try {
      const docRef = this.afs.collection('platformMedia').doc('instagram');
      const query = await docRef.get().toPromise();
      if (query.exists) {
        await docRef.update(data);
      }
      else {
        await docRef.set(data);
      }
      return true;
    }
    catch (err) {
      console.error('updatePlatformMedia', err);
      return false;
    }
  }

  async getBase64FromFile(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (err) => {
        reject(err);
      };
    });
  }

  async getUrlForUploadedFile(base64: string, route: string) {
    try {
      const imgRef: any = this.fbStorage.ref(route);
      await imgRef.putString(base64, 'data_url');
      const downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
      return downloadURL || '';
    } catch (err) {
      console.error('Error downloading file url', err);
    }
  }

}
