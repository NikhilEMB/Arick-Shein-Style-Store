import { Component, ViewChild, NgZone } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Events, AlertController, ToastController, IonRouterOutlet, Platform, MenuController, ModalController, LoadingController } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  loading: any;
  phoneNo: number = null;
  verificationID = '';
  backButtonSubscription: any;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  showLoader: boolean = false;
  storeName: string;

  confirmationResult: any;
  verificationCode: any;
  user;
  mode = 'mobile';
  countryCode: any
  isBtnDisabled: boolean = false
  readonlyInput: boolean = false

  showTimer: boolean = false;
  timer: any;
  showResendBtn: boolean = false;

  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;
  constructor(private router: Router,
    private events: Events,
    private userService: UserService,
    private alertController: AlertController,
    private toastController: ToastController,
    private platform: Platform,
    private storage: Storage,
    private menuController: MenuController,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private configService: ConfigService,
    private ngZone: NgZone) {
    // this.route.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.storeName = this.router.getCurrentNavigation().extras.state.storeName;
    //   }
    // });
  }

  ionViewWillEnter() {
    this.storeName = this.configService.environment.storeName;
    this.countryCode = this.configService.environment.defaultCountryCode
    this.initializeSubscriptions();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'badge': 'bottomleft',
      'callback': function (response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // onSignInSubmit();
      }
    });
    this.recaptchaVerifier.render();
  }

  initializeSubscriptions() {
    this.events.subscribe('auth:gotVerificationId', () => {
      this.userService.addPhoneNo(this.configService.environment.defaultCountryCode + this.phoneNo);
      this.showLoader = false;
      this.router.navigate(['verify-otp']);
    });
    this.events.subscribe('auth:blockUserForTooManyOTP', () => {
      this.showLoader = false;
      this.presentAlert('Too Many OTP Attempts! Please try again later');
    });
  }
  login() {
    if (this.phoneNo === null || this.phoneNo.toString().length === 0) {
      this.presentAlert('Please enter phone number');
    } else {
      console.log('phone-no:', typeof this.phoneNo);
      if (this.phoneNo.toString().length !== this.configService.environment.phoneLength) {
        this.presentAlert('Phone number is not valid!');
      } else {
        this.showLoader = true;
        this.events.publish('auth:login', this.configService.environment.defaultCountryCode + this.phoneNo);
      }
    }
  }
  async presentAlert(desc: string) {
    const alert = await this.alertController.create({
      message: desc,
      buttons: [{
        text: 'Ok',
        handler: () => {
          //console.log('Confirm Okay');
        }
      }]
    });
    await alert.present();
  }
  removeSubscriptions() {
    this.events.unsubscribe('auth:gotVerificationId');
    this.events.unsubscribe('auth:blockUserForTooManyOTP');
  }


  verifyLoginCode() {
    this.readonlyInput = true
    this.isBtnDisabled = true
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = this.configService.environment.defaultCountryCode + this.phoneNo;
    try {
      firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
        .then(result => {
          this.ngZone.run(() => {
            this.confirmationResult = result;
            this.mode = "otp"
            this.isBtnDisabled = false
            this.resendCodeTimer();
          })
        })
        .catch((error) => {
          // console.error("SMS not sent", error);
          alert("Some error occured, please try again");
          this.confirmationResult = undefined;
          this.mode = "mobile";
          this.isBtnDisabled = false;
          this.readonlyInput = false;
          this.phoneNo = null;
        });
    }
    catch {
      alert("Please try again")
    }
  }

  signIn() {
    this.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {

        this.user = result.user;
        this.dismiss();
        this.menuController.close();

      })
      .catch(error => {
        console.log(error, "Incorrect code entered?")
        alert("Incorrect code entered")
      }
      );
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Please wait ..."
    });
    await this.loading.present();
  }
  phoneEdit() {
    this.readonlyInput = !this.readonlyInput;
    this.mode = "mobile";
    this.confirmationResult = undefined;
    this.verificationCode = '';
  }

  resendCodeTimer() {
    this.timer = 60;
    this.showResendBtn = false;
    this.showTimer = true;
    const interval = setInterval(() => {
      this.timer -= 1;
      if (this.timer === 0) {
        clearInterval(interval);
        this.showTimer = false;
        this.showResendBtn = true;
      }
    }, 1000);
  }


}
