import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:shein/providers/homeProvider.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:provider/provider.dart';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';

class VideoBlock extends StatefulWidget {
  final String title;
  final String widgetId;
  final dynamic size;
  final int index;
  final bool isHome;

  const VideoBlock(
      {super.key,
      required this.title,
      required this.widgetId,
      this.size,
      this.isHome = true,
      required this.index});

  @override
  State<VideoBlock> createState() => _VideoBlockState();
}

class _VideoBlockState extends State<VideoBlock> {
  dynamic videoData;
  final videoUrl = "https://www.youtube.com/watch?v=";
  late YoutubePlayerController _youtubePlayerController;
  bool isReady = false;

  fetchData() async {
    var res;
    if (videoData == null) {
      if (widget.isHome == false) {
        res = await FirebaseFirestore.instance
            .collection("widgets")
            .doc(widget.widgetId)
            .get()
            .then((value) => value.data());
        setState(() {
          videoData = res;
        });
        return;
      }
      if (Provider.of<HomeData>(context).homeListData.isEmpty) {
        res = await FirebaseFirestore.instance
            .collection("widgets")
            .doc(widget.widgetId)
            .get()
            .then((value) => value.data());
        setState(() {
          videoData = res;
        });
      } else {
        var newList = Provider.of<HomeData>(context, listen: false)
            .homeListData
            .where((e) => e['id'] == widget.widgetId)
            .toList();
        res = newList[0]['data'];
        setState(() {
          videoData = newList[0]['data'];
        });
      }

      final videoId = YoutubePlayer.convertUrlToId(videoUrl + res?['videoID']);
      _youtubePlayerController = YoutubePlayerController(
          initialVideoId: videoId.toString(),
          flags: const YoutubePlayerFlags(
            hideControls: false,
            autoPlay: false,
            mute: false,
          ));
      setState(() {
        isReady = true;

        // title = _youtubePlayerController.metadata.title;
      });
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    // fetchData();
    super.initState();
  }

  @override
  void dispose() {
    _youtubePlayerController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (videoData == null || !isReady) {
      return const SizedBox();
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 15),
      width: double.infinity,
      margin: const EdgeInsets.only(bottom: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            widget.title,
            style: const TextStyle(fontSize: 19, fontWeight: FontWeight.bold),
          ),
          Html(data: videoData['description']),
          YoutubePlayer(
            controller: _youtubePlayerController,
            showVideoProgressIndicator: true,
            progressColors: ProgressBarColors(
              playedColor: AppTheme().secondaryColor,
              handleColor: AppTheme().secondaryColor,
              backgroundColor: const Color.fromARGB(255, 96, 111, 80),
            ),
          ),
          // Image.network(videoData['coverImage']['mob']),
        ],
      ),
    );
  }
}
