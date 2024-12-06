import { Component, OnInit, ViewChild } from '@angular/core';
import { Events, LoadingController, AlertController, ToastController, IonContent, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
//import { CallNumber } from '@ionic-native/call-number/ngx';
import * as moment from 'moment';
import { LabelService } from 'src/app/services/label/label.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserDetailsService } from 'src/app/services/user-details/user-details.service';
import { UserGroupsService } from 'src/app/services/user-groups/user-groups.service';
import { StatesModalPage } from 'src/app/states-modal/states-modal.page';
import { ViewOrderPage } from '../admin-home/view-order/view-order.page';
import { WalletService } from 'src/app/services/wallet/wallet.service';
import { AddPointsPage } from '../add-points/add-points.page';

@Component({
    selector: 'app-admin-allusers-details',
    templateUrl: './admin-allusers-details.page.html',
    styleUrls: ['./admin-allusers-details.page.scss'],
})
export class AdminAllusersDetailsPage implements OnInit {
    ordersLoader: boolean = true;
    addressLoader: boolean = true;
    walletLoader: boolean = true;
    loading: any;
    uid: string;
    orders: any = [];
    addresses: any = [];
    transactions: any = [];
    udata:any = {
        additionalInfo: ''
    }
    balance: any;
    noMoreTxns: boolean;
    orderIdPrefix: string;
    cashbackBalance = 0;
    noDeliveryAgents: boolean = false;
    allDeliveryAgents: any = [];
    selectAgentPh = ''
    ADMIN_ALLUSERS_DETAILS_LABELS: any = {};
    SHARED_LABELS: any = {};
    activeTabIndex = 0;
    @ViewChild(IonContent, { static: false }) content: IonContent;
    currencyCode: any;
    appAllowFeature = false
    allowAppAccess = false
    cartItems:any = []
    searchItems:any = []
    currentTab = 'cart'
    showLimit = 3
    showWarning = false
    showEditAddress:any = []
    showEditDetails = false

    groups;
    pointTransactions: any = [];

    constructor(private events: Events,
        private loadingController: LoadingController,
        private alertController: AlertController,
        private toastController: ToastController,
        private router: Router,
        private route: ActivatedRoute,
        private labelService: LabelService,
        private configService: ConfigService,
        private userService: UserService,
        private userDetailService: UserDetailsService,
        private userGroupsService: UserGroupsService,
        private modalController: ModalController,
        private walletService: WalletService
        //private callNumber: CallNumber
    ) {

        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.uid = this.router.getCurrentNavigation().extras.state.uid;
                this.udata = this.router.getCurrentNavigation().extras.state.udata;
                
                if (this.udata && !this.udata.hasOwnProperty('groups')){
                    this.udata.groups = [];
                }
                if (this.udata && this.udata.hasOwnProperty('accessByAdmin')){
                    this.allowAppAccess = this.udata.accessByAdmin
                }
                let index = this.router.getCurrentNavigation().extras.state.activeTabIndex;
                this.activeTabIndex = index ? index : 0;
            }
        });
    }

    async ngOnInit() {
        this.initializeSubscriptions();
        if (this.uid){
            this.events.publish('user:getAllOrdersOfUser', this.uid);
            this.events.publish('user-details:getUserAddresses', this.uid);
            this.events.publish('wallet:getWalletTrans', this.uid);
            this.events.publish('wallet:getUserWalletDetails', this.uid);
            this.pointTransactions = await this.walletService.getPointTransactions(this.uid);
            console.log('pointTransactions', this.pointTransactions)
        }
        this.events.publish('user:getAllDeliveryAgents');
        this.orderIdPrefix = this.configService.environment.orderIdPrefix;
        this.currencyCode = this.configService.environment.currencyCode;
        this.appAllowFeature = this.configService.environment.appAccessOnApproval
    }

    getDateTimeFormat(date) {
        return moment(date).format('MMM D, YYYY hh:mm a');
    }

    async ionViewWillEnter() {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.ADMIN_ALLUSERS_DETAILS_LABELS = this.labelService.labels['ADMIN_ALLUSERS_DETAILS'];
        this.selectAgentPh = this.ADMIN_ALLUSERS_DETAILS_LABELS['select_delivery_agent'];
        this.cartItems = await this.userDetailService.getCartItems(this.uid)
        if (this.configService.environment.userAnalyticsLimit){
            this.showLimit = await this.configService.environment.userAnalyticsLimit
        }
        if (this.cartItems.length > this.showLimit){
            this.cartItems = this.cartItems.slice(0,this.showLimit)
            this.showWarning = true
        }
        const groups: any = await this.userGroupsService.getAllGroups();
        if (groups) {
            this.groups = groups;
        }
    }

    ngOnDestroy() {
        this.removeSubscriptions();
    }

    initializeSubscriptions() {

        this.events.subscribe('user:publishAllOrdersOfUser', (orders) => {
            if (this.loading){
                this.loading.dismiss();
            }
            this.orders = orders && orders.length ? orders : [];
            this.ordersLoader = false;
        });
        this.events.subscribe('user:noOrderHistoryOfUser', () => {
            if (this.loading){
                this.loading.dismiss();
            }
            this.ordersLoader = false;
            this.orders = [];
        });
        this.events.subscribe('user-details:publishUserAddresses', (addresses) => {
            if (this.loading){
                this.loading.dismiss();
            }
            this.addresses = addresses && addresses.length ? addresses : [];
            for (let i = 0; i < this.addresses.length; i++) {
                this.showEditAddress.push(false)
            }
            this.addressLoader = false;
        });
        this.events.subscribe('wallet:addMoneyToSingleUserWalletSuccess', (msg) => {
            if (this.loading){
                this.loading.dismiss();
            }
            this.presentAlert(msg);
            this.events.publish('wallet:getWalletTrans', this.uid);
            this.noMoreTxns = false;
        });
        this.events.subscribe('wallet:chargeUserSuccess', (msg) => {
            if (this.loading){
                this.loading.dismiss();
            }
            this.presentAlert(msg);
            this.events.publish('wallet:getWalletTrans', this.uid);
            this.noMoreTxns = false;
        });
        this.events.subscribe('wallet:publishUserWalletDetails', (data) => {
            if (this.loading){
                this.loading.dismiss();
            }
            if (data) {
                this.balance = data.wallet ? data.wallet.balance : 0;
                this.cashbackBalance = data.wallet && data.wallet.cashback ? data.wallet.cashback : 0;
            }
        });
        this.events.subscribe('wallet:publishWalletTrans', (transactions) => {
            if (this.loading){
                this.loading.dismiss();
            }
            this.transactions = transactions && transactions.length ? transactions : [];
            this.walletLoader = false;
        });
        this.events.subscribe('wallet:noMoreWalletTrans', () => {
            if (this.loading){
                this.loading.dismiss();
            }
            this.noMoreTxns = true;
        });

        this.events.subscribe('user:noDeliveryAgents', () => {
            if (this.loading){
                this.loading.dismiss();
            }
            this.noDeliveryAgents = true;
        });
        this.events.subscribe('user:publishAllDeliveryAgents', (agents) => {
            if (this.loading){
                this.loading.dismiss();
            }
            this.allDeliveryAgents = agents;
            this.noDeliveryAgents = false;
        });
        this.events.subscribe('user:setDefaultDeliveryAgentToUserSuccess', () => {
            if (this.loading){
                this.loading.dismiss();
            }
            this.presentAlert('Delivery agent assigned');
        });
        this.events.subscribe('user:setAdditionalInfoSuccess', () => {
            if (this.loading){
                this.loading.dismiss();
            }
            this.presentAlert('Information set successfully');
        });
    }

    onClickViewDetails(id) {
        this.modalController.create({
            component: ViewOrderPage,
            cssClass: 'view-order-css',
            componentProps: {
              orderId: id
            }
          }).then(modal => modal.present());
    }

    onClickTrackOrder(agentId, deliveryLatLng) {
        const navigationExtras: NavigationExtras = {
            state: {
                agentId: agentId,
                deliveryLatLng: deliveryLatLng
            }
        }
        this.router.navigate(['location-map'], navigationExtras);
    }

    callUser() {
        /* this.callNumber.callNumber(this.udata.phoneNo, true)
         .then(res => console.log('Launched dialer!', res))
         .catch(err => console.log('Error launching dialer', err));*/
    }

    async onChangeDeliveryAgent(event) {
        let selectedDeliveryAgentId = event.target.value;
        await this.presentLoading(this.SHARED_LABELS['please_wait']);
        this.events.publish('user:setDefaultDeliveryAgentToUser', selectedDeliveryAgentId, this.uid);
    }

    onSetupDeliveryAgent() {
        this.router.navigate(['tabs/tabs/admin-allusers']);
    }

    dateConvert(timestamp) {
        return new Date(timestamp);
    }


    async getMoneyAddType(status: string) {
        const alert = await this.alertController.create({
            subHeader: status == 'addMoney' ? 'Add money in' : 'Charge user',
            inputs: [
                {
                    type: 'radio',
                    label: 'Wallet',
                    value: 'wallet',
                    checked: true
                },
                {
                    type: 'radio',
                    label: 'Cashback',
                    value: 'cashback',
                    checked: false
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Select',
                    handler: (type) => {
                        alert.dismiss()
                        if (status == "addMoney") {
                            this.addMoneyAlert(type);
                        }
                        else {
                            this.chargeUserAlert(type);
                        }
                    }
                }
            ]
        });
        await alert.present();
    }

    async addMoneyAlert(type: string) {
        const alert = await this.alertController.create({
            subHeader: 'Add money',
            inputs: [
                {
                    name: 'amount',
                    type: 'number',
                    placeholder: 'Enter amount'
                },
                {
                    name: 'msg',
                    type: 'text',
                    placeholder: 'Enter message'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Add',
                    handler: (data) => {
                        // console.log("amount", data, this.uid, type);
                        if (!parseInt(data.amount)) {
                            this.presentToast('Please enter valid amount');
                        }
                        else {
                            this.scrollToTop();
                            this.addMoneyToSingleUserWallet(data, type);
                        }
                    }
                }
            ]
        });
        await alert.present();
    }

    async addMoneyToSingleUserWallet(data:{}, type: string) {
        await this.presentLoading('Adding money...');
        this.events.publish('wallet:addMoneyToSingleUserWallet', data, this.uid, type);
    }

    async chargeUserAlert(moneyType: string) {
        if (moneyType == "wallet") {
            if (!this.balance) {
                this.presentAlert('Not enough wallet balance!');
                return;
            }
        }
        else {
            if (!this.cashbackBalance) {
                this.presentAlert('Not enough cashback balance!');
                return;
            }
        }
        const alert = await this.alertController.create({
            subHeader: 'Charge User',
            inputs: [
                {
                    name: 'amount',
                    type: 'number',
                    placeholder: 'Enter amount'
                },
                {
                    name: 'msg',
                    type: 'text',
                    placeholder: 'Enter message'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Charge',
                    handler: (charge) => {
                        if (!parseInt(charge.amount)) {
                            this.presentToast('Please enter valid amount');
                        } else if (!charge.msg) {
                            this.presentToast('Please enter message');
                        } else {
                            if (moneyType == "wallet") {
                                if (this.balance < parseInt(charge.amount)) {
                                    this.presentToast('Not enough wallet balance!');
                                    return;
                                }
                            }
                            else {
                                if (this.cashbackBalance < parseInt(charge.amount)) {
                                    this.presentToast('Not enough cashback balance!');
                                    return;
                                }
                            }
                            this.chargeUser(charge, moneyType);
                        }
                    }
                }
            ]
        });
        await alert.present();
    }

    async chargeUser(charge: any, moneyType: string) {
        await this.presentLoading('Charging user...');
        this.events.publish('wallet:chargeUser', charge, this.uid, moneyType);
    }

    loadMoreTxns(event) {
        console.log('loading more txns...');
        this.events.publish('wallet:getMoreWalletTrans', this.uid);
        setTimeout(() => {
            event.target.complete();
        }, 1000);
        if (this.noMoreTxns === true) {
            event.target.disabled = true;
        }
    }

    scrollToTop() {
        this.content.scrollToTop(500);
    }

    async presentAlert(msg: string) {
        const alert = await this.alertController.create({
            message: msg,
            buttons: ['OK']
        });
        await alert.present();
    }

    async presentLoading(msg: string) {
        this.loading = await this.loadingController.create({
            message: msg
        });
        await this.loading.present();
    }

    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

    async saveAdditonalInfo() {
        await this.presentLoading("Please wait, saving information")
        this.events.publish('user:setAdditionalInfo', this.uid, this.udata.additionalInfo, this.allowAppAccess, this.udata.groups);
    }

    appAccessToggle(){
        this.allowAppAccess = !this.allowAppAccess
    }

    async removeAgent(){
        await this.presentLoading('Please wait...')
        let removeResult = await this.userService.removeDefaultAgent(this.uid)
        if (removeResult){
            this.presentAlert('Default delivery agent removed')
        }
        this.loading.dismiss()
    }

    async getCartItems(){
        this.showWarning = false
        this.searchItems = await this.userDetailService.getCartItems(this.uid)
        this.currentTab = 'cart'
        if (this.cartItems.length > this.showLimit){
            this.cartItems = this.cartItems.slice(0,this.showLimit)
            this.showWarning = true
        }
    }

    async getSearches(){
        this.showWarning = false
        this.searchItems = await this.userDetailService.getSearchItems(this.uid)
        this.currentTab = 'search'
        if (this.searchItems.length > this.showLimit){
            this.searchItems = this.searchItems.slice(0,this.showLimit)
            this.showWarning = true
        }
    }

    async saveUserData(){
        if (!this.udata.name){
            this.presentAlert('Please fill user name!')
        }
        else{
            this.udata.lowercaseName = this.udata.name.toLowerCase()
            for (let i = 0; i < this.addresses.length; i++) {
                if (this.addresses[i].defaultAddress == true)
                this.udata.defaultAddress = this.addresses[i]
            }
            let updateResult = await this.userDetailService.saveUserDetails(this.uid,this.udata,this.addresses)
            if (updateResult){
                this.presentAlert('Details Updated Successfully!')
            }
        }
    }
    
  async openStateModal(index) {
    const modal = await this.modalController.create({
      component: StatesModalPage,
    });
    modal.onDidDismiss()
      .then((res) => {
        console.log('data from modal', res);
        if (res.data) {
          console.log(res.data);
          this.addresses[index].state = res.data.state;
          this.addresses[index].stateCode = res.data.code;
        }
      });
    await modal.present();

  }

    getTotalAmount(product: any) {
        return {
            totalAmount: product.quantity * product.price,
        }
    }

    async addPointsAlert() {
        const modal = await this.modalController.create({
            component: AddPointsPage,
            cssClass: 'add-point-css',
            componentProps: {
              uid: this.uid
            }
        });
        modal.onDidDismiss().then(async (res) => {
            if(res.data) {
                this.pointTransactions = await this.walletService.getPointTransactions(this.uid);
            }
        });
        await modal.present();
    }

    removeSubscriptions() {
        this.events.unsubscribe('user:publishAllOrdersOfUser');
        this.events.unsubscribe('user:noOrderHistoryOfUser');
        this.events.unsubscribe('user-details:publishUserAddresses');
        this.events.unsubscribe('wallet:addMoneyToSingleUserWalletSuccess');
        this.events.unsubscribe('wallet:chargeUserSuccess');
        this.events.unsubscribe('wallet:publishUserWalletDetails');
        this.events.unsubscribe('wallet:publishWalletTrans');
        this.events.unsubscribe('wallet:noMoreWalletTrans');
        this.events.unsubscribe('user:noDeliveryAgents');
        this.events.unsubscribe('user:publishAllDeliveryAgents');
        this.events.unsubscribe('user:setDefaultDeliveryAgentToUserSuccess');
        this.events.unsubscribe('user:setAdditionalInfoSuccess')
    }

}
