import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-form-submissions',
  templateUrl: './form-submissions.page.html',
  styleUrls: ['./form-submissions.page.scss'],
})
export class FormSubmissionsPage implements OnInit {

  allForms:any = []
  noForms = false
  users = []
  formTitles = []

  constructor(private angularFirestore: AngularFirestore, private sharedService: SharedService) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    const formRef = this.angularFirestore.collection('forms', ref => ref.orderBy('createdAt', 'desc'));
    const formSnap = formRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
        }))
    );
    const submissionData = await formSnap.pipe(first()).toPromise();
    // console.log(catgeoryData)
    if (!submissionData.length) {
        this.noForms = true
    } else {
        this.allForms = submissionData
        for (let i = 0; i < this.allForms.length; i++) {
          if (this.allForms[i].userId){
            this.users.push(await this.angularFirestore.collection('users', ref => ref).doc(this.allForms[i].userId).valueChanges().pipe(first()).toPromise());
          }
          if (this.allForms[i].widgetId)
          {
            this.formTitles.push(await this.angularFirestore.collection('widgets', ref => ref).doc(this.allForms[i].widgetId).valueChanges().pipe(first()).toPromise());
          }
        }
    }

  }

  isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }

  async deleteForm(i){
    await this.sharedService.presentLoading()
    await this.angularFirestore.collection('forms').doc(this.allForms[i].id).delete()
    this.allForms.splice(i,1)
    this.sharedService.loading.dismiss()
    this.sharedService.presentAlert('Form deleted successfully!')

  }



}
