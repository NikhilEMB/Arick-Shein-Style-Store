import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:intl/intl.dart';
import '../../constants/constants.dart';
import '../../screens/myOrders/viewOrders.dart';
import '../../theme/AppTheme.dart';
import '../../utils/dynamicLink.dart';
import '../../widgets/screenHeader.dart';
import 'package:shared_preferences/shared_preferences.dart';

class MyOrders extends StatefulWidget {
  const MyOrders({super.key});

  @override
  State<MyOrders> createState() => _MyOrdersState();
}

class _MyOrdersState extends State<MyOrders> {
  bool isLoading = false;

  // fetchUserOrders() async {
  //   setState(() {
  //     isLoading = true;
  //   });
  //   await Provider.of<AppProvider>(context).fetchUserOrders();
  //   setState(() {
  //     isLoading = false;
  //   });
  // }

  fetchUserOrders() async {
    final prefs = await SharedPreferences.getInstance();
    // print(prefs.get('region'));
  }

  @override
  void initState() {
    fetchUserOrders();
    // print('Uid is : ${FirebaseAuth.instance.currentUser?.uid}');
    Timer(const Duration(milliseconds: 100), () {
      DynamicLinkProvider().initDynamicLink(context: context);
    });
    super.initState();
  }

  // @override
  // void didChangeDependencies() {
  //   // TODO: implement didChangeDependencies
  //   if (Provider.of<AppProvider>(context).userOrders.isEmpty &&
  //       FirebaseAuth.instance.currentUser?.uid != null) {
  //     fetchUserOrders();
  //   }
  //   super.didChangeDependencies();
  // }

