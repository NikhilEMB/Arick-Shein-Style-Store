import 'dart:async';
import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import 'package:shein/providers/userProvider.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/utils/dynamicLink.dart';
import 'package:shein/widgets/homeWidgets/accountScreenHeader.dart';
import 'package:shein/widgets/loadingModal.dart';
import 'package:provider/provider.dart';


class MyProfile extends StatefulWidget {
  final String? uid;
  const MyProfile({super.key, required this.uid});

  @override
  State<MyProfile> createState() => _MyProfileState();
}

class _MyProfileState extends State<MyProfile> {
  final FirebaseStorage _storage = FirebaseStorage.instance;
  String image = '';
  String date = '';
  DateTime? pickedDate;
  dynamic data;
  final picker = ImagePicker();
  XFile? myImage;
  final TextEditingController _phoneContoller = TextEditingController();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _dateController = TextEditingController();

  @override
  void initState() {
    super.initState();
    getUserData();
    Timer(const Duration(milliseconds: 100), () {
      DynamicLinkProvider().initDynamicLink(context: context);
    });
  }

  Future<void> pickImage(type) async {
    if (type == 'camera') {
      final pickedFile = await picker.pickImage(source: ImageSource.camera);
      if (pickedFile != null) {
        setState(() {
          myImage = pickedFile;
          print(myImage!.path);
        });
      }
    } else {
      final pickedFile = await picker.pickImage(source: ImageSource.gallery);
      if (pickedFile != null) {
        setState(() {
          myImage = pickedFile;
          print(myImage!.path);
        });
      }
    }
  }

  getUserData() async {
    data = await Provider.of<Auth>(context, listen: false).fetchUser('');

    print("DATAAAAAA $data");
    setState(() {
      _phoneContoller.text = data.containsKey('phoneNo') ? data['phoneNo'] : '';
      image = data.containsKey('dP') ? data['dP'] : '';
      // pickedDate = DateTime.parse(data['birthday']);
      date = data.containsKey('birthday') ? data['birthday'] : '';
      print('Image is : $image');
      _nameController.text = data.containsKey('name') ? data['name'] : '';
      _emailController.text = data.containsKey('email') ? data['email'] : '';
      if (data['birthday'] == '' || !data.containsKey('birthday')) {
        _dateController.text = '';
      } else {
        print('Condition is true');
        DateFormat date = DateFormat('dd MMMM yyyy');
        setState(() {
          String inputDate =
              data.containsKey('birthday') ? data['birthday'] : '';
          DateTime dateTime = DateTime.parse(inputDate);
          print('DateTime is : $dateTime');
          _dateController.text = date.format(dateTime);
        });
      }
    });
    // print(data['birthday']);
  }

  Future getDownloadUrl({image, uid}) async {
    if (myImage == null) {
      return;
    }
    showDialog(context: context, builder: (context) => loader(context));
    try {
      final Reference storageReference = _storage.ref().child(
          'profile/${FirebaseAuth.instance.currentUser?.uid}/images/${(myImage!.name + DateTime.now().toIso8601String()).toString()}');
      await storageReference.putFile(File(myImage!.path));
      final String downloadURL = await storageReference.getDownloadURL();
      print(downloadURL);
      await FirebaseFirestore.instance
          .collection('users')
          .doc(FirebaseAuth.instance.currentUser?.uid)
          .set({'dP': downloadURL}, SetOptions(merge: true)).whenComplete(() {
        Fluttertoast.showToast(msg: 'Image Uploaded Successfully...');
      });
      await Provider.of<Auth>(context, listen: false).fetchUser('userId');
      Navigator.pop(context);
      // return downloadURL;
    } catch (e) {
      // Navigator.pop(context);
      return "";
    }
  }

