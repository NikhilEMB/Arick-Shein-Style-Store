import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import '../theme/AppTheme.dart';

Widget CategoryCard({
  context,
  handleTap,
  category,
  size,
  required int nameBannerSize,
  required bool isFirstStep,
}) {
  return InkWell(
    onTap: () => handleTap(category),
    child: Column(
      children: [
        Stack(
          children: [
            ClipOval(
              child: Container(
                width: size.width * 0.28, // Adjusted size
                height: size.width * 0.28, // Adjusted size
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: AppTheme().themeColor,
                    width: 2.0, // Adjusted size
                  ),
                ),
                child: ClipOval(
                  child: Container(
                    width: size.width * 0.22, // Adjusted size
                    height: size.width * 0.22, // Adjusted size
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.black26),
                    ),
                    child: CachedNetworkImage(
                      imageUrl: category.containsKey('image') &&
                          category['image'].isNotEmpty &&
                          category['image'].containsKey('mob') &&
                          category['image']['mob'].toString() !=
                              "assets/img/placeholder-img.jpg"
                          ? category['image']['mob']
                          : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
                      memCacheHeight: 512, // Adjusted size
                      memCacheWidth: 512, // Adjusted size
                      fit: BoxFit.contain,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 4), // Adjusted size
        Text(
          category['name'],
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
          style: AppTheme().outfitStyle(
            fontWeight: FontWeight.w500,
            fontSize: 14, // Adjusted size
            color: Colors.black,
          ),
        ),
      ],
    ),
  );
}
