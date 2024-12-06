import 'dart:io';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shein/constants/constants.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:shein/theme/AppIcons.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/utils/databaseServices.dart';
import 'package:shein/widgets/customNavBar.dart';
import 'package:provider/provider.dart';
import 'package:share/share.dart';
import 'package:url_launcher/url_launcher.dart';

class CustomDrawer extends StatefulWidget {
  final String appVersion;
  const CustomDrawer({super.key, this.appVersion = ""});

  @override
  State<CustomDrawer> createState() => _CustomDrawerState();
}

class _CustomDrawerState extends State<CustomDrawer> {
  bool isCategoryOpen = false;
  bool isSubCategoryOpen = false;
  String selectedCategory = "";
  bool isWalletActive = false;

  var isLogin;
  getLogin() async {
    setState(() {
      isLogin = FirebaseAuth.instance.currentUser?.uid;
    });
  }

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
    getLogin();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Container(
      color: Colors.white,
      height: size.height,
      width: size.width * 0.85,
      child: Column(
        children: [
          const SizedBox(
            height: 20,
          ),
          Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'SHEIN',
                  style: GoogleFonts.montserrat(
                      textStyle: const TextStyle(
                          fontSize: 26, fontWeight: FontWeight.w700, letterSpacing: 2.5)),
                ),
                Text(
                  'STYLE STORES',
                  style: GoogleFonts.montserrat(
                      textStyle: TextStyle(
                          fontSize: 9,
                          fontWeight: FontWeight.w600,
                          letterSpacing: -0.2,
                          color: AppTheme().mainColor)),
                )
              ],
            ),
          const SizedBox(
            height: 20,
          ),
          FirebaseAuth.instance.currentUser?.uid == null
              ? Row(
                  children: [
                    const Expanded(
                      child: Divider(color: Colors.grey),
                    ),
                    InkWell(
                      onTap: () {
                        Navigator.of(context).pushNamed('/login');
                      },
                      child: Container(
                        decoration: BoxDecoration(
                            color: AppTheme().secondaryColor,
                            borderRadius: BorderRadius.circular(5)),
                        height: size.width * 0.12,
                        padding: const EdgeInsets.symmetric(horizontal: 5),
                        child: const Padding(
                          padding: EdgeInsets.all(8.0),
                          child: Center(
                            child: Text(
                              "Login / Signup",
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                        ),
                      ),
                    ),
                    const Expanded(
                      child: Divider(color: Colors.grey),
                    ),
                  ],
                )
              : const SizedBox(),
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
                          } else if (e['name'] == 'My Orders') {
                            if (FirebaseAuth.instance.currentUser?.uid ==
                                null) {
                              Navigator.of(context).pushNamed('/login');
                            } else {
                              Navigator.of(context, rootNavigator: true)
                                  .pushAndRemoveUntil(
                                CupertinoPageRoute(
                                  builder: (context) => const CustomNavBar(
                                    pageNum: 3,
                                    // number: _textEditingController.text,
                                    // verificationCode: _verificationCode!,
                                  ),
                                ),
                                (route) =>
                                    route.isFirst ||
                                    route.settings.name == '/home',
                              );
                              // Navigator.of(context).pushNamed(e['path']);
                            }
                          } else if (e['name'] == 'My Cart') {
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
                              vertical: Provider.of<HomeData>(context).isTablet
                                  ? 10
                                  : 5),
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
                                                      color: AppTheme().themeColor,
                                                    ),
                                                    const SizedBox(
                                                      width: 10,
                                                    ),
                                                    Text(
                                                      e['name'],
                                                    ),
                                                    
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
                                                                ? Icons.remove
                                                                : Icons.add),
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
                                                  builder: (context, snapshot) {
                                                    print(snapshot.data);
                                                    if (snapshot.hasData) {
                                                      return SizedBox(
                                                        width: double.infinity,
                                                        child: Column(
                                                          crossAxisAlignment:
                                                              CrossAxisAlignment
                                                                  .start,
                                                          children: [
                                                            ...(snapshot.data!
                                                                .map(
                                                                    (category) {
                                                              return Column(
                                                                crossAxisAlignment:
                                                                    CrossAxisAlignment
                                                                        .start,
                                                                children: [
                                                                  Container(
                                                                    padding: const EdgeInsets
                                                                            .symmetric(
                                                                        vertical:
                                                                            10),
                                                                    margin: const EdgeInsets
                                                                            .only(
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
                                                                        bottom: BorderSide(
                                                                            color:
                                                                                AppTheme().secondaryColor,
                                                                            width: 1),
                                                                      ),
                                                                    ),
                                                                    child: Row(
                                                                      children: [
                                                                        Expanded(
                                                                          child:
                                                                              InkWell(
                                                                            onTap:
                                                                                () {
                                                                              Navigator.of(context).pushNamed('/categoryProducts', arguments: {
                                                                                "categoryData": category,
                                                                                "categoryName": category['name']
                                                                              });
                                                                            },
                                                                            child:
                                                                                Container(
                                                                              child: Text(
                                                                                category['name'],
                                                                                overflow: TextOverflow.ellipsis,
                                                                                maxLines: 1,
                                                                              ),
                                                                            ),
                                                                          ),
                                                                        ),
                                                                        category.containsKey('isSubcategories') &&
                                                                                category['isSubcategories']
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
                                                                  category.containsKey(
                                                                              'isSubcategories') &&
                                                                          category[
                                                                              'isSubcategories'] &&
                                                                          isSubCategoryOpen &&
                                                                          selectedCategory !=
                                                                              '' &&
                                                                          selectedCategory ==
                                                                              category['id']
                                                                      ? FutureBuilder(
                                                                          future:
                                                                              DatabaseService().fetchSubCategories(selectedCategory),
                                                                          builder:
                                                                              (context, snapshot) {
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
          SizedBox(
            width: size.width * 0.7,
            child: ElevatedButton(
              onPressed: () {
               
              },
              style: ElevatedButton.styleFrom(
                primary: Colors.black,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15),
                ),
              ),
              child:  Row(
                children: [
                  SvgPicture.asset(
                          'assets/Icons/whatsapp.svg',
                          // color: AppTheme().secondaryColor,
                          width: size.width * 0.08,
                        ),
                        const SizedBox(
                          width: 10,
                        ),
                  Text(
                    'Chat with us on WhatsApp',
                    style: GoogleFonts.montserrat(
                      fontSize: 11,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
          ),
          // create a row of 5 svg icons for social media and add on tap urls for them 
          const SizedBox(height: 10,),
          Row(
            // svg
            mainAxisAlignment: MainAxisAlignment.center,
            // crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: SvgPicture.asset(
                            'assets/Icons/facebook.svg',
                            // color: AppTheme().secondaryColor,
                            width: size.width * 0.09,
                          ),
              ),
                        
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: SvgPicture.asset(
                            'assets/Icons/twitter.svg',
                            // color: AppTheme().secondaryColor,
                            width: size.width * 0.09,
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Image.asset(
                            'assets/Icons/instagram.png',
                            width: size.width * 0.09,
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Image.asset(
                            'assets/Icons/youtube.png',
                            width: size.width * 0.09,
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: ClipRRect(
                            borderRadius: BorderRadius.all(Radius.circular(10)),
                            child: Image.asset(
                              'assets/Icons/snapchat.png',
                              width: size.width * 0.09,
                            ),
                          ),
                        ),
                        
                        
            ],
          ),
          const SizedBox(
            height: 10,
          )
          
        ],
      ),
    );
  }
}
