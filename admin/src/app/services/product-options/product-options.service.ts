import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ProductOptionsService {

  constructor(private events: Events,
              private afs: AngularFirestore,
              private fbStorage: AngularFireStorage, private sharedService: SharedService) { }

  initializeSubscriptions() {
    this.events.subscribe('product-options:getAllProductOptions', (pid) => {
      this.getAllProductOptions(pid);
    });
    this.events.subscribe('product-options:deleteProductOption', (oid, pid) => {
      this.deleteProductOption(oid, pid);
    });
    this.events.subscribe('product-options:editProductOption', (editdata, pid, oid, listOfImages, barcode, needToUpdateImages) => {
      this.editProductOption(editdata, pid, oid, listOfImages, barcode, needToUpdateImages);
    });
    this.events.subscribe('product-options:getOptionData', (pid, oid) => {
      this.getOptionData(pid, oid);
    });
  }

  async getAllProductOptions(pid) {
    try {
      const optionsRef = this.afs.collection('products').doc(pid).collection('options');
      const optionsSnap = optionsRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      const options = await optionsSnap.pipe(first()).toPromise();
      this.events.publish('product-options:publishAllProductOptions', options);
    } catch (error) {
      console.dir(error);
    }
  }

  async deleteProductOption(oid: string, pid: string) {
    try {
      await this.afs.collection('products').doc(pid).collection('options').doc(oid).delete();
      this.events.publish('product-options:getAllProductOptions', pid);
      this.events.publish('product-options:deleteProductOptionSuccess');
    } catch (error) {
      console.dir(error);
    }
  }

  async editProductOption(editdata, pid, oid, listOfImages, barcode, needToUpdateImages) {
    console.log('editProduct data...', editdata, listOfImages);
    let colorObj: any = {};

    if(editdata.color.hasOwnProperty('image') && (editdata.color.image.includes('data:image/jpeg;base64,')||editdata.color.image.includes('data:image/jpg;base64,')||editdata.color.image.includes('data:image/png;base64,')||editdata.color.image.includes('data:image/gif;base64,'))) {
        colorObj = {...editdata.color};
        delete editdata.color.image;
    }
    if(colorObj.hasOwnProperty('image')) {
      console.log('colorObj', colorObj);
      const imgRef: any = this.fbStorage.ref(`productOptions/${pid}/options/${oid}/color/` + new Date().getTime().toString() + '.png');
      await imgRef.putString(colorObj.image, 'data_url');
      const downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
      editdata['color'] = {
        image: downloadURL,
        name: colorObj.name,
        code: colorObj.code
      }
    }
    if(barcode !== '') {
      const imgRef: any = this.fbStorage.ref(`productOptions/${pid}/options/${oid}/barcode/` + new Date().getTime().toString() + '.png');
      await imgRef.putString(barcode, 'data_url');
      const downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
      editdata["barcode"] = downloadURL;
    }
    if(editdata.additionalInfo && editdata.additionalInfo['sizeChart'].active) {
      if (
          editdata.additionalInfo['sizeChart'].img.url.includes('data:image/jpeg;base64,') || 
          editdata.additionalInfo['sizeChart'].img.url.includes('data:image/jpg;base64,') || 
          editdata.additionalInfo['sizeChart'].img.url.includes('data:image/png;base64,') || 
          editdata.additionalInfo['sizeChart'].img.url.includes('data:image/gif;base64,')) {
            const imgRef: any = this.fbStorage.ref(`productOptions/${pid}/options/${oid}/sizeChart/` + new Date().getTime().toString() + '.png');
            await imgRef.putString(editdata.additionalInfo['sizeChart'].img.url, 'data_url');
            const downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
            editdata.additionalInfo['sizeChart'].img.url = downloadURL;
      }
    }
    if(!editdata.images.length && !listOfImages.length) {
      editdata['coverPic'] = {
        url: 'assets/img/placeholder-img.jpg',
        mob: 'assets/img/placeholder-img.jpg',
        thumb: 'assets/img/placeholder-img.jpg'
      }
    } 

    const {images, ...data} = editdata;

    await this.afs.collection('products').doc(pid).collection('options').doc(oid).update({...data});

    if(needToUpdateImages) {
      await this.afs.collection('products').doc(pid).collection('options').doc(oid).update({images: images});
    }
    if(listOfImages.length !== 0) {
      try {
        await this.addimgtoFirebase(pid, oid, listOfImages);
        this.events.publish('product-options:editSuccess', 'Success', 'Product edited successfully!');
      } catch (error) {
        console.log(error);
        this.events.publish('product-options:editFailure', 'Failure', 'Product not edited successfully!');
      }
    } else if(!editdata.images.length && !listOfImages.length) {
      await this.afs.collection('products').doc(pid).collection('options').doc(oid).update({
        coverPic: {
          url: 'assets/img/placeholder-img.jpg',
          mob: 'assets/img/placeholder-img.jpg',
          thumb: 'assets/img/placeholder-img.jpg'
        }
      });
      this.events.publish('product-options:editSuccess', 'Success', 'Product edited successfully!');
    } 
    else {
      console.log('in else part');
      this.events.publish('product-options:editSuccess', 'Success', 'Product edited successfully!');
    }
  }

  async addimgtoFirebase(pid, oid, imgdataAndSize) {
    const image: any = {
      url: null,
      size: null,
      uploadedAt: null,
      productId: null,
      optionId: null
    };
    for (let i = 0; i < imgdataAndSize.length; i++) {
      image.url = '';
      image.size = imgdataAndSize[i].size;
      image.uploadedAt = new Date();
      image.productId = pid;
      image.optionId = oid;
      const mediaDocRef = await this.afs.collection('media').doc('images').collection('productOptions').add(image);
      let imgType  = this.sharedService.getImageType(imgdataAndSize[i].base64Img);
      const imgRef: any = this.fbStorage.ref(`productOptions/${pid}/options/${oid}/images/` + mediaDocRef.id + imgType);
      await imgRef.putString(imgdataAndSize[i].base64Img, 'data_url');
      if (imgdataAndSize[i].cover === true) {
        const downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
        this.afs.collection('products').doc(pid).collection('options').doc(oid).update({coverPic: {imageId: mediaDocRef.id, url: downloadURL}});
      }
    }
  }

  async getOptionData(pid: string, oid: string) {
    try {
      const optData = await this.afs.collection('products').doc(pid).collection('options').doc(oid).valueChanges().pipe(first()).toPromise();
      const productOptions: any = await this.afs.collection('products').doc(pid).valueChanges().pipe(first()).toPromise();
      this.events.publish('product-options:publishOptionData', optData, productOptions.options);
    } catch (error) {
      console.dir(error);
    }
  }
}


