import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Events, AlertController} from '@ionic/angular';
import { LabelService } from 'src/app/services/label/label.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.page.html',
  styleUrls: ['./managers.page.scss'],
})
export class ManagersPage implements OnInit {

  SHARED_LABELS: any;
  ALL_VENDORS_LABELS: any;
  headerText: any;
  managers = [];
  constructor(private events: Events,
              private labelService: LabelService,
              private router: Router,
              private sharedService: SharedService,
              private alertController: AlertController,
              private configService: ConfigService) { }

  async ionViewWillEnter(){
    this.initializeSubscriptions();
    this.events.publish('manager:getAllManagers');
  }

  ngOnInit() {
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('manager:publishAllManagers', (managerData) => {
      if(managerData.length) {
        this.managers = managerData;
        console.log(this.managers)
      } else {
        this.managers = [];
      }
    });
    this.events.subscribe('manager:managerDeleted', () => {
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
      this.sharedService.presentAlert("Manager Deleted");
      this.events.publish('manager:getAllManagers');
    });
  }

  editManager(id: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        managerData: id
      }
    };
    // console.log('vendor data ->', this.vendors[i])
    this.router.navigate(['manager-edit'], navigationExtras);
  }

  async deleteManager(id: string) {
    await this.sharedService.presentLoading();
    this.events.publish('manager:deleteManager', id);
  }

  removeSubscriptions() {
    this.events.unsubscribe('manager:publishAllManagers');
    this.events.unsubscribe('manager:managerDeleted');
  }

}
