import { AlertController, Events, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { LabelService } from 'src/app/services/label/label.service';
import * as moment from 'moment';
import { ConfigService } from 'src/app/services/config/config.service';
import { NavigationExtras, Router } from '@angular/router';
import { CalendarOptions, DayConfig  } from 'ion2-calendar';
import { SharedService } from 'src/app/services/shared/shared.service';
import { SubscriptionCalendarPage } from '../subscription-calendar/subscription-calendar.page';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})
export class SubscriptionsPage implements OnInit {

  headerText = '';
  isActive = false;
  isCashAllowed = false;
  dailyDeliveries = {
    min: null,
    max: null
  };
  weeklyDeliveries = {
    min: null,
    max: null
  };
  monthlyDeliveries = {
    min: null,
    max: null
  };
  SHARED_LABELS: any;
  PRODUCT_SUBSCRIPTIONS_LABELS: any;
  loading: any;
  subscriptions = [];
  showLoader = true;
  currencyCode: any;
  subscriptionFeature = false;
  constructor(private labelService: LabelService,
              private events: Events,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private toastController: ToastController,
			  private modalController: ModalController,
              private configService: ConfigService,
			  private sharedService: SharedService,
              private router: Router) { }

  async ionViewWillEnter(){
    this.subscriptionFeature = this.configService.environment.subscriptionFeature;
    if (this.subscriptionFeature==false){
      const alert = await this.alertController.create({
        message: "Sorry, this feature is not available. Please upgrade your plan for access",
        buttons: ['ok']
      });
      alert.onWillDismiss().then(()=>{
        this.router.navigate(['admin-home']);
      })
      await alert.present();
    }
  }
  async ngOnInit() {
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.PRODUCT_SUBSCRIPTIONS_LABELS = this.labelService.labels['PRODUCT_SUBSCRIPTIONS'];
    this.headerText = this.PRODUCT_SUBSCRIPTIONS_LABELS['header_text'];
    this.initializeSubscriptions();
    this.events.publish('product-subscriptions:getSettings');
    this.events.publish('product-subscriptions:getSubscriptions');
    this.currencyCode = this.configService.environment.currencyCode;
  }

