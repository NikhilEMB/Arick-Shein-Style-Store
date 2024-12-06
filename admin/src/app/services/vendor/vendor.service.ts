import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import { first, map } from 'rxjs/operators';
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';
import * as firebase from 'firebase'
import { ConfigService } from '../config/config.service';
import { Storage } from '@ionic/storage';
import { convertSnaps } from '../db-utilis';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { VendorMembership } from 'src/app/vendor-membership/vendor-membership.model';

@Injectable({
    providedIn: 'root'
})
export class VendorService {
    lastVendorOrder;
    ordersDataForVendor: any[] = [];
    lastResponseForVendorOrders: any;
    lastResponse: any;
    orders: any[];
    ordersLimit = 5;

    multiVendorRef = this.afs.collection('features').doc('multiVendor').collection('vendors');
    multiVendorRequestRef = this.afs.collection('features').doc('multiVendor').collection('requests');
    multiRegionRef = this.afs.collection('features').doc('multiRegion').collection('regions');
    vendorMembershipRef = this.afs.collection('features').doc('multiVendor').collection('membership');
    vendorOrderSub: Subscription;
    vendorOrders = new BehaviorSubject([]);

    constructor(
        private events: Events,
        private afs: AngularFirestore,
        private logglyService: LogglyLoggerService,
        private configService: ConfigService,
        private storage: Storage,
        private angularFireStorage: AngularFireStorage
    ) { }

    initializeSubscriptions() {
        this.events.subscribe('vendor:saveVendor', (vendor,updatedField) => {
            this.saveVendor(vendor,updatedField);
        });
        this.events.subscribe('vendor:toggleMultiVendorActive', (status) => {
            this.toggleMultiVendorActive(status);
        });
        this.events.subscribe('vendor:setMultiVendorDetails', (details) => {
            this.setMultiVendorDetails(details);
        });
        this.events.subscribe('vendor:getActiveStatus', () => {
            this.getActiveStatus();
        });
        this.events.subscribe('vendor:getAllVendors', () => {
            this.getAllVendors();
        });
        this.events.subscribe('vendor:deleteVendor', (id) => {
            this.deleteVendor(id);
        });
        this.events.subscribe('vendor:changeRegion', (regionId, vendorData) => {
            this.changeRegion(regionId, vendorData);
        });
        this.events.subscribe('vendor:removeRegion', (vendorData) => {
            this.removeRegion(vendorData);
        });
        this.events.subscribe('vendor:changeActiveStatusVendor', (vendorData, status) => {
            this.changeActiveStatusVendor(vendorData, status);
        });
        this.events.subscribe('vendor:getVendorData', (vendorId) => {
            this.getVendorData(vendorId);
        });
        this.events.subscribe('vendor:getVendorRequests', () => {
            this.getVendorRequests();
        });
        this.events.subscribe('vendor:updateVendorRequest', (requestId, updatedField) => {
            this.updateVendorRequest(requestId, updatedField);
        });
        this.events.subscribe('vendor:getAllActiveVendors', () => {
            this.getAllActiveVendors();
        });
        this.events.subscribe('vendor:getVendorName', (id) => {
            this.getVendorName(id);
        });
        this.events.subscribe('vendor:getProductsForVendor', (id) => {
            this.getProductsForVendor(id);
        });
        this.events.subscribe('vendor:copyProductsVendor', (id, copyToVendor, productList) => {
            this.copyProductsVendor(id, copyToVendor, productList);
        });
        this.events.subscribe('vendor:getVendorOrders', (vendorId,startDate,endDate) => {
            this.getVendorOrders(vendorId,startDate,endDate);
        });
    }

