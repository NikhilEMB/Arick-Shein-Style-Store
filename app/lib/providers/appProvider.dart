import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class AppProvider with ChangeNotifier {
  List<Map<String, dynamic>> categories = [];
  List<Map<String, dynamic>> userOrders = [];
  String region = '';
  List<dynamic> regionsData = [];

  void setRegion(region) {
    region = region;
    notifyListeners();
  }

  Future<void> getRegionsData() async {
    dynamic regionsDatas = await FirebaseFirestore.instance
        .collection('features')
        .doc('multiRegion')
        .collection('regions')
        .where("active", isEqualTo: true)
        .get()
        .then((data) {
      if (data.docs.isNotEmpty) {
        var arr = [];
        for (var region in data.docs) {
          arr.add({...region.data(), "id": region.id});
        }
        return arr;
      }
    });
    regionsData = regionsDatas;
    notifyListeners();
  }

  Future<void> fetchUserOrders() async {
    // var prefs = await SharedPreferences.getInstance();
    var uid = FirebaseAuth.instance.currentUser?.uid;
    if (uid == null) {
      Timer(const Duration(seconds: 2), () {
        userOrders = [];
        notifyListeners();
        return;
      });
    } else {
      await FirebaseFirestore.instance
          .collection('orders')
          .where('userId', isEqualTo: uid)
          .get()
          .then((value) {
        if (value.docs.isEmpty) return [];
        List<Map<String, dynamic>> arr = [];
        for (var doc in value.docs) {
          arr.add(doc.data());
        }
        userOrders = arr;
        notifyListeners();
      }).catchError((e) {
        print("ERROR $e");
      });
    }
  }
}
