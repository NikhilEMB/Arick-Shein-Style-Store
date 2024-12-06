import { UserService } from './../user/user.service';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { map, first, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { firestore } from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage/';
import algoliasearch from 'algoliasearch';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/services/config/config.service';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

declare var Typesense;
@Injectable({
  providedIn: 'root'
})
export class SearchEngineService {
  client: any;
  index: any;
  ALGOLIA_APP_ID = this.configService.environment.ALGOLIA_APP_ID;
  APP_PROJECT_ID = environment.firebase.projectId;
  page: number = 0;
  products: any = [];
  adminProducts: any = [];
  searchBestSellersProducts: any = [];
  searchCarouselProducts: any = [];
  searchCouponProducts: any = [];
  productsToCreateOrder: any = [];
  typesenseCred = this.configService.environment.typesense;
  typesenseClient;
  useTypesense = this.configService.environment.useTypesense;
  users: any = [];
  constructor(private afs: AngularFirestore,
              private events: Events,
              private fbStorage: AngularFireStorage,
              private storage: Storage,
              private authService: AuthService,
              private userService: UserService,
              private configService: ConfigService) {}
  initializeSubscriptions() {
    this.initTypesenseClient();
    
    this.events.subscribe('search-engine:searchProduct', (searchValue, categoryId) => {
      this.searchProduct(searchValue, categoryId);
    });
    this.events.subscribe('search-engine:searchProductForAdminProducts', (searchValue) => {
      this.searchProductForAdminProducts(searchValue);
    });
    this.events.subscribe('search-engine:searchProductForBestSellers', (searchValue) => {
      this.searchProductForBestSellers(searchValue);
    });
    this.events.subscribe('search-engine:searchProductForWidgets', (searchValue, windex) => {
      this.searchProductForWidgets(searchValue, windex);
    });
    this.events.subscribe('search-engine:searchProductForCouponCodes', (searchValue) => {
      this.searchProductForCouponCodes(searchValue);
    });
    this.events.subscribe('search-engine:alogoliaSearchProducts', (searchValue, page, type) => {
      this.alogoliaSearchProducts(searchValue, page, type);
    });
    this.events.subscribe('search-engine:alogoliaSearchProductsForAdmin', (searchValue, page, type, productType, productData?) => {
      this.alogoliaSearchProductsForAdmin(searchValue, page, type, productType, productData);
    });
    this.events.subscribe('search-engine:alogoliaSearchProductsForBestSellers', (searchValue, page, type) => {
      this.alogoliaSearchProductsForBestSellers(searchValue, page, type);
    });
    this.events.subscribe('search-engine:alogoliaSearchProductsForProductCarousel', (searchValue, page, type, widgetID,vendorId) => {
      this.alogoliaSearchProductsForProductCarousel(searchValue, page, type, widgetID,vendorId);
    });
    this.events.subscribe('search-engine:alogoliaSearchProductsForCouponCodes', (searchValue, page, type) => {
      this.alogoliaSearchProductsForCouponCodes(searchValue, page, type);
    });
    this.events.subscribe('search-engine:alogoliaSearchProductsToCreateOrder', (searchValue, page, type) => {
      this.alogoliaSearchProductsToCreateOrder(searchValue, page, type);
    });
  }

  initTypesenseClient() {
    console.log('initTypesenseClient...');
    if(this.typesenseCred && this.useTypesense) {
      console.log('in if');
      // this.typesenseCred = this.sandeepTypeSenseCred;
      this.typesenseClient = new Typesense.SearchClient({
        'nodes': [{
          'host': this.typesenseCred.host,
          'port': this.typesenseCred.port,
          'protocol': this.typesenseCred.protocol
        }],
        'apiKey': this.typesenseCred.searchOnlyKey,
        'connectionTimeoutSeconds': 2
      });
    }
  }

  async searchProduct(searchValue: string, categoryId: string) {
    console.log('searchValue', searchValue);
    this.afs.collection('products', ref => ref
    .where('categories', 'array-contains', categoryId)
    .orderBy('nameToSearch')
    .startAt(searchValue.toLowerCase())
    .endAt(searchValue.toLowerCase()+"\uf8ff")
    )
    .snapshotChanges().subscribe((result) => {
      console.log('searchProductData:', result);
      if(!result.length) {
        this.events.publish('product:noProductAvailable');
        return false;
      }
      let productsData = [];
      for(const product of result) {
        productsData.push({id: product.payload.doc.id, data: product.payload.doc.data()});
      }
      this.events.publish('product:publishProducts', productsData);
    });
  }
  async searchProductForAdminProducts(searchValue: string) {
    console.log('searchValue', searchValue);
    this.afs.collection('products', ref => ref
    .orderBy('nameToSearch')
    .startAt(searchValue.toLowerCase())
    .endAt(searchValue.toLowerCase()+"\uf8ff")
    )
    .snapshotChanges().subscribe((result) => {
      if(!result.length) {
        this.events.publish('product:noProductsAvailable');
        return false;
      }
      console.log('searchProductData:', result);
      let productsData = [];
      for (const product of result) {
        productsData.push({id: product.payload.doc.id, data: product.payload.doc.data()});
      }
      this.events.publish('product:publishProductsForAdminProducts', productsData);
    });
  }

  async searchProductForBestSellers(searchValue: string) {
    console.log('searchValue', searchValue);
    this.afs.collection('products', ref => ref
    .orderBy('nameToSearch')
    .startAt(searchValue.toLowerCase())
    .endAt(searchValue.toLowerCase()+"\uf8ff")
    )
    .snapshotChanges().subscribe(async (result) => {
      if(!result.length) {
        this.events.publish('best-sellers:noProductsAvailable');
      } else {
        let productsData = [];
        let bestSellersIds: any = [];
        const bestSellersref = this.afs.collection('features').doc('bestsellers').collection('products');
        const bestSellersData = await bestSellersref.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).pipe(first()).toPromise();
        for (let index = 0; index < bestSellersData.length; index++) {
          bestSellersIds.push(bestSellersData[index].id);
        }
        console.log(bestSellersIds);
        for (const product of result) {
            if (bestSellersIds.indexOf(product.payload.doc.id) === -1) {
              productsData.push({id: product.payload.doc.id, data: product.payload.doc.data(), isAdded: false});
            } else {
              productsData.push({id: product.payload.doc.id, data: product.payload.doc.data(), isAdded: true});
            }
          }
        if (productsData.length) {
            this.events.publish('best-sellers:publishProductsForBestSellers', productsData);
          } else {
            this.events.publish('best-sellers:noProductsAvailable');
          }
        }
    });
  }

  async alogoliaSearchProductsForBestSellers(searchValue: string, page: number, type: string) {
    console.log('searchValue', searchValue);
    if (type === 'new_search') {
      this.searchBestSellersProducts = [];
    }
    this.storage.get('searchKey').then((val) => {
      this.client = algoliasearch(this.ALGOLIA_APP_ID, val.key);
      this.index = this.client.initIndex(this.APP_PROJECT_ID);
      this.index.search(searchValue, { page: page }).then(async (result) => {
        console.log(result);
        if (result.nbPages === 0) {
          this.events.publish('best-sellers:noProductsAvailable');
        } else if (result.hits.length === 0 && page === result.nbPages) {
          this.events.publish('best-sellers:noMoreSearchProducts');
        } else {
          let bestSellersIds: any = [];
          const bestSellersref = this.afs.collection('features').doc('bestsellers').collection('products');
          const bestSellersData = await bestSellersref.snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          ).pipe(first()).toPromise();
          for (let index = 0; index < bestSellersData.length; index++) {
            bestSellersIds.push(bestSellersData[index].id);
          }
          console.log(bestSellersIds);
          result.hits.forEach(h => {
            if (bestSellersIds.indexOf(h.objectID) === -1 && h.ptype === 'parent') {
              this.searchBestSellersProducts.push({id: h.objectID, data: h, isAdded: false});
            } else {
              this.searchBestSellersProducts.push({id: h.objectID, data: h, isAdded: true});
            }
          });
          if (this.searchBestSellersProducts.length) {
            this.events.publish('best-sellers:publishProductsForBestSellers', this.searchBestSellersProducts);
          } else {
            this.events.publish('best-sellers:noProductsAvailable');
          }
        }
      }).catch(async (err) => {
        console.log(err);
        if (err.status != 200) {
          await this.generateSearchKey();
          this.alogoliaSearchProductsForBestSellers(searchValue, page, type);
        }
      });
    });
  }

  async alogoliaSearchProductsForProductCarousel(searchValue: string, page: number, type: string, widgetID: any, vendorId: any) {
    console.log('searchValue', searchValue);
    if (type === 'new_search') {
      this.searchCarouselProducts = [];
    }
    if(this.useTypesense) {
      const res = await this.getSearchProductsFromTypesense(searchValue, page, type, this.searchCarouselProducts, false, {filter: 'ptype:=parent'});
      if(res.status === 'no_products') {
        this.events.publish("widgets:noProductsAvailable");
      } else if(res.status === 'no_more_products') {
        this.events.publish("widgets:noMoreSearchProducts");
      } else {
          let carouselProductsIds: any = [];
          const carouselProductsRef = this.afs.collection('widgets').doc(widgetID).collection('products');
          const carouselProductsData = await carouselProductsRef.snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          ).pipe(first()).toPromise();
          for (let index = 0; index < carouselProductsData.length; index++) {
            carouselProductsIds.push(carouselProductsData[index].id);
          }
          console.log(carouselProductsIds);
          this.searchCarouselProducts = [];
          res.products.forEach(h => {
            if (carouselProductsIds.indexOf(h.objectID) === -1) {
              this.searchCarouselProducts.push({id: h.objectID, data: h, isAdded: false});
            } else {
              this.searchCarouselProducts.push({id: h.objectID, data: h, isAdded: true});
            }
          });
          if (this.searchCarouselProducts.length) {
            this.events.publish('widgets:publishProductsForProductCarousel', this.searchCarouselProducts);
            console.log(this.searchCarouselProducts)
          } else {
            this.events.publish('widgets:noMoreSearchProducts');
          }
      }
    } else {
      this.storage.get('searchKey').then((val) => {
        this.client = algoliasearch(this.ALGOLIA_APP_ID, val.key);
        this.index = this.client.initIndex(this.APP_PROJECT_ID);
        let vendorfilters:any = ''
        if (vendorId){
          vendorfilters = `vendorId:${vendorId}`
        }
        this.index.search(searchValue, { page: page, filters: vendorfilters }).then(async (result) => {
          console.log(result);
          if (result.nbPages === 0) {
            this.events.publish('widgets:noProductsAvailable');
          } else if (result.hits.length === 0 && page === result.nbPages) {
            this.events.publish('widgets:noMoreSearchProducts');
          } else {
            let carouselProductsIds: any = [];
            const carouselProductsRef = this.afs.collection('widgets').doc(widgetID).collection('products');
            const carouselProductsData = await carouselProductsRef.snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
            for (let index = 0; index < carouselProductsData.length; index++) {
              carouselProductsIds.push(carouselProductsData[index].id);
            }
            console.log(carouselProductsIds);
            result.hits.forEach(h => {
              if (carouselProductsIds.indexOf(h.objectID) === -1 && h.ptype === 'parent') {
                this.searchCarouselProducts.push({id: h.objectID, data: h, isAdded: false});
              } else {
                this.searchCarouselProducts.push({id: h.objectID, data: h, isAdded: true});
              }
            });
            if (this.searchCarouselProducts.length) {
              this.events.publish('widgets:publishProductsForProductCarousel', this.searchCarouselProducts);
              console.log(this.searchCarouselProducts)
            } else {
              this.events.publish('widgets:noMoreSearchProducts');
            }
          }
        }).catch(async (err) => {
          console.log(err);
          // if (err.status != 200) {
          //   await this.generateSearchKey();
          //   this.alogoliaSearchProductsForProductCarousel(searchValue, page, type, widgetID);
          // }
        });
      });
    }
  }

  async searchProductForWidgets(searchValue: string, windex: number) {
    console.log('searchValue', searchValue);
    this.afs.collection('products', ref => ref
    .orderBy('nameToSearch')
    .startAt(searchValue.toLowerCase())
    .endAt(searchValue.toLowerCase()+"\uf8ff")
    )
    .snapshotChanges().subscribe(async (result: any) => {
      if(!result.length) {
        this.events.publish('widgets:noProductsAvailable');
      } else {
        const productsData = [];
        const pdtIds: any = [];
        const pdtref = this.afs.collection('widgets').doc(`widget${windex}`).collection('products');
        const pdtData = await pdtref.snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          ).pipe(first()).toPromise();
        for (let index = 0; index < pdtData.length; index++) {
            pdtIds.push(pdtData[index].id);
          }
        for (const product of result) {
            if (pdtIds.indexOf(product.payload.doc.id) === -1) {
              productsData.push({id: product.payload.doc.id, ...product.payload.doc.data(), isAdded: false});
            } else {
              productsData.push({id: product.payload.doc.id, ...product.payload.doc.data(), isAdded: true});
            }
          }
        if (productsData.length) {
            this.events.publish('widgets:publishProductsForWidgets', productsData);
          } else {
            this.events.publish('widgets:noProductsAvailable');
          }
        }
    });
  }

  async searchProductForCouponCodes(searchValue: string) {
    console.log('searchValue', searchValue);
    this.afs.collection('products', ref => ref
    .orderBy('nameToSearch')
    .startAt(searchValue.toLowerCase())
    .endAt(searchValue.toLowerCase()+"\uf8ff")
    )
    .snapshotChanges().subscribe(async (result) => {
      if(!result.length) {
        this.events.publish('coupon-codes:noProductsAvailableForModal');
      } else {
        let productsData = [];
        for(const product of result) {
          productsData.push({id: product.payload.doc.id, data: product.payload.doc.data()});
        }
        if(productsData.length) {
          this.events.publish('coupon-codes:publishProductsForCouponCodesModal', productsData);
        } else {
          this.events.publish('coupon-codes:noProductsAvailableForModal');
        }
      }
    });
  }

  async alogoliaSearchProductsForCouponCodes(searchValue: string, page: number, type: string) {
    console.log('page', page);
    console.log('type', type);
    if (type === 'new_search') {
      this.searchCouponProducts = [];
    }
    if(this.useTypesense) {
      const res = await this.getSearchProductsFromTypesense(searchValue, page, type, this.searchCouponProducts, false, {filter: 'ptype:=parent'});
      if(res.status === 'no_products') {
        this.events.publish("coupon-codes:noProductsAvailableForModal");
      } else if(res.status === 'no_more_products') {
        this.events.publish("coupon-codes:noMoreAdminSearchProducts");
      } else {
        this.events.publish("coupon-codes:publishProductsForCouponCodesModal", res.products);
      }
    } else {
      this.storage.get('searchKey').then((val) => {
        this.client = algoliasearch(this.ALGOLIA_APP_ID, val.key);
        this.index = this.client.initIndex(this.APP_PROJECT_ID);
        this.index.search(searchValue, { page: page }).then((result) => {
          console.log(result);
          if (result.nbPages === 0) {
            this.events.publish('coupon-codes:noProductsAvailableForModal');
          } else if (result.hits.length === 0 && page === result.nbPages) {
            this.events.publish('coupon-codes:noMoreAdminSearchProducts');
          } else {
            result.hits.forEach(h => {
              if (h.ptype === 'parent') {
                this.searchCouponProducts.push({id: h.objectID, ...h});
              }
            });
            this.events.publish('coupon-codes:publishProductsForCouponCodesModal', this.searchCouponProducts);
          }
        }).catch(async (err) => {
          console.log(err);
          if (err.status != 200) {
            await this.generateSearchKey();
            this.alogoliaSearchProductsForCouponCodes(searchValue, page, type);
          }
        });
      });
    }
  }

  async alogoliaSearchProducts(searchValue: string, page: number, type: string) {
    if (type === 'new_search') {
      this.products = [];
    }
    if(this.useTypesense) {
      const res = await this.getSearchProductsFromTypesense(searchValue, page, type, this.products, true, {filter: 'status:=true'});
      if(res.status === 'no_products') {
        this.events.publish("search-engine:noSearchProductsAvailable");
      } else if(res.status === 'no_more_products') {
        this.events.publish("search-engine:noMoreSearchProducts");
      } else {
        this.events.publish('search-engine:productSearchResults', res.products);
      }
    } else {
      this.storage.get('searchKey').then((val) => {
        this.client = algoliasearch(this.ALGOLIA_APP_ID, val.key);
        this.index = this.client.initIndex(this.APP_PROJECT_ID);
        this.index.search(searchValue, { page: page }).then((result) => {
          console.log(result);
          if (result.nbPages === 0) {
            this.events.publish('search-engine:noSearchProductsAvailable');
          } else if (result.hits.length === 0 && page === result.nbPages) {
            this.events.publish('search-engine:noMoreSearchProducts');
          } else {
            result.hits.forEach(h => {
              if (h.status) {
                this.products.push({id: h.objectID, data: h});
              }
            });
            this.events.publish('search-engine:productSearchResults', this.products);
          }
        }).catch(async (err) => {
          console.log(err);
          if (err.status != 200) {
            await this.generateSearchKey();
            this.alogoliaSearchProducts(searchValue, page, type);
          }
        });
      });
    }
  }
  async alogoliaSearchProductsForAdmin(searchValue: string, page: number, type: string, productType, productData?: any) {
    if (type === 'new_search') {
      this.adminProducts = [];
    }
    if(this.useTypesense) {
      if (type !== 'new_search' && productData) {
        this.adminProducts = productData;
      }
      console.log("adminProducts SearchProductsForAdmin", this.adminProducts);
      let filter = 'ptype:=parent'
      let userRole = await this.storage.get('userRole');
      if (userRole == 'vendor') {
        let vendorId = await this.storage.get('uid');
        filter += ` && vendorId:=${vendorId}`;
      }
      const res = await this.getSearchProductsFromTypesense(searchValue, page, type, this.adminProducts, true, {filter});
      console.log("alogoliaSearchProductsForAdmin res",res);
      if(res.status === 'no_products') {
        this.events.publish("search-engine:noAdminSearchProductsAvailable");
      } else if(res.status === 'no_more_products') {
        this.events.publish("search-engine:noMoreAdminSearchProducts");
      } else {
        console.log("productType: ",productType);
        if (productType && productType === 'booking') {
          this.events.publish("booking:publishProductsForAdminProducts", res.products);
          return;
        }
        this.events.publish("product:publishProductsForAdminProducts", res.products);
      }
    } else {
      let filters = '';
      const searchQueryParams = {page};
      let userRole = await this.storage.get('userRole');
      if (userRole == 'vendor') {
        let vendorId = await this.storage.get('uid');
        filters = `vendorId:${vendorId}`;
        searchQueryParams['filters'] = `vendorId:${vendorId}`;
      }
      this.storage.get('searchKey').then((val) => {
        this.client = algoliasearch(this.ALGOLIA_APP_ID, val.key);
        this.index = this.client.initIndex(this.APP_PROJECT_ID);
        this.index.search(searchValue, searchQueryParams).then((result) => {
          console.log(result);
          if (result.nbPages === 0) {
            this.events.publish('search-engine:noAdminSearchProductsAvailable');
          } else if (result.hits.length === 0 && page === result.nbPages) {
            this.events.publish('search-engine:noMoreAdminSearchProducts');
          } else {
            result.hits.forEach(h => {
              if (h.ptype === 'parent') {
                this.adminProducts.push({id: h.objectID, data: h});
              }
            });
            this.events.publish('product:publishProductsForAdminProducts', this.adminProducts);
          }
        }).catch(async (err) => {
          console.log(err);
          if (err.status != 200) {
            await this.generateSearchKey();
            this.alogoliaSearchProductsForAdmin(searchValue, page, type, productType);
          }
        });
      });
    }
    
  }
  generateSearchKey() {
    return new Promise(async (resolve, reject) => {
      const uid = this.userService.getUserId();
      console.log('uid in generate seacrh key', uid)
      if (uid) {
        console.log(uid);
        firebase.auth().currentUser.getIdToken()
      .then(function(token) {
        return fetch('https://us-central1-' + environment.firebase.projectId + '.cloudfunctions.net/search-getSearchKey/', {
            headers: { Authorization: 'Bearer ' + token }
        });
      })
      .then(function(response) {
        return response.json();
      })
      .then((data) => {
        console.log('key', data.key);
        this.storage.set('searchKey', {key: data.key, createdAt: new Date()});
        resolve('key generated');
        });
      } else {
        console.log('no uid');
      }
    });
  }

  async alogoliaSearchProductsToCreateOrder(searchValue: string, page: number, type: string) {
    console.log('page', page);
    console.log('type', type);
    if (type === 'new_search') {
      this.productsToCreateOrder = [];
    }
    if(this.useTypesense) {
      const res = await this.getSearchProductsFromTypesense(searchValue, page, type, this.productsToCreateOrder, false, {filter: 'ptype:=parent'});
      if(res.status === 'no_products') {
        this.events.publish("search-engine:noProductsAvailableToCreateOrder");
      } else if(res.status === 'no_more_products') {
        this.events.publish("search-engine:noProductsAvailableToCreateOrder");
      } else {
        this.events.publish("search-engine:publishProductsToCreateOrder", res.products);
      }
    } else {
      this.storage.get('searchKey').then((val) => {
        this.client = algoliasearch(this.ALGOLIA_APP_ID, val.key);
        this.index = this.client.initIndex(this.APP_PROJECT_ID);
        this.index.search(searchValue, { page: page }).then((result) => {
          console.log(result);
          if (result.nbPages === 0) {
            this.events.publish('search-engine:noProductsAvailableToCreateOrder');
          } else if (result.hits.length === 0 && page === result.nbPages) {
            this.events.publish('search-engine:noProductsAvailableToCreateOrder');
          } else {
            result.hits.forEach(h => {
              if (h.ptype === 'parent') {
                this.productsToCreateOrder.push({id: h.objectID, ...h});
              }
            });
            this.events.publish('search-engine:publishProductsToCreateOrder', this.productsToCreateOrder);
          }
        }).catch(async (err) => {
          console.log(err);
          if (err.status != 200) {
            await this.generateSearchKey();
            this.alogoliaSearchProductsForCouponCodes(searchValue, page, type);
          }
        });
      });
    }
  }

  async getSearchProductsFromTypesense(searchValue: string, page: number, type: string, products, isDataObj, filterObj) {
    console.log("page before", page);
    return new Promise<{status: string, products: any[]}>(async (resolve, reject) => {
      if (type === "new_search") {
        products = [];
        page = 0;
        page += 1;
      }
      // page += 1;
      console.log("getSearchProductsFromTypesense page", page);

      let searchParameters = {
        'q'         : searchValue,
        'query_by'  : 'prodName, productCode, searchKeywords',
        'filter_by' : filterObj.filter || '',
        'page': page,
        'per_page': 20
      }
      
      this.typesenseClient.collections(`${environment.firebase.projectId}-products`).documents().search(searchParameters).then(response => {
        console.log(response);
        if (!response) {
          resolve({status: 'no_products', products: []});
        } else {
          let noResults = true;
          let noMoreResults = true;
          if(response.found > 0) {
            noResults = false;
          }
          if(response.hits.length) {
            noMoreResults =  false;
          }
          response.hits.forEach((h) => {
            if(!products.length || products.some((product) => product.id !== h.document.id)) {
              h.document = this.parseArrayOfObjects(h.document);
              if(isDataObj) {
                products.push({ data: h.document, id: h.document.id, objectID: h.document.id });
              } else {
                products.push({ ...h.document, id: h.document.id, objectID: h.document.id });
              }
            }
          });
          if(noResults) {
            resolve({status: 'no_products', products: []});
          } else if(noMoreResults) {
            resolve({status: 'no_more_products', products: []});
          } else {
            resolve({status: 'available', products: products})
          }
        }
      }).catch(error => {
        console.log(error);
        resolve({status: 'no_products', products: []});
      })
    })
  }
  
  parseArrayOfObjects(object) {
    for (const key in object) {
      try {
        const value = JSON.parse(object[key]);
        if((Array.isArray(value) && value.length && typeof value[0] == 'object') || (Array.isArray(value) && !value.length)) {
          object[key] = value;
        }
      } catch (error) {
        
      }
    }
    return object;
  }

  appendCountyCode(phoneNo: any) {
    const defaultCountryCode = this.configService.environment.defaultCountryCode;
    return defaultCountryCode + phoneNo;
  }

  async convertInvalidDateObjectToTimestamp(dateObj) {
    if (typeof dateObj.toDate === 'function') {
      return dateObj;
    }
    const date = new Date(dateObj._seconds * 1000);
    return firebase.firestore.Timestamp.fromDate(new Date(date));
  }

  async getSearchUsersFromTypesenseUsingSingleSearch(searchValue: string, page: number, type: string, users) {
    return new Promise<{ status: string, users: any[] }>(async (resolve, reject) => {
      if (type === "new_search") {
        users = [];
      }

      let searchParameters = {
        'q': searchValue,
        'query_by': 'name, phoneNo',
        'page': page,
        'per_page': 100
      }

      this.typesenseClient.collections(`${environment.firebase.projectId}-users`).documents().search(searchParameters).then(response => {
        console.log(response);
        if (!response) {
          resolve({ status: 'no_users', users: [] });
        } else {
          let noResults = true;
          let noMoreResults = true;
          if (response.found > 0) {
            noResults = false;
          }
          if (response.hits.length) {
            noMoreResults = false;
          }
          response.hits.forEach(async (h) => {
            if (!users.length || users.some((user) => user.id !== h.document.id)) {
              h.document.lastAccessAt = await this.convertInvalidDateObjectToTimestamp(h.document.lastAccessAt);
              h.document.phoneNo = this.appendCountyCode(h.document.phoneNo);
              users.push({ data: h.document, id: h.document.id });
            }
          });
          if (noResults) {
            resolve({ status: 'no_users', users: [] });
          } else if (noMoreResults) {
            resolve({ status: 'no_more_users', users: [] });
          } else {
            resolve({ status: 'available', users: users })
          }
        }
      }).catch(error => {
        console.log(error);
        resolve({ status: 'no_users', users: [] });
      })
    })
  }

  async getSearchOrdersFromTypeSenseUsingSingleSearch(searchValue: string, page: number, type: string, orders: any[]) {
    return new Promise<{ status: string, orders: any[] }>(async (resolve, reject) => {
      if (type === "new_search") {
        orders = [];
      }

      let searchParameters = {
        'q': searchValue,
        'query_by': 'orderId, productNames, userName, userPhoneNo,',
        'page': page,
        'per_page': 20
      }

      this.typesenseClient.collections(`${environment.firebase.projectId}-orders`).documents().search(searchParameters).then(response => {
        console.log("typeSense res:", response);
        if (!response) {
          resolve({ status: 'no_orders', orders: [] });
        } else {
          let noResults = true;
          let noMoreResults = true;
          if (response.found > 0) {
            noResults = false;
          }
          if (response.hits.length) {
            noMoreResults = false;
          }
          response.hits.forEach(async (h) => {
            if (!orders.length || orders.some((order) => order.id !== h.document.id)) {
              h.document.createdAt = await this.convertInvalidDateObjectToTimestamp(h.document.createdAt);
              h.document.orderId = parseInt(h.document.orderId);
              // orders.push({ data: h.document, id: h.document.id });
              orders.push({ ...h.document, id: h.document.id });
            }
          });
          if (noResults) {
            resolve({ status: 'no_orders', orders: [] });
          } else if (noMoreResults) {
            resolve({ status: 'no_more_orders', orders: [] });
          } else {
            resolve({ status: 'available', orders: orders })
          }
        }
      }).catch(error => {
        console.log('getSearchOrdersFromTypesenseUsingSingleSearch: ', error);
        resolve({ status: 'orders', orders: [] });
      })
    })
  }

}
