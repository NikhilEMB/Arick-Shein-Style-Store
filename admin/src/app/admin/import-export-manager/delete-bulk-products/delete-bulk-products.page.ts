import { Component, OnInit } from '@angular/core';
import { ImportExportManagerService } from 'src/app/services/import-export-manager/import-export-manager.service';
import { Papa } from 'ngx-papaparse';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-delete-bulk-products',
  templateUrl: './delete-bulk-products.page.html',
  styleUrls: ['./delete-bulk-products.page.scss'],
})
export class DeleteBulkProductsPage implements OnInit {

  buttonState: string = ''
  isProgressBarActive: boolean = false;
  providedProducts: any[] = []
  skuArr: any[] = []
  detectedFields: any[] = []
  allCSVProducts: any[] = []
  prodLength: number = 0
  failSKU: any[] = []
  successSKU: any[] = []

  constructor(
    private importExportManagerService: ImportExportManagerService,
    private alertController: AlertController,
    private toastController: ToastController,
    private papa: Papa,
  ) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    this.buttonState = 'Upload'
    this.skuArr = await this.importExportManagerService.fetchAllSKU()
    console.log('skuArr', this.skuArr)
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  async presentAlertConfirm(message: string, action?: string) {
    const alert = await this.alertController.create({
      header: 'Confirm deletion of provided SKUs!',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            if (action === 'delete') {
              this.processDeletion()
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToastWithOptions(header: string, message: string, errorCode: string) {
    const toast = await this.toastController.create({
      mode: 'ios',
      color: 'dark',
      header: header,
      message: message,
      duration: 3000,
      position: 'top',
      buttons: [
        {
          side: 'start',
          text: errorCode,
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  saveDisable() {
    if (this.buttonState === 'Upload') {
      return false
    } else if (this.buttonState = 'Delete') {
      return false
    } else {
      return true
    }
  }

  async checkValidCSV(event: any, jsonData: any) {
    if (event.target.files[0].name.includes('.csv')) {
      for (const mainField of jsonData[0]) {
        if ((mainField === 'Sku') || (mainField === 'sku')) {
          return true
        }
        else {
          await this.presentToastWithOptions('Invalid CSV Column(s)!', 'Pls Check the CSV before uploading.', 'ERR-191')
          return false
        }
      }
    } else {
      await this.presentToastWithOptions('Invalid File Format!', 'The file should be only in [ .csv ] format.', 'ERR-190')
      return false
    }
  }

  getCSVHeaderValue(field: string) {
    switch (field) {
      case 'Sku':
        return 'sku'
        break;
      case 'Name':
        return 'name'
        break;
      case 'Barcode':
        return 'barcodeNo'
        break;
      case 'Active':
        return 'active'
        break;
      case 'Is Variant':
        return 'variants'
        break;
      case 'Type of Variant':
        return 'variantType'
        break;
      case 'Variant Name':
        return 'variantName'
        break;
      case 'Price':
        return 'price'
        break;
      case 'Discounted Price':
        return 'discountedPrice'
        break;
      case 'Purchase Price':
        return 'purchasePrice'
        break;
      case 'Vendor Phone Number':
        return 'vendorPhoneNo'
        break;
      case 'Stocks':
        return 'quantity'
        break;
      case 'Shipping Weight':
        return 'shippingWt'
        break;
      case 'Minimum Quantity':
        return 'minQuantity'
        break;
      case 'Maximum Quantity':
        return 'maxQuantity'
        break;
      case 'Product Description':
        return 'prodDescription'
        break;
      case 'HSN Code':
        return 'hsnCode'
        break;
      case 'GST':
        return 'gst'
        break;
      case 'Color':
        return 'color'
        break;
      case 'Keywords':
        return 'keywords'
        break;
      case 'Out of Stock':
        return 'out_of_stock'
        break;
      case 'Categories':
        return 'catSubcat'
        break;
      case 'Brands':
        return 'brands'
        break;
      default: // experimental
        return field
    }
  }

  async deleteProductsHandler(event: any, state: any) {
    let jsonData = []
    if (state === 'Upload') {
      let csv = event.target.files[0]
      console.log('csv : ', csv)
      let options = {
        complete: async (result, file) => {
          jsonData = result.data
          let validity = this.checkValidCSV(event, jsonData)
          console.log('validity : ', validity)
          if (validity) {
            this.detectedFields = []
            this.prodLength = jsonData.length - 1
            for (const field of jsonData[0]) {
              this.detectedFields.push({
                name: field,
                value: this.getCSVHeaderValue(field),
                active: false
              })
            }
            // if (this.detectedFields.length) {
            //   this.buttonState = 'Delete'
            // }
            this.allCSVProducts = jsonData
            // * Remove headers
            this.allCSVProducts.shift()
            console.log('csv: ', this.allCSVProducts)
            console.log('detectedFields: ', this.detectedFields)
            console.log('prodLength: ', this.prodLength)
            // * Check SKU Validity
            for (const sortSKU of this.allCSVProducts) {
              console.log('sortSKU', sortSKU[0])
              if (sortSKU[0] !== '') {
                if (this.skuArr.some(sku => sku.productCode === sortSKU[0])) {
                  this.successSKU.push(sortSKU[0])
                } else {
                  this.failSKU.push(sortSKU[0])
                }
              }
            }
            // for (const sortSKU of this.allCSVProducts) {
            //   console.log('sortSKU', sortSKU[0])
            //   if (this.skuArr.some(sku => {
            //     if (sku.productCode === sortSKU[0]) {
            //       this.successSKU.push({
            //         productCode: sortSKU[0],
            //         pid: sku.pid
            //       })
            //     } 
            //   })) { }  
            // }
            // for (const sortSKU of this.allCSVProducts) {
            //   if (this.skuArr.some(sku => sku.productCode !== sortSKU[0])) {
            //     this.failSKU.push({
            //       productCode: sortSKU[0]
            //     })
            //   }
            // }
            console.log('success sku : ', this.successSKU)
            console.log('fail sku : ', this.failSKU)
            if (this.failSKU && this.failSKU.length) {
              await this.presentToastWithOptions('SKU Mismatch!', `Unidentified SKUs found in ${this.failSKU.length} entries!`, 'ERR-163')
              // return
            }
            if (this.successSKU && this.successSKU.length && this.detectedFields.length) {
              this.buttonState = 'Delete'
            }
          }
        }
      }
      this.papa.parse(csv, options)
    }
    if (state === 'Delete') {
      await this.presentAlertConfirm('Are you sure you want to delete the provided SKUs?' , 'delete')
    }
  }

  async processDeletion() {
    if (this.successSKU && this.successSKU.length) {
      let finalArr = []
      console.log('this.successSKU : ', this.successSKU)
      for (const skuObj of this.skuArr) {
        if (this.successSKU.some(sku => sku === skuObj.productCode)) {
          finalArr.push(skuObj.pid)
        }
        // console.log('sku : ', skuObj.productCode)
      }
      console.log('finalArr', finalArr)
      let response = await this.importExportManagerService.deleteBulkProducts(finalArr)
      console.log('response', response)
      if (response) {
        await this.resetState()
        await this.presentToastWithOptions('Successfully deleted SKUs!', `Total Deleted - ${response}`, 'TRU-144')
      } else {
        // this.resetState()
        await this.presentToastWithOptions('Error', 'Error while deleting', 'ERR-121')
      }
    } else {
      await this.presentToastWithOptions('Success SKU not found!', 'Not found - 404', 'ERR-161')
      // this.resetState()  
      return
    }
  }

  async resetState() {
    this.skuArr = []
    this.skuArr = await this.importExportManagerService.fetchAllSKU()
    this.buttonState = 'Upload'
    this.detectedFields = []
    this.allCSVProducts = []
    this.prodLength = 0
    this.failSKU = []
    this.successSKU = []
  }

}
