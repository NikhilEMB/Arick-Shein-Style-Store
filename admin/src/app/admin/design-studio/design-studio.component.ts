import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { DesignStudioService } from 'src/app/services/designStudio/design-studio.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { MenuSelectComponent } from './menu-select/menu-select.component';

@Component({
  selector: 'app-design-studio',
  templateUrl: './design-studio.component.html',
  styleUrls: ['./design-studio.component.scss']
})
export class DesignStudioComponent implements OnInit {

  dataList: any = []
  dataType = ''
  loading: any
  headerOptionType = 'Header Style'
  headerList = [
    { name: 'Header Style' },
    { name: 'Logo' },
    { name: 'Notification Bar' },
    { name: 'Info Bar' },
    { name: 'Login Button' },
    { name: 'Wishlist Button' },
    { name: 'Cart Button' },
    { name: 'Search Bar' },
    { name: 'Menu' }
  ]
  menuData = { show: false, menuItems: [], color: {} }
  logoHeight = 150
  logoWidth = 150
  showStyle = 1
  selectedItem = ''
  selectedSubItem = ''
  largeGridNo = 5
  mediumGridNo = 4
  smallGridNo = 2
  isNotiActive = false
  notiText = ''
  isInfoActive = false
  infoLeftText = ''
  infoRightText = ''
  loginText = ''
  wishlistText = ''
  cartText = ''
  searchText = ''
  selectId = ''
  selectSubId = ''
  globalOption = 'itemStyle'
  isLoginActive = false
  isWishlistActive = false
  isCartActive = false
  isSearchActive = false
  widgetType = ''
  widgetId = ''
  currentCatOption = "subCat";
  isFixedHeight = false
  fixedHeight = 150
  previousId = 'status1'
  previousBrand = 'brand0'
  previousCategory = 'category0'
  previousPage = 'pageId0'
  previousSection = 'section00'
  notiBackgroundColor = '#000'
  notiForegroundColor = '#FFFFFF'
  infoBackgroundColor = '#000'
  infoForegroundColor = '#FFFFFF'
  loginBackgroundColor = '#000'
  loginForegroundColor = '#FFFFFF'
  wishBackgroundColor = '#000'
  wishForegroundColor = '#FFFFFF'
  cartBackgroundColor = '#000'
  cartForegroundColor = '#FFFFFF'
  menuBackgroundColor = '#000'
  menuForegroundColor = '#FFFFFF'
  headerBackgroundColor = '#000'
  headerForegroundColor = '#FFFFFF'
  isStudioActive = false
  isFilterActive = true;
  isCustomSizeActive = false;
  logoUrlData: any = '';
  isCarousalActive = false;
  displayFormat = "Option1";
  isDisplayFormat = false;
  bannerLength: any = 0;
  displayAlignment = 'left';
  isFixedImageHeight = false;
  FixedImageHeight = 150;
  imageStyleGrid = "40-60";
  widgetBgColor = 'transparent';
  widgetBgImage = '';
  showVariant: boolean = false;

  constructor(
    private filtersService: FiltersService,
    private loadingController: LoadingController,
    private designService: DesignStudioService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    let activeData: any = await this.designService.getActiveStatus();
    if (activeData) {
      this.isStudioActive = activeData.active;
    }
    await this.getGlobal();
    this.currentCatOption = "subCat";
  }

  async getGlobal() {
    await this.presentLoading()
    let prevMsgDiv = document.getElementById(this.previousId);
    if (prevMsgDiv) {
      prevMsgDiv.style.background = 'white';
    }
    let msgDiv = document.getElementById('status1');
    if (msgDiv) {
      msgDiv.style.background = 'var(--ion-color-categories-background)';
    }
    this.previousId = 'status1'
    this.dataType = 'global'
    this.changeGlobalOptions('itemStyle')
    if (this.loading) {
      await this.loading.dismiss()
    }
  }

  async getHeader() {
    await this.presentLoading()
    let prevMsgDiv = document.getElementById(this.previousId);
    if (prevMsgDiv) {
      prevMsgDiv.style.background = 'white';
    }
    let msgDiv = document.getElementById('status2');
    if (msgDiv) {
      msgDiv.style.background = 'var(--ion-color-categories-background)';
    }
    this.previousId = 'status2'
    this.dataList = this.headerList
    this.dataType = 'header'
    this.headOptions('Header Style')
    if (this.loading) {
      await this.loading.dismiss()
    }
  }

  async getPages() {
    await this.presentLoading()
    let prevMsgDiv = document.getElementById(this.previousId);
    if (prevMsgDiv) {
      prevMsgDiv.style.background = 'white';
    }
    let msgDiv = document.getElementById('status3');
    if (msgDiv) {
      msgDiv.style.background = 'var(--ion-color-categories-background)';
    }
    this.previousId = 'status3'
    this.dataList = await this.designService.getPageData()
    this.dataType = 'pages'
    this.selectSection(0, 0)
    if (this.loading) {
      await this.loading.dismiss()
    }
  }

  async getCategories() {
    await this.presentLoading()
    let prevMsgDiv = document.getElementById(this.previousId);
    if (prevMsgDiv) {
      prevMsgDiv.style.background = 'white';
    }
    let msgDiv = document.getElementById('status4');
    if (msgDiv) {
      msgDiv.style.background = 'var(--ion-color-categories-background)';
    }
    this.previousId = 'status4'
    this.dataList = await this.filtersService.getCategoriesWithSubcategories();
    this.dataType = 'categories'
    if (this.dataList && this.dataList.length > 0) {
      this.selectedItem = this.dataList[0].name
      this.selectListItem(0)
    }
    if (this.loading) {
      await this.loading.dismiss()
    }
  }

  async getBrands() {
    await this.presentLoading()
    let prevMsgDiv = document.getElementById(this.previousId);
    if (prevMsgDiv) {
      prevMsgDiv.style.background = 'white';
    }
    let msgDiv = document.getElementById('status5');
    if (msgDiv) {
      msgDiv.style.background = 'var(--ion-color-categories-background)';
    }
    this.previousId = 'status5'
    this.dataList = await this.filtersService.getBrands();
    this.dataType = 'brands'
    if (this.dataList && this.dataList.length > 0) {
      this.selectedItem = this.dataList[0].name
      this.selectListItem(0)
    }
    if (this.loading) {
      await this.loading.dismiss()
    }
  }

