import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { SelectWidgetModalPage } from 'src/app/pages/homepage-setting/select-widget-modal/select-widget-modal.page';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-vendor-page',
  templateUrl: './vendor-page.component.html',
  styleUrls: ['./vendor-page.component.scss'],
})
export class VendorPageComponent implements OnInit {

  vendorId: string = ''
  vendorName: string = ''
  loading: any;
  pageData: any = [];
  role;
  constructor(private modalController: ModalController, private router: Router, private alertController: AlertController,
    private loadingController: LoadingController, private vendorService: VendorService,
    private storage: Storage,) { }

  async ngOnInit() {
    this.getSections()    
    this.role = await this.storage.get('userRole'); 
    // console.log(this.role);
     
  }

  addNewSection() {
    // if (this.productSections.length<this.sectionLimit)
    // {
    this.openVendorSectionModal();
    // }
    // else{
    //   this.presentAlert('Sections limit reached, Max '+ this.sectionLimit +' allowed');
    // }
  }

  async openVendorSectionModal() {
    this.modalController.dismiss()
    const modal = await this.modalController.create({
      component: SelectWidgetModalPage,
      backdropDismiss: false,
      cssClass: 'custom-modal',
      componentProps: { vendorId: this.vendorId }
    });
    modal.onDidDismiss().then(() => {
      this.getSections()
    })
    await modal.present();
  }

  async getSections() {
    try {
      let sections: any = await this.vendorService.getVendorSections(this.vendorId)
      if (sections && sections.sections) {
        this.pageData = sections.sections;
      }
    } catch (error) {
      console.log(error);
    }
  }

  openWidgetEdit(type, id, index) {
    this.modalController.dismiss()
    if (type == "image-banner" || type == "banner-slider") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-banner'], navigationExtras);
    }
    else if (type == "product-carousel" || type == "product-list") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-product-carousel'], navigationExtras);
    }
    else if (type == "image-block") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-image-block'], navigationExtras);
    }
    else if (type == "video-block") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-video-block'], navigationExtras);
    }
    else if (type == "text-block") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-text-block'], navigationExtras);
    }
    else if (type == "categories") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-categories'], navigationExtras);
    }
    else if (type == "brands") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-brands'], navigationExtras);
    }
    else if (type == "services") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-services'], navigationExtras);
    }
    else if (type == "form") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-form'], navigationExtras);
    }
    else if (type == "document") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-document'], navigationExtras);
    }
    else if (type == "vendors") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-vendors'], navigationExtras);
    }
  }

  async deleteSectionConfirm(widgetID, index: number) {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            // this.events.publish('widgets:deleteWidget', widgetID);
            this.deleteSection(index);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteSection(index: number) {
    this.presentLoading();
    this.pageData.splice(index, 1);
    try {
      let updateResult = await this.vendorService.updateSectionsVendor(this.vendorId, this.pageData)
      if (this.loading) {
        this.loading.dismiss();
      }
      if (updateResult) {
        this.presentAlert('Section deleted successfully!');
      }
    } catch (error) {
      console.log(error)
      this.presentAlert('Some error occured, please try again');

    }
  }

  async changeLocationStatus(index, type) {
    await this.presentLoading();
    if (type == "app") {
      if (this.pageData[index].location == "app") {
        this.pageData[index].location = "none";
      }
      else if (this.pageData[index].location == "none") {
        this.pageData[index].location = "app";
      }
      else if (this.pageData[index].location == "all") {
        this.pageData[index].location = "web";
      }
      else if (this.pageData[index].location == "web") {
        this.pageData[index].location = "all";
      }
    }
    else if (type == "web") {
      if (this.pageData[index].location == "web") {
        this.pageData[index].location = "none";
      }
      else if (this.pageData[index].location == "none") {
        this.pageData[index].location = "web";
      }
      else if (this.pageData[index].location == "all") {
        this.pageData[index].location = "app";
      }
      else if (this.pageData[index].location == "app") {
        this.pageData[index].location = "all";
      }
    }
    try {
      let updateResult = await this.vendorService.updateSectionsVendor(this.vendorId, this.pageData)
      if (this.loading) {
        this.loading.dismiss();
      }
      if (updateResult) {
        this.presentAlert('Location changed successfully!');
      }
    } catch (error) {
      console.log(error)
      this.presentAlert('Some error occured, please try again');

    }

  }

  async webSectionReorder(event) {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    let draggedItem = this.pageData.splice(event.detail.from, 1)[0];
    this.pageData.splice(event.detail.to, 0, draggedItem)
    event.detail.complete();
    let updateResult = await this.vendorService.updateSectionsVendor(this.vendorId, this.pageData)
    if (this.loading) {
      this.loading.dismiss();
    }
    if (updateResult) {
      this.presentAlert('Location changed successfully!');
    }
    if (this.loading) {
      this.loading.dismiss();
    }
    this.presentAlert('Page Save Successfully');
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait',
    });
    await this.loading.present();
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
