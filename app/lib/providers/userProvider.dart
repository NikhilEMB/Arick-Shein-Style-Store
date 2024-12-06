import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:shein/utils/databaseServices.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Auth with ChangeNotifier {
  dynamic userData;
  dynamic uid = "";
  String referralId = "";

  String get userID {
    return uid;
  }

  get getUserData {
    return userData;
  }

  setReferralId(String id) {
    referralId = id;
    notifyListeners();
  }

  void logoutUser() {
    userData = null;
    uid = "";
    notifyListeners();
  }

  Future<void> uploadDeviceToken() async {
    if (FirebaseAuth.instance.currentUser?.uid != null) {
      List<dynamic> availbleTokens = await FirebaseFirestore.instance
          .collection('users')
          .doc(FirebaseAuth.instance.currentUser?.uid)
          .get()
          .then((value) {
        if (value.exists) {
          var data = value.data();
          if (data!.containsKey('deviceTokens')) {
            return data['deviceTokens'];
          } else {
            return [];
          }
        } else {
          return [];
        }
      });

      FirebaseMessaging messaging = FirebaseMessaging.instance;

      NotificationSettings settings = await messaging.requestPermission(
        alert: true,
        badge: true,
        sound: true,
      );

      if (settings.authorizationStatus == AuthorizationStatus.authorized) {
        String? token = await messaging.getToken();
        debugPrint('Added Tokens : ${availbleTokens.toList()}');
        debugPrint('Device Token: $token');
        if (!availbleTokens.contains(token)) {
          availbleTokens.add(token ?? "");
          await FirebaseFirestore.instance
              .collection('users')
              .doc(FirebaseAuth.instance.currentUser?.uid)
              .set({'deviceTokens': availbleTokens}, SetOptions(merge: true));
        }
      }
    }
  }

  Future<dynamic> fetchUser(String userId) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      if (FirebaseAuth.instance.currentUser?.uid != null) {
        print('INSIDE IF');
        uid = FirebaseAuth.instance.currentUser?.uid;
        dynamic data = await DatabaseService().userDataFetch(uid);
        if (data != null) {
          userData = data;
        }
        notifyListeners();
        return data;
      } else {
        print('INSIDE ELSE');
        var uid = FirebaseAuth.instance.currentUser?.uid;
        dynamic data = await DatabaseService().userDataFetch(uid.toString());
        if (data != null) {
          userData = data;
        }
        notifyListeners();
        return data;
      }
    } catch (e) {
      return null;
    }
  }

  List<String> wishlist = [];
  Future<void> fetchWishlist() async {
    try {
      final uid = FirebaseAuth.instance.currentUser?.uid;
      if (uid != null) {
        final wishlistRef = FirebaseFirestore.instance
            .collection('users')
            .doc(uid)
            .collection('wishlist');

        final wishlistSnapshot = await wishlistRef.get();
        wishlist = wishlistSnapshot.docs
            .map((doc) => doc['itemId'] as String)
            .toList();
        notifyListeners();
      }
    } catch (e) {
      print('Error fetching wishlist: $e');
      // Handle error
    }
  }

  bool isInWishlist(String productId) {
    return wishlist.contains(productId);
  }

  Future<void> addToWishlist(String itemId) async {
    try {
      final uid = FirebaseAuth.instance.currentUser?.uid;
      if (uid != null) {
        final userDocRef = await FirebaseFirestore.instance
            .collection('users')
            .doc(uid)
            .collection('wishlist')
            .doc(itemId)
            .set({'itemId': itemId});

        // await userDocRef.set({
        //   'wishlist': FieldValue.arrayUnion([itemId]),
        // }, SetOptions(merge: true));

        wishlist.add(itemId); // Update the local wishlist list
        notifyListeners();
      }
    } catch (e) {
      print('Error adding to wishlist: $e');
      // Handle error
    }
  }

  Future<void> removeFromWishlist(String itemId) async {
    try {
      final uid = FirebaseAuth.instance.currentUser?.uid;
      if (uid != null) {
        final userDocRef = FirebaseFirestore.instance
            .collection('users')
            .doc(uid)
            .collection('wishlist')
            .doc(itemId); // Reference the item document using its ID

        await userDocRef.delete(); // Delete the item document

        wishlist.remove(itemId); // Update the local wishlist list
        notifyListeners();
      }
    } catch (e) {
      print('Error removing from wishlist: $e');
      // Handle error
    }
  }
}
  // Future<dynamic> logoutUser() async {
  //   await FirebaseAuth.instance.signOut().then((value) {
  //     uid = "";
  //     userData = {};
  //   }).whenComplete(() => notifyListeners());
  // }



// checkUser() async {
//       final provid = Provider.of<Auth>(context, listen: false);
//       final prefs = await SharedPreferences.getInstance();
//       if (provid.userData == null) {
//         var data = await Provider.of<Auth>(context, listen: false)
//             .fetchUser(prefs.get('uid').toString());
//       } else {
//         var data = provid.userData;
//       }
//     }