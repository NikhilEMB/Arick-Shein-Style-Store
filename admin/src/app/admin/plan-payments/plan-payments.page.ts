import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Events, AlertController, LoadingController, ModalController} from '@ionic/angular';
import { AddOnsPage } from 'src/app/admin/plan-payments/add-ons/add-ons.page';

@Component({
  selector: 'app-plan-payments',
  templateUrl: './plan-payments.page.html',
  styleUrls: ['./plan-payments.page.scss'],
})
export class PlanPaymentsPage implements OnInit {

  currentFeatures:any
  planSelected:string=""
  showFeature="none"
  totalAmount=0
  taxPercent=18
  taxAmount=0
  selectedAmount=0
  liteAmount=0
  plusAmount=0
  premiumAmount=0
  liteAmountYearly=5000
  plusAmountYearly=10000
  premiumAmountYearly=20000

  constructor(private events: Events, private router: Router, private alertController: AlertController, 
    private loadingController: LoadingController, private modalController: ModalController) { }

  ngOnInit() {
    this.liteAmount=this.liteAmountYearly
    this.plusAmount=this.plusAmountYearly
    this.premiumAmount=this.premiumAmountYearly
    // this.firebaseService.currentPlan.subscribe(data => {
    //   this.currentFeatures=data
    //   this.showDetails()
    // })
  }

  changeAmount(name){
    this.modalController.create({
      component: AddOnsPage,
      cssClass: 'custom-modal',
      componentProps: {
      }
    })
      .then(modalEl => {modalEl.present();
    });
    
  }

  gotoDetails(planName){
    // this.firebaseService.getPlans(planName)
    this.planSelected=planName
  }

  showDetails(){
    this.showFeature="block"
  }

  closeFeature(){
    this.showFeature="none"
  }

  changePrice(){
  }

  gotoCompletePayment() {
    this.router.navigate(['/complete-payment']);
  }

}
