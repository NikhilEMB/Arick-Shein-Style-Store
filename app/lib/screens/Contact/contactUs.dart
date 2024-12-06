import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:maps_launcher/maps_launcher.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/screenHeader.dart';
import 'package:url_launcher/url_launcher.dart';

class ContactUs extends StatefulWidget {
  const ContactUs({super.key});

  @override
  State<ContactUs> createState() => _ContactUsState();
}

class _ContactUsState extends State<ContactUs> {
  Map<String, dynamic> model = <String, dynamic>{};
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _phoneNoConroller = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _detailsController = TextEditingController();
  bool isDisabled = true;
  DocumentSnapshot<Map<String, dynamic>>? data;
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    getAddresses();
    super.initState();
  }

  getAddresses() async {
    await FirebaseFirestore.instance
        .collection('settings')
        .doc('contactUs')
        .get()
        .then((value) => setState(() => data = value));
    print(data!['address'][0]);
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ScreenHeader(size: size, title: "Contact Us", isBackButton: true),
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.all(24.0),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Write Us',
                          style:
                              Theme.of(context).textTheme.headlineSmall!.merge(
                                    const TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                        ),
                        const SizedBox(height: 20),
                        RichText(
                          text: const TextSpan(
                              text:
                                  'Please Fill out the form below and someone will get in touch with you shortly',
                              style: TextStyle(color: Colors.black),
                              children: [
                                TextSpan(text: '('),
                                TextSpan(
                                    text: '*',
                                    style: TextStyle(color: Colors.red)),
                                TextSpan(text: 'required'),
                                TextSpan(text: ')'),
                              ]),
                        ),
                        const SizedBox(height: 20),
                        _textformField(_nameController, 'Full Name',
                            'Please Enter Full Name', validator: (value) {
                          if (value!.isEmpty) {
                            return 'please fill name properly';
                          } else {
                            return null;
                          }
                        }),
                        const SizedBox(height: 20),
                        _textformField(_phoneNoConroller, 'Phone No',
                            'Please Enter Phone No', validator: (value) {
                          if (value!.isEmpty) {
                            return 'please fill number properly';
                          } else {
                            return null;
                          }
                        }),
                        const SizedBox(height: 20),
                        _textformField(
                            _emailController, 'Email', 'Please Enter Email',
                            validator: (value) {
                          if (value!.isEmpty) {
                            return 'please fill email properly';
                          } else {
                            return null;
                          }
                        }),
                        const SizedBox(height: 20),
                        _textformField(_detailsController, 'Details',
                            'Please Enter Details', validator: (value) {
                          if (value!.isEmpty) {
                            return 'please fill details properly';
                          } else {
                            return null;
                          }
                        }, maxLines: 2),
                        const SizedBox(height: 20),
                        Align(
                          alignment: Alignment.bottomCenter,
                          child: InkWell(
                              onTap: () {
                                if (_formKey.currentState!.validate()) {
                                  model['reason'] = _detailsController.text;
                                  model['email'] = _emailController.text;
                                  model['phoneNo'] = _phoneNoConroller.text;
                                  model['name'] = _nameController.text;
                                  model['createdAt'] =
                                      FieldValue.serverTimestamp();
                                  FirebaseFirestore.instance
                                      .collection('contactUs')
                                      .add(model)
                                      .whenComplete(() {
                                    Fluttertoast.showToast(
                                        msg:
                                            'Request submitted successfully contact you ASAP');
                                    _detailsController.clear();
                                    _emailController.clear();
                                    _nameController.clear();
                                    _phoneNoConroller.clear();
                                    model.clear();
                                  });
                                }
                              },
                              child: Container(
                                padding:
                                    const EdgeInsets.symmetric(vertical: 12),
                                decoration: BoxDecoration(
                                  color:
                                      //  isDisabled
                                      //     ? const Color.fromARGB(255, 164, 202, 123)
                                      //     :
                                      AppTheme().secondaryColor,
                                  boxShadow: const [
                                    BoxShadow(
                                      color: Color.fromARGB(255, 179, 179, 179),
                                      blurRadius: 3,
                                      blurStyle: BlurStyle.outer,
                                      spreadRadius: 0,
                                    ),
                                  ],
                                ),
                                width: double.infinity,
                                child: const Center(
                                  child: Text(
                                    'Submit',
                                    style: TextStyle(
                                        color: Colors.white,
                                        fontWeight: FontWeight.w500),
                                  ),
                                ),
                              )),
                        ),
                        const SizedBox(height: 20),
                        Text(
                          'Write Us',
                          style:
                              Theme.of(context).textTheme.headlineSmall!.merge(
                                    const TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                        ),
                        const SizedBox(height: 15),
                        Text(
                          'Address',
                          style:
                              Theme.of(context).textTheme.headlineSmall!.merge(
                                    const TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 18),
                                  ),
                        ),
                        data == null
                            ? const SizedBox()
                            : Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: data!['address'].map<Widget>((e) {
                                  return Column(
                                    children: [
                                      ListTile(
                                        onTap: () {
                                          MapsLauncher.launchQuery(
                                              e['address']);
                                        },
                                        leading: const CircleAvatar(
                                          backgroundColor: Colors.purple,
                                          child: Icon(
                                            Icons.location_on,
                                            size: 15,
                                            color: Colors.white,
                                          ),
                                        ),
                                        title: Text('${e['address']}'),
                                      ),
                                      ListTile(
                                        onTap: () async {
                                          final Uri url = Uri(
                                            scheme: 'tel',
                                            path: '+91${e['phoneNo']}',
                                          );

                                          if (await canLaunchUrl(url)) {
                                            await launchUrl(url);
                                          } else {
                                            Fluttertoast.showToast(
                                                msg:
                                                    'Cannot make a call right now.');
                                          }
                                        },
                                        leading: const CircleAvatar(
                                          backgroundColor: Colors.green,
                                          child: Icon(
                                            Icons.phone,
                                            color: Colors.white,
                                            size: 15,
                                          ),
                                        ),
                                        title: Text('${e['phoneNo']}'),
                                      ),
                                      ListTile(
                                        onTap: () async {
                                          final Uri emailLaunchUri = Uri(
                                              scheme: 'mailto',
                                              path: e['email']);

                                          await launchUrl(emailLaunchUri);
                                        },
                                        leading: const CircleAvatar(
                                          backgroundColor: Colors.orange,
                                          child: Icon(
                                            Icons.mail,
                                            size: 15,
                                            color: Colors.white,
                                          ),
                                        ),
                                        title: Text('${e['email']}'),
                                      ),
                                    ],
                                  );
                                }).toList(),
                              ),
                      ],
                    ),
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget _textformField(TextEditingController textEditingController,
      String title, String subTitle,
      {int? maxLines, String? Function(String?)? validator}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          crossAxisAlignment: WrapCrossAlignment.center,
          children: [
            Text(title),
            const Text(
              '*',
              style: TextStyle(color: Colors.red),
            ),
          ],
        ),
        const SizedBox(height: 8),
        TextFormField(
          enabled: true,
          controller: textEditingController,
          maxLines: maxLines,
          validator: validator,
          decoration: InputDecoration(
            hintText: subTitle,
            border: OutlineInputBorder(
              borderSide: const BorderSide(color: Colors.black26),
              borderRadius: BorderRadius.circular(10),
            ),
            enabledBorder: OutlineInputBorder(
              borderSide: const BorderSide(color: Colors.black26),
              borderRadius: BorderRadius.circular(10),
            ),
            focusedBorder: OutlineInputBorder(
              borderSide: const BorderSide(color: Colors.black26),
              borderRadius: BorderRadius.circular(10),
            ),
          ),
        ),
      ],
    );
  }
}
