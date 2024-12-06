import { Component, OnInit } from '@angular/core';
import { Events, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import * as moment from 'moment';
import { ExportToCsv } from 'export-to-csv';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { UserService } from 'src/app/services/user/user.service';
import { SearchEngineService } from 'src/app/services/search-engine/search-engine.service';
@Component({
  selector: 'app-admin-allusers',
  templateUrl: './admin-allusers.page.html',
  styleUrls: ['./admin-allusers.page.scss'],
})
export class AdminAllusersPage implements OnInit {
  searchUser: string = '';
  searchUserPhone: string = '';
  users: any;
  allUsers: any;
  loading: any;
  showNoUsers = false;
  showLoader = true;
  imgUrls: any[] = [];
  showSearch: boolean = false;
  noMoreUsers: boolean = false;
  usrOptions:any = []
  options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    filename:'Users',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title:'Exported Users',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
  addUserAlert;
  sortValue='lastAccessAt';
  createUserOrderEnabled = false;
  phoneLimit = 10
  deliveryAgentUsers = [];
  managerUsers = [];
  singleUser: any;
  searchValue = '';
  page = 0;
  
  constructor(
    private events: Events,
    private router: Router,
    private sharedService: SharedService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private configService: ConfigService,
    public modalController: ModalController,
    private userService: UserService,
    private searchEngineService: SearchEngineService
  ) { }

  async editUserRoleAlert(user, i) {
    console.log(user)
    this.singleUser = user;
    this.usrOptions=[]
    if (user.data.role != 'manager'){
      if (user.data.active==true){
        this.usrOptions.push({
          name: 'block-user',
          type: 'radio',
          label: 'Block User',
          value: 'block-user'
        })
       }
       else{
        this.usrOptions.push({
          name: 'unblock',
          type: 'radio',
          label: 'Unblock User',
          value: 'unblock'
        })
      }
      if (user.data.role != 'deliveryAgent'){
        if (user.data.subRole && user.data.subRole == 'retailer'){
          this.usrOptions.push({
            name: 'notRetailer',
            type: 'radio',
            label: 'Remove Retailer',
            value: 'notRetailer'
          })
         }
         else{
          this.usrOptions.push({
            name: 'make-retail',
            type: 'radio',
            label: 'Make Retailer',
            value: 'retailer'
          })
        }
        if (user.data.subRole && user.data.subRole == 'reseller'){
          this.usrOptions.push({
            name: 'notReseller',
            type: 'radio',
            label: 'Remove Reseller',
            value: 'notReseller'
          })
        }
        else{
          if (this.configService.environment.resellingFeature) {
            this.usrOptions.push({
              name: 'make-reseller',
              type: 'radio',
              label: 'Make Reseller',
              value: 'reseller'
            })
          }
        }
      }
    }
    if (user.data.role == "user"){
      this.usrOptions.push(
        {
          name: 'make-admin',
          type: 'radio',
          label: 'Make Admin',
          value: 'admin',
        }
      )
      this.usrOptions.push(
        {
          name: 'make-delivery-agent',
          type: 'radio',
          label: 'Make Delivery Agent',
          value: 'deliveryAgent'
        }
      )
      this.usrOptions.push(
        {
          name: 'make-manager',
          type: 'radio',
          label: 'Make Manager',
          value: 'manager'
        }
      )
    }
    else if (user.data.role == "admin"){
      this.usrOptions.push(
        {
          name: 'make-user',
          type: 'radio',
          label: 'Make User',
          value: 'user'
        }
      )
      this.usrOptions.push(
        {
          name: 'make-delivery-agent',
          type: 'radio',
          label: 'Make Delivery Agent',
          value: 'deliveryAgent'
        }
      )
    }
    else if (user.data.role == "manager"){
      this.usrOptions.push(
        {
          name: 'make-user',
          type: 'radio',
          label: 'Make User',
          value: 'user'
        }
      )
    }
    else{
      this.usrOptions.push(
        {
          name: 'make-user',
          type: 'radio',
          label: 'Make User',
          value: 'user'
        }
      )
      this.usrOptions.push(
        {
          name: 'make-admin',
          type: 'radio',
          label: 'Make Admin',
          value: 'admin'
        }
      )
    }
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'User Roles',
      inputs:this.usrOptions,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // //console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if (data){
              if (data == 'block-user') {
                this.blockUserConfirm(user.id, user.data.name, i)
              }
              else if(data == 'unblock'){
                this.unblockUserConfirm(user.id, user.data.name)
              }
                else {
                this.changeRoleAlert(data, user.id, user.data.name)
              }
            }
            else{
              this.presentAlert('Please select a role')
            }
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit(){
    this.phoneLimit = this.configService.environment.phoneLength
  }  
  ionViewDidEnter(){
    this.createUserOrderEnabled = this.configService.environment.createUserOrder;
  }

  ionViewWillEnter() {
    this.initializeSubscriptions();
    this.events.publish('user:getUsersForAdminUsers',this.sortValue);
    this.getDeliveryAgentUsers();
    // this.getManagerUsers();
  }
  getDateTimeFormat(date){
    return moment(date).format('MMM D, YYYY hh:mm a');
  }
  ngOnDestroy() {
  }
  ionViewWillLeave() {
    this.showSearch = false;
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('user:publishUsersForAdminUsers', (users) => {
      // if (this.searchUserPhone == "" && this.searchUser == "") {
      //   this.users = users;
      //   console.log('no search allUser:', this.users);
      // }
      if (this.searchValue == "") {
        this.users = users;
        console.log('no search allUser:', this.users);
      }
      // this.users = users;
      this.showLoader = false
      // console.log('allUser:', this.users);
      if (users && users.length){
        this.showNoUsers = false;
      }
      if (this.sharedService.loading){
        this.sharedService.loading.dismiss();
      }
    });
    this.events.subscribe('user:publishAllUsersForAdminUsers', (users) => {
      this.allUsers = users;
      if (this.loading)
      {
        this.loading.dismiss()
      }
      this.downloadUsers()
    });
    this.events.subscribe('user:noUsers', () => {
      this.showNoUsers = true;
      this.showLoader = false
    });
    this.events.subscribe('user:usersForAdminProductsLimitReached', () => {
      this.noMoreUsers = true;
    });
    this.events.subscribe('user:changeRoleSuccess', (role) => {
      this.loading.dismiss();
        this.presentAlert(`Sucessfully made as ${role}!`);
        this.events.publish('user:getAllUsers');
    });
    this.events.subscribe('user:userBlockedSuccessfully', () => {
      this.loading.dismiss();
      this.presentAlert('Sucessfully blocked the user!');
    });
    this.events.subscribe('user:userUnblockedSuccessfully', () => {
      this.loading.dismiss();
      this.presentAlert('Sucessfully unblocked the user!');
    });
    this.events.subscribe('user:userBlockedAndDeleteDataSuccessfully', () => {
      this.loading.dismiss();
      this.presentAlert('Sucessfully blocked and deleted the user!');
    });
    this.events.subscribe('user:changeSubRoleSuccess', (msg) => {
      if(this.loading){ this.loading.dismiss() };
      this.presentAlert(msg);
    });
    this.events.subscribe('user:addUserByAdminSuccess', () => {
      this.events.publish('user:getAllUsers');
      this.addUserAlert.dismiss();
      this.sharedService.presentToast('User added successfully');
    });
    this.events.subscribe('user:addUserByAdminFailure', () => {
      this.sharedService.loading.dismiss();
      this.sharedService.presentToast('Either the number is already registered or Something went wrong!');
    });
  }

  async addUser() {
    if (this.createUserOrderEnabled == false){
      const alert = await this.alertController.create({
        message: "Sorry, this feature is not available. Please upgrade your plan for access",
        buttons: ['ok']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        subHeader: 'User Details',
        inputs: [{
            name: 'userName',
            type: 'text',
            placeholder: 'User Name'
          },
          {
            name: 'phoneNumber',
            type: 'number',
            placeholder: 'User Phone Number'
          }
        ],
        buttons: [{
          text: 'cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Add',
          handler: (plan) => {
            if (!parseInt(plan.phoneNumber) || !plan.userName) {
              this.sharedService.presentToast('Please fill all the details');
              return false;
            } else if (plan.phoneNumber.toString().length != 10) {
              this.sharedService.presentToast('Please enter ten digit phone number');
              return false;
            } else {
              let userDetails = {
                phoneNumber: this.configService.environment.defaultCountryCode + plan.phoneNumber,
                name: plan.userName
              };
              console.log('userDetails:', userDetails);
              this.sharedService.presentLoading('Adding User...');
              this.events.publish('user:addUserByAdmin', userDetails);
            }
          }
        }]
      });
      await alert.present();
      this.addUserAlert = alert;
    }
  }

  async changeRole(role: string, id: string) {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 3000
    });
    await this.loading.present();
    if (role!="retailer" && role!=="notRetailer" && role!="reseller" && role!=="notReseller"){
      this.events.publish('user:changeRole', role, id);
    }
    else{
      this.events.publish('user:changeSubRole', role, id, this.sortValue);
    }
  }
  async messageUser(id: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        userId: id
      }
    };
    this.router.navigate(['admin-chat'], navigationExtras);
  }
  clearSearchUser() {
    this.searchUser = '';
  }
  loadMoreUsers(event){
    //console.log('loading more users...');
    if (this.searchValue) {
      this.loadMoreUsersTypeSense(event);
    } else {
      this.events.publish('user:loadMoreUsersForAdminUsers', this.sortValue);
    }
    setTimeout(() => {
      event.target.complete();
    }, 1000);
    if(this.noMoreUsers === true) {
      event.target.disabled = true;
    }
  }
  async sortUsers(e) {
    console.log('sortValue', e.target.value);
    this.sortValue = e.target.value;
    this.events.publish('user:getUsersForAdminUsers',this.sortValue);
  }
  async presentAlert(desc: any) {
    const alert = await this.alertController.create({
      message: desc,
      buttons: ['Ok']
    });
    await alert.present();
  }
  async blockUserConfirm(uid, uname, i) {
    const alert = await this.alertController.create({
      message: `Are you sure you want to block ${uname} or block and delete data of ${uname}?` ,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           // //console.log('Confirm Cancel');
          }
        }, {
          text: 'Block',
          handler: () => {
            this.blockUser(uid);
          }
        },
        , {
          text: 'Block and Delete Data',
          handler: () => {
            this.blockAndDeleteData(uid, i);
          }
        }
      ]
    });
    await alert.present();
  }
  async unblockUserConfirm(uid, uname) {
    const alert = await this.alertController.create({
      message: `Are you sure you want to unblock ${uname}?` ,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           // // //console.log('Confirm Cancel');
          }
        }, {
          text: 'Unblock',
          handler: () => {
            this.unblockUser(uid);
          }
        },
      ]
    });
    await alert.present();
  }
  async blockUser(uid: string) {
    await this.presentLoading();
    this.events.publish('user:blockUser', uid);
  }
  async blockAndDeleteData(uid: string, i) {
    await this.presentLoading();
    this.events.publish('user:blockAndDeleteData', uid);
    this.users.splice(i, 1);
  }
  async unblockUser(uid) {
    await this.presentLoading();
    this.events.publish('user:unblockUser', uid);
  }
  async changeRoleAlert(role: string, id: string, name: string) {
      const alert = await this.alertController.create({
        message:
        `Are you sure you want to make ${name} as ${role} ?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              // //console.log('Confirm Cancel');
            }
          }, {
            text: 'Okay',
            handler: async () => {
              await this.removeFromGroup(role, id);
              await this.changeRole(role, id);
            }
          }
        ]
      });
      await alert.present();
      }
      imageZoom(img: any) {
        this.modalController.create({
          component: ImageModalPage,
          componentProps: {
            imgs: [{url: img}],
            index: 0
          }
        }).then(modal => modal.present());
      }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
    });
    await this.loading.present();
  }
  setItemSlideColor(role){
    if(role === 'deliveryAgent') {
      return 'dark';
    } else {
      return 'primary';
    }
  }
  onClickUser(uid: string, udata:any) {
    console.log("uid: ", uid, "uData:", udata);
    const navigationExtras: NavigationExtras = {
      state: {
        uid: uid,
        udata: udata
      }
    };
    
    if(udata.role == 'deliveryAgent') {
      this.router.navigate(['delivery-agent-details'], navigationExtras);
    } else {
      this.router.navigate(['admin-allusers-details'], navigationExtras);
    }
   
  }

  clearPhone(){
    this.searchUserPhone = ''
  }

  clearName(){
    this.searchUser = ''
  }

  // async fireSearchQuery() {
  //   await this.sharedService.presentLoading();
  //   if (this.searchUserPhone != '') {
  //     let result = await this.userService.searchUserByNumber(this.configService.environment.defaultCountryCode + this.searchUserPhone)
  //     this.users = result;
  //     this.noMoreUsers = true
  //   }
  //   if (this.searchUser != '') {
  //     let result = await this.userService.searchUserByName(this.searchUser)
  //     console.log('searchResult = ', result);
  //     this.users = result;
  //     this.noMoreUsers = true
  //   }
  //   await this.sharedService.loading.dismiss();
  //   if (this.searchUserPhone == "" && this.searchUser == "") {
  //     await this.presentAlert("Please enter valid details.");
  //   }
  // }

  async typeSenseSearchQuery() {
    if (this.searchValue != '') {
      await this.sharedService.presentLoading();
      this.page = 1;
      const typeSenseResponse = await this.searchEngineService.getSearchUsersFromTypesenseUsingSingleSearch(this.searchValue, this.page, 'new_search', []);
      console.log("typeSenseResponse", typeSenseResponse);
      await this.sharedService.loading.dismiss();
      if (typeSenseResponse && typeSenseResponse.status === 'available' && typeSenseResponse.users.length) {
        this.users = typeSenseResponse.users;
      }
    }
    else {
      await this.sharedService.presentAlert("Please enter valid details!");
    }
  }

  async loadMoreUsersTypeSense(event) {
    console.log('loading more data...');
    this.page += 1;
    const typeSenseResponse = await this.searchEngineService.getSearchUsersFromTypesenseUsingSingleSearch(this.searchValue, this.page, 'existing_search', this.users);
    if (typeSenseResponse && typeSenseResponse.status === 'available' && typeSenseResponse.users.length) {
      this.users = typeSenseResponse.users;
    }
    // setTimeout(() => {
    //   event.target.complete();
    // }, 1000);
    // if (this.noMoreUsers === true) {
    //   event.target.disabled = true;
    // }
  }

  showAllUsers(){
    this.searchUserPhone = ''
    this.searchUser = ''
    this.events.publish('user:getUsersForAdminUsers',this.sortValue);
  }

  clearSearch() {
    this.searchValue = '';
    this.events.publish('user:getUsersForAdminUsers', this.sortValue);
  }

  removeSubscriptions() {
    this.events.unsubscribe('user:publishUsersForAdminUsers');
    this.events.unsubscribe('user:publishAllUsersForAdminUsers');
    this.events.unsubscribe('user:noUsers');
    this.events.unsubscribe('user:changeRoleSuccess');
    this.events.unsubscribe('user:usersForAdminProductsLimitReached');
    this.events.unsubscribe('user:userUnblockedSuccessfully');
    this.events.unsubscribe('user:userBlockedSuccessfully');
    this.events.unsubscribe('user:userBlockedAndDeleteDataSuccessfully');
  }

  async exportUsers(){
    await this.presentLoading()
    this.events.publish('user:getAllUsersForAdminUsers',this.sortValue);
  }    
  
  async downloadUsers(){
    this.options.filename =  this.options.filename+' '+this.getDateTimeFormat(new Date);
    this.options.title =   this.options.title+' '+this.getDateTimeFormat(new Date);
    let data = [];
   
    this.allUsers.forEach(item => {
      let user = item;
      data.push({
      name:user.name ? user.name : '',
      birthday: user.birthday  ? this.getDateTimeFormat(user.birthday) : '',
      email: user.email ? user.email : '',
      address:user.defaultAddress && user.defaultAddress.address ? user.defaultAddress.address : '',
      city:user.defaultAddress && user.defaultAddress.city ? user.defaultAddress.city : '',
      state:user.defaultAddress && user.defaultAddress.state ? user.defaultAddress.state : '',
      pincode:user.defaultAddress && user.defaultAddress.pincode ? user.defaultAddress.pincode : '',
      phone: user.phoneNo ? user.phoneNo : '',
      reg_date:user.createdAt && user.createdAt.toDate() ? this.getDateTimeFormat(user.createdAt.toDate()): '',
      active:user.active ? 'YES' : 'NO',
      last_Access:user.lastAccessAt && user.lastAccessAt.toDate() ? this.getDateTimeFormat(user.lastAccessAt.toDate()): '',
      wallet_balance:user.wallet && user.wallet.balance ? user.wallet.balance : ''
      });
    })

    const csvExporter = new ExportToCsv(this.options);
    csvExporter.generateCsv(data);
  }

  editManager(id: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        managerData: id
      }
    };
    this.router.navigate(['manager-edit'], navigationExtras);
  }

  async getDeliveryAgentUsers() {
    let response: any = await this.userService.getAllUsersDeliveryAgents();
    if (response) {
      this.deliveryAgentUsers = response;
      // console.log("deliveryAgentUsers:-", this.deliveryAgentUsers);
    } else {
      this.sharedService.presentAlert("Something went wrong.");
    }
  }

  async getManagerUsers() {
    this.searchValue = '';
    let response: any = await this.userService.getAllUsersManager();
    if (response) {
      this.managerUsers = response;
      // console.log("managerUsers:-", this.managerUsers);
    } else {
      this.sharedService.presentAlert("Something went wrong.");
    }
  }

  async getSelectedList(type: string) {
    this.searchValue = '';
    if (type === 'users') {
      this.events.publish('user:getUsersForAdminUsers', this.sortValue);
    }
  }

  async removeFromGroup(role: any, id: any) {
    // console.log('role, id', role, id);
    if (this.singleUser.data.groups && this.singleUser.data.groups.length && role !== "user") {
      // console.log('singleUser', this.singleUser);
      await this.userService.autoRemoveUserFromGroup(id);
    }
  }

}
