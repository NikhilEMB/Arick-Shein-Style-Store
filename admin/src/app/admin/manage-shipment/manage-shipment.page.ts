import { Component, OnInit } from "@angular/core";
import { AlertController, Events, LoadingController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { SharedService } from "src/app/services/shared/shared.service";
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {
  InAppBrowser,
  InAppBrowserObject,
} from "@ionic-native/in-app-browser/ngx";
import { ManageShipmentService } from "src/app/services/manage-shipment/manage-shipment.service";
import { VendorService } from "src/app/services/vendor/vendor.service";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-manage-shipment",
  templateUrl: "./manage-shipment.page.html",
  styleUrls: ["./manage-shipment.page.scss"],
})
export class ManageShipmentPage implements OnInit {
  orderId: any;
  currentStatus = "process_start";
  statusIndex = 1;
  loading: HTMLIonLoadingElement;
  couriers = [];
  recommendedCourierId = null;
  shipmentDetails: any = {};
  pickupLocations = [];
  awbData: any = {};
  pickupDetails: any = {};
  receiptsUrls: any = {};
  trackingDetails: any = {
    trackUrl: "",
  };
  pickupPincode = null;

  receiptTypes = ["manifest", "label", "invoice"];
  cancelCount = 0;
  orderDetails: any;
  userDetails: any;
  storeDoc: any;
  customOrder: any = {
    length: null,
    breadth: null,
    height: null,
    weight: null,
  };
  integrations = [];
  integrationOrder: any;
  trackDetailsType: string;
  mainOrderId: number;
  pickupIdsForVendors = {};
  vendorId: any;
  currentVendorId: any;
  isVendorLogin = false;
  vendorAddress = {};
  constructor(
    private events: Events,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private sharedService: SharedService,
    private inAppBrowser: InAppBrowser,
    public manageShipmentService: ManageShipmentService,
    private activatedRoute: ActivatedRoute,
    private vendorService: VendorService,
    private afs: AngularFirestore, 
  ) {
    this.orderId = parseInt(
      this.activatedRoute.snapshot.paramMap.get("order_id")
    );
    const vendorId = this.activatedRoute.snapshot.paramMap.get("vendor_id");
    if(vendorId) {
      this.isVendorLogin = true;
      this.currentVendorId = vendorId;
    }
    this.mainOrderId = this.orderId;
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.initializeSubscriptions();
    this.getAvailableIntegrations();
    // await this.presentLoading("Please Wait...");
    this.events.publish("manage-shipment:getOrderDetails", this.orderId);
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe(
      "manage-shipment:getCustomOrderSuccess",
      async (integrationOrder) => {
        console.log("integrationOrder:", integrationOrder);
        if (integrationOrder) {
          this.integrationOrder = integrationOrder;
          this.customOrder = integrationOrder.customOrder || this.customOrder;
          let projectId = environment.firebase.projectId || null
          if (projectId && (projectId === 'bwi-bistarwale') && typeof this.customOrder === 'string') {
            this.customOrder = JSON.parse(this.customOrder.replace('format=json&data=', ''))
          }
          this.currentStatus = integrationOrder.status || "process_start";
          this.shipmentDetails = integrationOrder.shipmentDetails || {};
          this.pickupDetails = integrationOrder.pickupDetails || {};
          this.receiptsUrls = integrationOrder.receipts || {};
          this.trackingDetails =
            integrationOrder.trackingDetails || this.trackingDetails;
          this.awbData = integrationOrder.awb || {};
          this.cancelCount = integrationOrder.cancelCount || 0;

          //setting status index
          if (this.currentStatus === "order_created") {
            this.statusIndex = 2;
            this.events.publish(
              "manage-shipment:checkCourierServiceability",
              integrationOrder,
              this.orderId
            );
          } else if (this.currentStatus === "courier_selected") {
            this.statusIndex = 3;
          } else if (this.currentStatus === "receipts_generated") {
            this.statusIndex = 4;
          } else {
            this.statusIndex = 1;
          }
        }
        if (this.loading) {
          this.loading.dismiss();
        }
      }
    );

    this.events.subscribe(
      "manage-shipment:getOrderDetailsSuccess",
      async (orderDetails, storeDoc, userDetails) => {
        console.log("orderDetails:", orderDetails);
        console.log("userDetails:", userDetails);
        this.orderDetails = orderDetails;
        this.userDetails = userDetails;
        this.storeDoc = storeDoc;
        this.manageShipmentService.integrationCode =
        this.isIntegrationCodeSaved()
        ? this.orderDetails.externalIntegration.delivery.integrationCode
        : "";
        // this.checkVendors();
        if (this.manageShipmentService.integrationCode) {
          this.getCustomOrder();
        } else {
          if (this.loading) {
            this.loading.dismiss();
          }
        }
        if('vendors' in this.orderDetails && this.orderDetails.vendors.length) {
          const vendorData = await this.vendorService.getVendorDataWithId(this.orderDetails.vendors[0].id); 
          this.setVendorPickupIdAndAddress(vendorData, this.orderDetails.vendors[0].id)
        }
      }
    );

    this.events.subscribe(
      "manage-shipment:getAllPickupLocationsSuccess",
      (locations) => {
        console.log('this.pickupLocations', this.pickupLocations)
        this.pickupLocations = locations;
      }
    );

    this.events.subscribe(
      "manage-shipment:createCustomOrderSuccess",
      (data) => {
        console.log("custom order created");
        this.shipmentDetails = data.shipmentDetails;
        this.customOrder = data.customOrder;
        let projectId = environment.firebase.projectId || null
        if (projectId && (projectId === 'bwi-bistarwale') && typeof data.customOrder === 'string') {
          this.customOrder = JSON.parse(data.customOrder.replace('format=json&data=', ''))
        }
        this.statusIndex = 2;
        this.sharedService.presentAlert(
          `Custom order has been created successfully in ${this.manageShipmentService.integrationCode}. Now please select courier.`
        );
        this.events.publish(
          "manage-shipment:checkCourierServiceability",
          {
            shipmentDetails: this.shipmentDetails,
            customOrder: this.customOrder,
          },
          this.orderId
        );
      }
    );

    this.events.subscribe(
      "manage-shipment:checkCourierServiceabilitySuccess",
      (data) => {
        this.loading.dismiss();
        this.couriers = data.couriers;
        this.recommendedCourierId = data.recommendedCourierId;
        if (data.shipmentDetails) {
          this.shipmentDetails = data.shipmentDetails;
          this.statusIndex = 3;
        } else {
          this.statusIndex = 2;
        }
        if (this.loading) {
          this.loading.dismiss();
        }
      }
    );

    this.events.subscribe("manage-shipment:selectCourierSuccess", (data) => {
      this.awbData = data.awb;
      this.shipmentDetails = data.shipmentDetails;
      this.statusIndex = 3;
      this.events.publish(
        "manage-shipment:requestForShipmentPickup",
        this.shipmentDetails,
        this.orderId
      );
    });

    this.events.subscribe(
      "manage-shipment:requestForShipmentPickupSuccess",
      (pickupDetails) => {
        this.pickupDetails = pickupDetails;
        this.events.publish(
          "manage-shipment:generateReceipts",
          this.shipmentDetails,
          this.orderId
        );
      }
    );

    this.events.subscribe("manage-shipment:generateReceiptsSuccess", (urls) => {
      this.receiptsUrls = urls;
      this.statusIndex = 4;
      this.loading.dismiss();
    });

    this.events.subscribe(
      "manage-shipment:getTrackingDetailsSuccess",
      (trackingDetails) => {
        this.trackingDetails["trackUrl"] = trackingDetails.trackUrl || "";
        console.log("trackingDetails.trackEvents", trackingDetails.trackEvents);
        this.trackingDetails["trackEvents"] =
          trackingDetails.trackEvents || null;
        if (this.trackDetailsType === "url" && !trackingDetails.trackUrl) {
          this.sharedService.presentAlert("No tracking url available.");
        }
        if (
          this.trackDetailsType === "events" &&
          !trackingDetails.trackEvents
        ) {
          this.sharedService.presentAlert(
            "No tracking real time events available."
          );
        }
        this.loading.dismiss();
      }
    );

    this.events.subscribe(
      "manage-shipment:getTrackingDetailsFailure",
      (msg) => {
        this.sharedService.presentAlert(msg);
        this.loading.dismiss();
      }
    );

    this.events.subscribe("manage-shipment:sendTrackLinkToUserSuccess", () => {
      this.sharedService.presentAlert(
        "Tracking Link has been send succefully to user in chat as well as in order dispatch message"
      );
      this.loading.dismiss();
    });

    this.events.subscribe(
      "manage-shipment:cancelAndStartNewShipmentSuccess",
      () => {
        this.sharedService.presentAlert("Order cancelled successfully!");
        this.events.publish("manage-shipment:getCustomOrder", this.orderId);
      }
    );

    this.events.subscribe("manage-shipment:apiFailure", (msg) => {
      msg =
        msg === "Token has expired"
          ? `Login Session has been expired, Please Login from ${this.manageShipmentService.integrationCode} Settings again to continue`
          : msg;
      this.sharedService.presentAlert(msg);
      if (this.loading) {
        this.loading.dismiss();
      }
    });
  }

