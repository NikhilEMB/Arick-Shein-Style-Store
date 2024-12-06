import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';
import { WhatsappDashboardService } from 'src/app/services/whatsapp-dashboard/whatsapp-dashboard.service';
import { ProductsModalPage } from '../../products-modal/products-modal.page';

@Component({
  selector: 'app-whatsapp-list-services',
  templateUrl: './whatsapp-list-services.page.html',
  styleUrls: ['./whatsapp-list-services.page.scss'],
})
export class WhatsappListServicesPage implements OnInit {
  newCategory;
  selectedCatIndex = 0;
  selectedCatProducts;

  menuItems;
  menuEntryPoint = {
    id: 'menu-entry-point',
    bodyText: '',
    list: [
      {id: 'menu-button-1', title: '', active: false},
      {id: 'menu-button-2', title: '', active: false},
      {id: 'menu-button-3', title: '', active: false},
    ],
    type: 'button',
  }

  menuButton3 = {
    id: 'menu-button-3',
    bodyText: '',
    headerText: '',
    list: [],
    type: 'list',
    listButtonText: 'Select Here',
    model: 'service'
  }

  listProducts;


  constructor(private whatsappService: WhatsappDashboardService, private sharedService: SharedService,private modalController: ModalController,public alertController: AlertController,) { }

  ngOnInit() {
  }

  initSelectedCatProducts(){
    this.selectedCatProducts = {
      bodyText: '',
      headerText: '',
      id: '',
      list: [],
      type: 'list',
      model: 'service'
    };
  }

  async ionViewWillEnter() {
    this.menuItems = await this.whatsappService.getMenuItems();
    if (this.menuItems && this.menuItems.length) {
      for (const menuItem of this.menuItems) {
        if (menuItem.id == 'menu-entry-point') {
          Object.assign(this.menuEntryPoint, menuItem);
        }
        if (menuItem.id == 'menu-button-3') {
          Object.assign(this.menuButton3, menuItem);
        }

      }
    }
    this.viewListDetails(0);
  }


  viewListDetails(index){
    this.selectedCatIndex = index;
    this.initSelectedCatProducts();
    if (this.menuItems) {
      for (const menuItem of this.menuItems) {
        if (this.menuButton3.list[index] && menuItem.id == this.menuButton3.list[index].id) {
          this.selectedCatProducts = menuItem;
          break;
        }
      }
    }
    console.log('index', this.selectedCatIndex, 'products:', this.selectedCatProducts.list);
  }

  async editList(index){
    const alert = await this.alertController.create({
      subHeader: 'Edit',
      inputs: [{
          name: 'listName',
          type: 'text',
          placeholder: 'List',
          value: this.menuButton3.list[index].title
        }
      ],
      buttons: [{
        text: 'cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Save',
        handler: (plan) => {
          if (!plan.listName) {
            this.sharedService.presentToast('List name cannot be empty');
            return false;
          } else if(plan.listName.length>24){
            this.sharedService.presentToast('Name cannot have more than 24 characters');
            return false;
          } else {
            this.menuButton3.list[index].title = plan.listName;
            this.saveProducts('edit');
          }
        }
      }]
    });
    await alert.present();
  }

