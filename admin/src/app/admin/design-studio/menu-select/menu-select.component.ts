import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { DesignStudioService } from 'src/app/services/designStudio/design-studio.service';
import { FiltersService } from 'src/app/services/filters/filters.service';

@Component({
  selector: 'app-menu-select',
  templateUrl: './menu-select.component.html',
  styleUrls: ['./menu-select.component.scss'],
})
export class MenuSelectComponent implements OnInit {

  constructor(
    private filtersService: FiltersService,
    private loadingController: LoadingController,
    private designService: DesignStudioService,
    private configService: ConfigService,
    private modalController: ModalController
  ) { }

  dataList: any = []
  dataType = ''
  loading: any
  menuList = []
  customTitle: string;
  customLink: string;
  activeNewTab: boolean = false;
  isUniversal = false;

  ngOnInit() {
    this.isUniversal = 'isUniversal' in this.configService.environment ? this.configService.environment.isUniversal : this.isUniversal;
  }

  closeModal() {
    this.modalController.dismiss(this.menuList);
    if (this.dataType == "customLink") {
      this.saveCustomLink();
    }
  }

  saveCustomLink() {
    if (this.customLink && this.customTitle) {
      this.menuList.push(
        {
          title: this.customTitle,
          link: this.customLink,
          type: 'custom',
          isNewTab: this.activeNewTab
        }
      );
    }
    // console.log(this.customTitle,this.customLink);
    // console.warn(this.menuList);
  }

  toggleNewTab() {
    this.activeNewTab = !this.activeNewTab;
  }

  async getPages() {
    await this.presentLoading()
    this.dataList = await this.designService.getPageData()
    this.dataType = 'pages'
    if (this.loading) {
      await this.loading.dismiss()
    }
  }

  async getCategories() {
    await this.presentLoading()
    this.dataList = await this.filtersService.getCategoriesWithSubcategories();
    // console.log('categories dataList', this.dataList)
    this.dataType = 'categories'
    if (this.loading) {
      await this.loading.dismiss()
    }
  }

  async getBrands() {
    await this.presentLoading()
    this.dataList = await this.filtersService.getBrands();
    this.dataType = 'brands'
    if (this.loading) {
      await this.loading.dismiss()
    }
  }

  async getServices() {
    await this.presentLoading()
    this.dataList = await this.filtersService.getServices();
    this.dataType = 'services'
    if (this.loading) {
      await this.loading.dismiss()
    }
  }

