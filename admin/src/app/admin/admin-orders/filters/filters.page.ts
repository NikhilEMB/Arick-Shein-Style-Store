import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MultiRegionService } from 'src/app/services/multi-region/multi-region.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UserGroupsService } from 'src/app/services/user-groups/user-groups.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {
  activeTile = 'region';
  regions;
  groups;
  filters;
// recieved from callable pg
  selectedFilters;
  userDetails;
  managerDetails;

  constructor(private modalController: ModalController, private multiRegionService: MultiRegionService,
    private sharedService: SharedService, private userGroupsService: UserGroupsService) {
      this.initfilterObj();
  }

  ngOnInit() {
    console.log('filters:', this.selectedFilters);
  }
  
  initfilterObj(){
    this.filters = {
      region: '',
      pincode: '',
      group: ''
    }
  }

  async ionViewWillEnter(){
    if (this.selectedFilters) {
      this.filters = JSON.parse(JSON.stringify(this.selectedFilters));
    }
    // Regions
    const regions = await this.multiRegionService.getAllRegions('service');
    if (regions) {
      console.log('regions in modal:', regions);
      if (this.userDetails && this.userDetails.role == 'manager') {
        if (this.managerDetails && this.managerDetails.region && typeof(this.managerDetails.region)=='string') {
          this.regions = this.managerDetails.region;
        }
        else if (this.managerDetails && this.managerDetails.region && Array.isArray(this.managerDetails.region)) {
          console.log('this.managerDetails.region:',this.managerDetails.region);
          this.regions = regions.filter(region => this.managerDetails.region.includes(region.id));
          console.log('regions from manager reg arr:', this.regions);
        }
      } else{
        this.regions = regions;
      }
    }
    // Groups
    let groups: any = await this.userGroupsService.getAllGroups();
    this.groups = groups;
  }


  close() {
    this.modalController.dismiss();
  }
  changeActiveTile(activeTile){
    this.activeTile = activeTile;
  }

  resetFilters(){
    this.initfilterObj();
    this.applyFilters();
  }

  applyFilters() {
    let flag = 0;
    for (const key in this.filters) {
      if (this.filters[key] != '') {
        flag+=1;
      }
    }
    if (flag>1) {
      this.sharedService.presentAlert('You can only use one filter at a time');
      return;
    }
    console.log('filters:', this.filters)
    this.modalController.dismiss({filters: this.filters});
  }

}
