import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:shein/screens/Terms&Policies/aboutPolicy.dart';
import 'package:shein/widgets/screenHeader.dart';

class TermsandPolicies extends StatefulWidget {
  const TermsandPolicies({super.key});

  @override
  State<TermsandPolicies> createState() => _TermsandPoliciesState();
}

class _TermsandPoliciesState extends State<TermsandPolicies> {
  dynamic data;
  @override
  void initState() {
    fetchTermsandPolicies();
    super.initState();
  }

  fetchTermsandPolicies() async {
    var res = await FirebaseFirestore.instance
        .collection("settings")
        .doc('policies')
        .get()
        .then((value) => value.data());
    setState(() {
      data = res;
    });
  }

  List policies = [
    'Terms & Conditions',
    'Privacy Policy',
    'Cancellation Policy',
    'Refund Policy'
  ];
  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    return SafeArea(
      child: Scaffold(
        body: Column(
          children: [
            ScreenHeader(
                size: size, title: "Terms & Policies", isBackButton: true),
            Expanded(
              child: Column(
                children: [
                  const SizedBox(height: 30),
                  Column(
                    children: policies
                        .map<Widget>((e) => Padding(
                              padding: const EdgeInsets.all(12.0),
                              child: InkWell(
                                onTap: () {
                                  if (e == 'Terms & Conditions') {
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) => AboutPolicy(
                                                  data: data['terms'],
                                                  title: 'Terms & Conditions',
                                                )));
                                  } else if (e == 'Privacy Policy') {
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) => AboutPolicy(
                                                  data: data['privacy'],
                                                  title: 'Privacy Policy',
                                                )));
                                  } else if (e == 'Cancellation Policy') {
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) => AboutPolicy(
                                                  data: data['cancel'],
                                                  title: 'Cancellation Policy',
                                                )));
                                  } else if (e == 'Refund Policy') {
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) => AboutPolicy(
                                                  data: data['refund'],
                                                  title: 'Refund Policy',
                                                )));
                                  }
                                },
                                child: Container(
                                  width: double.infinity,
                                  height: 50,
                                  alignment: Alignment.centerLeft,
                                  decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(10),
                                      border:
                                          Border.all(color: Colors.black12)),
                                  child: Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: Row(
                                      children: [
                                        Text(
                                          e,
                                          style: const TextStyle(
                                              fontWeight: FontWeight.w500),
                                        ),
                                        const Spacer(),
                                        const Icon(
                                          Icons.arrow_forward_ios,
                                          size: 15,
                                          color: Colors.black26,
                                        )
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                            ))
                        .toList(),
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
