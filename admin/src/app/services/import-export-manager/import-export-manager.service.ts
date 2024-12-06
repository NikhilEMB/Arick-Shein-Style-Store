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
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';
import { Storage } from '@ionic/storage';
import { convertSnaps } from '../../services/db-utilis';
import { ConfigService } from 'src/app/services/config/config.service';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ImportExportManagerService {
  allPendingOrdersForAdmin: Promise<any[]>;
  allPaymentFailedOrders: Promise<any[]>;
  allDispatchedOrdersForAdmin: Promise<any[]>;
  allCompletedOrdersForAdmin: Promise<any[]>;
  allCancelledOrders: Promise<any[]>;
  allRejectedOrders: Promise<any[]>;
  allReturnedOrders: Promise<any[]>;
  skuArr: any[] = []

  constructor(
    private afs: AngularFirestore, 
    private events: Events,
    private fbStorage: AngularFireStorage, 
    private logglyService: LogglyLoggerService, 
    private storage: Storage, 
    private configService: ConfigService, 
    private sharedService: SharedService
    ) {}

  async getAllProducts() {
    try {
      let allProducts = []
      let userId = await this.storage.get('uid')
      let userRole = await this.storage.get('userRole')
      if (userRole == 'vendor') {
        let productsRef = await this.afs.collection('products', ref => ref.orderBy('sortedAt', 'desc').where('vendorId', '==', userId))
        productsRef.get().subscribe((snapshot) => {
          snapshot.forEach((product) => {
            allProducts.push({id:product.id, ...product.data()})
          })
        })
        return allProducts
      } else {
        let productsRef = await this.afs.collection('products', ref => ref.orderBy('sortedAt', 'desc'))
        productsRef.get().subscribe((snapshot) => {
          snapshot.forEach((product) => {
            allProducts.push({id:product.id, ...product.data()})
          })
        })
        return allProducts
      }
    } catch (error) {
      console.log('Error in fetching products : ', error);
    }
  }

  async fetchAllSKU() {
    // const productRef = this.afs.collection('products');
    // let allProductsRef: Subscription = productRef.get().subscribe((querySnapshot: any) => {
    //   querySnapshot.forEach((doc) => {
    //     if ((doc.data().productCode) && (doc.data().productCode !== '')) {
    //       this.skuArr.push({
    //         productCode: doc.data().productCode,
    //         pid: doc.id,
    //       })
    //     }
    //   })
    //   allProductsRef.unsubscribe();
    // })
    const productsData = await this.afs.collection('products')
    let allProductsref: Subscription = productsData.get().subscribe((querySnapshot: any) => {
      querySnapshot.forEach((doc: { data: () => { (): any; new(): any; productCode: any; }; id: any; }) => {
          this.skuArr.push({
            productCode: doc.data().productCode, 
            pid: doc.id
          })
      });
      allProductsref.unsubscribe()
    }) 
    const ids = this.skuArr.map(o => o.productCode)
    const filtered = this.skuArr.filter(({productCode}, index) => !ids.includes(productCode, index + 1))
    return filtered
  }

  async deleteBulkProducts(skus: any[]) {
    let count = 0
    if (skus && skus.length) {
      for (const pid of skus) {
        await this.afs.collection('products').doc(pid).delete()
        count ++
      }
    }
    return count
  }

  async getAllCategories() {
    try {
      let allCategories = []
      let categoryData = await this.afs.collection('categories').valueChanges().pipe(first()).toPromise();
      categoryData.map((category) => {
        allCategories.push(category)
      })
      return allCategories
    } catch (error) {
      console.log('Error in fetching categories : ', error);
    }
  }

  async getAllSubCategories() {
    let sublist = [];
    const categories = await this.afs.collection('categories', ref => ref
      .orderBy('sortedAt', 'desc')
      .where('status', '==', true)).snapshotChanges().pipe(
        map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
    for (const c of categories) {
      if (c.isSubcategories) {
        const subcategories: any = await this.getSubcategoriesSidemenu(c.id);
        if (subcategories.length) {
          for (const sc of subcategories) {
            sublist.push({ id: sc.id, categoryId: c.id, name: sc.name, active: false });
          }
        }
      }
    }
    return sublist
  }

  async getSubcategoriesSidemenu(cid: string) {
    return new Promise(async (resolve, reject) => {
      const subcategories = await this.afs.collection('categories').doc(cid).collection('subcategories', ref =>
        ref.orderBy('sortedAt', 'desc').where('status', '==', true)).snapshotChanges().pipe(
          map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
      resolve(subcategories);
    });
  }

  async getAllBrands() {
    try {
      let allBrands = []
      let brandsData = await this.afs.collection('brands').valueChanges().pipe(first()).toPromise();
      brandsData.map((brand) => {
        allBrands.push(brand)
      })
      return allBrands
    } catch (error) {
      console.log('Error in fetching brands : ', error);
    }
  }

  async getAllVendors() {
    try {
      let allVendors = []
      const vendorRef = await this.afs.collection('users', ref => ref.where('role', '==', 'vendor'))
      vendorRef.get().subscribe((snap) => {
        snap.forEach((v) => {
          allVendors.push({ id: v.id, ...v.data()})
        })
      })
      return allVendors
    } catch (error) {
      console.log('Error in fetching vendors : ', error);
    }
  }

  async getAllOrders() {
    // console.log('status : ', status)
    return new Promise(async (resolve, reject) => {
      try {
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        if (userRole == 'vendor') {
          this.allPendingOrdersForAdmin = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc')
            .where('vendorId', '==', loginId)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
        }
        else {
          let allOrders = [];
          let ordersData: AngularFirestoreCollection<unknown>;
          ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc'));
          let allOrdersRef: Subscription = ordersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
              allOrders.push({ id: doc.id, ...doc.data() })
            });
            resolve(allOrders)
            allOrdersRef.unsubscribe()
          })
        }
      } catch (error) {
        console.log(`Error in fetching all orders : `, error);
        resolve([])
      }
    })
  }

  async getAllOrdersLength() {
    return new Promise(async (resolve) => {
      try {
        let totalOrders = 0
        const ordersData = this.afs.collection('orders')
        let allOrdersRef: Subscription = ordersData.get().subscribe((snap) => {
          totalOrders = snap.size
          resolve(totalOrders)
          allOrdersRef.unsubscribe()
        })
      } catch (error) {
        console.dir('Error in fetching total orders count : ', error);
        resolve(0);
      }
    })
  }

  async getAllConfirmedOrders(date?: { start: any; end: any; }) {
    return new Promise(async (resolve, reject) => {
      try {
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        if (userRole == 'vendor') {
          this.allPendingOrdersForAdmin = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc')
            .where('status', 'in', ['Confirmed']).where('vendorId', '==', loginId)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
        }
        else {
          let allOrders = [];
          let ordersData: AngularFirestoreCollection<unknown>;
          if (date && date.start) {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Confirmed']).startAt(date.start).endAt(date.end));
          } else {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Confirmed']));
          }
          let allOrdersRef: Subscription = ordersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
              allOrders.push({ id: doc.id, ...doc.data() })
            });
            resolve(allOrders)
            allOrdersRef.unsubscribe()
          })
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getAllOrdersPreset(status: string, startDate: any , endDate: any) {
    console.log('status : ', status)
    console.log('end : ', startDate)
    console.log('start : ', endDate)
    return new Promise(async (resolve, reject) => {
      try {
        console.log('here1')
        let ordersRef: any
        let allOrders = []
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        console.log('here2')
        if (userRole == 'vendor') {
          console.log('here3')
          if (status === 'Payment Pending') {
            ordersRef = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc')
            .where('payment.completed', '==', false).where('vendorId', '==', loginId).startAt(startDate)
            .endAt(endDate)
            )
          } else {
            ordersRef = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc')
            .where('status', '==', status).where('vendorId', '==', loginId).startAt(startDate)
            .endAt(endDate)
            )
          }
        } else {
          if (status === 'Payment Pending') {
            console.log('here4')
            ordersRef = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc')
            .where('payment.completed', '==', false).startAt(startDate)
            .endAt(endDate)
            )
          } else {
            console.log('here5')
            ordersRef = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc')
            .where('status', '==', status).startAt(startDate)
            .endAt(endDate)
            )
          }
        }
        console.log('here6')
        let allOrdersRef: Subscription = ordersRef.get().subscribe((snap: { size: number; forEach: (arg0: (order: any) => void) => void; }) => {
          if (snap.size === 0) {
            resolve([])
          } else {
            snap.forEach((order: any) => {
              allOrders.push({ id: order.id, ...order.data() as {} })
            })
            resolve(allOrders)
          }
          allOrdersRef.unsubscribe()
        })
      } catch (error) {
        console.log(error);
      }
    })
  }

  async getAllPendingOrders(date?: { start: any; end: any; }) {
    return new Promise(async (resolve, reject) => {
      try {
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        if (userRole == 'vendor') {
          this.allPaymentFailedOrders = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc')
            .where("status", '==', 'Pending').where('vendorId', '==', loginId)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
        }
        else {
          let allOrders = [];
          let ordersData: AngularFirestoreCollection<unknown>;
          if (date && date.start) {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", '==', 'Pending').startAt(date.start).endAt(date.end));
          } else {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", '==', 'Pending'));
          }
          let allOrdersRef: Subscription = ordersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
              allOrders.push({ id: doc.id, ...doc.data() })
            });
            resolve(allOrders)
            allOrdersRef.unsubscribe()
          })
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getAllDispatchedOrders(date?: { start: any; end: any; }) {
    return new Promise(async (resolve, reject) => {
      try {
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        if (userRole == 'vendor') {
          this.allDispatchedOrdersForAdmin = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc')
            .where('status', 'in', ['Dispatched']).where('vendorId', '==', loginId)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
        }
        else {
          let allOrders = [];
          let ordersData: AngularFirestoreCollection<unknown>;
          if (date && date.start) {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Dispatched']).startAt(date.start).endAt(date.end));
          } else {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Dispatched']));
          }
          let allOrdersRef: Subscription = ordersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
              allOrders.push({ id: doc.id, ...doc.data() })
            });
            resolve(allOrders)
            allOrdersRef.unsubscribe()
          })
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getAllDeliveredOrders(date?: { start: any; end: any; }) {
    return new Promise(async (resolve, reject) => {
      try {
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        if (userRole == 'vendor') {
          this.allCompletedOrdersForAdmin = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc')
            .where('status', 'in', ['Delivered']).where('vendorId', '==', loginId)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
        }
        else {
          let allOrders = [];
          let ordersData: AngularFirestoreCollection<unknown>;
          if (date && date.start) {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Delivered']).startAt(date.start).endAt(date.end));
          } else {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where('status', 'in', ['Delivered']));
          }
          let allOrdersRef: Subscription = ordersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
              allOrders.push({ id: doc.id, ...doc.data() })
            });
            resolve(allOrders)
            allOrdersRef.unsubscribe()
          })
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getAllCancelledOrders(date?: { start: any; end: any; }) {
    return new Promise(async (resolve, reject) => {
      try {
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        if (userRole == 'vendor') {
          this.allCancelledOrders = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc').where("status", 'in', 'Cancelled').where('vendorId', '==', loginId)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
        }
        else {
          let allOrders = [];
          let ordersData: AngularFirestoreCollection<unknown>;
          if (date && date.start) {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", 'in', ['Cancelled']).startAt(date.start).endAt(date.end));
          } else {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", 'in', ['Cancelled']));
          }
          let allOrdersRef: Subscription = ordersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
              allOrders.push({ id: doc.id, ...doc.data() })
            });
            resolve(allOrders)
            allOrdersRef.unsubscribe()
          })
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getAllRejectedOrders(date?: { start: any; end: any; }) {
    return new Promise(async (resolve, reject) => {
      try {
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        if (userRole == 'vendor') {
          this.allRejectedOrders = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc').where("status", 'in', ['Rejected']).where('vendorId', '==', loginId)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
        }
        else {
          let allOrders = [];
          let ordersData: AngularFirestoreCollection<unknown>;
          if (date && date.start) {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", 'in', ['Rejected']).startAt(date.start).endAt(date.end));
          } else {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", 'in', ['Rejected']));
          }
          let allOrdersRef: Subscription = ordersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
              allOrders.push({ id: doc.id, ...doc.data() })
            });
            resolve(allOrders)
            allOrdersRef.unsubscribe()
          })
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getAllReturnedOrders(date?: { start: any; end: any; }) {
    return new Promise(async (resolve, reject) => {
      try {
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        if (userRole == 'vendor') {
          this.allReturnedOrders = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc')
            .where("status", '==', 'Returned').where('vendorId', '==', loginId)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
        }
        else {
          let allOrders = [];
          let ordersData: AngularFirestoreCollection<unknown>;
          if (date && date.start) {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", '==', 'Returned').startAt(date.start).endAt(date.end));
          } else {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("status", '==', 'Returned'));
          }
          let allOrdersRef: Subscription = ordersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
              allOrders.push({ id: doc.id, ...doc.data() })
            });
            resolve(allOrders)
            allOrdersRef.unsubscribe()
          })
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getAllPaymentPendingOrders(date?: { start: any; end: any; }) {
    return new Promise(async (resolve, reject) => {
      try {
        let loginId = await this.storage.get('uid')
        let userRole = await this.storage.get('userRole')
        if (userRole == 'vendor') {
          this.allReturnedOrders = this.afs.collection('orders', ref => ref
            .orderBy('createdAt', 'desc')
            .where("status", '==', 'Returned').where('vendorId', '==', loginId)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            ).pipe(first()).toPromise();
        }
        else {
          let allOrders = [];
          let ordersData: AngularFirestoreCollection<unknown>;
          if (date && date.start) {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("payment.completed", '==', false).startAt(date.start).endAt(date.end));
          } else {
            ordersData = await this.afs.collection('orders', ref => ref.orderBy('createdAt', 'desc').where("payment.completed", '==', false));
          }
          let allOrdersRef: Subscription = ordersData.get().subscribe((querySnapshot: any) => {
            querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
              allOrders.push({ id: doc.id, ...doc.data() })
            });
            resolve(allOrders)
            allOrdersRef.unsubscribe()
          })
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getAllDeliveryAgents() {
    return new Promise(async (resolve) => {
      try {
        let deliveryAgents = []
        const usersRef = await this.afs.collection('users', ref => ref.where('role', '==', 'deliveryAgent'))
        usersRef.get().subscribe((snap) => {
          snap.forEach((v) => {
            deliveryAgents.push({ id: v.id, ...v.data()})
          })
        })
        resolve(deliveryAgents)
      } catch (error) {
        console.log(error);
      }
    })
  }

  async updateOrder(orderId: number, agentId: string) {
    return new Promise(async (resolve) => {
      try {
        const orderRef = this.afs.collection('orders', ref => ref.where('orderId', '==', orderId));
        const orderData: any = await orderRef.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).pipe(first()).toPromise();
        let updateOrder = await this.afs.collection('orders').doc(orderData[0].id).update({ deliveryAgentId: agentId, deliveryStatus: 'notStarted' });
        console.log('updated order', updateOrder)
      } catch (error) {
        console.log(error);
      }
    })
  }

  async getUserByRole(role: string, custom?: string) {
    return new Promise(async (resolve) => {
      try {
        let allUsers = []
        let userRef: AngularFirestoreCollection<unknown>
        if (role === 'all') {
          userRef = await this.afs.collection('users');
        } else {
          userRef = await this.afs.collection('users', ref => ref.where('role', '==', role));
        }
        let allUsersRef: Subscription = userRef.get().subscribe((querySnapshot: any) => {
          querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
            if (custom === 'custom-justNumbers') {
              allUsers.push(doc.data().phoneNo)
            } else {
              allUsers.push({ id: doc.id, ...doc.data() })
            }
          });
          resolve(allUsers)
          allUsersRef.unsubscribe()
        })
      } catch (error) {
        console.log(error);
        resolve([])
      }
    })
  }

  async getAllUsersCount() {
    return new Promise(async (resolve) => {
      try {
        let totalUsers = 0
        const UsersData = this.afs.collection('users')
        let allUsersRef: Subscription = UsersData.get().subscribe((snap) => {
          totalUsers = snap.size
          resolve(totalUsers)
          allUsersRef.unsubscribe()
        })
      } catch (err) {
        console.dir(err);
        resolve(0)
      }
    })
  }

  async addUserByAdmin(userDetails: any) {
    return new Promise(async (resolve) => {
      let addUserDetails = firebase.functions().httpsCallable('users-addUserByAdmin');
    addUserDetails(userDetails).then(async (res) => {
      if (res.data.status && res.data.status === 'success') {
        console.log(`Successfully Added User - ${userDetails.name} : `, res.data)
        resolve({status : res.data.status, data: userDetails})
      } else {
        console.log(`Failed To Add User - ${userDetails.name} : `, res.data)
        resolve({status : res.data.status, data: userDetails})
      }
    });
    })
  }

  async getAllFilters() {
    return new Promise ( async (resolve) => {
      try {
        let allFilters = []
        let filtersRef: AngularFirestoreCollection<unknown>
        filtersRef = this.afs.collection('features').doc('filters').collection('list')
        let allFiltersRef: Subscription = filtersRef.get().subscribe((querySnapshot: any) => {
          querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
            if (doc.data().active) {
              allFilters.push({name: doc.data().name, value: doc.data().values || []})
            }
          });
          resolve(allFilters)
          allFiltersRef.unsubscribe()
        })
      } catch (error) {
        console.dir(error);
        resolve(0)
      }
    } )
  }

}
