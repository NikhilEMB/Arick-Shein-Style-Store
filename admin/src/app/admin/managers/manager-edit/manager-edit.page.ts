import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Events, LoadingController, ToastController } from '@ionic/angular';
import { LabelService } from 'src/app/services/label/label.service';
import { MultiRegionService } from 'src/app/services/multi-region/multi-region.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UserGroupsService } from 'src/app/services/user-groups/user-groups.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manager-edit',
  templateUrl: './manager-edit.page.html',
  styleUrls: ['./manager-edit.page.scss'],
})
export class ManagerEditPage implements OnInit {

  SHARED_LABELS: any;
  ADD_VENDOR_LABELS: any;
  headerText: any;
  manager:any
  receivedManagerData: any = []
  pagesList:any
  currentPages:any = []
  loading: HTMLIonLoadingElement;
  regions;
  selectedRegion = [];
  groups;
  selectedGroups = [];

  constructor(private events: Events,
    private labelService: LabelService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private multiRegionService: MultiRegionService,
    private userGroupsService: UserGroupsService) {
      this.route.queryParams.subscribe(async (params) => {
        if (this.router.getCurrentNavigation().extras.state) {
          const managerData = await this.router.getCurrentNavigation().extras.state.managerData;
          if(managerData) {
            this.manager = managerData;
          }
        }
      });
     }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.pagesList=environment['pageList']
    this.initializeSubscriptions();
    this.events.publish('manager:getManagerData',this.manager);
    this.events.publish('manager:getPermissions',this.manager);
  }

  ionViewWillLeave(){
    this.removeSubscriptions()
  }

  async initializeSubscriptions() {
    this.events.subscribe('manager:getManagerDataSuccess', (receivedData) => {
      console.log('revieved data:', receivedData);
      this.receivedManagerData = receivedData
      if (receivedData.permissions){
        this.currentPages = receivedData.permissions;
        this.selectedRegion = receivedData.region || [];
      }
      this.selectedGroups = receivedData.groups || [];
      // console.log(this.currentPages)
    });
    this.events.subscribe('manager:changePermissionsSuccess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert("Permissions changed successfully");
      // console.log('changed')
    });
    const regions = await this.multiRegionService.getAllRegions('service');
    if (regions) {
      this.regions = regions;
    }
    const groups: any = await this.userGroupsService.getAllGroups();
    if (groups) {
        this.groups = groups;
    }
  }

  givePermission(index){
    if (this.currentPages.includes(this.pagesList[index].path)){
      this.currentPages.splice(this.currentPages.indexOf(this.pagesList[index].path), 1);
    }
    else{
      this.currentPages.push(this.pagesList[index].path)
    }
    // console.log(this.currentPages)
  }

  updatePermissions(){
    this.presentLoading("Please wait...")
    this.events.publish("manager:changePermissions",this.manager,this.currentPages, this.selectedRegion, this.selectedGroups);
  }

  toggleActive() {
    this.receivedManagerData.active = !this.receivedManagerData.active;
    this.events.publish('manager:changeActiveStatusManager', this.manager,this.receivedManagerData.active);
  }

  async presentLoading(msg: string) {
    this.loading = await this.loadingController.create({
      message: msg
    });
    await this.loading.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'ok',
        handler: () => {
        }
      }]
    });

    await alert.present();
  }

  removeSubscriptions(){
    this.events.unsubscribe('manager:getManagerDataSuccess');
    this.events.unsubscribe('manager:changePermissionsSuccess')
  }

}
