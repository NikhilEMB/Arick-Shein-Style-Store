import { Component, OnInit } from '@angular/core';
import { MultiCountriesService } from 'src/app/services/multi-countries/multi-countries.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-multi-countries',
  templateUrl: './multi-countries.page.html',
  styleUrls: ['./multi-countries.page.scss'],
})
export class MultiCountriesPage implements OnInit {
  countryData: any = {
    countries: [],
    settings: {
      autoExchange: false,
      defaultCountry: {}
    }
  };
  countryCode: any;
  constructor(private multiCountriesService: MultiCountriesService, private sharedService: SharedService) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.sharedService.presentLoading();
    const countryData = await this.multiCountriesService.getMultiCountries();
    this.countryData = countryData || this.countryData;
    this.sharedService.loading.dismiss();
  }

  activeAutoExchange() {
    this.countryData.settings.autoExchange = !this.countryData.settings.autoExchange;
  }

  activeCountry(i: any) {
    if (this.countryData.countries[i].countryCode == this.countryCode) {
      event.preventDefault();
      this.sharedService.presentAlert('Default Country cannot be toggled');
    } else {
      this.countryData.countries[i].active = !this.countryData.countries[i].active;
    }
  }

  async saveMultiCountry() {
    await this.sharedService.presentLoading();
    let res: any = await this.multiCountriesService.saveMultiCountries(this.countryData);
    this.sharedService.loading.dismiss();
    if (res) {
      this.sharedService.presentAlert('Settings saved successfully');
    }
  }

  onChangeDefaultCountry(e) {
    this.countryCode = e.target.value;
    this.countryData.settings.defaultCountry = this.countryData.countries.find(country => country.countryCode === this.countryCode);
  }

}