    async getVendorName(id: any, route?:string) {
        try {
            let currentData = await this.afs.collection('users').doc(id).valueChanges().pipe(first()).toPromise();
            if (route === 'service') {
                return currentData;
            }
            else {
                this.events.publish('vendor:getVendorNameSuccess', currentData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async saveVendor(vendorData: any, updatedField) {
        try {
            let vendorId = '';
            let baseImg = '';
            let vendorClone = JSON.parse(JSON.stringify(updatedField));
            if(vendorClone.image && (vendorClone.image.url.includes('data:image/jpeg;base64')  || vendorClone.image.url.includes('data:image/jpg;base64')  || vendorClone.image.url.includes('data:image/png;base64')  || vendorClone.image.url.includes('data:image/gif;base64'))) {
                baseImg = vendorClone.image.url;
                delete updatedField.image;
            }
            
            const vendorRef = this.multiVendorRef.doc(vendorData);
            vendorRef.get().toPromise().then(async (doc) => {
                if (doc.exists) {
                    await vendorRef.update(updatedField);
                } else {
                    await vendorRef.set(updatedField);
                }
            });

            if (baseImg != '') {
                let imgType  = this.getImageType(baseImg);
                const imgRef: any = this.angularFireStorage.ref(`vendors/${vendorData}/image/image`+ imgType);
                await imgRef.putString(baseImg, 'data_url');
            }
            this.events.publish('vendor:vendorSaved');
            //this.events.publish('vendor:getAllVendors');
        } catch (error) {
            console.dir(error);
            error['location'] = 'vendor-service:saveVendor';
            this.logglyService.log(error);
        }
    }

    getImageType(base64Img){
        let imgType = '.png';
        if (base64Img.includes('data:image/gif')) {
            imgType = '.gif';
        }
        return imgType;
      }

    async toggleMultiVendorActive(status: boolean) {
        try {
            await this.afs.collection('features').doc('multiVendor').set({ active: status });
            this.events.publish('vendor:multiVendorActiveChanged');
        } catch (error) {
            console.dir(error);
            error['location'] = 'vendor-service:toogleMultiVendorActive';
            this.logglyService.log(error);
        }
    }


    async setMultiVendorDetails(details) {
        try {
            let multiVendorDoc: any = await this.afs.collection('features').doc('multiVendor').valueChanges().pipe(first()).toPromise();
            if (multiVendorDoc) {
                await this.afs.collection('features').doc('multiVendor').update(details);
            } else {
                await this.afs.collection('features').doc('multiVendor').set(details);
            }
            this.events.publish('vendor:setMultiVendorDetailsSuccess');
        } catch (error) {
            console.dir(error);
            error['location'] = 'vendor-service:setMultiVendorDetailsSuccess';
            this.logglyService.log(error);
        }
    }

    async getVendorData(vendorId, route?) {
        // console.log('vendorData:,', vendorId);
        try {
            let currentData = await this.multiVendorRef.doc(vendorId).valueChanges().pipe(first()).toPromise();
            // console.log("getVendorData", currentData)
            if (route == 'details') {
                return currentData;
            }
            this.events.publish('vendor:getVendorDataSuccess', currentData);
        } catch (error) {
            console.log("getVendorData error",error);
        }
    }


    async getVendorRequests() {
        try {
            let allRequests: any = await this.multiVendorRequestRef.snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                }))
            ).pipe(first()).toPromise();

            console.log("all requests", allRequests);
            let unix = 0, data = [], leftOut = [];
            for (const request of allRequests) {
                if (request.createdAt) {
                    // console.log(new Date(request.createdAt.seconds.valueOf()))
                    data.push(request)
                } else {
                    leftOut.push(request)
                }
            }
            console.log('data : ', data)
            console.log('leftOut : ', leftOut)
             let newAllRequests = data.concat(leftOut);
            this.events.publish('vendor:getVendorRequestsSuccess', newAllRequests);
        } catch (error) {
            console.log(error)
        }
    }

    // convertUnixTimestampToDate(unixTimestamp) {
    //     const milliseconds = unixTimestamp * 1000;
    //     const dateObject = new Date(milliseconds);
    //     // const date = dateObject.toLocaleDateString();
    //     const date = dateObject.toLocaleString();
    //     console.log('date : ', date.toString());
    //     return date
    // }
    // convertDateToUnixTimestamp(dateStr) {
    //     const date = new Date(dateStr);
    //     const timestampInMs = date.getTime();
    //     const unixTimestamp = Math.floor(date.getTime() / 1000);
    //     console.log('unixTimestamp : ', unixTimestamp);
    //     return unixTimestamp
    // }

