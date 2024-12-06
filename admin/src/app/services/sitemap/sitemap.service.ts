import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { first, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SitemapService {
  referralRef = this.afs.collection("settings").doc("referral");
  constructor(private afs: AngularFirestore) {}

  async getAllSiteMaps() {
    try {
      const siteMaps = [];
      const txns: any = await this.afs
        .collection("siteMapData", (ref) => ref.orderBy("createdAt", "desc"))
        .snapshotChanges()
        .pipe(first())
        .toPromise();
      if (txns.length > 0) {
        for (const txn of txns) {
          siteMaps.push({ id: txn.payload.doc.id, ...txn.payload.doc.data() });
        }
      }
      return siteMaps;
    } catch (error) {
      console.dir(error);
      return [];
    }
  }

  async addSitemap(data:any) {
    try {
      const collectionRef = this.afs.collection('siteMapData')
      await collectionRef.add(data)
      return true;
    } catch (error) {
      console.log('Error while adding site map data: ', error)
      return false;
    }
  }

  async updateSitemap(id:string, data:any) {
    try {
      const collectionRef = this.afs.collection('siteMapData').doc(id);
      await collectionRef.update(data)
      return true;
    } catch (error) {
      console.log('Error while updating site map data: ', error)
      return false;
    }
  }

  async getAllCategories() {
    try {
      const cats = [];
      const categories: any = await this.afs
        .collection("categories", (ref) => ref.orderBy("sortedAt", "desc"))
        .snapshotChanges()
        .pipe(first())
        .toPromise();
      if (categories.length > 0) {
        for (const cat of categories) {
          cats.push({ id: cat.payload.doc.id, ...cat.payload.doc.data() });
        }
      }
      return cats;
    } catch (error) {
      console.dir(error);
      return [];
    }
  }
}
