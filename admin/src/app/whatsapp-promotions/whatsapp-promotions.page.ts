// Whatsapp Broadcast Service
// Code Revision [ v1.5.2-alpha ]
// Status [ Working ]

import { Component, OnInit } from '@angular/core';
import { UserGroupsService } from "src/app/services/user-groups/user-groups.service";
import { ToastController } from '@ionic/angular';
import { SharedService } from '../services/shared/shared.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config/config.service';
import { AngularFirestore } from "@angular/fire/firestore";
import { first, map } from "rxjs/operators";
import { AlertController, ModalController } from "@ionic/angular";
import { UsersModalPage } from '../../app/admin/users-modal/users-modal.page';
import { TemplateMakerComponent } from '../../app/components/template-maker/template-maker.component'

@Component({
  selector: 'app-whatsapp-promotions',
  templateUrl: './whatsapp-promotions.page.html',
  styleUrls: ['./whatsapp-promotions.page.scss'],
})
export class WhatsappPromotionsPage implements OnInit {

  middlewareUrl = this.configService.environment.middleware ? this.configService.environment.middleware.url : 'https://us-central1-bwi-middleware.cloudfunctions.net';

  selectedTemplate = '';
  selectedService = '';
  allUsersPhoneNo = [];
  disableSave = true;
  availableCampaigns = [];
  selectedCampaign = '';
  currentCampaign = {
    param: ''
  };
  currentParam = '';

  selection = 'all';
  userGroups = [];
  isSelectAll = false;

  logs = false
  logsArr = [];

  sentDate = ''
  serviceUsed = ''
  SentTo = ''

  twilioTemplateButton: string = 'Make'
  twilioParams: string[] = []
  twilioEditName: string = ''
  twilioEditBody: string = ''
  twilioBody: string = ''
  twilioFormattedBody: string = ''
  twilioParamDesc: string = ''
  tempParam: string = ''

  constructor(
    private userGroupsService: UserGroupsService,
    private sharedService: SharedService,
    private http: HttpClient,
    private configService: ConfigService,
    private afs: AngularFirestore,
    private modalController: ModalController,
    private toastController: ToastController,
  ) { }

  async ngOnInit() {
    await this.sharedService.presentLoading();
    await this.getGroups();
    await this.getAllUsers();
    await this.getLogs();
    await this.sharedService.loading.dismiss();
    // if (this.disableSave) {
    //   await this.sharedService.presentAlert("No data available.");
    // }
  }

  async presentToastWithOptions(header: string, message: string, errorCode: string) {
    const toast = await this.toastController.create({
      mode: 'ios',
      color: 'dark',
      header: header,
      message: message,
      position: 'top',
      duration: 2000,
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


  async getGroups() {
    let grpData: any = await this.userGroupsService.getAllGroups();
    console.log('grpData', grpData);
    for (let i = 0; i < grpData.length; i++) {
      this.userGroups.push(grpData[i])
    }
    // if (this.userGroups.length > 0) {
    //   this.disableSave = false;
    // }
  }

  async getAllUsers() {
    if (this.selection == 'all') {
      let allUsers: any
      allUsers = await this.userGroupsService.getAllUsers()
      console.log('allUsers : ', allUsers);
      this.allUsersPhoneNo = []
      for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].role === 'user') {
          if (allUsers[i].phoneNo) {
            this.allUsersPhoneNo.push(
              {
                'waNo': this.validatePhoneNo(allUsers[i].phoneNo)
              }
            );
          }
        }
      }
      console.log('all users : ', this.allUsersPhoneNo);
      
      // if (this.allUsersPhoneNo.length > 0) {
      //   this.disableSave = false;
      // }
    }
  }

  async grpCheck(option: any) {
    // this.isSelectAll = !this.isSelectAll;
    // if (this.isSelectAll) {
    //   this.selection = 'groups'
    //   console.log(this.selection);
    // } else {
    //   this.selection = 'all'
    //   console.log(this.selection);
    //   this.getAllUsers()
    // }
    if (option) {
      if (option === 'all') {
        this.selection = option;
        console.log('all : ', option);
        this.getAllUsers()
      } else if (option === 'singleUser') {
        await this.openUsersModal()
        this.selection = option;
        console.log('singleUsers : ', option);
      } else if (option === 'groups') {
        this.selection = option;
        console.log('groups : ', option);
      }
    }
  }

  async getServicesOptions(option) {
    this.availableCampaigns = []
    this.selectedCampaign = ''
    console.log('current selection : ', option);
    if (!option) {
      this.disableSave = true
    }
    let docData: any = await this.userGroupsService.getCampaigns(option);
    if ((option ===  'aisensy' || option ===  'interakt')) {
      if (!docData.campDetails.length) {
        await this.presentToastWithOptions('No Campaign / Template Found!', `No Campaigns / Template Found in ${option} Integration`, 'ERR-181')
        this.disableSave = true;
      }
      console.log('docData : ', docData);
      this.availableCampaigns = docData.campDetails
    } else if (option === 'twilio') {
      console.log('docData : ', docData);
      
    }
  }

