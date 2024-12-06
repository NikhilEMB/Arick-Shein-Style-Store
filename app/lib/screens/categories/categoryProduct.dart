import 'dart:async';
import 'dart:developer';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:shein/providers/userProvider.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shein/providers/cartProvider.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/utils/addToCart.dart';
import 'package:shein/utils/databaseServices.dart';
import 'package:shein/utils/dynamicLink.dart';
import 'package:shein/widgets/cartWidget.dart';
import 'package:shein/widgets/categoryCard.dart';
import 'package:shein/widgets/filter/filterwidget.dart';
import 'package:shein/widgets/loadingModal.dart';
import 'package:shein/widgets/screenHeader.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

List<dynamic> filterProd(
    List<dynamic> products, Map<String, dynamic> selectedFilters) {
  return products.where((product) {
    final filters = product['filters'];

    if (filters != null && filters is Map) {
      // Check if all selected filters are present in the product's filters
      return selectedFilters.entries.every((entry) {
        final key = entry.key;
        final selectedValues = Set.from(entry.value);

        // Check if the product has the filter key and its values
        if (filters.containsKey(key)) {
          final productValues = Set.from(filters[key].cast<String>());

          // Check if all selected values are present in the product values
          return selectedValues.every((value) => productValues.contains(value));
        }

        return false;
      });
    }

    return false; // Product does not have valid filters
  }).toList();
}

class CategoryProductsScreen extends StatefulWidget {
  const CategoryProductsScreen(
      {super.key, this.documentRef, this.title = "", this.catId = ""});

  final dynamic documentRef;
  final String title;
  final String catId;

  @override
  State<CategoryProductsScreen> createState() => _CategoryProductsScreenState();
}

class _CategoryProductsScreenState extends State<CategoryProductsScreen> {
  List<dynamic> products = [];
  List<dynamic> subCategories = [];
  List<dynamic> filproducts = [];
  Map<String, dynamic> selectedFilters = {};
  bool isLoading = true;
  bool onlyProductsLoading = false;
  String selectedSubCategory = "";

  bool loading = false;
  var categories = [];
  dynamic docRef;

  fetchCategoryProducts(categoryId) async {
    print("CAT ID  $categoryId");
    setState(() {
      isLoading = true;
    });
    var productsData = await DatabaseService().fetchProducts(categoryId);
    setState(() {
      isLoading = false;
      products = productsData;
      log("ProductsData $products");
      // log("ProductsData ${products[1]['prodName']}");
    });
  }

  int calculateDiscountPercentage(
      dynamic originalPrice, dynamic discountedPrice) {
    if (originalPrice <= 0) {
      return 0;
    }
    return ((originalPrice - discountedPrice) / originalPrice * 100).toInt();
  }

  fetchCategories() async {
    setState(() {
      loading = true;
    });
    if (widget.documentRef == null) {
      var res = await FirebaseFirestore.instance
          .collection('categories')
          .doc(widget.catId)
          .collection('subcategories')
          // .where('status', isEqualTo: true)
          .get()
          .then((value) {
        if (value.docs.isEmpty) {
          return [];
        } else {
          var arr = [];
          for (var element in value.docs) {
            var data = element.data();
            arr.add({...data, "id": element.id});
          }
          return arr;
        }
      });

      setState(() {
        loading = false;
        categories = res;
        docRef = FirebaseFirestore.instance
            .collection('categories')
            .doc(widget.catId);
      });
    } else {
      var res = await widget.documentRef
          .collection('subcategories')
          // .where('status', isEqualTo: true)
          .get()
          .then((value) {
        if (value.docs.isEmpty) {
          return [];
        } else {
          var arr = [];
          for (var element in value.docs) {
            var data = element.data();
            arr.add({...data, "id": element.id});
          }
          return arr;
        }
      });
      print("ARR $res");

      setState(() {
        loading = false;
        categories = res;
        docRef = widget.documentRef;
      });
    }
    print(categories);
  }

  fetchSubCategory(categoryId, subCatId) async {
    setState(() {
      isLoading = true;
    });
    var subCategoriesData =
        await DatabaseService().fetchSubCategories(categoryId);
    var productsData = await DatabaseService().fetchProducts(
        selectedSubCategory.isEmpty
            ? subCategoriesData[0]['id']
            : selectedSubCategory);
    print("PRODUCTS1 $productsData");
    setState(() {
      subCategories = subCategoriesData;
      products = productsData;
      selectedSubCategory = subCatId ?? subCategoriesData[0]['id'];
      isLoading = false;
    });
  }

