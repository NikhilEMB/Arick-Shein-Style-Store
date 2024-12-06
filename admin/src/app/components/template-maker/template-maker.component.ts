import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { first, map } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SharedService } from '../../services/shared/shared.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { environment } from 'src/environments/environment';
import { Events, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-template-maker',
  templateUrl: './template-maker.component.html',
  styleUrls: ['./template-maker.component.scss'],
})
export class TemplateMakerComponent implements OnInit {

  templateVar = '{{1}}'
  templateNewLine = "\\" + "n"
  availableTemplates = []
  logs = false
  useState = true
  templateDetails = {
    templateName: '',
    templateBody: '',
    templateParamCount: 0,
    unix: 0,
    time: '',
    id: ''
  }
  templateEditName: string = ''
  templateEditBody: string = ''

  constructor(
    private afs: AngularFirestore,
    private sharedService: SharedService,
    private http: HttpClient,
    private configService: ConfigService,
    private modalController: ModalController,
    private toastController: ToastController,
  ) { }

  async presentToastWithOptions(header: string, message: string, errorCode: string, id: string) {
    const toast = await this.toastController.create({
      mode: 'ios',
      color: 'danger',
      header: header,
      message: message,
      position: 'top',
      showCloseButton: true,
      buttons: [
        {
          side: 'start',
          text: errorCode,
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Delete',
          // role: 'cancel',
          handler: () => {
            console.log('Delete clicked');
            return new Promise(async (resolve, reject) => {
              const templateRef = await this.afs.collection('integrations').doc('whatsapp_promotion').collection('list').doc('twilio_promotion').collection('templates').doc(id).delete()
              console.log('deleteRef', templateRef)
              toast.dismiss()
              await this.getTemplate()
            })
          },
        }
      ]
    });
    toast.present();
  }

  async ngOnInit() {
    if (this.templateEditName && this.templateEditBody) {
      this.templateDetails.templateName = this.templateEditName
      this.templateDetails.templateBody = this.templateEditBody
    }
    this.availableTemplates = []
    await this.getTemplate()
  }

  containsWhitespace(str) {
    return /\s/.test(str);
  }

  validateTemplate() {
    if ((!this.templateDetails.templateName || this.containsWhitespace(this.templateDetails.templateName)) || (!this.templateDetails.templateBody)) {
      return true
    } else {
      return false
    }
  }

  async addTemplate() {
    await this.sharedService.presentLoading();
    return new Promise(async (resolve, reject) => {
      this.templateDetails.unix = Math.round((new Date()).getTime() / 1000);
      this.templateDetails.time = new Date().toLocaleString()
      let response = await this.afs.collection('integrations').doc('whatsapp_promotion').collection('list').doc('twilio_promotion').collection('templates').add({...this.templateDetails})
      console.log('addRef : ', response)
      if (response.id) {
        resolve({success: true})
        await this.getTemplate()
        this.templateDetails.templateName = ''
        this.templateDetails.templateBody = ''
        this.templateDetails.time = ''
        this.templateDetails.unix = 0
        this.templateDetails.id = response.id
        await this.sharedService.loading.dismiss();
      } else {
        resolve({success: false})
        await this.sharedService.loading.dismiss();
      }
    })
  }

  async getTemplate() {
    await this.sharedService.presentLoading();
    return new Promise(async (resolve, reject) => {
      let templates = []
      const manageSlots = await this.afs.collection('integrations').doc('whatsapp_promotion').collection('list').doc('twilio_promotion').collection('templates').snapshotChanges().pipe(
        map((actions: any) => actions.map(a => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data();
          // console.log('doc id: ' + id)
          templates.push({docId: id, ...data})
          // console.log('templates: ', JSON.stringify(templates));
        }))
      ).pipe(first()).toPromise();
      console.log('getRef', templates)
      if (templates.length) {
        this.logs = true
        const sortedUnix = templates.sort((a, b) => (b.unix) - (a.unix))
        this.availableTemplates = sortedUnix
        await this.sharedService.loading.dismiss();
      } else {
        this.logs = false
        this.availableTemplates = []
        await this.sharedService.loading.dismiss();
      }
    })
  }

  async deleteTemplate(id: string) {
    console.log('deleteTemplate', id)
    await this.sharedService.presentLoading();
    return new Promise(async (resolve, reject) => {
      await this.presentToastWithOptions('Delete Template!', 'Are you sure you want to delete this template?', 'WRG-156', id)
      await this.sharedService.loading.dismiss();
    })
  }

  async updateTemplate(id: string) {
    console.log('updateTemplate', id)
    await this.sharedService.presentLoading();
    return new Promise(async (resolve, reject) => {
      this.templateDetails.unix = Math.round((new Date()).getTime() / 1000);
      this.templateDetails.time = new Date().toLocaleString()
      const templateRef = await this.afs.collection('integrations').doc('whatsapp_promotion').collection('list').doc('twilio_promotion').collection('templates').doc(id).update({...this.templateDetails})
      console.log('updateRef', templateRef)
      await this.getTemplate()
      await this.sharedService.loading.dismiss();
    })
  }

  useTemplate(index: number) {
    this.templateDetails.templateName = this.availableTemplates[index].templateName
    this.templateDetails.templateBody = this.availableTemplates[index].templateBody
    this.templateDetails.id = this.availableTemplates[index].docId
    this.templateDetails.unix = 0
    this.templateDetails.time = ''
    this.useState = false
  }

  clearAll() {
    this.templateDetails.templateName = ''
    this.templateDetails.templateBody = ''
    this.templateDetails.time = ''
    this.templateDetails.unix = 0
    this.templateDetails.id = ''
    this.useState = true
  }

  addFormatting(type: string) {
    if (type === 'newLine') {
      // this.templateDetails.templateBody += '\\' + 'n'
      this.templateDetails.templateBody += '\n'
      console.log('body : ', this.templateDetails.templateBody)
    } else if (type === 'newVariable') {
      let count = (this.templateDetails.templateBody.match(/{{/g) || []).length;
      if (this.templateDetails.templateBody.charAt(this.templateDetails.templateBody.length-1) === ' ') {
        this.templateDetails.templateBody += `{{${count+1}}} ` 
      } else if (this.templateDetails.templateBody.charAt(this.templateDetails.templateBody.length-1) === '\n') {
        this.templateDetails.templateBody += `{{${count+1}}} ` 
      } else {
        this.templateDetails.templateBody += ` {{${count+1}}} ` 
      }
    }
  }

  finalizeTemplate() {
    let count = (this.templateDetails.templateBody.match(/{{/g) || []).length;
    this.templateDetails.templateParamCount = count
    this.modalController.dismiss(this.templateDetails);
  }

  closeModal() {
    // this.templateDetails.templateParamCount = 0
    this.modalController.dismiss(this.templateDetails);
  }

  ionViewDidLeave() {
    console.log('called ionViewDidLeave');
    this.closeModal()
  }

}  
