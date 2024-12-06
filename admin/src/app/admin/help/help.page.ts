import { Component, OnInit } from '@angular/core';
import { Events, Platform } from '@ionic/angular';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  searchHelpTopic: string = '';
  helpData: any = [];
  showLoader: boolean = true;
  constructor(private events: Events,
              private inAppBrowser: InAppBrowser,
              private platform: Platform) { }

  ngOnInit() {
    this.initilaizeSubscriptions();
    this.events.publish('help:getHelpData');
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  initilaizeSubscriptions() {
    this.events.subscribe('help:publishHelpData', (data) => {
      this.helpData = data;
      this.showLoader = false;
    });
  }

  clearSearchHelpTopic() {
    // //console.log('clicked...');
    this.searchHelpTopic = '';
  }

  watchVideo(id: string) {
    const browser: InAppBrowserObject = this.inAppBrowser.create('https://www.youtube.com/watch/' + id, '_system');
  }
  removeSubscriptions() {
    this.events.unsubscribe('help:publishHelpData');
  }

}
