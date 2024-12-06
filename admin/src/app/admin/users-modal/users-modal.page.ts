import { Component, OnInit} from '@angular/core';
import { Events, LoadingController, ModalController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { SearchEngineService } from 'src/app/services/search-engine/search-engine.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UserGroupsService } from 'src/app/services/user-groups/user-groups.service';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.page.html',
  styleUrls: ['./users-modal.page.scss'],
})
export class UsersModalPage implements OnInit {
  userName;
  userList = [];
  alreadyAddedUsers = [];
  groupDetails;

  typingTimer;
  doneTypingInterval = 500;
  loading: any;
  searchValue = '';
  // defaultCountryCode;
  constructor(
    private events: Events,
    private modalController: ModalController,
    private userGroupsService: UserGroupsService,
    private sharedService: SharedService,
    private searchEngineService: SearchEngineService,
    // private configService: ConfigService,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    // this.defaultCountryCode = this.configService.environment.defaultCountryCode;
    this.initializeSubscriptions();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('user:getUserToCreateOrderSuccess', (userList) => {
      console.log('this.alreadyAddedUsers', this.alreadyAddedUsers);
      for (let index = 0; index < userList.length; index++) {
        for (let x = 0; x < this.alreadyAddedUsers.length; x++) {
          if(userList[index].id === this.alreadyAddedUsers[x].id) {
            userList[index]['added'] = true;
            break;
          } else {
            userList[index]['added'] = false;
          }
        }
      }
      this.userList = userList;
      console.log('user:', userList);
    });
  }

  // fireSearchQuery() {
  //   clearTimeout(this.typingTimer);
  //   this.typingTimer = setTimeout(() => {
  //     this.events.publish('user:getUserToCreateOrder', this.userName);
  //   }, this.doneTypingInterval);
  // }

  async typeSenseSearchQuery() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(async() => {
      if (this.searchValue != '') {
        await this.sharedService.presentLoading();
        let page = 1;
        const typeSenseResponse = await this.searchEngineService.getSearchUsersFromTypesenseUsingSingleSearch(this.searchValue, page, 'new_search', []);
        console.log("typeSenseResponse", typeSenseResponse);
        await this.sharedService.loading.dismiss();
        if (typeSenseResponse && typeSenseResponse.status === 'available' && typeSenseResponse.users.length) {
          for (let i = 0; i < typeSenseResponse.users.length; i++) {
            let data = typeSenseResponse.users[i].data
            data['id'] = typeSenseResponse.users[i].id
            typeSenseResponse.users[i] = data;
          }
          let roleOnlyUser = typeSenseResponse.users.filter(user => user.role === 'user');
          this.userList = []
          if (roleOnlyUser.length) {
            for (let user of roleOnlyUser) {
              // user = await this.prepareUserData(user);
              for (let alreadyAddedUser of this.alreadyAddedUsers) {
                if (user.id === alreadyAddedUser.id) {
                  user['added'] = true;
                  break;
                } else {
                  user['added'] = false;
                }
              }
            }
          }
          this.userList = roleOnlyUser;
        }
      }
      // else {
      //   await this.sharedService.presentAlert("Please enter valid details!");
      // }
    }, this.doneTypingInterval);
  }

  // async prepareUserData(user) {
  //   // ? remove country code from Phone Number
  //   if (user.phoneNo) {
  //     if (!user.phoneNo.startsWith(this.defaultCountryCode)) {
  //       user.phoneNo = this.defaultCountryCode + user.phoneNo;
  //     }
  //   }
  //   return user;
  // }

  async addUser(user, i) {
    let obj = {id: user.id, dP: user.dP, name: user.name, phoneNo: user.phoneNo};
    this.alreadyAddedUsers.push(obj);
    this.userList[i].added = true;
    if (this.groupDetails && this.groupDetails.groupId) {
      await this.userGroupsService.addUserToGroup({userId: user.id, groupId: this.groupDetails.groupId})
    }
  }

  closeModal() {
    this.modalController.dismiss(this.alreadyAddedUsers);
  }
  removeSubscriptions() {
    this.events.unsubscribe('user:getUserToCreateOrderSuccess');
  }

}