  async showDeleteAlert(index){
    const alert = await this.alertController.create({
        message: `Are you sure you want to delete ${this.menuButton3.list[index].title} and remove its products ?`,
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
                this.deleteList(index);
            }
        }]
    });
    await alert.present();
  }

  async deleteList(index){
    this.sharedService.presentLoading();
    let title = this.menuButton3.list[index].title;
    let success = await this.whatsappService.deleteList(this.menuItems,this.menuButton3, index);
    this.sharedService.loading ? this.sharedService.loading.dismiss() : {};
    if (success) {
      this.menuButton3.list.splice(index, 1);
      this.viewListDetails(0);
      this.sharedService.presentAlert(`${title} deleted Successfully`);
    } else {
      this.sharedService.presentAlert('Something went wrong. Please try again later.')
    }
  }

  addNewCategory() {
    if (this.newCategory) {
      if (this.menuButton3.list && this.menuButton3.list.length >0) {
        const categoryExists = this.menuButton3.list.filter(item => item.title.toLowerCase() == this.newCategory.toLowerCase());
        console.log('categoryExists:', categoryExists);
        if (categoryExists && categoryExists.length > 0) {
          this.sharedService.presentAlert('Category with same name already exists. Please try with different Category Name');
          return;
        }
      }
      if (this.menuButton3.list.length + 1 > 10) {
        this.sharedService.presentAlert('List cannot have more than 10.');
      } else {
        this.menuButton3.list.push({
          id: `send-cat${this.getLastNumber()+1}-product`,
          title: this.newCategory
        });
        this.newCategory = '';
      }
    }
  }

  getLastNumber(){
    if (this.menuButton3.list.length) {
      let length = this.menuButton3.list.length;
      let cat = this.menuButton3.list[length-1].id.split('-')[1];
      return parseInt(cat.replace(/^\D+/g, ''));
    } else {
      return 0;
    }
  }

  async presentProductsModal(){
    // let alreadyAddedWAProducts = alreadyAddedProducts;
    // for (let [index,product] of alreadyAddedWAProducts.entries()) {
    //   alreadyAddedWAProducts[index] = this.decodeProductId(product);
    // }
    const modal = await this.modalController.create({
    component: ProductsModalPage,
    backdropDismiss: false,
    cssClass: "custom-modal",
    componentProps: {
      routeViaWhatsapp: true,
      model: 'service'
    }
    });
    modal.onDidDismiss()
    .then((res) => {
      if(res.data && res.data.length) {
        console.log('res.data:', res.data);
          for (const product of this.selectedCatProducts.list) {
            res.data = res.data.filter(prod => this.encodeProductId(prod) != product.id.split('-')[2]);
            // if (res.data.find(prod => this.encodeProductId(prod) == product.id.split('-')[2])) {
            //   this.sharedService.presentAlert(`${product.title} is already added in your list.`);
            //   return;
            // }
          }
          if (this.selectedCatProducts.list.length + res.data.length > 10) {
            this.sharedService.presentAlert('Product List is exceeding 10. Max 10 items are allowed.');
            return;
          }
          for(let prod of res.data){
            prod.id = this.encodeProductId(prod);
            this.selectedCatProducts.list.push({id: `send-service-${prod.id}`, title: prod.name});
            console.log('prod:', prod);
          }
      }
  });
    await modal.present();
  }

encodeProductId(product) {
  if (product.variant) {
    const variantName = product.variant.replace(' ', '*');
    return `${product.id}###${variantName}`;
  } else{
    return product.id;
  }
}

removeProduct(i) {
  this.selectedCatProducts.list.splice(i,1);
}

async saveProducts(mode){
  this.sharedService.presentLoading();
  if (this.selectedCatProducts.list.length == 0) {
    this.sharedService.presentAlert('Please add atleast one product to save the category.');
    return;
  }
  this.menuButton3.headerText = this.menuEntryPoint.list[0].title;
  this.selectedCatProducts.id = this.menuButton3.list[this.selectedCatIndex].id;
  this.selectedCatProducts.bodyText = this.menuButton3.list[this.selectedCatIndex].title;
  this.selectedCatProducts.headerText = this.menuButton3.list[this.selectedCatIndex].title;
  let success = await this.whatsappService.setListProducts(this.menuButton3, this.selectedCatProducts);

  this.sharedService.loading ? this.sharedService.loading.dismiss(): {};
  if (success) {
    if (mode == 'edit') {
      this.sharedService.presentAlert('List edited Successfully');
    } else {
      this.sharedService.presentAlert('List Saved Successfully');
    }
    this.menuItems = await this.whatsappService.getMenuItems();
  } else {
    this.sharedService.presentAlert('Something went wrong. Please try again later.')
  }
}

}
