import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:video_player/video_player.dart';
import 'package:shein/theme/AppTheme.dart';

class VideoProducts extends StatefulWidget {
  final dynamic size;
  final int index;
  final bool isHome;

  const VideoProducts({
    Key? key,
    this.size,
    this.isHome = true,
    required this.index,
  }) : super(key: key);

  @override
  _VideoProductsState createState() => _VideoProductsState();
}

class _VideoProductsState extends State<VideoProducts> {
  late Future<List<dynamic>> _futureData;
  VideoPlayerController? _controller;
  int? _playingIndex;

  @override
  void initState() {
    super.initState();
    _futureData = fetchData();
  }

  Future<List<dynamic>> fetchData() async {
    QuerySnapshot<Map<String, dynamic>> querySnapshot = await FirebaseFirestore
        .instance
        .collection('products')
        .where('video.active', isEqualTo: true)
        .where('status', isEqualTo: true)
        .get();

    return querySnapshot.docs.map((doc) => doc.data()).toList();
  }

  void _playVideo(String url, int index) {
    if (_controller != null) {
      _controller!.dispose();
    }

    _controller = VideoPlayerController.network(url)
      ..initialize().then((_) {
        setState(() {
          _playingIndex = index;
          _controller!.play();
        });
      });
  }

  void _toggleVideoPlayback(int index) {
    if (_controller != null && _controller!.value.isInitialized) {
      if (_controller!.value.isPlaying) {
        _controller!.pause();
        setState(() {
          _playingIndex = null;
        });
      } else {
        _controller!.play();
        setState(() {
          _playingIndex = index;
        });
      }
    }
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final dynamic size = MediaQuery.of(context).size;
    return FutureBuilder<List<dynamic>>(
      future: _futureData,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const CircularProgressIndicator();
        }

        if (snapshot.hasError) {
          return Text('Error: ${snapshot.error}');
        }

        final List<dynamic> products = snapshot.data ?? [];

        return Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 10),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'WATCH AND SHOP',
                      style: AppTheme().outfitStyle(
                          fontSize: 18, fontWeight: FontWeight.w700),
                    ),
                    TextButton(
                      onPressed: () {
                        // View All button action
                      },
                      child: Text(
                        'View All',
                        style: AppTheme().outfitStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w400,
                          color: AppTheme().themeColor,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(
                height: size.height * 0.32,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: products.length,
                  itemBuilder: (context, productIndex) {
                    final product = products[productIndex];
                    final videoData = product['video'];
                    final isPlaying = _playingIndex == productIndex;

                    return Stack(
                      children: [
                        GestureDetector(
                          onTap: () {
                            if (isPlaying) {
                              _toggleVideoPlayback(productIndex);
                            } else {
                              _playVideo(videoData['link'], productIndex);
                            }
                          },
                          child: Container(
                            width: 180,
                            height: size.height * 0.4,
                            margin: const EdgeInsets.only(right: 10, left: 10),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.all(Radius.circular(20)),
                            ),
                            child: ClipRRect(
                              borderRadius: BorderRadius.all(Radius.circular(20)),
                              child: isPlaying
                                  ? _controller != null && _controller!.value.isInitialized
                                      ? AspectRatio(
                                          aspectRatio: _controller!.value.aspectRatio,
                                          child: VideoPlayer(_controller!),
                                        )
                                      : const Center(child: CircularProgressIndicator())
                                  : Image.network(
                                      videoData['thumbnail'],
                                      width: double.infinity,
                                      fit: BoxFit.fill,
                                    ),
                            ),
                          ),
                        ),
                        if (!isPlaying)
                          Positioned(
                            bottom: 100,
                          right: 15,
                          left: 15,
                            child: const Icon(
                              Icons.play_circle_outline,
                              size: 60,
                              color: Colors.white,
                            ),
                          ),
                        Positioned(
                          bottom: 10,
                          right: 15,
                          left: 15,
                          child: Container(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(10),
                              color: Colors.white,
                              border: Border.all(
                                color: Colors.black,
                                width: 1,
                              ),
                            ),
                            width: 170,
                            padding: const EdgeInsets.all(0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Center(
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Container(
                                        height: 60,
                                        width: 60,
                                        decoration: BoxDecoration(
                                          color: Colors.black,
                                          borderRadius:
                                              BorderRadius.circular(20),
                                        ),
                                        child: ClipRRect(
                                          borderRadius: BorderRadius.all(Radius.circular(10)),
                                          child: Image.network(
                                            videoData['thumbnail'],
                                            fit: BoxFit.fill,
                                          ),
                                        ),
                                      ),
                                      Expanded(
                                        child: Padding(
                                          padding: const EdgeInsets.only(left: 3),
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              Text(
                                                product['prodName'],
                                                overflow: TextOverflow.ellipsis,
                                                maxLines: 2,
                                                style: AppTheme().outfitStyle(
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 9,
                                                ),
                                              ),
                                              Text(
                                                 "₹ " + product['prodPrice'].toString(),
                                                style: AppTheme().outfitStyle(
                                                  fontSize: 11,
                                                  color: Colors.green,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    );
                  },
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
