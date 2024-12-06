import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AttributesService } from 'src/app/services/attributes/attributes.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-admin-attributes',
  templateUrl: './admin-attributes.page.html',
  styleUrls: ['./admin-attributes.page.scss'],
})
export class AdminAttributesPage implements OnInit {

  dataType: string = 'productAttr';
  productInput: string;
  productArray = [];
  subValues = {};

  constructor(
    private attributeService: AttributesService,
    private alertController: AlertController,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.sharedService.presentLoading();
    let res: any = await this.attributeService.getProductAttributes();
    console.log('res:', res);
    if (res) {
      this.productArray = res.attributes;
      this.subValues = res.subValues ? res.subValues : {};
    }
    await this.sharedService.loading.dismiss();
  }

  showProductAttributes() {
    this.dataType = 'productAttr';
  }

  showUserAttributes() {
    this.dataType = 'userAttr';
  }

  addField() {
    for (const attribute of this.productArray) {
      if (this.productInput == attribute) {
        this.sharedService.presentAlert("Field already exists");
        return;
      }
    }
    this.productArray.push(this.productInput);
    this.productInput = '';
  }

  async addValueAlert(attribute) {
    const alert = await this.alertController.create({
      subHeader: 'Add Value',
      inputs: [
        {
          name: 'value',
          type: 'text',
          placeholder: 'Enter Value'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Done',
          handler: (data) => {
            if (this.subValues[attribute] && this.subValues[attribute].length) {
              this.subValues[attribute].push(data.value);
            } else {
              let arr = [data.value];
              this.subValues[attribute] = arr;
            }
            console.log('subValues', this.subValues);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteField(i: number) {
    console.log("name", this.productArray[i])

    delete this.subValues[this.productArray[i]];
    this.productArray.splice(i, 1);
  }

  deleteSubValue(i: number, j: number) {
    // console.log('subValue:', this.subValues, ' i:', i);
    this.subValues[i].splice(j, 1);
    console.log('subValue:', this.subValues, ' i:', i);
  }

  async saveAttrData() {
    console.log('attributes:', this.productArray);
    console.log('subValues:', this.subValues);

    await this.sharedService.presentLoading();
    let setData = await this.attributeService.setProductAttributes({
      attributes: this.productArray,
      subValues: this.subValues
    })
    await this.sharedService.loading.dismiss();
    if (setData) {
      await this.sharedService.presentAlert("Attribute saved successfully");
    } else {
      await this.sharedService.presentAlert("Something went wrong. Please try again later");
    }
  }

}
