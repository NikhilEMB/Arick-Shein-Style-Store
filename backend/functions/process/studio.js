const functions = require("firebase-functions");
const { db } = require('./admin');

exports.addStyleOnCategoryCreate = functions.firestore.document("categories/{categoryId}").onCreate(async (snap, context) => {
    const categoryId = context.params.categoryId;
    const globalRef = await db.collection('studio').doc('website').collection('sections').doc('global').get();
    const style = globalRef.data();
    if(style) {
        await db.collection('categories').doc(categoryId).update({
            style
        });
    }
});

exports.addStyleOnSubCategoryCreate = functions.firestore.document("categories/{categoryId}/subcategories/{subCategoryId}").onCreate(async (snap, context) => {
    const categoryId = context.params.categoryId;
    const subCategoryId = context.params.subCategoryId;
    const globalRef = await db.collection('studio').doc('website').collection('sections').doc('global').get();
    const style = globalRef.data();
    if(style) {
        await db.collection('categories').doc(categoryId).collection('subcategories').doc(subCategoryId).update({
            "style.productStyle": style.productStyle
        });
    }
});

exports.addStyleOnBrandCreate = functions.firestore.document("brands/{brandId}").onCreate(async (snap, context) => {
    const brandId = context.params.brandId;
    const globalRef = await db.collection('studio').doc('website').collection('sections').doc('global').get();
    const style = globalRef.data();
    if(style) {
        await db.collection('brands').doc(brandId).update({
            "style.productStyle": style.productStyle
        });
    }
});

//add style on widget create
exports.addStyleOnSectionCreate = functions.firestore.document("widgets/{widgetId}").onCreate(async (snap, context) => {
    const widgetId = context.params.widgetId;
    const widgetData = snap.data();
    const globalRef = await db.collection('studio').doc('website').collection('sections').doc('global').get();
    const style = globalRef.data();
    if(['categories', 'brands', 'services', 'vendors'].includes(widgetData.type)) {
        if(style) {
            await db.collection('widgets').doc(widgetId).update({
                "style.itemStyle": style.itemStyle
            });
        }
    } 
    if(['product-carousel', 'product-list'].includes(widgetData.type)) {
        if(style) {
            await db.collection('widgets').doc(widgetId).update({
                "style.productStyle": style.productStyle
            });
        }
    } 
});

exports.updateMenuOnCategoryUpdate= functions.firestore.document("categories/{categoryId}").onUpdate(async (change, context) => {
    const after = change.after.data();
    const before = change.before.data();
    const categoryId = context.params.categoryId;

    if((after.name !== before.name) || (after.status !== before.status)) {
        const headerRef = await db.collection('studio').doc('website').collection('sections').doc('header').get();
        const menuItems = headerRef.data() ? headerRef.data().menuData.menuItems : [];
        
        const data = {
            title: after.name,
            link: after.isSubcategories ? `/shop-subcategories/${urlName(after.name)}/${categoryId}` : `/shop/category/${urlName(after.name)}/${categoryId}`,
            id: categoryId,
            status: after.status,
            menuItems,
            type: 'category'
        }

        await db.collection('studio').doc('website').collection('sections').doc('header').update({
            "menuData.menuItems": getUpdatedMenuData(data)
        });
    }
});

exports.updateMenuOnSubCategoryUpdate= functions.firestore.document("categories/{categoryId}/subcategories/{subCategoryId}").onUpdate(async (change, context) => {
    const after = change.after.data();
    const before = change.before.data();
    const subCategoryId = context.params.subCategoryId;
    const categoryId = context.params.categoryId;

    if((after.name !== before.name) || (after.status !== before.status)) {
        const headerRef = await db.collection('studio').doc('website').collection('sections').doc('header').get();
        const menuItems = headerRef.data() ? headerRef.data().menuData.menuItems : [];
        
        const category = await db.collection('categories').doc(categoryId).get();

        const data = {
            title: after.name,
            link: `/shop-subcategories/${urlName(category.data().name)}/${categoryId}/${urlName(after.name)}/${subCategoryId}`,
            id: subCategoryId,
            status: after.status,
            menuItems,
            type: 'subcategory'
        }

        await db.collection('studio').doc('website').collection('sections').doc('header').update({
            "menuData.menuItems": getUpdatedMenuData(data)
        });
    }
});

