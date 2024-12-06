import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.page.html',
  styleUrls: ['./feature-list.page.scss'],
})
export class FeatureListPage implements OnInit {

  environmentValues:any = ""

  constructor(private configService:ConfigService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.environmentValues = this.configService.environment
  }

}
