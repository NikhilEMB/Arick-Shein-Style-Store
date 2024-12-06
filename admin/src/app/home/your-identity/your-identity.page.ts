import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Events, AlertController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-your-identity',
  templateUrl: './your-identity.page.html',
  styleUrls: ['./your-identity.page.scss'],
})
export class YourIdentityPage implements OnInit {
  userId: string;
  userName: string = '';
  showLoader: boolean = false;
  constructor(private router: Router, private events: Events, private alertController: AlertController,
              private userService: UserService,
              private route: ActivatedRoute) {
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.userId = this.router.getCurrentNavigation().extras.state.userId;
                  }
                });
               }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.initializeSubscriptions();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('user:updateNameOfNewUserSuccess', () => {
      this.showLoader = false;
      this.router.navigate(['shop-categories']);
    });
  }
  updateUserName() {
    //console.log('username:', this.userName);
    if(this.userName === '') {
      this.presentAlert('Please enter your name');
    } else {
      this.showLoader = true;
      this.events.publish('user:updateNameOfNewUser', this.userName, this.userId);
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
    this.events.unsubscribe('user:updateNameOfNewUserSuccess');
  }

}
