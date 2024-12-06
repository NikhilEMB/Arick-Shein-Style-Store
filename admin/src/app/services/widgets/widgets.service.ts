import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { convertSnaps } from '../db-utilis';
import * as firebase from 'firebase';
import { SharedService } from '../shared/shared.service';
import { ConfigService } from '../config/config.service';
@Injectable({
    providedIn: 'root'
})
export class WidgetsService {
    widgetRefrence = this.angularFirestore.collection('widgets');
    productList: any;
    productListLastResponse: any;
    productListFirstResponse: any;
    constructor(
        private events: Events,
        private angularFirestore: AngularFirestore,
        private angularFireStorage: AngularFireStorage,
        private logglyService: LogglyLoggerService, 
        private sharedService: SharedService,
        private configService: ConfigService) { }

    initializeSubscriptions() {
        this.events.subscribe('widgets:getWidgetsList', (type) => {
            this.getWidgetsList(type);
        });

        this.events.subscribe('widgets:addWidget', (data) => {
            this.addWidget(data);
        });

        this.events.subscribe('widgets:deleteWidget', (ID) => {
            this.deleteWidget(ID);
        });

        this.events.subscribe('widgets:updateWidget', (data, ID) => {
            this.updateWidget(data, ID);
        });

        this.events.subscribe('widgets:getWidgetData', (ID) => {
            this.getWidgetData(ID);
        });

        this.events.subscribe('widgets:getBannerSlides', (ID) => {
            this.getBannerSlides(ID);
        });

        this.events.subscribe('widgets:getBannerSlide', (bannerID, slideID, type) => {
            this.getBannerSlide(bannerID, slideID, type);
        });

        this.events.subscribe('widgets:addBannerSlide', (slideData, bannerID, type) => {
            this.addBannerSlide(slideData, bannerID, type);
        });

        this.events.subscribe('widgets:updateBannerSlide', (slideData, bannerID, slideID, type) => {
            this.updateBannerSlide(slideData, bannerID, slideID, type);
        });

        this.events.subscribe('widgets:deleteSlide', (bannerID, slideID, type) => {
            this.deleteSlide(bannerID, slideID, type);
        });

        this.events.subscribe('widgets:changeSlideStatus', (bannerID, slideID, status, type) => {
            this.changeSlideStatus(bannerID, slideID, status, type);
        });

        this.events.subscribe('widgets:getProductsForProductCarousel', (ID) => {
            this.getProductsForProductCarousel(ID);
        });

        this.events.subscribe('widgets:loadMoreProductsForProductCarousel', (ID) => {
            this.loadMoreProductsForProductCarousel(ID);
        });

        this.events.subscribe('widgets:loadPreviousProductsForProductCarousel', (ID) => {
            this.loadPreviousProductsForProductCarousel(ID);
        });

        this.events.subscribe('widgets:addProductToCarousel', (product, widgetID, vendorId) => {
            this.addProductToCarousel(product, widgetID, vendorId);
        });

        this.events.subscribe('widgets:getCarouselProducts', (widgetID) => {
            this.getCarouselProducts(widgetID);
        });

        this.events.subscribe('widgets:deleteCarouselProduct', (widgetID, productID) => {
            this.deleteCarouselProduct(widgetID, productID);
        });

        this.events.subscribe('widgets:addVideoBlock', (data) => {
            this.addVideoBlock(data);
        });

        this.events.subscribe('widgets:updateVideoBlock', (data, ID) => {
            this.updateVideoBlock(data, ID);
        });

        this.events.subscribe('widgets:updateTextBlock', (data, ID) => {
            this.updateTextBlock(data, ID);
        });

        this.events.subscribe('widgets:addCategories', (data, name, pageId) => {
            this.addCategories(data, name, pageId);
        });

        this.events.subscribe('widgets:updateCategories', (id, data) => {
            this.updateCategories(id, data);
        });

        this.events.subscribe('widgets:addBrands', (data, name, pageId) => {
            this.addBrands(data, name, pageId);
        });

        this.events.subscribe('widgets:updateBrands', (id, data) => {
            this.updateBrands(id, data);
        });

        this.events.subscribe('widgets:addServices', (data, name, pageId) => {
            this.addServices(data, name, pageId);
        });

        this.events.subscribe('widgets:updateServices', (id, data) => {
            this.updateServices(id, data);
        });

        this.events.subscribe('widgets:saveForm', (data) => {
            this.saveForm(data);
        });

        this.events.subscribe('widgets:saveDocument', (data) => {
            this.saveDocument(data);
        });

        this.events.subscribe('widgets:updateProductCaraouselPosition', (widgetID, productID, changedDate) => {
            this.updateProductCaraouselPosition(widgetID, productID, changedDate);
        });

    }

