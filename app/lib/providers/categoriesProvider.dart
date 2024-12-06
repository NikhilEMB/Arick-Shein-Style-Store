import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CategoryData with ChangeNotifier {
  List<dynamic> categories = [];

  Future<void> fetchCategories() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var regionId = prefs.get('region');
    print('Region id : $regionId');
    print('ascas');
    if (regionId != null) {
      await FirebaseFirestore.instance
          .collection('categories')
          .where('status', isEqualTo: true)
          .where('regionId', arrayContains: regionId.toString().trim())
          .orderBy('sortedAt', descending: true)
          .get()
          .then((value) {
        if (value.docs.isEmpty) return [];
        List<Map<String, dynamic>> arr = [];
        for (var doc in value.docs) {
          dynamic data = doc.data();

          print('RG id is: ${data['categoryRegions']}');

          arr.add({"id": doc.id, ...?data});
        }
        categories = arr;
        notifyListeners();
      }).catchError((e) {
        print("ERROR $e");
      });
    } else {
      await FirebaseFirestore.instance
          .collection('categories')
          .where('status', isEqualTo: true)
          .orderBy('sortedAt', descending: true)
          .get()
          .then((value) {
        if (value.docs.isEmpty) return [];
        List<Map<String, dynamic>> arr = [];
        for (var doc in value.docs) {
          dynamic data = doc.data();
          arr.add({"id": doc.id, ...?data});
        }
        categories = arr;
        notifyListeners();
      }).catchError((e) {
        print("ERROR $e");
      });
    }
  }
}