  convertDate() {
    DateFormat date = DateFormat('dd MMMM yyyy');
    setState(() {
      String inputDate = data.containsKey('birthday') ? data['birthday'] : '';
      DateTime dateTime = DateTime.parse(inputDate);
      _dateController.text = date.format(dateTime);
    });
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        body: SingleChildScrollView(
          child: Column(
            children: [
              AccountScreenHeader(
                size: size,
                title: "Profile Information",
                isBackButton: true,
              ),
              Provider.of<Auth>(context).userData == null
                  ? SizedBox(
                      child: CircularProgressIndicator(
                        color: AppTheme().secondaryColor,
                      ),
                    )
                  : Consumer<Auth>(
                      builder: (context, value, child) {
                        return Container(
                          padding: const EdgeInsets.only(bottom: 20),
                          // height: size.width * 0.,
                          color: AppTheme().themeColor.withOpacity(0.4),
                          child: Column(
                            children: [
                              const SizedBox(
                                height: 20,
                              ),
                              const Padding(
                                padding:
                                    EdgeInsets.symmetric(horizontal: 8.0),
                                child: SizedBox(
                                  // width: size.width * 0.4,
                                  child: Stack(children: [
                                    // Positioned(
                                    //   left: 0,
                                    //   top: -5,
                                    //   child: InkWell(
                                    //       onTap: () {
                                    //         Navigator.pop(context);
                                    //         // Navigator.popAndPushNamed(context, '/profile');
                                    //       },
                                    //       child: const Icon(
                                    //         Icons.arrow_back,
                                    //         color: Colors.white,
                                    //       )),
                                    // ),
                                    Row(
                                      children: [
                                        Expanded(
                                          child: Center(
                                              child: SizedBox(
                                                  child: Text(
                                            'PROFILE',
                                            style:
                                                TextStyle(color: Colors.white),
                                          ))),
                                        ),
                                      ],
                                    ),
                                  ]),
                                ),
                              ),
                              const SizedBox(
                                height: 10,
                              ),
                              InkWell(
                                onTap: () {
                                  // pickImage();
                                  showModalBottomSheet(
                                      context: context,
                                      builder: (context) => Column(
                                            mainAxisSize: MainAxisSize.min,
                                            children: [
                                              ListTile(
                                                onTap: () {
                                                  Navigator.pop(context);
                                                  pickImage('camera')
                                                      .whenComplete(() {
                                                    // showDialog(
                                                    //     context: context,
                                                    //     builder: (context) =>
                                                    //         loader(context));
                                                    getDownloadUrl();
                                                  });
                                                },
                                                leading: const Icon(
                                                    Icons.camera_alt),
                                                title: const Text('Camera'),
                                              ),
                                              ListTile(
                                                onTap: () {
                                                  Navigator.pop(context);

                                                  pickImage('gallery')
                                                      .whenComplete(() {
                                                    getDownloadUrl();
                                                  });
                                                },
                                                leading: const Icon(Icons
                                                    .insert_photo_outlined),
                                                title: const Text('Gallery'),
                                              ),
                                              ListTile(
                                                onTap: () async {
                                                  showDialog(
                                                      context: context,
                                                      builder: (context) =>
                                                          loader(context));
                                                  await FirebaseFirestore
                                                      .instance
                                                      .collection('users')
                                                      .doc(FirebaseAuth.instance
                                                          .currentUser?.uid)
                                                      .set({
                                                    "dP":
                                                        "assets/img/user-pic.gif"
                                                  }, SetOptions(merge: true));

                                                  // Navigator.pop(context);

                                                  //                 .whenComplete(
                                                  //         () {

                                                  await Provider.of<Auth>(
                                                          context,
                                                          listen: false)
                                                      .fetchUser('uid');
                                                  Fluttertoast.showToast(
                                                      msg:
                                                          'Photo deleted successfully...');
                                                  setState(() {});
                                                  myImage = null;
                                                  Navigator.pop(context);
                                                  Navigator.pop(context);
                                                },
                                                leading:
                                                    const Icon(Icons.delete),
                                                title: const Text('Delete'),
                                              ),
                                              ListTile(
                                                onTap: () {
                                                  Navigator.pop(context);
                                                },
                                                leading:
                                                    const Icon(Icons.close),
                                                title: const Text('Cancel'),
                                              ),
                                            ],
                                          ));
                                },
                                child: Stack(
                                  children: [
                                    Container(
                                      height: 100,
                                      width: 100,
                                      decoration: BoxDecoration(
                                        shape: BoxShape.circle,
                                        image: DecorationImage(
                                            fit: BoxFit.cover,
                                            image: myImage != null
                                                ? FileImage(File(myImage!.path))
                                                    as ImageProvider
                                                : Provider.of<Auth>(context)
                                                            .userData['dP'] ==
                                                        "assets/img/user-pic.gif"
                                                    ? const NetworkImage(
                                                        'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg')
                                                    : Provider.of<Auth>(context)
                                                                    .userData[
                                                                'dP'] !=
                                                            'assets/img/user-pic.gif'
                                                        ? NetworkImage(
                                                            Provider.of<Auth>(
                                                                    context)
                                                                .userData['dP'])
                                                        : const NetworkImage(
                                                            'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg')
                                            // : image == 'assets/img/user-pic.gif'
                                            //     ? NetworkImage(
                                            //         'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg')
                                            //     : image == null
                                            //         ? NetworkImage(
                                            //             'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg')
                                            //         : NetworkImage(
                                            //             'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'),
                                            ),
                                      ),
                                    ),
                                    Positioned(
                                      top: 70,
                                      left: 60,
                                      child: Container(
                                          height: 30,
                                          width: 30,
                                          decoration: const BoxDecoration(
                                              color: Colors.white,
                                              shape: BoxShape.circle),
                                          child: Center(
                                              child: Icon(
                                            Icons.edit,
                                            color: AppTheme().secondaryColor,
                                          ))),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(
                                height: 20,
                              ),
                              Text(
                                '${value.userData['name']}',
                                style: const TextStyle(color: Colors.white),
                              )
                            ],
                          ),
                        );
                      },
                    ),
              const SizedBox(height: 20),
              textFormField('Phone Number', _phoneContoller, enabled: false),
              textFormField(
                'Name',
                _nameController,
              ),
              textFormField(
                'Email Id',
                _emailController,
              ),
              InkWell(
                onTap: () async {
                  pickedDate = await showDatePicker(
                      context: context,
                      initialDate: DateTime.now(),
                      firstDate: DateTime(1950),
                      //DateTime.now() - not to allow to choose before today.
                      lastDate: DateTime.now());

                  if (pickedDate != null) {
                    //pickedDate output format => 2021-03-10 00:00:00.000
                    String formattedDate =
                        DateFormat('yyyy-MM-dd').format(pickedDate!);
                    //formatted date output using intl package =>  2021-03-16
                    setState(() {
                      _dateController.text =
                          formattedDate; //set output date to TextField value.
                    });
                    date = Timestamp.fromDate(pickedDate!).toDate().toString();
                    print(Timestamp.fromDate(pickedDate!).toDate());
                  } else {}
                },
                child: textFormField('Birth Date', _dateController,
                    enabled: false),
              ),
              deleteUpdateButton(),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }

  Widget textFormField(
      String title, TextEditingController textEditingController,
      {bool? enabled}) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(left: 8.0, bottom: 4.0),
            child: Text(
              title,
              style: AppTheme().outfitStyle(
                  fontWeight: FontWeight.w400,
                  fontSize: 15,
                  color: const Color(0xff555555)),
            ),
          ),
          Container(
            height: 50,
            decoration: BoxDecoration(
              border: Border.all(color: const Color(0xffEBEDF1)),
              borderRadius: BorderRadius.circular(0),
              color: Colors.white,
              // boxShadow: [
              //   BoxShadow(
              //     color: Colors.blue.shade100,
              //     blurRadius: 15.0,
              //     spreadRadius: 5.0,
              //     offset: const Offset(5.0, 5.0),
              //   ),
              // ],
            ),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8.0),
              child: TextFormField(
                enabled: enabled,
                controller: textEditingController,
                decoration: const InputDecoration(
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.symmetric(horizontal: 8.0),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget deleteUpdateButton() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        // ElevatedButton(
        //     style: ElevatedButton.styleFrom(
        //         backgroundColor: Colors.black,
        //         shape: RoundedRectangleBorder(
        //             borderRadius: BorderRadius.circular(20))),
        //     onPressed: () {
        //       showDialog(
        //           context: context, builder: (context) => loader(context));
        //       FirebaseFirestore.instance
        //           .collection('block')
        //           .doc('${widget.uid}')
        //           .set({'deleteData': true}, SetOptions(merge: true)).then(
        //               (value) async {
        //         SharedPreferences _prefs =
        //             await SharedPreferences.getInstance();
        //         setState(() {
        //           _prefs.clear();
        //           FirebaseAuth.instance.signOut();
        //           Navigator.of(context)
        //               .pushNamedAndRemoveUntil('/home', (route) => false);
        //         });
        //       });
        //     },
        //     child: Wrap(
        //       crossAxisAlignment: WrapCrossAlignment.center,
        //       children: [
        //         const Text('Delete'),
        //         const SizedBox(width: 4),
        //         const Icon(Icons.delete),
        //       ],
        //     )),
        ElevatedButton(
            style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme().mainColor,
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(0))),
            onPressed: () {
              FirebaseFirestore.instance
                  .collection('users')
                  .doc(widget.uid)
                  .set({
                'name': _nameController.text,
                'phoneNo': _phoneContoller.text,
                'email': _emailController.text,
                'birthday': date,
              }, SetOptions(merge: true)).whenComplete(() async {
                await Provider.of<Auth>(context, listen: false)
                    .fetchUser('userId');
                Fluttertoast.showToast(msg: 'Profile Updated Successfully...');
              }).catchError((e) {
                Fluttertoast.showToast(msg: '$e');
              });
            },
            child: const Padding(
              padding: EdgeInsets.fromLTRB(16, 0, 16, 0),
              child: Wrap(
                crossAxisAlignment: WrapCrossAlignment.center,
                children: [
                  Text('Save Changes' , style: TextStyle(color: Colors.white),),
                  // SizedBox(width: 4),
                  // Icon(Icons.check_circle),
                ],
              ),
            )),
      ],
    );
  }
}
