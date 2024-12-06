import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminSettingsService } from 'src/app/services/admin-settings/admin-settings.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ProductsModalPage } from '../products-modal/products-modal.page';

@Component({
  selector: 'app-free-products',
  templateUrl: './free-products.page.html',
  styleUrls: ['./free-products.page.scss'],
})
export class FreeProductsPage implements OnInit {
  freeProductsLimit = false;
  limits = [
    {
    active: true,
    createdAt: new Date(),
    orderAmount: 0,
    perUser: 1,
    product: {
      type: '',
      id: '',
      name: ''
    }
  }
  ];

  constructor(private sharedService: SharedService, private modalController: ModalController, private adminSettings: AdminSettingsService) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    let obj:any = await this.adminSettings.getFreeProdLimit();
    console.log('obj:', obj);
    if (obj.freeProdLimit) {
      this.freeProductsLimit = obj.freeProdLimit.active ? obj.freeProdLimit.active : this.freeProductsLimit;
    }
    this.limits = obj.limits ? obj.limits : this.limits;
  }

  async toggleActive(){
    await this.adminSettings.saveFreeProdLimit({active: this.freeProductsLimit});
  }

  addMore(){
      this.limits.push({active: true, createdAt: new Date(), orderAmount: 0, perUser: 1, product: {type: '', id: '', name: ''} });
  }

  async remove(index, limit){
    let deleted = await this.adminSettings.deleteFreeProdLimit(limit);
    if (deleted) {
      this.limits.splice(index, 1);
    }
  }

  async presentProductsModal(index){
    const modal = await this.modalController.create({
    component: ProductsModalPage,
    backdropDismiss: false,
    });
    modal.onDidDismiss()
    .then((res) => {
      console.log('res.data',res);
      // if(res.data && res.data.id) {
      //   console.log('res.data',res.data);
      //   this.limits[index].product.id = res.data.id;
      //   this.limits[index].product.name = res.data.name;
      //   if (res.data.variant) {
      //     this.limits[index].product['variant'] = res.data.variant;
      //     this.limits[index].product.type = 'variant';
      //   } else{
      //     this.limits[index].product.type = 'single';
      //     delete this.limits[index].product['variant'];
      //   }
      //   console.log('variant:', this.limits[index].product['variant']);
      // }

      if (res.data && res.data && res.data.length) {
        for (const product of res.data) {
          console.log('res.data', res.data);
          this.limits[index].product.id = product.id;
          this.limits[index].product.name = product.name;
          console.log("res.data.variant",product.variant);
          if (product.variant) {
            this.limits[index].product['variant'] = product.variant;
            this.limits[index].product.type = 'variant';
          } else {
            this.limits[index].product.type = 'single';
            delete this.limits[index].product['variant'];
          }
        }
        console.log('variant:', this.limits[index].product['variant']);
      }

  });
    await modal.present();
  }
  
  async saveDetails(limit){
      if (limit.orderAmount!=null && limit.product.id && limit.perUser) {
        this.sharedService.presentLoading();
        let saved = await this.adminSettings.saveFreeProdLimits(limit);
        if (saved.success) {
          let obj:any = await this.adminSettings.getFreeProdLimit();
          this.limits = obj.limits ? obj.limits : this.limits;
          if (this.sharedService.loading) {
            this.sharedService.loading.dismiss();
          }
          this.sharedService.presentAlert(`Order Amount of ${limit.orderAmount} with free product ${limit.product.name} saved sucessfully.`);
        } else {
          if (this.sharedService.loading) {
            this.sharedService.loading.dismiss();
          }
          this.sharedService.presentAlert('Something went wrong. Please try again later');
        }
      } else {
        this.sharedService.presentAlert('Order Amount, product & per user limit cant be empty, either remove the field or fill them');
      
    }
  }

}