  async getCustomLink() {
    await this.presentLoading();
    this.dataType = 'customLink';
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  getLink(type, data, link){
    if (this.isUniversal) {
      if (type == 'custom-page') {
        return `/${data.slug.name}`
        
      } else if(type == 'category'){
        return `/category/${data.slug.name}`

      } else if(type == 'subcategories'){
        return `/subcategory/${data.slug.name}`

      } else if(type == 'brand'){
        return `/brand/${data.slug.name}`
      }
    } else{
      return link;
    }
  }

  getSubcatLink(catData, subcatData, link){
    if (this.isUniversal) {
      return `/category/${catData.slug.name}/${subcatData.slug.name}`;
    } else{
      return link;
    }
  }

  showSubList(i) {
    this.dataList[i].active = !this.dataList[i].active
    console.log('datalist:', this.dataList[i]);
    if (this.dataList[i].active == true) {
      if (this.dataType == 'pages') {
        if (!this.dataList[i].name) {
          this.menuList.push({ title: this.dataList[i].id, link: this.getLink('custom-page', this.dataList[i], `${'/custom-page/' + this.urlName(this.dataList[i].id) + '/' + this.dataList[i].id}`), id: this.dataList[i].id })
        }
        else {
          this.menuList.push({ title: this.dataList[i].name, link: this.getLink('custom-page', this.dataList[i], `${'/custom-page/' + this.urlName(this.dataList[i].name) + '/' + this.dataList[i].id}`), id: this.dataList[i].id })
        }
      }
      if (this.dataType == 'categories') {
        if (this.dataList[i].sublist && this.dataList[i].sublist.length == 0) {
          this.menuList.push({ title: this.dataList[i].name, link: this.getLink('category', this.dataList[i], `${'/shop/category/' + this.urlName(this.dataList[i].name) + '/' + this.dataList[i].id}`), id: this.dataList[i].id })
        }
        else {
          this.menuList.push({ title: this.dataList[i].name, link: this.getLink('subcategories', this.dataList[i] , `${'/shop-subcategories/' + this.urlName(this.dataList[i].name) + '/' + this.dataList[i].id}`), id: this.dataList[i].id })
        }
      }
      if (this.dataType == 'brands') {
        this.menuList.push({ title: this.dataList[i].name, link: this.getLink('brand', this.dataList[i], `${'/shop/brand/' + this.urlName(this.dataList[i].name) + '/' + this.dataList[i].id}`), id: this.dataList[i].id })
      }
      if (this.dataType == 'services') {
        this.menuList.push({ title: this.dataList[i].name, link: '/service-response/' + this.urlName(this.dataList[i].name) + '/' + this.dataList[i].id, id: this.dataList[i].id })
      }
    }
    else {
      if (this.dataType == 'pages') {
        let index = this.menuList.indexOf({ title: this.dataList[i].name, link: this.getLink('custom-page', this.dataList[i], `${'/custom-page/' + this.urlName(this.dataList[i].name) + '/' + this.dataList[i].id}`), id: this.dataList[i].id })
        this.menuList.splice(index, 1)
      }
      if (this.dataType == 'categories') {
        let index;
        if (this.dataList[i].sublist && this.dataList[i].sublist.length == 0) {
          index = this.menuList.indexOf({ title: this.dataList[i].name, link: this.getLink('category', this.dataList[i], `${'/shop/category/' + this.urlName(this.dataList[i].name) + '/' + this.dataList[i].id}`), id: this.dataList[i].id })
        }
        else {
          index = this.menuList.indexOf({ title: this.dataList[i].name, link: this.getLink('subcategories', this.dataList[i], `${'/shop-subcategories/' + this.urlName(this.dataList[i].name) + '/' + this.dataList[i].id}`), id: this.dataList[i].id })
        }
        this.menuList.splice(index, 1)
      }
      if (this.dataType == 'brands') {
        let index = this.menuList.indexOf({ title: this.dataList[i].name, link: this.getLink('brand', this.dataList[i], `${'/shop/brand/' + this.urlName(this.dataList[i].name) + '/' + this.dataList[i].id}`), id: this.dataList[i].id })
        this.menuList.splice(index, 1)
      }
      if (this.dataType == 'services') {
        let index = this.menuList.indexOf({ title: this.dataList[i].name, link: '/service-response/' + this.urlName(this.dataList[i].name) + '/' + this.dataList[i].id, id: this.dataList[i].id })
        this.menuList.splice(index, 1)
      }
    }
  }

  selectSubcategory(i, j) {
    this.dataList[i].sublist[j].active = !this.dataList[i].sublist[j].active
    if (this.dataList[i].sublist[j].active == true) {
      this.menuList.push({
        title: this.dataList[i].sublist[j].name, link: this.getSubcatLink(this.dataList[i],this.dataList[i].sublist[j], `${'/shop/category/' + this.urlName(this.dataList[i].name) + '/' + this.dataList[i].id + '/' + this.urlName(this.dataList[i].sublist[j].name)
        + '/' + this.dataList[i].sublist[j].id}`), id: this.dataList[i].id
      })
    }
    else {
      let index = this.menuList.indexOf({
        title: this.dataList[i].sublist[j].name, link: this.getSubcatLink(this.dataList[i],this.dataList[i].sublist[j], `${'/shop/category/' + this.urlName(this.dataList[i].name) + '/' + this.dataList[i].id + '/' + this.urlName(this.dataList[i].sublist[j].name)
        + '/' + this.dataList[i].sublist[j].id}`), id: this.dataList[i].id
      })
      this.menuList.splice(index, 1)
    }
  }

  urlName(pname: string) {
    return this.encodeURL(pname);
  }

  encodeURL(url: string) {
    if(this.isEncoded(url)) {
      return url;
    }
    return encodeURIComponent(url.toLowerCase().trim().replace(/ /g, '-'));
  }

  edecodeURL(url: string) {
    return decodeURIComponent(url.replace(/-/g, ' '));
  }

  isEncoded(str) {
    return typeof str == "string" && decodeURIComponent(str) !== str;
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait ...'
    });
    await this.loading.present();
  }

}
