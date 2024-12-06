import 'dart:async';
import 'dart:convert';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import 'package:fluttertoast/fluttertoast.dart';
import 'package:provider/provider.dart';
import 'package:shein/providers/cartProvider.dart';

import 'package:shein/theme/AppTheme.dart';
import 'package:shein/utils/addToCart.dart';
import 'package:shein/utils/databaseServices.dart';
import 'package:shein/widgets/loadingModal.dart';
import 'package:shimmer/shimmer.dart';

class ProductsCard extends StatefulWidget {
  const ProductsCard(
      {required this.products,
      this.height = 150,
      this.width = 70,
      super.key,
      required this.index,
      required this.prodId,
      this.getTotalType,
      this.getTotalValue,
      this.handleIntake});

  final Map products;
  final double height;
  final double width;
  final int index;
  final String prodId;
  final dynamic getTotalType;
  final dynamic getTotalValue;
  final void Function()? handleIntake;

  @override
  State<ProductsCard> createState() => _ProductsCardState();
}

class _ProductsCardState extends State<ProductsCard> {
  int calculateDiscountPercentage(Map<dynamic, dynamic> product) {
    debugPrint(
        'prodd ${product['prodName']}: .${product['priceList'].toString()}.');
    if (!product.toString().contains('priceList')) {
      // Handle invalid or missing data
      debugPrint("Invalid product data");
      return 0;
    }
    List<dynamic> priceList = product['priceList'];

    if (priceList.isEmpty) {
      // Handle empty price list
      debugPrint("Price list is empty");
      return 0;
    }
    // debugPrint('proce : ${int.parse(priceList[0]['price'].toString())}');
    double originalPrice =
        double.parse(priceList[0]['price']?.toString() ?? '0');
    double discountedPrice =
        double.parse(priceList[0]['discountedPrice']?.toString() ?? '0');

    if (originalPrice <= 0) {
      // Handle original price <= 0
      debugPrint("Original price is not valid");
      return 0;
    }

    if (discountedPrice < 0) {
      // Handle negative discounted price
      debugPrint("Discounted price is negative");
      return 0;
    }

    if (discountedPrice > originalPrice) {
      // Handle discounted price higher than original price
      debugPrint("Discounted price is greater than original price");
      return 0;
    }

    int discountPercentage =
        ((originalPrice - discountedPrice) / originalPrice * 100).round();
    debugPrint(
        "Original price: $originalPrice\nDiscounted price: $discountedPrice\nDiscount percentage: $discountPercentage%");
    return discountPercentage;
  }

