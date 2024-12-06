import 'package:flutter/material.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/customNavBar.dart';

class AccountScreenHeader extends StatelessWidget {
  final bool isBackButton;
  final bool isSearchButton;
  final Size size;
  final String title;
  final bool isCartButton;
  final bool isHeartButton;

  const AccountScreenHeader({
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
           Center(
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
          
          // Add Spacer to push the title to the center
          const Spacer(),
        ],
      ),
    );
  }
}