  async headOptions(name) {
    await this.presentLoading()
    let prevMsgDiv = document.getElementById(this.headerOptionType);
    if (prevMsgDiv) {
      prevMsgDiv.style.background = 'white';
    }
    let msgDiv = document.getElementById(name);
    if (msgDiv) {
      msgDiv.style.background = 'var(--ion-color-categories-background)';
    }
    this.headerOptionType = name
    this.largeGridNo = 5
    this.mediumGridNo = 4
    this.smallGridNo = 2
    let headerData: any = await this.designService.getHeaderStyleData()
    if (name == 'Header Style') {
      this.headerBackgroundColor = headerData.color.backgroundColor.hex
      this.headerForegroundColor = headerData.color.foregroundColor.hex
      let styles: any = await document.getElementsByName('headerStyle');
      for (let i = 0; i < styles.length; i++) {
        if (headerData.headerStyle == styles[i].value) {
          styles[i].checked = true
        }
      }
      let headerWidth: any = document.getElementsByName('headerWidth');
      if (headerData && headerData.style) {
        for (let i = 0; i < headerWidth.length; i++) {
          if (headerData.style.sectionWidth == headerWidth[i].value) {
            headerWidth[i].checked = true;
          }
        }
      }
      
    }
    else if (name == 'Logo') {
      this.isCustomSizeActive = headerData.logo.hasOwnProperty('customSize') ? headerData.logo.customSize : false;
      this.logoHeight = headerData.logo.height;
      this.logoWidth = headerData.logo.width;
      this.logoUrlData = headerData.logo.logoUrl;
      // let imgId = document.getElementById('logoImage');
      // if (imgId && imgId.style) {
      //   imgId.style.height = this.logoHeight + 'px';
      //   imgId.style.width = this.logoWidth + 'px';
      // }  
      // console.log(imgId,imgId.style);

    }
    else if (name == 'Notification Bar') {
      this.isNotiActive = headerData.notificationBar.show
      this.notiText = headerData.notificationBar.text
      this.notiBackgroundColor = headerData.notificationBar.color.backgroundColor.hex
      this.notiForegroundColor = headerData.notificationBar.color.foregroundColor.hex
      this.setNotiColor()

    }
    else if (name == 'Info Bar') {
      this.isInfoActive = headerData.infoBar.show
      this.infoLeftText = headerData.infoBar.leftText
      this.infoRightText = headerData.infoBar.rightText
      this.infoBackgroundColor = headerData.infoBar.color.backgroundColor.hex
      this.infoForegroundColor = headerData.infoBar.color.foregroundColor.hex
      this.setInfoColor()
    }
    else if (name == 'Login Button') {
      this.isLoginActive = headerData.loginButton.show
      this.loginText = headerData.loginButton.text
      this.loginBackgroundColor = headerData.loginButton.color.backgroundColor.hex
      this.loginForegroundColor = headerData.loginButton.color.foregroundColor.hex
    }
    else if (name == 'Wishlist Button') {
      this.isWishlistActive = headerData.wishlistButton.show
      this.wishlistText = headerData.wishlistButton.text
      this.wishBackgroundColor = headerData.wishlistButton.color.backgroundColor.hex
      this.wishForegroundColor = headerData.wishlistButton.color.foregroundColor.hex
    }
    else if (name == 'Cart Button') {
      this.isCartActive = headerData.cartButton.show
      this.cartText = headerData.cartButton.text
      this.cartBackgroundColor = headerData.cartButton.color.backgroundColor.hex
      this.cartForegroundColor = headerData.cartButton.color.foregroundColor.hex
    }
    else if (name == 'Search Bar') {
      this.isCartActive = headerData.search.show
      this.searchText = headerData.search.placeholderText
    }
    else if (name == 'Menu') {
      console.log('headerData:', headerData);

      this.menuData = headerData.menuData
      this.menuBackgroundColor = headerData.menuData.color.backgroundColor.hex
      this.menuForegroundColor = headerData.menuData.color.foregroundColor.hex
      console.log('menu:', this.menuData);
    }

    if (this.loading) {
      await this.loading.dismiss()
    }
  }

  async changeGlobalOptions(name) {
    await this.presentLoading()
    if (name == 'itemStyle') {
      let prevMsgDiv = document.getElementById('global2');
      let prevMsgDiv2 = document.getElementById('global3');
      if (prevMsgDiv) {
        prevMsgDiv.style.background = 'white';
        prevMsgDiv2.style.background = 'white';
      }
      let msgDiv = document.getElementById('global1');
      if (msgDiv) {
        msgDiv.style.background = 'var(--ion-color-categories-background)';
      }
    }
    if (name == 'productStyle') {
      let prevMsgDiv = document.getElementById('global1');
      let prevMsgDiv2 = document.getElementById('global3');
      if (prevMsgDiv) {
        prevMsgDiv.style.background = 'white';
        prevMsgDiv2.style.background = 'white';
      }
      let msgDiv = document.getElementById('global2');
      if (msgDiv) {
        msgDiv.style.background = 'var(--ion-color-categories-background)';
      }
    }
    if (name == 'productDetailStyle') {
      let prevMsgDiv = document.getElementById('global2');
      let prevMsgDiv2 = document.getElementById('global1');
      if (prevMsgDiv) {
        prevMsgDiv.style.background = 'white';
        prevMsgDiv2.style.background = 'white';
      }
      let msgDiv = document.getElementById('global3');
      if (msgDiv) {
        msgDiv.style.background = 'var(--ion-color-categories-background)';
      }
    }
    this.globalOption = name
    this.largeGridNo = 5
    this.mediumGridNo = 4
    this.smallGridNo = 2
    this.isFixedHeight = false
    this.fixedHeight = 150
    let globalData: any = await this.designService.getGlobalStyleData()
    if (globalData) {
      if (this.globalOption == 'itemStyle' && globalData.itemStyle) {
        this.largeGridNo = globalData.itemStyle.gridColumn.lg
        this.mediumGridNo = globalData.itemStyle.gridColumn.md
        this.smallGridNo = globalData.itemStyle.gridColumn.sm
        if (globalData.itemStyle.hasOwnProperty('isFixedHeight') && globalData.itemStyle.hasOwnProperty('fixedHeight')) {
          this.isFixedHeight = globalData.itemStyle.isFixedHeight
          this.fixedHeight = globalData.itemStyle.fixedHeight
        }
        this.isFilterActive = globalData.itemStyle.hasOwnProperty('showFilter') ? globalData.itemStyle.showFilter : true;
        let styles: any = await document.getElementsByName('globalCatStyle');
        for (let i = 0; i < styles.length; i++) {
          if (globalData.itemStyle.style == styles[i].value) {
            styles[i].checked = true
          }
        }
      }
      else if (this.globalOption == 'productStyle' && globalData.productStyle) {
        this.largeGridNo = globalData.productStyle.gridColumn.lg
        this.mediumGridNo = globalData.productStyle.gridColumn.md
        this.smallGridNo = globalData.productStyle.gridColumn.sm
        if (globalData.productStyle.hasOwnProperty('isFixedHeight') && globalData.productStyle.hasOwnProperty('fixedHeight')) {
          this.isFixedHeight = globalData.productStyle.isFixedHeight
          this.fixedHeight = globalData.productStyle.fixedHeight
        }
        this.showVariant = globalData.productStyle.showVariant || false;
        let styles: any = await document.getElementsByName('globalProductStyle');
        for (let i = 0; i < styles.length; i++) {
          if (globalData.productStyle.style == styles[i].value) {
            styles[i].checked = true
          }
        }
      }
      else if (this.globalOption == 'productDetailStyle' && globalData.productDetailPage) {
        // this.isFixedHeight = globalData.productDetailPage.isFixedHeight ? globalData.productDetailPage.isFixedHeight : false;
        // this.fixedHeight = globalData.productDetailPage.fixedHeight ? globalData.productDetailPage.fixedHeight : 150;
        this.isFixedImageHeight = globalData.productDetailPage.isFixedImageHeight ? globalData.productDetailPage.isFixedImageHeight : false;
        this.FixedImageHeight = globalData.productDetailPage.imageHeight ? globalData.productDetailPage.imageHeight : 150;
        this.imageStyleGrid = globalData.productDetailPage.gridColumn ? globalData.productDetailPage.gridColumn : '40-60';

        // let styles: any = await document.getElementsByName('globalProductDetailStyle');
        // for (let i = 0; i < styles.length; i++) {
        //   if (globalData.productDetailPage.style == styles[i].value) {
        //     styles[i].checked = true;
        //   }
        // }
      }
    }
    if (this.loading) {
      await this.loading.dismiss()
    }
  }

