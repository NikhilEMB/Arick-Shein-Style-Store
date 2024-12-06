import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Events, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-referred-users-modal',
  templateUrl: './referred-users-modal.page.html',
  styleUrls: ['./referred-users-modal.page.scss'],
})
export class ReferredUsersModalPage implements OnInit {
  users;
 selectedUserId;
  constructor(private events: Events, private router: Router, private modalController: ModalController,) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.initializeSubscriptions();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('user:publishUserDetails', (userDetails) => {
      this.close();
      const navigationExtras: NavigationExtras = {
        state: {
          uid: this.selectedUserId,
          udata: userDetails
        }
      };
      this.router.navigate(['admin-allusers-details'], navigationExtras);
    });
  }

  removeSubscriptions() {
    this.events.unsubscribe('user:publishUserDetails');
  }
  close() {
    this.modalController.dismiss();
  }

  goToUser(userId){
    this.selectedUserId = userId;
    this.events.publish('user:getUserDetails', userId);
  }

}
