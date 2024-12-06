import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { CustomCodeService } from 'src/app/services/customCode/custom-code.service';

@Component({
  selector: 'app-custom-code',
  templateUrl: './custom-code.page.html',
  styleUrls: ['./custom-code.page.scss'],
})
export class CustomCodePage implements OnInit {

  loading: any;
  settings:any = {
    meta: null,
    scripts: null,
    css: null,
    head: null,
    body: null,
  }

  constructor(private customCodeService: CustomCodeService,private loadingController: LoadingController,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async ionViewDidEnter(){
   let data = await this.customCodeService.getCustomCode()
   if (data){
     this.settings = data
   }
  }

  async saveSettings(){
    let saveResult = await this.customCodeService.setCustomCode(this.settings)
    if (saveResult){
      this.presentAlert('Custom Code Saved Successfully!')
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Please Wait...",
    });
    await this.loading.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['ok']
    });

    await alert.present();
  }


}
