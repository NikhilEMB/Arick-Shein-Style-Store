import 'dart:ui' as ui;

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:device_info_plus/device_info_plus.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomeData with ChangeNotifier {
  FirebaseFirestore db = FirebaseFirestore.instance;
  List<dynamic> homeData = [];
  List<dynamic> homeListData = [];
  bool isLoading = false;
  bool isCategoryLoading = false;
  bool isVendorsLoading = false;
  bool isTablet = false;

  Future<bool> checkIsTablet(context) async {
    DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
    bool isPhysicalTablet = false;

    try {
      if (Theme.of(context).platform == TargetPlatform.iOS) {
        // For iOS
        IosDeviceInfo iosInfo = await deviceInfo.iosInfo;
        if (iosInfo.model != null) {
          isPhysicalTablet = iosInfo.model!.contains('iPad');
        }
      } else if (Theme.of(context).platform == TargetPlatform.android) {
        // For Android
        AndroidDeviceInfo androidInfo = await deviceInfo.androidInfo;
        double physicalSize =
            ui.window.physicalSize.width / ui.window.devicePixelRatio;

        isPhysicalTablet = androidInfo.isPhysicalDevice && physicalSize >= 600;
      }
    } catch (e) {
      // Handle any errors
    }

    isTablet = isPhysicalTablet;
    notifyListeners();
    return isPhysicalTablet;
  }

  fetchBannerSliders(section) async {
    await FirebaseFirestore.instance
        .collection('widgets')
        .doc(section['widgetID'])
        .collection('slides')
        .where('active', isEqualTo: true)
        .get()
        .then((value) {
      if (value.docs.isNotEmpty) {
        var arr = [];
        for (var element in value.docs) {
          arr.add({...element.data(), "id": element.id});
        }
        homeListData.add({
          "data": arr,
          "id": section['widgetID'],
        });
        notifyListeners();
      }
    });
  }

  fetchImageBanner(section) async {
    var res = await FirebaseFirestore.instance
        .collection('widgets')
        .doc(section['widgetID'])
        .collection('slides')
        .where('active', isEqualTo: true)
        .get();
    if (res.docs.isNotEmpty) {
      var arr = [];
      // dynamic data = res.docs[0].data();
      for (var element in res.docs) {
        arr.add(element.data());
      }
      homeListData.add({
        'data': arr,
        "id": section['widgetID'],
      });
      notifyListeners();
    } else {
      homeListData.add({
        'data': null,
        "id": section['widgetID'],
      });
      notifyListeners();
    }
  }

  fetchProductCarousel(section, regionId) async {
    Query<Map<String, dynamic>> q;
    q = FirebaseFirestore.instance
        .collection('widgets')
        .doc(section['widgetID'])
        .collection('products')
        .where('data.status', isEqualTo: true)
        .orderBy('sortedAt', descending: true);

    await q.get().then((value) {
      if (value.docs.isNotEmpty) {
        var arr = [];
        print("products not found");

        for (var element in value.docs) {
          print("products not founds");

          var res =
              element.data().containsKey('data') ? element['data'] : element;
          if (res.containsKey('isPriceList') && res['isPriceList']) {
            print("products not foundss");

            arr.add({...element.data(), "id": element.id});
          } else {
            // var res =
            //     element.data().containsKey('data') ? element['data'] : element;
            var priceList = [
              {
                "discountedPrice": res['discountedPrice'],
                "inventory_item_id": "",
                "price": res['prodPrice'],
                "purchasePrice": res['discountedPrice'],
                "shippingWeight": res['shippingWeight'] ?? 0,
                "totalQuantity": res['productQty'],
                "weight": res['prodName'],
              }
            ];
            arr.add({
              ...element.data(),
              "data": {
                ...element['data'],
                'isPriceList': true,
                "priceList": priceList,
                "id": element.id
              }
            });
            print("products not foundsssssss");
          }
        }
        print("products$arr");
        homeListData.add({
          'data': arr,
          "id": section['widgetID'],
        });
        notifyListeners();
      } else {
        print("products not found");

        homeListData.add({
          'data': null,
          "id": section['widgetID'],
        });
        notifyListeners();
      }
    });
  }

fetchCategories(section, regionId) async {
  isCategoryLoading = true;
  notifyListeners();
  
  var categoryIdsList = await FirebaseFirestore.instance
      .collection('widgets')
      .doc(section['widgetID'])
      .get()
      .then((value) {
    if (value.exists) {
      return value.data()?['categoryList'];
    }
  });

  var arr = [];
  var limit = 6; // Set your desired limit

  // Iterate over the first 6 categoryIds
  for (var catId in categoryIdsList.take(limit)) {
    await FirebaseFirestore.instance
        .collection("categories")
        .doc(catId)
        .get()
        .then((value) {
      if (value.exists) {
        if (value.data()?['status'] == true) {
          dynamic data = value.data();
          arr.add({...data, 'id': catId});
        }
      }
    });
  }

  homeListData.add({
    'data': arr,
    "id": section['widgetID'],
  });

  isCategoryLoading = false;
  notifyListeners();
}

  fetchVendors(section, regionId) async {
    isVendorsLoading = true;
    var categoryIdsList = await FirebaseFirestore.instance
        .collection('widgets')
        .doc(section['widgetID'])
        .get()
        .then((value) {
      if (value.exists) {
        return value.data()?['vendorsList'];
      }
    });
    var arr = [];
    for (var catId in categoryIdsList) {
      await FirebaseFirestore.instance
          .collection("features")
          .doc("multiVendor")
          .collection("vendors")
          .doc(catId)
          .get()
          .then((value) {
        if (value.exists) {
          dynamic data = value.data();
          arr.add({...data, "id": catId});
        }
      });
    }

    homeListData.add({
      "data": arr,
      "id": section['widgetID'],
    });
    isVendorsLoading = false;
    notifyListeners();
  }

  fetchTextBlock(section, regionId) async {
    var res = await FirebaseFirestore.instance
        .collection("widgets")
        .doc(section['widgetID'])
        .get()
        .then((value) => value.data());
    homeListData.add({
      'data': res,
      "id": section['widgetID'],
    });
    notifyListeners();
  }

  fetchProductList(section, regionId) async {
    await FirebaseFirestore.instance
        .collection('widgets')
        .doc(section['widgetID'])
        .collection('products')
        .orderBy('sortedAt', descending: true)
        .get()
        .then((value) {
      if (value.docs.isNotEmpty) {
        var arr = [];
        for (var element in value.docs) {
          if (element['isPriceList']) {
            arr.add({...element.data(), "id": element.id});
          } else {
            var priceList = [
              {
                "discountedPrice": element['discountedPrice'],
                "inventory_item_id": "",
                "price": element['prodPrice'],
                "purchasePrice": element['discountedPrice'],
                "shippingWeight": element['shippingWeight'] ?? 0,
                "totalQuantity": element['productQty'],
                "weight": element['prodName'],
              }
            ];
            arr.add({
              ...element.data(),
              'isPriceList': true,
              "priceList": priceList,
              "id": element.id
            });
          }
        }
        homeListData.add({
          'data': arr,
          "id": section['widgetID'],
        });
        notifyListeners();
      } else {
        homeListData.add({
          'data': null,
          "id": section['widgetID'],
        });
        notifyListeners();
      }
    });
  }

  fetchImageBlock(section, regionId) async {
    var res = await FirebaseFirestore.instance
        .collection("widgets")
        .doc(section['widgetID'])
        .get()
        .then((value) => value.data());
    homeListData.add({
      'data': res,
      "id": section['widgetID'],
    });
    notifyListeners();
  }

  fetchVideoBlock(section, regionId) async {
    var res = await FirebaseFirestore.instance
        .collection("widgets")
        .doc(section['widgetID'])
        .get()
        .then((value) => value.data());
    homeListData.add({
      'data': res,
      "id": section['widgetID'],
    });
    notifyListeners();
  }

  Future<void> fetchHomeData() async {
    homeData = [];
    homeListData = [];
    isLoading = true;
    notifyListeners();

    final prefs = await SharedPreferences.getInstance();
    dynamic regionId = prefs.get('region');
    // List<dynamic> homeList = [];

    dynamic data =
        await db.collection('pages').doc('homepage').get().then((value) {
      return value.data()?['sections'];
      // homeList = res;
    });

    homeData = data;
    isLoading = false;
    notifyListeners();

    // print(homeData.where((element) => element['regionId']?.contains(regionId)).toList());
    for (var section in homeData) {
      if (section['location'] == "all" ||
          section['location'] == "app" ||
          section['location'] == "flutter-app") {
        switch (section['widgetType']) {
          case "banner-slider":
            fetchBannerSliders(section);
            break;
          case "image-banner":
            fetchImageBanner(section);
            break;
          case "product-carousel":
            fetchProductCarousel(section, regionId);
            break;
          case "categories":
            fetchCategories(section, regionId);
            break;
          case "vendors":
            fetchVendors(section, regionId);
            break;
          case "text-block":
            fetchTextBlock(section, regionId);
            break;
          case "product-list":
            fetchProductList(section, regionId);
            break;
          case "image-block":
            fetchImageBlock(section, regionId);
            break;
          case "video-block":
            fetchVideoBlock(section, regionId);
          
            break;
          default:
        }
      }
    }
  }
}
