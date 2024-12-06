import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shein/providers/cartProvider.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:shein/screens/product/slotSelectScreen.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/utils/addToCart.dart';
import 'package:shein/utils/databaseServices.dart';
import 'package:shein/widgets/loadingModal.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

class ProductList extends StatefulWidget {
  final String title;
  final String widgetId;
  final dynamic size;
  final int index;
  final bool isHome;

  const ProductList({
    super.key,
    required this.title,
    required this.widgetId,
    this.size,
    this.isHome = true,
    required this.index,
  });

  @override
  State<ProductList> createState() => _ProductListState();
}

class _ProductListState extends State<ProductList> {
  dynamic products = [];

  handleFarmBooking(productInfo, index) async {
    var variant = productInfo['appointment']['schedules']['variant']
        .where((e) => e['name'] == productInfo['priceList'][index]['weight'])
        .toList();

    var props = {
      "item": {
        "name": productInfo['prodName'],
        "price": productInfo['priceList'][index]['discountedPrice'],
        "coverPic": productInfo['coverPic'],
        "id": productInfo['id'],
        "variant": productInfo['priceList'][index]['weight']
      },
      "vendor": {"id": productInfo['vendorId'] ?? ''},
      "maxDays": variant.isNotEmpty ? variant[0]['maxDays'] : 0,
      "schedules": variant.isNotEmpty ? variant[0]['schedules'] : []
    };

    Navigator.of(context).push(
      CupertinoPageRoute(
        builder: (context) => SlotSelect(
          slotData: props,
        ),
      ),
    );
  }

  Future<void> handleRemoveItemFromCart(product, priceListIndex, prodId) async {
    var priceList = product['priceList'];
    var weight = product.containsKey('data')
        ? priceList[priceListIndex]['weight']
        : priceList[priceListIndex]['weight'];
    var index = Provider.of<Cart>(context, listen: false).cart.indexWhere(
        (item) => item['productId'] == prodId && item['description'] == weight);

    Provider.of<Cart>(context, listen: false).removeItemFromCart(index: index);
    Fluttertoast.showToast(msg: 'Item removed from cart.');

    setState(() {});
  }

  bool checkCartProduct(product, index, productId) {
    if (productId != null) {
      var weight = product.containsKey('data')
          ? product['data']['priceList'][index]['weight']
          : product['priceList'][index]['weight'];
      var check = Provider.of<Cart>(context, listen: false).cart.any(
          (element) =>
              element['productId'] == productId &&
              element['description'] == weight);
      setState(() {});
      return check;
    }
    setState(() {});
    return false;
  }