  async getServices() {
    await this.presentLoading()
    this.dataList = await this.filtersService.getServices();
    this.dataType = 'services'
    if (this.dataList && this.dataList.length > 0) {
      this.selectedItem = this.dataList[0].name
    }
    if (this.loading) {
      await this.loading.dismiss()
    }
  }

  showSubList(i) {
    this.dataList[i].active = !this.dataList[i].active
    // if (this.dataType == 'pages'){
    //   let prevMsgDiv = document.getElementById(this.previousPage);
    //   prevMsgDiv.style.background = 'white';
    //   let msgDiv = document.getElementById('pageId' + i);
    //   msgDiv.style.background = 'var(--ion-color-categories-background)';
    //   this.previousPage = 'pageId' + i
    // }
    this.selectListItem(i)
  }

  async selectSubCat(i, j) {
    await this.presentLoading()
    this.selectedSubItem = this.dataList[i].sublist[j].name
    this.selectSubId = this.dataList[i].sublist[j].id
    this.largeGridNo = 5
    this.mediumGridNo = 4
    this.smallGridNo = 2
    this.isFixedHeight = false
    this.fixedHeight = 150
    let subCategoryData: any = await this.designService.getSubStyleData(this.selectId, this.selectSubId)
    if (subCategoryData && subCategoryData.style && subCategoryData.style.productStyle) {
      this.largeGridNo = subCategoryData.style.productStyle.gridColumn.lg
      this.mediumGridNo = subCategoryData.style.productStyle.gridColumn.md
      this.smallGridNo = subCategoryData.style.productStyle.gridColumn.sm
      if (subCategoryData.style.productStyle.hasOwnProperty('isFixedHeight') && subCategoryData.style.productStyle.hasOwnProperty('fixedHeight')) {
        this.isFixedHeight = subCategoryData.style.productStyle.isFixedHeight
        this.fixedHeight = subCategoryData.style.productStyle.fixedHeight
      }
      this.showVariant = subCategoryData.style.productStyle.showVariant || false;
      let styles: any = await document.getElementsByName('subcatStyle');
      for (let i = 0; i < styles.length; i++) {
        if (subCategoryData.style.productStyle.style == styles[i].value) {
          styles[i].checked = true
        }
      }
    }
    if (this.loading) {
      await this.loading.dismiss()
    }
  }

  async getMenuItem() {
    const modal = await this.modalController.create({
      component: MenuSelectComponent
    });
    modal.onDidDismiss().then(res => {
      if (res && res.data) {
        this.menuData.menuItems.push(...res.data)
      }
    });
    await modal.present();
  }

  async getSubMenuItem(i, j) {
    const modal = await this.modalController.create({
      component: MenuSelectComponent
    });
    modal.onDidDismiss().then(res => {
      if (res && res.data) {
        this.menuData.menuItems[i].dropdownMenuData[j].subMenu = true
        if (this.menuData.menuItems[i].dropdownMenuData[j].subMenuData) {
          this.menuData.menuItems[i].dropdownMenuData[j].subMenuData.push(...res.data)
        }
        else {
          this.menuData.menuItems[i].dropdownMenuData[j].subMenuData = []
          this.menuData.menuItems[i].dropdownMenuData[j].subMenuData.push(...res.data)
        }
        console.log(this.menuData.menuItems[i].dropdownMenuData[j])
      }
    });
    await modal.present();
  }

  deleteMenuItem(i) {
    this.menuData.menuItems.splice(i, 1)
  }

  deleteDropMenuItem(i, j) {
    this.menuData.menuItems[i].dropdownMenuData.splice(j, 1)
  }

  deleteSubMenuItem(i, j, k) {
    this.menuData.menuItems[i].dropdownMenuData[j].subMenuData.splice(k, 1)
  }

  getDropdownItem() {
    let dropDownObj = {
      title: "Title for DropDown",
      link: "#",
      dropdownMenu: true
    }
    this.menuData.menuItems.push(dropDownObj)
  }

  async getDropMenuItem(i) {
    const modal = await this.modalController.create({
      component: MenuSelectComponent
    });
    modal.onDidDismiss().then(res => {
      if (res && res.data) {
        if (this.menuData.menuItems[i].dropdownMenuData) {
          this.menuData.menuItems[i].dropdownMenuData.push(...res.data)
        }
        else {
          this.menuData.menuItems[i].dropdownMenuData = []
          this.menuData.menuItems[i].dropdownMenuData.push(...res.data)
        }
      }
    });
    await modal.present();
  }

  async setRam() {
    let imgId = document.getElementById('logoImage');
    if (imgId && imgId.style) {
      imgId.style.height = this.logoHeight + 'px';
      imgId.style.width = this.logoWidth + 'px';
    }
  }

  async setNotiColor() {
    let infoBar = document.getElementById('notiSample');
    if (infoBar && infoBar.style) {
      infoBar.style.background = this.notiBackgroundColor;
      infoBar.style.color = this.notiForegroundColor;
    }
  }

  async setInfoColor() {
    let infoBar = document.getElementById('infoSample');
    if (infoBar && infoBar.style) {
      infoBar.style.background = this.infoBackgroundColor;
      infoBar.style.color = this.infoForegroundColor;
    }
  }

  async changeStyle(num) {
    this.showStyle = num
  }