    async getWidgetsList(type, route?) {
        const response = await this.angularFirestore.collection('widgets', ref => ref.where('type', '==', type)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        ).pipe(first()).toPromise();
        if (route == 'service') {
            return response;
        }
        this.events.publish('widgets:publishWidgetsListSuccess', response);

        // this.angularFirestore.collection('widgets', ref => ref.where('type', '==', type)).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).subscribe((response: any) => {
        //     console.log('response:', response);
        //     if (route == 'service') {
        //         return response;
        //     }
        //     this.events.publish('widgets:publishWidgetsListSuccess', response);
        // }, error => {
        //     console.log(error);
        // });
    }

    addWidget(data) {
        data['createdAt'] = new Date();
        this.widgetRefrence.add(data).then(docRef => {
            this.events.publish('widgets:widgetAddedSuccess', docRef.id);
        })
            .catch(error => {
                console.log("Error adding document: ", error);
                this.events.publish('widgets:widgetAddedError');
            });
    }

    async saveForm(data: any, route?) {
        try {
            let baseImg = '';
            let form = JSON.parse(JSON.stringify(data));
            if (form.banner && (form.banner.url.includes('data:image/jpeg;base64') || form.banner.url.includes('data:image/jpg;base64') || form.banner.url.includes('data:image/png;base64') || form.banner.url.includes('data:image/gif;base64'))) {
                baseImg = form.banner.url;
                delete form.banner;
            }
            console.log(data)
            form['createdAt'] = new Date();
            this.widgetRefrence.add(form)
                .then(async docRef => {
                    console.log('doc id', docRef.id)
                    if (baseImg != '') {
                        let imgType = this.sharedService.getImageType(baseImg);
                        const imgRef: any = this.angularFireStorage.ref(`widgets/${docRef.id}/form/${docRef.id}` + imgType);
                        await imgRef.putString(baseImg, 'data_url');
                    }
                    if (route == 'service') {
                        return docRef.id;
                    }
                    this.events.publish('widgets:addFormSuccess', docRef.id);
                })
                .catch(error => {
                    console.error("Error adding document: ", error);
                    this.events.publish('widgets:addFormError');
                });
        }
        catch (error) {
            console.dir(error);
            this.logglyService.log(error);
        }
    }

    async saveDocument(data: any) {
        try {
            let baseImg = '';
            let pdfFile = '';
            let document = JSON.parse(JSON.stringify(data));
            if (document.coverImage && (document.coverImage.org.includes('data:image/jpeg;base64') || document.coverImage.org.includes('data:image/jpg;base64') || document.coverImage.org.includes('data:image/png;base64') || document.coverImage.org.includes('data:image/gif;base64'))) {
                baseImg = document.coverImage.org;
                delete document.coverImage;
            }
            pdfFile = data.pdfUrl
            delete document.pdfUrl
            document['createdAt'] = new Date();
            this.widgetRefrence.add(document)
                .then(async docRef => {
                    if (baseImg != '') {
                        let imgType = this.sharedService.getImageType(baseImg);
                        const imgRef: any = this.angularFireStorage.ref(`widgets/${docRef.id}/coverImage/${docRef.id}` + imgType);
                        await imgRef.putString(baseImg, 'data_url');
                    }
                    const pdfRef = this.angularFireStorage.ref(`widgets/${docRef.id}`);
                    const metadata = {
                        contentType: 'application/pdf',
                    };
                    await pdfRef.put(pdfFile, metadata);
                    let downloadURL = await pdfRef.getDownloadURL().pipe(first()).toPromise();
                    await this.widgetRefrence.doc(docRef.id).update({ pdfUrl: downloadURL })
                    this.events.publish('widgets:addDocumentSuccess', docRef.id);
                })
                .catch(error => {
                    console.error("Error adding document: ", error);
                    this.events.publish('widgets:addDocumentError');
                });
        }
        catch (error) {
            console.dir(error);
            this.logglyService.log(error);
        }
    }

    async updateWidget(data, ID) {
        this.widgetRefrence.doc(ID).update({ 'title': data.title }).then(docRef => {
            this.events.publish('widgets:widgetUpdateSuccess');
        })
            .catch(error => {
                console.log("Error adding document: ", error);
                this.events.publish('widgets:widgetUpdateError');
            });
    }

    async getWidgetData(ID) {
        try {
            const widgetData: any = await this.widgetRefrence.doc(ID).valueChanges().pipe(first()).toPromise();
            this.events.publish('widgets:publishWidgetDataSuccess', widgetData);

        } catch (error) {
            console.log(error)
        }
    }