exports.updateMenuOnBrandUpdate = functions.firestore.document("brands/{brandId}").onUpdate(async (change, context) => {
    const after = change.after.data();
    const before = change.before.data();
    const brandId = context.params.brandId;

    if((after.name !== before.name) || (after.status !== before.status)) {
        const headerRef = await db.collection('studio').doc('website').collection('sections').doc('header').get();
        const menuItems = headerRef.data() ? headerRef.data().menuData.menuItems : [];
        
        const data = {
            title: after.name,
            link: `/shop/brand/${urlName(after.name)}/${brandId}`,
            id: brandId,
            status: after.status,
            menuItems,
            type: 'brand'
        }

        await db.collection('studio').doc('website').collection('sections').doc('header').update({
            "menuData.menuItems": getUpdatedMenuData(data)
        });
    }
});

exports.updateMenuOnServiceUpdate = functions.firestore.document("services/{serviceId}").onUpdate(async (change, context) => {
    const after = change.after.data();
    const before = change.before.data();
    const serviceId = context.params.serviceId;

    if(after.name !== before.name) {
        const headerRef = await db.collection('studio').doc('website').collection('sections').doc('header').get();
        const menuItems = headerRef.data() ? headerRef.data().menuData.menuItems : [];
        
        const data = {
            title: after.name,
            link: `/service-response/${urlName(after.name)}/${serviceId}`,
            id: serviceId,
            menuItems
        }

        await db.collection('studio').doc('website').collection('sections').doc('header').update({
            "menuData.menuItems": getUpdatedMenuData(data)
        });
    }
});

exports.updateMenuOnCustomPageUpdate = functions.firestore.document("pages/{pageId}").onUpdate(async (change, context) => {
    const after = change.after.data();
    const before = change.before.data();
    const pageId = context.params.pageId;

    if(after.name !== before.name) {
        const headerRef = await db.collection('studio').doc('website').collection('sections').doc('header').get();
        const menuItems = headerRef.data() ? headerRef.data().menuData.menuItems : [];
        
        const data = {
            title: after.name,
            link: `/custom-page/${urlName(after.name)}/${pageId}`,
            id: pageId,
            menuItems
        }

        await db.collection('studio').doc('website').collection('sections').doc('header').update({
            "menuData.menuItems": getUpdatedMenuData(data)
        });
    }
});

function getUpdatedMenuData(data) {
    console.log(data.status);
    for (const item of data.menuItems) {
        if('dropdownMenuData' in item) {
            if(item.dropdownMenuData && item.dropdownMenuData.length) {
                for (const dropMenu of item.dropdownMenuData) {
                    if(dropMenu.id === data.id && data.type !== 'subcategory') {
                        dropMenu.status = data.status;
                    }
                    if('subMenuData' in dropMenu) {
                        if(dropMenu.subMenuData && dropMenu.subMenuData.length) {
                            for (const subMenu of dropMenu.subMenuData) {
                                if(subMenu.id === data.id) {
                                    subMenu.title = data.title;
                                    subMenu.link = data.link;
                                    subMenu.status = data.status;
                                }
                            }
                        }
                    } else {
                        if(dropMenu.id === data.id) {
                            dropMenu.title = data.title;
                            dropMenu.link = data.link;
                            dropMenu.status = data.status;
                        }
                    }
                }
            }
        } else {
            if(item.id === data.id) {
                item.title = data.title;
                item.link = data.link;
                item.status = data.status;
            }
        }
    }

    return data.menuItems;
}

function urlName(pname) {
    return encodeURL(pname);
}

function encodeURL(url) {
    return escape(encodeURIComponent(url.toLowerCase().trim().replace(/ /g, '-')));
}