  async selectListItem(i) {
    await this.presentLoading()
    this.largeGridNo = 5
    this.mediumGridNo = 4
    this.smallGridNo = 2
    this.isFixedHeight = false
    this.fixedHeight = 150
    if (this.dataType == 'brands') {
      let prevMsgDiv = document.getElementById(this.previousBrand);
      if (prevMsgDiv) {
        prevMsgDiv.style.background = 'white';
      }
      let msgDiv = document.getElementById('brand' + i);
      if (msgDiv) {
        msgDiv.style.background = 'var(--ion-color-categories-background)';
      }
      this.previousBrand = 'brand' + i
      let resetStyles: any = await document.getElementsByName('brandStyle');
      for (let i = 0; i < resetStyles.length; i++) {
        resetStyles[i].checked = false
      }
      this.selectedItem = this.dataList[i].name
      this.selectId = this.dataList[i].id
      let brandsData: any = await this.designService.getStyleData(this.selectId, this.dataType)
      if (brandsData && brandsData.style) {
        this.largeGridNo = brandsData.style.productStyle.gridColumn.lg
        this.mediumGridNo = brandsData.style.productStyle.gridColumn.md
        this.smallGridNo = brandsData.style.productStyle.gridColumn.sm
        if (brandsData.style.productStyle.hasOwnProperty('isFixedHeight') && brandsData.style.productStyle.hasOwnProperty('fixedHeight')) {
          this.isFixedHeight = brandsData.style.productStyle.isFixedHeight
          this.fixedHeight = brandsData.style.productStyle.fixedHeight
        }
        this.isFilterActive = brandsData.style.hasOwnProperty('itemStyle') && brandsData.style.itemStyle.hasOwnProperty('showFilter') ? brandsData.style.itemStyle.showFilter : true;
        let styles: any = await document.getElementsByName('brandStyle');
        for (let i = 0; i < styles.length; i++) {
          if (brandsData.style.productStyle.style == styles[i].value) {
            styles[i].checked = true
          }
        }
      }
    }
    if (this.dataType == 'categories') {
      let prevMsgDiv = document.getElementById(this.previousCategory);
      if (prevMsgDiv) {
        prevMsgDiv.style.background = 'white';
      }
      let msgDiv = document.getElementById('category' + i);
      if (msgDiv) {
        msgDiv.style.background = 'var(--ion-color-categories-background)';
      }
      this.previousCategory = 'category' + i
      let resetStyles: any = await document.getElementsByName('categoryStyle');
      for (let i = 0; i < resetStyles.length; i++) {
        resetStyles[i].checked = false
      }
      let resetStyles2: any = await document.getElementsByName('categoryProductStyle');
      for (let i = 0; i < resetStyles2.length; i++) {
        resetStyles2[i].checked = false
      }
      this.selectedItem = this.dataList[i].name
      this.selectId = this.dataList[i].id
      let categoryData: any = await this.designService.getStyleData(this.selectId, this.dataType)
      if (categoryData && categoryData.style) {
        this.largeGridNo = categoryData.style.productStyle.gridColumn.lg
        this.mediumGridNo = categoryData.style.productStyle.gridColumn.md
        this.smallGridNo = categoryData.style.productStyle.gridColumn.sm
        if (categoryData.style.productStyle.hasOwnProperty('isFixedHeight') && categoryData.style.productStyle.hasOwnProperty('fixedHeight')) {
          this.isFixedHeight = categoryData.style.productStyle.isFixedHeight
          this.fixedHeight = categoryData.style.productStyle.fixedHeight
        }
        this.isFilterActive = categoryData.style.itemStyle.hasOwnProperty('showFilter') ? categoryData.style.itemStyle.showFilter : true;
        let styles: any = await document.getElementsByName('categoryStyle');
        for (let i = 0; i < styles.length; i++) {
          if (categoryData.style.itemStyle.style == styles[i].value) {
            styles[i].checked = true
          }
        }

        this.showVariant = categoryData.style.productStyle.showVariant || false;

        let styles2: any = await document.getElementsByName('categoryProductStyle');
        for (let i = 0; i < styles2.length; i++) {
          if (categoryData.style.productStyle.style == styles2[i].value) {
            styles2[i].checked = true
          }
        }
      }
      this.selectSubId = ''
      this.selectedSubItem = ''
    }
    if (this.loading) {
      await this.loading.dismiss()
    }
  }

  selectLargeGridNo(value) {
    this.largeGridNo = parseInt(value)
  }

  selectMediumGridNo(value) {
    this.mediumGridNo = parseInt(value)
  }

  selectSmallGridNo(value) {
    this.smallGridNo = parseFloat(value)
  }

  async saveHeaderStyle() {
    let headerWidth: any = document.getElementsByName('headerWidth');
    let widthType;
    for (let i = 0; i < headerWidth.length; i++) {
      if (headerWidth[i].checked) {
        widthType = headerWidth[i].value;
      }
    }
    let styles: any = document.getElementsByName('headerStyle');
    let style_value;
    for (let i = 0; i < styles.length; i++) {
      if (styles[i].checked) {
        style_value = styles[i].value;
      }
    }
    const color = this.headerBackgroundColor
    const r = parseInt(color.substr(1, 2), 16)
    const g = parseInt(color.substr(3, 2), 16)
    const b = parseInt(color.substr(5, 2), 16)
    const color2 = this.headerForegroundColor
    const r2 = parseInt(color2.substr(1, 2), 16)
    const g2 = parseInt(color2.substr(3, 2), 16)
    const b2 = parseInt(color2.substr(5, 2), 16)
    let colorObj = {
      backgroundColor: {
        hex: this.headerBackgroundColor,
        rgb: {
          r: r,
          g: g,
          b: b
        }
      },
      foregroundColor: {
        hex: this.headerForegroundColor,
        rgb: {
          r: r2,
          g: g2,
          b: b2
        }
      }
    }
    let styleObj = {
      sectionWidth: widthType
    }
    if (style_value == undefined) {
      this.presentAlert('Please choose a style for header!')
    }
    if (widthType == undefined) {
      this.presentAlert('Please choose a width style!')
    }
    else {
      let styleResult = await this.designService.headerStyleData({ headerStyle: style_value, color: colorObj, style: styleObj })
      if (styleResult) {
        this.presentAlert('Setting saved successfully!')
      }
    }
  }

  async saveLogoSettings() {
    let pxHeight = this.logoHeight
    let pxWidth = this.logoWidth
    if (!this.logoUrlData) {
      this.logoUrlData = "";
    }
    let styleResult = await this.designService.headerStyleData({
      logo: {
        height: pxHeight,
        width: pxWidth,
        customSize: this.isCustomSizeActive,
        logoUrl: this.logoUrlData
      }
    })
    if (styleResult) {
      this.presentAlert('Setting saved successfully!')
    }
  }

  async deleteCustomLogo() {
    // await this.designService.deleteLogoImg(this.logoUrlData);
    this.logoUrlData = "";
    this.presentAlert('Logo deleted successfully');
  }

  async deleteWidgetBgImage() {
    this.widgetBgImage = "";
    this.presentAlert('Background image deleted successfully');
  }

  async saveNotificationSettings() {
    if (!this.notiText) {
      this.presentAlert('Please fill the Text!')
    }
    else {
      const color = this.notiBackgroundColor
      const r = parseInt(color.substr(1, 2), 16)
      const g = parseInt(color.substr(3, 2), 16)
      const b = parseInt(color.substr(5, 2), 16)
      const color2 = this.notiForegroundColor
      const r2 = parseInt(color2.substr(1, 2), 16)
      const g2 = parseInt(color2.substr(3, 2), 16)
      const b2 = parseInt(color2.substr(5, 2), 16)
      let styleResult = await this.designService.headerStyleData({
        notificationBar: {
          show: this.isNotiActive,
          text: this.notiText,
          color: {
            backgroundColor: {
              hex: this.notiBackgroundColor,
              rgb: {
                r: r,
                g: g,
                b: b
              }
            },
            foregroundColor: {
              hex: this.notiForegroundColor,
              rgb: {
                r: r2,
                g: g2,
                b: b2
              }
            }
          }
        }
      })
      if (styleResult) {
        this.presentAlert('Setting saved successfully!')
      }
    }
  }