  async checkCourierServiceability() {
    await this.presentLoading("Please wait...");
    this.events.publish(
      "manage-shipment:checkCourierServiceability",
      { shipmentDetails: this.shipmentDetails, customOrder: this.customOrder },
      this.orderId
    );
  }

  async getAvailableIntegrations() {
    this.integrations =
      await this.manageShipmentService.getAvailableIntegrations();
  }

  async onChangeIntegration(event) {
    this.manageShipmentService.integrationCode = event.target.value;
    if(!this.isVendorsAvailable() || this.isVendorLogin) {
      this.getCustomOrder();
    }
  }

  async getCustomOrder() {
    await this.presentLoading("Please Wait...");
    this.pickupLocations =
      await this.manageShipmentService.getAllPickupLocations();
    console.log('pl : ', this.pickupLocations, this.manageShipmentService.integrationCode)
    this.events.publish("manage-shipment:getCustomOrder", this.orderId);
  }

  isIntegrationCodeSaved() {
    if (
      this.orderDetails &&
      this.orderDetails.externalIntegration &&
      this.orderDetails.externalIntegration.delivery.integrationCode
    ) {
      return true;
    } else {
      return false;
    }
  }

  disableCreateOrderBtn() {
    if (!this.manageShipmentService.integrationCode) {
      return true;
    } else {
      return false;
    }
  }

