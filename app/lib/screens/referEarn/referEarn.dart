import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shein/providers/userProvider.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/screenHeader.dart';
import 'package:provider/provider.dart';

class ReferAndEarnScreen extends StatefulWidget {
  const ReferAndEarnScreen({super.key});

  @override
  State<ReferAndEarnScreen> createState() => _ReferAndEarnScreenState();
}

class _ReferAndEarnScreenState extends State<ReferAndEarnScreen> {
  @override
  void initState() {
    // TODO: implement initState
    if (Provider.of<Auth>(context, listen: false).userData == null) {
      Provider.of<Auth>(context, listen: false).fetchUser('userId');
    }
    super.initState();
  }

  void copyToClipboard(String text) {
    Clipboard.setData(ClipboardData(text: text));
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    return SafeArea(
        child: Scaffold(
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ScreenHeader(size: size, title: "Refer & Earn"),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                'Welcome to our "Refer and Earn" program – the ultimate way to share the benefits of our products/services with your friends and family while earning fantastic rewards in the process.',
                style: AppTheme().outfitStyle(color: const Color(0xff443344)),
              ),
            ),
            Image.asset('assets/images/refer-friends.png'),
            const SizedBox(height: 20),
            Provider.of<Auth>(context).userData == null
                ? SizedBox(
                    width: double.infinity,
                    child: Center(
                      child: CircularProgressIndicator(
                        color: AppTheme().secondaryColor,
                      ),
                    ),
                  )
                : Container(
                    padding: const EdgeInsets.symmetric(horizontal: 15),
                    width: double.infinity,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(
                              vertical: 5, horizontal: 10),
                          decoration: BoxDecoration(
                              color: const Color.fromARGB(255, 16, 49, 110),
                              borderRadius: BorderRadius.circular(6)),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Expanded(
                                  child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    "Share your invitation link.",
                                    style: AppTheme().outfitStyle(
                                        color: Colors.white,
                                        fontSize: 13,
                                        fontWeight: FontWeight.w600),
                                  ),
                                  const SizedBox(height: 10),
                                  Text(
                                    Provider.of<Auth>(context)
                                        .userData['referralLink']
                                        .toString(),
                                    style: const TextStyle(
                                      color: Color.fromARGB(255, 52, 201, 109),
                                      fontSize: 13,
                                      fontWeight: FontWeight.w600,
                                    ),
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ],
                              )),
                              InkWell(
                                onTap: () {
                                  copyToClipboard(
                                      Provider.of<Auth>(context, listen: false)
                                          .userData['referralLink']
                                          .toString());
                                  Fluttertoast.showToast(msg: "Link Copied.");
                                },
                                child: Container(
                                  height: 70,
                                  width: 70,
                                  decoration: BoxDecoration(
                                      color:
                                          const Color.fromARGB(255, 11, 35, 80),
                                      borderRadius: BorderRadius.circular(100)),
                                  child: const Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    crossAxisAlignment:
                                        CrossAxisAlignment.center,
                                    children: [
                                      Icon(
                                        Icons.copy_outlined,
                                        color: Colors.white,
                                        size: 18,
                                      ),
                                      SizedBox(height: 3),
                                      Text(
                                        "Tap to copy",
                                        style: TextStyle(
                                            fontSize: 9,
                                            color: Colors.white,
                                            fontWeight: FontWeight.bold),
                                      )
                                    ],
                                  ),
                                ),
                              )
                            ],
                          ),
                        ),
                        const SizedBox(height: 15),
                        Container(
                          padding: const EdgeInsets.symmetric(
                              vertical: 10, horizontal: 10),
                          decoration: BoxDecoration(
                              border: Border.all(
                                color: AppTheme().secondaryColor,
                                width: 1,
                              ),
                              borderRadius: BorderRadius.circular(6)),
                          child: Text(
                            "When your friend or family member Signup with your referral link. They get ₹100.00 as signup bonus and you get ₹50.00 as when they place first order on app.",
                            textAlign: TextAlign.center,
                            style: AppTheme().outfitStyle(
                              color: AppTheme().secondaryColor,
                              fontWeight: FontWeight.w600,
                              fontSize: 13,
                            ),
                          ),
                        )
                      ],
                    ),
                  )
          ],
        ),
      ),
    ));
  }
}
