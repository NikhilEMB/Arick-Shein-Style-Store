import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { VendorPageComponent } from '../components/vendor-page/vendor-page.component';
import { ModalController } from '@ionic/angular';
import { SharedService } from '../services/shared/shared.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData;
  role;
  uid;

  constructor(
    private storage: Storage,
    private userService: UserService,
    private sharedService: SharedService,    
    private modalController: ModalController) { }

  async ionViewWillEnter() {
    this.role = await this.storage.get('userRole');    
    const userData: any = await this.userService.getUserInfo('service', this.role);
    
    this.uid = await this.storage.get('uid');
    // console.log('uid',this.uid);
    
    console.log('userData:', userData);
    if (userData) {
      this.userData = userData;
      if(userData.name === 'user') {
        this.userData.name = '';
      }
    }
  }

  ngOnInit() { }

  async update() {
    this.sharedService.presentLoading();
      const success = await this.userService.updateUserDetails(this.userData, this.role);
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
      if(success) {
       this.sharedService.presentAlert('Profile details updated successfully');
      } else{
        this.sharedService.presentAlert('Something went wrong. Please try again later.');
      }
  }

  
  removeImage() {
    this.userData.image.url = '';
    this.userData.image.mob = '';
    this.userData.image.thumb = '';
  }

  async uploadImage(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = (event:any) => { 
        let base64Image:any = event.target.result;
        this.userData.image.url = base64Image;
      }
    }
  }

  async pageVendor(id, name) {
    // console.log(id,name);
    const modal = await this.modalController.create({
      component: VendorPageComponent,
      cssClass: 'custom-modal big-modal',
      componentProps: { vendorId: id, vendorName: name }
    });
    modal.onDidDismiss().then(() => {
    })
    await modal.present();
  }

}
