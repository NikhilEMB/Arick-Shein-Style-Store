import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-appointment-orders',
  templateUrl: './appointment-orders.component.html',
  styleUrls: ['./appointment-orders.component.scss'],
})
export class AppointmentOrdersComponent implements OnInit {

  appointmentList: any = []
  appointmentData: any = {}
  vendorName = ''
  searchOrder: string = ''
  loading: any;

  constructor(private appointmentService: AppointmentService, private storage: Storage, public alertController: AlertController, 
    public loadingController: LoadingController) { }

  ngOnInit() { }

  async ionViewDidEnter() {
    this.getAppointments()
  }

  async getAppointments(){
    let userId = await this.storage.get('uid')
    let userRole = await this.storage.get('userRole')
    if (userRole == 'vendor') {
      let data: any = await this.appointmentService.getVendorAppointments(userId)
      if (data && data.length > 0) {
        this.appointmentList = data
        this.appointmentData = data[0]
      }
    }
    else {
      let data: any = await this.appointmentService.getAppointments()
      if (data && data.length > 0) {
        this.appointmentList = data
        this.appointmentData = data[0]
        if (this.appointmentData && this.appointmentData.vendor && this.appointmentData.vendor.id){
          let vendorData = await this.appointmentService.getVendorName(this.appointmentData.vendor.id)
          if (vendorData){
            this.vendorName = vendorData['name']
          }
        }
      }
    }
  }

  onClickViewDetails(index) {
    this.appointmentData = this.appointmentList[index]
  }

  getDateTimeFormat(date) {
    return moment(date).format('MMM D, YYYY hh:mm a');
  }

  async searchAppointmentById() {
    if (!isNaN(parseInt(this.searchOrder))) {
      this.appointmentList = await this.appointmentService.returnOrderDetailsWithOrderId(parseInt(this.searchOrder))
      if (this.appointmentList && this.appointmentList.length > 0) {
        this.onClickViewDetails(0)
      }
      else {
        this.presentAlert('No such order found')
        this.getAppointments()
      }
    } else {
      this.presentAlert('Please enter a valid number')
      return
    }
  }

  resetSearch(){
    this.searchOrder = ''
    this.getAppointments()
  }

  async rejectAppointment(){
    await this.presentLoading()
    this.appointmentData.status = 'rejected'
    let data = await this.appointmentService.rejectAppoinment(this.appointmentData.id)
    if (data == true){
      this.loading.dismiss()
      await this.presentAlert('Appointment has been rejected')
    }
    else {
      this.loading.dismiss()
    }
  }

  async presentAlert(msg: string, action?) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
        }
      }]
    });
    await alert.present();
  }
  async presentLoading(msg = 'Please Wait...') {
    this.loading = await this.loadingController.create({
      message: msg
    });
    await this.loading.present();
  }

}
