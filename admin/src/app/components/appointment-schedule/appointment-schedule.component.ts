import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';

@Component({
  selector: 'app-appointment-schedule',
  templateUrl: './appointment-schedule.component.html',
  styleUrls: ['./appointment-schedule.component.scss'],
})
export class AppointmentScheduleComponent implements OnInit {

  days: any = '';
  variants: any = '';
  variantIndex: any = ''

  time: any = [{ start: null, end: null, slotLimit: 0 }, { start: null, end: null, slotLimit: 0 }, { start: null, end: null, slotLimit: 0 }
    , { start: null, end: null, slotLimit: 0 }, { start: null, end: null, slotLimit: 0 }, { start: null, end: null, slotLimit: 0 },
  { start: null, end: null, slotLimit: 0 }];

  maxDays = 7
  loading: any;

  constructor(private modalController: ModalController, private alertController: AlertController,
    private appointmentService: AppointmentService, private loadingController: LoadingController,) { }

  ngOnInit() {

  }

  ngAfterContentInit() {
    if (!this.days || (this.days && this.days.length == 0)) {
      this.days = [
        { day: 'Monday', active: false, schedule: [] }, { day: 'Tuesday', active: false, schedule: [] },
        { day: 'Wednesday', active: false, schedule: [] }, { day: 'Thursday', active: false, schedule: [] },
        { day: 'Friday', active: false, schedule: [] }, { day: 'Saturday', active: false, schedule: [] },
        { day: 'Sunday', active: false, schedule: [] }
      ]
    }
    if (this.variants && this.variants[this.variantIndex]) {
      this.days = this.variants[this.variantIndex].schedules
      this.maxDays = this.variants[this.variantIndex].maxDays
    }
  }

  changeSchedule(index) {
    this.days[index].active = !this.days[index].active
  }

  addSchedule(index) {
    if (this.time[index].start && this.time[index].start != null && this.time[index].end && this.time[index].end != null
      && this.time[index].slotLimit && this.time[index].slotLimit != null) {
      this.days[index].schedule.push({
        start: moment(this.time[index].start).format('hh:mm A'),
        end: moment(this.time[index].end).format('hh:mm A'),
        slotLimit: this.time[index].slotLimit
      })
    }
    else{
      this.presentAlert('Please fill all details for slot!')
    }
  }

  removeTimeSchedule(i, j) {
    this.days[i].schedule.splice(j, 1)
  }

  submitData() {
    this.modalController.dismiss([this.days, this.maxDays]);
  }

  async selectDefaultSchedule(){
    await this.presentLoading('Please wait...')
    let settingsData = await this.appointmentService.getAppoinmentSettings()
    if (settingsData){
      this.days = settingsData['days']
      this.maxDays = settingsData['maxDays']
      await this.loading.dismiss()
    }
    else{
      await this.loading.dismiss()
      this.presentAlert('No default settings!')
    }
  }

  async presentAlert(desc: string) {
    const alert = await this.alertController.create({
      message: desc,
      buttons: [{
        text: 'Ok',
        handler: () => {
        }
      }]
    });
    await alert.present();
  }

  async presentLoading(msg: string) {
    this.loading = await this.loadingController.create({
      message: msg
    });
    await this.loading.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
