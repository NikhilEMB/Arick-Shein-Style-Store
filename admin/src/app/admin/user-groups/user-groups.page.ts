import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from "@ionic/angular";
import { SharedService } from 'src/app/services/shared/shared.service';
import { UserGroupsService } from "src/app/services/user-groups/user-groups.service";
import { UsersModalPage } from '../users-modal/users-modal.page';
import { UserGroupsModalPage } from './user-groups-modal/user-groups-modal.page';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.page.html',
  styleUrls: ['./user-groups.page.scss'],
})
export class UserGroupsPage implements OnInit {
  showLoader: boolean = true;
  activeTile = 0;
  searchUser;

  groups = [];
  users = [];
  selectedGroup;
  newlyAddedUsers = [];
  managers = [];
  constructor(private modalController: ModalController, private userGroupsService: UserGroupsService,
    private sharedService: SharedService, private alertController: AlertController) {}

  ngOnInit() {}

  async ionViewWillEnter(){
    this.getAllGroups();
  }

  async getAllGroups(){
    const groupsWithId: any = await this.userGroupsService.getAllGroups();
    if (groupsWithId) {
      this.groups = groupsWithId;
      this.getGroupUsers(0);
    }
  }

  async openCreateGroupModal() {
    const modal = await this.modalController.create({
      component: UserGroupsModalPage,
      backdropDismiss: false,
      cssClass: "custom-modal",
    });
    modal.onDidDismiss().then(res => {
        if (res && res.data && res.data.groupCreated) {
          this.getAllGroups();
        }
    });
    await modal.present();
  }
    
  async openUsersModal() {
    const modal = await this.modalController.create({
        component: UsersModalPage,
        componentProps: {
          alreadyAddedUsers: this.users,
          groupDetails: {groupId: this.selectedGroup.id},
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

async getGroupManagers(){
  const managers: any = await this.userGroupsService.getGroupManagers(this.selectedGroup.id);
  this.managers = (managers && managers.length) ? managers : [];
}

  async getGroupUsers(groupIndex){
    this.activeTile = groupIndex;
    this.selectedGroup = this.groups[groupIndex];
    const users: any = await this.userGroupsService.getGroupUsers(this.selectedGroup.id);
    this.users = (users && users.length) ? users : [];
    console.log(`Users of grp ${this.selectedGroup.name} with grpId ${this.selectedGroup.id}:`, users);
    this.getGroupManagers();
    this.showLoader = false;
  }

  async askConfirmDelete(){
    const alert = await this.alertController.create({
      subHeader: `Are you sure you want to delete ${this.selectedGroup.name} ?`,
      buttons: [
        {
          text: "No",
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: "Yes",
          handler: async () => {
            this.deleteGroup();
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteGroup(){
    this.sharedService.presentLoading();
    const success: any = await this.userGroupsService.deleteGroup({groupId: this.selectedGroup.id, users: this.users, managers: this.managers });
    if (success) {
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
      let deletedGrpName = this.selectedGroup.name;
      this.sharedService.presentAlert(`${deletedGrpName} is deleted Successfully`);
      this.getAllGroups();
    }
  }

  async removeUser(index, userId){
    this.users.splice(index, 1);
    await this.userGroupsService.removeUserFromGroup({userId, groupId: this.selectedGroup.id})
  }

}
