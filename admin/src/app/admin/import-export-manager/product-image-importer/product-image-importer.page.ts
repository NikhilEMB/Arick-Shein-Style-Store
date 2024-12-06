import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ConfigService } from 'src/app/services/config/config.service'
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage/';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import * as JSZip from 'jszip';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-product-image-importer',
  templateUrl: './product-image-importer.page.html',
  styleUrls: ['./product-image-importer.page.scss'],
})
export class ProductImageImporterPage implements OnInit {

  buttonState: string = ''
  fileData: any
  productImgObj: any[] = []
  // zipFile: JSZip = new JSZip();
  link = 'https://drive.google.com/drive/folders/1ByYOK40Q12DzYN-lO2ZQqegkB7fmK0Lc?usp=sharing'
  directories: any[] = []
  sortedDirectory: any[] = []
  finalDirectory: any[] = []
  skuArr: any[] = []
  prodUploadLimit: any
  successMatch: any[] = []
  failMatch: any[] = []
  successSKU: any[] = []
  failSKU: any[] = []
  successVariant: any[] = []
  failVariant: any[] = []
  failVariantReason: string = ''
  needVariants: boolean = false
  reOrderImgs: any[] = []
  finalEvent: any
  loadVal: number = 0.10
  loadBuffer: number = 0.20
  startedAt: Date;
  currentState: any = {}
  totalSKUs: number = 0
  completedSKUs: number = 0

  importMode: string = 'single'

  body = {
    // createdAt: null,
    status: '',
    events: {
      started: {
        createdAt: null,
        completedAt: null
      },
      inProgress: {
        createdAt: null,
        completedAt: null
      },
      completed: {
        createdAt: null,
        completedAt: null
      },
      failed: {
        createdAt: null,
        completedAt: null
      },
    },
    errorMessage: '',
    deleteZip: false,
    deleteExtractedZip: false,
    skusCompleted: 0,
    terminated: false,
    importMode: this.importMode
  }
  createdAt: any;
  totalCount = 0
  totalSKU = 0
  zipLog: any
  meta: any;

