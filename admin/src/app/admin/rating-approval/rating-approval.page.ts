import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Events} from '@ionic/angular';
import { LabelService } from 'src/app/services/label/label.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-rating-approval',
  templateUrl: './rating-approval.page.html',
  styleUrls: ['./rating-approval.page.scss'],
})
export class RatingApprovalPage implements OnInit {

  SHARED_LABELS: any;
  ALL_VENDORS_LABELS: any;
  headerText: any;
  isMultiVendorActive = false;
  ratingData = [];

  constructor(private events: Events,
    private labelService: LabelService,
    private router: Router,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.ALL_VENDORS_LABELS = this.labelService.labels['ALL_VENDORS'];
    this.headerText = this.ALL_VENDORS_LABELS['header_text'];
    this.initializeSubscriptions();
    this.events.publish('rating-approval:getRatings');
  }

  initializeSubscriptions() {
    this.events.subscribe('rating-approval:getRatingsSuccess', (data) => 
      {
        this.ratingData = data
        console.log(this.ratingData)
        if (this.sharedService.loading) {
          this.sharedService.loading.dismiss();
        }
      });
    }

}