  Widget getImageWidget(data) {
    String placeholderImageUrl =
        'https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-19.jpg';

    if (data['products'][0]['img'] is String) {
      String imageUrl = data['products'][0]['img'];
      return Image.network(
        imageUrl,
        errorBuilder: (context, error, stackTrace) {
          // Display the placeholder image if the main image fails to load
          return Image.network(placeholderImageUrl);
        },
      );
    }

    if (data['products'][0].containsKey('img') &&
        data['products'][0]['img'].containsKey('thumb')) {
      String imageUrl = data['products'][0]['img']['thumb'];
      return Image.network(
        imageUrl,
        errorBuilder: (context, error, stackTrace) {
          // Display the placeholder image if the thumbnail image fails to load
          return Image.network(placeholderImageUrl);
        },
      );
    }

    // Display the placeholder image if no valid image URLs are available
    return Image.network(placeholderImageUrl);
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    var date = DateFormat('dd/MM/yyyy');
    // print("FirebaseAuth.instance.currentUser!.uid");
    // print(FirebaseAuth.instance.currentUser?.uid==null);

    return SafeArea(
        child: Scaffold(
      body: Column(
        children: [
          ScreenHeader(size: size, title: "My Orders", isBackButton: true),
          Expanded(
            child: StreamBuilder(
                stream: FirebaseFirestore.instance
                    .collection('orders')
                    .where('userId',
                        isEqualTo: FirebaseAuth.instance.currentUser?.uid)
                    .orderBy('createdAt', descending: true)
                    .snapshots(),
                builder: (context, snapshot) {
                  return !snapshot.hasData
                      ? Center(
                          child: CircularProgressIndicator(
                            color: AppTheme().secondaryColor,
                          ),
                        )
                      : snapshot.data!.docs.isEmpty
                          ? const Center(
                              child: Text('No Orders Available...'),
                            )
                          : ListView.builder(
                              // shrinkWrap: true,
                              itemCount: snapshot.data!.docs.length,
                              itemBuilder: (context, index) {
                                var data = {
                                  ...snapshot.data!.docs[index].data(),
                                  "id": snapshot.data!.docs[index].id
                                };
                                // return Text('ascsa ${data.data().toString()}');
                                return Padding(
                                  padding: const EdgeInsets.all(12.0),
                                  child: GestureDetector(
                                    onTap: () {
                                      Navigator.push(
                                                                context,
                                                                MaterialPageRoute(
                                                                    builder:
                                                                        (context) =>
                                                                            ViewOrders(
                                                                              data: data,
                                                                            )));
                                    },
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        // const Divider(),
                                        Row(
                                          children: [
                                            Stack(
                                              children: [
                                                Container(
                                                  width: 40,
                                                  height: 40,
                                                  decoration: BoxDecoration(
                                                    shape: BoxShape.circle,
                                                    border: Border.all(
                                                      color: Colors.black,
                                                      width: 1.2,
                                                    ),
                                                  ),
                                                  child: Center(
                                                    child: Padding(
                                                      padding:
                                                          const EdgeInsets.all(
                                                              8.0),
                                                      child: SvgPicture.asset(
                                                        'assets/Icons/boxx.svg',
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                Positioned(
                                                  bottom: 0,
                                                  right: 0,
                                                  child: Row(
                                                    children: [
                                                      data['status'] ==
                                                              'Confirmed'
                                                          ? Container(
                                                              height: 15,
                                                              width: 15,
                                                              decoration: const BoxDecoration(
                                                                  color: Color(
                                                                      0xff4AA387),
                                                                  shape: BoxShape
                                                                      .circle),
                                                              child: const Icon(
                                                                Icons.check,
                                                                size: 14,
                                                                color:
                                                                    Colors.white,
                                                              ),
                                                            )
                                                          : data['status'] ==
                                                                  'Pending'
                                                              ? Container(
                                                                  height: 15,
                                                                  width: 15,
                                                                  decoration: const BoxDecoration(
                                                                      color: Color(
                                                                          0xff4AA387),
                                                                      shape: BoxShape
                                                                          .circle),
                                                                  child:
                                                                      const Icon(
                                                                    size: 14,
                                                                    Icons
                                                                        .access_time,
                                                                    color: Colors
                                                                        .amber,
                                                                  ),
                                                                )
                                                              : data['status'] ==
                                                                      'Rejected'
                                                                  ? Container(
                                                                      height: 15,
                                                                      width: 15,
                                                                      decoration: const BoxDecoration(
                                                                          color: Color(
                                                                              0xff4AA387),
                                                                          shape: BoxShape
                                                                              .circle),
                                                                      child:
                                                                          const Icon(
                                                                        size: 14,
                                                                        Icons
                                                                            .block,
                                                                        color: Colors
                                                                            .red,
                                                                      ))
                                                                  : data['status'] ==
                                                                          'Cancelled'
                                                                      ? Container(
                                                                          height:
                                                                              15,
                                                                          width:
                                                                              15,
                                                                          decoration: const BoxDecoration(
                                                                              color:
                                                                                  Color(0xff4AA387),
                                                                              shape: BoxShape.circle),
                                                                          child:
                                                                              const Icon(
                                                                            size:
                                                                                14,
                                                                            Icons
                                                                                .highlight_off,
                                                                            color:
                                                                                Colors.red,
                                                                          ),
                                                                        )
                                                                      : data['status'] ==
                                                                              'Delivered'
                                                                          ? Container(
                                                                              height:
                                                                                  15,
                                                                              width:
                                                                                  15,
                                                                              decoration:
                                                                                  const BoxDecoration(color: Color(0xff4AA387), shape: BoxShape.circle),
                                                                              child: const Icon(
                                                                                size: 14,
                                                                                Icons.check_circle_outline,
                                                                                color: Colors.green,
                                                                              ))
                                                                          : const SizedBox(),
                                                    ],
                                                  ),
                                                ),
                                              ],
                                            ),
                                            const SizedBox(width: 16),
                                            Column(
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              children: [
                                                Row(
                                                  children: [
                                                    // data['status'] == 'Confirmed'
                                                    //     ? const Icon(
                                                    //         Icons.check,
                                                    //         size: 20,
                                                    //         color: Colors.green,
                                                    //       )
                                                    //     : data['status'] ==
                                                    //             'Pending'
                                                    //         ? const Icon(
                                                    //             Icons.access_time,
                                                    //             size: 20,
                                                    //             color:
                                                    //                 Colors.amber,
                                                    //           )
                                                    //         : data['status'] ==
                                                    //                 'Rejected'
                                                    //             ? const Icon(
                                                    //                 Icons.block,
                                                    //                 size: 20,
                                                    //                 color: Colors
                                                    //                     .red,
                                                    //               )
                                                    //             : data['status'] ==
                                                    //                     'Cancelled'
                                                    //                 ? const Icon(
                                                    //                     Icons
                                                    //                         .highlight_off,
                                                    //                     size: 20,
                                                    //                     color: Colors
                                                    //                         .red,
                                                    //                   )
                                                    //                 : data['status'] ==
                                                    //                         'Delivered'
                                                    //                     ? const Icon(
                                                    //                         Icons
                                                    //                             .check_circle_outline,
                                                    //                         size:
                                                    //                             20,
                                                    //                         color:
                                                    //                             Colors.green,
                                                    //                       )
                                                    //                     : const SizedBox(),
                                                    // const SizedBox(width: 6),
                                                    Text(
                                                      data['status'],
                                                      style: AppTheme()
                                                          .outfitStyle(),
                                                    ),
                                                  ],
                                                ),
                                                Text(
                                                    'Placed on ${date.format(data['createdAt'].toDate())}',
                                                    style: AppTheme().outfitStyle(
                                                        fontWeight:
                                                            FontWeight.w300)),
                                              ],
                                            ),
                                          ],
                                        ),
                                        // Text('Order Id: ${data['orderId']}'),
                                        const SizedBox(
                                          height: 4,
                                        ),
                                        Container(
                                            width: double.infinity,
                                            decoration: BoxDecoration(
                                              borderRadius:
                                                  BorderRadius.circular(10),
                                              //   border: Border.all(
                                              //       color: Colors.black12),
                                            ),
                                            child: Column(
                                              children: [
                                                // Container(
                                                //     height: 30,
                                                //     child: Center(
                                                //       child: Text(
                                                //           'Placed On ${date.format(data['createdAt'].toDate())}'),
                                                //     )),
                                  
                                                const SizedBox(height: 20),
                                                Row(
                                                  crossAxisAlignment:
                                                      CrossAxisAlignment.center,
                                                  children: [
                                                    const SizedBox(width: 10),
                                                    Container(
                                                        // width: 60,
                                                        // height: 60,
                                                        width: size.width * 0.3,
                                                        height: size.width * 0.3,
                                                        decoration: BoxDecoration(
                                                            border: Border.all(
                                                                color: AppTheme()
                                                                    .themeColor
                                                                    .withOpacity(
                                                                        0.4)),
                                                            borderRadius:
                                                                BorderRadius
                                                                    .circular(0)),
                                                        child:
                                                            getImageWidget(data)),
                                                    const SizedBox(width: 20),
                                                    Expanded(
                                                      child: Column(
                                                        crossAxisAlignment:
                                                            CrossAxisAlignment
                                                                .start,
                                                        children: [
                                                          // Text('ascsa ${data.toString()}'),
                                                          Text(
                                                            data['products'].length > 1 ? '${data['products'][0]['name']} + ${data['products'].length - 1} more' : '${data['products'][0]['name']}',
                                                            style: AppTheme()
                                                                .outfitStyle(
                                                                    fontSize: 14),
                                                            maxLines: 2,
                                                          ),
                                                          // '${data['products'].length < 1 ? data['products'][0]['name'] : data['products'][0]['name']}'),
                                                          const SizedBox(
                                                              height: 20),
                                                          Text(
                                                              '${Constants().rupees}${double.parse(data['totalAmountToPaid'].toString()).toDouble().toStringAsFixed(2)}',
                                                              style: AppTheme()
                                                                  .outfitStyle(
                                                                      fontSize:
                                                                          16,
                                                                      fontWeight:
                                                                          FontWeight
                                                                              .w300)),
                                                          const SizedBox(
                                                              height: 20),
                                                          // Wrap(
                                                          //   crossAxisAlignment:
                                                          //       WrapCrossAlignment
                                                          //           .center,
                                                          //   children: [
                                                          //     Text(
                                                          //         data['status']),
                                                          //     const SizedBox(
                                                          //       width: 10,
                                                          //     ),
                                                          //     data['status'] ==
                                                          //             'Confirmed'
                                                          //         ? const Icon(
                                                          //             Icons.check,
                                                          //             size: 20,
                                                          //             color: Colors
                                                          //                 .green,
                                                          //           )
                                                          //         : data['status'] ==
                                                          //                 'Pending'
                                                          //             ? const Icon(
                                                          //                 Icons
                                                          //                     .access_time,
                                                          //                 size:
                                                          //                     20,
                                                          //                 color: Colors
                                                          //                     .amber,
                                                          //               )
                                                          //             : data['status'] ==
                                                          //                     'Rejected'
                                                          //                 ? const Icon(
                                                          //                     Icons.cancel,
                                                          //                     size:
                                                          //                         20,
                                                          //                     color:
                                                          //                         Colors.red,
                                                          //                   )
                                                          //                 : const SizedBox()
                                                          //   ],
                                                          // ),
                                                          const SizedBox(
                                                            height: 20,
                                                          ),
                                                        ],
                                                      ),
                                                    ),
                                                    data['orderId'] != null &&
                                                            data['deliveryVerification'] !=
                                                                null
                                                        ? InkWell(
                                                            onTap: () {
                                                              Navigator.push(
                                                                  context,
                                                                  MaterialPageRoute(
                                                                      builder:
                                                                          (context) =>
                                                                              ViewOrders(
                                                                                data: data,
                                                                              )));
                                                            },
                                                            child: const Padding(
                                                              padding:
                                                                  EdgeInsets
                                                                      .all(8.0),
                                                              child: Align(
                                                                  alignment: Alignment
                                                                      .bottomRight,
                                                                  child: Wrap(
                                                                    crossAxisAlignment:
                                                                        WrapCrossAlignment
                                                                            .center,
                                                                    children: [
                                                                      // Text(
                                                                      //   'View Order',
                                                                      //   style: TextStyle(
                                                                      //       color:
                                                                      //           Colors.green),
                                                                      // ),
                                                                      Icon(
                                                                        Icons
                                                                            .chevron_right,
                                                                        size: 26,
                                                                        color: Colors
                                                                            .grey,
                                                                      )
                                                                    ],
                                                                  )),
                                                            ),
                                                          )
                                                        : const SizedBox()
                                                  ],
                                                )
                                              ],
                                            )),
                                        const Divider(
                                          thickness: 2,
                                        )
                                      ],
                                    ),
                                  ),
                                );
                              });
                }),
          ),
        ],
      ),
    ));
  }
}
