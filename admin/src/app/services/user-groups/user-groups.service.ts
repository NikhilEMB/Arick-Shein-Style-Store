import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firestore } from 'firebase';
import { Subscription } from 'rxjs';
import { first, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserGroupsService {  
  managersRef = this.afs.collection('features').doc('managers');
  constructor(private afs: AngularFirestore) {}

async createUsersGroup(groupData: any, users) {
  return new Promise(async (resolve) => {
    try {
      const docRef = await this.afs.collection("userGroups").add(groupData);
      const groupId = docRef.id;
      console.log('groupId:', groupId);
      const grpIdArr = [groupId];
      for (const user of users) {
        await this.afs.collection('users').doc(user.id).update({
          groups: firestore.FieldValue.arrayUnion(...grpIdArr)
        });
        // const userData: any = this.afs.collection('users').doc(user.id).valueChanges().pipe(first()).toPromise();
        // let groups = [];
        // if (userData.groups) {
        //   groups = userData.groups;
        //   groups.push(groupId);
        //   console.log('groups:', groups)
        //   await this.afs.collection('users').doc(user.id).update({groups: groups})
        // } else {
        //   groups.push(groupId)
        //   console.log('groups:', groups)
        //   await this.afs.collection('users').doc(user.id).update({groups: groups})
        // }
      }
      resolve(true);
    } catch (error) {
      console.log(error);
    }
  });
}

async getAllUsers() {
  return new Promise(async (resolve, reject) => {
    try {
      let allUsers = [];
      let allUsersRef = this.afs.collection('users')
      allUsersRef.get().subscribe((snapShot) => {
        snapShot.forEach((doc) => {
          allUsers.push({ id: doc.id, ...doc.data() });
        })
        // console.log('orders', ordersArray);
        resolve(allUsers);
      })
    } catch (error) {
      resolve([]);
      console.log('err:', error);
    }
  })
}

async getAllGroups() {
  return new Promise(async (resolve) => {
    try {
      const docWithId: any = this.afs.collection('userGroups').snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data as {} };
        }))
      );
      const groups: any = await docWithId.pipe(first()).toPromise();
      resolve(groups);
    } catch (error) {
      resolve([]);
      console.log('err:', error);
    }
  });
}

async getCampaigns(integrationCode) {
  return new Promise(async (resolve, reject) => {
    try {
      let campDoc = {}
      if (integrationCode) {
        campDoc = await this.afs.collection('integrations').doc('whatsapp_promotion').collection('list').doc(integrationCode+'_promotion').valueChanges().pipe(first()).toPromise();
      } 
      resolve(campDoc)
    } catch (error) {
      resolve({});
      console.log('err:', error);
    }
  })
}

async getGroupUsers(groupId){
  return new Promise(async (resolve) => {
    try {
      let allUsers = [];
      let usersData = await this.afs.collection('users', ref => ref
        .where('groups', 'array-contains', groupId));
        let allUsersref: Subscription = usersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc) => {
              allUsers.push({id: doc.id, ...doc.data()})
            });
            resolve(allUsers)
            allUsersref.unsubscribe()
        })
      //   .snapshotChanges().pipe(
      //     map(actions => actions.map(a => {
      //       const data = a.payload.doc.data();
      //       const id = a.payload.doc.id;
      //       return { id, ...data as {} };
      //     }))
      //   ).pipe(first()).toPromise()
      // resolve(users);
    } catch (error) {
      resolve([]);
      console.log('err:', error);
    }
  });
}

async getGroupManagers(groupId){
  return new Promise(async (resolve) => {
    try {
      let managers = this.managersRef.collection('managersList', ref => ref
        .where('groups', 'array-contains', groupId))
        .snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data as {} };
          }))
        ).pipe(first()).toPromise()
      resolve(managers);
    } catch (error) {
      console.log('err:', error);
    }
  });
}

async addUserToGroup(data){
  return new Promise(async (resolve)=>{
    try {
      await this.afs.collection('users').doc(data.userId).update({
        groups: firestore.FieldValue.arrayUnion(data.groupId)
      });
      resolve(true);
    } catch (error) {
      console.log('err:', error);
    }
  })
}

async removeUserFromGroup(data){
  return new Promise(async (resolve)=>{
    try {
      console.log('data:', data);
      if (data.hasOwnProperty('userId')) {
        await this.afs.collection('users').doc(data.userId).update({
          groups: firestore.FieldValue.arrayRemove(data.groupId)
        });
      }
      if (data.hasOwnProperty('managerId')) {
        await this.managersRef.collection('managersList').doc(data.managerId).update({
          groups: firestore.FieldValue.arrayRemove(data.groupId)
        });
      }
      resolve(true);
    } catch (error) {
      console.log('err:', error);
    }
  })
}

async deleteGroup(data){
  return new Promise(async (resolve)=>{
    try {
      await this.afs.collection('userGroups').doc(data.groupId).delete();
      if (data.users) {
        for (const user of data.users) {
          console.log('data.groupId:', data.groupId);
          await this.removeUserFromGroup({userId: user.id, groupId: data.groupId})
        }
      }
      if (data.managers) {
        for (const manager of data.managers) {
          await this.removeUserFromGroup({managerId: manager.id, groupId: data.groupId})
        }
      }
      resolve(true)
    } catch (error) {
      console.log('');
    }
  })
}



}
