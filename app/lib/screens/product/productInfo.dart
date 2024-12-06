import 'dart:async';
import 'dart:developer';
import 'package:carousel_indicator/carousel_indicator.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:shein/providers/cartProvider.dart';
import 'package:shein/screens/product/rateProduct.dart';
import 'package:shein/screens/product/slotSelectScreen.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/utils/databaseServices.dart';
import 'package:shein/utils/dynamicLink.dart';
import 'package:shein/widgets/loadingModal.dart';
import 'package:shein/widgets/screenHeader.dart';
import 'package:provider/provider.dart';
import 'package:share/share.dart';

import '../../providers/homeProvider.dart';
import '../../providers/userProvider.dart';
import '../../utils/typesense.dart';

class ProductInfoScreen extends StatefulWidget {
  const ProductInfoScreen({super.key});

  @override
  State<ProductInfoScreen> createState() => _ProductInfoScreenState();
}

class _ProductInfoScreenState extends State<ProductInfoScreen> {
  // List<String> sizeList = ['S', 'M', 'L', 'XL'];
  String selectedColor = '';
  String selectedSize = '';
  String selectedOption = "";
  bool isDescriptionExpanded = false;
  bool isMaterialExpanded = false;
  bool isSpecificationsExpanded = false;
  bool isReviewsExpanded = false;
  bool isReturnExpanded = false;

  dynamic productInfo;
  int pageNumber = 0;
  int quantity = 1;
  int selectedVariant = 0;
  bool gettingSimilarProducts = true;
  dynamic similarProducts = [];

  fetchProductInfo(id) async {
    var data = await DatabaseService().fetchSingleProduct(id);
    setState(() {
      productInfo = data;
      print('DETAILS${productInfo['categories']}');

      if (productInfo != null && productInfo['variants'] != null) {
        selectedOption = (productInfo['variants']['option2'] != null &&
                productInfo['variants']['option2'].isNotEmpty)
            ? productInfo['variants']['option2'][0] ?? ''
            : '';
        selectedSize = (productInfo['variants']['option1'] != null &&
                productInfo['variants']['option1'].isNotEmpty)
            ? productInfo['variants']['option1'][0] ?? ''
            : '';
      }
    });
  }

  double calculateCO2Emissions(Map<String, dynamic> productMetafields) {
    double organic = double.parse(productMetafields['organic'].toString());
    double nonOrganic =
        double.parse(productMetafields['nonOrganic'].toString());
    double total = nonOrganic - organic;
    double percValue = total * 100.0;
    double perc = percValue / nonOrganic;
    return perc * -1;
  }

  String buildCO2EmissionsText(Map<String, dynamic> productMetafields) {
    double eval = calculateCO2Emissions(productMetafields);
    if (productMetafields['organic'] != null &&
        productMetafields['nonOrganic'] != null) {
      String evalString = eval.toStringAsFixed(2).replaceAll('.0', '');
      return evalString;
    } else {
      return '';
    }
  }