    deleteWidget(ID, route?) {
        this.widgetRefrence.doc(ID).delete().then(docRef => {
            if (route == 'service') {
                return true;
            }
            //console.log(docRef);
            this.events.publish('widgets:deleteWidgetSuccess');
        })
            .catch(error => {
                if (route == 'service') {
                    return false;
                }
                console.log("Error adding document: ", error);
                this.events.publish('widgets:deleteWidgetError');
            });

    }
    /************** banner*********************/
    async getBannerSlides(ID) {
        const slideData = await this.widgetRefrence.doc(ID).collection('slides', ref => ref.orderBy('createdAt', 'desc')).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise()
        const webSlideData = await this.widgetRefrence.doc(ID).collection('webSlides', ref => ref.orderBy('createdAt', 'desc')).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise()
        this.events.publish('widgets:publishgetBannerSlidesSuccess', slideData, webSlideData);
    }

    async getBannerSlide(bannerID, slideID, type) {
        try {
            if (type == "app") {
                const slideData: any = await this.widgetRefrence.doc(bannerID).collection('slides').doc(slideID).valueChanges().pipe(first()).toPromise();
                console.log(slideData)
                this.events.publish('widgets:publishgetBannerSlideSuccess', slideData);
            }
            else {
                const slideData: any = await this.widgetRefrence.doc(bannerID).collection('webSlides').doc(slideID).valueChanges().pipe(first()).toPromise();
                console.log(slideData)
                this.events.publish('widgets:publishgetBannerSlideSuccess', slideData);
            }
        } catch (error) { console.log(error) }
    }

    async addBannerSlide(slideData, bannerID, type) {
        console.log(bannerID)
        try {
            let baseImg = '';
            let pdfFile = '';
            let bannerClone = JSON.parse(JSON.stringify(slideData));
            //console.log('bannerClone', bannerClone);
            if (bannerClone.image.org.includes('data:image/jpeg;base64,') || bannerClone.image.org.includes('data:image/jpg;base64,') || bannerClone.image.org.includes('data:image/png;base64,') || bannerClone.image.org.includes('data:image/gif;base64,')) {
                baseImg = bannerClone.image.org;
                delete bannerClone.image.org;
            }
            if (slideData.link.type == 'pdf') {
                pdfFile = slideData.link.url
                delete bannerClone.link.url
            }
            bannerClone['createdAt'] = new Date();
            if (type == "app") {
                await this.widgetRefrence.doc(bannerID).collection('slides').add(bannerClone).then(async docRef => {
                    //console.log("Document written with ID: ", docRef.id);
                    let imgType = this.sharedService.getImageType(baseImg);
                    const imgRef: any = this.angularFireStorage.ref(`widgets/${bannerID}/slides/${docRef.id}/${docRef.id}` + imgType);
                    await imgRef.putString(baseImg, 'data_url');
                    if (slideData.link.type == 'pdf') {
                        const pdfRef = this.angularFireStorage.ref(`widgets/${bannerID}/slides/${docRef.id}`);
                        const metadata = {
                            contentType: 'application/pdf',
                        };
                        await pdfRef.put(pdfFile, metadata);
                        let downloadURL = await pdfRef.getDownloadURL().pipe(first()).toPromise();
                        console.log('downloadURL', downloadURL)
                        let pdfLink = {
                            type: 'pdf',
                            id: '',
                            name: '',
                            url: downloadURL
                        }
                        await this.widgetRefrence.doc(bannerID).collection('slides').doc(docRef.id).update({ link: pdfLink })
                    }
                    this.events.publish('widgets:addBannerSlideSuccess', docRef.id);
                })
                    .catch(error => {
                        console.error("Error adding document: ", error);
                        this.events.publish('widgets:addBannerSlideError');
                    });
            }
            else {
                await this.widgetRefrence.doc(bannerID).collection('webSlides').add(bannerClone).then(async docRef => {
                    //console.log("Document written with ID: ", docRef.id);
                    let imgType = this.sharedService.getImageType(baseImg);
                    const imgRef: any = this.angularFireStorage.ref(`widgets/${bannerID}/webSlides/${docRef.id}/${docRef.id}` + imgType);
                    await imgRef.putString(baseImg, 'data_url');
                    if (slideData.link.type == 'pdf') {
                        const pdfRef = this.angularFireStorage.ref(`widgets/${bannerID}/webSlides/${docRef.id}`);
                        const metadata = {
                            contentType: 'application/pdf',
                        };
                        await pdfRef.put(pdfFile, metadata);
                        let downloadURL = await pdfRef.getDownloadURL().pipe(first()).toPromise();
                        console.log('downloadURL', downloadURL)
                        let pdfLink = {
                            type: 'pdf',
                            id: '',
                            name: '',
                            url: downloadURL
                        }
                        await this.widgetRefrence.doc(bannerID).collection('webSlides').doc(docRef.id).update({ link: pdfLink })
                    }
                    this.events.publish('widgets:addBannerSlideSuccess', docRef.id);
                })
                    .catch(error => {
                        console.error("Error adding document: ", error);
                        this.events.publish('widgets:addBannerSlideError');
                    });
            }
        } catch (error) {
            console.dir(error);
            this.logglyService.log(error);
        }
    }