  async templateMaker() {
    const modal = await this.modalController.create({
      component: TemplateMakerComponent,
      componentProps: {
        templateEditName: this.twilioEditName,
        templateEditBody: this.twilioEditBody,
      },
      cssClass: 'custom-template-maker',
      backdropDismiss: true,
    })
    await modal.present();
    modal.onDidDismiss().then(async res => {
      this.twilioParams = []
      this.twilioBody = ''
      console.dir(res.data);
      if (res.data && (res.data.templateName && res.data.templateName !== "") && (res.data.templateBody && res.data.templateBody !== "") && (res.data.templateParamCount && res.data.templateParamCount > 0)) {
        this.twilioEditName = res.data.templateName
        this.twilioEditBody = res.data.templateBody
        this.twilioTemplateButton = 'Edit'
        this.twilioBody = res.data.templateBody
        for (let i = 0; i < res.data.templateParamCount; i++) {
          this.twilioParams.push('')
          this.twilioParamDesc = `Enter Only ${res.data.templateParamCount} param(s)!`
          this.tempParam = ''
          // this.disableSave = true
        }
      } else {
        await this.presentToastWithOptions('Invalid Param Format!', 'Minimum 1 param required.' , 'ERR-192')
        if (res.data) {
          this.twilioTemplateButton = 'Edit'
          this.twilioEditName = res.data.templateName
          this.twilioEditBody = res.data.templateBody
        } else {
          this.twilioTemplateButton = 'Make'
          this.twilioEditName = ''
          this.twilioEditBody = ''
        }
      }
    })
  }

  async getCampaignOptions(options) {
    console.log('current campaign : ', options);
    this.selectedCampaign = options
    let index = this.availableCampaigns.findIndex(item => item.campaignName === this.selectedCampaign)
    this.currentCampaign = this.availableCampaigns[index]
    this.currentParam = ''
    if (!options) {
      this.disableSave = true
    } else {
      this.disableSave = false
    }
  }

  async getGroupOptions(options) {
    await this.sharedService.presentLoading();
    if (this.selection == 'groups') {
      // console.log('options : ', options);
      let selectedGroups = [];
      for (let i = 0; i < options.length; i++) {
        selectedGroups.push(options[i]);
      }
      console.log('selectedGroups : ', selectedGroups);
      let allUsers = []
      for (let i = 0; i < selectedGroups.length; i++) {
        console.log('fetch grp : ', selectedGroups[i]);
        allUsers.push(await this.userGroupsService.getGroupUsers(selectedGroups[i]))
      }
      console.log('allUsers : ', allUsers);
      let finalArr = []
      finalArr = this.sortGroupsToArray(allUsers);
      if (finalArr.length === 0) {
        await this.presentToastWithOptions('No User(s) Found!', `No users found in this group`, 'ERR-199')
        this.disableSave = true
      } else {
        this.disableSave = false
      }
      console.log('finalArr : ', finalArr);

      this.allUsersPhoneNo = []
      for (let i = 0; i < finalArr.length; i++) {
        if (finalArr[i].phoneNo) {
          this.allUsersPhoneNo.push(
            {
              'waNo': this.validatePhoneNo(finalArr[i].phoneNo)
            }
          )
        }
      }
      console.log('all users groups : ', this.allUsersPhoneNo);
    }
    await this.sharedService.loading.dismiss();
  }

  sortGroupsToArray(grp) {
    let result = grp.reduce((r, e) => (r.push(...e), r), [])
    return result
  }

  validatePhoneNo(phoneNo: string) {
    let finalNo = ''
    if (phoneNo.includes('+')) {
      finalNo = phoneNo.substring(phoneNo.indexOf('+') + 1)
      return finalNo.length == 12 ? finalNo : undefined
    } else {
      return finalNo
    }
  }

