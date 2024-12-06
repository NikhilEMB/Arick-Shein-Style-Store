import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-complete',
  templateUrl: './request-complete.page.html',
  styleUrls: ['./request-complete.page.scss'],
})
export class RequestCompletePage implements OnInit {

  requestData: any;
  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.requestData = this.router.getCurrentNavigation().extras.state.requestData;
      }
    });
  }

  ngOnInit() {
  }

}
