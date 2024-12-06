// ignore_for_file: use_build_context_synchronously

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:shein/widgets/categoryCard.dart';
import '../../widgets/homeWidgets/bannerSlider.dart';
import '../../widgets/homeWidgets/categories.dart';
import '../../widgets/homeWidgets/imageBanner.dart';
import '../../widgets/homeWidgets/imageBlock.dart';
import '../../widgets/homeWidgets/productList.dart';
import '../../widgets/homeWidgets/textBlock.dart';
import '../../widgets/homeWidgets/vendors.dart';
import '../../widgets/homeWidgets/videoBlock.dart';
import 'package:provider/provider.dart';


class CategoryPage extends StatefulWidget {
  const CategoryPage({
    required this.catId,
    required this.title,
    required this.documentRef,
    required this.pageId,
    super.key,
  });

  final dynamic documentRef;
  final String title;
  final String catId;
  final String pageId;

  @override
  State<CategoryPage> createState() => _CategoryPageState();
}

class _CategoryPageState extends State<CategoryPage> {
  bool loading = false;
  var categories = [];
  List categoryPageData = [];
  dynamic docRef;

  
  fetchCategories() async {
    setState(() {
      loading = true;
    });

    // Fetch the subcategories
    var res = await widget.documentRef
        .collection('subcategories')
        .get()
        .then((value) {
      if (value.docs.isEmpty) {
        return [];
      } else {
        var arr = [];
        for (var element in value.docs) {
          var data = element.data();
          arr.add({...data, "id": element.id});
        }
        return arr;
      }
    });

    setState(() {
      loading = false;
      categories = res;
    });
  }

  fetchCategoryPageData() async {
    print('Page Id is : ${widget.pageId}');
    await FirebaseFirestore.instance
        .collection('pages')
        .doc(widget.pageId)
        .get()
        .then((value) {
      if (value.data().toString().contains('sections')) {
        setState(() {
          categoryPageData = value.data()!['sections'];
        });
      }
    });
  }

  handleTap(category) {
    if (category.containsKey('pageId') &&
        category['pageId'].toString().isNotEmpty) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (ctx) => CategoryPage(
            title: category['name'],
            catId: category['id'],
            documentRef: null,
            pageId: category['pageId'],
          ),
        ),
      );
    } else if (category['isSubcategories']) {
      // If it has subcategories, fetch and show them on the right side
      fetchCategories();
    } else {
      // Handle other cases as needed
    }
  }

  @override
  void initState() {
    super.initState();
    fetchCategoryPageData();
  }

  

  Widget renderWidget(
      {type, widgetId, size, title, index, categoryRegions, catId}) {
    print('$catId $widgetId');
    switch (type) {
      case "banner-slider":
        return BannerSlider(
          widgetId: widgetId,
          size: size,
          index: index,
          isHome: false,
        );
      case "image-banner":
        return ImageBanner(
          widgetId: widgetId,
          title: title,
          size: size,
          index: index,
          isHome: false,
        );
      case "product-carousel":
        return ProductList(
          title: title,
          widgetId: widgetId,
          size: size,
          index: index,
          isHome: false,
        );
      case "categories":
        return CategoriesWidget(
          title: title,
          widgetId: widgetId,
          size: size,
          index: index,
          isHome: false,
        );
      case "vendors":
        return VendorsWidget(
          title: title,
          widgetId: widgetId,
          size: size,
          index: index,
          isHome: false,
        );
      case "text-block":
        return TextBlock(
          title: title,
          widgetId: widgetId,
          size: size,
          index: index,
          isHome: false,
        );
      
      case "product-list":
        return ProductList(
          title: title,
          widgetId: widgetId,
          size: size,
          index: index,
          isHome: false,
        );
      case "image-block":
        return ImageBlock(
            title: title,
            widgetId: widgetId,
            size: size,
            index: index,
            isHome: false);
      case "video-block":
        return VideoBlock(
            title: title,
            widgetId: widgetId,
            size: size,
            index: index,
            isHome: false);
      
      default:
        return const SizedBox();
    }
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    final homeData = Provider.of<HomeData>(context);

    var expanded = Column(
      children: [
        const SizedBox(
          height: 15,
        ),
        const SizedBox(
          height: 0,
        ),
        ...(categoryPageData.asMap().entries.map((e) {
          int idx = e.key;
          dynamic val = e.value;
          int index = categoryPageData.indexOf(val);
          //   if (e['location'] == "all" ||
          //       e['location'] == "app" ||
          //       e['location'] == "test") {
          debugPrint('index : $index');
          if (index == 1) {
            return Column(
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 15),
                  child: Wrap(
                    // spacing: 10,
                    children: categories.map((e) {
                      return Container(
                        margin: const EdgeInsets.all(2),
                        height: 130,
                        width: size.width / 3 - 10,
                        child: Padding(
                          padding: const EdgeInsets.all(6.0),
                          child: CategoryCard(
                              category: e,
                              context: context,
                              isFirstStep: false,
                              handleTap: handleTap, 
                              nameBannerSize: 20),
                        ),
                      );
                    }).toList(),
                  ),
                ),
                renderWidget(
                    widgetId: categoryPageData[1]['widgetID'],
                    type: categoryPageData[1]['widgetType'],
                    size: size,
                    title: categoryPageData[1].containsKey('sectionName')
                        ? categoryPageData[1]['sectionName']
                        : "",
                    index: idx,
                    categoryRegions: categoryPageData[1].containsKey('regionId')
                        ? categoryPageData[1]['regionId']
                        : null)
              ],
            );
          }
          if (val['location'] == 'all' || val['location'] == "app") {
            print(val['widgetType']);
            return renderWidget(
                widgetId: val['widgetID'],
                type: val['widgetType'],
                size: size,
                title: val.containsKey('sectionName') ? val['sectionName'] : "",
                index: idx,
                categoryRegions:
                    val.containsKey('regionId') ? val['regionId'] : null);
          } else {
            return const SizedBox();
          }
        }).toList())
      ],
    );

    return Scaffold(
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(50),
        child: AppBar(
          elevation: 0,
          backgroundColor: Colors.white,
          foregroundColor: Colors.black,
          centerTitle: true,
          title: Text(
            widget.title,
            style: const TextStyle(color: Colors.black),
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [expanded],
          ),
        ),
      ),
    ); 
  }
}

class ShopByBrandsWidget extends StatelessWidget {
  ShopByBrandsWidget({
    super.key,
  });

  List colors = [];
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.all(10.0),
            child: Text(
              'Shop By Brands',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
          GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: 9,
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 3),
              itemBuilder: (context, index) {
                return Container(
                  margin: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                      color: Colors.red[100],
                      borderRadius: BorderRadius.circular(5)),
                );
              })
        ],
      ),
    );
  }
}
