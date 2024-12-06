import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps'
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { DragulaModule } from 'ng2-dragula';
import { AngularFireModule } from '@angular/fire';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { from } from 'rxjs';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ImageModalPageModule } from './image-modal/image-modal.module';
import { IonicStorageModule } from '@ionic/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { SidemenuPage } from './sidemenu/sidemenu.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
//import { CallNumber } from '@ionic-native/call-number/ngx';
import { Market } from '@ionic-native/market/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { CKEditorModule } from 'ng2-ckeditor';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { PricelistModalPageModule } from './pricelist-modal/pricelist-modal.module';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { HomePageModule } from './home/home.module';
import { AddSubcategoriesPageModule } from './admin/add-subcategories/add-subcategories.module';
import { ShopModalPageModule } from './admin/admin-shop/shop-modal/shop-modal.module';
import { PaymentModalPageModule } from './chat-bot/payment-modal/payment-modal.module';
import { StatesModalPageModule } from './states-modal/states-modal.module';
import { Papa } from 'ngx-papaparse';
import { ChartsModule } from 'ng2-charts';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ConfigService } from './services/config/config.service';
import { APP_INITIALIZER } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { BannerLinkingModalPageModule } from './admin/admin-banners/banner-linking-modal/banner-linking-modal.module';
import { Network } from '@ionic-native/network/ngx';
import { ProductListModalPageModule } from './pages/widgets/product-list-modal/product-list-modal.module';
import { SelectWidgetModalPageModule } from './pages/homepage-setting/select-widget-modal/select-widget-modal.module';
import { EditWidgetPageModule } from './pages/homepage-setting/edit-widget/edit-widget.module';
import { SelectCategoriesPageModule } from '../app/admin/select-categories/select-categories.module';
import { SelectFilterPageModule } from 'src/app/admin/filter-settings/select-filter/select-filter.module'
import { ProductVariantPageModule } from './admin/admin-orders/create-order/product-variant/product-variant.module';
import { VendorProductsPageModule } from 'src/app/admin/multi-vendor/vendor-products/vendor-products.module'
import { PaymentGatewaySettingsPageModule } from './admin/admin-payment-settings/payment-gateway-settings/payment-gateway-settings.module';
import { DeliveryPartnerSettingsPageModule } from './admin/delivery-settings/delivery-partner-settings/delivery-partner-settings.module';
import { CreateSubscriptionPageModule } from './admin/admin-orders/create-order/create-subscription/create-subscription.module';
import { AddInputPageModule } from 'src/app/pages/widgets/edit-form/add-input/add-input.module'
import { UsersModalPageModule } from './admin/users-modal/users-modal.module';
import { PincodesModalPageModule } from './pincodes-modal/pincodes-modal.module';
import { AdminOrderPopoverPageModule } from './admin/admin-orders/admin-order-popover/admin-order-popover.module';
import { AreaModalPageModule } from './admin/delivery-settings/area-modal/area-modal.module';
import { AddOnsPageModule } from './admin/plan-payments/add-ons/add-ons.module'
import { PreviewFormPageModule } from 'src/app/pages/widgets/edit-form/preview-form/preview-form.module'
import { VendorRequestModalPageModule } from './vendor-registration/vendor-request-modal/vendor-request-modal.module';
import { ViewOrderPageModule } from 'src/app/admin/admin-home/view-order/view-order.module'
import { EditOrderPageModule } from './admin/admin-shop/all-orders/edit-order/edit-order.module';
import { ReferredUsersModalPageModule } from './reports/referral-report/referred-users-modal/referred-users-modal.module';
import { ResaleOrderPage } from 'src/app/admin/resale-order/resale-order.page';
import { StarRatingModule } from 'ionic4-star-rating';
import { ProductReviewPageModule } from './product-reviews/product-review/product-review.module';
import { CancelledReasonPage } from './admin/admin-shop/all-orders/cancelled-reason/cancelled-reason.page';
import { EditOrderPage } from './admin/admin-shop/all-orders/edit-order/edit-order.page';
import { AddVendorModalPageModule } from './admin/multi-vendor/multi-vendor-all/add-vendor-modal/add-vendor-modal.module';
import { ProductsModalPageModule } from './admin/products-modal/products-modal.module';
import { ProductSectionPageModule } from 'src/app/admin/admin-shop/new-product/product-section/product-section.module'
import { VendorOrderDetailsPageModule } from './vendor-order-details/vendor-order-details.module';
import { QuotationChatPageModule } from './admin/admin-orders/quotation-chat/quotation-chat.module';
import { QuotationEditPageModule } from './admin/admin-orders/quotation-edit/quotation-edit.module';
import { DesignStudioComponent } from './admin/design-studio/design-studio.component';
import { DesignStudioService } from './services/designStudio/design-studio.service';
import { MenuSelectComponent } from './admin/design-studio/menu-select/menu-select.component';
import { ProductTypeComponent } from './admin/admin-shop/new-product/product-type/product-type.component';
import { AppointmentScheduleComponent } from './components/appointment-schedule/appointment-schedule.component';
import { SharedModule } from './components/shared.module';
import { AppointmentOrdersComponent } from './components/appointment-orders/appointment-orders.component';
import { AppointmentSettingsComponent } from './components/appointment-settings/appointment-settings.component';
import { VendorPageComponent } from './components/vendor-page/vendor-page.component';
import { ImageEditorComponent } from './components/image-editor/image-editor.component';
import { TemplateMakerComponent } from './components/template-maker/template-maker.component'
import { NgxPhotoEditorModule } from 'ngx-photo-editor'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InvoicesPageModule } from './admin/admin-orders/invoices/invoices.module';
import { FiltersPageModule } from './admin/admin-orders/filters/filters.module';
import { VideoHelpPageModule } from './video-help/video-help/video-help.module';

