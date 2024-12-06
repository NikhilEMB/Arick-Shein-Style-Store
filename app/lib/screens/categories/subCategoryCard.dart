import 'package:flutter/material.dart';

class SubCategoryCard extends StatelessWidget {
  final Map<dynamic, dynamic> subCategoryData;
  final VoidCallback onTap;

  const SubCategoryCard({super.key, required this.subCategoryData, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Card(
        // Customize the appearance of the card
        child: Column(
          children: [
            Image.network(subCategoryData['image']['url'] as String),
            Text(subCategoryData['name'] as String),
          ],
        ),
      ),
    );
  }
}

