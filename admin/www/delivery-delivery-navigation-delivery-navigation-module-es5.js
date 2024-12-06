(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["delivery-delivery-navigation-delivery-navigation-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/delivery/delivery-navigation/delivery-navigation.page.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/delivery/delivery-navigation/delivery-navigation.page.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"delivery-orders\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title text-center>Navigation</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"google-maps-btn\">\r\n    <ion-button (click)=\"openGoogleMaps()\" shape=\"round\">\r\n      Open in Google Maps\r\n    </ion-button>\r\n  </div>\r\n<div #map id=\"map\"></div>\r\n</ion-content>\r\n<ion-footer (click)=\"finishNavigationConfirm()\">\r\n  <ion-grid>\r\n    <ion-row class=\"ion-justify-content-center ion-align-items-center\">\r\n      <div class=\"app-footer-text\">\r\n        Finish Navigation<span><i class=\"flaticon-address app-footer-icon\"></i></span>\r\n    </div>\r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/delivery/delivery-navigation/delivery-navigation.module.ts":
/*!****************************************************************************!*\
  !*** ./src/app/delivery/delivery-navigation/delivery-navigation.module.ts ***!
  \****************************************************************************/
/*! exports provided: DeliveryNavigationPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveryNavigationPageModule", function() { return DeliveryNavigationPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _delivery_navigation_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./delivery-navigation.page */ "./src/app/delivery/delivery-navigation/delivery-navigation.page.ts");







var routes = [
    {
        path: '',
        component: _delivery_navigation_page__WEBPACK_IMPORTED_MODULE_6__["DeliveryNavigationPage"]
    }
];
var DeliveryNavigationPageModule = /** @class */ (function () {
    function DeliveryNavigationPageModule() {
    }
    DeliveryNavigationPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_delivery_navigation_page__WEBPACK_IMPORTED_MODULE_6__["DeliveryNavigationPage"]]
        })
    ], DeliveryNavigationPageModule);
    return DeliveryNavigationPageModule;
}());



/***/ }),

/***/ "./src/app/delivery/delivery-navigation/delivery-navigation.page.scss":
/*!****************************************************************************!*\
  !*** ./src/app/delivery/delivery-navigation/delivery-navigation.page.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#map {\n  width: 100%;\n  height: 100%;\n}\n\n.google-maps-btn {\n  position: absolute;\n  top: 10px;\n  -webkit-transform: translateX(50%);\n          transform: translateX(50%);\n  text-align: center;\n  z-index: 9999;\n  margin-left: -11%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGVsaXZlcnkvZGVsaXZlcnktbmF2aWdhdGlvbi9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcZGVsaXZlcnlcXGRlbGl2ZXJ5LW5hdmlnYXRpb25cXGRlbGl2ZXJ5LW5hdmlnYXRpb24ucGFnZS5zY3NzIiwic3JjL2FwcC9kZWxpdmVyeS9kZWxpdmVyeS1uYXZpZ2F0aW9uL2RlbGl2ZXJ5LW5hdmlnYXRpb24ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7QUNDSjs7QURDQTtFQUNJLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLGtDQUFBO1VBQUEsMEJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtBQ0VKIiwiZmlsZSI6InNyYy9hcHAvZGVsaXZlcnkvZGVsaXZlcnktbmF2aWdhdGlvbi9kZWxpdmVyeS1uYXZpZ2F0aW9uLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNtYXAge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuLmdvb2dsZS1tYXBzLWJ0bntcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMTBweDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg1MCUpO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgei1pbmRleDogOTk5OTtcclxuICAgIG1hcmdpbi1sZWZ0OiAtMTElO1xyXG59XHJcbiIsIiNtYXAge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uZ29vZ2xlLW1hcHMtYnRuIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDEwcHg7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg1MCUpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHotaW5kZXg6IDk5OTk7XG4gIG1hcmdpbi1sZWZ0OiAtMTElO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/delivery/delivery-navigation/delivery-navigation.page.ts":
/*!**************************************************************************!*\
  !*** ./src/app/delivery/delivery-navigation/delivery-navigation.page.ts ***!
  \**************************************************************************/
/*! exports provided: DeliveryNavigationPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveryNavigationPage", function() { return DeliveryNavigationPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/android-permissions/ngx */ "./node_modules/@ionic-native/android-permissions/ngx/index.js");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");
/* harmony import */ var _ionic_native_location_accuracy_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/location-accuracy/ngx */ "./node_modules/@ionic-native/location-accuracy/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "./node_modules/@ionic-native/launch-navigator/ngx/index.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");









