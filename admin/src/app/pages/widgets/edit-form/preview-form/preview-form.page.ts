import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from '@ionic/angular';
import { LabelService } from 'src/app/services/label/label.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { WidgetsService } from 'src/app/services/widgets/widgets.service';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.page.html',
  styleUrls: ['./preview-form.page.scss'],
})
export class PreviewFormPage implements OnInit {

  @Input() widgetID: any;

  formData: any = {
      formTitle: '',
      banner: { mob: '', thumb: '', url: '' },
      inputs: [],
      buttonName: '',
  };

  dynamicForm = true;
  isSubmitted: boolean = false;
  CO_WIDGET_FORM_LABELS: any;

  constructor(private widgetsService: WidgetsService,
              private sharedService: SharedService,
              private labelService: LabelService,
              private navCtrl: NavController,
              private navParams: NavParams,private modalController: ModalController, private alertController: AlertController) { }

  async ngOnInit() {
    this.formData = await this.navParams.get('formData');
    console.log(this.formData)
  }

  getBannerSrc() {
    return this.formData.banner.mob ? 'mob' : 'url';
  }

  closeModal() {
    this.modalController.dismiss()
  }

}
