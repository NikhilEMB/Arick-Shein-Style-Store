import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shein/providers/cartProvider.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:shein/screens/categories/category_page.dart';
import 'package:shein/screens/product/slotSelectScreen.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/utils/addToCart.dart';
import 'package:shein/utils/databaseServices.dart';
import 'package:shein/widgets/loadingModal.dart';
import 'package:shein/widgets/screenHeader.dart';
import 'package:provider/provider.dart';

class BannerLinkingScreen extends StatefulWidget {
  final String title;
  final String type;
  final dynamic data;
  const BannerLinkingScreen({
    super.key,
    required this.title,
    required this.type,
    required this.data,
  });

  @override
  State<BannerLinkingScreen> createState() => _BannerLinkingScreenState();
}

class _BannerLinkingScreenState extends State<BannerLinkingScreen> {
  dynamic products = [];
  dynamic categories = [];
  bool isLoading = false;

  fetchData() async {
    if (widget.type == "Product") {
      isLoading = true;
      setState(() {});
      dynamic arr = [];
      for (var element in widget.data['ids']) {
        dynamic product = await DatabaseService().fetchSingleProduct(element);
        arr.add(product);
      }
      products = arr;
      isLoading = false;
      setState(() {});
    }
    if (widget.type == "Category") {
      isLoading = true;
      setState(() {});
      dynamic arr = [];
      for (var element in widget.data['ids']) {
        dynamic category = await FirebaseFirestore.instance
            .collection('categories')
            .doc(element)
            .get()
            .then((value) {
          if (value.exists) {
            dynamic data = value.data();
            return {...data, "id": value.id};
          }
        });
        arr.add(category);
      }
      categories = arr;
      isLoading = false;
      setState(() {});
    }
  }

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

  Future<void> handleRemoveItemFromCart(product, priceListIndex) async {
    var priceList = product['priceList'];
    var weight = product.containsKey('data')
        ? priceList[priceListIndex]['weight']
        : priceList[priceListIndex]['weight'];
    var index = Provider.of<Cart>(context, listen: false).cart.indexWhere(
        (item) =>
            item['productId'] == product['id'] &&
            item['description'] == weight);

    Provider.of<Cart>(context, listen: false).removeItemFromCart(index: index);
    Fluttertoast.showToast(msg: 'Item removed from cart');
    setState(() {});
  }

  Future<void> handleAddItemClick(
      {product, priceListIndex, updateState}) async {
    // print('INSIDE ${product['data']['id']}');

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
        productId: product['id'] ?? (product.containsKey('data')
                ? product['data'].containsKey('id')
                    ? product['data']['id']
                    : product['id']
                : product['id']));

