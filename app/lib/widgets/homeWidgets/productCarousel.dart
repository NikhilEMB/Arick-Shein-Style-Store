import 'dart:async';
import 'dart:math';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shein/providers/cartProvider.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/utils/addToCart.dart';
import 'package:shein/utils/databaseServices.dart';
import 'package:shein/widgets/loadingModal.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../screens/viewall/viewallscreen.dart';

class ProductCarousel extends StatefulWidget {
  final String title;
  final String widgetId;
  final dynamic size;
  final bool isProduct;
  final int index;
  final bool isHome;

  const ProductCarousel({
    super.key,
    required this.title,
    required this.widgetId,
    this.size,
    this.isHome = true,
    this.isProduct = false,
    required this.index,
  });

  @override
  State<ProductCarousel> createState() => _ProductCarouselState();
}

class _ProductCarouselState extends State<ProductCarousel> {
  dynamic products = [];

  // fetchProducts() async {
  //   await FirebaseFirestore.instance
  //       .collection('widgets')
  //       .doc(widget.widgetId)
  //       .collection('products')
  //       .orderBy('sortedAt', descending: true)
  //       .get()
  //       .then((value) {
  //     if (value.docs.isNotEmpty) {
  //       var arr = [];
  //       for (var element in value.docs) {
  //         arr.add({...element.data(), "id": element.id});
  //       }
  //       setState(() {
  //         products = arr;
  //       });
  //     } else {
  //       setState(() {
  //         products = null;
  //       });
  //     }
  //   });
  // }

