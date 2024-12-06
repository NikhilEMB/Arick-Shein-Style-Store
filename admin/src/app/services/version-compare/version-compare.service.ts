import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { first } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Injectable({
  providedIn: 'root'
})
export class VersionCompareService {

  constructor(private afs: AngularFirestore, 
              private events: Events,
              private fbStorage: AngularFireStorage,
              private storage: Storage,
              private appVersion: AppVersion) { }
  initializeSubscriptions() {
    this.events.subscribe('version-compare:versionCompare', () => {
      this.versionCompare();
    });
  }
  async versionCompare() {
    this.appVersion.getVersionNumber().then(async (version)=> {
      //console.log(version);
      const settingsData: any = await this.afs.collection('settings').doc('app').valueChanges().pipe(first()).toPromise();
      this.storage.set('appPackageName', settingsData.appPackageName);
      this.storage.set('appUrls', 
      {
        playstoreUrl: settingsData.playstoreUrl ? settingsData.playstoreUrl : '', 
        appStoreUrl: settingsData.appStoreUrl ? settingsData.appStoreUrl : '' 
      });
      if(settingsData.forceUpdate && (version.toString() !== settingsData.appVersion)) {
        this.storage.set('newUpdateAvailable', true);
      } else {
        this.storage.set('newUpdateAvailable', false);
      }
      }).catch((err) => {
        console.dir(err);
      });
    
  }
  removeSubscriptions() {
    this.events.unsubscribe('version-compare:versionCompare');
  }
}
