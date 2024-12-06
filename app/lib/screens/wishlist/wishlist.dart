import 'package:google_fonts/google_fonts.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../widgets/screenHeader.dart';
import '../../providers/userProvider.dart';

class WishlistScreen extends StatefulWidget {
  const WishlistScreen({super.key});

  @override
  State<WishlistScreen> createState() => _WishlistScreenState();
}

class _WishlistScreenState extends State<WishlistScreen> {
  List<Map<String, dynamic>> wishlistItems = [];
  bool isLoading = true;
  final GlobalKey<RefreshIndicatorState> _refreshIndicatorKey =
      GlobalKey<RefreshIndicatorState>();

  @override
  void initState() {
    fetchWishlistProduct(context);
    super.initState();
  }

  Future<void> _onRefresh() async {
    setState(() {
      wishlistItems.clear();
      isLoading = true;
    });
    await fetchWishlistProduct(context);
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            ScreenHeader(
              isBackButton: true,
              size: size,
              title: "Wishlist",
              isCartButton: true,
            ),
            Expanded(
              child: RefreshIndicator(
                key: _refreshIndicatorKey,
                onRefresh: _onRefresh,
                child: isLoading
                    ? const Center(child: CircularProgressIndicator())
                    : Provider.of<Auth>(context).wishlist.isNotEmpty
                        ? GridView.builder(
                            gridDelegate:
                                SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: 2,
                              crossAxisSpacing: 2,
                              mainAxisSpacing: 2,
                              childAspectRatio:
                                  size.width / (size.height / 1.2),
                            ),
                            itemCount: wishlistItems.length,
                            itemBuilder: (context, index) {
                              final productData = wishlistItems[index];
                              return WishlistProductCard(
                                onProductRemoved: _onRefresh,
                                productData: productData,
                              );
                            },
                          )
                        : const Center(
                            child: Text('Your wishlist is empty.'),
                          ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> fetchWishlistProduct(BuildContext context) async {
    final auth = Provider.of<Auth>(context, listen: false);

    try {
      await auth.fetchWishlist();

      final List<Future<Map<String, dynamic>>> productFutures =
          auth.wishlist.map((item) => fetchProductData(item)).toList();

      final List<Map<String, dynamic>> productsData =
          await Future.wait(productFutures);

      setState(() {
        wishlistItems.addAll(productsData.where((data) => data.isNotEmpty));
        isLoading = false;
      });
    } catch (e) {
      // Handle error and show user feedback
      print('Error fetching wishlist: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<Map<String, dynamic>> fetchProductData(String itemId) async {
    try {
      var productDoc = await FirebaseFirestore.instance
          .collection('products')
          .doc(itemId)
          .get();
      print('DATA : ${productDoc.data()}');
      if (productDoc.exists) {
        return {
          ...productDoc.data() as Map<String, dynamic>,
          'prodId': productDoc.id
        };
      } else {
        return {};
      }
    } catch (e) {
      print('Error fetching product data: $e');
      return {};
    }
  }
}

class WishlistProductCard extends StatelessWidget {
  final Map<String, dynamic> productData;
  final Function() onProductRemoved;
  const WishlistProductCard(
      {super.key, required this.productData, required this.onProductRemoved});

  @override
  Widget build(BuildContext context) {
    final List<dynamic>? priceList = productData['priceList'];
    final dynamic coverPic = productData['coverPic'];
    final List<dynamic>? images = productData['images'];
    final String itemId =
        productData['itemId'] ?? ''; // Provide a default value or empty string

    return Padding(
      padding: const EdgeInsets.all(4.0),
      child: Container(
        decoration: BoxDecoration(border: Border.all(color: Colors.black)),
        child: Stack(
          children: [
            Padding(
              padding: const EdgeInsets.all(0.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  if ((coverPic != null && coverPic.containsKey('mob')) ||
                      (images != null &&
                          images.isNotEmpty &&
                          images[0].containsKey('thumb')))
                    GestureDetector(
                      onTap: () {
                        Navigator.of(context).pushNamed(
                          '/productInfo',
                          arguments: {"id": productData['prodId']},
                        );
                      },
                      child: SizedBox(
                        width: double.infinity,
                        child: Image.network(
                          (coverPic != null && coverPic.containsKey('mob'))
                              ? coverPic['mob']
                              : (images != null &&
                                      images.isNotEmpty &&
                                      images[0].containsKey('thumb'))
                                  ? images[0]['thumb']
                                  : '', // Provide a default image URL or an empty string
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                  Padding(
                    padding: const EdgeInsets.only(left: 4),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          productData['prodName'] ?? 'Product Name N/A',
                          style: AppTheme().outfitStyle(
                            fontWeight: FontWeight.w400,
                            color: AppTheme().themeColor,
                            fontSize: 14,
                          ),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 2),
                        if (priceList != null && priceList.isNotEmpty)
                          Text(
                            "Rs ${priceList[0]['discountedPrice'] ?? 'Price N/A'}",
                            style: AppTheme().outfitStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        Row(
                          children: [
                            if (priceList == null || priceList.isEmpty)
                              Text(
                                "Rs ${productData['discountedPrice'].toString()}",
                                style: AppTheme().outfitStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            const SizedBox(width: 10),
                            if (priceList == null ||
                                priceList.isEmpty &&
                                    productData['price'] != null)
                              Text(
                                "Rs ${productData['price'].toString()}",
                                style: GoogleFonts.outfit(
                                  decoration: TextDecoration.lineThrough,
                                  fontSize: 14,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                          ],
                        )
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Visibility(
              visible: priceList != null &&
                  priceList.isNotEmpty &&
                  calculateDiscountPercentage(priceList[0]['price'],
                          priceList[0]['discountedPrice']) >
                      0,
              child: Positioned(
                top: 14,
                left: 14,
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                  decoration: const BoxDecoration(
                    color: Colors.black,
                    borderRadius:
                        BorderRadius.only(topLeft: Radius.circular(0)),
                  ),
                  child: Text(
                    priceList != null && priceList.isNotEmpty
                        ? "(${calculateDiscountPercentage(priceList[0]['price'], priceList[0]['discountedPrice'])}% OFF)"
                        : "", // Display empty string if priceList is null or empty
                    style: AppTheme()
                        .outfitStyle(color: Colors.white, fontSize: 12),
                  ),
                ),
              ),
            ),
            Positioned(
              top: 2,
              right: 2,
              child: IconButton(
                onPressed: () async {
                  final authProvider =
                      Provider.of<Auth>(context, listen: false);
                  final prodId = productData['prodId'];

                  if (prodId.isNotEmpty) {
                    try {
                      await authProvider.removeFromWishlist(prodId);
                      await Future.delayed(const Duration(seconds: 1));
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                            content: Text('Product removed from wishlist')),
                      );

                      onProductRemoved();
                    } catch (e) {
                      print('Error removing product from wishlist: $e');
                    }
                  }
                },
                icon: const Icon(Icons.close, color: Colors.black),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

int calculateDiscountPercentage(
    dynamic originalPrice, dynamic discountedPrice) {
  if (originalPrice <= 0) {
    return 0;
  }
  return ((originalPrice - discountedPrice) / originalPrice * 100).toInt();
}
