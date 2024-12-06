import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

import '../../widgets/screenHeader.dart';

class ReturnRequestScreen extends StatefulWidget {
  final String orderId;
  final Map<String, dynamic> productData;

  const ReturnRequestScreen({super.key, required this.orderId, required this.productData});

  @override
  _ReturnRequestScreenState createState() => _ReturnRequestScreenState();
}

class _ReturnRequestScreenState extends State<ReturnRequestScreen> {
  String reason = "";

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            ScreenHeader(
                size: size, title: "Return Request", isBackButton: true),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text("Product Name: ${widget.productData['name']}"),
                  const SizedBox(height: 16.0),
                  TextField(
                    onChanged: (value) {
                      setState(() {
                        reason = value;
                      });
                    },
                    decoration: const InputDecoration(
                      labelText: "Return Reason",
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  // ElevatedButton(
                  //   onPressed: () async {
                  //     await initiateReturnRequest();
                  //   },
                  //   child: Text("Submit Return Request"),
                  // ),
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Container(
                      // width: double.infinity - 16,
                      decoration: BoxDecoration(
                        color: Colors.black,
                        border: Border.all(color: Colors.black),
                        borderRadius: BorderRadius.circular(5.0),
                      ),
                      child: TextButton(
                        onPressed: () async {
                          await initiateReturnRequest();
                        },
                        child: const Padding(
                          padding: EdgeInsets.only(
                              left: 12, right: 12, top: 8, bottom: 8),
                          child: Text(
                            'RETURN',
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                      ),
                    ),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> initiateReturnRequest() async {
    try {
      await FirebaseFirestore.instance
          .collection('returnRequests')
          .doc(widget.orderId)
          .set({
        'createdAt': FieldValue.serverTimestamp(),
        'products': {
          widget.productData['productId']: {
            'data': widget.productData,
            'return': {
              'status': 'pending',
              'reason': reason,
            },
          },
        },
      }, SetOptions(merge: true));

      Navigator.pop(context, true);
    } catch (e) {
      print('Error initiating return: $e');
    }
  }
}
