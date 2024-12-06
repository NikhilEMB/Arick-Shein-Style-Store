import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/homeWidgets/bannerSlider.dart';
import 'package:shein/widgets/homeWidgets/categories.dart';
import 'package:shein/widgets/homeWidgets/imageBanner.dart';
import 'package:shein/widgets/homeWidgets/imageBlock.dart';
import 'package:shein/widgets/homeWidgets/productCarousel.dart';
import 'package:shein/widgets/homeWidgets/productList.dart';
import 'package:shein/widgets/homeWidgets/textBlock.dart';
import 'package:shein/widgets/homeWidgets/vendors.dart';
import 'package:shein/widgets/homeWidgets/videoBlock.dart';
import 'package:shein/widgets/screenHeader.dart';

class VendorScreen extends StatefulWidget {
  const VendorScreen({super.key});

  @override
  State<VendorScreen> createState() => _VendorScreenState();
}

class _VendorScreenState extends State<VendorScreen> {
  dynamic vendorInfo;
  List<dynamic> farmProducts = [];
  bool farmProductsLoading = true;

  fetchVendor(docId) async {
    await FirebaseFirestore.instance
        .collection("features")
        .doc("multiVendor")
        .collection("vendors")
        .doc(docId)
        .get()
        .then((value) {
      if (value.exists) {
        print('object');
        dynamic data = value.data();
        setState(() {
          vendorInfo = {...data, "id": value.id};
        });
      } else {
        print('sacgsaugisabvsa');
      }
    });
  }

