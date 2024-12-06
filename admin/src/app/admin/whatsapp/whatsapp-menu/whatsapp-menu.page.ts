import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';
import { WhatsappDashboardService } from 'src/app/services/whatsapp-dashboard/whatsapp-dashboard.service';
import { ProductsModalPage } from '../../products-modal/products-modal.page';

@Component({
  selector: 'app-whatsapp-menu',
  templateUrl: './whatsapp-menu.page.html',
  styleUrls: ['./whatsapp-menu.page.scss'],
})
export class WhatsappMenuPage implements OnInit {
  showProductList1 = false;
  showProductList2 = false;

menuEntryPoint = {
  id: 'menu-entry-point',
  bodyText: '',
  footer: '',
  header: {mediaUrl: '', type: ''},
  list: [
    {id: 'menu-button-1', title: '', active: false},
    {id: 'menu-button-2', title: '', active: false},
    {id: 'menu-button-3', title: '', active: false},
  ],
  type: 'button',
}

menuButton1 = {
  id: 'menu-button-1',
  bodyText: '',
  headerText: '',
  list: [],
  type: 'product_list',
  model: 'product'
}

menuButton2 = {
  id: 'menu-button-2',
  bodyText: '',
  headerText: '',
  list: [],
  type: 'product_list',
  model: 'product'
}

menuButton3 = {
  id: 'menu-button-3',
  bodyText: '',
  headerText: '',
  list: [],
  type: 'list',
  listButtonText: 'Select Here',
  model: 'product'
}

menuButton3Model;
menuItems;


  constructor(private whatsappService: WhatsappDashboardService, private sharedService: SharedService, 
    private modalController: ModalController, public alertController: AlertController) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.menuItems = await this.whatsappService.getMenuItems();
    if (this.menuItems && this.menuItems.length) {
      for (const menuItem of this.menuItems) {
        if (menuItem.id == 'menu-entry-point') {
          this.menuEntryPoint = menuItem;
        }
        if (menuItem.id == 'menu-button-1') {
          Object.assign(this.menuButton1, menuItem);
        }
        if (menuItem.id == 'menu-button-2') {
          Object.assign(this.menuButton2, menuItem);
        }
        if (menuItem.id == 'menu-button-3') {
          Object.assign(this.menuButton3, menuItem);
        }
      }
    }
    this.menuButton3Model = this.menuButton3.model;
  }

  async presentProductsModal(alreadyAddedProducts, menuButton){
    let alreadyAddedWAProducts = alreadyAddedProducts;
    // for (let [index,product] of alreadyAddedWAProducts.entries()) {
    //   alreadyAddedWAProducts[index] = this.decodeProductId(product);
    // }
    let model;
    if (menuButton == 'menu-button-1') {
      model = this.menuButton1.model;
    } else if (menuButton == 'menu-button-2') {
      model = this.menuButton2.model;
    }
    const modal = await this.modalController.create({
    component: ProductsModalPage,
    backdropDismiss: false,
    cssClass: "custom-modal",
    componentProps: {
      routeViaWhatsapp: true,
      alreadyAddedWAProducts,
      model
    }
    });
    modal.onDidDismiss()
    .then((res) => {
      if(res.data && res.data.length) {
        console.log('res.data:', res.data);
        if (menuButton == 'menu-button-1') {
          for (const product of this.menuButton1.list) {
            let productId = this.menuButton1.model == 'product' ? product.id : product.id.split('-')[2];
            res.data = res.data.filter(prod => this.encodeProductId(prod) != productId);
            // if (res.data.find(prod => this.encodeProductId(prod) == productId)) {
            //   this.sharedService.presentAlert(`${product.name || product.title} is already added in your list.`);
            //   return;
            // }
          }
          let itemsLength = this.menuButton1.model == 'product' ? 30 : 10;

          if (this.menuButton1.list.length + res.data.length > itemsLength) {
            this.sharedService.presentAlert(`Item List is exceeding ${itemsLength}. Max ${itemsLength} items are allowed.`);
            return;
          }
          for(let prod of res.data){
            prod.id = this.encodeProductId(prod);
            if (this.menuButton1.model == 'service') {
              this.menuButton1.list.push({id: `send-service-${prod.id}`, title: prod.name});
            } else{
              this.menuButton1.list.push(prod);
            }
            console.log('this.menuButton1.list:', this.menuButton1.list);
          }
        }
        if (menuButton == 'menu-button-2') {
          for (const product of this.menuButton2.list) {
            let productId = this.menuButton2.model == 'product' ? product.id : product.id.split('-')[2];
            res.data = res.data.filter(prod => this.encodeProductId(prod) != productId);
            // if (res.data.find(prod => this.encodeProductId(prod) == productId)) {
            //   this.sharedService.presentAlert(`${product.name} is already added in your list.`);
            //   return;
            // }
          }
          let itemsLength = this.menuButton2.model == 'product' ? 30 : 10;
          if (this.menuButton2.list.length + res.data.length > itemsLength) {
            this.sharedService.presentAlert(`Item List is exceeding ${itemsLength}. Max ${itemsLength} items are allowed.`);
            return;
          }
          for(let prod of res.data){
            prod.id = this.encodeProductId(prod);
            if (this.menuButton2.model == 'service') {
              this.menuButton2.list.push({id: `send-service-${prod.id}`, title: prod.name});
            } else{
              this.menuButton2.list.push(prod);
            }
            console.log('prod:', prod);
          }
        }
      }
  });
    await modal.present();
  }

  async changeListType(value, btn){
    console.log(`value:${value}, btn:${btn}`);
    if (btn == 'menu-button-1') {
      this.menuButton1.type = value == 'product' ? 'product_list' : 'list';
      this.menuButton1.list = [];
    } else if(btn == 'menu-button-2'){
      this.menuButton2.type = value == 'product' ? 'product_list' : 'list';
      this.menuButton2.list = [];
    }
  }
  
  removeProduct(btnProducts, i) {
    if (btnProducts == 'btn1Products') {
      this.menuButton1.list.splice(i,1);
    } else {
      this.menuButton2.list.splice(i, 1);
    }
}