  async saveInfoSettings() {
    if (!this.infoLeftText || !this.infoRightText) {
      this.presentAlert('Please fill the Text!')
    }
    else {
      const color = this.infoBackgroundColor
      const r = parseInt(color.substr(1, 2), 16)
      const g = parseInt(color.substr(3, 2), 16)
      const b = parseInt(color.substr(5, 2), 16)
      const color2 = this.infoForegroundColor
      const r2 = parseInt(color2.substr(1, 2), 16)
      const g2 = parseInt(color2.substr(3, 2), 16)
      const b2 = parseInt(color2.substr(5, 2), 16)
      let styleResult = await this.designService.headerStyleData({
        infoBar: {
          show: this.isInfoActive,
          leftText: this.infoLeftText,
          rightText: this.infoRightText,
          color: {
            backgroundColor: {
              hex: this.infoBackgroundColor,
              rgb: {
                r: r,
                g: g,
                b: b
              }
            },
            foregroundColor: {
              hex: this.infoForegroundColor,
              rgb: {
                r: r2,
                g: g2,
                b: b2
              }
            }
          }
        }
      })
      if (styleResult) {
        this.presentAlert('Setting saved successfully!')
      }
    }
  }

  async saveLoginBtn() {
    const color = this.loginBackgroundColor
    const r = parseInt(color.substr(1, 2), 16)
    const g = parseInt(color.substr(3, 2), 16)
    const b = parseInt(color.substr(5, 2), 16)
    const color2 = this.loginForegroundColor
    const r2 = parseInt(color2.substr(1, 2), 16)
    const g2 = parseInt(color2.substr(3, 2), 16)
    const b2 = parseInt(color2.substr(5, 2), 16)
    if (!this.loginText) {
      this.presentAlert('Please fill the Text!')
    }
    else {
      let styleResult = await this.designService.headerStyleData({
        loginButton: {
          show: this.isLoginActive,
          text: this.loginText,
          color: {
            backgroundColor: {
              hex: this.loginBackgroundColor,
              rgb: {
                r: r,
                g: g,
                b: b
              }
            },
            foregroundColor: {
              hex: this.loginForegroundColor,
              rgb: {
                r: r2,
                g: g2,
                b: b2
              }
            }
          }
        }
      })
      if (styleResult) {
        this.presentAlert('Setting saved successfully!')
      }
    }
  }

  async saveWishlistBtn() {
    if (!this.wishlistText) {
      this.presentAlert('Please fill the Text!')
    }
    else {
      const color = this.wishBackgroundColor
      const r = parseInt(color.substr(1, 2), 16)
      const g = parseInt(color.substr(3, 2), 16)
      const b = parseInt(color.substr(5, 2), 16)
      const color2 = this.wishForegroundColor
      const r2 = parseInt(color2.substr(1, 2), 16)
      const g2 = parseInt(color2.substr(3, 2), 16)
      const b2 = parseInt(color2.substr(5, 2), 16)
      let styleResult = await this.designService.headerStyleData({
        wishlistButton: {
          show: this.isWishlistActive,
          text: this.wishlistText,
          color: {
            backgroundColor: {
              hex: this.wishBackgroundColor,
              rgb: {
                r: r,
                g: g,
                b: b
              }
            },
            foregroundColor: {
              hex: this.wishForegroundColor,
              rgb: {
                r: r2,
                g: g2,
                b: b2
              }
            }
          }
        }
      })
      if (styleResult) {
        this.presentAlert('Setting saved successfully!')
      }
    }
  }

  async saveCartBtn() {
    if (!this.cartText) {
      this.presentAlert('Please fill the Text!')
    }
    else {
      const color = this.cartBackgroundColor
      const r = parseInt(color.substr(1, 2), 16)
      const g = parseInt(color.substr(3, 2), 16)
      const b = parseInt(color.substr(5, 2), 16)
      const color2 = this.cartForegroundColor
      const r2 = parseInt(color2.substr(1, 2), 16)
      const g2 = parseInt(color2.substr(3, 2), 16)
      const b2 = parseInt(color2.substr(5, 2), 16)
      let styleResult = await this.designService.headerStyleData({
        cartButton: {
          show: this.isCartActive,
          text: this.cartText,
          color: {
            backgroundColor: {
              hex: this.cartBackgroundColor,
              rgb: {
                r: r,
                g: g,
                b: b
              }
            },
            foregroundColor: {
              hex: this.cartForegroundColor,
              rgb: {
                r: r2,
                g: g2,
                b: b2
              }
            }
          }
        }
      })
      if (styleResult) {
        this.presentAlert('Setting saved successfully!')
      }
    }
  }

  async saveSeachBar() {
    if (!this.searchText) {
      this.presentAlert('Please fill the Text!')
    }
    else {
      let styleResult = await this.designService.headerStyleData({
        search: {
          placeholderText: this.searchText,
          show: this.isSearchActive
        }
      })
      if (styleResult) {
        this.presentAlert('Setting saved successfully!')
      }
    }
  }

  async saveGlobalItemStyle() {
    let styles: any = document.getElementsByName('globalCatStyle');
    let style_value;
    for (let i = 0; i < styles.length; i++) {
      if (styles[i].checked) {
        style_value = styles[i].value;
      }
    }
    if (style_value == undefined) {
      this.presentAlert('Please choose a global style for Category!')
    }
    else {
      let gridColumn = {
        lg: this.largeGridNo,
        md: this.mediumGridNo,
        sm: this.smallGridNo
      }
      let styleObj = {
        isFixedHeight: this.isFixedHeight,
        fixedHeight: this.fixedHeight,
        gridColumn: gridColumn,
        style: style_value,
        showFilter: this.isFilterActive
      }
      let styleResult = await this.designService.updateGlobalStyleData(this.selectId, 'itemStyle', styleObj)
      if (styleResult) {
        this.presentAlert('Setting saved successfully!')
      }
    }
  }

  async saveGlobalProductStyle() {
    let styles: any = document.getElementsByName('globalProductStyle');
    let style_value;
    for (let i = 0; i < styles.length; i++) {
      if (styles[i].checked) {
        style_value = styles[i].value;
      }
    }
    if (style_value == undefined) {
      this.presentAlert('Please choose a global style for Product!')
    }
    else {
      let gridColumn = {
        lg: this.largeGridNo,
        md: this.mediumGridNo,
        sm: this.smallGridNo
      }
      let styleObj = {
        isFixedHeight: this.isFixedHeight,
        fixedHeight: this.fixedHeight,
        gridColumn: gridColumn,
        style: style_value,
        showVariant: this.showVariant
      }
      let styleResult = await this.designService.updateGlobalStyleData(this.selectId, 'productStyle', styleObj)
      if (styleResult) {
        this.presentAlert('Setting saved successfully!')
      }
    }
  }

