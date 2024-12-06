import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';


import '../../theme/AppTheme.dart';
import '../../utils/dynamicLink.dart';
import '../../widgets/screenHeader.dart';


class MyPoints extends StatefulWidget {
  final String? uid;
  const MyPoints({super.key, required this.uid});

  @override
  State<MyPoints> createState() => _MyPointsState();
}

class _MyPointsState extends State<MyPoints> {
  bool isLoading = false;


  @override
  void initState() {
    // print('Uid is : ${FirebaseAuth.instance.currentUser?.uid}');
    Timer(const Duration(milliseconds: 100), () {
      DynamicLinkProvider().initDynamicLink(context: context);
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;


    return SafeArea(
        child: Scaffold(
      body: Column(
        children: [
          ScreenHeader(size: size, title: "My Points", isBackButton: true),
          Expanded(
            child: StreamBuilder(
                stream: FirebaseFirestore.instance
                    .collection('users')
                    .doc(widget.uid)
                    .collection('pointTransactions')
                    .snapshots(),
                builder: (context, AsyncSnapshot snapshot) {
                  return !snapshot.hasData
                      ? const Center(child: CircularProgressIndicator())
                      : snapshot.data.docs.length == 0
                          ? SizedBox(
                              height: size.height * 0.5,
                              child: const Center(
                                child: Text('No Points Available...'),
                              ),
                            )
                          : Column(
                              children: [
                                ListView.builder(
                                    physics:
                                        const NeverScrollableScrollPhysics(),
                                    itemCount: snapshot.data.docs.length,
                                    shrinkWrap: true,
                                    itemBuilder: (context, index) {
                                      var data = snapshot.data.docs[index];
                                      return Padding(
                                          padding: const EdgeInsets.all(12.0),
                                          child: Container(
                                              width: double.infinity,
                                              decoration: BoxDecoration(
                                                  borderRadius:
                                                      BorderRadius.circular(20),
                                                  border: Border.all(
                                                      color: Colors.black38)),
                                              child: Padding(
                                                padding:
                                                    const EdgeInsets.all(16.0),
                                                child: Column(
                                                  crossAxisAlignment:
                                                      CrossAxisAlignment.start,
                                                  children: [
                                                    Text(
                                                      '${data['msg']}',
                                                      style: AppTheme()
                                                          .outfitStyle(
                                                        fontSize: 15,
                                                        fontWeight:
                                                            FontWeight.w500,
                                                      ),
                                                    ),
                                                    const SizedBox(
                                                      height: 20,
                                                    ),
                                                    Row(
                                                      mainAxisAlignment:
                                                          MainAxisAlignment
                                                              .spaceBetween,
                                                      children: [
                                                        Row(
                                                          children: [
                                                            const Text(
                                                                "Points Redeemed : "),
                                                            Text(
                                                                '${data['point']}'),
                                                          ],
                                                        ),
                                                        Row(
                                                          children: [
                                                            const Text("Type : "),
                                                            Text(
                                                              '${data['type']}',
                                                              style: TextStyle(
                                                                  color: data['type'] ==
                                                                          'credit'
                                                                      ? Colors
                                                                          .green
                                                                      : Colors
                                                                          .red,
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .bold),
                                                            ),
                                                          ],
                                                        ),
                                                      ],
                                                    ),
                                                  ],
                                                ),
                                              )));
                                    })
                              ],
                            );
                }),
          ),
        ],
      ),
    ));
  }
}
