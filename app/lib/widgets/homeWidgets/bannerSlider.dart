
import 'package:carousel_slider/carousel_slider.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:shein/bannerLink/BannerLinkingScreen.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:shein/widgets/loadingModal.dart';
import 'package:provider/provider.dart';

class BannerSlider extends StatefulWidget {
  final String widgetId;
  final dynamic size;
  final int index;
  final bool isHome;

  const BannerSlider(
      {super.key,
      this.isHome = true,
      required this.widgetId,
      this.size,
      required this.index});

  @override
  State<BannerSlider> createState() => _BannerSliderState();
}

class _BannerSliderState extends State<BannerSlider> {
  List<dynamic> slides = [];

  fetchSlides() async {
    await FirebaseFirestore.instance
        .collection('widgets')
        .doc(widget.widgetId)
        .collection('slides')
        .where('active', isEqualTo: true)
        .get()
        .then((value) {
      if (value.docs.isNotEmpty) {
        var arr = [];
        for (var element in value.docs) {
          arr.add({...element.data(), "id": element.id});
        }
        setState(() {
          slides = arr;
        });
      }
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    if (!widget.isHome) {
      fetchSlides();
    }
    super.initState();
  }

  // @override
  // void didChangeDependencies() {
  //   // TODO: implement didChangeDependencies
  //   if (slides.isEmpty) {
  //     if (Provider.of<HomeData>(context, listen: false).homeListData.isEmpty) {
  //       fetchSlides();
  //     } else {
  //       if (Provider.of<HomeData>(context, listen: false)
  //               .homeListData[widget.index]['data'] !=
  //           null) {
  //         print(
  //             "DATAAAAAAAAAAAAAAAA ${Provider.of<HomeData>(context, listen: false).homeListData[0]['data']}");
  //         Timer(Duration(seconds: 1), () {
  //           setState(() {
  // slides = Provider.of<HomeData>(context, listen: false)
  //     .homeListData[widget.index]['data'];
  //           });
  //         });
  //       }
  //     }
  //   }
  //   super.didChangeDependencies();
  // }

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
            .toList()[0]['data']
            .isEmpty) {
      return const SizedBox();
    }

    if (!widget.isHome && slides.isEmpty) {
      return const SizedBox();
    }

    var data = widget.isHome
        ? Provider.of<HomeData>(context)
            .homeListData
            .where((e) => e['id'] == widget.widgetId)
            .toList()[0]['data']
        : slides;

    return Container(
      height: size.height * 0.30,
      margin: EdgeInsets.only(bottom: 0, top: !widget.isHome ? 0 : 0),
      width: double.infinity,
      child: CarouselSlider(
        options: CarouselOptions(
          enableInfiniteScroll: true, viewportFraction: 1,
          autoPlay: true,
          autoPlayInterval: const Duration(seconds: 3),
          // height: widget.size.width * 0.5,
        ),
        items: [
          ...(data.map((e) {
            return InkWell(
              onTap: () => handleTap(e),
              child: Container(
                // height: size.height * 0.1,
                // width: double.infinity,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(0),
                    image: DecorationImage(
                      fit: BoxFit.cover,
                      image: NetworkImage(
                        e['image']['mob'],
                      ),
                    )),
                // margin: EdgeInsets.symmetric(vertical: 10),
                // child: Image.network(
                //   e['image']['mob'],
                //   // cacheHeight: 768,
                //   // cacheWidth: 1024,
                // ),
              ),
            );
          }
          ).toList())
        ],
      ),
    );
  }
}
