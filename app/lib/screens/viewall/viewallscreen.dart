import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import '../../providers/homeProvider.dart';
import '../../providers/userProvider.dart';
import '../../theme/AppTheme.dart';
import '../../utils/databaseServices.dart';
import '../../widgets/screenHeader.dart';

class AllProductsScreen extends StatelessWidget {
  final List<dynamic> products;
  final String title;

  const AllProductsScreen({super.key, required this.products, required this.title});

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    return SafeArea(
      child: Scaffold(
        body: Column(
          children: [
            ScreenHeader(
              size: size,
              title: title,
              isSearchButton: true,
              isHeartButton: true,
              isCartButton: true,
            ),
            Expanded(
              child: GridView.builder(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 2,
                  mainAxisSpacing: 2,
                  childAspectRatio: Provider.of<HomeData>(context).isTablet
                      ? MediaQuery.of(context).size.width /
                          (MediaQuery.of(context).size.height / 1.3)
                      : MediaQuery.of(context).size.width /
                          (MediaQuery.of(context).size.height / 1.5),
                ),
                itemCount: products.length,
                itemBuilder: (context, index) => InkWell(
                  onTap: () => Navigator.of(context).pushNamed('/productInfo',
                      arguments: {"id": products[index]['data']['id']}),
                  child: Container(
                    margin: const EdgeInsets.all(2),
                    decoration:
                        BoxDecoration(border: Border.all(color: Colors.black)),
                    // color: Colors.white,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(
                          height: size.height * 0.24,
                          width: double.infinity,
                          child: Stack(
                            children: [
                              Center(
                                child: Image.network(
                                  products[index]['data']?['coverPic']
                                          ?.containsKey('mob')
                                      ? products[index]['data']['coverPic']
                                          ['mob']
                                      : products[index]['data']?['images']?[0]
                                              ?['thumb'] ??
                                          '',
                                  fit: BoxFit.cover,
                                ),
                              ),
                              Visibility(
                                visible: calculateDiscountPercentage(
                                        products[index]['data']?['priceList']
                                            ?[0]?['price'],
                                        products[index]['data']?['priceList']
                                            ?[0]?['discountedPrice']) >
                                    0,
                                child: Positioned(
                                  top: 4,
                                  left: 4,
                                  child: Container(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 4, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: AppTheme().themeColor,
                                      borderRadius: const BorderRadius.only(
                                          topLeft: Radius.circular(0)),
                                    ),
                                    child: Text(
                                      "(${calculateDiscountPercentage(products[index]['data']?['priceList'][0]['price'], products[index]['data']?['priceList']?[0]?['discountedPrice'])}% OFF)",
                                      style: AppTheme().outfitStyle(
                                          color: Colors.white, fontSize: 12),
                                    ),
                                  ),
                                ),
                              ),
                              Positioned(
                                top: 0,
                                right: 0,
                                child: Consumer<Auth>(
                                  builder: (context, authProvider, child) {
                                    bool isInWishlist = authProvider
                                        .isInWishlist(products[index]['id']);
                                    return InkWell(
                                      onTap: () async {
                                        print("clicked");
                                        String productId =
                                            products[index]['id'];

                                        if (isInWishlist) {
                                          await authProvider
                                              .removeFromWishlist(productId);
                                        } else {
                                          await authProvider
                                              .addToWishlist(productId);
                                        }
                                        print(productId);
                                      },
                                      child: Icon(
                                        isInWishlist
                                            ? Icons.favorite
                                            : Icons.favorite_border_outlined,
                                        color: isInWishlist
                                            ? AppTheme().themeColor
                                            : null,
                                      ),
                                    );
                                  },
                                ),
                              ),
                              DatabaseService()
                                      .checkPdtStock(products[index]['data'])
                                  ? Positioned(
                                      top: 60,
                                      child: Container(
                                        color: Colors.white.withOpacity(0.8),
                                        padding: const EdgeInsets.symmetric(
                                            vertical: 5),
                                        width: size.width * 0.35,
                                        child: const Center(
                                          child: Text(
                                            "OUT OF STOCK",
                                            style: TextStyle(
                                              color: Colors.red,
                                              fontWeight: FontWeight.bold,
                                              fontSize: 11,
                                            ),
                                          ),
                                        ),
                                      ))
                                  : const SizedBox()
                            ],
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(left: 10, right: 10),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                products[index]['data']?['prodName'] ?? '',
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: AppTheme().outfitStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                              const SizedBox(height: 5),
                              Row(
                                children: [
                                  if (products[index]['data']?['priceList']?[0]
                                          ?['discountedPrice'] !=
                                      products[index]['data']?['priceList']?[0]
                                          ?['price'])
                                    Text(
                                      "Rs ${products[index]['data']?['priceList']?[0]?['price']?.toString() ?? ''}",
                                      style: GoogleFonts.outfit(
                                        textStyle: TextStyle(
                                          fontSize: 14,
                                          fontWeight: FontWeight.w400,
                                          color: AppTheme().themeColor,
                                          decoration:
                                              TextDecoration.lineThrough,
                                        ),
                                      ),
                                    ),
                                  SizedBox(
                                    width: products[index]['data']?['priceList']
                                                ?[0]?['discountedPrice'] !=
                                            products[index]['data']
                                                ?['priceList']?[0]?['price']
                                        ? 5
                                        : 0,
                                  ),
                                  Text(
                                    "Rs ${products[index]['data']?['priceList']?[0]?['discountedPrice']?.toString() ?? ''}",
                                    style: AppTheme().outfitStyle(
                                      fontWeight: FontWeight.w500,
                                      color: AppTheme().themeColor,
                                      fontSize: 14,
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 5),
                            ],
                          ),
                        )
                      ],
                    ),
                  ),
                ),
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
