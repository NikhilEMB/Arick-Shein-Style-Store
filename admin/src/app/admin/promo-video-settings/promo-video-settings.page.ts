import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, Events, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { LabelService } from 'src/app/services/label/label.service';
import { LogglyLoggerService } from 'src/app/services/loggly-logger/loggly-logger.service';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';

@Component({
  selector: 'app-promo-video-settings',
  templateUrl: './promo-video-settings.page.html',
  styleUrls: ['./promo-video-settings.page.scss'],
})
export class PromoVideoSettingsPage implements OnInit {
  SHARED_LABELS: any;
  headerText = '';
  PROMO_VIDEO_SETTINGS_LABELS: any;
  promoVideo: any = {
    active: false,
    videoId: '',
    thumbnail: {
      url: ''
    },
  }

  loading: any;
  constructor(private labelService: LabelService,
              private events: Events,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private modalController: ModalController,
              private actionSheetController: ActionSheetController,
              private logglyService: LogglyLoggerService,
              private toastController: ToastController) { }

  ngOnInit() {
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.PROMO_VIDEO_SETTINGS_LABELS = this.labelService.labels['PROMO_VIDEO_SETTINGS'];
    this.headerText = this.PROMO_VIDEO_SETTINGS_LABELS['header_text'];
    this.initializeSubscriptions();
    this.events.publish('promo-popup:getPromoVideoData');
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }
  
  initializeSubscriptions() {
    this.events.subscribe('promo-popup:savePromoVideoSuccess', () => {
      if(this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert(this.PROMO_VIDEO_SETTINGS_LABELS['data_saved_msg'])
    });
    this.events.subscribe('promo-popup:publishPromoVideoData', (data) => {
      if(data) {
        this.promoVideo = data;
      }
    });
  }

  toggleActive() {
    this.promoVideo.active = !this.promoVideo.active;
  }

  removeImage() {
    this.promoVideo.thumbnail.url = '';
  }

  imgZoom(img: any) {
    this.modalController.create({
      component: ImageModalPage,
      cssClass:'photo-modal-class',
      componentProps: {
        imgs: [{url: img}],
        index: 0
      }
    }).then(modal => modal.present());
  }



  async savePromoVideo() {
    if(this.promoVideo.active && !this.promoVideo.thumbnail.url) {
      this.presentAlert(this.PROMO_VIDEO_SETTINGS_LABELS['upload_thumbnail_msg']);
    } else if(this.promoVideo.active && !this.promoVideo.videoId){
      this.presentAlert(this.PROMO_VIDEO_SETTINGS_LABELS['add_video_id_msg']);
    } else {
      await this.presentLoading();
      this.events.publish('promo-popup:savePromoVideo', this.promoVideo);
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: this.SHARED_LABELS['please_wait'],
      duration: 10000,
    });
    await this.loading.present();
  }


  removeSubscriptions() {
    this.events.unsubscribe('promo-popup:publishPromoVideoData');
    this.events.unsubscribe('promo-popup:savePromoVideoSuccess');
  }

  
  uploadImage(files: FileList) {
    //console.log(type);
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        let base64Image:any = event.target.result;
        this.promoVideo.thumbnail.url = base64Image;
        
      }
    }
  }

}

