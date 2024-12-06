import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ReportsSidemenuComponent } from './reports-sidemenu/reports-sidemenu.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { CKEditorModule } from 'ng2-ckeditor';  
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductAddonsComponent } from './product-addons/product-addons.component';
​
@NgModule({
	imports: [
       CommonModule,
       FormsModule,
       IonicModule,
       Ng2SearchPipeModule,
       SuperTabsModule,
       CKEditorModule,
       NgxPhotoEditorModule,
       NgbModule,
   ],
   declarations: [
       UploadTaskComponent,
       ServiceDetailsComponent,
       ReportsSidemenuComponent,
       AppointmentComponent,
       ProductAddonsComponent
       
   ],
   exports: [
    UploadTaskComponent,
    ServiceDetailsComponent,
    ReportsSidemenuComponent,
    AppointmentComponent,
    ProductAddonsComponent
   ]
})
​
export class SharedModule { }
