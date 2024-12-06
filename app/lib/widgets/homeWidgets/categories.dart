import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:shein/screens/categories/categoriesScreen.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/categoryRow.dart';
import 'package:shein/widgets/loadingSkeleton.dart';
import 'package:provider/provider.dart';
import 'package:shein/screens/categories/category_page.dart';
import 'package:flutter/cupertino.dart';
import 'package:slide_countdown/slide_countdown.dart';

class CategoriesWidget extends StatefulWidget {
  final String title;
  final String widgetId;
  final String isCombo;
  final dynamic size;
  final int index;
  final bool isHome;

  const CategoriesWidget(
      {super.key,
      required this.title,
      required this.widgetId,
      this.size,
      this.isHome = true,
      required this.index,
      this.isCombo = ""});

  @override
  State<CategoriesWidget> createState() => _CategoriesWidgetState();
}

class _CategoriesWidgetState extends State<CategoriesWidget> {
  List<dynamic> categories = [];

  getProductsOnDemand() async {
    var categoryIdsList = await FirebaseFirestore.instance
        .collection('widgets')
        .doc(widget.widgetId)
        .get()
        .then((value) {
      if (value.exists) {
        return value.data()?['categoryList'];
      }
    });
    var arr = [];

    for (var catId in categoryIdsList) {
      await FirebaseFirestore.instance
          .collection("categories")
          .doc(catId)
          .get()
          .then((value) {
        if (value.exists) {
          if (value.data()?['status'] == true) {
            dynamic data = value.data();

            arr.add({...data, 'id': catId});
          }
        }
      });
    }
    print('ARRRRR $arr');
    setState(() {
      categories = arr;
    });
  }

