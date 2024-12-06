import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:provider/provider.dart';

class TextBlock extends StatefulWidget {
  final String title;
  final String widgetId;
  final dynamic size;
  final int index;
  final bool isHome;

  const TextBlock({
    super.key,
    required this.title,
    required this.widgetId,
    this.size,
    required this.index,
    this.isHome = true,
  });

  @override
  State<TextBlock> createState() => _TextBlockState();
}

class _TextBlockState extends State<TextBlock> {
  dynamic blockData;

  fetchData() async {
    var res = await FirebaseFirestore.instance
        .collection("widgets")
        .doc(widget.widgetId)
        .get()
        .then((value) => value.data());
    setState(() {
      blockData = res;
    });
    return;
  }

  @override
  void initState() {
    // TODO: implement initState
    if (!widget.isHome) {
      fetchData();
    }
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
                .toList()[0]['data'] ==
            null) {
      return const SizedBox();
    }

    if (!widget.isHome && blockData == null) {
      return const SizedBox();
    }

    var data = widget.isHome
        ? Provider.of<HomeData>(context, listen: false)
            .homeListData
            .where((e) => e['id'] == widget.widgetId)
            .toList()[0]['data']
        : blockData;

    return Container(
      margin: EdgeInsets.only(bottom: 20, top: !widget.isHome ? 20 : 0),
      padding: const EdgeInsets.symmetric(horizontal: 15),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 15),
        decoration: BoxDecoration(
            border: Border.all(color: AppTheme().secondaryColor, width: 2),
            borderRadius: BorderRadius.circular(10),
            color: const Color.fromARGB(255, 254, 255, 252)),
        width: double.infinity,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              widget.title,
              style: const TextStyle(fontSize: 19, fontWeight: FontWeight.bold),
            ),
            Html(
              data: data['description'],
            ),
          ],
        ),
      ),
    );
  }
}
