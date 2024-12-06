
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:iconsax/iconsax.dart';
import 'package:intl/intl.dart';
import 'package:shein/constants/constants.dart';
import 'package:shein/providers/cartProvider.dart';
import 'package:shein/providers/userProvider.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/utils/databaseServices.dart';
import 'package:shein/widgets/screenHeader.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class OrderSummaryScreen extends StatefulWidget {
  const OrderSummaryScreen({super.key});

  @override
  State<OrderSummaryScreen> createState() => _OrderSummaryScreenState();
}

class _OrderSummaryScreenState extends State<OrderSummaryScreen> {
  String purchaseType = 'personal';
  String addressType = "shipping";
  dynamic addressToDeliver;
  dynamic paymentSummaryDetails;
  bool loading = false;
  String couponText = '';
  String couponDiscount = "";
  bool isCouponApplied = false;
  bool isPointsApplied = false;
  String appliedCouponId = '';
  int userPoints = 0;
  double pointUsed = 0;
  int totalAmount = 0;
  int totalPointDiscount = 0;

  final ScrollController _scrollController = ScrollController();
  bool isCodApplied = true;

  final Map<String, dynamic> carts = {
    'items': [
      {
        'variant': {'weight': 500},
        'product': {
          'metafields': {
            'carbon': {
              'organic': 0.091,
              'non_organic': 0.128,
            },
          }
        },
        'quantity': 2,
      },
      // Add more cart items here
    ],
  };

  double calculateCO2Emissions({isTotal = false}) {
    double totalQuantity = 0;
    double totalPerc = 0;
    double calculatedOrganic = 0;
    double calculatedNonOrganic = 0;
    var cart = Provider.of<Cart>(context).cart;

    for (var item in cart) {
      if (item['carbonEmission'] != null) {
        double weight = double.parse(item['shippingWt'].toString()) / 1000;
        double metaOrg =
            double.parse(item['carbonEmission']['organic'].toString());
        double metaNon =
            double.parse(item['carbonEmission']['nonOrganic'].toString());

        double organicProduct = metaOrg * weight;
        double nonOrganicProduct = metaNon * weight;

        double organic = organicProduct * item['quantity'];
        double nonOrganic = nonOrganicProduct * item['quantity'];

        double net = nonOrganic - organic;
        double div = net * 100;
        double singlePerc = div / nonOrganic;
        double netPerc = singlePerc * item['quantity'];

        if (metaOrg != null || metaNon != null) {
          totalQuantity += item['quantity'];
        }

        totalPerc += netPerc;
        calculatedOrganic += organic;
        calculatedNonOrganic += nonOrganic;
      }
    }

    double avgPerc = totalPerc / totalQuantity;
    double total = calculatedNonOrganic - calculatedOrganic;
    double percValue = total * 100;
    double perc = percValue / calculatedNonOrganic;
    if (totalQuantity == 0) {
      return 0;
    }
    if (isTotal) {
      return total;
    } else {
      return perc;
    }
  }

  handleChangeAddress() async {
    var newAddress = await Navigator.of(context).pushNamed('/selectAddress');
    if (newAddress != null) {
      setState(() {
        addressToDeliver = newAddress;
      });
    }
  }

  initializeAddress() {
    if (FirebaseAuth.instance.currentUser?.uid != null &&
        Provider.of<Auth>(context, listen: false).userData['defaultAddress'] !=
            null) {
      setState(() {
        addressToDeliver = Provider.of<Auth>(context, listen: false)
            .userData['defaultAddress'];
      });
    }
  }

  Future<void> getUserPoints() async {
    if (FirebaseAuth.instance.currentUser?.uid == null) {
      print("Please log in");
    } else {
      try {
        String userId = FirebaseAuth.instance.currentUser!.uid;
        DocumentSnapshot<Map<String, dynamic>> userDoc = await FirebaseFirestore
            .instance
            .collection('users')
            .doc(userId)
            .get();

        if (userDoc.exists) {
          // Check if the 'point' field exists in the user document
          if (userDoc.data()?['point'] != null) {
            int totalPoints = userDoc.data()?['point']['totalPoints'];
            userPoints = totalPoints;
            print("Total Points: $totalPoints");
          } else {
            print("User document does not contain 'point' field");
          }
        } else {
          print("User document not found");
        }
      } catch (e) {
        print("Error retrieving user data: $e");
      }
    }
  }