  handleSubCatChange(subCatId) async {
    products = [];
    onlyProductsLoading = true;
    setState(() {});
    var productsData = await DatabaseService().fetchCategories();
    products = productsData;
    onlyProductsLoading = false;
    setState(() {});
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
  }

  Future<void> handleAddItemClick(
      {product, priceListIndex, updateState}) async {
    showDialog(
      barrierDismissible: false,
      context: context,
      builder: (context) => loader(context),
    );
    // print('INSIDE ${product['data']['id']}');
    Completer<void> completer = Completer<void>();

    await CartService().addToCart(
        priceListIndex: priceListIndex,
        product: product.containsKey('data') ? product['data'] : product,
        context: context,
        productId: product['id'] ??
            (product.containsKey('data')
                ? product['data'].containsKey('id')
                    ? product['data']['id']
                    : product['id']
                : product['id']));
    Timer(const Duration(seconds: 1), () {
      Navigator.pop(context);
      Fluttertoast.showToast(msg: 'Item added to bag.');
    });
    updateState(() {});
    completer.complete();
    return completer.future;
  }

  bool checkIfProductIsInCart(product, index) {
    String productId = product['id'] ??
        (product.containsKey('data')
            ? product['data'].containsKey('id')
                ? product['data']['id']
                : product['id']
            : product['id']);
    var weight = product.containsKey('data')
        ? product['data']['priceList'][index]['weight']
        : product['priceList'][index]['weight'];
    var check = Provider.of<Cart>(context, listen: false).cart.any((element) =>
        element['productId'] == productId && element['description'] == weight);
    return check;
  }

