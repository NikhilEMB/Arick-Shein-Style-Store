import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Events, LoadingController, AlertController, IonContent, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { ConfigService } from 'src/app/services/config/config.service';
import { DeliveryPartnerSettingsPage } from './delivery-partner-settings/delivery-partner-settings.page';
import { PincodesModalPage } from 'src/app/pincodes-modal/pincodes-modal.page';
import { ExportToCsv } from 'export-to-csv';
import { Papa } from 'ngx-papaparse';
import { AreaModalPage } from './area-modal/area-modal.page';
import { SharedService } from 'src/app/services/shared/shared.service';
// import { triggerId } from 'async_hooks';
import { DeliverySettingsService } from 'src/app/services/delivery-settings/delivery-settings.service';
import { StatesModalPage } from 'src/app/states-modal/states-modal.page';
@Component({
  selector: 'app-delivery-settings',
  templateUrl: './delivery-settings.page.html',
  styleUrls: ['./delivery-settings.page.scss'],
})
export class DeliverySettingsPage implements OnInit {

  defaultDeliveryAmt: string = '';
  freeDeliveryAmt: string = '';
  isStorePickup: boolean = false;
  storePickupCharges: string = '';
  isKmBasedDelivery: boolean = false;
  chargesPerKm: string = '';
  maxDeliveryOfKm: string = '';
  isDeliverySchedule: boolean = false;
  deliveryDays: any = [];
  timeSchedules: any = [];
  maxDaysOfDelivery: number;
  allowSameDayDelivery: boolean = false;
  lastDeliveryTime: any = new Date().toISOString();
  instantDelivery = {
    isActive: false,
    time: null
  };
  isStoreDelivery = { isActive: false, estimatedTime: '' }
  days: any = [
    { day: 'Sunday', active: false }, { day: 'Monday', active: false }, { day: 'Tuesday', active: false }, { day: 'Wednesday', active: false },
    { day: 'Thursday', active: false }, { day: 'Friday', active: false }, { day: 'Saturday', active: false }
  ]
  time: any = {
    start: null,
    end: null,
  };

  deliveryType = 'pincodes';
  isAllowAllPincodes: boolean = true;
  deliveryPincodes: any = [
    {
      pincode: '',
      cost: '0',
      active: true,
      minAmnt: null,
      freeDeliveryAmnt: null,
      estimatedDeliveryTime: ''
    }
  ];
  deliveryAreas = [
    {
      lat: 0,
      lng: 0,
      cost: 0,
      radius: 0,
      active: true,
      minAmnt: null,
      freeDeliveryAmnt: null,
      estimatedDeliveryTime: ''
    }
  ];
  loading: any;
  showLoader: boolean = true;
  isDeliveryBasedKmAllowed: boolean;
  currencyCode: string;
  isDeliveryScheduleMandatory = false;
  minHrs = null;
  DELIVERY_SETTINGS_LABELS = {};
  SHARED_LABELS = {};
  scheduledDates = [];
  manageSlots = {
    date: null,
    slots: []
  }
  selectDatePh: any;
  isDeliveryBasedOnWeight = false;
  deliveryByWeight = {
    active: false,
    cost: 0,
    baseWeight: 0,
    baseCost: 0
  }

  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('inputFile', { static: false }) myInputVariable: ElementRef;
  sidemenu = []
  selectedId = 'field0'
  selectedIdType = '0'
  kmSlabs = {
    active: false,
    slabs: []
  }
  weightSlabs = {
    active: false,
    slabs: []
  }
  allowFreeDelivery = true
  newDeliveryType;

  currentSelection: any;
  triggeredSelection: any;

  locationType = 'states';
  availableLocations = {
    states: [{state: '', stateCode: '', types: []}],
    pincodes: [{pincode: '', types: []}]
  }
  stateTypes: any;
  secondTabActiveElement = 1;
  gstPerc;

  constructor(private events: Events,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private configService: ConfigService,
    private modalController: ModalController,
    private papa: Papa,
    private sharedService: SharedService,
    private deliverySettingsService: DeliverySettingsService) {
  }

