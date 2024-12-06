import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Events } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class PromoPopupService {
  popupRef = this.afs.collection('popups').doc('launch');
  promoVideoRef = this.afs.collection('videos').doc('promo');

  constructor(
    private events: Events,
    private afs: AngularFirestore,
    private fbStorage: AngularFireStorage,
    private logglyService: LogglyLoggerService,
    private sharedService: SharedService
  ) { }

  initializeSubscriptions() {
    this.events.subscribe('promo-popup:savePopup', (data) => {
      this.savePopup(data);
    });

    this.events.subscribe('promo-popup:getPopupData', () => {
      console.log('subscribe promo-popup:getPopupData');
      this.getPopupData();
    });

    this.events.subscribe('promo-popup:savePromoVideo', (data) => {
      this.savePromoVideo(data);
    });
    this.events.subscribe('promo-popup:getPromoVideoData', () => {
      this.getPromoVideoData();
    });
  }

  async savePopup(data: any) {
    try {
      let baseImg = '';
      let pdfFile = '';
      let popup = JSON.parse(JSON.stringify(data));
      console.log('popup', popup);
      if (popup.banner.url.includes('data:image/jpeg;base64,')
        || popup.banner.url.includes('data:image/jpg;base64,')
        || popup.banner.url.includes('data:image/png;base64,')
        || popup.banner.url.includes('data:image/gif;base64,')) {
        baseImg = popup.banner.url;
        delete popup.banner;
      }
      if (popup.link.type == 'pdf') {
        console.log('type', popup.link.type);
        pdfFile = data.link.url;
        delete popup.link.url;
        console.log("pdfFile", pdfFile);
        const pdfRef = this.fbStorage.ref(`popups/launch/pdf/`);
        const metadata = {
          contentType: 'application/pdf',
        };
        await pdfRef.put(pdfFile, metadata);
        let downloadURL = await pdfRef.getDownloadURL().pipe(first()).toPromise();
        console.log('downloadURL', downloadURL)
        let pdfLink = {
          type: 'pdf',
          id: '',
          name: '',
          url: downloadURL
        }
        popup['link'] = pdfLink;
      }
      popup['lastUpdatedAt'] = new Date();

      // await this.popupRef.set(popup);
      await this.popupRef.get().toPromise().then(async (doc) => {
        if (doc.exists) {
          await this.popupRef.update(popup);
        } else {
          await this.popupRef.set(popup);
        }
      });

      if (baseImg) {
        let imgType = this.sharedService.getImageType(baseImg);
        const imgRef: any = this.fbStorage.ref(`popups/launch/image/` + new Date().getTime().toString() + imgType);
        await imgRef.putString(baseImg, 'data_url');
      }
      this.events.publish('promo-popup:savePopupSuccess');
    } catch (error) {
      console.log("error", error);
      this.logglyService.log(error);
    }
  }

  async getPopupData(route?) {
    console.log('servicegetPopupData');
    try {
      const popup = await this.popupRef.valueChanges().pipe(first()).toPromise();

      console.log('servicegetPopupData try', popup);
      if (!route) {
        this.events.publish('promo-popup:publishPopupData', popup);
      } else {
        return popup;
      }
    } catch (error) {
      console.dir(error);
      this.logglyService.log(error);
    }
  }

  async savePromoVideo(data: any) {
    try {
      let baseImg = '';
      let video = JSON.parse(JSON.stringify(data));
      console.log('video', video);
      if (video.thumbnail.url.includes('data:image/jpeg;base64,') || video.thumbnail.url.includes('data:image/jpg;base64,') || video.thumbnail.url.includes('data:image/png;base64,') || video.thumbnail.url.includes('data:image/gif;base64,')) {
        baseImg = video.thumbnail.url;
        delete video.thumbnail;
      }
      video['lastUpdatedAt'] = new Date();
      await this.promoVideoRef.set(video);
      if (baseImg) {
        let imgType = this.sharedService.getImageType(baseImg);
        const imgRef: any = this.fbStorage.ref(`videos/promo/image/` + new Date().getTime().toString() + imgType);
        await imgRef.putString(baseImg, 'data_url');
      }
      this.events.publish('promo-popup:savePromoVideoSuccess');
    } catch (error) {
      console.dir(error);
      this.logglyService.log(error);
    }
  }

  async getPromoVideoData(route?) {
    try {
      const promoVideo = await this.promoVideoRef.valueChanges().pipe(first()).toPromise();
      if (!route) {
        this.events.publish('promo-popup:publishPromoVideoData', promoVideo);
      } else {
        return promoVideo;
      }
    } catch (error) {
      console.dir(error);
      this.logglyService.log(error);
    }
  }
}