  getProductsOnDemand() async {
    final prefs = await SharedPreferences.getInstance();

    dynamic q;
    if (prefs.get('region') != null) {
      q = FirebaseFirestore.instance
          .collection('widgets')
          .doc(widget.widgetId)
          .collection('products')
          .where('data.status', isEqualTo: true)
          .where('data.categoryRegions',
              arrayContains: prefs.get('region').toString().trim())
          .orderBy('sortedAt', descending: true);
    } else {
      q = FirebaseFirestore.instance
          .collection('widgets')
          .doc(widget.widgetId)
          .collection('products')
          .where('data.status', isEqualTo: true)
          .orderBy('sortedAt', descending: true);
    }
    return await q.get().then((value) {
      if (value.docs.isNotEmpty) {
        var arr = [];
        for (var element in value.docs) {
          arr.add({...element.data(), "id": element.id});
        }
        setState(() {
          products = arr;
        });
      } else {
        setState(() {
          products = [];
        });
      }
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    if (!widget.isHome) {
      getProductsOnDemand();
    }
    super.initState();
  }

  handleTap(prodId) {
    Navigator.of(context).pushNamed('/productInfo', arguments: {"id": prodId});
  }

  Future<void> handleAddItemClick(
      {product, priceListIndex, updateState}) async {
    // print('INSIDE ${product['data']['id']}');
    Completer<void> completer = Completer<void>();

    await CartService().addToCart(
        priceListIndex: priceListIndex,
        product: product['data'],
        context: context,
        productId: product['id'] ?? (product.containsKey('data')
                ? product['data'].containsKey('id')
                    ? product['data']['id']
                    : product['id']
                : product['id']));

    Fluttertoast.showToast(msg: 'Item added to bag.');
    updateState(() {});
    completer.complete();
    return completer.future;
  }

  handleAddToCart(product, Size size) async {
    bool checkIfProductIsInCart(index) {
      String productId = product['id'] ?? (product.containsKey('data')
              ? product['data'].containsKey('id')
                  ? product['data']['id']
                  : product['id']
              : product['id']);
      var check = Provider.of<Cart>(context, listen: false).cart.any(
          (element) =>
              element['productId'] == productId &&
              element['description'] ==
                  product['data']['priceList'][index]['weight']);
      return check;
    }

    // bool isProductInCart = false;

    getCartProductQuantity(index) {
      String productId = product['id'] ?? (product.containsKey('data')
              ? product['data'].containsKey('id')
                  ? product['data']['id']
                  : product['id']
              : product['id']);
      List<dynamic> check = Provider.of<Cart>(context, listen: false)
          .cart
          .where((element) =>
              element['productId'] == productId &&
              element['description'] ==
                  product['data']['priceList'][index]['weight'])
          .toList();

      return check.isEmpty ? 1 : check[0]['quantity'];
    }

    handleUpdateQuantity({type, product, updateState, priceListIndex}) {
      String productId = product['id'] ?? (product.containsKey('data')
              ? product['data'].containsKey('id')
                  ? product['data']['id']
                  : product['id']
              : product['id']);
      var index = Provider.of<Cart>(context, listen: false).cart.indexWhere(
          (item) =>
              item['productId'] == productId &&
              item['description'] ==
                  product['data']['priceList'][priceListIndex]['weight']);

      if (type == 'inc') {
        var quantity =
            Provider.of<Cart>(context, listen: false).cart[index]['quantity'];
        if (quantity + 1 <=
            int.parse(product["data"]['priceList'][priceListIndex]
                ['totalQuantity'])) {
          Provider.of<Cart>(context, listen: false)
              .updateCartItemQuantity(index: index, type: type);
        } else {
          Fluttertoast.showToast(msg: 'Can not add more of this item');
        }
      } else {
        var quantity =
            Provider.of<Cart>(context, listen: false).cart[index]['quantity'];
        if (quantity - 1 <= 0) {
          Provider.of<Cart>(context, listen: false)
              .removeItemFromCart(index: index);
          updateState(() {
            // isProductInCart = false;
          });
        } else {
          Provider.of<Cart>(context, listen: false)
              .updateCartItemQuantity(index: index, type: type);
        }
      }

      updateState(() {});
    }

    await showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setState) => Dialog(
          child: Container(
            width: size.width * 0.9,
            // height: size.width * 0.55,
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
            child: SingleChildScrollView(
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                          child: Text(
                        product['data']['prodName'],
                        style: const TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 16),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      )),
                      InkWell(
                        onTap: () => Navigator.pop(context),
                        child: Container(
                          padding: const EdgeInsets.all(2),
                          decoration: BoxDecoration(
                              color: const Color.fromARGB(255, 17, 17, 17),
                              borderRadius: BorderRadius.circular(100)),
                          child: const Icon(
                            Icons.close,
                            color: Colors.white,
                            size: 14,
                          ),
                        ),
                      )
                    ],
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  const Divider(
                    color: Colors.grey,
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  ...(product['data']['priceList'].asMap().entries.map((e) {
                    int index = e.key;
                    dynamic value = e.value;
                    return Container(
                      margin: const EdgeInsets.only(bottom: 10.0),
                      padding: const EdgeInsets.symmetric(vertical: 5),
                      child: Row(
                        children: [
                          Expanded(
                            child: SizedBox(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(value['weight']),
                                  const SizedBox(
                                    height: 10,
                                  ),
                                  value['discountedPrice'] != value['price']
                                      ? Text(
                                          "Rs ${value['price'].toString()}",
                                          style: const TextStyle(
                                            decoration:
                                                TextDecoration.lineThrough,
                                          ),
                                        )
                                      : const SizedBox(),
                                  SizedBox(
                                    width: value['discountedPrice'] !=
                                            value['price']
                                        ? 5
                                        : 0,
                                  ),
                                  Text(
                                    "Rs ${value['discountedPrice'].toString()}",
                                    style: TextStyle(
                                      color: AppTheme().secondaryColor,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          checkIfProductIsInCart(index)
                              ? SizedBox(
                                  child: Row(
                                    children: [
                                      InkWell(
                                        onTap: () => handleUpdateQuantity(
                                            type: 'dec',
                                            product: product,
                                            updateState: setState,
                                            priceListIndex: index),
                                        child: Container(
                                          decoration: BoxDecoration(
                                            borderRadius:
                                                BorderRadius.circular(2),
                                            color: AppTheme().secondaryColor,
                                          ),
                                          width: 25,
                                          height: 25,
                                          child: const Icon(
                                            Icons.remove,
                                            size: 16,
                                            color: Colors.white,
                                          ),
                                        ),
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 15),
                                        child: Text(
                                            getCartProductQuantity(index)
                                                .toString()),
                                      ),
                                      InkWell(
                                        onTap: () => handleUpdateQuantity(
                                            type: 'inc',
                                            product: product,
                                            updateState: setState,
                                            priceListIndex: index),
                                        child: Container(
                                          decoration: BoxDecoration(
                                            borderRadius:
                                                BorderRadius.circular(2),
                                            color: AppTheme().secondaryColor,
                                          ),
                                          width: 25,
                                          height: 25,
                                          child: const Icon(
                                            Icons.add,
                                            size: 16,
                                            color: Colors.white,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                )
                              : DatabaseService().checkPdtVariantStock(
                                      product.containsKey('data')
                                          ? product['data']
                                          : product,
                                      index)
                                  ? Container(
                                      height: 30,
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 5),
                                      decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(5),
                                          color: const Color.fromARGB(
                                              255, 224, 224, 224),
                                          boxShadow: const <BoxShadow>[
                                            BoxShadow(
                                                color: Color.fromARGB(
                                                    255, 222, 222, 222),
                                                blurRadius: 1,
                                                offset: Offset(0, 0),
                                                spreadRadius: 0.1),
                                          ]),
                                      child: const Center(
                                        child: Text(
                                          "Out of Stock",
                                          style: TextStyle(
                                              color: Colors.black,
                                              fontSize: 14),
                                        ),
                                      ),
                                    )
                                  : Container(
                                      height: 30,
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 5),
                                      decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(5),
                                          color: AppTheme().secondaryColor,
                                          boxShadow: const <BoxShadow>[
                                            BoxShadow(
                                                color: Color.fromARGB(
                                                    255, 67, 67, 67),
                                                blurRadius: 5,
                                                offset: Offset(0, 2),
                                                spreadRadius: 0.1),
                                          ]),
                                      child: TextButton(
                                          onPressed: () async {
                                            showDialog(
                                              barrierDismissible: false,
                                              context: context,
                                              builder: (context) =>
                                                  loader(context),
                                            );
                                            await handleAddItemClick(
                                              product: product,
                                              priceListIndex: index,
                                              updateState: setState,
                                            );
                                            Navigator.pop(context);
                                            setState(() {});
                                          },
                                          child: const Text(
                                            "Add Item +",
                                            style: TextStyle(
                                                color: Colors.white,
                                                fontSize: 14),
                                          )),
                                    )
                        ],
                      ),
                    );
                  })),
                  const SizedBox(
                    height: 10,
                  ),
                  const Divider(
                    color: Colors.grey,
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  InkWell(
                    onTap: () {
                      Navigator.pop(context);
                      Navigator.of(context).pushNamed('/cart');
                    },
                    child: Container(
                      height: 30,
                      width: size.width * 0.3,
                      padding: const EdgeInsets.symmetric(horizontal: 7),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(100),
                        border: Border.all(
                            color: AppTheme().secondaryColor, width: 1),
                      ),
                      child: Center(
                        child: Text(
                          'Go to Bag',
                          style: TextStyle(color: AppTheme().secondaryColor),
                        ),
                      ),
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    var homeData = Provider.of<HomeData>(context);

    if (widget.isHome &&
        homeData.homeListData
            .where((e) => e['id'] == widget.widgetId)
            .toList()
            .isEmpty) {
      return const SizedBox();
    }

    if (widget.isHome &&
        homeData.homeListData
                .where((e) => e['id'] == widget.widgetId)
                .toList()[0]['data'] ==
            null) {
      return const SizedBox();
    }

    if (!widget.isHome && products.isEmpty) {
      return const SizedBox();
    }

    dynamic data = widget.isHome
        ? homeData.homeListData
            .where((e) => e['id'] == widget.widgetId)
            .toList()[0]['data']
        : products;

    print("DATAAAAAAAAAAAAAAAAAAAAA : ${data[0]['data']['priceList']}");
    return Container(
      margin: EdgeInsets.zero, // Remove margin
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisSize: MainAxisSize.min, // Set mainAxisSize to min
        children: [
          Column(
            children: [
           Text(
                  widget.title,
                  maxLines: 3,
                  style: AppTheme()
                      .outfitStyle(fontSize: 19, fontWeight: FontWeight.w500),
                ),
              
              TextButton(
                onPressed: () {
                  print("clicked${(widget.title)}");
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => AllProductsScreen(
                        products: data,
                        title: widget.title,
                      ),
                    ),
                  );
                },
                child: Text(
                  'View All',
                  style: AppTheme().outfitStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w400,
                    color: AppTheme().themeColor,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.32,
            // width: MediaQuery.of(context).size.width,
            child: ListView.builder(
              shrinkWrap: true, // Add shrinkWrap to the ListView
              scrollDirection: Axis.horizontal,
              // itemCount: data.length,
              itemCount: min(data.length, 5),
              itemBuilder: (context, index) {
                return Container(
                  margin: const EdgeInsets.only(right: 14),
                  // width: 140,
                  width: MediaQuery.of(context).size.width * 0.36,
                  height: MediaQuery.of(context).size.width * 0.50,

                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min, // Set mainAxisSize to min
                    children: [
                      InkWell(
                        onTap: () => handleTap(data[index]['id']),
                        child: Container(
                          width: 140,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(0),
                          ),
                          child: Stack(
                            children: [
                              ClipRRect(
                                borderRadius: BorderRadius.circular(0),
                                child: Image.network(
                                  data[index]['data']['coverPic']['url'],
                                  fit: BoxFit.cover,
                                  width: 180,
                                  height:
                                      MediaQuery.of(context).size.height * 0.24,
                                ),
                              ),
                              Positioned(
                                top: 0,
                                left: 0,
                                child: Visibility(
                                  visible: calculateDiscountPercentage(
                                          data[index]['data']['priceList'][0]
                                                  ['price']
                                              .toDouble(),
                                          data[index]['data']['priceList'][0]
                                                  ['discountedPrice']
                                              .toDouble()) >
                                      0,
                                  child: Container(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 4, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: AppTheme().mainColor,
                                      borderRadius: const BorderRadius.only(
                                        topLeft: Radius.circular(0),
                                      ),
                                    ),
                                    child: Text(
                                      "(${calculateDiscountPercentage(data[index]['data']['priceList'][0]['price'].toDouble(), data[index]['data']['priceList'][0]['discountedPrice'].toDouble())}% OFF)",
                                      style: AppTheme().outfitStyle(
                                          color: Colors.white, fontSize: 12),
                                    ),
                                  ),
                                ),
                              ),
                              DatabaseService().checkPdtStock(data[index])
                                  ? Positioned(
                                      top: 40,
                                      child: Container(
                                        color: Colors.white.withOpacity(0.8),
                                        padding: const EdgeInsets.symmetric(
                                            vertical: 5),
                                        width: 140,
                                        child: const Center(
                                          child: Text(
                                            "OUT OF STOCK",
                                            style: TextStyle(
                                              color: Colors.red,
                                              fontWeight: FontWeight.bold,
                                              fontSize: 11,
                                            ),
                                          ),
                                        ),
                                      ),
                                    )
                                  : const SizedBox(),
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(height: 5),
                      Container(
                        width: 160,
                        padding: const EdgeInsets.symmetric(horizontal: 3),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisSize:
                              MainAxisSize.min, // Set mainAxisSize to min
                          children: [
                            const SizedBox(
                              height: 4,
                            ),
                            Text(
                              data[index]['data']['prodName'],
                              style: AppTheme().outfitStyle(
                                fontWeight: FontWeight.w400,
                                color: AppTheme().themeColor,
                                fontSize: 16,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                            const SizedBox(height: 5),
                            if (data[index]['data']['vendorName'] != null &&
                                data[index]['data']['vendorName'] != '')
                              Text(
                                "By: ${data[index]['data']['vendorName']}",
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                style: AppTheme().outfitStyle(fontSize: 14),
                              ),
                            // SizedBox(height: 5),
                            data[index]['data']['productType'] != 'appointment'
                                ? Row(
                                    children: [
                                      Text(
                                        "Rs ${data[index]['data']['priceList'][0]['price'].toDouble()}",
                                        maxLines: 1,
                                        style: GoogleFonts.outfit(
                                          textStyle: const TextStyle(
                                            fontSize: 14,
                                            color: Colors.black38,
                                            fontWeight: FontWeight.w600,
                                            decoration:
                                                TextDecoration.lineThrough,
                                          ),
                                        ),
                                      ),
                                      const SizedBox(width: 4),
                                      Text(
                                        "Rs ${data[index]['data']['priceList'][0]['discountedPrice'].toDouble()}",
                                        maxLines: 1,
                                        style: AppTheme().outfitStyle(
                                          fontSize: 15,
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                      SizedBox(
                                        width: data[index]['data']['priceList']
                                                    [0]['purchasePrice'] !=
                                                data[index]['data']['priceList']
                                                    [0]['discountedPrice']
                                            ? 5
                                            : 0,
                                      ),
                                      // data[index]['data']['priceList'][0]
                                      //             ['purchasePrice'] !=
                                      //         data[index]['data']['priceList']
                                      //             [0]['discountedPrice']
                                      //     ? Expanded(
                                      //         child: Text(
                                      //           "Rs ${data[index]['data']['priceList'][0]['purchasePrice'].toString()}",
                                      //           maxLines: 1,
                                      //           overflow: TextOverflow.ellipsis,
                                      //           style: const TextStyle(
                                      //             decoration: TextDecoration
                                      //                 .lineThrough,
                                      //             fontSize: 15,
                                      //           ),
                                      //         ),
                                      //   )
                                      // : SizedBox(),
                                    ],
                                  )
                                : const SizedBox(),
                          ],
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

// double calculateDiscountPercentage(
//     double originalPrice, double discountedPrice) {
//   if (originalPrice <= 0) {
//     return 0.0;
//   }
//   return ((originalPrice - discountedPrice) / originalPrice * 100.0);
// }

// int getDiscountPercentage(dynamic originalPrice, dynamic discountedPrice) {
//   if (originalPrice == null || discountedPrice == null) {
//     return 0;
//   }

//   double originalPriceDouble =
//       originalPrice is int ? originalPrice.toDouble() : originalPrice;
//   double discountedPriceDouble =
//       discountedPrice is int ? discountedPrice.toDouble() : discountedPrice;

//   if (originalPriceDouble <= 0) {
//     return 0;
//   }

//   double discountPercentage = ((originalPriceDouble - discountedPriceDouble) /
//       originalPriceDouble *
//       100.0);

//   return discountPercentage.round(); // Round the double to the nearest integer.
// }

int calculateDiscountPercentage(
    dynamic originalPrice, dynamic discountedPrice) {
  if (originalPrice <= 0) {
    return 0;
  }
  return ((originalPrice - discountedPrice) / originalPrice * 100).toInt();
}
