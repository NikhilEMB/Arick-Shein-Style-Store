import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config/config.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { WhatsappDashboardService } from 'src/app/services/whatsapp-dashboard/whatsapp-dashboard.service';

@Component({
  selector: 'app-add-whatsapp-template',
  templateUrl: './add-whatsapp-template.page.html',
  styleUrls: ['./add-whatsapp-template.page.scss'],
})
export class AddWhatsappTemplatePage implements OnInit {
  templateType = 'basic';
  templateDetails = {
    createdAt: new Date(),
    type: 'template',
    name: '',
    components: [
      {
        type: 'body',
        text: ''
      }
    ],
    language: 'en_US',
    category: ''
  }

  advanceTemplateDetails = {
    createdAt: new Date(),
    type: 'template',
    name: '',
    components: [
      {
        type: 'header',
        format: 'none'
      },
      {
        type: 'body',
        text: ''
      },
      {
        type: 'footer',
        text: ''
      },
      {
        type: "buttons",
        buttonType: 'none',
        buttons: []
      }
    ],
    language: 'en_US',
    category: ''
  }

  quickReplyButtons = [
    {
      type: "quick_reply",
      text: "",
      payload: ""
    }
  ];

  callToActionButtons = [
    {
      type: "phone_number",
      text: "",
      phone_number: ""
    },
    {
      type: "url",
      text: "",
      url: ""
    }
  ]

  headerType = 'none';
  uploadedFileDetails;
  allTemplates;

  paidPlanNote = '';

  constructor(private sharedService: SharedService, private whatsappService: WhatsappDashboardService, private router: Router, private configService: ConfigService) { }

  ngOnInit() {
   this.allTemplates = this.router.getCurrentNavigation().extras.state.allTemplates;
   this.checkWhatsappPlan();
  }
  
  checkWhatsappPlan(){
    if (this.configService.environment.isFreeWhatsapp) {
      this.paidPlanNote = 'Please upgrade your plan to make advance Template.';
    }
  }

  changeHeaderMediaType(e) {
    this.advanceTemplateDetails.components[0].format = e.target.value;
    this.advanceTemplateDetails.components[0]['mediaUrl'] = '';
    this.uploadedFileDetails = {};
  }

  changeButtonType(e){
    if (e.target.value == 'none') {
      this.advanceTemplateDetails.components[3].buttons = [];
    }
  }

  addButtons(buttonType){
    if (buttonType == 'quickReply' && this.quickReplyButtons.length < 3) {
      this.quickReplyButtons.push({
        type: "quick_reply",
        text: "",
        payload: ""
      })
    } else{
      this.sharedService.presentAlert('Quick Reply can have max 3 Buttons')
    }
  }
  removeButton(index){
    this.quickReplyButtons.splice(index, 1);
  }

  uploadMedia(files: FileList, mediaType) {
    for (let i = 0; i < files.length; i++) {
      console.log('files[i]:',files[i]);
       //Size of file is in bytes.
      if (mediaType == 'image' && files[i].size/1024/1024 > 5) {
        this.sharedService.presentAlert('Image size cannot be greater than 5MB.');
        return;
      } else if(mediaType == 'video' && files[i].size/1024/1024 > 16){
        this.sharedService.presentAlert('Video size cannot be greater than 16MB.');
        return;
      } else if(mediaType == 'document' && files[i].size/1024/1024 > 100){
        this.sharedService.presentAlert('Document size cannot be greater than 100MB.');
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        if (mediaType == 'image') {
          let base64: any = event.target.result;
          this.advanceTemplateDetails.components[0]['mediaUrl'] = base64;
        } else if(mediaType == 'document' || mediaType == 'video') { 
          this.advanceTemplateDetails.components[0]['mediaUrl'] = files[i];
        }
        this.uploadedFileDetails = files[i];
      }
    }
  }

