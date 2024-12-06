import { Component, OnInit } from '@angular/core';
import { Events, LoadingController, ModalController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { SearchEngineService } from 'src/app/services/search-engine/search-engine.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UserService } from 'src/app/services/user/user.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';

@Component({
  selector: 'app-add-vendor-modal',
  templateUrl: './add-vendor-modal.page.html',
  styleUrls: ['./add-vendor-modal.page.scss'],
})
export class AddVendorModalPage implements OnInit {
  typingTimer;
  doneTypingInterval = 1000;
  userName = '';
  selectedVendorName = '';
  userList = [];

  loading;

  phoneLimit = 10;
  searchUser: string = '';
  searchUserPhone: string = '';
  searchValue = '';
  page = 0;

  constructor(
    private modalController: ModalController,
    private events: Events,
    private sharedService: SharedService,
    private vendorService: VendorService,
    private loadingController: LoadingController,
    private configService: ConfigService,
    private userService: UserService,
    private searchEngineService: SearchEngineService
  ) { }

  ngOnInit() { }

  ionViewWillEnter(){
    this.phoneLimit = this.configService.environment.phoneLength;
    this.initializeSubscriptions();
  }
  
  ionViewWillLeave(){
    this.removeSubscriptions();
  }
  initializeSubscriptions(){
    this.events.subscribe('user:changeRoleSuccess', (role)=>{
      this.loading.dismiss();
      this.close();
      this.sharedService.presentAlert(`${this.selectedVendorName} is successfully changed to Vendor`);
    });
    // this.events.subscribe('user:getUserToCreateOrderSuccess', (users)=>{
    //   this.userList = users;
    //   console.log("this.userList",this.userList);
    // });
  }
  
  removeSubscriptions() {
    this.events.unsubscribe('user:changeRoleSuccess');
  }

  close() {
    this.modalController.dismiss(this.selectedVendorName);
  }

  // fireSearchQuery() {
  //   clearTimeout(this.typingTimer);
  //   this.typingTimer = setTimeout(() => {
  //     this.events.publish('user:getUserToCreateOrder', this.userName);
  //   }, this.doneTypingInterval);
  // }

  // async fireSearchQuery() {
  //   if (this.searchUserPhone != '') {
  //     console.log("searchUserPhone", this.searchUserPhone);
  //     console.log("defaultCountryCode ", this.configService.environment.defaultCountryCode);
  //     let result: any = await this.userService.searchUserByNumber(this.configService.environment.defaultCountryCode + this.searchUserPhone)
  //     console.log("result", result);
  //     for (let i = 0; i < result.length; i++) {
  //       let data = result[i].data
  //       data['id'] = result[i].id
  //       result[i] = data
  //     }
  //     this.userList = []
  //     console.log("result", result);
  //     let roleOnlyUser = result.filter(user => user.role === 'user');
  //     console.log("roleOnlyUser", roleOnlyUser);
  //     this.userList = roleOnlyUser;
  //   }
  //   if (this.searchUser != '') {
  //     console.log("this.searchUser", this.searchUser);
  //     let result: any = await this.userService.searchUserByName(this.searchUser)
  //     console.log("result", result);
  //     for (let i = 0; i < result.length; i++) {
  //       let data = result[i].data
  //       data['id'] = result[i].id
  //       result[i] = data
  //     }
  //     this.userList = []
  //     console.log("result", result);

  //     let roleOnlyUser = result.filter(user => user.role === 'user');
  //     console.log("roleOnlyUser", roleOnlyUser);
  //     this.userList = roleOnlyUser;
  //   }
  //   console.log("this.userList", this.userList);
  // }

  async typeSenseSearchQuery() {
    if (this.searchValue != '') {
      await this.sharedService.presentLoading();
      this.page = 1;
      const typeSenseResponse = await this.searchEngineService.getSearchUsersFromTypesenseUsingSingleSearch(this.searchValue, this.page, 'new_search', []);
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
        this.userList = roleOnlyUser;
      }
    }
    else {
      await this.sharedService.presentAlert("Please enter valid details!");
    }
  }

  async makeVendor(userName, userId){
    await this.presentLoading();
    this.selectedVendorName = userName;
    this.events.publish('user:changeRole', 'vendor', userId);
  }
  
  async presentLoading() {
    this.loading = await this.loadingController.create({
       message: 'please wait',
       duration: 3000
     });
     await this.loading.present();
   }

  clearPhone() {
    this.searchUserPhone = ''
  }

  clearName() {
    this.searchUser = ''
  }

}
