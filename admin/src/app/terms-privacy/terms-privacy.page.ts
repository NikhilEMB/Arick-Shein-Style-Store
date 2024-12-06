import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-terms-privacy',
  templateUrl: './terms-privacy.page.html',
  styleUrls: ['./terms-privacy.page.scss'],
})
export class TermsPrivacyPage implements OnInit {

  constructor(private events: Events) { }
  termsContent: string = '';
  privacyContent: string = '';
  ngOnInit() {
    this.initializeSubscriptions();
    this.events.publish('admin-settings:getTermsAndPrivacyData');
  }
  ngOnDestroy() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('admin-settings:publishTermsAndPrivacyData', (data) => {
      if(data) {
        this.termsContent = data.terms;
        this.privacyContent = data.privacy;
      }
    });
  }
  removeSubscriptions() {
    this.events.subscribe('admin-settings:publishTermsAndPrivacyData');
  }

}
