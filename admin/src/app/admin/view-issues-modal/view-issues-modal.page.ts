import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { SupportService } from 'src/app/services/support/support.service';

@Component({
  selector: 'app-view-issues-modal',
  templateUrl: './view-issues-modal.page.html',
  styleUrls: ['./view-issues-modal.page.scss'],
})
export class ViewIssuesModalPage implements OnInit {
  supportTypeData: any;
  supportShowPage: number;
  loading:any;
  comment:any;
  allComment: any;
  newComment: any = {
    author: '',
    postedAt: '',
    msg: '',
    source: 'admin pannel'
  };
  constructor(private modalController: ModalController,private supportService: SupportService,
                private loadingController: LoadingController) { }

  ngOnInit() {
    console.log(this.supportTypeData);
    console.log(this.supportShowPage);
    this.getAllComment();
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
    window.open(this.supportTypeData.attachments.pdfUrl);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'please_wait',
      duration: 50000
    });
    await this.loading.present();
  }

  async hideLoading(){
    if(this.loading){
      this.loading.dismiss();
    }
  }

  async onClickAddComment(){
    await this.presentLoading();
    await this.addComment();
    await this.getAllComment();
    this.hideLoading();
  }

  async addComment(){
    this.newComment.author = 'admin';
    this.newComment.postedAt = new Date();
    if(this.supportShowPage == 0){
      this.comment = await this.supportService.addComment('issues',this.supportTypeData.id,this.newComment).then(res => {
        this.newComment.source = '';
        this.newComment.msg = '';
        this.newComment.author = '';
        this.newComment.postedAt = ''
        // this.modalController.dismiss('call_data');
      }).catch(error => {
        console.log(error);
      });
    }

    if(this.supportShowPage == 1){
      this.comment = await this.supportService.addComment('queries',this.supportTypeData.id,this.newComment).then(res => {
        this.newComment.source = '';
        this.newComment.msg = '';
        this.newComment.author = '';
        this.newComment.postedAt = ''
        // this.modalController.dismiss('call_data');
      }).catch(error => {
        console.log(error);
      });
    }

    if(this.supportShowPage == 2){
      this.comment = await this.supportService.addComment('requirements',this.supportTypeData.id,this.newComment).then(res => {
        this.newComment.source = '';
        this.newComment.msg = '';
        this.newComment.author = '';
        this.newComment.postedAt = ''
        // this.modalController.dismiss('call_data');
      }).catch(error => {
        console.log(error);
      });
    }
  
  }

  async getAllComment(){
    if(this.supportShowPage == 0){
      this.allComment = await this.supportService.getAllComment('issues',this.supportTypeData.id);
      console.log('comment',this.allComment); 
    }else if(this.supportShowPage == 1){
        this.allComment = await this.supportService.getAllComment('queries',this.supportTypeData.id);
        console.log('comment',this.allComment); 
    }else if(this.supportShowPage == 2){
        this.allComment = await this.supportService.getAllComment('requirements',this.supportTypeData.id);
        console.log('comment',this.allComment);     
    }
   
    
  }
  dismissModal() {
    this.modalController.dismiss();
  }

}
