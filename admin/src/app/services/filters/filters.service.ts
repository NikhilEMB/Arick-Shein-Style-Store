import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';
import { ConfigService } from '../config/config.service';
import { SharedService } from '../shared/shared.service';
import algoliasearch from 'algoliasearch';
import { Storage } from '@ionic/storage';
import { convertSnaps } from '../../services/db-utilis';

@Injectable({
    providedIn: 'root'
})
export class FiltersService {
    productsData: any[] = [];
    lastInResponse: any;
    productSub: Subscription;
    ALGOLIA_APP_ID = this.configService.environment.ALGOLIA_APP_ID;
    APP_PROJECT_ID = environment.firebase.projectId;
    client: any;
    index: any;
    allFilters = '';
    callCount = 0;

    filtersRef = this.afs.collection('features').doc('filters').collection('list');
    constructor(private events: Events,
        private afs: AngularFirestore,
        private logglyService: LogglyLoggerService,
        private configService: ConfigService,
        private sharedService: SharedService,
        private storage: Storage) { }

    initializeSubscriptions() {
        this.events.subscribe('filters:sortByAttribute', (id, type, attribute, sortingOrder) => {
            this.sortByAttribute(id, type, attribute, sortingOrder);
        });
        this.events.subscribe('filters:sortLoadMoreProducts', (id, type, attribute, sortingOrder) => {
            this.sortLoadMoreProducts(id, type, attribute, sortingOrder);
        });
        this.events.subscribe('filters:filterByAttributes', (data, id, type, page) => {
            this.filterByAttributes(data, id, type, page);
        });


        // admin
        this.events.subscribe('filters:saveFilter', (filterData) => {
            this.saveFilter(filterData);
        });
        this.events.subscribe('filters:toggleFiltersActive', (status) => {
            this.toggleFiltersActive(status);
        });
        this.events.subscribe('filters:getActiveStatus', () => {
            this.getActiveStatus();
        });
        this.events.subscribe('filters:getAllFilters', () => {
            this.getAllFilters();
        });
        this.events.subscribe('filters:toggleSingleFilterActive', (status, id) => {
            this.toggleSingleFilterActive(status, id);
        });
        this.events.subscribe('filters:deleteFilter', (id) => {
            this.deleteFilter(id);
        });
        this.events.subscribe('filters:getAllActiveFilters', () => {
            this.getAllActiveFilters();
        });


        this.events.subscribe('product:removeSusbcriptions', () => {
            if (this.productSub) {
                console.log('in removeSusbcriptions unsubscribe');
                this.productSub.unsubscribe();
            }
        });
    }

    async sortByAttribute(id: string, type: string, attribute: string, sortingOrder: any) {
        console.log('in getProducts', id, type);
        this.productsData = [];
        let productRef: AngularFirestoreCollection;
        productRef = this.afs.collection('products', ref => ref
                .where(`${type}`, 'array-contains', id)
                .where('status', '==', true)
                .orderBy(attribute, sortingOrder)
                .limit(this.configService.environment.shopProductsLimit))
        this.productSub = productRef.snapshotChanges()
            .subscribe((response: any) => {
                if (!response.length) {
                    console.log('No Data Available');
                    this.events.publish('product:noProductAvailable');
                    return false;
                }
                this.productsData = [];
                this.lastInResponse = response[response.length - 1].payload.doc;
                for (const product of response) {
                    this.productsData.push({ id: product.payload.doc.id, data: product.payload.doc.data() });
                }
                console.log('productsData in product service', this.productsData);
                if (this.productsData.length !== 0) {
                    console.log('publishProducts');
                    this.events.publish('product:publishProducts', this.productsData);
                } else {
                    console.log('noDataAvailable');
                    this.events.publish('product:noProductAvailable');
                }
            }, error => {
                console.dir(error);
                error['location'] = 'filters-service:sortByAttribute';
                this.logglyService.log(error);
            });
    }
    async sortLoadMoreProducts(id: string, type: string, attribute: string, sortingOrder: any) {
        console.log('in loadMoreProducts service...', this.lastInResponse.id);
        let productRef: AngularFirestoreCollection;
        productRef = this.afs.collection('products', ref => ref
                .where(`${type}`, 'array-contains', id)
                .where('status', '==', true)
                .orderBy(attribute, sortingOrder)
                .limit(this.configService.environment.shopProductsLimit)
                .startAfter(this.lastInResponse))
        productRef.snapshotChanges()
            .subscribe((response: any) => {
                if (!response.length) {
                    console.log('No Data Available');
                    this.events.publish('product:productsLimitReached');
                    return false;
                }
                this.lastInResponse = response[response.length - 1].payload.doc;
                console.log('response in loadmore', response);
                for (const product of response) {
                    this.productsData.push({ id: product.payload.doc.id, data: product.payload.doc.data() });
                }
                console.log('load more products', this.productsData);
                this.events.publish('product:publishProducts', this.productsData);
            }, error => {
                error['location'] = 'filters-service:sortLoadMoreProducts';
                this.logglyService.log(error);
            });
    }


