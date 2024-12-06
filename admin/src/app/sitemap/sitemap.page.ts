import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddSitemapPage } from '../admin/add-sitemap/add-sitemap.page';
import { SitemapService } from '../services/sitemap/sitemap.service';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.page.html',
  styleUrls: ['./sitemap.page.scss'],
})
export class SitemapPage implements OnInit {
  siteMapData:any[]=[];

  constructor(
    private modalController: ModalController,
    private sitemapService: SitemapService
  ) { }

  async ngOnInit() {
    await this.getAllSitemaps();
  }


  async getAllSitemaps() {
    this.siteMapData = await this.sitemapService.getAllSiteMaps();
    console.log('siteMapData', this.siteMapData)
  }

  async addSitemapModal() {
    const modal = await this.modalController.create({
        component: AddSitemapPage,
        cssClass: 'add-point-css',
    });
    modal.onDidDismiss().then(async (res) => {
       if(res.data) {
        this.getAllSitemaps();
       }
    });
    await modal.present();
  }

  getProductNameForSiteMap(products: any[]): string {
    return products.map(branch => branch.name).join(', ');
  }

  async editSitemap(sitemap:any) {
    const modal = await this.modalController.create({
      component: AddSitemapPage,
      cssClass: 'add-point-css',
      componentProps: {
        sitemap: sitemap
      }
    });
    modal.onDidDismiss().then(async (res) => {
      if(res.data) {
        this.getAllSitemaps();
      }
    });
    await modal.present();
  }
}
