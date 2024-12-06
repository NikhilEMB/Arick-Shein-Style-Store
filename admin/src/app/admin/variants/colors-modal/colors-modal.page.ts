import { Component, OnInit } from '@angular/core';
import { ModalController, Events, ActionSheetController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-colors-modal',
  templateUrl: './colors-modal.page.html',
  styleUrls: ['./colors-modal.page.scss'],
})
export class ColorsModalPage implements OnInit {
  searchColors: string = '';
  allColors: any = [];
  showColorsLoader: boolean = true;
  optionsforCamera: CameraOptions;
  colorImg: string = '';
  colorName: string = '';
  colorCode: string = '';
  name: string;
  image: string;
  code: string;
  loading: any;
  constructor(private modalController: ModalController,
              private events: Events,
              private actionSheetController: ActionSheetController,
              private camera: Camera,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.colorName = this.name;
    this.colorImg = this.image;
    this.colorCode = this.code;
  }

  ionViewWillEnter() {
    this.initializeSubscriptions();
    this.events.publish('variants:getAllColors');
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  removeSubscriptions() {
    this.events.unsubscribe('variants:publishAllColors');
    this.events.unsubscribe('variants:deleteColorSuccess');
  }

  initializeSubscriptions() {
    this.events.subscribe('variants:publishAllColors', (colors) => {
      //console.log('colors', colors);
      this.allColors = colors;
      this.showColorsLoader = false;
    });
    this.events.subscribe('variants:deleteColorSuccess', (i) => {
      this.allColors.splice(i, 1);
      this.loading.dismiss();
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }
 

  async openImageActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select any option',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.uploadColorImage('camera');
        }
      }, {
        text: 'Gallery',
        icon: 'image',
        handler: () => {
         this.uploadColorImage('gallery');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  uploadColorImage(type: string) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true
    };
    if(type === 'gallery') {
      options['sourceType'] = 0;
    }
    this.camera.getPicture(options).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.colorImg = base64Image;
     }, (err) => {
      //console.log(err);
    });
  }

  uploadColor(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        let base64Image:any = event.target.result;
        this.colorImg = base64Image;
        
      }
    }
  }

  removeColorImg() {
    this.colorImg = '';
  }

  addColor() {
    const color = {
      name: this.colorName,
      image: this.colorImg,
      code: this.colorCode
    }
    this.modalController.dismiss(color);
  }

  selectColor(color: any) {
    this.colorName = color.name;
    this.colorImg = color.image;
    this.colorCode = color.code;
  }

  async deleteColor(cid, i) {
    await this.presentLoading();
    this.events.publish('variants:deleteColor', cid, i);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait..',
      duration: 2000
    });
    await this.loading.present();
  }

}
