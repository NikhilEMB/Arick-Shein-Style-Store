import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { WidgetsService } from 'src/app/services/widgets/widgets.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})
export class FormsPage implements OnInit {
  showLoader: boolean = true;
  forms;

  constructor(
    private widgetService: WidgetsService,
    private router:Router
    ) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    const forms: any = await this.widgetService.getWidgetsList('form', 'service');
    console.log('forms:', forms);
    if (forms && forms.length) {
      console.log('forms:', forms);
      this.forms = forms;
    }
    this.showLoader = false;
  }

  addForm(){
    this.router.navigate(['edit-form']);
  }

  viewForm(id){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ID: id,
      }
    };
    this.router.navigate(['edit-form'], navigationExtras);
  }

  // deleteForm(id, index){
  //   const success: any = this.widgetService.deleteWidget(id, 'service');
  //   if (success) {
  //     this.forms.splice(index, 1);
  //   }
  // }
  

}