  getMerchantId() {
    const fastBeetleRef = this.afs.collection('integrations').doc('delivery').collection('list').doc('fastbeetle').get();
    fastBeetleRef.forEach((doc) => {
      console.log('fastbeetle : ', doc.data().credentials)
      return doc.data().credentials.merchantId
    })
  }

  async createOrder() {
    console.log(JSON.stringify(this.customOrder));
    console.log("storeDoc :", this.storeDoc);

    const orderData = this.orderDetails;
    if(this.manageShipmentService.integrationCode === 'shyplite' || this.manageShipmentService.integrationCode === 'delhivery') {
      if(this.currentVendorId) {
        // console.log('cvi : ', this.currentVendorId)
        // console.log('pifv : ', this.pickupIdsForVendors)
        if(this.pickupIdsForVendors[this.currentVendorId]) {
          orderData.pickupAddressId = this.pickupIdsForVendors[this.currentVendorId];
        } else {
          if (this.manageShipmentService.integrationCode !== 'delhivery') {
            this.sharedService.presentAlert('Please save Pickup Id for this vendor in vendor settings');
            return;
          }
        }
      }
    }
    
    await this.presentLoading(
      `Creating order in ${this.manageShipmentService.integrationCode}...`
    );
    orderData.cancelCount = this.cancelCount;
    orderData.length = this.customOrder.length;
    orderData.breadth = this.customOrder.breadth;
    orderData.height = this.customOrder.height;
    orderData.weight = this.customOrder.weight;
    orderData.billingEmail = this.userDetails.email || this.storeDoc.storeEmail;
    orderData.storeDoc = this.storeDoc;
    orderData.pickup_postcode = this.storeDoc.storeAddress.pincode || 0;
    orderData.orderId = this.orderId;
    orderData.vendorData = this.vendorAddress;

    if (this.manageShipmentService.integrationCode === "shiprocket") {
      orderData.pickup_location = this.customOrder.pickup_location || "";
      orderData.pickup_postcode = +(
        this.getPickupPostcode(orderData.pickup_location) || 0
      );
    }
    if (this.manageShipmentService.integrationCode === "fastbeetle") {
      orderData.pickup_location = this.customOrder.pickup_location || "";
      // orderData.merchantId = (this.customOrder.merchantId && (this.customOrder.merchantId != undefined)) ? this.customOrder.merchantId : await this.getMerchantId()
      orderData.merchantId = this.getMerchantId()
      orderData.createdAt = firebase.firestore.Timestamp.fromDate(new Date());
    }
    this.events.publish(
      "manage-shipment:createCustomOrder",
      orderData,
      this.orderId
    );
  }
 
