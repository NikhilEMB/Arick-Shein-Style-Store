import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { convertSnaps } from '../db-utilis';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ManageShipmentService {

    middlewareUrl = this.configService.environment.middleware ? this.configService.environment.middleware.url : 'https://us-central1-bwi-middleware.cloudfunctions.net';

    integrationCode = '';
    constructor(private events: Events, 
        private afs: AngularFirestore, 
        private http: HttpClient, 
        private storage: Storage,
        private configService: ConfigService) { }

    initializeSubscriptions() {
        this.events.subscribe('manage-shipment:getOrderDetails', (orderId) => {
            this.getOrderDetails(orderId);
        });
        this.events.subscribe('manage-shipment:getCustomOrder', (orderId) => {
            this.getCustomOrder(orderId);
        });
        this.events.subscribe('manage-shipment:createCustomOrder', (customOrder, orderId) => {
            this.createCustomOrder(customOrder, orderId);
        });
        this.events.subscribe('manage-shipment:checkCourierServiceability', (courierServ, orderId) => {
            this.checkCourierServiceability(courierServ, orderId);
        });

        this.events.subscribe('manage-shipment:selectCourier', (data, orderId) => {
            this.selectCourier(data, orderId);
        });

        this.events.subscribe('manage-shipment:getAllPickupLocations', () => {
            this.getAllPickupLocations();
        });

        this.events.subscribe('manage-shipment:requestForShipmentPickup', (data, orderId) => {
            this.requestForShipmentPickup(data, orderId);
        });

        this.events.subscribe('manage-shipment:generateReceipts', (receipts, orderId) => {
            this.generateReceipts(receipts, orderId);
        });

        this.events.subscribe('manage-shipment:getTrackingDetails', (trackingParams, orderId) => {
            this.getTrackingDetails(trackingParams, orderId);
        });

        this.events.subscribe('manage-shipment:sendTrackLinkToUser', (link, orderId) => {
            this.sendTrackLinkToUser(link, orderId);
        });

        this.events.subscribe('manage-shipment:cancelAndStartNewShipment', (data, orderId) => {
            this.cancelAndStartNewShipment(data, orderId);
        });
    }

    async getOrderDetails(orderId) {
        try {
            orderId = parseInt(orderId);
            console.log('orderId', orderId, typeof orderId);
            const order: any = await this.afs.collection('orders', ref => ref.where('orderId', '==', orderId)).snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data as {} };
                }))
            ).pipe(first()).toPromise();
            const storeDoc = await this.afs.collection('settings').doc('store').valueChanges().pipe(first()).toPromise();
            const userDetails = await this.afs.collection('users').doc(order[0].userId).valueChanges().pipe(first()).toPromise();
            this.events.publish('manage-shipment:getOrderDetailsSuccess', order[0], storeDoc, userDetails);
        } catch (error) {
            this.events.publish('manage-shipment:apiFailure', error.error && error.error.message ? error.error.message : 'Oops! Some error occured, Please check your credentials from Integrations page or Please try again later.');
            console.log(error);
        }
    }

    async getCustomOrder(orderId) {
        try {
            console.log('orderId', orderId, typeof orderId, this.integrationCode);
            const customOrder = await this.afs.collection('integrations').doc('delivery').collection('list').doc(this.integrationCode).collection('orders').doc(`${orderId}`).valueChanges().pipe(first()).toPromise();
            this.events.publish('manage-shipment:getCustomOrderSuccess', customOrder || null);

        } catch (error) {
            this.events.publish('manage-shipment:apiFailure', error.error && error.error.message ? error.error.message : 'Oops! Some error occured, Please check your credentials from Integrations page or Please try again later.');
            console.log(error);
        }
    }

    async createCustomOrder(customOrder, orderId) {
        console.log('customOrder:', customOrder);
        try {
            const apiData = {
                projectId: environment.firebase.projectId,
                integrationCode: this.integrationCode,
                data: customOrder
            }
            this.http.post<any>(this.middlewareUrl + '/delivery-createShipment', apiData).subscribe(async (response) => {
                console.log('response: ', response);
                let cancelCount = 0;
                const order: any = await this.afs.collection('integrations').doc('delivery').collection('list').doc(this.integrationCode).collection('orders').doc(`${orderId}`).valueChanges().pipe(first()).toPromise();
                if (order && order !== undefined) {
                    cancelCount = order.cancelCount || 0;
                }
                await this.afs.collection('integrations').doc('delivery').collection('list').doc(this.integrationCode).collection('orders').doc(`${orderId}`).set(
                    {
                        customOrder: response.customOrderObject,
                        status: 'order_created',
                        shipmentDetails: response.shipmentDetails,
                        cancelCount: cancelCount
                    }
                );
                this.events.publish('manage-shipment:createCustomOrderSuccess', {customOrder: response.customOrderObject, shipmentDetails: response.shipmentDetails});
            }, error => {
                this.events.publish('manage-shipment:apiFailure', error.error && error.error.message ? error.error.message : 'Oops! Some error occured, Please check your credentials from Integrations page or Please try again later.');
                console.log(error);
            });
        } catch (error) {
            this.events.publish('manage-shipment:apiFailure', error.error && error.error.message ? error.error.message : 'Oops! Some error occured, Please check your credentials from Integrations page or Please try again later.');
            console.log(error);
        }
    }

    async checkCourierServiceability(courierServ, orderId) {
        console.log('courierServ data:', courierServ, orderId);
        const data = {
            projectId: environment.firebase.projectId,
            integrationCode: this.integrationCode,
            data: {...courierServ, orderId}
        }
        try {
            const resp = await this.http.post<any>(this.middlewareUrl + '/delivery-getCourierPartners', data).toPromise();
            console.log('resp', resp);
            if(resp.shipmentDetails) {
                await this.afs.collection('integrations').doc('delivery').collection('list').doc(this.integrationCode).collection('orders').doc(`${orderId}`).update(
                    {
                        shipmentDetails: resp.shipmentDetails,
                        status: 'courier_selected'
                    }
                );
            }
            this.events.publish('manage-shipment:checkCourierServiceabilitySuccess', resp);
        } catch (error) {
            // this.events.publish('manage-shipment:apiFailure', error.error && error.error.message ? error.error.message : 'Oops! Some error occured, Please check your credentials from Integrations page or Please try again later.');
            console.log('error', error);
        }
    }

    async selectCourier(courierData, orderId) {
        try {
            const data = {
                projectId: environment.firebase.projectId,
                integrationCode: this.integrationCode,
                data: courierData
            }
            const resp: any = await this.http.post<any>(this.middlewareUrl + '/delivery-assignAwb', data).toPromise();
            console.log('resp', resp);
            await this.afs.collection('integrations').doc('delivery').collection('list').doc(this.integrationCode).collection('orders').doc(`${orderId}`).update(
                {
                    awb: resp.awb,
                    shipmentDetails: resp.shipmentDetails,
                    status: 'courier_selected'
                }
            );
            this.events.publish('manage-shipment:selectCourierSuccess', resp);
        } catch (error) {
            this.events.publish('manage-shipment:apiFailure', error.error && error.error.message ? error.error.message : 'Oops! Some error occured, Please check your credentials from Integrations page or Please try again later.');
            console.log('error', error);
        }
    }

    async getAllPickupLocations() {
        try {
            let pickupLocations = [];
            const data = {
                projectId: environment.firebase.projectId,
                integrationCode: this.integrationCode
            }
            const resp = await this.http.post<any>(this.middlewareUrl + '/delivery-getPickupLocations', data).toPromise();
            console.log('resp', resp);
            return resp.pickupLocations;
            // this.events.publish('manage-shipment:getAllPickupLocationsSuccess', pickupLocations);
        } catch (error) {
            this.events.publish('manage-shipment:apiFailure', error.error && error.error.message ? error.error.message : 'Oops! Some error occured, Please check your credentials from Integrations page or Please try again later.');
            console.log('error', error);
        }
    }

    async requestForShipmentPickup(shipmentData: any, orderId) {
        try {
            const data = {
                projectId: environment.firebase.projectId,
                integrationCode: this.integrationCode,
                data: shipmentData
            }
            const resp: any = await this.http.post<any>(this.middlewareUrl + '/delivery-generateShipmentPickup', data).toPromise();
            console.log('resp', resp);
            await this.afs.collection('integrations').doc('delivery').collection('list').doc(this.integrationCode).collection('orders').doc(`${orderId}`).update(
                {
                    pickupDetails: resp.pickupDetails
                }
            );
            this.events.publish('manage-shipment:requestForShipmentPickupSuccess', resp.pickupDetails);
        } catch (error) {
            this.events.publish('manage-shipment:apiFailure', error.error && error.error.message ? error.error.message : 'Oops! Some error occured, Please check your credentials from Integrations page or Please try again later.');
            console.log('error', error);
        }
    }

    async generateReceipts(shipmentDetails, orderId) {
        try {

            // get manifest url
            const manifest: any = await this.generateManifest(shipmentDetails);

            //get label url
            const label: any = await this.generateLabel(shipmentDetails);

            //get invoice url
            const invoice: any = await this.generateInvoice(shipmentDetails);

            let urls = {
                manifest: manifest.url || '',
                label: label.url || '',
                invoice: invoice.url || ''
            }
            await this.afs.collection('integrations').doc('delivery').collection('list').doc(this.integrationCode).collection('orders').doc(`${orderId}`).update(
                {
                    receipts: urls,
                    status: 'receipts_generated'
                }
            );

            this.events.publish('manage-shipment:generateReceiptsSuccess', urls);

        } catch (error) {
            this.events.publish('manage-shipment:apiFailure', error.error && error.error.message ? error.error.message : 'Oops! Some error occured, Please check your credentials from Integrations page or Please try again later.');
            console.log('error', error);
        }
    }

    async generateManifest(shipmentDetails, orderId?) {
        return new Promise(async (resolve, reject) => {
            const data = {
                projectId: environment.firebase.projectId,
                integrationCode: this.integrationCode,
                data: shipmentDetails
            }
            const response: any = await this.http.post<any>(this.middlewareUrl + '/delivery-getManifest', data).toPromise();
            console.log('manifest', response);
            if (orderId && response.url) {
                await this.afs.collection('integrations').doc('delivery').collection('list').doc(this.integrationCode).collection('orders').doc(`${orderId}`).update(
                    {
                        "receipts.manifest": response.url,
                    }
                );
            }
            resolve(response.url);
        });
    }
    async generateLabel(shipmentDetails, orderId?) {
        return new Promise(async (resolve, reject) => {
            const data = {
                projectId: environment.firebase.projectId,
                integrationCode: this.integrationCode,
                data: {...shipmentDetails, orderId}
            }
            const response: any = await this.http.post<any>(this.middlewareUrl + '/delivery-getLabel', data).toPromise();
            console.log('label', response);
            if (orderId && response.url) {
                await this.afs.collection('integrations').doc('delivery').collection('list').doc(this.integrationCode).collection('orders').doc(`${orderId}`).update(
                    {
                        "receipts.label": response.url,
                    }
                );
            }
            resolve(response.url);
        });
    }
    async generateInvoice(shipmentDetails, orderId?) {
        return new Promise(async (resolve, reject) => {
            const data = {
                projectId: environment.firebase.projectId,
                integrationCode: this.integrationCode,
                data: {...shipmentDetails, orderId}
            }
            console.log('orderId', orderId);
            const response: any = await this.http.post<any>(this.middlewareUrl + '/delivery-getInvoice', data).toPromise();
            console.log('invoice', response);
            if (orderId && response.url) {
                await this.afs.collection('integrations').doc('delivery').collection('list').doc(this.integrationCode).collection('orders').doc(`${orderId}`).update(
                    {
                        "receipts.invoice": response.url,
                    }
                );
            }
            resolve(response.url);
        });
    }

    async getTrackingDetails(shipmentDetails, orderId) {
        try {
            const data = {
                projectId: environment.firebase.projectId,
                integrationCode: this.integrationCode,
                data: shipmentDetails
            }
            const response: any = await this.http.post<any>(this.middlewareUrl + '/delivery-getTrackingDetails', data).toPromise();
            console.log('trackingDetails response', response);
            await this.afs.collection('integrations').doc('delivery').collection('list').doc(this.integrationCode).collection('orders').doc(`${orderId}`).update(
                {
                    trackingDetails: response.trackingDetails
                }
            );
            this.events.publish('manage-shipment:getTrackingDetailsSuccess', response.trackingDetails);
        } catch (error) {
            this.events.publish('manage-shipment:apiFailure', error.error && error.error.message ? error.error.message : 'Oops! Some error occured, Please check your credentials from Integrations page or Please try again later.');
            console.log('error', error);
        }
    }

    async sendTrackLinkToUser(link, orderId) {
        try {
            const orderRef = this.afs.collection('orders', ref => ref.where('orderId', '==', orderId));
            const orderData: any = await orderRef.snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data as {} };
                }))
            ).pipe(first()).toPromise();
            await this.afs.collection('orders').doc(orderData[0].id).update(
                {
                    message: `Tracking Link: ${link}`
                }
            );
            const trackingLinkChatMsg = {
                author: 'admin',
                createdAt: new Date(),
                orderId: orderData[0].orderId,
                published: true,
                type: 'txt',
                isRead: false,
                message: `Tracking Link: ${link}`
            };
            this.events.publish('chat:sendMsg', trackingLinkChatMsg, orderData[0].userId);
            this.events.publish('manage-shipment:sendTrackLinkToUserSuccess');
        } catch (error) {
            this.events.publish('manage-shipment:apiFailure', error.error && error.error.message ? error.error.message : 'Oops! Some error occured, Please check your credentials from Integrations page or Please try again later.');
            console.log('error', error);
        }
    }

    async cancelAndStartNewShipment(shipmentData, orderId) {
        try {
            const data = {
                projectId: environment.firebase.projectId,
                integrationCode: this.integrationCode,
                data: {...shipmentData, orderId}
            }
            const resp: any = await this.http.post<any>(this.middlewareUrl + '/delivery-cancelShipment', data).toPromise();
            if(resp.status) {
                const integrationOrderDoc: any = await this.afs.collection('integrations').doc('delivery').collection('list').doc(this.integrationCode).collection('orders').doc(`${orderId}`).valueChanges().pipe(first()).toPromise();
                console.log('integrationOrderDoc', integrationOrderDoc);
                if (integrationOrderDoc) {
                    const cancelCount = integrationOrderDoc.cancelCount || 0;
                    console.log('cancelCount from db...', cancelCount);
                    await this.afs.collection('integrations').doc('delivery').collection('list').doc(this.integrationCode).collection('orders').doc(`${orderId}`).update(
                        {
                            cancelCount: cancelCount + 1,
                            customOrder: null,
                            shipmentDetails: null,
                            pickupDetails: null,
                            receiptsUrls: null,
                            trackingDetails: null,
                            awb: null,
                            receipts: [],
                            status: 'process_start'
                        }
                    );
                }
                this.events.publish('manage-shipment:cancelAndStartNewShipmentSuccess');
            } else {
                this.events.publish('manage-shipment:cancelAndStartNewShipmentFailure');
            }
        } catch (error) {
            console.log(error);
            this.events.publish('manage-shipment:apiFailure', error.error && error.error.message ? error.error.message : 'Oops! Some error occured, Please check your credentials from Integrations page or Please try again later.');
        }
    }

    async getAvailableIntegrations() {
      return new Promise<any[]>(async (resolve) => {
          try {
              const integrations = await this.afs.collection('integrations').doc('delivery').collection('list', ref => ref
              .where('active', '==', true))
              .snapshotChanges().pipe(
                map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
                resolve(integrations);
          } catch (error) {
              console.log('error in get integrations', error);
              resolve([]);
          }
      });
    }
}
