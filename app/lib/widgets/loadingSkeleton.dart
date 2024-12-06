import 'package:flutter/material.dart';
import 'package:skeletons/skeletons.dart';

Widget skeletonLoader(BuildContext context, title) {
  var size = MediaQuery.of(context).size;
  return Padding(
    padding: const EdgeInsets.only(left: 15, right: 15, bottom: 20),
    child: SizedBox(
      width: size.width,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(fontSize: 19, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 15),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              SizedBox(
                width: size.width * 0.45,
                // decoration: BoxDecoration(boxShadow: [
                //   BoxShadow(
                //     blurRadius: 1,
                //     color: Color.fromARGB(255, 226, 226, 226),
                //     offset: Offset(0, 0),
                //     spreadRadius: 1,
                //   )
                // ]),
                child: SkeletonItem(
                    child: Column(
                  children: [
                    const SkeletonLine(
                      style: SkeletonLineStyle(
                        height: 120,
                      ),
                    ),
                    const SizedBox(height: 5),
                    SkeletonParagraph(
                      style: SkeletonParagraphStyle(
                          lines: 3,
                          spacing: 6,
                          lineStyle: SkeletonLineStyle(
                            randomLength: true,
                            height: 10,
                            borderRadius: BorderRadius.circular(8),
                            minLength: MediaQuery.of(context).size.width / 6,
                            maxLength: MediaQuery.of(context).size.width / 3,
                          )),
                    ),
                  ],
                )),
              ),
              SizedBox(
                width: size.width * 0.45,
                // decoration: BoxDecoration(boxShadow: [
                //   BoxShadow(
                //     blurRadius: 1,
                //     color: Color.fromARGB(255, 226, 226, 226),
                //     offset: Offset(0, 0),
                //     spreadRadius: 1,
                //   )
                // ]),
                child: SkeletonItem(
                    child: Column(
                  children: [
                    const SkeletonLine(
                      style: SkeletonLineStyle(
                        height: 120,
                      ),
                    ),
                    const SizedBox(height: 5),
                    SkeletonParagraph(
                      style: SkeletonParagraphStyle(
                          lines: 3,
                          spacing: 6,
                          lineStyle: SkeletonLineStyle(
                            randomLength: true,
                            height: 10,
                            borderRadius: BorderRadius.circular(8),
                            minLength: MediaQuery.of(context).size.width / 6,
                            maxLength: MediaQuery.of(context).size.width / 3,
                          )),
                    ),
                  ],
                )),
              ),
            ],
          ),
        ],
      ),
    ),
  );
}