    Timer(const Duration(seconds: 1), () {
      Navigator.pop(context);
      Fluttertoast.showToast(msg: 'Item added to bag.');
    });
    setState(() {});
    updateState(() {});
    completer.complete();
    return completer.future;
  }

  bool checkIfProductIsInCart(product, priceList, index) {
    String productId = product['id'] ?? (product.containsKey('data')
            ? product['data'].containsKey('id')
                ? product['data']['id']
                : product['id']
            : product['id']);
    var weight = product.containsKey('data')
        ? priceList[index]['weight']
        : priceList[index]['weight'];
    var check = Provider.of<Cart>(context, listen: false).cart.any((element) =>
        element['productId'] == productId && element['description'] == weight);
    return check;
  }

  handleAddToCart(product, Size size) async {
    var priceList = product.containsKey('data')
        ? product['data']['priceList']
        : product['priceList'];

    // bool isProductInCart = false;

    getCartProductQuantity() {
      String productId = product['id'] ?? (product.containsKey('data')
              ? product['data'].containsKey('id')
                  ? product['data']['id']
                  : product['id']
              : product['id']);
      List<dynamic> check = Provider.of<Cart>(context, listen: false)
          .cart
          .where((element) => element['productId'] == productId)
          .toList();

      return check.isEmpty ? 1 : check[0]['quantity'];
    }

    handleUpdateQuantity({type, product, updateState, priceListIndex}) {
      String productId = product['id'] ?? (product.containsKey('data')
              ? product['data'].containsKey('id')
                  ? product['data']['id']
                  : product['id']
              : product['id']);
      var weight = product.containsKey('data')
          ? priceList[priceListIndex]['weight']
          : priceList[priceListIndex]['weight'];
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
          setState(() {});
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
                                          "Rs ${value['discountedPrice'].toString()}",
                                          style: TextStyle(
                                            color: AppTheme().secondaryColor,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                product.containsKey('productType') &&
                                        product['productType'] == "appointment"
                                    ? Container(
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
                                              if (FirebaseAuth.instance
                                                      .currentUser?.uid ==
                                                  null) {
                                                Navigator.of(context)
                                                    .pushNamed('/login');
                                              } else {
                                                await handleFarmBooking({
                                                  ...product,
                                                  "priceList":
                                                      product['priceList']
                                                }, index);
                                                setState(() {});
                                              }
                                            },
                                            child: const Text(
                                              "Book",
                                              style: TextStyle(
                                                  color: Colors.white,
                                                  fontSize: 14),
                                            )),
                                      )
                                    : checkIfProductIsInCart(
                                            product, priceList, index)
                                        ? SizedBox(
                                            child: Row(
                                              children: [
                                                InkWell(
                                                  onTap: () =>
                                                      handleUpdateQuantity(
                                                          type: 'dec',
                                                          product: product,
                                                          updateState: setState,
                                                          priceListIndex:
                                                              index),
                                                  child: Container(
                                                    decoration: BoxDecoration(
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              2),
                                                      color: AppTheme()
                                                          .secondaryColor,
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
                                                  padding: const EdgeInsets
                                                          .symmetric(
                                                      horizontal: 15),
                                                  child: Text(
                                                      getCartProductQuantity()
                                                          .toString()),
                                                ),
                                                InkWell(
                                                  onTap: () =>
                                                      handleUpdateQuantity(
                                                          type: 'inc',
                                                          product: product,
                                                          updateState: setState,
                                                          priceListIndex:
                                                              index),
                                                  child: Container(
                                                    decoration: BoxDecoration(
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              2),
                                                      color: AppTheme()
                                                          .secondaryColor,
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
                                        : DatabaseService()
                                                .checkPdtVariantStock(
                                            product.containsKey('data')
                                                ? {
                                                    ...product['data'],
                                                    "priceList": product['data']
                                                        ['priceList'],
                                                  }
                                                : {
                                                    ...product,
                                                    "priceList":
                                                        product['priceList']
                                                  },
                                            index,
                                          )
                                            ? Container(
                                                height: 30,
                                                padding:
                                                    const EdgeInsets.symmetric(
                                                        horizontal: 5),
                                                decoration: BoxDecoration(
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                            5),
                                                    color: const Color.fromARGB(
                                                        255, 224, 224, 224),
                                                    boxShadow: const <
                                                        BoxShadow>[
                                                      BoxShadow(
                                                          color: Color.fromARGB(
                                                              255,
                                                              222,
                                                              222,
                                                              222),
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
                                                padding:
                                                    const EdgeInsets.symmetric(
                                                        horizontal: 5),
                                                decoration: BoxDecoration(
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                            5),
                                                    color: AppTheme()
                                                        .secondaryColor,
                                                    boxShadow: const <
                                                        BoxShadow>[
                                                      BoxShadow(
                                                          color: Color.fromARGB(
                                                              255, 67, 67, 67),
                                                          blurRadius: 5,
                                                          offset: Offset(0, 2),
                                                          spreadRadius: 0.1),
                                                    ]),
                                                child: TextButton(
                                                    onPressed: () async {
                                                      await handleAddItemClick(
                                                        product: {
                                                          ...product,
                                                          "priceList": product[
                                                              'priceList']
                                                        },
                                                        priceListIndex: index,
                                                        updateState: setState,
                                                      );
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
  void initState() {
    // TODO: implement initState
    fetchData();
    super.initState();
  }

  handleTap(category) {
    if (category.containsKey('pageId') &&
        category['pageId'].toString().isNotEmpty) {
      Navigator.push(
          context,
          CupertinoPageRoute(
              builder: (ctx) => CategoryPage(
                    title: category['name'],
                    catId: category['id'],
                    documentRef: null,
                    pageId: category['pageId'],
                  )));
    } else if (category['isSubcategories'] ) {
      Navigator.of(context).pushNamed('/subCategory', arguments: {
        "categoryName": category['name'],
        "categoryId": category['id'],
        "categoryData": category
      });
    } else if (category.containsKey('isSubcategories') ) {
      Navigator.of(context).pushNamed('/categoryProducts', arguments: {
        "categoryName": category['name'],
        "categoryId": category['id'],
        "categoryData": category
      }
      );
    } else {
      Navigator.of(context).pushNamed('/categoryProducts', arguments: {
        "categoryName": category['name'],
        "categoryId": category['id'],
        "categoryData": category
      }
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    print(categories);
    var size = MediaQuery.of(context).size;
    return SafeArea(
        child: Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            ScreenHeader(size: size, title: widget.title),
            const SizedBox(height: 20),
            widget.type == "Product"
                ? widget.type == "Product" && isLoading
                    ? Container(
                        margin: EdgeInsets.only(top: size.width * 0.1),
                        child: CircularProgressIndicator(
                          color: AppTheme().secondaryColor,
                        ),
                      )
                    : widget.type == "Product" && products.isEmpty
                        ? Container(
                            margin: EdgeInsets.only(top: size.width * 0.2),
                            child: const Center(
                              child: Text(
                                "No Products Available.",
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                            ),
                          )
                        : Wrap(
                            // spacing: 1,
                            children: [
                              ...(products.map((product) {
                                var priceList = product['priceList'];
                                return InkWell(
                                  onTap: () {
                                    Navigator.of(context).pushNamed(
                                        '/productInfo',
                                        arguments: {"id": product['id']});
                                  },
                                  child: Container(
                                      padding:
                                          const EdgeInsets.only(bottom: 15),
                                      decoration: BoxDecoration(
                                          border: Border.all(
                                              color: Colors.grey, width: 1)),
                                      width: size.width * 0.48,
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          const SizedBox(height: 5),
                                          Container(
                                            padding: const EdgeInsets.symmetric(
                                                horizontal: 3),
                                            height: size.height * 0.2,
                                            child: Stack(children: [
                                              Center(
                                                child: Image.network(
                                                  product['coverPic']
                                                          .containsKey('mob')
                                                      ? product['coverPic']
                                                          ['mob']
                                                      : product['images'][0]
                                                          ['thumb'],
                                                  fit: BoxFit.cover,
                                                ),
                                              ),
                                              DatabaseService().checkPdtStock({
                                                ...product,
                                                "priceList": priceList
                                              })
                                                  ? Positioned(
                                                      top: 70,
                                                      child: Container(
                                                        color: Colors.white
                                                            .withOpacity(0.8),
                                                        padding:
                                                            const EdgeInsets
                                                                    .symmetric(
                                                                vertical: 5),
                                                        width:
                                                            size.width * 0.45,
                                                        child: const Center(
                                                          child: Text(
                                                            "OUT OF STOCK",
                                                            style: TextStyle(
                                                              color: Colors.red,
                                                              fontWeight:
                                                                  FontWeight
                                                                      .bold,
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
                                              height: size.height * 0.085,
                                              child: Column(
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.start,
                                                children: [
                                                  Text(
                                                    product['vendorName'],
                                                    maxLines: 1,
                                                    overflow:
                                                        TextOverflow.ellipsis,
                                                    style: const TextStyle(
                                                      fontSize: 12,
                                                    ),
                                                  ),
                                                  const SizedBox(
                                                    height: 5,
                                                  ),
                                                  Text(
                                                    product['prodName'],
                                                    maxLines: 2,
                                                    overflow:
                                                        TextOverflow.ellipsis,
                                                    style: const TextStyle(
                                                        fontSize: 15,
                                                        fontWeight:
                                                            FontWeight.w600),
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
                                                  //   onTap: () =>
                                                  //       handleAddToCart(
                                                  //           product, size),
                                                  //   child: Container(
                                                  //     padding:
                                                  //         const EdgeInsets.only(
                                                  //             left: 5),
                                                  //     decoration: BoxDecoration(
                                                  //       borderRadius:
                                                  //           BorderRadius
                                                  //               .circular(3),
                                                  //       border: Border.all(
                                                  //           color: const Color
                                                  //                   .fromARGB(
                                                  //               255,
                                                  //               201,
                                                  //               201,
                                                  //               201),
                                                  //           width: 1),
                                                  //     ),
                                                  //     child: Row(
                                                  //       children: [
                                                  //         Expanded(
                                                  //           child: Text(
                                                  //             priceList[0]
                                                  //                     ['weight']
                                                  //                 .toString(),
                                                  //             style: const TextStyle(
                                                  //                 fontSize: 13,
                                                  //                 fontWeight:
                                                  //                     FontWeight
                                                  //                         .w500,
                                                  //                 color: Color
                                                  //                     .fromARGB(
                                                  //                         255,
                                                  //                         79,
                                                  //                         79,
                                                  //                         79)),
                                                  //           ),
                                                  //         ),
                                                  //         Container(
                                                  //           decoration:
                                                  //               const BoxDecoration(
                                                  //             border: Border(
                                                  //               left:
                                                  //                   BorderSide(
                                                  //                 color: Color
                                                  //                     .fromARGB(
                                                  //                         255,
                                                  //                         201,
                                                  //                         201,
                                                  //                         201),
                                                  //                 width: 1,
                                                  //               ),
                                                  //             ),
                                                  //             gradient:
                                                  //                 LinearGradient(
                                                  //               colors: [
                                                  //                 Colors.white,
                                                  //                 Color
                                                  //                     .fromARGB(
                                                  //                         255,
                                                  //                         230,
                                                  //                         229,
                                                  //                         229)
                                                  //               ],
                                                  //               begin: Alignment
                                                  //                   .centerLeft,
                                                  //               end: Alignment
                                                  //                   .centerRight,
                                                  //             ),
                                                  //           ),
                                                  //           child: const Center(
                                                  //             child: Icon(
                                                  //               Icons
                                                  //                   .arrow_drop_down,
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
                                                                      priceList[
                                                                              0]
                                                                          [
                                                                          'price']
                                                                  ? Text(
                                                                      "Rs ${priceList[0]['price'].toString()}",
                                                                      style:
                                                                          const TextStyle(
                                                                        decoration:
                                                                            TextDecoration.lineThrough,
                                                                      ),
                                                                    )
                                                                  : const SizedBox(),
                                                              SizedBox(
                                                                  width: priceList[0]
                                                                              [
                                                                              'discountedPrice'] !=
                                                                          priceList[0]
                                                                              [
                                                                              'price']
                                                                      ? 5
                                                                      : 0),
                                                              Text(
                                                                "Rs ${priceList[0]['discountedPrice'].toString()}",
                                                                style: const TextStyle(
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .w500),
                                                              ),
                                                            ],
                                                          ),
                                                        ),
                                                        // InkWell(
                                                        //   onTap: () => product.containsKey(
                                                        //               'productType') &&
                                                        //           product['productType'] ==
                                                        //               "appointment"
                                                        //       ? FirebaseAuth
                                                        //                   .instance
                                                        //                   .currentUser
                                                        //                   ?.uid ==
                                                        //               null
                                                        //           ? Navigator.of(context)
                                                        //               .pushNamed(
                                                        //                   '/login')
                                                        //           : handleFarmBooking(
                                                        //               {
                                                        //                   ...product,
                                                        //                   "priceList":
                                                        //                       product['priceList']
                                                        //                 },
                                                        //               0)
                                                        //       : DatabaseService()
                                                        //                   .checkPdtStock({
                                                        //                 ...product,
                                                        //                 "priceList":
                                                        //                     product['priceList']
                                                        //               }) ==
                                                        //               false
                                                        //           ? checkIfProductIsInCart(product, priceList, 0)
                                                        //               ? handleRemoveItemFromCart({...product, "priceList": product['priceList']}, 0)
                                                        //               : handleAddItemClick(priceListIndex: 0, product: {...product, "priceList": product['priceList']}, updateState: () {})
                                                        //           : Fluttertoast.showToast(msg: 'Out Of Stock'),
                                                        //   child: Container(
                                                        //     decoration:
                                                        //         BoxDecoration(
                                                        //       border:
                                                        //           Border.all(
                                                        //         color: product.containsKey(
                                                        //                     'data') &&
                                                        //                 product['data'][
                                                        //                         'productType'] ==
                                                        //                     "appointment"
                                                        //             ? AppTheme()
                                                        //                 .secondaryColor
                                                        //             : product.containsKey(
                                                        //                         'productType') &&
                                                        //                     product['productType'] ==
                                                        //                         "appointment"
                                                        //                 ? AppTheme()
                                                        //                     .secondaryColor
                                                        //                 : DatabaseService().checkPdtStock({
                                                        //                           ...product,
                                                        //                           "priceList": product['priceList']
                                                        //                         }) ==
                                                        //                         false
                                                        //                     ? AppTheme().secondaryColor
                                                        //                     : Colors.grey,
                                                        //         width: 2,
                                                        //       ),
                                                        //       borderRadius:
                                                        //           BorderRadius
                                                        //               .circular(
                                                        //                   5),
                                                        //     ),
                                                        //     child: Center(
                                                        //       child: Padding(
                                                        //         padding: const EdgeInsets
                                                        //                 .symmetric(
                                                        //             horizontal:
                                                        //                 8.0,
                                                        //             vertical:
                                                        //                 2),
                                                        //         child: Text(
                                                        //           product.containsKey(
                                                        //                       'data') &&
                                                        //                   product['data']['productType'] ==
                                                        //                       "appointment"
                                                        //               ? "Book"
                                                        //               : product.containsKey('productType') &&
                                                        //                       product['productType'] == "appointment"
                                                        //                   ? "Book"
                                                        //                   : checkIfProductIsInCart(product, priceList, 0)
                                                        //                       ? "Remove"
                                                        //                       : 'Add',
                                                        //           style:
                                                        //               TextStyle(
                                                        //             color: product.containsKey('data') &&
                                                        //                     product['data']['productType'] ==
                                                        //                         "appointment"
                                                        //                 ? AppTheme()
                                                        //                     .secondaryColor
                                                        //                 : product.containsKey('productType') &&
                                                        //                         product['productType'] ==
                                                        //                             "appointment"
                                                        //                     ? AppTheme()
                                                        //                         .secondaryColor
                                                        //                     : DatabaseService().checkPdtStock({
                                                        //                               ...product,
                                                        //                               "priceList": product['priceList']
                                                        //                             }) ==
                                                        //                             false
                                                        //                         ? AppTheme().secondaryColor
                                                        //                         : Colors.grey,
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
                                      )),
                                );
                              }).toList())
                            ],
                          )
                : widget.type == "Category"
                    ? widget.type == "Category" && isLoading
                        ? Container(
                            margin: EdgeInsets.only(top: size.width * 0.1),
                            child: CircularProgressIndicator(
                              color: AppTheme().secondaryColor,
                            ),
                          )
                        : widget.type == "Category" && categories.isEmpty
                            ? Container(
                                margin: EdgeInsets.only(top: size.width * 0.3),
                                child: const Center(
                                  child: Text(
                                    "No Categories Available.",
                                    style:
                                        TextStyle(fontWeight: FontWeight.bold),
                                  ),
                                ),
                              )
                            : SizedBox(
                                width: double.infinity,
                                height: size.height - size.height * 0.12,
                                child: GridView.count(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 10),
                                  mainAxisSpacing: 17,
                                  crossAxisSpacing: 10,
                                  childAspectRatio:
                                      Provider.of<HomeData>(context).isTablet
                                          ? 0.85
                                          : 0.7,
                                  crossAxisCount: 2, // Number of columns
                                  children: const [
                                    // ...(categories.map((category) {
                                    //   return CategoryCard(
                                    //       category: category,
                                    //       context: context,
                                    //       handleTap: handleTap,
                                    //       size: size);
                                    // }).toList()),

                                    // Your grid items here
                                  ],
                                ),
                              )
                    : const SizedBox()
          ],
        ),
      ),
    ));
  }
}
