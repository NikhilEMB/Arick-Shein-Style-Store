import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss'],
})
export class ProductTypeComponent implements OnInit {

  quotationFeature = false
  appointmentFeature = false

  constructor(private modalController: ModalController, private router: Router, private configService: ConfigService) { }

  ngOnInit() {
    this.quotationFeature = this.configService.environment.RFQFeature;
    this.appointmentFeature = this.configService.environment.appointmentFeature
  }

  gotoProduct(type){
    this.closeModal()
    const navigationExtras: NavigationExtras = {
      state: {
        type: type
      }
    };
    this.router.navigate(['new-product'], navigationExtras);
  }

  gotoAppointment(){
    this.closeModal()
    this.router.navigate(['appointment']);
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
