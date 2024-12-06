import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-import-export-manager',
  templateUrl: './import-export-manager.page.html',
  styleUrls: ['./import-export-manager.page.scss'],
})
export class ImportExportManagerPage implements OnInit {
  isProductAccordion: boolean = true;
  isOrdersAccordion: boolean = true;
  isUsersAccordion: boolean = true;
  constructor(
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
  }

  downloadSampleCSV() {
    
  }

  toggleAccordion(status: string) {
    if (status == "product") {
      this.isProductAccordion = !this.isProductAccordion;
    }
    if (status == "orders") {
      this.isOrdersAccordion = !this.isOrdersAccordion;
    }
    if (status == "users") {
      this.isUsersAccordion = !this.isUsersAccordion;
    }
  }

  async openProductCSVCreator(status: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        type: status,
      }
    };
    if (status === "export products") {
      this.router.navigate(['product-csv-creator'], navigationExtras);
    }
    if (status === "import products") {
      this.router.navigate(['product-csv-importer'], navigationExtras);
    }
    if (status === "import products images") {
      this.router.navigate(['product-image-importer'], navigationExtras);
    }
    if (status === "delete bulk product(s)") {
      this.router.navigate(['bulk-product-delete'], navigationExtras);
    }
  }

  async openOrdersImportExport(status: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        type: status,
      }
    }
    if (status === "export orders") {
      this.router.navigate(['export-orders'], navigationExtras);
    }
    if (status === "import orders") {
      this.router.navigate(['import-orders'], navigationExtras);
    }
  }

  async openUsersImportExport(status: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        type: status,
      }
    }
    if (status === "export users") {
      this.router.navigate(['export-users'], navigationExtras);
    }
    if (status === "import users") {
      this.router.navigate(['import-users'], navigationExtras);
    }
  }

}
