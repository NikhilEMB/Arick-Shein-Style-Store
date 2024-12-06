import 'dart:async';
import 'dart:convert';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:shein/utils/databaseServices.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Cart with ChangeNotifier {
  List<Map<String, dynamic>> cart = [];

  void addToCartFromLocalStorage(cartData) async {
    cart = [];
    final prefs = await SharedPreferences.getInstance();
    cart = [...cart, ...cartData];
    notifyListeners();
    await prefs.setString(
      'cart',
      jsonEncode(cart),
    );
  }

  Future<void> clearCartBeforeFetching() async {
    Completer<void> completer = Completer<void>();
    cart = [];
    notifyListeners();
    completer.complete();
  }

  Future<void> addToCart({product, priceListIndex, quantity, productId}) async {
    final prefs = await SharedPreferences.getInstance();
    if (FirebaseAuth.instance.currentUser?.uid == null) {
      var obj = getPriceListCartObj(product, priceListIndex,
          quantity: quantity, productId: productId);
      cart.add(obj);
      notifyListeners();
      // cart = [...cart, cartData];
      // notifyListeners();
      await prefs.setString(
        'cart',
        jsonEncode(cart),
      );
    } else {
      print('INSIDE ELSE CONDITION');

      var obj = getPriceListCartObj(product, priceListIndex,
          quantity: quantity, productId: productId);

      var docId = await DatabaseService()
          .addToCart(FirebaseAuth.instance.currentUser!.uid, obj);

      cart.add({...obj, "id": docId});
      notifyListeners();
      // cart = [...cart, cartData];
      // notifyListeners();

      print('Added TO Cart');
    }
  }

  String getTotalCartAmount() {
    if (cart.isNotEmpty) {
      dynamic totalAmount = cart
          .map((item) =>
              item['price'] *
              item['quantity']) // Extract the price from each cart item
          .reduce((sum, price) => sum + price);
      return totalAmount.toDouble().toString();
    }
    return "";
  }

  void removeItemFromCart({index, docId = ""}) async {
    final prefs = await SharedPreferences.getInstance();

    if (FirebaseAuth.instance.currentUser?.uid == null) {
      cart.removeAt(index);
      notifyListeners();
      await prefs.setString(
        'cart',
        jsonEncode(cart),
      );
    } else {
      var cartItemData = cart[index];
      cart.removeAt(index);
      notifyListeners();
      if (cartItemData.containsKey('id')) {
        await DatabaseService().deleteFromCart(
            FirebaseAuth.instance.currentUser!.uid, cartItemData['id']);
      }
    }
  }

  updateCartItemQuantity({type, index}) async {
    final prefs = await SharedPreferences.getInstance();

    if (FirebaseAuth.instance.currentUser?.uid == null) {
      List<Map<String, dynamic>> newCart = cart;
      newCart[index] = {
        ...newCart[index],
        "quantity": type == "inc"
            ? cart[index]['quantity'] + 1
            : cart[index]['quantity'] - 1,
      };
      cart = newCart;
      await prefs.setString(
        'cart',
        jsonEncode(cart),
      );
      notifyListeners();
    } else {
      List<Map<String, dynamic>> newCart = cart;

      var currentQty = cart[index]['quantity'];
      newCart[index] = {
        ...newCart[index],
        "quantity": type == "inc" ? currentQty + 1 : currentQty - 1,
      };
      cart = newCart;

      notifyListeners();
      if (cart[index].containsKey('id')) {
        await DatabaseService().updateCartItemQuantity(
            FirebaseAuth.instance.currentUser!.uid,
            cart[index]['id'],
            type == "inc" ? currentQty + 1 : currentQty - 1);
      }
    }
  }

  Map<String, dynamic> getPriceListCartObj(dynamic product, int index,
      {int? quantity, productId = ''}) {
    // print(
    //     "IMAGE ${product.containsKey('coverImage') ? product['coverImage'].containsKey('thumb') ? product['coverImage']['thumb'] : product.containsKey('images') : '123456'}");

    print("CHECKING ID $productId");
    Map<String, dynamic> cartObj = {
      "carbonEmission": product.containsKey('carbonEmission')
          ? product['carbonEmission']
          : null,
      'name': product['prodName'],
      'quantity': quantity ?? 1,
      'img': product.containsKey('coverImage') &&
              product['coverImage'].containsKey('thumb')
          ? product['coverImage']['thumb']
          : product.containsKey('coverPic')
              ? product['coverPic']['thumb']
              : product.containsKey('images') && product['images'].length != 0
                  ? product['images'][0]['thumb']
                  : '',
      'description': product['priceList'][index]['weight'],
      'commentMsg': '',
      'commentImgs': [],
      'maxQty': product['maxQty'] ?? 1,
      'minQty': product['minQty'] ?? 1,
      'gst': product['gst'] ?? 0,
      'status': product.containsKey('status') ? product['status'] : true,
      'stopWhenNoQty': product.containsKey('stopWhenNoQty') &&
              product['stopWhenNoQty'] != null
          ? product['stopWhenNoQty']
          : false,
      'totalQty': product['priceList'][index]['totalQuantity'] ?? '',
      'hsn': product['hsnCode'] ?? '',
      'sku': (product['priceList'][index].containsKey('sku') &&
              product['priceList'][index]['sku'] != '')
          ? product['priceList'][index]['sku']
          : product['productCode'] ?? '',
      'barcode': product['priceList'][index]['barcode'] ?? '',
      'shippingWt': product['priceList'][index]['shippingWeight'] ?? 0,
      'barcodeNo': product['priceList'][index]['barcodeNo'] ?? '',
      'gstExclusive': product['gstExclusive'] ?? false,
      'extraCharges': (product.containsKey('extraCharges') &&
              product['extraCharges'] is Map &&
              product['extraCharges']['active'] == true)
          ? product['extraCharges']
          : {'charge': 0},
      'isCod': product.containsKey('isCod') ? product['isCod'] : true,
      'vendorId': product['vendorId'] ?? '',
      'priceSlabs': product.containsKey('priceSlabs')
          ? product['priceSlabs']
          : {'active': false},
      'templateId': product['templateId'] ?? '',
      'pack': {
        'weight': product['priceList'][index]['weight'],
        'variantType': product['variantType'] ?? 'variant',
      },
      'productId': productId
    };
    print("price list : ${product['priceList']}");
    if (product['isPriceList'] == false) {
      cartObj['pack'] = <String,
          dynamic>{}; // Set pack as an empty map with String keys and dynamic values
    }
    if (product['variantType'] != null && product['variantType'] == 'pieces') {
      if (product['priceList'][index]['discountedPrice'] != null &&
          product['priceList'][index]['discountedPrice'] !=
              product['priceList'][index]['price']) {
        cartObj['mrpPrice'] = product['priceList'][index]['price'] *
            int.parse(product['priceList'][index]['weight']);
        cartObj['price'] = product['priceList'][index]['discountedPrice'] *
            int.parse(product['priceList'][index]['weight']);
        cartObj['pack']['price'] = product['priceList'][index]
                ['discountedPrice'] *
            int.parse(product['priceList'][index]['weight']);
        cartObj['pack']['perPcPrice'] =
            product['priceList'][index]['discountedPrice'];
      } else {
        cartObj['price'] = product['priceList'][index]['price'] *
            int.parse(product['priceList'][index]['weight']);
        cartObj['pack']['price'] = product['priceList'][index]['price'] *
            int.parse(product['priceList'][index]['weight']);
        cartObj['pack']['perPcPrice'] = product['priceList'][index]['price'];
      }
    } else {
      if (product['priceList'][index]['discountedPrice'] != null &&
          product['priceList'][index]['discountedPrice'] !=
              product['priceList'][index]['price']) {
        cartObj['mrpPrice'] = product['priceList'][index]['price'];
        cartObj['price'] = product['priceList'][index]['discountedPrice'];
        cartObj['pack']['price'] =
            product['priceList'][index]['discountedPrice'];
      } else {
        cartObj['price'] = product['priceList'][index]['price'];
        cartObj['pack']['price'] = product['priceList'][index]['price'];
      }
    }

    if (product.containsKey('color') && product['color'].containsKey('name')) {
      cartObj['color'] = product['color'];
    }

    // if (product['parentProductId'] != null) {
    //   cartObj['parentProductId'] = product['parentProductId'];
    //   cartObj['productId'] = product['id'];
    // } else {
    //   cartObj['productId'] = product['id'];
    // }

    if (product['productType'] != null) {
      cartObj['orderType'] = product['productType'];
      switch (product['productType']) {
        case 'quotation':
          cartObj['price'] = 0;
          cartObj['mrpPrice'] = 0;
          cartObj['pack']['price'] = 0;
          break;
      }
    }
    return cartObj;
  }

  setUpdatedCart(updatedCart) {
    cart = updatedCart;
    notifyListeners();
  }

  checkIfProductIsInCart(productId) {
    var check = cart.any((element) => element['productId'] == productId);
    return check;
  }
}
