import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shein/constants/constants.dart';
import 'package:shein/providers/cartProvider.dart';
import 'package:shein/providers/userProvider.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/cartItemCard.dart';
import 'package:shein/widgets/screenHeader.dart';
import 'package:provider/provider.dart';

class CartScreen extends StatefulWidget {
  const CartScreen({super.key});

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  bool loading = false;

  List<dynamic> cartData = [];

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

  fetchUpdatedCart() async {
    try {
      List<dynamic> cartProducts =
          Provider.of<Cart>(context, listen: false).cart;
      setState(() {
        cartData = cartProducts;
      });
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
      Provider.of<Cart>(context, listen: false).setUpdatedCart(updatedCartPdts);
      setState(() {
        loading = false;
        cartData = updatedCartPdts;
      });
      return updatedCartPdts;
    } catch (error) {
      print(error);
      return [];
    }
  }

  initializeCart() async {
    setState(() {
      loading = true;
    });
    await Provider.of<Auth>(context, listen: false).fetchUser('');
    await fetchUpdatedCart();
    setState(() {
      loading = false;
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    initializeCart();
    super.initState();
  }

  handleUpdateQuantity({type, index, cartData}) {
    var cart = Provider.of<Cart>(context, listen: false).cart;
    if (type == 'inc') {
      var quantity = cart[index]['quantity'];
      var totalQty = int.parse(cart[index]['totalQty']);
      if (quantity + 1 <= totalQty) {
        Provider.of<Cart>(context, listen: false)
            .updateCartItemQuantity(index: index, type: type);
      } else {
        Fluttertoast.showToast(msg: 'Can not add more of this item');
      }
    } else {
      var quantity = cart[index]['quantity'];
      if (quantity - 1 <= 0) {
        Provider.of<Cart>(context, listen: false)
            .removeItemFromCart(index: index);
      } else {
        Provider.of<Cart>(context, listen: false)
            .updateCartItemQuantity(index: index, type: type);
      }
    }
  }

  handleCheckout() {
    for (var item in cartData) {
      if (!item['status'] ||
          (item['totalQty'] == '0' && item['stopWhenNoQty'])) {
        Fluttertoast.showToast(
            msg:
                "Some of your products are out of stock. Please remove those products before checking out.");
        return;
      }
    }
    Navigator.of(context).pushNamed('/orderSummary');
  }

  handleAddAddress() {
    Navigator.of(context).pushNamed('/newAddress');
  }

  renderText() {
    if (FirebaseAuth.instance.currentUser?.uid == null) {
      if (loading) {
        return const SizedBox(
          width: 24,
          height: 24,
          child: CircularProgressIndicator(
            color: Colors.white,
            strokeWidth: 2,
            value: null,
          ),
        );
      } else {
        return Text(
          "Checkout",
          style: AppTheme()
              .outfitStyle(color: Colors.white, fontWeight: FontWeight.w500),
        );
      }
    } else {
      if (Provider.of<Auth>(context).userData == null) {
        return const SizedBox(
          width: 24,
          height: 24,
          child: CircularProgressIndicator(
            color: Colors.white,
            strokeWidth: 2,
            value: null,
          ),
        );
      } else {
        if (loading) {
          return const SizedBox(
            width: 24,
            height: 24,
            child: CircularProgressIndicator(
              color: Colors.white,
              strokeWidth: 2,
              value: null,
            ),
          );
        } else {
          return Text(
            "Checkout",
            style: AppTheme()
                .outfitStyle(color: Colors.white, fontWeight: FontWeight.w500),
          );
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return SafeArea(
        child: Scaffold(
      // backgroundColor: AppTheme().scaffoldColor
      backgroundColor: Colors.white,
      body: SizedBox(
        child: Column(
          children: [
            Expanded(
              child: Column(
                children: [
                  ScreenHeader(
                    size: size,
                    title: "Cart",
                    isBackButton: false,
                    isHeartButton: false,
                    isCartButton: false,
                    // isHeartButton: true,
                  ),
                  Expanded(
                    child: Provider.of<Cart>(context).cart.isEmpty
                        ? Container(
                            child: const Center(
                              child: Text("Your cart is empty."),
                            ),
                          )
                        : SingleChildScrollView(
                            child: Container(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 10),
                              child: Column(
                                children: [
                                  ...(Provider.of<Cart>(context)
                                      .cart
                                      .asMap()
                                      .entries
                                      .map((e) {
                                    int index = e.key;
                                    dynamic value = e.value;
                                    return CartItemCard(
                                      cartData: cartData,
                                      context: context,
                                      handleUpdateQuantity:
                                          handleUpdateQuantity,
                                      index: index,
                                      size: size,
                                      value: value,
                                    );
                                  }).toList()),
                                  const SizedBox(
                                    height: 10,
                                  ),
                                ],
                              ),
                            ),
                          ),
                  ),
                  cartData.isNotEmpty
                      ? SizedBox(
                          width: double.infinity,
                          child: Container(
                            width: double.infinity,
                            height: size.height * 0.08,
                            decoration: const BoxDecoration(
                              // boxShadow: [
                              //   BoxShadow(
                              //     color: Color.fromARGB(255, 179, 179, 179),
                              //     blurRadius: 3,
                              //     blurStyle: BlurStyle.outer,
                              //     spreadRadius: 0,
                              //   ),
                              // ],
                              color: Colors.white,
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                SizedBox(
                                  width: size.width * 0.5,
                                  // color: Colors.green,
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Text(
                                        'Total Price : ',
                                        style: AppTheme().outfitStyle(
                                          color: AppTheme().secondaryColor,
                                        ),
                                      ),
                                      const SizedBox(height: 5),
                                      Text(
                                        "${Constants().rupees} ${Provider.of<Cart>(context).getTotalCartAmount()}",
                                        style: AppTheme()
                                            .outfitStyle(fontSize: 16),
                                      )
                                    ],
                                  ),
                                ),
                                Container(
                                  width: size.width * 0.5,
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 10),
                                  child: Center(
                                    child: InkWell(
                                      onTap: () {
                                        if (FirebaseAuth
                                                .instance.currentUser?.uid !=
                                            null) {
                                          if (Provider.of<Auth>(context,
                                                      listen: false)
                                                  .userData !=
                                              null) {
                                            if (Provider.of<Auth>(context,
                                                                listen: false)
                                                            .userData[
                                                        'defaultAddress'] ==
                                                    null ||
                                                Provider.of<Auth>(context,
                                                                listen: false)
                                                            .userData[
                                                        'defaultAddress'] ==
                                                    {}) {
                                              handleAddAddress();
                                            } else {
                                              handleCheckout();
                                            }
                                          }
                                        } else {
                                          Fluttertoast.showToast(
                                              msg: 'Please Login');
                                        }
                                      },
                                      child: Container(
                                          padding: EdgeInsets.symmetric(
                                              vertical: 8,
                                              horizontal: size.width * 0.09),
                                          decoration: BoxDecoration(
                                              color: Provider.of<Auth>(context)
                                                          .userData ==
                                                      null
                                                  ? AppTheme().mainColor
                                                  : AppTheme().themeColor,
                                              borderRadius:
                                                  BorderRadius.circular(0)),
                                          child: renderText()),
                                    ),
                                  ),
                                )
                              ],
                            ),
                          ),
                        )
                      : const SizedBox(),
                ],
              ),
            ),
          ],
        ),
      ),
    ));
  }
}
