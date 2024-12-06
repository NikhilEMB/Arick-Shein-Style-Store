import 'dart:async';


import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shein/screens/categories/category_page.dart';

import '../../providers/categoriesProvider.dart';
import '../../providers/homeProvider.dart';
import '../../theme/AppTheme.dart';
import '../../utils/dynamicLink.dart';
import '../../widgets/categoryCard.dart';
import '../../widgets/screenHeader.dart';
import 'package:provider/provider.dart';

class CategoriesScreen extends StatefulWidget {
  const CategoriesScreen({super.key});

  @override
  State<CategoriesScreen> createState() => _CategoriesScreenState();
}

class _CategoriesScreenState extends State<CategoriesScreen> {
  bool loading = false;
  var categories = [];

  fetchCategories() async {
    setState(() {
      loading = true;
    });
    if (Provider.of<CategoryData>(context, listen: false).categories.isEmpty) {
      await Provider.of<CategoryData>(context, listen: false).fetchCategories();
    }

    setState(() {
      loading = false;
      categories = Provider.of<CategoryData>(context, listen: false).categories;
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    fetchCategories();
    Timer(const Duration(milliseconds: 100), () {
      DynamicLinkProvider().initDynamicLink(context: context);
    });
    super.initState();
  }

  handleTap(category) {
    if (category.containsKey('pageId') &&
        category['pageId'].toString().isNotEmpty) {
      Navigator.push(
          context,
          CupertinoPageRoute(
              builder: (ctx) => CategoryPage(
                    title: category['name'],
                    catId: category['id'],
                    documentRef: null,
                    pageId: category['pageId'],
                  )));
    } else if (category['isSubcategories'] ) {
      Navigator.of(context).pushNamed('/subCategory', arguments: {
        "categoryName": category['name'],
        "categoryId": category['id'],
        "categoryData": category
      });
    } else if (category.containsKey('isSubcategories') ) {
      Navigator.of(context).pushNamed('/categoryProducts', arguments: {
        "categoryName": category['name'],
        "categoryId": category['id'],
        "categoryData": category
      }
      );
    } else {
      Navigator.of(context).pushNamed('/categoryProducts', arguments: {
        "categoryName": category['name'],
        "categoryId": category['id'],
        "categoryData": category
      }
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    return SafeArea(
        child: Scaffold(
            body: SingleChildScrollView(
      child: SizedBox(
          width: double.infinity,
          height: size.height - size.height * 0.11,
          child: Column(
            children: [
              ScreenHeader(
                isBackButton: false,
                size: size,
                title: "Categories",
                isCartButton: true,
                isHeartButton: true,
              ),
              const SizedBox(
                height: 15,
              ),
              Expanded(
                child: loading
                    ? Center(
                        child: CircularProgressIndicator(
                          color: AppTheme().secondaryColor,
                        ),
                      )
                    : categories.isEmpty
                        ? const Center(
                            child: Text("No categories available"),
                          )
                        : GridView.count(
                            padding: const EdgeInsets.symmetric(horizontal: 4),
                            mainAxisSpacing: 5,
                            crossAxisSpacing: 1,
                            childAspectRatio:
                                Provider.of<HomeData>(context).isTablet
                                    ? 0.1
                                    : 0.76,
                            crossAxisCount: 3, // Number of columns
                            children: [
                              ...(categories.map((category) {
                                return Padding(
                                  padding: const EdgeInsets.only(bottom: 16.0),
                                  child: CategoryCard(
                                      category: category,
                                      context: context,
                                      handleTap: handleTap,
                                      isFirstStep: false,
                                      nameBannerSize: 45,
                                      size: size),
                                );
                              }).toList()),

                              // Your grid items here
                            ],
                          ),
              ),
            ],
          )),
    )));
  }
}