    async updateBannerSlide(slideData, bannerID, slideID, type) {
        try {
            let baseImg = '';
            let pdfFile = '';
            let bannerClone = JSON.parse(JSON.stringify(slideData));
            if (slideData.link.type == 'pdf') {
                pdfFile = slideData.link.url
                delete bannerClone.link.url
            }
            if (bannerClone.image.org.includes('data:image/jpeg;base64,') || bannerClone.image.org.includes('data:image/jpg;base64,') || bannerClone.image.org.includes('data:image/png;base64,') || bannerClone.image.org.includes('data:image/gif;base64,')) {
                baseImg = bannerClone.image.org;
                delete bannerClone.image.org;
                if (type == 'app') {
                    let imgType = this.sharedService.getImageType(baseImg);
                    const imgRef: any = this.angularFireStorage.ref(`widgets/${bannerID}/slides/${slideID}/${slideID}` + imgType);
                    await imgRef.putString(baseImg, 'data_url');
                    const { createdAt, ...data } = bannerClone;
                    await this.widgetRefrence.doc(bannerID).collection('slides').doc(slideID).update({ ...data });
                }
                else {
                    let imgType = this.sharedService.getImageType(baseImg);
                    const imgRef: any = this.angularFireStorage.ref(`widgets/${bannerID}/webSlides/${slideID}/${slideID}` + imgType);
                    await imgRef.putString(baseImg, 'data_url');
                    const { createdAt, ...data } = bannerClone;
                    await this.widgetRefrence.doc(bannerID).collection('webSlides').doc(slideID).update({ ...data });
                }
            }
            else {
                if (type == 'app') {
                    const { createdAt, ...data } = bannerClone;
                    await this.widgetRefrence.doc(bannerID).collection('slides').doc(slideID).update({ ...data });
                }
                else {
                    const { createdAt, ...data } = bannerClone;
                    await this.widgetRefrence.doc(bannerID).collection('webSlides').doc(slideID).update({ ...data });
                }
            }
            //bannerClone['createdAt'] = new Date();
            if (slideData.link.type == 'pdf') {
                const pdfRef = this.angularFireStorage.ref(`widgets/${bannerID}/slides/${slideID}`);
                const metadata = {
                    contentType: 'application/pdf',
                };
                await pdfRef.put(pdfFile, metadata);
                let downloadURL = await pdfRef.getDownloadURL().pipe(first()).toPromise();
                console.log('downloadURL', downloadURL)
                let pdfLink = {
                    type: 'pdf',
                    id: '',
                    name: '',
                    url: downloadURL
                }
                if (type == 'app') {
                    await this.widgetRefrence.doc(bannerID).collection('slides').doc(slideID).update({ link: pdfLink })
                }
                else {
                    await this.widgetRefrence.doc(bannerID).collection('webSlides').doc(slideID).update({ link: pdfLink })
                }
            }

            this.events.publish('widgets:updateBannerSlideSuccess');

        } catch (error) {
            console.log(error);
            this.logglyService.log(error);
            this.events.publish('widgets:updateBannerSlideError');
        }
    }

    deleteSlide(widgetID, slideID, type) {
        if (type == 'app') {
            this.widgetRefrence.doc(widgetID).collection('slides').doc(slideID).delete().then(docRef => {
                console.log(docRef);
                this.events.publish('widgets:deleteSlideSuccess', 'app');
            })
                .catch(error => {
                    console.log("Error adding document: ", error);
                    this.events.publish('widgets:deleteSlideError');
                });
        }
        else {
            this.widgetRefrence.doc(widgetID).collection('webSlides').doc(slideID).delete().then(docRef => {
                console.log(docRef);
                this.events.publish('widgets:deleteSlideSuccess', 'web');
            })
                .catch(error => {
                    console.log("Error adding document: ", error);
                    this.events.publish('widgets:deleteSlideError');
                });
        }
    }

