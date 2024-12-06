import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';
import 'package:shein/providers/cartProvider.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/customNavBar.dart';

class ScreenHeader extends StatelessWidget {
  final bool isBackButton;
  final bool isSearchButton;
  final Size size;
  final String title;
  final bool isCartButton;
  final bool isHeartButton;

  const ScreenHeader({
    Key? key,
    this.isBackButton = true,
    this.isSearchButton = false,
    this.isHeartButton = false,
    this.isCartButton = false,
    required this.size,
    required this.title,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double iconSize = size.height * 0.028;

    return SizedBox(
      height: size.height * 0.07,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                if (isBackButton)
                  IconButton(
                    onPressed: () {
                      if (Navigator.canPop(context)) {
                        Navigator.pop(context);
                      } else {
                        Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(
                            builder: (context) =>
                                const CustomNavBar(pageNum: 1),
                          ),
                        );
                      }
                    },
                    icon: Icon(
                      Icons.arrow_back,
                      size: iconSize,
                      color: Colors.black,
                    ),
                  ),
              ],
            ),
          ),
          Expanded(
            child: Center(
              child: Text(
                title,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: AppTheme().outfitStyle(
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
          Expanded(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                if (isSearchButton)
                  InkWell(
                    onTap: () {
                      Navigator.pushNamed(context, '/search');
                    },
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Icon(
                        Icons.search,
                        color: Colors.black,
                        size: iconSize,
                      ),
                    ),
                  ),
                if (isHeartButton)
                  InkWell(
                    onTap: () {
                      Navigator.pushNamed(context, '/wishlist');
                    },
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: SvgPicture.asset(
                        'assets/Icons/heart.svg',
                        color: Colors.black,
                        width: iconSize,
                        height: iconSize,
                      ),
                    ),
                  ),
                if (isCartButton)
                  Stack(
                    children: [
                      InkWell(
                        onTap: () {
                          Navigator.pushNamed(context, '/cart');
                        },
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: SvgPicture.asset(
                            'assets/Icons/Bag.svg',
                            height: iconSize,
                            width: iconSize,
                          ),
                        ),
                      ),
                      if (Provider.of<Cart>(context).cart.isNotEmpty)
                        Positioned(
                          right: 5,
                          top: 6,
                          child: Container(
                            width: 16,
                            height: 16,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(100),
                              color: AppTheme().themeColor,
                              // gradient: LinearGradient(
                              //   colors: [
                              //     AppTheme().secondaryColor,
                              //     AppTheme().secondaryColor,
                              //   ],
                              //   begin: Alignment.bottomCenter,
                              //   end: Alignment.topCenter,
                              //   stops: [-1.0, 0.9],
                              // ),
                            ),
                            child: Center(
                              child: Text(
                                Provider.of<Cart>(context)
                                    .cart
                                    .length
                                    .toString(),
                                style: const TextStyle(
                                    color: Colors.white, fontSize: 12),
                              ),
                            ),
                          ),
                        )
                      else
                        const SizedBox(),
                    ],
                  ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
