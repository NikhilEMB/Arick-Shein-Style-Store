import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_cashfree_pg_sdk/api/cferrorresponse/cferrorresponse.dart';
import 'package:flutter_cashfree_pg_sdk/api/cfpayment/cfdropcheckoutpayment.dart';
import 'package:flutter_cashfree_pg_sdk/api/cfpaymentcomponents/cfpaymentcomponent.dart';
import 'package:flutter_cashfree_pg_sdk/api/cfpaymentgateway/cfpaymentgatewayservice.dart';
import 'package:flutter_cashfree_pg_sdk/api/cfsession/cfsession.dart';
import 'package:flutter_cashfree_pg_sdk/api/cftheme/cftheme.dart';
import 'package:flutter_cashfree_pg_sdk/utils/cfenums.dart';
import 'package:flutter_cashfree_pg_sdk/utils/cfexceptions.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/loadingModal.dart';
import 'package:shein/widgets/screenHeader.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../providers/cartProvider.dart';
import '../../widgets/customNavBar.dart';
import '../orderSummary/tapPaymentScreen.dart';

class MyWalletScreen extends StatefulWidget {
  const MyWalletScreen({super.key});

  @override
  State<MyWalletScreen> createState() => _MyWalletScreenState();
}

class _MyWalletScreenState extends State<MyWalletScreen> {
  TextEditingController controller = TextEditingController();
  var cfPaymentGatewayService = CFPaymentGatewayService();
  String selectedAmount = "";
  List<Map<String, dynamic>> chips = [
    {"value": '200', "label": "₹200.00"},
    {"value": '500', "label": "₹500.00"},
    {"value": '1000', "label": "₹1000.00"},
  ];

  void verifyPayment(String orderId) async {
    controller.text = '';
    setState(() {});
    showDialog(
      barrierDismissible: false,
      context: context,
      builder: (context) => Dialog(
        child: SizedBox(
          height: 100,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: [
              CupertinoActivityIndicator(
                color: AppTheme().secondaryColor,
              ),
              // CircularProgressIndicator(
              //   color: Colors.black,
              // ),
              const SizedBox(
                width: 10,
              ),
              const Text(
                'Verifying Payment...',
                style: TextStyle(fontFamily: 'Lexend'),
              )
            ],
          ),
        ),
      ),
    );
    final prefs = await SharedPreferences.getInstance();
    var data = {
      "cashfreeOrderId": orderId,
    };

    var response = await FirebaseFunctions.instance
        .httpsCallable('payments-getOrderDetailsCashfree')
        .call(data);

    var details = response.data;
    dynamic uid = FirebaseAuth.instance.currentUser?.uid.toString();

    String txnId = FirebaseFirestore.instance
        .collection('users')
        .doc(uid)
        .collection('walletTransactions')
        .doc()
        .id;

    dynamic balance = await FirebaseFirestore.instance
        .collection("users")
        .doc(uid)
        .get()
        .then((value) {
      if (value.exists) {
        var data = value.data();
        return data?['wallet']['balance'];
      }
    });

    double amount = double.parse(prefs.getDouble('walletAmt').toString());

