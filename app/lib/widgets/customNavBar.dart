import 'package:iconsax/iconsax.dart';
import 'package:shein/screens/cartScreen/cart.dart';
import 'package:shein/screens/profile/profile.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:shein/constants/constants.dart';
import 'package:shein/screens/categories/categoriesScreen.dart';
import 'package:shein/screens/home/HomeScreen.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/custom_drawer.dart';
import 'package:provider/provider.dart';
import 'package:shein/widgets/homeWidgets/xtrending.dart';
import '../providers/cartProvider.dart';
import '../providers/homeProvider.dart';

class CustomNavBar extends StatefulWidget {
  final int pageNum;
  const CustomNavBar({
    super.key,
    this.pageNum = 1,
  });

  @override
  State<CustomNavBar> createState() => _CustomNavBarState();
}

class _CustomNavBarState extends State<CustomNavBar> {
  String appVersion = '';
  var isLogin;
  int page = 1;

  fetchAppVersion() async {
    var res = await Constants().getAppVersion();
    setState(() {
      appVersion = res;
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    setState(() {
      page = widget.pageNum;
    });
    getLogin();
    fetchAppVersion();
    super.initState();
  }

  getLogin() async {
    setState(() {
      isLogin = FirebaseAuth.instance.currentUser?.uid;
    });
  }

  @override
  Widget build(BuildContext context) {
    print(page);
    final size = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        drawerEdgeDragWidth: size.width * 0.3,
        drawer: CustomDrawer(appVersion: appVersion),
        bottomNavigationBar: Builder(builder: (context) {
          return Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(horizontal: 8),
              height: size.height * 0.08,
              // margin: const EdgeInsets.only(bottom: 2),
              decoration: BoxDecoration(
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.2),
                    blurRadius: 4,
                    spreadRadius: 2,
                    offset: const Offset(0, 2),
                  ),
                ],
                border: const Border(
                  top: BorderSide(
                    color: Color.fromARGB(255, 210, 209, 209),
                    width: 1,
                  ),
                ),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  InkWell(
                    onTap: () {
                      setState(() {
                        page = 1;
                      });
                    },
                    child: SizedBox(
                      width: size.width * 0.16,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          page == 1
                              ? Column(
                                  children: [
                                    Icon(
                                      Iconsax.home_15,
                                      size: 23,
                                      color: AppTheme().themeColor,
                                    ),
                                    const SizedBox(
                                      height: 4,
                                    ),
                                    Text(
                                      "Home",
                                      style: TextStyle(
                                        fontSize: 12,
                                          color: AppTheme().themeColor,
                                          fontWeight: FontWeight.w500),
                                    ),
                                  ],
                                )
                              : const Column(
                                  children: [
                                    Icon(
                                      Iconsax.home,
                                      size: 23,
                                    ),
                                    SizedBox(
                                      height: 4,
                                    ),
                                    Text(
                                      "Home",
                                      style: TextStyle(
                                        fontSize: 12,
                                          color: Colors.black,
                                          fontWeight: FontWeight.w500),
                                    ),
                                  ],
                                ),
                          // Icon(
                          //   AppIcons.home_button,
                          //   color: page == 1
                          //       ? AppTheme().secondaryColor
                          //       : const Color(0xff646464),
                          //   size: 23,
                          // ),
                          const SizedBox(
                            height: 2,
                          ),
                          // Text(
                          //   "Home",
                          //   style: TextStyle(
                          //       fontSize: 11,
                          //       color: page == 1
                          //           ? AppTheme().secondaryColor
                          //           : const Color(0xff646464)),
                          // )
                        ],
                      ),
                    ),
                  ),
                  InkWell(
                    onTap: () {
                      setState(() {
                        page = 2;
                      });
                    },
                    child: SizedBox(
                      width: size.width * 0.17,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          page == 2
                              ? Column(
                                  children: [
                                    Icon(
                                      Iconsax.category5,
                                      size: 23,
                                      color: AppTheme().themeColor,
                                    ),
                                    const SizedBox(
                                      height: 4,
                                    ),
                                    Text(
                                      "Category",
                                      style: TextStyle(
                                         fontSize: 12,
                                          color: AppTheme().themeColor,
                                          fontWeight: FontWeight.w500),
                                    ),
                                  ],
                                )
                              : const Column(
                                  children: [
                                    Icon(
                                      Iconsax.category,
                                      size: 23,
                                    ),
                                    SizedBox(
                                      height: 4,
                                    ),
                                    Text(
                                      "Category",
                                      style: TextStyle(
                                         fontSize: 12,
                                          color: Colors.black,
                                          fontWeight: FontWeight.w500),
                                    ),
                                  ],
                                ),
                          const SizedBox(
                            height: 2,
                          ),
                          // Text(
                          //   "Categories",
                          //   style: TextStyle(
                          //       fontSize: 11,
                          //       color: page == 2
                          //           ? AppTheme().secondaryColor
                          //           : const Color(0xff646464)),
                          // )
                        ],
                      ),
                    ),
                  ),
                  InkWell(
                    onTap: () {
                      setState(() {
                        page = 3;
                      });
                    },
                    child: SizedBox(
                      width: size.width * 0.17,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          page == 3
                              ? Column(
                                  children: [
                                    // Icon(
                                    //     Iconsax.box,
                                    //     size: 23,
                                    //     color: AppTheme().themeColor,
                                    //   ),
                                    //   const SizedBox(
                                    //           height: 4,
                                    //         ),

                                    Image.asset(
                                      "assets/Icons/fire.png",
                                      width: 30,
                                      height: 30,
                                    ),
                                    const SizedBox(
                                      height: 2,
                                    ),
                                    Text(
                                      "X-Trending",
                                      maxLines: 1,
                                      style: TextStyle(
                                         fontSize: 12,
                                          color: AppTheme().themeColor,
                                          overflow: TextOverflow.ellipsis,
                                          fontWeight: FontWeight.w500),
                                    ),
                                  ],
                                )
                              : Column(
                                  children: [
                                    // Icon(
                                    //     Iconsax.box,
                                    //     size: 23,
                                    //   ),
                                    Image.asset(
                                      "assets/Icons/fire.png",
                                      color: Colors.black,
                                      width: 30,
                                      height: 30,
                                    ),

                                    const Text(
                                      "X-Trending",
                                      maxLines: 1,
                                      style: TextStyle(
                                        fontSize: 12,
                                          color: Colors.black,
                                          overflow: TextOverflow.ellipsis,
                                          fontWeight: FontWeight.w500),
                                    ),
                                  ],
                                ),
                          const SizedBox(
                            height: 2,
                          ),
                          // Text(
                          //   "Categories",
                          //   style: TextStyle(
                          //       fontSize: 11,
                          //       color: page == 2
                          //           ? AppTheme().secondaryColor
                          //           : const Color(0xff646464)),
                          // )
                        ],
                      ),
                    ),
                  ),
                  InkWell(
                    onTap: () {
                      setState(() {
                        page = 4;
                      });
                    },
                    // onTap: () {
                    //   if (FirebaseAuth.instance.currentUser?.uid == null) {
                    //     Navigator.of(context).pushNamed('/login');
                    //   } else {
                    //     setState(() {
                    //       page = 3;
                    //     });
                    //     print(
                    //         'Uid is : ${FirebaseAuth.instance.currentUser?.uid}');
                    //   }
                    // },
                    child: Stack(
                      children: [
                        SizedBox(
                          width: size.width * 0.15,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              InkWell(
                                child: page == 4
                                    ? Column(
                                        children: [
                                          Icon(
                                            Iconsax.shopping_bag5,
                                            size: 23,
                                            color: AppTheme().themeColor,
                                          ),
                                          const SizedBox(
                                            height: 4,
                                          ),
                                          Text(
                                            "Bag",
                                            style: TextStyle(
                                              fontSize: 12,
                                                color: AppTheme().themeColor,
                                                fontWeight: FontWeight.w500),
                                          ),
                                        ],
                                      )
                                    : const Column(
                                        children: [
                                          Icon(
                                            Iconsax.shopping_bag,
                                            size: 23,
                                          ),
                                          SizedBox(
                                            height: 4,
                                          ),
                                          Text(
                                            "Bag",
                                            style: TextStyle(
                                              fontSize: 12,
                                                color: Colors.black,
                                                fontWeight: FontWeight.w500),
                                          )
                                        ],
                                      ),
                              ),

                              // const SizedBox(
                              //   height: 2,
                              // ),
                              // Text(
                              //   "Orders",
                              //   style: TextStyle(
                              //       fontSize: 11,
                              //       color: page == 3
                              //           ? AppTheme().secondaryColor
                              //           : const Color(0xff646464)),
                              // )
                            ],
                          ),
                        ),
                        Provider.of<Cart>(context).cart.isNotEmpty
                            ? Positioned(
                                right: Provider.of<HomeData>(context).isTablet
                                    ? size.width * 0.007
                                    : size.width * 0.037,
                                top: Provider.of<HomeData>(context).isTablet
                                    ? size.width * 0.012
                                    : size.width * 0.032,
                                child: Container(
                                  width: Provider.of<HomeData>(context).isTablet
                                      ? size.width * 0.035
                                      : size.width * 0.04,
                                  height:
                                      Provider.of<HomeData>(context).isTablet
                                          ? size.width * 0.035
                                          : size.width * 0.04,
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
                            : const SizedBox(),
                      ],
                    ),
                  ),
                  SizedBox(
                    width: size.width * 0.17,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        InkWell(
                          onTap: () {
                            if (FirebaseAuth.instance.currentUser?.uid ==
                                null) {
                              Navigator.of(context).pushNamed('/login');
                            } else {
                              setState(() {
                                page = 5;
                              });
                            }
                          },
                          child: page == 5
                              ? Column(
                                  children: [
                                    Icon(
                                      Iconsax.user4,
                                      size: 23,
                                      color: AppTheme().themeColor,
                                    ),
                                    const SizedBox(
                                      height: 4,
                                    ),
                                    Text(
                                      "Account",
                                      style: TextStyle(
                                        fontSize: 12,
                                          color: AppTheme().themeColor,
                                          fontWeight: FontWeight.w500),
                                    ),
                                  ],
                                )
                              : const Column(
                                  children: [
                                    Icon(
                                      Iconsax.user,
                                      size: 23,
                                    ),
                                    SizedBox(
                                      height: 4,
                                    ),
                                    Text(
                                      "Account",
                                      style: TextStyle(
                                        fontSize: 12,
                                          color: Colors.black,
                                          fontWeight: FontWeight.w500),
                                    ),
                                  ],
                                ),
                        ),
                        const SizedBox(
                          height: 2,
                        ),
                        // Text(
                        //   "Chat",
                        //   style: TextStyle(
                        //       fontSize: 11,
                        //       color: page == 4
                        //           ? AppTheme().secondaryColor
                        //           : const Color(0xff646464)),
                        // )
                      ],
                    ),
                  ),
                  // SizedBox(
                  //   width: size.width * 0.17,
                  //   child: Column(
                  //     mainAxisAlignment: MainAxisAlignment.center,
                  //     crossAxisAlignment: CrossAxisAlignment.center,
                  //     children: [
                  //       InkWell(
                  //         onTap: () {
                  //           setState(() {
                  //             page = 4;
                  //           });
                  //         },
                  //         child: Icon(
                  //           AppIcons.chat,
                  //           color: page == 4
                  //               ? AppTheme().secondaryColor
                  //               : const Color(0xff646464),
                  //           size: 23,
                  //         ),
                  //       ),
                  //       const SizedBox(
                  //         height: 2,
                  //       ),
                  //       Text(
                  //         "Coming Soon",
                  //         style: TextStyle(
                  //             fontSize: 11,
                  //             color: page == 4
                  //                 ? AppTheme().secondaryColor
                  //                 : const Color(0xff646464)),
                  //       )
                  //     ],
                  //   ),
                  // ),
                  // InkWell(
                  //   onTap: () {
                  //     setState(() {
                  //       page = 5;
                  //     });
                  //   },
                  //   child: SizedBox(
                  //     width: size.width * 0.17,
                  //     child: Column(
                  //       mainAxisAlignment: MainAxisAlignment.center,
                  //       crossAxisAlignment: CrossAxisAlignment.center,
                  //       children: [
                  //         InkWell(
                  //           child: Icon(
                  //             AppIcons.farmer,
                  //             color: page == 5
                  //                 ? AppTheme().secondaryColor
                  //                 : const Color(0xff646464),
                  //             size: 23,
                  //           ),
                  //         ),
                  //         const SizedBox(
                  //           height: 2,
                  //         ),
                  //         Text(
                  //           "Farmers",
                  //           style: TextStyle(
                  //               fontSize: 11,
                  //               color: page == 5
                  //                   ? AppTheme().secondaryColor
                  //                   : const Color(0xff646464)),
                  //         )
                  //       ],
                  //     ),
                  //   ),
                  // ),
                ],
              ));
        }),
        body: Builder(
          builder: (context) {
            switch (page) {
              case 1:
                return const Home();
              case 2:
                return const CategoriesScreen();
              case 3:
                return const XTrendingScreen();
              case 4:
                return const CartScreen();
              case 5:
                return const ProfilePage();
              // case 5:
              //   return const FarmersScreen();
              default:
                return const Home();
            }
          },
        ),
      ),
    );
  }
}