  async saveGlobalProductDetailStyle() {
    // let styles: any = document.getElementsByName('globalProductDetailStyle');
    // let style_value;
    // for (let i = 0; i < styles.length; i++) {
    //   if (styles[i].checked) {
    //     style_value = styles[i].value;
    //   }
    // }
    // if (style_value == undefined) {
    //   this.presentAlert('Please choose a global style for Product Detail !');
    // }
    // else {
    let styleObj = {
      // isFixedHeight: this.isFixedHeight,
      // fixedHeight: this.fixedHeight,
      // style: style_value,
      isFixedImageHeight: this.isFixedImageHeight,
      imageHeight: this.FixedImageHeight,
      gridColumn: this.imageStyleGrid

    }
    let styleResult = await this.designService.updateGlobalStyleData(this.selectId, 'productDetailStyle', styleObj);
    if (styleResult) {
      this.presentAlert('Setting saved successfully!');
    }
    // }
  }

  async saveStyleCategory() {
    let styles: any = document.getElementsByName('categoryStyle');
    let style_value;
    for (let i = 0; i < styles.length; i++) {
      if (styles[i].checked) {
        style_value = styles[i].value;
      }
    }
    let styles2: any = document.getElementsByName('categoryProductStyle');
    let style_value2;
    for (let i = 0; i < styles2.length; i++) {
      if (styles2[i].checked) {
        style_value2 = styles2[i].value;
      }
    }
    if (style_value == undefined || style_value2 == undefined) {
      this.presentAlert('Please choose a style!')
    }
    else {
      let gridColumn = {
        lg: this.largeGridNo,
        md: this.mediumGridNo,
        sm: this.smallGridNo
      }
      let styleObj = {
        itemStyle: {
          isFixedHeight: this.isFixedHeight,
          fixedHeight: this.fixedHeight,
          gridColumn: gridColumn,
          style: style_value,
          showFilter: this.isFilterActive
        },
        productStyle: {
          isFixedHeight: this.isFixedHeight,
          fixedHeight: this.fixedHeight,
          gridColumn: gridColumn,
          style: style_value2,
          showVariant: this.showVariant
        }
      }
      let styleResult = await this.designService.updateStyleData(this.selectId, this.dataType, styleObj)
      if (styleResult) {
        this.presentAlert('Setting saved successfully!')
      }
    }
  }

  async saveSubcatStyle() {
    let styles: any = document.getElementsByName('subcatStyle');
    let style_value;
    for (let i = 0; i < styles.length; i++) {
      if (styles[i].checked) {
        style_value = styles[i].value;
      }
    }
    if (style_value == undefined) {
      this.presentAlert('Please choose a style for Subcategory Products!')
    }
    else {
      let gridColumn = {
        lg: this.largeGridNo,
        md: this.mediumGridNo,
        sm: this.smallGridNo
      }
      let styleObj = {
        productStyle: {
          isFixedHeight: this.isFixedHeight,
          fixedHeight: this.fixedHeight,
          gridColumn: gridColumn,
          style: style_value,
          showVariant: this.showVariant
        }
      }
      let styleResult = await this.designService.updateSubStyleData(this.selectId, this.selectSubId, styleObj)
      if (styleResult) {
        this.presentAlert('Setting saved successfully!')
      }
    }
  }

  async saveStyleBrand() {
    let styles: any = document.getElementsByName('brandStyle');
    let style_value;
    for (let i = 0; i < styles.length; i++) {
      if (styles[i].checked) {
        style_value = styles[i].value;
      }
    }
    if (style_value == undefined) {
      this.presentAlert('Please choose a style for Brand!')
    }
    else {
      let gridColumn = {
        lg: this.largeGridNo,
        md: this.mediumGridNo,
        sm: this.smallGridNo
      }
      let styleObj = {
        itemStyle: {
          showFilter: this.isFilterActive
        },
        productStyle: {
          isFixedHeight: this.isFixedHeight,
          fixedHeight: this.fixedHeight,
          gridColumn: gridColumn,
          style: style_value
        }
      }
      let styleResult = await this.designService.updateStyleData(this.selectId, this.dataType, styleObj)
      if (styleResult) {
        this.presentAlert('Setting saved successfully!')
      }
    }
  }

