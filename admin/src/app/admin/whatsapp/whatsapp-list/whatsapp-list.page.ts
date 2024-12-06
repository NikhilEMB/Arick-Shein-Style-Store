import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';
import { WhatsappDashboardService } from 'src/app/services/whatsapp-dashboard/whatsapp-dashboard.service';
import { ProductsModalPage } from '../../products-modal/products-modal.page';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-whatsapp-list',
  templateUrl: './whatsapp-list.page.html',
  styleUrls: ['./whatsapp-list.page.scss'],
})
export class WhatsappListPage implements OnInit {
  newCategory;
  selectedCatIndex = 0;
  selectedCatProducts = {
    bodyText: '',
    headerText: '',
    id: '',
    list: [],
    type: 'product_list'
  };

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
    model: 'product'
  }

  listProducts;

  // subcategory
  newSubcategory;
  selectedSubcatIndex = -1;
  selectedCatSubcategories = {
    bodyText: '',
    headerText: '',
    id: '',
    list: [],
    type: 'list'
  };
  
  paidPlanNote = '';

  constructor(private whatsappService: WhatsappDashboardService, private sharedService: SharedService,private modalController: ModalController,public alertController: AlertController, private configService: ConfigService) { }

  ngOnInit() {
  }
  initSelectedCatSubcategories(){
    this.selectedSubcatIndex = -1;
    this.selectedCatSubcategories = {
      bodyText: '',
      headerText: '',
      id: '',
      list: [],
      type: 'list'
    };
  }
  initSelectedCatProducts(){
    this.selectedCatProducts = {
      bodyText: '',
      headerText: '',
      id: '',
      list: [],
      type: 'product_list'
    };
  }

  async ionViewWillEnter() {
    if(this.configService.environment.isFreeWhatsapp){
      this.paidPlanNote = 'Please upgrade your plan to make Subcategories.';
    }
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
    for (const listItem of this.menuButton3.list) {
      if (!listItem.hasOwnProperty('isSubcategories')) {
       listItem['isSubcategories'] = false;
      }
    }
    this.viewListDetails(0);
  }


  viewListDetails(index){
    this.selectedCatIndex = index;
    this.initSelectedCatSubcategories();
    this.initSelectedCatProducts();
    if (this.menuButton3.list[index] && this.menuButton3.list[index].isSubcategories) {
      for (const menuItem of this.menuItems) {
        if (this.menuButton3.list[index] && menuItem.id == this.menuButton3.list[index].id) {
          this.selectedCatSubcategories = menuItem;
          console.log('this.selectedCatSubcategories:', this.selectedCatSubcategories);
          // break;
        }
      }
      for (const menuItem of this.menuItems) {
        if (menuItem.id && this.selectedCatSubcategories.list[0] && (menuItem.id == this.selectedCatSubcategories.list[0].id)) {
          this.selectedCatProducts = menuItem;
          break;
        }
      }
      this.selectedSubcatIndex = 0;
    } else {
      if (this.menuItems) {
        for (const menuItem of this.menuItems) {
          if (this.menuButton3.list[index] && menuItem.id == this.menuButton3.list[index].id) {
            this.selectedCatProducts = menuItem;
            break;
          }
        }
      }
    }
    console.log('index', this.selectedCatIndex, 'products:', this.selectedCatProducts.list);
  }

  viewSubcatProducts(index){
    this.selectedSubcatIndex = index;
    this.initSelectedCatProducts();
    if (this.menuItems) {
      for (const menuItem of this.menuItems) {
        if (this.selectedCatSubcategories.list[index] && menuItem.id == this.selectedCatSubcategories.list[index].id) {
          this.selectedCatProducts = menuItem;
          break;
        }
      }
    }
  }

  async editList(index, type){
    type =='cat' ? this.selectedCatIndex = index : this.selectedSubcatIndex = index;
    const alert = await this.alertController.create({
      subHeader: 'Edit',
      inputs: [{
          name: 'listName',
          type: 'text',
          placeholder: 'List',
          value: type =='cat'? this.menuButton3.list[index].title : this.selectedCatSubcategories.list[index].title
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
            type == 'cat' ? this.menuButton3.list[index].title = plan.listName : this.selectedCatSubcategories.list[index].title = plan.listName;
            // this.menuButton3.list[index].title = plan.listName;
            this.saveProducts('edit', type);
          }
        }
      }]
    });
    await alert.present();
  }

  async showDeleteAlert(index, type){
    let msg;
    if (type == 'cat') {
      msg = `Are you sure you want to delete ${this.menuButton3.list[index].title} and remove its subcategories & products ?`
    } else{
      msg = `Are you sure you want to delete ${this.selectedCatSubcategories.list[index].title} and remove its products ?`
    }
    const alert = await this.alertController.create({
        message: msg,
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
                this.deleteList(index, type);
            }
        }]
    });
    await alert.present();
  }

  async deleteList(index, type){
    this.sharedService.presentLoading();
    let title,success;
    if (type == 'cat') {
      title = this.menuButton3.list[index].title;
      success = await this.whatsappService.deleteList(this.menuItems,this.menuButton3, index);
    } else{
      title = this.selectedCatSubcategories.list[index].title;
      success = await this.whatsappService.deleteSubcat(this.menuButton3.list[this.selectedCatIndex].id,this.selectedCatSubcategories, index);
    }
    this.sharedService.loading ? this.sharedService.loading.dismiss() : {};
    if (success) {
      if (type == 'cat') {
        this.menuButton3.list.splice(index, 1)
      } else if(type == 'subcat'){
        this.selectedCatSubcategories.list.splice(index, 1)
      }
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
          id: `send-cat${this.getLastNumber('cat')+1}-product`,
          title: this.newCategory
        });
        this.newCategory = '';
      }
    }
  }

  addSubcategory(){
    const selectedCatId = this.menuButton3.list[this.selectedCatIndex].id;
    if (this.newSubcategory) {
      if (this.selectedCatSubcategories.list && this.selectedCatSubcategories.list.length >0) {
        const subCatExists = this.selectedCatSubcategories.list.filter(item => item.title.toLowerCase() == this.newSubcategory.toLowerCase());
        console.log('subCatExists:', subCatExists);
        if (subCatExists && subCatExists.length > 0) {
          this.sharedService.presentAlert('Subcategory with same name already exists in this list. Please try with different Name');
          return;
        }
      }
      if (this.selectedCatSubcategories.list.length + 1 > 10) {
        this.sharedService.presentAlert('List cannot have more than 10.');
      } else {
        this.selectedCatSubcategories.id = selectedCatId;
        this.selectedCatSubcategories.list.push({
          id: `send-cat${this.getLastNumber('catOfSubcat')}-subcat${this.getLastNumber('subcat')+1}`,
          title: this.newSubcategory
        });
        this.newSubcategory = '';
      }
    }
  }

  getLastNumber(type){
    if (type == 'cat') {
      if (this.menuButton3.list.length) {
        let length = this.menuButton3.list.length;
        let cat = this.menuButton3.list[length-1].id.split('-')[1];
        return parseInt(cat.replace(/^\D+/g, ''));
      } else {
        return 0;
      }
    } else if(type== 'catOfSubcat'){
      let id = this.selectedCatSubcategories.id;
      let catOfSubcat = id.split('-')[1];
      return parseInt(catOfSubcat.replace(/^\D+/g, ''));
    }
    else if(type== 'subcat'){
      if (this.selectedCatSubcategories.list.length) {
        let length = this.selectedCatSubcategories.list.length;
        let subcat = this.selectedCatSubcategories.list[length-1].id.split('-')[2];
        return parseInt(subcat.replace(/^\D+/g, ''));
      } else {
        return 0;
      }
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
      // alreadyAddedWAProducts
    }
    });
    modal.onDidDismiss()
    .then((res) => {
      if(res.data && res.data.length) {
        console.log('res.data:', res.data);
          for (const product of this.selectedCatProducts.list) {
            res.data = res.data.filter(prod => this.encodeProductId(prod) != product.id);
            // if (res.data.find(prod => this.encodeProductId(prod) == product.id)) {
            //   this.sharedService.presentAlert(`${product.name} is already added in your list.`);
            //   return;
            // }
          }
          if (this.selectedCatProducts.list.length + res.data.length >30) {
            this.sharedService.presentAlert('Product List is exceeding 30. Max 30 products are allowed.');
            return;
          }
          for(let prod of res.data){
            prod.id = this.encodeProductId(prod);
            this.selectedCatProducts.list.push(prod);
            console.log('prod:', prod);
          }
      }
  });
    await modal.present();
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

