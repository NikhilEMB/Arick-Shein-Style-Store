import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Events, LoadingController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { LabelService } from 'src/app/services/label/label.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import * as moment from 'moment';

@Component({
    selector: 'app-membership-settings',
    templateUrl: './membership-settings.page.html',
    styleUrls: ['./membership-settings.page.scss'],
})
export class MembershipSettingsPage implements OnInit {

    SHARED_LABELS: any;
    MEMBERSHIP_SETTINGS_LABELS: any;
    headerText: any;
    membership = {
        active: false,
        name: '',
        description: '',
        discount: 0,
        maxDiscount: 0,
        isDeliveryFree: false,
        isDeliveryFeeAsCashback: false,
        deliveryFreeAmount: 0,
        plans: [],
        initialCashback: 0
    }
    currencyCode: any;
    isMembership = false;
    membershipUsers = []
    ckeConfig: any;

    constructor(private events: Events,
        private labelService: LabelService,
        private router: Router,
        private sharedService: SharedService,
        private configService: ConfigService,
        private alertController: AlertController
    ) { }

    ngOnInit() {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.MEMBERSHIP_SETTINGS_LABELS = this.labelService.labels['MEMBERSHIP_SETTINGS'];
        this.headerText = this.MEMBERSHIP_SETTINGS_LABELS['header_text'];
        this.currencyCode = this.configService.environment.currencyCode;
        this.ckeConfig = {
            allowedContent: true,
            height: 200
        }
    }

    async ionViewWillEnter() {
        this.isMembership = this.configService.environment.membership;
        if (this.isMembership == false) {
            const alert = await this.alertController.create({
                message: "Sorry, this feature is not available. Please upgrade your plan for access",
                buttons: ['ok']
            });
            alert.onWillDismiss().then(() => {
                this.router.navigate(['admin-home']);
            })
            await alert.present();
        }
        this.initializeSubscriptions();
        await this.sharedService.presentLoading("Loading data ...");
        this.events.publish('membership:getMembershipUsers');
        this.events.publish('membership:getMembershipSettings');
    }

    ionViewWillLeave() {
        this.removeSubscriptions();
    }

    initializeSubscriptions() {
        this.events.subscribe('membership:membershipSettingsSaved', () => {
            if (this.sharedService.loading) {
                this.sharedService.loading.dismiss();
            }
            this.sharedService.presentAlert('Membership data saved');
        });
        this.events.subscribe('membership:membershipSettings', (settings) => {
            if (this.sharedService.loading) {
                this.sharedService.loading.dismiss();
            }
            if (settings && settings !== undefined) {
                this.membership = settings;
            }
        });
        this.events.subscribe('membership:publishAllMembers', (userData) => {
            if (this.sharedService.loading) {
                this.sharedService.loading.dismiss();
            }
            this.membershipUsers = userData
        });
    }

    getDateTimeFormat(date) {
        return moment(date).format('MMM D, YYYY hh:mm a');
    }

    toggleActive() {
        this.membership.active = !this.membership.active;
    }
    toggleDeliveryFreeActive() {
        this.membership.isDeliveryFree = !this.membership.isDeliveryFree;
        if (this.membership.isDeliveryFree) {
            this.membership.isDeliveryFeeAsCashback = false;
        }
    }

    toggleDeliveryFreeAsCashback() {
        this.membership.isDeliveryFeeAsCashback = !this.membership.isDeliveryFeeAsCashback;
    }

    async addPlan() {
        const alert = await this.alertController.create({
            subHeader: 'Plan Details',
            inputs: [
                {
                    name: 'months',
                    type: 'number',
                    placeholder: 'No of months'
                },
                {
                    name: 'price',
                    type: 'number',
                    placeholder: 'Enter price'
                },
                {
                    name: 'discountedPrice',
                    type: 'number',
                    placeholder: 'Enter discounted price'
                },
                {
                    name: 'initialCashback',
                    type: 'number',
                    placeholder: 'Enter initial cashback'
                },

            ],
            buttons: [
                {
                    text: 'cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Add',
                    handler: (plan) => {
                        if (!parseInt(plan.months) || !parseInt(plan.price) || !parseInt(plan.discountedPrice)) {
                            this.sharedService.presentToast('Please fill all the details');
                            return false;
                        } else if (parseInt(plan.discountedPrice) > parseInt(plan.price)) {
                            this.sharedService.presentToast('Discounted price greater');
                            return false;
                        }
                        else {
                            this.membership.plans.push({
                                months: parseInt(plan.months),
                                price: parseInt(plan.price),
                                discountedPrice: parseInt(plan.discountedPrice),
                                initialCashback: parseInt(plan.initialCashback)
                            });
                        }
                    }
                }
            ]
        });
        await alert.present();
    }

    removePlan(i) {
        this.membership.plans.splice(i, 1);
    }

    async saveMembership() {
        let emptyFields = this.membership.active && (!this.membership.name || !this.membership.description ||
            (this.membership.discount && !this.membership.maxDiscount) ||
            (this.membership.isDeliveryFree && !this.membership.deliveryFreeAmount) ||
            !this.membership.plans.length) ? true : false;

        if (emptyFields) {
            this.sharedService.presentAlert('Please fill all the details');
        } else {
            await this.sharedService.presentLoading('Please wait ...');
            this.events.publish('membership:saveMembershipSettings', this.membership);
        }

    }

    removeSubscriptions() {
        this.events.unsubscribe('membership:membershipSettingsSaved');
        this.events.unsubscribe('membership:membershipSettings');
        this.events.unsubscribe('membership:publishAllMembers');
    }

}
