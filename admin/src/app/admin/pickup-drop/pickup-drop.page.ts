import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { LabelService } from 'src/app/services/label/label.service';
import * as moment from 'moment';
import { ConfigService } from 'src/app/services/config/config.service';
import { NavigationExtras, Router } from '@angular/router';
import { PickUpService } from 'src/app/services/pickUp/pick-up.service';
import { CancelledReasonPage } from 'src/app/admin/admin-shop/all-orders/cancelled-reason/cancelled-reason.page';


@Component({
  selector: 'app-pickup-drop',
  templateUrl: './pickup-drop.page.html',
  styleUrls: ['./pickup-drop.page.scss'],
})
export class PickupDropPage implements OnInit {

  headerText = '';
  isActive = false;
  currentType = true;
  deliveryByWeight = {
    baseCost: 0,
    baseWeight: 0,
    cost: 0
  };
  deliveryByKm = {
    cost: 0
  };
  SHARED_LABELS: any;
  loading: any;
  orderId = ""
  orderData:any = [];
  ordersList:any = []
  showLoader = true;
  currencyCode: any;
  subscriptionFeature = false;
  gst = 0;
  previousId = 'status1'
  searchOrder: string = ''
  currentOrders = 'pending'
  phoneNo:any = ""
  allDeliveryAgents: any = [];
  deliveryAgentName:string = ''
  showHistory = false
  logData:any = [];
  allOrderStatuses = ['pending', 'picked', 'delivered', 'cancelled'];
  noDeliveryAgents: boolean = false;
  weightSlabs = {
    active: false,
    slabs: []
  }

