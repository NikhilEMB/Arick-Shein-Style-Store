import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { BookingService } from 'src/app/services/booking/booking.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-change-booking-slot',
  templateUrl: './change-booking-slot.page.html',
  styleUrls: ['./change-booking-slot.page.scss'],
})
export class ChangeBookingSlotPage implements OnInit {

  scheduleSlots = [];
  selectedTime: any = {};
  productId: string;
  bookingDocId: string;
  isScheduleData: boolean = true;

  constructor(
    private bookingService: BookingService,
    private sharedService: SharedService,
    private modalController: ModalController,
  ) { }

  async ngOnInit() {
    await this.sharedService.presentLoading();
    let data: any = await this.bookingService.getProductDataWithId(this.productId);
    this.sharedService.loading.dismiss();
    if (data) {
      this.getSchedules(data.scheduleData);
    } else {
      // this.sharedService.presentAlert("");
      this.isScheduleData = false;
    }
  }

  getSchedules(scheduleData) {
    if (scheduleData.active) {
      const maxDays = scheduleData.maxDays;
      const schedules = scheduleData.schedules;
      for (let index = 0; index < maxDays; index++) {
        let dayToCheck = moment().add(index, 'days');
        const schedule = schedules.filter(s => s.day === dayToCheck.format('dddd'));
        if (schedule.length) {
          if (schedule[0].active && schedule[0].schedule.length) {
            this.scheduleSlots.push({
              date: dayToCheck.toDate(),
              schedules: schedule[0].schedule,
              day: schedule[0].day,
              active: false
            });
          }
        }
      }
      if (this.scheduleSlots.length) {
        this.scheduleSlots[0].active = true;
      }
    }
    // console.log('this.scheduleSlots', this.scheduleSlots);
  }

  selectDate(i: number) {
    this.scheduleSlots[i].active = true;
    this.scheduleSlots.forEach((slot, index) => {
      if (index !== i) {
        slot.active = false;
      }
    });
    this.selectedTime = {};
  }

  getActiveTimeSchedules() {
    return this.scheduleSlots.filter(s => s.active === true)[0].schedules;
  }

  setTimeSlot(event) {
    this.selectedTime = event.target.value || {};
  }

  async saveSlot() {
    await this.sharedService.presentLoading();
    const scheduleSlot = this.scheduleSlots.filter(s => s.active === true)[0];
    const data = {
      productId: this.productId,
      bookingDocId: this.bookingDocId,
      schedule: {
        date: moment(scheduleSlot.date).format('DD-MM-YYYY'),
        slot: {
          start: this.selectedTime.start,
          end: this.selectedTime.end
        },
        day: scheduleSlot.day
      }
    }
    // console.log('data', data);
    const res = await this.bookingService.changeBookingSlot(data, this.selectedTime.slotLimit);
    this.sharedService.loading.dismiss();
    if (res.status === 'updated') {
      this.sharedService.presentAlert("Slot changed successfully !");
      this.closeModal(data.schedule);
    } else if (res.status === 'not_available') {
      this.sharedService.presentAlert("The selected slot is not available currently. Please select another slot or try again later");
    } else {
      this.sharedService.presentAlert("There is some issue. Please try again later. ");
    }
  }

  getDate(date) {
    return moment(date).format('DD MMM');
  }

  isSaveBtnDisabled() {
    return !Object.keys(this.selectedTime).length;
  }

  convert24to12(time) {
    return moment(time, ['HH:mm']).format('hh:mm A');
  }
  closeModal(schedule?) {
    this.modalController.dismiss({ schedule });
  }
  

}
