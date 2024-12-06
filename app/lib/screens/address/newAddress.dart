import 'dart:convert';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shein/providers/userProvider.dart';
import 'package:shein/screens/googleMap/GoogleMap.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/utils/databaseServices.dart';
import 'package:shein/widgets/loadingModal.dart';
import 'package:shein/widgets/screenHeader.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class NewAddressScreen extends StatefulWidget {
  const NewAddressScreen({super.key});

  @override
  State<NewAddressScreen> createState() => _NewAddressScreenState();
}

class _NewAddressScreenState extends State<NewAddressScreen> {
  dynamic userAddress = {
    "address": "",
    "city": "",
    "lat": 0,
    "lng": 0,
    "name": "",
    'phoneNo': "",
    "pincode": "",
    'state': '',
    "stateCode": "",
    "defaultAddress": true,
  };
  String userSelectedCountry = '';
  bool loading = false;
  TextEditingController stateController = TextEditingController();
  TextEditingController cityController = TextEditingController();
  TextEditingController completeAddressController = TextEditingController();

  getPhoneNumber() async {
    final prefs = await SharedPreferences.getInstance();
    if (prefs.getString('phoneNumber') != null) {
      setState(() {
        userAddress = {
          ...userAddress,
          "phoneNo": prefs.getString('phoneNumber')
        };
      });
    } else {
      var userData = Provider.of<Auth>(context, listen: false).userData;
      if (userData != null && userData.containsKey('phoneNo')) {
        setState(() {
          userAddress = {...userAddress, "phoneNo": userData['phoneNo']};
        });
      }
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    getPhoneNumber();
    super.initState();
  }

  handleSelectState() async {
    dynamic selectedState =
        await Navigator.of(context).pushNamed('/selectState');
    if (selectedState == null) {
      print("NULL RETURNED");
    } else {
      setState(() {
        userAddress = {
          ...userAddress,
          "state": selectedState['state'],
          "stateCode": selectedState['code']
        };
      });
    }
  }

  handleCountrySelect({size}) async {
    String selectedValue = userSelectedCountry;
    var selectedCountry = await showDialog(
      context: context,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setState) => Dialog(
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 20),
              width: size.width * 0.5,
              height: size.width * 0.35,
              child: Column(
                children: [
                  const Divider(height: 7),
                  Row(
                    children: [
                      Radio(
                        value: "India",
                        groupValue: selectedValue,
                        onChanged: (value) => setState(() {
                          selectedValue = value.toString();
                        }),
                        activeColor: AppTheme().secondaryColor,
                      ),
                      const Text("India")
                    ],
                  ),
                  const Divider(height: 7),
                  const SizedBox(height: 15),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        InkWell(
                          radius: 20,
                          onTap: () {
                            Navigator.of(context).pop("");
                          },
                          child: Text(
                            "CANCEL",
                            style: TextStyle(
                                color: AppTheme().secondaryColor,
                                fontWeight: FontWeight.w500),
                          ),
                        ),
                        const SizedBox(width: 20),
                        InkWell(
                          radius: 20,
                          onTap: () {
                            Navigator.of(context).pop(selectedValue.toString());
                          },
                          child: Text(
                            "OK",
                            style: TextStyle(
                                color: AppTheme().secondaryColor,
                                fontWeight: FontWeight.w500),
                          ),
                        ),
                      ],
                    ),
                  )
                ],
              ),
            ),
          ),
        );
      },
    );
    setState(() {
      userSelectedCountry = selectedCountry;
    });
  }

  handleSubmit(isPop, args) async {
    var uid = FirebaseAuth.instance.currentUser?.uid;
    final prefs = await SharedPreferences.getInstance();
    if (stateController.text.isEmpty ||
        userAddress['stateCode'].isEmpty ||
        userAddress['pincode'].isEmpty ||
        completeAddressController.text.isEmpty ||
        cityController.text.isEmpty ||
        userAddress['name'].isEmpty ||
        userAddress['phoneNo'].isEmpty) {
      Fluttertoast.showToast(msg: 'Enter Details Correctly.');
      return;
    }

    List<dynamic> regionCodes = await FirebaseFirestore.instance
        .collection("features")
        .doc('multiRegion')
        .collection('regions')
        .doc(prefs.get('region').toString())
        .get()
        .then((value) {
      if (value.exists) {
        var data = value.data();
        return data?['pincodes'];
      } else {
        return [];
      }
    });
    print("REDGION $regionCodes");
    if (regionCodes.isNotEmpty) {
      var check = regionCodes
          .contains(int.parse(userAddress['pincode'].toString().trim()));
      if (!check) {
        Fluttertoast.showToast(msg: 'Pincode not serviceable.');
        return;
      }
    }

    if (uid != null) {
      setState(() {
        loading = true;
      });
      Map<String, dynamic> data = {
        ...userAddress,
        "address": completeAddressController.text,
        "country": userSelectedCountry,
        "createdAt": DateTime.now(),
      };
      String res = await DatabaseService().addAddressToUser(data);
      if (res.isNotEmpty) {
        await DatabaseService().updateDefaultAddress(data);
        await Provider.of<Auth>(context, listen: false).fetchUser('');
        setState(() {
          loading = false;
        });

        if (isPop) {
          Navigator.of(context).pop(true);
        } else {
          Navigator.of(context).pushNamedAndRemoveUntil(
            '/orderSummary',
            (route) => route.isFirst || route.settings.name == '/cart',
          );
        }
      }
    }
  }

  handlePinCodeEntered(pincode) async {
    showDialog(
      context: context,
      builder: (context) => loader(context),
    );
    var arr = await FirebaseFirestore.instance
        .collection('settings')
        .doc('states')
        .get()
        .then((value) {
      if (value.exists) {
        return value.data();
      } else {
        return {"codes": []};
      }
    });

    const JsonDecoder decoder = JsonDecoder();
    http
        .get(Uri.parse("http://www.postalpincode.in/api/pincode/$pincode"))
        .then((http.Response response) {
      final String res = response.body;
      final int statusCode = response.statusCode;

      if (statusCode < 200 || statusCode > 400) {
        print("ERROR FETCHING");
      }

      var json = decoder.convert(res);

      stateController.text = json['PostOffice'][0]['State'];
      cityController.text = json['PostOffice'][0]['District'];

      var pickedState = arr?['codes']
          .where((state) =>
              state['state'].toString().toLowerCase() ==
              json['PostOffice'][0]['State'].toString().toLowerCase())
          .toList();

      setState(() {
        userAddress = {
          ...userAddress,
          "state": pickedState[0]['state'],
          'stateCode': pickedState[0]['code'],
          "city": json['PostOffice'][0]['District'],
          "country": json['PostOffice'][0]['Country']
        };
        userSelectedCountry = json['PostOffice'][0]['Country'];
      });
      Navigator.pop(context);
    });
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    final dynamic args = ModalRoute.of(context)!.settings.arguments;

    if (Provider.of<Auth>(context).userData == null) {
      Provider.of<Auth>(context).fetchUser('userId');
      return const SizedBox();
    }

    return SafeArea(
        child: Scaffold(
      body: Container(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    ScreenHeader(
                      size: size,
                      title: "New Address",
                      isBackButton: true,
                    ),
                    const SizedBox(height: 20),
                    Center(
                      child: InkWell(
                        onTap: () async {
                          var address = await Navigator.of(context).push(
                            CupertinoPageRoute(
                              builder: (context) => const GoogleMapScreen(),
                            ),
                          );

                          print("RETURNED ADDRESS $address");
                          if (address != null) {
                            completeAddressController.text = address.toString();
                          }
                          setState(() {});
                        },
                        child: Container(
                          width: size.width * 0.6,
                          padding: const EdgeInsets.symmetric(vertical: 7),
                          decoration: BoxDecoration(
                              color: AppTheme().secondaryColor,
                              borderRadius: BorderRadius.circular(100),
                              boxShadow: const <BoxShadow>[
                                BoxShadow(
                                    color: Color.fromARGB(255, 68, 66, 66),
                                    blurRadius: 2,
                                    offset: Offset(0, 1),
                                    spreadRadius: 0.05),
                              ]),
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.location_on_outlined,
                                color: Colors.white,
                                size: 20,
                              ),
                              SizedBox(
                                width: 3,
                              ),
                              Text(
                                'Pick Address On Map',
                                style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w500,
                                    fontSize: 15),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 15),
                      child: SizedBox(
                        width: double.infinity,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const SizedBox(height: 20),
                            Text(
                              'Name',
                              style: AppTheme().outfitStyle(
                                  fontSize: 15, color: const Color(0xff555555)),
                            ),
                            const SizedBox(height: 5),
                            SizedBox(
                              height: 40,
                              child: TextFormField(
                                onChanged: (value) {
                                  setState(() {
                                    userAddress = {
                                      ...userAddress,
                                      "name": value.toString(),
                                    };
                                  });
                                },
                                style: const TextStyle(color: Colors.black),
                                cursorColor:
                                    const Color.fromARGB(255, 160, 159, 159),
                                decoration: InputDecoration(
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(0),
                                    borderSide: const BorderSide(
                                        color:
                                            Color.fromARGB(255, 205, 204, 204),
                                        width: 1),
                                  ),
                                  contentPadding: const EdgeInsets.symmetric(
                                      horizontal: 10.0),
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(0),
                                    borderSide: const BorderSide(
                                        color:
                                            Color.fromARGB(255, 205, 204, 204),
                                        width: 1),
                                  ),
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(0),
                                    borderSide: const BorderSide(
                                        color:
                                            Color.fromARGB(255, 205, 204, 204),
                                        width: 1),
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(height: 15),
                            const Text('Complete Address'),
                            const SizedBox(height: 5),
                            TextFormField(
                              controller: completeAddressController,
                              // onChanged: (value) {
                              //   setState(() {
                              //     userAddress = {
                              //       ...userAddress,
                              //       "address": value.toString(),
                              //     };
                              //   });
                              // },
                              minLines: 3,
                              maxLines: null,
                              style: const TextStyle(color: Colors.black),
                              cursorColor:
                                  const Color.fromARGB(255, 160, 159, 159),
                              decoration: InputDecoration(
                                focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(0),
                                  borderSide: const BorderSide(
                                      color: Color.fromARGB(255, 205, 204, 204),
                                      width: 1),
                                ),
                                contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 10.0, vertical: 5),
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(0),
                                  borderSide: const BorderSide(
                                      color: Color.fromARGB(255, 205, 204, 204),
                                      width: 1),
                                ),
                                enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(0),
                                  borderSide: const BorderSide(
                                      color: Color.fromARGB(255, 205, 204, 204),
                                      width: 1),
                                ),
                              ),
                            ),
                            const SizedBox(height: 15),
                            Container(
                              // width: size.width * 0.44,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text('Pincode'),
                                  const SizedBox(height: 5),
                                  SizedBox(
                                    height: 40,
                                    child: TextFormField(
                                      onChanged: (value) {
                                        setState(() {
                                          userAddress = {
                                            ...userAddress,
                                            "pincode": value.toString().trim(),
                                          };
                                        });
                                        if (value.length == 6) {
                                          handlePinCodeEntered(value);
                                        }
                                      },
                                      style:
                                          const TextStyle(color: Colors.black),
                                      cursorColor: const Color.fromARGB(
                                          255, 160, 159, 159),
                                      decoration: InputDecoration(
                                        focusedBorder: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(0),
                                          borderSide: const BorderSide(
                                              color: Color.fromARGB(
                                                  255, 205, 204, 204),
                                              width: 1),
                                        ),
                                        contentPadding:
                                            const EdgeInsets.symmetric(
                                                horizontal: 10.0),
                                        border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(0),
                                          borderSide: const BorderSide(
                                              color: Color.fromARGB(
                                                  255, 205, 204, 204),
                                              width: 1),
                                        ),
                                        enabledBorder: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(0),
                                          borderSide: const BorderSide(
                                              color: Color.fromARGB(
                                                  255, 205, 204, 204),
                                              width: 1),
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(height: 15),
                            Container(
                              // width: size.width * 0.44,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text('City'),
                                  const SizedBox(height: 5),
                                  SizedBox(
                                    height: 40,
                                    child: TextFormField(
                                      controller: cityController,
                                      onChanged: (value) {
                                        setState(() {
                                          userAddress = {
                                            ...userAddress,
                                            "city": value.toString(),
                                          };
                                        });
                                      },
                                      style:
                                          const TextStyle(color: Colors.black),
                                      cursorColor: const Color.fromARGB(
                                          255, 160, 159, 159),
                                      decoration: InputDecoration(
                                        focusedBorder: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(0),
                                          borderSide: const BorderSide(
                                              color: Color.fromARGB(
                                                  255, 205, 204, 204),
                                              width: 1),
                                        ),
                                        contentPadding:
                                            const EdgeInsets.symmetric(
                                                horizontal: 10.0),
                                        border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(0),
                                          borderSide: const BorderSide(
                                              color: Color.fromARGB(
                                                  255, 205, 204, 204),
                                              width: 1),
                                        ),
                                        enabledBorder: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(0),
                                          borderSide: const BorderSide(
                                              color: Color.fromARGB(
                                                  255, 205, 204, 204),
                                              width: 1),
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(height: 15),
                            Container(
                              // width: size.width * 0.44,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text('State'),
                                  const SizedBox(height: 5),
                                  InkWell(
                                    onTap: handleSelectState,
                                    child: SizedBox(
                                      height: 40,
                                      child: Container(
                                        decoration: BoxDecoration(
                                          border: Border.all(
                                            color: const Color.fromARGB(
                                                255, 205, 204, 204),
                                            width: 1,
                                          ),
                                        ),
                                        padding: const EdgeInsets.only(left: 5),
                                        child: Row(
                                          children: [
                                            Expanded(
                                              child: userAddress['state'] == ""
                                                  ? const Text('Select State')
                                                  : Text(userAddress['state']),
                                            ),
                                            const Icon(
                                              Icons.arrow_drop_down_outlined,
                                              size: 30,
                                              color: Color.fromARGB(
                                                  255, 92, 92, 92),
                                            )
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(height: 15),
                            Container(
                              // width: size.width * 0.44,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text('Country'),
                                  const SizedBox(height: 5),
                                  InkWell(
                                    onTap: () =>
                                        handleCountrySelect(size: size),
                                    child: SizedBox(
                                        height: 40,
                                        child: Container(
                                          decoration: BoxDecoration(
                                            border: Border.all(
                                              color: const Color.fromARGB(
                                                  255, 205, 204, 204),
                                              width: 1,
                                            ),
                                          ),
                                          padding:
                                              const EdgeInsets.only(left: 5),
                                          child: Row(
                                            children: [
                                              Expanded(
                                                child: userSelectedCountry == ""
                                                    ? const Text(
                                                        'Select Country')
                                                    : Text(userSelectedCountry),
                                              ),
                                              const Icon(
                                                Icons.arrow_drop_down_outlined,
                                                size: 30,
                                                color: Color.fromARGB(
                                                    255, 92, 92, 92),
                                              )
                                            ],
                                          ),
                                        )),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(height: 15),
                            const Text('Phone No'),
                            const SizedBox(height: 5),
                            SizedBox(
                              height: 40,
                              child: TextFormField(
                                onChanged: (value) {
                                  setState(() {
                                    userAddress = {
                                      ...userAddress,
                                      "phoneNo": value.toString()
                                    };
                                  });
                                },
                                initialValue: Provider.of<Auth>(context)
                                    .userData['phoneNo'],
                                style: const TextStyle(color: Colors.black),
                                cursorColor:
                                    const Color.fromARGB(255, 160, 159, 159),
                                decoration: InputDecoration(
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(0),
                                    borderSide: const BorderSide(
                                        color:
                                            Color.fromARGB(255, 205, 204, 204),
                                        width: 1),
                                  ),
                                  contentPadding: const EdgeInsets.symmetric(
                                      horizontal: 10.0),
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(0),
                                    borderSide: const BorderSide(
                                        color:
                                            Color.fromARGB(255, 205, 204, 204),
                                        width: 1),
                                  ),
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(0),
                                    borderSide: const BorderSide(
                                        color:
                                            Color.fromARGB(255, 205, 204, 204),
                                        width: 1),
                                  ),
                                ),
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
            Align(
              alignment: Alignment.bottomCenter,
              child: InkWell(
                  onTap: () => handleSubmit(
                      args != null && args.containsKey('navigatePop')
                          ? true
                          : false,
                      args),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
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
                      child: Center(
                        child: !loading
                            ? const Text(
                                'Save',
                                style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w500),
                              )
                            : const SizedBox(
                                width: 24,
                                height: 24,
                                child: CircularProgressIndicator(
                                  color: Colors.white,
                                  strokeWidth: 2,
                                ),
                              ),
                      ),
                    ),
                  )),
            )
          ],
        ),
      ),
    ));
  }
}
