import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-input',
  templateUrl: './add-input.page.html',
  styleUrls: ['./add-input.page.scss'],
})
export class AddInputPage implements OnInit {

  inputName:any
  inputType:any
  inputTag:any
  inputOptions = []
  inputMode:any
  option:any
  data = {}
  inputRequired = false

  constructor(private modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() {
  }

  changeType(mode){
    this.inputMode = mode
    if (mode == 'line'){
      this.inputTag = 'input'
    }
    else if (mode == 'multiLine'){
      this.inputTag = 'textarea'
    }
    else{
      this.inputTag = 'select'
    }
  }

  addOption() {
    this.inputOptions.push(this.option)
  }

  addType(e) {
    this.inputType = e.target.value
  }

  removeOption(option){
    this.inputOptions.splice(this.inputOptions.indexOf(option),1)
  }

  submitData() {
    if (this.inputMode && this.inputMode == 'line'){
      if (this.inputName && this.inputType){
        this.data['name'] = this.inputName
        this.data['type'] = this.inputType
        this.data['required'] = this.inputRequired
        this.modalController.dismiss(this.data);
      }
      else{
        this.presentAlert('Please fill all details')
      }
    }
    else if (this.inputMode && this.inputMode == 'multiLine'){
      if (this.inputName){
        this.data['name'] = this.inputName
        this.data['type'] = 'textarea'
        this.data['required'] = this.inputRequired
        this.modalController.dismiss(this.data);
      }
      else{
        this.presentAlert('Please fill all details')
      }
    }
    else if (this.inputMode && this.inputMode == 'options'){
      if (this.inputName && this.inputType && this.inputOptions.length > 0){
        this.data['name'] = this.inputName
        this.data['type'] = 'select'
        this.data['options'] = this.inputOptions
        if (this.inputType == 'radio'){
          this.data['multiple'] = true
        }
        else{
          this.data['multiple'] = false
        }
        this.data['required'] = this.inputRequired
        this.modalController.dismiss(this.data);
      }
      else{
        this.presentAlert('Please fill all details')
      }
    }
    else if (this.inputMode && this.inputMode == 'document'){
      if (this.inputName){
        this.data['name'] = this.inputName
        this.data['type'] = 'document'
        this.data['required'] = this.inputRequired
        this.modalController.dismiss(this.data);
      }
      else{
        this.presentAlert('Please fill all details')
      }
    }
    else{
      this.modalController.dismiss(this.data);
    }
  }

  toggleActive() {
    this.inputRequired = !this.inputRequired;
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  closeModal() {
    this.modalController.dismiss()
  }

}
