import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProductAddonsService } from 'src/app/services/product-addons/product-addons.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-product-addons',
  templateUrl: './product-addons.page.html',
  styleUrls: ['./product-addons.page.scss'],
})
export class ProductAddonsPage implements OnInit {

  addOnsData: any;
  activeTile = 0;
  selectedAddOn: any;
  addOnValid: boolean = false;

  constructor(
    private addOnsService: ProductAddonsService,
    private sharedService: SharedService,
    private alertController: AlertController
  ) { }

  async ionViewWillEnter() {
    await this.sharedService.presentLoading();
    let res = await this.addOnsService.getAddOns();
    await this.sharedService.loading.dismiss();
    if (res) {
      this.addOnsData = res;
      this.changeAddOn(0);
      // console.log(this.addOnsData);
    }
  }

  ngOnInit() {
  }

  defaultObj() {
    let section = {
      name: '',
      active: false,
      multiple: false,
      required: false,
      options: [
        {
          name: '',
          price: null,
        }
      ],
    }
    return section;
  }

  changeAddOn(i: number) {
    this.activeTile = i;
    this.selectedAddOn = this.addOnsData[i];
    // console.log(this.selectedAddOn);
  }

  addTemplate() {
    this.activeTile = 0;
    this.selectedAddOn = {
      name: '',
      type: 'product-addOn',
      sections: [],
    };
  }

  async askConfirmDelete() {
    const alert = await this.alertController.create({
      subHeader: `Are you sure you want to delete ${this.selectedAddOn.name} ?`,
      buttons: [
        {
          text: "No",
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: "Yes",
          handler: async () => {
            this.deleteTemplate();
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteTemplate() {
    await this.sharedService.presentLoading();
    let res = await this.addOnsService.deleteAddOn(this.selectedAddOn.id);
    await this.sharedService.loading.dismiss();
    if (res) {
      this.ionViewWillEnter();
      this.sharedService.presentAlert('Deleted successfully');
    } else {
      this.sharedService.presentAlert('Something went wrong !');
    }

  }

  addSection() {
    this.selectedAddOn.sections.push(this.defaultObj());
  }

  addOption(i: number, name: any, price: any) {
    // console.log(i, "name:", name.value, "price", price.value);

    if (name.value == "" || price.value == "") {
      this.sharedService.presentAlert("Please fill both detail");
    }
    else {
      this.selectedAddOn.sections[i].options.push(
        { name: name.value, price: parseFloat(price.value), },
      );
      name.value = "";
      price.value = null;
    }
  }

  removeOption(i: number, j: number) {
    // console.log(i, j);
    this.selectedAddOn.sections[i].options.splice(j, 1);
  }

  removeSection(i: number) {
    this.selectedAddOn.sections.splice(i, 1);
  }

  toggleCheckBox(i: number, status: string) {
    if (status == 'active') {
      // console.log(i, status);
      this.selectedAddOn.sections[i].active = !this.selectedAddOn.sections[i].active;
    }
    if (status == 'multiple') {
      // console.log(i, status);
      this.selectedAddOn.sections[i].multiple = !this.selectedAddOn.sections[i].multiple;
    }
    if (status == 'required') {
      // console.log(i, status);
      this.selectedAddOn.sections[i].required = !this.selectedAddOn.sections[i].required;
    }
  }

  async saveAddOns() {
    await this.sharedService.presentLoading();
    let addObj = {
      name: this.selectedAddOn.name,
      sections: this.selectedAddOn.sections,
      type: this.selectedAddOn.type
    }
    // console.log(this.selectedAddOn.id);
    for (let section of this.selectedAddOn.sections) {
      // console.log(section);
      if (section.active && section.name == '') {
        this.addOnValid = false;
        // console.log(this.addOnValid);
        break;
      } else {
        this.addOnValid = true;
        // console.log(this.addOnValid);
      }
    }

    if (this.selectedAddOn.name == '' || !this.addOnValid) {
      await this.sharedService.loading.dismiss();
      this.sharedService.presentAlert('Please fill all details for addOns !');
    }
    else {
      let res = await this.addOnsService.setAddons(this.selectedAddOn.id, addObj);
      await this.sharedService.loading.dismiss();
      if (res) {
        if (!this.selectedAddOn.id) {
          console.log('ionViewWillEnter');
          this.ionViewWillEnter();
          this.sharedService.presentAlert('Saved successfully');
        }
        else {
          this.sharedService.presentAlert('Updated successfully');
        }
      } else {
        this.sharedService.presentAlert('Something went wrong !');
      }
    }
  }

}
