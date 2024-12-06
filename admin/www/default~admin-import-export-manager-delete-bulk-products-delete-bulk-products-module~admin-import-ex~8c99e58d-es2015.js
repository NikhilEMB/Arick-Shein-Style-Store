(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~admin-import-export-manager-delete-bulk-products-delete-bulk-products-module~admin-import-ex~8c99e58d"],{

/***/ "./src/app/services/import-export-manager/import-export-manager.service.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/services/import-export-manager/import-export-manager.service.ts ***!
  \*********************************************************************************/
/*! exports provided: ImportExportManagerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportExportManagerService", function() { return ImportExportManagerService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _angular_fire_storage___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/storage/ */ "./node_modules/@angular/fire/storage/es2015/index.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _loggly_logger_loggly_logger_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../loggly-logger/loggly-logger.service */ "./src/app/services/loggly-logger/loggly-logger.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var _services_db_utilis__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/db-utilis */ "./src/app/services/db-utilis.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _shared_shared_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../shared/shared.service */ "./src/app/services/shared/shared.service.ts");












let ImportExportManagerService = class ImportExportManagerService {
    constructor(afs, events, fbStorage, logglyService, storage, configService, sharedService) {
        this.afs = afs;
        this.events = events;
        this.fbStorage = fbStorage;
        this.logglyService = logglyService;
        this.storage = storage;
        this.configService = configService;
        this.sharedService = sharedService;
        this.skuArr = [];
    }
    getAllProducts() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                let allProducts = [];
                let userId = yield this.storage.get('uid');
                let userRole = yield this.storage.get('userRole');
                if (userRole == 'vendor') {
                    let productsRef = yield this.afs.collection('products', ref => ref.orderBy('sortedAt', 'desc').where('vendorId', '==', userId));
                    productsRef.get().subscribe((snapshot) => {
                        snapshot.forEach((product) => {
                            allProducts.push(Object.assign({ id: product.id }, product.data()));
                        });
                    });
                    return allProducts;
                }
                else {
                    let productsRef = yield this.afs.collection('products', ref => ref.orderBy('sortedAt', 'desc'));
                    productsRef.get().subscribe((snapshot) => {
                        snapshot.forEach((product) => {
                            allProducts.push(Object.assign({ id: product.id }, product.data()));
                        });
                    });
                    return allProducts;
                }
            }
            catch (error) {
                console.log('Error in fetching products : ', error);
            }
        });
    }
    fetchAllSKU() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // const productRef = this.afs.collection('products');
            // let allProductsRef: Subscription = productRef.get().subscribe((querySnapshot: any) => {
            //   querySnapshot.forEach((doc) => {
            //     if ((doc.data().productCode) && (doc.data().productCode !== '')) {
            //       this.skuArr.push({
            //         productCode: doc.data().productCode,
            //         pid: doc.id,
            //       })
            //     }
            //   })
            //   allProductsRef.unsubscribe();
            // })
            const productsData = yield this.afs.collection('products');
            let allProductsref = productsData.get().subscribe((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.skuArr.push({
                        productCode: doc.data().productCode,
                        pid: doc.id
                    });
                });
                allProductsref.unsubscribe();
            });
            const ids = this.skuArr.map(o => o.productCode);
            const filtered = this.skuArr.filter(({ productCode }, index) => !ids.includes(productCode, index + 1));
            return filtered;
        });
    }
    deleteBulkProducts(skus) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let count = 0;
            if (skus && skus.length) {
                for (const pid of skus) {
                    yield this.afs.collection('products').doc(pid).delete();
                    count++;
                }
            }
            return count;
        });
    }
    getAllCategories() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                let allCategories = [];
                let categoryData = yield this.afs.collection('categories').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                categoryData.map((category) => {
                    allCategories.push(category);
                });
                return allCategories;
            }
            catch (error) {
                console.log('Error in fetching categories : ', error);
            }
        });
    }
    getAllSubCategories() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let sublist = [];
            const categories = yield this.afs.collection('categories', ref => ref
                .orderBy('sortedAt', 'desc')
                .where('status', '==', true)).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(snaps => Object(_services_db_utilis__WEBPACK_IMPORTED_MODULE_9__["convertSnaps"])(snaps))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
            for (const c of categories) {
                if (c.isSubcategories) {
                    const subcategories = yield this.getSubcategoriesSidemenu(c.id);
                    if (subcategories.length) {
                        for (const sc of subcategories) {
                            sublist.push({ id: sc.id, categoryId: c.id, name: sc.name, active: false });
                        }
                    }
                }
            }
            return sublist;
        });
    }
    getSubcategoriesSidemenu(cid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                const subcategories = yield this.afs.collection('categories').doc(cid).collection('subcategories', ref => ref.orderBy('sortedAt', 'desc').where('status', '==', true)).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(snaps => Object(_services_db_utilis__WEBPACK_IMPORTED_MODULE_9__["convertSnaps"])(snaps))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                resolve(subcategories);
            }));
        });
    }
    getAllBrands() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                let allBrands = [];
                let brandsData = yield this.afs.collection('brands').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                brandsData.map((brand) => {
                    allBrands.push(brand);
                });
                return allBrands;
            }
            catch (error) {
                console.log('Error in fetching brands : ', error);
            }
        });
    }
    getAllVendors() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                let allVendors = [];
                const vendorRef = yield this.afs.collection('users', ref => ref.where('role', '==', 'vendor'));
                vendorRef.get().subscribe((snap) => {
                    snap.forEach((v) => {
                        allVendors.push(Object.assign({ id: v.id }, v.data()));
                    });
                });
                return allVendors;
            }
            catch (error) {
                console.log('Error in fetching vendors : ', error);
            }
        });
    }
    getAllOrders() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // console.log('status : ', status)
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let loginId = yield this.storage.get('uid');
                    let userRole = yield this.storage.get('userRole');
                    if (userRole == 'vendor') {
                        this.allPendingOrdersForAdmin = this.afs.collection('orders', ref => ref
                            .orderBy('createdAt', 'desc')
                            .where('vendorId', '==', loginId)).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(actions => actions.map(a => {
                            const data = a.payload.doc.data();
                            const id = a.payload.doc.id;
                            return Object.assign({ id }, data);
                        }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                    }
                    else {
                        let allOrders = [];
                        let ordersData;
                        ordersData = yield this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc'));
                        let allOrdersRef = ordersData.get().subscribe((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                allOrders.push(Object.assign({ id: doc.id }, doc.data()));
                            });
                            resolve(allOrders);
                            allOrdersRef.unsubscribe();
                        });
                    }
                }
                catch (error) {
                    console.log(`Error in fetching all orders : `, error);
                    resolve([]);
                }
            }));
        });
    }
    getAllOrdersLength() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let totalOrders = 0;
                    const ordersData = this.afs.collection('orders');
                    let allOrdersRef = ordersData.get().subscribe((snap) => {
                        totalOrders = snap.size;
                        resolve(totalOrders);
                        allOrdersRef.unsubscribe();
                    });
                }
                catch (error) {
                    console.dir('Error in fetching total orders count : ', error);
                    resolve(0);
                }
            }));
        });
    }
    getAllConfirmedOrders(date) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let loginId = yield this.storage.get('uid');
                    let userRole = yield this.storage.get('userRole');
                    if (userRole == 'vendor') {
                        this.allPendingOrdersForAdmin = this.afs.collection('orders', ref => ref
                            .orderBy('createdAt', 'desc')
                            .where('status', 'in', ['Confirmed']).where('vendorId', '==', loginId)).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(actions => actions.map(a => {
                            const data = a.payload.doc.data();
                            const id = a.payload.doc.id;
                            return Object.assign({ id }, data);
                        }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                    }
                    else {
                        let allOrders = [];
                        let ordersData;
                        if (date && date.start) {
                            ordersData = yield this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Confirmed']).startAt(date.start).endAt(date.end));
                        }
                        else {
                            ordersData = yield this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Confirmed']));
                        }
                        let allOrdersRef = ordersData.get().subscribe((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                allOrders.push(Object.assign({ id: doc.id }, doc.data()));
                            });
                            resolve(allOrders);
                            allOrdersRef.unsubscribe();
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getAllOrdersPreset(status, startDate, endDate) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log('status : ', status);
            console.log('end : ', startDate);
            console.log('start : ', endDate);
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    console.log('here1');
                    let ordersRef;
                    let allOrders = [];
                    let loginId = yield this.storage.get('uid');
                    let userRole = yield this.storage.get('userRole');
                    console.log('here2');
                    if (userRole == 'vendor') {
                        console.log('here3');
                        if (status === 'Payment Pending') {
                            ordersRef = this.afs.collection('orders', ref => ref
                                .orderBy('createdAt', 'desc')
                                .where('payment.completed', '==', false).where('vendorId', '==', loginId).startAt(startDate)
                                .endAt(endDate));
                        }
                        else {
                            ordersRef = this.afs.collection('orders', ref => ref
                                .orderBy('createdAt', 'desc')
                                .where('status', '==', status).where('vendorId', '==', loginId).startAt(startDate)
                                .endAt(endDate));
                        }
                    }
                    else {
                        if (status === 'Payment Pending') {
                            console.log('here4');
                            ordersRef = this.afs.collection('orders', ref => ref
                                .orderBy('createdAt', 'desc')
                                .where('payment.completed', '==', false).startAt(startDate)
                                .endAt(endDate));
                        }
                        else {
                            console.log('here5');
                            ordersRef = this.afs.collection('orders', ref => ref
                                .orderBy('createdAt', 'desc')
                                .where('status', '==', status).startAt(startDate)
                                .endAt(endDate));
                        }
                    }
                    console.log('here6');
                    let allOrdersRef = ordersRef.get().subscribe((snap) => {
                        if (snap.size === 0) {
                            resolve([]);
                        }
                        else {
                            snap.forEach((order) => {
                                allOrders.push(Object.assign({ id: order.id }, order.data()));
                            });
                            resolve(allOrders);
                        }
                        allOrdersRef.unsubscribe();
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getAllPendingOrders(date) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let loginId = yield this.storage.get('uid');
                    let userRole = yield this.storage.get('userRole');
                    if (userRole == 'vendor') {
                        this.allPaymentFailedOrders = this.afs.collection('orders', ref => ref
                            .orderBy('createdAt', 'desc')
                            .where("status", '==', 'Pending').where('vendorId', '==', loginId)).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(actions => actions.map(a => {
                            const data = a.payload.doc.data();
                            const id = a.payload.doc.id;
                            return Object.assign({ id }, data);
                        }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                    }
                    else {
                        let allOrders = [];
                        let ordersData;
                        if (date && date.start) {
                            ordersData = yield this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", '==', 'Pending').startAt(date.start).endAt(date.end));
                        }
                        else {
                            ordersData = yield this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", '==', 'Pending'));
                        }
                        let allOrdersRef = ordersData.get().subscribe((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                allOrders.push(Object.assign({ id: doc.id }, doc.data()));
                            });
                            resolve(allOrders);
                            allOrdersRef.unsubscribe();
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getAllDispatchedOrders(date) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let loginId = yield this.storage.get('uid');
                    let userRole = yield this.storage.get('userRole');
                    if (userRole == 'vendor') {
                        this.allDispatchedOrdersForAdmin = this.afs.collection('orders', ref => ref
                            .orderBy('createdAt', 'desc')
                            .where('status', 'in', ['Dispatched']).where('vendorId', '==', loginId)).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(actions => actions.map(a => {
                            const data = a.payload.doc.data();
                            const id = a.payload.doc.id;
                            return Object.assign({ id }, data);
                        }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                    }
                    else {
                        let allOrders = [];
                        let ordersData;
                        if (date && date.start) {
                            ordersData = yield this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Dispatched']).startAt(date.start).endAt(date.end));
                        }
                        else {
                            ordersData = yield this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Dispatched']));
                        }
                        let allOrdersRef = ordersData.get().subscribe((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                allOrders.push(Object.assign({ id: doc.id }, doc.data()));
                            });
                            resolve(allOrders);
                            allOrdersRef.unsubscribe();
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getAllDeliveredOrders(date) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let loginId = yield this.storage.get('uid');
                    let userRole = yield this.storage.get('userRole');
                    if (userRole == 'vendor') {
                        this.allCompletedOrdersForAdmin = this.afs.collection('orders', ref => ref
                            .orderBy('createdAt', 'desc')
                            .where('status', 'in', ['Delivered']).where('vendorId', '==', loginId)).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(actions => actions.map(a => {
                            const data = a.payload.doc.data();
                            const id = a.payload.doc.id;
                            return Object.assign({ id }, data);
                        }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                    }
                    else {
                        let allOrders = [];
                        let ordersData;
                        if (date && date.start) {
                            ordersData = yield this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Delivered']).startAt(date.start).endAt(date.end));
                        }
                        else {
                            ordersData = yield this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Delivered']));
                        }
                        let allOrdersRef = ordersData.get().subscribe((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                allOrders.push(Object.assign({ id: doc.id }, doc.data()));
                            });
                            resolve(allOrders);
                            allOrdersRef.unsubscribe();
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getAllCancelledOrders(date) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let loginId = yield this.storage.get('uid');
                    let userRole = yield this.storage.get('userRole');
                    if (userRole == 'vendor') {
                        this.allCancelledOrders = this.afs.collection('orders', ref => ref
                            .orderBy('createdAt', 'desc').where("status", 'in', 'Cancelled').where('vendorId', '==', loginId)).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(actions => actions.map(a => {
                            const data = a.payload.doc.data();
                            const id = a.payload.doc.id;
                            return Object.assign({ id }, data);
                        }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                    }
                    else {
                        let allOrders = [];
                        let ordersData;
                        if (date && date.start) {
                            ordersData = yield this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", 'in', ['Cancelled']).startAt(date.start).endAt(date.end));
                        }
                        else {
                            ordersData = yield this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", 'in', ['Cancelled']));
                        }
                        let allOrdersRef = ordersData.get().subscribe((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                allOrders.push(Object.assign({ id: doc.id }, doc.data()));
                            });
                            resolve(allOrders);
                            allOrdersRef.unsubscribe();
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getAllRejectedOrders(date) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let loginId = yield this.storage.get('uid');
                    let userRole = yield this.storage.get('userRole');
                    if (userRole == 'vendor') {
                        this.allRejectedOrders = this.afs.collection('orders', ref => ref
                            .orderBy('createdAt', 'desc').where("status", 'in', ['Rejected']).where('vendorId', '==', loginId)).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(actions => actions.map(a => {
                            const data = a.payload.doc.data();
                            const id = a.payload.doc.id;
                            return Object.assign({ id }, data);
                        }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                    }
                    else {
                        let allOrders = [];
                        let ordersData;
                        if (date && date.start) {
                            ordersData = yield this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", 'in', ['Rejected']).startAt(date.start).endAt(date.end));
                        }
                        else {
                            ordersData = yield this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", 'in', ['Rejected']));
                        }
                        let allOrdersRef = ordersData.get().subscribe((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                allOrders.push(Object.assign({ id: doc.id }, doc.data()));
                            });
                            resolve(allOrders);
                            allOrdersRef.unsubscribe();
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getAllReturnedOrders(date) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let loginId = yield this.storage.get('uid');
                    let userRole = yield this.storage.get('userRole');
                    if (userRole == 'vendor') {
                        this.allReturnedOrders = this.afs.collection('orders', ref => ref
                            .orderBy('createdAt', 'desc')
                            .where("status", '==', 'Returned').where('vendorId', '==', loginId)).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(actions => actions.map(a => {
                            const data = a.payload.doc.data();
                            const id = a.payload.doc.id;
                            return Object.assign({ id }, data);
                        }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                    }
                    else {
                        let allOrders = [];
                        let ordersData;
                        if (date && date.start) {
                            ordersData = yield this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", '==', 'Returned').startAt(date.start).endAt(date.end));
                        }
                        else {
                            ordersData = yield this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", '==', 'Returned'));
                        }
                        let allOrdersRef = ordersData.get().subscribe((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                allOrders.push(Object.assign({ id: doc.id }, doc.data()));
                            });
                            resolve(allOrders);
                            allOrdersRef.unsubscribe();
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getAllPaymentPendingOrders(date) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let loginId = yield this.storage.get('uid');
                    let userRole = yield this.storage.get('userRole');
                    if (userRole == 'vendor') {
                        this.allReturnedOrders = this.afs.collection('orders', ref => ref
                            .orderBy('createdAt', 'desc')
                            .where("status", '==', 'Returned').where('vendorId', '==', loginId)).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(actions => actions.map(a => {
                            const data = a.payload.doc.data();
                            const id = a.payload.doc.id;
                            return Object.assign({ id }, data);
                        }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                    }
                    else {
                        let allOrders = [];
                        let ordersData;
                        if (date && date.start) {
                            ordersData = yield this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("payment.completed", '==', false).startAt(date.start).endAt(date.end));
                        }
                        else {
                            ordersData = yield this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("payment.completed", '==', false));
                        }
                        let allOrdersRef = ordersData.get().subscribe((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                allOrders.push(Object.assign({ id: doc.id }, doc.data()));
                            });
                            resolve(allOrders);
                            allOrdersRef.unsubscribe();
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getAllDeliveryAgents() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let deliveryAgents = [];
                    const usersRef = yield this.afs.collection('users', ref => ref.where('role', '==', 'deliveryAgent'));
                    usersRef.get().subscribe((snap) => {
                        snap.forEach((v) => {
                            deliveryAgents.push(Object.assign({ id: v.id }, v.data()));
                        });
                    });
                    resolve(deliveryAgents);
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    updateOrder(orderId, agentId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    const orderRef = this.afs.collection('orders', ref => ref.where('orderId', '==', orderId));
                    const orderData = yield orderRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(actions => actions.map(a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return Object.assign({ id }, data);
                    }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                    let updateOrder = yield this.afs.collection('orders').doc(orderData[0].id).update({ deliveryAgentId: agentId, deliveryStatus: 'notStarted' });
                    console.log('updated order', updateOrder);
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getUserByRole(role, custom) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let allUsers = [];
                    let userRef;
                    if (role === 'all') {
                        userRef = yield this.afs.collection('users');
                    }
                    else {
                        userRef = yield this.afs.collection('users', ref => ref.where('role', '==', role));
                    }
                    let allUsersRef = userRef.get().subscribe((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (custom === 'custom-justNumbers') {
                                allUsers.push(doc.data().phoneNo);
                            }
                            else {
                                allUsers.push(Object.assign({ id: doc.id }, doc.data()));
                            }
                        });
                        resolve(allUsers);
                        allUsersRef.unsubscribe();
                    });
                }
                catch (error) {
                    console.log(error);
                    resolve([]);
                }
            }));
        });
    }
    getAllUsersCount() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let totalUsers = 0;
                    const UsersData = this.afs.collection('users');
                    let allUsersRef = UsersData.get().subscribe((snap) => {
                        totalUsers = snap.size;
                        resolve(totalUsers);
                        allUsersRef.unsubscribe();
                    });
                }
                catch (err) {
                    console.dir(err);
                    resolve(0);
                }
            }));
        });
    }
    addUserByAdmin(userDetails) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                let addUserDetails = firebase__WEBPACK_IMPORTED_MODULE_6__["functions"]().httpsCallable('users-addUserByAdmin');
                addUserDetails(userDetails).then((res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                    if (res.data.status && res.data.status === 'success') {
                        console.log(`Successfully Added User - ${userDetails.name} : `, res.data);
                        resolve({ status: res.data.status, data: userDetails });
                    }
                    else {
                        console.log(`Failed To Add User - ${userDetails.name} : `, res.data);
                        resolve({ status: res.data.status, data: userDetails });
                    }
                }));
            }));
        });
    }
    getAllFilters() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let allFilters = [];
                    let filtersRef;
                    filtersRef = this.afs.collection('features').doc('filters').collection('list');
                    let allFiltersRef = filtersRef.get().subscribe((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc.data().active) {
                                allFilters.push({ name: doc.data().name, value: doc.data().values || [] });
                            }
                        });
                        resolve(allFilters);
                        allFiltersRef.unsubscribe();
                    });
                }
                catch (error) {
                    console.dir(error);
                    resolve(0);
                }
            }));
        });
    }
};
ImportExportManagerService.ctorParameters = () => [
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
    { type: _angular_fire_storage___WEBPACK_IMPORTED_MODULE_5__["AngularFireStorage"] },
    { type: _loggly_logger_loggly_logger_service__WEBPACK_IMPORTED_MODULE_7__["LogglyLoggerService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_8__["Storage"] },
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_10__["ConfigService"] },
    { type: _shared_shared_service__WEBPACK_IMPORTED_MODULE_11__["SharedService"] }
];
ImportExportManagerService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
        _angular_fire_storage___WEBPACK_IMPORTED_MODULE_5__["AngularFireStorage"],
        _loggly_logger_loggly_logger_service__WEBPACK_IMPORTED_MODULE_7__["LogglyLoggerService"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_8__["Storage"],
        src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_10__["ConfigService"],
        _shared_shared_service__WEBPACK_IMPORTED_MODULE_11__["SharedService"]])
], ImportExportManagerService);



/***/ })

}]);
//# sourceMappingURL=default~admin-import-export-manager-delete-bulk-products-delete-bulk-products-module~admin-import-ex~8c99e58d-es2015.js.map