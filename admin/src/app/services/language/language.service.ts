import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import { first, map } from 'rxjs/operators';
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private events: Events,
    private afs: AngularFirestore,
    private logglyService: LogglyLoggerService) { }


  initializeSubscriptions() {
    this.events.subscribe('language:getAvailableLanguages', () => {
    this.getAvailableLanguages();
    });
    this.events.subscribe('language:addLanguages', (langs) => {
    this.addLanguages(langs);
    });
    this.events.subscribe('language:getAddedLanguages', () => {
    this.getAddedLanguages();
    });
    this.events.subscribe('language:makeDefault', (id, languages) => {
    this.makeDefault(id, languages);
    });
    this.events.subscribe('language:deleteLang', (id, languages) => {
    this.deleteLang(id, languages);
    });
  }

  async getAvailableLanguages() {
    try {
      const langs = await this.afs.collection('languages').snapshotChanges().pipe(
        map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      console.log('langs', langs);
      this.events.publish('language:publishAvailableLanguages', langs);
      // var docRef = this.afs.collection("languages");
      // await docRef.get().toPromise().then((doc) => {
      //   const languageList = []
      //   doc.forEach((language)=>{
      //     let dataLanguage = language.data()
      //     languageList.push(dataLanguage['englishName']+"("+dataLanguage['langName']+")")
      //   })
      //   this.events.publish('languages:publishLanguagesSettings', languageList);
      // })
    } 
    catch (error) {
      console.dir(error);
      error['location'] = 'language-service:getAvailableLanguages'; 
      this.logglyService.log(error);
    }
  }

  async addLanguages(langs: any) {
    try {
      for (const l of langs) {
      await this.afs.collection('languages').doc(l.id).update({
      isAdded: l.isAdded
      });
      }
      this.events.publish('language:addLanguagesSuccess');
      this.events.publish('language:getAddedLanguages');
    } 
    catch (error) {
      console.dir(error);
      error['location'] = 'language-service:addLanguages'; 
      this.logglyService.log(error);
    }
  }

  async getAddedLanguages(route?) {
    try {
      const langs = await this.afs.collection('languages', ref =>  ref
      .where('isAdded', '==', true)
      .orderBy('sortedAt', 'asc')
      ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
      }))
      ).pipe(first()).toPromise();
      console.log('langs', langs);
      if (!route) {
        this.events.publish('language:publishAddedLanguages', langs);
      } 
      else {
        return langs;
      }
    } catch (error) {
      console.dir(error);
      error['location'] = 'language-service:getAddedLanguages'; 
      this.logglyService.log(error);
    }
  }

  async updateLangPosition(id: string, changedDate: any) {
    try {
      console.log('id & cdate', id, changedDate);
      await this.afs.doc(`languages/${id}`).update({sortedAt: changedDate});
      this.events.publish('language:updateLangPostionSucess');
    } 
    catch (error) {
      error['location'] = 'language-service:updateLangPosition';
      this.logglyService.log(error);
    }
  }

  async makeDefault(id: string, languages: any) {
    try {
      for (const l of languages) {
      if (l.id === id) {
      await this.afs.doc(`languages/${l.id}`).update({isDefault: true});
      } else {
      await this.afs.doc(`languages/${l.id}`).update({isDefault: false});
      }
      }
      this.events.publish('language:makeDefaultSuccess', id);
      this.events.publish('language:getAddedLanguages');
    } 
    catch (error) {
      error['location'] = 'language-service:makeDefault'; 
      this.logglyService.log(error);
    }
  }

  async deleteLang(id: string, languages: any) {
    try {
      await this.afs.doc(`languages/${id}`).update({isAdded: false});
      this.events.publish('language:deleteLangSuccess', id);
      this.events.publish('language:getAddedLanguages');
    } 
    catch (error) {
      error['location'] = 'language-service:deleteLang'; 
      this.logglyService.log(error);
    }
  }

}
