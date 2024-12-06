// ignore_for_file: use_build_context_synchronously, unused_element, no_leading_underscores_for_local_identifiers, unused_local_variable, argument_type_not_assignable_to_error_handler

import 'dart:async';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shein/screens/login/onboardScreen.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/utils/databaseServices.dart';
import 'package:shein/widgets/screenHeader.dart';
import 'package:pinput/pinput.dart';
import 'package:shared_preferences/shared_preferences.dart';

class OptPage extends StatefulWidget {
  final String number;
  final String verificationCode;
  const OptPage(
      {super.key, required this.number, required this.verificationCode});

  @override
  State<OptPage> createState() => _OptPageState();
}

class _OptPageState extends State<OptPage> {
  final _auth = FirebaseAuth.instance;
  bool isLoading = false;
  int start = 59;
  bool wait = false;
  List isSelecteds = [];
  List deviceToken = [];
  var duration = const Duration(seconds: 29);
  bool timeout = false;
  bool enableButton = false;
  String? _verificationCode;
  bool isDisabled = true;

  bool isLoggedIn = false;

  final TextEditingController _pinPutController = TextEditingController();

  _verifyphone() async {
    await FirebaseAuth.instance
        .verifyPhoneNumber(
            phoneNumber: widget.number,
            verificationCompleted: (PhoneAuthCredential credential) async {
              await FirebaseAuth.instance.signInWithCredential(credential);
            },
            verificationFailed: (FirebaseAuthException e) {
              FocusScope.of(context).unfocus();
              Fluttertoast.showToast(
                  msg: "${e.message}",
                  timeInSecForIosWeb: 4,
                  gravity: ToastGravity.BOTTOM);
            },
            codeSent: (String verificationId, int? resendToken) async {
              Fluttertoast.showToast(
                  msg: "OTP sent",
                  timeInSecForIosWeb: 4,
                  gravity: ToastGravity.BOTTOM);
              // await SmsAutoFill().listenForCode;
              setState(() {
                _verificationCode = verificationId;
                wait = false;
                start = 59;
                startTimer();
              });
            },
            codeAutoRetrievalTimeout: (String verificationID) {
              _verificationCode = verificationID;
              print('timeout');
            },
            timeout: const Duration(seconds: 59))
        .whenComplete(() {});
  }

  void startTimer() {
    Timer.periodic(const Duration(seconds: 1), (timer) {
      if (start > 0) {
        setState(() {
          start--;
        });
      } else {
        setState(() {
          timer.cancel();
          wait = true;
        });
      }
      print(start);
    });
  }

  @override
  void initState() {
    startTimer();
    super.initState();
  }

