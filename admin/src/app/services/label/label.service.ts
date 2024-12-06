import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  public labels: any = {};
  public activeLan: string = 'en';
  keys: any = {
    SHOP_CATEGORIES: [
    'best_sellers',
    'shop_by_categories',
    'services',
    'shop_by_brands',
    'search_for_products',
    'my_cart',
    'off',
    'out_of_stock',
    'add_to_cart',
    'request_prices',
    'exit_app_msg',
    'login_again',
    'app_update_alert_header',
    'app_update_alert_msg',
    'app_update_alert_btn_text',
    'sending_price_request'
    ],

    SHOP_SUB_CATEGORIES: [
      'no_subcategories'
    ],

    SHOP: [
      'sort',
      'filter',
      'no_products',
      'loading_more_products',
      'cart_amount',
      'add_more_to_place_order',
      'go_to_cart',
      'sort_modal_header',
      'popularity',
      'price_high_to_low',
      'price_low_to_high',
      'discount_high_to_low',
      'name_a_to_z'
    ],

    SIDEMENU: [
      'share_app_problem_msg'
    ],

    STATES_MODAL: [
      'search_any_state'
    ],

    USER_ADDRESSES: [
      'address_delete_sure_alert_msg',
      'address_deleted_msg'
    ],

    USER_CART: [
      'min_amount_for_order_place_msg',
      'max_amount_for_order_place_msg',
      'min_qty_required_for_products_msg',
      'delete_product_sure_alert_msg',
      'please_proceed_with_only_one_mem_plan'
    ],

    USER_FEEDBACK: [
      'enter_feedback_placeholder_text',
      'feedback_submitted_msg',
      'max_images_upload_msg',
      'select_max_image_msg',
      'enter_feedback_content_msg',
      'saving_feedback'
    ],

    USER_ORDER_DETAILS: [
      'do_payment',
      'retry_payment',
      'order_cancelled_msg',
      'cancelling_the_order',
      'cancel_sure_alert_msg',
      'yes'
    ],

    USER_WALLET: [
      'enter_amount',
      'enter_valid_amount',
      'max_limit_for_adding_money_in_wallet'
    ],

    REQUEST_DETAILS: [
      'header_text'
    ],

    SERVICE_RESPONSE: [
      'write_details_here',
      'service_request_submitted_msg',
      'service_request_submit_error_msg',
      'max_image_upload_msg',
      'select_max_image_msg',
      'provide_details_msg',
      'upload_images_msg',
      'submitting_response',
      'select_service_date'
    ],

    USER_SERVICES: [
      'header_text'
    ],

    USER_WISHLIST: [
      'header_text',
    ],

    SEARCH_ITEMS: [
      'input_placeholder',
      'loading_more_products',
    ],

    PROFILE: [
      'name_placeholder',
      'email_placeholder',
      'image_uploaded_msg',
      'image_updated_msg',
      'enter_valid_email',
    ],

    PRODUCT_DETAILS: [
      'item_added_to_cart',
      'must_be_user_to_use_wishlisht_msg',
      'product_sharing_error',
      'check_out_this_product',
      'check_this_out',
      'on',
      'min_qty_required',
      'continue_alert_btn',
      'go_to_cart_alert_btn',
      'request_for_quote_success_msg'
    ],

    ORDER_SUMMARY: [
      'enter',
      'number',
      'coupon_not_applicable',
      'order_not_deliverable',
      'min_amount_for_placing_order',
      'max_amount_for_placing_order',
      'select_delivery_date_time',
      'min_amount_for_placing_order_on_pincode',
      'max_amount_for_placing_order_on_pincode',
      'verifying_coupon_code',
      'order_placed_alert_header',
      'order_placed_alert_message',
      'removing_coupon_code',
    ],

    ORDER_PAYMENT: [
      'payment_mode_set_msg',
      'payment_mode_to_cash_msg',
      'payment_is_successful',
      'min_order_amount_to_use_wallet',
      'try_again',
      'select_delivery_date_time'
    ],

    NEW_ADDRESS : [
      'new_address',
      'edit_address',
      'use_current_location',
      'name',
      'complete_address',
      'city',
      'state',
      'select_state',
      'pincode',
      'phone_no',
      'make_as_default_address',
      'save',
      'edit',
      'deliver_here',
      'use_as_billing_address',
      'address_saved_successfully',
      'address_edited_successfully',
      'error_in_getting_address',
      'error_getting_location',
      'please_enter_name',
      'please_enter_address',
      'please_enter_city',
      'please_enter_state',
      'please_enter_pincode',
      'please_enter_phoneno'
    ],

    LOCATION_MAP: [
      'invalid_address_msg',
      'initializing_map'
    ],

    HOME: [
      'where_do_you_want_the_delivery',
      'please_enter_pincode',
      'delivery_not_available',
      'skip',
      'phone_number',
      'sign_in_with',
      'sign_in_with_otp',
      'too_many_otp_attempts',
      'please_enter_otp_sent_to',
      'resend_otp',
      'personal_details',
      'full_name',
      'email_address',
      'submit',
      'save',
      'sending_otp',
      'signing_in',
      'checking',
      'verifying',
      'please_enter_email_address',
      'saving'
    ],

    DELIVERY_NAVIGATION: [
      'header_text',
      'open_in_google_maps',
      'finish_navigation',
      'initializing_map',
      'order_updated_as_delivered',
      'error_getting_location',
      'invalid_address',
      'unable_to_open_google_maps',
      'sure_finish_naviagtion_alert_msg',
      'finish'
    ],

    DELIVERY_ORDER_DETAILS: [
      'order',
      'delivery_address',
      'open_in_google_maps',
      'delivery_schedule',
      'not_set_by',
      'at_any_time',
      'at',
      'payment_info',
      'paid',
      'using',
      'will_pay_using',
      'update_status_if_paid',
      'update',
      'products',
      'not_started',
      'delivery_in_progress',
      'delivered',
      'qty',
      'start_navigation',
      'continue_navigation',
      'payment_status_changed_successfully',
      'cancelling_the_order'
    ],

    CO_CATEGORY_GRID: [
      'must_be_user_to_access_services_msg'
    ],

    CO_PRODUCT_GRID: [
      'out_of_stock',
      'colors', 'off',
      'add_item',
      'select'
    ],

    CO_PRODUCT_LIST: [
      'out_of_stock',
      'colors', 'off',
      'add_item',
      'select'
    ],

    CO_SERVICE_DETAILS: [
      'details',
      'attachments',
      'complete',
      'request_has_been_completed_successfully',
      'completing_request'
    ],

    AUTO_CONFIRM_PAYMENT: [
      'header_text',
      'price_details',
      'total_mrp',
      'offer_discount',
      'coupon_discount',
      'store_pickup_charges',
      'delivery',
      'free',
      'total_amount',
      'use_wallet_balance',
      'current_balance',
      'min_amount_to_use_wallet_msg',
      'you_pay',
      'wallet_covers_payment',
      'place_order',
      'payment_mode_set_msg',
      'order_placed_successfully',
      'payment_mode_to_cash_msg',
      'payment_is_successful',
      'min_order_amount_to_use_wallet'
    ],

    BUYNOW_PRICELIST_MODAL: [
      'out_of_stock',
      'buy_now',
      'min_qty_required'
    ],

    CHAT_BOT: [
      'header_text',
      'search_any_message',
      'no_more_messages',
      'your_order_is_rejected',
      'order_id',
      'view_order',
      'your_order_is_confirmed_please_do_the_payment',
      'do_payment',
      'please_do_the_payment_of_your_order',
      'your_order_is_cancelled',
      'your_order_is_dispatched',
      'your_order_is_delivered',
      'your_order_is_returned',
      'delivery_has_started_for_this_order',
      'track_order',
      'new_order_placed',
      'order_is_cancelled',
      'payment_is_successful',
      'type_a_message'
    ],

    ADD_COUPON_CODES: [
      'new_coupon_code',
      'edit_coupon_code',
      'details',
      'products',
      'code_name',
      'qty',
      'usage_per_user',
      'applicable_above_order_amount',
      'discount_type',
      'flat',
      'amount',
      'max_discount',
      'valid_upto',
      'this_can_be_access_when_coupon_code_is_saved',
      'products_on_which_coupon_will_not_be_applied',
      'no_products',
      'image',
      'name',
      'select_date',
      'new_coupon_code_generated_successfully',
      'coupon_code_edited_successfully',
      'coupon_code_deleted_successfully',
      'product_removed_successfully',
      'already_exists',
      'please_remove_space_from_the_code_name',
      'please_fill_all_the_details',
      'status_changed'
    ],

    ADD_SUBCATEGORIES: [
      'new_subcategory',
      'edit_subcategory',
      'show',
      'subcategory_name',
      'subcategory_image',
      'add_image',
      'no_attached_image',
      'subcategory_banner',
      'upload_banner',
      'no_attached_banner',
      'information',
      'products',
      'no_products',
      'image',
      'product',
      'reorder',
      'search_product',
      'subcatgeory_added_successfully',
      'subcategory_deleted_successfully',
      'subcategory_edited_successfully',
      'please_enter_category_name',
      'delete_subcategory_sure_alert_msg'
    ],

    ADMIN_ALLUSERS: [
      'header_text',
      'users',
      'search_user',
      'delivery',
      'admins',
      'no_users',
      'total_users',
      'profile',
      'name',
      'phone',
      'active',
      'make',
      'admin',
      'user',
      'agent',
      'message',
      'block',
      'unblock',
      'loading_more_users',
      'sucessfully_made_as',
      'sucessfully_blocked_the_user',
      'sucessfully_unblocked_the_user',
      'sucessfully_blocked_and_deleted_the_user',
      'block_user_sure_alert_msg',
      'block_and_delete_data',
      'unblock_user_sure_alert_msg',
      'are_you_sure_you_want_to_make',
      'as'
    ],

    ADMIN_ALLUSERS_DETAILS: [
      'orders',
      'addresses',
      'wallet',
      'no_orders',
      'order_id',
      'placed_on',
      'by',
      'more',
      'delivery_agent_has_started_delivery',
      'view_order',
      'track_order',
      'no_saved_addresses',
      'no_wallet_transactions',
      'wallet_balance',
      'charge_user',
      'add_money',
      'loading_more_transactions',
      'enter_amount',
      'enter_message',
      'add',
      'charge',
      'please_enter_valid_amount',
      'adding_money',
      'please_enter_message',
      'charging_user',
      'delivery_agent_assigned_msg'
    ],

    ADMIN_BANNERS: [
      'header_text',
      'show_banners',
      'banner',
      'upload',
      'remove',
      'update',
      'banner_uploaded_successfuly',
      'banners_status_changed_successfully',
      'banner_removed_successfully',
      'banner_remove_alert_msg'
    ],

    ADMIN_BEST_SELLERS: [
      'header_text',
      'no_products',
      'show_best_sellers',
      'image',
      'name',
      'reorder',
      'status_changed_successfully',
      'product_deleted_from_best_seller_successfully',
      'delete_best_seller_alert_msg'
    ],

    ADD_BRAND: [
      'edit_brand',
      'new_brand',
      'show',
      'brand_name',
      'upload_image',
      'banner_image',
      'brand_banner',
      'upload_banner',
      'brand_saved_successfully',
      'brand_deleted_successfully',
      'please_enter_brand_name',
      'saving_brand_details',
      'are_you_sure_you_want_to_delete_this_brand',
      'deleting_brand'
    ],

    ALL_BRANDS: [
      'header_text',
      'no_brands',
      'image',
      'name',
      'reorder',
      'brand_deleted_successfully',
      'delete_brand_alert_msg',
      'deleting_brand'
    ],

    ADMIN_CATEGORIES: [
      'header_text',
      'search_category',
      'no_categories',
      'image',
      'name',
      'reorder',
      'category_deleted_successfully',
      'category_not_deleted_successfully',
      'delete_category_alert_msg'
    ],

    ADMIN_CHAT: [
      'last_seen',
      'search_any_message',
      'no_more_messages',
      'your_order_is_rejected',
      'order_id',
      'view_order',
      'your_order_is_confirmed_please_do_the_payment',
      'do_payment',
      'please_do_the_payment_of_your_order',
      'your_order_is_cancelled',
      'your_order_is_dispatched',
      'your_order_is_delivered',
      'your_order_is_returned',
      'delivery_has_started_for_this_order',
      'track_order',
      'new_order_placed',
      'order_is_cancelled',
      'payment_is_successful',
      'type_a_message'
    ],

    BROADCAST_MSG: [
      'header_text',
      'add_images',
      'type_a_message',
      'no_attached_images',
      'send',
      'message_send',
      'message_send_problem',
      'please_enter_message'
    ],

    ADMIN_HOME: [
      'header_text',
      'loading_more_messages',
      'broadcast_message'
    ],

    ADMIN_ORDERS: [
      'header_text',
      'search_order',
      'pending',
      'completed',
      'products',
      'no_pending_orders',
      'order_id',
      'placed_on',
      'by',
      'more',
      'delivery_agent_has_started_delivery',
      'view_order',
      'track_order',
      'loading_more_pending_orders',
      'no_completed_orders',
      'loading_more_completed_orders',
      'no_products_need_to_deliver',
      'list_of_products_you_need_to_deliver',
      'total_qty',
      'loading_more_products_need_to_deliver'
    ],

    ADMIN_PAYMENT_SETTINGS: [
      'auto_confirm_order',
      'applicable',
      'no',
      'pan_no',
      'minimum_order_amount',
      'maximum_order_amount',
      'cash_on_delivery',
      'razorpay',
      'key_id',
      'key_secret',
      'data_saved_successfully',
      'enter_upi_or_qr'
    ],

    ADMIN_PRODUCTS: [
      'header_text',
      'search_product',
      'no_products',
      'total_products',
      'image',
      'product',
      'options',
      'add_options',
      'out_of_stock',
      'view',
      'next',
      'previous',
      'loading_more_products',
      'options_added_msg',
      'options_adding_error_msg',
      'delete_product_alert_msg',
      'add_options_text_msg',
      'enter_options_count',
      'add',
      'max_copies_allowed_msg',
      'enter_valid_number',
      'success',
      'failure'
    ],

    ADMIN_PRODUCT_OPTIONS: [
      'header_text',
      'no_options',
      'image',
      'product',
      'out_of_stock',
      'options_usage_text'
    ],

    ALL_SERVICES: [
      'header_text',
      'active',
      'banner',
      'name',
      'created_on',
      'no_services',
      'create_new_service',
      'services_active_status_changed_successfully',
      'service_has_been_deleted_successfully',
      'changing_status',
      'are_you_sure_you_want_to_delete_this_service',
      'deleting_service'
    ],

    CREATE_SERVICE: [
      'new_service',
      'edit_service',
      'name',
      'banner',
      'upload_banner',
      'description',
      'image_mandatory_in_response',
      'service_saved_successfully',
      'service_deleted_successfully',
      'please_enter_all_service_details',
      'saving_service_details',
      'are_you_sure_you_want_to_delete_this_service',
      'deleting_service'
    ],

    REQUEST_COMPLETE: [
      'header_text'
    ],

    SERVICE_REQUESTS: [
      'header_text',
      'pending',
      'completed',
      'no_requests',
      'no_pending_requests',
      'call',
      'view_details',
      'no_completed_requests'
    ],

    ADMIN_SETTINGS: [
      'header_text',
      'store_name',
      'phone_number',
      'store_address',
      'city',
      'state',
      'select_state',
      'latitude',
      'longitude',
      'welcome_message',
      'allow_comment_with_order',
      'message_for_comment',
      'store_logo_for_invoice',
      'upload',
      'remove',
      'authorized_signatory',
      'store_information',
      'app_links',
      'play_store',
      'app_store',
      'social_platforms_links',
      'facebook',
      'twitter',
      'instagram',
      'youtube',
      'shop_status',
      'shop_inactive',
      'shop_inactive_message',
      'data_saved_successfully',
      'please_fill_all_the_details',
      'offers_message',
      'contact_placeholder'
    ],

    ORDER_DETAILS: [
      'header_text',
      'send_payment_request',
      'delivery_address',
      'name',
      'address',
      'contact_no',
      'placed_on',
      'open_in_google_maps',
      'delivery_schedule',
      'not_set_by',
      'at_any_time',
      'at',
      'store_pickup_address',
      'payment_info',
      'paid_using',
      'will_pay_using',
      'update_status_if_already_paid',
      'update',
      'delivery_agent',
      'select_delivery_agent',
      'setup_delivery_agent',
      'invoice',
      'download_invoice',
      'products',
      'qty',
      'user_message',
      'sku_code',
      'price_details',
      'total_mrp',
      'offer_discount',
      'coupon_discount',
      'store_pickup_charges',
      'delivery',
      'free',
      'total_amount',
      'wallet_amount',
      'amount_paid',
      'dispatch_message',
      'enter_your_dispatch_message_here',
      'reject',
      'confirm',
      'order_rejected_msg',
      'order_confirmed_msg',
      'order_cancelled_msg',
      'order_dispatched_msg',
      'order_delivered_msg',
      'order_returned_msg',
      'payment_request_send_msg',
      'payment_status_changed_msg',
      'delivery_agent_assigned_msg',
      'order_reject_sure_alert_msg',
      'yes',
      'order_cancel_sure_alert_msg',
      'order_remove_sure_alert_msg',
      'unable_to_open_google_maps',
      'invoice_gen_success',
      'refund_amount_header',
      'enter_refund_amount'
    ],

    CATEGORIES: [
      'new_category',
      'edit_category',
      'show',
      'category_name',
      'category_image',
      'add_image',
      'no_attached_image',
      'category_banner',
      'upload_banner',
      'no_attached_banner',
      'information',
      'subcategories',
      'products',
      'show_subcategories',
      'no_categories',
      'image',
      'name',
      'reorder',
      'product',
      'no_products',
      'catgeory_added_successfully',
      'category_deleted_successfully',
      'category_edited_successfully',
      'category_not_deleted_successfully',
      'category_not_edit_successfully',
      'subcategories_status_changed_successfully',
      'please_enter_category_name',
      'are_you_sure_you_want_to_delete_this_category'
    ],

    NEW_PRODUCT: [
      'new_product',
      'edit_product',
      'basic',
      'details',
      'categories_and_brands',
      'images',
      'show',
      'product_name',
      'single_price',
      'variants',
      'prices_should_be_inclusive_of_all_taxes',
      'price_mrp',
      'discounted_price',
      'quantity',
      'shipping_weight',
      'purchase_price',
      'type',
      'import_template',
      'variant',
      'price',
      'mrp',
      'per_pc',
      'shipping_wt',
      'add_more',
      'min_quantity',
      'max_quantity',
      'product_description',
      'sku_code',
      'hsn_code',
      'color',
      'select_color',
      'update',
      'remove',
      'show_out_of_stock_if_no_quantity_is_left',
      'keywords_search',
      'add',
      'barcode_per_qr_code',
      'upload',
      'upload_for',
      'add_some_data_to_price_list_for_uploading_barcodes',
      'no_categories',
      'search_category',
      'categories',
      'brands',
      'add_images',
      'no_attached_images',
      'make_as_cover_pic',
      'cover_pic',
      'option_deleted_successfully',
      'please_enter_product_name',
      'please_enter_product_price',
      'please_enter_all_variants_data_of_product',
      'please_enter_product_description',
      'please_select_any_category_or_brand',
      'please_make_any_one_image_as_cover_picture',
      'value_must_be_less_than_100',
      'are_you_sure_you_want_to_delete_this_product',
    ],

    ADMIN_TERMS_SETTINGS: [
      'header_text',
      'terms',
      'privacy',
      'data_saved_successfully',
      'please_enter_some_terms',
      'please_enter_some_privacy'
    ],

    ALL_FEEDBACKS: [
      'header_text',
      'no_feedbacks',
      'view_details',
      'by'
    ],

    APP_USAGE: [
      'header_text'
    ],

    BEST_SELLERS_MODAL: [
      'search_for_products',
      'no_products',
      'add',
      'previous',
      'next',
      'product_saved_as_best_seller',
      'Already_10_products_in_best_sellers'
    ],

    COUPON_CODE_MODAL: [
      'search_for_products',
      'no_products',
      'add',
      'added',
      'next',
      'coupon_code_will_not_be_applied_on_this_product'
    ],

    COUPON_CODES: [
      'header_text',
      'no_coupon_codes',
      'code_name',
      'qty',
      'amount',
      'coupon_code_deleted_successfully',
      'delete_coupon_sure_alert_msg'
    ],

    DASHBOARD: [
      'header_text'
    ],

    DELIVERY_SETTINGS: [
      'header_text',
      'details',
      'pincodes',
      'default_delivery_amount',
      'free_delivery_above_amount',
      'store_pickup',
      'store_pickup_charges',
      'delivery_based_on_km',
      'charges_per_km',
      'maximum_delivery_charges',
      'delivery_schedule',
      'making_delivery_schedule_mandatory',
      'max_number_of_days_for_delivery',
      'allow_same_day_delivery',
      'minimum_hours_required_to_prepare_order',
      'last_delivery_time',
      'days',
      'time',
      'add',
      'allow_all_pincodes',
      'cost',
      'active',
      'min_amount',
      'max_amount',
      'add_pincode',
      'delivery_data_saved_successfully',
      'please_fill_all_the_data_msg',
      'slot_data_saved_successfully',
      'select_date'
    ],

    FEEDBACK_DETAILS: [
      'header_text',
      'description',
      'images'
    ],

    HELP: [
      'header_text',
      'search',
      'no_help_content',
      'watch_in_hindi',
      'watch_in_english'
    ],

    OFFER_CREATE: [
      'new_offer',
      'edit_offer',
      'offer_name',
      'offer_description',
      'upload_images',
      'max_3',
      'best_size',
      'save_offer',
      'offer_data_saved',
      'offer_deleted_successfully',
      'please_enter_offer_name',
      'saving_offer_data',
      'delete_offer_alert_msg',
      'deleting_offer',
      'select_max_images_from_gallery'
    ],

    OFFER_SETTINGS: [
      'header_text',
      'no_offers',
      'image',
      'name',
      'reorder',
      'add_offer',
      'offer_deleted_successfully!',
      'delete_offer_alert_msg',
      'deleting_offer'
    ],


    PRICE_REQUESTS: [
      'header_text',
      'search',
      'no_price_requests',
      'prices_are_inactive_for_user',
    ],

    SUPPORT: [
      'header_text',
      'call',
      'plan_description',
      'plan_start_date',
      'address'
    ],

    COLORS_MODAL: [
      'header_text',
      'name',
      'color_image',
      'upload',
      'color',
      'add_color',
      'or',
      'search_colors',
      'select'
    ],

    TEMPLATES_MODAL: [
      'header_text',
      'no_templates_available',
      'select_template',
      'select',
      'select_all',
      'add'
    ],

    WALLET_SETTINGS: [
      'header_text',
      'settings',
      'cashbacks',
      'active',
      'maximum_amount_in_user_wallet',
      'minimum_order_amount_to_use_wallet',
      'maximum_amount_can_be_used_from_wallet_in_a_order',
      'amount_in_wallet_for_new_users',
      'no_data_in_cashback_list',
      'cashback_list',
      'cashback',
      'order_amount',
      'no_of_times_cashback_issued_to_a_user',
      'wallet_settings_saved_successfully',
      'cashback_added_successfully',
      'cashback_deleted_successfully',
      'maximum_amount_in_user_wallet_should_be_less_than_or_equal_to',
      'please_enter_maximum_amount_in_user_wallet',
      'adding_new_cashback',
      'add_cashback',
      'enter_order_amount',
      'enter_cashback_amount',
      'no_of_times_it_issued_to_a_user',
      'add',
      'are_you_sure_you_want_to_delete_this_cashback',
      'no',
      'yes',
      'cashback_data_can_not_be_edit_delete_and_add_desired_cashback',
      'adding_money',
      'add_money',
      'enter_amount',
      'please_enter_valid_amount',
      'please_enter_valid_data'
    ],

    AUTH_SERVICE: [
      'admin_has_blocked_you',
      'otp_did_not_match'
    ],

    DELIVERY_SERVICE: [
      'delivery_address_not_existed',
      'fetching_address_location_error_msg'
    ],

    ORDER_SERVICE: [
      'payment_is_successful',
      'order_has_been_placed_successfully',
      'payment_failed_msg',
      'try_again'
    ],

    PRICE_REQUEST_SERVICE: [
      'request_send_succesfully',
      'request_already_send',
      'problem_in_sending_request',
      'prices_active_for_user',
      'some_problem_in_activating_prices',
      'interested_in_buying',
      'please_quote',
      'quantities_of'
    ],

    PRODUCT_SERVICE: [
      'success',
      'failure',
      'product_added_successfully',
      'product_not_added_successfully',
      'product_edited_successfully',
      'product_not_edited_successfully',
      'product_deleted_successfully',
      'product_not_deleted_successfully'
    ],

    PRODUCT_OPTIONS_SERVICE: [
      'success',
      'failure',
      'product_edited_successfully',
      'product_not_edited_successfully'
    ],

    WALLET_SERVICE: [
      'added_to_users_wallet_successfully',
      'problem_in_adding_money',
      'successfully_added_to_your_wallet',
      'payment_failed_msg',
      'deducted_user_wallet_success',
      'problem_in_deducting_money',
      'try_again'
    ],

    CHAT_SERVICE: [
      'your_order_is',
      'payment_is_successful',
      'please_do_the_payment_of_your_order',
      'delivery_has_started_of_this_order'
    ],

    USER_SERVICE: [
      'placing_order_error_msg',
      'made_as_retailer',
      'removed_from_retailer',
      'made_as_reseller',
      'removed_from_reseller'
    ],

    SERVICES_FEATURE_SERVICE: [
      'service_submit_request_msg',
      'service_complete_msg'
    ],

    ADD_LANGUAGES: [
      'header_text',
      'no_languages_available',
      'languages_saved_success_msg'
    ],

    ALL_LANGUAGES: [
      'header_text',
      'no_languages_available',
      'make_default_success_msg',
      'delete_lang_success_msg'
    ],

    SELECT_LANGUAGE: [
      'header_text'
    ],

    PRODUCT_SUBSCRIPTIONS: [
      'header_text',
      'please_fill_all_the_details',
      'settings_has_been_saved_successfully',
      'status_changed_msg',
      'remove',
      'sub_removed_success',
      'remove_sub_alert_msg'
    ],

    CREATE_SUBSCRIPTION: [
      'header_text',
      'please_enter_value_less_than',
      'select_some_days_of_week',
      'select_any_date_of_month',
      'creating_subscription_loading_msg',
      'continue',
      'subscription_active_msg_before_8',
      'subscription_active_msg_after_8'
    ],

    SUBSCRIPTION_SUMMARY: [
      'header_text',
      'subscription_created_success_msg',
      'subscription_failed_msg'
    ],
    USER_SUBSCRIPTIONS: [
      'header_text',
      'status_changed_msg',
      'remove',
      'sub_removed_success',
      'remove_sub_alert_msg'
    ],

    REFERRAL_SETTINGS: [
      'header_text',
      'provide_valid_details',
      'save_settings_msg'
    ],

    USER_REFERRAL: [
      'header_text',
      'app_sharing_error',
      'hey_msg',
      'use_referral_msg',
      'as_cashback',
      'download_now',
      'refer_subject',
      'link_copied'
    ],

    PROMO_POPUP_SETTINGS: [
      'header_text',
      'product',
      'category',
      'brand',
      'search',
      'service',
      'refer_and_earn',
      'none',
      'enter_search_text',
      'search_text',
      'please_enter_valid_data',
      'upload_banner_msg',
      'data_saved_msg'
    ],

    BANNER_LINKING_MODAL: [
      'search_placeholder',
      'product',
      'category',
      'subcategory',
      'brand',
      'search',
      'service',
      'refer_and_earn',
      'none'
    ],

    PROMO_POPUP: [
      'product',
      'category',
      'brand',
      'search',
      'service',
      'refer_and_earn',
      'none',
      'membership'
    ],

    BANNER_SETTINGS: [
      'header_text',
      'product',
      'category',
      'subcategory',
      'brand',
      'banner',
      'search',
      'service',
      'refer_and_earn',
      'none',
      'enter_search_text',
      'search_text',
      'please_enter_valid_data',
      'upload_banner_msg',
      'data_saved_msg',
      'membership'
    ],

    PROMO_VIDEO_SETTINGS: [
      'header_text',
      'upload_thumbnail_msg',
      'add_video_id_msg',
      'data_saved_msg',
    ],

    SELECT_POLICY: [
      'header_text',
      'terms_conditions',
      'privacy_policy',
      'cancellation_policy',
      'refund_policy',
      'shipping_delivery',
      'no_content'
    ],

    ABOUT_US: [
      'header_text'
    ],

    UPI_MANUAL_PAYMENT: [
      'header_text'
    ],

    WALLET_TRANSACTIONS_MODAL: [
      'loading_more_transactions'
    ],

    RATE_PRODUCT: [
      "review_placeholder",
      "thanks_for_rating",
      "product_cant_review",
      "product_already_reviewed",
      'enter_public_name'
    ],

    RATE_ORDER: [
      "thanks_for_rating"
    ],

    ALL_RATINGS: [
      'loading_more_ratings'
    ],

    ADD_REGION: [
      'header_text',
      'add_region_name_msg',
      'region_saved_msg'
    ],

    ALL_REGIONS: [
      'header_text',
      'region_deleted'
    ],

    REGION_MODAL: [
      'enter_pincode'
    ],

    RATING_CO: [
      'review_placeholder'
    ],

    ADD_VENDOR: [
      'header_text_1',
      'header_text_2',
      'vendor_saved_msg',
      'add_vendor_name_msg'
    ],

    ALL_VENDORS: [
      'header_text',
      'vendor_deleted'
    ],

    ADD_FILTER: [
      'header_text_1',
      'header_text_2',
      'add_filter_name_msg',
      'add_filter_values_msg',
      'filter_saved_msg'
    ],

    ALL_FILTERS: [
      'header_text',
      'filter_deleted'
    ],

    SELECT_FILTERS: [
      'header_text',
    ],

    MEMBERSHIP_SETTINGS: [
      'header_text',
      'membership_data_saved',
      'plan_details',
      'no_of_months',
      'enter_price',
      'enter_discounted_price',
      'discounted_price_greater'
    ],

    MEMBERSHIP: [
      'header_text',
      'membership_added_to_cart',
      'reselect_plan',
      'go_to_cart'
    ],

    TABS: [
      'exit_app_msg'
    ],

    RESALE_ORDER: [
      'invalid_price_alert_msg',
      'order_created_msg'
    ],

    SHARED: [
      'please_wait',
      'ok',
      'admin_not_place_order_msg',
      'delivery_agent_not_place_order',
      'max_quantity_reach_msg',
      'item_added_to_wishlist_msg',
      'item_removed_from_wishlist_msg',
      'must_be_user_to_use_wishlisht_msg',
      'admin_no_cart_available_msg',
      'delivery_agent_no_cart_available_msg',
      'cancel',
      'delete',
      'delete_sure_alert_msg',
      'image_actionsheet_header_text',
      'camera',
      'gallery',
      'crop_and_upload_from_gallery',
      'multiple_images_from_gallery',
      'pull_to_refresh',
      'placed',
      'rejected',
      'confirmed',
      'cancelled',
      'dispatched',
      'delivered',
      'returned',
      'payment_modes',
      'cash_on_delivery',
      'paytm',
      'credit_debit_cards',
      'wallets',
      'upi',
      'netbanking',
      'pc',
      'save',
      'edit',
      'add_new',
      'add',
      'payment_failed',
      'login_as_user_msg',
      'please_fill_all_the_details',
      'status_changed',
      'select_region',
      'select_vendor',
      'select_filters',
      'some_issue'
    ]
  };
  constructor(public translateService: TranslateService,
              private logglyService: LogglyLoggerService) { }
  intializeSubscriptions() {
    this.intialiseTranslateService();
  }
  async intialiseTranslateService() {
    try {
      const pages = Object.keys(this.keys);
      for (const page of pages) {
        const pageJson = {};
        for (const key of this.keys[page]) {
          this.translateService.get(`${page}.${key}`).subscribe(value => {
            pageJson[key] = value;
        });
        }
        this.labels[page] = pageJson;
      }
    } catch (error) {
      error['location'] = 'label-service:intialiseTranslateService'; 
      this.logglyService.log(error);
    }

  }
}
