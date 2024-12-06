import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntegrationsService {

  constructor(private afs: AngularFirestore) { }

  async saveChoiceSettings(sidemenuChoice, settings) {
    return new Promise(async (resolve)=>{
      try {
        await this.afs.collection('integrations').doc(sidemenuChoice).set(settings);
        resolve(true);
      } catch (error) {
          console.log(error);
      }
    })
}

async getChoiceSettings(sidemenuChoice) {
  return new Promise(async (resolve)=>{
    try {
        const doc = await this.afs.collection('integrations').doc(sidemenuChoice).valueChanges().pipe(first()).toPromise();
        resolve(doc);
    } catch (error) {
        console.log(error);
    }
  })
}


  async saveSubChoiceSettings(settings,sidemenuChoice, integrationChoice) {
    return new Promise(async (resolve)=>{
      try {
        await this.afs.collection('integrations').doc(sidemenuChoice).collection('list').doc(integrationChoice).set(settings);
        resolve(true);
      } catch (error) {
          console.log(error);
      }
    })
}

async getSubChoiceSettings(sidemenuChoice, integrationChoice) {
  return new Promise(async (resolve)=>{
    try {
        const doc = await this.afs.collection('integrations').doc(sidemenuChoice).collection('list').doc(integrationChoice).valueChanges().pipe(first()).toPromise();
        resolve(doc);
    } catch (error) {
        console.log(error);
    }
  })
}



}
