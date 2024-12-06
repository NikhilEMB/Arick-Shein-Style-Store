(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~admin-admin-orders-admin-orders-module~admin-import-export-manager-orders-export-orders-expo~a38f7326"],{

/***/ "./src/app/services/pickUp/pick-up.service.ts":
/*!****************************************************!*\
  !*** ./src/app/services/pickUp/pick-up.service.ts ***!
  \****************************************************/
/*! exports provided: PickUpService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PickUpService", function() { return PickUpService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");





let PickUpService = class PickUpService {
    constructor(afs, storage) {
        this.afs = afs;
        this.storage = storage;
    }
    getUserDetails(id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    resolve(yield this.afs.collection('users').doc(id).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise());
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getWalletSettings() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    resolve(yield this.afs.collection('settings').doc('wallet').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise());
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    setPickUpSettings(settings) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let settingsObj = {
                        active: settings.active,
                        gst: settings.gst,
                        deliveryByWeight: {
                            baseCost: settings.baseCost,
                            baseWeight: settings.baseWeight,
                            cost: settings.cost
                        },
                        deliveryByKm: {
                            cost: settings.cost
                        },
                        weightSlab: {
                            active: settings.weightActive,
                            slabs: settings.slabs
                        }
                    };
                    console.log('settingsObj:', settingsObj);
                    // console.log('kmSlabsObj:',kmSlabsObj);
                    console.log('settings:', settings);
                    yield this.afs.collection('features').doc('pickDrop').set(settingsObj);
                    // await this.afs.collection('features').doc('pickDrop').update(kmSlabsObj);
                    resolve(true);
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getPickUpSettings() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    resolve(yield this.afs.collection('features').doc('pickDrop').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise());
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getPendingOrders() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    resolve(yield this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref
                        .orderBy('createdAt', 'desc')
                        .where('status', '==', 'pending')).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise());
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getPickedOrders() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    resolve(yield this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref
                        .orderBy('createdAt', 'desc')
                        .where('status', 'in', ['picked'])).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise());
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getDeliveredOrders() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    resolve(yield this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref
                        .orderBy('createdAt', 'desc')
                        .where('status', 'in', ['delivered'])).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise());
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getCancelledOrders() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    resolve(yield this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref
                        .orderBy('createdAt', 'desc')
                        .where('status', 'in', ['cancelled'])).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise());
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getOrderData(id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    resolve(yield this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref.where('orderId', '==', id)).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise());
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    cancelOrderByAdmin(orderId, cancelReason, name) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    const orderRef = this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref.where('orderId', '==', orderId));
                    const orderData = yield orderRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(actions => actions.map(a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return Object.assign({ id }, data);
                    }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise();
                    let role = yield this.storage.get('userRole');
                    role = role === 'admin' ? 'Store' : role;
                    const updateObj = {
                        cancelData: {
                            reason: cancelReason,
                            by: `${name} (${role})`
                        },
                        status: 'cancelled'
                    };
                    yield this.afs.collection('features').doc('pickDrop').collection('orders').doc(orderData[0].id).update(updateObj);
                    resolve(true);
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    changeOrderStatus(id, status) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let order = yield this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref.where('orderId', '==', id)).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(actions => actions.map(a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return Object.assign({ id }, data);
                    }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise();
                    yield this.afs.collection('features').doc('pickDrop').collection('orders').doc(order[0].id).update({ status: status });
                    resolve(true);
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getAllDeliveryAgents() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    const allDeliveryAgents = yield this.afs.collection('users', ref => ref.where('role', '==', 'deliveryAgent')).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(actions => actions.map(a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return Object.assign({ id }, data);
                    }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise();
                    resolve(allDeliveryAgents);
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    assignDeliveryAgent(agentId, orderId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let order = yield this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref.where('orderId', '==', orderId)).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(actions => actions.map(a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return Object.assign({ id }, data);
                    }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise();
                    yield this.afs.collection('features').doc('pickDrop').collection('orders').doc(order[0].id).update({ "delivery.agentId": agentId });
                    resolve(true);
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getDeliveryAgentName(id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let currentData = yield this.afs.collection('users').doc(id).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise();
                    resolve(currentData);
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getOrderLogs(id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let order = yield this.afs.collection('features').doc('pickDrop').collection('orders', ref => ref.where('orderId', '==', id)).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(actions => actions.map(a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return Object.assign({ id }, data);
                    }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise();
                    let logData = yield this.afs.collection('features').doc('pickDrop').collection('orders').doc(order[0].id).collection('logs', ref => ref.orderBy('time', 'asc')).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise();
                    resolve(logData);
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
};
PickUpService.ctorParameters = () => [
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"] }
];
PickUpService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"], _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"]])
], PickUpService);



/***/ })

}]);
//# sourceMappingURL=default~admin-admin-orders-admin-orders-module~admin-import-export-manager-orders-export-orders-expo~a38f7326-es2015.js.map