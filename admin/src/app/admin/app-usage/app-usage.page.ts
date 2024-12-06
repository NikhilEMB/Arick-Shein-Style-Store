import { Events } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-usage',
  templateUrl: './app-usage.page.html',
  styleUrls: ['./app-usage.page.scss'],
})
export class AppUsagePage implements OnInit {
  showLoader = true;
  analytics = [
    {name: 'products', data: {count: 0, total: 0}},
    {name: 'users', data: {count: 0, total: 0}},
    {name: 'sms', data: {count: 0, total: 0}},
    {name: 'emails', data: {count: 0, total: 0}},
  ];
  constructor(private events: Events) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.events.publish('analytics:getProdcutsAnalytics');
    this.events.publish('analytics:getUsersAnalytics');
    this.events.publish('analytics:getSmsAnalytics');
    this.events.publish('analytics:getEmailsAnalytics');
    this.initializeSubscriptions();
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('analytics:prodcutsAnalytics', (data) => {
      this.showLoader = false;
      if (data) {
        console.log('data', data);
        this.analytics[0].data = data;
      }
    });
    this.events.subscribe('analytics:usersAnalytics', (data) => {
      if (data) {
        console.log('data', data);
        this.analytics[1].data = data;
      }
    });
    this.events.subscribe('analytics:smsAnalytics', (data) => {
      if (data) {
        console.log('data', data);
        this.analytics[2].data = data;
      }
    });
    this.events.subscribe('analytics:emailsAnalytics', (data) => {
      if (data) {
        console.log('data', data);
        this.analytics[3].data = data;
      }
    });
  }

  removeSubscriptions() {
    this.events.unsubscribe('analytics:prodcutsAnalytics');
    this.events.unsubscribe('analytics:usersAnalytics');
    this.events.unsubscribe('analytics:smsAnalytics');
    this.events.unsubscribe('analytics:emailsAnalytics');
  }

}
