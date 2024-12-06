import { Component, OnInit } from '@angular/core';
//import { CallNumber } from '@ionic-native/call-number/ngx';
import { environment } from 'src/environments/environment';
import { Events } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  supportPhone: string;
  planDesc: string;
  planStartDate: any;
  showLoader: boolean = true;
  constructor(//private callNumber: CallNumber,
              private events: Events,private configService: ConfigService) { }

  ngOnInit() {
    this.initializeSubscriptions();
    this.supportPhone = this.configService.environment.supportPhone;
    this.events.publish('admin-settings:getPlanDetails');
  }
  ngOnDestroy() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('admin-settings:publishPlanDetails', (data) => {
      if(data) {
        this.planDesc = data.description;
        this.planStartDate = data.startDate;
      }
      this.showLoader = false;
    });
  }

  callSupport() {
   /* this.callNumber.callNumber(this.supportPhone, true)
    .then(res =>  console.log('Launched dialer!', res))
    .catch(err =>  console.log('Error launching dialer', err));*/
  }

  removeSubscriptions() {
    this.events.unsubscribe('admin-settings:publishPlanDetails');
  }

}
