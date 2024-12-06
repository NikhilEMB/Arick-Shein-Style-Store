import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:provider/provider.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  void handleRedirect() async {
    var userId = FirebaseAuth.instance.currentUser?.uid;
    Provider.of<HomeData>(context, listen: false).fetchHomeData();
    if (userId != null) {
      FirebaseFirestore.instance
          .collection('users')
          .doc(userId)
          .set({'lastAccessAt': DateTime.now()}, SetOptions(merge: true));
      Timer(const Duration(seconds: 4), () {
        Navigator.of(context)
            .pushNamedAndRemoveUntil("/home", (route) => false);
      });
    } else {
      Timer(const Duration(seconds: 4), () {
        Navigator.of(context)
            .pushNamedAndRemoveUntil("/home", (route) => false);
      });
    }
  }

  @override
  void initState() {
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    );
    //Implement animation here
    _animation = Tween(
      begin: 0.0,
      end: 1.0,
    ).animate(_controller);
    handleRedirect();
    super.initState();
  }

  @override
  void dispose() {
    // TODO: implement dispose
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    _controller.forward();
    return SafeArea(
        child: Scaffold(
      body: FadeTransition(
        opacity: _animation,
        child: SizedBox(
          width: double.infinity,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // SizedBox(
              //   // width: MediaQuery.of(context).size.width / 1.8,
              //   // child: Image.asset('assets/images/splash.png'),
              //   // child: Image.asset(
              //   //   'assets/images/logo.png',
              //   //   fit: BoxFit.contain,
              //   // ),
              // ),
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
              // Text(
              //   'shein',
              //   style: TextStyle(
              //       fontSize: 28,
              //       color: AppTheme().secondaryColor,
              //       fontWeight: FontWeight.bold),
              // )
            ],
          ),
        ),
      ),
    ));
  }
}
