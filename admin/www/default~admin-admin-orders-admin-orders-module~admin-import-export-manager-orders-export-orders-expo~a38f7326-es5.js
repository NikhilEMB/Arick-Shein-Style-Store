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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");





var PickUpService = /** @class */ (function () {
    function PickUpService(afs, storage) {
        this.afs = afs;
        this.storage = storage;
    }
    PickUpService.prototype.getUserDetails = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var _a, error_1;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    _a = resolve;
                                    return [4 /*yield*/, this.afs.collection('users').doc(id).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _b.sent();
                                    console.log(error_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PickUpService.prototype.getWalletSettings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var _a, error_2;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    _a = resolve;
                                    return [4 /*yield*/, this.afs.collection('settings').doc('wallet').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_2 = _b.sent();
                                    console.log(error_2);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PickUpService.prototype.setPickUpSettings = function (settings) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var settingsObj, error_3;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    settingsObj = {
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
                                    return [4 /*yield*/, this.afs.collection('features').doc('pickDrop').set(settingsObj)];
                                case 1:
                                    _a.sent();
                                    // await this.afs.collection('features').doc('pickDrop').update(kmSlabsObj);
                                    resolve(true);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_3 = _a.sent();
                                    console.log(error_3);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PickUpService.prototype.getPickUpSettings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var _a, error_4;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    _a = resolve;
                                    return [4 /*yield*/, this.afs.collection('features').doc('pickDrop').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_4 = _b.sent();
                                    console.log(error_4);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PickUpService.prototype.getPendingOrders = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var _a, error_5;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    _a = resolve;
                                    return [4 /*yield*/, this.afs.collection('features').doc('pickDrop').collection('orders', function (ref) { return ref
                                            .orderBy('createdAt', 'desc')
                                            .where('status', '==', 'pending'); }).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_5 = _b.sent();
                                    console.log(error_5);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PickUpService.prototype.getPickedOrders = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var _a, error_6;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    _a = resolve;
                                    return [4 /*yield*/, this.afs.collection('features').doc('pickDrop').collection('orders', function (ref) { return ref
                                            .orderBy('createdAt', 'desc')
                                            .where('status', 'in', ['picked']); }).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_6 = _b.sent();
                                    console.log(error_6);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PickUpService.prototype.getDeliveredOrders = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var _a, error_7;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    _a = resolve;
                                    return [4 /*yield*/, this.afs.collection('features').doc('pickDrop').collection('orders', function (ref) { return ref
                                            .orderBy('createdAt', 'desc')
                                            .where('status', 'in', ['delivered']); }).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_7 = _b.sent();
                                    console.log(error_7);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PickUpService.prototype.getCancelledOrders = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var _a, error_8;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    _a = resolve;
                                    return [4 /*yield*/, this.afs.collection('features').doc('pickDrop').collection('orders', function (ref) { return ref
                                            .orderBy('createdAt', 'desc')
                                            .where('status', 'in', ['cancelled']); }).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_8 = _b.sent();
                                    console.log(error_8);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PickUpService.prototype.getOrderData = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var _a, error_9;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    _a = resolve;
                                    return [4 /*yield*/, this.afs.collection('features').doc('pickDrop').collection('orders', function (ref) { return ref.where('orderId', '==', id); }).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_9 = _b.sent();
                                    console.log(error_9);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PickUpService.prototype.cancelOrderByAdmin = function (orderId, cancelReason, name) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var orderRef, orderData, role, updateObj, error_10;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 4, , 5]);
                                    orderRef = this.afs.collection('features').doc('pickDrop').collection('orders', function (ref) { return ref.where('orderId', '==', orderId); });
                                    return [4 /*yield*/, orderRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (actions) { return actions.map(function (a) {
                                            var data = a.payload.doc.data();
                                            var id = a.payload.doc.id;
                                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                                        }); })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                                case 1:
                                    orderData = _a.sent();
                                    return [4 /*yield*/, this.storage.get('userRole')];
                                case 2:
                                    role = _a.sent();
                                    role = role === 'admin' ? 'Store' : role;
                                    updateObj = {
                                        cancelData: {
                                            reason: cancelReason,
                                            by: name + " (" + role + ")"
                                        },
                                        status: 'cancelled'
                                    };
                                    return [4 /*yield*/, this.afs.collection('features').doc('pickDrop').collection('orders').doc(orderData[0].id).update(updateObj)];
                                case 3:
                                    _a.sent();
                                    resolve(true);
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_10 = _a.sent();
                                    console.log(error_10);
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PickUpService.prototype.changeOrderStatus = function (id, status) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var order, error_11;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    return [4 /*yield*/, this.afs.collection('features').doc('pickDrop').collection('orders', function (ref) { return ref.where('orderId', '==', id); }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (actions) { return actions.map(function (a) {
                                            var data = a.payload.doc.data();
                                            var id = a.payload.doc.id;
                                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                                        }); })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                                case 1:
                                    order = _a.sent();
                                    return [4 /*yield*/, this.afs.collection('features').doc('pickDrop').collection('orders').doc(order[0].id).update({ status: status })];
                                case 2:
                                    _a.sent();
                                    resolve(true);
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_11 = _a.sent();
                                    console.log(error_11);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PickUpService.prototype.getAllDeliveryAgents = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var allDeliveryAgents, error_12;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.afs.collection('users', function (ref) { return ref.where('role', '==', 'deliveryAgent'); }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (actions) { return actions.map(function (a) {
                                            var data = a.payload.doc.data();
                                            var id = a.payload.doc.id;
                                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                                        }); })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                                case 1:
                                    allDeliveryAgents = _a.sent();
                                    resolve(allDeliveryAgents);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_12 = _a.sent();
                                    console.log(error_12);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PickUpService.prototype.assignDeliveryAgent = function (agentId, orderId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var order, error_13;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    return [4 /*yield*/, this.afs.collection('features').doc('pickDrop').collection('orders', function (ref) { return ref.where('orderId', '==', orderId); }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (actions) { return actions.map(function (a) {
                                            var data = a.payload.doc.data();
                                            var id = a.payload.doc.id;
                                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                                        }); })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                                case 1:
                                    order = _a.sent();
                                    return [4 /*yield*/, this.afs.collection('features').doc('pickDrop').collection('orders').doc(order[0].id).update({ "delivery.agentId": agentId })];
                                case 2:
                                    _a.sent();
                                    resolve(true);
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_13 = _a.sent();
                                    console.log(error_13);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PickUpService.prototype.getDeliveryAgentName = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var currentData, error_14;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.afs.collection('users').doc(id).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                                case 1:
                                    currentData = _a.sent();
                                    resolve(currentData);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_14 = _a.sent();
                                    console.log(error_14);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PickUpService.prototype.getOrderLogs = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var order, logData, error_15;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    return [4 /*yield*/, this.afs.collection('features').doc('pickDrop').collection('orders', function (ref) { return ref.where('orderId', '==', id); }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (actions) { return actions.map(function (a) {
                                            var data = a.payload.doc.data();
                                            var id = a.payload.doc.id;
                                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                                        }); })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                                case 1:
                                    order = _a.sent();
                                    return [4 /*yield*/, this.afs.collection('features').doc('pickDrop').collection('orders').doc(order[0].id).collection('logs', function (ref) { return ref.orderBy('time', 'asc'); }).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                                case 2:
                                    logData = _a.sent();
                                    resolve(logData);
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_15 = _a.sent();
                                    console.log(error_15);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PickUpService.ctorParameters = function () { return [
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"] }
    ]; };
    PickUpService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"], _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"]])
    ], PickUpService);
    return PickUpService;
}());



/***/ })

}]);
//# sourceMappingURL=default~admin-admin-orders-admin-orders-module~admin-import-export-manager-orders-export-orders-expo~a38f7326-es5.js.map