    async filterByAttributes(data: any, id: string, type: string, page: number) {
        console.log('data.parentFilterObj', data.parentFilterObj);
        if (page === 0) {
            this.productsData = [];
            let regionId = await this.sharedService.checkRegionIdForApi();
            let filters = `status:true AND ${type}:"${id}" AND discountedPrice:${data.priceRange.lower} TO ${data.priceRange.upper} AND discount:${data.discountRange[0]} TO ${data.discountRange[1]}`;

            if (data.ratingRange[0] > 0) {
                filters += ` AND rating.avgRating:${data.ratingRange[0]} TO ${data.ratingRange[1]}`;
            }

            if (data.parentFilterObj.ids.length) {
                if (data.parentFilterObj.ids.length === 1) {
                    filters += ` AND ${data.parentFilterObj.type}:"${data.parentFilterObj.ids[0]}"`;
                } else {
                    let idFilter = '';
                    data.parentFilterObj.ids.map((id, index) => {
                        if (index === 0) {
                            idFilter += ` (${data.parentFilterObj.type}:"${id}"`;
                        } else if (index > 0 && index !== data.parentFilterObj.ids.length - 1) {
                            idFilter += ` OR ${data.parentFilterObj.type}:"${id}"`;
                        } else {
                            idFilter += ` OR ${data.parentFilterObj.type}:"${id}")`;
                        }
                    });
                    filters += ` AND ${idFilter}`;
                }
                
            }

            if (regionId) {
                filters += ` AND (categoryRegions:${regionId} OR brandRegions:${regionId})`
            }

            if (data.adminFilters.length) {
                let adminFilters = {};
                data.adminFilters.forEach(filter => {
                    filter.values.forEach(v => {
                        if (v.isChecked) {
                            if (adminFilters.hasOwnProperty(filter.name)) {
                                let valArr = adminFilters[filter.name];
                                valArr.push(v.value);
                                adminFilters[filter.name] = valArr;
                            } else {
                                adminFilters[filter.name] = [v.value];
                            }
                        }
                    });
                });
                let keys = Object.keys(adminFilters);
                if (keys.length > 0) {
                    keys.forEach(key => {
                        let values = adminFilters[key];
                        let valueFilter = ' AND';
                        values.map((value, index) => {
                            if (values.length === 1) {
                                valueFilter += ` (filters.${key}:"${value}")`
                            } else {
                                if (index === 0) {
                                    valueFilter += ` (filters.${key}:"${value}"`;
                                } else if (index > 0 && index !== values.length - 1) {
                                    valueFilter += ` OR filters.${key}:"${value}"`;
                                } else {
                                    valueFilter += ` OR filters.${key}:"${value}")`;
                                }
                            }
                        });
                        filters += valueFilter;
                    });
                }
            }
            this.allFilters = filters;
        }
        console.log('allFilters', this.allFilters);


        this.storage.get('searchKey').then((val) => {
            this.client = algoliasearch(this.ALGOLIA_APP_ID, val.key);
            this.index = this.client.initIndex(this.APP_PROJECT_ID);
            this.index.search('', { page: page, filters: this.allFilters }).then((result) => {
                console.log(result);
                if (result.nbPages === 0) {
                    this.events.publish('product:noProductAvailable');
                } else if (result.hits.length === 0 && page === result.nbPages) {
                    this.events.publish('product:productsLimitReached');
                } else {
                    result.hits.forEach(h => {
                        this.productsData.push({ id: h.objectID, data: h });
                    });
                    this.events.publish('product:publishProducts', this.productsData);
                }
            }).catch(async (error) => {
                console.dir(error);
                if (error.status && error.status !== 200) {
                    if (!this.callCount) {
                        await this.sharedService.generateSearchKey();
                        this.filterByAttributes(data, id, type, page);
                        this.callCount += 1;
                    }
                }
                error['location'] = 'filters-service:filterByAttributes';
                this.logglyService.log(error);
            });
        });
    }

    async saveFilter(filterData) {
        try {
            let filterId = '';
            let filterClone = JSON.parse(JSON.stringify(filterData));
            if (filterClone.hasOwnProperty('id')) {
                filterId = filterClone.id;
                delete filterData.id;
            } else {
                filterId = this.filtersRef.ref.doc().id;
            }
            await this.filtersRef.doc(filterId).set(filterData);
            this.events.publish('filters:filterSaved');
            this.events.publish('filters:getAllFilters');
        } catch (error) {
            console.dir(error);
            error['location'] = 'filters-service:saveFilter';
            this.logglyService.log(error);
        }
    }


    async toggleFiltersActive(status: boolean) {
        try {
            await this.afs.collection('features').doc('filters').set({ active: status });
            this.events.publish('filters:filtersActiveChanged');
        } catch (error) {
            console.dir(error);
            error['location'] = 'filters-service:toggleFiltersActive';
            this.logglyService.log(error);
        }
    }

