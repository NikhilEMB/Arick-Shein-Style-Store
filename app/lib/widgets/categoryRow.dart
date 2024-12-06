import 'package:flutter/material.dart';

Widget CategoryRow({context, handleTap, category}) {
  var screenHeight = MediaQuery.of(context).size.height;
  final screenWidth = MediaQuery.of(context).size.width;
  // final itemWidth = screenWidth / 2.8;
  // final itemHeight = itemWidth * 1.5;

  return InkWell(
    onTap: () => handleTap(category),
    child: Container(
      // width: itemWidth,

      // height: itemHeight,
      child: Column(
        children: [
          SizedBox(
  height: screenHeight * 0.14,
  child: Image.network(
    category.containsKey('image') &&
            category['image'].isNotEmpty &&
            category['image'].containsKey('mob') &&
            category['image']['mob'].toString() !=
                "assets/img/placeholder-img.jpg"
        ? category['image']['mob']
        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
    fit: BoxFit.cover,
  ),
),
const SizedBox(
  height: 5,
),
          Text(
            category['name'],
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              fontWeight: FontWeight.w500,
              fontSize: 16,
              color: Colors.black,
            ),
          ),

          const SizedBox(
            height: 10,
          )

          // Positioned(
          //   top: itemHeight *
          //       0.69, // Adjust this value to lower the container
          //   child: Container(
          //     width: itemWidth * 0.6,
          //     padding: const EdgeInsets.all(4),
          //     decoration: BoxDecoration(
          //       borderRadius: const BorderRadius.only(
          //         bottomLeft: Radius.circular(8),
          //         topRight: Radius.circular(8),
          //       ),
          //       boxShadow: [
          //         BoxShadow(
          //           color: AppTheme().mainColor,
          //           blurRadius: 2.0,
          //           offset: Offset(0, 4),
          //         ),
          //       ],
          //       color: Colors.white,
          //     ),
          //     child: Center(
          //       child: Text(
          //         category['name'],
          //         maxLines: 1,
          //         overflow: TextOverflow.ellipsis,
          //         style: const TextStyle(
          //           fontWeight: FontWeight.w500,
          //           fontSize: 14,
          //           color: Colors.black,
          //         ),
          //       ),
          //     ),
          //   ),
          // ),
        ],
      ),
    ),
  );
}
