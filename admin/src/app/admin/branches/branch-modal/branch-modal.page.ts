import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminSettingsService } from 'src/app/services/admin-settings/admin-settings.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-branch-modal',
  templateUrl: './branch-modal.page.html',
  styleUrls: ['./branch-modal.page.scss'],
})
export class BranchModalPage implements OnInit {
  emailRegex = /^\S+@\S+\.\S+$/;
  branchData = {
    name: '',
    email: '',
    phoneNo: '',
    whatsapp: '',
    hours: '',
    location: {
      address: '',
      lat: null,
      lng: null,
    },
    createdAt: null,
  };

  constructor(
    private modalController: ModalController,
    private sharedService: SharedService,
    private adminSettingsService: AdminSettingsService
  ) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    console.log("branchData", this.branchData);
  }

  close() {
    this.modalController.dismiss();
  }

  // async validateInputs() {
  //   let finalValue = true;
  //   try {
  //     Object.keys(this.branchData).forEach(async key => {
  //       console.log("key", key);
  //       if (this.branchData[key] == '' || this.branchData[key] == null) {
  //         finalValue = false;
  //         return;
  //       }
  //     });
  //     return finalValue;
  //   }
  //   catch (e) {
  //     console.log("validateInputs e", e);
  //     return finalValue;
  //   }
  // }

  async isEmailFormatted(email: any) {
    return this.emailRegex.test(email);
  }

  async saveBranch() {
    console.log("this.branchData", this.branchData);

    // ? Check if field are valid
    if (this.branchData.name == '' || this.branchData.email == '' || this.branchData.phoneNo == '') {
      await this.sharedService.presentAlert("(*) field cant be empty!");
      return;
    }
    // const isValid = await this.validateInputs();
    // if (!isValid) {
    //   await this.sharedService.presentAlert("field cant be empty!");
    //   return;
    // }


    // ? Check if field is valid
    const isEmailFormatted = await this.isEmailFormatted(this.branchData.email);
    console.log("isEmailFormatted", isEmailFormatted);
    if (!isEmailFormatted) {
      await this.sharedService.presentAlert("Please enter Email in correct format!");
      return;
    };

    await this.sharedService.presentLoading();
    const res = await this.adminSettingsService.updateBranch(this.branchData);
    await this.sharedService.loading.dismiss();
    this.modalController.dismiss();
    if (res) {
      await this.sharedService.presentAlert('branch successfully saved');
    }
    else {
      await this.sharedService.presentAlert('branch save failed!');
    }
  }

}