  getOrderSummaryDetails({couponRemoved = false}) async {
    if (couponRemoved) {
      showDialog(
        barrierDismissible: false,
        context: context,
        builder: (context) => Dialog(
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  width: 24,
                  height: 24,
                  child: CircularProgressIndicator(
                    color: AppTheme().secondaryColor,
                  ),
                ),
                const SizedBox(width: 10),
                const Text('Loading...'),
              ],
            ),
          ),
        ),
      );
    }
    setState(() {
      loading = true;
    });
    var isGst = await DatabaseService().getGstAppilicableInfo();
    var cartData = Provider.of<Cart>(context, listen: false).cart;
    Map<String, dynamic> address = addressToDeliver;
    address.remove('id');
    address.remove('createdAt');

    var data = await FirebaseFunctions.instance
        .httpsCallable('orders-getOrderPaymentDetails')
        .call({
      "address": address,
      "products": cartData,
      "isGstApplicable": isGst,
      "customDeliverySettings": null
    });

    setState(() {
      loading = false;
      paymentSummaryDetails = data.data;
    });

    if (couponRemoved) {
      Navigator.pop(context);
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    initializeAddress();
    getOrderSummaryDetails();
    getUserPoints();
    super.initState();
  }

  bool isDateInFuture(DateTime date) {
    final now = DateTime.now();
    return date.isAfter(now);
  }

  Future<void> redeemLoyaltyPoints() async {
    try {
      // Fetch minOrderAmt from Firestore
      DocumentSnapshot<Map<String, dynamic>> featuresDoc =
          await FirebaseFirestore.instance
              .collection('features')
              .doc('points')
              .get();

      if (featuresDoc.exists) {
        // Check if 'redeem' and 'minOrderAmt' fields exist
        if (featuresDoc.data()?['redeem'] != null &&
            featuresDoc.data()?['redeem']['minOrderAmt'] != null) {
          int minOrderAmt = featuresDoc.data()?['redeem']['minOrderAmt'];
          int discountPercentage = featuresDoc.data()?['redeem']['percent'];
          double conversionRate = featuresDoc.data()?['conversionRate'];

          print("Minimum Order Amount: $minOrderAmt");
          print("Discount Percent: $discountPercentage");
          print("Conversion Rate: $conversionRate");

          // Assuming paymentSummaryDetails is a map with 'totalPayable' field
          int totalAmountToPaid = paymentSummaryDetails['totalPayable'];
          print("Total Payable : $totalAmountToPaid");

          int discountAvailable = totalAmountToPaid * discountPercentage ~/ 100;
          print("Discount Available : $discountAvailable");

          if (discountAvailable > userPoints) {
            pointUsed = userPoints.toDouble();
          } else {
            pointUsed = discountAvailable * 1 / conversionRate;
          }

          print("Point Used : $pointUsed");
          // Check if totalPayable is greater than minOrderAmt
          if (totalAmountToPaid > minOrderAmt) {
            double pointsValue = pointUsed * conversionRate;
            print("Total Point Discount : $pointsValue");

            totalPointDiscount = pointsValue.toInt();
            totalAmountToPaid -= pointsValue.toInt();
            totalAmount = totalAmountToPaid;
            print("After points : $totalAmountToPaid");
          } else {
            Fluttertoast.showToast(
                msg: "Minimum Order Amount should be more than  $minOrderAmt");
          }
        } else {
          print(
              "Fields 'redeem' or 'minOrderAmt' not found in 'features/points' document");
        }
      } else {
        print("Document 'features/points' not found");
      }
    } catch (e) {
      print("Error fetching data: $e");
    }

    setState(() {
      isPointsApplied = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    final cartData = Provider.of<Cart>(context);

    handleCoupon() async {
      dynamic handleCouponSubmit({isCod = true, manualText = ""}) async {
        print("CHECKING TEXT $couponText $manualText");
        if (manualText.isEmpty && couponText.isEmpty) {
          Fluttertoast.showToast(msg: 'Enter Code.');
          return;
        }

        String usableText = manualText.isNotEmpty ? manualText : couponText;

        showDialog(
          barrierDismissible: false,
          context: context,
          builder: (context) => Dialog(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    width: 24,
                    height: 24,
                    child: CircularProgressIndicator(
                      color: AppTheme().secondaryColor,
                    ),
                  ),
                  const SizedBox(width: 10),
                  const Text('Loading...'),
                ],
              ),
            ),
          ),
        );
        var isGst = await DatabaseService().getGstAppilicableInfo();

        var data = await FirebaseFunctions.instance
            .httpsCallable('orders-verifyCouponCode')
            .call({
          "userId": FirebaseAuth.instance.currentUser?.uid,
          "isGstApplicable": isGst,
          "code": usableText,
          "paymentDetails": paymentSummaryDetails
        });
        dynamic res = data.data;
        if (!res['success']) {
          print('ascaas');
          Fluttertoast.showToast(msg: res['failureMsg'].toString());
          Navigator.pop(context);
          return;
        }

        print('RESSSSSS ');
        print(res);
        setState(() {
          paymentSummaryDetails = {
            ...paymentSummaryDetails,
            "totalPayable": res['details']['totalAmountToPaid'],
          };
          couponDiscount =
              (double.parse(res['details']['totalCouponDiscount'].toString()))
                  .toStringAsFixed(2);
          isCouponApplied = true;
          appliedCouponId = res['data']['couponId'];
          isCodApplied = res['data']['codAvailable'];
        });

        Navigator.pop(context);
        Navigator.pop(context);
      }

      var res = await showModalBottomSheet(
        context: context,
        builder: (context) {
          return StatefulBuilder(
            builder: (context, setState) {
              return SizedBox(
                height: size.height * 0.95,
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      const SizedBox(height: 15),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 15),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text("Apply Coupon",
                                style: TextStyle(fontWeight: FontWeight.bold)),
                            InkWell(
                                onTap: () => Navigator.pop(context),
                                child: const Icon(
                                  Icons.close,
                                  size: 20,
                                )),
                          ],
                        ),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Container(
                        // height: 40,
                        // color: const Color.fromARGB(255, 236, 242, 254),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 15, vertical: 15),
                        child: Stack(
                          children: [
                            SizedBox(
                              height: 40,
                              child: TextFormField(
                                onChanged: (value) {
                                  setState(() {
                                    couponText = value.toString();
                                  });
                                },
                                cursorColor: AppTheme().secondaryColor,
                                style: const TextStyle(fontSize: 12),
                                decoration: InputDecoration(
                                  filled: true,
                                  fillColor: Colors.white,
                                  focusedBorder: const OutlineInputBorder(
                                    borderSide: BorderSide(
                                        color: Colors.black, width: 0.5),
                                  ),
                                  contentPadding: const EdgeInsets.symmetric(
                                      horizontal: 10.0),
                                  border: const OutlineInputBorder(
                                    borderSide: BorderSide(
                                        color: Colors.black, width: 0.5),
                                  ),
                                  enabledBorder: const OutlineInputBorder(
                                    borderSide: BorderSide(
                                        color: Colors.black, width: 0.5),
                                  ),
                                  hintText: "Enter Coupon Code",
                                  hintStyle: AppTheme().outfitStyle(
                                      color: const Color.fromARGB(
                                        255,
                                        160,
                                        159,
                                        159,
                                      ),
                                      fontSize: 12),
                                ),
                              ),
                            ),
                            Positioned(
                                // top: 50,
                                // bottom: 50,
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 15,
                                child: Align(
                                  alignment: Alignment.centerRight,
                                  child: InkWell(
                                    onTap: handleCouponSubmit,
                                    child: Padding(
                                      padding: const EdgeInsets.only(
                                          top: 8.0, bottom: 8, left: 8),
                                      child: Text(
                                        'Apply',
                                        style: TextStyle(
                                            color: AppTheme().secondaryColor),
                                      ),
                                    ),
                                  ),
                                ))
                          ],
                        ),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      Container(
                        child: FutureBuilder(
                          future: FirebaseFirestore.instance
                              .collection('features')
                              .doc('coupons')
                              .get()
                              .then((value) => value['showAllCoupons']),
                          builder: (context, snapshot) {
                            if (snapshot.hasData == false) {
                              return SizedBox(
                                width: 20,
                                height: 20,
                                child: Center(
                                  child: CircularProgressIndicator(
                                    color: AppTheme().secondaryColor,
                                  ),
                                ),
                              );
                            }
                            if (!snapshot.data) {
                              return const Text('No Coupons Available');
                            }
                            return Container(
                              child: FutureBuilder(
                                future: FirebaseFirestore.instance
                                    .collection('features')
                                    .doc('coupons')
                                    .get()
                                    .then((value) => value['showAllCoupons']),
                                builder: (context, snapshot) {
                                  if (snapshot.hasData == false) {
                                    return SizedBox(
                                      width: 20,
                                      height: 20,
                                      child: Center(
                                        child: CircularProgressIndicator(
                                          color: AppTheme().secondaryColor,
                                        ),
                                      ),
                                    );
                                  }
                                  if (!snapshot.data) {
                                    return const Text('No Coupons Available');
                                  }
                                  return Container(
                                    child: FutureBuilder(
                                      future: FirebaseFirestore.instance
                                          .collection('features')
                                          .doc('coupons')
                                          .collection('codes')
                                          .orderBy("createdAt",
                                              descending: true)
                                          .get(),
                                      builder: (context, snapshot) {
                                        if (snapshot.hasData == false) {
                                          return SizedBox(
                                            width: 20,
                                            height: 20,
                                            child: Center(
                                              child: CircularProgressIndicator(
                                                color:
                                                    AppTheme().secondaryColor,
                                              ),
                                            ),
                                          );
                                        }

                                        if (snapshot.data!.docs.isEmpty) {
                                          return const Text(
                                              'No Coupons Available');
                                        }
                                        // var data = snapshot.data!.docs.where(
                                        //     (e) =>
                                        //         isDateInFuture(DateTime.parse(
                                        //             e['validUpto'])) &&
                                        //         (e['qty'] - e['usage'] >= 1));
                                        var data =
                                            snapshot.data!.docs.where((coupon) {
                                          DateTime currentDate = DateTime.now();
                                          bool isSameOrBefore = DateTime.parse(
                                                      coupon['validUpto'])
                                                  .isAfter(currentDate) ||
                                              DateTime.parse(
                                                      coupon['validUpto'])
                                                  .isAtSameMomentAs(
                                                      currentDate);
                                          if (isSameOrBefore &&
                                              (coupon['qty'] -
                                                      coupon['usage'] >=
                                                  1)) {
                                            if (coupon['specificUsers']
                                                ['isAllowed']) {
                                              return coupon['specificUsers']
                                                      ['users']
                                                  .any((u) =>
                                                      u['id'] ==
                                                      FirebaseAuth.instance
                                                          .currentUser?.uid);
                                            } else {
                                              return true;
                                            }
                                          }
                                          return false;
                                        }).toList();

                                        return Container(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 15),
                                          child: Column(
                                            children: [
                                              ...(data.map((e) {
                                                return CouponCard(
                                                  e: e,
                                                  handleCouponSubmit:
                                                      handleCouponSubmit,
                                                  textController: couponText,
                                                );
                                              }).toList())
                                            ],
                                          ),
                                        );
                                      },
                                    ),
                                  );
                                },
                              ),
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        },
      );
    }


// print(paymentSummaryDetails);
    return SafeArea(
      child: Scaffold(
        backgroundColor: AppTheme().scaffoldColor,
        body: SizedBox(
          child: Column(
            children: [
              Expanded(
                child: SingleChildScrollView(
                  controller: _scrollController,
                  child: Column(
                    children: [
                      ScreenHeader(
                        size: size,
                        title: "Order Summary",
                        isBackButton: true,
                      ),

                      FirebaseAuth.instance.currentUser?.uid != null &&
                              Provider.of<Auth>(context)
                                      .userData['defaultAddress'] !=
                                  null
                          ? Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 15, vertical: 5),
                              color: Colors.white,
                              margin: const EdgeInsets.only(top: 10),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      SizedBox(
                                        width: size.width * 0.45,
                                        child: Row(
                                          children: [
                                            Text(
                                              "Shipping Address",
                                              style: AppTheme().outfitStyle(),
                                            ),
                                            SizedBox(
                                              width: 30,
                                              child: Radio(
                                                value: "shipping",
                                                groupValue: addressType,
                                                fillColor:
                                                    MaterialStatePropertyAll(
                                                        AppTheme()
                                                            .secondaryColor),
                                                onChanged: (value) {
                                                  setState(() {
                                                    addressType =
                                                        value.toString();
                                                  });
                                                },
                                              ),
                                            )
                                          ],
                                        ),
                                      ),
                                      // Container(
                                      //   width: size.width * 0.45,
                                      //   child: Row(
                                      //     mainAxisAlignment:
                                      //         MainAxisAlignment.end,
                                      //     children: [
                                      //       const Text(
                                      //         "Billing Address",
                                      //       ),
                                      //       SizedBox(
                                      //         width: 30,
                                      //         child: Radio(
                                      //           value: "billing",
                                      //           groupValue: addressType,
                                      //           fillColor:
                                      //               MaterialStatePropertyAll(
                                      //                   AppTheme()
                                      //                       .secondaryColor),
                                      //           onChanged: (value) {
                                      //             setState(() {
                                      //               addressType =
                                      //                   value.toString();
                                      //             });
                                      //           },
                                      //         ),
                                      //       )
                                      //     ],
                                      //   ),
                                      // )
                                    ],
                                  ),
                                  const Divider(
                                    height: 0,
                                  ),
                                  const SizedBox(height: 15),
                                  addressType == "shipping"
                                      ? addressToDeliver == null
                                          ? const SizedBox()
                                          : renderAddress(context)
                                      : Container(
                                          padding: const EdgeInsets.symmetric(
                                              vertical: 25),
                                          child: Text(
                                            "Same as shipping address",
                                            style: AppTheme().outfitStyle(),
                                          ),
                                        ),
                                  const SizedBox(height: 15),
                                  InkWell(
                                    onTap: handleChangeAddress,
                                    child: Container(
                                      width: double.infinity,
                                      padding: const EdgeInsets.symmetric(
                                          vertical: 10),
                                      margin: const EdgeInsets.only(bottom: 10),
                                      decoration: BoxDecoration(
                                          color: AppTheme().secondaryColor,
                                          borderRadius:
                                              BorderRadius.circular(0),
                                          boxShadow: const [
                                            BoxShadow(
                                                color: Color.fromARGB(
                                                    255, 132, 131, 131),
                                                blurRadius: 1,
                                                offset: Offset(0, 1),
                                                spreadRadius: 0)
                                          ]),
                                      child: Center(
                                          child: Text(
                                        'Change Or Add Address',
                                        style: AppTheme().outfitStyle(
                                            color: Colors.white,
                                            fontWeight: FontWeight.w500),
                                      )),
                                    ),
                                  )
                                ],
                              ),
                            )
                          : const SizedBox(),
                      cartData.cart.isEmpty
                          ? Container(
                              child: Center(
                                child: Text(
                                  "Your cart is empty.",
                                  style: AppTheme().outfitStyle(),
                                ),
                              ),
                            )
                          : Container(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 15),
                              color: Colors.white,
                              margin: const EdgeInsets.only(top: 10),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const SizedBox(
                                    height: 15,
                                  ),
                                  Text(
                                    "PRODUCTS",
                                    style: AppTheme().outfitStyle(),
                                  ),
                                  ...(cartData.cart.asMap().entries.map((e) {
                                    int index = e.key;
                                    dynamic value = e.value;
                                    return Container(
                                      margin: const EdgeInsets.only(top: 15),
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 10, vertical: 15),
                                      width: double.infinity,
                                      decoration: const BoxDecoration(
                                        // borderRadius: BorderRadius.circular(5),
                                        border: Border(
                                            top: BorderSide(
                                                color: Color.fromARGB(
                                                    255, 223, 223, 223),
                                                width: 1)),
                                        color: Colors.white,
                                      ),
                                      child: Row(
                                        children: [
                                          SizedBox(
                                            width: size.width * 0.25,
                                            child: Image.network(
                                                value['img']
                                                            .runtimeType
                                                            .toString() ==
                                                        '_Map<String, dynamic>'
                                                    ? value['img']['url']
                                                    : value['img'],
                                                fit: BoxFit.cover),
                                          ),
                                          const SizedBox(
                                            width: 15,
                                          ),
                                          Expanded(
                                              child: Container(
                                            child: Column(
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              mainAxisAlignment:
                                                  MainAxisAlignment
                                                      .spaceBetween,
                                              children: [
                                                Text(
                                                  "${Constants().rupees}  ${value['price'].toDouble().toString()}",
                                                  style: AppTheme().outfitStyle(
                                                    color: AppTheme()
                                                        .secondaryColor,
                                                  ),
                                                ),
                                                const SizedBox(
                                                  height: 10,
                                                ),
                                                Text(
                                                  value['name'],
                                                  style:
                                                      AppTheme().outfitStyle(),
                                                ),
                                                const SizedBox(
                                                  height: 10,
                                                ),
                                                Text(
                                                  // "Weight: ${value['pack']['weight']}",
                                                  " ",
                                                  style: AppTheme().outfitStyle(
                                                    fontSize: 11,
                                                    color: Colors.grey,
                                                  ),
                                                ),
                                                const SizedBox(height: 15),
                                                SizedBox(
                                                  width: double.infinity,
                                                  // color: Colors.green,
                                                  child: Text(
                                                    'QTY: ${value['quantity']}',
                                                    style: AppTheme()
                                                        .outfitStyle(),
                                                    textAlign: TextAlign.end,
                                                  ),
                                                )
                                              ],
                                            ),
                                          )),
                                        ],
                                      ),
                                    );
                                  }).toList()),
                                  SizedBox(
                                    height: isCouponApplied ? 10 : 0,
                                  ),
                                  isCouponApplied
                                      ? SizedBox(
                                          child: Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            children: [
                                              const Text(
                                                "Coupon Discount",
                                                style: TextStyle(
                                                    fontWeight:
                                                        FontWeight.w500),
                                              ),
                                              Text(
                                                "${Constants().rupees} $couponDiscount",
                                                style: const TextStyle(
                                                  color: Color.fromARGB(
                                                    255,
                                                    64,
                                                    189,
                                                    110,
                                                  ),
                                                ),
                                              ),
                                            ],
                                          ),
                                        )
                                      : const SizedBox(),
                                  SizedBox(height: isCouponApplied ? 15 : 0)
                                ],
                              ),
                            ),
                      // renderTypeOfPurchase(),
                      paymentSummaryDetails == null
                          ? Container(
                              margin: const EdgeInsets.only(top: 30),
                              child: CircularProgressIndicator(
                                color: AppTheme().secondaryColor,
                              ),
                            )
                          : Container(
                              margin: const EdgeInsets.only(top: 15),
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 15, vertical: 15),
                              width: double.infinity,
                              color: Colors.white,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  InkWell(
                                    onTap: () {
                                      isPointsApplied
                                          ? Fluttertoast.showToast(
                                              msg:
                                                  "You have already used loyalty points!")
                                          : handleCoupon();
                                    },
                                    child: Container(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 5, vertical: 10),
                                      decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(0),
                                          border: Border.all(
                                              color: AppTheme().secondaryColor,
                                              width: 1)),
                                      child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: [
                                          Container(
                                            child: Row(
                                              children: [
                                                Icon(
                                                  Iconsax.discount_shape5,
                                                  color: AppTheme().themeColor,
                                                ),
                                                const SizedBox(
                                                  width: 10,
                                                ),
                                                Text(
                                                  isCouponApplied
                                                      ? "$couponText Applied"
                                                      : "Apply Coupon",
                                                  style: AppTheme().outfitStyle(
                                                      color: AppTheme()
                                                          .secondaryColor,
                                                      fontWeight:
                                                          FontWeight.w600),
                                                ),
                                              ],
                                            ),
                                          ),
                                          isCouponApplied
                                              ? InkWell(
                                                  onTap: () async {
                                                    await getOrderSummaryDetails(
                                                        couponRemoved: true);
                                                    setState(() {
                                                      isCouponApplied = false;
                                                      couponText = "";
                                                    });
                                                  },
                                                  child: const Padding(
                                                    padding: EdgeInsets.only(
                                                        bottom: 4,
                                                        top: 4,
                                                        left: 8,
                                                        right: 8),
                                                    child: Text(
                                                      'Remove',
                                                      style: TextStyle(
                                                          fontWeight:
                                                              FontWeight.bold),
                                                    ),
                                                  ),
                                                )
                                              : Icon(
                                                  Icons.arrow_forward,
                                                  color:
                                                      AppTheme().secondaryColor,
                                                )
                                        ],
                                      ),
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 20,
                                  ),
                                  InkWell(
                                    onTap: () {
                                      isCouponApplied
                                          ? Fluttertoast.showToast(
                                              msg:
                                                  "You have already applied a coupon!")
                                          : redeemLoyaltyPoints();
                                    },
                                    child: Container(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 5, vertical: 10),
                                      decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(0),
                                          border: Border.all(
                                              color: AppTheme().secondaryColor,
                                              width: 1)),
                                      child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: [
                                          Container(
                                            child: Row(
                                              children: [
                                                Icon(
                                                  Iconsax.coin5,
                                                  color: AppTheme().themeColor,
                                                ),
                                                const SizedBox(
                                                  width: 10,
                                                ),
                                                Text(
                                                  isPointsApplied
                                                      ? " ${Constants().rupees} ${totalPointDiscount.toString()} Redeemed"
                                                      : "Redeem Points",
                                                  style: AppTheme().outfitStyle(
                                                      color: AppTheme()
                                                          .secondaryColor,
                                                      fontWeight:
                                                          FontWeight.w600),
                                                ),
                                              ],
                                            ),
                                          ),
                                          isPointsApplied
                                              ? InkWell(
                                                  onTap: () async {
                                                    setState(() {
                                                      isPointsApplied = false;
                                                      couponText = "";
                                                    });
                                                  },
                                                  child: const Padding(
                                                    padding: EdgeInsets.only(
                                                        bottom: 4,
                                                        top: 4,
                                                        left: 8,
                                                        right: 8),
                                                    child: Text(
                                                      'Remove',
                                                      style: TextStyle(
                                                          color: Colors.red,
                                                          fontWeight:
                                                              FontWeight.bold),
                                                    ),
                                                  ),
                                                )
                                              : Text(
                                                  "Available Points : $userPoints")
                                        ],
                                      ),
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 20,
                                  ),
                                  Text(
                                    "ORDER SUMMARY (${cartData.cart.length} Items)",
                                    style: AppTheme().outfitStyle(),
                                  ),
                                  const SizedBox(
                                    height: 5,
                                  ),
                                  const Divider(
                                      color:
                                          Color.fromARGB(255, 155, 154, 154)),
                                  const SizedBox(
                                    height: 10,
                                  ),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        'Subtotal',
                                        style: AppTheme().outfitStyle(),
                                      ),
                                      Text(
                                        "${Constants().rupees} ${double.parse(paymentSummaryDetails['totalMrp'].toString()).toStringAsFixed(2)}",
                                        style: AppTheme().outfitStyle(),
                                      ),
                                    ],
                                  ),
                                  SizedBox(
                                    height: isCouponApplied ? 20 : 20,
                                  ),
                                  isCouponApplied
                                      ? Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: [
                                            Text(
                                              'Coupon Discount',
                                              style: AppTheme().outfitStyle(),
                                            ),
                                            Text(
                                              "${Constants().rupees} $couponDiscount",
                                              style: AppTheme().outfitStyle(
                                                color: const Color.fromARGB(
                                                  255,
                                                  64,
                                                  189,
                                                  110,
                                                ),
                                              ),
                                            ),
                                          ],
                                        )
                                      : const SizedBox(),
                                  SizedBox(
                                    height: isCouponApplied ? 20 : 0,
                                  ),
                                  paymentSummaryDetails['discountOnMrp'] != 0
                                      ? Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: [
                                            Text(
                                              'Offer Discount',
                                              style: AppTheme().outfitStyle(),
                                            ),
                                            Text(
                                              "- ${Constants().rupees} ${double.parse(paymentSummaryDetails['discountOnMrp'].toString()).toStringAsFixed(2)}",
                                              style: AppTheme().outfitStyle(
                                                color: const Color.fromARGB(
                                                    255, 64, 189, 110),
                                              ),
                                            ),
                                          ],
                                        )
                                      : const SizedBox(),
                                  SizedBox(
                                    height: paymentSummaryDetails[
                                                'discountOnMrp'] !=
                                            0
                                        ? 15
                                        : 0,
                                  ),
                                  isPointsApplied
                                      ? Column(
                                          children: [
                                            Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment
                                                      .spaceBetween,
                                              children: [
                                                Text(
                                                  'Loyalty Points Discount',
                                                  style:
                                                      AppTheme().outfitStyle(),
                                                ),
                                                Text(
                                                  "- ${Constants().rupees} ${totalPointDiscount.toString()}",
                                                  style: AppTheme().outfitStyle(
                                                    color: const Color.fromARGB(
                                                        255, 64, 189, 110),
                                                  ),
                                                ),
                                              ],
                                            ),
                                            const SizedBox(
                                              height: 15,
                                            )
                                          ],
                                        )
                                      : const SizedBox(),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        'Delivery Charges',
                                        style: AppTheme().outfitStyle(),
                                      ),
                                      Text(
                                        paymentSummaryDetails['delivery']
                                                    ['deliveryCost'] ==
                                                0
                                            ? "Free"
                                            : "${Constants().rupees} ${double.parse(paymentSummaryDetails['delivery']['deliveryCost'].toString()).toStringAsFixed(2)}",
                                        style: AppTheme().outfitStyle(
                                            color: paymentSummaryDetails[
                                                            'delivery']
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
                                      color:
                                          Color.fromARGB(255, 155, 154, 154)),
                                  const SizedBox(
                                    height: 15,
                                  ),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        'Total amount',
                                        style: AppTheme().outfitStyle(
                                            fontWeight: FontWeight.w600),
                                      ),
                                      Text(
                                        isPointsApplied
                                            ? '${Constants().rupees} ${totalAmount.toStringAsFixed(2)}'
                                            : '${Constants().rupees} ${double.parse(paymentSummaryDetails['totalPayable'].toString()).toStringAsFixed(2)}',
                                        style: AppTheme().outfitStyle(),
                                      ),
                                    ],
                                  ),
                                  SizedBox(
                                    height:
                                        calculateCO2Emissions(isTotal: true) ==
                                                0
                                            ? 0
                                            : 15,
                                  ),
                                  calculateCO2Emissions(isTotal: true) == 0
                                      ? const SizedBox()
                                      : Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.end,
                                          children: [
                                            Text(
                                              'Total Co2 Emissions avoided ${calculateCO2Emissions(isTotal: true).toStringAsFixed(2)}Kgs (${calculateCO2Emissions().toStringAsFixed(2)}%)',
                                              style: const TextStyle(
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w600),
                                              textAlign: TextAlign.right,
                                            ),
                                          ],
                                        ),
                                ],
                              ),
                            )
                    ],
                  ),
                ),
              ),
              SizedBox(
                width: double.infinity,
                child: Container(
                  width: double.infinity,
                  height: size.height * 0.08,
                  decoration: const BoxDecoration(
                    boxShadow: [
                      BoxShadow(
                        color: Color.fromARGB(255, 179, 179, 179),
                        blurRadius: 3,
                        blurStyle: BlurStyle.outer,
                        spreadRadius: 0,
                      ),
                    ],
                    color: Colors.white,
                  ),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      paymentSummaryDetails == null
                          ? SizedBox(
                              width: size.width * 0.5,
                              child: SizedBox(
                                width: 25,
                                child: Center(
                                  child: CircularProgressIndicator(
                                    color: AppTheme().secondaryColor,
                                  ),
                                ),
                              ),
                            )
                          : SizedBox(
                              width: size.width * 0.5,
                              // color: Colors.green,
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(isPointsApplied
                                      ? '${Constants().rupees} ${totalAmount.toStringAsFixed(2)}' 
                                      : "${Constants().rupees} ${paymentSummaryDetails == null ? "" : double.parse(paymentSummaryDetails['totalPayable'].toString()).toStringAsFixed(2)}" ,
                                      
                                      style: TextStyle(
                                        color: AppTheme().themeColor,
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold
                                      ),
                                      ),
                                  // const SizedBox(height: 5),
                                  // InkWell(
                                  //   onTap: () {
                                  //     _scrollController.animateTo(
                                  //       // Set the desired position you want to scroll to
                                  //       1000.0, // Replace with the desired offset
                                  //       duration: const Duration(
                                  //           milliseconds:
                                  //               500), // Set the duration of the scroll animation
                                  //       curve: Curves
                                  //           .easeInOut, // Set the easing curve for the animation
                                  //     );
                                  //   },
                                  //   child: Text(
                                  //     '',
                                  //     style: TextStyle(
                                  //         color: AppTheme().secondaryColor,
                                  //         fontSize: 9),
                                  //   ),
                                  // ),
                                ],
                              ),
                            ),
                      Container(
                        width: size.width * 0.5,
                        padding: const EdgeInsets.symmetric(horizontal: 10),
                        child: Center(
                          child: InkWell(
                            onTap: () async {
                              final prefs =
                                  await SharedPreferences.getInstance();
                              List<dynamic> regionCodes =
                                  await FirebaseFirestore.instance
                                      .collection("features")
                                      .doc('multiRegion')
                                      .collection('regions')
                                      .doc(prefs.get('region').toString())
                                      .get()
                                      .then((value) {
                                if (value.exists) {
                                  var data = value.data();
                                  return data?['pincodes'];
                                } else {
                                  return [];
                                }
                              });

                              if (regionCodes.isNotEmpty) {
                                var check = regionCodes.contains(int.parse(
                                    addressToDeliver['pincode']
                                        .toString()
                                        .trim()));
                                if (!check) {
                                  Fluttertoast.showToast(
                                      msg:
                                          'This address is not serviceable in your current region.');
                                  return;
                                }
                              }

                              if (paymentSummaryDetails != null) {
                                Navigator.of(context)
                                    .pushNamed('/orderPayment', arguments: {
                                  "paymentDetails": paymentSummaryDetails,
                                  "address": addressToDeliver,
                                  "couponId": appliedCouponId,
                                  "couponName": couponText,
                                  "couponDiscount": couponDiscount,
                                  "isCod": isCodApplied,
                                  "isPointsApplied": isPointsApplied,
                                  "totalAmount": totalAmount,
                                  "pointDiscount": totalPointDiscount,
                                  "pointUsed": pointUsed
                                });
                              }
                            },
                            child: Container(
                              padding: EdgeInsets.symmetric(
                                  vertical: 8, horizontal: size.width * 0.09),
                              decoration: BoxDecoration(
                                  color:
                                      FirebaseAuth.instance.currentUser?.uid ==
                                                  null ||
                                              paymentSummaryDetails == null
                                          ? AppTheme().secondaryColor
                                          : AppTheme().secondaryColor,
                                  borderRadius: BorderRadius.circular(0)),
                              child: const Text(
                                "Pay Now",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ),
                          ),
                        ),
                      )
                    ],
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Container renderAddress(BuildContext context) {
    return Container(
      width: double.infinity,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '${addressToDeliver['name']}',
            style: AppTheme().outfitStyle(),
          ),
          const SizedBox(height: 15),
          Text(
            '${addressToDeliver['address']}',
            style: AppTheme().outfitStyle(),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 15),
          Text(
            '${addressToDeliver['phoneNo']}',
            style: AppTheme().outfitStyle(),
          ),
        ],
      ),
    );
  }

  Container renderTypeOfPurchase() {
    return Container(
      margin: const EdgeInsets.only(top: 15),
      padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 5),
      width: double.infinity,
      color: Colors.white,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Container(
            child: Row(
              children: [
                const Text("Personal"),
                Radio(
                  value: "personal",
                  activeColor: AppTheme().secondaryColor,
                  groupValue: purchaseType,
                  onChanged: (value) {
                    setState(() {
                      purchaseType = value.toString();
                    });
                  },
                ),
              ],
            ),
          ),
          Row(
            children: [
              const Text("Business"),
              Radio(
                activeColor: AppTheme().secondaryColor,
                value: "business",
                groupValue: purchaseType,
                onChanged: (value) {
                  setState(() {
                    purchaseType = value.toString();
                  });
                },
              ),
            ],
          )
        ],
      ),
    );
  }
}

