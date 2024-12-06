import 'dart:async';
import 'dart:convert';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:shein/providers/cartProvider.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DatabaseService {
  final db = FirebaseFirestore.instance;

  Future checkUser(uid) async {
    return db.collection('users').doc(uid).get();
  }

  Future<String> addToCart(String uid, dynamic cartData) async {
    return await db
        .collection('users')
        .doc(uid)
        .collection('cart')
        .add(cartData)
        .then((value) => value.id);
  }

  Future<void> updateCartItemQuantity(uid, cartId, newQuantity) async {
    await db
        .collection('users')
        .doc(uid)
        .collection('cart')
        .doc(cartId)
        .update({"quantity": newQuantity});
  }

  Future<void> deleteFromCart(String uid, dynamic cartDocId) async {
    await db
        .collection('users')
        .doc(uid)
        .collection('cart')
        .doc(cartDocId)
        .delete();
  }

  Future<dynamic> getUserCartDetails(uid) async {
    return await db
        .collection('users')
        .doc(uid)
        .collection('cart')
        .get()
        .then((value) {
      if (value.docs.isNotEmpty) {
        var arr = [];
        for (var cartItem in value.docs) {
          var data = cartItem.data();
          var id = cartItem.id;
          arr.add({...data, "id": id});
        }
        return arr;
      } else {
        return [];
      }
    });
  }

  Future<dynamic> userDataFetch(String uid) async {
    return await db.collection("users").doc(uid).get().then((value) {
      if (value.exists) {
        var data = value.data();
        if (data != null) {
          return {
            ...data,
            "id": value.id,
          };
        }
      } else {
        return null;
      }
    });
  }

  Future<dynamic> addUserToDb(String uid, dynamic userData) async {
    return await db
        .collection('users')
        .doc(uid)
        .set(userData, SetOptions(merge: true))
        .then((value) {
      return true;
    });
  }

  Future<dynamic> getHomeWidgetData() async {
    return await db.collection('widgets').doc('home').get().then((value) {
      return value.data();
    });
  }

  Future<dynamic> getService(String serviceId) async {
    return await db.collection('services').doc(serviceId).get().then((value) {
      if (value.exists) {
        dynamic data = value.data();
        return {...data, "id": value.id};
      }
    });
  }

  Future<dynamic> fetchServices() async {
    return await db
        .collection('services')
        .where('active', isEqualTo: true)
        .get()
        .then((value) {
      if (value.docs.isNotEmpty) {
        var arr = [];
        for (var element in value.docs) {
          arr.add({...element.data(), "id": element.id});
        }
        return arr;
      } else {
        return [];
      }
    });
  }

  Future<dynamic> fetchCategories() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var regionId = prefs.get('region');
    print('Region id : $regionId');
    print('ascas');
    if (regionId != null) {
      return await db
          .collection('categories')
          .where('status', isEqualTo: true)
          .where('regionId', arrayContains: regionId.toString().trim())
          .orderBy('sortedAt', descending: true)
          .get()
          .then((value) {
        if (value.docs.isNotEmpty) {
          var arr = [];
          for (var element in value.docs) {
            arr.add({...element.data(), "id": element.id});
          }
          return arr;
        } else {
          return [];
        }
      });
    } else {
      return await db
          .collection('categories')
          .where('status', isEqualTo: true)
          .orderBy('sortedAt', descending: true)
          .get()
          .then((value) {
        if (value.docs.isNotEmpty) {
          var arr = [];
          for (var element in value.docs) {
            arr.add({...element.data(), "id": element.id});
          }
          return arr;
        } else {
          return [];
        }
      });
    }
  }

  Future<List<Map<String, dynamic>>> getAddons() async {
    return await db.collection('addOns').get().then((value) {
      if (value.docs.isNotEmpty) {
        List<Map<String, dynamic>> arr = [];
        for (var element in value.docs) {
          arr.add({...element.data(), "id": element.id});
        }
        return arr;
      }
      return [];
    });
  }

  Future<String> createBooking(dynamic bookingData) async {
    return await db.collection("bookings").add(bookingData).then((value) {
      if (value.id != "") {
        return value.id.toString();
      } else {
        return "";
      }
    });
  }

  Future<bool> updateService(String serviceId, dynamic schedule) async {
    return await db
        .collection("services")
        .doc(serviceId)
        .set({"schedule": schedule}, SetOptions(merge: true))
        .then((value) => true)
        .catchError(() => false);
  }

  Future<dynamic> getUserBookings() async {
    final prefs = await SharedPreferences.getInstance();
    if (prefs.get('uid') != null) {
      return await db
          .collection('bookings')
          .where("uid", isEqualTo: prefs.get('uid'))
          .orderBy('createdAt', descending: true)
          .get()
          .then((value) {
        if (value.docs.isNotEmpty) {
          var arr = [];
          for (var element in value.docs) {
            arr.add({...element.data(), "id": element.id});
          }
          return arr;
        } else {
          return [];
        }
      });
    } else {
      return [];
    }
  }

  Future<void> cancelBookingStatus(docId, paymentMode) async {
    await db.collection("bookings").doc(docId).set({
      "status": "Failed",
      "payment": {
        "mode": paymentMode,
        "status": "failed",
      },
    });
  }

  Future<dynamic> fetchSingleProduct(prodId) async {
    return await db.collection('products').doc(prodId).get().then((value) {
      if (value.exists) {
        if (value['isPriceList']) {
          return {...?value.data(), "id": value.id};
        } else {
          var priceList = [
            {
              "discountedPrice": value.data()?['discountedPrice'],
              "inventory_item_id": "",
              "price": value.data()?['prodPrice'],
              "purchasePrice": value.data()?['discountedPrice'],
              "shippingWeight": value.data()?['shippingWeight'] ?? 0,
              "totalQuantity": value.data()?['productQty'],
              "weight": value.data()?[''],
            }
          ];

          return {
            ...?value.data(),
            'isPriceList': true,
            "priceList": priceList,
            "id": value.id
          };
        }
      }
    });
  }

  Future<dynamic> fetchProducts(catId) async {
    var res = await db
        .collection('products')
        .where('categories', arrayContains: catId)
        .where('status', isEqualTo: true)
        .orderBy('sortedAt', descending: true)
        .get()
        .then((QuerySnapshot querySnapshot) {

          print("QUERY ${querySnapshot.docs.length}");
      List<DocumentSnapshot> matchingDocuments = [];
      if (querySnapshot.docs.isNotEmpty) {
        print("QUERY ${querySnapshot.docs}");
        for (QueryDocumentSnapshot documentSnapshot in querySnapshot.docs) {
          // Check if the document satisfies the second condition
          matchingDocuments.add(documentSnapshot);
        }
        var arr = [];
        for (DocumentSnapshot documentSnapshot in matchingDocuments) {
          dynamic res = documentSnapshot.data();
          if (res['isPriceList']) {
            arr.add({...res, "id": documentSnapshot.id});
          } else {
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
              ...res,
              'isPriceList': true,
              "priceList": priceList,
              "id": documentSnapshot.id
            });

            // print(priceList);
            print(arr[0][priceList]);
          }
        }
        return arr;
      }
    });
    return res;
  }

  Future<dynamic> fetchSubCategories(catId) async {
    var res = await db
        .collection('categories')
        .doc(catId)
        .collection('subcategories')
        .orderBy('sortedAt', descending: true)
        .get()
        .then((QuerySnapshot querySnapshot) {
      if (querySnapshot.docs.isNotEmpty) {
        print(querySnapshot.docs.length);
        List<dynamic> arr = [];
        for (QueryDocumentSnapshot documentSnapshot in querySnapshot.docs) {
          dynamic data = documentSnapshot.data();
          arr.add({"id": documentSnapshot.id, ...data});
        }
        return arr;
      }
    });
    return res;
  }

