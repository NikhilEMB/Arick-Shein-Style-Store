// ignore_for_file: use_build_context_synchronously

import 'dart:async';
import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:image_picker/image_picker.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/loadingModal.dart';

class RateProduct extends StatefulWidget {
  final String productId;
  final dynamic productInfo;
  const RateProduct({super.key, required this.productId, this.productInfo});

  @override
  State<RateProduct> createState() => _RateProductState();
}

class _RateProductState extends State<RateProduct> {
  final FirebaseStorage _storage = FirebaseStorage.instance;

  double productRating = 3;
  final TextEditingController _controller = TextEditingController();
  TextEditingController nameController = TextEditingController();
  List<Map<String, dynamic>> selectedImages = [];

  Future<void> pickImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      setState(() {
        selectedImages.add({
          "file": File(pickedFile.path),
          "name": pickedFile.name.toString()
        });
      });
    }
  }

  getDownloadUrl({image, uid}) async {
    try {
      final Reference storageReference = _storage.ref().child(
          'productRatings/${widget.productId}/$uid/images/${(image['name'] + DateTime.now().toIso8601String()).toString()}');
      await storageReference.putFile(image['file']);
      final String downloadURL = await storageReference.getDownloadURL();

      Navigator.pop(context);
      return downloadURL;
    } catch (e) {
      // Navigator.pop(context);
      return "";
    }
  }

  handleSubmit() async {
    if (nameController.text.isEmpty) {
      return Fluttertoast.showToast(msg: "Enter name");
    }
    if (productRating == 0) {
      return Fluttertoast.showToast(msg: "Add Rating");
    }

    showDialog(
      barrierDismissible: false,
      context: context,
      builder: (context) => loader(context),
    );

    dynamic uid = FirebaseAuth.instance.currentUser?.uid;

    var alreadyRatedCheck = await FirebaseFirestore.instance
        .collection('products')
        .doc(widget.productId)
        .collection('ratings')
        .doc(uid)
        .get()
        .then((value) => value.data());

    if (alreadyRatedCheck != null) {
      Fluttertoast.showToast(msg: "You have already rated this product.");
      Navigator.pop(context);

      return;
    }

    List<String> imagesUrls = [];
    if (selectedImages.isNotEmpty) {
      for (var image in selectedImages) {
        String downloadURL = await getDownloadUrl(image: image, uid: uid);
        imagesUrls.add(downloadURL);
      }
    }

    var data = {
      "createdAt": DateTime.now(),
      'photos': imagesUrls,
      'rating': productRating,
      'review': _controller.text,
      "status": 'pending',
      "userName": nameController.text
    };

    await FirebaseFirestore.instance
        .collection('products')
        .doc(widget.productId)
        .collection('ratings')
        .doc(uid)
        .set(data, SetOptions(merge: true));

    Fluttertoast.showToast(msg: "Rating Submitted");

    Navigator.pop(context);
    Navigator.pop(context);
  }

  bool checkProductRating(docs) {
    var res = false;
    docs.forEach((element) {
      for (var data in element['products']) {
        if (data['productId'] == widget.productId) {
          res = true;
          return true;
        }
      }
    });

    return res;
  }

  checkIfProductBought() async {
    Timer(const Duration(milliseconds: 1), () async {
      showDialog(
        barrierDismissible: false,
        context: context,
        builder: (context) => loader(context),
      );
      var userId = FirebaseAuth.instance.currentUser?.uid;
      print(userId);
      var docs = await FirebaseFirestore.instance
          .collection('orders')
          .where('userId', isEqualTo: userId)
          .where('status', isEqualTo: "Delivered")
          .orderBy('createdAt', descending: true)
          .get()
          .then((value) {
        if (value.docs.isNotEmpty) {
          var arr = [];
          for (var element in value.docs) {
            var data = element.data();
            arr.add({...data, 'id': element.id});
          }
          return arr;
        } else {
          return [];
        }
      });
      var isEligibleForRating = true;

      if (docs.isEmpty) {
        print("EMPTY DOCS");
        isEligibleForRating = false;
      } else {
        print(widget.productId);
        var res = checkProductRating(docs);

        isEligibleForRating = res;
      }

      if (isEligibleForRating) {
        Navigator.pop(context);
      } else {
        Navigator.pop(context);
        Navigator.pop(context);
        await showDialog(
          context: context,
          barrierDismissible: false,
          builder: (context) => Dialog(
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 15),
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    const Text(
                      'Sorry! You are not allowed to review this product since you haven\'t bought this or order not yet delivered.',
                      style: TextStyle(fontWeight: FontWeight.w500),
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        InkWell(
                          onTap: () {
                            Navigator.pop(context);
                          },
                          child: Container(
                            padding: const EdgeInsets.only(
                                left: 20, right: 5, top: 5, bottom: 5),
                            child: Text(
                              'OK',
                              style: TextStyle(
                                  color: AppTheme().secondaryColor,
                                  fontWeight: FontWeight.bold),
                            ),
                          ),
                        )
                      ],
                    )
                  ],
                ),
              ),
            ),
          ),
        );
      }
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    checkIfProductBought();
  }

  @override
  Widget build(BuildContext context) {
    print(selectedImages);
    return SafeArea(
      child: Scaffold(
        body: Container(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                            vertical: 15, horizontal: 15),
                        decoration: const BoxDecoration(
                          boxShadow: [
                            BoxShadow(
                                color: Color.fromARGB(255, 225, 223, 223),
                                blurRadius: 2,
                                offset: Offset(0, 2),
                                spreadRadius: 2),
                          ],
                          color: Colors.white,
                        ),
                        child: Row(
                          children: [
                            const Expanded(
                              child: Text(
                                "RATE PRODUCT",
                                style: TextStyle(
                                    fontSize: 14, fontWeight: FontWeight.w800),
                              ),
                            ),
                            InkWell(
                              onTap: () {
                                Navigator.pop(context);
                              },
                              child: const SizedBox(
                                width: 70,
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.end,
                                  children: [
                                    Icon(Icons.close),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 15),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 15),
                        child: Row(
                          children: [
                            Container(
                              width: 100,
                              height: 100,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(100),
                              ),
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(100),
                                child: Image.network(
                                  widget.productInfo['images'][0]['mob'],
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ),
                            const SizedBox(width: 15),
                            Expanded(
                                child: Text(
                              widget.productInfo['prodName'],
                              style: const TextStyle(
                                  fontSize: 18, fontWeight: FontWeight.w600),
                            ))
                          ],
                        ),
                      ),
                      const SizedBox(height: 15),
                      const Divider(
                        color: Color.fromARGB(255, 230, 228, 228),
                        height: 1,
                        thickness: 1,
                      ),
                      const SizedBox(height: 15),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 15),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              "Rate product",
                              style: TextStyle(fontWeight: FontWeight.w900),
                            ),
                            const SizedBox(height: 10),
                            const Text(
                              "How did you find this product based on your usage?",
                              style: TextStyle(fontWeight: FontWeight.w600),
                            ),
                            const SizedBox(height: 10),
                            RatingBar.builder(
                              initialRating: 3,
                              minRating: 0,
                              direction: Axis.horizontal,
                              allowHalfRating: false,
                              itemCount: 5,
                              itemPadding:
                                  const EdgeInsets.symmetric(horizontal: 4.0),
                              itemBuilder: (context, _) => Icon(
                                Icons.star,
                                color: AppTheme().secondaryColor,
                              ),
                              onRatingUpdate: (rating) {
                                setState(() {
                                  productRating = rating;
                                });
                              },
                            )
                          ],
                        ),
                      ),
                      const SizedBox(height: 15),
                      const Divider(
                        color: Color.fromARGB(255, 230, 228, 228),
                        height: 1,
                        thickness: 1,
                      ),
                      const SizedBox(height: 15),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 15),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              "Add a written review",
                              style: TextStyle(fontWeight: FontWeight.w900),
                            ),
                            const SizedBox(height: 10),
                            const Text(
                              "What did you like or dislike about this product?",
                              style: TextStyle(fontWeight: FontWeight.w600),
                            ),
                            const SizedBox(height: 10),
                            Container(
                              height: 150, // Set the desired height here
                              decoration: BoxDecoration(
                                border: Border.all(
                                    color: const Color.fromARGB(255, 190, 190, 190)),
                                // borderRadius: BorderRadius.circular(8.0),
                              ),
                              child: TextFormField(
                                controller: _controller,
                                maxLines:
                                    null, // Allow the TextFormField to expand vertically
                                decoration: const InputDecoration(
                                  contentPadding: EdgeInsets.symmetric(
                                      vertical: 2, horizontal: 15),
                                  border: InputBorder.none,
                                  hintText: 'Please enter a detailed review',
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 15),
                      const Divider(
                        color: Color.fromARGB(255, 230, 228, 228),
                        height: 1,
                        thickness: 1,
                      ),
                      const SizedBox(height: 15),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 15),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              "Add a photo",
                              style: TextStyle(fontWeight: FontWeight.w900),
                            ),
                            const SizedBox(height: 10),
                            const Text(
                              "You can add upto 3 photos of the product.",
                              style: TextStyle(fontWeight: FontWeight.w600),
                            ),
                            const SizedBox(height: 10),
                            Container(
                              child: Row(
                                children: [
                                  ...(selectedImages.asMap().entries.map((e) {
                                    int index = e.key;
                                    dynamic value = e.value;
                                    return Stack(children: [
                                      Container(
                                        color:
                                            const Color.fromARGB(255, 235, 233, 233),
                                        margin: const EdgeInsets.only(right: 5),
                                        width: 100,
                                        height: 100,
                                        child: Image.file(value['file']),
                                      ),
                                      Positioned(
                                          right: 3,
                                          child: InkWell(
                                            onTap: () {
                                              selectedImages.removeAt(index);
                                              setState(() {});
                                            },
                                            child: const Icon(
                                              Icons.close,
                                              size: 20,
                                            ),
                                          ))
                                    ]);
                                  }).toList())
                                ],
                              ),
                            ),
                            SizedBox(
                              height: selectedImages.isEmpty ? 0 : 15,
                            ),
                            Container(
                                child: Center(
                              child: Container(
                                color: const Color.fromARGB(255, 231, 229, 229),
                                child: IconButton(
                                  onPressed: () => selectedImages.length < 3
                                      ? pickImage()
                                      : Fluttertoast.showToast(
                                          msg:
                                              'Cannot add more than 3 pictures'),
                                  icon: const Icon(Icons.add),
                                ),
                              ),
                            )),
                          ],
                        ),
                      ),
                      const SizedBox(height: 15),
                      const Divider(
                        color: Color.fromARGB(255, 230, 228, 228),
                        height: 1,
                        thickness: 1,
                      ),
                      const SizedBox(height: 15),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 15),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              "Public Name",
                              style: TextStyle(fontWeight: FontWeight.w900),
                            ),
                            const SizedBox(height: 10),
                            const Text(
                              "This will be displayed to other customers",
                              style: TextStyle(fontWeight: FontWeight.w600),
                            ),
                            const SizedBox(height: 10),
                            Container(
                              // Set the desired height here
                              decoration: BoxDecoration(
                                border: Border.all(
                                    color: const Color.fromARGB(255, 190, 190, 190)),
                                // borderRadius: BorderRadius.circular(8.0),
                              ),
                              child: TextFormField(
                                controller: nameController,
                                maxLines:
                                    null, // Allow the TextFormField to expand vertically
                                decoration: const InputDecoration(
                                  contentPadding: EdgeInsets.symmetric(
                                      vertical: 2, horizontal: 15),
                                  border: InputBorder.none,
                                  hintText: 'Name',
                                ),
                              ),
                            ),
                            const SizedBox(height: 20),
                            InkWell(
                              onTap: handleSubmit,
                              child: Container(
                                padding: const EdgeInsets.symmetric(vertical: 12),
                                width: double.infinity,
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(5),
                                    color: AppTheme().secondaryColor),
                                child: const Center(
                                    child: Text(
                                  'Submit',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white,
                                  ),
                                )),
                              ),
                            ),
                            const SizedBox(height: 15),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
