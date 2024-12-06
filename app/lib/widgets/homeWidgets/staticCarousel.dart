import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

class StaticCarousel extends StatelessWidget {
  final dynamic size;
  final int index;
  final bool isHome;

  const StaticCarousel({
    Key? key,
    this.size,
    this.isHome = true,
    required this.index,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return Column(
      children: [
        const SizedBox(
          height: 0,
        ),
        SizedBox(
          height: size.height * 0.15,
          width: size.width,
          child: CarouselSlider(
            options: CarouselOptions(
              enableInfiniteScroll: true,
              autoPlay: false,
              autoPlayInterval: const Duration(seconds: 3),
              viewportFraction: 1.0,
            ),
            items: [
              Image.asset(
                'assets/images/1.png',
                fit: BoxFit.cover,
              ),
              Image.asset(
                'assets/images/2.png',
                fit: BoxFit.cover,
              ),
              Image.asset(
                'assets/images/3.png',
                fit: BoxFit.cover,
              ),
            ],
          ),
        ),
      ],
    );
  }
}
