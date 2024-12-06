import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  imgs: any;
  showLoader: boolean = true;
  @Input() index: number;
  sliderOpts = {
    initialSlide: 0,
    zoom: {
      maxRatio: 3
    },
    spaceBetween: 10,
    preloadImages: false,
    lazy: true,
    fadeEffect: {
      crossFade: true
    },
  }
  spliced: boolean = false;
  loadingUrl: string = 'assets/img/img-modal-loading.gif';
  // @ViewChild('slides', {static: true}) slides: IonSlides;
  constructor(private modalController: ModalController) {
  }

  ngOnInit() {

    this.sliderOpts.initialSlide = this.index;
    //console.log("index:"+this.index);
    //console.log('imgs', this.imgs);
    //console.log('initialIndex', this.index);
    setTimeout(() => {
      this.showLoader = false;
    }, 2000);
  }
  spliceFirstImg() {
    if(this.spliced === false) {
      //console.log('in spliceFristImg');
      this.imgs.splice(0, 1);
      this.spliced = true;
    }
  }
  // setShowLoader() {
    
  // }
  // ionViewWillEnter(){
  //   //console.log('in image modal enter', this.index);
  //   this.slides.slideTo(this.index, 0).then(() => {
  //   setTimeout(() => {
  //   }, 250);
  //   });
  //   }

  close() {
    this.modalController.dismiss();
  }

}