    async getActiveStatus(route?) {
        try {
            const filtersDoc = await this.afs.collection('features').doc('filters').valueChanges().pipe(first()).toPromise();
            if (route === 'service') {
                return filtersDoc;
            } else {
                this.events.publish('filters:publishActiveStatus', filtersDoc);
            }
        } catch (error) {
            console.dir(error);
            error['location'] = 'filters-service:getActiveStatus';
            this.logglyService.log(error);
        }
    }

    async getAllFilters() {
        try {
            const filters = await this.filtersRef.snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                }))
            ).pipe(first()).toPromise();
            console.log('filters', filters);
            this.events.publish('filters:publishAllFilters', filters);
        } catch (error) {
            console.dir(error);
            error['location'] = 'filters-service:getAllFilters';
            this.logglyService.log(error);
        }
    }

    async toggleSingleFilterActive(status, id) {
        try {
            await this.filtersRef.doc(id).update({ active: status });
            this.events.publish('filters:singleFilterActiveChanged');
        } catch (error) {
            console.dir(error);
            error['location'] = 'filters-service:toggleSingleFilterActive';
            this.logglyService.log(error);
        }
    }

    async deleteFilter(id) {
        try {
            await this.filtersRef.doc(id).delete();
            this.events.publish('filters:filterDeleted');
            this.events.publish('filters:getAllFilters');
        } catch (error) {
            console.dir(error);
            error['location'] = 'filters-service:deleteFilter';
            this.logglyService.log(error);
        }
    }

    async getAllActiveFilters() {
        try {
            const filters = await this.afs.collection('features').doc('filters').collection('list', ref => ref
                .where('active', '==', true)).snapshotChanges().pipe(
                    map(actions => actions.map(a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    }))
                ).pipe(first()).toPromise();
            console.log('filters', filters);
            this.events.publish('filters:publishAllActiveFilters', filters);
        } catch (error) {
            console.dir(error);
            error['location'] = 'filters-service:getAllActiveFilters';
            this.logglyService.log(error);
        }
    }

    async getCategoriesWithSubcategories() {
        let list = [];
        return new Promise(async (resolve, reject) => {
            const categories = await this.afs.collection('categories', ref => ref
                .orderBy('sortedAt', 'desc')
                .where('status', '==', true)).snapshotChanges().pipe(
                    map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
            for (const c of categories) {
                if (c.isSubcategories) {
                    const subcategories: any = await this.getSubcategories(c.id);
                    let sublist = [];
                    if (subcategories.length) {
                        for (const sc of subcategories) {
                            if (sc.isSubcategories) {
                                const subOfSubCategories: any = await this.getSubOfSubCategories(c.id, sc.id);
                                let subOfSubCatList = [];
                                if (subOfSubCategories.length) {
                                    for (const subOfSubCat of subOfSubCategories) {
                                        subOfSubCatList.push({ id: subOfSubCat.id, name: subOfSubCat.name, active: false, slug: 'slug' in subOfSubCat ? subOfSubCat.slug : {} });
                                    }
                                    // console.log('subOfSubCatList:', subOfSubCatList);
                                }
                                sublist.push({ id: sc.id, name: sc.name, active: false, subOfSubCatList, slug: 'slug' in sc ? sc.slug : {} });
                            } else {
                                sublist.push({ id: sc.id, name: sc.name, active: false, subOfSubCatList: [], slug: 'slug' in sc ? sc.slug : {} });
                            }
                            // sublist.push({ id: sc.id, name: sc.name, active: false });
                        }
                    }
                    list.push({ id: c.id, name: c.name, sublist, active: false, slug: 'slug' in c ? c.slug : {} });
                } else {
                    list.push({ id: c.id, name: c.name, sublist: [], active: false, slug: 'slug' in c ? c.slug : {} });
                }
            }
            resolve(list);
        });

    }

    async getSubcategories(cid) {
        return new Promise(async (resolve, reject) => {
            const subcategories = await this.afs.collection('categories').doc(cid).collection('subcategories', ref =>
                ref.orderBy('sortedAt', 'desc').where('status', '==', true)).snapshotChanges().pipe(
                    map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
            resolve(subcategories);
        });
    }

    async getBrands() {
        let list = [];
        return new Promise(async (resolve, reject) => {
            const brands: any = await this.afs.collection('brands', ref => ref
                .orderBy('sortedAt', 'desc')
                .where('status', '==', true)).snapshotChanges().pipe(
                    map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();

            for (const b of brands) {
                list.push({ id: b.id, name: b.name, sublist: [], active: false, slug: 'slug' in b ? b.slug : {} });
            }
            resolve(list);
        });
    }

    async getServices() {
        let list = [];
        return new Promise(async (resolve, reject) => {
            const services: any = await this.afs.collection('services', ref => ref
                .orderBy('createdAt', 'desc')).snapshotChanges().pipe(
                    map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();

            for (const s of services) {
                list.push({ id: s.id, name: s.name, sublist: [], active: false });
            }
            resolve(list);
        });
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


}
