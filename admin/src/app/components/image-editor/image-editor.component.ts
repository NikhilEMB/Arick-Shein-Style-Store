import { Component, OnInit } from '@angular/core'
import { CroppedEvent } from 'ngx-photo-editor'
import { createClient } from 'pexels'
import { Renderer2 } from '@angular/core'
import { LoadingController, ModalController } from '@ionic/angular'
import { searchImages } from 'pixabay-api'
import Flickr from 'flickr-sdk'
import { createApi } from 'unsplash-js'
import { ConfigService } from 'src/app/services/config/config.service'
@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss',],
})
export class ImageEditorComponent
  implements OnInit {
  constructor(private renderer: Renderer2, private modal: ModalController, private configService: ConfigService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.HWValues = {
      height: this.aspectRatioHeightVal,
      width: this.aspectRatioWidthVal
    }
    this.toggleState = localStorage.getItem('toggleState');
    if (this.toggleState) {
      if (this.toggleState == 'true') {
        this.newSettings()
      } else {
        this.revertSettings()
      }
    }
    this.format = this.type;
    if (this.configService.environment.productImageLimit) {
      if ((this.configService.environment.productImageLimit === undefined) || (this.configService.environment.productImageLimit === null)) {
        this.prodUploadLimit = 5
      } else {
        this.prodUploadLimit = this.configService.environment.productImageLimit
      }
    }
    console.log('productImageLimit : ', this.configService.environment.productImageLimit);
    console.log('currentLimit : ', this.currentLimit);
    if (this.currentLimit && (this.currentLimit !== 0)) {
      this.prodUploadLimit = this.prodUploadLimit - this.currentLimit;
    }
    console.log('productImageLimit New :', this.prodUploadLimit);
  }
  prodUploadLimit: any
  currentLimit: any
  HWValues: any;
  toggleState: any;
  format: any
  type: any;
  tempProdImg: any;
  productImages: any[] = [];
  base64Prod: any[] = [];
  prodImgLength: any = 0;
  base64ProdLength: any = 0;
  imgSize: any = this.configService.environment.orderUploadedDocImgsLimit;
  loading: any;

  fileName: any
  imgSpace: boolean = false
  imageChangedEvent: any
  base64: any
  fileSize: any
  aspectRatioWidthVal: any = ''
  aspectRatioHeightVal: any = ''
  viewModeVal: any = 0
  // customWidthVal: any = 500
  customWidthVal: any;
  customImageURL: any
  customImageQualityVal: any = 100
  renderedName: any
  renderedSize: any
  renderedMimeType: any

  // source selection
  currentSelection: any = 'Local'

  // pexels
  photos: any
  searchQuery: any = ''
  id: any
  photographer: any

  // pixabay
  photosPixabay: any
  searchQueryPixabay: any = ''
  idPixabay: any
  userPixabay: any

  // Flickr
  photosFlickr: any
  searchQueryFlickr: any = ''
  idFlickr: any
  userFlickr: any
  customURLFlickr: any = ''

  // Unsplash
  photosUnsplash: any
  searchQueryUnsplash: any = ''
  idUnsplash: any
  userUnsplash: any

  // commonURL [src]
  commonURL: any = '';

  // webp avoidance
  fileType: any = '';
  alertCount: any = 0;

  // space test

  fileChangeEvent(event: any) {
    if (this.format != 'product') {
      console.log('File Name :', event.target.files[0].type.toLowerCase())
      this.fileType = event.target.files[0].type.toLowerCase()
      if (this.fileType === 'image/webp') {
        alert('Image(s) of [ webp ] format are unsupported!');
      } else if (this.fileType === 'image/gif') {
        console.log('gif event : ', event);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
          this.base64 = reader.result
          this.imageFinalize('normal')
        }
      } else {
        this.imageChangedEvent = event
        this.fileName = event.target.files[0].name
        console.log('File Name :', event.target.files[0].name)
      }
    }
    if (this.format == 'product') {
      if (event.target.files.length > this.prodUploadLimit) {
        alert(`You can select only a maximum of ${this.prodUploadLimit} images per product!`);
      } else {
        for (let i = 0; i < event.target.files.length; i++) {
          this.fileType = event.target.files[i].type.toLowerCase()
          console.log('fileType: ', this.fileType);
          if (event.target.files[i].size > 2097152) {
            alert('Image(s) exceeding 2MB in size are not permissible!')
            return
          }
          if (this.fileType === 'image/webp') {
            this.alertCount = this.alertCount + 1;
            alert(`Selected image [ ${event.target.files[i].name} ] is of unsupported [ .webp ] format!`);
          } else {
            console.log('ac : ', this.alertCount);

            this.prodImgLength = event.target.files.length - this.alertCount;
            // this.productImages.push(event.target.files[i]);
            // this.tempProdImg = event.target.files[2]
            const reader = new FileReader();
            console.log('event : ', event)
            reader.readAsDataURL(event.target.files[i]);
            reader.onload = (event) => {
              // this.tempProdImg = event.target.result;
              // this.productImages.push(event.target.result);
              this.productImages.push(reader.result);
              // console.log('itr ', i, ' :', event.target.result);
              this.prodImgLength = this.productImages.length
            }
            this.alertCount = 0;
          }
        }
        console.log('Product Images :', this.productImages);
        console.log('Event :', event);
        this.productImages = [];
      }
    }
    // if (this.fileName !== '') {
    //   this.imgSpace = true;
    // }
  }

  prodImgSelector(id: any) {
    this.tempProdImg = id;
  }

  prodImgSelectorDel(i: any) {
    this.prodImgLength = this.prodImgLength - 1;
    this.productImages.splice(i, 1);
  }

  prodImgDeletor(i: any) {
    console.log('val i :', i);
    this.base64Prod.splice(i, 1);
    console.log('BS64 :', this.base64Prod);
  }

  async imageCropped(event: CroppedEvent) {
    await this.presentLoading()
    this.base64 = event.base64
    this.base64Prod.push(event.base64);
    console.log('ic ev :', event);
    console.log('Rendered File Info :', event.file)
    this.renderedName = event.file.name
    if (event.file.size === undefined) {
      this.renderedSize = 'NA'
    } else {
      var x = event.file.size
      this.renderedSize = x / 1000 + ' kb'
    }
    this.renderedMimeType = event.file.type
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  loadImageFailed() {
    console.log('error')
  }

  customAspectRatio() {
    console.log('Aspect Ratio :', this.aspectRatioWidthVal + '/' + this.aspectRatioHeightVal)
  }

  customViewMode() {
    console.log('View Mode :', this.viewModeVal)
  }

  customWidth() {
    console.log('Custom Width :', this.customWidthVal)
  }

  customImageQuality() {
    console.log('Custom Image Quality :', this.customImageQualityVal)
  }

  localConfig() {
    this.currentSelection = 'Local'
    console.log('Local Configurator Triggered')
  }

  pexelsConfig() {
    this.currentSelection = 'Pexels'
    console.log('Pexels Configurator Triggered')
  }

  async pexelsSearch() {
    const client = createClient('563492ad6f91700001000001a5331d5494ca4823a28b4ebc45884293')
    await this.presentLoading()
    if (this.searchQuery === '') {
      alert('Enter Image Category')
    } else {
      try {
        const query = this.searchQuery
        client.photos.search({ query, per_page: 100, }).then((photos: any) => {
          this.photos = photos
          console.log('Pexels Response :', photos)
        }
        )
      } catch (error) {
        console.error('Bad Request :', error)
      }
    }
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  downloadImage(data: any) {
    let link = this.renderer.createElement('a')
    link.setAttribute('type', 'hidden')
    link.setAttribute('target', '_blank')
    link.setAttribute('href', 'https://images.pexels.com/photos/1049622/pexels-photo-1049622.jpeg')
    link.setAttribute('download', 'image')
    document.body.appendChild(link)
    link.click()
    link.remove()
    console.log('D lINK :', data)
  }

  modalClose() {
    this.modal.dismiss()
  }

  imageFinalize(type: any) {
    // if (this.format != 'product') {
    //   this.modal.dismiss(this.base64)
    // } else {
    //   this.modal.dismiss(this.base64Prod)
    // }
    if (type == 'normal') {
      this.modal.dismiss(this.base64)
    }
    if (type == 'selected') {
      this.modal.dismiss(this.productImages)
    }
    if (type == 'edited') {
      if (this.base64Prod.length > this.prodUploadLimit) {
        alert(`More than ${this.prodUploadLimit} images are not allowed per product`)
      } else {
        this.modal.dismiss(this.base64Prod)
      }
    }

  }

  async customURLPassing(data: any) {
    await this.presentLoading()
    this.commonURL = data;
    this.currentSelection = 'Local';
    this.customImageURL = this.commonURL
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  async customURLPassingFlickr(i: any) {
    await this.presentLoading()
    let url = `https://farm${i.farm}.staticflickr.com/${i.server}/${i.id}_${i.secret}.jpg`;
    console.log('Flickr URL Parse :', url);
    this.customImageURL = url;
    this.currentSelection = 'Local';
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  pixabayConfig() {
    this.currentSelection = 'Pixabay'
    console.log('Pixabay Configurator Triggered')
  }

  async pixabaySearch() {
    const AUTH_KEY = '24527026-b7ee011c5982e5c710b91f05f'
    await this.presentLoading()
    if (this.searchQueryPixabay === '') {
      alert('Enter Image Category')
    } else {
      try {
        searchImages(AUTH_KEY, this.searchQueryPixabay, { per_page: 100 }).then((res: any) => {
          this.photosPixabay = res
          console.log('Pixabay Response :', this.photosPixabay)
        })
      } catch (error) {
        console.error('Bad Request :', error)
      }
    }
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  flickrConfig() {
    this.currentSelection = 'Flickr'
    console.log('Flickr Configurator Triggered')
  }

  async flickrSearch() {
    const API_KEY = '5426ed48716c629f39112d2e5affb14a'
    await this.presentLoading()
    let flickr = new Flickr(API_KEY)
    flickr.photos.search({ text: this.searchQueryFlickr, per_page: 100, }).then((res: any) => {
      this.photosFlickr = res.body.photos.photo
      console.log('Flick Response :', this.photosFlickr)
    })
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  unsplashConfig() {
    this.currentSelection = 'Unsplash'
    console.log('Unsplash Configurator Triggered')
  }

  async unsplashSearch() {
    const unsplashApi = createApi({
      accessKey: 'ujkBWCd28NE5cnTHnGqgiB1buIi-ShV8EqqEYwuuCoE',
    });
    await this.presentLoading()
    unsplashApi.search.getPhotos({
      query: this.searchQueryUnsplash,
      // page: 1,
      perPage: 100,
      // color: 'green',
      // orientation: 'portrait',
    }).then((res: any) => {
      this.photosUnsplash = res.response.results
      console.log('Unsplash Response :', this.photosUnsplash);
    })
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  cropAreaToggle(ev: any) {
    console.log('click :', ev);
    ev.target.checked ? this.newSettings() : this.revertSettings();
  }

  newSettings() {
    console.log('checked');
    this.aspectRatioWidthVal = 0;
    this.aspectRatioHeightVal = 0;
    localStorage.setItem('toggleState', 'true');
  }

  revertSettings() {
    console.log('unchecked');
    this.aspectRatioWidthVal = this.HWValues.width;
    this.aspectRatioHeightVal = this.HWValues.height;
    localStorage.setItem('toggleState', 'false');
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    })
    await this.loading.present();
  }
}
