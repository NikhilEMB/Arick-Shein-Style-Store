import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/screenHeader.dart';

class OnboardScreen extends StatefulWidget {
  const OnboardScreen({super.key});

  @override
  State<OnboardScreen> createState() => _OnboardScreenState();
}

class _OnboardScreenState extends State<OnboardScreen> {
  bool isLoading = false;
  String name = "";
  String email = "";

  handleSubmit(context) async {
    if (name.isEmpty) {
      Fluttertoast.showToast(msg: 'Enter Name.');
    }
    var uid = FirebaseAuth.instance.currentUser?.uid;
    if (uid != null) {
      await FirebaseFirestore.instance.collection('users').doc(uid).update(
        {"name": name, "email": email},
      );
      Navigator.of(context)
          .pushNamedAndRemoveUntil('/home', (Route<dynamic> route) => false);
    }
    // print(name);
    // print(email);
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
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ScreenHeader(
                      size: size,
                      title: "LOGIN/SIGNUP",
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    SizedBox(
                      child: Center(
                        child: SizedBox(
                          width: size.width * 0.5,
                          child: Image.asset('assets/images/logo.png'),
                        ),
                      ),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 15),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Personal Details',
                            style: AppTheme().outfitStyle(
                                fontWeight: FontWeight.bold, fontSize: 18),
                          ),
                          const SizedBox(height: 30),
                          Text(
                            'Full Name',
                            style: AppTheme()
                                .outfitStyle(fontWeight: FontWeight.w500),
                          ),
                          const SizedBox(height: 10),
                          Container(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(5),
                              color: const Color.fromARGB(255, 238, 234, 242),
                            ),
                            child: TextFormField(
                              onChanged: (value) {
                                setState(() {
                                  name = value.toString();
                                });
                              },
                              style: const TextStyle(color: Colors.black),
                              cursorColor:
                                  const Color.fromARGB(255, 160, 159, 159),
                              decoration: const InputDecoration(
                                focusedBorder: OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Color.fromARGB(255, 238, 234, 242),
                                      width: 1),
                                ),
                                contentPadding:
                                    EdgeInsets.symmetric(horizontal: 10.0),
                                border: OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Color.fromARGB(255, 238, 234, 242),
                                      width: 1),
                                ),
                                enabledBorder: OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Color.fromARGB(255, 238, 234, 242),
                                      width: 1),
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(height: 30),
                          Text(
                            'Email Address (Optional)',
                            style: AppTheme()
                                .outfitStyle(fontWeight: FontWeight.w500),
                          ),
                          const SizedBox(height: 10),
                          Container(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(5),
                              color: const Color.fromARGB(255, 238, 234, 242),
                            ),
                            child: TextFormField(
                              onChanged: (value) {
                                setState(() {
                                  email = value.toString();
                                });
                              },
                              style: const TextStyle(color: Colors.black),
                              cursorColor:
                                  const Color.fromARGB(255, 160, 159, 159),
                              decoration: InputDecoration(
                                counterStyle: AppTheme().outfitStyle(),
                                focusedBorder: const OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Color.fromARGB(255, 238, 234, 242),
                                      width: 1),
                                ),
                                contentPadding:
                                    const EdgeInsets.symmetric(horizontal: 10.0),
                                border: const OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Color.fromARGB(255, 238, 234, 242),
                                      width: 1),
                                ),
                                enabledBorder: const OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Color.fromARGB(255, 238, 234, 242),
                                      width: 1),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: InkWell(
                  onTap: () => handleSubmit(context),
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    decoration: BoxDecoration(
                      color: AppTheme().secondaryColor,
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
                    child: Center(
                      child: isLoading
                          ? const Text(
                              'Saving...',
                              style: TextStyle(
                                  color: Color.fromARGB(255, 192, 192, 192),
                                  fontWeight: FontWeight.w500),
                            )
                          : const Text(
                              'Submit',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w500),
                            ),
                    ),
                  )),
            )
          ],
        ),
      ),
    ));
  }
}
