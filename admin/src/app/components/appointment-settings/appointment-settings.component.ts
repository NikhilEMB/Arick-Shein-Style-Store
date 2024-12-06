import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { SharedService } from 'src/app/services/shared/shared.service';
@Component({
  selector: 'app-appointment-settings',
  templateUrl: './appointment-settings.component.html',
  styleUrls: ['./appointment-settings.component.scss'],
})
export class AppointmentSettingsComponent implements OnInit {

  maxDays: number = 7;
  scheduleData: any = [
    { day: 'Monday', active: false, schedule: [] },
    { day: 'Tuesday', active: false, schedule: [] },
    { day: 'Wednesday', active: false, schedule: [] },
    { day: 'Thursday', active: false, schedule: [] },
    { day: 'Friday', active: false, schedule: [] },
    { day: 'Saturday', active: false, schedule: [] },
    { day: 'Sunday', active: false, schedule: [] }
  ];
  slotValid: boolean = true;

  constructor(
    private appointmentService: AppointmentService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.sharedService.presentLoading();
    let response = await this.appointmentService.getAppoinmentSettings()
    if (response) {
      this.scheduleData = response['days'];
      this.maxDays = response['maxDays'];
    }
    this.sharedService.loading.dismiss();
  }

  changeSchedule(index: number) {
    this.scheduleData[index].active = !this.scheduleData[index].active;
  }

  addSlot(index: number) {
    this.scheduleData[index].schedule.push(
      { start: null, end: null, slotLimit: null }
    );
  }

  removeSlot(index: number, sIndex: number) {
    this.scheduleData[index].schedule.splice(sIndex, 1);
  }

  customActionSheetOptions: any = {
    // header: 'Copy',
    subHeader: 'COPY ITEMS TO...',
  };

  getSelectOption(myIndex: number, indexArray: any) {
    for (let index of indexArray) {
      let slotData = JSON.parse(JSON.stringify(this.scheduleData[myIndex].schedule));
      if (this.scheduleData[index].schedule.length == 0) {
        this.scheduleData[index].schedule = [...slotData];
      } else {
        this.scheduleData[index].schedule.push(...slotData);
      }
    }
  }

  async slotValidation() {
    for (let scheduleArray of this.scheduleData) {
      if (scheduleArray.schedule.length > 0) {
        for (let schedule of scheduleArray.schedule) {
          if (!schedule.start || !schedule.end || !schedule.slotLimit) {
            this.slotValid = false;
            break;
          } else {
            this.slotValid = true;
          }
        }
      }
      if (!this.slotValid) {
        break;
      }
    }
  }

  async saveSchedule() {
    await this.sharedService.presentLoading();
    await this.slotValidation();

    if (!this.slotValid) {
      this.sharedService.loading.dismiss();
      this.sharedService.presentAlert('Please fill all details of time slot !');
    }
    else {
      let data = await this.appointmentService.saveAppointmentSettings(this.scheduleData, this.maxDays);
      if (data == true) {
        this.sharedService.loading.dismiss();
        this.sharedService.presentAlert('Settings saved successfully !');
      }
      else {
        this.sharedService.loading.dismiss();
        this.sharedService.presentAlert('Something went wrong !');
      }
    }
  }

}