  async selectCourier(courierId) {
    await this.presentLoading("Creating Shipment...");
    this.shipmentDetails.courier_id = courierId;
    this.events.publish(
      "manage-shipment:selectCourier",
      this.shipmentDetails,
      this.orderId
    );
  }

  onChangePickupLocation(e) {
    const locationId = e.target.value;
    console.log("locationId", locationId);
    console.log('pickupLocation', this.pickupLocations);
    if (this.manageShipmentService.integrationCode === 'shiprocket') {
      const index = this.pickupLocations.findIndex((l) => l.id === locationId);
      this.customOrder["pickup_location"] = this.pickupLocations[index].pickup_location;
      this.pickupPincode = parseInt(this.pickupLocations[index].pin_code);
    }
    if (this.manageShipmentService.integrationCode === 'fastbeetle') {
      const index = this.pickupLocations.findIndex((l) => l.profileName === locationId);
      this.customOrder["pickup_location"] = this.pickupLocations[index].profileName;
      this.customOrder["merchantId"] = this.pickupLocations[index].merchant;
    }

  }

  downloadUrl(type: string) {
    let url = "";
    url = this.receiptsUrls[type] || "";
    if (!url) {
      this.sharedService.presentAlert(
        `There is some problem in downloading url of ${type}.Please try again later.`
      );
    } else {
      const browser: InAppBrowserObject = this.inAppBrowser.create(
        url,
        "_system"
      );
    }
  }

  showToast() {
    this.sharedService.presentAlert("Tracking Link Copied!");
  }

