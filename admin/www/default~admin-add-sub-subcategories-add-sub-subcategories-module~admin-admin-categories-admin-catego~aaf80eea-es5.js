(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~admin-add-sub-subcategories-add-sub-subcategories-module~admin-admin-categories-admin-catego~aaf80eea"],{

/***/ "./src/app/services/categories/categories.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/services/categories/categories.service.ts ***!
  \***********************************************************/
/*! exports provided: CategoriesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoriesService", function() { return CategoriesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var _angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/storage */ "./node_modules/@angular/fire/storage/index.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.service */ "./src/app/services/shared/shared.service.ts");






var CategoriesService = /** @class */ (function () {
    function CategoriesService(afs, fbStorage, sharedService) {
        this.afs = afs;
        this.fbStorage = fbStorage;
        this.sharedService = sharedService;
    }
    // ? Sub Of Sub-Category Start
    CategoriesService.prototype.getProductsForSubOfSubCategory = function (subOfSubCatId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                // console.log('subOfSubCatId', subOfSubCatId);
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var allProducts_1, productRef;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            try {
                                allProducts_1 = [];
                                productRef = this.afs.collection('products', function (ref) { return ref.orderBy('sortedAt', 'desc').where("categories", "array-contains", subOfSubCatId); });
                                productRef.get().subscribe(function (querySnapshot) {
                                    querySnapshot.forEach(function (doc) {
                                        allProducts_1.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: doc.id }, doc.data()));
                                    });
                                    if (allProducts_1.length !== 0) {
                                        resolve(allProducts_1);
                                    }
                                    else {
                                        resolve(false);
                                    }
                                });
                            }
                            catch (err) {
                                resolve(false);
                                console.log('err:', err);
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    CategoriesService.prototype.addSubOfSubCategory = function (data, categoryImage, catId, banner, subCatId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var subcategoryDoc, imgType, imgRef, imgType, imgRef, err_1;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    data['sortedAt'] = firebase__WEBPACK_IMPORTED_MODULE_4__["firestore"].FieldValue.serverTimestamp();
                                    if (categoryImage.length === 0) {
                                        data['image'] = { url: 'assets/img/placeholder-img.jpg' };
                                    }
                                    return [4 /*yield*/, this.afs.collection('categories').doc(catId).collection('subcategories').doc(subCatId).collection('sub-subcategories').add(data)];
                                case 1:
                                    subcategoryDoc = _a.sent();
                                    if (!(categoryImage.length !== 0)) return [3 /*break*/, 3];
                                    imgType = this.sharedService.getImageType(categoryImage[0].imgData);
                                    imgRef = this.fbStorage.ref("sub-subcategories/" + catId + "/image/" + subcategoryDoc.id + "/" + new Date().getTime().toString() + imgType);
                                    return [4 /*yield*/, imgRef.putString(categoryImage[0].imgData, 'data_url')];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    if (!(banner.length !== 0)) return [3 /*break*/, 5];
                                    imgType = this.sharedService.getImageType(banner[0].imgData);
                                    imgRef = this.fbStorage.ref("sub-subcategoriesBanner/" + catId + "/banner/" + subcategoryDoc.id + "/" + new Date().getTime().toString() + imgType);
                                    return [4 /*yield*/, imgRef.putString(banner[0].imgData, 'data_url')];
                                case 4:
                                    _a.sent();
                                    _a.label = 5;
                                case 5:
                                    resolve(true);
                                    return [3 /*break*/, 7];
                                case 6:
                                    err_1 = _a.sent();
                                    resolve(false);
                                    console.log('err:', err_1);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    CategoriesService.prototype.getSubOfSubCategories = function (catId, subCatId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var data_1, subcategoriesRef;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            try {
                                data_1 = [];
                                subcategoriesRef = this.afs.collection('categories').doc(catId).collection('subcategories').doc(subCatId).collection('subcategories', function (ref) {
                                    return ref.orderBy('sortedAt', 'desc');
                                });
                                subcategoriesRef.get().subscribe(function (snapShot) {
                                    snapShot.forEach(function (doc) {
                                        data_1.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: doc.id }, doc.data()));
                                    });
                                    // console.log('subOfSubData:', data);
                                    resolve(data_1);
                                });
                            }
                            catch (error) {
                                resolve(false);
                                console.log('err:', error);
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    CategoriesService.prototype.changeSubOfSubCategoriesStatus = function (status, catId, subCatId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                // console.log('change', catId, subCatId, status);
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var error_1;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.afs.collection('categories').doc(catId).collection('subcategories').doc(subCatId).update({
                                            isSubcategories: status
                                        })];
                                case 1:
                                    _a.sent();
                                    resolve(true);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _a.sent();
                                    resolve(false);
                                    console.log('err:', error_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    CategoriesService.prototype.changeSubOfSubCategoryStatus = function (catId, subcatId, subOfSubCatId, status) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var error_2;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.afs.collection('categories').doc(catId).collection('subcategories').doc(subcatId)
                                            .collection('sub-subcategories').doc(subOfSubCatId).update({
                                            status: status
                                        })];
                                case 1:
                                    _a.sent();
                                    resolve(true);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_2 = _a.sent();
                                    resolve(false);
                                    console.log('err:', error_2);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    CategoriesService.prototype.editSubOfSubCategory = function (data, image, banner, catId, subcatId, subOfSubCatId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var dataObj, subcategoryDoc, imgType, imgRef, imgType, imgRef, err_2;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    if (!data.name) {
                                        data.name = null;
                                    }
                                    if (!data.status) {
                                        data.status = null;
                                    }
                                    if (!data.image) {
                                        data.image = { url: null };
                                    }
                                    if (!data.banner) {
                                        data.banner = null;
                                    }
                                    if (!data.description) {
                                        data.description = null;
                                    }
                                    dataObj = {
                                        name: data.name,
                                        status: data.status,
                                        image: data.image,
                                        banner: data.banner,
                                        isExclusive: data.isExclusive,
                                        description: data.description
                                    };
                                    return [4 /*yield*/, this.afs.collection('categories').doc(catId).collection('subcategories').doc(subcatId)
                                            .collection('sub-subcategories').doc(subOfSubCatId).update(dataObj)];
                                case 1:
                                    subcategoryDoc = _a.sent();
                                    if (!(image.length !== 0)) return [3 /*break*/, 3];
                                    imgType = this.sharedService.getImageType(image[0].imgData);
                                    imgRef = this.fbStorage.ref("sub-subcategories/" + catId + "/" + subcatId + "/image/" + subOfSubCatId + "/" + new Date().getTime().toString() + imgType);
                                    return [4 /*yield*/, imgRef.putString(image[0].imgData, 'data_url')];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    if (!(banner.length !== 0)) return [3 /*break*/, 5];
                                    console.log('here');
                                    imgType = this.sharedService.getImageType(banner[0].imgData);
                                    imgRef = this.fbStorage.ref("sub-subcategories/" + catId + "/" + subcatId + "/banner/" + subOfSubCatId + "/" + new Date().getTime().toString() + imgType);
                                    return [4 /*yield*/, imgRef.putString(banner[0].imgData, 'data_url')];
                                case 4:
                                    _a.sent();
                                    _a.label = 5;
                                case 5:
                                    resolve(true);
                                    return [3 /*break*/, 7];
                                case 6:
                                    err_2 = _a.sent();
                                    resolve(false);
                                    console.log('err:', err_2);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    CategoriesService.prototype.deleteSubOfSubCategory = function (catId, subcatId, subOfSubCatId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var error_3;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.afs.collection('categories').doc(catId).collection('subcategories').doc(subcatId)
                                            .collection('sub-subcategories').doc(subOfSubCatId).delete()];
                                case 1:
                                    _a.sent();
                                    resolve(true);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_3 = _a.sent();
                                    resolve(false);
                                    console.log('err:', error_3);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    CategoriesService.prototype.updateSubOfSubCategoriesPosition = function (subOfSubCatId, changedDate, subCatId, catId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                // console.log('subOfSubCatId', subOfSubCatId, 'catId', catId, 'subcatId', subCatId);
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var err_3;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.afs.collection('categories').doc(catId).collection('subcategories').doc(subCatId)
                                            .collection('sub-subcategories').doc(subOfSubCatId).update({ sortedAt: changedDate })];
                                case 1:
                                    _a.sent();
                                    resolve(true);
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_3 = _a.sent();
                                    resolve(false);
                                    console.log('err:', err_3);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    // ? Sub Of Sub-Category End
    // ? Update GstExclusive for category products in category page.
    CategoriesService.prototype.updateGstExclusiveCategoryProducts = function (catId, gstValue) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                // console.log(catId, gstValue);
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var err_4;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.afs.collection("categories").doc(catId).update({ gstExclusive: gstValue })];
                                case 1:
                                    _a.sent();
                                    resolve(true);
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_4 = _a.sent();
                                    resolve(false);
                                    console.log('err:', err_4);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    CategoriesService.ctorParameters = function () { return [
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] },
        { type: _angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__["AngularFireStorage"] },
        { type: _shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"] }
    ]; };
    CategoriesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"],
            _angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__["AngularFireStorage"],
            _shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"]])
    ], CategoriesService);
    return CategoriesService;
}());



/***/ })

}]);
//# sourceMappingURL=default~admin-add-sub-subcategories-add-sub-subcategories-module~admin-admin-categories-admin-catego~aaf80eea-es5.js.map