  fetchFarmProducts() async {
    if (vendorInfo != null) {
      await FirebaseFirestore.instance
          .collection('products')
          .where('vendorId', isEqualTo: vendorInfo['id'])
          .where('status', isEqualTo: true)
          .orderBy('sortedAt', descending: true)
          .get()
          .then((value) {
        if (value.docs.isNotEmpty) {
          var arr = [];
          for (var doc in value.docs) {
            var data = doc.data();
            arr.add({...data, "id": doc.id});
          }
          setState(() {
            farmProducts = arr;
          });
        } else {}
      });
      setState(() {
        farmProductsLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    final dynamic args = ModalRoute.of(context)!.settings.arguments;
    final screenWidth = MediaQuery.of(context).size.width;
    final itemWidth = screenWidth / 2;
    final itemHeight = itemWidth; // Adjust as needed

    final rowCount = (farmProducts.length / 2).ceil();
    final gridViewHeight = itemHeight * rowCount;

    print("args $args");

    if (vendorInfo == null) {
      fetchVendor(args['id']);
    }

    print(vendorInfo);
    if (vendorInfo == null) {
      return SafeArea(
          child: Scaffold(
        body: SizedBox(
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                ScreenHeader(size: size, title: args['vendorName']),
                const SizedBox(
                  height: 100,
                ),
                CircularProgressIndicator(
                  color: AppTheme().secondaryColor,
                )
              ],
            ),
          ),
        ),
      ));
    }

    Widget renderWidget({type, widgetId, size, title, index}) {
      switch (type) {
        case "banner-slider":
          return BannerSlider(
            widgetId: widgetId,
            size: size,
            index: index,
            isHome: false,
          );
        case "image-banner":
          return ImageBanner(
            widgetId: widgetId,
            title: title,
            size: size,
            index: index,
            isHome: false,
          );
        case "product-carousel":
          return ProductCarousel(
            widgetId: widgetId,
            title: title,
            size: size,
            index: index,
            isHome: false,
          );
        case "categories":
          return CategoriesWidget(
            title: title,
            widgetId: widgetId,
            size: size,
            index: index,
            isHome: false,
          );
        case "vendors":
          return VendorsWidget(
            title: title,
            widgetId: widgetId,
            size: size,
            index: index,
            isHome: false,
          );
        case "text-block":
          return TextBlock(
            title: title,
            widgetId: widgetId,
            size: size,
            index: index,
            isHome: false,
          );
        case "product-list":
          return ProductList(
            title: title,
            widgetId: widgetId,
            size: size,
            index: index,
            isHome: false,
          );
        case "image-block":
          return ImageBlock(
            title: title,
            widgetId: widgetId,
            size: size,
            index: index,
            isHome: false,
          );
        case "video-block":
          return VideoBlock(
            title: title,
            widgetId: widgetId,
            size: size,
            index: index,
            isHome: false,
          );
        default:
          return const SizedBox();
      }
    }

    renderInfo() {
      if (farmProductsLoading && farmProducts.isEmpty) {
        fetchFarmProducts();
      }
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          !vendorInfo.containsKey('description') ||
                  vendorInfo['description'] == null ||
                  vendorInfo['description'] == ""
              ? const SizedBox()
              : const Text(
                  "Farm Description",
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17),
                ),
          const SizedBox(height: 5),
          !vendorInfo.containsKey('description') ||
                  vendorInfo['description'] == null ||
                  vendorInfo['description'] == ""
              ? const SizedBox()
              : Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 10, vertical: 15),
                  decoration: BoxDecoration(
                      border: Border.all(
                          color: AppTheme().secondaryColor, width: 2),
                      borderRadius: BorderRadius.circular(10),
                      color: const Color.fromARGB(255, 254, 255, 252)),
                  width: double.infinity,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        vendorInfo['description'],
                        style: const TextStyle(),
                      ),
                    ],
                  ),
                ),
          SizedBox(height: farmProducts.isEmpty ? 20 : 10),
          farmProductsLoading
              ? Center(
                  child: CircularProgressIndicator(
                      color: AppTheme().secondaryColor))
              : farmProducts.isEmpty
                  ? const SizedBox(
                      width: double.infinity,
                      child: Center(
                          child: Text(
                        "No Products Found",
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.bold),
                      )),
                    )
                  : Container(
                      color: AppTheme().scaffoldColor,
                      padding: const EdgeInsets.all(2),
                      width: double.infinity,
                      child: GridView.count(
                        padding: const EdgeInsets.symmetric(horizontal: 0),
                        mainAxisSpacing: 2,
                        crossAxisSpacing: 2,
                        childAspectRatio: itemWidth / itemHeight * 0.7,
                        physics: const NeverScrollableScrollPhysics(),
                        shrinkWrap: true,
                        crossAxisCount: 2, // Number of columns
                        children: [
                          ...(farmProducts.map((product) {
                            return Stack(
                              children: [
                                InkWell(
                                  // onTap: () => handleTap(),
                                  child: Container(
                                    // color: Colors.red,
                                    color: Colors.white,
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 10),
                                    child: Column(
                                      // crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Container(
                                          decoration: BoxDecoration(
                                              borderRadius:
                                                  BorderRadius.circular(15)),
                                          width: size.width * 0.35,
                                          child: ClipRRect(
                                            borderRadius:
                                                BorderRadius.circular(15),
                                            child: Image.network(
                                                product['coverPic']['mob'],
                                                fit: BoxFit.cover),
                                          ),
                                        ),
                                        const SizedBox(
                                          height: 5,
                                        ),
                                        Expanded(
                                            flex: 1,
                                            child: Container(
                                              padding:
                                                  const EdgeInsets.symmetric(
                                                      horizontal: 3),
                                              width: double.infinity,
                                              child: Column(
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.start,
                                                children: [
                                                  Text(
                                                    product['prodName'],
                                                    style: const TextStyle(
                                                        fontWeight:
                                                            FontWeight.w600,
                                                        fontSize: 15),
                                                    maxLines: 1,
                                                    overflow:
                                                        TextOverflow.ellipsis,
                                                  ),
                                                  const SizedBox(
                                                    height: 5,
                                                  ),
                                                  Text(
                                                      "By: ${product['vendorName']}",
                                                      maxLines: 1,
                                                      overflow:
                                                          TextOverflow.ellipsis,
                                                      style: const TextStyle(
                                                          fontSize: 14)),
                                                  const SizedBox(
                                                    height: 5,
                                                  ),
                                                  const Text(
                                                    "",
                                                    // "${product['data'].toString()}",
                                                    // product['priceList'][0]
                                                    //     ['weight'],
                                                    maxLines: 1,
                                                    overflow:
                                                        TextOverflow.ellipsis,
                                                    style: TextStyle(
                                                        fontSize: 14),
                                                  ),
                                                  const SizedBox(
                                                    height: 5,
                                                  ),
                                                  product['productType'] !=
                                                          'appointment'
                                                      ? Row(
                                                          children: [
                                                            Text(
                                                              "Rs ${product['priceList'][0]['discountedPrice'].toDouble()}",
                                                              maxLines: 1,
                                                              style: const TextStyle(
                                                                  fontSize: 15,
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .w500),
                                                            ),
                                                            SizedBox(
                                                              width: product['priceList']
                                                                              [
                                                                              0]
                                                                          [
                                                                          'purchasePrice'] !=
                                                                      product['priceList']
                                                                              [
                                                                              0]
                                                                          [
                                                                          'discountedPrice']
                                                                  ? 5
                                                                  : 0,
                                                            ),
                                                            product['priceList']
                                                                            [0][
                                                                        'purchasePrice'] !=
                                                                    product['priceList']
                                                                            [0][
                                                                        'discountedPrice']
                                                                ? Expanded(
                                                                    child: Text(
                                                                      "Rs ${product['data']['priceList'][0]['purchasePrice'].toDouble()}",
                                                                      maxLines:
                                                                          1,
                                                                      overflow:
                                                                          TextOverflow
                                                                              .ellipsis,
                                                                      style:
                                                                          const TextStyle(
                                                                        decoration:
                                                                            TextDecoration.lineThrough,
                                                                        fontSize:
                                                                            15,
                                                                      ),
                                                                    ),
                                                                  )
                                                                : const SizedBox(),
                                                          ],
                                                        )
                                                      : const SizedBox()
                                                ],
                                              ),
                                            ))
                                      ],
                                    ),
                                  ),
                                ),
                                Positioned(
                                  right: 0,
                                  child: product['productType'] != 'appointment'
                                      ? InkWell(
                                          // onTap: () => handleAddToCart(),
                                          child: Container(
                                            width: size.width * 0.07,
                                            height: size.width * 0.07,
                                            decoration: BoxDecoration(
                                              borderRadius:
                                                  BorderRadius.circular(2),
                                              color: AppTheme().secondaryColor,
                                            ),
                                            child: const Icon(
                                              Icons.add,
                                              color: Colors.white,
                                              size: 16,
                                            ),
                                          ),
                                        )
                                      : const SizedBox(),
                                )
                              ],
                            );
                          }).toList()),
                        ],
                      ),
                    ),
        ],
      );
    }

    renderSections() {
      if (vendorInfo['sections'] == null) {
        return const SizedBox();
      }
      List<dynamic> sections = vendorInfo['sections'];
      return Column(
        children: [
          ...(sections.asMap().entries.map((e) {
            int idx = e.key;
            dynamic val = e.value;
            if (val['location'] == 'all' || val['location'] == "app") {
              return renderWidget(
                  widgetId: val['widgetID'],
                  type: val['widgetType'],
                  size: size,
                  title:
                      val.containsKey('sectionName') ? val['sectionName'] : "",
                  index: idx);
            } else {
              return const SizedBox();
            }
          }))
        ],
      );
    }

    return SafeArea(
        child: Scaffold(
      body: SizedBox(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ScreenHeader(size: size, title: args['vendorName']),
              const SizedBox(
                height: 10,
              ),
              Row(
                children: [
                  Image.network(
                    vendorInfo['image']['mob'],
                    width: 80,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) {
                      return const SizedBox(
                        width: 80,
                        height: 80,
                        child: Icon(
                          Icons.image,
                          size: 80,
                          color: Color.fromARGB(255, 223, 223, 223),
                        ),
                      );
                    },
                  ),
                  Text(
                    args['vendorName'],
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  )
                ],
              ),
              const SizedBox(
                height: 15,
              ),
              vendorInfo.containsKey('sections')
                  ? vendorInfo['sections'].length == 0
                      ? const SizedBox()
                      : Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 15),
                          child: renderSections(),
                        )
                  : Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 15),
                      child: renderInfo(),
                    )

              // Padding(
              //   padding: EdgeInsets.symmetric(horizontal: 15),
              //   child: Column(
              //     crossAxisAlignment: CrossAxisAlignment.start,
              //     children: [
              //       Text(
              //         "Farm Description",
              //         style: TextStyle(fontWeight: FontWeight.bold,fontSize: 16),
              //       ),
              //       Container(
              //         child: Text(vendorInfo['description']),
              //       )
              //     ],
              //   ),
              // )
            ],
          ),
        ),
      ),
    ));
  }
}
