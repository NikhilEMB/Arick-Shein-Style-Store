import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:intl/intl.dart';
import 'package:shein/providers/userProvider.dart';
import 'package:shein/theme/AppIcons.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/customNavBar.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  TextEditingController controller = TextEditingController();

  handleSendMessage({type = "txt"}) async {
    if (controller.text.isEmpty) {
      return "";
    }

    String controllerText = controller.text;
    controller.text = '';
    if (Provider.of<Auth>(context, listen: false).userData == null) {
      await Provider.of<Auth>(context, listen: false).fetchUser('userId');
    }
    final prefs = await SharedPreferences.getInstance();
    var data = {
      'author': "user",
      "isRead": true,
      "message": "",
      "published": true,
      "title": "",
      'type': type
    };
    if (type == 'txt') {
      data['message'] = controllerText;
    }
    String userPhoneNo = prefs.get('phoneNumber').toString();
    var db = FirebaseFirestore.instance;
    DocumentReference userChat =
        db.collection('chats').doc(FirebaseAuth.instance.currentUser?.uid);

    await userChat.collection('messages').add(
      {
        ...data,
        "createdAt": DateTime.now(),
      },
    );

    userChat.set({
      'userPhoneNo': userPhoneNo,
      "lastMessage": controllerText,
      "lastMessageAt": DateTime.now(),
      "name": Provider.of<Auth>(context, listen: false).userData['name'] ?? ""
    }, SetOptions(merge: true));

    // print(prefs.get('phoneNumber'));
  }

  String formatTime(DateTime time) {
    final now = DateTime.now();
    final difference = now.difference(time);

    if (difference.inSeconds < 60) {
      return 'just now';
    } else if (difference.inMinutes < 60) {
      return '${difference.inMinutes} mins ago';
    } else if (difference.inHours < 24) {
      return '${difference.inHours} hours ago';
    } else if (difference.inDays < 7) {
      return '${difference.inDays} days ago';
    } else {
      final formatter = DateFormat('dd/MM/yyyy');
      return formatter.format(time);
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    if (Provider.of<Auth>(context, listen: false).userData == null) {
      Provider.of<Auth>(context, listen: false).fetchUser('userId');
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    print(FirebaseAuth.instance.currentUser?.uid);
    return SafeArea(
        child: Scaffold(
      body: SizedBox(
        child: Column(
          children: [
            ChatHeader(size: size, context: context),
            Expanded(
              child: StreamBuilder(
                stream: FirebaseFirestore.instance
                    .collection('chats')
                    .doc('${FirebaseAuth.instance.currentUser?.uid}')
                    .collection("messages")
                    .orderBy('createdAt', descending: true)
                    .snapshots(),
                builder: (context, snapshot) {
                  if (snapshot.hasData && snapshot.data!.docs.isNotEmpty) {
                    var messages = snapshot.data!.docs;
                    return Container(
                      width: double.infinity,
                      padding:
                          const EdgeInsets.only(left: 5, right: 5, bottom: 5),
                      child: ListView.builder(
                          reverse: true,
                          itemCount: messages.length,
                          itemBuilder: (context, index) {
                            final message = messages[index].data();
                            if (message['author'] == "admin") {
                              return renderAdminMessage(message);
                            }
                            return renderUserMessage(message);
                          }),
                    );
                  }
                  return const SizedBox();
                },
              ),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                decoration: const BoxDecoration(
                    border: Border(
                      top: BorderSide(
                          color: Color.fromARGB(255, 202, 200, 200), width: 1),
                    ),
                    color: Colors.white,
                    boxShadow: [
                      BoxShadow(
                          color: Color.fromARGB(255, 209, 208, 208),
                          offset: Offset(0, -0),
                          blurRadius: 4,
                          spreadRadius: 1)
                    ]),
                width: double.infinity,
                height: size.width * 0.2,
                child: Row(
                  children: [
                    const SizedBox(width: 10),
                    Expanded(
                        child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(100),
                        border: Border.all(
                            color: const Color.fromARGB(255, 206, 206, 206)),
                      ),
                      height: 40,
                      child: TextFormField(
                        controller: controller,
                        cursorColor: Colors.black,
                        cursorWidth: 1,
                        decoration: const InputDecoration(
                          border: InputBorder.none,
                          hintText: "Type a message",
                          contentPadding: EdgeInsets.only(
                            left: 10,
                            right: 10,
                            bottom: 10,
                          ),
                        ),
                      ),
                    )),
                    InkWell(
                      onTap: handleSendMessage,
                      child: Container(
                          padding: const EdgeInsets.only(
                              right: 7, left: 10, top: 5, bottom: 5),
                          child: Icon(
                            Icons.send,
                            size: 30,
                            color: AppTheme().secondaryColor,
                          )),
                    )
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    ));
  }

  Padding renderAdminMessage(Map<String, dynamic> message) {
    return Padding(
      padding: const EdgeInsets.only(top: 15.0),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            padding: const EdgeInsets.symmetric(vertical: 1),
            decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(100),
                border:
                    Border.all(color: const Color.fromARGB(255, 214, 214, 214)),
                boxShadow: const [
                  BoxShadow(
                    color: Color.fromARGB(255, 214, 214, 214),
                    blurRadius: 2,
                    spreadRadius: 0,
                    offset: Offset(0, 0),
                  )
                ]),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(100),
              child: Image.asset('assets/images/appIcon.png'),
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
              child: Container(
            padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
            decoration: BoxDecoration(
                color: const Color.fromARGB(255, 241, 242, 248),
                borderRadius: const BorderRadius.only(
                  bottomLeft: Radius.circular(10),
                  bottomRight: Radius.circular(10),
                  topRight: Radius.circular(10),
                ),
                boxShadow: const [
                  BoxShadow(
                      color: Color.fromARGB(255, 221, 226, 253),
                      spreadRadius: 0,
                      blurRadius: 2,
                      offset: Offset(0, 0))
                ],
                border: Border.all(
                    width: 1.2,
                    color: const Color.fromARGB(255, 186, 193, 233))),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  message['type'] == "order"
                      ? "Your order with order id: ${message['orderId'].toString()} is ${message['status']}."
                      : message['message'].toString(),
                  style: const TextStyle(fontWeight: FontWeight.w600),
                ),
                const SizedBox(
                  height: 5,
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 10.0),
                  child: Text(
                    formatTime(message['createdAt'].toDate()).toString(),
                    style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.grey,
                        fontSize: 10),
                  ),
                )
              ],
            ),
          ))
        ],
      ),
    );
  }

  Padding renderUserMessage(Map<String, dynamic> message) {
    return Padding(
      padding: const EdgeInsets.only(top: 15.0),
      child: Row(
        children: [
          Expanded(
              child: Container(
            padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
            decoration: BoxDecoration(
              borderRadius: const BorderRadius.only(
                bottomLeft: Radius.circular(10),
                bottomRight: Radius.circular(10),
                topLeft: Radius.circular(10),
              ),
              border: Border.all(width: 1.2, color: AppTheme().secondaryColor),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  message['type'] == "order"
                      ? "New order placed with order id: ${message['orderId'].toString()}."
                      : message['message'].toString(),
                  style: const TextStyle(fontWeight: FontWeight.w600),
                ),
                const SizedBox(
                  height: 5,
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 10.0),
                  child: Text(
                    formatTime(message['createdAt'].toDate()).toString(),
                    style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.grey,
                        fontSize: 10),
                  ),
                )
              ],
            ),
          )),
          const SizedBox(width: 10),
          Container(
            width: 40,
            height: 40,
            padding: const EdgeInsets.symmetric(vertical: 1),
            decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(100),
                border:
                    Border.all(color: const Color.fromARGB(255, 214, 214, 214)),
                boxShadow: const [
                  BoxShadow(
                    color: Color.fromARGB(255, 214, 214, 214),
                    blurRadius: 2,
                    spreadRadius: 0,
                    offset: Offset(0, 0),
                  )
                ]),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(100),
              child: const Icon(
                Icons.person,
                color: Colors.grey,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

Widget ChatHeader({size, context}) {
  return Container(
    height: size.height * 0.07,
    decoration: const BoxDecoration(
      gradient: LinearGradient(
        stops: [0.2, 1],
        tileMode: TileMode.clamp,
        colors: [
          Color.fromARGB(255, 72, 72, 72),
          Color.fromARGB(255, 17, 17, 17),
        ],
        begin: Alignment.centerLeft,
        end: Alignment.topCenter,
      ),
    ),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Container(
          // width: size.width * 0.14,
          decoration: BoxDecoration(
              color: AppTheme().secondaryColor,
              borderRadius: const BorderRadius.only(
                  topRight: Radius.circular(100),
                  bottomRight: Radius.circular(100))),
          child: IconButton(
            onPressed: () {
              if (Navigator.canPop(context)) {
                Navigator.pop(context);
              } else {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const CustomNavBar(pageNum: 1),
                  ),
                );
              }
            },
            icon: const Icon(
              Icons.arrow_back,
              color: Colors.white,
            ),
          ),
        ),
        Expanded(
          child: SizedBox(
            width: size.width * 0.7,
            child: const Center(
              child: Text(
                "Chat",
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
        ),
        SizedBox(
          child: IconButton(
            onPressed: () async {
              final Uri url = Uri(
                scheme: 'tel',
                path: "+919611951039",
              );

              if (await canLaunchUrl(url)) {
                await launchUrl(url);
              } else {
                Fluttertoast.showToast(msg: 'Cannot make a call right now.');
              }
            },
            icon: const Icon(
              AppIcons.phone_call,
              color: Colors.white,
            ),
          ),
        )
      ],
    ),
  );
}
