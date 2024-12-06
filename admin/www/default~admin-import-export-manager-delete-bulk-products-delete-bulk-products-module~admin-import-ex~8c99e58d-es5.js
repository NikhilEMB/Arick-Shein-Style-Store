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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_fire_storage___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/storage/ */ "./node_modules/@angular/fire/storage/index.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _loggly_logger_loggly_logger_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../loggly-logger/loggly-logger.service */ "./src/app/services/loggly-logger/loggly-logger.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_db_utilis__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/db-utilis */ "./src/app/services/db-utilis.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _shared_shared_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../shared/shared.service */ "./src/app/services/shared/shared.service.ts");












var ImportExportManagerService = /** @class */ (function () {
    function ImportExportManagerService(afs, events, fbStorage, logglyService, storage, configService, sharedService) {
        this.afs = afs;
        this.events = events;
        this.fbStorage = fbStorage;
        this.logglyService = logglyService;
        this.storage = storage;
        this.configService = configService;
        this.sharedService = sharedService;
        this.skuArr = [];
    }
    ImportExportManagerService.prototype.getAllProducts = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var allProducts_1, userId_1, userRole, productsRef, productsRef, error_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        allProducts_1 = [];
                        return [4 /*yield*/, this.storage.get('uid')];
                    case 1:
                        userId_1 = _a.sent();
                        return [4 /*yield*/, this.storage.get('userRole')];
                    case 2:
                        userRole = _a.sent();
                        if (!(userRole == 'vendor')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.afs.collection('products', function (ref) { return ref.orderBy('sortedAt', 'desc').where('vendorId', '==', userId_1); })];
                    case 3:
                        productsRef = _a.sent();
                        productsRef.get().subscribe(function (snapshot) {
                            snapshot.forEach(function (product) {
                                allProducts_1.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: product.id }, product.data()));
                            });
                        });
                        return [2 /*return*/, allProducts_1];
                    case 4: return [4 /*yield*/, this.afs.collection('products', function (ref) { return ref.orderBy('sortedAt', 'desc'); })];
                    case 5:
                        productsRef = _a.sent();
                        productsRef.get().subscribe(function (snapshot) {
                            snapshot.forEach(function (product) {
                                allProducts_1.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: product.id }, product.data()));
                            });
                        });
                        return [2 /*return*/, allProducts_1];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        console.log('Error in fetching products : ', error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ImportExportManagerService.prototype.fetchAllSKU = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var productsData, allProductsref, ids, filtered;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afs.collection('products')];
                    case 1:
                        productsData = _a.sent();
                        allProductsref = productsData.get().subscribe(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                _this.skuArr.push({
                                    productCode: doc.data().productCode,
                                    pid: doc.id
                                });
                            });
                            allProductsref.unsubscribe();
                        });
                        ids = this.skuArr.map(function (o) { return o.productCode; });
                        filtered = this.skuArr.filter(function (_a, index) {
                            var productCode = _a.productCode;
                            return !ids.includes(productCode, index + 1);
                        });
                        return [2 /*return*/, filtered];
                }
            });
        });
    };
    ImportExportManagerService.prototype.deleteBulkProducts = function (skus) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var count, _i, skus_1, pid;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        count = 0;
                        if (!(skus && skus.length)) return [3 /*break*/, 4];
                        _i = 0, skus_1 = skus;
                        _a.label = 1;
                    case 1:
                        if (!(_i < skus_1.length)) return [3 /*break*/, 4];
                        pid = skus_1[_i];
                        return [4 /*yield*/, this.afs.collection('products').doc(pid).delete()];
                    case 2:
                        _a.sent();
                        count++;
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, count];
                }
            });
        });
    };
    ImportExportManagerService.prototype.getAllCategories = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var allCategories_1, categoryData, error_2;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        allCategories_1 = [];
                        return [4 /*yield*/, this.afs.collection('categories').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise()];
                    case 1:
                        categoryData = _a.sent();
                        categoryData.map(function (category) {
                            allCategories_1.push(category);
                        });
                        return [2 /*return*/, allCategories_1];
                    case 2:
                        error_2 = _a.sent();
                        console.log('Error in fetching categories : ', error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImportExportManagerService.prototype.getAllSubCategories = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var sublist, categories, _i, categories_1, c, subcategories, _a, subcategories_1, sc;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sublist = [];
                        return [4 /*yield*/, this.afs.collection('categories', function (ref) { return ref
                                .orderBy('sortedAt', 'desc')
                                .where('status', '==', true); }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (snaps) { return Object(_services_db_utilis__WEBPACK_IMPORTED_MODULE_9__["convertSnaps"])(snaps); })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise()];
                    case 1:
                        categories = _b.sent();
                        _i = 0, categories_1 = categories;
                        _b.label = 2;
                    case 2:
                        if (!(_i < categories_1.length)) return [3 /*break*/, 5];
                        c = categories_1[_i];
                        if (!c.isSubcategories) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getSubcategoriesSidemenu(c.id)];
                    case 3:
                        subcategories = _b.sent();
                        if (subcategories.length) {
                            for (_a = 0, subcategories_1 = subcategories; _a < subcategories_1.length; _a++) {
                                sc = subcategories_1[_a];
                                sublist.push({ id: sc.id, categoryId: c.id, name: sc.name, active: false });
                            }
                        }
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, sublist];
                }
            });
        });
    };
    ImportExportManagerService.prototype.getSubcategoriesSidemenu = function (cid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var subcategories;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.afs.collection('categories').doc(cid).collection('subcategories', function (ref) {
                                        return ref.orderBy('sortedAt', 'desc').where('status', '==', true);
                                    }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (snaps) { return Object(_services_db_utilis__WEBPACK_IMPORTED_MODULE_9__["convertSnaps"])(snaps); })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise()];
                                case 1:
                                    subcategories = _a.sent();
                                    resolve(subcategories);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.prototype.getAllBrands = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var allBrands_1, brandsData, error_3;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        allBrands_1 = [];
                        return [4 /*yield*/, this.afs.collection('brands').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise()];
                    case 1:
                        brandsData = _a.sent();
                        brandsData.map(function (brand) {
                            allBrands_1.push(brand);
                        });
                        return [2 /*return*/, allBrands_1];
                    case 2:
                        error_3 = _a.sent();
                        console.log('Error in fetching brands : ', error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImportExportManagerService.prototype.getAllVendors = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var allVendors_1, vendorRef, error_4;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        allVendors_1 = [];
                        return [4 /*yield*/, this.afs.collection('users', function (ref) { return ref.where('role', '==', 'vendor'); })];
                    case 1:
                        vendorRef = _a.sent();
                        vendorRef.get().subscribe(function (snap) {
                            snap.forEach(function (v) {
                                allVendors_1.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: v.id }, v.data()));
                            });
                        });
                        return [2 /*return*/, allVendors_1];
                    case 2:
                        error_4 = _a.sent();
                        console.log('Error in fetching vendors : ', error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImportExportManagerService.prototype.getAllOrders = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                // console.log('status : ', status)
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var loginId_1, userRole, allOrders_1, ordersData, allOrdersRef_1, error_5;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    return [4 /*yield*/, this.storage.get('uid')];
                                case 1:
                                    loginId_1 = _a.sent();
                                    return [4 /*yield*/, this.storage.get('userRole')];
                                case 2:
                                    userRole = _a.sent();
                                    if (!(userRole == 'vendor')) return [3 /*break*/, 3];
                                    this.allPendingOrdersForAdmin = this.afs.collection('orders', function (ref) { return ref
                                        .orderBy('createdAt', 'desc')
                                        .where('vendorId', '==', loginId_1); }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (actions) { return actions.map(function (a) {
                                        var data = a.payload.doc.data();
                                        var id = a.payload.doc.id;
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                                    }); })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                                    return [3 /*break*/, 5];
                                case 3:
                                    allOrders_1 = [];
                                    ordersData = void 0;
                                    return [4 /*yield*/, this.afs.collection('orders', function (ref) { return ref.orderBy('createdAt', 'desc'); })];
                                case 4:
                                    ordersData = _a.sent();
                                    allOrdersRef_1 = ordersData.get().subscribe(function (querySnapshot) {
                                        querySnapshot.forEach(function (doc) {
                                            allOrders_1.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: doc.id }, doc.data()));
                                        });
                                        resolve(allOrders_1);
                                        allOrdersRef_1.unsubscribe();
                                    });
                                    _a.label = 5;
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    error_5 = _a.sent();
                                    console.log("Error in fetching all orders : ", error_5);
                                    resolve([]);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.prototype.getAllOrdersLength = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var totalOrders_1, ordersData, allOrdersRef_2;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            try {
                                totalOrders_1 = 0;
                                ordersData = this.afs.collection('orders');
                                allOrdersRef_2 = ordersData.get().subscribe(function (snap) {
                                    totalOrders_1 = snap.size;
                                    resolve(totalOrders_1);
                                    allOrdersRef_2.unsubscribe();
                                });
                            }
                            catch (error) {
                                console.dir('Error in fetching total orders count : ', error);
                                resolve(0);
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.prototype.getAllConfirmedOrders = function (date) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var loginId_2, userRole, allOrders_2, ordersData, allOrdersRef_3, error_6;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 9, , 10]);
                                    return [4 /*yield*/, this.storage.get('uid')];
                                case 1:
                                    loginId_2 = _a.sent();
                                    return [4 /*yield*/, this.storage.get('userRole')];
                                case 2:
                                    userRole = _a.sent();
                                    if (!(userRole == 'vendor')) return [3 /*break*/, 3];
                                    this.allPendingOrdersForAdmin = this.afs.collection('orders', function (ref) { return ref
                                        .orderBy('createdAt', 'desc')
                                        .where('status', 'in', ['Confirmed']).where('vendorId', '==', loginId_2); }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (actions) { return actions.map(function (a) {
                                        var data = a.payload.doc.data();
                                        var id = a.payload.doc.id;
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                                    }); })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                                    return [3 /*break*/, 8];
                                case 3:
                                    allOrders_2 = [];
                                    ordersData = void 0;
                                    if (!(date && date.start)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, this.afs.collection('orders', function (ref) { return ref.orderBy('createdAt', 'desc').where('status', 'in', ['Confirmed']).startAt(date.start).endAt(date.end); })];
                                case 4:
                                    ordersData = _a.sent();
                                    return [3 /*break*/, 7];
                                case 5: return [4 /*yield*/, this.afs.collection('orders', function (ref) { return ref.orderBy('createdAt', 'desc').where('status', 'in', ['Confirmed']); })];
                                case 6:
                                    ordersData = _a.sent();
                                    _a.label = 7;
                                case 7:
                                    allOrdersRef_3 = ordersData.get().subscribe(function (querySnapshot) {
                                        querySnapshot.forEach(function (doc) {
                                            allOrders_2.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: doc.id }, doc.data()));
                                        });
                                        resolve(allOrders_2);
                                        allOrdersRef_3.unsubscribe();
                                    });
                                    _a.label = 8;
                                case 8: return [3 /*break*/, 10];
                                case 9:
                                    error_6 = _a.sent();
                                    console.log(error_6);
                                    return [3 /*break*/, 10];
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.prototype.getAllOrdersPreset = function (status, startDate, endDate) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                console.log('status : ', status);
                console.log('end : ', startDate);
                console.log('start : ', endDate);
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var ordersRef, allOrders_3, loginId_3, userRole, allOrdersRef_4, error_7;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    console.log('here1');
                                    ordersRef = void 0;
                                    allOrders_3 = [];
                                    return [4 /*yield*/, this.storage.get('uid')];
                                case 1:
                                    loginId_3 = _a.sent();
                                    return [4 /*yield*/, this.storage.get('userRole')];
                                case 2:
                                    userRole = _a.sent();
                                    console.log('here2');
                                    if (userRole == 'vendor') {
                                        console.log('here3');
                                        if (status === 'Payment Pending') {
                                            ordersRef = this.afs.collection('orders', function (ref) { return ref
                                                .orderBy('createdAt', 'desc')
                                                .where('payment.completed', '==', false).where('vendorId', '==', loginId_3).startAt(startDate)
                                                .endAt(endDate); });
                                        }
                                        else {
                                            ordersRef = this.afs.collection('orders', function (ref) { return ref
                                                .orderBy('createdAt', 'desc')
                                                .where('status', '==', status).where('vendorId', '==', loginId_3).startAt(startDate)
                                                .endAt(endDate); });
                                        }
                                    }
                                    else {
                                        if (status === 'Payment Pending') {
                                            console.log('here4');
                                            ordersRef = this.afs.collection('orders', function (ref) { return ref
                                                .orderBy('createdAt', 'desc')
                                                .where('payment.completed', '==', false).startAt(startDate)
                                                .endAt(endDate); });
                                        }
                                        else {
                                            console.log('here5');
                                            ordersRef = this.afs.collection('orders', function (ref) { return ref
                                                .orderBy('createdAt', 'desc')
                                                .where('status', '==', status).startAt(startDate)
                                                .endAt(endDate); });
                                        }
                                    }
                                    console.log('here6');
                                    allOrdersRef_4 = ordersRef.get().subscribe(function (snap) {
                                        if (snap.size === 0) {
                                            resolve([]);
                                        }
                                        else {
                                            snap.forEach(function (order) {
                                                allOrders_3.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: order.id }, order.data()));
                                            });
                                            resolve(allOrders_3);
                                        }
                                        allOrdersRef_4.unsubscribe();
                                    });
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_7 = _a.sent();
                                    console.log(error_7);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.prototype.getAllPendingOrders = function (date) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var loginId_4, userRole, allOrders_4, ordersData, allOrdersRef_5, error_8;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 9, , 10]);
                                    return [4 /*yield*/, this.storage.get('uid')];
                                case 1:
                                    loginId_4 = _a.sent();
                                    return [4 /*yield*/, this.storage.get('userRole')];
                                case 2:
                                    userRole = _a.sent();
                                    if (!(userRole == 'vendor')) return [3 /*break*/, 3];
                                    this.allPaymentFailedOrders = this.afs.collection('orders', function (ref) { return ref
                                        .orderBy('createdAt', 'desc')
                                        .where("status", '==', 'Pending').where('vendorId', '==', loginId_4); }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (actions) { return actions.map(function (a) {
                                        var data = a.payload.doc.data();
                                        var id = a.payload.doc.id;
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                                    }); })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                                    return [3 /*break*/, 8];
                                case 3:
                                    allOrders_4 = [];
                                    ordersData = void 0;
                                    if (!(date && date.start)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, this.afs.collection('orders', function (ref) { return ref.orderBy('createdAt', 'desc').where("status", '==', 'Pending').startAt(date.start).endAt(date.end); })];
                                case 4:
                                    ordersData = _a.sent();
                                    return [3 /*break*/, 7];
                                case 5: return [4 /*yield*/, this.afs.collection('orders', function (ref) { return ref.orderBy('createdAt', 'desc').where("status", '==', 'Pending'); })];
                                case 6:
                                    ordersData = _a.sent();
                                    _a.label = 7;
                                case 7:
                                    allOrdersRef_5 = ordersData.get().subscribe(function (querySnapshot) {
                                        querySnapshot.forEach(function (doc) {
                                            allOrders_4.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: doc.id }, doc.data()));
                                        });
                                        resolve(allOrders_4);
                                        allOrdersRef_5.unsubscribe();
                                    });
                                    _a.label = 8;
                                case 8: return [3 /*break*/, 10];
                                case 9:
                                    error_8 = _a.sent();
                                    console.log(error_8);
                                    return [3 /*break*/, 10];
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.prototype.getAllDispatchedOrders = function (date) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var loginId_5, userRole, allOrders_5, ordersData, allOrdersRef_6, error_9;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 9, , 10]);
                                    return [4 /*yield*/, this.storage.get('uid')];
                                case 1:
                                    loginId_5 = _a.sent();
                                    return [4 /*yield*/, this.storage.get('userRole')];
                                case 2:
                                    userRole = _a.sent();
                                    if (!(userRole == 'vendor')) return [3 /*break*/, 3];
                                    this.allDispatchedOrdersForAdmin = this.afs.collection('orders', function (ref) { return ref
                                        .orderBy('createdAt', 'desc')
                                        .where('status', 'in', ['Dispatched']).where('vendorId', '==', loginId_5); }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (actions) { return actions.map(function (a) {
                                        var data = a.payload.doc.data();
                                        var id = a.payload.doc.id;
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                                    }); })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                                    return [3 /*break*/, 8];
                                case 3:
                                    allOrders_5 = [];
                                    ordersData = void 0;
                                    if (!(date && date.start)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, this.afs.collection('orders', function (ref) { return ref.orderBy('createdAt', 'desc').where('status', 'in', ['Dispatched']).startAt(date.start).endAt(date.end); })];
                                case 4:
                                    ordersData = _a.sent();
                                    return [3 /*break*/, 7];
                                case 5: return [4 /*yield*/, this.afs.collection('orders', function (ref) { return ref.orderBy('createdAt', 'desc').where('status', 'in', ['Dispatched']); })];
                                case 6:
                                    ordersData = _a.sent();
                                    _a.label = 7;
                                case 7:
                                    allOrdersRef_6 = ordersData.get().subscribe(function (querySnapshot) {
                                        querySnapshot.forEach(function (doc) {
                                            allOrders_5.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: doc.id }, doc.data()));
                                        });
                                        resolve(allOrders_5);
                                        allOrdersRef_6.unsubscribe();
                                    });
                                    _a.label = 8;
                                case 8: return [3 /*break*/, 10];
                                case 9:
                                    error_9 = _a.sent();
                                    console.log(error_9);
                                    return [3 /*break*/, 10];
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.prototype.getAllDeliveredOrders = function (date) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var loginId_6, userRole, allOrders_6, ordersData, allOrdersRef_7, error_10;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 9, , 10]);
                                    return [4 /*yield*/, this.storage.get('uid')];
                                case 1:
                                    loginId_6 = _a.sent();
                                    return [4 /*yield*/, this.storage.get('userRole')];
                                case 2:
                                    userRole = _a.sent();
                                    if (!(userRole == 'vendor')) return [3 /*break*/, 3];
                                    this.allCompletedOrdersForAdmin = this.afs.collection('orders', function (ref) { return ref
                                        .orderBy('createdAt', 'desc')
                                        .where('status', 'in', ['Delivered']).where('vendorId', '==', loginId_6); }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (actions) { return actions.map(function (a) {
                                        var data = a.payload.doc.data();
                                        var id = a.payload.doc.id;
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                                    }); })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                                    return [3 /*break*/, 8];
                                case 3:
                                    allOrders_6 = [];
                                    ordersData = void 0;
                                    if (!(date && date.start)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, this.afs.collection('orders', function (ref) { return ref.orderBy('createdAt', 'desc').where('status', 'in', ['Delivered']).startAt(date.start).endAt(date.end); })];
                                case 4:
                                    ordersData = _a.sent();
                                    return [3 /*break*/, 7];
                                case 5: return [4 /*yield*/, this.afs.collection('orders', function (ref) { return ref.orderBy('createdAt', 'desc').where('status', 'in', ['Delivered']); })];
                                case 6:
                                    ordersData = _a.sent();
                                    _a.label = 7;
                                case 7:
                                    allOrdersRef_7 = ordersData.get().subscribe(function (querySnapshot) {
                                        querySnapshot.forEach(function (doc) {
                                            allOrders_6.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: doc.id }, doc.data()));
                                        });
                                        resolve(allOrders_6);
                                        allOrdersRef_7.unsubscribe();
                                    });
                                    _a.label = 8;
                                case 8: return [3 /*break*/, 10];
                                case 9:
                                    error_10 = _a.sent();
                                    console.log(error_10);
                                    return [3 /*break*/, 10];
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.prototype.getAllCancelledOrders = function (date) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var loginId_7, userRole, allOrders_7, ordersData, allOrdersRef_8, error_11;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 9, , 10]);
                                    return [4 /*yield*/, this.storage.get('uid')];
                                case 1:
                                    loginId_7 = _a.sent();
                                    return [4 /*yield*/, this.storage.get('userRole')];
                                case 2:
                                    userRole = _a.sent();
                                    if (!(userRole == 'vendor')) return [3 /*break*/, 3];
                                    this.allCancelledOrders = this.afs.collection('orders', function (ref) { return ref
                                        .orderBy('createdAt', 'desc').where("status", 'in', 'Cancelled').where('vendorId', '==', loginId_7); }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (actions) { return actions.map(function (a) {
                                        var data = a.payload.doc.data();
                                        var id = a.payload.doc.id;
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                                    }); })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                                    return [3 /*break*/, 8];
                                case 3:
                                    allOrders_7 = [];
                                    ordersData = void 0;
                                    if (!(date && date.start)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, this.afs.collection('orders', function (ref) { return ref.orderBy('createdAt', 'desc').where("status", 'in', ['Cancelled']).startAt(date.start).endAt(date.end); })];
                                case 4:
                                    ordersData = _a.sent();
                                    return [3 /*break*/, 7];
                                case 5: return [4 /*yield*/, this.afs.collection('orders', function (ref) { return ref.orderBy('createdAt', 'desc').where("status", 'in', ['Cancelled']); })];
                                case 6:
                                    ordersData = _a.sent();
                                    _a.label = 7;
                                case 7:
                                    allOrdersRef_8 = ordersData.get().subscribe(function (querySnapshot) {
                                        querySnapshot.forEach(function (doc) {
                                            allOrders_7.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: doc.id }, doc.data()));
                                        });
                                        resolve(allOrders_7);
                                        allOrdersRef_8.unsubscribe();
                                    });
                                    _a.label = 8;
                                case 8: return [3 /*break*/, 10];
                                case 9:
                                    error_11 = _a.sent();
                                    console.log(error_11);
                                    return [3 /*break*/, 10];
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.prototype.getAllRejectedOrders = function (date) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var loginId_8, userRole, allOrders_8, ordersData, allOrdersRef_9, error_12;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 9, , 10]);
                                    return [4 /*yield*/, this.storage.get('uid')];
                                case 1:
                                    loginId_8 = _a.sent();
                                    return [4 /*yield*/, this.storage.get('userRole')];
                                case 2:
                                    userRole = _a.sent();
                                    if (!(userRole == 'vendor')) return [3 /*break*/, 3];
                                    this.allRejectedOrders = this.afs.collection('orders', function (ref) { return ref
                                        .orderBy('createdAt', 'desc').where("status", 'in', ['Rejected']).where('vendorId', '==', loginId_8); }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (actions) { return actions.map(function (a) {
                                        var data = a.payload.doc.data();
                                        var id = a.payload.doc.id;
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                                    }); })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                                    return [3 /*break*/, 8];
                                case 3:
                                    allOrders_8 = [];
                                    ordersData = void 0;
                                    if (!(date && date.start)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, this.afs.collection('orders', function (ref) { return ref.orderBy('createdAt', 'desc').where("status", 'in', ['Rejected']).startAt(date.start).endAt(date.end); })];
                                case 4:
                                    ordersData = _a.sent();
                                    return [3 /*break*/, 7];
                                case 5: return [4 /*yield*/, this.afs.collection('orders', function (ref) { return ref.orderBy('createdAt', 'desc').where("status", 'in', ['Rejected']); })];
                                case 6:
                                    ordersData = _a.sent();
                                    _a.label = 7;
                                case 7:
                                    allOrdersRef_9 = ordersData.get().subscribe(function (querySnapshot) {
                                        querySnapshot.forEach(function (doc) {
                                            allOrders_8.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: doc.id }, doc.data()));
                                        });
                                        resolve(allOrders_8);
                                        allOrdersRef_9.unsubscribe();
                                    });
                                    _a.label = 8;
                                case 8: return [3 /*break*/, 10];
                                case 9:
                                    error_12 = _a.sent();
                                    console.log(error_12);
                                    return [3 /*break*/, 10];
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.prototype.getAllReturnedOrders = function (date) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var loginId_9, userRole, allOrders_9, ordersData, allOrdersRef_10, error_13;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 9, , 10]);
                                    return [4 /*yield*/, this.storage.get('uid')];
                                case 1:
                                    loginId_9 = _a.sent();
                                    return [4 /*yield*/, this.storage.get('userRole')];
                                case 2:
                                    userRole = _a.sent();
                                    if (!(userRole == 'vendor')) return [3 /*break*/, 3];
                                    this.allReturnedOrders = this.afs.collection('orders', function (ref) { return ref
                                        .orderBy('createdAt', 'desc')
                                        .where("status", '==', 'Returned').where('vendorId', '==', loginId_9); }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (actions) { return actions.map(function (a) {
                                        var data = a.payload.doc.data();
                                        var id = a.payload.doc.id;
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                                    }); })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                                    return [3 /*break*/, 8];
                                case 3:
                                    allOrders_9 = [];
                                    ordersData = void 0;
                                    if (!(date && date.start)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, this.afs.collection('orders', function (ref) { return ref.orderBy('createdAt', 'desc').where("status", '==', 'Returned').startAt(date.start).endAt(date.end); })];
                                case 4:
                                    ordersData = _a.sent();
                                    return [3 /*break*/, 7];
                                case 5: return [4 /*yield*/, this.afs.collection('orders', function (ref) { return ref.orderBy('createdAt', 'desc').where("status", '==', 'Returned'); })];
                                case 6:
                                    ordersData = _a.sent();
                                    _a.label = 7;
                                case 7:
                                    allOrdersRef_10 = ordersData.get().subscribe(function (querySnapshot) {
                                        querySnapshot.forEach(function (doc) {
                                            allOrders_9.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: doc.id }, doc.data()));
                                        });
                                        resolve(allOrders_9);
                                        allOrdersRef_10.unsubscribe();
                                    });
                                    _a.label = 8;
                                case 8: return [3 /*break*/, 10];
                                case 9:
                                    error_13 = _a.sent();
                                    console.log(error_13);
                                    return [3 /*break*/, 10];
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.prototype.getAllPaymentPendingOrders = function (date) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var loginId_10, userRole, allOrders_10, ordersData, allOrdersRef_11, error_14;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 9, , 10]);
                                    return [4 /*yield*/, this.storage.get('uid')];
                                case 1:
                                    loginId_10 = _a.sent();
                                    return [4 /*yield*/, this.storage.get('userRole')];
                                case 2:
                                    userRole = _a.sent();
                                    if (!(userRole == 'vendor')) return [3 /*break*/, 3];
                                    this.allReturnedOrders = this.afs.collection('orders', function (ref) { return ref
                                        .orderBy('createdAt', 'desc')
                                        .where("status", '==', 'Returned').where('vendorId', '==', loginId_10); }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (actions) { return actions.map(function (a) {
                                        var data = a.payload.doc.data();
                                        var id = a.payload.doc.id;
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                                    }); })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                                    return [3 /*break*/, 8];
                                case 3:
                                    allOrders_10 = [];
                                    ordersData = void 0;
                                    if (!(date && date.start)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, this.afs.collection('orders', function (ref) { return ref.orderBy('createdAt', 'desc').where("payment.completed", '==', false).startAt(date.start).endAt(date.end); })];
                                case 4:
                                    ordersData = _a.sent();
                                    return [3 /*break*/, 7];
                                case 5: return [4 /*yield*/, this.afs.collection('orders', function (ref) { return ref.orderBy('createdAt', 'desc').where("payment.completed", '==', false); })];
                                case 6:
                                    ordersData = _a.sent();
                                    _a.label = 7;
                                case 7:
                                    allOrdersRef_11 = ordersData.get().subscribe(function (querySnapshot) {
                                        querySnapshot.forEach(function (doc) {
                                            allOrders_10.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: doc.id }, doc.data()));
                                        });
                                        resolve(allOrders_10);
                                        allOrdersRef_11.unsubscribe();
                                    });
                                    _a.label = 8;
                                case 8: return [3 /*break*/, 10];
                                case 9:
                                    error_14 = _a.sent();
                                    console.log(error_14);
                                    return [3 /*break*/, 10];
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.prototype.getAllDeliveryAgents = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var deliveryAgents_1, usersRef, error_15;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    deliveryAgents_1 = [];
                                    return [4 /*yield*/, this.afs.collection('users', function (ref) { return ref.where('role', '==', 'deliveryAgent'); })];
                                case 1:
                                    usersRef = _a.sent();
                                    usersRef.get().subscribe(function (snap) {
                                        snap.forEach(function (v) {
                                            deliveryAgents_1.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: v.id }, v.data()));
                                        });
                                    });
                                    resolve(deliveryAgents_1);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_15 = _a.sent();
                                    console.log(error_15);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.prototype.updateOrder = function (orderId, agentId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var orderRef, orderData, updateOrder, error_16;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    orderRef = this.afs.collection('orders', function (ref) { return ref.where('orderId', '==', orderId); });
                                    return [4 /*yield*/, orderRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (actions) { return actions.map(function (a) {
                                            var data = a.payload.doc.data();
                                            var id = a.payload.doc.id;
                                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                                        }); })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise()];
                                case 1:
                                    orderData = _a.sent();
                                    return [4 /*yield*/, this.afs.collection('orders').doc(orderData[0].id).update({ deliveryAgentId: agentId, deliveryStatus: 'notStarted' })];
                                case 2:
                                    updateOrder = _a.sent();
                                    console.log('updated order', updateOrder);
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_16 = _a.sent();
                                    console.log(error_16);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.prototype.getUserByRole = function (role, custom) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var allUsers_1, userRef, allUsersRef_1, error_17;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 5, , 6]);
                                    allUsers_1 = [];
                                    userRef = void 0;
                                    if (!(role === 'all')) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.afs.collection('users')];
                                case 1:
                                    userRef = _a.sent();
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, this.afs.collection('users', function (ref) { return ref.where('role', '==', role); })];
                                case 3:
                                    userRef = _a.sent();
                                    _a.label = 4;
                                case 4:
                                    allUsersRef_1 = userRef.get().subscribe(function (querySnapshot) {
                                        querySnapshot.forEach(function (doc) {
                                            if (custom === 'custom-justNumbers') {
                                                allUsers_1.push(doc.data().phoneNo);
                                            }
                                            else {
                                                allUsers_1.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: doc.id }, doc.data()));
                                            }
                                        });
                                        resolve(allUsers_1);
                                        allUsersRef_1.unsubscribe();
                                    });
                                    return [3 /*break*/, 6];
                                case 5:
                                    error_17 = _a.sent();
                                    console.log(error_17);
                                    resolve([]);
                                    return [3 /*break*/, 6];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.prototype.getAllUsersCount = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var totalUsers_1, UsersData, allUsersRef_2;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            try {
                                totalUsers_1 = 0;
                                UsersData = this.afs.collection('users');
                                allUsersRef_2 = UsersData.get().subscribe(function (snap) {
                                    totalUsers_1 = snap.size;
                                    resolve(totalUsers_1);
                                    allUsersRef_2.unsubscribe();
                                });
                            }
                            catch (err) {
                                console.dir(err);
                                resolve(0);
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.prototype.addUserByAdmin = function (userDetails) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var addUserDetails;
                        var _this = this;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            addUserDetails = firebase__WEBPACK_IMPORTED_MODULE_6__["functions"]().httpsCallable('users-addUserByAdmin');
                            addUserDetails(userDetails).then(function (res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                    if (res.data.status && res.data.status === 'success') {
                                        console.log("Successfully Added User - " + userDetails.name + " : ", res.data);
                                        resolve({ status: res.data.status, data: userDetails });
                                    }
                                    else {
                                        console.log("Failed To Add User - " + userDetails.name + " : ", res.data);
                                        resolve({ status: res.data.status, data: userDetails });
                                    }
                                    return [2 /*return*/];
                                });
                            }); });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.prototype.getAllFilters = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var allFilters_1, filtersRef, allFiltersRef_1;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            try {
                                allFilters_1 = [];
                                filtersRef = void 0;
                                filtersRef = this.afs.collection('features').doc('filters').collection('list');
                                allFiltersRef_1 = filtersRef.get().subscribe(function (querySnapshot) {
                                    querySnapshot.forEach(function (doc) {
                                        if (doc.data().active) {
                                            allFilters_1.push({ name: doc.data().name, value: doc.data().values || [] });
                                        }
                                    });
                                    resolve(allFilters_1);
                                    allFiltersRef_1.unsubscribe();
                                });
                            }
                            catch (error) {
                                console.dir(error);
                                resolve(0);
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    ImportExportManagerService.ctorParameters = function () { return [
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
        { type: _angular_fire_storage___WEBPACK_IMPORTED_MODULE_5__["AngularFireStorage"] },
        { type: _loggly_logger_loggly_logger_service__WEBPACK_IMPORTED_MODULE_7__["LogglyLoggerService"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_8__["Storage"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_10__["ConfigService"] },
        { type: _shared_shared_service__WEBPACK_IMPORTED_MODULE_11__["SharedService"] }
    ]; };
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
    return ImportExportManagerService;
}());



/***/ })

}]);
//# sourceMappingURL=default~admin-import-export-manager-delete-bulk-products-delete-bulk-products-module~admin-import-ex~8c99e58d-es5.js.map