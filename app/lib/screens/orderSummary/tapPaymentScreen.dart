import 'package:shein/theme/AppTheme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

class TapPaymentScreen extends StatefulWidget {
  final String url;
  final String redirectUrl;
  const TapPaymentScreen(
      {super.key, required this.url, required this.redirectUrl});

  @override
  State<TapPaymentScreen> createState() => _TapPaymentScreenState();
}

class _TapPaymentScreenState extends State<TapPaymentScreen> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
      body: Center(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Expanded(
              child: widget.url.isEmpty
                  ? Center(
                      child: CircularProgressIndicator(
                        color: AppTheme().secondaryColor,
                      ),
                    )
                  : InAppWebView(
                      initialUrlRequest: URLRequest(
                        url: Uri.parse(widget.url),
                      ),
                      onWebViewCreated: (controller) {
                        print(controller.getUrl());
                      },
                      onExitFullscreen: (controller) {
                        Navigator.of(context).pop('Cancel');
                      },
                      onTitleChanged: ((controller, title) async {
                        var url = await controller.getUrl();
                        if (url.toString().contains(widget.redirectUrl)) {
                          // Timer(Duration(seconds: 5), () {
                          Navigator.of(context).pop(url.toString());
                          // });
                          // provider.changeDonationStatus();
                        }
                        // print('$title a;adjf;ajsd;f;sladfj;lasdf;lsd;lf;lkjf');
                      }),
                    ),
            )
          ],
        ),
      ),
    ));
  }
}