  async openUsersModal() {
    const modal = await this.modalController.create({
        component: UsersModalPage,
        componentProps: {
          alreadyAddedUsers: [],
          groupDetails: {},
        },
        // cssClass: 'coupon-code-modal'
        cssClass: 'custom-modal'
    });
    modal.onDidDismiss().then(async res => {
        if (res && res.data) {
          console.log('res : ', res.data);
          if (!res.data.length) {
            await this.presentToastWithOptions('No Users Selected!', `Please select at least one user`, 'ERR-197')
            this.disableSave = true
          } else {
            console.log('here');
            this.allUsersPhoneNo = []
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].phoneNo) {
                this.allUsersPhoneNo.push(
                  {
                    'waNo': this.validatePhoneNo(res.data[i].phoneNo)
                  }
                )
              }
            }
            console.log('all SU : ', this.allUsersPhoneNo);
          }
        }
    });
    await modal.present();
}

  async getCampaignParams(params: any) {
    let str = params.replace(/\s+/g, '')
    this.currentParam = str
    console.log('params : ', this.currentParam);
    this.currentCampaign.param = this.currentParam;
    console.log('current : ', this.currentCampaign);
  }

  async getTwilioParams(params: any) {
    let str = params.replace(/\s+/g, '')
    console.log('params : ', str);
    let strLength = str.split(',')
    console.log('strLength : ', strLength.length);
    this.disableSave = true
    if (strLength.length > this.twilioParams.length) {
      await this.presentToastWithOptions('Invalid Param Format!', `More than ${this.twilioParams.length} param(s) not allowed.`, 'ERR-191')
      this.tempParam = this.tempParam.slice(0, -1)
      console.log('this.tempParam : ', this.tempParam);
      this.disableSave = true
    } else if (strLength.length == this.twilioParams.length) {
      if (strLength[strLength.length-1] !== '') {
        console.log('twilioBody : ', this.twilioBody.replace(/[0-9]}}/g, ''));
        console.log('str : ', strLength);
        let formattedStr = this.twilioBody.replace(/[0-9]}}/g, '')
        for (let char of strLength) {
          formattedStr = formattedStr.replace('{{', char)
        }
        console.log('formattedStr : ', formattedStr);
        this.twilioFormattedBody = formattedStr
        this.disableSave = false
      }
    }
  }

  getSelection(selection) {
    if (selection) {
      if (selection === 'all') {
        return 'All Users'
      } 
      if (selection === 'groups') {
        return 'Groups'
      }
      if (selection === 'singleUser') {
        return 'Custom Selected'
      }
    }
  }

  getSelectedCampaign(service: string) {
    if ((service === 'aisensy') || (service === 'interakt')) {
      let index = this.availableCampaigns.findIndex(item => item.campaignName === this.selectedCampaign)
      console.log('index : ', index);
      return this.availableCampaigns[index]
    } else if (service === 'twilio') {
      return this.twilioFormattedBody
    }
  }

  async saveSettings() {
    await this.sharedService.presentLoading();
    console.log(this.selectedService);
    if (this.selectedService) {
      if (this.allUsersPhoneNo.length !== 0) {
        let response: any = {}, logResponse: any = {}; 
        let logBody = {
          title: '',
          time: '',
          sendTo: '',
          unix: 0
        };
        if (this.selection) {
          let apiBody = {
            projectId: environment.firebase.projectId,
            selectedCampaign: this.getSelectedCampaign(this.selectedService),
            allUsersNo: this.allUsersPhoneNo,
            integrationCode: this.selectedService + '_promotion'
          }
          console.log('this.availableCampaigns: ' + JSON.stringify(this.availableCampaigns));
          console.log('selectedCampaign: ' + this.selectedCampaign);
          console.log(`apiBody ${this.selection} : `, apiBody);
          // !!! Broadcast Initializing
          response = await this.initBroadcastService(apiBody);
          if (response.success) {
            console.log('response : ' + JSON.stringify(response))
            await this.presentToastWithOptions('Broadcast Success!', `Message broadcasted successfully using ${this.selectedService}`, 'SCD-121')
            response = {}
            // !!! Save Log
            logBody.title = this.selectedService
            logBody.time = new Date().toLocaleString()
            logBody.sendTo = this.getSelection(this.selection)
            logBody.unix = Math.round((new Date()).getTime() / 1000);
            console.log(`logBody ${this.selection} : `, logBody);
            logResponse = await this.addLogs(logBody);
            if (logResponse.success) {
              await this.presentToastWithOptions('Log Saved!', `Message log saved successfully.`, 'SCD-122')
              Object.getOwnPropertyNames(logBody).forEach(function (prop) {
                logBody[prop] = '';
              });
            } else {
              await this.presentToastWithOptions('Log Unsaved!', `Message log not saved.`, 'ERR-195')
              Object.getOwnPropertyNames(logBody).forEach(function (prop) {
                logBody[prop] = '';
              });
            }
          }
        }
      }
    }
    else {
      await this.presentToastWithOptions('No Service Selected!', `Please select a broadcast service..`, 'ERR-180')
    }
    await this.sharedService.loading.dismiss();
  }

  async initBroadcastService(body) {
    return new Promise<any>((resolve, reject) => {
      try {
        this.http.post<any>(this.middlewareUrl + '/promotion-broadcastPromotion', body)
        .subscribe(async (response) => {
          console.log('response : ', response);
          resolve(response)
        }, error => {
          console.log('error : ', error);
          resolve({
            success: false,
            data: error 
          })
        })
      } catch (error) {
        console.log('catch error : ', error);
        resolve({
          success: false,
          data: error 
        })
      }
    })
  }

  async addLogs(body) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        await this.afs.collection('integrations').doc('logs').collection('whatsapp_logs').add({...body})
        resolve(
          {
            success: true
          }
        )
        await this.getLogs()
      } catch (error) {
        console.log('error : ', error);
        resolve(
          {
            success: false
          }
        )
      }
    })
  }

  async getLogs() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const snapshot = await this.afs.collection('integrations').doc('logs').collection('whatsapp_logs').valueChanges().pipe(first()).toPromise();
        // console.log('snapshot : ', snapshot);
        if (snapshot.length) {
          this.logs = true
          const sortedUnix = snapshot.sort((a, b) => (b.unix) - (a.unix))
          this.logsArr = sortedUnix
          // console.log('sorted : ', sortedUnix);
        }
      } catch (error) {
        
      }
    })
  }

}
