import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private events: Events, private afs: AngularFirestore) { }

initializeSubscriptions() {
  this.events.subscribe('reports:getTaxReport', (startDate, endDate) => {
    this.getTaxReport(startDate, endDate);
  });
  this.events.subscribe('reports:getReport', (startDate, endDate, reportName) => {
    this.getReport(startDate, endDate, reportName);
  });
}


async getTaxReport(startDate, endDate) {
  startDate.setHours(0o0, 0o0, 0o0);
  endDate.setHours(23, 59, 59);
  try {
    // tslint:disable-next-line: max-line-length
    const docWithId: any = this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('createdAt', '>=', startDate).where('createdAt', '<=', endDate).where('status', '==', 'Delivered')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    const docs: any = await docWithId.pipe(first()).toPromise();
    this.events.publish('reports:getTaxReportSuccess', docs);
  } catch (error) {
    this.events.publish('reports:getTaxReportFailure', error.message);
    console.log(error);
  }
}

async getReport(startDate, endDate, reportName) {
  startDate.setHours(0o0, 0o0, 0o0);
  endDate.setHours(23, 59, 59);
  try {
    let docs;
    // tslint:disable-next-line: max-line-length
    const docWithId: any = this.afs.collection('analytics').doc(reportName).collection('data', ref => ref.orderBy('date', 'desc').where('date', '>=', startDate).where('date', '<=', endDate)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    if (reportName === 'sales') {
      const salesDocs: any = await docWithId.pipe(first()).toPromise();
      docs = salesDocs;
    } else {
      const docsWithId: any = await docWithId.pipe(first()).toPromise();
      let arr = [];
      for (const doc of docsWithId) {
        // tslint:disable-next-line: max-line-length
        const list = await this.afs.collection('analytics').doc(reportName).collection('data').doc(doc.id).collection('list').valueChanges().pipe(first()).toPromise();
        for (const listDoc of list) {
          arr.push(listDoc);
        }
      }
      docs = arr;
    }
    this.events.publish('reports:getReportSuccess', docs);
  } catch (error) {
    this.events.publish('reports:getReportFailure', error.message);
    console.log(error);
  }
}

}
