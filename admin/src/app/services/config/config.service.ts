import { first } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public environment: any = environment;
  constructor(private afs: AngularFirestore) { }

  async loadConfig() {
    return this.afs.collection('settings').doc('environment').valueChanges().pipe(first()).toPromise().then(config => {
      let configKeys = Object.keys(config);
      let envKeys = Object.keys(this.environment);
      envKeys.forEach(key => {
        if(!configKeys.includes(key)) {
          config[key] = this.environment[key];
        }
      });
      this.environment = config;
      console.log('this.environment ', this.environment);
    });
  }

  getConfig() {
    return this.environment;
  }
}