removeProduct(i) {
  this.selectedCatProducts.list.splice(i,1);
}

async saveProducts(mode, type){
  this.sharedService.presentLoading();
  let success = false;
  if (type == 'cat') {
    if (this.selectedCatProducts.list.length == 0) {
      await this.sharedService.loading ? this.sharedService.loading.dismiss(): {};
      this.sharedService.presentAlert('Please add atleast one product to save the category.');
      return;
    }
    this.menuButton3.headerText = this.menuEntryPoint.list[0].title;
    this.selectedCatProducts.id = this.menuButton3.list[this.selectedCatIndex].id;
    this.selectedCatProducts.bodyText = this.menuButton3.list[this.selectedCatIndex].title;
    this.selectedCatProducts.headerText = this.menuButton3.list[this.selectedCatIndex].title;
    success = await this.whatsappService.setListProducts(this.menuButton3, this.selectedCatProducts);
  } else {
    if (this.selectedCatSubcategories.list.length == 0) {
      this.sharedService.presentAlert('Please add atleast one product to save.');
      return;
    }
    const selectedCatId = this.menuButton3.list[this.selectedCatIndex].id;
    this.selectedCatSubcategories.id = selectedCatId;
    this.selectedCatProducts.id = this.selectedCatSubcategories.list[this.selectedSubcatIndex].id;
    this.selectedCatProducts.bodyText = this.selectedCatSubcategories.list[this.selectedSubcatIndex].title;
    this.selectedCatProducts.headerText = this.selectedCatSubcategories.list[this.selectedSubcatIndex].title;
    success = await this.whatsappService.setListWithSubcat(this.selectedCatSubcategories, this.selectedCatProducts);
  }

  this.sharedService.loading ? this.sharedService.loading.dismiss(): {};
  if (success) {
    if (mode == 'edit') {
      this.sharedService.presentAlert('List edited Successfully');
    } else {
      this.sharedService.presentAlert('Products Saved Successfully');
    }
  } else {
    this.sharedService.presentAlert('Something went wrong. Please try again later.')
  }
}

async updateSubcategoryStatus(status){
  this.sharedService.presentLoading();
  console.log('status:', status);
  this.menuButton3.list[this.selectedCatIndex].isSubcategories = status;

  const success = await this.whatsappService.changeSubcategoryStatus(this.menuButton3, this.selectedCatIndex);
  this.sharedService.loading ? this.sharedService.loading.dismiss(): {};
  success ? this.sharedService.presentAlert(`Subcategories is now ${status ? 'Active' : 'Inactive'}`) : this.sharedService.presentAlert('Something went wrong. Please try again later') 
}

}
