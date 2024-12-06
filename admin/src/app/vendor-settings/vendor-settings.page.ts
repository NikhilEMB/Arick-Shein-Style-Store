import { Component, OnInit } from '@angular/core';
import { VendorService } from '../services/vendor/vendor.service';
import { Storage } from '@ionic/storage';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-vendor-settings',
  templateUrl: './vendor-settings.page.html',
  styleUrls: ['./vendor-settings.page.scss'],
})
export class VendorSettingsPage implements OnInit {
  vendorId;
  settings = {
    activeByVendor: true,
    shopTime:{
      active: false,
      start: new Date(),
      end: new Date()
    },
    invoiceSettings: {
      logo: {
        adminLogo: true,
        url: ''
      },
      billingName: '',
      address: '',
      phoneNo: '',
      gstNo: '',
      panNo: '',
      signature: '',
      customMessage: ''
    }
  }
  multipleVendorInvoices = false;

  constructor(private vendorService: VendorService, private storage: Storage, private sharedService: SharedService) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    const uid = await this.storage.get('uid');
    this.vendorId = uid;
    let details:any = await this.vendorService.getVendorData(uid, 'details');
    if (details) {
      console.log('details:', details);
      this.settings.activeByVendor = 'activeByVendor' in details ? details.activeByVendor : this.settings.activeByVendor;
      this.settings['invoiceSettings'] = 'invoiceSettings' in details ? details.invoiceSettings : {};
      if (details.shopTime) {
        this.settings.shopTime = details.shopTime;
        this.settings.shopTime.start = details.shopTime.start;
        this.settings.shopTime.end = details.shopTime.end;
      }
    }
    
    const multiVendorSettings: any = await this.vendorService.getActiveStatus('service');
    if (multiVendorSettings) {
      this.multipleVendorInvoices = 'multipleVendorInvoices' in multiVendorSettings ? multiVendorSettings.multipleVendorInvoices : this.multipleVendorInvoices;
    }
  }

  async saveSettings(){
    if (this.settings.shopTime.active) {
      if(!(this.settings.shopTime.start && this.settings.shopTime.end)){
        this.sharedService.presentAlert('Please select Start & End Timings');
        return;
      }
    }
    //this.settings.shopTime.start = new Date(this.settings.shopTime.start);
    console.log('settingss:', this.settings);
    let success = await this.vendorService.updateVendorInfo(this.vendorId, this.settings);
    if (success) {
      this.sharedService.presentAlert('Settingss Saved Successfully');
    }
  }
  
  shopTimingsToggle() {
    this.settings.shopTime.active = !this.settings.shopTime.active;
  }
  
  uploadInvoiceImg(files: FileList, imgType) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        let base64Image: any = event.target.result;
        if (imgType === 'sign') {
          this.settings.invoiceSettings.signature = base64Image;
        } else {
          this.settings.invoiceSettings.logo.url = base64Image;
        }
      }
    }
  }

  removeImg(imgType: string) {
    if (imgType === 'sign') {
      this.settings.invoiceSettings.signature = '';
    } else {
      this.settings.invoiceSettings.logo.url = '';
    }
  }

}
