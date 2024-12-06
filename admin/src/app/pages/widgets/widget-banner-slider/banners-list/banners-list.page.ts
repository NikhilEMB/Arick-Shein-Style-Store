import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
@Component({
  selector: 'app-banners-list',
  templateUrl: './banners-list.page.html',
  styleUrls: ['./banners-list.page.scss'],
})
export class BannersListPage implements OnInit {
widgetList:any
  constructor(private events: Events) { }


  ngOnInit() {
  }

  ionViewWillEnter() {
    
  }

  addNewSlide(){
    
  }

}
