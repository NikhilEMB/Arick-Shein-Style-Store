import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:provider/provider.dart';

class ImageBlock extends StatefulWidget {
  final String title;
  final String widgetId;
  final dynamic size;
  final int index;
  final bool isHome;

  const ImageBlock(
      {super.key,
      required this.title,
      required this.widgetId,
      this.size,
      this.isHome = true,
      required this.index});

  @override
  State<ImageBlock> createState() => _ImageBlockState();
}

class _ImageBlockState extends State<ImageBlock> {
  dynamic imageData;

  fetchData() async {
    var res = await FirebaseFirestore.instance
        .collection("widgets")
        .doc(widget.widgetId)
        .get()
        .then((value) => value.data());
    setState(() {
      imageData = res;
    });
    return;
  }

  @override
  void initState() {
    // TODO: implement initState
    // fetchData();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.isHome &&
        Provider.of<HomeData>(context, listen: false)
            .homeListData
            .where((e) => e['id'] == widget.widgetId)
            .toList()
            .isEmpty) {
      return const SizedBox();
    }

    if (widget.isHome &&
        Provider.of<HomeData>(context, listen: false)
            .homeListData
            .where((e) => e['id'] == widget.widgetId)
            .toList()[0]['data']) {
      return const SizedBox();
    }

    if (!widget.isHome && imageData == null) {
      return const SizedBox();
    }

    var data = widget.isHome
        ? Provider.of<HomeData>(context, listen: false)
            .homeListData
            .where((e) => e['id'] == widget.widgetId)
            .toList()[0]['data']
        : imageData;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 15),
      width: double.infinity,
      margin: const EdgeInsets.only(bottom: 0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            widget.title,
            style: const TextStyle(fontSize: 19, fontWeight: FontWeight.bold),
          ),
          Html(data: data['description']),
          Image.network(data['coverImage']['mob']),
        ],
      ),
    );
  }
}