import { IntegrationSettingsPageModule } from './integrations/integration-settings/integration-settings.module';
import { AddIssuesModalPageModule } from './admin/add-issues-modal/add-issues-modal.module';
import { ViewIssuesModalPageModule } from './admin/view-issues-modal/view-issues-modal.module';
import { UserGroupsModalPageModule } from './admin/user-groups/user-groups-modal/user-groups-modal.module';
import { ChangeBookingSlotPageModule } from './admin/booking-orders/change-booking-slot/change-booking-slot.module';
import { ColorsModalPageModule } from './admin/variants/colors-modal/colors-modal.module';
import { ViewsCountPopoverPageModule } from './analytics/views-count-popover/views-count-popover.module';
import { CsvImportRulesPageModule } from './admin/import-export-manager/csv-import-rules/csv-import-rules.module';
import { CalendarModule } from 'ion2-calendar';
import { SubscriptionCalendarPageModule } from './admin/subscription-calendar/subscription-calendar.module';
import { CouponsListPageModule } from './admin/admin-orders/coupons-list/coupons-list.module';
import { UserCartDetailsModalPageModule } from './admin/user-cart-details-modal/user-cart-details-modal.module';
import { BranchModalPageModule } from './admin/branches/branch-modal/branch-modal.module';
import { AddPointsPageModule } from './admin/add-points/add-points.module';
import { AddSitemapPageModule } from './admin/add-sitemap/add-sitemap.module';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

const appConfig = (config: ConfigService) => {
  return () => {
    return config.loadConfig();
  };
};


@NgModule({
  declarations: [
    AppComponent,
    SidemenuPage,
    ResaleOrderPage,
    CancelledReasonPage,
    EditOrderPage,
    DesignStudioComponent,
    MenuSelectComponent,
    ProductTypeComponent,
    ImageEditorComponent,
    TemplateMakerComponent,
    AppointmentScheduleComponent,
    AppointmentOrdersComponent,
    AppointmentSettingsComponent,
    VendorPageComponent
  ],
  entryComponents: [
    ResaleOrderPage,
    CancelledReasonPage,
    EditOrderPage,
    MenuSelectComponent,
    ProductTypeComponent,
    AppointmentScheduleComponent,
    AppointmentOrdersComponent,
    ImageEditorComponent,
    TemplateMakerComponent,
    AppointmentSettingsComponent,
    VendorPageComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    IonicModule.forRoot({ mode: 'md' }),
    AppRoutingModule,
    FormsModule,
    NgxPhotoEditorModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    ImageModalPageModule,
    IonicStorageModule.forRoot(),
    PricelistModalPageModule,
    StatesModalPageModule,
    ReactiveFormsModule,
    SuperTabsModule.forRoot(),
    CKEditorModule,
    HomePageModule,
    AddSubcategoriesPageModule,
    ShopModalPageModule,
    PaymentModalPageModule,
    BannerLinkingModalPageModule,
    ProductListModalPageModule,
    SelectWidgetModalPageModule,
    EditWidgetPageModule,
    SelectCategoriesPageModule,
    SelectFilterPageModule,
    ProductVariantPageModule,
    VendorProductsPageModule,
    PaymentGatewaySettingsPageModule,
    DeliveryPartnerSettingsPageModule,
    CreateSubscriptionPageModule,
    UsersModalPageModule,
    PincodesModalPageModule,
    AdminOrderPopoverPageModule,
    AreaModalPageModule,
    VendorRequestModalPageModule,
    EditOrderPageModule,
    ReferredUsersModalPageModule,
    ChartsModule,
    StarRatingModule,
    ProductReviewPageModule,
    AddVendorModalPageModule,
    VendorOrderDetailsPageModule,
    ProductsModalPageModule,
    UserCartDetailsModalPageModule,
    // ClipboardModule,
    HttpClientModule,
    AddInputPageModule,
    AddOnsPageModule,
    PreviewFormPageModule,
    ViewOrderPageModule,
    ProductSectionPageModule,
    QuotationChatPageModule,
    QuotationEditPageModule,
    InvoicesPageModule,
    FiltersPageModule,
    ViewIssuesModalPageModule,
    AddIssuesModalPageModule,
    SharedModule,
    VideoHelpPageModule,
    IntegrationSettingsPageModule,
    AddIssuesModalPageModule,
    ViewIssuesModalPageModule,
    UserGroupsModalPageModule,
    ChangeBookingSlotPageModule,
    ColorsModalPageModule,
    ViewsCountPopoverPageModule,
    CsvImportRulesPageModule,
    CalendarModule,
    SubscriptionCalendarPageModule,
    CouponsListPageModule,
    BranchModalPageModule,
    AddPointsPageModule,
    AddSitemapPageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    }),
    // IonicImageLoader.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    ImagePicker,
    FirebaseAuthentication,
    Keyboard,
    ScreenOrientation,
    FCM,
    InAppBrowser,
    //CallNumber,
    Market,
    AndroidPermissions,
    Geolocation,
    LocationAccuracy,
    LaunchNavigator,
    AppVersion,
    File,
    FileOpener,
    Papa,
    Device,
    ConfigService,
    Network,
    WebView,
    DesignStudioService,
    {
      provide: APP_INITIALIZER,
      useFactory: appConfig,
      multi: true,
      deps: [ConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