class CouponCard extends StatelessWidget {
  final dynamic e;
  final dynamic handleCouponSubmit;
  final dynamic textController;

  const CouponCard({
    super.key,
    this.e,
    this.handleCouponSubmit,
    required this.textController,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: Colors.grey,
            width: 0.4,
          ),
        ),
      ),
      padding: const EdgeInsets.only(bottom: 15),
      margin: const EdgeInsets.only(top: 15),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 7),
                decoration: BoxDecoration(
                  border: Border.all(
                    color: AppTheme().secondaryColor,
                  ),
                ),
                child: Text(
                  e['name'],
                  style: const TextStyle(fontWeight: FontWeight.w600),
                ),
              ),
              InkWell(
                onTap: () async {
                  // textController.text = e['name'];
                  handleCouponSubmit(
                      isCod: e['codAvailable'], manualText: e['name']);
                },
                child: Padding(
                  padding: const EdgeInsets.only(top: 8.0, bottom: 8, left: 8),
                  child: Text(
                    'Apply',
                    style: TextStyle(
                      color: AppTheme().secondaryColor,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            'Get ${e['type'] == "percentage" ? "${e['amount']}%" : "FLAT ${Constants().rupees} ${e['amount']}"} off ${e['type'] == "percentage" ? "upto ${Constants().rupees} ${e['maxDiscount']}" : "on your order."}',
            style: const TextStyle(
                fontWeight: FontWeight.w900,
                color: Color.fromARGB(255, 106, 106, 106)),
          ),
          const SizedBox(height: 10),
          const Text(
            "Terms And Conditions:",
            style: TextStyle(fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 5),
          Row(
            children: [
              const Icon(
                Icons.circle,
                size: 5,
              ),
              const SizedBox(width: 5),
              SizedBox(
                width: MediaQuery.of(context).size.width * 0.85,
                child: Text(
                  'Min order amount should be ${Constants().rupees} ${e['minOrderAmount'].toStringAsFixed(2)} to avail this offer.',
                  softWrap: true,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                      fontSize: 12, fontWeight: FontWeight.w600),
                ),
              ),
            ],
          ),
          e['type'] == 'percentage'
              ? const SizedBox(height: 5)
              : const SizedBox(),
          e['type'] == 'percentage'
              ? Row(
                  children: [
                    const Icon(
                      Icons.circle,
                      size: 5,
                    ),
                    const SizedBox(width: 5),
                    SizedBox(
                      width: MediaQuery.of(context).size.width * 0.85,
                      child: Text(
                        // "s",
                        'Max discount: ${Constants().rupees} ${e['maxDiscount'].toStringAsFixed(2)}.',
                        softWrap: true,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                            fontSize: 12, fontWeight: FontWeight.w600),
                      ),
                    ),
                  ],
                )
              : const SizedBox(),
          const SizedBox(height: 5),
          Row(
            children: [
              const Icon(
                Icons.circle,
                size: 5,
              ),
              const SizedBox(width: 5),
              SizedBox(
                width: MediaQuery.of(context).size.width * 0.85,
                child: Text(
                  // "s",
                  'You can apply this coupon only ${e['perUser']} times.',
                  softWrap: true,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                      fontSize: 12, fontWeight: FontWeight.w600),
                ),
              ),
            ],
          ),
          const SizedBox(height: 5),
          Row(
            children: [
              const Icon(
                Icons.circle,
                size: 5,
              ),
              const SizedBox(width: 5),
              SizedBox(
                width: MediaQuery.of(context).size.width * 0.85,
                child: Text(
                  // "s",
                  'Offer valid till ${DateFormat('dd MMMM yyyy').format(DateTime.parse(e['validUpto']))}.',
                  softWrap: true,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                      fontSize: 12, fontWeight: FontWeight.w600),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
