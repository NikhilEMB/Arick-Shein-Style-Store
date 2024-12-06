import { Component, OnInit } from '@angular/core';
import { ContactUsService } from '../services/contact-us/contact-us.service';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  faq = [ { quest: '', ans: '' } ];

  constructor(
    private sharedService: SharedService,
    private contactUsService: ContactUsService,
  ) { }

  ngOnInit() {
  }
  
  async ionViewWillEnter() {
    let details = await this.contactUsService.getContactPgDetails();
    if (details) {
      this.faq = details.faq || this.faq;
    }
  }

  addMore(){
      this.faq.push({quest: '', ans: ''});
  }

  remove(index){
      this.faq.splice(index, 1);
  }
  
  async saveDetails(){
    let valid = true;
    for (const faq of this.faq) {
      if (!(faq.quest.length && faq.ans.length)) {
        console.log('address:, ', faq.ans.length);
        valid = false;
      }
    }
    if (valid) {
      let saved = await this.contactUsService.saveContactPgDetails({ faq: this.faq });
      if (saved) {
        this.sharedService.presentAlert('FAQs saved successfully.');
      } else {
        this.sharedService.presentAlert('Something went wrong. Please try again later');
      }
      
    } else {
      this.sharedService.presentAlert('FAQ cant be empty, either remove the field or fill them');
      
    }
  }
}