    changeSlideStatus(widgetID, slideID, status, type) {
        if (type == "app") {
            this.widgetRefrence.doc(widgetID).collection('slides').doc(slideID).update({ 'active': status }).then(docRef => {
                this.events.publish('widgets:slideStatusUpdateSuccess');
            })
                .catch(error => {
                    console.log("Error adding document: ", error);
                    this.events.publish('widgets:slideStatusUpdateError');
                });
        }
        else {
            this.widgetRefrence.doc(widgetID).collection('webSlides').doc(slideID).update({ 'active': status }).then(docRef => {
                this.events.publish('widgets:slideStatusUpdateSuccess');
            })
                .catch(error => {
                    console.log("Error adding document: ", error);
                    this.events.publish('widgets:slideStatusUpdateError');
                });
        }

    }

    /************** banner*********************/

    /************** Product Carousel*********************/

    async getProductsForProductCarousel(widgetID) {
        console.log('getProductsForProductCarousel', widgetID)
        this.productList = [];
        this.angularFirestore.collection('products', ref => ref
            .orderBy('sortedAt', 'desc')
            .limit(10)
        ).snapshotChanges()
            .subscribe(async (response: any) => {
                if (!response.length) {
                    console.log('No Data Available');
                    this.events.publish('widgets:noProductsAvailable');
                    return false;
                }
                this.productList = [];
                this.productListLastResponse = response[response.length - 1].payload.doc;
                let carouselProductsIds: any = [];
                const carouselProductsRef = this.widgetRefrence.doc(widgetID).collection('products');
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
                for (const product of response) {
                    if (carouselProductsIds.indexOf(product.payload.doc.id) === -1) {
                        this.productList.push({ id: product.payload.doc.id, data: product.payload.doc.data(), isAdded: false });
                    } else {
                        this.productList.push({ id: product.payload.doc.id, data: product.payload.doc.data(), isAdded: true });
                    }
                }
                this.events.publish('widgets:publishProductsForProductCarousel', this.productList, this.productList.length);
            }, error => {
            });
    }

