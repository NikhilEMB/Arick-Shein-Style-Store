import { Component, OnInit } from '@angular/core';
import { Events, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import * as moment from 'moment';
import { ExportToCsv } from 'export-to-csv';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-retailers',
  templateUrl: './retailers.page.html',
  styleUrls: ['./retailers.page.scss'],
})
export class RetailersPage implements OnInit {

  searchUser: string = '';
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

  constructor(private events: Events, private router: Router,
    private sharedService: SharedService, public loadingController: LoadingController, public alertController: AlertController,  private configService: ConfigService,
              public modalController: ModalController) { 
                ////console.log('in constructor of admin-users...');
              }

  async editUserRoleAlert(user, i) {
    console.log(user)
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

  }  
  ionViewDidEnter(){
    this.createUserOrderEnabled = this.configService.environment.createUserOrder;
  }

  ionViewWillEnter() {
    this.sortValue='lastAccessAt'
    this.initializeSubscriptions();
    console.log("publishing for get admin users",this.sortValue);
    this.events.publish('user:getUsersForAdminUsers',this.sortValue);
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
      this.users = users;
      console.log('all users', this.users);
      this.showLoader = false
      if (users && users.length){
        this.showNoUsers = false;
      }
      this.sharedService.loading.dismiss();
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
    ////console.log('loading more users...');
    this.events.publish('user:loadMoreUsersForAdminUsers',this.sortValue);
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
            handler: () => {
              this.changeRole(role, id);
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

  onClickUser(uid: string, udata:any) {
    const navigationExtras: NavigationExtras = {
      state: {
        uid: uid,
        udata: udata
      }
    };
    this.router.navigate(['admin-allusers-details'], navigationExtras);
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

}