  async save(){
    const isValid = this.checkValidation();
    if (!isValid) {
      this.sharedService.presentAlert('Please fill all required fields');
      return
    }
    await this.sharedService.presentLoading();
    let docId, success;
    if (this.templateType == 'basic') {
      docId = this.templateDetails.name.trim().toLowerCase().replace(/ /g, '_').replace(/[^\w\-]+/g, '');
      const templateExists = this.allTemplates.filter(template => template.id == docId);
      console.log('templateExists:',templateExists);
      if(this.isTemplateAlreadyExists(templateExists)) return;
      success = await this.whatsappService.addTemplate(this.templateType, docId, this.templateDetails,);
    }
    else if (this.templateType == 'advance'){
      docId = this.advanceTemplateDetails.name.trim().toLowerCase().replace(/ /g, '_');
      const templateExists = this.allTemplates.filter(template => template.id == docId);
      console.log('templateExists:',templateExists);
      if(this.isTemplateAlreadyExists(templateExists)) return;
      if (this.headerType == 'text') {
        this.advanceTemplateDetails.components[0].format = 'text'
      }
      if (this.advanceTemplateDetails.components[3].buttonType == 'quickReply') {
        if (!this.quickReplyButtons.length) {
          this.sharedService.presentAlert('Quick Reply cannot be empty');
        }
        for (const button of this.quickReplyButtons) {
          if (!button.text || !button.payload) {
            this.sharedService.presentAlert('Quick Reply cannot be empty, either fill or remove the field');
            return;
          }
        }
        Object.assign(this.advanceTemplateDetails.components[3].buttons, this.quickReplyButtons);
      } else if (this.advanceTemplateDetails.components[3].buttonType == 'callToAction') {
        this.advanceTemplateDetails.components[3].buttons = JSON.parse(JSON.stringify(this.callToActionButtons));

        // for (const [index, buttonItem] of this.advanceTemplateDetails.components[3].buttons.entries()) {
        //   if (!buttonItem.text) {
        //     this.advanceTemplateDetails.components[3].buttons.splice(index, 1);
        //   }
        //   if (buttonItem.type == 'phone_number') {
        //     buttonItem.phone_number  = `+91${buttonItem.phone_number}`
        //   }
        // }

        for (let i = 0; i < this.advanceTemplateDetails.components[3].buttons.length; i++) {
          const buttonItem = this.advanceTemplateDetails.components[3].buttons[i];
          
          if (!buttonItem.text) {
            this.advanceTemplateDetails.components[3].buttons.splice(i, 1);
            i--; // Adjust index after splicing
            continue; // Skip the rest of the loop for this iteration
          }
          
          if (buttonItem.type === 'phone_number') {
            buttonItem.phone_number = `+91${buttonItem.phone_number}`;
          }
        }


      }
      console.log('advanceTemplateDetails:', this.advanceTemplateDetails);
      success = await this.whatsappService.addTemplate(this.templateType, docId, this.advanceTemplateDetails);
    }
    this.sharedService.loading ? this.sharedService.loading.dismiss() : {};
    if (success) {
      this.sharedService.presentAlert('Template Saved Successfully');
      this.router.navigate(['whatsapp-broadcast']);
    } else {
      this.sharedService.presentAlert('Something went wrong. Please try again later.')
    }
  }

  checkValidation(){
    if (this.templateType == 'basic') {
      if (!this.templateDetails.name || !this.templateDetails.components[0].text || !this.templateDetails.category) {
        return false;
      }else{
        return true;
      }
    } else{
      // console.log('this.advanceTemplateDetails:', this.advanceTemplateDetails);
      if (!this.advanceTemplateDetails.name || !this.advanceTemplateDetails.category || !this.advanceTemplateDetails.components[1].text) {
        return false;
      }else{
        return true;
      }
    }
  }

  isTemplateAlreadyExists(templateExists){
    if (templateExists && templateExists.length > 0) {
      this.sharedService.loading ? this.sharedService.loading.dismiss() : {};
      this.sharedService.presentAlert('Template with same name already exists. Please try with different Template Name');
      return true;
    }
    return false;
  }

}
