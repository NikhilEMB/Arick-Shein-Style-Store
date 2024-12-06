import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SupportService } from 'src/app/services/support/support.service';
import { AddIssuesModalPage } from '../add-issues-modal/add-issues-modal.page';
import { ViewIssuesModalPage } from '../view-issues-modal/view-issues-modal.page';

@Component({
  selector: 'app-all-support',
  templateUrl: './all-support.page.html',
  styleUrls: ['./all-support.page.scss'],
})
export class AllSupportPage implements OnInit {

  supportList = [];
  triggeredSelection: any;
  activeProjectIndex: number = 0;
  issues: any;
  queries: any;
  requirements: any;
  currentTabIndex: number;
  activeButton = 'Pending';
  
  constructor(private modalController: ModalController, private supportService: SupportService) { }

  ngOnInit() {
    this.supportList = [
      'Pending','In Progress','Resolved','Rejected'
    ]
  }

  ionViewWillEnter() {   
      this.getAllIssue();
      this.getAllQueries();    
      this.getAllRequirements();
    
  }

  onClickStatustItem(index, status){
    this.activeProjectIndex = index;
    console.log(status);
    this.activeButton = status;

  }

  async getAllIssue(){
    this.issues = await this.supportService.getSupportTypeData('issues');
    console.log(this.issues);
  }

  async getAllQueries(){
    this.queries = await this.supportService.getSupportTypeData('queries');
    console.log(this.queries);
  }

  async getAllRequirements(){
    this.requirements = await this.supportService.getSupportTypeData('requirements');
    console.log(this.requirements);
  }

  async createNewIssue(type){
    const modal = await this.modalController.create({
      component: AddIssuesModalPage,
      // cssClass: 'my-custom-class',
      cssClass: 'custom-modal',
      componentProps: {
        supportType: type
      },
    });
    modal.onDidDismiss().then(res => {
      console.log('modal onDidDismiss...');
        if(this.currentTabIndex == 0){
          this.getAllIssue();
        }
        else if(this.currentTabIndex == 1){
          this.getAllQueries();
        }
        else if(this.currentTabIndex == 2){
          this.getAllRequirements();
        }
          
    });
     await modal.present();
  }

  async viewDetails(i){
    if(this.currentTabIndex == 0){
      const modal = await this.modalController.create({
        component: ViewIssuesModalPage,
        // cssClass: 'my-custom-class',
        cssClass: 'custom-modal',
        componentProps: {
          supportTypeData: this.issues[i],
          supportShowPage: this.currentTabIndex
  
        },
      });
       await modal.present();
    }
    else if(this.currentTabIndex == 1){
      const modal = await this.modalController.create({
        component: ViewIssuesModalPage,
        // cssClass: 'my-custom-class',
        cssClass: 'custom-modal',
        componentProps: {
          supportTypeData: this.queries[i],
          supportShowPage: this.currentTabIndex
  
        },
      });
       await modal.present();
    }

    else if(this.currentTabIndex == 2){
      const modal = await this.modalController.create({
        component: ViewIssuesModalPage,
        // cssClass: 'my-custom-class',
        cssClass: 'custom-modal',
        componentProps: {
          supportTypeData: this.requirements[i],
          supportShowPage: this.currentTabIndex
  
        },
      });
       await modal.present();
    }
  }

  onTabSelect(ev){
    this.currentTabIndex = ev.detail.index;
    console.log('this---',this.currentTabIndex);
  }

}
