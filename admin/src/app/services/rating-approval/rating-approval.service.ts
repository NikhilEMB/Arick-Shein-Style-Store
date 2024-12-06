import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { map, first, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { firestore } from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage/';
import { ProductImage } from 'src/app/models/image';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class RatingApprovalService {

    constructor(private afs: AngularFirestore, private events: Events,
        private fbStorage: AngularFireStorage) { }
      
    initializeSubscriptions() {
        this.events.subscribe('rating-approval:getRatings', () => {
            this.getRatings();
        });
    }

    async getRatings(){
      let data=[];
      this.events.publish('rating-approval:getRatingsSuccess',data)
    }

    removeSubscriptions() {
        this.events.unsubscribe('rating-approval:getRatings');
    }
}
