import 'package:shein/theme/AppTheme.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shein/screens/address/editAddress.dart';
import 'package:shein/widgets/screenHeader.dart';

class MyAddresses extends StatefulWidget {
  final String? uid;
  const MyAddresses({super.key, required this.uid});

  @override
  State<MyAddresses> createState() => _MyAddressesState();
}

class _MyAddressesState extends State<MyAddresses> {
  @override
  Widget build(BuildContext context) {
    final dynamic args = ModalRoute.of(context)!.settings.arguments;

    var size = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        body: Column(
          children: [
            ScreenHeader(
              size: size,
              title: "My Address",
              isBackButton: true,
            ),
            Expanded(
                child: Column(
              children: [
                InkWell(
                  onTap: () async {
                    if (args != null && args.containsKey('navigatePop')) {
                      Navigator.of(context).pushNamed('/newAddress',
                          arguments: {'navigatePop': args['navigatePop']});
                    } else {
                      Navigator.of(context).pushNamed('/newAddress');
                    }
                  },
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: AppBar(
                      backgroundColor: AppTheme().secondaryColor,
                      automaticallyImplyLeading: false,
                      title: Text(
                        '+ Add a new address',
                        style: Theme.of(context)
                            .textTheme
                            .labelLarge!
                            .merge(const TextStyle(color: Colors.white)),
                      ),
                    ),
                  ),
                ),
                Expanded(
                    child: SingleChildScrollView(
                        child: StreamBuilder(
                            stream: FirebaseFirestore.instance
                                .collection('users')
                                .doc(widget.uid)
                                .collection('addresses')
                                .snapshots(),
                            builder: (context, AsyncSnapshot snapshot) {
                              return !snapshot.hasData
                                  ? const Center(
                                      child: CircularProgressIndicator())
                                  : snapshot.data.docs.length == 0
                                      ? SizedBox(
                                          height: size.height * 0.5,
                                          child: const Center(
                                            child: Text(
                                                'No Addresses Available...'),
                                          ),
                                        )
                                      : Column(
                                          children: [
                                            const SizedBox(
                                              height: 20,
                                            ),
                                            Text(
                                              '${snapshot.data.docs.length} saved addresses',
                                            ),
                                            const SizedBox(
                                              height: 20,
                                            ),
                                            ListView.builder(
                                                physics:
                                                    const NeverScrollableScrollPhysics(),
                                                itemCount:
                                                    snapshot.data.docs.length,
                                                shrinkWrap: true,
                                                itemBuilder: (context, index) {
                                                  var data =
                                                      snapshot.data.docs[index];
                                                  return Padding(
                                                      padding:
                                                          const EdgeInsets.all(
                                                              12.0),
                                                      child: Container(
                                                          width:
                                                              double.infinity,
                                                          decoration: BoxDecoration(
                                                              borderRadius:
                                                                  BorderRadius
                                                                      .circular(
                                                                          0),
                                                              border: Border.all(
                                                                  color: Colors
                                                                      .black12)),
                                                          child: Padding(
                                                            padding:
                                                                const EdgeInsets
                                                                    .all(16.0),
                                                            child: Column(
                                                              crossAxisAlignment:
                                                                  CrossAxisAlignment
                                                                      .start,
                                                              children: [
                                                                const SizedBox(
                                                                  height: 20,
                                                                ),
                                                                Text(
                                                                  '${data['name']}',
                                                                  style: AppTheme()
                                                                      .outfitStyle(
                                                                          fontSize:
                                                                              15),
                                                                ),
                                                                const SizedBox(
                                                                  height: 20,
                                                                ),
                                                                Text(
                                                                    '${data['address']}'),
                                                                const SizedBox(
                                                                  height: 20,
                                                                ),
                                                                Text(
                                                                    '${data['phoneNo']}'),
                                                                const SizedBox(
                                                                  height: 20,
                                                                ),
                                                                Row(
                                                                  mainAxisAlignment:
                                                                      MainAxisAlignment
                                                                          .end,
                                                                  children: [
                                                                    TextButton(
                                                                        onPressed:
                                                                            () {
                                                                          Navigator.push(
                                                                              context,
                                                                              MaterialPageRoute(
                                                                                  builder: (context) => EditAddressScreen(
                                                                                        address: {
                                                                                          ...data.data(),
                                                                                          "id": data.id
                                                                                        },
                                                                                        isPop: true,
                                                                                      )));
                                                                        },
                                                                        child:
                                                                            Row(
                                                                          children: [
                                                                            Text(
                                                                              'Edit',
                                                                              style: TextStyle(color: AppTheme().secondaryColor),
                                                                            ),
                                                                            const SizedBox(width: 6),
                                                                            SvgPicture.asset(
                                                                              'assets/Icons/Edit.svg',
                                                                              color: AppTheme().secondaryColor,
                                                                            )
                                                                          ],
                                                                        )),
                                                                    TextButton(
                                                                        onPressed:
                                                                            () {
                                                                          if (index ==
                                                                              0) {
                                                                            FirebaseFirestore.instance.collection('users').doc(widget.uid).update({
                                                                              "defaultAddress": null
                                                                            });
                                                                          }
                                                                          FirebaseFirestore
                                                                              .instance
                                                                              .collection('users')
                                                                              .doc(widget.uid)
                                                                              .collection('addresses')
                                                                              .doc(data.id)
                                                                              .delete()
                                                                              .whenComplete(() {
                                                                            Fluttertoast.showToast(msg: '${data['name']} deleted successfully...');
                                                                          }).catchError((e) {
                                                                            Fluttertoast.showToast(msg: '$e');
                                                                          });
                                                                        },
                                                                        child:
                                                                            Row(
                                                                          children: [
                                                                            Text(
                                                                              'Delete',
                                                                              style: TextStyle(color: AppTheme().secondaryColor),
                                                                            ),
                                                                            const SizedBox(width: 6),
                                                                            SvgPicture.asset(
                                                                              'assets/Icons/Edit.svg',
                                                                              color: AppTheme().secondaryColor,
                                                                            )
                                                                          ],
                                                                        ))
                                                                  ],
                                                                ),
                                                              ],
                                                            ),
                                                          )));
                                                })
                                          ],
                                        );
                            }
                            )
                            )
                            )
              ],
            ))
          ],
        ),
      ),
    );
  }
}
