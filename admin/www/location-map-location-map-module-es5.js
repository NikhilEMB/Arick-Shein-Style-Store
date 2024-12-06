(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["location-map-location-map-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/location-map/location-map.page.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/location-map/location-map.page.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"user-order-history\" class=\"custom-back-button\" *ngIf=\"routeFromUserSide\"></ion-back-button>\r\n      <ion-back-button defaultHref=\"admin-orders\" class=\"custom-back-button\" *ngIf=\"!routeFromUserSide\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title text-center>Track Order</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n<div #map id=\"map\"></div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/location-map/location-map.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/location-map/location-map.module.ts ***!
  \*****************************************************/
/*! exports provided: LocationMapPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationMapPageModule", function() { return LocationMapPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _location_map_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./location-map.page */ "./src/app/location-map/location-map.page.ts");







var routes = [
    {
        path: '',
        component: _location_map_page__WEBPACK_IMPORTED_MODULE_6__["LocationMapPage"]
    }
];
var LocationMapPageModule = /** @class */ (function () {
    function LocationMapPageModule() {
    }
    LocationMapPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_location_map_page__WEBPACK_IMPORTED_MODULE_6__["LocationMapPage"]]
        })
    ], LocationMapPageModule);
    return LocationMapPageModule;
}());



/***/ }),

/***/ "./src/app/location-map/location-map.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/location-map/location-map.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#map {\n  width: 100%;\n  height: 100%;\n}\n\n.google-map-img {\n  max-width: 12%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9jYXRpb24tbWFwL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxsb2NhdGlvbi1tYXBcXGxvY2F0aW9uLW1hcC5wYWdlLnNjc3MiLCJzcmMvYXBwL2xvY2F0aW9uLW1hcC9sb2NhdGlvbi1tYXAucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7QUNDSjs7QURDQTtFQUNJLGNBQUE7QUNFSiIsImZpbGUiOiJzcmMvYXBwL2xvY2F0aW9uLW1hcC9sb2NhdGlvbi1tYXAucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI21hcCB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIH1cclxuLmdvb2dsZS1tYXAtaW1ne1xyXG4gICAgbWF4LXdpZHRoOiAxMiU7XHJcbn0iLCIjbWFwIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmdvb2dsZS1tYXAtaW1nIHtcbiAgbWF4LXdpZHRoOiAxMiU7XG59Il19 */"

/***/ }),

/***/ "./src/app/location-map/location-map.page.ts":
/*!***************************************************!*\
  !*** ./src/app/location-map/location-map.page.ts ***!
  \***************************************************/
/*! exports provided: LocationMapPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationMapPage", function() { return LocationMapPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");





var LocationMapPage = /** @class */ (function () {
    function LocationMapPage(route, router, events, loadingCtrl, alertController) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.alertController = alertController;
        this.routeFromUserSide = false;
        this.directionsService = new google.maps.DirectionsService;
        this.icons = {
            start: {
                url: src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].deliveryBikeurl,
                scaledSize: new google.maps.Size(40, 40)
            },
            end: {
                url: src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].destinationMarkerUrl,
                scaledSize: new google.maps.Size(30, 30)
            }
        };
        this.deliveryAgentMarkers = [];
        this.route.queryParams.subscribe(function (params) {
            if (_this.router.getCurrentNavigation().extras.state) {
                _this.agentId = _this.router.getCurrentNavigation().extras.state.agentId;
                _this.routeFromUserSide = _this.router.getCurrentNavigation().extras.state.routeFromUserSide;
                _this.deliveryLatLng = _this.router.getCurrentNavigation().extras.state.deliveryLatLng;
            }
        });
    }
    LocationMapPage.prototype.ngOnInit = function () {
    };
    LocationMapPage.prototype.ionViewDidEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.loadMap(this.deliveryLatLng.lat, this.deliveryLatLng.lng);
                        this.initializeSubscriptions();
                        setTimeout(function () {
                            _this.events.publish('delivery:getLatestLatLngOfDeliveryAgent', _this.agentId);
                        }, 1000);
                        return [2 /*return*/];
                }
            });
        });
    };
    LocationMapPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    LocationMapPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('delivery:publishLatestLatLngOfDeliveryAgent', function (agentLat, agentLng) {
            _this.setRouteInMap(agentLat, agentLng);
            _this.loading.dismiss();
        });
    };
    LocationMapPage.prototype.loadMap = function (lat, lng) {
        var latLng = new google.maps.LatLng(lat, lng);
        var mapOptions = {
            center: latLng,
            zoom: 13,
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
        this.makeUserMarker(userLocation, this.icons.end, "title", this.map);
    };
    LocationMapPage.prototype.setRouteInMap = function (agentLat, agentLng) {
        var _this = this;
        this.directionsDisplay.setOptions({
            suppressMarkers: true
        });
        var request = {
            origin: { lat: agentLat, lng: agentLng },
            destination: { lat: this.deliveryLatLng.lat, lng: this.deliveryLatLng.lng },
            travelMode: google.maps.TravelMode['DRIVING']
        };
        this.directionsService.route(request, function (res, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                _this.directionsDisplay.setDirections(res);
                _this.removePreviousAgentMarkers();
                var agentLocation = {
                    lat: agentLat,
                    lng: agentLng
                };
                _this.makeAgentMarkers(agentLocation, _this.icons.start, "title", _this.map);
            }
            else {
                console.warn(status);
                _this.presentAlert("There is some problem in setting up route. Please try again later.");
                _this.events.unsubscribe('delivery:publishLatestLatLngOfDeliveryAgent');
            }
        });
    };
    LocationMapPage.prototype.makeAgentMarkers = function (position, icon, title, map) {
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
            title: title
        });
        this.deliveryAgentMarkers.push(marker);
    };
    LocationMapPage.prototype.makeUserMarker = function (position, icon, title, map) {
        new google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
            title: title
        });
    };
    LocationMapPage.prototype.removePreviousAgentMarkers = function () {
        for (var index = 0; index < this.deliveryAgentMarkers.length; index++) {
            this.deliveryAgentMarkers[index].setMap(null);
        }
    };
    LocationMapPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingCtrl.create({
                                message: 'Initializing Map...',
                                duration: 5000
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
    LocationMapPage.prototype.presentAlert = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            backdropDismiss: false,
                            buttons: [{
                                    text: 'Ok',
                                    handler: function () {
                                        if (_this.routeFromUserSide) {
                                            _this.router.navigate(['shop-categories']);
                                        }
                                        else {
                                            _this.router.navigate(['admin-home']);
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
    LocationMapPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('delivery:publishLatestLatLngOfDeliveryAgent');
    };
    LocationMapPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('map', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], LocationMapPage.prototype, "mapElement", void 0);
    LocationMapPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-location-map',
            template: __webpack_require__(/*! raw-loader!./location-map.page.html */ "./node_modules/raw-loader/index.js!./src/app/location-map/location-map.page.html"),
            styles: [__webpack_require__(/*! ./location-map.page.scss */ "./src/app/location-map/location-map.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"]])
    ], LocationMapPage);
    return LocationMapPage;
}());



/***/ })

}]);
//# sourceMappingURL=location-map-location-map-module-es5.js.map