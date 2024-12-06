import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:intl/intl.dart';
import '../../constants/constants.dart';
import '../../providers/cartProvider.dart';
import '../../screens/myOrders/pdfView.dart';
import '../../theme/AppTheme.dart';
import '../../utils/databaseServices.dart';
import '../../widgets/loadingModal.dart';
import '../../widgets/screenHeader.dart';
import 'package:provider/provider.dart';

import '../return/returnScreen.dart';

class ViewOrders extends StatefulWidget {
  final dynamic data;
  const ViewOrders({super.key, required this.data});

  @override
  State<ViewOrders> createState() => _ViewOrdersState();
}

class _ViewOrdersState extends State<ViewOrders> {
  List<String> productsWithReturnRequest = [];
  Map<String, dynamic>? productsReturnData;

  @override
  void initState() {
    super.initState();
    fetchReturnRequests();
  }

  Future<Map?> fetchReturnRequests() async {
    try {
      DocumentSnapshot returnRequestDoc = await FirebaseFirestore.instance
          .collection('returnRequests')
          .doc(widget.data['orderId'].toString())
          .get();
      // print("dataaaa ${returnRequestDoc.data()}");
      if (returnRequestDoc.exists) {
        Map<String, dynamic>? returnData =
            returnRequestDoc.data() as Map<String, dynamic>?;

        if (returnData != null) {
          setState(() {
            productsReturnData = returnData;
          });
          // productsWithReturnRequest = productsReturnData.keys.toList();
        }
      }

      setState(() {});
    } catch (e) {
      print('Error fetching return requests: $e');
    }
    return null;
  }

