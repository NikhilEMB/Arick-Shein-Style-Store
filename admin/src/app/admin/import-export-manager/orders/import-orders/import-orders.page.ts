import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Papa } from 'ngx-papaparse';
import { SharedService } from 'src/app/services/shared/shared.service';
import { map, first, take } from 'rxjs/operators';
import { ImportExportManagerService } from 'src/app/services/import-export-manager/import-export-manager.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
@Component({
  selector: 'app-import-orders',
  templateUrl: './import-orders.page.html',
  styleUrls: ['./import-orders.page.scss'],
})
export class ImportOrdersPage implements OnInit {
  headerIndex: number
  isDisableDatePicker: boolean = true;
  buttonState: string = 'Upload'
  updateObj: any[] = []
  orderLength: number = 0
  supportedUpdateFields = ['deliveryPhoneNo']
  allDeliveryAgents: any = []
  
  constructor(
    private toastController: ToastController,
    private papa: Papa,
    private importExportManagerService: ImportExportManagerService,
    private sharedService: SharedService,
    private afs: AngularFirestore,
  ) {}
  
  ngOnInit() {}
  
  
  async ionViewWillEnter() {
    this.allDeliveryAgents = await this.importExportManagerService.getAllDeliveryAgents()
    console.log('allDeliveryAgents', this.allDeliveryAgents)
  }

  async presentToastWithOptions(header: string, message: string, errorCode: string) {
    const toast = await this.toastController.create({
      mode: 'ios',
      color: 'dark',
      header: header,
      message: message,
      duration: 4000,
      position: 'top',
      buttons: [
        {
          side: 'start',
          text: errorCode,
          handler: () => {
            console.log('Favorite clicked');
          }
        }
      ]
    });
    toast.present();
  }

  saveDisable() {}

  async checkValidCSV(event: any, jsonData: any[]) {
    if (event.target.files[0].name.includes('.csv')) {
      // console.log('jsonData :', jsonData)
      for(let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].includes('orderId')) {
          // console.log('jsonData[i]:', jsonData[i])
          this.headerIndex = i
        }
      }
      console.log('headerIndex :', this.headerIndex)
      if (jsonData[this.headerIndex].includes('orderId') && jsonData[this.headerIndex].includes('deliveryPhoneNo')) {
        return true
      } else {
        await this.presentToastWithOptions('Invalid CSV Format!', 'The CSV is either missing the orderId or the deliveryPhoneNo column(s)!', 'ERR-191')  
        return false
      }
    } else {
      await this.presentToastWithOptions('Invalid File Format!', 'The file should be only in [ .csv ] format.', 'ERR-190')
      return false
    }
  }

  formatDeliveryPhoneNo(phoneNo: string) {
    let formattedStr = phoneNo.replace('[', '')
    formattedStr = formattedStr.replace(']', '')
    return formattedStr.trim()
  }

  async importOrdersHandler(event: any, state: string) {
    let jsonData = []
    if (state === 'Upload') {
      let csv = event.target.files[0]
      console.log('csv : ', csv)
      let options = {
        complete: async (result, file) => {
          jsonData = result.data
          let validity = await this.checkValidCSV(event, jsonData)
          console.log('validity : ', validity)
          if (validity) {
            let orderIdIndex = jsonData[this.headerIndex].findIndex(f => f === 'orderId')
            let deliveryPhoneNoIndex = jsonData[this.headerIndex].findIndex(f => f === 'deliveryPhoneNo')
            console.log('orderIdIndex :', orderIdIndex)
            console.log('deliveryPhoneNoIndex :', deliveryPhoneNoIndex)
            for (let i = this.headerIndex + 1; i < jsonData.length; i++) {
              if (jsonData[i][orderIdIndex] && jsonData[i][deliveryPhoneNoIndex]) {
                // console.log(jsonData[i])
                this.updateObj.push({
                  orderId: jsonData[i][orderIdIndex],
                  value: this.supportedUpdateFields.map(s => ({field: s, data: this.formatDeliveryPhoneNo(jsonData[i][deliveryPhoneNoIndex]), agentId: ''}))
                })
              }
            }
            console.log(this.updateObj)
            let count = 0
            if (this.updateObj && this.updateObj.length) {
              for (const order of this.updateObj) {
                if (order.value && order.value.length) {
                  if (this.allDeliveryAgents.some(a => a.phoneNo === order.value[0].data)) {
                    console.log('all good')
                    count++
                  } else {
                    console.log('error')
                    await this.presentToastWithOptions('Invalid Delivery Agent Phone Number!', 'The provided delivery agent phone number does not exist!', 'ERR-192')
                    this.updateObj = []
                    return
                  }
                }
              }
            }
            if (count == this.updateObj.length) {
              this.buttonState = 'Import'
            }
          }
        }
      }
      this.papa.parse(csv, options)
    }
    if (state === 'Import') {
      console.log('Importing...')
      if (this.updateObj && this.updateObj.length) {
        for (const order of this.updateObj)  {
          let agent = this.allDeliveryAgents.find(s => s.phoneNo === order.value[0].data)
          this.importExportManagerService.updateOrder(parseInt(order.orderId), agent.id)
        }
      }
    }
  }
}
