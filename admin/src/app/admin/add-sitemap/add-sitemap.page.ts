import { Component, OnInit } from '@angular/core';
import { ModalController, Events, AlertController } from '@ionic/angular';
import { SitemapService } from 'src/app/services/sitemap/sitemap.service';


@Component({
  selector: 'app-add-sitemap',
  templateUrl: './add-sitemap.page.html',
  styleUrls: ['./add-sitemap.page.scss'],
})
export class AddSitemapPage implements OnInit {
  productsData: any[] = [];
  showSearch: boolean = false;
  sitemap:any;

  sitemapDetails = {
    category: '',
    categoryUrl: '',
    products: [
      {
        name: '',
        url: ''
      }
    ],
    createdAt: new Date()
  }
  showNoProducts: boolean = false;
  searchProduct: string = '';
  typingTimer;
  doneTypingInterval = 1000;
  showSearchLoader: boolean = false;
  page: number = 0;

  selectedProducts:any[]=[];
  editMode:boolean=false;
  categories:any[]=[];
  selectedCategory:any;


  constructor(private modalController: ModalController,
    private events: Events,
    private sitemapService: SitemapService,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    // console.log('sitemap', this.sitemap)
    if(this.sitemap && this.sitemap.id) {
      this.editMode=true;
      this.sitemapDetails = {
        category: this.sitemap.category || '',
        categoryUrl: this.sitemap.categoryUrl || '',
        products: this.sitemap.products || [],
        createdAt: new Date() 
      }
      this.selectedProducts = this.sitemap.products || []
    }
    await this.getAllCategories();
  }

  async ionViewWillEnter() {
    this.initializeSubscriptions()
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
    this.showSearch = false;
    this.removeSubscriptions();
  }

  async getAllCategories() {
    const categories = await this.sitemapService.getAllCategories();
    if (categories && categories.length) {
      this.categories = categories;
  
      if (this.editMode) {
        // Find the selected category based on the category name
        this.selectedCategory = categories.find(cat => cat.name === this.sitemap.category);
        // console.log('selectedCategory', this.selectedCategory)
      }
    }
  }

  getSelectedCategory(event:any) {
    this.selectedCategory = event.target.value;
    this.sitemapDetails.category = this.selectedCategory.name;
    this.sitemapDetails.categoryUrl = `https://sheinstylestores.com/category/${this.selectedCategory.slug.name}`;

    // console.log('sitemapDetails:', this.sitemapDetails)
  }

  async initializeSubscriptions() {
    this.events.subscribe('product:publishProductsForAdminProducts', (products) => {
      // console.log('publishProductsForAdminProducts', products);
  
      if (this.searchProduct === '') {
        this.page = 0;
      }
      this.productsData = products;
      this.showNoProducts = false;
      this.showSearchLoader = false;
      // console.log('productsData', this.productsData);
    });

    this.events.subscribe('search-engine:noAdminSearchProductsAvailable', () => {
      console.log("noAdminSearchProductsAvailable");
      this.showNoProducts = true;
      this.showSearchLoader = false;
    });
    this.events.subscribe('search-engine:noMoreAdminSearchProducts', () => {
      console.log("noMoreAdminSearchProducts");
      this.showSearchLoader = false;
    });
  }

  async onClickSubmit() {
    const data = {
      ...this.sitemapDetails,
      products: this.selectedProducts
    }
    console.log('data...', data)

    if(!data.category || !data.categoryUrl || !(data.products && data.products.length)) {
      const alert = await this.alertController.create({
        message: 'Please fill all required fields',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              ////console.log('Confirm Okay');
            }
          }
        ]
      });
  
      await alert.present();
      return;
    }

    const response = await this.sitemapService.addSitemap(data);
    if(response) {
      this.modalController.dismiss(true);
    }
  }

  async updateSitemapData() {
    const data = {
      ...this.sitemapDetails,
      products: this.selectedProducts
    }
    // console.log('data...', data)

    if(!data.category || !data.categoryUrl || !(data.products && data.products.length)) {
      const alert = await this.alertController.create({
        message: 'Please fill all required fields',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              ////console.log('Confirm Okay');
            }
          }
        ]
      });
  
      await alert.present();
      return;
    }

    const response = await this.sitemapService.updateSitemap(this.sitemap.id, data);
    if(response) {
      this.modalController.dismiss(true);
    }
  }


  fireSearchQuery() {
    clearTimeout(this.typingTimer);
    if (this.searchProduct.length > 2) {
      this.typingTimer = setTimeout(() => {
        // console.log('in fireSearchQuery...');
        this.showSearchLoader = true;
        this.page = 1;
        this.events.publish('search-engine:alogoliaSearchProductsForAdmin', this.searchProduct, 0,'new_search','');
      }, this.doneTypingInterval);

    } else {
      if (!this.searchProduct.length) {
        this.productsData = []
      }
    }


    // console.log('products...', this.productsData)

  }

  checkboxClick(e:any, product:any){
    // console.log('event', e, product)
    if (e.detail.checked) {
      const productData = {
        name: product.data.prodName,
        // url: `https://bwi-shein.web.app/product-details/${product.data.slug.name}/${product.id}`
        url: `https://sheinstylestores.com/product/${product.data.slug.name}`
      };
      // console.log('url', productData.url)
      // Check if the product is already selected to prevent duplicates
      if (!this.selectedProducts.find(p => p.name === productData.name)) {
        this.selectedProducts.push(productData);
      }
    } else {
      this.selectedProducts = this.selectedProducts.filter(p => p.name !== product.data.prodName);
    }
  }

  removeProduct(i:any) {
    this.selectedProducts.splice(i, 1)
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  removeSubscriptions() {
    this.events.unsubscribe('product:publishProductsForAdminProducts');
    this.events.unsubscribe('search-engine:noAdminSearchProductsAvailable');
    this.events.unsubscribe('search-engine:noMoreAdminSearchProducts');
  }

}
