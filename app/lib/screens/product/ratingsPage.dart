import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:shein/theme/AppTheme.dart';

class RatingsScreen extends StatelessWidget {
  const RatingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    final dynamic args = ModalRoute.of(context)!.settings.arguments;

    return SafeArea(
        child: Scaffold(
      body: SizedBox(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(
                          vertical: 15, horizontal: 15),
                      decoration: const BoxDecoration(
                        boxShadow: [
                          BoxShadow(
                              color: Color.fromARGB(255, 225, 223, 223),
                              blurRadius: 2,
                              offset: Offset(0, 2),
                              spreadRadius: 2),
                        ],
                        color: Colors.white,
                      ),
                      child: Row(
                        children: [
                          const Expanded(
                            child: Text(
                              "All Ratings",
                              style: TextStyle(
                                  fontSize: 17, fontWeight: FontWeight.w500),
                            ),
                          ),
                          InkWell(
                            onTap: () {
                              Navigator.pop(context);
                            },
                            child: const SizedBox(
                              width: 70,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.end,
                                children: [
                                  Icon(Icons.close),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 15),
                    Container(
                      margin: const EdgeInsets.only(top: 5),
                      padding: const EdgeInsets.symmetric(horizontal: 15),
                      child: Column(
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              SizedBox(
                                height: 25,
                                // width: size.width * 0.32,
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    SizedBox(
                                      // height: 25,
                                      child: ListView.builder(
                                        shrinkWrap: true,
                                        scrollDirection: Axis.horizontal,
                                        itemCount: args['totalRatings']
                                                ['avgRating']
                                            .round(),
                                        itemBuilder: (context, index) => Icon(
                                          Icons.star,
                                          color: AppTheme().secondaryColor,
                                        ),
                                      ),
                                    ),
                                    const SizedBox(
                                      width: 5,
                                    ),
                                    Text(
                                      "${args['totalRatings']['avgRating']} out of 5",
                                      style: const TextStyle(
                                        fontWeight: FontWeight.w500,
                                        color:
                                            Color.fromARGB(255, 121, 121, 121),
                                      ),
                                    )
                                  ],
                                ),
                              ),
                              const SizedBox(height: 5),
                              Padding(
                                padding: const EdgeInsets.only(left: 5.0),
                                child: Text(
                                  '${args['totalRatings']['totalRatings']} rating',
                                  style: const TextStyle(
                                      fontWeight: FontWeight.w500,
                                      color: Colors.grey,
                                      fontSize: 12),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 10),
                    const Divider(
                      color: Color.fromARGB(255, 235, 233, 233),
                      height: 1,
                      thickness: 1,
                    ),
                    Container(
                      child: FutureBuilder(
                        future: FirebaseFirestore.instance
                            .collection('products')
                            .doc(args['productId'])
                            .collection('ratings')
                            .where('status', isEqualTo: "approved")
                            .get(),
                        builder: (context, snapshot) {
                          if (snapshot.hasData == false) {
                            return const SizedBox();
                          }
                          if (snapshot.data!.docs.isEmpty) {
                            return const SizedBox();
                          }

                          var data = snapshot.data!.docs;

                          return Container(
                            child: Column(
                              children: [
                                ...(data.map((e) {
                                  return Container(
                                    margin: const EdgeInsets.only(top: 10),
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Padding(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 15),
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              Text(
                                                e['userName'],
                                                style: const TextStyle(
                                                    fontWeight:
                                                        FontWeight.w900),
                                              ),
                                              const SizedBox(height: 5),
                                              SizedBox(
                                                height: 20,
                                                child: ListView.builder(
                                                  shrinkWrap: true,
                                                  scrollDirection:
                                                      Axis.horizontal,
                                                  itemCount:
                                                      e['rating'].round(),
                                                  itemBuilder:
                                                      (context, index) => Icon(
                                                    Icons.star,
                                                    size: 17,
                                                    color: AppTheme()
                                                        .secondaryColor,
                                                  ),
                                                ),
                                              ),
                                              const SizedBox(
                                                height: 5,
                                              ),
                                              e['review'].toString().isNotEmpty
                                                  ? Text(
                                                      e['review'],
                                                      style: const TextStyle(
                                                          fontWeight:
                                                              FontWeight.w600),
                                                    )
                                                  : const SizedBox(),
                                              SizedBox(
                                                height: e['review']
                                                        .toString()
                                                        .isEmpty
                                                    ? 0
                                                    : 5,
                                              ),
                                              Text(
                                                "Rated on ${DateFormat('dd MMMM yyyy').format(e['createdAt'].toDate())}",
                                                style: const TextStyle(
                                                    fontWeight: FontWeight.w600,
                                                    fontSize: 12,
                                                    color: Colors.grey),
                                              ),
                                              const SizedBox(
                                                height: 10,
                                              ),
                                            ],
                                          ),
                                        ),
                                        const Divider(
                                          color: Color.fromARGB(
                                              255, 230, 228, 228),
                                          height: 1,
                                          thickness: 1,
                                        ),
                                      ],
                                    ),
                                  );
                                }).toList())
                              ],
                            ),
                          );
                        },
                      ),
                    )
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    ));
  }
}