  async presentLoading(msg: string) {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: 10000,
      spinner: "bubbles",
    });
    await this.loading.present();
  }

  async presentAlert(msg: string, btnTxt: string, page: string) {
    const alert = await this.alertController.create({
      message: msg,
      backdropDismiss: false,
      buttons: [
        {
          text: btnTxt,
          handler: () => {
            this.router.navigate([page]);
          },
        },
      ],
    });

    await alert.present();
  }

  async getTrackingDetails(type: string) {
    this.trackDetailsType = type;
    await this.presentLoading("Please Wait...");
    this.events.publish(
      "manage-shipment:getTrackingDetails",
      this.shipmentDetails,
      this.orderId
    );
  }

  async generateUrl(type) {
    await this.presentLoading(`Generating ${type}...`);
    if (type === "manifest") {
      const manifest: any = await this.manageShipmentService.generateManifest(
        this.shipmentDetails,
        this.orderId
      );
      this.loading.dismiss();
      if (manifest) {
        this.receiptsUrls["manifest"] = manifest;
      } else {
        this.sharedService.presentAlert(
          "There is some problem in generating Manifest. Please try again later."
        );
      }
    }
    if (type === "label") {
      const label: any = await this.manageShipmentService.generateLabel(
        this.shipmentDetails,
        this.orderId
      );
      this.loading.dismiss();
      if (label) {
        this.receiptsUrls["label"] = label;
      } else {
        this.sharedService.presentAlert(
          "There is some problem in generating Label. Please try again later."
        );
      }
    }
    if (type === "invoice") {
      const invoice: any = await this.manageShipmentService.generateInvoice(
        this.shipmentDetails,
        this.orderId
      );
      this.loading.dismiss();
      if (invoice) {
        this.receiptsUrls["invoice"] = invoice;
      } else {
        this.sharedService.presentAlert(
          "There is some problem in generating Invoice. Please try again later."
        );
      }
    }
  }

  async cancleOrder() {
    await this.presentLoading(
      `Cancelling order in ${this.manageShipmentService.integrationCode}...`
    );
    this.events.publish(
      "manage-shipment:cancelAndStartNewShipment",
      this.shipmentDetails,
      this.orderId
    );
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: `Are you sure you want to cancel and start new shipment in ${this.manageShipmentService.integrationCode}`,
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: "Yes",
          handler: () => {
            this.cancleOrder();
          },
        },
      ],
    });

    await alert.present();
  }

  async sendTrackingLink() {
    await this.presentLoading("Sending tracking link to user...");
    this.events.publish(
      "manage-shipment:sendTrackLinkToUser",
      this.trackingDetails.trackUrl,
      this.orderId
    );
  }

  getSelectedLocation() {
    if (this.pickupLocations.length && this.customOrder["pickup_location"]) {
      console.log('this.pickupLocations', this.pickupLocations)
      const index = this.pickupLocations.findIndex(
        (l) => l.pickup_location === this.customOrder["pickup_location"]
      );
      if (index !== -1) {
        console.log('this.pickupLocations[index].id', this.pickupLocations[index].id)
        return this.pickupLocations[index].id;
      }
    }
  }

  getCourierName() {
    console.log("this.couriers", this.couriers);
    const courier = this.couriers.find(
      (c) => c.courier_company_id === this.orderDetails.deliveryGstObj.courierId
    );
    if (courier && Object.keys(courier).length) {
      return courier.courier_name;
    } else {
      return null;
    }
  }

  getProductPrice(product) {
    if ("pack" in product && product.pack.variantType === "pieces") {
      return product.pack.price;
    } else {
      return product.price;
    }
  }

  getPickupPostcode(pickupLocation) {
    const index = this.pickupLocations.findIndex(
      (l) => l.pickup_location === pickupLocation
    );
    return this.pickupLocations[index].pin_code;
  }

  // checkVendors() {
  //   if('vendors' in this.orderDetails && this.orderDetails.vendors.length) {
  //     this.setOrderIdForVendor(this.orderDetails.vendors[0].id);
  //   }
  // }

  onChangeVendor(event) {
    this.setOrderIdForVendor(event.target.value);
  }

  async setVendorPickupIdAndAddress(vendorData, vendorId) {
    console.log('vendorData pass-on : ', vendorData);
    const pickupId = 'deliveryIntegration' in vendorData ? vendorData.deliveryIntegration.pickupId : '';
    this.pickupIdsForVendors[vendorId] = pickupId;
    this.vendorAddress = vendorData;
  }

  async setOrderIdForVendor(vendorId) {
    this.currentVendorId = vendorId;
    if(!(vendorId in this.pickupIdsForVendors)) {
      const vendorData = await this.vendorService.getVendorDataWithId(vendorId);
      if(vendorData) {
        // console.log('vendorData : ', vendorData);
        // const pickupId = 'deliveryIntegration' in vendorData ? vendorData.deliveryIntegration.pickupId : '';
        // this.pickupIdsForVendors[vendorId] = pickupId;
        // this.vendorAddress = vendorData;
        this.setVendorPickupIdAndAddress(vendorData, vendorId)
      }
    }
    const vendorProducts = this.orderDetails.vendors.find(v => v.id === vendorId).products;
    this.orderId = `${this.mainOrderId}-${vendorId}`;
    this.setVendorProducts(vendorProducts);
    this.getCustomOrder();
  }

  setVendorProducts(vendorProducts) {
    let products = [];
    for (const vendorProduct of vendorProducts) {
      this.orderDetails.products.map((product, index) => {
          if (product.productId === vendorProduct.id) {
              if ('pack' in product) {
                  if (product.pack.weight === vendorProduct.pack.weight) {
                      products.push({ index, ...product });
                  }
              } else {
                  products.push({ index, ...product });
              }
          }
      });
    }
    this.orderDetails.products = [...products];
  }

  isVendorsAvailable() {
    return 'vendors' in this.orderDetails && this.orderDetails.vendors.length;
  }

  removeSubscriptions() {
    this.events.unsubscribe("manage-shipment:getOrderDetailsSuccess");
    this.events.unsubscribe("manage-shipment:getCustomOrderSuccess");
    this.events.unsubscribe("manage-shipment:createCustomOrderSuccess");
    this.events.unsubscribe("manage-shipment:userNotAuthenticated");
    this.events.unsubscribe("manage-shipment:getAllPickupLocationsSuccess");
    this.events.unsubscribe(
      "manage-shipment:checkCourierServiceabilitySuccess"
    );
    this.events.unsubscribe("manage-shipment:selectCourierSuccess");
    this.events.unsubscribe("manage-shipment:requestForShipmentPickupSuccess");
    this.events.unsubscribe("manage-shipment:generateReceiptsSuccess");
    this.events.unsubscribe("manage-shipment:getTrackingDetailsSuccess");
    this.events.unsubscribe("manage-shipment:getTrackingDetailsFailure");
    this.events.unsubscribe("manage-shipment:userAuthenticated");
    this.events.unsubscribe("manage-shipment:sendTrackLinkToUserSuccess");
    this.events.unsubscribe("manage-shipment:apiFailure");
    this.events.unsubscribe("manage-shipment:cancelAndStartNewShipmentSuccess");
  }
}
