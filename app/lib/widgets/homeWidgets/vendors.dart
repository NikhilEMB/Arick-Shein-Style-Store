import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/loadingSkeleton.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class VendorsWidget extends StatefulWidget {
  final String title;
  final String widgetId;
  final int index;
  final bool isHome;

  final Size size;
  const VendorsWidget({
    super.key,
    required this.title,
    required this.widgetId,
    required this.size,
    required this.index,
    this.isHome = true,
  });

  @override
  State<VendorsWidget> createState() => _VendorsWidgetState();
}

class _VendorsWidgetState extends State<VendorsWidget> {
  List<dynamic> vendors = [];

  getVendorsOnDemand() async {
    final prefs = await SharedPreferences.getInstance();
    var categoryIdsList = await FirebaseFirestore.instance
        .collection('widgets')
        .doc(widget.widgetId)
        .get()
        .then((value) {
      if (value.exists) {
        return value.data()?['vendorsList'];
      }
    });
    var arr = [];

    for (var catId in categoryIdsList) {
      await FirebaseFirestore.instance
          .collection("features")
          .doc("multiVendor")
          .collection("vendors")
          .doc(catId)
          .get()
          .then((value) {
        if (value.exists) {
          dynamic data = value.data();
          if (prefs.get('region') != null) {
            if (data.containsKey('regionId')) {
              if (data['regionId'] == prefs.get('region').toString().trim()) {
                arr.add({...data, "id": catId});
              }
            } else {
              arr.add({...data, "id": catId});
            }
          }
        }
      });
    }

    setState(() {
      vendors = arr;
    });
  }

  // fetchVendors() async {
  //   if (vendors.isEmpty) {
  //     if (widget.isHome == false) {
  //       await getVendorsOnDemand();
  //       return;
  //     }
  //     if (Provider.of<HomeData>(context, listen: false).homeListData.isEmpty) {
  //       await getVendorsOnDemand();
  //     } else {
  //       var newList = Provider.of<HomeData>(context, listen: false)
  //           .homeListData
  //           .where((e) => e['id'] == widget.widgetId)
  //           .toList();
  //       if (newList.isEmpty) {
  //         await getVendorsOnDemand();
  //       } else {
  //         setState(() {
  //           vendors = newList[0]['data'];
  //         });
  //       }
  //     }
  //   }
  // }

  @override
  void initState() {
    // TODO: implement initState
    if (!widget.isHome) {
      getVendorsOnDemand();
    }
    // fetchVendors();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    if (widget.isHome && Provider.of<HomeData>(context).isVendorsLoading) {
      return skeletonLoader(context, widget.title);
    }

    if (widget.isHome &&
        Provider.of<HomeData>(context)
            .homeListData
            .where((e) => e['id'] == widget.widgetId)
            .toList()
            .isEmpty) {
      return const SizedBox();
    }

    if (widget.isHome &&
        Provider.of<HomeData>(context)
            .homeListData
            .where((e) => e['id'] == widget.widgetId)
            .toList()[0]['data']
            .isEmpty) {
      return const SizedBox();
    }

    if (!widget.isHome && vendors.isEmpty) {
      return const SizedBox();
    }

    var data = widget.isHome
        ? Provider.of<HomeData>(context)
            .homeListData
            .where((e) => e['id'] == widget.widgetId)
            .toList()[0]['data']
        : vendors;

    return Container(
      margin: const EdgeInsets.only(bottom: 20),

      // padding: const EdgeInsets.symmetric(horizontal: 15),
      width: double.infinity,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 15),
            child: Text(
              widget.title,
              style: const TextStyle(fontSize: 19, fontWeight: FontWeight.bold),
            ),
          ),
          const SizedBox(
            height: 10,
          ),
          Padding(
            padding: const EdgeInsets.only(right: 10),
            child: Column(
              children: [
                ...(data.map((vendor) {
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
                                  ),
                                ),
                              ),
                              SizedBox(
                                width: size.width * 0.6,
                                child: Column(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      vendor['displayName'].toString(),
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
                                    Text(
                                      vendor['description'].toString(),
                                      style: const TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.w500,
                                      ),
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                    ),
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
                                          "${vendor['vendorAddress']['address']['city']}, ${vendor['vendorAddress']['address']['state']}",
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
              ],
            ),
          ),
        ],
      ),
    );
  }
}