  fetchProducts() async {
    await FirebaseFirestore.instance
        .collection('widgets')
        .doc(widget.widgetId)
        .collection('products')
        .where('data.status', isEqualTo: true)
        .orderBy('sortedAt', descending: true)
        .get()
        .then((value) {
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
    return;
  }

  Future<void> handleAddItemClick(
      {product, priceListIndex, updateState, productId}) async {
    showDialog(
      barrierDismissible: false,
      context: context,
      builder: (context) => loader(context),
    );
    Completer<void> completer = Completer<void>();

    await CartService().addToCart(
        priceListIndex: priceListIndex,
        product: product.containsKey('data') ? product['data'] : product,
        context: context,
        productId: productId);

    Fluttertoast.showToast(msg: 'Item added to bag.');
    setState(() {});
    Navigator.pop(context);
    updateState(() {});
    completer.complete();
    return completer.future;
  }

  handleAddToCart(product, Size size, prodId) async {
    var priceList = product.containsKey('data')
        ? product['data']['priceList']
        : product['priceList'];

    bool checkIfProductIsInCart(index) {
      dynamic productId = prodId;
      if (productId != null) {
        var weight = priceList[index]['weight'];

        var check = Provider.of<Cart>(context, listen: false).cart.any(
            (element) =>
                element['productId'] == productId &&
                element['description'] == weight);
        return check;
      } else {
        return false;
      }
    }

    // bool isProductInCart = false;

    getCartProductQuantity(index) {
      String productId = prodId;
      var productData = product.containsKey('data') ? product['data'] : product;
      List<dynamic> check = Provider.of<Cart>(context, listen: false)
          .cart
          .where((element) =>
              element['productId'] == productId &&
              element['description'] ==
                  productData['priceList'][index]['weight'])
          .toList();

      return check.isEmpty ? 1 : check[0]['quantity'];
    }

    handleUpdateQuantity({type, product, updateState, priceListIndex}) {
      String productId = prodId;
      var weight = priceList[priceListIndex]['weight'];
      var index = Provider.of<Cart>(context, listen: false).cart.indexWhere(
          (item) =>
              item['productId'] == productId && item['description'] == weight);

      if (type == 'inc') {
        var quantity =
            Provider.of<Cart>(context, listen: false).cart[index]['quantity'];
        if (quantity + 1 <=
            int.parse(priceList[priceListIndex]['totalQuantity'])) {
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
      setState(() {});
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
                        product.containsKey('data')
                            ? product['data']['prodName']
                            : product['prodName'],
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
                  ...(product.containsKey('data')
                      ? priceList
                      : priceList.asMap().entries.map((e) {
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
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(value['weight']),
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        Text(
                                          "Rs${value['discountedPrice'].toString()}",
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
                                                  color:
                                                      AppTheme().secondaryColor,
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
                                              padding:
                                                  const EdgeInsets.symmetric(
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
                                                  color:
                                                      AppTheme().secondaryColor,
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
                                        index,
                                      )
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
                                                color:
                                                    AppTheme().secondaryColor,
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
                                                  if (product.containsKey(
                                                          'data') &&
                                                      product['data']
                                                              ['productType'] ==
                                                          "appointment") {
                                                    if (FirebaseAuth.instance
                                                            .currentUser?.uid ==
                                                        null) {
                                                      Navigator.of(context)
                                                          .pushNamed('/login');
                                                    } else {
                                                      await handleFarmBooking(
                                                          product['data'],
                                                          index);
                                                      setState(() {});
                                                    }
                                                  } else if (product
                                                          .containsKey(
                                                              'productType') &&
                                                      product['productType'] ==
                                                          "appointment") {
                                                    if (FirebaseAuth.instance
                                                            .currentUser?.uid ==
                                                        null) {
                                                      Navigator.of(context)
                                                          .pushNamed('/login');
                                                    } else {
                                                      await handleFarmBooking(
                                                          product, index);
                                                      setState(() {});
                                                    }
                                                  } else {
                                                    await handleAddItemClick(
                                                        product: {
                                                          ...product,
                                                          "priceList": product[
                                                              'priceList']
                                                        },
                                                        priceListIndex: index,
                                                        updateState: setState,
                                                        productId: prodId);
                                                    setState(() {});
                                                  }
                                                },
                                                child: Text(
                                                  product.containsKey('data') &&
                                                          product['data'][
                                                                  'productType'] ==
                                                              "appointment"
                                                      ? "Book"
                                                      : product.containsKey(
                                                                  'productType') &&
                                                              product['productType'] ==
                                                                  "appointment"
                                                          ? "Book"
                                                          : "Add Item +",
                                                  style: const TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 14),
                                                )),
                                          )
                              ],
                            ),
                          );
                        })),
                  product.containsKey('data') &&
                              product['data']['productType'] == "appointment" ||
                          product.containsKey('productType') &&
                              product['productType'] == "appointment"
                      ? const SizedBox()
                      : Container(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
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
                                child: Center(
                                  child: Container(
                                    height: 30,
                                    width: size.width * 0.3,
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 7),
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(100),
                                      border: Border.all(
                                          color: AppTheme().secondaryColor,
                                          width: 1),
                                    ),
                                    child: Center(
                                      child: Text(
                                        'Go to Bag',
                                        style: TextStyle(
                                            color: AppTheme().secondaryColor),
                                      ),
                                    ),
                                  ),
                                ),
                              )
                            ],
                          ),
                        ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  void initState() {
    // TODO: implement initState
    if (!widget.isHome) {
      fetchProducts();
    }
    super.initState();
  }

  // handleTap(product) {
  //   String id = product.containsKey('data')
  //       ? product['data'].containsKey('id')
  //           ? product['data']['id'] ?? product['id']
  //           : product['id']
  //       : product['id'];
  //       print("IDDDDDDDDDDDDDD $id");
  //   // Navigator.of(context).pushNamed('/productInfo', arguments: {"id": id});
  // }

  // handleAddToCart() {
  //   print("ADD TO CART");
  // }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    if (widget.isHome &&
        Provider.of<HomeData>(context, listen: false)
            .homeListData
            .where((e) => e['id'] == widget.widgetId)
            .toList()
            .isEmpty) {
      return const SizedBox();
    }

    if (widget.isHome) {
      var filteredList = Provider.of<HomeData>(context, listen: false)
          .homeListData
          .where((e) => e['id'] == widget.widgetId)
          .toList();

      if (filteredList.isEmpty || filteredList[0]['data'] == null) {
        return const SizedBox();
      }
    }

    if (!widget.isHome && products.isEmpty) {
      return const SizedBox();
    }

    var data = widget.isHome
        ? Provider.of<HomeData>(context, listen: false)
            .homeListData
            .where((e) => e['id'] == widget.widgetId)
            .toList()[0]['data']
        : products;

    final screenWidth = MediaQuery.of(context).size.width;
    final itemWidth = screenWidth / 2;
    final itemHeight = itemWidth; // Adjust as needed

    final rowCount = ((data.length) / 2).ceil();
    final gridViewHeight = itemHeight * rowCount;

    return SizedBox(
      width: double.infinity,
      // padding: const EdgeInsets.symmetric(horizontal: 15),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            widget.title,
            style: const TextStyle(fontSize: 19, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 15),
          Container(
            // color: const Color(0xffC0C2C9),
            padding: const EdgeInsets.all(10),
            width: double.infinity,

            child: Wrap(
              children: [
                ...(data.map((product) {
                  var priceList = product['data']['priceList'];
                  return Stack(
                    children: [
                      InkWell(
                        onTap: () async {
                          var prodId = product['id'];
                          var id = product.containsKey('data')
                              ? product['data']['id']
                              : product['id'];
                          await Navigator.of(context)
                              .pushNamed('/productInfo', arguments: {
                            "id": prodId ?? id,
                          });
                          setState(() {});
                        },
                        child: Container(
                            height: MediaQuery.of(context).size.width * 0.7,
                            padding: const EdgeInsets.only(bottom: 0),
                            decoration: BoxDecoration(
                              border: Border.all(color: Colors.grey, width: 1),
                            ),
                            width: MediaQuery.of(context).size.width * 0.5 - 10,
                            // width: Provider.of<HomeData>(context).isTablet
                            //     ? size.width * 0.47
                            //     : size.width * 0.455,
                            child: Center(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const SizedBox(height: 5),
                                  Container(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 0),
                                    height: size.height * 0.2,
                                    child: Stack(children: [
                                      ClipRRect(
                                        child: Image.network(
                                          product['data']['coverPic']
                                                  .containsKey('mob')
                                              ? product['data']['coverPic']
                                                  ['mob']
                                              : product['data']['images'][0]
                                                  ['thumb'],
                                          fit: BoxFit.cover,
                                          height: 200,
                                          width: double.infinity,
                                        ),
                                      ),
                                      DatabaseService().checkPdtStock(
                                              product.containsKey('data')
                                                  ? product['data']
                                                  : product)
                                          ? Positioned(
                                              top: 70,
                                              child: Container(
                                                color: Colors.white
                                                    .withOpacity(0.8),
                                                padding:
                                                    const EdgeInsets.symmetric(
                                                        vertical: 5),
                                                width: size.width * 0.45,
                                                child: const Center(
                                                  child: Text(
                                                    "OUT OF STOCK",
                                                    style: TextStyle(
                                                      color: Colors.red,
                                                      fontWeight:
                                                          FontWeight.bold,
                                                      fontSize: 11,
                                                    ),
                                                  ),
                                                ),
                                              ))
                                          : const SizedBox()
                                    ]),
                                  ),
                                  const SizedBox(
                                    height: 5,
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.only(
                                        left: 7, right: 5),
                                    child: SizedBox(
                                      // height: size.height * 0.085,
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            product['data']['prodName'],
                                            style: AppTheme().outfitStyle(
                                              fontWeight: FontWeight.w400,
                                              color: AppTheme().themeColor,
                                              fontSize: 14,
                                            ),
                                            maxLines: 1,
                                            overflow: TextOverflow.ellipsis,
                                          ),
                                          const SizedBox(
                                            height: 5,
                                          ),
                                          Text(
                                            "By: ${product['data']['vendorName']}",
                                            maxLines: 2,
                                            overflow: TextOverflow.ellipsis,
                                            style: AppTheme()
                                                .outfitStyle(fontSize: 14),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 3),
                                  Padding(
                                    padding: const EdgeInsets.only(
                                        left: 7, right: 5),
                                    child: SizedBox(
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          // InkWell(
                                          //   onTap: () => handleAddToCart(
                                          //       product['data'],
                                          //       size,
                                          //       product['id'] != null
                                          //           ? product['id']
                                          //           : product
                                          //                   .containsKey('data')
                                          //               ? product['data']['id']
                                          //               : product['id']),
                                          //   child: Container(
                                          //     padding: const EdgeInsets.only(
                                          //         left: 5),
                                          //     decoration: BoxDecoration(
                                          //       borderRadius:
                                          //           BorderRadius.circular(3),
                                          //       border: Border.all(
                                          //           color: const Color.fromARGB(
                                          //               255, 201, 201, 201),
                                          //           width: 1),
                                          //     ),
                                          //     child: Row(
                                          //       children: [
                                          //         Expanded(
                                          //           child: Text(
                                          //             priceList[0]['weight']
                                          //                 .toString(),
                                          //             style: const TextStyle(
                                          //                 fontSize: 13,
                                          //                 fontWeight:
                                          //                     FontWeight.w500,
                                          //                 color: Color.fromARGB(
                                          //                     255, 79, 79, 79)),
                                          //           ),
                                          //         ),
                                          //         Container(
                                          //           decoration:
                                          //               const BoxDecoration(
                                          //             border: Border(
                                          //               left: BorderSide(
                                          //                 color: Color.fromARGB(
                                          //                     255,
                                          //                     201,
                                          //                     201,
                                          //                     201),
                                          //                 width: 1,
                                          //               ),
                                          //             ),
                                          //             gradient: LinearGradient(
                                          //               colors: [
                                          //                 Colors.white,
                                          //                 Color.fromARGB(255,
                                          //                     230, 229, 229)
                                          //               ],
                                          //               begin: Alignment
                                          //                   .centerLeft,
                                          //               end: Alignment
                                          //                   .centerRight,
                                          //             ),
                                          //           ),
                                          //           child: const Center(
                                          //             child: Icon(
                                          //               Icons.arrow_drop_down,
                                          //               size: 20,
                                          //             ),
                                          //           ),
                                          //         )
                                          //       ],
                                          //     ),
                                          //   ),
                                          // ),
                                          const SizedBox(
                                            height: 10,
                                          ),
                                          SizedBox(
                                            width: double.infinity,
                                            child: Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment
                                                      .spaceBetween,
                                              children: [
                                                Expanded(
                                                  child: Row(
                                                    children: [
                                                      priceList[0][
                                                                  'discountedPrice'] !=
                                                              priceList[0]
                                                                  ['price']
                                                          ? Text(
                                                              "Rs ${priceList[0]['price'].toString()}",
                                                              maxLines: 1,
                                                              style: GoogleFonts.outfit(
                                                                  textStyle: const TextStyle(
                                                                      fontSize:
                                                                          10,
                                                                      color: Colors
                                                                          .black38,
                                                                      fontWeight:
                                                                          FontWeight
                                                                              .w600,
                                                                      decoration:
                                                                          TextDecoration
                                                                              .lineThrough))
                                                              //  AppTheme().outfitStyle(
                                                              //   fontSize: 15,
                                                              //   fontWeight: FontWeight.w600,
                                                              // ),
                                                              )
                                                          : const SizedBox(),
                                                      const SizedBox(width: 4),
                                                      Text(
                                                        "Rs ${priceList[0]['discountedPrice'].toString()}",
                                                        maxLines: 1,
                                                        style: AppTheme()
                                                            .outfitStyle(
                                                          fontSize: 10,
                                                          fontWeight:
                                                              FontWeight.w600,
                                                        ),
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                                // InkWell(
                                                //   onTap: () {
                                                //     // print(product);
                                                //     var pdt = product
                                                //             .containsKey('data')
                                                //         ? product['data']
                                                //         : product;

                                                //     if (product.containsKey(
                                                //             'data') &&
                                                //         product['data'][
                                                //                 'productType'] ==
                                                //             "appointment") {
                                                //       if (FirebaseAuth
                                                //               .instance
                                                //               .currentUser
                                                //               ?.uid ==
                                                //           null) {
                                                //         Navigator.of(context)
                                                //             .pushNamed(
                                                //                 '/login');
                                                //       } else {
                                                //         handleFarmBooking(
                                                //             product.containsKey(
                                                //                     'data')
                                                //                 ? product[
                                                //                     'data']
                                                //                 : product,
                                                //             0);
                                                //       }
                                                //     } else if (product
                                                //             .containsKey(
                                                //                 'productType') &&
                                                //         product['productType'] ==
                                                //             "appointment") {
                                                //       if (FirebaseAuth
                                                //               .instance
                                                //               .currentUser
                                                //               ?.uid ==
                                                //           null) {
                                                //         Navigator.of(context)
                                                //             .pushNamed(
                                                //                 '/login');
                                                //       } else {
                                                //         handleFarmBooking(
                                                //             product.containsKey(
                                                //                     'data')
                                                //                 ? product[
                                                //                     'data']
                                                //                 : product,
                                                //             0);
                                                //       }
                                                //     } else if (DatabaseService()
                                                //             .checkPdtStock(
                                                //                 pdt) ==
                                                //         false) {
                                                //       if (checkCartProduct(
                                                //           product,
                                                //           0,
                                                //           product['id'] ??
                                                //               (product.containsKey(
                                                //                       'data')
                                                //                   ? product[
                                                //                           'data']
                                                //                       ['id']
                                                //                   : product[
                                                //                       'id']))) {
                                                //         handleRemoveItemFromCart(
                                                //             product['data'],
                                                //             0,
                                                //             product['id'] !=
                                                //                     null
                                                //                 ? product['id']
                                                //                 : product[
                                                //                         'data']
                                                //                     ['id']);
                                                //       } else {
                                                //         handleAddItemClick(
                                                //             priceListIndex: 0,
                                                //             product: {
                                                //               ...product[
                                                //                   'data'],
                                                //               "priceList": product[
                                                //                       'data']
                                                //                   ['priceList']
                                                //             },
                                                //             updateState: () {},
                                                //             productId: product[
                                                //                     'id'] ??
                                                //                 (product.containsKey(
                                                //                         'data')
                                                //                     ? product[
                                                //                             'data']
                                                //                         ['id']
                                                //                     : product[
                                                //                         'id']));
                                                //       }
                                                //     } else {
                                                //       Fluttertoast.showToast(
                                                //           msg: 'Out Of Stock');
                                                //     }
                                                //   },
                                                //   //  product.containsKey(
                                                //   //             'data') &&
                                                //   //         product['data']['productType'] ==
                                                //   //             "appointment"
                                                //   //     ? handleFarmBooking(
                                                //   //         product.containsKey('data')
                                                //   //             ? product['data']
                                                //   //             : product,
                                                //   //         0)
                                                //   //     : product.containsKey(
                                                //   //                 'productType') &&
                                                //   //             product['productType'] ==
                                                //   //                 "appointment"
                                                //   //         ? handleFarmBooking(
                                                //   //             product.containsKey('data')
                                                //   //                 ? product[
                                                //   //                     'data']
                                                //   //                 : product,
                                                //   //             0)
                                                //   //         : DatabaseService().checkPdtStock(product.containsKey('data') ? product['data'] : product) ==
                                                //   //                 false
                                                //   //             ? checkCartProduct(
                                                //   //                     product,
                                                //   //                     0,
                                                //   //                     product['id'] ??
                                                //   //                         (product.containsKey('data')
                                                //   //                             ? product['data']['id']
                                                //   //                             : product['id']))
                                                //   //                 ? handleRemoveItemFromCart(product['data'], 0, product['id'] != null ? product['id'] : product['data']['id'])
                                                //   //                 : handleAddItemClick(priceListIndex: 0, product: {...product['data'], "priceList": product['data']['priceList']}, updateState: () {}, productId: product['id'] ?? (product.containsKey('data') ? product['data']['id'] : product['id']))
                                                //   //             : Fluttertoast.showToast(msg: 'Out Of Stock'),
                                                //   child: Container(
                                                //     decoration: BoxDecoration(
                                                //       border: Border.all(
                                                //         color: DatabaseService().checkPdtStock(product
                                                //                         .containsKey(
                                                //                             'data')
                                                //                     ? product[
                                                //                         'data']
                                                //                     : product) ==
                                                //                 false
                                                //             ? AppTheme()
                                                //                 .secondaryColor
                                                //             : Colors.grey,
                                                //         width: 2,
                                                //       ),
                                                //       borderRadius:
                                                //           BorderRadius.circular(
                                                //               5),
                                                //     ),
                                                //     child: Center(
                                                //       child: Padding(
                                                //         padding:
                                                //             const EdgeInsets
                                                //                     .symmetric(
                                                //                 horizontal: 8.0,
                                                //                 vertical: 2),
                                                //         child: Text(
                                                //           product.containsKey(
                                                //                       'data') &&
                                                //                   product['data']
                                                //                           [
                                                //                           'productType'] ==
                                                //                       "appointment"
                                                //               ? "Book"
                                                //               : product.containsKey(
                                                //                           'productType') &&
                                                //                       product['productType'] ==
                                                //                           "appointment"
                                                //                   ? "Book"
                                                //                   : checkCartProduct(
                                                //                           product,
                                                //                           0,
                                                //                           product['id'] != null
                                                //                               ? product['id']
                                                //                               : (product.containsKey('data') ? product['data']['id'] : product['id']))
                                                //                       ? "Remove"
                                                //                       : 'Add',
                                                //           style: TextStyle(
                                                //             color: DatabaseService().checkPdtStock(product.containsKey(
                                                //                             'data')
                                                //                         ? product[
                                                //                             'data']
                                                //                         : product) ==
                                                //                     false
                                                //                 ? AppTheme()
                                                //                     .secondaryColor
                                                //                 : Colors.grey,
                                                //           ),
                                                //         ),
                                                //       ),
                                                //     ),
                                                //   ),
                                                // )
                                              ],
                                            ),
                                          )
                                        ],
                                      ),
                                    ),
                                  )
                                ],
                              ),
                            )),
                      )
                    ],
                  );
                }).toList())
                // Your grid items here
              ],
            ),
          ),
        ],
      ),
    );
  }
}
