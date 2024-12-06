import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';
import { BranchModalPage } from './branch-modal/branch-modal.page';
import { AdminSettingsService } from 'src/app/services/admin-settings/admin-settings.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.page.html',
  styleUrls: ['./branches.page.scss'],
})
export class BranchesPage implements OnInit {
  searchInput: any = '';
  branches: any[] = [];
  constructor(
    private sharedService: SharedService,
    private modalController: ModalController,
    private alertController: AlertController,
    private adminSettingsService: AdminSettingsService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.sharedService.presentLoading();
    await this.getAllBranch();
    await this.sharedService.loading.dismiss();
  }

  async getAllBranch() {
    try {
      const data = await this.adminSettingsService.getAllBranch() as [];
      if (data) {
        this.branches = data;
      }
    }
    catch (e) {
      console.log("getAllBranch error", e);
    }
  }

  async editBranch(branchData?: any) {
    const propertiesObj = {};
    if (branchData) {
      propertiesObj['branchData'] = branchData;
    }
    const modal = await this.modalController.create({
      component: BranchModalPage,
      backdropDismiss: false,
      cssClass: "custom-modal",
      componentProps: propertiesObj
    });
    modal.onDidDismiss().then(async res => {
      await this.getAllBranch();
      if (res && res.data) { }
    });
    await modal.present();
  }

  async askDeleteBranch(branchData: any) {
    const modal = await this.alertController.create({
      message: `Are you sure you want to delete '${branchData.name}' Branch ?`,
      buttons: [
        {
          role: 'cancel',
          text: 'cancel',
          cssClass: 'secondary',
          handler: async () => {
            console.log("cancelled");
          }
        },
        {
          text: 'Delete',
          handler: async () => {
            console.log("Delete vendor");
            this.deleteBranch(branchData.id);
          }
        }]
    })
    await modal.present();
  }

  async deleteBranch(branchId: string) {
    await this.sharedService.presentLoading();
    const res = await this.adminSettingsService.deleteBranch(branchId);
    await this.sharedService.loading.dismiss();
    if (res) {
      const matchedIndex = this.branches.findIndex(el => el.id === branchId);
      if (matchedIndex > -1) {
        this.branches.splice(matchedIndex, 1);
      }
      await this.sharedService.presentAlert("Branch delete successfully");
    }
    else {
      await this.sharedService.presentAlert("Something went wrong!");
    }
  }

}
