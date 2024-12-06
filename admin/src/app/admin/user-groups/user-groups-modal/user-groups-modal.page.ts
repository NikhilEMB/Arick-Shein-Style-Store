import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { SharedService } from "src/app/services/shared/shared.service";
import { UserGroupsService } from 'src/app/services/user-groups/user-groups.service';
import { UsersModalPage } from '../../users-modal/users-modal.page';

@Component({
  selector: 'app-user-groups-modal',
  templateUrl: './user-groups-modal.page.html',
  styleUrls: ['./user-groups-modal.page.scss'],
})
export class UserGroupsModalPage implements OnInit {
  group = {
    createdAt: new Date(),
    name: "",
  };
  users = [];

  constructor(
    private modalController: ModalController,
    private userGroupsService: UserGroupsService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }
  
  async openUsersModal() {
    const modal = await this.modalController.create({
        component: UsersModalPage,
        componentProps: {
          alreadyAddedUsers: this.users
        },
        cssClass: 'coupon-code-modal'
    });
    modal.onDidDismiss().then(res => {
        if (res && res.data) {
          console.log('res.data', res.data);
          this.users = res.data;
        }
    });
    await modal.present();
}

removeUser(i){
  this.users.splice(i,1);
}

  async saveSettings() {
    if (this.group.name == '') {
      this.sharedService.presentAlert('Group Name cannot be empty');
      return;
    }
    await this.sharedService.presentLoading();
    console.log(this.group);
    const success = await this.userGroupsService.createUsersGroup(this.group, this.users);
    if (success) {
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
      this.sharedService.presentAlert("Group Saved successfully");
      this.modalController.dismiss({groupCreated: true});
    }
  }

}
