import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/screenHeader.dart';

class WalletTransactions extends StatelessWidget {
  const WalletTransactions({super.key});

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    final dynamic args = ModalRoute.of(context)!.settings.arguments;

    return SafeArea(
        child: Scaffold(
      body: SizedBox(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ScreenHeader(size: size, title: "ALL TRANSACTIONS"),
              const SizedBox(height: 15),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 15.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'My Wallet Balance: ',
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                    ),
                    Text(
                      "₹${args['userData']['wallet']['balance'].toStringAsFixed(2)}",
                      style: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 16),
                    )
                  ],
                ),
              ),
              const SizedBox(height: 15),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 15.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'My Cashback Balance: ',
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                    ),
                    Text(
                      "₹${args['userData']['wallet']['cashback'].toStringAsFixed(2)}",
                      style: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 16),
                    )
                  ],
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 15),
                child: FutureBuilder(
                  future: FirebaseFirestore.instance
                      .collection('users')
                      .doc(FirebaseAuth.instance.currentUser?.uid)
                      .collection('walletTransactions')
                      .orderBy('createdAt', descending: true)
                      .get(),
                  builder: (context, snapshot) {
                    if (snapshot.hasData == false) {
                      return const SizedBox();
                    }

                    if (snapshot.data!.docs.isEmpty) {
                      return const SizedBox();
                    }

                    // return Text('${snapshot.data!.docs[0].data()}');
                    return Column(
                      children: [
                        ...(snapshot.data!.docs.map((e) {
                          return Container(
                            margin: const EdgeInsets.only(top: 10),
                            padding: const EdgeInsets.symmetric(
                                horizontal: 15, vertical: 10),
                            decoration: BoxDecoration(
                                border: Border.all(
                                    width: 1,
                                    color: const Color.fromARGB(
                                        255, 214, 214, 214)),
                                borderRadius: BorderRadius.circular(5)),
                            child: Row(
                              children: [
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        '${e['message']}',
                                        style: const TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 15),
                                      ),
                                      const SizedBox(
                                        height: 5,
                                      ),
                                      Text(
                                        DateFormat('MMM dd, yyyy, hh:mm:ss a').format(e['createdAt'].toDate()),
                                        style: const TextStyle(
                                            fontWeight: FontWeight.bold,
                                            color: Colors.grey,
                                            fontSize: 13),
                                      )
                                    ],
                                  ),
                                ),
                                Text(
                                  "${e['type'] == "credit" ? "+" : "-"}₹${double.parse(e['amount'].toString()).toStringAsFixed(2)}",
                                  style: TextStyle(
                                      color: e['type'] == "credit"
                                          ? AppTheme().secondaryColor
                                          : Colors.red),
                                )
                              ],
                            ),
                          );
                        })),
                      ],
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    ));
  }
}
