import 'dart:async';
import 'dart:convert';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shein/providers/cartProvider.dart';
import 'package:shein/providers/categoriesProvider.dart';
import 'package:shein/screens/categories/category_page.dart';
import 'package:shein/screens/product/slotSelectScreen.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/utils/addToCart.dart';
import 'package:shein/utils/databaseServices.dart';
import 'package:shein/utils/typesense.dart';
import 'package:shein/widgets/categoryCard.dart';
import 'package:shein/widgets/customNavBar.dart';
import 'package:shein/widgets/loadingModal.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  String searchQuery = '';
  late FocusNode _focusNode;
  int page = 1;
  bool loading = false;

  @override
  void initState() {
    super.initState();
    _focusNode = FocusNode();
    fetchCategories();
    // getTopTenCategorys();
    // Set a delay to ensure the widget is fully initialized before focusing
    WidgetsBinding.instance.addPostFrameCallback((_) {
      FocusScope.of(context).requestFocus(_focusNode);
    });
  }

  @override
  void dispose() {
    _focusNode.dispose();
    super.dispose();
  }

  var categories = [];

  fetchCategories() async {
    setState(() {
      loading = true;
    });
    if (Provider.of<CategoryData>(context, listen: false).categories.isEmpty) {
      await Provider.of<CategoryData>(context, listen: false).fetchCategories();
    }

    setState(() {
      loading = false;
      categories = Provider.of<CategoryData>(context, listen: false).categories;
    });
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
    } else if (category['isSubcategories']) {
      Navigator.of(context).pushNamed('/subCategory', arguments: {
        "categoryName": category['name'],
        "categoryId": category['id'],
        "categoryData": category
      });
    } else if (category.containsKey('isSubcategories')) {
      Navigator.of(context).pushNamed('/categoryProducts', arguments: {
        "categoryName": category['name'],
        "categoryId": category['id'],
        "categoryData": category
      });
    } else {
      Navigator.of(context).pushNamed('/categoryProducts', arguments: {
        "categoryName": category['name'],
        "categoryId": category['id'],
        "categoryData": category
      });
    }
  }

  // List<dynamic> topTenCategoryList = [];

  // Future getTopTenCategorys() async  {
  //   try {
  //     final dbquery =await FirebaseFirestore.instance.collection("categories").where('status' , isEqualTo: true).limit(10).get();
  //     setState(() {
  //       topTenCategoryList =  dbquery.docs.map((e) => e.data()).toList();
  //     });
  //     // print("------------------${topTenCategoryList}xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  //   } catch (e) {
  //     print("some error occuredxxxxxxxxxxxxxxxxxxxxx$e ");
  //   }

  // }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return SafeArea(
        child: Scaffold(
      resizeToAvoidBottomInset: false,
      body: SizedBox(
        child: SingleChildScrollView(
          child: Column(
            children: [
              header(size),
              const SizedBox(
                height: 10,
              ),
              FutureBuilder(
                future: TypeSenseInstance().searchProductTS(searchQuery, page),
                builder: (context, snapshot) {
                  if (snapshot.hasData && searchQuery != "") {
                    dynamic data = snapshot.data;
                    return Wrap(
                      // spacing: 1,
                      children: [
                        ...(data.map((product) {
                          var priceList = jsonDecode(product['priceList']);
                          return InkWell(
                            onTap: () {
                              Navigator.of(context).pushNamed('/productInfo',
                                  arguments: {"id": product['id']});
                            },
                            child: Container(
                                padding: const EdgeInsets.only(bottom: 15),
                                decoration: BoxDecoration(
                                    border: Border.all(
                                        color: Colors.grey, width: 1)),
                                width: size.width * 0.48,
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const SizedBox(height: 5),
                                    Container(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 3),
                                      height: size.height * 0.24,
                                      child: Stack(children: [
                                        SizedBox(
                                          height: size.height * 0.28,
                                          child: Center(
                                            child: Image.network(
                                              (product['coverPic']?.containsKey(
                                                          'mob') ??
                                                      false)
                                                  ? product['coverPic']['mob']
                                                  : (product['images']
                                                              ?.isNotEmpty ==
                                                          true)
                                                      ? product['images'][0]
                                                          ['thumb']
                                                      : 'https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-19.jpg',
                                              fit: BoxFit.cover,
                                            ),
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
                                                  padding: const EdgeInsets
                                                      .symmetric(vertical: 5),
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
                                        height: size.height * 0.03,
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              product['prodName'],
                                              maxLines: 1,
                                              overflow: TextOverflow.ellipsis,
                                              style: AppTheme().outfitStyle(
                                                fontWeight: FontWeight.w400,
                                                color: AppTheme().themeColor,
                                                fontSize: 14,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                    // const SizedBox(height: 3),
                                    Padding(
                                      padding: const EdgeInsets.only(
                                          left: 7, right: 5),
                                      child: SizedBox(
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
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
                                                                style: GoogleFonts.outfit(
                                                                    textStyle: const TextStyle(
                                                                        fontSize:
                                                                            12,
                                                                        color: Colors
                                                                            .black38,
                                                                        fontWeight:
                                                                            FontWeight
                                                                                .w600,
                                                                        decoration:
                                                                            TextDecoration.lineThrough)),
                                                              )
                                                            : const SizedBox(),
                                                        SizedBox(
                                                            width: priceList[0][
                                                                        'discountedPrice'] !=
                                                                    priceList[0]
                                                                        [
                                                                        'price']
                                                                ? 5
                                                                : 0),
                                                        Text(
                                                          "Rs ${priceList[0]['discountedPrice'].toString()}",
                                                          style: AppTheme()
                                                              .outfitStyle(
                                                            fontSize: 13,
                                                            fontWeight:
                                                                FontWeight.w600,
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
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
                    );
                  } else {
                    if (searchQuery.isEmpty) {
                      return ListView.builder(
                        shrinkWrap: true,
                        itemCount: 10,
                        itemBuilder: (BuildContext context, int index) {
                          final tenCategory = categories[index];
                          return GestureDetector(
                            onTap: () {
                              handleTap(tenCategory);
                            },
                            child: ListTile(
                              // only first letter caps and rest all in small caps

                              title: Text(
                                tenCategory['name']
                                        .toString()
                                        .substring(0, 1)
                                        .toUpperCase() +
                                    tenCategory['name']
                                        .toString()
                                        .substring(1)
                                        .toLowerCase(),
                                style: GoogleFonts.montserrat(
                                  fontSize: 14,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                              leading: CircleAvatar(
                                  backgroundImage: CachedNetworkImageProvider(
                                      tenCategory['image']['url'].toString())),
                            ),
                          );
                        },
                      );
                    }
                    return const Text('No products found');
                  }
                },
              ),
            ],
          ),
        ),
      ),
    ));
  }

  Widget header(Size size) {
    return Container(
      width: double.infinity,
      height: size.height * 0.07,
      decoration: const BoxDecoration(
          // gradient: LinearGradient(
          //   stops: [0.2, 1],
          //   tileMode: TileMode.clamp,
          //   colors: [
          //     Color.fromARGB(255, 72, 72, 72),
          //     Color.fromARGB(255, 17, 17, 17),
          //   ],
          //   begin: Alignment.centerLeft,
          //   end: Alignment.topCenter,
          // ),
          ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Container(
            width: size.width * 0.14,
            decoration: const BoxDecoration(
                // color: AppTheme().secondaryColor,
                borderRadius: BorderRadius.only(
                    topRight: Radius.circular(100),
                    bottomRight: Radius.circular(100))),
            child: IconButton(
              onPressed: () {
                if (Navigator.canPop(context)) {
                  Navigator.pop(context);
                } else {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const CustomNavBar(pageNum: 1),
                    ),
                  );
                }
              },
              icon: const Icon(
                Icons.arrow_back,
                color: Colors.black,
              ),
            ),
          ),
          Expanded(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 10),
              child: TextFormField(
                focusNode: _focusNode,
                onChanged: (value) => setState(() {
                  searchQuery = value.toString();
                }),
                style: const TextStyle(
                  color: Colors.black,
                ),
                cursorColor: Colors.black,
                decoration: const InputDecoration(
                  hintText: 'Search',
                  hintStyle: TextStyle(color: Colors.grey),
                  enabledBorder: InputBorder.none,
                  border: InputBorder.none,
                  errorBorder: InputBorder.none,
                  focusedBorder: InputBorder.none,
                  disabledBorder: InputBorder.none,
                  focusedErrorBorder: InputBorder.none,
                ),
              ),
            ),
          ),
          Container(
              child: Stack(
            children: [
              IconButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/cart');
                  },
                  icon: SvgPicture.asset(
                    'assets/Icons/Bag.svg',
                    height: 22,
                  )),
              Provider.of<Cart>(context).cart.isNotEmpty
                  ? Positioned(
                      right: 0,
                      top: 5,
                      child: Container(
                        width: 18,
                        height: 18,
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(100),
                            color: AppTheme().themeColor
                            // gradient: LinearGradient(
                            //     colors: [
                            //       AppTheme().secondaryColor,
                            //       AppTheme().secondaryColor
                            //     ],
                            //     begin: Alignment.bottomCenter,
                            //     end: Alignment.topCenter,
                            //     stops: [-1.0, 0.9]),
                            ),
                        child: Center(
                          child: Text(
                            Provider.of<Cart>(context).cart.length.toString(),
                            style: const TextStyle(
                                color: Colors.white, fontSize: 12),
                          ),
                        ),
                      ),
                    )
                  : const SizedBox(),
            ],
          ))
        ],
      ),
    );
  }
}
