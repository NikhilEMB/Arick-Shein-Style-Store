import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import { first, map } from 'rxjs/operators';
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  managerRef = this.afs.collection('features').doc('managers').collection('managersList');

  constructor(private events: Events,
              private afs: AngularFirestore,
              private logglyService: LogglyLoggerService) { }

  initializeSubscriptions() {
    this.events.subscribe('manager:getAllManagers', () => {
      this.getAllManagers();
    });
    this.events.subscribe('manager:deleteManager', (id) => {
      this.deleteManager(id);
    });
    this.events.subscribe('manager:getManagerData', (managerId) => {
      this.getManagerData(managerId);
    });
    this.events.subscribe('manager:changePermissions', (managerId,pageList, selectedRegion, selectedGroups) => {
      this.changePermission(managerId,pageList, selectedRegion, selectedGroups);
    });
    this.events.subscribe('manager:changeActiveStatusManager', (managerData,status) => {
      this.changeActiveStatusManager(managerData,status);
    });
  }

  async getAllManagers() {
    try {
      const managers = await this.afs.collection('users', ref => ref
      .where('role', '==', 'manager')).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).pipe(first()).toPromise();
      // console.log(managers)
      this.events.publish('manager:publishAllManagers', managers);
    } catch (error) {
      // console.dir(error);
    }
  }

  async deleteManager(id) {
    try {
      await this.afs.doc(`users/${id}`).update({role: 'user'})
      this.events.publish('manager:managerDeleted');
    } catch (error) {
      console.dir(error);
      error['location'] = 'manager-service:deleteManager'; 
      this.logglyService.log(error);
    }
  }

  async getManagerData(managerId, route?){
    // console.log('region called')
    try {
      let currentData = await this.managerRef.doc(managerId).valueChanges().pipe(first()).toPromise();
      // console.log(currentData)
      if (route == 'service') {
        return currentData;
      }
      this.events.publish('manager:getManagerDataSuccess',currentData);
    } catch (error) {
      // console.log(error)
    }
  }

  async changeActiveStatusManager(managerData,status){
    try {
      await this.managerRef.doc(managerData).update({active: status});
      this.events.publish('manager:changeActiveStatusManagerSuccess');
    } catch (error) {
      this.logglyService.log(error);
    }
  }

  async changePermission(managerId,pageList, selectedRegion, selectedGroups){
    // console.log('region called')
    try {
      await this.managerRef.doc(managerId).update({permissions: pageList, region: selectedRegion, groups: selectedGroups})
      // console.log(currentData)
      this.events.publish('manager:changePermissionsSuccess');
    } catch (error) {
      // console.log(error)
    }
  }

}