  constructor(
    private afs: AngularFirestore,
    private configService: ConfigService,
    private http: HttpClient,
    private toastController: ToastController,
    private fbStorage: AngularFireStorage,
    private sharedService: SharedService
  ) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    this.buttonState = 'Upload'
    await this.sharedService.presentLoading();
    await this.fetchAllSKU()
    if (this.configService.environment.productImageLimit) {
      if ((this.configService.environment.productImageLimit === undefined) || (this.configService.environment.productImageLimit === null)) {
        this.prodUploadLimit = 5
      } else {
        this.prodUploadLimit = this.configService.environment.productImageLimit
      }
    }
    console.log('productImageLimit :', this.configService.environment.productImageLimit);
    await this.checkLogStatus()
    await this.sharedService.loading.dismiss();
  }

  async presentToastWithOptions(header: string, message: string, errorCode: string) {
    const toast = await this.toastController.create({
      mode: 'ios',
      color: 'dark',
      header: header,
      message: message,
      duration: 4000,
      position: 'top',
      buttons: [
        {
          side: 'start',
          text: errorCode,
          handler: () => {
            console.log('Favorite clicked');
          }
        }
        // , {
        //   text: 'Done',
        //   role: 'cancel',
        //   handler: () => {
        //     console.log('Cancel clicked');
        //   }
        // }
      ]
    });
    toast.present();
  }

  manageImportMode(event: any) {
    this.importMode = event.target.checked ? 'multi' : 'single'
    console.log('current mode : ', this.importMode)
  }

  async fetchAllSKU() {
    const productRef = this.afs.collection('products');
    let allProductsRef: Subscription = productRef.get().subscribe((querySnapshot: any) => {
      querySnapshot.forEach((doc) => {
        if ((doc.data().productCode) && (doc.data().productCode !== '')) {
          this.skuArr.push({
            productCode: doc.data().productCode,
            pid: doc.id,
            isPriceList: doc.data().isPriceList || false,
            variantLength: doc.data().priceList || 0,
            variantType: doc.data().variantType
          })
        }
      })
      allProductsRef.unsubscribe();
      // console.log('this.skuArr : ', this.skuArr)
    })
  }

  getProdMeta(productCode: string, skuArr: any[], type: string) {
    for (const sku of skuArr) {
      if (productCode === sku.productCode) {
        if (type === 'pid') {
          return sku.pid
        }
        if (type === 'variant') {
          if (sku.isPriceList) {
            return true
          } else {
            return false
          }
        }
        if (type === 'variantType') {
          if (sku.variantType) {
            return sku.variantType
          }
        }
      }
    }
  }

  async deduceDirectories(directories: any[], skuArr: any[]) {
    console.log('1 dir : ', directories)
    if (this.importMode === 'single') {
      for (let dir of directories) {
        console.log('2 dir : ', dir)
        if ((/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(dir)) {
          let productCode = dir.split('.')[0]
          productCode = productCode.split('.')[0]
          console.log('productCode : ', productCode)
          this.sortedDirectory.push({
            productCode: productCode,
            pid: this.getProdMeta(productCode, skuArr, 'pid'),
            images: [ 'cover-'+dir ],
            isPriceList: this.getProdMeta(productCode, skuArr, 'variant') || false,
            variantLength: 0,
            nameOfVariants: [],
            variantType: this.getProdMeta(productCode, skuArr, 'variantType'),
          })
        }
      }
    }
    if (this.importMode === 'multi') {
      for (let dir of directories) {
        let occurrences = []
        if (!(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(dir)) {
          this.sortedDirectory.push({
            productCode: dir.split('/')[0],
            pid: this.getProdMeta(dir.split('/')[0], skuArr, 'pid'),
            images: [],
            isPriceList: this.getProdMeta(dir.split('/')[0], skuArr, 'variant') || false,
            variantLength: 0,
            nameOfVariants: [],
            variantType: this.getProdMeta(dir.split('/')[0], skuArr, 'variantType'),
          })
        }
        if ((/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(dir)) {
          if (this.sortedDirectory && this.sortedDirectory.length) {
            for (let field of this.sortedDirectory) {
              if (dir.includes(field.productCode)) {
                if (field.isPriceList) {
                  if (dir.includes('var-[')) {
                    console.log('dir v : ', dir)
                    let ext = '.' + dir.split('.')[1]
                    dir = dir.replace(ext, '')
                    occurrences.push(dir.split('-['))
                    occurrences[0] = occurrences[0].filter(f => f.includes(']')).map(p => p.replace(']', ''))
                    for (const o of occurrences[0]) {
                      if (field.nameOfVariants.some(r => r === o)) {
                        console.log('matched!!! : ', o)
                      } else {
                        field.nameOfVariants.push(o)
                      }
                    }
                    field.variantLength = field.nameOfVariants.length
                    // field.variantLength = occurrences[0].length
                    // field.nameOfVariants = occurrences[0]
                    field.images.push(dir.substring(dir.indexOf('/') + 1) + ext)
                    console.log('occurrences : ', occurrences[0]);
                  } else {
                    field.images.push(dir.substring(dir.indexOf('/') + 1))
                  }
                } else {
                  field.images.push(dir.substring(dir.indexOf('/') + 1))
                }
              }
            }
          }
        }
      }
    }
    console.log('sortedDirectory : ', this.sortedDirectory);
  }

  clearAllBuffer() {
    this.successMatch = []
    this.failMatch = []
    this.successSKU = []
    this.failSKU = []
    this.successVariant = []
    this.failVariant = []
    this.sortedDirectory = []
  }

  async importImagesHandler(event: any, buttonState: String) {
    this.clearAllBuffer()
    console.log('invoked : ', buttonState)
    console.log('event : ', event)
    const jsZip = require('jszip');
    try {
      //  * UPLOAD
      if (buttonState === 'Upload') {

        // * Validate file detection
        if (event) {

          // * Validate file size
          if (event.target.files[0].size > 2147483648) {
            await this.presentToastWithOptions('File Size Over limit!', 'File size exceeds the permissible limit of 2GB.', 'ERR-162')
          } else {

            // * Validate file type
            if (event.target.files[0] && (event.target.files[0].name.includes('.zip')) && (event.target.files[0].type.includes('zip')) && (event.target.files[0].name.includes('zip'))) {

              // *** Single Mode Import
              if (event.target.files[0].name.includes('single-mode-zip')) {
                if ((this.importMode === 'single')) {
                  console.log('single mode import')
                  await jsZip.loadAsync(event.target.files[0]).then(async (zip: any) => {
                    console.log('zip files : ', zip.files)
                    for (let i = 0; i < Object.keys(zip.files).length; i++) {
                      if ((!Object.keys(zip.files)[i].includes('__MACOSX')) && (!Object.keys(zip.files)[i].includes('.DS_Store'))) {
                        // console.log('test : ', Object.keys(zip.files)[i])
                        this.directories.push(Object.keys(zip.files)[i])
                      }
                    }
                    this.sortedDirectory = []
                    this.deduceDirectories(this.directories, this.skuArr)

                    // * Validate against SKU
                    this.successMatch = []
                    this.failMatch = []
                    // ! remove duplicate SKUs ( *Not applicable if pid is stored )
                    // this.skuArr = [...new Set(this.skuArr)]
                    // console.log('after sku = ', this.skuArr)
                    for (const sortSKU of this.sortedDirectory) {
                      if (this.skuArr.some(sku => sku.productCode === sortSKU.productCode)) {
                        this.successMatch.push(sortSKU)
                      } else {
                        this.failMatch.push(sortSKU)
                      }
                    }
                    // console.log('success : ', this.successMatch)
                    // console.log('fail : ', this.failMatch)

                    // ! Remove failed SKUs from sortedDirectory
                    if (this.failMatch && this.failMatch.length) {
                      await this.presentToastWithOptions('SKU Mismatch!', `Unidentified SKUs found in ${this.failMatch.length} folder(s).`, 'ERR-163')
                      for (const failSKU of this.failMatch) {
                        this.sortedDirectory = this.sortedDirectory.filter(p => p.productCode !== failSKU.productCode)
                      }
                      // this.clearAll()
                      return
                    }

                    this.finalDirectory = this.sortedDirectory
                      // * length finalDirectory
                      for (const a of this.finalDirectory) {
                        this.totalCount++
                        this.totalSKU++
                        if (a.images && a.images.length) {
                          for (const b of a.images) {
                            // this.totalCount++
                          }
                        }
                      }
                    this.reOrderDirectory(this.finalDirectory)
                    console.log('FINAL : ', this.finalDirectory)
                    console.log('totalCount : ', this.totalCount)
                    this.finalEvent = event
                    this.buttonState = 'Import'
                  })
                }
                else {
                  await this.presentToastWithOptions('Invalid Mode Selection!', 'Pls Check the import mode before importing.', 'ERR-145')
                }
              }

              // *** Multi Mode Import
              if (!event.target.files[0].name.includes('single-mode-zip')) {
                if ((this.importMode === 'multi')) {
                  console.log('multi mode import')
                  await jsZip.loadAsync(event.target.files[0]).then(async (zip: any) => {
                    // console.log('zip files : ', zip.files)
                    for (let i = 0; i < Object.keys(zip.files).length; i++) {
                      if ((!Object.keys(zip.files)[i].includes('__MACOSX')) && (!Object.keys(zip.files)[i].includes('.DS_Store'))) {
                        // console.log('test : ', Object.keys(zip.files)[i])
                        this.directories.push(Object.keys(zip.files)[i])
                      }
                    }
                    this.sortedDirectory = []
                    this.deduceDirectories(this.directories, this.skuArr)

                    // * Validate against SKU
                    this.successMatch = []
                    this.failMatch = []
                    // ! remove duplicate SKUs ( *Not applicable if pid is stored )
                    // this.skuArr = [...new Set(this.skuArr)]
                    // console.log('after sku = ', this.skuArr)
                    for (const sortSKU of this.sortedDirectory) {
                      if (this.skuArr.some(sku => sku.productCode === sortSKU.productCode)) {
                        this.successMatch.push(sortSKU)
                      } else {
                        this.failMatch.push(sortSKU)
                      }
                    }
                    // console.log('success : ', this.successMatch)
                    // console.log('fail : ', this.failMatch)

                    // ! Remove failed SKUs from sortedDirectory
                    if (this.failMatch && this.failMatch.length) {
                      await this.presentToastWithOptions('SKU Mismatch!', `Unidentified SKUs found in ${this.failMatch.length} folder(s).`, 'ERR-163')
                      for (const failSKU of this.failMatch) {
                        this.sortedDirectory = this.sortedDirectory.filter(p => p.productCode !== failSKU.productCode)
                      }
                      // this.clearAll()
                      return
                    }

                    console.log('sort filter : ', this.sortedDirectory)

                    // * Validate success SKUs against product limit
                    this.successSKU = []
                    this.failSKU = []
                    if (this.successMatch && this.successMatch.length) {
                      for (const sortSKU of this.sortedDirectory) {
                        console.log('imgLen : ', sortSKU.images.length)
                        if (sortSKU.images.length <= this.prodUploadLimit) {
                          this.successSKU.push(sortSKU)
                        } else if (sortSKU.images.length > this.prodUploadLimit) {
                          await this.presentToastWithOptions('Product Images Upload Limit!', `More than ${this.prodUploadLimit} images per product not allowed.`, 'ERR-164')
                          this.failSKU.push(sortSKU)
                        }
                      }
                    }

                    // ! Remove failed product-limit from sortedDirectory
                    if (this.failSKU && this.failSKU.length) {
                      for (const sku of this.failSKU) {
                        this.sortedDirectory = this.sortedDirectory.filter(p => p.productCode !== sku.productCode)
                      }
                      // this.clearAll()
                      return
                    }

                    // * Check variant name & number of variants
                    this.successVariant = []
                    this.failVariant = []
                    if (this.successSKU && this.successSKU.length) {
                      for (const sortSKU of this.sortedDirectory) {
                        if (sortSKU.isPriceList) {
                          if (sortSKU.variantLength > 0) {
                            if (this.skuArr.some(sku => sku.productCode === sortSKU.productCode)) {
                              let index = this.skuArr.findIndex(sku => sku.productCode === sortSKU.productCode)
                              // * Check variant length 
                              if (sortSKU.variantLength === this.skuArr[index].variantLength.length) {
                                // * Check variant name(s)
                                for (let i = 0; i < sortSKU.nameOfVariants.length; i++) {
                                  console.log('zSKU : ', sortSKU.nameOfVariants[i])
                                  console.log('dSKU : ', this.skuArr[index].variantLength[i])
                                  // if (this.skuArr[index].variantType === 'pieces') {
                                  //   if (this.skuArr[index].variantLength.some(v => v.name === sortSKU.nameOfVariants[i])) {
                                  //     this.successVariant.push(sortSKU)
                                  //   } else {
                                  //     this.failVariant.push(sortSKU)
                                  //     this.failVariantReason = 'SKU-Variant-Name-Mismatch'
                                  //   }
                                  // } else {
                                  //   if (this.skuArr[index].variantLength.some(v => v.weight === sortSKU.nameOfVariants[i])) {
                                  //     this.successVariant.push(sortSKU)
                                  //   } else {
                                  //     this.failVariant.push(sortSKU)
                                  //     this.failVariantReason = 'SKU-Variant-Name-Mismatch'
                                  //   }
                                  // }
                                  if (this.skuArr[index].variantLength.some(v => v.weight === sortSKU.nameOfVariants[i])) {
                                    this.successVariant.push(sortSKU)
                                  } else {
                                    this.failVariant.push(sortSKU)
                                    this.failVariantReason = 'SKU-Variant-Name-Mismatch'
                                  }
                                }
                              } else {
                                this.failVariant.push(sortSKU)
                                this.failVariantReason = 'SKU-Variant-Length-Mismatch'
                              }
                            } else {
                              this.failVariant.push(sortSKU)
                              this.failVariantReason = 'SKU-Mismatch'
                            }
                          } else if (sortSKU.variantLength <= 0) {
                            this.successVariant.push(sortSKU)
                          }
                        } else {
                          this.successVariant.push(sortSKU)
                        }
                      }
                    }
                    console.log('sv : ', this.successVariant)
                    console.log('fv : ', this.failVariant)

                    if (this.successVariant && this.successVariant.length) {
                      this.needVariants = true
                    }

                    // ! process failed variants from sortedDirectory
                    if (this.failVariant && this.failVariant.length) {
                      // add removal of failed variants
                      // this.clearAll()
                      this.needVariants = false
                      return
                    }

                    if ((!this.failMatch.length) || (!this.failSKU.length) || (!this.failVariant.length)) {
                      this.finalDirectory = this.sortedDirectory
                      // * length finalDirectory
                      for (const a of this.finalDirectory) {
                        this.totalCount++
                        this.totalSKU++
                        if (a.images && a.images.length) {
                          for (const b of a.images) {
                            this.totalCount++
                          }
                        }
                      }
                      console.log('FINAL : ', this.finalDirectory)
                      this.reOrderDirectory(this.finalDirectory)
                      console.log('totalCount : ', this.totalCount)
                      this.finalEvent = event
                      this.buttonState = 'Import'
                    }

                  })
                } else {
                  await this.presentToastWithOptions('Invalid Mode Selection!', 'Pls Check the import mode before importing.', 'ERR-145')
                }
              }
            } else {
              await this.presentToastWithOptions('Invalid File Format!', 'Pls Check the file extension before uploading.', 'ERR-161')
            }
          }
        } else {
          await this.presentToastWithOptions('No File Detected!', 'Pls select a [ .zip ] file.', 'ERR-160')
        }
      }
      // * IMPORT
      if (buttonState === 'Import') {
        console.log('Importing...')
        await this.uploadZip(this.finalEvent, this.finalDirectory, this.needVariants)
      }
    } catch (error) {
      console.log('Error in Bulk Image Upload : ', error)
      await this.presentToastWithOptions('Error!', 'There is some issue please try again later.', 'ERR-165')
    }
  }

  // * reordering of imgs array is necessary to sync upload in symmetrical fashion on the onFinalize() event
  reOrderDirectory(finalDirectory: any) {
    for (const SKU of finalDirectory) {
      if (SKU.images && SKU.images.length) {
        let reOrderImgs = []
        let remainder = []
        reOrderImgs.length = SKU.images.length
        for (let i = 0; i < SKU.images.length; i++) {
          if (SKU.images[i].charAt(0) == i + 1) {
            reOrderImgs[i] = SKU.images[i]
          } else {
            remainder.push(SKU.images[i])
            continue;
          }
        }
        console.log('--------------------------------')
        console.log('reOrderImgs:', reOrderImgs)
        console.log('remainder : ', remainder)
      }
    }
  }

  async uploadZip(event: any, meta: any, needVariants: boolean) {
    // this.body.createdAt = new Date()
    await this.afs.collection('features').doc('bulkImagesUpload').collection('products').doc('meta').set({ meta, totalCount: this.totalCount, prodLimit: this.prodUploadLimit, totalSKU: this.totalSKU })
    await this.updateLog('Started')
    let t0 = performance.now()
    var zip = new JSZip()
    zip.loadAsync(event.target.files[0]).then(async (zip: any) => {
      zip.file(zip);
      zip.generateAsync({ type: "blob" }).then(async (blob: any) => {
        const zipRef: any = this.fbStorage.ref('productImagesZip.zip')
        await zipRef.put(blob);

        // await zipRef.on('state_changed', (snapshot: any) => {
        //   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //   console.log('Upload is ' + progress + '% done');
        // })
        console.log('zipRef : ', zipRef)

        const downloadURL = await zipRef.getDownloadURL().pipe(first()).toPromise();
        console.log('downloadURL : ', downloadURL)
        let t1 = performance.now();
        console.log('performance : ', (t1 - t0) / 1000, ' Second(s)')
        if (downloadURL) {
          await this.updateLog('Started', 'complete')
          await this.updateLog('In Progress')
        } else {
          await this.presentToastWithOptions('Zip Import failed!', 'Pls try again later.', 'ERR-165')
          await this.updateLog('Failed')
        }
      })
    })
  }

  convertUnixTimestampToDate(unixTimestamp) {
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    // const date = dateObject.toLocaleDateString();
    const date = dateObject.toLocaleString();
    console.log('date : ', date.toString());
    return date
  }

  async checkLogStatus() {
    const log = await this.afs.collection('features').doc('bulkImagesUpload').collection('products').valueChanges().pipe(first()).toPromise();
    if (log.length) {
      console.log('logStatus : ', log)
      let meta = log.filter(l => l.hasOwnProperty('meta'))
      if (meta && meta[0]) {
        this.totalSKUs = meta[0].meta.length
      }
      this.meta = log.filter(l => l.hasOwnProperty('totalSKU'))
      this.zipLog = log.filter(l => l.hasOwnProperty('status'))
      console.log('zipLog : ', this.zipLog[0])
      this.currentState = this.zipLog[0]
      if (this.zipLog[0].status) {
        if (this.zipLog[0].status === 'In Progress') {
          this.completedSKUs = this.zipLog[0].skusCompleted
          this.createdAt = this.convertUnixTimestampToDate(this.zipLog[0].events['inProgress'].createdAt.seconds.valueOf())
        }
        if (this.zipLog[0].status === 'Completed') {
          this.buttonState = 'Upload'
          this.completedSKUs = this.zipLog[0].skusCompleted
          this.createdAt = this.convertUnixTimestampToDate(this.zipLog[0].events['completed'].completedAt.seconds.valueOf())
        }
        if (this.zipLog[0].status === 'Failed') {
          this.createdAt = this.convertUnixTimestampToDate(this.zipLog[0].events['failed'].createdAt.seconds.valueOf())
        }
        console.log('createdAt : ', this.createdAt)
        // this.createdAt = this.convertUnixTimestampToDate(this.createdAt)
      }
    } else {
      const doc = await this.afs.collection('features').doc('bulkImagesUpload').set({
        createdAt: new Date()
      })
      const log = await this.afs.collection('features').doc('bulkImagesUpload').collection('products').doc('zipState').set(this.body)
      await this.checkLogStatus()
    }
  }

  async terminateOperation() {
    console.log(this.meta[0])
    await this.afs.collection('features').doc('bulkImagesUpload').collection('products').doc('zipState').update({
      status: 'Failed',
      skusCompleted: 0,
      terminated: true,
      'events.failed.createdAt': new Date()
    })
    this.totalSKUs = 0
    await this.checkLogStatus()
  }

  async updateLog(type: string, state?: string) {
    if ((type === 'Started') || (type === 'In Progress')) {
      this.body.status = type
      if (type === 'Started' && !state) {
        this.body.events.started.createdAt = new Date()
        const log = await this.afs.collection('features').doc('bulkImagesUpload').collection('products').doc('zipState').update({
          'events.started.createdAt': new Date(),
          'skusCompleted': 0,
          'terminated': false
        })
      } else if (type === 'Started' && state) {
        this.body.events.started.completedAt = new Date()
        const log = await this.afs.collection('features').doc('bulkImagesUpload').collection('products').doc('zipState').update({ 'events.started.completedAt': new Date() })
      }
      if (type === 'In Progress') {
        this.body.events.inProgress.createdAt = new Date()
        const log = await this.afs.collection('features').doc('bulkImagesUpload').collection('products').doc('zipState').update({ 'events.inProgress.createdAt': new Date() })
      }
      const log = await this.afs.collection('features').doc('bulkImagesUpload').collection('products').doc('zipState').update({
        'status': type,
        'deleteZip': false,
        'deleteExtractedZip': false
      })
      await this.checkLogStatus()
    }
    if (type === 'Failed') {
      const log = await this.afs.collection('features').doc('bulkImagesUpload').delete()
    }
  }

}