    async updateVendorRequest(requestId, updatedField) {
        try {
            await this.multiVendorRequestRef.doc(requestId).update(updatedField);
            this.events.publish('vendor:updateVendorRequestSuccess');
        } catch (error) {
            console.log(error)
        }
    }

    async changeActiveStatusVendor(vendorData, status) {
        try {
            await this.multiVendorRef.doc(vendorData).update({ active: status });
            this.events.publish('vendor:changeActiveStatusVendorSuccess');
        } catch (error) {
            error['location'] = 'vendor-service:changeRegion';
            this.logglyService.log(error);
        }
    }

    async updateVendorInfo(vendorId, details) {
        try {
            await this.multiVendorRef.doc(vendorId).update(details);
            return true;
        } catch (error) {
            console.log("update vendor info error : ",error);
            return false
        }
    }

    async getActiveStatus(route?) {
        try {
            const multiVendorDoc = await this.afs.collection('features').doc('multiVendor').valueChanges().pipe(first()).toPromise();
            if (route === 'service') {
                return multiVendorDoc;
            } else {
                this.events.publish('vendor:publishActiveStatus', multiVendorDoc);
            }
        } catch (error) {
            console.dir(error);
            error['location'] = 'vendor-service:getActiveStatus';
            this.logglyService.log(error);
        }
    }

    async getAllVendors() {
        try {
            return new Promise<any[]>(async (resolve, reject) => {
                const vendors = [];
                const vendorsSub = this.afs.collection('users', ref => ref
                .where('role', '==', 'vendor')).get().subscribe(docs => {
                    docs.forEach(doc => {
                        vendors.push({id: doc.id, ...doc.data()});
                    });
                    resolve(vendors.length ? vendors : []);
                    vendorsSub.unsubscribe()
                });
            });
        } catch (error) {
            console.dir(error);
            error['location'] = 'vendor-service:getAllVendors';
            this.logglyService.log(error);
        }
    }

    async deleteVendor(id) {
        try {
            let multiVendor = this.afs.collection('features').doc('multiVendor');
            let currentData: any = await this.multiVendorRef.doc(id).valueChanges().pipe(first()).toPromise();
            if (currentData && currentData.regionId) {
                console.log('region inside');
                this.multiRegionRef.doc(currentData['regionId']).update({ vendorId: firebase.firestore.FieldValue.delete() });
                console.log('region deleted');
            }
            console.log('deletion start');
            if (currentData) {
                await this.multiVendorRef.doc(id).delete();
                // decresing count of vendor
                let multiVendorDoc: any = await multiVendor.valueChanges().pipe(first()).toPromise();
                let vendorCount = multiVendorDoc.count;
                await multiVendor.update({ count: vendorCount - 1 });
            }
            console.log('deletion end');
            let userData: any = await this.afs.collection('users').doc(id).valueChanges().pipe(first()).toPromise();
            if (userData) {
                await this.afs.doc(`users/${id}`).update({ role: 'user' });
            }
            console.log('role updated');
            this.events.publish('vendor:vendorDeleted');
            console.log('success deleted');
        } catch (error) {
            console.log(error);
            error['location'] = 'vendor-service:deleteVendor';
            this.logglyService.log(error);
        }
    }

