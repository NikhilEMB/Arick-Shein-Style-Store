import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:shein/widgets/screenHeader.dart';

class AboutPolicy extends StatefulWidget {
  final dynamic data;
  final String title;

  const AboutPolicy({super.key, this.data, required this.title});

  @override
  State<AboutPolicy> createState() => _AboutPolicyState();
}

class _AboutPolicyState extends State<AboutPolicy> {
  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        body: Column(
          children: [
            ScreenHeader(
              size: size,
              title: widget.title,
              isBackButton: true,
            ),
            Expanded(
                child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 7),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 5),
                  margin: const EdgeInsets.only(top: 10),
                  decoration: BoxDecoration(
                    border: Border.all(
                        color: const Color.fromARGB(255, 209, 209, 209),
                        width: 1),
                    borderRadius: BorderRadius.circular(7),
                  ),
                  width: double.infinity,
                  child: Center(
                    child: Html(data: widget.data),
                  ),
                ),
              ),
            ))
          ],
        ),
      ),
    );
  }
}
