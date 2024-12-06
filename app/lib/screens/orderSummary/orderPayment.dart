// ignore_for_file: use_build_context_synchronously

import 'dart:convert';
import 'dart:developer';
import 'dart:io';

import 'package:razorpay_flutter/razorpay_flutter.dart';
import 'package:shein/screens/orderSummary/tapPaymentScreen.dart';
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
import 'package:shein/constants/constants.dart';
import 'package:shein/providers/appProvider.dart';
import 'package:shein/providers/cartProvider.dart';
import 'package:shein/providers/userProvider.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/customNavBar.dart';
import 'package:shein/widgets/loadingModal.dart';
import 'package:shein/widgets/screenHeader.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:uuid/uuid.dart';

class OrderPaymentScreen extends StatefulWidget {
  const OrderPaymentScreen({super.key});

  @override
  State<OrderPaymentScreen> createState() => _OrderPaymentScreenState();
}

// showDialog(
//                 context: (context), builder: (context) => loader(context));

class _OrderPaymentScreenState extends State<OrderPaymentScreen> {
  var cfPaymentGatewayService = CFPaymentGatewayService();
  String createdOrderId = "";
  bool isWalletUsed = false;
  dynamic discountedAmount = 0;
  dynamic walletInfo;
  Razorpay? _razorpay;

  void verifyPayment(String orderId) async {
    print("Verify Payment");
    var data = {
      "cashfreeOrderId": orderId,
    };

    var response = await FirebaseFunctions.instance
        .httpsCallable('payments-getOrderDetailsCashfree')
        .call(data);

    var details = response.data;
    if (details['order_status'] == "PAID") {
      var txnRes = {
        "order_status": details['order_status'],
        "cf_order_id": details['cf_order_id'],
        "created_at": details['created_at'],
        "order_id": details['order_id'],
        "order_amount": details['order_amount'],
      };

      var paymentObj = {
        "completed": true,
        "mode": "cashfree",
        "details": txnRes,
        "status": 'completed'
      };

      await FirebaseFirestore.instance
          .collection('orders')
          .doc(createdOrderId)
          .update(
        {
          "payment": paymentObj,
          "status": "Confirmed",
        },
      );
      orderSuccesDialog();
    } else {
      Fluttertoast.showToast(msg: "Payment Failed.");
    }
  }

  void onError(CFErrorResponse errorResponse, String orderId) {
    print(errorResponse.getMessage());
    print("Error while making payment");
    Fluttertoast.showToast(msg: "Payment Failed.");
    orderSuccesDialog(failed: true);
  }

  fetchWalletInfo() async {
    var data = await FirebaseFirestore.instance
        .collection("settings")
        .doc('wallet')
        .get()
        .then((value) => value.data());
    setState(() {
      walletInfo = data;
    });
  }


    void _handlePaymentSuccess(PaymentSuccessResponse response) async {
    // Do something when payment succeeds

    log("responsee : ${response.signature} : ${response.paymentId} : ${response.orderId}");
    if (response.paymentId == null) {
      Fluttertoast.showToast(msg: "Payment id is null");
      return;
    }
    if (response.orderId == null) {
      Fluttertoast.showToast(msg: "Order id is null");
      return;
    }


    

   

    // if (response.signature == null) {
    //   showErrorToast(context, "Signature is null");
    //   return;
    // }
    // Hit Create Ticket API

    // Future.delayed(Duration(seconds: 2), () {
    // Navigate to TicketScreen using Get.to

    // })
  }

  void _handlePaymentError(PaymentFailureResponse response) {
    // Do something when payment fails
    Fluttertoast.showToast(msg: "Payment Failed : ${response.message}");
  
  }

  void _handleExternalWallet(ExternalWalletResponse response) {
    // Do something when an external wallet was selected
    Fluttertoast.showToast(msg: "External Wallet : ${response.walletName}");
    
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _razorpay = Razorpay();

    _razorpay?.on(Razorpay.EVENT_PAYMENT_SUCCESS, _handlePaymentSuccess);
    _razorpay?.on(Razorpay.EVENT_PAYMENT_ERROR, _handlePaymentError);
    _razorpay?.on(Razorpay.EVENT_EXTERNAL_WALLET, _handleExternalWallet);
    // cfPaymentGatewayService.setCallback(verifyPayment, onError);
    Provider.of<Auth>(context, listen: false).fetchUser('userId');
    fetchWalletInfo();

   
  }

