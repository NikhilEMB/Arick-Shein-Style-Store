import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/utils/dynamicLink.dart';
import 'package:shein/widgets/screenHeader.dart';
import 'package:shared_preferences/shared_preferences.dart';

class FarmersScreen extends StatefulWidget {
  const FarmersScreen({super.key});

  @override
  State<FarmersScreen> createState() => _FarmersScreenState();
}

class _FarmersScreenState extends State<FarmersScreen> {
  @override
  void initState() {
    // TODO: implement initState
    Timer(const Duration(milliseconds: 100), () {
      DynamicLinkProvider().initDynamicLink(context: context);
    });
    super.initState();
  }

  Future<dynamic> fetchVendors() async {
    final prefs = await SharedPreferences.getInstance();

    var data = await FirebaseFirestore.instance
        .collection('features')
        .doc('multiVendor')
        .collection('vendors')
        .where('active', isEqualTo: true)
        .get();

    if (data.docs.isEmpty) {
      return [];
    }

    var arr = [];

    for (var element in data.docs) {
      dynamic data = element.data();
      if (prefs.get('region') != null) {
        if (data.containsKey('regionId')) {
          if (data['regionId'] == prefs.get('region').toString().trim()) {
            arr.add({...data, "id": element.id});
          }
        } else {
          arr.add({...data, "id": element.id});
        }
      }
    }

    return arr;
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
          body: Column(
        children: [
          ScreenHeader(
            size: size,
            title: "FARMERS",
            isBackButton: false,
          ),
          Expanded(
            child: SingleChildScrollView(
                child: FutureBuilder(
              future: fetchVendors(),
              builder: (context, snapshot) {
                if (snapshot.hasData == false) {
                  return Container(
                    margin: EdgeInsets.only(top: size.height * 0.4),
                    child: CircularProgressIndicator(
                      color: AppTheme().secondaryColor,
                    ),
                  );
                }
                return Column(children: [
                  ...(snapshot.data?.map((vendor) {
                    return InkWell(
                      onTap: () => Navigator.of(context).pushNamed('/vendor',
                          arguments: {
                            "id": vendor['id'],
                            "vendorName": vendor['displayName']
                          }),
                      child: SizedBox(
                        width: double.infinity,
                        child: Column(
                          children: [
                            Row(
                              children: [
                                SizedBox(
                                  width: size.width * 0.35,
                                  child: Center(
                                    child: Image.network(
                                      vendor?['image']?['mob'],
                                      fit: BoxFit.cover,
                                      errorBuilder:
                                          (context, error, stackTrace) =>
                                              SizedBox(
                                        width: size.width * 0.35,
                                        height: size.width * 0.35,
                                        child: Icon(
                                          Icons.image,
                                          size: size.width * 0.3,
                                          color: const Color.fromARGB(
                                              255, 223, 223, 223),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: size.width * 0.6,
                                  child: Column(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        vendor?['displayName'],
                                        style: const TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.w600,
                                        ),
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                      const SizedBox(
                                        height: 6,
                                      ),
                                      vendor.containsKey('description')
                                          ? Text(
                                              vendor['description'].toString(),
                                              style: const TextStyle(
                                                fontSize: 14,
                                                fontWeight: FontWeight.w500,
                                              ),
                                              maxLines: 2,
                                              overflow: TextOverflow.ellipsis,
                                            )
                                          : const SizedBox(),
                                      const SizedBox(
                                        height: 10,
                                      ),
                                      Row(
                                        children: [
                                          Icon(
                                            Icons.location_pin,
                                            color: AppTheme().secondaryColor,
                                            size: 16,
                                          ),
                                          const SizedBox(width: 3),
                                          Text(
                                            "${vendor?['vendorAddress']['address']['city']}, ${vendor['vendorAddress']['address']['state']}",
                                            maxLines: 1,
                                            overflow: TextOverflow.ellipsis,
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                )
                              ],
                            ),
                            const SizedBox(height: 20),
                          ],
                        ),
                      ),
                    );
                  }).toList())
                ]);
              },
            )),
          ),
          // const Expanded(
          //     child: Center(
          //   child:

          //    InkWell(
          //     // onTap: () async {
          //     //   String link = 'https://shein.in/refer/Bvza3Bje4Tn7YpYA8';

          //     //   final PendingDynamicLinkData? initialLink =
          //     //       await FirebaseDynamicLinks.instance
          //     //           .getDynamicLink(Uri.parse(link));

          //     //   print(initialLink?.link.path.contains('/product-info'));
          //     //   print(initialLink?.link.path
          //     //       .split('/')[initialLink!.link.path.split('/').length - 2]);
          //     // },
          //     child: Text(
          //       'Coming Soon....',
          //       style: TextStyle(fontWeight: FontWeight.bold),
          //     ),
          //   ),
          // )),
        ],
      )),
    );
  }
}
