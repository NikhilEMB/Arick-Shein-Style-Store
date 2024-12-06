import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:iconsax/iconsax.dart';
import 'package:package_info/package_info.dart';

class Constants {
  List<dynamic> sidebarDrawer = [
    // {
    //   "name": "Home",
    //   "path": "/home",
    //   "icon": Icons.home_outlined,
    //   "isExpandable": false,
    //   'type': 'link'
    // },
    // {
    //   "name": "Chat",
    //   "path": "/chat",
    //   "icon": Icons.chat_bubble_outline,
    //   "isExpandable": false,
    //   'type': 'link'
    // },
    // {
    //   "name": "Categories",
    //   "path": "/categories",
    //   "icon": Icons.dashboard_outlined,
    //   "isExpandable": true,
    //   "expandFor": "categories",
    //   'type': 'link'
    // },
    // {
    //   "name": "Offers",
    //   "path": "/offers",
    //   "icon": Icons.card_giftcard,
    //   "isExpandable": false,
    //   'type': 'link'
    // },
    // {
    //   "name": "All Live Streams",
    //   "path": "/liveStreams",
    //   "icon": Icons.shopping_bag,
    //   "isExpandable": false,
    //   'type': 'link'
    // },
    // {
    //   "name": "Language Settings",
    //   "path": "/languageSettings",
    //   "icon": Icons.settings,
    //   "isExpandable": false,
    //   'type': 'link'
    // },

    // {
    //   "name": "My Appointments",
    //   "path": "/appointments",
    //   "icon": Icons.shopping_bag,
    //   "isExpandable": false,
    //   'type': 'phone'
    // },
    {
      "name": "Profile Info",
      "path": "/myprofile",
      "icon": Iconsax.user_octagon4,
      "isExpandable": false,
      'type': 'link',
      "suffixicon": Icons.arrow_forward_ios,
    },
    {
      "name": "My Wishlist",
      "path": "/wishlist",
      "icon": Iconsax.heart,
      "isExpandable": false,
      'type': 'phone',
      "suffixicon": Icons.arrow_forward_ios,
    },
    {
      "name": "My Orders",
      "path": "/myOrders",
      "icon": Iconsax.shopping_bag,
      "isExpandable": false,
      'type': 'phone',
      "suffixicon": Icons.arrow_forward_ios,
    },
    {
      "name": "My Points",
      "path": "/myPoints",
      "icon": Iconsax.money_recive4,
      "isExpandable": false,
      'type': 'phone',
      "suffixicon": Icons.arrow_forward_ios,
    },
    {
      "name": "Refer & Earn",
      "path": "/referEarn",
      "icon": Iconsax.star_1,
      "isExpandable": false,
      'type': 'share',
      "suffixicon": Icons.arrow_forward_ios,
      
    },
    {
      "name": "My Addresses", 
      "path": "/myaddress",
      "icon": Iconsax.location,
      "isExpandable": false,
      'type': 'phone',
      "suffixicon": Icons.arrow_forward_ios,
    },
    // {
    //   "name": "Payment Method",
    //   "path": "/wallet",
    //   "icon": Icons.payments_outlined,
    //   "isExpandable": false,
    //   'type': 'wallet',
    //   "suffixicon": Icons.arrow_forward_ios,
    // },
    // {
    //   "name": "Call shein",
    //   "path": "/",
    //   "icon": Icons.phone_outlined,
    //   "isExpandable": false,
    //   'type': 'phone'
    // },

    // {
    //   "name": "About us",
    //   "path": "/aboutUs",
    //   "icon": Icons.newspaper_outlined,
    //   "isExpandable": false,
    //   'type': 'link'
    // },
    // {
    //   "name": "Contact us",
    //   "path": "/contactUs",
    //   "icon": Icons.newspaper_outlined,
    //   "isExpandable": false,
    //   'type': 'link'
    // },

    
    {
      "name": "Terms & Policies",
      "path": "/terms&policies",
      "icon": Iconsax.document_text,
      "isExpandable": false,
      'type': 'link',
      "suffixicon": Icons.arrow_forward_ios,
    },
    {
      "name": "",
      "type": "social",
      "socialLinks": [
        {
          "link": "www.facebook.com/organic-tap",
          "icon": Icons.facebook,
        },
        {
          "link": "www.instagram.com/organic-tap",
          "icon": Icons.install_desktop,
        },
        {
          "link": "www.youtube.com/organic-tap",
          "icon": Icons.youtube_searched_for,
        },
        {
          "link": "www.whatsapp.com/organic-tap",
          "icon": Icons.whatshot,
        },
      ]
    }
  ];

  dynamic rupees = "Rs";

  Future<String> getAppVersion() async {
    PackageInfo packageInfo = await PackageInfo.fromPlatform();
    String appVersion = packageInfo.version;
    return appVersion;
  }
}

var uid = FirebaseAuth.instance.currentUser!.uid;
