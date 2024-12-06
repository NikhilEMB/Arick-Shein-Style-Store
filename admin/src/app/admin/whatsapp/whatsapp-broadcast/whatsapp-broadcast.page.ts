import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UserGroupsService } from 'src/app/services/user-groups/user-groups.service';
import { WhatsappDashboardService } from 'src/app/services/whatsapp-dashboard/whatsapp-dashboard.service';

@Component({
  selector: 'app-whatsapp-broadcast',
  templateUrl: './whatsapp-broadcast.page.html',
  styleUrls: ['./whatsapp-broadcast.page.scss'],
})
export class WhatsappBroadcastPage implements OnInit {
  showLoader: boolean = true;
  searchTemplate;
  templates = [];
  activeTile: any;
  selectedTemplate: any;

  userType = 'groups';
  groups: any;
  selectedGroups = [];
  accountDetails;
  logs: any = [];
  constructor(
    private sharedService: SharedService, private whatsappService: WhatsappDashboardService,
    private userGroupsService: UserGroupsService, private router: Router,
    ) { }

  ngOnInit() { }

  async ionViewWillEnter(){
    this.getAllTemplates();
    this.getAllGroups();
    this.accountDetails = await this.whatsappService.getWhatsappCredentials();
  }

  async getLastBroadcastDetails(){
    const lastBroadcast = await this.whatsappService.getLastBroadcastDetails();
    const doc = lastBroadcast[0];
    console.log('doc:', doc);
    if (lastBroadcast && lastBroadcast.length) {
      let todaysDay = new Date().getTime();
      let lastDate = doc.createdAt.toDate().getTime();
      console.log(todaysDay, " ", lastDate);
      let hours = (todaysDay - lastDate) / 36e5;
      console.log('hours:', hours);
      let hoursLimit = 24;
      console.log('hoursLimit:', hoursLimit);
      if (hours < hoursLimit) {
        this.sharedService.presentAlert(`Please Wait for ${(hoursLimit - hours).toFixed(1)} hours to broadcast again`);
        return false;
      }
    }
    return true;
  }

  changeUserType(e) {
    this.userType = e.target.value;
}

  async getAllTemplates(){
    const templatesWithId: any = await this.whatsappService.getAllTemplates();
    if (templatesWithId) {
      this.templates = templatesWithId;
      this.getTemplateDetails(0);
    }
  }

  async getTemplateDetails(templateIndex){
    if (this.whatsappService.broadcastLogsSub) {
      this.whatsappService.broadcastLogsSub.unsubscribe();
    }
    this.activeTile = templateIndex;
    this.selectedTemplate = this.templates[templateIndex];
    console.log('this.selectedTemplate:', this.selectedTemplate);
    this.showLoader = false;
    this.logs = [];
    this.logs = await this.whatsappService.getBroadcastLogs(this.selectedTemplate.id);
    this.whatsappService.broadcastLogs.subscribe(logs=>{
      this.logs = logs;
    })
  }
  
  async getAllGroups(){
    const groupsWithId: any = await this.userGroupsService.getAllGroups();
    if (groupsWithId) {
      this.groups = groupsWithId;
    }
  }

  addTemplate(){
    const navigationExtras: NavigationExtras = {
      state: {
        allTemplates: this.templates
      }
    };
    this.router.navigate(['add-whatsapp-template'], navigationExtras);
  }

  async broadcast(){
    // const permission = await this.getLastBroadcastDetails();
    // if (!permission) {
    //   return;
    // }
    if (this.selectedTemplate.status != 'approved') {
      this.sharedService.presentAlert(`Templates with ${this.selectedTemplate.status ? this.selectedTemplate.status.toUpperCase() : 'PENDING'} status are not allowed to broadcast.`);
      return;
    }
    if (this.userType == 'groups' && this.selectedGroups.length == 0) {
      this.sharedService.presentAlert('Group List cannot be empty, please select atleast one group.');
      return;
    }
    if (this.accountDetails.insights && this.accountDetails.insights.creditsUsed >= this.accountDetails.insights.chatLimit) {
      this.sharedService.presentAlert('You have reached your free limit for whatsapp, kindly upgrade your plan to use the services.');
      return;
    }
    await this.sharedService.presentLoading();
    const success = await this.whatsappService.doBroadcast({userType: this.userType, groups: this.selectedGroups, templateName: this.selectedTemplate.id});
    if (this.sharedService.loading) {
      this.sharedService.loading.dismiss();
    }
    if (success) {
      this.sharedService.presentAlert('Broadcast request sent Successfully.');
    } else {
      this.sharedService.presentAlert('Something went wrong. Please try again later.')
    }
  }

  ionViewWillLeave() {
    this.whatsappService.broadcastLogsSub.unsubscribe();
  }

}
