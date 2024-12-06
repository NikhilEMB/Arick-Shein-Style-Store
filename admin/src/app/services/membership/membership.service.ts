import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import { first, map  } from 'rxjs/operators';
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  membershipRef = this.afs.collection('features').doc('membership');

    constructor(private events: Events,
        private afs: AngularFirestore,
        private logglyService: LogglyLoggerService) { }

    initializeSubscriptions() {
        this.events.subscribe('membership:saveMembershipSettings', (data) => {
            this.saveMembershipSettings(data);
        });
        this.events.subscribe('membership:getMembershipSettings', () => {
            this.getMembershipSettings();
        });
        this.events.subscribe('membership:getMembershipUsers', () => {
            this.getMembershipUsers();
        });
    }

    async saveMembershipSettings(data: any) {
        try {
            await this.membershipRef.set(data);
            this.events.publish('membership:membershipSettingsSaved');
        } catch (error) {
            console.dir(error);
            error['location'] = 'membership-service:saveMembershipSettings';
            this.logglyService.log(error);
        }
    }

    async getMembershipSettings() {
        try {
            const settings = await this.membershipRef.valueChanges().pipe(first()).toPromise();
            this.events.publish('membership:membershipSettings', settings);
        } catch (error) {
            console.dir(error);
            error['location'] = 'membership-service:getMembershipSettings';
            this.logglyService.log(error);
        }
    }

    async getMembershipUsers() {
        try {
          const allUsersRef = this.afs.collection('users', ref => ref
          .where('membership.isMember', '==', true));
          const allUsers = allUsersRef.snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          );
          allUsers.subscribe((res) => {
            if (!res.length) {
              this.events.publish('membership:noMembers');
            } else {
              this.events.publish('membership:publishAllMembers', res);
            }
          });
        } catch (err) {
          console.dir(err);
        }
      }

}