var DeliveryNavigationPage = /** @class */ (function () {
    function DeliveryNavigationPage(route, router, androidPermissions, geolocation, locationAccuracy, events, launchNavigator, alertController, loadingCtrl, platform) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.androidPermissions = androidPermissions;
        this.geolocation = geolocation;
        this.locationAccuracy = locationAccuracy;
        this.events = events;
        this.launchNavigator = launchNavigator;
        this.alertController = alertController;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.directionsService = new google.maps.DirectionsService;
        this.icons = {
            start: {
                url: src_environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].deliveryBikeurl,
                scaledSize: new google.maps.Size(40, 40)
            },
            end: {
                url: src_environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].destinationMarkerUrl,
                scaledSize: new google.maps.Size(30, 30)
            }
        };
        this.deliveryMarkers = [];
        this.route.queryParams.subscribe(function (params) {
            if (_this.router.getCurrentNavigation().extras.state) {
                _this.deliveryLatLng = _this.router.getCurrentNavigation().extras.state.deliveryLatLng;
                _this.orderId = _this.router.getCurrentNavigation().extras.state.orderId;
                //console.log('deliveryLatLng', this.deliveryLatLng);
            }
        });
    }
    DeliveryNavigationPage.prototype.ngOnInit = function () {
    };
    DeliveryNavigationPage.prototype.ionViewDidEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading("Initializing Map...")];
                    case 1:
                        _a.sent();
                        if (this.platform.is('android')) {
                            this.checkGPSPermission();
                        }
                        else {
                            this.loadMap();
                        }
                        this.initializeSubscriptions();
                        return [2 /*return*/];
                }
            });
        });
    };
    DeliveryNavigationPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    DeliveryNavigationPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('delivery:finishedNavigationSuccess', function () {
            _this.loading.dismiss();
            _this.presentAlert('Order updated as delivered successfully!', true);
        });
    };
    DeliveryNavigationPage.prototype.checkGPSPermission = function () {
        var _this = this;
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(function (result) {
            if (result.hasPermission) {
                //If having permission show 'Turn On GPS' dialogue
                _this.askToTurnOnGPS();
            }
            else {
                //If not having permission ask for permission
                _this.requestGPSPermission();
            }
        }, function (err) {
            //console.log(err);
        });
    };
    DeliveryNavigationPage.prototype.requestGPSPermission = function () {
        var _this = this;
        this.locationAccuracy.canRequest().then(function (canRequest) {
            if (canRequest) {
                //console.log("4");
            }
            else {
                //Show 'GPS Permission Request' dialogue
                _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
                    .then(function () {
                    // call method to turn on GPS
                    _this.askToTurnOnGPS();
                }, function (error) {
                    //Show alert if user click on 'No Thanks'
                    //console.log('requestPermission Error requesting location permissions ' + error)
                });
            }
        });
    };
    DeliveryNavigationPage.prototype.askToTurnOnGPS = function () {
        var _this = this;
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function () {
            // When GPS Turned ON call method to get Accurate location coordinates
            _this.loadMap();
        }, function (error) { });
    };
    DeliveryNavigationPage.prototype.loadMap = function () {
        var _this = this;
        var latLng = new google.maps.LatLng(28.6863237, 77.1254335);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.directionsDisplay = new google.maps.DirectionsRenderer({
            map: this.map
        });
        var userLocation = {
            lat: this.deliveryLatLng.lat,
            lng: this.deliveryLatLng.lng
        };
        this.makeUserMarker(userLocation, this.icons.end, 'title', this.map);
        this.startNavigating();
        this.navigationInterval = setInterval(function () {
            _this.startNavigating();
        }, src_environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].timeToUpdateAgentLocation);
    };
    DeliveryNavigationPage.prototype.startNavigating = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.geoLatitude = resp.coords.latitude;
            _this.geoLongitude = resp.coords.longitude;
            //console.log('Position', resp.coords.latitude, resp.coords.longitude);
            _this.events.publish('delivery:updateLatLongOfDeliveryAgent', resp.coords.latitude, resp.coords.longitude);
            _this.setRouteInMap(resp.coords.latitude, resp.coords.longitude);
        }).catch(function (error) {
            //console.log('Error getting location', error);
            _this.presentAlert("Error in getting your location");
            clearInterval(_this.navigationInterval);
        });
    };
    DeliveryNavigationPage.prototype.setRouteInMap = function (latitude, longitude) {
        var _this = this;
        this.directionsDisplay.setOptions({
            suppressMarkers: true
        });
        var request = {
            origin: { lat: latitude, lng: longitude },
            destination: { lat: this.deliveryLatLng.lat, lng: this.deliveryLatLng.lng },
            travelMode: google.maps.TravelMode['DRIVING']
        };
        this.directionsService.route(request, function (res, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                _this.directionsDisplay.setDirections(res);
                _this.removePreviousDeliveryMarkers();
                var start_pos = {
                    lat: latitude,
                    lng: longitude
                };
                _this.makeDeliveryMarker(start_pos, _this.icons.start, "title", _this.map);
            }
            else {
                console.warn(status);
                _this.presentAlert("There is some problem in setting up route. Please try again.");
                clearInterval(_this.navigationInterval);
            }
        });
    };
    DeliveryNavigationPage.prototype.makeUserMarker = function (position, icon, title, map) {
        new google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
            title: title
        });
    };
    DeliveryNavigationPage.prototype.makeDeliveryMarker = function (position, icon, title, map) {
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
            title: title
        });
        this.deliveryMarkers.push(marker);
    };
    DeliveryNavigationPage.prototype.removePreviousDeliveryMarkers = function () {
        for (var index = 0; index < this.deliveryMarkers.length; index++) {
            this.deliveryMarkers[index].setMap(null);
        }
    };
    DeliveryNavigationPage.prototype.openGoogleMaps = function () {
        var _this = this;
        var options = {
            start: [this.geoLatitude, this.geoLongitude],
        };
        this.launchNavigator.navigate([this.deliveryLatLng.lat, this.deliveryLatLng.lng], options)
            .then(function (success) {
            return function (//console.log('Launched navigator'),
            error) { return _this.presentAlert('Unable to open google maps.' + ' ' + error); };
        });
    };
    DeliveryNavigationPage.prototype.finishNavigation = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading("Please wait...")];
                    case 1:
                        _a.sent();
                        this.events.publish('delivery:updateDeliveryStatus', this.orderId, 'delivered');
                        return [2 /*return*/];
                }
            });
        });
    };
    DeliveryNavigationPage.prototype.finishNavigationConfirm = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Are you sure you want to finish the navigation?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        //console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Finish',
                                    handler: function () {
                                        //console.log('Confirm Okay');
                                        _this.finishNavigation();
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DeliveryNavigationPage.prototype.presentLoading = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingCtrl.create({
                                message: msg,
                                duration: 3000
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DeliveryNavigationPage.prototype.presentAlert = function (msg, action) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: [{
                                    text: 'OK',
                                    handler: function () {
                                        if (action) {
                                            _this.router.navigate(['delivery-orders']);
                                        }
                                    }
                                }]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DeliveryNavigationPage.prototype.removeSubscriptions = function () {
        clearInterval(this.navigationInterval);
        this.events.unsubscribe('delivery:finishedNavigationSuccess');
    };
    DeliveryNavigationPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_3__["AndroidPermissions"] },
        { type: _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_4__["Geolocation"] },
        { type: _ionic_native_location_accuracy_ngx__WEBPACK_IMPORTED_MODULE_5__["LocationAccuracy"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["Events"] },
        { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_7__["LaunchNavigator"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["Platform"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('map', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], DeliveryNavigationPage.prototype, "mapElement", void 0);
    DeliveryNavigationPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-delivery-navigation',
            template: __webpack_require__(/*! raw-loader!./delivery-navigation.page.html */ "./node_modules/raw-loader/index.js!./src/app/delivery/delivery-navigation/delivery-navigation.page.html"),
            styles: [__webpack_require__(/*! ./delivery-navigation.page.scss */ "./src/app/delivery/delivery-navigation/delivery-navigation.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_3__["AndroidPermissions"],
            _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_4__["Geolocation"],
            _ionic_native_location_accuracy_ngx__WEBPACK_IMPORTED_MODULE_5__["LocationAccuracy"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["Events"],
            _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_7__["LaunchNavigator"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["Platform"]])
    ], DeliveryNavigationPage);
    return DeliveryNavigationPage;
}());



/***/ })

}]);
//# sourceMappingURL=delivery-delivery-navigation-delivery-navigation-module-es5.js.map