    if (details['order_status'] == "PAID") {
      var walletPaymentObj = {
        "uid": uid.toString(),
        "mode": 'cashfree',
        "txnDetails": details,
        "amount": amount,
        "balance": balance,
        "txnId": txnId
      };
      var request = await FirebaseFunctions.instance
          .httpsCallable('wallet-addMoneyToWalletByUser')
          .call(walletPaymentObj);
      prefs.remove('walletAmt');
      Fluttertoast.showToast(msg: "Money added to wallet");
    } else {
      Fluttertoast.showToast(msg: "Payment failed.");
    }
    Navigator.pop(context);
  }

  void onError(CFErrorResponse errorResponse, String orderId) {
    print(errorResponse.getMessage());
    print("Error while making payment");
    print(double.parse(controller.text));
    Fluttertoast.showToast(msg: "Payment Failed.");
  }

  CFSession? createSession(orderId, paymentSessionId) {
    try {
      var session = CFSessionBuilder()
          .setEnvironment(CFEnvironment.PRODUCTION)
          .setOrderId(orderId)
          .setPaymentSessionId(paymentSessionId)
          .build();
      return session;
    } on CFException catch (e) {
      print(e.message);
    }
    return null;
  }

  pay(data) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      prefs.setDouble("walletAmt", double.parse(controller.text));

      print("SESSION DATA ${data['order_id']} ${data['payment_session_id']}");
      var session = createSession(data['order_id'], data['payment_session_id']);
      List<CFPaymentModes> components = <CFPaymentModes>[];
      components.add(CFPaymentModes.UPI);
      components.add(CFPaymentModes.CARD);
      components.add(CFPaymentModes.WALLET);
      components.add(CFPaymentModes.NETBANKING);
      var paymentComponent =
          CFPaymentComponentBuilder().setComponents(components).build();

      var theme = CFThemeBuilder()
          .setNavigationBarBackgroundColorColor("#FF0000")
          .setPrimaryFont("Menlo")
          .setSecondaryFont("Futura")
          .build();

      var cfDropCheckoutPayment = CFDropCheckoutPaymentBuilder()
          .setSession(session!)
          .setPaymentComponent(paymentComponent)
          .setTheme(theme)
          .build();

      cfPaymentGatewayService.doPayment(cfDropCheckoutPayment);
    } on CFException catch (e) {
      print(e.message);
    }
  }

  void handleAddToWallet(BuildContext context, dynamic currentValue) async {
    if (controller.text.isEmpty) {
      Fluttertoast.showToast(msg: "Enter Amount");
      return;
    }

    var walletInfo = await FirebaseFirestore.instance
        .collection('settings')
        .doc('wallet')
        .get()
        .then((value) => value.data());
    var check = double.parse(controller.text.toString());
    if (check + currentValue > walletInfo?['maxUserWalletAmnt']) {
      Fluttertoast.showToast(
          msg:
              "Cannot add amount more than ${walletInfo?['maxUserWalletAmnt']}.");
    } else {
      showDialog(
        barrierDismissible: false,
        context: context,
        builder: (context) => loader(context),
      );

      var orderAmount = double.parse(controller.text);
      var userId = FirebaseAuth.instance.currentUser?.uid;
      var source = 'app-flutter';

      var reqData = {
        "totalAmount": orderAmount.toStringAsFixed(2),
        "bookingId": userId, // You can change this to something meaningful
        "firstName": '', // You can provide the user's first name here
        "lastName": '', // You can provide the user's last name here
        "email": '', // You can provide the user's email here
        "redirectUrl":
            "https://nomadetailing.web.app/bookingStatus" // Change this to your desired redirect URL
      };

      HttpsCallable generateTapPaymentUrl = FirebaseFunctions.instance
          .httpsCallable('payments-generateTapPaymentUrl');
      var response = await generateTapPaymentUrl(reqData);

      if (response.data['status'] == "INITIATED") {
        var data = await Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => TapPaymentScreen(
                url: response.data['transaction']['url'],
                redirectUrl: "https://nomadetailing.web.app/bookingStatus"),
          ),
        );
        if (data == null) {
          Fluttertoast.showToast(msg: 'Payment Failed');
        }
        print('DATTA $data');
        var chargeId = data.toString().split('tap_id=')[1];
        print("CHARGE ID $chargeId");
        HttpsCallable getChargeDetails =
            FirebaseFunctions.instance.httpsCallable('payments-retrieveCharge');

        var paymentStatus = await getChargeDetails({"id": chargeId});
        if (paymentStatus.data['status'] == "CAPTURED") {
//  var data = {
//       "cashfreeOrderId": orderId,
//     };

          dynamic uid = FirebaseAuth.instance.currentUser?.uid.toString();

          String txnId = FirebaseFirestore.instance
              .collection('users')
              .doc(uid)
              .collection('walletTransactions')
              .doc()
              .id;

          dynamic balance = await FirebaseFirestore.instance
              .collection("users")
              .doc(uid)
              .get()
              .then((value) {
            if (value.exists) {
              var data = value.data();
              return data?['wallet']['balance'];
            }
          });

          // double amount = double.parse(('walletAmt').toString());

          var walletPaymentObj = {
            "uid": uid.toString(),
            "mode": 'tap',
            "txnDetails": paymentStatus.data,
            "amount": double.parse(controller.text.toString()),
            "balance": balance,
            "txnId": txnId
          };
          var request = await FirebaseFunctions.instance
              .httpsCallable('wallet-addMoneyToWalletByUser')
              .call(walletPaymentObj);

          Fluttertoast.showToast(msg: "Money added to wallet");

          Navigator.pop(context);
        } else {
          Fluttertoast.showToast(
              msg: "Payment Failed!. Please try again later.");
          orderSuccesDialog(failed: true);
        }
      }
    }
  }

  orderSuccesDialog({failed = false}) {
    var cartProducts = Provider.of<Cart>(context, listen: false).cart;
    for (var item in cartProducts) {
      String itemId = item.containsKey('id') ? item['id'] : "";
      if (itemId.isNotEmpty) {
        FirebaseFirestore.instance
            .collection('users')
            .doc(FirebaseAuth.instance.currentUser?.uid)
            .collection('cart')
            .doc(itemId)
            .delete();
      }
    }

    return showDialog(
      barrierDismissible: false,
      context: context,
      builder: (context) => Dialog(
        child: Container(
          // height: MediaQuery.of(context).size.width * 0.25,
          padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  failed ? "Order Failed!" : 'Order Placed Successfully!',
                  style: const TextStyle(
                    fontSize: 16,
                  ),
                ),
                const SizedBox(
                  height: 15,
                ),
                SizedBox(
                  width: double.infinity,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      InkWell(
                        onTap: () {
                          Navigator.of(context, rootNavigator: true)
                              .pushAndRemoveUntil(
                                  CupertinoPageRoute(
                                    builder: (context) => const CustomNavBar(
                                      pageNum: 1,
                                      // number: _textEditingController.text,
                                      // verificationCode: _verificationCode!,
                                    ),
                                  ),
                                  (route) => false
                                  // route.isFirst || route.settings.name == '/home',
                                  );
                        },
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                              vertical: 5, horizontal: 15),
                          child: const Text('Ok'),
                        ),
                      )
                    ],
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }

  // handleAddToWallet(currentValue) async {
  //   if (controller.text.isEmpty) {
  //     Fluttertoast.showToast(msg: "Enter Amount");
  //     return;
  //   }

  //   var walletInfo = await FirebaseFirestore.instance
  //       .collection('settings')
  //       .doc('wallet')
  //       .get()
  //       .then((value) => value.data());
  //   var check = double.parse(controller.text.toString());
  //   if (check + currentValue > walletInfo?['maxUserWalletAmnt']) {
  //     Fluttertoast.showToast(
  //         msg:
  //             "Cannot add amount more than ${walletInfo?['maxUserWalletAmnt']}.");
  //   } else {
  //     // print("LESSER");
  //     showDialog(
  //       barrierDismissible: false,
  //       context: context,
  //       builder: (context) => loader(context),
  //     );

  //     var data = await FirebaseFunctions.instance
  //         .httpsCallable('payments-createOrderCashfree')
  //         .call({
  //       "orderAmnt": double.parse(controller.text),
  //       "userId": FirebaseAuth.instance.currentUser?.uid,
  //       "source": 'app-flutter'
  //     });
  //     print("FSYSSSSS ${{
  //       "orderAmnt": double.parse(controller.text),
  //       "userId": FirebaseAuth.instance.currentUser?.uid,
  //       "source": 'app-flutter'
  //     }}");

  //     print("DATA ${data.data}");
  //     await pay(data.data);
  //     Navigator.pop(context);
  //   }
  // }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    cfPaymentGatewayService.setCallback(verifyPayment, onError);
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        body: Column(
          children: [
            ScreenHeader(size: size, title: "My Wallet"),
            StreamBuilder(
              stream: FirebaseFirestore.instance
                  .collection('users')
                  .doc(FirebaseAuth.instance.currentUser?.uid)
                  .snapshots(),
              builder: (context, snapshot) {
                if (!snapshot.hasData) {
                  return Container(
                    margin: const EdgeInsets.only(top: 20),
                    child: CircularProgressIndicator(
                      color: AppTheme().secondaryColor,
                    ),
                  );
                }

                dynamic data = snapshot.data?.data();

                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 15),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        margin: const EdgeInsets.only(top: 20),
                        padding: const EdgeInsets.only(
                          top: 20,
                          bottom: 20,
                        ),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(5),
                          color: const Color.fromARGB(255, 255, 239, 244),
                          border: Border.all(color: Colors.black, width: 0.7),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Expanded(
                                  child: Padding(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 20.0),
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        const Text(
                                          'Wallet Balance',
                                          style: TextStyle(
                                              fontWeight: FontWeight.bold,
                                              fontSize: 15),
                                        ),
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        Text(
                                          "₹${data['wallet']['balance'].toStringAsFixed(2)}",
                                          style: const TextStyle(
                                            fontWeight: FontWeight.w500,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                Container(
                                  height: 40,
                                  width: 0,
                                  decoration: BoxDecoration(
                                      border: Border(
                                          left: BorderSide(
                                              color: AppTheme().secondaryColor,
                                              width: 2))),
                                ),
                                SizedBox(
                                  width: size.width * 0.45,
                                  child: Padding(
                                    padding:
                                        EdgeInsets.only(left: size.width * 0.2),
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        const Text(
                                          'Cashbacks',
                                          style: TextStyle(
                                              fontWeight: FontWeight.bold,
                                              fontSize: 15),
                                        ),
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        Text(
                                          "₹${data['wallet']['cashback'].toStringAsFixed(2)}",
                                          style: const TextStyle(
                                            fontWeight: FontWeight.w500,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 25),
                            Padding(
                              padding: const EdgeInsets.only(left: 18.0),
                              child: InkWell(
                                onTap: () {
                                  Navigator.of(context).pushNamed(
                                      '/walletTransactions',
                                      arguments: {'userData': data});
                                },
                                child: Row(
                                  children: [
                                    Text(
                                      'VIEW ALL TRANSACTIONS',
                                      style: TextStyle(
                                          fontSize: 12,
                                          color: AppTheme().secondaryColor,
                                          fontWeight: FontWeight.bold),
                                    ),
                                    Icon(
                                      Icons.arrow_forward,
                                      color: AppTheme().secondaryColor,
                                      size: 18,
                                    ),
                                  ],
                                ),
                              ),
                            )
                          ],
                        ),
                      ),
                      const SizedBox(
                        height: 25,
                      ),
                      const Text(
                        'Add money to your wallet',
                        style: TextStyle(fontWeight: FontWeight.w600),
                      ),
                      const SizedBox(height: 7),
                      Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(5),
                          border: Border.all(
                              color: const Color.fromARGB(255, 206, 206, 206)),
                        ),
                        height: 40,
                        child: Row(
                          children: [
                            Container(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 10),
                              child: const Text(
                                '₹',
                                style: TextStyle(color: Colors.grey),
                              ),
                            ),
                            Expanded(
                              child: TextFormField(
                                keyboardType: TextInputType.number,
                                controller: controller,
                                onChanged: (value) {
                                  setState(() {
                                    selectedAmount = value.toString();
                                  });
                                },
                                cursorColor: Colors.black,
                                cursorWidth: 1,
                                decoration: const InputDecoration(
                                  border: InputBorder.none,
                                  hintText: "Enter Amount",
                                  contentPadding: EdgeInsets.only(
                                    // left: 10,
                                    right: 10,
                                    bottom: 10,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 20),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          ...(chips.map((item) {
                            return InkWell(
                              onTap: () {
                                controller.text = item['value'];
                                setState(() {
                                  selectedAmount = item['value'];
                                });
                              },
                              child: Container(
                                width: size.width * 0.27,
                                padding:
                                    const EdgeInsets.symmetric(vertical: 10),
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(5),
                                    border: Border.all(
                                        color: selectedAmount == item['value']
                                            ? AppTheme().secondaryColor
                                            : const Color.fromARGB(
                                                255, 193, 193, 193),
                                        width: 1)),
                                child: Center(
                                    child: Text(
                                  item['label'],
                                  style: const TextStyle(
                                      fontWeight: FontWeight.w500),
                                )),
                              ),
                            );
                          }).toList())
                        ],
                      ),
                      const SizedBox(height: 25),
                      Container(
                        width: double.infinity,
                        // padding: EdgeInsets.only(bottom: 15),
                        decoration: BoxDecoration(
                          border: Border.all(
                              color: const Color.fromARGB(255, 222, 222, 222)),
                          borderRadius: const BorderRadius.only(
                              topLeft: Radius.circular(5),
                              topRight: Radius.circular(
                                5,
                              )),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 15, vertical: 15),
                              width: double.infinity,
                              decoration: const BoxDecoration(
                                  borderRadius: BorderRadius.only(
                                      topLeft: Radius.circular(5),
                                      topRight: Radius.circular(
                                        5,
                                      )),
                                  color: Color.fromARGB(255, 239, 239, 239)),
                              child: const Text(
                                "Payment Modes",
                                style: TextStyle(fontWeight: FontWeight.w600),
                              ),
                            ),
                            InkWell(
                              onTap: () => handleAddToWallet(
                                  context, data['wallet']['balance']),
                              child: Container(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 15, vertical: 15),
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    const Expanded(
                                      child: Row(
                                        children: [
                                          Text(
                                            'Pay Online',
                                            style: TextStyle(
                                                fontSize: 14,
                                                fontWeight: FontWeight.w600),
                                          ),
                                          // Text(
                                          //     "${Constants().rupees}${double.parse(args['paymentDetails']['totalMrp'].toString()).toStringAsFixed(2)}"),
                                        ],
                                      ),
                                    ),
                                    Icon(Icons.arrow_forward_ios_rounded,
                                        size: 16,
                                        color: AppTheme().secondaryColor)
                                  ],
                                ),
                              ),
                            )
                          ],
                        ),
                      )
                    ],
                  ),
                );
              },
            )
          ],
        ),
      ),
    );
  }
}
