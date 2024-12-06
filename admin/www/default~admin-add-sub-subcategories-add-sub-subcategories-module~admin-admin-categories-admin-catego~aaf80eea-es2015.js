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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var _angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/storage */ "./node_modules/@angular/fire/storage/es2015/index.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.service */ "./src/app/services/shared/shared.service.ts");






let CategoriesService = class CategoriesService {
    constructor(afs, fbStorage, sharedService) {
        this.afs = afs;
        this.fbStorage = fbStorage;
        this.sharedService = sharedService;
    }
    // ? Sub Of Sub-Category Start
    getProductsForSubOfSubCategory(subOfSubCatId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // console.log('subOfSubCatId', subOfSubCatId);
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let allProducts = [];
                    const productRef = this.afs.collection('products', ref => ref.orderBy('sortedAt', 'desc').where("categories", "array-contains", subOfSubCatId));
                    productRef.get().subscribe((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            allProducts.push(Object.assign({ id: doc.id }, doc.data()));
                        });
                        if (allProducts.length !== 0) {
                            resolve(allProducts);
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
            }));
        });
    }
    addSubOfSubCategory(data, categoryImage, catId, banner, subCatId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    data['sortedAt'] = firebase__WEBPACK_IMPORTED_MODULE_4__["firestore"].FieldValue.serverTimestamp();
                    if (categoryImage.length === 0) {
                        data['image'] = { url: 'assets/img/placeholder-img.jpg' };
                    }
                    const subcategoryDoc = yield this.afs.collection('categories').doc(catId).collection('subcategories').doc(subCatId).collection('sub-subcategories').add(data);
                    if (categoryImage.length !== 0) {
                        let imgType = this.sharedService.getImageType(categoryImage[0].imgData);
                        const imgRef = this.fbStorage.ref(`sub-subcategories/${catId}/image/${subcategoryDoc.id}/` + new Date().getTime().toString() + imgType);
                        yield imgRef.putString(categoryImage[0].imgData, 'data_url');
                    }
                    if (banner.length !== 0) {
                        let imgType = this.sharedService.getImageType(banner[0].imgData);
                        const imgRef = this.fbStorage.ref(`sub-subcategoriesBanner/${catId}/banner/${subcategoryDoc.id}/` + new Date().getTime().toString() + imgType);
                        yield imgRef.putString(banner[0].imgData, 'data_url');
                    }
                    resolve(true);
                }
                catch (err) {
                    resolve(false);
                    console.log('err:', err);
                }
            }));
        });
    }
    getSubOfSubCategories(catId, subCatId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let data = [];
                    const subcategoriesRef = this.afs.collection('categories').doc(catId).collection('subcategories').doc(subCatId).collection('subcategories', ref => ref.orderBy('sortedAt', 'desc'));
                    subcategoriesRef.get().subscribe((snapShot) => {
                        snapShot.forEach((doc) => {
                            data.push(Object.assign({ id: doc.id }, doc.data()));
                        });
                        // console.log('subOfSubData:', data);
                        resolve(data);
                    });
                }
                catch (error) {
                    resolve(false);
                    console.log('err:', error);
                }
            }));
        });
    }
    changeSubOfSubCategoriesStatus(status, catId, subCatId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // console.log('change', catId, subCatId, status);
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    yield this.afs.collection('categories').doc(catId).collection('subcategories').doc(subCatId).update({
                        isSubcategories: status
                    });
                    resolve(true);
                }
                catch (error) {
                    resolve(false);
                    console.log('err:', error);
                }
            }));
        });
    }
    changeSubOfSubCategoryStatus(catId, subcatId, subOfSubCatId, status) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    yield this.afs.collection('categories').doc(catId).collection('subcategories').doc(subcatId)
                        .collection('sub-subcategories').doc(subOfSubCatId).update({
                        status: status
                    });
                    resolve(true);
                }
                catch (error) {
                    resolve(false);
                    console.log('err:', error);
                }
            }));
        });
    }
    editSubOfSubCategory(data, image, banner, catId, subcatId, subOfSubCatId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
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
                    let dataObj = {
                        name: data.name,
                        status: data.status,
                        image: data.image,
                        banner: data.banner,
                        isExclusive: data.isExclusive,
                        description: data.description
                    };
                    const subcategoryDoc = yield this.afs.collection('categories').doc(catId).collection('subcategories').doc(subcatId)
                        .collection('sub-subcategories').doc(subOfSubCatId).update(dataObj);
                    if (image.length !== 0) {
                        let imgType = this.sharedService.getImageType(image[0].imgData);
                        const imgRef = this.fbStorage.ref(`sub-subcategories/${catId}/${subcatId}/image/${subOfSubCatId}/` + new Date().getTime().toString() + imgType);
                        yield imgRef.putString(image[0].imgData, 'data_url');
                    }
                    if (banner.length !== 0) {
                        console.log('here');
                        let imgType = this.sharedService.getImageType(banner[0].imgData);
                        const imgRef = this.fbStorage.ref(`sub-subcategories/${catId}/${subcatId}/banner/${subOfSubCatId}/` + new Date().getTime().toString() + imgType);
                        yield imgRef.putString(banner[0].imgData, 'data_url');
                    }
                    resolve(true);
                }
                catch (err) {
                    resolve(false);
                    console.log('err:', err);
                }
            }));
        });
    }
    deleteSubOfSubCategory(catId, subcatId, subOfSubCatId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    yield this.afs.collection('categories').doc(catId).collection('subcategories').doc(subcatId)
                        .collection('sub-subcategories').doc(subOfSubCatId).delete();
                    resolve(true);
                }
                catch (error) {
                    resolve(false);
                    console.log('err:', error);
                }
            }));
        });
    }
    updateSubOfSubCategoriesPosition(subOfSubCatId, changedDate, subCatId, catId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // console.log('subOfSubCatId', subOfSubCatId, 'catId', catId, 'subcatId', subCatId);
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    yield this.afs.collection('categories').doc(catId).collection('subcategories').doc(subCatId)
                        .collection('sub-subcategories').doc(subOfSubCatId).update({ sortedAt: changedDate });
                    resolve(true);
                }
                catch (err) {
                    resolve(false);
                    console.log('err:', err);
                }
            }));
        });
    }
    // ? Sub Of Sub-Category End
    // ? Update GstExclusive for category products in category page.
    updateGstExclusiveCategoryProducts(catId, gstValue) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // console.log(catId, gstValue);
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    yield this.afs.collection("categories").doc(catId).update({ gstExclusive: gstValue });
                    resolve(true);
                }
                catch (err) {
                    resolve(false);
                    console.log('err:', err);
                }
            }));
        });
    }
};
CategoriesService.ctorParameters = () => [
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] },
    { type: _angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__["AngularFireStorage"] },
    { type: _shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"] }
];
CategoriesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"],
        _angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__["AngularFireStorage"],
        _shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"]])
], CategoriesService);



/***/ })

}]);
//# sourceMappingURL=default~admin-add-sub-subcategories-add-sub-subcategories-module~admin-admin-categories-admin-catego~aaf80eea-es2015.js.map