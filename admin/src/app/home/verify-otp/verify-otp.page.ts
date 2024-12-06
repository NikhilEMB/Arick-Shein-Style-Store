import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events, AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss'],
})
export class VerifyOtpPage implements OnInit {
  phoneNo: any;
  showLoader: boolean = false;
  otpValue: any;
  timer: number;
  showResendBtn: boolean = false;
  showTimer: boolean = true;
  countResendBtnClicked: number = 0;
  constructor(private route: ActivatedRoute, private router: Router, private events: Events, private alertController: AlertController,
              private userService: UserService) { }

  ngOnInit() {
    this.phoneNo = this.userService.getPhoneNo();
  }

  ionViewWillEnter() {
    this.initializeSubscriptions();
    this.resendCodeTimer();
  }
  ionViewWillLeave() {
    if(this.showLoader) {
      this.showLoader = false;
    }
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('auth:incorrectOTP', (msg) => {
      this.showLoader = false;
      this.presentAlert(msg);
    });
    this.events.subscribe('auth:blockUserForTooManyOTP', () => {
      this.presentAlert('Too Many OTP Attempts! Please try again later');
    });
  }
  sendOTP() {
    if(this.otpValue.length !== 6) {
      this.presentAlert('Please enter correct otp');
    } else {
      this.showLoader = true;
      this.events.publish('auth:sendotp', this.otpValue);
    }
    
  }
  removeFocus(el) {
    if(this.otpValue.length === 6) {
      el.blur();
    }
  }
  resendCodeTimer() {
    this.timer = 60;
    let interval = setInterval(() => {
      this.timer -=1;
      if(this.timer === 0) {
          clearInterval(interval);
          this.showTimer = false;
          this.showResendBtn = true;
      }
    }, 1000);
  }
  resendOTP() {
    this.countResendBtnClicked += 1;
    if(this.countResendBtnClicked < 2) {
      this.showResendBtn = false;
      this.showTimer = true;
      this.resendCodeTimer();
      this.events.publish('auth:login', this.phoneNo);
    } else if(this.countResendBtnClicked === 2) {
      this.showResendBtn = false;
    }
  }
  async presentAlert(desc: string) {
    const alert = await this.alertController.create({
      message: desc,
      buttons: [{
        text: 'Ok',
        handler: () => {
          //console.log('Confirm Okay');
          this.otpValue = null;
        }
      }]
    });
    await alert.present();
  }

  removeSubscriptions() {
    this.events.unsubscribe('auth:incorrectOTP');
    this.events.unsubscribe('auth:blockUserForTooManyOTP');
  }
}
