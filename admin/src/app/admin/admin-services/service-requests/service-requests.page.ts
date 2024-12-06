import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
//import { CallNumber } from '@ionic-native/call-number/ngx';
import * as moment from 'moment';
@Component({
  selector: 'app-service-requests',
  templateUrl: './service-requests.page.html',
  styleUrls: ['./service-requests.page.scss'],
})
export class ServiceRequestsPage implements OnInit {
  requests = [];
  showLoader = true;
  isPending = false;
  isCompleted = false;
  constructor(private events: Events,
              private router: Router,
              //private callNumber: CallNumber
              ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initializeSubscriptions();
    this.events.publish('services-feature:getAllRequests');
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  getDateTimeFormat(date){
    return moment(date).format('MMM D, YYYY hh:mm a');
  }

  initializeSubscriptions() {
    this.events.subscribe('services-feature:publishAllRequests', (requests) => {
      this.checkRequests(requests);
      this.requests = requests;
      console.log('this.requests', this.requests);
      this.showLoader = false;
    });
  }

  checkRequests(reqs) {
    reqs.forEach(r => {
      if (r.status === 'Pending') {
        this.isPending = true;
      }
      if (r.status === 'Completed') {
        this.isCompleted = true;
      }
    });
  }

  callUser(phone: string) {
   /* this.callNumber.callNumber(phone, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));*/
  }

  viewDetails(req: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        requestData: req
      }
    };
    this.router.navigate(['request-complete'], navigationExtras);
  }

  removeSubscriptions() {
    this.events.unsubscribe('services-feature:publishAllRequests');
  }

}
