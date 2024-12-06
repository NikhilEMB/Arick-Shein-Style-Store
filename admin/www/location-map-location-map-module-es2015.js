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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _location_map_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./location-map.page */ "./src/app/location-map/location-map.page.ts");







const routes = [
    {
        path: '',
        component: _location_map_page__WEBPACK_IMPORTED_MODULE_6__["LocationMapPage"]
    }
];
let LocationMapPageModule = class LocationMapPageModule {
};
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");





let LocationMapPage = class LocationMapPage {
    constructor(route, router, events, loadingCtrl, alertController) {
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
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.agentId = this.router.getCurrentNavigation().extras.state.agentId;
                this.routeFromUserSide = this.router.getCurrentNavigation().extras.state.routeFromUserSide;
                this.deliveryLatLng = this.router.getCurrentNavigation().extras.state.deliveryLatLng;
            }
        });
    }
    ngOnInit() {
    }
    ionViewDidEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.loadMap(this.deliveryLatLng.lat, this.deliveryLatLng.lng);
            this.initializeSubscriptions();
            setTimeout(() => {
                this.events.publish('delivery:getLatestLatLngOfDeliveryAgent', this.agentId);
            }, 1000);
        });
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('delivery:publishLatestLatLngOfDeliveryAgent', (agentLat, agentLng) => {
            this.setRouteInMap(agentLat, agentLng);
            this.loading.dismiss();
        });
    }
    loadMap(lat, lng) {
        let latLng = new google.maps.LatLng(lat, lng);
        let mapOptions = {
            center: latLng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.directionsDisplay = new google.maps.DirectionsRenderer({
            map: this.map
        });
        const userLocation = {
            lat: this.deliveryLatLng.lat,
            lng: this.deliveryLatLng.lng
        };
        this.makeUserMarker(userLocation, this.icons.end, "title", this.map);
    }
    setRouteInMap(agentLat, agentLng) {
        this.directionsDisplay.setOptions({
            suppressMarkers: true
        });
        const request = {
            origin: { lat: agentLat, lng: agentLng },
            destination: { lat: this.deliveryLatLng.lat, lng: this.deliveryLatLng.lng },
            travelMode: google.maps.TravelMode['DRIVING']
        };
        this.directionsService.route(request, (res, status) => {
            if (status == google.maps.DirectionsStatus.OK) {
                this.directionsDisplay.setDirections(res);
                this.removePreviousAgentMarkers();
                const agentLocation = {
                    lat: agentLat,
                    lng: agentLng
                };
                this.makeAgentMarkers(agentLocation, this.icons.start, "title", this.map);
            }
            else {
                console.warn(status);
                this.presentAlert("There is some problem in setting up route. Please try again later.");
                this.events.unsubscribe('delivery:publishLatestLatLngOfDeliveryAgent');
            }
        });
    }
    makeAgentMarkers(position, icon, title, map) {
        let marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
            title: title
        });
        this.deliveryAgentMarkers.push(marker);
    }
    makeUserMarker(position, icon, title, map) {
        new google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
            title: title
        });
    }
    removePreviousAgentMarkers() {
        for (let index = 0; index < this.deliveryAgentMarkers.length; index++) {
            this.deliveryAgentMarkers[index].setMap(null);
        }
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingCtrl.create({
                message: 'Initializing Map...',
                duration: 5000
            });
            yield this.loading.present();
        });
    }
    presentAlert(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                backdropDismiss: false,
                buttons: [{
                        text: 'Ok',
                        handler: () => {
                            if (this.routeFromUserSide) {
                                this.router.navigate(['shop-categories']);
                            }
                            else {
                                this.router.navigate(['admin-home']);
                            }
                        }
                    }]
            });
            yield alert.present();
        });
    }
    removeSubscriptions() {
        this.events.unsubscribe('delivery:publishLatestLatLngOfDeliveryAgent');
    }
};
LocationMapPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] }
];
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



/***/ })

}]);
//# sourceMappingURL=location-map-location-map-module-es2015.js.map