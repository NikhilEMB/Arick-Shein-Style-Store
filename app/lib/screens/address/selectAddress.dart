import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shein/providers/userProvider.dart';
import 'package:shein/screens/address/editAddress.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/utils/databaseServices.dart';
import 'package:shein/widgets/screenHeader.dart';
import 'package:provider/provider.dart';

class SelectAddressScreen extends StatefulWidget {
  const SelectAddressScreen({super.key});

  @override
  State<SelectAddressScreen> createState() => _SelectAddressScreenState();
}

class _SelectAddressScreenState extends State<SelectAddressScreen> {
  List<dynamic> addresses = [];
  dynamic selectedAddress;

  handleSubmit() {
    Navigator.of(context).pop(selectedAddress);
  }

  fetchUserAddresses() async {
    var userAddresses = await DatabaseService().getUserAddresses();
    setState(() {
      addresses = userAddresses;
      selectedAddress =
          Provider.of<Auth>(context, listen: false).userData['defaultAddress'];
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    fetchUserAddresses();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    return SafeArea(
        child: Scaffold(
      backgroundColor: AppTheme().scaffoldColor,
      body: SizedBox(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    ScreenHeader(size: size, title: "Select Address"),
                    InkWell(
                      onTap: () {
                        Navigator.of(context).pushNamed('/newAddress');
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 10, vertical: 15),
                        decoration: const BoxDecoration(
                            color: Colors.white,
                            boxShadow: [
                              BoxShadow(
                                  color: Color.fromARGB(255, 202, 201, 201),
                                  blurRadius: 3,
                                  offset: Offset(0, 2),
                                  spreadRadius: 0)
                            ]),
                        child: Row(
                          children: [
                            Icon(
                              Icons.add,
                              size: 20,
                              color: AppTheme().secondaryColor,
                            ),
                            const SizedBox(width: 5),
                            Text(
                              'Add a new address',
                              style:
                                  TextStyle(color: AppTheme().secondaryColor),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),
                    ...(addresses.map((address) {
                      return InkWell(
                        onTap: () {
                          setState(() {
                            selectedAddress = address;
                          });
                        },
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 15),
                          child: Container(
                            margin: const EdgeInsets.only(bottom: 10),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(5),
                              boxShadow: const [
                                BoxShadow(
                                    color: Color.fromARGB(255, 202, 201, 201),
                                    blurRadius: 3,
                                    offset: Offset(0, 2),
                                    spreadRadius: 0)
                              ],
                              color: Colors.white,
                            ),
                            padding: const EdgeInsets.symmetric(
                                vertical: 15, horizontal: 15),
                            height: size.width * 0.3,
                            child: Row(
                              children: [
                                address['address'] == selectedAddress['address']
                                    ? Icon(
                                        Icons.check,
                                        size: 20,
                                        weight: 100,
                                        color: AppTheme().secondaryColor,
                                      )
                                    : const SizedBox(),
                                SizedBox(
                                    width: address['address'] ==
                                            selectedAddress['address']
                                        ? 20
                                        : 40),
                                Expanded(
                                    child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('${address['name']}'),
                                    const SizedBox(height: 7),
                                    Text(
                                      '${address['address']}',
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                    const SizedBox(height: 7),
                                    Text('${address['phoneNo']}'),
                                  ],
                                )),
                                SizedBox(
                                  child: Align(
                                    alignment: Alignment.bottomCenter,
                                    child: InkWell(
                                      radius: 50,
                                      onTap: () {
                                        Navigator.of(context).push(
                                          CupertinoPageRoute(
                                            builder: (context) =>
                                                EditAddressScreen(
                                              address: address,
                                            ),
                                          ),
                                        );
                                      },
                                      child: Container(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 10, vertical: 5),
                                        child: Text(
                                          'Edit',
                                          style: TextStyle(
                                              fontWeight: FontWeight.w500,
                                              color: AppTheme().secondaryColor),
                                        ),
                                      ),
                                    ),
                                  ),
                                )
                              ],
                            ),
                          ),
                        ),
                      );
                    }).toList())
                  ],
                ),
              ),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: InkWell(
                  onTap: handleSubmit,
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    decoration: BoxDecoration(
                      color: AppTheme().secondaryColor,
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
                      'Deliver Here',
                      style: TextStyle(
                          color: Colors.white, fontWeight: FontWeight.w500),
                    )),
                  )),
            )
          ],
        ),
      ),
    ));
  }
}