  async saveStyleSection() {
    if (this.widgetType == 'categories' || this.widgetType == 'brands' || this.widgetType == 'services' || this.widgetType == 'vendors') {
      let sectionWidth: any = document.getElementsByName('sectionWidth');
      let widthType;
      for (let i = 0; i < sectionWidth.length; i++) {
        if (sectionWidth[i].checked) {
          widthType = sectionWidth[i].value;
        }
      }
      let styles2: any = document.getElementsByName('sectionStyle');
      let style_value2;
      for (let i = 0; i < styles2.length; i++) {
        if (styles2[i].checked) {
          style_value2 = styles2[i].value;
        }
      }
      if (widthType == undefined) {
        this.presentAlert('Please choose a style for Section Width!')
      }
      if (style_value2 == undefined) {
        this.presentAlert('Please choose a style for Section Items!')
      }
      else {
        let gridColumn = {
          lg: this.largeGridNo,
          md: this.mediumGridNo,
          sm: this.smallGridNo
        }
        let styleObj = {
          widgetStyle: {
            carousalActive: this.isCarousalActive,
            sectionWidth: widthType,
            backgroundColor: this.widgetBgColor,
            backgroundImage: this.widgetBgImage
          },
          itemStyle: {
            isFixedHeight: this.isFixedHeight,
            fixedHeight: this.fixedHeight,
            gridColumn: gridColumn,
            style: style_value2,
          },
        }

        let styleResult = await this.designService.updateSectionData(this.widgetId, styleObj)
        if (styleResult) {
          this.presentAlert('Setting saved successfully!')
        }
      }
    }
    else if (this.widgetType == 'product-carousel' || this.widgetType == 'product-list') {
      let sectionWidth: any = document.getElementsByName('sectionWidth');
      let widthType;
      for (let i = 0; i < sectionWidth.length; i++) {
        if (sectionWidth[i].checked) {
          widthType = sectionWidth[i].value;
        }
      }
      let styles2: any = document.getElementsByName('sectionProductStyle');
      let style_value2;
      for (let i = 0; i < styles2.length; i++) {
        if (styles2[i].checked) {
          style_value2 = styles2[i].value;
        }
      }
      if (widthType == undefined) {
        this.presentAlert('Please choose a style for Width!')
      }
      if (style_value2 == undefined) {
        this.presentAlert('Please choose a style for Section Items!')
      }
      else {
        let gridColumn = {
          lg: this.largeGridNo,
          md: this.mediumGridNo,
          sm: this.smallGridNo
        }
        let styleObj = {
          //sectionWidth: widthType,
          widgetStyle: {
            sectionWidth: widthType,
            displayAlignment: this.displayAlignment,
            backgroundColor: this.widgetBgColor,
            backgroundImage: this.widgetBgImage
          },
          productStyle: {
            isFixedHeight: this.isFixedHeight,
            fixedHeight: this.fixedHeight,
            gridColumn: gridColumn,
            style: style_value2,
            showVariant: this.showVariant
            //displayAlignment: this.displayAlignment
          },
        }
        let styleResult = await this.designService.updateSectionData(this.widgetId, styleObj)
        if (styleResult) {
          this.presentAlert('Setting saved successfully!')
        }
      }
    }
    else if (this.widgetType == 'image-banner') {
      let sectionWidth: any = document.getElementsByName('sectionWidth');
      let widthType;
      for (let i = 0; i < sectionWidth.length; i++) {
        if (sectionWidth[i].checked) {
          widthType = sectionWidth[i].value;
        }
      }

      if (widthType == undefined) {
        this.presentAlert('Please choose a style for Width!')
        return;
      }

      let gridColumn = {
        lg: this.largeGridNo ? this.largeGridNo : 5,
        md: this.mediumGridNo ? this.mediumGridNo : 4,
        sm: this.smallGridNo ? this.smallGridNo : 2
      }
      let styleObj = {
        // sectionWidth: widthType,
        widgetStyle: {
          carousalActive: this.isCarousalActive,
          isDisplayFormat: this.isDisplayFormat,
          displayFormat: this.displayFormat,
          sectionWidth: widthType,
          gridColumn: gridColumn,
          backgroundColor: this.widgetBgColor,
          backgroundImage: this.widgetBgImage
        },
      }
      console.log(styleObj);

      let styleResult = await this.designService.updateSectionData(this.widgetId, styleObj)
      if (styleResult) {
        this.presentAlert('Setting saved successfully!')
      }

    }
    else if (this.widgetType == 'banner-slider' || this.widgetType == 'image-block' || this.widgetType == 'video-block' || this.widgetType == 'text-block' || this.widgetType == 'form' || this.widgetType == 'document') {
      let sectionWidth: any = document.getElementsByName('sectionWidth');
      let widthType;
      for (let i = 0; i < sectionWidth.length; i++) {
        if (sectionWidth[i].checked) {
          widthType = sectionWidth[i].value;
        }
      }

      if (widthType == undefined) {
        this.presentAlert('Please choose a style for Width!')
      }
      let styleObj = {
        widgetStyle: {
          sectionWidth: widthType,
          backgroundColor: this.widgetBgColor,
          backgroundImage: this.widgetBgImage
        },
      }
      // console.log(styleObj);
      let styleResult = await this.designService.updateSectionData(this.widgetId, styleObj)
      if (styleResult) {
        this.presentAlert('Setting saved successfully!')
      }

    }


    // else {
    //   let styles: any = document.getElementsByName('sectionWidth');
    //   let style_value;
    //   for (let i = 0; i < styles.length; i++) {
    //     if (styles[i].checked) {
    //       style_value = styles[i].value;
    //     }
    //   }
    //   if (style_value == undefined) {
    //     this.presentAlert('Please choose a style for Width!')
    //   }
    //   else {
    //     let styleObj = {
    //       width: style_value
    //     }
    //     let styleResult = await this.designService.updateSectionData(this.widgetId, styleObj)
    //     if (styleResult) {
    //       this.presentAlert('Setting saved successfully!')
    //     }
    //   }
    // }
  }

  async saveMenuData() {
    const color = this.menuBackgroundColor
    const r = parseInt(color.substr(1, 2), 16)
    const g = parseInt(color.substr(3, 2), 16)
    const b = parseInt(color.substr(5, 2), 16)
    const color2 = this.menuForegroundColor
    const r2 = parseInt(color2.substr(1, 2), 16)
    const g2 = parseInt(color2.substr(3, 2), 16)
    const b2 = parseInt(color2.substr(5, 2), 16)
    this.menuData.color = {
      backgroundColor: {
        hex: this.menuBackgroundColor,
        rgb: {
          r: r,
          g: g,
          b: b
        }
      },
      foregroundColor: {
        hex: this.menuForegroundColor,
        rgb: {
          r: r2,
          g: g2,
          b: b2
        }
      }
    }
    let styleResult = await this.designService.headerStyleData({ menuData: this.menuData })
    if (styleResult) {
      this.presentAlert('Setting saved successfully!')
    }
  }

