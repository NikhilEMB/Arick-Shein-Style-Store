import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:shein/screens/referEarn/referEarn.dart';
import 'package:video_player/video_player.dart';
import 'package:shein/theme/AppTheme.dart';

class InstagramFam extends StatefulWidget {
  final dynamic size;
  final int index;
  final bool isHome;

  const InstagramFam({
    Key? key,
    this.size,
    this.isHome = true,
    required this.index,
  }) : super(key: key);

  @override
  _InstagramFamState createState() => _InstagramFamState();
}

class _InstagramFamState extends State<InstagramFam> {
  late Future<List<dynamic>> _futureData;
  VideoPlayerController? _controller;
  int? _playingIndex;

  @override
  void initState() {
    super.initState();
    _futureData = fetchData();
  }

  Future<List<dynamic>> fetchData() async {
    final DocumentSnapshot snapshot = await FirebaseFirestore.instance
        .collection('platformMedia')
        .doc('instagram')
        .get();

    if (snapshot.exists) {
      return snapshot['list'];
    } else {
      return [];
    }
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
    return FutureBuilder<List<dynamic>>(
      future: _futureData,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const CircularProgressIndicator(); // Loading indicator while fetching data
        }

        if (snapshot.hasError) {
          return Text('Error: ${snapshot.error}');
        }

        final List<dynamic> list = snapshot.data ?? [];

        return Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(0.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    margin: const EdgeInsets.symmetric(vertical: 10),
                    height: 400,
                    decoration: const BoxDecoration(),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 16, vertical: 10),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Column(
                                children: [
                                  const SizedBox(
                                    height: 10,
                                  ),
                                  const Column(
                                    children: [
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.center,
                                        crossAxisAlignment: CrossAxisAlignment.center,
                                        children: [
                                          Text(
                                            'INSTAGRAM FAMILY',
                                            style: TextStyle(
                                                fontSize: 18,
                                                color: Colors.black,
                                                fontWeight: FontWeight.bold),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 10),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    crossAxisAlignment: CrossAxisAlignment.center,
                                    children: [
                                      const Text(
                                          'Tag us ',
                                          style: TextStyle(
                                              fontSize: 12,
                                              color: Colors.black,
                                              fontWeight: FontWeight.w500)),
                                      Text(
                                          '@sheinstylestores ',
                                          style: TextStyle(
                                              fontSize: 14,
                                              color: AppTheme().themeColor,
                                              fontWeight: FontWeight.w500)),
                                      const Text(
                                          'and use ',
                                          style: TextStyle(
                                              fontSize: 14,
                                              color: Colors.black,
                                              fontWeight: FontWeight.w500)),
                                    ],
                                  ),
                                  const SizedBox(
                                    height: 3,
                                  ),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    crossAxisAlignment: CrossAxisAlignment.center,
                                    children: [
                                      Text(
                                          '#sheinstylestores ',
                                          style: TextStyle(
                                              fontSize: 14,
                                              color: AppTheme().themeColor,
                                              fontWeight: FontWeight.w500)),
                                      const Text(
                                          'to get featured.',
                                          style: TextStyle(
                                              fontSize: 14,
                                              color: Colors.black,
                                              fontWeight: FontWeight.w500)),
                                    ],
                                  )
                                ],
                              ),
                            ],
                          ),
                        ),
                        Expanded(
                          child: ListView.builder(
                            scrollDirection: Axis.horizontal,
                            itemCount: list.length,
                            shrinkWrap: true,
                            itemBuilder: (context, productIndex) {
                              final product = list[productIndex];
                              final isPlaying = _playingIndex == productIndex;
            
                              return GestureDetector(
                                onTap: () {
                                  if (isPlaying) {
                                    _toggleVideoPlayback(productIndex);
                                  } else {
                                    _playVideo(product['link'], productIndex);
                                  }
                                },
                                child: Stack(
                                  alignment: Alignment.center,
                                  children: [
                                    
                                    Container(
                                      width: 160,
                                      height: 600,
                                      margin: const EdgeInsets.all(10),
                                      decoration: BoxDecoration(
                                        color: Colors.white,
                                        borderRadius: BorderRadius.circular(10),
                                        boxShadow: [
                                          BoxShadow(
                                            color: Colors.grey.withOpacity(0.5),
                                            spreadRadius: 2,
                                            blurRadius: 5,
                                            offset: const Offset(0, 3),
                                          ),
                                        ],
                                      ),
                                      child: ClipRRect(
                                        borderRadius: BorderRadius.circular(10),
                                        child: isPlaying
                                            ? _controller != null && _controller!.value.isInitialized
                                                ? AspectRatio(
                                                    aspectRatio: _controller!.value.aspectRatio,
                                                    child: VideoPlayer(_controller!),
                                                  )
                                                : const Center(child: CircularProgressIndicator())
                                            : Image.network(
                                                product['thumbnail'], // Use the thumbnail from Firestore
                                                width: double.infinity,
                                                fit: BoxFit.fitHeight,
                                              ),
                                      ),
                                    ),
                                    if (!isPlaying)
                                      const Icon(
                                        Icons.play_circle_outline,
                                        size: 60,
                                        color: Colors.white,
                                      ),
                                  ],
                                ),
                              );
                            },
                          ),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            const Text(
                                'Explore More on ',
                                style: TextStyle(
                                    fontSize: 15,
                                    color: Colors.black,
                                    fontWeight: FontWeight.bold)),
                            const SizedBox(
                              width: 5,
                            ),
                            Image.asset(
                              "assets/Icons/instagram.png",
                              width: 25,
                              height: 25,
                            ),
                            const SizedBox(
                              width: 8,
                            ),
                            const Text(
                                '@sheinstylestores ',
                                style: TextStyle(
                                    fontSize: 15,
                                    color: Colors.black,
                                    fontWeight: FontWeight.bold)),
                          ],
                        ),
                        const SizedBox(
                          height: 15,
                        )
                      ],
                    ),
                  ),
                ],
              ),
            ),

            GestureDetector(
              onTap: () {
                // navigate to refern and earn screen
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => ReferAndEarnScreen()),
                );
              },
              child: Image.asset(
                  'assets/images/referearn.png',
                  width: double.infinity,
                  height: 170,
                ),
            ),
          ],
        );
      },
    );
  }
}