  bool checkCartProduct(product, index, productId) {
    print('Products are : ${product['priceList']}');
    if (productId != null) {
      var weight = product.containsKey('data')
          ? product['data'].containsKey('priceList')
              ? product['data']['priceList'][index]['weight']
              : ''
          : product.containsKey('priceList')
              ? product['priceList'][index]['weight']
              : '';
      print("WEIHGT $weight ${product['prodName']}");
      if (weight != '') {
        var check = Provider.of<Cart>(context, listen: false).cart.any(
            (element) =>
                element['productId'] == productId &&
                element['description'] == weight);
        print("CHECING $check $productId $weight");
        setState(() {});
        return check;
      } else {
        var check = Provider.of<Cart>(context, listen: false)
            .cart
            .any((element) => element['productId'] == productId);
        print("CHECING $check $productId $weight");
        setState(() {});
        return check;
      }

      // Provider.of<Cart>(context, listen: false).cart.forEach((item) {
      //   print("CART : ${item['productId']} ${item['description']}");
      // });
    }
    setState(() {});
    return false;
    // final cart = Provider.of<Cart>(context, listen: false).cart;

    // if (cart.isNotEmpty) {
    //   for (var item in cart) {
    //     if (item.toString().contains(productId)) {
    //       debugPrint('true');
    //     }
    //     debugPrint(item['id']);
    //   }
    // }
    // debugPrint('prod Id : ${productId}');
    // // debugPrint(
    // //     "${product['prodName']} is in cart : ${cart.toString().contains(productId)}");
    // return cart.toString().contains(productId);
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
    widget.handleIntake!();
    setState(() {});
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
        element['productId'] == widget.prodId &&
        element['description'] == weight);
    return check;
  }

  addChanges() {
    if (widget.products['priceList'].toString().runtimeType == String &&
        widget.products['priceList'].toString() != '[]') {
      widget.products['priceList'] = jsonDecode(widget.products['priceList']);
    }
  }

  Future<void> handleAddItemClick(
      {product, priceListIndex, updateState, productId}) async {
    var productItem = product.containsKey('data') ? product['data'] : product;
    if (productItem['priceList'][priceListIndex]['totalQuantity'] == '0' &&
        productItem['stopWhenNoQty'] == true) {
      Navigator.of(context)
          .pushNamed('/productInfo', arguments: {"id": widget.products['id']});
    } else {
      showDialog(
        barrierDismissible: false,
        context: context,
        builder: (context) => loader(context),
      );
      Completer<void> completer = Completer<void>();
      await CartService().addToCart(
          priceListIndex: priceListIndex,
          product: productItem,
          context: context,
          productId: widget.prodId);

      Fluttertoast.showToast(msg: 'Item added to bag.');
      setState(() {});
      Navigator.pop(context);
      widget.handleIntake!();
      updateState(() {});
      completer.complete();
      setState(() {});
      return completer.future;
    }
  }

  @override
  void initState() {
    // addChanges();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    // var size = MediaQuery.of(context).size;
    // var exRateProvider = Provider.of<CurrencyProvider>(context);

    return InkWell(
      onTap: () {
        // debugPrint("prod id :${widget.products[]}");
        Navigator.of(context).pushNamed('/productInfo',
            arguments: {"id": widget.products['id']});
      },
      child: Container(
        height: widget.height,
        width: widget.width,
        color: Colors.white,
        padding: const EdgeInsets.symmetric(horizontal: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 5),
            SizedBox(
              child: Stack(
                children: [
                  Container(
                    height: widget.height / 1.5,
                    width: widget.width,
                    decoration: BoxDecoration(
                        border: Border.all(color: Colors.grey.withOpacity(0.5)),
                        borderRadius: const BorderRadius.only(
                            bottomRight: Radius.circular(15),
                            topLeft: Radius.circular(10))),
                    child: Stack(
                      children: [
                        ClipRRect(
                          borderRadius: const BorderRadius.only(
                            topLeft: Radius.circular(10),
                            bottomRight: Radius.circular(15),
                          ),
                          child: CachedNetworkImage(
                            fit: BoxFit.cover,
                            imageUrl: widget.products['coverPic']['url'] ??
                                widget.products['coverPic']['thumb'] ??
                                'https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-19.jpg',
                            errorWidget: (context, url, error) {
                              return Image.network(
                                'https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-19.jpg',
                              );
                            },
                            placeholder: (context, url) => Container(
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(15),
                              ),
                              child: Shimmer.fromColors(
                                baseColor: Colors.white,
                                highlightColor: AppTheme().secondaryColor,
                                child: Container(
                                  margin: const EdgeInsets.symmetric(
                                    vertical: 0,
                                  ),
                                  child: Column(
                                    children: [
                                      Container(
                                        color: Colors.grey,
                                        child: const Text(''),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),

                        Positioned(
                          bottom: 3,
                          left: 3,
                          child: Text(
                            widget.products['vendorName'] ?? '',
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                              color: Colors.grey,
                              fontSize: 13,
                            ),
                          ),
                        ),
                        // const Positioned(
                        //   top: 3,
                        //   right: 3,
                        //   child: Icon(Icons.favorite_border),
                        // ),
                        if (calculateDiscountPercentage(widget.products) > 0)
                          Positioned(
                            top: 3,
                            left: 3,
                            child: Container(
                              decoration: BoxDecoration(
                                  color: Colors.yellow,
                                  borderRadius: BorderRadius.circular(5)),
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 3, vertical: 1),
                              child: Text(
                                '${calculateDiscountPercentage(widget.products)}% off',
                                style: const TextStyle(fontSize: 13),
                              ),
                            ),
                          ),
                        // if (widget.enableAddToCart)
                        Positioned(
                          bottom: 0,
                          right: 0,
                          child: InkWell(
                            onTap: () => widget.products
                                        .containsKey('productType') &&
                                    widget.products['productType'] ==
                                        "appointment"
                                // ? handleFarmBooking(widget.products, 0)
                                ? const SizedBox()
                                : DatabaseService()
                                            .checkPdtStock(widget.products) ==
                                        false
                                    ? checkIfProductIsInCart(widget.products,
                                            widget.products['priceList'], 0)
                                        ? handleRemoveItemFromCart(
                                            widget.products,
                                            0,
                                            widget.products['id'])
                                        : handleAddItemClick(
                                            priceListIndex: 0,
                                            product: widget.products,
                                            updateState: () {})
                                    : Fluttertoast.showToast(
                                        msg: 'Out Of Stock'),
                            child: Container(
                              decoration: const BoxDecoration(
                                  color: Colors.red,
                                  borderRadius: BorderRadius.only(
                                      bottomRight: Radius.circular(15),
                                      topLeft: Radius.circular(5))),
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 3, vertical: 1),
                              child: checkCartProduct(
                                      widget.products,
                                      0,
                                      widget.products['id'] ??
                                          (widget.products.containsKey('data')
                                              ? widget.products['data']['id']
                                              : widget.products['id']))
                                  ? const Icon(
                                      Icons.remove,
                                      color: Colors.white,
                                    )
                                  : const Icon(
                                      Icons.add,
                                      color: Colors.white,
                                    ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  DatabaseService().checkPdtStock(widget.products) &&
                          widget.products['productType'] != "appointment"
                      ? Positioned(
                          top: 60,
                          child: Container(
                            color: Colors.white.withOpacity(0.8),
                            padding: const EdgeInsets.symmetric(vertical: 5),
                            width: widget.width,
                            child: const Center(
                              child: Text(
                                "OUT OF STOCK",
                                style: TextStyle(
                                  color: Colors.red,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 14,
                                ),
                              ),
                            ),
                          ))
                      : const SizedBox(),
                  Positioned(
                    top: MediaQuery.of(context).size.height * 0.11,
                    left: MediaQuery.of(context).size.width * 0.19,
                    child: InkWell(
                      onTap: () {
                        handleAddItemClick(
                                product: {
                              ...widget.products,
                              "priceList": widget.products['priceList']
                            },
                                priceListIndex: widget.index,
                                updateState: setState,
                                productId: widget.products)
                            .whenComplete(() async {
                          Navigator.pop(context);
                        });
                      },
                      child: Container(
                        decoration: const BoxDecoration(
                            color: Colors.red,
                            borderRadius: BorderRadius.only(
                                bottomRight: Radius.circular(10))),
                        // child: const Icon(
                        //   Icons.add,
                        //   color: Colors.white,
                        // )
                      ),
                    ),
                  )
                ],
              ),
            ),
            const SizedBox(
              height: 5,
            ),
            Padding(
              padding: const EdgeInsets.only(left: 7, right: 5),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(
                    height: 3,
                  ),
                  Text(
                    widget.products['prodName'],
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                        fontSize: 14, fontWeight: FontWeight.w600),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 3),
            Padding(
              padding: const EdgeInsets.only(left: 7, right: 5),
              child: SizedBox(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // InkWell(
                    //   onTap: () => handleAddToCart(
                    //       products, size),
                    //   child: Container(
                    //     padding:
                    //         const EdgeInsets.only(left: 5),
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
                    //             products['priceList']
                    //                     [0]['weight']
                    //                 .toString(),
                    //             overflow:
                    //                 TextOverflow.ellipsis,
                    //             style: const TextStyle(
                    //                 fontSize: 13,
                    //                 fontWeight:
                    //                     FontWeight.w500,
                    //                 color: Color.fromARGB(
                    //                     255, 79, 79, 79)),
                    //           ),
                    //         ),
                    //         Container(
                    //           decoration: const BoxDecoration(
                    //             border: Border(
                    //               left: BorderSide(
                    //                 color: Color.fromARGB(
                    //                     255, 201, 201, 201),
                    //                 width: 1,
                    //               ),
                    //             ),
                    //             gradient: LinearGradient(
                    //               colors: [
                    //                 Colors.white,
                    //                 Color.fromARGB(
                    //                     255, 230, 229, 229)
                    //               ],
                    //               begin: Alignment.centerLeft,
                    //               end: Alignment.centerRight,
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
                    // ),40/200 * 100
                    const SizedBox(
                      height: 5,
                    ),

                    if ((widget.products['priceList'] as List).isNotEmpty)
                      SizedBox(
                        width: double.infinity,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Expanded(
                              child: Row(
                                children: [
                                  if (widget.products['priceList'][0]
                                          ['discountedPrice'] !=
                                      null)
                                    Text(
                                      "${(double.parse(widget.products['priceList'][0]['discountedPrice'].toString()) * 1).toStringAsFixed(2)}  ",
                                      style: const TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  if (widget.products['priceList'][0]
                                          ['discountedPrice'] ==
                                      null)
                                    Text(
                                      "  ${(double.parse(widget.products['priceList'][0]['price'].toString()) * 1).toStringAsFixed(2)}",
                                      style: const TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),

                                  // widget.products['priceList'][0]
                                  //             ['discountedPrice'] !=
                                  //         widget.products['priceList'][0]
                                  //             ['price']
                                  //     ? Text(
                                  //         "${widget.products['priceList'][0]['price'].toString()} AED",
                                  //         style: const TextStyle(
                                  //           decoration:
                                  //               TextDecoration.lineThrough,
                                  //         ),
                                  //       )
                                  //     : const SizedBox(),
                                  // SizedBox(
                                  //     width: widget.products['priceList'][0]
                                  //                 ['discountedPrice'] !=
                                  //             widget.products['priceList'][0]
                                  //                 ['price']
                                  //         ? 5
                                  //         : 0),
                                  // Text(
                                  //   "${widget.products['priceList'][0]['discountedPrice'].toString()} AED",
                                  //   style: const TextStyle(
                                  //       fontSize: 16,
                                  //       fontWeight: FontWeight.w600),
                                  // ),
                                ],
                              ),
                            ),
                            // cart button
                            // InkWell( 
                            // onTap: () => products
                            //             .containsKey(
                            //                 'productType') &&
                            //         products['productType'] ==
                            //             "appointment"
                            //     ? handleFarmBooking(
                            //         products, 0)
                            //     : DatabaseService()
                            //                 .checkPdtStock(
                            //                     products[
                            //                         index]) ==
                            //             false
                            //         ? checkIfProductIsInCart(
                            //                 products[
                            //                     index],
                            //                 0)
                            //             ? handleRemoveItemFromCart(
                            //                 products[
                            //                     index],
                            //                 0)
                            //             : handleAddItemClick(
                            //                 priceListIndex:
                            //                     0,
                            //                 product:
                            //                     products[
                            //                         index],
                            //                 updateState:
                            //                     () {})
                            //         : Fluttertoast.showToast(
                            //             msg: 'Out Of Stock'),
                            //   child: Container(
                            //     decoration: BoxDecoration(
                            //       border: Border.all(
                            //         color: products[
                            //                     'productType'] ==
                            //                 "appointment"
                            //             ? AppTheme()
                            //                 .secondaryColor
                            //             : DatabaseService().checkPdtStock(
                            //                         products[
                            //                             index]) ==
                            //                     false
                            //                 ? AppTheme()
                            //                     .secondaryColor
                            //                 : Colors.grey,
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
                            //           products.containsKey(
                            //                       'productType') &&
                            //                   products
                            //                           [
                            //                           'productType'] ==
                            //                       "appointment"
                            //               ? "Book"
                            //               : checkIfProductIsInCart(
                            //                       products[
                            //                           index],
                            //                       0)
                            //                   ? "Remove"
                            //                   : 'Add',
                            //           style: TextStyle(
                            //             color: products
                            //                         [
                            //                         'productType'] ==
                            //                     "appointment"
                            //                 ? AppTheme()
                            //                     .secondaryColor
                            //                 : DatabaseService().checkPdtStock(products[
                            //                             index]) ==
                            //                         false
                            //                     ? AppTheme()
                            //                         .secondaryColor
                            //                     : Colors
                            //                         .grey,
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
      ),
    );
  }
}
