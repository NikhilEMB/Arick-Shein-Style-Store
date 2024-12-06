import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, Events, LoadingController, AlertController, IonContent, Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Storage } from '@ionic/storage';
import { BrandsService } from 'src/app/services/brands/brands.service';

@Component({
  selector: 'app-all-brands',
  templateUrl: './all-brands.page.html',
  styleUrls: ['./all-brands.page.scss'],
})
export class AllBrandsPage implements OnInit {

  loading: any;
  brands: any = [];
  searchBrand: string = '';
  devHeight: any;
  showNoBrands: boolean = false;
  showSearch: boolean = false;
  @ViewChild(IonContent, {static: false}) content: IonContent;
  constructor(public modalController: ModalController,
              private events: Events,
              private router: Router,
              public loadingController: LoadingController,
              public alertController: AlertController,
              private brandsService: BrandsService,
              private platform: Platform) {}
  async onRenderBrands(event: { detail: { from: any; to: any; complete: () => void; }; }) {
    await this.presentLoading('Updating Position...', 5000);
    console.log(`Moving category from ${event.detail.from} to ${event.detail.to}`);
    const start = event.detail.from;
    // tslint:disable-next-line: variable-name
    const id = this.brands[start].id;
    console.log('brandsLength', this.brands.length);
    console.log('start', start);
    const end = event.detail.to;
    console.log('end', end);
    if ( start < end && end !== this.brands.length - 1) {
      console.log('from top to mid');
      const firstDate = this.brands[end].sortedAt.toDate().getTime();
      const secondDate = this.brands[end + 1].sortedAt.toDate().getTime();
      console.log('fistdate', firstDate);
      console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      console.log('finalDate', new Date(changedDate));
      this.brandsService.updateBrandsPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else if (start < end && end === this.brands.length - 1) {
      console.log('from top to bottom');
      const changedDate = this.brands[end].sortedAt.toDate().getTime() - 5 * 60000;
      this.brandsService.updateBrandsPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else if (start > end && end !== 0) {
      console.log('from bottom to mid');
      const firstDate = this.brands[end].sortedAt.toDate().getTime();
      const secondDate = this.brands[end - 1].sortedAt.toDate().getTime();
      console.log('fistdate', firstDate);
      console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      console.log('finalDate', new Date(changedDate));
      this.brandsService.updateBrandsPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else {
      console.log('from bottom to top');
      const changedDate = this.brands[end].sortedAt.toDate().getTime() + 5 * 60000;
      this.brandsService.updateBrandsPosition(id, new Date(changedDate));
    }
    const draggedItem = this.brands.splice(event.detail.from, 1)[0];
    this.brands.splice(event.detail.to, 0, draggedItem);
    event.detail.complete();
  }

  ionViewWillEnter() {
    this.devHeight = this.platform.height();
    this.events.publish('brands:getAllBrandsForAdmin');
    this.initializeSubscriptions();
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
    this.showSearch = false;
  }
  ngOnInit() {}

  initializeSubscriptions() {
    console.log('in initializeSubscriptions');

    this.events.subscribe('brands:publishAllBrandsForAdmin', (brands) => {
      this.showNoBrands = false;
      this.brands = brands;
      console.log('brands', brands);
    });
    this.events.subscribe('brands:noBrandAvailableForAdmin', () => {
      console.log('noBrandAvailable');
      this.showNoBrands = true;
    });
    this.events.subscribe('brands:updateBrandsPostionSucess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
    });
    this.events.subscribe('brands:deleteBrandSuccess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Brand deleted successfully!');
    });
  }

  editBrand(brand: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        brandData: brand
      }
    };
    this.router.navigate(['add-brand'], navigationExtras);
  }
  goToAddNew(page: string) {
    this.router.navigate([page]);
  }
  async deleteBrandConfirm(bid: string, index: number) {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete this category',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteBrand(bid, index);
            
          }
        }
      ]
    });

    await alert.present();
  }
  async deleteBrand(bid: string, index: number) {
    await this.presentLoading('Deleting brand...', 5000);
    this.events.publish('brands:deleteBrand', bid);
    this.brands.splice(index, 1);
  }

  clearsearchBrand() {
    this.searchBrand = null;
  }
  
  async presentAlert(desc: any) {
    const alert = await this.alertController.create({
      message: desc,
      buttons: ['Ok']
    });
    await alert.present();
  }
  async presentLoading(msg: string, drn: number) {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: drn
    });
    await this.loading.present();
  }
  removeSubscriptions() {
    this.events.unsubscribe('brands:publishAllBrandsForAdmin');
    this.events.unsubscribe('brands:noBrandAvailableForAdmin');
    this.events.unsubscribe('brands:updateBrandsPostionSucess');
    this.events.unsubscribe('brands:deleteBrandSuccess');
  }

}