    async loadMoreProductsForProductCarousel(widgetID) {
        console.log("widgetId:", widgetID)
        this.angularFirestore.collection('products', ref => ref
            .orderBy('sortedAt', 'desc')
            .limit(10)
            .startAfter(this.productListLastResponse)
        ).snapshotChanges()
            .subscribe(async (response: any) => {
                if (!response.length) {
                    console.log('No Data Available');
                    this.events.publish('widgets:productsForProductCarouselLimitReached');
                    return false;
                }
                console.log(this.productListLastResponse)
                this.productList = [];
                this.productListFirstResponse = response[0].payload.doc
                this.productListLastResponse = response[response.length - 1].payload.doc;
                let carouselProductsIds: any = [];
                const carouselProductsRef = this.widgetRefrence.doc(widgetID).collection('products');
                const carouselProductsData = await carouselProductsRef.snapshotChanges().pipe(
                    map(actions => actions.map(a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    }))
                ).pipe(first()).toPromise();
                console.log("more:", carouselProductsData)
                for (let index = 0; index < carouselProductsData.length; index++) {
                    carouselProductsIds.push(carouselProductsData[index].id);
                }
                for (const product of response) {
                    if (carouselProductsIds.indexOf(product.payload.doc.id) === -1) {
                        this.productList.push({ id: product.payload.doc.id, data: product.payload.doc.data(), isAdded: false });
                    } else {
                        this.productList.push({ id: product.payload.doc.id, data: product.payload.doc.data(), isAdded: true });
                    }
                }
                this.events.publish('widgets:publishProductsForProductCarousel', this.productList);
            }, error => {
            });
    }
    async loadPreviousProductsForProductCarousel(widgetID) {
        this.angularFirestore.collection('products', ref => ref
            .orderBy('sortedAt', 'desc')
            .endBefore(this.productListFirstResponse)
            .limitToLast(10)
        ).snapshotChanges()
            .subscribe(async (response: any) => {
                if (!response.length) {
                    console.log('No Data Available');
                    this.events.publish('widgets:previousProductsForProductCarouselLimitReached');
                    return false;
                }
                this.productList = [];
                this.productListFirstResponse = response[0].payload.doc;
                this.productListLastResponse = response[response.length - 1].payload.doc;
                let carouselProductsIds: any = [];
                const carouselProductsRef = this.widgetRefrence.doc(widgetID).collection('products');
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
                for (const product of response) {
                    if (carouselProductsIds.indexOf(product.payload.doc.id) === -1) {
                        this.productList.push({ id: product.payload.doc.id, data: product.payload.doc.data(), isAdded: false });
                    } else {
                        this.productList.push({ id: product.payload.doc.id, data: product.payload.doc.data(), isAdded: true });
                    }
                }
                this.events.publish('widgets:publishProductsForProductCarousel', this.productList);
            }, error => {
            });
    }

    async addProductToCarousel(product, widgetID, vendorId) {
        console.log(product, widgetID)
        try {
            //let productCaraouselData: any = [];
            let productCaraouselData = await this.widgetRefrence.doc(widgetID).collection('products').valueChanges().pipe(first()).toPromise();
            if (productCaraouselData.length && productCaraouselData.length === (this.configService.environment.widgetProductsLimit || 10) && vendorId == '') {
                this.events.publish('widgets:maxProductsinCarousel');
            } else {
                await this.widgetRefrence.doc(widgetID).collection('products').doc(product.id).set({
                    data: product.data,
                    id: product.id,
                    sortedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                this.events.publish('widgets:addCarouselPoductSuccess');
            }
        } catch (error) {
            console.dir(error);
            this.events.publish('widgets:addCarouselPoductError');
        }
    }

    async getCarouselProducts(widgetID) {
        try {
            console.log('getCarouselProducts')
            await this.widgetRefrence.doc(widgetID).collection('products', ref => ref.orderBy('sortedAt', 'desc')).snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as any;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                }))).subscribe(async res => {
                    console.log('cp', res)
                    if (!res.length) {
                        this.events.publish('widgets:noCarouselProducts');
                    } else {
                        let productsData: any = [];
                        for (let index = 0; index < res.length; index++) {
                            let obj: any = {};
                            obj.productID = res[index].id;
                            obj.sortedAt = res[index].sortedAt;
                            obj.productData = await this.angularFirestore.collection('products').doc(res[index].id).valueChanges().pipe(first()).toPromise();
                            productsData.push(obj);
                        }
                        this.events.publish('widgets:publishCarouselProducts', productsData);
                    }
                });

        } catch (error) {
            console.log(error)

        }

    }

    async deleteCarouselProduct(widgetID, productID) {
        try {
            await this.widgetRefrence.doc(widgetID).collection('products').doc(productID).delete();
            this.events.publish('widgets:deleteCarouselProductSuccess');
        } catch (error) {
            console.dir(error);
            this.events.publish('widgets:deleteCarouselProductError');
        }
    }

    async updateProductCaraouselPosition(widgetID: string, productID: string, changedDate: any) {
        //console.log('id & cdate', productID, changedDate);
        await this.widgetRefrence.doc(widgetID).collection('products').doc(productID).update({ sortedAt: changedDate });
        this.events.publish('widgets:updateProductCaraouselPositionSuccess');
    }

    async updateBannerCaraouselPosition(widgetID: string, bannerID: string, changedDate: any, type) {
        //console.log('id & cdate', productID, changedDate);
        if (type == 'app') {
            await this.widgetRefrence.doc(widgetID).collection('slides').doc(bannerID).update({ createdAt: changedDate });
            this.events.publish('widgets:updateBannerCaraouselPositionSuccess');
        }
        else {
            await this.widgetRefrence.doc(widgetID).collection('webSlides').doc(bannerID).update({ createdAt: changedDate });
            this.events.publish('widgets:updateBannerCaraouselPositionSuccess');
        }
    }

    /************** Product Carousel*********************/

    /*********video block *******************/
    async addVideoBlock(data: any) {
        try {
            let baseImg = '';
            let video = JSON.parse(JSON.stringify(data));
            console.log('video', video);

            if (video.coverImage.org.includes('data:image/jpeg;base64,') || video.coverImage.org.includes('data:image/jpg;base64,') || video.coverImage.org.includes('data:image/png;base64,') || video.coverImage.org.includes('data:image/gif;base64,')) {
                baseImg = video.coverImage.org;
                delete video.coverImage;
            }
            video['createdAt'] = new Date();
            await this.widgetRefrence.add(video).then(async docRef => {
                if (baseImg) {
                    let imgType = this.sharedService.getImageType(baseImg);
                    const imgRef: any = this.angularFireStorage.ref(`widgets/${docRef.id}/coverImage/${docRef.id}` + imgType);
                    await imgRef.putString(baseImg, 'data_url');
                }
                console.log('docid', docRef.id)
                this.events.publish('widgets:addVideoBlockSuccess', docRef.id);
            })
                .catch(error => {
                    console.error("Error adding document: ", error);
                });

        } catch (error) {
            console.dir(error);
            this.logglyService.log(error);
            this.events.publish('widgets:addVideoBlockError');
        }
    }

    async updateVideoBlock(data: any, ID) {
        try {
            let baseImg = '';
            let dataClone = JSON.parse(JSON.stringify(data));
            // console.log('video', video);

            if (dataClone.coverImage.org.includes('data:image/jpeg;base64,') || dataClone.coverImage.org.includes('data:image/jpg;base64,') || dataClone.coverImage.org.includes('data:image/png;base64,') || dataClone.coverImage.org.includes('data:image/gif;base64,')) {
                baseImg = dataClone.coverImage.org;
                console.log('baseImg', baseImg);
                delete dataClone.coverImage.org;
            }
            console.log('dataClone', dataClone)
            await this.widgetRefrence.doc(ID).update(dataClone).then(async docRef => {
                if (baseImg) {
                    let imgType = this.sharedService.getImageType(baseImg);
                    const imgRef: any = this.angularFireStorage.ref(`widgets/${ID}/coverImage/${ID}` + imgType);
                    await imgRef.putString(baseImg, 'data_url');
                }
                this.events.publish('widgets:updateVideoBlockSuccess');
            })
                .catch(error => {
                    console.error("Error adding document: ", error);
                    this.events.publish('widgets:updateVideoBlockError');
                });

        } catch (error) {
            console.dir(error);
            this.logglyService.log(error);
            this.events.publish('widgets:updateVideoBlockError');
        }
    }

    async updateTextBlock(data, ID) {
        this.widgetRefrence.doc(ID).update(data).then(docRef => {
            this.events.publish('widgets:updateTextBlockSuccess');
        })
            .catch(error => {
                console.log("Error adding document: ", error);
                this.events.publish('widgets:updateTextBlockError');
            });
    }

    async addCategories(data, name, pageId) {
        // console.log(data,name)
        let catData = {}
        catData['createdAt'] = new Date();
        catData['type'] = 'categories'
        catData['categoryList'] = data
        await this.widgetRefrence.add(catData).then(async docRef => {
            // console.log('docid', docRef.id)
            let webSections: any = []
            let sections: any = await this.angularFirestore.collection('pages').doc(pageId).valueChanges().pipe(first()).toPromise();
            if (sections && sections.sections) {
                webSections = sections.sections;
            }
            let widget = {
                widgetID: docRef.id,
                widgetType: 'categories',
                sectionName: name,
                location: "all"
            }
            webSections.push(widget);
            this.angularFirestore.collection('pages').doc(pageId).update({ 'sections': webSections });
            this.events.publish('widgets:addCategoriesSuccess');
        })
            .catch(error => {
                console.error("Error adding document: ", error);
            });
    }

    async updateCategories(id, data) {
        this.widgetRefrence.doc(id).update({ 'categoryList': data }).then(docRef => {
            this.events.publish('widgets:categoryUpdateSuccess');
        })
            .catch(error => {
                console.log("Error adding document: ", error);
            });
    }

    async addBrands(data, name, pageId) {
        // console.log(data,name)
        let catData = {}
        catData['createdAt'] = new Date();
        catData['type'] = 'brands'
        catData['brandList'] = data
        await this.widgetRefrence.add(catData).then(async docRef => {
            // console.log('docid', docRef.id)
            let webSections: any = []
            let sections: any = await this.angularFirestore.collection('pages').doc(pageId).valueChanges().pipe(first()).toPromise();
            if (sections && sections.sections) {
                webSections = sections.sections;
            }
            let widget = {
                widgetID: docRef.id,
                widgetType: 'brands',
                sectionName: name,
                location: "all"
            }
            webSections.push(widget);
            this.angularFirestore.collection('pages').doc(pageId).update({ 'sections': webSections });
            this.events.publish('widgets:addBrandsSuccess');
        })
            .catch(error => {
                console.error("Error adding document: ", error);
            });
    }

    async updateBrands(id, data) {
        this.widgetRefrence.doc(id).update({ 'brandList': data }).then(docRef => {
            this.events.publish('widgets:brandUpdateSuccess');
        })
            .catch(error => {
                console.log("Error adding document: ", error);
            });
    }

    async addServices(data, name, pageId) {
        // console.log(data,name)
        let catData = {}
        catData['createdAt'] = new Date();
        catData['type'] = 'services'
        catData['serviceList'] = data
        await this.widgetRefrence.add(catData).then(async docRef => {
            // console.log('docid', docRef.id)
            let webSections: any = []
            let sections: any = await this.angularFirestore.collection('pages').doc(pageId).valueChanges().pipe(first()).toPromise();
            if (sections && sections.sections) {
                webSections = sections.sections;
            }
            let widget = {
                widgetID: docRef.id,
                widgetType: 'services',
                sectionName: name,
                location: "all"
            }
            webSections.push(widget);
            this.angularFirestore.collection('pages').doc(pageId).update({ 'sections': webSections });
            this.events.publish('widgets:addServicesSuccess');
        })
            .catch(error => {
                console.error("Error adding document: ", error);
            });
    }

    async updateServices(id, data) {
        this.widgetRefrence.doc(id).update({ 'serviceList': data }).then(docRef => {
            this.events.publish('widgets:serviceUpdateSuccess');
        })
            .catch(error => {
                console.log("Error adding document: ", error);
            });
    }

    async addVendors(data, name, pageId) {
        return new Promise(async (resolve, reject) => {
            try {
                let vendorData = {}
                vendorData['createdAt'] = new Date();
                vendorData['type'] = 'vendors'
                vendorData['vendorsList'] = data
                await this.widgetRefrence.add(vendorData).then(async docRef => {
                    // console.log('docid', docRef.id)
                    let webSections: any = []
                    let sections: any = await this.angularFirestore.collection('pages').doc(pageId).valueChanges().pipe(first()).toPromise();
                    if (sections && sections.sections) {
                        webSections = sections.sections;
                    }
                    let widget = {
                        widgetID: docRef.id,
                        widgetType: 'vendors',
                        sectionName: name,
                        location: "all"
                    }
                    webSections.push(widget);
                    await this.angularFirestore.collection('pages').doc(pageId).update({ 'sections': webSections });
                    resolve(true);
                })
            } catch (error) {
                console.dir(error);
                resolve(false);
            }
        });
    }

    async updateVendors(id, data) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.widgetRefrence.doc(id).update({ 'vendorsList': data })
                resolve(true);
            } catch (error) {
                console.dir(error);
                resolve(false);
            }
        });
    }


    async getAllVendorIds() {
        try {
            return new Promise<any[]>(async (resolve, reject) => {
                const vendors = [];
                const vendorsSub = this.angularFirestore.collection('users', ref => ref
                    .where('role', '==', 'vendor')).get().subscribe(docs => {
                        docs.forEach(doc => {
                            vendors.push({ id: doc.id, name: doc.data().name, active: false });
                        });
                        resolve(vendors.length ? vendors : []);
                        vendorsSub.unsubscribe()
                    });
            });
        } catch (error) {
            console.dir(error);
            error['location'] = 'vendor-service:getAllVendors';
            this.logglyService.log(error);
        }
    }

    async uploadImg(logoImg , id) {
        try{
            let imgType = this.sharedService.getImageType(logoImg);
            const imgRef = await this.angularFireStorage.ref(`widgets/${id}` + imgType);
            await imgRef.putString(logoImg, 'data_url');
            let downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
            return downloadURL;

        }catch(err){
            console.log('err:',err)
        }
      }

      async setProductListImg(imgUrl,id){
          try{              
            let data = await this.angularFirestore.collection('widgets').doc(id).update({showcaseImg: imgUrl});
            return data;
          }
          catch(err){
            console.log('err:',err);
          }
      }
      


    async updateWidgetData(id, data){
        return new Promise(async(resolve)=>{
            try {
                await this.widgetRefrence.doc(id).update(data);
                resolve(true);
            } catch (error) {
                resolve(false);
            }
        })
    }

    async uploadGroupImg(groupImg,groupId,id) {
        let imgType = this.sharedService.getImageType(groupImg);
        const imgRef = this.angularFireStorage.ref(`widgets/${id}/groupImg/${groupId}` + imgType);
        await imgRef.putString(groupImg, 'data_url');
        let downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
        return downloadURL;
      }
    

    addFormToPage(pageId, widget){
        return new Promise(async (resolve)=>{
            try {
                await this.angularFirestore.collection('pages').doc(pageId).update({ sections: firebase.firestore.FieldValue.arrayUnion(widget) });
                resolve(true);
            } catch (error) {
                resolve(false);
                console.log('err:', error);
            }
        })
    }

    async addNewBanner(widgetName,pageId) {
        // console.log(widgetName);
        return new Promise(async (resolve)=>{
            try {
                let sections: any = [];
                if(pageId) {
                    let res: any = await this.angularFirestore.collection('pages').doc(pageId).valueChanges().pipe(first()).toPromise();
                    if (res && res.sections) {
                        sections = res.sections;
                    }
                }
                let index = sections.length-1;
                sections[index].sectionName = widgetName;
                console.log(sections,sections.length-1);
                await this.angularFirestore.collection('pages').doc(pageId).update({ 'sections': sections });
                resolve(true);
            }
            catch(err) {
                console.log('err:',err);                
            }
        })
    }

}