  async selectSection(i, j) {
    await this.presentLoading()
    let prevMsgDiv = document.getElementById(this.previousSection);
    if (prevMsgDiv) {
      prevMsgDiv.style.background = 'white';
    }
    let msgDiv = document.getElementById('section' + i + j);
    if (msgDiv) {
      msgDiv.style.background = 'var(--ion-color-categories-background)';
    }
    this.previousSection = 'section' + i + j
    this.largeGridNo = 5
    this.mediumGridNo = 4
    this.smallGridNo = 2
    this.isFixedHeight = false
    this.fixedHeight = 150
    this.displayAlignment = 'left';
    let resetStyles: any = await document.getElementsByName('sectionStyle');
    for (let i = 0; i < resetStyles.length; i++) {
      resetStyles[i].checked = false
    }
    let resetStyles2: any = await document.getElementsByName('sectionWidth');
    for (let i = 0; i < resetStyles2.length; i++) {
      resetStyles2[i].checked = false
    }
    if (this.dataList.length) {
      this.widgetType = this.dataList[i].sections[j].widgetType
      this.widgetId = this.dataList[i].sections[j].widgetID
      console.log('dataList:', this.dataList);
      let widgetData: any = await this.designService.getSectionData(this.widgetId)
      console.log('widgetData:', widgetData);
      if (widgetData && widgetData.style && widgetData.style.itemStyle) {
        if (widgetData.style.itemStyle.hasOwnProperty('gridColumn')) {
          this.largeGridNo = widgetData.style.itemStyle.gridColumn.lg
          this.mediumGridNo = widgetData.style.itemStyle.gridColumn.md
          this.smallGridNo = widgetData.style.itemStyle.gridColumn.sm
        }
        if (widgetData.style.itemStyle.hasOwnProperty('isFixedHeight')) {
          this.isFixedHeight = widgetData.style.itemStyle.isFixedHeight
        }
        if (widgetData.style.itemStyle.hasOwnProperty('fixedHeight')) {
          this.fixedHeight = widgetData.style.itemStyle.fixedHeight
        }
        // if (widgetData.style.itemStyle.hasOwnProperty('carousalActive')) {
        //   this.isCarousalActive = widgetData.style.itemStyle.carousalActive;
        // }

        let styles: any = await document.getElementsByName('sectionStyle');
        for (let i = 0; i < styles.length; i++) {
          if (widgetData.style.itemStyle.style == styles[i].value) {
            styles[i].checked = true
          }
        }
      }

      // ? For Image Banner Only Start
      // if (widgetData.style.itemStyle.hasOwnProperty('displayFormat') && widgetData.style.itemStyle.hasOwnProperty('isDisplayFormat')) {
      if (this.widgetType == 'image-banner') {
        // console.log(this.widgetType);
        if (widgetData.style && widgetData.style.widgetStyle) {
          let bannerLength = await this.designService.getSectionBannerLength(this.widgetId);
          // console.log(bannerLength);
          if (bannerLength >= 3) {
            this.bannerLength = bannerLength;
            this.isDisplayFormat = widgetData.style.widgetStyle.isDisplayFormat;
          } else {
            this.bannerLength = bannerLength;
            this.isDisplayFormat = widgetData.style.widgetStyle.isDisplayFormat;
          }
          this.displayFormat = widgetData.style.widgetStyle.displayFormat;
          this.isCarousalActive = widgetData.style.widgetStyle.carousalActive;
          // this.isDisplayFormat = widgetData.style.itemStyle.isDisplayFormat;
        }
        else {
          this.isCarousalActive = false;
          this.isDisplayFormat = false;
          let styleObj = {
            widgetStyle: {
              carousalActive: false,
              isDisplayFormat: false,
              displayFormat: '',
              sectionWidth: '',
              gridColumn: '',
              backgroundColor: 'transparent',
              backgroundImage: ''
            },
          }
          console.log(styleObj);
          let styleResult = await this.designService.updateSectionData(this.widgetId, styleObj);
        }
      }
      // ? For Image Banner Only End

      if (widgetData && widgetData.style && widgetData.style.productStyle) {
        this.largeGridNo = widgetData.style.productStyle.gridColumn.lg
        this.mediumGridNo = widgetData.style.productStyle.gridColumn.md
        this.smallGridNo = widgetData.style.productStyle.gridColumn.sm
        if (widgetData.style.productStyle.hasOwnProperty('isFixedHeight')) {
          this.isFixedHeight = widgetData.style.productStyle.isFixedHeight
        }
        if (widgetData.style.productStyle.hasOwnProperty('fixedHeight')) {
          this.fixedHeight = widgetData.style.productStyle.fixedHeight
        }
        // if (widgetData.style.productStyle.hasOwnProperty('displayAlignment')) {
        //   this.displayAlignment = widgetData.style.productStyle.displayAlignment
        // }

        this.showVariant = widgetData.style.productStyle.showVariant || false;

        let styles: any = await document.getElementsByName('sectionProductStyle');
        for (let i = 0; i < styles.length; i++) {
          if (widgetData.style.productStyle.style == styles[i].value) {
            styles[i].checked = true
          }
        }
      }
      if (widgetData && widgetData.style && widgetData.style.widgetStyle) {
        if (widgetData.style.widgetStyle.hasOwnProperty('displayAlignment')) {
          this.displayAlignment = widgetData.style.widgetStyle.displayAlignment
        }
        // if (widgetData.style.widgetStyle.hasOwnProperty('carousalActive')) {
        //   this.isCarousalActive = widgetData.style.widgetStyle.carousalActive;
        // }
        if (widgetData.style.widgetStyle.hasOwnProperty('sectionWidth')) {
          // console.log(widgetData.style.sectionWidth);
          let styles2: any = await document.getElementsByName('sectionWidth');
          for (let i = 0; i < styles2.length; i++) {
            if (widgetData.style.widgetStyle.sectionWidth == styles2[i].value) {
              styles2[i].checked = true
            }
          }
        }
        if (widgetData.style.widgetStyle.hasOwnProperty('gridColumn')) {
          this.largeGridNo = widgetData.style.widgetStyle.gridColumn.lg
          this.mediumGridNo = widgetData.style.widgetStyle.gridColumn.md
          this.smallGridNo = widgetData.style.widgetStyle.gridColumn.sm
        }
        // console.log(this.widgetBgColor, this.widgetBgImage);
        this.widgetBgColor = widgetData.style.widgetStyle.backgroundColor ? widgetData.style.widgetStyle.backgroundColor : "transparent";
        this.widgetBgImage = widgetData.style.widgetStyle.backgroundImage ? widgetData.style.widgetStyle.backgroundImage : '';
        this.isCarousalActive = widgetData.style.widgetStyle.carousalActive ? widgetData.style.widgetStyle.carousalActive : false;
      } else {
        this.widgetBgColor = "transparent";
        this.widgetBgImage = '';
      }

      // if (widgetData && widgetData.style && widgetData.style.sectionWidth) {
      //   // console.log(widgetData.style.sectionWidth);
      //   let styles2: any = await document.getElementsByName('sectionWidth');
      //   for (let i = 0; i < styles2.length; i++) {
      //     if (widgetData.style.sectionWidth == styles2[i].value) {
      //       styles2[i].checked = true
      //     }
      //   }
      // }
    }
    if (this.loading) {
      await this.loading.dismiss()
    }
  }

  activeNoti() {
    this.isNotiActive = !this.isNotiActive
  }

  activeInfo() {
    this.isInfoActive = !this.isInfoActive
  }

  activeLogin() {
    this.isLoginActive = !this.isLoginActive
  }

  activeWishlist() {
    this.isWishlistActive = !this.isWishlistActive
  }

  activeCart() {
    this.isCartActive = !this.isCartActive
  }

  activeSearch() {
    this.isSearchActive = !this.isSearchActive
  }

  activeMenu() {
    this.menuData.show = !this.menuData.show
  }

  activeFixedHeight() {
    this.isFixedHeight = !this.isFixedHeight
  }

  activeShowFilter() {
    this.isFilterActive = !this.isFilterActive;
    // console.log(this.isFilterActive);    
  }

  activeCustomSizeShow() {
    this.isCustomSizeActive = !this.isCustomSizeActive;
    // console.log(this.isFilterActive);    
  }

  activeCarousal() {
    this.isCarousalActive = !this.isCarousalActive;
  }

  activeDisplayFormat() {
    this.isDisplayFormat = !this.isDisplayFormat;
  }

  activeImageHeight() {
    this.isFixedImageHeight = !this.isFixedImageHeight;
  }

  selectDisplayFormat(value) {
    this.displayFormat = value;
    // console.log(this.displayFormat);
  }

  selectDisplayAlignment(value) {
    this.displayAlignment = value;
    console.log(this.displayAlignment);

  }

  selectImageStyle(value) {
    this.imageStyleGrid = value;
    // console.log(this.imageStyleGrid);
  }

  async activeDesignStudio() {
    this.isStudioActive = !this.isStudioActive
    let dataChange = await this.designService.setActiveStatus(this.isStudioActive)
    if (dataChange) {
      this.presentAlert('Design studio status saved!')
    }
  }

  async uploadLogo(files: FileList) {
    this.presentLoading();
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = async (event: any) => { // called once readAsDataURL is completed
        let base64Image: any = event.target.result;
        this.logoUrlData = await this.designService.uploadLogoImg(base64Image);
        if (this.loading) {
          this.loading.dismiss();
        }
      }
    }
  }

  async uploadBgImage(files: FileList) {
    this.presentLoading();
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = async (event: any) => { // called once readAsDataURL is completed
        let base64Image: any = event.target.result;
        this.widgetBgImage = await this.designService.uploadWidgetBgImg(base64Image, this.widgetId);
        console.log(this.widgetBgImage);
        if (this.loading) {
          this.loading.dismiss();
        }
      }
    }
  }

  toggleShowVariant() {
    this.showVariant = !this.showVariant;
  }

  segmentChange(value: any) {
    this.currentCatOption = value;
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['ok']
    });

    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait ...'
    });
    await this.loading.present();
  }


}