Future<dynamic> fetchSubSubCategories(String docId) async {
  var res = await db
      .collection('categories')
      .doc(docId)
      .collection('subcategories')
      .orderBy('sortedAt', descending: true)
      .get()
      .then((QuerySnapshot querySnapshot) {
    if (querySnapshot.docs.isNotEmpty) {
      List<dynamic> arr = [];
      for (QueryDocumentSnapshot documentSnapshot in querySnapshot.docs) {
        dynamic data = documentSnapshot.data();
        arr.add({"id": documentSnapshot.id, ...data});
      }
      return arr;
    }
  });
  return res;
}




  Future<String> addAddressToUser(address) async {
    var res = await db
        .collection('users')
        .doc(FirebaseAuth.instance.currentUser?.uid)
        .collection("addresses")
        .add(address)
        .then((value) => value.id);
    return res ?? '';
  }

  Future<String> updateAddressOfUser(address) async {
    var docId = address['id'];

    var res = await db
        .collection('users')
        .doc(FirebaseAuth.instance.currentUser?.uid)
        .collection("addresses")
        .doc(docId)
        .set(address)
        .then(
      (value) {
        return "DONE";
      },
    );
    return res ?? '';
  }

  Future<dynamic> updateDefaultAddress(address) async {
    var res = await db
        .collection('users')
        .doc(FirebaseAuth.instance.currentUser?.uid)
        .update({"defaultAddress": address});
    return res;
  }

  Future<dynamic> getUserAddresses() async {
    var uid = FirebaseAuth.instance.currentUser?.uid;
    if (uid != null) {
      var res = await db
          .collection('users')
          .doc(uid)
          .collection('addresses')
          .get()
          .then((value) {
        if (value.docs.isNotEmpty) {
          var arr = [];
          for (var doc in value.docs) {
            var data = doc.data();
            var id = doc.id;
            arr.add({...data, "id": id});
          }
          return arr;
        } else {
          return [];
        }
      });
      return res;
    } else {
      return [];
    }
  }

  Future<bool> getGstAppilicableInfo() async {
    var res = await db.collection('payment').doc('info').get().then((value) {
      var data = value.data();
      return data?['isGstApplicable'];
    });
    return res;
  }

  bool checkPdtStock(pdt) {
    bool isOutOfStock = false;
    if (!pdt.containsKey('isPriceList')) {
      if (pdt['productQty'] == '0' && pdt['stopWhenNoQty']) {
        isOutOfStock = true;
      }
    } else {
      if (pdt['stopWhenNoQty']) {
        for (final pl in pdt['priceList']) {
          if (pl['totalQuantity'] != '0') {
            isOutOfStock = false;
            break;
          } else {
            isOutOfStock = true;
            return true;
          }
        }
      }
    }
    return isOutOfStock;
  }

  bool checkPdtVariantStock(pdt, priceListIndex) {
    bool isOutOfStock = false;
    if (!pdt.containsKey('isPriceList')) {
      if (pdt['productQty'] == '0' && pdt['stopWhenNoQty']) {
        isOutOfStock = true;
      }
    } else {
      if (pdt['stopWhenNoQty']) {
        if (pdt['priceList'][priceListIndex]['totalQuantity'] != "0") {
          isOutOfStock = false;
        } else {
          isOutOfStock = true;
        }
      }
    }
    return isOutOfStock;
  }

  Future<void> getCartFromLocalStorage(context) {
    print('getting cart data from LS');
    Completer<void> completer = Completer<void>();

    SharedPreferences.getInstance().then((prefs) {
      if (prefs.get('cart') != null) {
        print('getting cart data from LS ${prefs.get('cart')}');
        Provider.of<Cart>(context, listen: false).addToCartFromLocalStorage(
            jsonDecode(prefs.get('cart').toString()));
      } else {
        Provider.of<Cart>(context, listen: false).clearCartBeforeFetching();
      }
      completer.complete();
    }).catchError((error) {
      completer.completeError(error);
    });

    return completer.future;
  }

  Future<void> getCartFromFirebase(uid, context) async {
    print('gettting cart data from FB');
    var cartData = await DatabaseService().getUserCartDetails(uid);
    print('gettting cart data from FB $cartData');
    Provider.of<Cart>(context, listen: false)
        .addToCartFromLocalStorage(cartData);
  }

  getCartDetails(context) async {
    // await Provider.of<Cart>(context, listen: false).clearCartBeforeFetching();
    // await DynamicLinkProvider().createLink('1234567890','TYPE');
    await getCartFromLocalStorage(context);
    if (FirebaseAuth.instance.currentUser?.uid != null) {
      await getCartFromFirebase(
          FirebaseAuth.instance.currentUser?.uid, context);
    }
  }

  getWalletStatus() async {
    var res = await FirebaseFirestore.instance
        .collection('settings')
        .doc('wallet')
        .get()
        .then((value) {
      var data = value.data();
      return data?['active'];
    });

    return res;
    // setState(() {
    //   isWalletActive = res;
    // });
  }
}
