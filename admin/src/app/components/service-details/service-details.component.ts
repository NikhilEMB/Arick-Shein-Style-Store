import { Storage } from '@ionic/storage';
import { Component, OnInit, Input } from '@angular/core';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { ModalController, LoadingController, Events, AlertController, NavController } from '@ionic/angular';
import * as moment from 'moment';
@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
})
export class ServiceDetailsComponent implements OnInit {
  @Input() request: any;
  role = '';
  loading: any;
  constructor(private storage: Storage,
              private modalController: ModalController,
              private loadingController: LoadingController,
              private events: Events,
              private alertController: AlertController,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.storage.get('userRole').then((role) => {
      this.role = role;
    });
    this.initializeSubscriptions();
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }
  getDateTimeFormat(date){
    return moment(date).format('MMM D, YYYY hh:mm a');
  }

  initializeSubscriptions() {
    this.events.subscribe('services-feature:completeRequestSuccess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Request has been completed successfully.');
    });
  }

  imgZoom(img: any) {
    this.modalController.create({
      component: ImageModalPage,
      cssClass: 'photo-modal-class',
      componentProps: {
        imgs: [{url: img}],
        index: 0
      }
    }).then(modal => modal.present());
  }

  async completeRequest() {
    await this.presentLoading('Completing Request...', 5000);
    this.events.publish('services-feature:completeRequest', this.request.id);
  }

  async presentLoading(msg: string, drn: number) {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: drn,
    });
    await this.loading.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.back();
        }},
    ]
    });

    await alert.present();
  }

  removeSubscriptions() {
    this.events.unsubscribe('services-feature:completeRequestSuccess');
  }

}
