import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Papa } from 'ngx-papaparse';
import { ConfigService } from 'src/app/services/config/config.service';
import { ImportExportManagerService } from 'src/app/services/import-export-manager/import-export-manager.service';

@Component({
  selector: 'app-import-users',
  templateUrl: './import-users.page.html',
  styleUrls: ['./import-users.page.scss'],
})
export class ImportUsersPage implements OnInit {

  loading: any;
  headerIndex: number
  updateObj: any[] = []
  supportedUpdateFields = ['Phone Number', 'Name']
  buttonState: string = 'Upload'
  allUsers: any = []
  countryCode = this.configService.environment.defaultCountryCode
  finalUsers = []

  constructor(
    private toastController: ToastController,
    private papa: Papa,
    private importExportManagerService: ImportExportManagerService,
    private loadingController: LoadingController,
    private configService: ConfigService
  ) { }

  async ngOnInit() {}

  async ionViewWillEnter() {
    await this.presentLoading();
    this.allUsers = await this.importExportManagerService.getUserByRole('user', 'custom-justNumbers')
    console.log('allUsers', this.allUsers)
    await this.loading.dismiss();
  }

  async presentLoading(msg?, duration?) {
    this.loading = await this.loadingController.create({
      message: msg || 'Please Wait...',
    });
    await this.loading.present();
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

  saveDisable() {
    if (this.allUsers && this.allUsers.length) {
      return false
    } else {
      return true
    }
  }

  async checkValidCSV(event: any, jsonData: any) {
    if (event.target.files[0].name.includes('.csv')) {
      console.log('jsonData :', jsonData)
      for(let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].includes('Name') && jsonData[i].includes('Phone Number')) {
          this.headerIndex = i
        }
      }
      console.log('headerIndex :', this.headerIndex)
      if (jsonData[this.headerIndex].includes('Name') && jsonData[this.headerIndex].includes('Phone Number')) {
        return true
      } else {
        await this.presentToastWithOptions('Invalid CSV Format!', 'The CSV is either missing the Name or the Phone Number column(s)!', 'ERR-191')  
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
    await this.presentLoading();
    let jsonData = []
    if (state === 'Upload') {
      this.updateObj = []
      this.finalUsers = []
      let csv = event.target.files[0]
      console.log('csv : ', csv)
      let options = {
        complete: async (result: any, file: any) => {
          jsonData = result.data
          // jsonData.splice(-1,1)
          let validity = await this.checkValidCSV(event, jsonData)
          console.log('validity : ', validity)
          if (validity) {
            let nameIndex = jsonData[this.headerIndex].findIndex(f => f === 'Name')
            let phoneNumberIndex = jsonData[this.headerIndex].findIndex(f => f === 'Phone Number')
            console.log('nameIndex :', nameIndex)
            console.log('phoneNumberIndex :', phoneNumberIndex)
            for (let i = this.headerIndex + 1; i < jsonData.length; i++) {
              if (jsonData[i][nameIndex] && jsonData[i][phoneNumberIndex]) {
                // console.log(jsonData[i])
                this.updateObj.push({
                  name: jsonData[i][nameIndex],
                  phoneNumber: this.formatDeliveryPhoneNo(jsonData[i][phoneNumberIndex])
                })
              }
            }
            console.log(this.updateObj)
            let count = 0
            if (this.updateObj && this.updateObj.length) {
              for (const user of this.updateObj) {
                console.log('user : ', user)
                if (user.phoneNumber.toString().length != 10) {
                  await this.presentToastWithOptions('Invalid Phone Number!', `The user : ${user.name} has invalid phone number : ${user.phoneNumber} . You should provide a number with at least 10 digits`, 'ERR-190')
                  this.updateObj = []
                  return
                } else if (this.allUsers.includes(this.countryCode + user.phoneNumber)) {
                  await this.presentToastWithOptions('Already Exists!', `The user : ${user.name} with phone number : ${user.phoneNumber} already exists!.`, 'ERR-191')
                  this.updateObj = []
                  return
                } else {
                  count ++
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
      await this.loading.dismiss();
    } 
    if (state === 'Import') {
      for (const user of this.updateObj) {
        user.phoneNumber = this.countryCode + user.phoneNumber
        this.finalUsers.push(await this.importExportManagerService.addUserByAdmin(user))
      }
      console.log('state : ', this.finalUsers)
      await this.loading.dismiss();
      if (this.finalUsers && this.finalUsers.length) {
        this.allUsers = []
        this.allUsers = await this.importExportManagerService.getUserByRole('user', 'custom-justNumbers')
        this.buttonState = 'Upload'
      }
    }
  }

}
