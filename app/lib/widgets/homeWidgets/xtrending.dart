import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/utils/databaseServices.dart';
import 'package:shein/widgets/categoryCard.dart';
import 'package:shein/widgets/screenHeader.dart';

class XTrendingScreen extends StatefulWidget {
  const XTrendingScreen({Key? key}) : super(key: key);

  @override
  State<XTrendingScreen> createState() => _XTrendingScreenState();
}

class _XTrendingScreenState extends State<XTrendingScreen>
    with TickerProviderStateMixin {
  final db = FirebaseFirestore.instance;

  late TabController _tabController;

  List<dynamic> products = [];
  List<dynamic> subCategories = [];
  List<dynamic> subsubCategories = [];
  bool isLoading = true;
  bool onlyProductsLoading = false;
  String selectedSubCategory = "";
  bool loading = false;
  var categories = [];
  dynamic docRef;
  dynamic args;

  @override
  void initState() {
    super.initState();
    // Initialize _tabController with an initial length
    _tabController = TabController(length: 0, vsync: this);
  }

  @override
  void dispose() {
    // Dispose of _tabController
    _tabController.dispose();
    super.dispose();
  }

  fetchSubCategory(categoryId, subCatId) async {
    setState(() {
      isLoading = true;
    });

    print("Selected Categories Document ID: $categoryId");
    print("Selected SubCat Document ID: $subCatId");

    var subCategoriesData =
        await DatabaseService().fetchSubCategories("iG73vfdmWplIRQwxA7xD");

    print("subcat data : $subCategoriesData");
    // Check if subCatId is null, and set selectedSubCategory to the first subcategory ID
    selectedSubCategory = subCategoriesData[0]['id'];

    var productsData =
        await DatabaseService().fetchProducts(selectedSubCategory);

    print("PRODUCTS $productsData");

    setState(() {
      subCategories = subCategoriesData;
      products = productsData;
      isLoading = false;

      // Update _tabController with the actual length of subCategories
      _tabController = TabController(length: subCategories.length, vsync: this);
    });

    fetchSubSubCategory("iG73vfdmWplIRQwxA7xD", "S9ZlFeuXA1uYXIwgmnCI");
  }

  fetchSubSubCategory(categoryId, subCatId) async {
    setState(() {
      isLoading = true;
    });

    print("Selected SubCategories Document ID: $subCatId");

    try {
      final QuerySnapshot<Map<String, dynamic>> subsubcatquery = await db
          .collection("categories")
          .doc(categoryId)
          .collection("subcategories")
          .doc(subCatId)
          .collection("subcategories")
          .get();

      setState(() {
        // Create a new list for sub-subcategories
        subsubCategories = subsubcatquery.docs
            .map((DocumentSnapshot<Map<String, dynamic>> document) {
          return {"id": document.id, ...?document.data()};
        }).toList();

        selectedSubCategory = subCatId;
        isLoading = false;
      });

      // Print data in the terminal
      print("Subsubcat data : $subsubCategories");
    } catch (e) {
      print("Error fetching sub-subcategories: $e");
      setState(() {
        isLoading = false;
      });
    }
  }

  handleTap(category) {
    Navigator.of(context).pushNamed('/categoryProducts', arguments: {
      "categoryName": category['name'],
      "categoryId": category['id'],
      "categoryData": category
    });
  }

  test() {
    args = ModalRoute.of(context)!.settings.arguments;

    if (products.isEmpty && isLoading) {
      
        fetchSubCategory(
          "iG73vfdmWplIRQwxA7xD",
          "S9ZlFeuXA1uYXIwgmnCI"
        );
      
    }
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    test();

    return SafeArea(
      child: DefaultTabController(
        length: _tabController.length ?? 0,
        child: Scaffold(
          backgroundColor: Colors.white, // Set your desired background color
          body: Column(
            children: [
              ScreenHeader(
                size: size,
                title: "X-Trending",
                isSearchButton: true,
                isHeartButton: true,
                isCartButton: true,
              ),
              Expanded(
                child: products.isEmpty
                    ? const Center(
                        child:  
                        
                        
                        //  CircularProgressIndicator(
                          
                        //   color: AppTheme().secondaryColor,
                        // ),



                        Text("No products available")
                      )
                    : Row(
                        children: [
                          // Vertical Tab Bar
                          SizedBox(
                            width: 120,
                            child: ListView.builder(
                              itemCount: subCategories.length,
                              itemBuilder: (context, index) => GestureDetector(
                                onTap: () {
                                  _tabController.animateTo(index);
                                  // Call fetchSubSubCategory when a tab is selected
                                  fetchSubSubCategory(
                                    "iG73vfdmWplIRQwxA7xD",
                                    subCategories[index]['id'],
                                  );
                                },
                                child: Container(
                                  padding: const EdgeInsets.symmetric(vertical: 10),
                                  color: _tabController.index == index
                                      ? Colors.grey.withOpacity(0.2)
                                      : Colors.transparent,
                                  child: Center(
                                    child: Text(
                                      subCategories[index]['name'],
                                      style: AppTheme().outfitStyle(),
                                      maxLines: 3,
                                      textAlign: TextAlign.center,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                          Expanded(
                            child: _tabController.length > 0
                                ? TabBarView(
                                    controller: _tabController,
                                    children: subCategories.map((category) {
                                      return loading
                                          ? Center(
                                              child: CircularProgressIndicator(
                                                color:
                                                    AppTheme().secondaryColor,
                                              ),
                                            )
                                          : subsubCategories.isEmpty
                                              ? Center(
                                                  child: Text(
                                                    "No sub categories available",
                                                    style: AppTheme()
                                                        .outfitStyle(),
                                                  ),
                                                )
                                              : SingleChildScrollView(
                                                  child: GridView.count(
                                                    physics:
                                                        const NeverScrollableScrollPhysics(),
                                                    shrinkWrap: true,
                                                    padding: const EdgeInsets
                                                        .symmetric(
                                                        horizontal: 4),
                                                    mainAxisSpacing: 4,
                                                    crossAxisSpacing: 8,
                                                    childAspectRatio:
                                                        Provider.of<HomeData>(
                                                                    context)
                                                                .isTablet
                                                            ? 0.1
                                                            : 0.75,
                                                    crossAxisCount: 2,
                                                    children: [
                                                      ...(subsubCategories.map(
                                                          (subsubcategory) {
                                                        return Padding(
                                                          padding:
                                                              const EdgeInsets
                                                                  .only(
                                                                  bottom: 16.0),
                                                          child: CategoryCard(
                                                            category:
                                                                subsubcategory,
                                                            context: context,
                                                            handleTap:
                                                                handleTap,
                                                            isFirstStep: false,
                                                            nameBannerSize: 45,
                                                            size: size,
                                                          ),
                                                        );
                                                      }).toList()),
                                                    ],
                                                  ),
                                                );
                                    }).toList(),
                                  )
                                : Container(),
                          ),
                        ],
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
