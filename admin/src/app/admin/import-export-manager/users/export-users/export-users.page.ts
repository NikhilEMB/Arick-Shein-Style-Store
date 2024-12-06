import { Component, OnInit } from '@angular/core'
import { ImportExportManagerService } from 'src/app/services/import-export-manager/import-export-manager.service'
import { SharedService } from 'src/app/services/shared/shared.service'
import { ExportToCsv } from 'export-to-csv'
import { ModalController, AlertController, NavController, LoadingController, ToastController, Events } from '@ionic/angular'

@Component({
  selector: 'app-export-users',
  templateUrl: './export-users.page.html',
  styleUrls: ['./export-users.page.scss'],
})
export class ExportUsersPage implements OnInit {

  totalUsers: any = 0
  currentSelection = 'all'
  loading: any;
  userFields = [
    'active',
    'name',
    'phoneNo',
    'role'
  ]
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    filename: 'Users' + new Date().toLocaleString(),
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Exported Users ' + this.currentSelection,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

  constructor(
    private importExportManagerService: ImportExportManagerService,
    private toastController: ToastController,
    private loadingController: LoadingController,
  ) { }

  async ngOnInit() {}

  async presentLoading(msg?, duration?) {
    this.loading = await this.loadingController.create({
      message: msg || 'Please Wait...',
    });
    await this.loading.present();
  }

  async presentToastWithOptions(header: string, message: string, errorCode: string) {
    const toast = await this.toastController.create({
      mode: 'ios',
      color: 'dark',
      header: header,
      message: message,
      duration: 4000,
      position: 'top',
      buttons: [
        {
          side: 'start',
          text: errorCode,
          handler: () => {
            console.log('Favorite clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async ionViewWillEnter() {
    await this.presentLoading();
    this.totalUsers = await this.importExportManagerService.getUserByRole(this.currentSelection)
    console.log('totalUsers : ', this.totalUsers)
    await this.loading.dismiss();
  }

  async setUserStatus(selection: string) {
    await this.presentLoading();
    this.totalUsers = []
    this.currentSelection = selection
    this.totalUsers = await this.importExportManagerService.getUserByRole(this.currentSelection)
    await this.loading.dismiss();
  }

  saveDisable() {
    if (this.totalUsers && this.totalUsers.length) {
      return false
    } else {
      return true
    }
  }

  async exportUsersHandler() {
    try {
      if (this.totalUsers && this.totalUsers.length) {
        let exportData = [], count = 0, erroneousUsers = [];
        for (const user of this.totalUsers) {
          if (user.active && user.phoneNo && user.role && user.name) {
            count ++
            exportData.push({
              'S.no': count,
              'Name': user.name,
              'Role': user.role,
              'PhoneNo': '\t'+user.phoneNo
            })
          }
          else {
            erroneousUsers.push(user)
          }
        }
        console.log('Export data : ', exportData)
        console.log('count : ', count)
        console.log('total : ', this.totalUsers)
        console.log('erroneousUsers : ', erroneousUsers)
        if (count !== (this.totalUsers.length)) {
          await this.presentToastWithOptions('Warning In Export', `Found ${(this.totalUsers.length) - count} User(s) with details mismatch!`, 'ERR-103')  
        } else {
          await this.presentToastWithOptions('Export Success!', `${count} user(s) found for current selection!`, 'LOG-200')  
        }
        const csvExporter = new ExportToCsv(this.options);
        csvExporter.generateCsv(exportData);
        await this.loading.dismiss();
      } else {
        await this.presentToastWithOptions('User(s) Not Found!', `No user(s) found for current selection!`, 'ERR-101')  
        this.reset()
      }
    } catch (error) {
      console.log('Error in exportUsersHandler : ', error)
      await this.presentToastWithOptions('Something Went Wrong', `User Export Error!, Pls try again later.`, 'ERR-100')  
      this.reset()
    }
  }

  reset() {
    this.totalUsers = []
  }

}
