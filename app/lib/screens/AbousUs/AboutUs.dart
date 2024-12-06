import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:shein/widgets/screenHeader.dart';

class AboutUs extends StatefulWidget {
  const AboutUs({super.key});

  @override
  State<AboutUs> createState() => _AboutUsState();
}

class _AboutUsState extends State<AboutUs> {
  dynamic data;
  @override
  void initState() {
    fetchTermsandPolicies();
    super.initState();
  }

  fetchTermsandPolicies() async {
    var res = await FirebaseFirestore.instance
        .collection("pages")
        .doc('about')
        .get()
        .then((value) => value.data());
    setState(() {
      data = res;
    });
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        body: Column(
          children: [
            ScreenHeader(size: size, title: 'About Us'),
            data == null
                ? const SizedBox()
                : Expanded(
                    child: SingleChildScrollView(
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Column(
                        children: [
                          Text(
                            '${data != null ? data['pageTitle'] : ""}',
                            textAlign: TextAlign.center,
                            style: Theme.of(context)
                                .textTheme
                                .headlineSmall!
                                .merge(const TextStyle(fontWeight: FontWeight.bold)),
                          ),
                          const SizedBox(height: 20),
                          Image.network('${data['bannerImageURL']['org']}'),
                          Html(data: data['pageContent'])
                        ],
                      ),
                    ),
                  ))
          ],
        ),
      ),
    );
  }
}