  List<Widget> buildProductSpecificationsGrid() {
    List<Widget> gridItems = [];
    final metafields = productInfo['metafields'];

    for (int i = 0; i < metafields.length; i++) {
      gridItems.add(
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10.0),
          child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  metafields[i]['key']
                      .toString()
                      .replaceAll('_', ' ')
                      .toUpperCase(),
                  style: AppTheme().outfitStyle(
                      fontWeight: FontWeight.w400,
                      fontSize: 13,
                      color: Colors.black45),
                ),
                Text(
                  metafields[i]['value'],
                  style: AppTheme().outfitStyle(
                    fontWeight: FontWeight.w400,
                  ),
                ),
                const Divider(
                  thickness: 1,
                )
              ]),
        ),
      );
    }

    return gridItems;
  }

  handleBooking(vendorId) async {
    var variant = productInfo['appointment']['schedules']['variant']
        .where((e) =>
            e['name'] == productInfo['priceList'][selectedVariant]['weight'])
        .toList();

    var props = {
      "item": {
        "name": productInfo['prodName'],
        "price": productInfo['priceList'][selectedVariant]['discountedPrice'],
        "coverPic": productInfo['coverPic'],
        "id": productInfo['id'],
        "variant": productInfo['priceList'][selectedVariant]['weight']
      },
      "vendor": {"id": productInfo['vendorId']},
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

  // double getPriceData() {
  //   if (selectedSize.isNotEmpty && selectedOption.isNotEmpty) {
  //     var weight = "$selectedSize / $selectedOption";
  //     var check =
  //         productInfo['priceList'].where((e) => e['weight'] == weight).toList();
  //     if (check.isNotEmpty) {
  //       return check[0]['discountedPrice'];
  //     }
  //   } else if (selectedSize.isNotEmpty) {
  //     // Only size is selected, find price based on size
  //     var check = productInfo['priceList']
  //         .where((e) => e['weight'].contains(selectedSize))
  //         .toList();
  //     if (check.isNotEmpty) {
  //       return check[0]['discountedPrice'];
  //     }
  //   } else if (selectedOption.isNotEmpty) {
  //     // Only color/option is selected, find price based on color/option
  //     var check = productInfo['priceList']
  //         .where((e) => e['weight'].contains(selectedOption))
  //         .toList();
  //     if (check.isNotEmpty) {
  //       return check[0]['discountedPrice'];
  //     }
  //   }

  //   return productInfo['priceList'][0]['discountedPrice'];
  // }
  // getPriceData() {
  //   if (selectedSize != "" && selectedOption != "") {
  //     var weight = "${selectedSize} / ${selectedOption}";
  //     var check =
  //         productInfo['priceList'].where((e) => e['weight'] == weight).toList();
  //     if (check.isNotEmpty) {
  //       var index =
  //           productInfo['priceList'].indexWhere((e) => e['weight'] == weight);
  //       selectedVariant = index;
  //       return check[0];
  //     } else {
  //       return productInfo['priceList'][0];
  //     }
  //   }
  //   return null;
  // }

  getPriceData() {
    if (selectedSize != "" && selectedOption != "") {
      var weight = "$selectedSize / $selectedOption";
      var check =
          productInfo['priceList'].where((e) => e['weight'] == weight).toList();
      if (check.isNotEmpty) {
        var selectedProduct = check[0];
        if (selectedProduct['totalQuantity'] != "0") {
          selectedVariant =
              productInfo['priceList'].indexWhere((e) => e['weight'] == weight);
          return selectedProduct;
        }
      }
    }
    if (selectedSize != "" && selectedOption == "") {
      var weight = selectedSize;
      var check =
          productInfo['priceList'].where((e) => e['weight'] == weight).toList();
      if (check.isNotEmpty) {
        var selectedProduct = check[0];
        if (selectedProduct['totalQuantity'] != "0") {
          selectedVariant =
              productInfo['priceList'].indexWhere((e) => e['weight'] == weight);
          return selectedProduct;
        }
      }
    }
    if (selectedSize == "" && selectedOption != "") {
      var weight = selectedOption;
      var check =
          productInfo['priceList'].where((e) => e['weight'] == weight).toList();
      if (check.isNotEmpty) {
        var selectedProduct = check[0];
        if (selectedProduct['totalQuantity'] != "0") {
          selectedVariant =
              productInfo['priceList'].indexWhere((e) => e['weight'] == weight);
          return selectedProduct;
        }
      }
    }

    return productInfo['priceList'][0];
  }

  String getProductAvailabilityText() {
    var productData = getPriceData();
    if (productData != null) {
      return '';
    } else {
      return 'This Variant is out of stock.Try Selecting a Different variant';
    }
  }

  handleAddToCart() async {
    var cart = Provider.of<Cart>(context, listen: false).cart;
    var check = cart.any((element) =>
        element['productId'] == productInfo['id'] &&
        element['description'] ==
            productInfo['priceList'][selectedVariant]['weight']);
    print('here:$selectedVariant');
    if (check) {
      Fluttertoast.showToast(msg: 'Item already in cart');
      return;
    }
    showDialog(
      barrierDismissible: false,
      context: context,
      builder: (context) => loader(context),
    );
    await Provider.of<Cart>(context, listen: false).addToCart(
      priceListIndex: selectedVariant,
      product: productInfo,
      productId: productInfo['id'],
      quantity: quantity,
    );
    // Fluttertoast.showToast(msg: 'Item added to cart');

    Navigator.pop(context);
    await showDialog(
      context: context,
      builder: (context) => Dialog(
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Item added to bag.',
                  style: TextStyle(fontSize: 17),
                ),
                const SizedBox(
                  height: 10,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    InkWell(
                      onTap: () {
                        Navigator.of(context).pop();
                        Navigator.pop(context);
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            vertical: 7, horizontal: 5),
                        child: Text(
                          'Continue',
                          style: TextStyle(color: AppTheme().secondaryColor),
                        ),
                      ),
                    ),
                    const SizedBox(
                      width: 15,
                    ),
                    InkWell(
                      onTap: () {
                        Navigator.of(context).pop();
                        Navigator.of(context).pushNamed('/cart');
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            vertical: 7, horizontal: 5),
                        child: Text(
                          'Go to Bag',
                          style: TextStyle(color: AppTheme().secondaryColor),
                        ),
                      ),
                    ),
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void initState() {
    // TODO: implement initState
    Timer(const Duration(milliseconds: 100), () {
      DynamicLinkProvider().initDynamicLink(context: context);
    });
    super.initState();
  }

  Map<String, dynamic> productMetafields = {
    'carbon': {
      'organic': 0.091,
      'non_organic': 0.128,
    },
  };
  fetchSimilarProducts(product) async {
    var keywords = product['searchKeywords'] ?? [];
    // print('KEY WOR $keywords');
    var res = await TypeSenseInstance().searchSimilarProducts(keywords);
    similarProducts = res;
    gettingSimilarProducts = false;
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    final dynamic args = ModalRoute.of(context)!.settings.arguments;

    // print(((double.parse(
    //                 productInfo['priceList'][0]['shippingWeight'].toString()) *
    //             double.parse(
    //                 productMetafields['carbon']['organic'].toString())) /
    //         1000)
    //     .toStringAsFixed(5));

    if (productInfo == null) {
      fetchProductInfo(args['id']);
    }

    // print("ARRRRRRRRRRR ${productInfo['rating'].toString()=="{}"}");
    if (productInfo != null && gettingSimilarProducts) {
      fetchSimilarProducts(productInfo);
    }

    return SafeArea(
      child: Scaffold(
        body: Stack(
          children: [
            SizedBox(
              child: Column(
                children: [
                  ScreenHeader(
                    size: size,
                    title: "",
                    isHeartButton: true,
                    isBackButton: true,
                    isSearchButton: true,
                    isCartButton: true,
                  ),
                  productInfo == null
                      ? SizedBox(
                          height: size.height * 0.7,
                          child: Center(
                            child: CircularProgressIndicator(
                              color: AppTheme().secondaryColor,
                            ),
                          ),
                        )
                      : renderProductInfo(size, context, args),
                  // productInfo == null
                  //     ? const SizedBox()
                  //     : Align(
                  //         alignment: Alignment.bottomCenter,
                  //         child: Padding(
                  //           padding: const EdgeInsets.only(
                  //             bottom: 5,
                  //           ),
                  //           child: productInfo['productType'] == "appointment"
                  //               ? ElevatedButton(
                  //                   onPressed: () {
                  //                     handleBooking(args['id']);
                  //                   },
                  //                   style: ButtonStyle(
                  //                     shape: const MaterialStatePropertyAll(
                  //                       RoundedRectangleBorder(
                  //                           borderRadius: BorderRadius.zero),
                  //                     ),
                  //                     //  RoundedRectangleBorder(
                  //                     //   borderRadius: BorderRadius.zero,
                  //                     // ),
                  //                     backgroundColor: MaterialStatePropertyAll(
                  //                         AppTheme().secondaryColor),
                  //                   ),
                  //                   child: Row(
                  //                     mainAxisAlignment:
                  //                         MainAxisAlignment.center,
                  //                     children: const [Text("Book Now")],
                  //                   ))
                  //               : ElevatedButton(
                  //                   onPressed: DatabaseService()
                  //                           .checkPdtVariantStock(
                  //                               productInfo, selectedVariant)
                  //                       ? null
                  //                       : handleAddToCart,
                  //                   style: ButtonStyle(
                  //                     shape: const MaterialStatePropertyAll(
                  //                       RoundedRectangleBorder(
                  //                           borderRadius: BorderRadius.zero),
                  //                     ),
                  //                     //  RoundedRectangleBorder(
                  //                     //   borderRadius: BorderRadius.zero,
                  //                     // ),
                  //                     backgroundColor: MaterialStatePropertyAll(
                  //                         Provider.of<Cart>(
                  //                                   context,
                  //                                 ).cart.any((element) =>
                  //                                     element['productId'] ==
                  //                                         productInfo['id'] &&
                  //                                     element['description'] ==
                  //                                         productInfo['priceList']
                  //                                                 [selectedVariant]
                  //                                             ['weight']) ||
                  //                                 DatabaseService()
                  //                                     .checkPdtVariantStock(
                  //                                         productInfo,
                  //                                         selectedVariant)
                  //                             ? const Color.fromARGB(
                  //                                 255, 107, 105, 105)
                  //                             : Colors.black),
                  //                   ),
                  //                   child: Row(
                  //                     mainAxisAlignment:
                  //                         MainAxisAlignment.center,
                  //                     children: [
                  //                       const Icon(
                  //                         Icons.shopping_cart_outlined,
                  //                         color: Colors.white,
                  //                         size: 18,
                  //                       ),
                  //                       const SizedBox(
                  //                         width: 10,
                  //                       ),
                  //                       Text(
                  //                         Provider.of<Cart>(
                  //                           context,
                  //                         ).cart.any((element) =>
                  //                                 element['productId'] ==
                  //                                     productInfo['id'] &&
                  //                                 element['description'] ==
                  //                                     productInfo['priceList']
                  //                                             [selectedVariant]
                  //                                         ['weight'])
                  //                             ? "Already in cart"
                  //                             : DatabaseService()
                  //                                     .checkPdtVariantStock(
                  //                                         productInfo,
                  //                                         selectedVariant)
                  //                                 ? "Out Of Stock"
                  //                                 : 'ADD TO BAG',
                  //                         style: const TextStyle(
                  //                             fontSize: 13,
                  //                             color: Colors.white,
                  //                             fontWeight: FontWeight.w500),
                  //                       )
                  //                     ],
                  //                   ),
                  //                 ),
                  //         ),
                  //       )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  int calculateDiscountPercentage(
      dynamic originalPrice, dynamic discountedPrice) {
    if (originalPrice <= 0) {
      return 0;
    }
    return ((originalPrice - discountedPrice) / originalPrice * 100).toInt();
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

  //   return discountPercentage
  //       .round(); // Round the double to the nearest integer.
  // }

  Expanded renderProductInfo(Size size, BuildContext context, args) {
    // var sizeList = (productInfo['variants']['option1'] as List);
    var sizeList = (productInfo != null &&
            productInfo['variants'] != null &&
            productInfo['variants']['option1'] is List)
        ? (productInfo['variants']['option1'] as List)
        : [];
    var colorList = (productInfo != null &&
            productInfo['variants'] != null &&
            productInfo['variants']['option2'] is List)
        ? (productInfo['variants']['option2'] as List)
        : [];

    // // var sizeList = (productInfo != null &&
    // //         productInfo['variants'] != null &&
    // //         productInfo['variants']['option1'] is List)
    // //     ? (productInfo['variants']['option1'] as List)
    // //     : [];
    // var colorList = (productInfo != null &&
    //         productInfo['variants'] != null &&
    //         productInfo['variants']['option2'] is List)
    //     ? (productInfo['variants']['option2'] as List)
    //     : [];
    // List<String> sizeList = ['S', 'M', 'L', 'XL', 'XXL'];
    final authProvider = Provider.of<Auth>(context);
    // List<String> colorList = ['Red', 'Blue', 'Green', 'Yellow', 'Purple'];

    return Expanded(
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.all(10.0),
              child: SizedBox(
                  child: Stack(children: [
                CarouselSlider(
                  options: CarouselOptions(
                    enableInfiniteScroll: true,
                    height: size.height * 0.5,
                    enlargeCenterPage: true,
                    viewportFraction: 1,
                    autoPlay: false,
                    onPageChanged: (index, _) {
                      setState(() {
                        pageNumber = index;
                      });
                    },
                  ),
                  items: (productInfo['images'].isEmpty)
                      ? [
                          // Display the placeholder image when there are no items.
                          InkWell(
                            onTap: () {},
                            child: SizedBox(
                              child: Image.network(
                                'https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-19.jpg',
                                fit: BoxFit.fill,
                              ),
                            ),
                          ),
                        ]
                      : productInfo['images'].map<Widget>((e) {
                          return InkWell(
                            onTap: () {},
                            child: SizedBox(
                              child: Image.network(
                                e['mob'] ??
                                    'https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-19.jpg',
                                fit: BoxFit.fill,
                                errorBuilder: (BuildContext context,
                                    Object exception, StackTrace? stackTrace) {
                                  // Display the placeholder image when an error occurs.
                                  return Image.network(
                                    'https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-19.jpg',
                                    fit: BoxFit.fill,
                                  );
                                },
                              ),
                            ),
                          );
                        }).toList(),
                ),
                Positioned(
                  bottom: 10,
                  right: 10,
                  child: InkWell(
                    onTap: () {
                      if (productInfo.containsKey('dynamicLink')) {
                        Share.share(productInfo['dynamicLink']);
                      }
                    },
                    child: Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(100),
                        boxShadow: const [
                          BoxShadow(
                            blurRadius: 2,
                            color: Color.fromARGB(255, 201, 200, 200),
                            offset: Offset(0, 0),
                            spreadRadius: 1,
                          ),
                        ],
                      ),
                      child: Center(
                          child: SvgPicture.asset('assets/Icons/share.svg')),
                    ),
                  ),
                )
              ])

                  // CarouselSlider(
                  //   options: CarouselOptions(
                  //     enableInfiniteScroll: false,
                  //     height: size.height * 0.5,
                  //     enlargeCenterPage: true,
                  //     viewportFraction: 1,
                  //     autoPlay: false,
                  //     onPageChanged: (index, _) {
                  //       setState(() {
                  //         pageNumber = index;
                  //       });
                  //     },
                  //     // height: widget.size.width*0.5
                  //   ),
                  //   items: [
                  //     ...(productInfo['images'].map((e) {
                  //       return InkWell(
                  //         onTap: () {},
                  //         child: SizedBox(
                  //           child: Image.network(
                  //             e['mob'],
                  //             fit: BoxFit.fill,
                  //           ),
                  //         ),
                  //       );
                  //     }).toList())
                  //   ],
                  // ),
                  ),
            ),
            const SizedBox(
              height: 10,
            ),
            SizedBox(
              width: double.infinity,
              child: Center(
                child: CarouselIndicator(
                  height: 7,
                  width: 7,
                  count: productInfo['images'].length,
                  index: pageNumber,
                  activeColor: AppTheme().secondaryColor,
                  color: Colors.grey,
                ),
              ),
            ),
            const SizedBox(
              height: 20,
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 15),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    productInfo['prodName'],
                    style: AppTheme().outfitStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 20,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      // Text(
                      //   getPriceData() != null
                      //       ? "Rs ${getPriceData()['discountedPrice']} ${getPriceData()['discountedPrice'] < getPriceData()['price'] ? "Rs ${getPriceData()['price']}" : "Rs ${getPriceData()['price'].toString()}"}"
                      //       : "Rs ${productInfo['priceList'][selectedVariant]['discountedPrice'].toString()} ${productInfo['priceList'][selectedVariant]['discountedPrice'] < productInfo['priceList'][selectedVariant]['price'] ? "Rs ${productInfo['priceList'][selectedVariant]['price']}" : "Rs ${productInfo['priceList'][selectedVariant]['price'].toString()}"}",
                      //   style: AppTheme().outfitStyle(
                      //     color: AppTheme().secondaryColor,
                      //     fontSize: 20,
                      //   ),
                      // ),
                      RichText(
                        text: TextSpan(
                          children: <TextSpan>[
                            TextSpan(
                              text:
                                  'Rs ${getPriceData() != null ? getPriceData()['discountedPrice'] : productInfo['priceList'][selectedVariant]['discountedPrice'].toString()}',
                              style: GoogleFonts.urbanist(
                                color: AppTheme().themeColor,
                                fontWeight: FontWeight.w700,
                                fontSize: 26,
                              ),
                            ),
                            const TextSpan(
                              text: '   ',
                            ),
                            if (getPriceData() != null &&
                                getPriceData()['price'] != 0 &&
                                getPriceData()['price'] !=
                                    productInfo['priceList'][selectedVariant]
                                        ['discountedPrice'])
                              TextSpan(
                                text: 'Rs ${getPriceData()['price']}',
                                style: GoogleFonts.urbanist(
                                  color: AppTheme().themeColor,
                                  fontWeight: FontWeight.w400,
                                  decoration: TextDecoration.lineThrough,
                                  fontSize: 14,
                                ),
                              ),
                          ],
                        ),
                      ),

                      // Text(
                      //   "Rs ${productInfo['priceList'][selectedVariant]['discountedPrice'].toString()}",
                      //   style: AppTheme().outfitStyle(
                      //     color: AppTheme().secondaryColor,
                      //     fontSize: 20,
                      //   ),
                      // ),
                      // const SizedBox(width: 10),
                      // Text(
                      //   "Rs ${productInfo['priceList'][selectedVariant]['price'].toString()}",
                      //   style: GoogleFonts.outfit(
                      //     textStyle: TextStyle(
                      //       color: Colors.grey[400],
                      //       fontSize: 14,
                      //       decoration: TextDecoration.lineThrough,
                      //     ),
                      //   ),
                      // ),
                      const SizedBox(width: 10),
                      Visibility(
                        visible: calculateDiscountPercentage(
                                productInfo['priceList'][selectedVariant]
                                    ['price'],
                                productInfo['priceList'][selectedVariant]
                                    ['discountedPrice']) >
                            0,
                        child: Text(
                          "(${calculateDiscountPercentage(productInfo['priceList'][selectedVariant]['price'], productInfo['priceList'][selectedVariant]['discountedPrice'])}% OFF)",
                          style: AppTheme().outfitStyle(
                            color: const Color(0xffFFA086),
                            fontSize: 18,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          // width: size.width * 0.33,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(5),
                            border: Border.all(
                              width: 1,
                              color: const Color.fromARGB(255, 199, 199, 199),
                            ),
                          ),
                          child: Row(
                            children: [
                              InkWell(
                                onTap: () {
                                  var newQuantity = quantity - 1;

                                  setState(() {
                                    quantity =
                                        newQuantity == 0 ? 1 : newQuantity;
                                  });
                                },
                                child: const SizedBox(
                                  height: 30,
                                  width: 30,
                                  child: Center(
                                    child: Icon(
                                      Icons.remove,
                                      size: 15,
                                    ),
                                  ),
                                ),
                              ),
                              Container(
                                height: 30,
                                decoration: const BoxDecoration(
                                  border: Border(
                                    left: BorderSide(
                                        width: 1,
                                        color:
                                            Color.fromARGB(255, 199, 199, 199)),
                                    right: BorderSide(
                                        width: 1,
                                        color:
                                            Color.fromARGB(255, 199, 199, 199)),
                                  ),
                                ),
                                width: 50,
                                child: Center(
                                  child: Text(
                                    "$quantity",
                                    style: TextStyle(
                                        color: AppTheme().secondaryColor),
                                  ),
                                ),
                              ),
                              InkWell(
                                onTap: () {
                                  if (productInfo['maxQty'] == null) {
                                    if (quantity + 1 <=
                                        int.parse(productInfo['priceList']
                                                [selectedVariant]
                                            ['totalQuantity'])) {
                                      setState(() {
                                        quantity = quantity + 1;
                                      });
                                    } else {
                                      Fluttertoast.showToast(
                                          msg: 'Can not add more of this item');
                                    }
                                  } else {
                                    if (quantity + 1 <=
                                            int.parse(productInfo['priceList']
                                                    [selectedVariant]
                                                ['totalQuantity']) &&
                                        quantity < productInfo['maxQty']) {
                                      setState(() {
                                        quantity = quantity + 1;
                                      });
                                    } else {
                                      Fluttertoast.showToast(
                                          msg: 'Can not add more of this item');
                                    }
                                  }
                                },
                                child: const SizedBox(
                                  height: 30,
                                  width: 30,
                                  child: Center(
                                    child: Icon(
                                      Icons.add,
                                      size: 15,
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  productInfo.containsKey('carbonEmission') == false
                      ? const SizedBox()
                      : productInfo['carbonEmission']['organic'].toString() ==
                                  "0" ||
                              productInfo['carbonEmission']['nonOrganic']
                                      .toString() ==
                                  "0" ||
                              (productInfo['priceList'][selectedVariant]
                                      .containsKey('shippinhWeight') &&
                                  productInfo['priceList'][selectedVariant]
                                              ['shippingWeight']
                                          .toString() ==
                                      "")
                          ? const SizedBox()
                          : const SizedBox(height: 2),
                  productInfo.containsKey('carbonEmission') == false
                      ? const SizedBox()
                      : productInfo['carbonEmission']['organic'].toString() ==
                                  "0" ||
                              productInfo['carbonEmission']['nonOrganic']
                                      .toString() ==
                                  "0" ||
                              (productInfo['priceList'][selectedVariant]
                                      .containsKey('shippinhWeight') &&
                                  productInfo['priceList'][selectedVariant]
                                              ['shippingWeight']
                                          .toString() ==
                                      "")
                          ? const SizedBox()
                          : Row(
                              children: [
                                Text(
                                  "${buildCO2EmissionsText(productInfo['carbonEmission'])}% ",
                                  style: AppTheme().outfitStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.w600,
                                      color: Colors.red),
                                ),
                                const Text(
                                  "CO2 Emissions",
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w600,
                                  ),
                                )
                              ],
                            ),

// Size Variations
                  Visibility(
                    visible:
                        selectedSize.isNotEmpty && selectedOption.isNotEmpty,
                    child: Column(
                      children: [
                        const SizedBox(height: 5),
                        Text(
                          getProductAvailabilityText(),
                          style: AppTheme().outfitStyle(),
                        ),
                        const SizedBox(height: 5),
                      ],
                    ),
                  ),
                  // const SizedBox(height: 10),

                  // Text(
                  //   getProductAvailabilityText(),
                  //   style: AppTheme().outfitStyle(),
                  // ),
                  // const SizedBox(height: 20),
                  if (productInfo != null && productInfo['variants'] != null)
                    if (productInfo['variants']['option1'] != null)
                      Text(
                        'Color:',
                        style: AppTheme().outfitStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                        ),
                      ),

                  const SizedBox(height: 10),
// Size Variations

                  Visibility(
                    visible: (productInfo != null &&
                        productInfo['variants'] != null &&
                        productInfo['variants']['option1'] != null),
                    child: SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: List.generate(
                          (sizeList).length ?? 0,
                          (index) {
                            String size = (sizeList)[index] ?? '';
                            return GestureDetector(
                              onTap: () {
                                setState(() {
                                  selectedSize = size;
                                });
                                getPriceData();
                                getProductAvailabilityText();
                                setState(() {});
                              },
                              child: Container(
                                // width: 40,
                                // height: 40,
                                margin: const EdgeInsets.only(right: 10),
                                decoration: BoxDecoration(
                                  color: selectedSize == size
                                      ? Colors.black
                                      : Colors.white,
                                  shape: BoxShape.rectangle,
                                  border: Border.all(
                                    color: Colors.black,
                                    width: 1,
                                  ),
                                ),
                                child: Center(
                                  child: Padding(
                                    padding: const EdgeInsets.all(6.0),
                                    child: Text(
                                      size,
                                      style: TextStyle(
                                        color: selectedSize == size
                                            ? Colors.white
                                            : Colors.black,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            );
                          },
                        ),
                      ),
                    ),
                  ),

// colors

                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      if (productInfo != null &&
                          productInfo['variants'] != null &&
                          productInfo['variants']['option2'][0] != null)
                        Text(
                          'Size:',
                          style: AppTheme().outfitStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      // const SizedBox(height: 10),
                      if (productInfo != null &&
                          productInfo['variants'] != null &&
                          productInfo['variants']['option2'][0] != null)
                        Visibility(
                          // visible: productInfo != null &&
                          //     (productInfo['categories'] ==
                          //             'BRML561qxlQvEdEbLDez' ||
                          //         productInfo['categories']
                          //             .contains('BRML561qxlQvEdEbLDez')),
                          child: Row(
                            children: [
                              SvgPicture.asset(
                                'assets/Icons/ruler.svg',
                                height: 25,
                                width: 25,
                              ),
                              TextButton(
                                  onPressed: () {
                                    // _showImageDialog(context);
                                  },
                                  child: Text(
                                    'Size Chart',
                                    style: AppTheme().outfitStyle(
                                        color: Colors.black,
                                        fontSize: 11,
                                        fontWeight: FontWeight.w500),
                                  ))
                            ],
                          ),
                        )
                    ],
                  ),
                  // const SizedBox(height: 10),

                  Visibility(
                    visible: (productInfo != null &&
                        productInfo['variants'] != null &&
                        productInfo['variants']['option2'][0] != null),
                    child: SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: List.generate(
                          colorList.length,
                          (index) {
                            String option = colorList[index];

                            if (option.isNotEmpty) {
                              return GestureDetector(
                                onTap: () {
                                  setState(() {
                                    selectedOption = option;
                                    print("OPTION+ $option");
                                  });
                                  getPriceData();
                                  getProductAvailabilityText();
                                  setState(() {});
                                },
                                child: Container(
                                  // width: 40,
                                  // height: 30,
                                  margin: const EdgeInsets.only(right: 10),
                                  decoration: BoxDecoration(
                                    color: selectedOption == option
                                        ? Colors.black
                                        : Colors.white,
                                    shape: BoxShape.rectangle,
                                    border: Border.all(
                                      color: Colors.black,
                                      width: 1,
                                    ),
                                  ),
                                  child: Center(
                                    child: Padding(
                                      padding: const EdgeInsets.all(6.0),
                                      child: Text(
                                        option,
                                        style: TextStyle(
                                          color: selectedOption == option
                                              ? Colors.white
                                              : Colors.black,
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              );
                            } else {
                              return const SizedBox();
                            }
                          },
                        ),
                      ),
                    ),
                  ),

                  productInfo.containsKey('carbonEmission') == false
                      ? const SizedBox()
                      : productInfo['carbonEmission']['organic'].toString() ==
                                  "0" ||
                              productInfo['carbonEmission']['nonOrganic']
                                      .toString() ==
                                  "0" ||
                              (productInfo['priceList'][selectedVariant]
                                      .containsKey('shippinhWeight') &&
                                  productInfo['priceList'][selectedVariant]
                                              ['shippingWeight']
                                          .toString() ==
                                      "")
                          ? const SizedBox()
                          : SizedBox(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const SizedBox(height: 20),
                                  Text(
                                    "CO2 Emissions per unit",
                                    style: AppTheme().outfitStyle(
                                        fontSize: 18,
                                        fontWeight: FontWeight.w600),
                                  ),
                                  const SizedBox(height: 10),
                                  Row(
                                    children: [
                                      const Text(
                                        "Organic: ",
                                        style: TextStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.w900,
                                            color: Colors.grey),
                                      ),
                                      Text(
                                        "${((double.parse(productInfo['priceList'][0]['shippingWeight'].toString()) * double.parse(productInfo['carbonEmission']['organic'].toString())) / 1000).toStringAsFixed(2)}Kg ",
                                        style: const TextStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.w500,
                                            color: Colors.grey),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 10),
                                  Row(
                                    children: [
                                      Text(
                                        "Non Organic: ",
                                        style: AppTheme().outfitStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.w900,
                                            color: Colors.grey),
                                      ),
                                      Text(
                                        "${((double.parse(productInfo['priceList'][0]['shippingWeight'].toString()) * double.parse(productInfo['carbonEmission']['nonOrganic'].toString())) / 1000).toStringAsFixed(2)}Kg ",
                                        style: AppTheme().outfitStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.w500,
                                            color: Colors.grey),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                  const SizedBox(height: 20),
                ],
              ),
            ),
            const SizedBox(height: 0),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 15.0),
              child: Row(
                children: [
                  SvgPicture.asset('assets/Icons/truck.svg'),
                  const SizedBox(width: 6),
                  Text(
                    'WHEN WILL I RECIEVE MY ORDER ?',
                    style: AppTheme().outfitStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(15.0),
              child: Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  // color: Colors.grey,
                  shape: BoxShape.rectangle,
                  border: Border.all(
                    color: const Color(0xff999999),
                    width: 1,
                  ),
                ),
                child: Row(
                  children: [
                    Expanded(
                      flex: 4,
                      child: TextFormField(
                        decoration: const InputDecoration(
                          hintText: 'Enter your pincode',
                          border: InputBorder.none,
                          hintStyle: TextStyle(color: Color(0xff999999)),
                          contentPadding: EdgeInsets.all(12),
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 4),
                      child: ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppTheme().themeColor,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(0),
                          ),
                        ),
                        child: Text(
                          'Check',
                          style: AppTheme()
                              .outfitStyle(color: Colors.white, fontSize: 12),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: Column(
                    children: [
                      //Description
                      InkWell(
                        onTap: () {
                          setState(() {
                            isDescriptionExpanded = !isDescriptionExpanded;
                          });
                        },
                        child: Container(
                          width: double.infinity,
                          decoration: const BoxDecoration(
                            shape: BoxShape.rectangle,
                            // border: Border.all(
                            //   color: const Color(0xff999999),
                            //   width: 1,
                            // ),
                          ),
                          child: Column(
                            // crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              ExpandableSection(
                                title: 'Product Info',
                                iconAsset: 'assets/Icons/dress.svg',
                                content: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Padding(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 0),
                                      child: Html(
                                        data: productInfo['prodDesc'],
                                        style: {
                                          'body': Style(
                                            fontFamily:
                                                GoogleFonts.outfit().fontFamily,
                                            fontSize: FontSize(14.0),
                                            color: Colors.black,
                                          ),
                                        },
                                      ),
                                    ),
                                    // Padding(
                                    //   padding: const EdgeInsets.only(top: 10.0),
                                    //   child: Visibility(
                                    //     visible:
                                    //         (productInfo['metafields'] as List)
                                    //             .isNotEmpty,
                                    //     child: Column(
                                    //       crossAxisAlignment:
                                    //           CrossAxisAlignment.start,
                                    //       children: [
                                    //         Padding(
                                    //           padding:
                                    //               const EdgeInsets.symmetric(
                                    //                   horizontal: 8),
                                    //           child: Text(
                                    //             'Specifications',
                                    //             style: AppTheme().outfitStyle(
                                    //                 fontSize: 18,
                                    //                 fontWeight:
                                    //                     FontWeight.w500),
                                    //           ),
                                    //         ),
                                    //         GridView.builder(
                                    //           itemCount:
                                    //               (productInfo['metafields']
                                    //                       as List)
                                    //                   .length,
                                    //           shrinkWrap: true,
                                    //           physics:
                                    //               const NeverScrollableScrollPhysics(),
                                    //           gridDelegate:
                                    //               const SliverGridDelegateWithFixedCrossAxisCount(
                                    //                   crossAxisCount: 2,
                                    //                   mainAxisExtent: 80),
                                    //           itemBuilder:
                                    //               (BuildContext context,
                                    //                   int index) {
                                    //             return buildProductSpecificationsGrid()[
                                    //                 index];
                                    //           },
                                    //         ),
                                    //       ],
                                    //     ),
                                    //   ),
                                    // ),
                                  ],
                                ),
                              ),
                              ExpandableSection(
                                title: 'Reviews & Ratings',
                                iconAsset: 'assets/Icons/favourite.svg',
                                content: Column(
                                  children: [
                                    productInfo['productType'] == "appointment"
                                        ? const SizedBox()
                                        : Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            children: [
                                              productInfo['rating'] != null &&
                                                      productInfo['rating']
                                                              .toString() !=
                                                          "{}"
                                                  ? const Text(
                                                      "Ratings And Reviews",
                                                      style: TextStyle(
                                                          fontWeight:
                                                              FontWeight.w900),
                                                    )
                                                  : const Text(
                                                      "No Ratings Yet"),
                                              InkWell(
                                                onTap: () {
                                                  if (FirebaseAuth.instance
                                                          .currentUser?.uid ==
                                                      null) {
                                                    Fluttertoast.showToast(
                                                        msg: "Login First");
                                                    return;
                                                  }
                                                  Navigator.of(context,
                                                          rootNavigator: true)
                                                      .push(
                                                    CupertinoPageRoute(
                                                      builder: (context) =>
                                                          RateProduct(
                                                        productId: args['id'],
                                                        productInfo:
                                                            productInfo,
                                                      ),
                                                    ),
                                                  );
                                                },
                                                child: Container(
                                                  padding: const EdgeInsets
                                                      .symmetric(
                                                      horizontal: 10,
                                                      vertical: 5),
                                                  decoration: BoxDecoration(
                                                      border: Border.all(
                                                          color: AppTheme()
                                                              .secondaryColor,
                                                          width: 1),
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              5)),
                                                  child: Text(
                                                    "Rate Product",
                                                    style: TextStyle(
                                                      color: AppTheme()
                                                          .secondaryColor,
                                                      fontSize: 13,
                                                    ),
                                                  ),
                                                ),
                                              )
                                            ],
                                          ),
                                    productInfo['productType'] !=
                                                "appointment" &&
                                            productInfo['rating'] != null &&
                                            productInfo['rating'].toString() !=
                                                "{}"
                                        ? InkWell(
                                            onTap: () {
                                              Navigator.of(context).pushNamed(
                                                  '/ratings',
                                                  arguments: {
                                                    'productId': args['id'],
                                                    'totalRatings':
                                                        productInfo['rating']
                                                  });
                                            },
                                            child: Container(
                                              margin:
                                                  const EdgeInsets.only(top: 5),
                                              child: Row(
                                                children: [
                                                  Expanded(
                                                      child: Column(
                                                    children: [
                                                      Row(
                                                        children: [
                                                          Expanded(
                                                            child: Column(
                                                              crossAxisAlignment:
                                                                  CrossAxisAlignment
                                                                      .start,
                                                              children: [
                                                                SizedBox(
                                                                  height: 25,
                                                                  // width: size.width * 0.32,
                                                                  child: Row(
                                                                    crossAxisAlignment:
                                                                        CrossAxisAlignment
                                                                            .center,
                                                                    children: [
                                                                      SizedBox(
                                                                        // height: 25,
                                                                        child: ListView
                                                                            .builder(
                                                                          shrinkWrap:
                                                                              true,
                                                                          scrollDirection:
                                                                              Axis.horizontal,
                                                                          itemCount:
                                                                              productInfo['rating']['avgRating'].round(),
                                                                          itemBuilder: (context, index) =>
                                                                              Icon(
                                                                            Icons.star,
                                                                            color:
                                                                                AppTheme().secondaryColor,
                                                                          ),
                                                                        ),
                                                                      ),
                                                                      const SizedBox(
                                                                        width:
                                                                            5,
                                                                      ),
                                                                      Text(
                                                                        "${productInfo['rating']['avgRating'].round()} out of 5",
                                                                        style:
                                                                            const TextStyle(
                                                                          fontWeight:
                                                                              FontWeight.w500,
                                                                          color: Color.fromARGB(
                                                                              255,
                                                                              121,
                                                                              121,
                                                                              121),
                                                                        ),
                                                                      )
                                                                    ],
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                    height: 5),
                                                                Padding(
                                                                  padding:
                                                                      const EdgeInsets
                                                                          .only(
                                                                          left:
                                                                              5.0),
                                                                  child: Text(
                                                                    '${productInfo['rating']['totalRatings']} rating',
                                                                    style: const TextStyle(
                                                                        fontWeight:
                                                                            FontWeight
                                                                                .w500,
                                                                        color: Colors
                                                                            .grey,
                                                                        fontSize:
                                                                            12),
                                                                  ),
                                                                ),
                                                              ],
                                                            ),
                                                          ),
                                                          const Icon(
                                                            Icons
                                                                .arrow_forward_ios,
                                                            size: 15,
                                                            color: Colors.grey,
                                                          )
                                                        ],
                                                      ),
                                                    ],
                                                  ))
                                                ],
                                              ),
                                            ),
                                          )
                                        : const SizedBox(),
                                    const SizedBox(
                                      height: 10,
                                    ),
                                    // productInfo['productType'] == "appointment"
                                    //     ? const SizedBox()
                                    //     : const Divider(
                                    //         color: Color.fromARGB(
                                    //             255, 171, 171, 171),
                                    //         height: 1,
                                    //         thickness: 1,
                                    //       ),
                                    productInfo['rating'] != null &&
                                            productInfo['productType'] !=
                                                "appointment"
                                        ? Container(
                                            child: FutureBuilder(
                                              future: FirebaseFirestore.instance
                                                  .collection('products')
                                                  .doc(args['id'])
                                                  .collection('ratings')
                                                  .where('status',
                                                      isEqualTo: "approved")
                                                  .get(),
                                              builder: (context, snapshot) {
                                                if (snapshot.hasData == false) {
                                                  return const SizedBox();
                                                }
                                                if (snapshot
                                                    .data!.docs.isEmpty) {
                                                  return const SizedBox();
                                                }

                                                var data = snapshot
                                                            .data!.docs.length >
                                                        3
                                                    ? snapshot.data?.docs
                                                        .sublist(0, 3)
                                                    : snapshot.data?.docs;

                                                return Container(
                                                  child: Column(
                                                    children: [
                                                      ...(data!.map((e) {
                                                        return Container(
                                                          margin:
                                                              const EdgeInsets
                                                                  .only(
                                                                  top: 10),
                                                          child: Column(
                                                            crossAxisAlignment:
                                                                CrossAxisAlignment
                                                                    .start,
                                                            children: [
                                                              Text(
                                                                e['userName'],
                                                                style: const TextStyle(
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .w900),
                                                              ),
                                                              const SizedBox(
                                                                  height: 5),
                                                              SizedBox(
                                                                height: 20,
                                                                child: ListView
                                                                    .builder(
                                                                  shrinkWrap:
                                                                      true,
                                                                  scrollDirection:
                                                                      Axis.horizontal,
                                                                  itemCount: e[
                                                                          'rating']
                                                                      .round(),
                                                                  itemBuilder:
                                                                      (context,
                                                                              index) =>
                                                                          Icon(
                                                                    Icons.star,
                                                                    size: 17,
                                                                    color: AppTheme()
                                                                        .secondaryColor,
                                                                  ),
                                                                ),
                                                              ),
                                                              const SizedBox(
                                                                height: 5,
                                                              ),
                                                              e['review']
                                                                      .toString()
                                                                      .isNotEmpty
                                                                  ? Text(
                                                                      e['review'],
                                                                      style: const TextStyle(
                                                                          fontWeight:
                                                                              FontWeight.w600),
                                                                    )
                                                                  : const SizedBox(),
                                                              SizedBox(
                                                                height: e['review']
                                                                        .toString()
                                                                        .isEmpty
                                                                    ? 0
                                                                    : 5,
                                                              ),
                                                              Text(
                                                                "Rated on ${DateFormat('dd MMMM yyyy').format(e['createdAt'].toDate())}",
                                                                style: const TextStyle(
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .w600,
                                                                    fontSize:
                                                                        12,
                                                                    color: Colors
                                                                        .grey),
                                                              ),
                                                              const SizedBox(
                                                                height: 10,
                                                              ),
                                                              const Divider(
                                                                color: Color
                                                                    .fromARGB(
                                                                        255,
                                                                        171,
                                                                        171,
                                                                        171),
                                                                height: 1,
                                                                thickness: 1,
                                                              ),
                                                            ],
                                                          ),
                                                        );
                                                      }).toList())
                                                    ],
                                                  ),
                                                );
                                              },
                                            ),
                                          )
                                        : const SizedBox(),
                                    const SizedBox(
                                      height: 20,
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),

                      // ADD BUTTONS
                      productInfo == null
                          ?
                          // if (productInfo == null)
                          SizedBox(
                              // height: size.height * 0.7,
                              child: Center(
                                child: CircularProgressIndicator(
                                  color: AppTheme().secondaryColor,
                                ),
                              ),
                            )
                          : Row(
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                Expanded(
                                  child: Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: ElevatedButton(
                                      onPressed: () async {
                                        if (productInfo != null) {
                                          String productId = productInfo['id'];

                                          if (authProvider
                                              .isInWishlist(productId)) {
                                            await authProvider
                                                .removeFromWishlist(productId);
                                          } else {
                                            await authProvider
                                                .addToWishlist(productId);
                                          }

                                          // No need to use setState here

                                          // If you want to update the productInfo locally with the updated wishlist status
                                          setState(() {
                                            productInfo['isInWishlist'] =
                                                authProvider
                                                    .isInWishlist(productId);
                                            // print('yha ${productInfo['isInWishlist']}');
                                          });
                                        }
                                      },
                                      style: ButtonStyle(
                                        backgroundColor:
                                            MaterialStateProperty.all(
                                                Colors.white),
                                        shape: MaterialStateProperty.all(
                                          const RoundedRectangleBorder(
                                            borderRadius: BorderRadius.all(
                                                Radius.circular(0)),
                                            side: BorderSide(
                                                color: Colors.black54),
                                          ),
                                        ),
                                      ),
                                      child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          // SvgPicture.asset(
                                          //   "assets/Icons/wishlist.svg",
                                          //   color: Colors.white,
                                          //   height: 18,
                                          // ),
                                          Icon(
                                            // !productInfo!.toString().contains('isInWishlist')
                                            authProvider.isInWishlist(
                                                    productInfo['id'])
                                                ? Icons.favorite
                                                : Icons
                                                    .favorite_border_outlined,
                                            //     ? Icons.favorite
                                            //     : Icons.favorite_border_outlined,
                                            color: authProvider.isInWishlist(
                                                    productInfo['id'])
                                                ? AppTheme().themeColor
                                                : Colors.black,
                                            size: 15,
                                          ),
                                          const SizedBox(width: 10),
                                          SizedBox(
                                            width: size.width * 0.22,
                                            child: Text(
                                                authProvider.isInWishlist(
                                                        productInfo['id'])
                                                    ? 'WISHLISTED'
                                                    : 'ADD TO WISHLIST',
                                                maxLines: 1,
                                                style: const TextStyle(
                                                    fontSize: 10,
                                                    overflow:
                                                        TextOverflow.ellipsis,
                                                    color: Colors.black,
                                                    fontWeight:
                                                        FontWeight.w500)),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                                // Expanded(
                                //   child: GestureDetector(
                                //     onTap: () {
                                //       if (Provider.of<Cart>(context, listen: false).cart.any(
                                //           (element) =>
                                //               element['productId'] == productInfo['id'] &&
                                //               element['description'] ==
                                //                   productInfo['priceList'][selectedVariant]
                                //                       ['weight'])) {
                                //         Navigator.pushNamed(context, '/cart');
                                //       } else {
                                //         handleAddToCart();
                                //       }
                                //     },
                                //     child: Container(
                                //       padding: const EdgeInsets.all(8.0),
                                //       child: ElevatedButton(
                                //         onPressed: DatabaseService()
                                //                 .checkPdtVariantStock(productInfo, selectedVariant)
                                //             ? null
                                //             : () {
                                //                 if (Provider.of<Cart>(context, listen: false)
                                //                     .cart
                                //                     .any((element) =>
                                //                         element['productId'] == productInfo['id'] &&
                                //                         element['description'] ==
                                //                             productInfo['priceList']
                                //                                 [selectedVariant]['weight'])) {
                                //                   Navigator.pushNamed(context,
                                //                       '/cart'); // Navigate to "/cart" route
                                //                 } else {
                                //                   handleAddToCart();
                                //                 }
                                //               },
                                //         style: ButtonStyle(
                                //           shape: const MaterialStatePropertyAll(
                                //             RoundedRectangleBorder(
                                //                 borderRadius: BorderRadius.all(Radius.circular(0))),
                                //           ),
                                //           backgroundColor: MaterialStatePropertyAll(
                                //               Provider.of<Cart>(context).cart.any((element) =>
                                //                           element['productId'] ==
                                //                               productInfo['id'] &&
                                //                           element['description'] ==
                                //                               productInfo['priceList']
                                //                                   [selectedVariant]['weight']) ||
                                //                       DatabaseService().checkPdtVariantStock(
                                //                           productInfo, selectedVariant)
                                //                   ? AppTheme().themeColor
                                //                   //  const Color.fromARGB(255, 107, 105, 105)

                                //                   : Colors.black),
                                //         ),
                                //         child: Row(
                                //           mainAxisAlignment: MainAxisAlignment.center,
                                //           children: [
                                //             const Icon(
                                //               Icons.shopping_bag_outlined,
                                //               color: Colors.white,
                                //               size: 18,
                                //             ),
                                //             const SizedBox(
                                //               width: 10,
                                //             ),
                                //             Text(
                                //               Provider.of<Cart>(context).cart.any((element) =>
                                //                       element['productId'] == productInfo['id'] &&
                                //                       element['description'] ==
                                //                           productInfo['priceList'][selectedVariant]
                                //                               ['weight'])
                                //                   ? "Go To Bag"
                                //                   : DatabaseService().checkPdtVariantStock(
                                //                           productInfo, selectedVariant)
                                //                       ? "Out Of Stock"
                                //                       : 'ADD TO BAG',
                                //               style: AppTheme().outfitStyle(
                                //                   fontSize: 13,
                                //                   color: Colors.white,
                                //                   fontWeight: FontWeight.w500),
                                //             )
                                //           ],
                                //         ),
                                //       ),
                                //     ),
                                //   ),
                                // ),
                                Expanded(
                                  child: GestureDetector(
                                    onTap: () {
                                      var cartProvider = Provider.of<Cart>(
                                          context,
                                          listen: false);
                                      var cart = cartProvider.cart;

                                      var check = cart.any((element) =>
                                          element['productId'] ==
                                              productInfo['id'] &&
                                          element['description'] ==
                                              productInfo['priceList']
                                                  [selectedVariant]['weight']);

                                      if (check) {
                                        Navigator.pushNamed(context,
                                            '/cart'); // Navigate to "/cart" route
                                      } else {
                                        // Directly add the item to cart
                                        cartProvider.addToCart(
                                          priceListIndex: selectedVariant,
                                          product: productInfo,
                                          productId: productInfo['id'],
                                          quantity: quantity,
                                        );
                                      }
                                    },
                                    child: Container(
                                      padding: const EdgeInsets.all(8.0),
                                      child: ElevatedButton(
                                        onPressed: () {
                                          var productData = getPriceData();
                                          if (productData != null) {
                                            handleAddToCart();
                                            // Navigator.pushNamed(context,
                                            //     '/cart');
                                          } else {
                                            ScaffoldMessenger.of(context)
                                                .showSnackBar(
                                              const SnackBar(
                                                content: Text(
                                                    'This Product Variant is out of stock. Cannot add to bag.'),
                                              ),
                                            );
                                          }
                                          //  DatabaseService().checkPdtVariantStock(
                                          //         productInfo, selectedVariant)
                                          //     ? null
                                          //     : () {
                                          //         var cartProvider =
                                          //             Provider.of<Cart>(context, listen: false);
                                          //         var cart = cartProvider.cart;

                                          //         var check = cart.any((element) =>
                                          //             element['productId'] ==
                                          //                 productInfo['id'] &&
                                          //             element['description'] ==
                                          //                 productInfo['priceList']
                                          //                     [selectedVariant]['weight']);

                                          //         if (check) {
                                          //           Navigator.pushNamed(context,
                                          //               '/cart'); // Navigate to "/cart" route
                                          //         } else {
                                          //           // Directly add the item to cart
                                          //           cartProvider.addToCart(
                                          //             priceListIndex: selectedVariant,
                                          //             product: productInfo,
                                          //             productId: productInfo['id'],
                                          //             quantity: quantity,
                                          //           );
                                          //         }
                                        },
                                        style: ButtonStyle(
                                          shape: const MaterialStatePropertyAll(
                                            RoundedRectangleBorder(
                                              borderRadius: BorderRadius.all(
                                                  Radius.circular(0)),
                                            ),
                                          ),
                                          backgroundColor:
                                              MaterialStatePropertyAll(
                                            Provider.of<Cart>(context).cart.any((element) =>
                                                        element['productId'] ==
                                                            productInfo['id'] &&
                                                        element['description'] ==
                                                            productInfo['priceList']
                                                                    [
                                                                    selectedVariant]
                                                                ['weight']) ||
                                                    DatabaseService()
                                                        .checkPdtVariantStock(
                                                            productInfo,
                                                            selectedVariant)
                                                ? Colors.black12
                                                : Colors.black,
                                          ),
                                        ),
                                        child: Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          children: [
                                            SvgPicture.asset(
                                              "assets/Icons/Bag.svg",
                                              color: Colors.white,
                                              height: 15,
                                            ),
                                            const SizedBox(
                                              width: 10,
                                            ),
                                            Text(
                                              Provider.of<Cart>(context)
                                                      .cart
                                                      .any((element) =>
                                                          element['productId'] ==
                                                              productInfo[
                                                                  'id'] &&
                                                          element['description'] ==
                                                              productInfo['priceList']
                                                                      [
                                                                      selectedVariant]
                                                                  ['weight'])
                                                  ? "Already in Bag"
                                                  : DatabaseService()
                                                          .checkPdtVariantStock(
                                                              productInfo,
                                                              selectedVariant)
                                                      ? "Out Of Stock"
                                                      : 'ADD TO BAG',
                                              // style: AppTheme().outfitStyle(
                                              style: AppTheme().outfitStyle(
                                                  fontSize: 10,
                                                  color: Colors.white,
                                                  fontWeight: FontWeight.w500),
                                            )
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                      // Row(
                      //   mainAxisAlignment: MainAxisAlignment.spaceAround,
                      //   children: [
                      //     ElevatedButton(
                      //       // onPressed: DatabaseService().checkPdtVariantStock(
                      //       //         productInfo, selectedVariant)
                      //       //     ? null
                      //       //     : handleAddToCart,
                      //       onPressed: () {
                      //         var productData = getPriceData();
                      //         if (productData != null) {
                      //           handleAddToCart();
                      //         } else {
                      //           ScaffoldMessenger.of(context).showSnackBar(
                      //             const SnackBar(
                      //               content: Text(
                      //                   'This Product Variant is out of stock. Cannot add to bag.'),
                      //             ),
                      //           );
                      //         }
                      //       },
                      //       style: ButtonStyle(
                      //         shape: const MaterialStatePropertyAll(
                      //           RoundedRectangleBorder(
                      //               borderRadius: BorderRadius.zero),
                      //         ),
                      //         //  RoundedRectangleBorder(
                      //         //   borderRadius: BorderRadius.zero,
                      //         // ),
                      //         backgroundColor: MaterialStatePropertyAll(
                      //             Provider.of<Cart>(
                      //                       context,
                      //                     ).cart.any((element) =>
                      //                         element['productId'] ==
                      //                             productInfo['id'] &&
                      //                         element['description'] ==
                      //                             productInfo['priceList']
                      //                                     [selectedVariant]
                      //                                 ['weight']) ||
                      //                     DatabaseService()
                      //                         .checkPdtVariantStock(
                      //                       productInfo,
                      //                       selectedVariant,
                      //                     )
                      //                 ? const Color(0xffEBEDF1)
                      //                 : Colors.black),
                      //       ),
                      //       child: Padding(
                      //         padding: const EdgeInsets.all(16.0),
                      //         child: Row(
                      //           // mainAxisAlignment: MainAxisAlignment.start,
                      //           children: [
                      //             // const Icon(
                      //             //   Icons.shopping_cart_outlined,
                      //             //   color: Colors.white,
                      //             //   size: 18,
                      //             // ),
                      //             // const SizedBox(
                      //             //   width: 10,
                      //             // ),
                      //             Text(
                      //               Provider.of<Cart>(
                      //                 context,
                      //               ).cart.any((element) =>
                      //                       element['productId'] ==
                      //                           productInfo['id'] &&
                      //                       element['description'] ==
                      //                           productInfo['priceList']
                      //                               [selectedVariant]['weight'])
                      //                   ? "Already in cart"
                      //                   : DatabaseService()
                      //                           .checkPdtVariantStock(
                      //                               productInfo,
                      //                               selectedVariant)
                      //                       ? "Out Of Stock"
                      //                       : 'ADD TO BAG',
                      //               style: const TextStyle(
                      //                   fontSize: 13,
                      //                   color: Colors.white,
                      //                   fontWeight: FontWeight.w500),
                      //             ),
                      //           ],
                      //         ),
                      //       ),
                      //     ),
                      //     // ElevatedButton(
                      //     //   onPressed: DatabaseService().checkPdtVariantStock(
                      //     //           productInfo, selectedVariant)
                      //     //       ? null
                      //     //       : handleAddToCart,
                      //     //   style: ButtonStyle(
                      //     //     shape: const MaterialStatePropertyAll(
                      //     //       RoundedRectangleBorder(
                      //     //           borderRadius: BorderRadius.zero),
                      //     //     ),
                      //     //     //  RoundedRectangleBorder(
                      //     //     //   borderRadius: BorderRadius.zero,
                      //     //     // ),
                      //     //     backgroundColor: MaterialStatePropertyAll(
                      //     //         Provider.of<Cart>(
                      //     //                   context,
                      //     //                 ).cart.any((element) =>
                      //     //                     element['productId'] ==
                      //     //                         productInfo['id'] &&
                      //     //                     element['description'] ==
                      //     //                         productInfo['priceList']
                      //     //                                 [selectedVariant]
                      //     //                             ['weight']) ||
                      //     //                 DatabaseService()
                      //     //                     .checkPdtVariantStock(
                      //     //                         productInfo, selectedVariant)
                      //     //             ? const Color(0xffEBEDF1)
                      //     //             : Colors.black),
                      //     //   ),
                      //     //   child: Padding(
                      //     //     padding: const EdgeInsets.all(16.0),
                      //     //     child: Row(
                      //     //       // mainAxisAlignment: MainAxisAlignment.start,
                      //     //       children: [
                      //     //         // const Icon(
                      //     //         //   Icons.shopping_cart_outlined,
                      //     //         //   color: Colors.white,
                      //     //         //   size: 18,
                      //     //         // ),
                      //     //         // const SizedBox(
                      //     //         //   width: 10,
                      //     //         // ),
                      //     //         Text(
                      //     //           Provider.of<Cart>(
                      //     //             context,
                      //     //           ).cart.any((element) =>
                      //     //                   element['productId'] ==
                      //     //                       productInfo['id'] &&
                      //     //                   element['description'] ==
                      //     //                       productInfo['priceList']
                      //     //                           [selectedVariant]['weight'])
                      //     //               ? "Already in cart"
                      //     //               : DatabaseService()
                      //     //                       .checkPdtVariantStock(
                      //     //                           productInfo,
                      //     //                           selectedVariant)
                      //     //                   ? "Out Of Stock"
                      //     //                   : 'ADD TO BAG',
                      //     //           style: const TextStyle(
                      //     //               fontSize: 13,
                      //     //               color: Colors.white,
                      //     //               fontWeight: FontWeight.w500),
                      //     //         ),
                      //     //       ],
                      //     //     ),
                      //     //   ),
                      //     // ),
                      //   ],
                      // )
                    ],
                  ),
                ),
              ],
            ),

            // const Padding(
            //   padding: EdgeInsets.symmetric(horizontal: 15.0),
            //   child: Text(
            //     'Description',
            //     style: TextStyle(
            //       fontSize: 18,
            //       fontWeight: FontWeight.w600,
            //     ),
            //   ),
            // ),
            // Container(
            //   // color: Colors.red,
            //   padding: const EdgeInsets.only(left: 8),
            //   width: double.infinity,
            //   child: Html(
            //     data: productInfo['prodDesc'],
            //   ),
            // ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 15),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // const Divider(
                  //   color: Color.fromARGB(255, 171, 171, 171),
                  //   height: 1,
                  //   thickness: 1,
                  // ),
                  // const SizedBox(
                  //   height: 15,
                  // ),
                  // const Text(
                  //   "Sold By:",
                  //   style: TextStyle(fontWeight: FontWeight.w500),
                  // ),
                  // const SizedBox(
                  //   height: 10,
                  // ),
                  // // Text(
                  // //   productInfo.containsKey('vendorName') &&
                  // //           productInfo['vendorName'].isNotEmpty
                  // //       ? productInfo['vendorName'].toString()
                  // //       : "Not Available",
                  // //   style: TextStyle(
                  // //       color: AppTheme().secondaryColor,
                  // //       fontWeight: FontWeight.w500),
                  // // ),
                  // // const SizedBox(
                  // //   height: 15,
                  // // ),
                  const Divider(
                    color: Color.fromARGB(255, 171, 171, 171),
                    height: 1,
                    thickness: 1,
                  ),
                  const SizedBox(
                    height: 10,
                  ),

                  similarProducts.isEmpty
                      ? const SizedBox()
                      : Container(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                "Similar Products",
                                style: TextStyle(
                                    fontWeight: FontWeight.bold, fontSize: 18),
                              ),
                              const SizedBox(
                                height: 20,
                              ),
                              SizedBox(
                                  width: size.width * 0.9,
                                  height: HomeData().isTablet
                                      ? size.width * 0.41
                                      : size.height * 0.45,
                                  // height: 200,
                                  child: SingleChildScrollView(
                                    scrollDirection: Axis.horizontal,
                                    child: Row(
                                      children: [
                                        ...(similarProducts.map((e) {
                                          var priceList = e['priceList'];

                                          var coverPicUrl =
                                              e['coverPic'] != null
                                                  ? e['coverPic']['thumb']
                                                  : null;
                                          log('prices similar:$priceList');
                                          return  
                                          coverPicUrl == null
                                              ? const SizedBox()
                                              :
                                          InkWell(
                                            onTap: () {
                                              log("Details of e : $e");
                                              Navigator.of(context).pushNamed(
                                                  '/productInfo',
                                                  arguments: {"id": e['id']});
                                            },
                                            child: Container(
                                              height: size.height * 0.5,
                                              width: size.width * 0.44,
                                              margin:
                                                  const EdgeInsets.symmetric(
                                                      horizontal: 10),
                                              child: Column(
                                                children: [
                                                  Container(
                                                    height: size.height * 0.32,
                                                    decoration: BoxDecoration(
                                                      border: Border.all(
                                                          color: Colors.black),
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              0),
                                                    ),
                                                    // height: size.width * 0.3,
                                                    child: Column(
                                                      children: [
                                                        SizedBox(
                                                          height: size.height *
                                                              0.265,
                                                          child: Center(
                                                            child: Image
                                                                .network(
                                                              coverPicUrl ?? "",
                                                              fit: BoxFit
                                                                  .cover,
                                                            ),
                                                          ),
                                                        ),
                                                        Padding(
                                                          padding:
                                                              const EdgeInsets
                                                                  .symmetric(
                                                                  horizontal:
                                                                      4),
                                                          child: Column(
                                                            crossAxisAlignment:
                                                                CrossAxisAlignment
                                                                    .start,
                                                            children: [
                                                              // Text(
                                                              //   "Rs ${e['priceList'][1]['discountedPrice']}" ??
                                                              //       '',
                                                              //   maxLines: 1,
                                                              //   overflow:
                                                              //       TextOverflow
                                                              //           .ellipsis,
                                                              //   style:
                                                              //       const TextStyle(
                                                              //     fontSize: 10,
                                                              //   ),
                                                              // ),
                                                              const SizedBox(
                                                                  height: 10),
                                                              Text(
                                                                e['prodName'] ??
                                                                    '',
                                                                style:
                                                                    const TextStyle(
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .w600,
                                                                  fontSize: 14,
                                                                ),
                                                                maxLines: 1,
                                                                overflow:
                                                                    TextOverflow
                                                                        .ellipsis,
                                                              ),
                                                              const SizedBox(
                                                                  height: 5),
                                                              if (e['productType'] !=
                                                                  'appointment')
                                                                const Row(
                                                                  children: [
                                                                    // if (priceList !=
                                                                    //     null)
                                                                    // Visibility(
                                                                    //   visible:
                                                                    //       priceList[0]['discountedPrice'] >
                                                                    //           0,
                                                                    //   child:
                                                                    //       Text(
                                                                    //     "Rs ${priceList[0]['discountedPrice'] != null ? priceList[0]['discountedPrice'].toDouble() : 0.0}",
                                                                    //     maxLines:
                                                                    //         1,
                                                                    //     style:
                                                                    //         TextStyle(
                                                                    //       fontWeight:
                                                                    //           FontWeight.w600,
                                                                    //       color:
                                                                    //           AppTheme().themeColor,
                                                                    //       fontSize:
                                                                    //           18,
                                                                    //     ),
                                                                    //   ),
                                                                    // ),
                                                                    // SizedBox(
                                                                    //   width: priceList != null &&
                                                                    //           priceList[0]['price'] != priceList[0]['discountedPrice']
                                                                    //       ? 5
                                                                    //       : 0,
                                                                    // ),
                                                                    // if (priceList !=
                                                                    //         null &&
                                                                    //     priceList[0]['price'] !=
                                                                    //         priceList[0]['discountedPrice'])
                                                                    //   Expanded(
                                                                    //     child:
                                                                    //         Text(
                                                                    //       "Rs ${priceList[0]['price'].toDouble()}",
                                                                    //       maxLines:
                                                                    //           1,
                                                                    //       overflow:
                                                                    //           TextOverflow.ellipsis,
                                                                    //       style:
                                                                    //           GoogleFonts.outfit(
                                                                    //         textStyle:
                                                                    //             const TextStyle(
                                                                    //           color: Color(0xff555555),
                                                                    //           fontSize: 12,
                                                                    //           decoration: TextDecoration.lineThrough,
                                                                    //         ),
                                                                    //       ),
                                                                    //     ),
                                                                    //   ),
                                                                  ],
                                                                ),
                                                              // SizedBox(height: 7),
                                                            ],
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          );
                                        }))
                                      ],
                                    ),
                                  )

                                  // ListView.builder(
                                  //     scrollDirection: Axis.horizontal,
                                  //     itemCount: similarProducts.length,
                                  //     itemBuilder: (context, index) {
                                  //       var priceList = jsonDecode(
                                  //           similarProducts[index]['priceList']);
                                  //       return
                                  //     }),
                                  )
                            ],
                          ),
                        )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class ExpandableSection extends StatefulWidget {
  final String title;
  final Widget content;
  final String iconAsset;

  const ExpandableSection({
    super.key,
    required this.title,
    required this.content,
    required this.iconAsset,
  });

  @override
  _ExpandableSectionState createState() => _ExpandableSectionState();
}

class _ExpandableSectionState extends State<ExpandableSection> {
  bool isExpanded = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        InkWell(
          onTap: () {
            setState(() {
              isExpanded = !isExpanded;
            });
          },
          child: Container(
            width: double.infinity,
            decoration: const BoxDecoration(
              shape: BoxShape.rectangle,
              // border: Border.all(
              //   color: const Color(0xff999999),
              //   width: 1,
              // ),
            ),
            child: Row(
              children: [
                Expanded(
                  flex: 2,
                  child: Padding(
                    padding: const EdgeInsets.all(12.0),
                    child: Row(
                      children: [
                        SvgPicture.asset(widget.iconAsset,
                            height: 24,
                            color: isExpanded
                                ? AppTheme().secondaryColor
                                : const Color(0xff999999)),
                        const SizedBox(width: 6),
                        Text(
                          widget.title,
                          style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w300,
                              color: isExpanded
                                  ? AppTheme().secondaryColor
                                  : const Color(0xff999999)),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: Icon(isExpanded ? Icons.remove : Icons.add,
                      color: isExpanded
                          ? AppTheme().secondaryColor
                          : const Color(0xff999999),
                      size: 20),
                ),
              ],
            ),
          ),
        ),
        Visibility(
          visible: isExpanded,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 15),
            child: widget.content,
          ),
        ),
        // const SizedBox(height: 20)
      ],
    );
  }
}