async deleteContent(){
  const alert = await this.alertController.create({
      message: `Changing the list type of Menu Button 3 will lead to deletion of its content (if any). Are you sure you want to continue ?`,
      buttons: [{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
              // //console.log('Confirm Cancel: blah');
          }
      }, {
          text: 'Okay',
          handler: () => {
              this.proceedToSave(true);
          }
      }]
  });
  await alert.present();
}

async save(){
  console.log('this.menuButton3Model:',this.menuButton3Model);
  console.log('this.menuButton3.model:',this.menuButton3.model);
  if (this.menuButton3Model != this.menuButton3.model) {
    await this.deleteContent();
  } else{
    await this.proceedToSave(false);
  }
}

async proceedToSave(deleteMenu3Items){  
  this.menuButton1.headerText = this.menuEntryPoint.list[0].title;
  this.menuButton2.headerText = this.menuEntryPoint.list[1].title;
  this.menuButton3.headerText = this.menuEntryPoint.list[2].title;
  const isValid = this.checkValidation();
  if (!isValid) {
    this.sharedService.presentAlert('Please fill all required fields');
    return
  }
  this.sharedService.presentLoading();
  this.menuButton1.headerText = this.menuEntryPoint.list[0].title;
  this.menuButton2.headerText = this.menuEntryPoint.list[1].title;
  this.menuButton3.headerText = this.menuEntryPoint.list[2].title;
  if (this.menuButton1.model == 'service') {
    for (let list of this.menuButton1.list) {
      if (!list.id.includes('send-service')) {
        list.id = `send-service-${list.id}`;
      }
    }
  }
  if (this.menuButton2.model == 'service') {
    for (let list of this.menuButton2.list) {
      if (!list.id.includes('send-service')) {
        list.id = `send-service-${list.id}`;
      }
    }
  }
  const success = await this.whatsappService.setMenuItems(this.menuEntryPoint , this.menuButton1, this.menuButton2, this.menuButton3, {deleteMenu3Items, menuItems: this.menuItems});
  if (this.sharedService.loading) {
    this.sharedService.loading.dismiss();
  }
  if (success) {
    this.sharedService.presentAlert('Data Saved Successfully');
  } else {
    this.sharedService.presentAlert('Something went wrong. Please try again later.')
  }
}

// fetch product ID, variant, and quantity
decodeProductId(product) {
  const productDetails:any = {};
  if (product.id.includes('###')) {
      console.log('variant exists')
      const productDetailsArray = product.id.split('###');
      productDetails.id = productDetailsArray[0];
      productDetails.variant = productDetailsArray[1].replace('*', ' ');
  }
  else {
      console.log('variant not exists')
      productDetails.id = product.id;
  }
  return productDetails;
}

encodeProductId(product) {
    console.log("variant exists")
    if (product.variant) {
      const variantName = product.variant.replace(' ', '*');
      return `${product.id}###${variantName}`;
    } else{
      return product.id;
    }
}

checkValidation(){
  if (!this.menuEntryPoint.bodyText) {
    return false;
  }
  else if (this.menuEntryPoint.list[0].active && (!this.menuButton1.bodyText || !this.menuButton1.headerText || !this.menuButton1.list )) {
    console.log('this.menuButton1:',this.menuButton1);
    return false;
  }
  else if (this.menuEntryPoint.list[1].active && (!this.menuButton2.bodyText || !this.menuButton2.headerText || !this.menuButton2.list )) {
    console.log('this.menuButton2:',this.menuButton2);
    return false;
  }
  else if (this.menuEntryPoint.list[2].active && (!this.menuButton3.bodyText || !this.menuButton3.headerText )) {
    console.log('this.menuButton3:',this.menuButton3);
    return false;
  } else{
    return true;
  }
}

uploadImage(files: FileList) {
  for (let i = 0; i < files.length; i++) {
    console.log('files[i]:',files[i]);
    if (files[i].size/1024/1024 > 5) { //Size of img is in bytes.
      this.sharedService.presentAlert('Image size cannot be greater than 5MB.');
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(files.item(i))
    reader.onload = (event: any) => { // called once readAsDataURL is completed
      console.log('hello');
      this.menuEntryPoint.header['mediaUrl'] = event.target.result;
      // let base64Image: any = event.target.result;
    }
  }
}

removeImg(imgType: string) {
  if (imgType === 'welcomeMsgImg') {
    this.menuEntryPoint.header['mediaUrl'] = '';
  }
}

}
