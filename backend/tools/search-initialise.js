let admin = require("firebase-admin");
let serviceAccount = require("./service-account.json");
let fs = require('fs');
var colors = require("./colors.json");
const algoliasearch = require('algoliasearch');

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
 databaseURL: "https://pt-app-4148f.firebaseio.com",
   storageBucket: "pt-app-4148f.appspot.com"
 });
 


var db = admin.firestore();


const ALGOLIA_ID = '';
const ALGOLIA_ADMIN_KEY = '';
const ALGOLIA_SEARCH_KEY = '';

const ALGOLIA_INDEX_NAME = 'pt-app-4148f';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const algoliaIndex = client.initIndex(ALGOLIA_INDEX_NAME);
let searchProducts = [];


async function generateProductList(){

 
   let categoriesMap = {};
   let categoryIds = [];
   let subcategoriesMap = {};

   const catDocs = await db.collection('categories').get();


   catDocs.forEach(async (cat) => {

          if(cat && cat.id && cat.data()) {
            let category  = cat.data();
            categoriesMap[cat.id] = category['name'];
            categoryIds.push(cat.id);
          }
   });

   await Promise.all(
    categoryIds.map(async (catId,index) => {
        const subcatDocs = await db.collection('categories').doc(catId).collection('subcategories').get();


        subcatDocs.forEach(async (subcat) => {
     
               if(subcat && subcat.id && subcat.data()) {
                 let subcategory  = subcat.data();
                 subcategoriesMap[subcat.id] = subcategory['name'];
               }
        });

    }));

  

   const pdtDocs = await db.collection('products').get();
   

   pdtDocs.forEach(async (pdt) => {

          if(pdt && pdt.id && pdt.data()) {
              let product = pdt.data();

              if(product.status){
                    delete product['images'];
                    delete product['barcode'];
                    delete product['nameToSearch'];
                    

                    product['objectID'] = pdt.id;
                    product['ptype'] = 'parent';
                    product['prodDesc'] = product["prodDesc"].replace(/<[^>]*>?/gm, '');
                    
                    if(product['categories']){
                        product['categories'].forEach((category,index) => {
                            if(categoriesMap[category]){
                                product['categories'][index] = categoriesMap[category];
                            }
                            if(subcategoriesMap[category]){
                                product['categories'][index] = subcategoriesMap[category];
                            }
                        });
                    }

                    //console.log(product);
                    searchProducts.push(product);
              }

             
          }
   });

   await Promise.all(
     searchProducts.map(async (product,index) => {
            const optionDocs = await db.collection('products').doc(product.objectID).collection('options').get();

            optionDocs.forEach((opt) => {
         
                   if(opt && opt.id && opt.data()) {
                      let option = opt.data();
                      if(option.status){
                            delete option['images'];
                            delete option['barcode'];
                            delete option['nameToSearch'];
                            
                
                            option['objectID'] = opt.id;
                            option['ptype'] = 'child';
                            option['parentId'] = product.objectID;
                            option['prodDesc'] = option["prodDesc"].replace(/<[^>]*>?/gm, '');
                            
                            if(option['categories']){
                                option['categories'].forEach((category,index) => {
                                    if(categoriesMap[category]){
                                        option['categories'][index] = categoriesMap[category];
                                    }
                                    if(subcategoriesMap[category]){
                                        option['categories'][index] = subcategoriesMap[category];
                                    }
                                });
                            }
                
                            //console.log(option);
                            searchProducts.push(option);
                      }
                   }
           });
        })
    );


  // console.log('searchProducts',searchProducts);
   console.log('searchProductsLength',searchProducts.length);
   
   
    searchProducts.map((product,index) => {
       
         algoliaIndex.saveObject(product).then(({ objectID }) => {
            console.log(objectID);
         })
         .catch(err => {
             console.log(err);
         })
        
       
    });

    

}

function setSearchableAttributes(){

    algoliaIndex.setSettings({
        searchableAttributes: [
          'prodName',
          'searchKeywords',
          'unordered(prodDesc)',
          'unordered(categories)',
          'color.name',
          'productCode',
          'hsnCode'
        ]
      }).then(() => {
        console.log("Added Searhable Attributes");
      })
     .catch(err => {
        console.log(err);
     });
}


generateProductList();

setSearchableAttributes();