    async getMultiRegion() {
        try {
            let data = await this.afs.collection('features').doc('multiRegion').valueChanges().pipe(first()).toPromise();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async changeRegion(regionData, vendorData) {
        console.log(vendorData)
        try {
            let currentData: any = await this.multiVendorRef.doc(vendorData).valueChanges().pipe(first()).toPromise();
            if (currentData.regionId) {
                this.multiRegionRef.doc(currentData['regionId']).update({ vendorId: firebase.firestore.FieldValue.delete() });
            }
            await this.multiVendorRef.doc(vendorData).update({ regionId: regionData });
            await this.multiRegionRef.doc(regionData).update({ vendorId: vendorData });
            this.events.publish('vendor:changeRegionSuccess');
        } catch (error) {
            error['location'] = 'vendor-service:changeRegion';
            this.logglyService.log(error);
        }
    }

    async removeRegion(vendorData) {
        try {
            let currentData: any = await this.multiVendorRef.doc(vendorData).valueChanges().pipe(first()).toPromise();
            if (currentData.regionId) {
                this.multiRegionRef.doc(currentData['regionId']).update({ vendorId: firebase.firestore.FieldValue.delete() });
            }
            await this.multiVendorRef.doc(vendorData).update({ regionId: firebase.firestore.FieldValue.delete() });
            this.events.publish('vendor:removeRegionSuccess');
        } catch (error) {
            error['location'] = 'vendor-service:removeRegion';
            this.logglyService.log(error);
        }
    }

    async getAllActiveVendors() {
        try {
            const multiVendors = await this.afs.collection('features').doc('multiVendor').collection('vendors', ref => ref
                .where('active', '==', true)).snapshotChanges().pipe(
                    map(actions => actions.map(a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    }))
                ).pipe(first()).toPromise();
            console.log('multiVendors', multiVendors);
            this.events.publish('vendor:publishAllActiveVendors', multiVendors);
        } catch (error) {
            console.dir(error);
            error['location'] = 'vendor-service:getAllVendors';
            this.logglyService.log(error);
        }
    }

    async getProductsForVendor(id) {
        console.log(id)
        let products = await this.afs.collection('products', ref => ref
            .orderBy('sortedAt', 'desc').where('vendorId', '==', id)
        ).snapshotChanges().subscribe((response: any) => {
            if (!response.length) {
                this.events.publish('vendor:noProductsAvailableVendor');
                return false;
            }
            let vendorProducts = [];
            for (const product of response) {
                let dataArray = { ...product.payload.doc.data(), ...{ id: product.payload.doc.id } };
                vendorProducts.push(dataArray);
            };
            this.events.publish('vendor:publishProductsForVendor', vendorProducts);
        })
    }

    async copyProductsVendor(id, copyToVendor, productList) {
        console.log(id, copyToVendor, productList)
        const copyProducts = firebase.functions().httpsCallable('vendor-copyVendorProducts');
        copyProducts({ vendorFrom: id, vendorTo: copyToVendor, products: productList }).then((res) => {
            console.log(res.data.status);
            if (res.data.status == true) {
                this.events.publish('vendor:copiedProductsToVendor');
            }
            else {
                this.events.publish('vendor:copyProductsToVendorFailed');
            }
        });
    }
    // Vendor orders on admin login
    async getVendorOrders(vendorId,startDate,endDate) {
        return new Promise(async (resolve, reject) => {
            try {
                this.ordersDataForVendor = [];
                const ordersData: any = await this.multiVendorRef.doc(vendorId).collection('orders', ref => ref.limit(this.configService.environment.scrollLimit).orderBy('order.createdAt', 'desc')
                .startAt(startDate).endAt(endDate));
                const ordersSub = ordersData.snapshotChanges()
                    .subscribe((response: any) => {
                        if (!response.length) {
                            console.log('No Data Available');
                            this.events.publish('vendor:NoOrders');
                            resolve([]);
                            return;
                        }
                        this.ordersDataForVendor = [];
                        this.lastResponseForVendorOrders = response[response.length - 1].payload.doc;
                        for (const order of response) {
                            this.ordersDataForVendor = this.ordersDataForVendor.filter((el)=> el.order.id != order.payload.doc.data().order.id);
                            this.ordersDataForVendor.push(order.payload.doc.data());
                            //this.ordersDataForVendor.push({id: order.payload.doc.id, data: order.payload.doc.data()});
                        }
                        ordersSub.unsubscribe();
                        console.log('orders in getUsersForAdminUsers', this.ordersDataForVendor);
                        resolve(this.ordersDataForVendor);
                    }, error => {
                        console.log(error);
                        resolve([]);
                    });
            } catch (error) {
                console.log(error);
                resolve([]);
            }
        })
    }


    async loadMoreVendorOrders(vendorId,startDate,endDate) {
        try {
            this.multiVendorRef.doc(vendorId).collection('orders', ref => ref.limit(this.configService.environment.scrollLimit).orderBy('order.createdAt', 'desc').startAt(startDate).endAt(endDate)
            .startAfter(this.lastResponseForVendorOrders)
            ).snapshotChanges()
                .subscribe((response: any) => {
                    if (!response.length) {
                        this.events.publish('vendor:OrdersLimitReached');
                        return false;
                    }
                    this.ordersDataForVendor = [];
                    this.lastResponseForVendorOrders = response[response.length - 1].payload.doc;
                    for (const order of response) {
                        this.ordersDataForVendor = this.ordersDataForVendor.filter((el)=> el.order.id != order.payload.doc.data().order.id);
                        this.ordersDataForVendor.push(order.payload.doc.data());
                    }
                    this.events.publish('vendor:getMoreVendorOrdersSuccess', this.ordersDataForVendor);
                }, error => {
                    console.log(error);
                });
        } catch (err) {
            console.dir(err);
        }
    }

    // Orders for vendor login   
     async getOrders() {
        return new Promise<any[]>(async (resolve, reject) => {
            try {
                const id = await this.storage.get('uid');
                this.vendorOrderSub = this.multiVendorRef.doc(id).collection('orders', ref => ref
                    .orderBy('order.createdAt', 'desc')
                    .limit(this.ordersLimit))
                    .snapshotChanges()
                    .subscribe(async response => {
                        if(!response.length) {
                            this.vendorOrders.next([]);
                            resolve([]);
                        } else {
                            this.lastResponse = response[response.length - 1].payload.doc;
                            let orders = [];
                            const vendorOrders = [];
                            for (const res of response) {
                                vendorOrders.push({ id: res.payload.doc.id, ...res.payload.doc.data() });
                            }
                            for (const vendorOrder of vendorOrders) {
                                const order: any = await this.afs.collection('orders').doc(vendorOrder.order.id).valueChanges().pipe(first()).toPromise();
                                let products = [];
                                let totalAmount = 0;
                                for (const vendorProduct of vendorOrder.products) {
                                    if (products.length === vendorOrder.products.length) {
                                        break;
                                    }
                                    order.products.map((product, index) => {
                                        if (product.productId === vendorProduct.id) {
                                            product['vendorStatus'] = 'vendorStatus' in product ? product.vendorStatus : { unavailableQty: 0, status: 'notSet' };
                                            if ('pack' in product) {
                                                if (product.pack.weight === vendorProduct.pack.weight) {
                                                    products.push({ index, ...product });
                                                    if (product.pack.variantType === 'pieces') {
                                                        totalAmount += product.price;
                                                    } else {
                                                        totalAmount += product.price * product.quantity;
                                                    }
                                                }
                                            } else {
                                                products.push({ index, ...product });
                                                totalAmount += product.price * product.quantity;
                                            }
                                        }
                                    });
                                }
                                let originalProducts = [...order.products];
                                order.products = [...products];
                                order.totalAmountToPaid = totalAmount;
                                orders.push({ id: vendorOrder.order.id, ...order, originalProducts });
                            }
                            this.orders = [...orders];
                            this.vendorOrders.next([...orders]);
                            resolve(orders);
                        }
                    });

            } catch (error) {
                console.dir(error);
                error['location'] = 'vendor-service:getOrders';
                this.logglyService.log(error);
                this.vendorOrders.next([]);
                resolve([]);
            }
        });
    }

    async loadMoreOrders() {
        return new Promise<any[]>(async (resolve, reject) => {
            try {
                const id = await this.storage.get('uid');
                this.vendorOrderSub = this.multiVendorRef.doc(id).collection('orders', ref => ref
                    .orderBy('order.createdAt', 'desc')
                    .limit(this.ordersLimit)
                    .startAfter(this.lastResponse))
                    .snapshotChanges()
                    .subscribe(async response => {
                        if (!response.length) {
                            resolve([]);
                        } else {
                            this.lastResponse = response[response.length - 1].payload.doc;
                            let orders = [];
                            const vendorOrders = [];
                            for (const res of response) {
                                vendorOrders.push({ id: res.payload.doc.id, ...res.payload.doc.data() });
                            }
                            for (const vendorOrder of vendorOrders) {
                                const order: any = await this.afs.collection('orders').doc(vendorOrder.order.id).valueChanges().pipe(first()).toPromise();
                                let products = [];
                                let totalAmount = 0;
                                for (const vendorProduct of vendorOrder.products) {
                                    if (products.length === vendorOrder.products.length) {
                                        break;
                                    }
                                    order.products.map((product, index) => {
                                        if (product.productId === vendorProduct.id) {
                                            product['vendorStatus'] = 'vendorStatus' in product ? product.vendorStatus : { unavailableQty: 0, status: 'notSet' };
                                            if ('pack' in product) {
                                                if (product.pack.weight === vendorProduct.pack.weight) {
                                                    products.push({ index, ...product });
                                                    if (product.pack.variantType === 'pieces') {
                                                        totalAmount += product.price;
                                                    } else {
                                                        totalAmount += product.price * product.quantity;
                                                    }
                                                }
                                            } else {
                                                products.push({ index, ...product });
                                                totalAmount += product.price * product.quantity;
                                            }
                                        }
                                    });
                                }
                                let originalProducts = [...order.products];
                                order.products = [...products];
                                order.totalAmountToPaid = totalAmount;
                                orders.push({ id: vendorOrder.order.id, ...order, originalProducts });
                            }
                            this.orders = this.orders.concat(orders);
                            this.vendorOrders.next([...this.orders]);
                            resolve(orders);
                        }
                    });

            } catch (error) {
                console.dir(error);
                error['location'] = 'vendor-service:getOrders';
                this.logglyService.log(error);
                this.vendorOrders.next([]);
                resolve([]);
            }
        });
    }

    getVendorOrdersListener() {
        return this.vendorOrders.asObservable();
    }

    async setVendorStatus(products: any[], vendors: any[], orderId: string) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.afs.collection('orders').doc(orderId).update({ products, vendors });
                resolve(true);
            } catch (error) {
                console.dir(error);
                error['location'] = 'vendor-service:setVendorStatus';
                this.logglyService.log(error);
                resolve(false);
            }
        });
    }

    unsubscribeVendorOrderSub() {
        this.vendorOrderSub.unsubscribe();
    }

    async setVendorForProduct(productId,vendorId) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.afs.collection('products').doc(productId).update({ vendorId: vendorId, approved: true });
                resolve(true);
            } catch (error) {
                console.dir(error);
                error['location'] = 'vendor-service:setVendorForProduct';
                this.logglyService.log(error);
                resolve(false);
            }
        });
    }

    async setCommissionForProduct(productId, value) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.afs.collection('products').doc(productId).update({ commission: value });
                resolve(true);
            } catch (error) {
                console.dir(error);
                error['location'] = 'vendor-service:setCommissionForProduct';
                this.logglyService.log(error);
                resolve(false);
            }
        });
    }

    async getVendorSections(vendorId) {
        return new Promise(async (resolve, reject) => {
            try {
                let vendorData = await this.multiVendorRef.doc(vendorId).valueChanges().pipe(first()).toPromise();
                resolve(vendorData);
            } catch (error) {
                console.dir(error);
                error['location'] = 'vendor-service:getVendorSections';
                this.logglyService.log(error);
                resolve(false);
            }
        });
    }

    async updateSectionsVendor(vendorId, sectionData) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.multiVendorRef.doc(vendorId).update({sections: sectionData})
                resolve(true)
            } catch (error) {
                console.dir(error);
                error['location'] = 'vendor-service:getVendorSections';
                this.logglyService.log(error);
                resolve(false);
            }
        });
    }

    async getOrdersForProductsNeedToDeliver(vendorId) {
        return new Promise<any[]>(async (resolve, reject) => {
            try {
                const id = vendorId;
                const vendorOrderSub = this.multiVendorRef.doc(id).collection('orders', ref => ref
                    .orderBy('order.createdAt', 'desc')
                    .where('order.status', 'in', ['Pending', 'Confirmed']))
                    .snapshotChanges()
                    .subscribe(async response => {
                        if(!response.length) {
                            resolve([]);
                        } else {
                            let orders = [];
                            const vendorOrders = [];
                            for (const res of response) {
                                vendorOrders.push({ id: res.payload.doc.id, ...res.payload.doc.data() });
                            }
                            for (const vendorOrder of vendorOrders) {
                                const order: any = await this.afs.collection('orders').doc(vendorOrder.order.id).valueChanges().pipe(first()).toPromise();
                                let products = [];
                                let totalAmount = 0;
                                for (const vendorProduct of vendorOrder.products) {
                                    if (products.length === vendorOrder.products.length) {
                                        break;
                                    }
                                    order.products.map((product, index) => {
                                        if (product.productId === vendorProduct.id) {
                                            product['vendorStatus'] = 'vendorStatus' in product ? product.vendorStatus : { unavailableQty: 0, status: 'notSet' };
                                            if ('pack' in product) {
                                                if (product.pack.weight === vendorProduct.pack.weight) {
                                                    products.push({ index, ...product });
                                                    if (product.pack.variantType === 'pieces') {
                                                        totalAmount += product.price;
                                                    } else {
                                                        totalAmount += product.price * product.quantity;
                                                    }
                                                }
                                            } else {
                                                products.push({ index, ...product });
                                                totalAmount += product.price * product.quantity;
                                            }
                                        }
                                    });
                                }
                                let originalProducts = [...order.products];
                                order.products = [...products];
                                order.totalAmountToPaid = totalAmount;
                                orders.push({ id: vendorOrder.order.id, ...order, originalProducts });
                            }
                            // this.orders = [...orders];
                            // console.log('this.orders', this.orders);
                            // this.vendorOrders.next([...orders]);
                            resolve(orders);
                        }
                    });

            } catch (error) {
                console.dir(error);
                error['location'] = 'vendor-service:getOrders';
                this.logglyService.log(error);
                // this.vendorOrders.next([]);
                resolve([]);
            }
        });
    }

    async getVendorDataWithId(id?: string) {
        return new Promise<any>(async (resolve) => {
            try {
                if (!id) {
                    id = await this.storage.get('uid');
                }
                const vendor = await this.multiVendorRef.doc(id).valueChanges().pipe(first()).toPromise();
                resolve(vendor);
            } catch (error) {
                console.log(error);
                error['location'] = 'vendor-service:getVendorData';
                this.logglyService.log(error);
            }
        })
    }


    async getVendorMembership() {
        try {
            const response = await this.vendorMembershipRef.doc('settings').valueChanges().pipe(first()).toPromise();
            console.log("Data", response);
            return response || false;
        }
        catch (error) {
            console.log("Error getting document:", error);
            return false;
        }
    }

    async saveVendorMembership(data: VendorMembership) {
        try {
            console.log("VendorMembership", data);
            const docRef = this.vendorMembershipRef.doc('settings');
            docRef.get().toPromise().then(async (doc) => {
                if (doc.exists) {
                    await docRef.update(data);
                } else {
                    await docRef.set(data);
                }
            })
            return true;
        }
        catch (error) {
            console.log("Error saveVendorMembership document:", error);
            return false;
        }
    }

    async updateVendorMembership(vendorId,data: any) {

    }
}