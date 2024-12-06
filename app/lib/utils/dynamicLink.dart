import 'dart:async';

import 'package:firebase_dynamic_links/firebase_dynamic_links.dart';
import 'package:flutter/cupertino.dart';
import 'package:shein/providers/userProvider.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DynamicLinkProvider {
  Future<void> initInitialLink({context}) async {
    final prefs = await SharedPreferences.getInstance();

    final PendingDynamicLinkData? instanceLink =
        await FirebaseDynamicLinks.instance.getInitialLink();

    if (instanceLink != null) {
      final Uri shareLink = instanceLink.link;
      if (shareLink.path.contains('product-details')) {
        var id = shareLink.path
            .toString()
            .split('/')[shareLink.path.toString().split('/').length - 2];
        // Fluttertoast.showToast(msg: "INITIAL ID ${id}");
        Navigator.pushNamed(context, '/productInfo',
            arguments: {"id": id.toString().trim()});
      } else {
        //handleRefer and earn
        Timer(const Duration(seconds: 1), () {
          var id = shareLink.path
              .toString()
              .split('/')[shareLink.path.toString().split('/').length - 2];

          prefs.setString('referrer', id.toString());

          Provider.of<Auth>(context, listen: false)
              .setReferralId(id.toString());
        });
      }
    } else {
      // Fluttertoast.showToast(msg: "NO LINKS}");
      print("NO LINKS");
    }
  }

  Future<void> initDynamicLink({context}) async {
    final prefs = await SharedPreferences.getInstance();
    FirebaseDynamicLinks.instance.onLink.listen(
      (pendingDynamicLinkData) {
        // Set up the `onLink` event listener next as it may be received here
        final Uri deepLink = pendingDynamicLinkData.link;

        if (deepLink.path.contains('product-details')) {
          var id = deepLink.path
              .toString()
              .split('/')[deepLink.path.toString().split('/').length - 2];
          Navigator.pushNamed(context, '/productInfo',
              arguments: {"id": id.toString().trim()});
        } else {
          // handleRefer
          print('ELSE');

          Timer(const Duration(seconds: 1), () {
            var id = deepLink.path
                .toString()
                .split('/')[deepLink.path.toString().split('/').length - 2];
            prefs.setString('referrer', id.toString());

            Provider.of<Auth>(context, listen: false)
                .setReferralId(id.toString());
          });
        }
            },
    );
  }
}