  Future<void> checkAndUpdateProduct() async {
    Completer<void> completer = Completer<void>();

    for (var product in widget.data['products']) {
      dynamic productData = await FirebaseFirestore.instance
          .collection('products')
          .doc(product['productId'])
          .get()
          .then((value) {
        if (value.exists) {
          var data = value.data();

          if (data?['isPriceList']) {
            return {...?data, "id": value.id};
          } else {
            var priceList = [
              {
                "discountedPrice": data?['discountedPrice'],
                "inventory_item_id": "",
                "price": data?['prodPrice'],
                "purchasePrice": data?['discountedPrice'],
                "shippingWeight": data?['shippingWeight'] ?? 0,
                "totalQuantity": data?['productQty'],
                "weight": data?['prodName'],
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
      if (productData['status'] == true) {
        var priceListIndex = productData['priceList']
            .indexWhere((item) => item['weight'] == product['description']);
        print("$priceListIndex");
        var checkIfOutOfStock =
            DatabaseService().checkPdtVariantStock(productData, priceListIndex);
        if (!checkIfOutOfStock) {
          if (!Provider.of<Cart>(context, listen: false)
              .checkIfProductIsInCart(product['productId'])) {
            if (product['quantity'] <=
                int.parse(productData['priceList'][priceListIndex]
                    ['totalQuantity'])) {
              await Cart().addToCart(
                  priceListIndex: priceListIndex,
                  product: productData,
                  productId: product['productId'],
                  quantity: product['quantity']);
            } else {
              await Cart().addToCart(
                  priceListIndex: priceListIndex,
                  product: productData,
                  productId: product['productId'],
                  quantity: int.parse(productData['priceList'][priceListIndex]
                      ['totalQuantity']));
            }
          }
        }
      }
    }
    completer.complete();
    return completer.future;
  }

  getImageWidget(data, index) {
    if (data['products'][index]['img'].runtimeType == String) {
      return Image.network(
        data['products'][index]['img'],
        errorBuilder: (context, error, stackTrace) {
          return const SizedBox(
            width: 70,
            height: 70,
            child: Icon(
              Icons.image,
              size: 70,
              color: Color.fromARGB(255, 223, 223, 223),
            ),
          );
        },
      );
    }

    if (data['products'][index].containsKey('img') &&
        data['products'][index]['img'].containsKey('thumb')) {
      return Image.network(
        data['products'][index]['img']['thumb'],
        errorBuilder: (context, error, stackTrace) {
          return const SizedBox(
            width: 70,
            height: 70,
            child: Icon(
              Icons.image,
              size: 70,
              color: Color.fromARGB(255, 223, 223, 223),
            ),
          );
        },
      );
    }

    // return Image.asset(
    //   'assets/images/placeholder.png',
    // );
    return Image.network(
        'https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-19.jpg');
  }

  handleReorder() async {
    // print(widget.data['products']);
    showDialog(
      barrierDismissible: false,
      context: context,
      builder: (context) => loader(context),
    );

    await checkAndUpdateProduct();

    await DatabaseService().getCartDetails(context);

    Navigator.pop(context);

    Navigator.of(context).pushNamed('/cart');
    // Timer(Duration(milliseconds: 2000), () {
    // });
  }

  checkIfDoPaymentVisible() {
    if (!['Pending', 'Confirmed', 'Dispatched']
        .contains(widget.data['status'])) {
      return false;
    }
    if ((!widget.data['payment']['completed']) ||
        (widget.data['payment'].containsKey('status') &&
            (widget.data['payment']['status'] == 'failed' ||
                widget.data['payment']['status'] == 'pending'))) {
      return true;
    }
    return false;
  }

  Future<List<Map<String, dynamic>>> getUpdatedPdts(
      List<Map<String, dynamic>> pdts, List<dynamic> cartPdts) async {
    return Future<List<Map<String, dynamic>>>.value(
        await Future.wait(cartPdts.map((c) async {
      final productIndex = pdts.indexWhere((p) => p['id'] == c['productId']);
      if (productIndex != -1) {
        final dbProduct = pdts[productIndex];
        c['name'] = dbProduct['prodName'];
        c['maxQty'] = dbProduct['maxQty'] ?? 0;
        c['minQty'] = dbProduct['minQty'] ?? 1;
        c['status'] = dbProduct['inactiveByVendor'] == true
            ? false
            : dbProduct['status'] ?? true;
        c['stopWhenNoQty'] = dbProduct.containsKey('stopWhenNoQty') &&
                dbProduct['stopWhenNoQty'] != null
            ? dbProduct['stopWhenNoQty']
            : false;
        c['retailDiscount'] = dbProduct.containsKey('retailDiscount')
            ? dbProduct['retailDiscount']
            : 0;
        c['retailDiscountType'] =
            dbProduct['retailDiscountType'] ?? 'percentage';
        c['extraCharges'] = (dbProduct.containsKey('extraCharges') &&
                dbProduct['extraCharges'] is Map &&
                dbProduct['extraCharges']['active'] == true)
            ? dbProduct['extraCharges']
            : {'charge': 0};
        c['img'] = dbProduct['coverPic'];

        if (!c.containsKey('pack')) {
          c['totalQty'] = dbProduct['productQty'] ?? '';
          if (int.tryParse(dbProduct['productQty']) != null &&
              (c['quantity'] > int.parse(dbProduct['productQty']))) {
            c['quantity'] = int.parse(dbProduct['productQty']);
          }
          if (dbProduct['discountedPrice'] != null &&
              dbProduct['discountedPrice'] != dbProduct['prodPrice']) {
            c['price'] = dbProduct['discountedPrice'];
            c['mrpPrice'] = dbProduct['prodPrice'];
          } else {
            c['price'] = dbProduct['prodPrice'];
          }
        } else {
          if (c['pack']['variantType'] != 'pieces') {
            dbProduct['priceList'].forEach((pl) {
              if (pl['weight'] == c['pack']['weight']) {
                c['totalQty'] = pl['totalQuantity'] ?? '';
                if (int.tryParse(pl['totalQuantity']) != null &&
                    (c['quantity'] > int.parse(pl['totalQuantity']))) {
                  c['quantity'] = int.parse(pl['totalQuantity']);
                }
                if (pl['discountedPrice'] != null &&
                    pl['discountedPrice'] != pl['price']) {
                  c['price'] = pl['discountedPrice'];
                  c['mrpPrice'] = pl['price'];
                  c['pack']['price'] = pl['price'];
                } else {
                  c['price'] = pl['price'];
                  c['pack']['price'] = pl['price'];
                }
              }
            });
          } else {
            dbProduct['priceList'].forEach((pl) {
              if (pl['weight'] == c['pack']['weight']) {
                c['totalQty'] = pl['totalQuantity'] ?? '';
                if (int.tryParse(pl['totalQuantity']) != null &&
                    (c['quantity'] > int.parse(pl['totalQuantity']))) {
                  c['quantity'] = int.parse(pl['totalQuantity']);
                }
                if (pl['discountedPrice'] != null &&
                    pl['discountedPrice'] != pl['price']) {
                  c['price'] = pl['discountedPrice'] * int.parse(pl['weight']);
                  c['mrpPrice'] = pl['price'] * int.parse(pl['weight']);
                  c['pack']['price'] =
                      pl['discountedPrice'] * int.parse(pl['weight']);
                  c['pack']['perPcPrice'] = pl['discountedPrice'];
                } else {
                  c['price'] = pl['price'] * int.parse(pl['weight']);
                  c['pack']['price'] = pl['price'] * int.parse(pl['weight']);
                  c['pack']['perPcPrice'] = pl['price'];
                }
              }
            });
          }
        }
      } else {
        c['status'] = false;
      }
      return c;
    })));
  }

  fetchUpdatedCart(cartProducts) async {
    try {
      List<Map<String, dynamic>> latestProducts = [];
      List<Map<String, dynamic>> updatedCartPdts = [];

      for (int index = 0; index < cartProducts.length; index++) {
        DocumentSnapshot productSnapshot = await FirebaseFirestore.instance
            .collection('products')
            .doc(cartProducts[index]['productId'])
            .get();

        if (productSnapshot.exists) {
          dynamic product = productSnapshot.data()!;
          product['id'] = cartProducts[index]['productId'];
          latestProducts.add(product);
        }
      }

      if (latestProducts.isNotEmpty) {
        updatedCartPdts = await getUpdatedPdts(latestProducts, cartProducts);
      }

      return updatedCartPdts;
    } catch (error) {
      print(error);
      return [];
    }
  }

  bool isOrderSourceManual() {
    bool result = false;
    if (widget.data['metaData'] != null &&
        widget.data['metaData']['source'] == 'manual') {
      result = true;
    }
    return result;
  }

  Future<Map<String, dynamic>> compareCartWithUpdatedCart(
      List<dynamic> cartProducts) async {
    List<dynamic> updatedCart = await fetchUpdatedCart(cartProducts);
    List<String> updateFields = [
      'maxQty',
      'minQty',
      'price',
      'status',
      'gst',
      'shippingWt'
    ];
    print('updatedCart: $updatedCart');

    List<dynamic> cartList = [];
    bool cartUpdated = false;

    for (var cart in cartProducts) {
      int index = updatedCart.indexWhere((uc) => uc['id'] == cart['id']);
      if (index != -1) {
        Map<String, dynamic> change = updatedCart[index];
        change['quantity'] = cart['quantity'];
        print(cart.entries);

        for (var element in cart.entries) {
          if (!cartUpdated && updateFields.contains(element.key)) {
            cartUpdated = cart[element.key] != change[element.key];
          }
          if (change['price'] != cart['price']) {
            cart['priceStatus'] = {
              'status':
                  change['price'] > cart['price'] ? 'increase' : 'decrease',
              'priceDifference': (change['price'] - cart['price']).abs(),
            };
          }
        }

        // for (String key in cart.entries) {
        //   if (!cartUpdated && updateFields.contains(key)) {
        //     cartUpdated = cart[key] != change[key];
        //   }
        //   if (change['price'] != cart['price']) {
        //     cart['priceStatus'] = {
        //       'status':
        //           change['price'] > cart['price'] ? 'increase' : 'decrease',
        //       'priceDifference': (change['price'] - cart['price']).abs(),
        //     };
        //   }
        // }
        cartList.add(cart);
      } else {
        cartUpdated = true;
      }
    }

    print('cartUpdated: $cartUpdated');

    return {'cartList': cartList, 'cartUpdated': cartUpdated};
  }

  Future<bool> inventoryManagement(Map<String, dynamic> data) async {
    try {
      final manageInventory =
          FirebaseFunctions.instance.httpsCallable('orders-manageInventory');
      final result = await manageInventory.call(data);
      final status = result.data['status'] as bool;
      return status;
    } catch (e) {
      // Handle any exceptions or errors here
      return false;
    }
  }

  handleDoPayment() async {
    showDialog(
      barrierDismissible: false,
      context: context,
      builder: (context) => loader(context),
    );

    bool isProductsUpdated = false;

    if (!isOrderSourceManual()) {
      var cartComparisonResult = await compareCartWithUpdatedCart(
        widget.data['products'],
      );
      isProductsUpdated = cartComparisonResult['cartUpdated'];
    }

    bool isQtyAvailable = true;

    if (!isProductsUpdated) {
      var order = widget.data;
      bool isInventoryManaged = order['metaData'] != null
          ? order['metaData']['inventoryManaged']
          : true;

      if (!isInventoryManaged) {
        isQtyAvailable = await inventoryManagement({
          "products": widget.data['products'],
          "orderId": widget.data['id']
        });
      }

      if (isQtyAvailable) {
        // loading.dismiss();
        Navigator.pop(context);

        double newPrice =
            double.parse(widget.data['totalAmountToPaid'].toString());

        // if ((widget.data['payment']['mode'] == "cashfree" &&
        //     !widget.data['payment']['completed'])) {}

        if (widget.data['metaData']['walletDeducted']) {
          if (widget.data.containsKey('cashbackAmount')) {
            newPrice = newPrice -
                double.parse(widget.data['cashbackAmount'].toString());
          }
          if (widget.data.containsKey('walletAmount')) {
            newPrice =
                newPrice - double.parse(widget.data['walletAmount'].toString());
          }
        }

        Navigator.of(context).pushNamed('/orderPayment', arguments: {
          "paymentDetails": {
            "totalPayable": newPrice,
            "totalMrp": widget.data['totalMrp'] ?? 0,
            "discountOnMrp": widget.data['discountOnMrp'] ?? 0,
            "delivery": {"deliveryCost": widget.data['delivery'] ?? 0},
            "totalGst": widget.data['totalAmountToPaid'],
            "deliveryGstObj": widget.data['deliveryGstObj'],
          },
          "address": widget.data['address'],
          "couponId": widget.data['couponId'],
          "couponName": widget.data['couponName'],
          "couponDiscount": widget.data['couponDiscount'],
          "isRedo": true,
          "existingOrderId": widget.data['id']
        });
        return true;
      }
    }

    if (isProductsUpdated || !isQtyAvailable) {
      Fluttertoast.showToast(
          toastLength: Toast.LENGTH_LONG,
          msg:
              "Cannot proceed with payment because the quantity or price of the products are changed.");
      return false;
    }
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        // backgroundColor: AppTheme().scaffoldColor,
        body: Column(
          children: [
            ScreenHeader(size: size, title: "ORDERS", isBackButton: true),
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    const SizedBox(height: 15),
                    // checkIfDoPaymentVisible()
                    //     ? Row(
                    //         mainAxisAlignment: MainAxisAlignment.center,
                    //         children: [
                    //           InkWell(
                    //             onTap: handleDoPayment,
                    //             child: Container(
                    //               padding: EdgeInsets.symmetric(
                    //                 horizontal: size.width * 0.1,
                    //                 vertical: size.width * 0.02,
                    //               ),
                    //               decoration: BoxDecoration(
                    //                 color: AppTheme().secondaryColor,
                    //                 borderRadius: BorderRadius.circular(
                    //                   100,
                    //                 ),
                    //               ),
                    //               child: Text(
                    //                 "Do Payment",
                    //                 style: AppTheme().outfitStyle(
                    //                     color: Colors.white,
                    //                     fontWeight: FontWeight.w600),
                    //               ),
                    //             ),
                    //           )
                    //     ],
                    //   )
                    // : const SizedBox(),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Container(
                        // decoration: BoxDecoration(
                        //     color: Colors.white,
                        //     borderRadius: BorderRadius.circular(10),
                        //     border: Border.all(color: Colors.black12)),
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Container(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Column(
                                  children: widget.data['products']
                                      .asMap()
                                      .entries
                                      .map<Widget>((e) {
                                    int index = e.key;
                                    dynamic value = e.value;
                                    bool hasReturnRequest = productsReturnData
                                        .toString()
                                        .contains(value['productId']);
                                    return Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child: SizedBox(
                                        width: double.infinity,
                                        // decoration: BoxDecoration(
                                        //     borderRadius:
                                        //         BorderRadius.circular(10),
                                        //     border: Border.all(
                                        //         color: Colors.black12)),
                                        child: Padding(
                                          padding: const EdgeInsets.all(8.0),
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.center,
                                            children: [
                                              Text(
                                                  "ORDER ID: ${widget.data['orderId']}"),
                                              Container(
                                                  width: 170,
                                                  height: 170,
                                                  decoration: BoxDecoration(
                                                      border: Border.all(
                                                          color: AppTheme()
                                                              .themeColor
                                                              .withOpacity(
                                                                  0.4)),
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              4)),
                                                  child: getImageWidget(
                                                      widget.data, index)

                                                  //  Image.asset(
                                                  //   'assets/images/placeholder.png',
                                                  //   width: 70,
                                                  //   height: 70,
                                                  // ),
                                                  ),
                                              const SizedBox(height: 30),
                                              Text(
                                                '${value['name']}',
                                                style: AppTheme().outfitStyle(
                                                    fontSize: 16,
                                                    fontWeight:
                                                        FontWeight.w500),
                                              ),

                                              const SizedBox(height: 10),
                                              !value.containsKey('pack')
                                                  ? const SizedBox()
                                                  : Text(
                                                      '${value['pack']['weight']}',
                                                      style: AppTheme()
                                                          .outfitStyle(
                                                              fontSize: 13,
                                                              fontWeight:
                                                                  FontWeight
                                                                      .w300),
                                                    ),
                                              const SizedBox(height: 10),
                                              Text(
                                                '${Constants().rupees}${value['price']}',
                                                style: AppTheme().outfitStyle(
                                                    fontSize: 16,
                                                    fontWeight:
                                                        FontWeight.w300),
                                              ),
                                              const SizedBox(height: 10),
                                              Container(
                                                decoration: BoxDecoration(
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                            2),
                                                    color:
                                                        const Color(0xff03a685)
                                                            .withOpacity(0.8)),
                                                // alignment: Alignment.centerLeft,
                                                height: 40,
                                                child: Column(
                                                  mainAxisAlignment:
                                                      MainAxisAlignment.center,
                                                  crossAxisAlignment:
                                                      CrossAxisAlignment.start,
                                                  children: [
                                                    Row(
                                                      mainAxisAlignment:
                                                          MainAxisAlignment
                                                              .spaceBetween,
                                                      children: [
                                                        // Text(
                                                        //   'Products',
                                                        //   style: AppTheme()
                                                        //       .outfitStyle(),
                                                        // ),
                                                        Wrap(
                                                          crossAxisAlignment:
                                                              WrapCrossAlignment
                                                                  .center,
                                                          children: [
                                                            const SizedBox(
                                                                width: 8),
                                                            widget.data['status'] ==
                                                                    'Pending'
                                                                ? const Icon(
                                                                    Icons
                                                                        .access_time,
                                                                    size: 18,
                                                                    color: Colors
                                                                        .amber,
                                                                  )
                                                                : widget.data[
                                                                            'status'] ==
                                                                        'Rejected'
                                                                    ? const Icon(
                                                                        Icons
                                                                            .cancel,
                                                                        color: Colors
                                                                            .red,
                                                                      )
                                                                    : widget.data['status'] ==
                                                                            'Confirmed'
                                                                        ? const Icon(
                                                                            Icons.check,
                                                                            color:
                                                                                Colors.white,
                                                                          )
                                                                        : widget.data['status'] ==
                                                                                'Delivered'
                                                                            ? const Icon(
                                                                                Icons.local_shipping_outlined,
                                                                                color: Colors.white,
                                                                              )
                                                                            : const SizedBox(),
                                                            const SizedBox(
                                                                width: 8),
                                                            Column(
                                                              crossAxisAlignment:
                                                                  CrossAxisAlignment
                                                                      .start,
                                                              children: [
                                                                Text(
                                                                    '${widget.data['status']}',
                                                                    style: AppTheme().outfitStyle(
                                                                        color: Colors
                                                                            .white,
                                                                        fontWeight:
                                                                            FontWeight.w500)),
                                                                Text(
                                                                  DateFormat(
                                                                          'dd MMMM yyyy, hh:mm a')
                                                                      .format(widget
                                                                          .data[
                                                                              'createdAt']
                                                                          .toDate()),
                                                                  style: Theme.of(
                                                                          context)
                                                                      .textTheme
                                                                      .headlineSmall!
                                                                      .merge(AppTheme().outfitStyle(
                                                                          fontSize:
                                                                              14,
                                                                          color: Colors
                                                                              .white,
                                                                          fontWeight:
                                                                              FontWeight.w400)),
                                                                ),
                                                              ],
                                                            ),
                                                            const SizedBox(
                                                                width: 4),
                                                          ],
                                                        ),
                                                      ],
                                                    ),
                                                  ],
                                                ),
                                              ),
                                              // const Divider(),
                                              // Row(
                                              //   children: [
                                              //     const SizedBox(width: 10),
                                              //     const SizedBox(width: 20),
                                              //     Expanded(
                                              //       child: Column(
                                              //         crossAxisAlignment:
                                              //             CrossAxisAlignment
                                              //                 .start,
                                              //         children: [
                                              //           Text(
                                              //               '${Constants().rupees}${value['price']}'),
                                              //           const SizedBox(
                                              //               height: 10),
                                              //           Text(
                                              //               '${value['name']}'),
                                              //           const SizedBox(
                                              //               height: 10),
                                              //           !value.containsKey(
                                              //                   'pack')
                                              //               ? const SizedBox()
                                              //               : Text(
                                              //                   'Weight: ${value['pack']['weight']}'),
                                              //           const SizedBox(
                                              //               height: 10),
                                              //         ],
                                              //       ),
                                              //     ),
                                              //   ],
                                              // ),
                                              // Align(
                                              //     alignment:
                                              //         Alignment.bottomRight,
                                              //     child: Text(
                                              //       'QTY:${value['quantity']}',
                                              //       style: AppTheme()
                                              //           .outfitStyle(),
                                              //     )),

                                              const SizedBox(height: 18),
                                              index == 0
                                                  ? Center(
                                                      child: ElevatedButton(
                                                          style: ElevatedButton
                                                              .styleFrom(
                                                                  backgroundColor:
                                                                      AppTheme()
                                                                          .mainColor,
                                                                  // minimumSize: Size(50, 20),
                                                                  shape: RoundedRectangleBorder(
                                                                      borderRadius:
                                                                          BorderRadius.circular(
                                                                              0))),
                                                          onPressed: () {
                                                            handleReorder();
                                                          },
                                                          child: Wrap(
                                                            crossAxisAlignment:
                                                                WrapCrossAlignment
                                                                    .center,
                                                            children: [
                                                              Text(
                                                                'Reorder',
                                                                style: AppTheme()
                                                                    .outfitStyle(
                                                                  fontSize: 14,
                                                                  color: Colors
                                                                      .white,
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .w500,
                                                                ),
                                                              ),
                                                              const Icon(
                                                                Icons.replay,
                                                                size: 16,
                                                              )
                                                            ],
                                                          )),
                                                    )
                                                  : const SizedBox(),
                                              if (hasReturnRequest)
                                                Text(
                                                  "Return Status: ${productsReturnData!['products'][value['productId']]['return']['status'].toString()}",
                                                  style: const TextStyle(),
                                                )
                                              else
                                                ElevatedButton(
                                                  onPressed: () async {
                                                    dynamic result =
                                                        await Navigator.push(
                                                      context,
                                                      MaterialPageRoute(
                                                        builder: (context) =>
                                                            ReturnRequestScreen(
                                                          orderId: widget
                                                              .data['orderId']
                                                              .toString(),
                                                          productData: value,
                                                        ),
                                                      ),
                                                    );

                                                    if (result == true) {
                                                      fetchReturnRequests();
                                                    }
                                                  },
                                                  style:
                                                      ElevatedButton.styleFrom(
                                                          backgroundColor:
                                                              AppTheme()
                                                                  .mainColor,
                                                          // minimumSize: Size(50, 20),
                                                          shape: RoundedRectangleBorder(
                                                              borderRadius:
                                                                  BorderRadius
                                                                      .circular(
                                                                          0))),
                                                  //     ElevatedButton.styleFrom(
                                                  //   primary: AppTheme()
                                                  //       .secondaryColor,
                                                  //   onPrimary: Colors.white,
                                                  // ),
                                                  child: Text(
                                                    "Return",
                                                    style:
                                                        AppTheme().outfitStyle(
                                                      fontSize: 14,
                                                      color: Colors.white,
                                                      fontWeight:
                                                          FontWeight.w500,
                                                    ),
                                                  ),
                                                ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    );
                                  }).toList(),
                                ),
                                // Container(
                                //   height: 40,
                                //   width: double.infinity,
                                //   alignment: Alignment.centerLeft,
                                //   child: Text('Order Placed',
                                //       style: AppTheme().outfitStyle()),
                                // ),
                                // const Divider(),
                                // Text(
                                //   DateFormat('dd MMMM yyyy, hh:mm a').format(
                                //       widget.data['createdAt'].toDate()),
                                //   style: Theme.of(context)
                                //       .textTheme
                                //       .headlineSmall!
                                //       .merge(
                                //           AppTheme().outfitStyle(fontSize: 14)),
                                // ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Container(
                        decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(0),
                            border: Border.all(color: Colors.black12)),
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Container(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Container(
                                  height: 40,
                                  width: double.infinity,
                                  alignment: Alignment.centerLeft,
                                  child: Text(
                                    'DELIVERY ADDRESS',
                                    style: AppTheme().outfitStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.bold),
                                  ),
                                ),
                                // const Divider(),
                                const SizedBox(height: 12),
                                Row(
                                  children: [
                                    Text(
                                      widget.data['userName'],
                                      style: Theme.of(context)
                                          .textTheme
                                          .headlineSmall!
                                          .merge(AppTheme().outfitStyle(
                                              fontSize: 14,
                                              fontWeight: FontWeight.w500)),
                                    ),
                                    const SizedBox(width: 8),
                                    Text(
                                      widget.data['userPhoneNo'],
                                      style: Theme.of(context)
                                          .textTheme
                                          .headlineSmall!
                                          .merge(AppTheme().outfitStyle(
                                              fontSize: 14,
                                              fontWeight: FontWeight.w500)),
                                    ),
                                  ],
                                ),

                                const SizedBox(height: 6),
                                Text(
                                  widget.data['address']['address'],
                                  style: Theme.of(context)
                                      .textTheme
                                      .headlineSmall!
                                      .merge(
                                          AppTheme().outfitStyle(fontSize: 14)),
                                ),
                                const SizedBox(height: 6),
                                Text(
                                  widget.data['address']['city'],
                                  style: Theme.of(context)
                                      .textTheme
                                      .headlineSmall!
                                      .merge(
                                          AppTheme().outfitStyle(fontSize: 14)),
                                ),
                                !widget.data.containsKey('phoneNo')
                                    ? const SizedBox(height: 0)
                                    : const SizedBox(height: 20),
                                Text(
                                  !widget.data.containsKey('phoneNo')
                                      ? ''
                                      : widget.data['phoneNo'],
                                  style: Theme.of(context)
                                      .textTheme
                                      .headlineSmall!
                                      .merge(const TextStyle(fontSize: 18)),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                    // Padding(
                    //   padding: const EdgeInsets.all(8.0),
                    //   child: Container(
                    //     width: double.infinity,
                    //     decoration: BoxDecoration(
                    //         borderRadius: BorderRadius.circular(10),
                    //         border: Border.all(color: Colors.black12)),
                    //     child: Padding(
                    //       padding: const EdgeInsets.all(8.0),
                    //       child: Column(
                    //         crossAxisAlignment: CrossAxisAlignment.start,
                    //         children: [
                    //           Container(
                    //               alignment: Alignment.centerLeft,
                    //               height: 40,
                    //               child: const Text('PAYMENT INFO')),
                    //           const Divider(),
                    //           Container(
                    //               alignment: Alignment.centerLeft,
                    //               height: 50,
                    //               child: Text(
                    //                   'Pay ${Constants().rupees}${widget.data.containsKey('totalAmountToPaid') ? '${double.parse(widget.data['totalAmountToPaid'].toString()).toDouble().toStringAsFixed(2)}' : '0.00'}')),
                    //         ],
                    //       ),
                    //     ),
                    //   ),
                    // ),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Container(
                        width: double.infinity,
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(0),
                            border: Border.all(color: Colors.black12)),
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Container(
                                  alignment: Alignment.centerLeft,
                                  height: 30,
                                  child: Text('DELIVERY VERIFICATION',
                                      style: AppTheme().outfitStyle(
                                          fontWeight: FontWeight.bold))),
                              const Divider(),
                              Container(
                                alignment: Alignment.centerLeft,
                                height: 40,
                                child: Wrap(
                                  children: [
                                    Text(
                                      'OTP: ',
                                      style: AppTheme().outfitStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                    Text(
                                      '${widget.data['deliveryVerification']['otp']}',
                                      style: AppTheme().outfitStyle(),
                                    ),
                                  ],
                                ),
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                    widget.data.containsKey('invoice')
                        ? getInvoice()
                        : const SizedBox(),
                    priceDetails(),
                    widget.data.containsKey('cancelData')
                        ? cancelledReason()
                        : const SizedBox(),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget priceDetails() {
    // print(widget.data['discountOnMrp']);
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Container(
        decoration: BoxDecoration(
            border: Border.all(color: Colors.black12),
            borderRadius: BorderRadius.circular(0)),
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                height: 30,
                width: double.infinity,
                alignment: Alignment.centerLeft,
                child: Text(
                  'Total Order Price (${widget.data['products'].length} ITEM)',
                  style: AppTheme()
                      .outfitStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
              ),
              if (widget.data['payment']['mode'] == 'online' ||
                  widget.data['payment']['mode'] == 'cash')
                Row(
                  children: [
                    Text(
                      'Payment Mode:  ${widget.data['payment']['mode']}',
                      style: AppTheme().outfitStyle(),
                    ),
                    const SizedBox(width: 6),
                    widget.data['payment']['mode'] == 'online'
                        ? const Icon(
                            Icons.payments,
                            size: 14,
                            color: Color(0xff03a685),
                          )
                        : const SizedBox(),
                  ],
                ),
              const Divider(),
              const SizedBox(
                height: 20,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Subtotal', style: AppTheme().outfitStyle()),
                  Text(
                      '${Constants().rupees}${double.parse(widget.data['totalMrp'].toString()).toDouble().toStringAsFixed(2)}',
                      style: AppTheme().outfitStyle()),
                ],
              ),
              SizedBox(
                height: widget.data['discountOnMrp'] == 0 ? 0 : 30,
              ),
              widget.data['discountOnMrp'] == 0
                  ? const SizedBox()
                  : Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Discount', style: AppTheme().outfitStyle()),
                        Text(
                          '-${Constants().rupees}${widget.data['discountOnMrp'].toString()}',
                          style: AppTheme()
                              .outfitStyle(color: const Color(0xff03a685)),
                        ),
                      ],
                    ),
              const SizedBox(
                height: 30,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Delivery', style: AppTheme().outfitStyle()),
                  widget.data['delivery'] != 0
                      ? Text(
                          '${Constants().rupees}${widget.data['delivery']}',
                          style: AppTheme()
                              .outfitStyle(color: const Color(0xff03a685)),
                        )
                      : Text('Free',
                          style: AppTheme()
                              .outfitStyle(color: const Color(0xff03a685))),
                ],
              ),
              const SizedBox(
                height: 30,
              ),
              const Divider(),
              const SizedBox(
                height: 20,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Total Amount',
                    style: AppTheme()
                        .outfitStyle(fontSize: 14, fontWeight: FontWeight.bold),
                  ),
                  Text(
                    '${Constants().rupees}${double.parse(widget.data['totalAmountToPaid'].toString()).toDouble().toStringAsFixed(2)}',
                    style: AppTheme()
                        .outfitStyle(fontSize: 14, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
              const SizedBox(
                height: 20,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget cancelledReason() {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Container(
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
            border: Border.all(color: Colors.black12)),
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              Container(
                height: 30,
                width: double.infinity,
                alignment: Alignment.centerLeft,
                child: const Text('CANCELLED REASON'),
              ),
              const Divider(),
              const SizedBox(
                height: 20,
              ),
              Text('${widget.data['cancelData']['reason']}')
            ],
          ),
        ),
      ),
    );
  }

  Widget getInvoice() {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Container(
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
            border: Border.all(color: Colors.black12)),
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                height: 30,
                width: double.infinity,
                alignment: Alignment.centerLeft,
                child: const Text('INVOICE'),
              ),
              const Divider(),
              InkWell(
                onTap: () {
                  print(widget.data['invoice']['url']);
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => MyPdf(
                                url: widget.data['invoice']['url'],
                                orderId: '${widget.data['orderId']}',
                              )));
                },
                child: Container(
                  height: 30,
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'View Invoice',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: AppTheme().secondaryColor),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}


//Old view orders
// import 'package:cloud_firestore/cloud_firestore.dart';
// import 'package:cloud_functions/cloud_functions.dart';
// import 'package:flutter/material.dart';
// import 'package:flutter/rendering.dart';
// import 'package:fluttertoast/fluttertoast.dart';
// import 'package:intl/intl.dart';
// import 'package:shein/constants/constants.dart';
// import 'package:shein/providers/cartProvider.dart';
// import 'package:shein/screens/myOrders/pdfView.dart';
// import 'package:shein/theme/AppTheme.dart';
// import 'package:shein/utils/databaseServices.dart';
// import 'package:shein/widgets/loadingModal.dart';
// import 'package:shein/widgets/screenHeader.dart';
// import 'package:provider/provider.dart';

// class ViewOrders extends StatefulWidget {
//   final dynamic data;
//   const ViewOrders({super.key, required this.data});

//   @override
//   State<ViewOrders> createState() => _ViewOrdersState();
// }

// class _ViewOrdersState extends State<ViewOrders> {
//   Future<void> checkAndUpdateProduct() async {
//     Completer<void> completer = Completer<void>();

//     for (var product in widget.data['products']) {
//       dynamic productData = await FirebaseFirestore.instance
//           .collection('products')
//           .doc(product['productId'])
//           .get()
//           .then((value) {
//         if (value.exists) {
//           var data = value.data();
//           return {...?data, "id": value.id};
//         }
//       });
//       if (productData['status'] == true) {
//         var priceListIndex = productData['priceList']
//             .indexWhere((item) => item['weight'] == product['description']);

//         var checkIfOutOfStock =
//             DatabaseService().checkPdtVariantStock(productData, priceListIndex);
//         if (!checkIfOutOfStock) {
//           if (!Provider.of<Cart>(context, listen: false)
//               .checkIfProductIsInCart(product['productId'])) {
//             if (product['quantity'] <=
//                 int.parse(productData['priceList'][priceListIndex]
//                     ['totalQuantity'])) {
//               await Cart().addToCart(
//                   priceListIndex: priceListIndex,
//                   product: productData,
//                   productId: product['productId'],
//                   quantity: product['quantity']);
//             } else {
//               await Cart().addToCart(
//                   priceListIndex: priceListIndex,
//                   product: productData,
//                   productId: product['productId'],
//                   quantity: int.parse(productData['priceList'][priceListIndex]
//                       ['totalQuantity']));
//             }
//           }
//         }
//       }
//     }
//     completer.complete();
//     return completer.future;
//   }

//   getImageWidget(data, index) {
//     if (data['products'][index]['img'].runtimeType == String) {
//       return Image.network(
//         data['products'][index]['img'],
//         errorBuilder: (context, error, stackTrace) {
//           return const SizedBox(
//             width: 70,
//             height: 70,
//             child: Icon(
//               Icons.image,
//               size: 70,
//               color: Color.fromARGB(255, 223, 223, 223),
//             ),
//           );
//         },
//       );
//     }

//     if (data['products'][index].containsKey('img') &&
//         data['products'][index]['img'].containsKey('thumb')) {
//       return Image.network(
//         data['products'][index]['img']['thumb'],
//         errorBuilder: (context, error, stackTrace) {
//           return const SizedBox(
//             width: 70,
//             height: 70,
//             child: Icon(
//               Icons.image,
//               size: 70,
//               color: Color.fromARGB(255, 223, 223, 223),
//             ),
//           );
//         },
//       );
//     }

//     return Image.asset(
//       'assets/images/placeholder.png',
//     );
//   }

//   handleReorder() async {
//     // print(widget.data['products']);
//     showDialog(
//       barrierDismissible: false,
//       context: context,
//       builder: (context) => loader(context),
//     );

//     await checkAndUpdateProduct();

//     await DatabaseService().getCartDetails(context);

//     Navigator.pop(context);

//     Navigator.of(context).pushNamed('/cart');
//     // Timer(Duration(milliseconds: 2000), () {
//     // });
//   }

//   checkIfDoPaymentVisible() {
//     if (!['Pending', 'Confirmed', 'Dispatched']
//         .contains(widget.data['status'])) {
//       return false;
//     }
//     if ((!widget.data['payment']['completed']) ||
//         (widget.data['payment'].containsKey('status') &&
//             (widget.data['payment']['status'] == 'failed' ||
//                 widget.data['payment']['status'] == 'pending'))) {
//       return true;
//     }
//     return false;
//   }

//   Future<List<Map<String, dynamic>>> getUpdatedPdts(
//       List<Map<String, dynamic>> pdts, List<dynamic> cartPdts) async {
//     return Future<List<Map<String, dynamic>>>.value(
//         await Future.wait(cartPdts.map((c) async {
//       final productIndex = pdts.indexWhere((p) => p['id'] == c['productId']);
//       if (productIndex != -1) {
//         final dbProduct = pdts[productIndex];
//         c['name'] = dbProduct['prodName'];
//         c['maxQty'] = dbProduct['maxQty'] ?? 0;
//         c['minQty'] = dbProduct['minQty'] ?? 1;
//         c['status'] = dbProduct['inactiveByVendor'] == true
//             ? false
//             : dbProduct['status'] != null
//                 ? dbProduct['status']
//                 : true;
//         c['stopWhenNoQty'] = dbProduct.containsKey('stopWhenNoQty') &&
//                 dbProduct['stopWhenNoQty'] != null
//             ? dbProduct['stopWhenNoQty']
//             : false;
//         c['retailDiscount'] = dbProduct.containsKey('retailDiscount')
//             ? dbProduct['retailDiscount']
//             : 0;
//         c['retailDiscountType'] =
//             dbProduct['retailDiscountType'] ?? 'percentage';
//         c['extraCharges'] = (dbProduct.containsKey('extraCharges') &&
//                 dbProduct['extraCharges'] is Map &&
//                 dbProduct['extraCharges']['active'] == true)
//             ? dbProduct['extraCharges']
//             : {'charge': 0};
//         c['img'] = dbProduct['coverPic'];

//         if (!c.containsKey('pack')) {
//           c['totalQty'] = dbProduct['productQty'] ?? '';
//           if (int.tryParse(dbProduct['productQty']) != null &&
//               (c['quantity'] > int.parse(dbProduct['productQty']))) {
//             c['quantity'] = int.parse(dbProduct['productQty']);
//           }
//           if (dbProduct['discountedPrice'] != null &&
//               dbProduct['discountedPrice'] != dbProduct['prodPrice']) {
//             c['price'] = dbProduct['discountedPrice'];
//             c['mrpPrice'] = dbProduct['prodPrice'];
//           } else {
//             c['price'] = dbProduct['prodPrice'];
//           }
//         } else {
//           if (c['pack']['variantType'] != 'pieces') {
//             dbProduct['priceList'].forEach((pl) {
//               if (pl['weight'] == c['pack']['weight']) {
//                 c['totalQty'] = pl['totalQuantity'] ?? '';
//                 if (int.tryParse(pl['totalQuantity']) != null &&
//                     (c['quantity'] > int.parse(pl['totalQuantity']))) {
//                   c['quantity'] = int.parse(pl['totalQuantity']);
//                 }
//                 if (pl['discountedPrice'] != null &&
//                     pl['discountedPrice'] != pl['price']) {
//                   c['price'] = pl['discountedPrice'];
//                   c['mrpPrice'] = pl['price'];
//                   c['pack']['price'] = pl['price'];
//                 } else {
//                   c['price'] = pl['price'];
//                   c['pack']['price'] = pl['price'];
//                 }
//               }
//             });
//           } else {
//             dbProduct['priceList'].forEach((pl) {
//               if (pl['weight'] == c['pack']['weight']) {
//                 c['totalQty'] = pl['totalQuantity'] ?? '';
//                 if (int.tryParse(pl['totalQuantity']) != null &&
//                     (c['quantity'] > int.parse(pl['totalQuantity']))) {
//                   c['quantity'] = int.parse(pl['totalQuantity']);
//                 }
//                 if (pl['discountedPrice'] != null &&
//                     pl['discountedPrice'] != pl['price']) {
//                   c['price'] = pl['discountedPrice'] * int.parse(pl['weight']);
//                   c['mrpPrice'] = pl['price'] * int.parse(pl['weight']);
//                   c['pack']['price'] =
//                       pl['discountedPrice'] * int.parse(pl['weight']);
//                   c['pack']['perPcPrice'] = pl['discountedPrice'];
//                 } else {
//                   c['price'] = pl['price'] * int.parse(pl['weight']);
//                   c['pack']['price'] = pl['price'] * int.parse(pl['weight']);
//                   c['pack']['perPcPrice'] = pl['price'];
//                 }
//               }
//             });
//           }
//         }
//       } else {
//         c['status'] = false;
//       }
//       return c;
//     })));
//   }

//   fetchUpdatedCart(cartProducts) async {
//     try {
//       List<Map<String, dynamic>> latestProducts = [];
//       List<Map<String, dynamic>> updatedCartPdts = [];

//       for (int index = 0; index < cartProducts.length; index++) {
//         DocumentSnapshot productSnapshot = await FirebaseFirestore.instance
//             .collection('products')
//             .doc(cartProducts[index]['productId'])
//             .get();

//         if (productSnapshot.exists) {
//           dynamic product = productSnapshot.data()!;
//           product['id'] = cartProducts[index]['productId'];
//           latestProducts.add(product);
//         }
//       }

//       if (latestProducts.isNotEmpty) {
//         updatedCartPdts = await getUpdatedPdts(latestProducts, cartProducts);
//       }

//       return updatedCartPdts;
//     } catch (error) {
//       print(error);
//       return [];
//     }
//   }

//   bool isOrderSourceManual() {
//     bool result = false;
//     if (widget.data['metaData'] != null &&
//         widget.data['metaData']['source'] == 'manual') {
//       result = true;
//     }
//     return result;
//   }

//   Future<Map<String, dynamic>> compareCartWithUpdatedCart(
//       List<dynamic> cartProducts) async {
//     List<dynamic> updatedCart = await fetchUpdatedCart(cartProducts);
//     List<String> updateFields = [
//       'maxQty',
//       'minQty',
//       'price',
//       'status',
//       'gst',
//       'shippingWt'
//     ];
//     print('updatedCart: $updatedCart');

//     List<dynamic> cartList = [];
//     bool cartUpdated = false;

//     cartProducts.forEach((cart) {
//       int index = updatedCart.indexWhere((uc) => uc['id'] == cart['id']);
//       if (index != -1) {
//         Map<String, dynamic> change = updatedCart[index];
//         change['quantity'] = cart['quantity'];
//         print(cart.entries);

//         for (var element in cart.entries) {
//           if (!cartUpdated && updateFields.contains(element.key)) {
//             cartUpdated = cart[element.key] != change[element.key];
//           }
//           if (change['price'] != cart['price']) {
//             cart['priceStatus'] = {
//               'status':
//                   change['price'] > cart['price'] ? 'increase' : 'decrease',
//               'priceDifference': (change['price'] - cart['price']).abs(),
//             };
//           }
//         }

//         // for (String key in cart.entries) {
//         //   if (!cartUpdated && updateFields.contains(key)) {
//         //     cartUpdated = cart[key] != change[key];
//         //   }
//         //   if (change['price'] != cart['price']) {
//         //     cart['priceStatus'] = {
//         //       'status':
//         //           change['price'] > cart['price'] ? 'increase' : 'decrease',
//         //       'priceDifference': (change['price'] - cart['price']).abs(),
//         //     };
//         //   }
//         // }
//         cartList.add(cart);
//       } else {
//         cartUpdated = true;
//       }
//     });

//     print('cartUpdated: $cartUpdated');

//     return {'cartList': cartList, 'cartUpdated': cartUpdated};
//   }

//   Future<bool> inventoryManagement(Map<String, dynamic> data) async {
//     try {
//       final manageInventory =
//           FirebaseFunctions.instance.httpsCallable('orders-manageInventory');
//       final result = await manageInventory.call(data);
//       final status = result.data['status'] as bool;
//       return status;
//     } catch (e) {
//       // Handle any exceptions or errors here
//       return false;
//     }
//   }

//   handleDoPayment() async {
//     showDialog(
//       barrierDismissible: false,
//       context: context,
//       builder: (context) => loader(context),
//     );

//     bool isProductsUpdated = false;

//     if (!isOrderSourceManual()) {
//       var cartComparisonResult = await compareCartWithUpdatedCart(
//         widget.data['products'],
//       );
//       isProductsUpdated = cartComparisonResult['cartUpdated'];
//     }

//     bool isQtyAvailable = true;

//     if (!isProductsUpdated) {
//       var order = widget.data;
//       bool isInventoryManaged = order['metaData'] != null
//           ? order['metaData']['inventoryManaged']
//           : true;

//       if (!isInventoryManaged) {
//         isQtyAvailable = await inventoryManagement({
//           "products": widget.data['products'],
//           "orderId": widget.data['id']
//         });
//       }

//       if (isQtyAvailable) {
//         // loading.dismiss();
//         Navigator.pop(context);

//         double newPrice =
//             double.parse(widget.data['totalAmountToPaid'].toString());

//         // if ((widget.data['payment']['mode'] == "cashfree" &&
//         //     !widget.data['payment']['completed'])) {}

//         if (widget.data['metaData']['walletDeducted']) {
//           if (widget.data.containsKey('cashbackAmount')) {
//             newPrice = newPrice -
//                 double.parse(widget.data['cashbackAmount'].toString());
//           }
//           if (widget.data.containsKey('walletAmount')) {
//             newPrice =
//                 newPrice - double.parse(widget.data['walletAmount'].toString());
//           }
//         }

//         Navigator.of(context).pushNamed('/orderPayment', arguments: {
//           "paymentDetails": {
//             "totalPayable": newPrice,
//             "totalMrp": widget.data['totalMrp'] ?? 0,
//             "discountOnMrp": widget.data['discountOnMrp'] ?? 0,
//             "delivery": {"deliveryCost": widget.data['delivery'] ?? 0},
//             "totalGst": widget.data['totalAmountToPaid'],
//             "deliveryGstObj": widget.data['deliveryGstObj'],
//           },
//           "address": widget.data['address'],
//           "couponId": widget.data['couponId'],
//           "couponName": widget.data['couponName'],
//           "couponDiscount": widget.data['couponDiscount'],
//           "isRedo": true,
//           "existingOrderId": widget.data['id']
//         });
//         return true;
//       }
//     }

//     if (isProductsUpdated || !isQtyAvailable) {
//       Fluttertoast.showToast(
//           toastLength: Toast.LENGTH_LONG,
//           msg:
//               "Cannot proceed with payment because the quantity or price of the products are changed.");
//       return false;
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     var size = MediaQuery.of(context).size;
//     return SafeArea(
//       child: Scaffold(
//         body: Column(
//           children: [
//             ScreenHeader(
//                 size: size,
//                 title: "ORDER: ${widget.data['orderId']}",
//                 isBackButton: true),
//             Expanded(
//               child: SingleChildScrollView(
//                 child: Column(
//                   children: [
//                     SizedBox(height: 15),
//                     checkIfDoPaymentVisible()
//                         ? Row(
//                             mainAxisAlignment: MainAxisAlignment.center,
//                             children: [
//                               InkWell(
//                                 onTap: handleDoPayment,
//                                 child: Container(
//                                   padding: EdgeInsets.symmetric(
//                                     horizontal: size.width * 0.1,
//                                     vertical: size.width * 0.03,
//                                   ),
//                                   decoration: BoxDecoration(
//                                     color: AppTheme().secondaryColor,
//                                     borderRadius: BorderRadius.circular(
//                                       100,
//                                     ),
//                                   ),
//                                   child: Text(
//                                     "Do Payment",
//                                     style: TextStyle(
//                                         color: Colors.white,
//                                         fontWeight: FontWeight.w600),
//                                   ),
//                                 ),
//                               )
//                             ],
//                           )
//                         : SizedBox(),
//                     Padding(
//                       padding: const EdgeInsets.all(8.0),
//                       child: Container(
//                         decoration: BoxDecoration(
//                             color: Colors.white,
//                             borderRadius: BorderRadius.circular(10),
//                             border: Border.all(color: Colors.black12)),
//                         child: Padding(
//                           padding: const EdgeInsets.all(8.0),
//                           child: Container(
//                             child: Column(
//                               crossAxisAlignment: CrossAxisAlignment.start,
//                               children: [
//                                 Container(
//                                   height: 40,
//                                   width: double.infinity,
//                                   alignment: Alignment.centerLeft,
//                                   child: const Text('Order Placed '),
//                                 ),
//                                 const Divider(),
//                                 Text(
//                                   DateFormat('dd MMMM yyyy, hh:mm a').format(
//                                       widget.data['createdAt'].toDate()),
//                                   style: Theme.of(context)
//                                       .textTheme
//                                       .headlineSmall!
//                                       .merge(const TextStyle(fontSize: 14)),
//                                 ),
//                               ],
//                             ),
//                           ),
//                         ),
//                       ),
//                     ),
//                     Padding(
//                       padding: const EdgeInsets.all(8.0),
//                       child: Container(
//                         decoration: BoxDecoration(
//                             color: Colors.white,
//                             borderRadius: BorderRadius.circular(10),
//                             border: Border.all(color: Colors.black12)),
//                         child: Padding(
//                           padding: const EdgeInsets.all(8.0),
//                           child: Container(
//                             child: Column(
//                               crossAxisAlignment: CrossAxisAlignment.start,
//                               children: [
//                                 Container(
//                                   height: 40,
//                                   width: double.infinity,
//                                   alignment: Alignment.centerLeft,
//                                   child: const Text('DELIVERY ADDRESS'),
//                                 ),
//                                 const Divider(),
//                                 Text(
//                                   widget.data['userName'],
//                                   style: Theme.of(context)
//                                       .textTheme
//                                       .headlineSmall!
//                                       .merge(const TextStyle(fontSize: 18)),
//                                 ),
//                                 const SizedBox(height: 20),
//                                 Text(
//                                   widget.data['address']['city'],
//                                   style: Theme.of(context)
//                                       .textTheme
//                                       .headlineSmall!
//                                       .merge(const TextStyle(fontSize: 18)),
//                                 ),
//                                 !widget.data.containsKey('phoneNo')
//                                     ? const SizedBox(height: 0)
//                                     : const SizedBox(height: 20),
//                                 Text(
//                                   !widget.data.containsKey('phoneNo')
//                                       ? ''
//                                       : widget.data['phoneNo'],
//                                   style: Theme.of(context)
//                                       .textTheme
//                                       .headlineSmall!
//                                       .merge(const TextStyle(fontSize: 18)),
//                                 ),
//                               ],
//                             ),
//                           ),
//                         ),
//                       ),
//                     ),
//                     Padding(
//                       padding: const EdgeInsets.all(8.0),
//                       child: Container(
//                         width: double.infinity,
//                         decoration: BoxDecoration(
//                             borderRadius: BorderRadius.circular(10),
//                             border: Border.all(color: Colors.black12)),
//                         child: Padding(
//                           padding: const EdgeInsets.all(8.0),
//                           child: Column(
//                             crossAxisAlignment: CrossAxisAlignment.start,
//                             children: [
//                               Container(
//                                   alignment: Alignment.centerLeft,
//                                   height: 40,
//                                   child: const Text('PAYMENT INFO')),
//                               const Divider(),
//                               Container(
//                                   alignment: Alignment.centerLeft,
//                                   height: 50,
//                                   child: Text(
//                                       'Pay ${Constants().rupees}${widget.data.containsKey('totalAmountToPaid') ? '${double.parse(widget.data['totalAmountToPaid'].toString()).toDouble().toStringAsFixed(2)}' : '0.00'}'))
//                             ],
//                           ),
//                         ),
//                       ),
//                     ),
//                     Padding(
//                       padding: const EdgeInsets.all(8.0),
//                       child: Container(
//                         width: double.infinity,
//                         decoration: BoxDecoration(
//                             borderRadius: BorderRadius.circular(10),
//                             border: Border.all(color: Colors.black12)),
//                         child: Padding(
//                           padding: const EdgeInsets.all(8.0),
//                           child: Column(
//                             crossAxisAlignment: CrossAxisAlignment.start,
//                             children: [
//                               Container(
//                                   alignment: Alignment.centerLeft,
//                                   height: 40,
//                                   child: const Text('DELIVERY VERIFICATION')),
//                               const Divider(),
//                               Container(
//                                   alignment: Alignment.centerLeft,
//                                   height: 50,
//                                   child: Wrap(
//                                     children: [
//                                       const Text(
//                                         'OTP: ',
//                                         style: TextStyle(
//                                             fontWeight: FontWeight.bold),
//                                       ),
//                                       Text(
//                                           '${widget.data['deliveryVerification']['otp']}'),
//                                     ],
//                                   ))
//                             ],
//                           ),
//                         ),
//                       ),
//                     ),
//                     widget.data.containsKey('invoice')
//                         ? getInvoice()
//                         : const SizedBox(),
//                     Column(
//                       children: widget.data['products']
//                           .asMap()
//                           .entries
//                           .map<Widget>((e) {
//                         int index = e.key;
//                         dynamic value = e.value;
//                         return Padding(
//                           padding: const EdgeInsets.all(8.0),
//                           child: Container(
//                             width: double.infinity,
//                             decoration: BoxDecoration(
//                                 borderRadius: BorderRadius.circular(10),
//                                 border: Border.all(color: Colors.black12)),
//                             child: Padding(
//                               padding: const EdgeInsets.all(8.0),
//                               child: Column(
//                                 crossAxisAlignment: CrossAxisAlignment.start,
//                                 children: [
//                                   index == 0
//                                       ? Center(
//                                           child: ElevatedButton(
//                                               style: ElevatedButton.styleFrom(
//                                                   backgroundColor: Colors.green,
//                                                   // minimumSize: Size(50, 20),
//                                                   shape: RoundedRectangleBorder(
//                                                       borderRadius:
//                                                           BorderRadius.circular(
//                                                               30))),
//                                               onPressed: () {
//                                                 handleReorder();
//                                               },
//                                               child: Wrap(
//                                                 crossAxisAlignment:
//                                                     WrapCrossAlignment.center,
//                                                 children: const [
//                                                   Text('Reorder'),
//                                                   Icon(Icons.replay)
//                                                 ],
//                                               )),
//                                         )
//                                       : const SizedBox(),
//                                   Container(
//                                       alignment: Alignment.centerLeft,
//                                       height: 40,
//                                       child: Row(
//                                         mainAxisAlignment:
//                                             MainAxisAlignment.spaceBetween,
//                                         children: [
//                                           const Text('Products'),
//                                           Wrap(
//                                             crossAxisAlignment:
//                                                 WrapCrossAlignment.center,
//                                             children: [
//                                               Text('${widget.data['status']}'),
//                                               const SizedBox(width: 4),
//                                               widget.data['status'] == 'Pending'
//                                                   ? const Icon(
//                                                       Icons.access_time,
//                                                       size: 20,
//                                                       color: Colors.amber,
//                                                     )
//                                                   : widget.data['status'] ==
//                                                           'Rejected'
//                                                       ? const Icon(
//                                                           Icons.cancel,
//                                                           color: Colors.red,
//                                                         )
//                                                       : widget.data['status'] ==
//                                                               'Delivered'
//                                                           ? const Icon(
//                                                               Icons.check,
//                                                               color:
//                                                                   Colors.green,
//                                                             )
//                                                           : const SizedBox()
//                                             ],
//                                           )
//                                         ],
//                                       )),
//                                   const Divider(),
//                                   Row(
//                                     children: [
//                                       const SizedBox(width: 10),
//                                       Container(
//                                           width: 70,
//                                           height: 70,
//                                           decoration: BoxDecoration(
//                                               border: Border.all(
//                                                   color: Colors.black12),
//                                               borderRadius:
//                                                   BorderRadius.circular(10)),
//                                           child:
//                                               getImageWidget(widget.data, index)

//                                           //  Image.asset(
//                                           //   'assets/images/placeholder.png',
//                                           //   width: 70,
//                                           //   height: 70,
//                                           // ),
//                                           ),
//                                       const SizedBox(width: 20),
//                                       Expanded(
//                                         child: Column(
//                                           crossAxisAlignment:
//                                               CrossAxisAlignment.start,
//                                           children: [
//                                             Text(
//                                                 '${Constants().rupees}${value['price']}'),
//                                             const SizedBox(height: 10),
//                                             Text('${value['name']}'),
//                                             const SizedBox(height: 10),
//                                             !value.containsKey('pack')
//                                                 ? const SizedBox()
//                                                 : Text(
//                                                     'Weight: ${value['pack']['weight']}'),
//                                             const SizedBox(height: 10),
//                                           ],
//                                         ),
//                                       ),
//                                     ],
//                                   ),
//                                   Align(
//                                       alignment: Alignment.bottomRight,
//                                       child: Text('QTY:${value['quantity']}'))
//                                 ],
//                               ),
//                             ),
//                           ),
//                         );
//                       }).toList(),
//                     ),
//                     priceDetails(),
//                     widget.data.containsKey('cancelData')
//                         ? cancelledReason()
//                         : const SizedBox()
//                   ],
//                 ),
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }

//   Widget priceDetails() {
//     print(widget.data['discountOnMrp']);
//     return Padding(
//       padding: const EdgeInsets.all(8.0),
//       child: Container(
//         decoration: BoxDecoration(
//             border: Border.all(color: Colors.black12),
//             borderRadius: BorderRadius.circular(10)),
//         child: Padding(
//           padding: const EdgeInsets.all(8.0),
//           child: Column(
//             crossAxisAlignment: CrossAxisAlignment.start,
//             children: [
//               Container(
//                 height: 30,
//                 width: double.infinity,
//                 alignment: Alignment.centerLeft,
//                 child: Text(
//                     'PRICE DETAILS (${widget.data['products'].length} ITEM)'),
//               ),
//               const Divider(),
//               const SizedBox(
//                 height: 20,
//               ),
//               Row(
//                 mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                 children: [
//                   const Text('Subtotal'),
//                   Text(
//                       '${Constants().rupees}${double.parse(widget.data['totalMrp'].toString()).toDouble().toStringAsFixed(2)}'),
//                 ],
//               ),
//               SizedBox(
//                 height: widget.data['discountOnMrp'] == 0 ? 0 : 30,
//               ),
//               widget.data['discountOnMrp'] == 0
//                   ? SizedBox()
//                   : Row(
//                       mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                       children: [
//                         const Text('Discount'),
//                         Text(
//                           '-${Constants().rupees}${widget.data['discountOnMrp'].toString()}',
//                           style: const TextStyle(color: Colors.green),
//                         ),
//                       ],
//                     ),
//               const SizedBox(
//                 height: 30,
//               ),
//               Row(
//                 mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                 children: [
//                   const Text('Delivery'),
//                   widget.data['delivery'] != 0
//                       ? Text(
//                           '${Constants().rupees}${widget.data['delivery']}',
//                           style: const TextStyle(color: Colors.green),
//                         )
//                       : const Text('Free',
//                           style: TextStyle(color: Colors.greenAccent)),
//                 ],
//               ),
//               const SizedBox(
//                 height: 30,
//               ),
//               const Divider(),
//               const SizedBox(
//                 height: 20,
//               ),
//               Row(
//                 mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                 children: [
//                   const Text('Total amount'),
//                   Text(
//                       '${Constants().rupees}${double.parse(widget.data['totalAmountToPaid'].toString()).toDouble().toStringAsFixed(2)}'),
//                 ],
//               ),
//               const SizedBox(
//                 height: 20,
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }

//   Widget cancelledReason() {
//     return Padding(
//       padding: const EdgeInsets.all(8.0),
//       child: Container(
//         decoration: BoxDecoration(
//             borderRadius: BorderRadius.circular(10),
//             border: Border.all(color: Colors.black12)),
//         child: Padding(
//           padding: const EdgeInsets.all(8.0),
//           child: Column(
//             children: [
//               Container(
//                 height: 30,
//                 width: double.infinity,
//                 alignment: Alignment.centerLeft,
//                 child: const Text('CANCELLED REASON'),
//               ),
//               const Divider(),
//               const SizedBox(
//                 height: 20,
//               ),
//               Text('${widget.data['cancelData']['reason']}')
//             ],
//           ),
//         ),
//       ),
//     );
//   }

//   Widget getInvoice() {
//     return Padding(
//       padding: const EdgeInsets.all(8.0),
//       child: Container(
//         decoration: BoxDecoration(
//             borderRadius: BorderRadius.circular(10),
//             border: Border.all(color: Colors.black12)),
//         child: Padding(
//           padding: const EdgeInsets.all(8.0),
//           child: Column(
//             crossAxisAlignment: CrossAxisAlignment.start,
//             children: [
//               Container(
//                 height: 30,
//                 width: double.infinity,
//                 alignment: Alignment.centerLeft,
//                 child: const Text('INVOICE'),
//               ),
//               const Divider(),
//               InkWell(
//                 onTap: () {
//                   print(widget.data['invoice']['url']);
//                   Navigator.push(
//                       context,
//                       MaterialPageRoute(
//                           builder: (context) => MyPdf(
//                                 url: widget.data['invoice']['url'],
//                                 orderId: '${widget.data['orderId']}',
//                               )));
//                 },
//                 child: Container(
//                   height: 30,
//                   alignment: Alignment.centerLeft,
//                   child: Text(
//                     'View Invoice',
//                     style: TextStyle(
//                         fontWeight: FontWeight.bold,
//                         color: AppTheme().secondaryColor),
//                   ),
//                 ),
//               )
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }
