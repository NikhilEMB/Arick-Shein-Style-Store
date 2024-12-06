// //process exports
// exports.users = require('./process/users');
// exports.products = require('./process/products');
// exports.categories = require('./process/categories');
// exports.messages = require('./process/messages');
// exports.payments = require('./process/payments');
// exports.location = require('./process/location');
// exports.orders = require('./process/orders');
// exports.storage = require('./process/storage');
// exports.metrics = require('./process/metrics');
// exports.wallet = require('./process/wallet');
// exports.search = require('./process/search');
// exports.cart = require('./process/cart');
// exports.auth = require('./process/auth');
// exports.subscription = require('./process/subscription');
// exports.ratings = require('./process/ratings');
// exports.settings = require('./process/settings');
// exports.analytics = require('./process/analytics');
// exports.email = require('./process/email');
// exports.membership = require('./process/membership');
// exports.brands = require('./process/brands');
// exports.widgets = require('./process/widgets');
// exports.sms = require('./process/sms');
// exports.vendor = require('./process/vendor');
// exports.scheduler = require('./process/scheduler');
// exports.sitemap = require('./process/sitemap');
// exports.pickDrop = require('./process/pickDrop');
// exports.studio = require('./process/studio');
// exports.appointment = require('./process/appointment');
// exports.integrations = require('./process/integrations');
// exports.delivery = require('./process/delivery');
// exports.pickup = require('./process/pickup');
// exports.services = require('./process/services');
// exports.pages = require('./process/pages');
// exports.booking = require('./process/booking');

// //integrations exports
// exports.products_integration = require('./integrations/core/products');
// exports.orders_integration = require('./integrations/core/orders');


const processModules = ['users', 'products', 'categories', 'messages', 'payments', 'location', 'orders', 'storage', 'metrics', 'wallet', 'search', 'usersSearch', 'ordersSearch', 'cart', 'auth', 'subscription', 'ratings', 'settings', 'analytics', 'email', 'membership', 'brands', 'widgets', 'sms', 'vendor', 'scheduler', 'sitemap', 'pickDrop', 'studio', 'appointment', 'integrations', 'delivery', 'pickup', 'refunds', 'services', 'pages', 'booking', 'management', 'bulkImage', 'watiOrders', 'zohoInventory', 'zohoInventoryOrders', 'zohoInventoryProducts', 'zohoInventoryCustomers', 'whatsappExpress', 'influencer', 'autoship', 'vendorSubscription', 'shopify_coupons', 'shopify_orders', 'whatsappNotifications']

const integrationModules = ['products', 'orders']

let models = {};

for (const module of processModules) {
    const isExist = moduleIsAvailable(`./process/${module}`);
    if (isExist) {
        models[module] = require(`./process/${module}`)
    }
}
for (const module of integrationModules) {
    const isExist = moduleIsAvailable(`./integrations/core/${module}`);
    if (isExist) {
        models[`${module}_integration`] = require(`./integrations/core/${module}`)
    }
}

module.exports = models;

function moduleIsAvailable (path) {
    try {
        require.resolve(path);
        return true;
    } catch (e) {
        return false;
    }
}