  ngAfterContentInit(){

  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('product-subscriptions:publishSettings', (data) => {
      if (!this.isEmptyObj(data)) {
        this.isActive = typeof data.isActive !== 'undefined' ? data.isActive : false;
        this.isCashAllowed = typeof data.isCashAllowed !== 'undefined' ? data.isCashAllowed : false;
        this.dailyDeliveries = data.dailyDeliveries;
        this.weeklyDeliveries = data.weeklyDeliveries;
        this.monthlyDeliveries = data.monthlyDeliveries;
      }
    });
    this.events.subscribe('product-subscriptions:saveSettingsSuccess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert(this.PRODUCT_SUBSCRIPTIONS_LABELS['settings_has_been_saved_successfully']);
    });
    this.events.subscribe('product-subscriptions:publishSubscriptions', (subscriptions) => {
      this.subscriptions = subscriptions;
      this.showLoader = false;
    });
    this.events.subscribe('product-subscriptions:toggleActiveSuccess', (index) => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.subscriptions[index].active = !this.subscriptions[index].active;
      this.presentToast(this.PRODUCT_SUBSCRIPTIONS_LABELS['status_changed_msg']);
    });
    this.events.subscribe('product-subscriptions:removeSubSuccess', (index) => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.subscriptions.splice(index, 1);
      this.presentAlert(this.PRODUCT_SUBSCRIPTIONS_LABELS['sub_removed_success']);
    });
  }

  isEmptyObj(object) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  async messageUser(id: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        userId: id
      }
    };
    this.router.navigate(['admin-chat'], navigationExtras);
  }

  activeToggle() {
    this.isActive = !this.isActive;
  }

  cashAllowedToggle() {
    this.isCashAllowed = !this.isCashAllowed;
  }

  async saveSettings() {
    if (this.isNoData(this.dailyDeliveries) || this.isNoData(this.weeklyDeliveries) || this.isNoData(this.monthlyDeliveries)) {
      this.presentAlert(this.PRODUCT_SUBSCRIPTIONS_LABELS['please_fill_all_the_details']);
    } else {
      await this.presentLoading(this.SHARED_LABELS['please_wait'], 5000);
      const data = {
        isActive: this.isActive,
        isCashAllowed: this.isCashAllowed,
        dailyDeliveries: this.dailyDeliveries,
        weeklyDeliveries: this.weeklyDeliveries,
        monthlyDeliveries: this.monthlyDeliveries
      };
      this.events.publish('product-subscriptions:saveSettings', data);
    }
  }

  isNoData(obj: any) {
    if (!obj.min || !obj.max) {
      return true;
    }
  }

  async toggleActive(i: number) {
    await this.presentLoading(this.SHARED_LABELS['please_wait'], 5000);
    this.events.publish('product-subscriptions:toggleActive', this.subscriptions[i].id, !this.subscriptions[i].active, i);
  }

  async removeSub(i: number) {
    await this.presentLoading(this.SHARED_LABELS['please_wait'], 5000);
    this.events.publish('product-subscriptions:removeSub', this.subscriptions[i].id, i);
  }

  getNextDate(subData?: any) {
    const futureDates = [];
    const today = moment().format('YYYY-MM-DD');
    subData.ordersAt.forEach(date => {
      const diff = moment(date).diff(moment(today), 'days');
      if(diff > 0) {
        futureDates.push(date);
      }
    });


	let nextDeliverableDate: any;
	if (subData.leaveDates && subData.notDeliveredDates) {
		// Returns the first date that is not added as a leave by the user or added as not delivered already for the future by the admin.
		nextDeliverableDate = futureDates.find(date => {
			return !subData.leaveDates.includes(date) && !subData.notDeliveredDates.includes(date);
		});
	} else if (subData.leaveDates && !subData.notDeliveredDates) {
		nextDeliverableDate = futureDates.find(date => {
			return !subData.leaveDates.includes(date);
		});
	} else if (!subData.leaveDates && subData.notDeliveredDates) {
		nextDeliverableDate = futureDates.find(date => {
			return !subData.notDeliveredDates.includes(date);
		});
	} else {
		nextDeliverableDate = futureDates[0];
	}

	if (nextDeliverableDate) {
		return nextDeliverableDate;
	} else {
		return 'Completed';
	}
  }

  hasSubscriptionCompleted(sub) {
	var nextDeliverableDate = this.getNextDate(sub);

	if (nextDeliverableDate === 'Completed') {
		return true;
	} else {
		return false;
	}
  }

  async removeSubConfirm(i: number) {
    const alert = await this.alertController.create({
      message: this.PRODUCT_SUBSCRIPTIONS_LABELS['remove_sub_alert_msg'],
      buttons: [
        {
          text: this.SHARED_LABELS['cancel'],
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: this.PRODUCT_SUBSCRIPTIONS_LABELS['remove'],
          handler: () => {
            this.removeSub(i);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentLoading(msg: string, duration: number) {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: duration
    });
    await this.loading.present();
  }
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['ok']
    });

    await alert.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async openSubscriptionCalendar(sub: any) {
	const calendarOptions: CalendarOptions = {
		from: new Date(sub.ordersAt[0]),
		to: new Date(sub.ordersAt[sub.ordersAt.length - 1]),
		disableWeeks: [0, 1, 2, 3, 4, 5, 6]
	};

	const orderDateSpan = this.sharedService.getDatesBetween(calendarOptions.from, calendarOptions.to);
	calendarOptions.daysConfig = this.getDaysConfig(orderDateSpan, sub);

	const subscriptionCalendar = await this.modalController.create({
		component: SubscriptionCalendarPage,
		componentProps: {
			options: calendarOptions
		}
	});

	await subscriptionCalendar.present();
  }

  getDaysConfig(orderDateSpan: any, sub: any) {
	let ordersAt = sub.ordersAt;
	let orderLeaves = sub.leaveDates ? sub.leaveDates : [];
	let notDeliveredDates = sub.notDeliveredDates ? sub.notDeliveredDates : [];
	let deliveredDates = sub.deliveredDates ? sub.deliveredDates : [];
	let daysConfig = [];

	for (let dateString of orderDateSpan) {
		const date = new Date(dateString);
		dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`;
		let dateConfig: DayConfig = {
			date
		};

		if (ordersAt.includes(dateString)) {
			dateConfig.cssClass = 'delivery-dates';
		}

		if (orderLeaves.includes(dateString)) {
			dateConfig.cssClass = 'leave-dates';
		} else if (notDeliveredDates.includes(dateString)) {
			dateConfig.cssClass = 'not-delivered-dates';
		} else if (deliveredDates.includes(dateString)) {
			dateConfig.title = '\u2713';
			dateConfig.cssClass = 'delivered-dates';
			dateConfig.marked = true;
		}
		daysConfig.push(dateConfig);
	}

	return daysConfig;
  }

  removeSubscriptions() {
    this.events.unsubscribe('product-subscriptions:publishSettings');
    this.events.unsubscribe('product-subscriptions:saveSettingsSuccess');
    this.events.unsubscribe('product-subscriptions:toggleActiveSuccess');
    this.events.unsubscribe('product-subscriptions:removeSubSuccess');
  }
}