  // fetchCategoryData() async {
  //   if (categories.isEmpty) {
  //     if (widget.isHome == false) {
  //       await getProductsOnDemand();
  //       return;
  //     }
  //     if (Provider.of<HomeData>(context, listen: false).homeListData.isEmpty) {
  //       await getProductsOnDemand();
  //     } else {
  //       print("HOMEEEEEEEE DATAAA");
  //       var newList = Provider.of<HomeData>(context, listen: false)
  //           .homeListData
  //           .where((e) => e['id'] == widget.widgetId)
  //           .toList();
  //       if (newList.isEmpty) {
  //         await getProductsOnDemand();
  //       } else {
  //         setState(() {
  //           categories = newList[0]['data'];
  //         });
  //       }
  //     }
  //   }
  // }

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
    } else if (category['isSubcategories']) {
      Navigator.of(context).pushNamed('/subCategory', arguments: {
        "categoryName": category['name'],
        "categoryId": category['id'],
        "categoryData": category
      });
    } else {
      Navigator.of(context).pushNamed('/categoryProducts', arguments: {
        "categoryName": category['name'],
        "categoryId": category['id'],
        "categoryData": category
      });
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    if (widget.isHome == false) {
      getProductsOnDemand();
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    print('asjcbaisgvigisahioahop');

    if (widget.isHome && Provider.of<HomeData>(context).isCategoryLoading) {
      return skeletonLoader(context, widget.title);
    }

    if (widget.isHome &&
        Provider.of<HomeData>(context)
            .homeListData
            .where((e) => e['id'] == widget.widgetId)
            .toList()
            .isEmpty) {
      return const SizedBox();
    }

    if (widget.isHome &&
        Provider.of<HomeData>(context)
            .homeListData
            .where((e) => e['id'] == widget.widgetId)
            .toList()[0]['data']
            .isEmpty) {
      return const SizedBox();
    }

    if (!widget.isHome && categories.isEmpty) {
      return const SizedBox();
    }
    var data = widget.isHome
        ? Provider.of<HomeData>(context)
            .homeListData
            .where((e) => e['id'] == widget.widgetId)
            .toList()[0]['data']
        : categories;

    final screenWidth = MediaQuery.of(context).size.width;
    final itemWidth = screenWidth / 3;
    final itemHeight = itemWidth;

    // final rowCount = (data.length / 3).ceil();
    final gridViewHeight = MediaQuery.of(context).size.width;

    return Container(
      margin: const EdgeInsets.only(bottom: 20),
      width: double.infinity,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  widget.title,
                  style: AppTheme()
                      .outfitStyle(fontSize: 19, fontWeight: FontWeight.w500),
                ),
                // Spacer(),

                (widget.isCombo.isNotEmpty && widget.isCombo == "combo")
                    ? const SizedBox()
                    : TextButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const CategoriesScreen()),
                          );
                        },
                        child: Text(
                          'View All',
                          style: AppTheme().outfitStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                            color: AppTheme().themeColor,
                          ),
                        ),
                      )
              ],
            ),
          ),
          const SizedBox(height: 20),
          (widget.isCombo.isNotEmpty && widget.isCombo == "combo")
              ? Padding(
                  padding: const EdgeInsets.only(left: 10),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Text(
                            "#SHEIN ",
                            style: TextStyle(
                                color: Colors.black,
                                fontSize: 22,
                                fontWeight: FontWeight.bold),
                          ),
                          Text(
                            "Style Store ",
                            style: TextStyle(
                                
                                color: AppTheme().themeColor,
                                fontSize: 22,
                                fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                      const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            "Combo Sale",
                            style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold),
                              ),
                        ],
                      ),
                     
                      const SizedBox(
                        height: 5,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          
                          (widget.isCombo.isNotEmpty &&
                                  widget.isCombo == "combo")
                              ? Row(
                                  children: [
                                    Text(
                                      "Ends in",
                                      style: AppTheme().outfitStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.w500),
                                    ),
                                    const SizedBox(
                                      width: 10,
                                    ),
                                    const SlideCountdownSeparated(
                                      decoration: BoxDecoration(
                                        color: Colors.black,
                                      ),
                                      duration: Duration(days: 1, hours: 6, minutes: 0, seconds: 0),
                                    ),
                                    const SizedBox(
                                      width: 10,
                                    ),
                                  ],
                                )
                              : const SizedBox(),


                              Padding(
                        padding: const EdgeInsets.only(right: 10),
                        child: TextButton(
                                      onPressed: () {
                                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) =>  const CategoriesScreen()),
                        );
                                      },
                                      child: Text(
                                        'View All',
                                        style: AppTheme().outfitStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.w600,
                                          color: AppTheme().themeColor,
                                        ),
                                      ),
                                    ),
                      ),
                        ],
                      ),
                    ],
                  ),
                )
              : const SizedBox(),

          SizedBox(
              height: (widget.isCombo.isNotEmpty && widget.isCombo == "combo")
                  ? 20
                  : 0),
          data.isEmpty
              ? const SizedBox()
              : Wrap(
                  children: data.map<Widget>((dataa) {
                    return Container(
                      width: itemWidth,
                      padding: const EdgeInsets.symmetric(horizontal: 10),
                      child: CategoryRow(
                        category: dataa,
                        context: context,
                        handleTap: handleTap,
                      ),
                    );
                  }).toList(),
                )
          //  Container(
          //     height: gridViewHeight,
          //     child: GridView.builder(
          //       shrinkWrap: true,
          //       gridDelegate:
          //           const SliverGridDelegateWithFixedCrossAxisCount(
          //         mainAxisExtent: 150,
          //         crossAxisCount: 3,
          //       ),
          //       itemCount: data.length,
          //       itemBuilder: (context, index) {
          //         return Padding(
          //           padding: const EdgeInsets.symmetric(horizontal: 10),
          //           child: CategoryRow(
          //             category: data[index],
          //             context: context,
          //             handleTap: handleTap,
          //           ),
          //         );
          //       },
          //     ),
          //   ),
        ],
      ),
    );
  }
}
