import 'package:carousel_slider/carousel_slider.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import '../../bannerLink/BannerLinkingScreen.dart';
import '../../providers/homeProvider.dart';
import '../../widgets/loadingModal.dart';
import 'package:provider/provider.dart';

class ImageBanner extends StatefulWidget {
  final String title;
  final String widgetId;
  final dynamic size;
  final int index;
  final bool isHome;

  const ImageBanner(
      {super.key,
      required this.title,
      required this.widgetId,
      this.size,
      this.isHome = true,
      required this.index});

  @override
  State<ImageBanner> createState() => _ImageBannerState();
}

class _ImageBannerState extends State<ImageBanner> {
  dynamic bannerImageData;
  final PageController _pageController = PageController();
  fetchBannerImage() async {
    var res = await FirebaseFirestore.instance
        .collection('widgets')
        .doc(widget.widgetId)
        .collection('slides')
        .get();
    if (res.docs.isNotEmpty) {
      dynamic data = res.docs[0].data();
      setState(() {
        bannerImageData = data;
      });
    } else {
      setState(() {
        bannerImageData = null;
      });
    }
    return;
  }

  @override
  void initState() {
    // TODO: implement initState
    if (!widget.isHome) {
      fetchBannerImage();
    }
    super.initState();
  }

  handleTap(slide) async {
    switch (slide['link']['type']) {
      case "Product":
        if (slide['link'].containsKey('ids') &&
            slide['link']['ids'].length > 1) {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (context) => BannerLinkingScreen(
                title: 'Products',
                type: slide['link']['type'],
                data: slide['link'],
              ),
            ),
          );
        } else {
          Navigator.of(context).pushNamed('/productInfo', arguments: {
            "title": slide['link']['name'],
            "id": slide['link']['id']
          });
        }
        break;
      case "Category":
        if (slide['link'].containsKey('ids') &&
            slide['link']['ids'].length > 1) {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (context) => BannerLinkingScreen(
                title: 'Categories',
                type: slide['link']['type'],
                data: slide['link'],
              ),
            ),
          );
        } else {
          showDialog(
            context: context,
            builder: (context) => loader(context),
          );
          dynamic categoryData = await FirebaseFirestore.instance
              .collection('categories')
              .doc(slide['link']['id'])
              .get()
              .then((value) {
            if (value.exists) {
              dynamic data = value.data();
              return {...data, "id": value.id};
            }
          });
          Navigator.pop(context);
          Navigator.of(context).pushNamed('/categoryProducts', arguments: {
            "categoryName": slide['link']['name'],
            "categoryId": slide['link']['id'],
            "categoryData": categoryData
          });
        }
        break;
      case "referEarn":
        if (FirebaseAuth.instance.currentUser?.uid != null) {
          Navigator.of(context).pushNamed('/referEarn');
        } else {
          Navigator.of(context).pushNamed('/login');
        }
        break;

      // case ""
      default:
    }
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
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
                .toList()[0]['data'] ==
            null) {
      return const SizedBox();
    }

    if (!widget.isHome && bannerImageData == null) {
      return const SizedBox();
    }

    var data = widget.isHome
        ? Provider.of<HomeData>(context)
            .homeListData
            .where((e) => e['id'] == widget.widgetId)
            .toList()[0]['data']
        : bannerImageData;

    if (data != null) {
      if (data is List && data.length > 1) {
        // If there are more than one images, show a scrolling list
        return Container(

    
      margin: const EdgeInsets.only(bottom: 0, top: 0),
      width: double.infinity,
      child: CarouselSlider(
        options: CarouselOptions(
          height: 150,

          enableInfiniteScroll: true, viewportFraction: 1,
          autoPlay: true,
          autoPlayInterval: const Duration(seconds: 3),
          // height: widget.size.width * 0.5,
        ),
        items: [
          ...(data.map((e) {
          return InkWell(
            onTap: () => handleTap(data[0]),
            child: Container(
              margin: const EdgeInsets.only(bottom: 0,),
              padding: const EdgeInsets.symmetric(horizontal: 10),
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: data.map((item) {
                    return Container(
                      width: MediaQuery.of(context).size.width,
                      margin: const EdgeInsets.only(right: 0 , ),
                      child: Image.network(data[0]['image']['mob']),
                    );
                  }).toList(),
                ),
              ),
            ),
          );

          }
          ))
        ],
      ),
        );
      } else {
        // If there is only one image, show it as before
        return InkWell(
          onTap: () => handleTap(data[0]),
          child: Container(
            margin: const EdgeInsets.only(bottom: 0, top: 10),
            padding: const EdgeInsets.symmetric(horizontal: 0),
            child: Image.network(data[0]['image']['mob']),
          ),
        );
      }
    } else {
      return const SizedBox();
    }
  }
}
