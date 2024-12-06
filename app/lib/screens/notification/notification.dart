import 'package:flutter/material.dart';

import '../../widgets/screenHeader.dart';

class NotificationScreen extends StatefulWidget {
  const NotificationScreen({super.key});

  @override
  State<NotificationScreen> createState() => _NotificationScreenState();
}

class _NotificationScreenState extends State<NotificationScreen> {
  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            ScreenHeader(
              isBackButton: true,
              size: size,
              title: "Notifications",
              // isCartButton: true,
            ),
          ],
        ),
      ),
    );
  }
}