  handleOtpSubmit() async {
    try {
      setState(() {
        isLoading = true;
      });

      SharedPreferences _prefs = await SharedPreferences.getInstance();
      PhoneAuthCredential credential = PhoneAuthProvider.credential(
          verificationId: widget.verificationCode,
          smsCode: _pinPutController.text.toString().trim());

      final user =
          await _auth.signInWithCredential(credential).then((value) async {
        final checkUser = await DatabaseService().checkUser(value.user?.uid);
        setState(() {
          isLoggedIn = true;
        });
        if (checkUser.exists) {
          _prefs.setString('phoneNumber', widget.number);

          Timer(
              const Duration(seconds: 3),
              () => Navigator.of(context).pushNamedAndRemoveUntil(
                  '/home', (Route<dynamic> route) => false));
        } else {
          var data = {
            'phoneNo': widget.number,
            "createdAt": DateTime.now(),
            "active": true,
            "lastAccessAt": DateTime.now(),
            "role": 'user',
            "name": "user",
            "email": "",
            "dP": "assets/img/user-pic.gif",
            "setFromUI": true,
            "wallet": {"balance": 0, "cashback": 0, 'lastTransactions': {}}
          };

          if (_prefs.getString("referrer") != null) {
            data = {
              ...data,
              "referrer": {"userId": _prefs.getString("referrer")}
            };

            _prefs.remove('referrer');
          }
          FirebaseFirestore.instance
              .collection('users')
              .doc(value.user?.uid)
              .set(data, SetOptions(merge: true));
          _prefs.setString('phoneNumber', widget.number);

          Timer(
              const Duration(seconds: 3),
              () => Navigator.of(context, rootNavigator: true).push(
                    CupertinoPageRoute(
                      builder: (context) => const OnboardScreen(
                          // number: _textEditingController.text,
                          // verificationCode: _verificationCode!,
                          ),
                    ),
                  ));
        }
      }).catchError((e) {
        if (FirebaseAuth.instance.currentUser?.uid != null) {
          Navigator.of(context).pushNamedAndRemoveUntil(
              '/home', (Route<dynamic> route) => false);
        } else {
          Fluttertoast.showToast(msg: 'Invalid OTP entered. Please try again.');
          // Fluttertoast.showToast(msg: '$e');
          setState(() {
            _pinPutController.clear();
            isLoading = false;
          });
        }
      });
    } catch (e) {
      Fluttertoast.showToast(msg: '$e');
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        // resizeToAvoidBottomInset: false,
        body: Container(
          child: Column(
            children: [
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      ScreenHeader(size: size, title: "Verification"),
                      const SizedBox(
                        height: 20,
                      ),
                      Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'SHEIN',
                  style: GoogleFonts.montserrat(
                      textStyle: const TextStyle(
                          fontSize: 26, fontWeight: FontWeight.w700, letterSpacing: 2.5)),
                ),
                Text(
                  'STYLE STORES',
                  style: GoogleFonts.montserrat(
                      textStyle: TextStyle(
                          fontSize: 9,
                          fontWeight: FontWeight.w600,
                          letterSpacing: -0.2,
                          color: AppTheme().mainColor)),
                )
              ],
            ),
                      const SizedBox(
                        height: 40,
                      ),
                      Text(
                        'Please enter the OTP sent to',
                        style: AppTheme().outfitStyle(
                            fontSize: 16, fontWeight: FontWeight.w500),
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      Text(
                        widget.number,
                        style: AppTheme().phoneNumberStyle(
                            fontSize: 16, fontWeight: FontWeight.w500),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 10),
                        child: Center(
                          child: Pinput(
                            length: 6,
                            controller: _pinPutController,
                            keyboardType: TextInputType.number,
                            inputFormatters: [
                              FilteringTextInputFormatter.digitsOnly
                            ],
                            defaultPinTheme:  const PinTheme(
                              height: 50.0,
                              width: 30.0,
                              margin: EdgeInsets.symmetric(horizontal: 5.0),
                              decoration: BoxDecoration(
                                shape: BoxShape.rectangle,
                                color: Colors.white12,
                                border: Border(
                                  bottom: BorderSide(
                                    color: Colors.black,
                                    width: 1.0,
                                  ),
                                ),
                                // borderRadius: BorderRadius.circular(10),
                              ),
                            ),
                            focusedPinTheme: const PinTheme(
                              margin: EdgeInsets.symmetric(horizontal: 5.0),
                              height: 50.0,
                              width: 50.0,
                              decoration: BoxDecoration(
                                shape: BoxShape.rectangle,
                                color: Colors.white12,
                                border: Border(
                                  bottom: BorderSide(
                                    color: Colors.black,
                                    width: 1.0,
                                  ),
                                ),
                              ),
                            ),
                            onChanged: (a) {
                              if (_pinPutController.text.length == 6) {
                                setState(() {
                                  isDisabled = false;
                                });
                                // PhoneAuthCredential credential =
                                //     PhoneAuthProvider.credential(
                                //         verificationId:
                                //             _verificationCode.toString(),
                                //         smsCode: _pinPutController.text);
                                // FirebaseAuth.instance
                                //     .signInWithCredential(credential);
                              } else {
                                setState(() {
                                  isDisabled = true;
                                });
                              }
                            },
                            enabled: true,
                            pinAnimationType: PinAnimationType.scale,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Enter OTP';
                              }
                              return null;
                            },
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 8.0),
                        child: Align(
                          alignment: Alignment.center,
                          child: wait == false
                              ? InkWell(
                                  onTap: null,
                                  child: Text('00:$start',
                                      style: const TextStyle(
                                          color: Colors.black54)),
                                )
                              : Wrap(
                                  children: [
                                    InkWell(
                                      onTap: () {
                                        if (wait == true) {
                                          setState(() {
                                            _verifyphone();
                                          });
                                        }
                                      },
                                      child: Text(
                                        'Resend OTP',
                                        style: AppTheme().phoneNumberStyle(
                                            color: AppTheme().themeColor,
                                            fontSize: 16,
                                            fontWeight: FontWeight.w500),
                
                                      ),
                                    )
                                  ],
                                ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Align(
                alignment: Alignment.bottomCenter,
                child: Padding(
                  padding: const EdgeInsets.all(15.0),
                  child: ElevatedButton(
                    onPressed: isDisabled ? null : handleOtpSubmit,
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      backgroundColor: isDisabled
                          ? AppTheme().mainColor
                          : AppTheme().themeColor,
                      elevation: 3,
                      shadowColor: const Color.fromARGB(255, 179, 179, 179),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(
                            20), // Change 8 to whatever radius you need
                      ),
                      minimumSize: const Size(
                          double.infinity, 48), // Adjust height as necessary
                    ),
                    child: Center(
                      child: isDisabled
                          ?  Text(
                              'Submit',
                              style: AppTheme().phoneNumberStyle(
                  color: Colors.white,
                ),
                            )
                          : isLoading
                              ?  Text(
                                  'Verifying...',
                                  style: AppTheme().phoneNumberStyle(
                  color: Colors.white,
                ),
                                )
                              :  Text(
                                  'Submit',
                                  style: AppTheme().phoneNumberStyle(
                  color: Colors.white,
                ),
                                ),
                    ),
                  ),
                ),
              )
            ],
          ),
        ),

        //  Container(
        //   child: Padding(
        //     padding: const EdgeInsets.symmetric(horizontal: 16.0),
        //     child: Column(
        //       crossAxisAlignment: CrossAxisAlignment.start,
        //       children: [
        //         SizedBox(
        //           height: 40,
        //         ),
        //         Text(
        //           'OTP Verification',
        //           style: Theme.of(context)
        //               .textTheme
        //               .headline5!
        //               .merge(TextStyle(fontWeight: FontWeight.bold)),
        //         ),
        //         SizedBox(
        //           height: 5,
        //         ),
        //         Text('We have just sent a code to ',
        //             style: TextStyle(color: Colors.black54)),
        //         SizedBox(
        //           height: 5,
        //         ),
        //         Text('+91 ${widget.number.replaceRange(0, 6, '******')}',
        //             style: TextStyle(color: Colors.black54)),
        //         SizedBox(
        //           height: size.height * 0.1,
        //         ),

        //         SizedBox(
        //           height: 30,
        //         ),

        //         SizedBox(
        //           height: 30,
        //         ),
        //         Container(
        //           height: 50,
        //           width: size.width,
        //           decoration: BoxDecoration(
        //               borderRadius: BorderRadius.circular(10),
        //               color: Colors.amber.withOpacity(.9),
        //               shape: BoxShape.rectangle),
        //           child: TextButton(
        //               onPressed: () async {
        //                 if (_pinPutController.text.length == 6) {
        //                   try {
        //                     SharedPreferences _prefs =
        //                         await SharedPreferences.getInstance();

        //                     PhoneAuthCredential credential =
        //                         PhoneAuthProvider.credential(
        //                             verificationId: widget.verificationCode,
        //                             smsCode: _pinPutController.text);

        //                     final user =
        //                         await _auth.signInWithCredential(credential);

        //                     final checkUser = await DatabaseService()
        //                         .checkUser(user.user!.uid);
        //                     setState(() {
        //                       isLoggedIn = true;
        //                     });
        //                     if (checkUser.exists) {
        //                       _prefs.setString('phoneNumber', widget.number);
        //                       _prefs.setBool('isLoggedIn', true);
        //                       Timer(Duration(seconds: 3),
        //                           () => Navigator.pop(context));

        //                       // Timer(
        //                       //     Duration(seconds: 3),
        //                       //     () => Navigator.of(context)
        //                       //         .pushNamedAndRemoveUntil(RoutesView.HOME,
        //                       //             (Route<dynamic> route) => false));
        //                     } else {
        //                       FirebaseFirestore.instance
        //                           .collection('users')
        //                           .doc(user.user!.uid)
        //                           .set({'phoneNumber': widget.number},
        //                               SetOptions(merge: true));
        //                       showModalBottomSheet(
        //                           backgroundColor: Colors.transparent,
        //                           context: context,
        //                           builder: (context) {
        //                             return Container(
        //                               height: size.height * 0.55,
        //                               decoration: BoxDecoration(
        //                                   color: Colors.white,
        //                                   borderRadius: BorderRadius.only(
        //                                       topRight: Radius.circular(30),
        //                                       topLeft: Radius.circular(30))),
        //                               child: Center(
        //                                 child: Column(
        //                                   mainAxisAlignment:
        //                                       MainAxisAlignment.center,
        //                                   mainAxisSize: MainAxisSize.min,
        //                                   children: <Widget>[
        //                                     Image.asset(
        //                                         'assets/images/done.png'),
        //                                     Text(
        //                                       'Success!',
        //                                       style: Theme.of(context)
        //                                           .textTheme
        //                                           .headline5!
        //                                           .merge(TextStyle(
        //                                               fontWeight:
        //                                                   FontWeight.bold)),
        //                                     ),
        //                                     SizedBox(
        //                                       height: 20,
        //                                     ),
        //                                     Text(
        //                                       'You have successfully created',
        //                                       style: TextStyle(
        //                                           color: Colors.black54),
        //                                     ),
        //                                     Text('your account',
        //                                         style: TextStyle(
        //                                             color: Colors.black54)),
        //                                     SizedBox(
        //                                       height: 20,
        //                                     ),
        //                                     Padding(
        //                                       padding:
        //                                           const EdgeInsets.symmetric(
        //                                               horizontal: 16.0),
        //                                       child: Container(
        //                                         height: 50,
        //                                         width: size.width,
        //                                         decoration: BoxDecoration(
        //                                             borderRadius:
        //                                                 BorderRadius.circular(
        //                                                     10),
        //                                             color: Colors.amber
        //                                                 .withOpacity(.9),
        //                                             shape: BoxShape.rectangle),
        //                                         child: TextButton(
        //                                             onPressed: () {
        //                                               // Loader();
        //                                               // Navigator.of(context)
        //                                               //     .pushNamedAndRemoveUntil(
        //                                               //         RoutesView.HOME,
        //                                               //         (Route<dynamic>
        //                                               //                 route) =>
        //                                               //             false);
        //                                               // Navigator.push(
        //                                               //     context,
        //                                               //     CupertinoPageRoute(
        //                                               //         builder: (context) =>
        //                                               //             CustomBottomNavBar()));
        //                                               _prefs.setString(
        //                                                   'phoneNumber',
        //                                                   widget.number);
        //                                               _prefs.setBool(
        //                                                   'isLoggedIn', true);
        //                                             },
        //                                             child: Text(
        //                                               'Welcome to Punjabi Bagh ISKCON',
        //                                               style: TextStyle(
        //                                                   color: Colors.white),
        //                                             )),
        //                                       ),
        //                                     )
        //                                   ],
        //                                 ),
        //                               ),
        //                             );
        //                           });
        //                     }
        //                   } on Exception catch (e) {
        //                     Fluttertoast.showToast(msg: '$e');
        //                   }
        //                 }
        //               },
        //               child: Text(
        //                 'Verify and Proceed',
        //                 style: TextStyle(color: Colors.white),
        //               )),
        //         ),
        //         SizedBox(
        //           height: 30,
        //         ),
        //         Align(
        //             child: Text('By Signup, you agree to our',
        //                 style: TextStyle(color: Colors.black54))),
        //         Align(
        //           child: Wrap(
        //             crossAxisAlignment: WrapCrossAlignment.center,
        //             children: [
        //               InkWell(
        //                   onTap: () {},
        //                   child: Text(
        //                     'Terms ',
        //                     style: TextStyle(color: Colors.purple),
        //                   )),
        //               Text('and ', style: TextStyle(color: Colors.black54)),
        //               InkWell(
        //                   onTap: () {},
        //                   child: Text(
        //                     'Condition',
        //                     style: TextStyle(color: Colors.purple),
        //                   )),
        //             ],
        //           ),
        //         )
        //       ],
        //     ),
        //   ),
        // ),
      ),
    );
  }
}
