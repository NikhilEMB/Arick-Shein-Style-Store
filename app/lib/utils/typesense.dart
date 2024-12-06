// ignore_for_file: prefer_typing_uninitialized_variables

import 'dart:convert';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:typesense/typesense.dart';

class TypeSenseInstance {
  late final config;
  late final client;

  Future<List> searchProductTS(String search, page) async {
    var typeSenseCreds = await FirebaseFirestore.instance
        .collection('settings')
        .doc('environment')
        .get()
        .then((value) {
      if (value.exists) {
        var data = value.data();
        return data?['typesense'];
      }
    });
    final config = Configuration(typeSenseCreds['apiKey'],
        nodes: {
          Node(
            Protocol.https,
            typeSenseCreds['host'],
            port: typeSenseCreds['port'],
          )
        },
        connectionTimeout: const Duration(seconds: 2));
    client = Client(config);

    final prefs = await SharedPreferences.getInstance();
    var regionId = prefs.get('region');
    String projectId = Firebase.app().options.projectId;

    var searchRequests = {
      'searches': [
        {
          'collection': "$projectId-products",
          'q': search,
          'filter_by': "status:=true",
          'page': page,
          'per_page': 20 //250
        }
      ]
    };

    if (regionId != null) {
      searchRequests['searches']?[0]['filter_by'] +=
          " && categoryRegions:=$regionId";

      searchRequests['searches']?.add({
        'collection': "$projectId-products",
        'q': search,
        'filter_by': "status:=true && brandRegions:=$regionId",
        'page': page,
        'per_page': 20
      });
    }

    var commonSearchParams = {
      'query_by': 'prodName, searchKeywords',
    };

    return await client.multiSearch
        .perform(searchRequests, queryParams: commonSearchParams)
        .then((docs) {
      List<dynamic> arr = [];
      if (docs['results'].isEmpty) {
        return [];
      }

      for (var doc in docs['results']) {
        if (doc['hits'].isNotEmpty) {
          for (var hit in doc['hits']) {
            var index =
                arr.indexWhere((ele) => ele['id'] == hit['document']['id']);
            if (index == -1) {
              if (hit['document']['isPriceList']) {
                arr.add(hit['document']);
              } else {
                var priceList = jsonEncode([
                  {
                    "discountedPrice": hit['document']['discountedPrice'],
                    "inventory_item_id": "",
                    "price": hit['document']['prodPrice'],
                    "purchasePrice": hit['document']['discountedPrice'],
                    "shippingWeight": hit['document']['shippingWeight'] ?? 0,
                    "totalQuantity": hit['document']['productQty'],
                    "weight": hit['document']['prodName'],
                  }
                ]);
                arr.add({
                  ...hit['document'],
                  'isPriceList': true,
                  "priceList": priceList,
                });
              }
            }
          }
        }
      }
      return arr;
    });
  }

  Future<List> searchSimilarProducts(keywords) async {
    var typeSenseCreds = await FirebaseFirestore.instance
        .collection('settings')
        .doc('environment')
        .get()
        .then((value) {
      if (value.exists) {
        var data = value.data();
        return data?['typesense'];
      }
    });
    final config = Configuration(typeSenseCreds['apiKey'],
        nodes: {
          Node(
            Protocol.https,
            typeSenseCreds['host'],
            port: typeSenseCreds['port'],
          )
        },
        connectionTimeout: const Duration(seconds: 2));
    client = Client(config);

    final prefs = await SharedPreferences.getInstance();
    var regionId = prefs.get('region');
    String projectId = Firebase.app().options.projectId;

    var searchRequests = {
      'searches': [
        {
          'collection': "$projectId-products",
          'q': '*',
          'filter_by': "searchKeywords:=[$keywords]",
          'page': 1,
          'per_page': 20 //250
        }
      ]
    };

    var commonSearchParams = {
      'query_by': 'prodName, searchKeywords',
    };

    var check = await client.multiSearch
        .perform(searchRequests, queryParams: commonSearchParams)
        .then((docs) {
      List<dynamic> arr = [];
      if (docs['results'].isEmpty) {
        return [];
      }
      print("RES ${docs['results']}");

      for (var doc in docs['results']) {
        if (doc['hits'].isNotEmpty) {
          for (var hit in doc['hits']) {
            var index =
                arr.indexWhere((ele) => ele['id'] == hit['document']['id']);
            if (index == -1) {
              arr.add(hit['document']);
            }
          }
        }
      }
      return arr;
    });

    return check;
  }
}