  handleAddToCart(product, Size size) async {
    // bool isProductInCart = false;

    getCartProductQuantity() {
      String productId = product['id'] ??
          (product.containsKey('data')
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
      String productId = product['id'] ??
          (product.containsKey('data')
              ? product['data'].containsKey('id')
                  ? product['data']['id']
                  : product['id']
              : product['id']);
      var weight = product.containsKey('data')
          ? product['data']['priceList'][priceListIndex]['weight']
          : product['priceList'][priceListIndex]['weight'];
      var index = Provider.of<Cart>(context, listen: false).cart.indexWhere(
          (item) =>
              item['productId'] == productId && item['description'] == weight);

      if (type == 'inc') {
        var quantity =
            Provider.of<Cart>(context, listen: false).cart[index]['quantity'];
        if (quantity + 1 <=
            int.parse(product.containsKey('data')
                ? product["data"]['priceList'][priceListIndex]['totalQuantity']
                : product['priceList'][priceListIndex]['totalQuantity'])) {
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
  }

  handleTap(category) {
    if (category.containsKey('isSubcategories') &&
        category['isSubcategories']) {
      // Navigator.of(context).push(MaterialPageRoute(
      //   builder: (context) => CategoriesStep2(
      //     title: category['name'],
      //     catId: category['id'],
      //     documentRef: docRef.collection('subcategories').doc(category['id']),
      //   ),
      // ));
      print("Category clicked");
    } else {
      // Navigator.of(context).pushNamed('/categoryProducts', arguments: {
      //   "categoryName": category['name'],
      //   "categoryId": category['id'],
      //   "categoryData": category
      // });
      print("Category clicked 2");
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    fetchCategories();
    Timer(const Duration(milliseconds: 100), () {
      DynamicLinkProvider().initDynamicLink(context: context);
    });
    super.initState();
  }

  void sortByPriceHighToLow() {
    products.sort((a, b) => b['priceList'][0]['discountedPrice']
        .compareTo(a['priceList'][0]['discountedPrice']));
    setState(() {});
  }

  sortByPriceLowToHigh() {
    subCategories.sort((a, b) => a['priceList'][0]['discountedPrice']
        .compareTo(b['priceList'][0]['discountedPrice']));
    setState(() {});
  }

  void updateFilters(Map<String, dynamic> filters) {
    selectedFilters = filters;
    print("filters ==> $selectedFilters");
    print("products ==> $products");

    // Filter products based on selected filters
    List<dynamic> filteredProducts = products
        .where((product) =>
            product['filters'] != null &&
            product['filters'] is Map &&
            filters.entries.every((entry) {
              final key = entry.key;
              final selectedValues = Set.from(entry.value);

              // Check if the product has the filter key and its values
              if (product['filters'].containsKey(key)) {
                final productValues =
                    Set.from(product['filters'][key].cast<String>());

                // Check if all selected values are present in the product values
                return selectedValues
                    .every((value) => productValues.contains(value));
              }

              return false;
            }))
        .toList();

    setState(() {
      products = filteredProducts;
    });

    // Display a message if no products are found
    if (filteredProducts.isEmpty) {
      Fluttertoast.showToast(msg: 'No product found');
    }
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    final dynamic args = ModalRoute.of(context)!.settings.arguments;
    if (products.isEmpty && isLoading) {
      if (args['categoryData'].containsKey('isSubcategories') &&
          args['categoryData']['isSubcategories'] == true) {
        fetchSubCategory(
            args['categoryData']['id'],
            args.containsKey('selectedSubCategory')
                ? args['selectedSubCategory']
                : null);
      } else {
        fetchCategoryProducts(args['categoryData']['id']);
      }
    }

    // if (args.containsKey('selectedSubCategory') && selectedSubCategory == "") {
    //   setState(() {
    //     selectedSubCategory = args['selectedSubCategory'];
    //   });
    // }

    return SafeArea(
        child: Scaffold(
      backgroundColor: isLoading
          ? Colors.white
          : args['categoryData'].containsKey('isSubcategories') &&
                  args['categoryData']['isSubcategories'] == true
              ? AppTheme().scaffoldColor
              : Colors.white,
      body: SizedBox(
        child: Column(
          children: [
            Expanded(
              child: Column(
                children: [
                  ScreenHeader(
                    size: size,
                    title: args['categoryName'],
                    isSearchButton: true,
                    isHeartButton: true,
                    isCartButton: true,
                  ),
                  Expanded(
                    child: isLoading
                        ? SizedBox(
                            height: size.height * 0.7,
                            child: Center(
                              child: CircularProgressIndicator(
                                color: AppTheme().secondaryColor,
                              ),
                            ),
                          )
                        : args['categoryData'].containsKey('isSubcategories')
                            ? args['categoryData']['isSubcategories'] != true
                                ? renderWithoutSubCategories(
                                    args['categoryData'], size)
                                : SizedBox(
                                    width: double.infinity,
                                    child: Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Container(
                                          margin: EdgeInsets.only(
                                              top: Provider.of<Cart>(context)
                                                      .cart
                                                      .isEmpty
                                                  ? 10
                                                  : 0),
                                          // margin: const EdgeInsets.only(top: 10),
                                          padding: const EdgeInsets.only(
                                              top: 5, bottom: 10),
                                          width: size.width * 0.2,
                                          decoration: const BoxDecoration(
                                              color: Colors.white,
                                              borderRadius: BorderRadius.only(
                                                  topRight:
                                                      Radius.circular(5))),
                                          height: size.height,

                                          child: Column(
                                            children: [
                                              Expanded(
                                                  child: ListView.separated(
                                                separatorBuilder:
                                                    (context, index) =>
                                                        const SizedBox(
                                                  height: 13,
                                                ),
                                                itemCount: subCategories.length,
                                                scrollDirection: Axis.vertical,
                                                itemBuilder: (context, index) =>
                                                    InkWell(
                                                  onTap: () {
                                                    setState(() {
                                                      selectedSubCategory =
                                                          subCategories[index]
                                                              ['id'];
                                                    });
                                                    handleSubCatChange(
                                                        subCategories[index]
                                                            ['id']);
                                                  },
                                                  child: Container(
                                                    child: Column(
                                                      crossAxisAlignment:
                                                          CrossAxisAlignment
                                                              .center,
                                                      children: [
                                                        Container(
                                                          decoration:
                                                              BoxDecoration(
                                                            shape: BoxShape
                                                                .circle, // Make it a circle
                                                            border: Border.all(
                                                              width: selectedSubCategory ==
                                                                      subCategories[
                                                                              index]
                                                                          ['id']
                                                                  ? 2
                                                                  : 0,
                                                              color: AppTheme()
                                                                  .mainColor,
                                                            ),
                                                          ),
                                                          width:
                                                              size.width * 0.14,
                                                          height:
                                                              size.width * 0.14,
                                                          child: ClipOval(
                                                            child:
                                                                Image.network(
                                                              "${subCategories[index]['image']['thumb']}",
                                                              fit: BoxFit
                                                                  .cover, // You can adjust the fit to your preference
                                                            ),
                                                          ),
                                                        ),
                                                        const SizedBox(
                                                            height: 5),
                                                        Container(
                                                          padding:
                                                              const EdgeInsets
                                                                  .symmetric(
                                                                  horizontal:
                                                                      3),
                                                          child: Text(
                                                            subCategories[index]
                                                                ['name'],
                                                            style: AppTheme()
                                                                .outfitStyle(),
                                                            maxLines: 3,
                                                            textAlign: TextAlign
                                                                .center,
                                                            overflow:
                                                                TextOverflow
                                                                    .ellipsis,
                                                          ),
                                                        )
                                                      ],
                                                    ),
                                                  ),
                                                ),
                                              ))
                                            ],
                                          ),
                                        ),
                                        onlyProductsLoading
                                            ? SizedBox(
                                                width: size.width * 0.78,
                                                height: size.height * 0.7,
                                                child: Center(
                                                  child:
                                                      CircularProgressIndicator(
                                                    color: AppTheme()
                                                        .secondaryColor,
                                                  ),
                                                ),
                                              )
                                            : categories.isEmpty
                                                ? const Center(
                                                    child: Text(
                                                        "No categories available"),
                                                  )
                                                : GridView.count(
                                                    padding: const EdgeInsets
                                                        .symmetric(
                                                        horizontal: 10),
                                                    mainAxisSpacing: 30,
                                                    crossAxisSpacing: 10,
                                                    childAspectRatio:
                                                        Provider.of<HomeData>(
                                                                    context)
                                                                .isTablet
                                                            ? 0.1
                                                            : 0.86,
                                                    // physics: const NeverScrollableScrollPhysics(),
                                                    shrinkWrap: true,
                                                    crossAxisCount:
                                                        2, // Number of columns
                                                    children: [
                                                      ...(categories
                                                          .map((category) {
                                                        debugPrint(
                                                            'catData : ${category['image'].toString()}');
                                                        return CategoryCard(
                                                            category: category,
                                                            context: context,
                                                            handleTap:
                                                                handleTap,
                                                            nameBannerSize: 45,
                                                            size: size,
                                                            isFirstStep: true);
                                                      }).toList()),

                                                      // Your grid items here
                                                    ],
                                                  ),
                                      ],
                                    ))
                            : renderWithoutSubCategories(
                                args['categoryData'], size),
                  ),
                ],
              ),
            ),
            Provider.of<Cart>(context).cart.isNotEmpty
                ? const Align(
                    alignment: Alignment.bottomCenter,
                    child: SizedBox(
                      width: double.infinity,
                      child: CartWidget(),
                    ),
                  )
                : const SizedBox(),
          ],
        ),
      ),
    ));
  }

  Widget renderWithoutSubCategories(categoryData, size) {
    return SizedBox(
      width: double.infinity,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            categoryData['description'] != ""
                ?
                // Padding(
                //     padding: const EdgeInsets.symmetric(horizontal: 7),
                //     child: Container(
                //       padding: const EdgeInsets.symmetric(horizontal: 5),
                //       margin: const EdgeInsets.only(top: 10),
                //       decoration: BoxDecoration(
                //         border: Border.all(
                //             color: const Color.fromARGB(255, 209, 209, 209),
                //             width: 1),
                //         borderRadius: BorderRadius.circular(7),
                //       ),
                //       width: double.infinity,
                //       child: Center(
                //         child: Html(data: categoryData['description']),
                //       ),
                //     ),
                //   )
                const SizedBox()
                : const SizedBox(),
            SizedBox(
              width: size.width,
              height: size.height * 0.08,
              // color: Colors.amber,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _buildFiltarButton(
                      context, size, "Sort", Icons.swap_vert, () {}),
                  const VerticalDivider(
                    color: Color.fromARGB(221, 123, 123, 123),
                    indent: 20.0,
                    endIndent: 20.0,
                    width: 20,
                    thickness: 1,
                  ),
                  _buildFiltarButton(context, size, "Filter", Icons.filter_alt,
                      () {
                    showFiltersBottomSheet(context);
                  }),
                ],
              ),
            ),
            Expanded(
              child: products.isNotEmpty
                  ? Container(
                      color: AppTheme().scaffoldColor,
                      height: MediaQuery.of(context).size.height,
                      child: GridView.builder(
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          crossAxisSpacing: 3,
                          mainAxisSpacing: 4,
                          // mainAxisExtent: 100,
                          childAspectRatio: Provider.of<HomeData>(context)
                                  .isTablet
                              ? MediaQuery.of(context).size.width /
                                  (MediaQuery.of(context).size.height / 1.3)
                              : MediaQuery.of(context).size.width /
                                  (MediaQuery.of(context).size.height / 1.5),
                        ),
                        itemCount: products.length,
                        itemBuilder: (context, index) => InkWell(
                          onTap: () => Navigator.of(context).pushNamed(
                              '/productInfo',
                              arguments: {"id": products[index]['id']}),
                          child: Container(
                            margin: const EdgeInsets.all(0),
                            decoration: BoxDecoration(
                                border: Border.all(color: Colors.black)),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                SizedBox(
                                  // height: size.height * 0.2,
                                  height: size.height * 0.24,

                                  width: double.infinity,
                                  child: Stack(children: [
                                    Center(
                                      child: Image.network(
                                        products[index]['coverPic']
                                                .containsKey('mob')
                                            ? products[index]['coverPic']['mob']
                                            : products[index]['images'][0]
                                                ['thumb'],
                                        fit: BoxFit.cover,
                                      ),
                                    ),
                                    // Visibility(
                                    //   visible: calculateDiscountPercentage(
                                    //           products[index]['data']?['priceList']
                                    //               ?[0]?['price'],
                                    //           products[index]['data']?['priceList']
                                    //               ?[0]?['discountedPrice']) >
                                    //       0,
                                    //   child: Positioned(
                                    //     top: 4,
                                    //     left: 4,
                                    //     child: Container(
                                    //       padding: const EdgeInsets.symmetric(
                                    //           horizontal: 4, vertical: 2),
                                    //       decoration: BoxDecoration(
                                    //         color: AppTheme().themeColor,
                                    //         borderRadius: const BorderRadius.only(
                                    //             topLeft: Radius.circular(0)),
                                    //       ),
                                    //       child: Text(
                                    //         "(${calculateDiscountPercentage(products[index]['data']?['priceList'][0]['price'], products[index]['data']?['priceList']?[0]?['discountedPrice'])}% OFF)",
                                    //         style: AppTheme().outfitStyle(
                                    //             color: Colors.white, fontSize: 12),
                                    //       ),
                                    //     ),
                                    //   ),
                                    // ),

                                    Positioned(
                                      top: 0,
                                      right: 0,
                                      child: Consumer<Auth>(
                                        builder:
                                            (context, authProvider, child) {
                                          bool isInWishlist =
                                              authProvider.isInWishlist(
                                                  products[index]['id']);
                                          return InkWell(
                                            onTap: () async {
                                              print("clicked");
                                              String productId =
                                                  products[index]['id'];

                                              if (isInWishlist) {
                                                await authProvider
                                                    .removeFromWishlist(
                                                        productId);
                                              } else {
                                                await authProvider
                                                    .addToWishlist(productId);
                                              }
                                              print(productId);
                                            },
                                            child: Icon(
                                              isInWishlist
                                                  ? Icons.favorite
                                                  : Icons
                                                      .favorite_border_outlined,
                                              color: isInWishlist
                                                  ? AppTheme().themeColor
                                                  : null,
                                            ),
                                          );
                                        },
                                      ),
                                    ),
                                    DatabaseService().checkPdtStock(
                                                products[index]) &&
                                            products[index]['productType'] !=
                                                "appointment"
                                        ? Positioned(
                                            top: 60,
                                            child: Container(
                                              color:
                                                  Colors.white.withOpacity(0.8),
                                              padding:
                                                  const EdgeInsets.symmetric(
                                                      vertical: 5),
                                              width: size.width * 0.5,
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
                                        : const SizedBox()
                                  ]),
                                ),
                                const SizedBox(
                                  height: 5,
                                ),

                                Padding(
                                  padding: const EdgeInsets.only(left: 5),
                                  child: SizedBox(
                                    height: 20,
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Expanded(
                                          child: Text(
                                            products[index]['prodName'],
                                            maxLines: 2,
                                            overflow: TextOverflow.ellipsis,
                                            style: AppTheme().outfitStyle(
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                const SizedBox(
                                  height: 5,
                                ),
                                // const SizedBox(height: 3),
                                Padding(
                                  padding: const EdgeInsets.only(left: 0),
                                  child: SizedBox(
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        SizedBox(
                                          width: double.infinity,
                                          child: Expanded(
                                            child: Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.start,
                                              children: [
                                                Column(
                                                  crossAxisAlignment:
                                                      CrossAxisAlignment.start,
                                                  children: [
                                                    SizedBox(
                                                        width: products[index][
                                                                        'priceList'][0]
                                                                    [
                                                                    'discountedPrice'] !=
                                                                products[index][
                                                                        'priceList']
                                                                    [0]['price']
                                                            ? 5
                                                            : 0),
                                                    Row(
                                                      mainAxisAlignment:
                                                          MainAxisAlignment
                                                              .spaceAround,
                                                      // crossAxisAlignment: CrossAxisAlignment.center,
                                                      // crossAxisAlignment: ,
                                                      children: [
                                                        Text(
                                                            "  Rs ${(products[index]['priceList'][0]['discountedPrice'].toDouble() * 1).toStringAsFixed(2)}",
                                                            style: GoogleFonts
                                                                .outfit(
                                                              textStyle:
                                                                  TextStyle(
                                                                fontSize: 14,
                                                                fontWeight:
                                                                    FontWeight
                                                                        .bold,
                                                                color: AppTheme()
                                                                    .themeColor,
                                                              ),
                                                            )),
                                                            SizedBox(
                                                              width: 10,
                                                            ),
                                                        products[index]['priceList']
                                                                        [0][
                                                                    'discountedPrice'] !=
                                                                products[index][
                                                                        'priceList']
                                                                    [0]['price']
                                                            ? Text(
                                                                "Rs ${(products[index]['priceList'][0]['price'].toDouble() * 1).toStringAsFixed(2)}",
                                                                style:
                                                                    GoogleFonts
                                                                        .outfit(
                                                                  textStyle:
                                                                      const TextStyle(
                                                                    fontSize:
                                                                        14,
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .w400,
                                                                    color: Colors
                                                                        .black,
                                                                    decoration:
                                                                        TextDecoration
                                                                            .lineThrough,
                                                                  ),
                                                                ),
                                                              )
                                                            : const SizedBox(),
                                                      ],
                                                    ),
                                                  ],
                                                ),
                                              ],
                                            ),
                                          ),
                                        )
                                      ],
                                    ),
                                  ),
                                )
                              ],
                            ),
                          ),
                        ),
                      ),
                    )
                  : const SizedBox(
                      child: Text('No products'),
                    ),
            ),
          ],
        ),
      ),
    );
  }

  _buildFiltarButton(
      context, size, String title, IconData icon, Function onTap) {
    return SizedBox(
      width: size.width * 0.30,
      height: size.height * 0.06,
      child: TextButton.icon(
        style: const ButtonStyle(
            backgroundColor: MaterialStatePropertyAll(Colors.white)),
        onPressed: () {
          onTap();
        },
        icon: Icon(
          icon,
          color: const Color.fromARGB(221, 123, 123, 123),
          size: 20.0,
        ),
        label: Text(
          title,
          style: GoogleFonts.lexend(
            fontWeight: FontWeight.w600,
            fontSize: 15,
            color: const Color.fromARGB(221, 45, 45, 45),
          ),
        ),
      ),
    );
  }

  // opening model bottom sheet of product filters filters
  showFiltersBottomSheet(BuildContext context) {
    print("sheet $selectedFilters");
    showModalBottomSheet<void>(
      isScrollControlled: true,
      isDismissible: true,
      context: context,
      builder: (BuildContext context) {
        return FiltersBottomSheet(
          onFilterApplied: updateFilters,
          // onFilterApplied: (selectedFilters) {},
        );
      },
    );
  }
}

// final List<Map<String, dynamic>> metafields = [
//   {
//     'key': 'size',
//     'namespace': 'custom',
//     'value': '',
//     'options': [
//       's',
//       'm',
//       'L',
//       'XL',
//       'XXL',
//     ]
//   },
//   {
//     'key': 'color',
//     'namespace': 'custom',
//     'value': '',
//     'options': [
//       'Black',
//       'Blue',
//       'Blue',
//       'Yellow',
//       'Red',
//       'Green',
//       'White',
//       'Brown',
//       'Purple',
//       'Grey',
//     ]
//   },
//   {
//     'key': 'test',
//     'namespace': 'custom',
//     'value': '',
//     'options': [
//       '1',
//       '2',
//       '3',
//     ]
//   },
//   {
//     'key': 'fabric',
//     'namespace': 'custom',
//     'value': '',
//     'options': [
//       'satin',
//       'tricot',
//       'velvet',
//       'cotton',
//       'woolen',
//       'ffff',
//       'grgrg',
//       'ffgfg',
//     ]
//   },
 
// ];