  Future<void> generate_ODID() async {
      var orderOptions = {
        'amount': 50000,  // amount in the smallest currency unit
        'currency': "INR",
        'receipt': "order_rcptid_11"
      };
      final client = HttpClient();
      final request =
          await client.postUrl(Uri.parse('https://api.razorpay.com/v1/orders'));
      request.headers.set(
          HttpHeaders.contentTypeHeader, "application/json; charset=UTF-8");
      String basicAuth = 'Basic ' +
          base64Encode(utf8.encode(
              '${'rzp_test_2yOwdGKj6lqSjJ'}:${'B6VnRxVpxWRFPc5u1a4F7HoH'}'));
      request.headers.set(HttpHeaders.authorizationHeader, basicAuth);
      request.add(utf8.encode(json.encode(orderOptions)));
      final response = await request.close();
      response.transform(utf8.decoder).listen((contents) {
        print('ORDERID'+contents);
        String orderId = contents.split(',')[0].split(":")[1];
        orderId = orderId.substring(1, orderId.length - 1);
        // Fluttertoast.showToast(
        //     msg: "ORDERID: " +orderId,
        //     toastLength: Toast.LENGTH_SHORT);
        Map<String, dynamic> checkoutOptions = {
          'key': 'rzp_test_2yOwdGKj6lqSjJ',
          'amount': 11100,
          'name': 'SHEIN Style Stores',
          'description': 'Fssai Registrtion Charge',
          'prefill': {'contact': '8910407549', 'email': 'xx.xx@gmail.com'},
          'external': {
            'wallets': ['paytm']
          }
        };
        try {
          _razorpay?.open(checkoutOptions);
        } catch (e) {
          print(e.toString());
        }
    });
    }
  

  
  void makePayment(String amount ) async {

    
    var options = {
      'key': 'rzp_test_BQfWCSPjfpPmye',
      'amount': amount, //rs 200
      'name': 'SHEIN Style Stores',
      'order_id': Uuid().v4(),
      'description': "Payment for order",
      'prefill': {
        'contact': '91XXXXXXXX',
        'email': 'test@gmail.com',
      },
    };

    try {
      _razorpay?.open(options);
    } catch (e) {
      print("Error in razorpay :  $e");
    }
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

  String getRegionName(selectedRegion) {
    var regionsData =
        Provider.of<AppProvider>(context, listen: false).regionsData;
    var region = regionsData
        .where((element) => element['id'] == selectedRegion)
        .toList();
    if (region.isEmpty) {
      return "";
    } else {
      return region[0]['name'];
    }
  }

  Future<void> createOrder({
    totalAmount,
    pointDiscount,
    pointUsed,
    paymentDetails,
    address,
    couponId = "",
    couponName = "",
    couponDiscount = 0,
    selectedDate,
    selectedTime,
    isCod = false,
    args,
  }) async {
    print('COD is : $isCod');
    var currency;
    final CollectionReference chatCollection =
        FirebaseFirestore.instance.collection('chats');
    final prefs = await SharedPreferences.getInstance();
    final DocumentReference userDocRef = chatCollection
        .doc(FirebaseAuth.instance.currentUser?.uid)
        .collection('messages')
        .doc();
    final String messageId = userDocRef.id;

    bool autoConfirmOrder = await FirebaseFirestore.instance
        .collection('payment')
        .doc('info')
        .get()
        .then((value) {
      if (value.exists) {
        var data = value.data();
        return data?['autoConfirmOrder'];
      } else {
        return false;
      }
    });

    String userName = "";

    if (Provider.of<Auth>(context, listen: false).userData == null) {
      dynamic user =
          await Provider.of<Auth>(context, listen: false).fetchUser('');
      userName = user['name'];
    } else {
      userName = Provider.of<Auth>(context, listen: false).userData['name'];
    }

    String regionName = '';

    if (prefs.get('region') != null) {
      regionName = prefs.get('region').toString();
    }

    Map<String, dynamic> orderObj = {
      'delivery': paymentDetails['delivery']['deliveryCost'],
      'couponDiscount': couponDiscount,
      'defaultGst': paymentDetails['totalGst'],
      'totalAmountToPaid': args['isPointsApplied'] ? args ['totalAmount'] :  paymentDetails['totalPayable'],
      'pointDiscount': args['pointDiscount'], // 13
      'pointUsed': args['pointUsed'], // 26
      'couponId': couponId,
      'couponName': couponName,
      'scheduledDate': selectedDate ?? '',
      'scheduledTime': selectedTime ?? '',
      'totalMrp': paymentDetails['totalMrp'],
      'discountOnMrp': paymentDetails['discountOnMrp'],
      'deliveryGstObj': paymentDetails['deliveryGstObj'],
      'customerGstNo': '',
      'billingAddress': address,
      'autoConfirmOrder': autoConfirmOrder,
      'storePickupObj': {},
      'metaData': {
        'source': Platform.isAndroid
            ? 'android'
            : Platform.isIOS
                ? 'ios'
                : "",
        'orderBy': {
          'id': FirebaseAuth.instance.currentUser?.uid,
          'name': userName,
          'role': 'user',
        },
        'inventoryManaged': false,
      },
      'products': Provider.of<Cart>(context, listen: false).cart,
      'address': address,
      'orderId': null,
      'status': isCod ? "Confirmed" : 'Pending',
      'createdAt': DateTime.now(),
      'payment': {
        'completed': false,
        'mode': isCod ? "cash" : "stripe",
        'details': null,
      },
      'userId': FirebaseAuth.instance.currentUser?.uid,
      'msgId': messageId,
      'userName': userName,
      'region': regionName,
    };

    dynamic userData = Provider.of<Auth>(context, listen: false).userData;

    if (isWalletUsed) {
      debugPrint('using wallet : $isWalletUsed');
      double walletUsed = 0;
      double cashbackUsed = 0;
      var balance = userData['wallet']['balance'];
      var cashback = userData['wallet']['cashback'];
      var maximumCashback = walletInfo['maxWalletAmntPerOrder'];
      //minOrderAmount check on top

      if (double.parse(paymentDetails['totalPayable'].toString()) <
          walletInfo['minOrderAmnt']) {
        walletUsed = double.parse(balance.toString()) >
                double.parse(paymentDetails['totalPayable'].toString())
            ? double.parse(paymentDetails['totalPayable'].toString())
            : double.parse(balance.toString());
      } else {
        cashbackUsed = double.parse(paymentDetails['totalPayable'].toString()) >
                double.parse(cashback.toString())
            ? double.parse(cashback.toString())
            : double.parse(paymentDetails['totalPayable'].toString());

        if (cashbackUsed > walletInfo['maxWalletAmntPerOrder']) {
          cashbackUsed =
              double.parse(walletInfo['maxWalletAmntPerOrder'].toString());
        }

        if (double.parse(cashback.toString()) > maximumCashback) {
          var usableCashback =
              double.parse(cashback.toString()) - maximumCashback;
          if (usableCashback -
                  double.parse(paymentDetails['totalPayable'].toString()) <
              0) {
            if (double.parse(balance.toString()) -
                    (double.parse(paymentDetails['totalPayable'].toString()) -
                        usableCashback) <
                0) {
              walletUsed = double.parse(balance.toString());
            } else {
              walletUsed =
                  double.parse(paymentDetails['totalPayable'].toString()) -
                      usableCashback;
            }
          } else {
            walletUsed = 0;
          }
        } else {
          if (double.parse(cashback.toString()) -
                  double.parse(paymentDetails['totalPayable'].toString()) <
              0) {
            if (double.parse(balance.toString()) -
                    (double.parse(paymentDetails['totalPayable'].toString()) -
                        double.parse(cashback.toString())) <
                0) {
              walletUsed = double.parse(balance.toString());
            } else {
              walletUsed =
                  double.parse(paymentDetails['totalPayable'].toString()) -
                      double.parse(cashback.toString());
            }
          } else {
            walletUsed = 0;
          }
        }
      }
      orderObj = {
        ...orderObj,
        "cashbackAmount": (discountedAmount >
                double.parse(args['paymentDetails']['totalPayable'].toString())
            ? double.parse(args['paymentDetails']['totalPayable'].toString())
                .toStringAsFixed(2)
            : discountedAmount),
        "walletAmount": walletUsed
      };
    }

    var orderID;

    if (args.containsKey('isRedo') && args['isRedo']) {
      var newObj = {
        "status": isCod ? "Confirmed" : 'Pending',
        "payment.completed": isCod ? true : false,
        "payment.mode": isCod ? "cash" : "cashfree",
      };

      if (isWalletUsed) {
        double walletUsed = 0;
        double cashbackUsed = 0;
        var balance = userData['wallet']['balance'];
        var cashback = userData['wallet']['cashback'];
        var maximumCashback = walletInfo['maxWalletAmntPerOrder'];
        //minOrderAmount check on top

        if (double.parse(paymentDetails['totalPayable'].toString()) <
            walletInfo['minOrderAmnt']) {
          walletUsed = double.parse(balance.toString()) >
                  double.parse(paymentDetails['totalPayable'].toString())
              ? double.parse(paymentDetails['totalPayable'].toString())
              : double.parse(balance.toString());
        } else {
          cashbackUsed =
              double.parse(paymentDetails['totalPayable'].toString()) >
                      double.parse(cashback.toString())
                  ? double.parse(cashback.toString())
                  : double.parse(paymentDetails['totalPayable'].toString());

          if (cashbackUsed > walletInfo['maxWalletAmntPerOrder']) {
            cashbackUsed = walletInfo['maxWalletAmntPerOrder'];
          }

          if (double.parse(cashback.toString()) > maximumCashback) {
            var usableCashback =
                double.parse(cashback.toString()) - maximumCashback;
            if (usableCashback -
                    double.parse(paymentDetails['totalPayable'].toString()) <
                0) {
              if (double.parse(balance.toString()) -
                      (double.parse(paymentDetails['totalPayable'].toString()) -
                          usableCashback) <
                  0) {
                walletUsed = double.parse(balance.toString());
              } else {
                walletUsed =
                    double.parse(paymentDetails['totalPayable'].toString()) -
                        usableCashback;
              }
            } else {
              walletUsed = 0;
            }
          } else {
            if (double.parse(cashback.toString()) -
                    double.parse(paymentDetails['totalPayable'].toString()) <
                0) {
              if (double.parse(balance.toString()) -
                      (double.parse(paymentDetails['totalPayable'].toString()) -
                          double.parse(cashback.toString())) <
                  0) {
                walletUsed = double.parse(balance.toString());
              } else {
                walletUsed =
                    double.parse(paymentDetails['totalPayable'].toString()) -
                        double.parse(cashback.toString());
              }
            } else {
              walletUsed = 0;
            }
          }
        }
        newObj = {
          ...newObj,
          "cashbackAmount": cashbackUsed,
          "walletAmount": walletUsed
        };
        debugPrint('cashb if 1: ${orderObj['cashbackAmount']}');
      }

      debugPrint('cashb if : ${orderObj['cashbackAmount']}');
      orderID = args['existingOrderId'];
      await FirebaseFirestore.instance
          .collection('orders')
          .doc(orderID)
          .update(newObj);
    } else {
      debugPrint('cashb else : ${orderObj['cashbackAmount']}');
      orderID = await FirebaseFirestore.instance
          .collection('orders')
          .add(orderObj)
          .then((value) => value.id);
    }
    setState(() {
      createdOrderId = orderID;
    });
    // if (isCod) {
    //   if (getCondition(userData, args)) {
    //     await FirebaseFunctions.instance
    //         .httpsCallable('wallet-orderPaymentWithWallet')
    //         .call({...orderObj, "createdAt": "", "orderDocId": orderID});
    //   } else {
    //     await FirebaseFunctions.instance
    //         .httpsCallable('payments-ac_paymentWithCash')
    //         .call({...orderObj, "createdAt": "", "orderDocId": orderID});
    //   }
    // }
  }

  getAmountDetails({type, paymentDetails}) {
    dynamic userData = Provider.of<Auth>(context, listen: false).userData;
    if (walletInfo == null) return 0.0;
    var balance = userData['wallet']['balance'];
    var cashback = userData['wallet']['cashback'];

    switch (type) {
      case 'cashback':
        if (!isWalletUsed) return userData['wallet']['cashback'];
        if (double.parse(paymentDetails['totalPayable'].toString()) <
            walletInfo['minOrderAmnt']) {
          return userData['wallet']['cashback'];
        } else {
          var cashbackUsed =
              double.parse(paymentDetails['totalPayable'].toString()) > cashback
                  ? cashback
                  : double.parse(paymentDetails['totalPayable'].toString());

          if (cashbackUsed > walletInfo['maxWalletAmntPerOrder']) {
            cashbackUsed = walletInfo['maxWalletAmntPerOrder'];
          }
          return cashback - cashbackUsed;
        }

      case "wallet":
      default:
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

  void handleCashOnDelivery({
    totalAmount,
    paymentDetails,
    address,
    couponId,
    couponName,
    couponDiscount,
    isWalletUsed = false,
    args,
  }) async {
    var confirmation = await showDialog(
      context: context,
      builder: (context) => Dialog(
        child: Container(
          // height: MediaQuery.of(context).size.width * 0.3,
          padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Are you sure you want to use this payment method?',
                  style: TextStyle(
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
                        onTap: () => Navigator.of(context).pop(false),
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                              vertical: 5, horizontal: 15),
                          child: const Text('No'),
                        ),
                      ),
                      const SizedBox(width: 10),
                      InkWell(
                        onTap: () => Navigator.of(context).pop(true),
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                              vertical: 5, horizontal: 15),
                          child: const Text('Yes'),
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
    if (!confirmation) {
      return;
    }
    showDialog(
        barrierDismissible: false,
        context: (context),
        builder: (context) => loader(context));
    await createOrder(
      paymentDetails: paymentDetails,
      address: address,
      couponId: couponId,
      couponName: couponName,
      couponDiscount: couponDiscount,
      isCod: true,
      args: args,
    );

    Navigator.pop(context);

    orderSuccesDialog();
  }

  void handleOnlinePayment(
      {totalAmount,
      paymentDetails,
      address,
      couponId,
      couponName,
      couponDiscount,
      isWalletUsed = false,
      args}) async {
    var confirmation = await showDialog(
      context: context,
      builder: (context) => Dialog(
        child: Container(
          // height: MediaQuery.of(context).size.width * 0.3,
          padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Are you sure you want to use this payment method?',
                  style: TextStyle(
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
                        onTap: () => Navigator.of(context).pop(false),
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                              vertical: 5, horizontal: 15),
                          child: const Text('No'),
                        ),
                      ),
                      const SizedBox(width: 10),
                      InkWell(
                        onTap: () => Navigator.of(context).pop(true),
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                              vertical: 5, horizontal: 15),
                          child: const Text('Yes'),
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
    if (!confirmation) {
      return;
    }
    showDialog(
        barrierDismissible: false,
        context: (context),
        builder: (context) => loader(context));

    var payableAmount = !isWalletUsed
        ? double.parse((args['paymentDetails']['totalPayable']).toString())
            .toStringAsFixed(2)
        : double.parse(
                    (args['paymentDetails']['totalPayable'] - discountedAmount)
                        .toString()) <
                0
            ? 00.00
            : double.parse(
                (args['paymentDetails']['totalPayable'] - discountedAmount)
                    .toString());


                    if (!confirmation) {
      return;
    }
    showDialog(
        barrierDismissible: false,
        context: (context),
        builder: (context) => loader(context));

        // makePayment(payableAmount.toString());
        await generate_ODID();

        await createOrder(
      paymentDetails: paymentDetails,
      address: address,
      couponId: couponId,
      couponName: couponName,
      couponDiscount: couponDiscount,
      args: args,
    );
    

    Navigator.pop(context);

    orderSuccesDialog();


  }

  getCondition(userData, args) {
    if (!isWalletUsed) {
      return false;
    }

    if (double.parse(args['paymentDetails']['totalPayable'].toString()) <
        walletInfo['minOrderAmnt']) {
      dynamic totalAmount =
          double.parse(args['paymentDetails']['totalPayable'].toString());
      dynamic wallet = userData['wallet']['balance'];
      if ((totalAmount - wallet <= 0)) {
        return true;
      }
      return false;
    } else {
      dynamic totalAmount =
          double.parse(args['paymentDetails']['totalPayable'].toString());
      dynamic cashBack = userData['wallet']['cashback'];
      dynamic usableCashback = double.parse(cashBack.toString()) >
              walletInfo['maxWalletAmntPerOrder']
          ? walletInfo['maxWalletAmntPerOrder']
          : double.parse(cashBack.toString());
      dynamic wallet = userData['wallet']['balance'];

      if ((totalAmount - usableCashback - double.parse(wallet.toString()) <=
          0)) {
        return true;
      }
      return false;
    }
  }

  getWalletAmount(userData, args) {
    if (!isWalletUsed) {
      return userData['wallet']['balance'];
    }
    var balance = userData['wallet']['balance'];
    var maximumCashback = walletInfo['maxWalletAmntPerOrder'];
    var cashback = userData['wallet']['cashback'];
    var paymentDetails = args['paymentDetails'];
    var walletUsed = 0.0;

    if (cashback > maximumCashback) {
      var usableCashback = cashback - maximumCashback;
      if (usableCashback -
              double.parse(paymentDetails['totalPayable'].toString()) <
          0) {
        if (double.parse(balance.toString()) -
                (double.parse(paymentDetails['totalPayable'].toString()) -
                    usableCashback) <
            0) {
          walletUsed = double.parse(balance.toString());
        } else {
          walletUsed = double.parse(paymentDetails['totalPayable'].toString()) -
              usableCashback;
        }
      } else {
        walletUsed = 0;
      }
    } else {
      if (cashback - double.parse(paymentDetails['totalPayable'].toString()) <
          0) {
        if (double.parse(balance.toString()) -
                (double.parse(paymentDetails['totalPayable'].toString()) -
                    cashback) <
            0) {
          walletUsed = double.parse(balance.toString());
        } else {
          walletUsed = double.parse(paymentDetails['totalPayable'].toString()) -
              cashback;
        }
      } else {
        walletUsed = 0;
      }
    }

    return double.parse(balance.toString()) - walletUsed;
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final dynamic args = ModalRoute.of(context)!.settings.arguments;
    final cartData = Provider.of<Cart>(context);
    final userData = Provider.of<Auth>(context).userData;

    return SafeArea(
        child: Scaffold(
      backgroundColor: AppTheme().scaffoldColor,
      body: SizedBox(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ScreenHeader(size: size, title: "Order Payment"),
                    const SizedBox(height: 30),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 15),
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 15, vertical: 15),
                        width: double.infinity,
                        decoration: const BoxDecoration(
                          boxShadow: [
                            BoxShadow(
                                blurRadius: 0,
                                color: Color.fromARGB(255, 199, 198, 198),
                                offset: Offset(0, 0),
                                spreadRadius: 1)
                          ],
                          color: Colors.white,
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const SizedBox(
                              height: 5,
                            ),
                            Text(
                              "PRICE DETAILS  (${cartData.cart.length} Item${cartData.cart.length > 1 ? "s" : ""})",
                              style: AppTheme().outfitStyle(),
                            ),
                            const SizedBox(
                              height: 5,
                            ),
                            const Divider(
                                color: Color.fromARGB(255, 155, 154, 154)),
                            const SizedBox(
                              height: 10,
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Subtotal',
                                  style: AppTheme().outfitStyle(),
                                ),
                                Text(
                                    "${Constants().rupees} ${double.parse(args['paymentDetails']['totalMrp'].toString()).toStringAsFixed(2)}"),
                              ],
                            ),
                            SizedBox(
                              height:
                                  args['paymentDetails']['discountOnMrp'] != 0
                                      ? 20
                                      : 0,
                            ),
                            args['paymentDetails']['discountOnMrp'] != 0
                                ? Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        'Offer Discount',
                                        style: AppTheme().outfitStyle(),
                                      ),
                                      Text(
                                        args['paymentDetails']['delivery']
                                                    ['deliveryCost'] ==
                                                0
                                            ? "Free"
                                            : "- ${Constants().rupees} ${double.parse(args['paymentDetails']['discountOnMrp'].toString()).toStringAsFixed(2)}",
                                        style: AppTheme().outfitStyle(
                                          color: const Color.fromARGB(
                                              255, 64, 189, 110),
                                        ),
                                      ),
                                    ],
                                  )
                                : const SizedBox(),
                            args['isPointsApplied']
                                ? Column(
                                    children: [
                                      const SizedBox(
                                        height: 20,
                                      ),
                                      Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: [
                                          Text(
                                            'Loyalty Points Discount',
                                            style: AppTheme().outfitStyle(),
                                          ),
                                          Text(
                                            "- ${Constants().rupees} ${args['pointDiscount'].toString()}",
                                            style: AppTheme().outfitStyle(
                                              color: const Color.fromARGB(
                                                  255, 64, 189, 110),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  )
                                : const SizedBox(),
                            SizedBox(
                              height:
                                  args['paymentDetails']['discountOnMrp'] != 0
                                      ? 20
                                      : 0,
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Delivery Charges',
                                  style: AppTheme().outfitStyle(),
                                ),
                                Text(
                                  args['paymentDetails']['delivery']
                                              ['deliveryCost'] ==
                                          0
                                      ? "Free"
                                      : "${Constants().rupees} ${double.parse(args['paymentDetails']['delivery']['deliveryCost'].toString()).toStringAsFixed(2)}",
                                  style: AppTheme().outfitStyle(
                                      color: args['paymentDetails']['delivery']
                                                  ['deliveryCost'] ==
                                              0
                                          ? const Color.fromARGB(
                                              255, 64, 189, 110)
                                          : Colors.black),
                                ),
                              ],
                            ),
                            const SizedBox(
                              height: 15,
                            ),
                            const Divider(
                                color: Color.fromARGB(255, 155, 154, 154)),
                            const SizedBox(
                              height: 15,
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Total amount',
                                  style: AppTheme()
                                      .outfitStyle(fontWeight: FontWeight.w600),
                                ),
                                Text(
                                  args['isPointsApplied']
                                      ? '${Constants().rupees} ${args['totalAmount'].toString()}'
                                      : '${Constants().rupees} ${double.parse(args['paymentDetails']['totalPayable'].toString()).toStringAsFixed(2)}',
                                  style: AppTheme().outfitStyle(
                                      color: AppTheme().secondaryColor),
                                ),
                              ],
                            ),
                            const SizedBox(
                              height: 15,
                            ),
                            userData != null &&
                                    walletInfo != null &&
                                    walletInfo['active'] &&
                                    (userData['wallet']['balance'] != 0 ||
                                        userData['wallet']['cashback'] != 0)
                                ? Container(
                                    // color: Colors.red,
                                    child: Row(
                                      children: [
                                        Expanded(
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              InkWell(
                                                onTap: () {
                                                  if (!isWalletUsed) {
                                                    var cashBack =
                                                        userData['wallet']
                                                            ['cashback'];
                                                    var limit = walletInfo[
                                                        'maxWalletAmntPerOrder'];

                                                    var usableCashback =
                                                        cashBack > limit
                                                            ? limit
                                                            : cashBack;
                                                    setState(() {
                                                      isWalletUsed = true;
                                                      discountedAmount =
                                                          userData['wallet']
                                                                  ['balance'] +
                                                              usableCashback;
                                                    });
                                                  } else {
                                                    setState(() {
                                                      isWalletUsed = false;
                                                      discountedAmount = 0;
                                                    });
                                                  }
                                                  // setState(() {
                                                  //   isWalletUsed =
                                                  //       !isWalletUsed;
                                                  // });
                                                },
                                                child: Row(
                                                  children: [
                                                    SizedBox(
                                                      width: 20,
                                                      height: 20,
                                                      child: Checkbox(
                                                        activeColor: AppTheme()
                                                            .secondaryColor,
                                                        value: isWalletUsed,
                                                        onChanged: (value) {
                                                          // args['isPointsApplied'] 
                                                          // ? Fluttertoast.showToast(msg: "Points cannot be used with wallet")
                                                          // :
                                                          if ((double.parse(args[
                                                                              'paymentDetails']
                                                                          [
                                                                          'totalMrp']
                                                                      .toString()) *
                                                                  1) >
                                                              (walletInfo[
                                                                      'minOrderAmnt'] *
                                                                  1)) {
                                                            if (value == true) {
                                                              var cashBack =
                                                                  userData[
                                                                          'wallet']
                                                                      [
                                                                      'cashback'];
                                                              var limit =
                                                                  walletInfo[
                                                                      'maxWalletAmntPerOrder'];

                                                              var usableCashback =
                                                                  cashBack >
                                                                          limit
                                                                      ? limit
                                                                      : cashBack;
                                                              setState(() {
                                                                isWalletUsed =
                                                                    true;
                                                                discountedAmount =
                                                                    userData['wallet']
                                                                            [
                                                                            'balance'] +
                                                                        usableCashback;
                                                              });
                                                            } else {
                                                              setState(() {
                                                                isWalletUsed =
                                                                    false;
                                                                discountedAmount =
                                                                    0;
                                                              });
                                                            }
                                                          } else {
                                                            Fluttertoast.showToast(
                                                                msg:
                                                                    'Order Amount should be more than ${walletInfo['minOrderAmnt']} to use cashback');
                                                          }
                                                        },
                                                      ),
                                                    ),
                                                    const SizedBox(width: 5),
                                                    Text(
                                                      "Use Saved Balance",
                                                      style: AppTheme()
                                                          .outfitStyle(
                                                              fontWeight:
                                                                  FontWeight
                                                                      .w600,
                                                              fontSize: 13),
                                                    )
                                                  ],
                                                ),
                                              ),
                                              const SizedBox(height: 10),
                                              Padding(
                                                padding: const EdgeInsets.only(
                                                    left: 25.0),
                                                child: Text(
                                                  'Wallet: ₹${getWalletAmount(userData, args)}',
                                                  style: AppTheme().outfitStyle(
                                                      fontSize: 12,
                                                      fontWeight:
                                                          FontWeight.w500),
                                                ),
                                              ),
                                              const SizedBox(height: 10),
                                              Padding(
                                                padding: const EdgeInsets.only(
                                                    left: 25.0),
                                                child: Text(
                                                  'Cashback: ₹${getAmountDetails(type: 'cashback', paymentDetails: args['paymentDetails']).toStringAsFixed(2)}',
                                                  // 'Cashback: ₹${!isWalletUsed ? userData['wallet']['cashback'] : userData['wallet']['cashback'] - double.parse(args['paymentDetails']['totalPayable'].toString()) < 0 ? 00.00 : (userData['wallet']['cashback'] - double.parse(args['paymentDetails']['totalPayable'].toString())).toStringAsFixed(2)}',
                                                  style: AppTheme().outfitStyle(
                                                      fontSize: 12,
                                                      fontWeight:
                                                          FontWeight.w500),
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                        isWalletUsed
                                            ? Text(

                                              args['isPointsApplied'] 
                                              ? '-₹${discountedAmount > double.parse(args['totalAmount'].toString()) ? double.parse(args['totalAmount'].toString()).toStringAsFixed(2) : discountedAmount}'
                                              :
                                                '-₹${discountedAmount > double.parse(args['paymentDetails']['totalPayable'].toString()) ? double.parse(args['paymentDetails']['totalPayable'].toString()).toStringAsFixed(2) : discountedAmount}',
                                                style: const TextStyle(
                                                  color: Color.fromARGB(
                                                    255,
                                                    64,
                                                    189,
                                                    110,
                                                  ),
                                                ),
                                              )
                                            : const SizedBox()
                                      ],
                                    ),
                                  )
                                : const SizedBox(),
                            userData != null &&
                                    (userData['wallet']['balance'] != 0 ||
                                        userData['wallet']['cashback'] != 0)
                                ? const Divider(
                                    color: Color.fromARGB(255, 155, 154, 154))
                                : const SizedBox(),
                            SizedBox(
                              height: userData != null &&
                                      (userData['wallet']['balance'] != 0 ||
                                          userData['wallet']['cashback'] != 0)
                                  ? 15
                                  : 0,
                            ),
                            userData != null &&
                                    (userData['wallet']['balance'] != 0 ||
                                        userData['wallet']['cashback'] != 0)
                                ? Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        'You Pay',
                                        style: AppTheme().outfitStyle(
                                            fontWeight: FontWeight.w600),
                                      ),
                                      Text(
                                        args['isPointsApplied']
                                            ? '${Constants().rupees} ${!isWalletUsed ? double.parse((args['totalAmount']).toString()).toStringAsFixed(2) : double.parse((args['totalAmount'] - discountedAmount).toString()) < 0 ? 00.00 : double.parse((args['totalAmount'] - discountedAmount).toString()).toStringAsFixed(2)}'
                                            : '${Constants().rupees} ${!isWalletUsed ? double.parse((args['paymentDetails']['totalPayable']).toString()).toStringAsFixed(2) : double.parse((args['paymentDetails']['totalPayable'] - discountedAmount).toString()) < 0 ? 00.00 : double.parse((args['paymentDetails']['totalPayable'] - discountedAmount).toString()).toStringAsFixed(2)}',
                                        style: AppTheme().outfitStyle(
                                            color: AppTheme().secondaryColor),
                                      ),
                                    ],
                                  )
                                : const SizedBox()
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 30),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 15),
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 15, vertical: 15),
                        width: double.infinity,
                        decoration: const BoxDecoration(
                          boxShadow: [
                            BoxShadow(
                                blurRadius: 0,
                                color: Color.fromARGB(255, 199, 198, 198),
                                offset: Offset(0, 0),
                                spreadRadius: 1)
                          ],
                          color: Colors.white,
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const SizedBox(
                              height: 5,
                            ),
                            Text(
                              "PAYMENT MODES",
                              style: AppTheme().outfitStyle(),
                            ),
                            const SizedBox(
                              height: 5,
                            ),
                            const Divider(
                                color: Color.fromARGB(255, 155, 154, 154)),
                            const SizedBox(
                              height: 5,
                            ),
                            getCondition(userData, args)
                                ? const SizedBox()
                                : args['couponId'].toString().isNotEmpty &&
                                        args['isCod'] == false
                                    ? const SizedBox()
                                    : args.containsKey('isRedo') &&
                                            args['isRedo']
                                        ? const SizedBox()
                                        : InkWell(
                                            onTap: () {
                                              handleCashOnDelivery(
                                                isWalletUsed: isWalletUsed,
                                                totalAmount: double.parse(
                                                        args['paymentDetails']
                                                                ['totalPayable']
                                                            .toString())
                                                    .toStringAsFixed(2),
                                                paymentDetails:
                                                    args['paymentDetails'],
                                                address: args['address'],
                                                couponId: args['couponId'],
                                                couponName: args['couponName'],
                                                couponDiscount:
                                                    args['couponDiscount'],
                                                args: args,
                                              );
                                            },
                                            child: Container(
                                              width: double.infinity,
                                              // color: Colors.red,
                                              padding:
                                                  const EdgeInsets.symmetric(
                                                      vertical: 10),
                                              child: Row(
                                                mainAxisAlignment:
                                                    MainAxisAlignment
                                                        .spaceBetween,
                                                children: [
                                                  Expanded(
                                                    child: Row(
                                                      children: [
                                                        Text(
                                                          'Cash on Delivery',
                                                          style: AppTheme()
                                                              .outfitStyle(
                                                                  fontSize: 14),
                                                        ),
                                                        // Text(
                                                        //     "${Constants().rupees} ${double.parse(args['paymentDetails']['totalMrp'].toString()).toStringAsFixed(2)}"),
                                                      ],
                                                    ),
                                                  ),
                                                  Icon(
                                                      Icons
                                                          .arrow_forward_ios_rounded,
                                                      size: 16,
                                                      color: AppTheme()
                                                          .secondaryColor)
                                                ],
                                              ),
                                            ),
                                          ),
                            const SizedBox(height: 5),
                            const SizedBox(
                              height: 5,
                            ),
                            getCondition(userData, args)
                                ? const SizedBox(
                                    width: double.infinity,
                                    child: Center(
                                      child: Text(
                                          "Wallet balance covers the whole payment."),
                                    ),
                                  )
                                : InkWell(
                                    onTap: () {
                                      handleOnlinePayment(
                                          isWalletUsed: isWalletUsed,
                                          totalAmount: double.parse(
                                                  args['paymentDetails']
                                                          ['totalPayable']
                                                      .toString())
                                              .toStringAsFixed(2),
                                          paymentDetails:
                                              args['paymentDetails'],
                                          address: args['address'],
                                          couponId: args['couponId'],
                                          couponName: args['couponName'],
                                          couponDiscount:
                                              args['couponDiscount'],
                                          args: args);
                                    },
                                    child: Container(
                                      width: double.infinity,
                                      // color: Colors.red,
                                      padding: const EdgeInsets.symmetric(
                                          vertical: 10),
                                      child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: [
                                          Expanded(
                                            child: Row(
                                              children: [
                                                Text(
                                                  'Pay Online',
                                                  style: AppTheme().outfitStyle(
                                                      fontSize: 14),
                                                ),
                                                // Text(
                                                //     "${Constants().rupees} ${double.parse(args['paymentDetails']['totalMrp'].toString()).toStringAsFixed(2)}"),
                                              ],
                                            ),
                                          ),
                                          Icon(Icons.arrow_forward_ios_rounded,
                                              size: 16,
                                              color: AppTheme().secondaryColor)
                                        ],
                                      ),
                                    ),
                                  ),
                            const SizedBox(height: 5),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            getCondition(userData, args)
                ? Align(
                    alignment: Alignment.bottomCenter,
                    child: InkWell(
                        onTap: () {
                          walletInfo != null
                              ? handleCashOnDelivery(
                                  totalAmount: double.parse(
                                          args['paymentDetails']['totalPayable']
                                              .toString())
                                      .toStringAsFixed(2),
                                  paymentDetails: args['paymentDetails'],
                                  address: args['address'],
                                  couponId: args['couponId'],
                                  couponName: args['couponName'],
                                  couponDiscount: args['couponDiscount'],
                                  args: args,
                                )
                              : () {};
                        },
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          decoration: BoxDecoration(
                            color: walletInfo != null
                                ? AppTheme().secondaryColor
                                : const Color.fromARGB(255, 137, 207, 128),
                            boxShadow: const [
                              BoxShadow(
                                color: Color.fromARGB(255, 179, 179, 179),
                                blurRadius: 3,
                                blurStyle: BlurStyle.outer,
                                spreadRadius: 0,
                              ),
                            ],
                          ),
                          width: double.infinity,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                'Place Order',
                                style: AppTheme().outfitStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w600),
                              ),
                              const SizedBox(
                                width: 5,
                              ),
                              const Icon(
                                Icons.check_circle,
                                color: Colors.white,
                                size: 18,
                              )
                            ],
                          ),
                        )),
                  )
                : const SizedBox()
          ],
        ),
      ),
    ));
  }
}
