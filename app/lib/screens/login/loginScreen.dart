import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:shein/screens/login/OtpPage.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/screenHeader.dart';
import 'package:flag/flag.dart';
import 'package:provider/provider.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _textEditingController = TextEditingController();
  String? _verificationCode;
  bool isLoading = false;
  bool termsAccepted = false;

  handlePhoneSubmit() async {
    if (_textEditingController.text == "" ||
        _textEditingController.text.length > 10) {
      Fluttertoast.showToast(msg: "Invalid Phone Number");
      return;
    }
    if (termsAccepted == false) {
      Fluttertoast.showToast(msg: "Please agree to the terms and conditions.");
      return;
    }
    setState(() {
      isLoading = true;
    });
    // Navigator.of(context, rootNavigator: true).push(
    //   CupertinoPageRoute(
    //     builder: (context) => OptPage(
    //       number: _textEditingController.text,
    //       // verificationCode: _verificationCode!,
    //       verificationCode: "876543",
    //     ),
    //   ),
    // );
    await FirebaseAuth.instance.verifyPhoneNumber(
        phoneNumber: '+91 ${_textEditingController.text}',
        verificationCompleted: (PhoneAuthCredential credential) async {
          await FirebaseAuth.instance.signInWithCredential(credential);
        },
        verificationFailed: (FirebaseAuthException e) {
          FocusScope.of(context).unfocus();
          setState(() {
            isLoading = false;
          });
          // Fluttertoast.showToast(
          //     msg: "${e.message}",
          //     timeInSecForIosWeb: 4,
          //     gravity: ToastGravity.BOTTOM);
        },
        codeSent: (String verificationId, int? resendToken) async {
          // await SmsAutoFill().listenForCode;
          setState(() {
            _verificationCode = verificationId;
          });
          // Navigator.pop(context);
          Fluttertoast.showToast(
                  msg: "OTP sent",
                  timeInSecForIosWeb: 4,
                  gravity: ToastGravity.BOTTOM)
              .whenComplete(() async {
            await Future.delayed(const Duration(milliseconds: 1000));
            setState(() {
              isLoading = false;
            });
            Navigator.of(context, rootNavigator: true).push(
              CupertinoPageRoute(
                builder: (context) => OptPage(
                  number: "+91${_textEditingController.text}",
                  verificationCode: _verificationCode!,
                ),
              ),
            );
          });
        },
        codeAutoRetrievalTimeout: (String verificationID) {
          _verificationCode = verificationID;
          print('timeout');
        },
        timeout: const Duration(minutes: 1));
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return SafeArea(
        child: Scaffold(
      body: Container(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    ScreenHeader(size: size, title: "LOGIN"),
                    const SizedBox(
                      height: 10,
                    ),
                    Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'SHEIN',
                  style: GoogleFonts.montserrat(
                      textStyle: const TextStyle(
                          fontSize: 30, fontWeight: FontWeight.w700, letterSpacing: 2.5)),
                ),
                Text(
                  'STYLE STORES',
                  style: GoogleFonts.montserrat(
                      textStyle: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          letterSpacing: -0.2,
                          color: AppTheme().mainColor)),
                )
              ],
            ),
            const SizedBox(
              height: 10,
            ),
            Container(
              // color: AppTheme().themeColor,
              // add border radius to container
              decoration: ShapeDecoration(color: AppTheme().themeColor, shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10), 
              )),

              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Text(
                  'Join us to get an EXTRA 10% OFF & more',
                  style: GoogleFonts.montserrat(
                      textStyle: const TextStyle(
                          color: Colors.white,
                          fontSize: 12.0,
                          fontWeight: FontWeight.w500)),
                ),
              ),
            ),
                    // SizedBox(
                    //   width: size.width * 0.6,
                    //   child: Image.asset('assets/images/logo.png'),
                    // ),
                    const SizedBox(
                      height: 40,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 15),
                      child: SizedBox(
                        width: double.infinity,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Login using your mobile number",
                              style: AppTheme().outfitStyle(
                                  fontWeight: FontWeight.w600, fontSize: 16),
                            ),
                            const SizedBox(
                              height: 20,
                            ),
                            Container(
                              width: size.width * 0.9,
                              padding: const EdgeInsets.all(4),
                              decoration: BoxDecoration(
                                  border: Border.all(
                                      width: 0.7, color: AppTheme().mainColor),
                                  borderRadius: BorderRadius.circular(15)),
                              child: Row(
                                children: [
                                  Container(
                                    width:
                                        Provider.of<HomeData>(context).isTablet
                                            ? size.width * 0.12
                                            : size.width * 0.17,
                                    height: 40,
                                    decoration: const BoxDecoration(
                                      borderRadius: BorderRadius.all(
                                          Radius.circular(20)),
                                      color: Colors.white,
                                    ),
                                    child: Row(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Flag.fromCode(
                                          FlagsCode.IN,
                                          width: 20,
                                          height: 20,
                                        ),
                                        const SizedBox(
                                          width: 5,
                                        ),
                                        Text(
                                          "+91",
                                          style: AppTheme().phoneNumberStyle(),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Expanded(
                                    child: SizedBox(
                                      // height: 40,
                                      child: TextFormField(
                                        // maxLength: 10,
                                        controller: _textEditingController,
                                        cursorColor: AppTheme().secondaryColor,
                                        keyboardType: TextInputType.number,
                                        style: AppTheme().phoneNumberStyle(),
                                        decoration: InputDecoration(
                                          counterStyle:
                                              AppTheme().outfitStyle(),
                                          border: InputBorder.none,
                                          focusedBorder: InputBorder.none,
                                          errorBorder: InputBorder.none,
                                          contentPadding: const EdgeInsets.only(
                                              left: 10, bottom: 6),
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(
                              height: 20,
                            ),
                            Image.asset(
                'assets/images/referearn.png',
                width: double.infinity,
                height: 150,
              ),
                            
                           CheckboxListTile(
                                         enableFeedback: true,
                                         // isThreeLine: true,
                                         contentPadding: const EdgeInsets.all(0),
                                         activeColor: AppTheme().mainColor,
                                         title: Text(
                                           "I agree to receive communication related to order and promotional offers.",
                                           // italic 
                           
                                           style: Theme.of(context).textTheme.bodyMedium!.copyWith(color: Colors.black , fontStyle: FontStyle.italic),
                                         ),
                                         value: termsAccepted,
                                         onChanged: (value) {
                                           setState(() {
                                             termsAccepted = value!;
                                           });
                                         },
                                         controlAffinity: ListTileControlAffinity.leading,
                                       ),
                            const SizedBox(
                              height: 30,
                            ),
                            // SizedBox(
                            //   width: double.infinity,
                            //   child: ElevatedButton(
                            //     onPressed: () {},
                            //     style: ElevatedButton.styleFrom(
                            //       // primary: AppTheme().themeColor, // Set the background color to black
                            //       primary: Colors
                            //           .black, // Set the background color to black
                            //     ),
                            //     child: Padding(
                            //       padding: const EdgeInsets.all(10.0),
                            //       child: Row(
                            //         mainAxisAlignment: MainAxisAlignment.center,
                            //         children: [
                            //           Image.asset(
                            //             "assets/Icons/google.png",
                            //             width: 30,
                            //             height: 30,
                            //           ),
                            //           const SizedBox(
                            //             width: 10,
                            //           ),
                            //           Text(
                            //             "Login with Google",
                            //             style: TextStyle(
                            //               fontSize: 14,
                            //               color: Colors
                            //                   .white, // Set the text color to white
                            //               fontWeight: FontWeight.w500,
                            //             ),
                            //           ),
                            //         ],
                            //       ),
                            //     ),
                            //   ),
                            // )
                          ],
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ),
            Align(
  alignment: Alignment.bottomCenter,
  child: Padding(
    padding: const EdgeInsets.all(15.0),
    child: ElevatedButton(
      onPressed: handlePhoneSubmit,
      style: ElevatedButton.styleFrom(
        padding: const EdgeInsets.symmetric(vertical: 12),
        backgroundColor: AppTheme().secondaryColor,
        elevation: 3,
        shadowColor: const Color.fromARGB(255, 179, 179, 179),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20), // Change 8 to whatever radius you need
        ),
        minimumSize: const Size(double.infinity, 48), // Adjust height as necessary
      ),
      child: Center(
        child: isLoading
            ?  Text(
                'Sending Otp...',
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
    ));
  }
}
