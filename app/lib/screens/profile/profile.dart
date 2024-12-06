import 'dart:async';
import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shein/constants/constants.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:shein/providers/userProvider.dart';
import 'package:shein/theme/AppIcons.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/utils/databaseServices.dart';
import 'package:shein/utils/dynamicLink.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import 'package:share/share.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';

class ProfilePage extends StatefulWidget {
  final String? appVersion;
  const ProfilePage({super.key, this.appVersion});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  String appVersion = '';
  bool isCategoryOpen = false;
  bool isSubCategoryOpen = false;
  String selectedCategory = "";
  XFile? myImage;
  bool isWalletActive = false;

  getWalletStatus() async {
    var res = await DatabaseService().getWalletStatus();
    setState(() {
      isWalletActive = res;
    });
  }

  @override
  void initState() {
    super.initState();

    getWalletStatus();

    Provider.of<Auth>(context, listen: false).fetchUser('');
    fetchAppVersion();
    _controller = AnimationController(vsync: this);
    Timer(const Duration(milliseconds: 100), () {
      DynamicLinkProvider().initDynamicLink(context: context);
    });
  }

  fetchAppVersion() async {
    var res = await Constants().getAppVersion();
    setState(() {
      appVersion = res;
    });
  }

  Future<void> removeDeviceToken() async {
    if (FirebaseAuth.instance.currentUser?.uid != null) {
      List<dynamic> availbleTokens = await FirebaseFirestore.instance
          .collection('users')
          .doc(FirebaseAuth.instance.currentUser?.uid)
          .get()
          .then((value) {
        if (value.exists) {
          var data = value.data();
          if (data!.containsKey('deviceTokens')) {
            return data['deviceTokens'];
          } else {
            return [];
          }
        } else {
          return [];
        }
      });

      FirebaseMessaging messaging = FirebaseMessaging.instance;

      NotificationSettings settings = await messaging.requestPermission(
        alert: true,
        badge: true,
        sound: true,
      );

      if (settings.authorizationStatus == AuthorizationStatus.authorized) {
        String? token = await messaging.getToken();
        debugPrint('Added Tokens : ${availbleTokens.toList()}');
        debugPrint('Device Token: $token');
        if (availbleTokens.contains(token)) {
          var index = availbleTokens.indexOf(token);
          availbleTokens.removeAt(index);
          // availbleTokens.add(token ?? "");
          await FirebaseFirestore.instance
              .collection('users')
              .doc(FirebaseAuth.instance.currentUser?.uid)
              .set({'deviceTokens': availbleTokens}, SetOptions(merge: true));
        }
      }
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.white,
          elevation: 0,
          centerTitle: true,
          title: Text(
            'My Account',
            style: AppTheme().outfitStyle(
              color: Colors.black,
              fontSize: 18,
              fontWeight: FontWeight.w600,
            ),
          ),
          actions: const [
            // InkWell(
            //   onTap: () {},
            //   child: SvgPicture.asset('assets/Icons/notification.svg'),
            //   // child: const Icon(
            //   //   Icons.notifications,
            //   //   color: Colors.black,
            //   // ),
            // )
          ],
        ),
        body: Container(
          color: Colors.white,
          child: Column(
            children: [
              SizedBox(
                width: MediaQuery.of(context).size.width / 3,
                height: MediaQuery.of(context).size.height / 8,
                child: Center(
                  child: Container(
                    // height: 125,
                    // width: 125,
                    decoration: BoxDecoration(
                      border:
                          Border.all(color: AppTheme().themeColor, width: 4),
                      shape: BoxShape.circle,
                      image: DecorationImage(
                          fit: BoxFit.cover,
                          image: myImage != null
                              ? FileImage(File(myImage!.path)) as ImageProvider
                              : Provider.of<Auth>(context).userData['dP'] ==
                                      "assets/img/user-pic.gif"
                                  ? const NetworkImage(
                                      'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg')
                                  : Provider.of<Auth>(context).userData['dP'] !=
                                          'assets/img/user-pic.gif'
                                      ? NetworkImage(Provider.of<Auth>(context)
                                          .userData['dP'])
                                      : const NetworkImage(
                                          'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg')
                          // : image == 'assets/img/user-pic.gif'
                          //     ? NetworkImage(
                          //         'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg')
                          //     : image == null
                          //         ? NetworkImage(
                          //             'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg')
                          //         : NetworkImage(
                          //             'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'),
                          ),
                    ),
                  ),
                ),
              ),
              // Stack(
              //   children: [
              //     Column(
              //       children: [
              //         Container(
              //           width: double.infinity,
              //           height: size.height * 0.15,
              //           color: AppTheme().themeColor.withOpacity(0.4),
              //         ),
              //         Container(
              //           width: double.infinity,
              //           height: size.height * 0.08,
              //           // height: 100,
              //           color: Colors.white,
              //         ),
              //       ],
              //     ),
              //     // Positioned(
              //     //   top: -20,
              //     //   left: MediaQuery.of(context).size.width * 0.25,
              //     //   child: Container(
              //     //     width: MediaQuery.of(context).size.width / 2,
              //     //     height: MediaQuery.of(context).size.height / 3,
              //     //     child: Center(
              //     //       child: Container(
              //     //         height: 125,
              //     //         width: 125,
              //     //         decoration: BoxDecoration(
              //     //           shape: BoxShape.circle,
              //     //           image: DecorationImage(
              //     //               fit: BoxFit.cover,
              //     //               image: myImage != null
              //     //                   ? FileImage(File(myImage!.path))
              //     //                       as ImageProvider
              //     //                   : Provider.of<Auth>(context)
              //     //                               .userData['dP'] ==
              //     //                           "assets/img/user-pic.gif"
              //     //                       ? const NetworkImage(
              //     //                           'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg')
              //     //                       : Provider.of<Auth>(context)
              //     //                                   .userData['dP'] !=
              //     //                               'assets/img/user-pic.gif'
              //     //                           ? NetworkImage(
              //     //                               Provider.of<Auth>(context)
              //     //                                   .userData['dP'])
              //     //                           : const NetworkImage(
              //     //                               'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg')
              //     //               // : image == 'assets/img/user-pic.gif'
              //     //               //     ? NetworkImage(
              //     //               //         'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg')
              //     //               //     : image == null
              //     //               //         ? NetworkImage(
              //     //               //             'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg')
              //     //               //         : NetworkImage(
              //     //               //             'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'),
              //     //               ),
              //     //         ),
              //     //       ),
              //     //     ),
              //     //   ),
              //     // )
              //   ],
              // ),
              // const SizedBox(
              //   height: 20,
              // ),
              // Padding(
              //   padding: const EdgeInsets.symmetric(horizontal: 8.0),
              //   child: SizedBox(
              //       // width: size.width * 0.4,
              //       // child: Row(
              //       //   children: [
              //       //     InkWell(
              //       //         onTap: () {
              //       //           Navigator.popAndPushNamed(context, "/home");
              //       //         },
              //       //         child: Icon(Icons.arrow_back)),
              //       //     Expanded(
              //       //         child: SizedBox(
              //       //       child: Image.asset(
              //       //         'assets/images/logo.png',
              //       //         width: size.width * 0.4,
              //       //         height: Provider.of<HomeData>(context).isTablet
              //       //             ? 100
              //       //             : 40,
              //       //       ),
              //       //     )),
              //       //   ],
              //       // ),
              //       ),
              // ),
              // const SizedBox(
              //   height: 10,
              // ),
              FirebaseAuth.instance.currentUser?.uid == null
                  ? Column(
                      children: [
                        TextButton(
                          onPressed: () {},
                          child: const Text(
                            "Login / Signup",
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                        // const Expanded(
                        //   child: Divider(color: Colors.grey),
                        // ),
                        // Container(
                        //   decoration: BoxDecoration(
                        //       color: AppTheme().secondaryColor,
                        //       borderRadius: BorderRadius.circular(5)),
                        //   height: Provider.of<HomeData>(context).isTablet
                        //       ? size.width * 0.07
                        //       : size.width * 0.12,
                        //   padding: const EdgeInsets.symmetric(horizontal: 5),
                        //   child: TextButton(
                        //     onPressed: () {},
                        //     child: const Text(
                        //       "Login / Signup",
                        //       style: TextStyle(color: Colors.white),
                        //     ),
                        //   ),
                        // ),
                        // const Expanded(
                        //   child: Divider(color: Colors.grey),
                        // ),
                      ],
                    )
                  : Column(
                      children: [
                        // const Expanded(
                        //   child: Divider(color: Colors.grey),
                        // ),
                        Consumer<Auth>(
                          builder: (context, value, child) {
                            return Column(
                              children: [
                                const SizedBox(
                                  height: 10,
                                ),
                                Text(
                                  "Welcome ${value.userData != null ? value.userData['name'] : ''}",
                                  style: AppTheme().outfitStyle(
                                      color: Colors.black,
                                      fontSize: Provider.of<HomeData>(context)
                                              .isTablet
                                          ? size.width * 0.03
                                          : size.width * 0.04),
                                ),
                                const SizedBox(
                                  height: 4,
                                ),
                                // Text(
                                //   "${value.userData != null ? value.userData['email'] : ''}",
                                //   style: AppTheme().outfitStyle(
                                //       color: Colors.black,
                                //       fontSize: Provider.of<HomeData>(context)
                                //               .isTablet
                                //           ? size.width * 0.03
                                //           : size.width * 0.04),
                                // ),
                                Text(
                                  '${value.userData['email']}',
                                  style: AppTheme().outfitStyle(
                                      fontSize: 14,
                                      fontWeight: FontWeight.w300),
                                )
                              ],
                            );
                            // Container(
                            //   decoration: BoxDecoration(
                            //       color: AppTheme().secondaryColor,
                            //       borderRadius: BorderRadius.circular(20)),
                            //   height: Provider.of<HomeData>(context).isTablet
                            //       ? size.width * 0.08
                            //       : size.width * 0.12,
                            //   padding: const EdgeInsets.symmetric(horizontal: 5),
                            //   child: TextButton(
                            //     onPressed: () {},
                            //     child: Text(
                            //       "Welcome ${value.userData != null ? value.userData['name'] : ''}",
                            //       style: TextStyle(
                            //           color: Colors.white,
                            //           fontSize:
                            //               Provider.of<HomeData>(context).isTablet
                            //                   ? size.width * 0.02
                            //                   : size.width * 0.03),
                            //     ),
                            //   ),
                            // );
                          },
                        ),
                        // const Expanded(
                        //   child: Divider(color: Colors.grey),
                        // ),
                      ],
                    ),
              const SizedBox(
                height: 10,
              ),
              Expanded(
                child: SingleChildScrollView(
                  child: Padding(
                    padding: const EdgeInsets.only(left: 10),
                    child: Column(
                      children: [
                        ...(Constants().sidebarDrawer.map((e) {
                          return InkWell(
                            onTap: () async {
                              if (e['type'] == "wallet") {
                                if (FirebaseAuth.instance.currentUser?.uid ==
                                    null) {
                                  Navigator.of(context).pushNamed('/login');
                                } else {
                                  Navigator.pushNamed(context, e['path']);
                                }
                              } else if (e['name'] == 'Home') {
                                Navigator.of(context).pushNamedAndRemoveUntil(
                                    e['path'], (route) => false);
                              } else if (e['name'] == "Call shein") {
                                final Uri url = Uri(
                                  scheme: 'tel',
                                  path: "+919611951039",
                                );

                                if (await canLaunchUrl(url)) {
                                  await launchUrl(url);
                                } else {
                                  Fluttertoast.showToast(
                                      msg: 'Cannot make a call right now.');
                                }
                              } else if (e['name'] == 'Profile') {
                                if (FirebaseAuth.instance.currentUser?.uid ==
                                    null) {
                                  Navigator.of(context).pushNamed('/login');
                                } else {
                                  Navigator.of(context).pushNamed(e['path']);
                                }
                                // .pushNamedAndRemoveUntil(
                                //     e['path'], (route) => false);
                              } else if (e['name'] == 'share') {
                                if (Platform.isIOS) {
                                  Share.share('iosLink');
                                } else {
                                  Share.share('adnroidLink');
                                } //
                              } else if (e['name'] == 'Categories') {
                                // Navigator.of(context).pushNamed(e['path']);
                              }
                              // else if (e['name'] == 'My Orders') {
                              //   if (FirebaseAuth.instance.currentUser?.uid ==
                              //       null) {
                              //     Navigator.of(context).pushNamed('/login');
                              //   } else {
                              //     Navigator.of(context, rootNavigator: true)
                              //         .pushAndRemoveUntil(
                              //       CupertinoPageRoute(
                              //         builder: (context) => const CustomNavBar(
                              //           pageNum: 3,
                              //           // number: _textEditingController.text,
                              //           // verificationCode: _verificationCode!,
                              //         ),
                              //       ),
                              //       (route) =>
                              //           route.isFirst ||
                              //           route.settings.name == '/home',
                              //     );
                              //     // Navigator.of(context).pushNamed(e['path']);
                              //   }
                              // }
                              else if (e['name'] == 'My Cart') {
                                if (FirebaseAuth.instance.currentUser?.uid ==
                                    null) {
                                  Navigator.of(context).pushNamed('/login');
                                } else {
                                  Navigator.of(context).pushNamed(e['path']);
                                }
                              } else if (e['name'] == 'My Addresses') {
                                if (FirebaseAuth.instance.currentUser?.uid ==
                                    null) {
                                  Navigator.of(context).pushNamed('/login');
                                } else {
                                  Navigator.of(context).pushNamed(e['path'],
                                      arguments: {"navigatePop": true});
                                }
                              } else if (e['name'] == 'Contact us') {
                                if (FirebaseAuth.instance.currentUser?.uid ==
                                    null) {
                                  Navigator.of(context).pushNamed('/login');
                                } else {
                                  Navigator.of(context).pushNamed(e['path']);
                                }
                              } else if (e['name'] == 'Terms & Policies') {
                                if (FirebaseAuth.instance.currentUser?.uid ==
                                    null) {
                                  Navigator.of(context).pushNamed('/login');
                                } else {
                                  Navigator.of(context).pushNamed(e['path']);
                                }
                              } else if (e['name'] == 'About us') {
                                if (FirebaseAuth.instance.currentUser?.uid ==
                                    null) {
                                  Navigator.of(context).pushNamed('/login');
                                } else {
                                  Navigator.of(context).pushNamed(e['path']);
                                }
                              } else {
                                if (FirebaseAuth.instance.currentUser?.uid ==
                                    null) {
                                  Navigator.of(context).pushNamed('/login');
                                } else {
                                  Navigator.of(context).pushNamed(e['path']);
                                }
                              }
                            },
                            child: Container(
                              width: double.infinity,
                              padding: EdgeInsets.symmetric(
                                  vertical:
                                      Provider.of<HomeData>(context).isTablet
                                          ? 7
                                          : 10),
                              child: e['type'] != "social"
                                  ? e['type'] == "wallet"
                                      ? isWalletActive
                                          ? Container(
                                              margin: const EdgeInsets.only(top: 15),
                                              child: Row(
                                                children: [
                                                  Expanded(
                                                    child: Row(
                                                      children: [
                                                        Icon(
                                                          e['icon'],
                                                          weight: 1,
                                                          size: 30,
                                                      color: AppTheme().themeColor,
                                                        ),
                                                        const SizedBox(
                                                          width: 10,
                                                        ),
                                                        Text(
                                                          e['name'],
                                                        ),
                                                        const Spacer(),
                                                        
                                                          Icon(
                                                            e['suffixicon'],
                                                            weight: 0.5,
                                                          ),
                                                        
                                                        const SizedBox(width: 10,),

                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            )
                                          : const SizedBox(
                                              height: 0,
                                            )
                                      : Container(
                                          margin: const EdgeInsets.only(top: 15),
                                          child: Column(
                                            children: [
                                              Row(
                                                children: [
                                                  Expanded(
                                                    child: Row(
                                                      children: [
                                                        Icon(
                                                          e['icon'],
                                                          size: 30,
                                                      color: AppTheme().themeColor,
                                                          weight: 1,
                                                        ),
                                                        const SizedBox(
                                                          width: 10,
                                                        ),
                                                        Text(
                                                          e['name'],
                                                        ),
                                                        const Spacer(),
                                                    Icon(
                                                      e['suffixicon'],
                                                      weight: 1,
                                                    ),
                                                    const SizedBox(width: 10,)
                                                      ],
                                                    ),
                                                  ),
                                                  e['isExpandable']
                                                      ? InkWell(
                                                          onTap: () {
                                                            setState(() {
                                                              isCategoryOpen =
                                                                  !isCategoryOpen;
                                                            });
                                                          },
                                                          child: Padding(
                                                            padding:
                                                                const EdgeInsets
                                                                        .only(
                                                                    right: 8.0),
                                                            child: Icon(
                                                                isCategoryOpen
                                                                    ? Icons
                                                                        .remove
                                                                    : Icons
                                                                        .add),
                                                          ),
                                                        )
                                                      : const SizedBox()
                                                ],
                                              ),
                                              e['name'] == "Categories" &&
                                                      isCategoryOpen
                                                  ? FutureBuilder(
                                                      future: DatabaseService()
                                                          .fetchCategories(),
                                                      builder:
                                                          (context, snapshot) {
                                                        print(snapshot.data);
                                                        if (snapshot.hasData) {
                                                          return SizedBox(
                                                            width:
                                                                double.infinity,
                                                            child: Column(
                                                              crossAxisAlignment:
                                                                  CrossAxisAlignment
                                                                      .start,
                                                              children: [
                                                                ...(snapshot
                                                                    .data!
                                                                    .map(
                                                                        (category) {
                                                                  return Column(
                                                                    crossAxisAlignment:
                                                                        CrossAxisAlignment
                                                                            .start,
                                                                    children: [
                                                                      Container(
                                                                        padding:
                                                                            const EdgeInsets.symmetric(vertical: 10),
                                                                        margin: const EdgeInsets.only(
                                                                            bottom:
                                                                                5),
                                                                        width: double
                                                                            .infinity,
                                                                        decoration:
                                                                            BoxDecoration(
                                                                          // color: Colors
                                                                          //     .yellow,
                                                                          border:
                                                                              Border(
                                                                            bottom:
                                                                                BorderSide(color: AppTheme().secondaryColor, width: 1),
                                                                          ),
                                                                        ),
                                                                        child:
                                                                            Row(
                                                                          children: [
                                                                            Expanded(
                                                                              child: InkWell(
                                                                                onTap: () {
                                                                                  Navigator.of(context).pushNamed('/categoryProducts', arguments: {
                                                                                    "categoryData": category,
                                                                                    "categoryName": category['name']
                                                                                  });
                                                                                },
                                                                                child: Container(
                                                                                  child: Text(
                                                                                    category['name'],
                                                                                    overflow: TextOverflow.ellipsis,
                                                                                    maxLines: 1,
                                                                                  ),
                                                                                ),
                                                                              ),
                                                                            ),
                                                                            category.containsKey('isSubcategories') && category['isSubcategories']
                                                                                ? InkWell(
                                                                                    onTap: () {
                                                                                      if (selectedCategory != '' && isSubCategoryOpen) {
                                                                                        setState(() {
                                                                                          selectedCategory = "";
                                                                                          isSubCategoryOpen = false;
                                                                                        });
                                                                                      } else {
                                                                                        setState(() {
                                                                                          selectedCategory = category['id'];
                                                                                          isSubCategoryOpen = true;
                                                                                        });
                                                                                      }
                                                                                    },
                                                                                    child: Container(
                                                                                      padding: const EdgeInsets.only(right: 5, left: 5, top: 5, bottom: 5),
                                                                                      child: RotatedBox(
                                                                                        quarterTurns: isSubCategoryOpen && selectedCategory == category['id'] ? 2 : 0,
                                                                                        child: const Icon(
                                                                                          AppIcons.down_arrow,
                                                                                          size: 20,
                                                                                        ),
                                                                                      ),
                                                                                    ),
                                                                                  )
                                                                                : const SizedBox()
                                                                          ],
                                                                        ),
                                                                      ),
                                                                      category.containsKey('isSubcategories') &&
                                                                              category['isSubcategories'] &&
                                                                              isSubCategoryOpen &&
                                                                              selectedCategory != '' &&
                                                                              selectedCategory == category['id']
                                                                          ? FutureBuilder(
                                                                              future: DatabaseService().fetchSubCategories(selectedCategory),
                                                                              builder: (context, snapshot) {
                                                                                if (snapshot.hasData) {
                                                                                  return Container(
                                                                                    child: Column(
                                                                                      crossAxisAlignment: CrossAxisAlignment.start,
                                                                                      children: [
                                                                                        ...(snapshot.data!.map((subCat) {
                                                                                          return InkWell(
                                                                                            onTap: () {
                                                                                              // selectedSubCategory
                                                                                              Navigator.of(context).pushNamed('/categoryProducts', arguments: {
                                                                                                "categoryData": category,
                                                                                                "categoryName": category['name'],
                                                                                                "selectedSubCategory": subCat['id']
                                                                                              });
                                                                                            },
                                                                                            child: Container(
                                                                                              padding: const EdgeInsets.only(top: 10, bottom: 10, left: 15),
                                                                                              margin: const EdgeInsets.only(bottom: 5),
                                                                                              width: double.infinity,
                                                                                              decoration: BoxDecoration(
                                                                                                // color: Colors
                                                                                                //     .yellow,
                                                                                                border: Border(
                                                                                                  bottom: BorderSide(color: AppTheme().secondaryColor, width: 1),
                                                                                                ),
                                                                                              ),
                                                                                              child: Text(subCat['name']),
                                                                                            ),
                                                                                          );
                                                                                        }).toList())
                                                                                      ],
                                                                                    ),
                                                                                  );
                                                                                } else {
                                                                                  return Center(
                                                                                    child: SizedBox(
                                                                                        width: 25,
                                                                                        height: 25,
                                                                                        child: CircularProgressIndicator(
                                                                                          color: AppTheme().secondaryColor,
                                                                                        )),
                                                                                  );
                                                                                }
                                                                              },
                                                                            )
                                                                          : const SizedBox()
                                                                    ],
                                                                  );
                                                                }))
                                                              ],
                                                            ),
                                                          );
                                                        } else {
                                                          return Center(
                                                            child: SizedBox(
                                                              width: 25,
                                                              height: 25,
                                                              child:
                                                                  CircularProgressIndicator(
                                                                color: AppTheme()
                                                                    .secondaryColor,
                                                              ),
                                                            ),
                                                          );
                                                        }
                                                      },
                                                    )
                                                  : const SizedBox(),
                                            ],
                                          ),
                                        )
                                  : const SizedBox(),
                            ),
                          );
                        }).toList()),
                      ],
                    ),
                  ),
                ),
              ),
              const Divider(
                color: Colors.grey,
              ),
              FirebaseAuth.instance.currentUser?.uid == null
                  ? Container(
                      width: double.infinity,
                      padding:
                          const EdgeInsets.only(bottom: 20, top: 6, left: 15),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                              "App Version ${widget.appVersion ?? ''}"),
                        ],
                      ),
                    )
                  : Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          InkWell(
                            onTap: () async {
                              removeDeviceToken();

                              showDialog(
                                  context: context,
                                  builder: (context) {
                                    return AlertDialog(
                                      title: const Text('Logout!'),
                                      content: const Text(
                                          'Are you sure you want to log out?'),
                                      actions: [
                                        TextButton(
                                            onPressed: () {
                                              Navigator.pop(context);
                                            },
                                            child: Text('Cancel',
                                                style: TextStyle(
                                                  color:
                                                      AppTheme().secondaryColor,
                                                ))),
                                        TextButton(
                                            onPressed: () async {
                                              FirebaseAuth.instance.signOut();
                                              SharedPreferences prefs =
                                                  await SharedPreferences
                                                      .getInstance();
                                              setState(() {
                                                prefs.clear();
                                              });
                                              Provider.of<Auth>(context,
                                                      listen: false)
                                                  .logoutUser();
                                              Navigator.pop(context);
                                              Navigator.of(context)
                                                  .pushNamedAndRemoveUntil(
                                                '/home',
                                                (route) =>
                                                    route.isFirst ||
                                                    route.settings.name ==
                                                        '/home',
                                              );
                                            },
                                            child: Text('Ok',
                                                style: TextStyle(
                                                  color:
                                                      AppTheme().secondaryColor,
                                                )))
                                      ],
                                    );
                                  });
                            },
                            child: const Wrap(
                              crossAxisAlignment: WrapCrossAlignment.center,
                              children: [
                                Icon(Icons.logout),
                                SizedBox(width: 4),
                                Text('Logout')
                              ],
                            ),
                          ),
                          // Text(
                          //     "App Version ${appVersion ?? ''}"),
                        ],
                      ),
                    )
            ],
          ),
        ),
      ),
    );
  }
}
