import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private afs: AngularFirestore,
    private fbStorage: AngularFireStorage,
    private sharedService: SharedService
  ) { }


  // ? Sub Of Sub-Category Start

  async getProductsForSubOfSubCategory(subOfSubCatId: any) {
    // console.log('subOfSubCatId', subOfSubCatId);
    return new Promise(async (resolve) => {
      try {
        let allProducts = [];
        const productRef = this.afs.collection('products', ref => ref.orderBy('sortedAt', 'desc').where("categories", "array-contains", subOfSubCatId));
        productRef.get().subscribe((querySnapshot: any) => {
          querySnapshot.forEach((doc: any) => {
            allProducts.push({ id: doc.id, ...doc.data() });
          });
          if (allProducts.length !== 0) {
            resolve(allProducts);
          } else {
            resolve(false);
          }
        });
      } catch (err) {
        resolve(false);
        console.log('err:', err);
      }
    })
  }

  async addSubOfSubCategory(data, categoryImage: any, catId, banner, subCatId) {
    return new Promise(async (resolve) => {
      try {
        data['sortedAt'] = firebase.firestore.FieldValue.serverTimestamp();
        if (categoryImage.length === 0) {
          data['image'] = { url: 'assets/img/placeholder-img.jpg' };
        }
        const subcategoryDoc = await this.afs.collection('categories').doc(catId).collection('subcategories').doc(subCatId).collection('sub-subcategories').add(data);
        if (categoryImage.length !== 0) {
          let imgType = this.sharedService.getImageType(categoryImage[0].imgData);
          const imgRef = this.fbStorage.ref(`sub-subcategories/${catId}/image/${subcategoryDoc.id}/` + new Date().getTime().toString() + imgType);
          await imgRef.putString(categoryImage[0].imgData, 'data_url');
        }
        if (banner.length !== 0) {
          let imgType = this.sharedService.getImageType(banner[0].imgData);
          const imgRef = this.fbStorage.ref(`sub-subcategoriesBanner/${catId}/banner/${subcategoryDoc.id}/` + new Date().getTime().toString() + imgType);
          await imgRef.putString(banner[0].imgData, 'data_url');
        }
        resolve(true);
      } catch (err) {
        resolve(false);
        console.log('err:', err);
      }
    })

  }

  async getSubOfSubCategories(catId, subCatId) {
    return new Promise(async (resolve) => {
      try {
        let data = [];
        const subcategoriesRef = this.afs.collection('categories').doc(catId).collection('subcategories').doc(subCatId).collection('subcategories', ref =>
          ref.orderBy('sortedAt', 'desc'));
        subcategoriesRef.get().subscribe((snapShot) => {
          snapShot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          })
          // console.log('subOfSubData:', data);
          resolve(data);
        })
      } catch (error) {
        resolve(false);
        console.log('err:', error);
      }
    })
  }

  async changeSubOfSubCategoriesStatus(status, catId, subCatId) {
    // console.log('change', catId, subCatId, status);
    return new Promise(async (resolve) => {
      try {
        await this.afs.collection('categories').doc(catId).collection('subcategories').doc(subCatId).update({
          isSubcategories: status
        });
        resolve(true);
      } catch (error) {
        resolve(false);
        console.log('err:', error);
      }
    })
  }

  async changeSubOfSubCategoryStatus(catId, subcatId, subOfSubCatId, status) {
    return new Promise(async (resolve) => {
      try {
        await this.afs.collection('categories').doc(catId).collection('subcategories').doc(subcatId)
          .collection('sub-subcategories').doc(subOfSubCatId).update({
            status: status
          });
        resolve(true);
      } catch (error) {
        resolve(false);
        console.log('err:', error);
      }
    })
  }

  async editSubOfSubCategory(data, image, banner, catId, subcatId, subOfSubCatId) {
    return new Promise(async (resolve) => {
      try {
        if (!data.name) {
          data.name = null
        }
        if (!data.status) {
          data.status = null
        }
        if (!data.image) {
          data.image = { url: null }
        }
        if (!data.banner) {
          data.banner = null
        }
        if (!data.description) {
          data.description = null
        }
        let dataObj = {
          name: data.name,
          status: data.status,
          image: data.image,
          banner: data.banner,
          isExclusive: data.isExclusive,
          description: data.description
        }
        const subcategoryDoc = await this.afs.collection('categories').doc(catId).collection('subcategories').doc(subcatId)
          .collection('sub-subcategories').doc(subOfSubCatId).update(dataObj);
        if (image.length !== 0) {
          let imgType = this.sharedService.getImageType(image[0].imgData);
          const imgRef = this.fbStorage.ref(`sub-subcategories/${catId}/${subcatId}/image/${subOfSubCatId}/` + new Date().getTime().toString() + imgType);
          await imgRef.putString(image[0].imgData, 'data_url');
        }
        if (banner.length !== 0) {
          console.log('here')
          let imgType = this.sharedService.getImageType(banner[0].imgData);
          const imgRef = this.fbStorage.ref(`sub-subcategories/${catId}/${subcatId}/banner/${subOfSubCatId}/` + new Date().getTime().toString() + imgType);
          await imgRef.putString(banner[0].imgData, 'data_url');
        }
        resolve(true);
      } catch (err) {
        resolve(false);
        console.log('err:', err);
      }
    })
  }

  async deleteSubOfSubCategory(catId: string, subcatId: string, subOfSubCatId: string) {
    return new Promise(async (resolve) => {
      try {
        await this.afs.collection('categories').doc(catId).collection('subcategories').doc(subcatId)
          .collection('sub-subcategories').doc(subOfSubCatId).delete();
        resolve(true);
      } catch (error) {
        resolve(false);
        console.log('err:', error);
      }
    })
  }

  async updateSubOfSubCategoriesPosition(subOfSubCatId: string, changedDate: any, subCatId, catId) {
    // console.log('subOfSubCatId', subOfSubCatId, 'catId', catId, 'subcatId', subCatId);

    return new Promise(async (resolve) => {
      try {
        await this.afs.collection('categories').doc(catId).collection('subcategories').doc(subCatId)
          .collection('sub-subcategories').doc(subOfSubCatId).update({ sortedAt: changedDate });

        resolve(true);
      } catch (err) {
        resolve(false);
        console.log('err:', err);
      }
    })
  }

  // ? Sub Of Sub-Category End

  // ? Update GstExclusive for category products in category page.
  async updateGstExclusiveCategoryProducts(catId: any, gstValue: any) {
    // console.log(catId, gstValue);
    return new Promise(async (resolve) => {
      try {
        await this.afs.collection("categories").doc(catId).update({ gstExclusive: gstValue });
        resolve(true);
      } catch (err) {
        resolve(false);
        console.log('err:', err);
      }
    });
  }

}
