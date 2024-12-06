import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared/shared.service';
import { PlatformMediaService } from './platform-media.service';

@Component({
  selector: 'app-platform-videos',
  templateUrl: './platform-videos.page.html',
  styleUrls: ['./platform-videos.page.scss'],
})
export class PlatformVideosPage implements OnInit {

  instagramVideos: any[] = [];
  video: string = '';
  thumb: string = '';

  constructor(
    private sharedService: SharedService,
    private platformMediaService: PlatformMediaService
  ) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    try {
      await this.sharedService.presentLoading();
      const response = await this.platformMediaService.getPlatformMedia();
      await this.sharedService.loading.dismiss();
      console.log('platformMedia', response);
      this.instagramVideos = 'list' in response ? response.list : [];
    }
    catch (err) {
      console.error('ionViewWillEnter error', err);
    }
  }

  async uploadDocument(event: any, type: string) {
    const file = event.target.files[0];
    console.log('file: ', file);

    const base64: any = await this.platformMediaService.getBase64FromFile(file);
    console.log('base64: ', base64);
    if (type === 'video') {
      this.video = base64;
    }
    else {
      this.thumb = base64;
    }
  }

  async addItem() {
    try {
      if (!this.video || !this.thumb) {
        this.sharedService.presentAlert('Please enter a video and thumbnail');
        return;
      }
      const videoObj = {
        active: true,
        link: '',
        thumbnail: ''
      }

      const timeStampString = new Date().getTime().toString();
      await this.sharedService.presentLoading('Please Wait...', 10000);
      const videoRoute = `platformVideos/instagram/${timeStampString}/video`;
      videoObj.link = await this.platformMediaService.getUrlForUploadedFile(this.video, videoRoute);

      const thumbRoute = `platformVideos/instagram/${timeStampString}/thumb`;
      videoObj.thumbnail = await this.platformMediaService.getUrlForUploadedFile(this.thumb, thumbRoute);
      await this.sharedService.loading.dismiss();

      console.log('videoObj', videoObj);
      this.instagramVideos.push(videoObj);

      this.video = '';
      this.thumb = '';
    }
    catch (err) {
      console.error('add item err', err);
    }

  }

  async deleteItem(link: string) {
    try {
      const matchedItem = this.instagramVideos.findIndex(el => el.link === link);
      if (matchedItem > -1) {
        this.instagramVideos.splice(matchedItem, 1);
      }
    }
    catch (err) {
      console.error('deleing item err');
    }
  }

  async save() {
    try {
      await this.sharedService.presentLoading();
      const res = await this.platformMediaService.updatePlatformMedia({ list: this.instagramVideos });
      await this.sharedService.loading.dismiss();
      console.log('save res', res);
      if (res) {
        await this.sharedService.presentAlert('Successfully Saved');
      } else {
        await this.sharedService.presentAlert('Something went wrong!');
      }
    }
    catch (err) {
      console.error('saving item err', err);
    }
  }

  async itemReorder(event: any) {
    try {
      console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
      const b = this.instagramVideos[event.detail.from];
      this.instagramVideos[event.detail.from] = this.instagramVideos[event.detail.to];
      this.instagramVideos[event.detail.to] = b;
      event.detail.complete();
    }
    catch (err) {
      console.error('itemReorder error', err);
    }
  }

  // trimString(string: string) {
  //   const length = 75;
  //   if (string.length > length) {
  //     return string.substring(0, length) + '...';
  //   }
  //   else {
  //     string;
  //   }
  // }

}
