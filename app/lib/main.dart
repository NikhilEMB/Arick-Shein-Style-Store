import 'dart:async';

import 'package:shein/screens/cartScreen/cart.dart';
import 'package:shein/screens/categories/subcategory.dart';
import 'package:shein/screens/myPoints/myPoints.dart';
import 'package:shein/screens/notification/notification.dart';
import 'package:shein/screens/wishlist/wishlist.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shein/firebase_options.dart';
import 'package:shein/providers/appProvider.dart';
import 'package:shein/providers/cartProvider.dart';
import 'package:shein/providers/categoriesProvider.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:shein/providers/userProvider.dart';
import 'package:shein/screens/AbousUs/AboutUs.dart';
import 'package:shein/screens/Contact/contactUs.dart';
import 'package:shein/screens/Terms&Policies/Terms&Policies.dart';
import 'package:shein/screens/address/myAddresses.dart';
import 'package:shein/screens/address/newAddress.dart';
import 'package:shein/screens/address/selectAddress.dart';
import 'package:shein/screens/address/stateSelect.dart';
import 'package:shein/screens/appointments/MyAppointments.dart';
import 'package:shein/screens/categories/categoriesScreen.dart';
import 'package:shein/screens/categories/categoryProduct.dart';
import 'package:shein/screens/chat/chatScreen.dart';
import 'package:shein/screens/login/loginScreen.dart';
import 'package:shein/screens/myOrders/myOrdersScreen.dart';
import 'package:shein/screens/myWallet/myWallet.dart';
import 'package:shein/screens/myWallet/walletTransactions.dart';
import 'package:shein/screens/orderSummary/orderPayment.dart';
import 'package:shein/screens/orderSummary/orderSummary.dart';
import 'package:shein/screens/product/productInfo.dart';
import 'package:shein/screens/product/ratingsPage.dart';
import 'package:shein/screens/profile/myProfile.dart';
import 'package:shein/screens/profile/profile.dart';
import 'package:shein/screens/referEarn/referEarn.dart';
import 'package:shein/screens/search/searchScreen.dart';
import 'package:shein/screens/splashScreen/SplashScreen.dart';
import 'package:shein/screens/vendor/vendorScreen.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/customNavBar.dart';
import 'package:provider/provider.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({
    super.key,
  });

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  // This widget is the root of your application.

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);

    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (context) {
            return Auth();
          },
        ),
        ChangeNotifierProvider(
          create: (context) {
            return Cart();
          },
        ),
        ChangeNotifierProvider(
          create: (context) {
            return AppProvider();
          },
        ),
        ChangeNotifierProvider(
          create: (context) {
            return HomeData();
          },
        ),
        ChangeNotifierProvider(
          create: (context) {
            return CategoryData();
          },
        )
      ],
      child: Consumer<Auth>(
        builder: (ctx, auth, _) => MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'shein',
          theme: ThemeData(
              fontFamily: 'Outfit',
              scaffoldBackgroundColor: AppTheme().mainBackgroundColor),
          home: const SplashScreen(),
          routes: {
            "/wishlist": (context) => const WishlistScreen(),
            "/home": (context) => const CustomNavBar(pageNum: 1),
            "/login": (context) => const LoginScreen(),
            '/contactUs': (context) => const ContactUs(),
            "/profile": (context) => const ProfilePage(),
            '/myprofile': (context) => MyProfile(
                  uid: FirebaseAuth.instance.currentUser?.uid.toString(),
                ),
            "/categoriesScreen": (context) => const CustomNavBar(pageNum: 2),
            "/categories": (context) => const CategoriesScreen(),
            "/notification": (context) => const NotificationScreen(),
            "/myOrders": (context) => const MyOrders(),
            "/myPoints": (context) =>  MyPoints(
              uid: FirebaseAuth.instance.currentUser?.uid.toString(),
            ),
            "/myaddress": (context) => MyAddresses(
                  uid: FirebaseAuth.instance.currentUser?.uid.toString(),
                ),
            "/productInfo": (context) => const ProductInfoScreen(),
            "/subCategory": (context) =>  const SubCategoryScreen(),
            "/categoryProducts": (context) =>  const CategoryProductsScreen(),
            "/cart": (context) => const CartScreen(),
            "/orderSummary": (context) => const OrderSummaryScreen(),
            "/newAddress": (context) => const NewAddressScreen(),
            '/selectState': (context) => const StateSelectScreen(),
            '/selectAddress': (context) => const SelectAddressScreen(),
            '/orderPayment': (context) => const OrderPaymentScreen(),
            '/vendor': (context) => const VendorScreen(),
            '/search': (context) => const SearchScreen(),
            '/terms&policies': (context) => const TermsandPolicies(),
            '/aboutUs': (context) => const AboutUs(),
            "/appointments": (context) => const MyAppointments(),
            "/chat": (context) => const ChatScreen(),
            "/referEarn": (context) => const ReferAndEarnScreen(),
            "/wallet": (context) => const MyWalletScreen(),
            "/ratings": (context) => const RatingsScreen(),
            "/walletTransactions": (context) => const WalletTransactions(),
          },
        ),
      ),
    );
  }
}