  constructor(private labelService: LabelService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private configService: ConfigService,
    private router: Router,
    private pickUp: PickUpService,
    private modalController: ModalController) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    let currentData = await this.pickUp.getPickUpSettings()
    console.log("Data->>",currentData['weightSlab']['active'])
    this.allDeliveryAgents = await this.pickUp.getAllDeliveryAgents()
    if (!this.allDeliveryAgents || (this.allDeliveryAgents && this.allDeliveryAgents.length == 0)){
      this.noDeliveryAgents = true
    }
    if (currentData['gst'])
    {
      this.gst = currentData['gst'] 
    }
    if (currentData['active'])
    {
      this.isActive = currentData['active']
    }
    if (currentData['deliveryByWeight'])
    {
      this.deliveryByWeight = currentData['deliveryByWeight']
    }
    if (currentData['deliveryByKm'])
    {
      this.deliveryByKm = currentData['deliveryByKm']
    }
    if(currentData['weightSlab']['active']){
      this.weightSlabs.active=currentData['weightSlab']['active']
    }
    if(currentData['weightSlab']['slabs']){
      this.weightSlabs.slabs=currentData['weightSlab']['slabs']
    }
    setTimeout(() => {
      this.getPendingOrders()
    }, 1000);
  }

  activeToggle() {
    this.isActive = !this.isActive;
  }

  async saveSettings(){
    let walletSettings = await this.pickUp.getWalletSettings()
    if (walletSettings['active'] == true){
      if (this.deliveryByWeight.baseCost == undefined || this.deliveryByWeight.baseWeight == undefined || this.deliveryByWeight.cost == undefined || this.deliveryByKm.cost == undefined ){
        this.presentAlert('Please fill all details')
      }
      else{
        let weightSlabs={weightActive: this.weightSlabs.active}
        let slabData={slabs:this.weightSlabs.slabs}
        let gstObj = {gst: this.gst}
        let activeObj = {active: this.isActive}
        let pickUpSettings = {...gstObj, ...activeObj, ...this.deliveryByWeight, ...this.deliveryByKm, ...weightSlabs, ...slabData}
        console.log(pickUpSettings);
        if (await this.pickUp.setPickUpSettings(pickUpSettings)){
          this.presentAlert('Settings saved successfully')
        }
      }
    }
    else{
      await this.presentAlert('Please turn on your wallet from wallet settings page to enable this feature')
    }
  }

  async getPendingOrders() {
    this.showHistory = false
    this.currentOrders = 'pending'
    this.ordersList = []
    this.orderId = ''
    let prevMsgDiv = document.getElementById(this.previousId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById('status1');
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.previousId = 'status1'
    this.ordersList = await this.pickUp.getPendingOrders()
    let objDiv = document.getElementById("scroll2");
    if (objDiv){
      objDiv.scrollTop = 0;
    }
    
    if (this.ordersList && this.ordersList.length > 0){
      this.onClickViewDetails(this.ordersList[0].orderId)
    }
    console.log(this.ordersList);
  }

  async getPickedOrders() {
    this.showHistory = false
    this.currentOrders = 'picked'
    this.ordersList = []
    this.orderId = ''
    let prevMsgDiv = document.getElementById(this.previousId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById('status2');
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.previousId = 'status2'
    this.ordersList = await this.pickUp.getPickedOrders()
    let objDiv = document.getElementById("scroll2");
    if (objDiv){
      objDiv.scrollTop = 0;
    }
    if (this.ordersList && this.ordersList.length > 0){
      this.onClickViewDetails(this.ordersList[0].orderId)
    }
  }

  async getDeliveredOrders() {
    this.showHistory = false
    this.currentOrders = 'delivered'
    this.ordersList = []
    this.orderId = ''
    let prevMsgDiv = document.getElementById(this.previousId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById('status3');
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.previousId = 'status3'
    this.ordersList = await this.pickUp.getDeliveredOrders()
    let objDiv = document.getElementById("scroll2");
    if (objDiv){
      objDiv.scrollTop = 0;
    }
    if (this.ordersList && this.ordersList.length > 0){
      this.onClickViewDetails(this.ordersList[0].orderId)
    }
  }

  async getCancelledOrders() {
    this.showHistory = false
    this.currentOrders = 'cancelled'
    this.ordersList = []
    this.orderId = ''
    let prevMsgDiv = document.getElementById(this.previousId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById('status4');
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.previousId = 'status4'
    this.ordersList = await this.pickUp.getCancelledOrders()
    let objDiv = document.getElementById("scroll2");
    if (objDiv){
      objDiv.scrollTop = 0;
    }
    if (this.ordersList && this.ordersList.length > 0){
      this.onClickViewDetails(this.ordersList[0].orderId)
    }
  }

  getDateTimeFormat(date){
    return moment(date).format('MMM D, YYYY hh:mm a');
  }

  async onClickViewDetails(id){
    // await this.presentLoading()
    this.orderData = await this.pickUp.getOrderData(id)
    if (this.orderData[0].delivery.agentId){
      let data = await this.pickUp.getDeliveryAgentName(this.orderData[0].delivery.agentId)
      if (data){
        if (data['name']){
          this.deliveryAgentName = data['name']
        }
      }
    }
    this.orderId = id
    let userDetails = await this.pickUp.getUserDetails(this.orderData[0].user.id)
    this.phoneNo = userDetails['phoneNo']
    this.showLoader = false;
    this.logData = await this.pickUp.getOrderLogs(id)
    // this.loading.dismiss()
  }

  async searchOrderById(){
    if (!isNaN(parseInt(this.searchOrder))){
      this.ordersList = await this.pickUp.getOrderData(parseInt(this.searchOrder))
      // console.log(this.ordersList)
      if (this.ordersList && this.ordersList.length > 0){
        this.onClickViewDetails(this.ordersList[0].orderId)
      }
      else{
        this.presentAlert('No such order found')
        this.resetSearch()
      }
    } else{
      this.presentAlert('Please enter a valid number')
      return
    }
  }

  resetSearch(){
    this.searchOrder = ''
    if (this.currentOrders == 'pending'){
      this.getPendingOrders()
    }
    else if (this.currentOrders == 'picked'){
      this.getPickedOrders()
    }
    else if (this.currentOrders == 'delivered'){
      this.getDeliveredOrders()
    }
    else if (this.currentOrders == 'cancelled'){
      this.getCancelledOrders()
    }
  }

  isCancelReasonAvailable() {
    if (this.orderData[0].cancelData){
      return 'cancelData' in this.orderData[0] && this.orderData[0].cancelData.reason;
    }
  }

  async onClickCancelOrder() {
    const alert = await this.alertController.create({
      message: "Are you sure you want to cancel this order?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            //console.log('Confirm Yes');
            this.getCancelReason();
          }
        }
      ]
    });
    await alert.present();
  }

  async getCancelReason() {
    const modal = await this.modalController.create({
    component: CancelledReasonPage
    });

    modal.onDidDismiss().then(res => {
      if(res && res.data) {
        this.cancelOrder(res.data);
      }
    });
  
    await modal.present();
  }

  async cancelOrder(cancelReason: string) {
    await this.presentLoading();
    let orderCancelled = await this.pickUp.cancelOrderByAdmin(parseInt(this.orderId), cancelReason, this.orderData[0].user.name);
    if (orderCancelled){
      await this.presentAlert('Order Cancelled Successfully!')
    }
    this.loading.dismiss()
    this.onClickViewDetails(this.orderId)
  }

  async onClickPickupOrder() {
    const alert = await this.alertController.create({
      message: "Are you sure you want to pickup this order?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            //console.log('Confirm Yes');
            this.pickupOrder();
          }
        }
      ]
    });
    await alert.present();
  }

  async pickupOrder(){
    await this.presentLoading();
    let orderPicked = await this.pickUp.changeOrderStatus(this.orderId,'picked');
    if (orderPicked){
      await this.presentAlert('Order Picked Up Successfully!')
    }
    this.loading.dismiss()
    this.onClickViewDetails(this.orderId)
  }

  async onClickDeliverOrder() {
    const alert = await this.alertController.create({
      message: "Are you sure you want to deliver this order?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            //console.log('Confirm Yes');
            this.deliverOrder();
          }
        }
      ]
    });
    await alert.present();
  }

  async deliverOrder(){
    await this.presentLoading();
    let orderPicked = await this.pickUp.changeOrderStatus(this.orderId,'delivered');
    if (orderPicked){
      await this.presentAlert('Order Delivered Successfully!')
    }
    this.loading.dismiss()
    this.onClickViewDetails(this.orderId)
  }

  async onChangeDeliveryAgent(event) {
    let selectedDeliveryAgentId = event.target.value;
    await this.presentLoading();
    let result = await this.pickUp.assignDeliveryAgent(selectedDeliveryAgentId, this.orderId);
    if (result){
      await this.presentAlert('Delivery agent assigned!')
    }
    this.loading.dismiss()
  }

  isStatusTimelinePresent(status: string) {
    return this.orderData[0].timeline.hasOwnProperty(status);
  }

  isStatusCancelled(status: string) {
    return ['cancelled'].includes(status);
  }

  hideStatuses(status: string) {
    const cancelledHides = ['picked', 'delivered'];
    const cancelOrReturnedStatuses = ['cancelled'];

    if(this.orderData[0].status === 'cancelled') {
      return cancelledHides.includes(status);
    }

    if(!(cancelOrReturnedStatuses.includes(this.orderData[0].status))) {
      return cancelOrReturnedStatuses.includes(status);
    }
  }

  isLastStatus(status: string) {
    return status === 'delivered';
  }

  onSetupDeliveryAgent() {
    this.router.navigate(['admin-allusers']);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Please Wait...",
    });
    await this.loading.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['ok']
    });

    await alert.present();
  }
  deliveryBasedToggle() {
    this.weightSlabs.active = !this.weightSlabs.active;
    console.log(this.weightSlabs);
  }
  async enterSlabData() {
    const alert = await this.alertController.create({
      subHeader: "Enter Slab Details",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: "Add Name for slab"
        },
        {
          name: 'Weight',
          type: 'number',
          placeholder: "Add Weight For Slabs in Kg"
        },
        {
          name: 'cost',
          type: 'number',
          placeholder: "Add cost for slab"
        }
      ],
      buttons: [
        {
          text: "cancel",
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: "done",
          handler: async (data) => {
            if (!data.Weight || !data.cost || !data.name) {
              this.presentAlert("Please enter all details!");
            }
            else {
              if (this.weightSlabs.slabs.length == 0) {
                this.weightSlabs.slabs.push({
                  Name: data.name,
                  range: [0, parseInt(data.Weight)],
                  cost: parseInt(data.cost)
                })
              }
              else {
                let lastIndex = this.weightSlabs.slabs.length
                this.weightSlabs.slabs.push({
                  Name: data.name,
                  range: [this.weightSlabs.slabs[lastIndex - 1].range[1],
                  this.weightSlabs.slabs[lastIndex - 1].range[1] + parseInt(data.Weight)],
                  cost: parseInt(data.cost),
                })
              }
            }
          }
        }
      ]
    });
    console.log(this.weightSlabs);
    await alert.present();
  }
  async removeSlabs() {
    const alert = await this.alertController.create({
      subHeader: "Are you sure you want to remove all slabs?",
      buttons: [
        {
          text: "No",
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: "Yes",
          handler: async (data) => {
            this.weightSlabs.slabs = []
          }
        }
      ]
    });
    await alert.present();
  }

}
