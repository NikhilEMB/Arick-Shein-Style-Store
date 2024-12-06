import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { SupportService } from 'src/app/services/support/support.service';

@Component({
  selector: 'app-add-issues-modal',
  templateUrl: './add-issues-modal.page.html',
  styleUrls: ['./add-issues-modal.page.scss'],
})
export class AddIssuesModalPage implements OnInit {

  addData: any;
  supportType: string;
  addSupportDetails: any = {
    title: '',
    description: '',
    createdAt: '',
    status: '',
    attachments: {
      imageUrl: [],
      pdfUrl: ''
    },
  }

  loading: any;
  message: string;
  constructor(private modalController: ModalController, public supportService: SupportService,
              public loadingController: LoadingController) { }

  ngOnInit() {
    console.log(this.supportType);
  }

  imgZoom(img: any) {
    this.modalController.create({
      component: ImageModalPage,
      cssClass:'photo-modal-class',
      componentProps: {
        imgs: [{url: img}],
        index: 0
      }
    }).then(modal => modal.present());
  }

  openDocument(){
    window.open(this.addSupportDetails.attachments.pdfUrl);
  }

  openDocSelected(files: FileList, choice) {
    if(choice === 'img'){
      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(files.item(i))
        reader.onload = (event: any) => { // called once readAsDataURL is completed
          let base64: any = event.target.result;
          this.addSupportDetails.attachments.imageUrl.push(base64);
        }
      }}
      else if(choice === 'doc'){
        this.addSupportDetails.attachments.pdfUrl = files[0];
      } 
    }

  async createIssue(){
    console.log(this.addSupportDetails);
    this.addSupportDetails.createdAt = new Date();
    this.addSupportDetails.status = 'pending';
    console.log(this.addSupportDetails);
    if(this.supportType === 'issue'){
      // console.log(this.addSupportDetails);
      const success = await this.supportService.addDetailsOfSupport(this.addSupportDetails,'issue')
      if(success){
        this.addSupportDetails.title = '',
        this.addSupportDetails.description = '',
        this.addSupportDetails.createdAt = '',
        this.addSupportDetails.status = '',
        this.modalController.dismiss('call_data');
      }
        
      }
    
    else if(this.supportType === 'queries'){
      this.addData = await this.supportService.addDetailsOfSupport(this.addSupportDetails, 'queries').then(res => {
        this.addSupportDetails.title = '',
        this.addSupportDetails.description = '',
        this.addSupportDetails.createdAt = '',
        this.addSupportDetails.status = '',
        this.modalController.dismiss('call_data');
      }).catch(err => {
        console.log(err);
      })
    }

    else if(this.supportType === 'requirements'){
      this.addData = await this.supportService.addDetailsOfSupport(this.addSupportDetails, 'requirements').then(res => {
        this.addSupportDetails.title = '',
        this.addSupportDetails.description = '',
        this.addSupportDetails.createdAt = '',
        this.addSupportDetails.status = '',
        this.modalController.dismiss('call_data');
      }).catch(err => {
        console.log(err);
      })
    }
    

  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'please_wait',
      duration: 5000
    });
    await this.loading.present();
  }

  async hideLoading(){
    if(this.loading){
      this.loading.dismiss();
    }
  }

  async onClickSubmit(){
    await this.presentLoading();
    await this.createIssue();
    this.hideLoading();
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
