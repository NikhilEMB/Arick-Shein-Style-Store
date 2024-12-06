import { Component, OnInit } from '@angular/core';
import { Events} from '@ionic/angular';

@Component({
  selector: 'app-no-user-access',
  templateUrl: './no-user-access.page.html',
  styleUrls: ['./no-user-access.page.scss'],
})
export class NoUserAccessPage implements OnInit {

  constructor(private events: Events) { }

  ngOnInit() {
  }

  logout() {
  
    this.events.publish('auth:logout');
   
  }

}
