// ignore_for_file: use_build_context_synchronously

import 'dart:async';
import "package:flutter/foundation.dart";
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:new_version/new_version.dart';
import 'package:shein/providers/appProvider.dart';
import 'package:shein/providers/cartProvider.dart';
import 'package:shein/providers/categoriesProvider.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:shein/providers/userProvider.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/utils/databaseServices.dart';
import 'package:shein/utils/dynamicLink.dart';
import 'package:shein/widgets/custom_drawer.dart';
import 'package:shein/widgets/homeWidgets/bannerSlider.dart';
import 'package:shein/widgets/homeWidgets/categories.dart';
import 'package:iconsax/iconsax.dart';
import 'package:shein/widgets/homeWidgets/homeStrip.dart';
import 'package:shein/widgets/homeWidgets/imageBanner.dart';
import 'package:shein/widgets/homeWidgets/imageBlock.dart';
import 'package:shein/widgets/homeWidgets/productCarousel.dart';
import 'package:shein/widgets/homeWidgets/productList.dart';
import 'package:shein/widgets/homeWidgets/textBlock.dart';
import 'package:shein/widgets/homeWidgets/videoBlock.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../widgets/homeWidgets/instagram-family.dart';
import '../../widgets/homeWidgets/video-products.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  bool loading = false;
  String appVersion = '';
  var userDeliveryRegion = 'SNwoGgo8AqX0oAP5OTB4';

  int currentIndex = 0;
  late Timer timer;

  List<String> images = [
    "assets/Icons/freedelivery.png",
    "assets/Icons/delivery.png",
    "assets/Icons/trendingtopic.png",
    // "assets/Icons/returnbox.png",
  ];

  List<String> texts = [
    "All India Delivery",
    "Fast Delivery",
    "Trending Style",
    // "Easy Return & Exchange",
  ];

  handleRegionSelect() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString("region", userDeliveryRegion);
    setState(() {});
    Timer(const Duration(milliseconds: 200), () {
      Provider.of<HomeData>(context, listen: false).fetchHomeData();
      Provider.of<CategoryData>(context, listen: false).fetchCategories();

      Navigator.of(context).pop();
      Navigator.of(context).pushReplacementNamed('/home');
    });
  }

  getRegion({isManual = false}) async {
    final prefs = await SharedPreferences.getInstance();
    await Provider.of<AppProvider>(context, listen: false).getRegionsData();

    if (prefs.get('region') == null || isManual) {
      var regionsData =
          Provider.of<AppProvider>(context, listen: false).regionsData;
      setState(() {
        userDeliveryRegion = prefs.get('region') ?? regionsData[0]['id'];
      });

      await showModalBottomSheet(
        isDismissible: false,
        context: context,
        builder: (context) {
          return StatefulBuilder(
            builder: (context, setState) => Container(
              padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 20),
              height: Provider.of<HomeData>(context).isTablet
                  ? MediaQuery.of(context).size.height * 0.3
                  : MediaQuery.of(context).size.height * 0.5,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "Where do you want the delivery?",
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  const Text(
                    'Add region to see product availability.',
                    style: TextStyle(fontWeight: FontWeight.w400, fontSize: 13),
                  ),
                  const SizedBox(
                    height: 15,
                  ),
                  const Text(
                    "Region",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Container(
                    height: 40,
                    padding: const EdgeInsets.only(left: 10),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(5.0),
                      border: Border.all(
                        color: Colors.grey,
                        width: 1.0,
                      ),
                    ),
                    width: double.infinity,
                    child: DropdownButton<String>(
                        alignment: Alignment.bottomCenter,
                        underline: const SizedBox(),
                        icon: const Icon(Icons.arrow_drop_down),
                        isExpanded: true,
                        value: userDeliveryRegion,
                        onChanged: (newValue) {
                          setState(() {
                            userDeliveryRegion = newValue.toString();
                          });
                        },
                        items: [
                          ...(regionsData.map((region) {
                            return DropdownMenuItem<String>(
                              value: region['id'],
                              child: Text(
                                region['name'],
                                style: const TextStyle(fontSize: 14),
                              ),
                            );
                          }).toList())
                        ]),
                  ),
                  const SizedBox(
                    height: 15,
                  ),
                  Center(
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(100),
                      child: SizedBox(
                        height: 35,
                        // padding: EdgeInsets.symmetric(horizontal: 5),
                        child: TextButton(
                          onPressed: handleRegionSelect,
                          style: ButtonStyle(
                            // elevation: MaterialStatePropertyAll(5),
                            backgroundColor: MaterialStatePropertyAll(
                                AppTheme().secondaryColor),
                          ),
                          child: const Padding(
                            padding: EdgeInsets.symmetric(horizontal: 5),
                            child: Text(
                              'Apply',
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                        ),
                      ),
                    ),
                  )
                ],
              ),
            ),
          );
        },
      );
    } else {
      Provider.of<AppProvider>(context, listen: false)
          .setRegion(prefs.get('region'));
      setState(() {
        userDeliveryRegion = prefs.get('region').toString();
      });
    }
  }

  _checkVersion() async {
    print('Check Version..... ');
    final newVersion = NewVersion(
        androidId: "com.app.shein",
        iOSId: 'com.app.shein',
        iOSAppStoreCountry: 'IN');
    final newstatus = await newVersion.getVersionStatus();
    final status = newstatus;
    if (status != null) {
      print('App Version : ${status.localVersion}');
      print('PlayStore Version : ${status.storeVersion}');

      var data = await FirebaseFirestore.instance
          .collection("settings")
          .doc('app')
          .get()
          .then((value) {
        var res = value.data();
        return res?['appVersion'];
      });

      if (defaultTargetPlatform == TargetPlatform.android) {
        if (status.canUpdate) {
          newVersion.showUpdateDialog(
            context: context,
            versionStatus: status,
            dialogText:
                "Please update the app from ${status.localVersion} to ${data.toString().trim()}",
            allowDismissal: false,
            dismissAction: () {
              SystemNavigator.pop();
            },
            dismissButtonText: 'Exit',
          );
        }
      } else {
        var localArr = status.localVersion.toString().split('.');
        var remoteArr = data.toString().split('.');
        bool isUpdateAvailable = false;
        for (var i = 0; i < 3; i++) {
          if (double.parse(localArr[i]) < double.parse(remoteArr[i])) {
            isUpdateAvailable = true;
          }
        }

        if (isUpdateAvailable) {
          newVersion.showUpdateDialog(
            context: context,
            versionStatus: status,
            dialogText:
                "Please update the app from ${status.localVersion} to ${data.toString().trim()}",
            allowDismissal: false,
            dismissAction: () {
              SystemNavigator.pop();
            },
            dismissButtonText: 'Exit',
          );
        }
      }
    }
    print('Version check successfully...');
  }

  @override
  void initState() {
    // TODO: implement initState

    _checkVersion();

    //     timer = Timer.periodic(Duration(seconds: 3), (timer) {
    //   setState(() {
    //     currentIndex = (currentIndex + 1) % images.length;
    //   });
    // });

    // getRegion();
    Provider.of<Auth>(context, listen: false).fetchUser('');
    Provider.of<Auth>(context, listen: false).uploadDeviceToken();
    DatabaseService().getCartDetails(context);
    Timer(const Duration(milliseconds: 50), () {
      Provider.of<HomeData>(context, listen: false).checkIsTablet(context);

      DynamicLinkProvider().initDynamicLink(context: context);
    });
    Timer(const Duration(milliseconds: 50), () {
      DynamicLinkProvider().initInitialLink(context: context);
    });

    super.initState();
  }

  @override
  void dispose() {
    // TODO: implement dispose
    // timer.cancel();
    super.dispose();
  }

  Widget renderWidget(
      {type, widgetId, size, title, index, categoryRegions, isCombo = ""}) {
    if (widgetId == null) {
      return const SizedBox();
    }

    switch (type) {
      case "banner-slider":
        return BannerSlider(
          widgetId: widgetId,
          size: size,
          index: index,
          isHome: true,
        );
      case "image-banner":
        return Column(
          children: [
            ImageBanner(
              widgetId: widgetId,
              title: title,
              size: size,
              index: index,
              isHome: true,
            ),
            SizedBox(
              height: 10,
            )
          ],
        );
      case "product-carousel":
        return ProductCarousel(
          widgetId: widgetId,
          title: title,
          size: size,
          index: index,
          isHome: true,
        );
      case "categories":
        return CategoriesWidget(
          title: title,
          widgetId: widgetId.toString(),
          size: size,
          index: index,
          isCombo: isCombo,
          isHome: true,
        );
      case "video-products":
        return VideoProducts(
          // title: title,
          // widgetId: widgetId,
          size: size,
          index: index,
          isHome: true,
        );
      // case "vendors":
      //   return VendorsWidget(
      //     title: title,
      //     widgetId: widgetId,
      //     size: size,
      //     index: index,
      //     isHome: true,
      //   );
      case "text-block":
        return TextBlock(
          title: title,
          widgetId: widgetId,
          size: size,
          index: index,
          isHome: true,
        );
      case "product-list":
        return ProductList(
          title: title,
          widgetId: widgetId,
          size: size,
          index: index,
          isHome: true,
        );
      case "image-block":
        return ImageBlock(
          title: title,
          widgetId: widgetId,
          size: size,
          index: index,
          isHome: true,
        );
      case "video-block":
        return VideoBlock(
          title: title,
          widgetId: widgetId,
          size: size,
          index: index,
          isHome: true,
        );
      

      case "instagram-family":
        return InstagramFam(
          // title: title,
          // widgetId: widgetId,
          size: size,
          index: index,
          isHome: true,
        );

        // case "referearn":
        // return Image.asset(
        //         'assets/images/referearn.png',
        //         width: double.infinity,
        //         height: 200,
        //       );
      // case "static":
      //   return StaticCarousel(
      //     // title: title,
      //     // widgetId: widgetId,
      //     size: size,
      //     index: index,
      //     isHome: true,
      //   );

      default:
        return const SizedBox(
            // child: Text("asfasf"),
            );
    }
  }

  String getRegionName() {
    var regionsData =
        Provider.of<AppProvider>(context, listen: false).regionsData;
    var region = regionsData
        .where((element) => element['id'] == userDeliveryRegion)
        .toList();
    if (region.isEmpty) {
      return "";
    } else {
      return region[0]['name'];
    }
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    final homeData = Provider.of<HomeData>(context);

    var expanded = Expanded(
        child: SingleChildScrollView(
      child: Column(
        children: [
          // const SizedBox(
          //   height: 15,
          // ),
          // Padding(
          //   padding: const EdgeInsets.symmetric(horizontal: 15),
          //   child: SizedBox(
          //     child: Row(
          //       crossAxisAlignment: CrossAxisAlignment.center,
          //       children: [
          //         SizedBox(
          //           width: size.width * 0.3,
          //           height: size.height * 0.05,
          //           child: Center(child: Image.asset('assets/images/logo.png')),
          //         ),
          //         Expanded(
          //           child: FutureBuilder(
          //             future: FirebaseFirestore.instance
          //                 .collection("settings")
          //                 .doc('store')
          //                 .get()
          //                 .then((value) {
          //               if (value.exists) {
          //                 var data = value.data();
          //                 return data?['notificationMessage'];
          //               } else {
          //                 return "";
          //               }
          //             }),
          //             builder: (context, snapshot) {
          //               return SizedBox(
          //                 width: size.width * 0.51,
          //                 height: size.height * 0.05,
          //                 child: Text(
          //                   "${snapshot.data}",
          //                   maxLines: 2,
          //                   textAlign: TextAlign.end,
          //                   overflow: TextOverflow.ellipsis,
          //                   style: TextStyle(color: AppTheme().secondaryColor),
          //                 ),
          //               );
          //             },
          //           ),
          //         )
          //       ],
          //     ),
          //   ),
          // ),
          const SizedBox(
            height: 0,
          ),
          ...(homeData.homeData.asMap().entries.map((e) {
            int idx = e.key;
            dynamic val = e.value;
            //   if (e['location'] == "all" ||
            //       e['location'] == "app" ||
            //       e['location'] == "test") {
            if (val['location'] == 'all' ||
                val['location'] == "app" ||
                val['location'] == "flutter-app") {
              print("home:${val['widgetType']}");

              return Column(
                children: [
                  renderWidget(
                      widgetId: val['widgetID'],
                      type: val['widgetType'],
                      size: size,
                      isCombo:
                          val.containsKey('designType') ? val['designType'] : "",
                      title:
                          val.containsKey('sectionName') ? val['sectionName'] : "",
                      index: idx,
                      categoryRegions: ""),

                  
      
                ],
              );
            } else {
              return const SizedBox();
            }
          }).toList())
        ],
      ),
    ));
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
    return SafeArea(
      child: Scaffold(
        key: scaffoldKey,
        drawer: CustomDrawer(appVersion: appVersion),
        appBar: AppBar(
          leading: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              GestureDetector(
                  onTap: () {
                    scaffoldKey.currentState?.openDrawer();
                  },
                  child: const Padding(
                    padding: EdgeInsets.only(left: 10),
                    child: Icon(
                      Icons.menu,
                      size: 25,
                    ),
                  )),
              // const Spacer(),
              // Column(
              //   crossAxisAlignment: CrossAxisAlignment.start,
              //   mainAxisAlignment: MainAxisAlignment.center,
              //   children: [
              //     Text(
              //       'SHEIN',
              //       style: GoogleFonts.montserrat(
              //           textStyle: const TextStyle(
              //               fontSize: 16, fontWeight: FontWeight.w700)),
              //     ),
              //     Text(
              //       'STYLE STORES',
              //       style: GoogleFonts.montserrat(
              //           textStyle: TextStyle(
              //               fontSize: 10,
              //               fontWeight: FontWeight.w600,
              //               color: AppTheme().mainColor)),
              //     )
              //   ],
              // ),
            ],
          ),
          title: Center(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'SHEIN',
                  style: GoogleFonts.montserrat(
                      textStyle: const TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.w700,
                          letterSpacing: 2.5)),
                ),
                Text(
                  'STYLE STORES',
                  style: GoogleFonts.montserrat(
                      textStyle: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w600,
                          letterSpacing: -0.2,
                          color: AppTheme().mainColor)),
                )
              ],
            ),
          ),
          actions: [
            Row(
              children: [
                InkWell(
                  onTap: () => {
                    if (FirebaseAuth.instance.currentUser?.uid == null)
                      {
                        // Navigator.of(context, rootNavigator: true).push(
                        //   CupertinoPageRoute(
                        //     builder: (context) => OnboardScreen(),
                        //   ),
                        // )

                        Navigator.of(context).pushNamed('/login')
                      }
                    else
                      {
                        Navigator.of(context).pushNamed('/wishlist'),
                      }
                  },
                  child: Container(
                      width: Provider.of<HomeData>(context).isTablet
                          ? size.width * 0.1
                          : size.width * 0.1,
                      height: Provider.of<HomeData>(context).isTablet
                          ? size.width * 0.1
                          : size.width * 0.1,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(100),
                        // gradient: const LinearGradient(
                        //     colors: [
                        //       Color.fromARGB(255, 125, 125, 125),
                        //       Colors.black
                        //     ],
                        //     begin: Alignment.bottomCenter,
                        //     end: Alignment.topCenter,
                        //     stops: [-1.0, 0.9]),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(7.0),
                        child: SvgPicture.asset(
                          'assets/Icons/heart.svg',
                          color: AppTheme().secondaryColor,
                          width: Provider.of<HomeData>(context).isTablet
                              ? size.width * 0.05
                              : size.width * 0.06,
                        ),
                      )
                      // Icon(
                      //   AppIcons.shopping_cart,
                      //   color: AppTheme().secondaryColor,
                      //   size: Provider.of<HomeData>(context).isTablet
                      //       ? size.width * 0.05
                      //       : size.width * 0.06,
                      //   weight: 100,
                      // ),
                      ),
                ),
                InkWell(
                  onTap: () => {
                    Navigator.of(context).pushNamed('/cart'),
                  },
                  child: Stack(
                    children: [
                      Container(
                          width: Provider.of<HomeData>(context).isTablet
                              ? size.width * 0.1
                              : size.width * 0.1,
                          height: Provider.of<HomeData>(context).isTablet
                              ? size.width * 0.1
                              : size.width * 0.1,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(100),
                            // gradient: const LinearGradient(
                            //     colors: [
                            //       Color.fromARGB(255, 125, 125, 125),
                            //       Colors.black
                            //     ],
                            //     begin: Alignment.bottomCenter,
                            //     end: Alignment.topCenter,
                            //     stops: [-1.0, 0.9]),
                          ),
                          child: Stack(
                            children: [
                              Padding(
                                padding: const EdgeInsets.all(7.0),
                                child: SvgPicture.asset(
                                  'assets/Icons/Bag.svg',
                                  color: AppTheme().secondaryColor,
                                  width: Provider.of<HomeData>(context).isTablet
                                      ? size.width * 0.05
                                      : size.width * 0.06,
                                ),
                              ),
                              if (Provider.of<Cart>(context).cart.isNotEmpty)
                                Positioned(
                                  right: 4,
                                  top: 4,
                                  child: Container(
                                    width: 16,
                                    height: 16,
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(100),
                                      color: AppTheme().themeColor,
                                      // gradient: LinearGradient(
                                      //   colors: [
                                      //     AppTheme().secondaryColor,
                                      //     AppTheme().secondaryColor,
                                      //   ],
                                      //   begin: Alignment.bottomCenter,
                                      //   end: Alignment.topCenter,
                                      //   stops: [-1.0, 0.9],
                                      // ),
                                    ),
                                    child: Center(
                                      child: Text(
                                        Provider.of<Cart>(context)
                                            .cart
                                            .length
                                            .toString(),
                                        style: const TextStyle(
                                            color: Colors.white, fontSize: 12),
                                      ),
                                    ),
                                  ),
                                )
                              else
                                const SizedBox(),
                            ],
                          )
                          // Icon(
                          //   AppIcons.shopping_cart,
                          //   color: AppTheme().secondaryColor,
                          //   size: Provider.of<HomeData>(context).isTablet
                          //       ? size.width * 0.05
                          //       : size.width * 0.06,
                          //   weight: 100,
                          // ),
                          ),
                      // Provider.of<Cart>(context).cart.isNotEmpty
                      //     ? Positioned(
                      //         right: Provider.of<HomeData>(context).isTablet
                      //             ? size.width * 0.007
                      //             : size.width * 0.007,
                      //         top: Provider.of<HomeData>(context).isTablet
                      //             ? size.width * 0.012
                      //             : size.width * 0.012,
                      //         child: Container(
                      //           width:
                      //               Provider.of<HomeData>(context).isTablet
                      //                   ? size.width * 0.035
                      //                   : size.width * 0.04,
                      //           height:
                      //               Provider.of<HomeData>(context).isTablet
                      //                   ? size.width * 0.035
                      //                   : size.width * 0.04,
                      //           decoration: BoxDecoration(
                      //             borderRadius: BorderRadius.circular(100),
                      //             gradient: LinearGradient(
                      //                 colors: [
                      //                   AppTheme().secondaryColor,
                      //                   AppTheme().secondaryColor
                      //                 ],
                      //                 begin: Alignment.bottomCenter,
                      //                 end: Alignment.topCenter,
                      //                 stops: [-1.0, 0.9]),
                      //           ),
                      //           child: Center(
                      //             child: Text(
                      //               Provider.of<Cart>(context)
                      //                   .cart
                      //                   .length
                      //                   .toString(),
                      //               style: const TextStyle(
                      //                   color: Colors.white, fontSize: 12),
                      //             ),
                      //           ),
                      //         ),
                      //       )
                      //     : const SizedBox(),
                    ],
                  ),
                ),
              ],
            )
          ],
          foregroundColor: Colors.black,
          backgroundColor: Colors.white,
          elevation: 0,
        ),
        body: SizedBox(
          width: double.infinity,
          height: size.height * 0.9,
          child: Column(
            children: [
              // ElevatedButton(onPressed: addToCart, child: Text('test')),
              // const SizedBox(
              //   height: 20,
              // ),
              // Padding(
              //   padding: const EdgeInsets.symmetric(horizontal: 15),
              //   child: Row(
              //     mainAxisAlignment: MainAxisAlignment.spaceBetween,
              //     children: [
              //       Expanded(
              //           child: Row(
              //         children: [
              //           SizedBox(
              //             // width: size.width * 0.5,
              //             // height: size.height * 0.06,
              //             child: Center(
              //                 child: Image.asset('assets/images/logo.png')),
              //           ),
              //         ],
              //       )),
              //       // Expanded(
              //       //   child: InkWell(
              //       //     onTap: () => getRegion(isManual: true),
              //       //     child: Row(
              //       //       children: [
              //       //         Icon(
              //       //           Icons.location_city_outlined,
              //       //           color: AppTheme().secondaryColor,
              //       //           size: Provider.of<HomeData>(context).isTablet
              //       //               ? size.width * 0.05
              //       //               : size.width * 0.06,
              //       //         ),
              //       //         const SizedBox(
              //       //           width: 5,
              //       //         ),
              //       //         Text(
              //       //           'Deliver to ${getRegionName()}',
              //       //           style: TextStyle(
              //       //               fontSize:
              //       //                   Provider.of<HomeData>(context).isTablet
              //       //                       ? size.width * 0.025
              //       //                       : size.width * 0.03),
              //       //         ),
              //       //         const SizedBox(
              //       //           width: 5,
              //       //         ),
              //       //         const Icon(
              //       //           Icons.keyboard_arrow_down,
              //       //           size: 16,
              //       //         )
              //       //       ],
              //       //     ),
              //       //   ),
              //       // ),

              //       InkWell(
              //         onTap: () => {
              //           if (FirebaseAuth.instance.currentUser?.uid == null)
              //             {
              //               // Navigator.of(context, rootNavigator: true).push(
              //               //   CupertinoPageRoute(
              //               //     builder: (context) => OnboardScreen(),
              //               //   ),
              //               // )

              //               Navigator.of(context).pushNamed('/login')
              //             }
              //           else
              //             {
              //               Navigator.of(context).pushNamed('/wishlist'),
              //             }
              //         },
              //         child: Container(
              //             width: Provider.of<HomeData>(context).isTablet
              //                 ? size.width * 0.1
              //                 : size.width * 0.1,
              //             height: Provider.of<HomeData>(context).isTablet
              //                 ? size.width * 0.1
              //                 : size.width * 0.1,
              //             decoration: BoxDecoration(
              //               borderRadius: BorderRadius.circular(100),
              //               // gradient: const LinearGradient(
              //               //     colors: [
              //               //       Color.fromARGB(255, 125, 125, 125),
              //               //       Colors.black
              //               //     ],
              //               //     begin: Alignment.bottomCenter,
              //               //     end: Alignment.topCenter,
              //               //     stops: [-1.0, 0.9]),
              //             ),
              //             child: Padding(
              //               padding: const EdgeInsets.all(7.0),
              //               child: SvgPicture.asset(
              //                 'assets/Icons/heart.svg',
              //                 color: AppTheme().secondaryColor,
              //                 width: Provider.of<HomeData>(context).isTablet
              //                     ? size.width * 0.05
              //                     : size.width * 0.06,
              //               ),
              //             )
              //             // Icon(
              //             //   AppIcons.shopping_cart,
              //             //   color: AppTheme().secondaryColor,
              //             //   size: Provider.of<HomeData>(context).isTablet
              //             //       ? size.width * 0.05
              //             //       : size.width * 0.06,
              //             //   weight: 100,
              //             // ),
              //             ),
              //       ),
              //       InkWell(
              //         onTap: () => {
              //           Navigator.of(context).pushNamed('/cart'),
              //         },
              //         child: Stack(
              //           children: [
              //             Container(
              //                 width: Provider.of<HomeData>(context).isTablet
              //                     ? size.width * 0.1
              //                     : size.width * 0.1,
              //                 height: Provider.of<HomeData>(context).isTablet
              //                     ? size.width * 0.1
              //                     : size.width * 0.1,
              //                 decoration: BoxDecoration(
              //                   borderRadius: BorderRadius.circular(100),
              //                   // gradient: const LinearGradient(
              //                   //     colors: [
              //                   //       Color.fromARGB(255, 125, 125, 125),
              //                   //       Colors.black
              //                   //     ],
              //                   //     begin: Alignment.bottomCenter,
              //                   //     end: Alignment.topCenter,
              //                   //     stops: [-1.0, 0.9]),
              //                 ),
              //                 child: Stack(
              //                   children: [
              //                     Padding(
              //                       padding: const EdgeInsets.all(7.0),
              //                       child: SvgPicture.asset(
              //                         'assets/Icons/Bag.svg',
              //                         color: AppTheme().secondaryColor,
              //                         width: Provider.of<HomeData>(context)
              //                                 .isTablet
              //                             ? size.width * 0.05
              //                             : size.width * 0.06,
              //                       ),
              //                     ),
              //                     if (Provider.of<Cart>(context)
              //                         .cart
              //                         .isNotEmpty)
              //                       Positioned(
              //                         right: 4,
              //                         top: 4,
              //                         child: Container(
              //                           width: 16,
              //                           height: 16,
              //                           decoration: BoxDecoration(
              //                             borderRadius:
              //                                 BorderRadius.circular(100),
              //                             color: AppTheme().themeColor,
              //                             // gradient: LinearGradient(
              //                             //   colors: [
              //                             //     AppTheme().secondaryColor,
              //                             //     AppTheme().secondaryColor,
              //                             //   ],
              //                             //   begin: Alignment.bottomCenter,
              //                             //   end: Alignment.topCenter,
              //                             //   stops: [-1.0, 0.9],
              //                             // ),
              //                           ),
              //                           child: Center(
              //                             child: Text(
              //                               Provider.of<Cart>(context)
              //                                   .cart
              //                                   .length
              //                                   .toString(),
              //                               style: const TextStyle(
              //                                   color: Colors.white,
              //                                   fontSize: 12),
              //                             ),
              //                           ),
              //                         ),
              //                       )
              //                     else
              //                       const SizedBox(),
              //                   ],
              //                 )
              //                 // Icon(
              //                 //   AppIcons.shopping_cart,
              //                 //   color: AppTheme().secondaryColor,
              //                 //   size: Provider.of<HomeData>(context).isTablet
              //                 //       ? size.width * 0.05
              //                 //       : size.width * 0.06,
              //                 //   weight: 100,
              //                 // ),
              //                 ),
              //             // Provider.of<Cart>(context).cart.isNotEmpty
              //             //     ? Positioned(
              //             //         right: Provider.of<HomeData>(context).isTablet
              //             //             ? size.width * 0.007
              //             //             : size.width * 0.007,
              //             //         top: Provider.of<HomeData>(context).isTablet
              //             //             ? size.width * 0.012
              //             //             : size.width * 0.012,
              //             //         child: Container(
              //             //           width:
              //             //               Provider.of<HomeData>(context).isTablet
              //             //                   ? size.width * 0.035
              //             //                   : size.width * 0.04,
              //             //           height:
              //             //               Provider.of<HomeData>(context).isTablet
              //             //                   ? size.width * 0.035
              //             //                   : size.width * 0.04,
              //             //           decoration: BoxDecoration(
              //             //             borderRadius: BorderRadius.circular(100),
              //             //             gradient: LinearGradient(
              //             //                 colors: [
              //             //                   AppTheme().secondaryColor,
              //             //                   AppTheme().secondaryColor
              //             //                 ],
              //             //                 begin: Alignment.bottomCenter,
              //             //                 end: Alignment.topCenter,
              //             //                 stops: [-1.0, 0.9]),
              //             //           ),
              //             //           child: Center(
              //             //             child: Text(
              //             //               Provider.of<Cart>(context)
              //             //                   .cart
              //             //                   .length
              //             //                   .toString(),
              //             //               style: const TextStyle(
              //             //                   color: Colors.white, fontSize: 12),
              //             //             ),
              //             //           ),
              //             //         ),
              //             //       )
              //             //     : const SizedBox(),
              //           ],
              //         ),
              //       ),
              //       const SizedBox(width: 4),
              //     ],
              //   ),
              // ),
              const HomeStrip(),
              const SizedBox(
                height: 12,
              ),
              InkWell(
                onTap: () {
                  Navigator.of(context).pushNamed('/search');
                },
                child: Padding(
                  padding:
                      const EdgeInsets.only(left: 10, right: 10, bottom: 0),
                  child: Container(
                    width: double.infinity,
                    height: 40,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      border: Border.all(color: Colors.grey.withOpacity(0.3)),
                      borderRadius: BorderRadius.circular(20),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.grey.withOpacity(0.3),
                          spreadRadius: 2,
                          blurRadius: 4,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: TextFormField(
                      enabled: false,
                      style: const TextStyle(color: Colors.black),
                      cursorColor: const Color.fromARGB(255, 160, 159, 159),
                      decoration: InputDecoration(
                        contentPadding:
                            const EdgeInsets.symmetric(horizontal: 0.0),
                        prefixIcon: const Padding(
                          padding: EdgeInsets.only(left: 12),
                          child: Icon(Iconsax.camera),
                        ),
                        prefixIconConstraints:
                            const BoxConstraints(minWidth: 30, minHeight: 30),
                        suffixIconConstraints:
                            const BoxConstraints(minWidth: 30, minHeight: 30),
                        suffixIcon: Padding(
                          padding: const EdgeInsets.only(right: 12),
                          child: SvgPicture.asset(
                            'assets/Icons/search.svg',
                          ),
                        ),
                        border: InputBorder.none,
                        hintText: "  What are you Looking for",
                        hintStyle: const TextStyle(
                          color: Color.fromARGB(255, 160, 159, 159),
                        ),
                      ),
                    ),
                  ),
                ),
              ),

              Container(
                width: double.infinity,
                padding: const EdgeInsets.only(top: 10, right: 10, left: 10),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  // crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Row(
                      children: [
                        Image.asset(
                          images[currentIndex],
                          width: 22,
                          height: 25,
                        ),
                        const SizedBox(width: 5),
                        Text(
                          texts[currentIndex],
                          style: AppTheme().outfitStyle(
                              fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        Image.asset(
                          images[currentIndex + 1],
                          width: 22,
                          height: 25,
                        ),
                        const SizedBox(width: 5),
                        Text(
                          texts[currentIndex + 1],
                          style: AppTheme().outfitStyle(
                              fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Image.asset(
                          images[currentIndex + 2],
                          width: 22,
                          height: 25,
                        ),
                        const SizedBox(width: 5),
                        Text(
                          texts[currentIndex + 2],
                          style: AppTheme().outfitStyle(
                              fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              homeData.isLoading ? const SizedBox() : expanded,
              

              // refer n earn image static

              // Container(
              //   height: 200,
              //   width: 200,
              //   color: Colors.red,
              // )
            ],
          ),
        ),
      ),
    );
  }
}