  ngOnInit() {
    this.newDeliveryType = [];
    this.isDeliveryBasedKmAllowed = this.configService.environment.isDeliveryBasedKm;
    this.isDeliveryBasedOnWeight = this.configService.environment.isDeliveryBasedOnWeight;
    this.initializeSubscriptions();
    this.events.publish('delivery-settings:getDeliverySettingsData');
    this.currencyCode = this.configService.environment.currencyCode;
    this.sidemenu.push('Default Delivery', 'Free Delivery', 'Allow Store Pickup', 'Delivery Based on Km', 'Delivery Based On Weight',
      'Instant Delivery', 'Store Delivery / Schedule', 'Pincode / Area', 'GST Percentage')
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  async ionViewWillEnter() {
    this.manageSlots = {
      date: null,
      slots: []
    };
  }

  initializeSubscriptions() {
    this.events.subscribe('delivery-settings:saveDeliverySettingsSuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Delivery data saved successfully!');
    });
    this.events.subscribe('delivery-settings:publishDeliverySettingsData', async (data) => {
      this.showLoader = false;
      this.setDeliverySettings(data);
      this.newDeliveryType = await this.deliverySettingsService.getDeliveryType()
      this.newDeliveryType.unshift({ id: 'standard', settings: data });
      this.currentSelection = { id: 'standard', settings: data };
    });
    this.events.subscribe('delivery-settings:slotsWithDate', (slotsDoc) => {
      if (this.loading) {
        this.loading.dismiss();
      }
      if (slotsDoc && slotsDoc !== undefined) {
        let finalSlots = [];
        for (let index = 0; index < slotsDoc.slots.length; index++) {
          console.log('removing slot index', index);
          if (this.findTimeSlot(slotsDoc.slots, index, this.timeSchedules)) {
            finalSlots.push(slotsDoc.slots[index]);
          }
        }
        for (let index = 0; index < this.timeSchedules.length; index++) {
          if (!this.findTimeSlot(this.timeSchedules, index, slotsDoc.slots)) {
            finalSlots.push({
              start: this.timeSchedules[index].start,
              end: this.timeSchedules[index].end,
              active: false,
              orderLimit: 0,
              orderCreated: 0
            });
          }
        }
        this.manageSlots.slots = finalSlots;
      } else {
        this.timeSchedules.forEach(schedule => {
          this.manageSlots.slots.push({
            ...schedule,
            active: false,
            orderLimit: 0,
            orderCreated: 0
          });
        });
      }
      setTimeout(() => {
        this.content.scrollToBottom(500)
      }, 200);
    });
    this.events.subscribe('delivery-settings:slotUpdated', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Slot data saved successfully');
    });
    this.getLocations();
  }

  isEmptyObj(object) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  async updateSlot() {
    await this.presentLoading();
    this.events.publish('delivery-settings:updateSlot', this.manageSlots);
  }

  findTimeSlot(src, index, target) {
    const slot = { start: src[index].start, end: src[index].end };
    let slotPresent = target.some(sch => sch.start === slot.start && sch.end === slot.end);
    return slotPresent;
  }

  async selectDate(e) {
    console.log(e.target.value);
    this.manageSlots.date = e.target.value;
    this.manageSlots.slots = [];
    await this.presentLoading();
    this.events.publish('delivery-settings:getSlotsWithDate', this.manageSlots.date.toDateString());
  }

  manageSlotsActive(i: number) {
    this.manageSlots.slots[i].active = !this.manageSlots.slots[i].active;
  }

  getDeliveryDates() {
    this.scheduledDates = [];
    for (let index = 0; index < this.maxDaysOfDelivery; index++) {
      let dayToCheck = moment().add(index + 1, 'days');
      if (this.deliveryDays.includes(dayToCheck.format('dddd'))) {
        this.scheduledDates.push(dayToCheck.toDate());
      }
    }
    if (this.allowSameDayDelivery) {
      this.appendSameDateToDeliveryDates(this.lastDeliveryTime);
    }
    this.minHrsReqCheck();
  }

  appendSameDateToDeliveryDates(lastTime) {
    let now: any = moment().format('HH:mm');
    let lastDeliveryTime: any = moment(lastTime, ['hh:mm A']).format('HH:mm');
    if (now < lastDeliveryTime) {
      this.scheduledDates.unshift(new Date());
    }
  }

  minHrsReqCheck() {
    const now: any = parseInt(moment().format('HH'));
    const t1 = now + this.minHrs;
    if (t1 > 24) {
      let disabledDays = Math.floor(t1 / 24);
      let actualDays = [];
      disabledDays = this.allowSameDayDelivery ? disabledDays : disabledDays - 1;
      disabledDays = disabledDays < 0 ? 0 : disabledDays;
      for (let index = disabledDays; index < this.scheduledDates.length; index++) {
        actualDays.push(this.scheduledDates[index]);
      }
      this.scheduledDates = actualDays;
    }
  }

  storePickupToggle() {
    this.isStorePickup = !this.isStorePickup;
  }
  deliveryBasedToggle() {
    this.isKmBasedDelivery = !this.isKmBasedDelivery;
  }
  deliveryScheduleToggle() {
    this.isDeliverySchedule = !this.isDeliverySchedule;
  }
  deliveryScheduleMandatoryToggle() {
    this.isDeliveryScheduleMandatory = !this.isDeliveryScheduleMandatory;
  }

  daySelectToggle(i) {
    this.days[i].active = !this.days[i].active;
  }

  allowAllPincodesToggle() {
    this.isAllowAllPincodes = !this.isAllowAllPincodes;
  }

  addTimeSchedule() {
    this.timeSchedules.push({
      start: moment(this.time.start).format('hh:mm A'),
      end: moment(this.time.end).format('hh:mm A')
    });
    this.time.start = null;
    this.time.end = null;
  }

  disableAddTimeSchedule() {
    if (!this.time.start || !this.time.end) {
      return true;
    } else {
      return false;
    }
  }

  getTime(time) {
    return moment(time).format('hh:mm A');
  }

  removeTimeSchedule(index) {
    this.timeSchedules.splice(index, 1);
  }

  changePinActiveToggle(index) {
    this.deliveryPincodes[index].active = !this.deliveryPincodes[index].active;
  }

  removePincode(index) {
    this.deliveryPincodes.splice(index, 1);
  }
  removeArea(index) {
    this.deliveryAreas.splice(index, 1);
  }

  changeDeliveryType(ev) {
    console.log('ev:', ev);
    this.deliveryType = ev.target.checked ? 'areas' : 'pincodes';
  }

  addPincode() {
    const blankPincode = {
      pincode: '',
      cost: '0',
      active: true,
      minAmnt: null,
      freeDeliveryAmnt: null,
      estimatedDeliveryTime: ''
    };
    this.deliveryPincodes.push(blankPincode);
  }
  addBlankArea() {
    const blankPincode = {
      lat: 0,
      lng: 0,
      cost: 0,
      radius: 0,
      active: true,
      minAmnt: null,
      freeDeliveryAmnt: null,
      estimatedDeliveryTime: ''
    };
    this.deliveryAreas.push(blankPincode);
  }

  async saveAllDeliverySetting() {
    // this.currentSelection = this.triggeredSelection;
    if (this.instantDelivery.isActive && this.instantDelivery.time == null) {
      this.presentAlert('Please enter instant delivery time');
      return;
    }
    this.deliveryDays = [];
    for (let index = 0; index < this.days.length; index++) {
      if (this.days[index].active) {
        this.deliveryDays.push(this.days[index].day);
      }
    }
    let emptyPincode = false;
    for (let index = 0; index < this.deliveryPincodes.length; index++) {
      this.deliveryPincodes[index].pincode = this.deliveryPincodes[index].pincode.trim();
      if (this.deliveryPincodes[index].pincode === '' || this.deliveryPincodes[index].cost === '') {
        emptyPincode = true;
        break;
      }
    }
    console.log('deliveryareas:', this.deliveryAreas);
    let emptyLatLng = false;
    for (let index = 0; index < this.deliveryAreas.length; index++) {
      if (this.deliveryAreas[index].lat == 0 || this.deliveryAreas[index].lng == 0 || this.deliveryAreas[index].radius == 0) {
        emptyLatLng = true;
        break;
      }
    }
    //console.log('emptyLatLng && this.allowArea', emptyLatLng , this.allowArea)
    //this.deliveryType = this.allowArea ? 'areas' : 'pincodes';
    if (emptyPincode && this.deliveryType == 'pincodes') {
      this.presentAlert('Pincodes and Cost cannot be empty');
      return;
    } else if (emptyLatLng && this.deliveryType == 'areas') {
      this.presentAlert('Latitude, Longitude and Radius cannot be empty or 0');
      return;
    }
    else {
      const details = {
        defaultDeliveryAmt: this.defaultDeliveryAmt,
        freeDeliveryAmt: this.freeDeliveryAmt,
        isStorePickup: this.isStorePickup,
        storePickupCharges: this.storePickupCharges,
        isKmBasedDelivery: this.isKmBasedDelivery,
        deliveryByWeight: this.deliveryByWeight,
        chargesPerKm: this.chargesPerKm,
        maxDeliveryOfKm: this.maxDeliveryOfKm ? this.maxDeliveryOfKm : '',
        isDeliverySchedule: this.isDeliverySchedule,
        isDeliveryScheduleMandatory: this.isDeliveryScheduleMandatory,
        deliveryDays: this.deliveryDays,
        timeSchedules: this.timeSchedules,
        deliveryType: this.deliveryType,
        isAllowAllPincodes: this.isAllowAllPincodes,
        deliveryPincodes: this.deliveryPincodes,
        deliveryAreas: this.deliveryAreas,
        maxDaysOfDelivery: this.maxDaysOfDelivery ? this.maxDaysOfDelivery : 14,
        minHrs: this.minHrs ? this.minHrs : null,
        allowSameDayDelivery: this.allowSameDayDelivery,
        lastDeliveryTime: moment(this.lastDeliveryTime).format('hh:mm A'),
        instantDelivery: this.instantDelivery,
        isStoreDelivery: this.isStoreDelivery,
        kmSlabs: this.kmSlabs,
        weightSlabs: this.weightSlabs,
        allowFreeDelivery: this.allowFreeDelivery,
        gstPerc: this.gstPerc
      };
      console.log('details:', details);
      await this.presentLoading();
      const currentIndex = this.newDeliveryType.findIndex(n => n.id === this.currentSelection.id);
      this.newDeliveryType[currentIndex].settings = details;
      this.events.publish('delivery-settings:saveDeliverySettings', details, this.currentSelection.id);
    }

  }

  allowSameDayDeliveryToggle() {
    this.allowSameDayDelivery = !this.allowSameDayDelivery;
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 10000,
    });
    await this.loading.present();
  }

  deliveryWeightBasedToggle() {
    this.deliveryByWeight.active = !this.deliveryByWeight.active;
  }

  async enterEstimatedTime(i, deliveryPinObj, pinOrArea) {
    let arr = [];
    if (pinOrArea === 'isStoreDelivery') {
      if (this.isStoreDelivery.estimatedTime.length > 0) {
        arr = this.isStoreDelivery.estimatedTime.split(':');
      }
    } else {
      if (deliveryPinObj.estimatedDeliveryTime.length > 0) {
        arr = deliveryPinObj.estimatedDeliveryTime.split(':');
      }
    }
    let days = arr.length > 0 ? arr[0] : '00';
    let hours = arr.length > 0 ? arr[1] : '00';
    let mins = arr.length > 0 ? arr[2] : '00';
    const alert = await this.alertController.create({
      subHeader: 'Estimated Delivery Time',
      inputs: [{
        label: 'Days',
        name: 'days',
        type: 'number',
        placeholder: 'Days',
        value: parseInt(days) == 0 ? null : days
      },
      {
        name: 'hours',
        type: 'number',
        placeholder: 'Hours',
        value: parseInt(hours) == 0 ? null : hours
      },
      {
        name: 'mins',
        type: 'number',
        placeholder: 'Mins',
        value: parseInt(mins) == 0 ? null : mins
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
          if (pinOrArea == 'pincode') {
            this.deliveryPincodes[i].estimatedDeliveryTime = `${plan.days ? plan.days : '00'}:${plan.hours ? plan.hours : '00'}:${plan.mins ? plan.mins : '00'}`;
          } else if (pinOrArea == 'area') {
            this.deliveryAreas[i].estimatedDeliveryTime = `${plan.days ? plan.days : '00'}:${plan.hours ? plan.hours : '00'}:${plan.mins ? plan.mins : '00'}`;
          } else if (pinOrArea == 'isStoreDelivery') {
            this.isStoreDelivery.estimatedTime = `${plan.days ? plan.days : '00'}:${plan.hours ? plan.hours : '00'}:${plan.mins ? plan.mins : '00'}`;
          }
        }
      }]
    });
    await alert.present();
  }

  removeSubscriptions() {
    this.events.unsubscribe('delivery-settings:saveDeliverySettingsSuccess');
    this.events.unsubscribe('delivery-settings:publishDeliverySettingsData');
    this.events.unsubscribe('delivery-settings:slotsWithDate');
    this.events.unsubscribe('delivery-settings:slotUpdated');
  }

  async openDeliveryPartner(deliveryPartnerChoice) {
    const modal = await this.modalController.create({
      component: DeliveryPartnerSettingsPage,
      backdropDismiss: false,
      componentProps: {
        deliveryPartnerChoice: deliveryPartnerChoice,
      }
    });
    modal.onDidDismiss()
      .then((res) => {
      });
    await modal.present();
  }

  async openAreaModal() {
    const modal = await this.modalController.create({
      component: AreaModalPage,
      cssClass: 'custom-modal big-modal',
      backdropDismiss: false,
    });
    modal.onDidDismiss()
      .then((res) => {
        if (res.data && res.data.lat != 0 && res.data.lng != 0) {
          this.deliveryAreas.push({
            lat: res.data.lat,
            lng: res.data.lng,
            active: true,
            cost: 0,
            radius: 0,
            minAmnt: null,
            freeDeliveryAmnt: null,
            estimatedDeliveryTime: ''
          })
        }
      });
    await modal.present();
  }


  async openPincodeModal() {
    const modal = await this.modalController.create({
      component: PincodesModalPage,
      backdropDismiss: false,
      componentProps: {
        alreadyAddedPincodes: this.deliveryPincodes
      }
    });
    modal.onDidDismiss()
      .then((res) => {
        this.deliveryPincodes = res.data;
      });
    await modal.present();
  }

  exportPincodes() {
    var data = [];
    this.deliveryPincodes.forEach((element) => {
      let obj = {
        pincode: element.pincode,
        cost: element.cost ? element.cost : '0',
        minAmnt: element.minAmnt ? element.minAmnt : '',
        freeDeliveryAmnt: element.freeDeliveryAmnt ? element.freeDeliveryAmnt : '',
        estimatedDeliveryTime: element.estimatedDeliveryTime,
        active: element.active ? 'YES' : 'NO',
      };
      data.push(obj);
    });
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      filename: 'Pincodes',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      //headers: ['Pincodes', 'Cost', 'Min Amount', 'Free Delivery Above amount']
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }

  checkValidCsv(data) {
    let isValid = true;
    if (data[0].indexOf('pincode') < 0) {
      isValid = false;
    }
    return isValid;
  }

  async presentImportInstructions() {
    const alert = await this.alertController.create({
      header: 'Import Instructions',
      message: '1. Please provide Estimated Delivery Time in <b>Days:Hours:Mins</b> format. </br>' +
        '2. Do not leave any pincode empty. </br>' +
        '3. All the pincode data will be replaced by the imported file.',
      buttons: ['ok']
    });
    await alert.present();
  }
  async importPincodes(csv: any) {
    console.log('csv:', csv);
    if (csv) {
      await this.presentLoading();
      let csvFile = csv.target.files[0];
      let options = {
        complete: (results, file) => {
          if (this.checkValidCsv(results.data)) {
            this.deliveryPincodes = [];
            for (let i = 1; i < results.data.length; i++) {
              let item = {
                pincode: results.data[i][0],
                cost: results.data[i][1] ? results.data[i][1].toString() : '',
                minAmnt: results.data[i][2] ? results.data[i][2] : null,
                freeDeliveryAmnt: results.data[i][3] ? results.data[i][3] : null,
                estimatedDeliveryTime: results.data[i][4] ? results.data[i][4] : '',
                active: results.data[i][5] ? (results.data[i][5].toLowerCase() == 'yes' ? true : false) : false
              };
              this.deliveryPincodes.push(item);
            }
            this.loading.dismiss();
            this.presentAlert('File imported Successfully');
          }
          else {
            this.loading.dismiss();
            this.presentAlert('Inavlid CSV !, Please check that CSV upload is correct');
          }
        }
        // Add your options here
      };
      this.papa.parse(csvFile, options);
    }
    this.myInputVariable.nativeElement.value = '';
  }

  changeComponent(index) {
    let prevMsgDiv = document.getElementById(this.selectedId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById(index.toString());
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.selectedId = index.toString();
  }

  activeKmSlab() {
    this.kmSlabs.active = !this.kmSlabs.active
  }

  async enterSlabData() {
    const alert = await this.alertController.create({
      subHeader: "Enter Slab Details",
      inputs: [
        {
          name: 'distance',
          type: 'number',
          placeholder: "Add distance for slab in Kms"
        },
        {
          name: 'cost',
          type: 'number',
          placeholder: "Add cost for slab"
        },
        {
          name: 'freeDeliveryAmount',
          type: 'number',
          placeholder: "Add free delivery amount"
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
            if (!data.distance || !data.cost || !data.freeDeliveryAmount) {
              this.presentAlert("Please enter all details!");
            }
            else {
              if (this.kmSlabs.slabs.length == 0) {
                this.kmSlabs.slabs.push({
                  range: [0, parseInt(data.distance)],
                  cost: parseInt(data.cost),
                  freeDeliveryAmount: parseInt(data.freeDeliveryAmount)
                })
              }
              else {
                let lastIndex = this.kmSlabs.slabs.length
                this.kmSlabs.slabs.push({
                  range: [this.kmSlabs.slabs[lastIndex - 1].range[1],
                  this.kmSlabs.slabs[lastIndex - 1].range[1] + parseInt(data.distance)],
                  cost: parseInt(data.cost),
                  freeDeliveryAmount: parseInt(data.freeDeliveryAmount)
                })
              }
            }
          }
        }
      ]
    });
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
            this.kmSlabs.slabs = []
          }
        }
      ]
    });
    await alert.present();
  }

  activeWeightSlab() {
    this.weightSlabs.active = !this.weightSlabs.active
  }

  async enterWeightSlabData() {
    let adminInput;
    if (this.weightSlabs.slabs.length != 0) {
      adminInput = [
        {
          name: 'weight',
          type: 'number',
          placeholder: "Add weight for slab in Kgs"
        },
        {
          name: 'cost',
          type: 'number',
          placeholder: "Add cost for slab"
        }
      ]
    }
    else {
      adminInput = [
        {
          name: 'minWeight',
          type: 'number',
          placeholder: "Add min weight for delivery"
        },
        {
          name: 'weight',
          type: 'number',
          placeholder: "Add weight for slab in Kgs"
        },
        {
          name: 'cost',
          type: 'number',
          placeholder: "Add cost for slab"
        }
      ]
    }
    const alert = await this.alertController.create({
      subHeader: "Enter Slab Details",
      inputs: adminInput,
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
            if (!data.weight || !data.cost) {
              this.presentAlert("Please enter all details!");
            }
            else {
              if (this.weightSlabs.slabs.length == 0) {
                if (!data.minWeight) {
                  this.presentAlert("Please enter all details!");
                }
                else {
                  this.weightSlabs.slabs.push({
                    range: [parseInt(data.minWeight), parseInt(data.minWeight) + parseInt(data.weight)],
                    cost: parseInt(data.cost)
                  })
                }
              }
              else {
                let lastIndex = this.weightSlabs.slabs.length
                this.weightSlabs.slabs.push({
                  range: [this.weightSlabs.slabs[lastIndex - 1].range[1],
                  this.weightSlabs.slabs[lastIndex - 1].range[1] + parseInt(data.weight)],
                  cost: parseInt(data.cost)
                })
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async removeWeightSlabs() {
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


  freeDeliveryToggle() {
    this.allowFreeDelivery = !this.allowFreeDelivery
  }

  async createNewDeliveryType() {
    const alert = await this.alertController.create({
      header: 'Enter delivery type name',
      inputs: [
        {
          name: 'deliveryTypeInput',
          type: 'text',
          placeholder: 'Delivery type name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done',
          handler: async (data) => {
            if (data.deliveryTypeInput) {
              console.log('data handler :', data.deliveryTypeInput);
              if (this.newDeliveryType.some(n => n.id === data.deliveryTypeInput.toLowerCase())) {
                this.presentAlert('Type already exists!');
              } else {
                await this.presentLoading();
                const settings = this.getDefaultDeliverySettings();
                this.newDeliveryType.push({ id: data.deliveryTypeInput.toLowerCase(), settings });
                this.events.publish('delivery-settings:saveDeliverySettings', settings, data.deliveryTypeInput);
                console.log(' del type :', this.newDeliveryType);
              }
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async newSelection(index: any) {
    console.log('new selection data :', index);
    this.triggeredSelection = index;
    this.currentSelection = this.newDeliveryType[index];

    // let data = await this.deliverySettingsService.getDeliveryTypeData(this.currentSelection);
    // console.log(data);
    this.setDeliverySettings(this.newDeliveryType[index]['settings']);
    console.log('current selection :', this.currentSelection);
    // selection color 
    let prevMsgDiv = document.getElementById(this.selectedIdType);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById(`field${index}`);
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.selectedIdType = `field${index}`;
  }

  giveBgColor(index: any){
    // selection color 
    let prevMsgDiv = document.getElementById(this.selectedIdType);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById(`field${index}`);
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.selectedIdType = `field${index}`;
  }

  getDefaultDeliverySettings() {
    const data = {
      defaultDeliveryAmt: '',
      freeDeliveryAmt: '',
      isStorePickup: false,
      storePickupCharges: '',
      isKmBasedDelivery: false,
      deliveryByWeight: {
        active: false,
        cost: 0,
        baseWeight: 0,
        baseCost: 0
      },
      chargesPerKm: '',
      maxDeliveryOfKm: '',
      isDeliverySchedule: false,
      isDeliveryScheduleMandatory: false,
      deliveryDays: [],
      timeSchedules: [],
      deliveryType: 'pincodes',
      isAllowAllPincodes: true,
      deliveryPincodes: [
      ],
      deliveryAreas: [
        {
          lat: 0,
          lng: 0,
          cost: 0,
          radius: 0,
          active: true,
          minAmnt: null,
          freeDeliveryAmnt: null,
          estimatedDeliveryTime: ''
        }
      ],
      maxDaysOfDelivery: null,
      minHrs: null,
      allowSameDayDelivery: false,
      lastDeliveryTime: moment(new Date().toISOString()).format('hh:mm A'),
      instantDelivery: {
        isActive: false,
        time: null
      },
      isStoreDelivery: { isActive: false, estimatedTime: '' },
      kmSlabs: {
        active: false,
        slabs: []
      },
      weightSlabs: {
        active: false,
        slabs: []
      },
      allowFreeDelivery: true,
      gstPerc: null
    }
    return data;
  }

  setDeliverySettings(data) {
    if (!this.isEmptyObj(data)) {
      this.defaultDeliveryAmt = data.defaultDeliveryAmt;
      this.freeDeliveryAmt = data.freeDeliveryAmt;
      this.isStorePickup = data.isStorePickup;
      this.storePickupCharges = data.storePickupCharges;
      this.isKmBasedDelivery = data.isKmBasedDelivery;
      this.deliveryByWeight = data.deliveryByWeight || this.deliveryByWeight;
      this.chargesPerKm = data.chargesPerKm;
      this.maxDeliveryOfKm = data.maxDeliveryOfKm ? data.maxDeliveryOfKm : '';
      this.isDeliverySchedule = data.isDeliverySchedule;
      this.isDeliveryScheduleMandatory = typeof data.isDeliveryScheduleMandatory !== 'undefined' ? data.isDeliveryScheduleMandatory : false;
      this.deliveryDays = data.deliveryDays;
      this.timeSchedules = data.timeSchedules;
      this.deliveryType = data.deliveryType ? data.deliveryType : this.deliveryType;
      this.isAllowAllPincodes = data.isAllowAllPincodes;
      for (let index = 0; index < data.deliveryPincodes.length; index++) {
        if (!data.deliveryPincodes[index].hasOwnProperty('estimatedDeliveryTime')) {
          data.deliveryPincodes[index]['estimatedDeliveryTime'] = '';
        }
      }
      this.deliveryPincodes = data.deliveryPincodes;
      this.deliveryAreas = data.deliveryAreas ? data.deliveryAreas : this.deliveryAreas;
      this.maxDaysOfDelivery = data.maxDaysOfDelivery;
      this.allowSameDayDelivery = data.allowSameDayDelivery ? data.allowSameDayDelivery : false;
      this.instantDelivery = data.instantDelivery ? data.instantDelivery : { isActive: false, time: null };
      this.isStoreDelivery = data.isStoreDelivery ? data.isStoreDelivery : { isActive: false, estimatedTime: '' };
      this.minHrs = data.minHrs ? data.minHrs : null;
      this.kmSlabs = data.kmSlabs ? data.kmSlabs : this.kmSlabs
      this.weightSlabs = data.weightSlabs ? data.weightSlabs : this.weightSlabs
      if (data.hasOwnProperty('allowFreeDelivery')) {
        this.allowFreeDelivery = data.allowFreeDelivery
      }
      if (data.lastDeliveryTime) {
        this.lastDeliveryTime = new Date('October 15, 1996' + ' ' + data.lastDeliveryTime).toISOString();
      } else {
        this.lastDeliveryTime = new Date().toISOString();
      }
      for (let index = 0; index < this.days.length; index++) {
        if (this.deliveryDays.indexOf(this.days[index].day) !== -1) {
          this.days[index].active = true;
        }
      }
      if (this.timeSchedules.length > 0) {
        this.getDeliveryDates();
      }
      this.gstPerc = 'gstPerc' in data ? data.gstPerc : null;
    }
  }
  allowInstantDelivery() {
    this.instantDelivery.isActive = !this.instantDelivery.isActive;
  }

  allowDeliverybyStore() {
    this.isStoreDelivery.isActive = !this.isStoreDelivery.isActive;
  }

  removeProfile(id: any, idx: any) {
    console.log('called :', id);
    this.removeAlert(id, idx);
  }

  async removeAlert(id, idx) {
    const removeProfile = await this.alertController.create({
      header: 'Delete Delivery Settings Profile !',
      message: 'Do you want to <Strong>Delete</Strong> this delivery settings profile ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.deliverySettingsService.deleteDeliverySettings(id);
            this.newDeliveryType.splice(idx, 1);
            console.log('new data :', this.newDeliveryType);
            document.getElementById('field0').click();
          }
        }
      ]
    })
    await removeProfile.present();
  }
  
  async openStateModal(i) {
    const modal = await this.modalController.create({
      component: StatesModalPage,
    });
    modal.onDidDismiss()
      .then((res) => {
        console.log('data from modal', res);
        if (res.data) {
          console.log(res.data);
          this.availableLocations.states[i].state = res.data.state, 
          this.availableLocations.states[i].stateCode = res.data.code;
        }
      });
    await modal.present();
  }

  removeLocation(choice, i){
    if (choice == 'states') {
      this.availableLocations.states.splice(i, 1);
    } else if(choice == 'pincodes'){
      this.availableLocations.pincodes.splice(i, 1);
    }
  }

  addMoreLocation(choice){
    if (choice == 'states') {
      this.availableLocations.states.push({state: '', stateCode: '', types: []});
    } else if(choice == 'pincodes'){
      this.availableLocations.pincodes.push({pincode: '', types: []});
    }
  }

  async getLocations(){
    this.availableLocations = await this.deliverySettingsService.getLocations();
  }
  setStateTypes(ev, index){
    console.log('ev.target.value',ev.target.value);
    this.availableLocations.states[index].types = ev.target.value;
  }

  async saveLocations(){
    console.log('this.availableLocations:', this.availableLocations);
    let success = await this.deliverySettingsService.setLocations(this.availableLocations);
    if (success) {
      this.presentAlert('States & Pincodes data saved successfully');
    } else {
      this.presentAlert('Please try again after sometime');
    }
  }
  
}
