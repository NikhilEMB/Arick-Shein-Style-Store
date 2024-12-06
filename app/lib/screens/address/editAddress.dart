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

class EditAddressScreen extends StatefulWidget {
  dynamic address;
  bool isPop;

  EditAddressScreen({super.key, this.address, this.isPop = false});

  @override
  State<EditAddressScreen> createState() => _EditAddressScreenState();
}

class _EditAddressScreenState extends State<EditAddressScreen> {
  bool loading = false;
  TextEditingController stateController = TextEditingController();
  TextEditingController cityController = TextEditingController();
  TextEditingController completeAddressController = TextEditingController();

  @override
  void initState() {
    // TODO: implement initState
    completeAddressController.text = widget.address['address'];
    cityController.text = widget.address['city'];
    super.initState();
  }

  handlePinCodeEntered(pincode) async {
    showDialog(
      barrierDismissible: false,
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
        widget.address = {
          ...widget.address,
          "state": pickedState[0]['state'],
          'stateCode': pickedState[0]['code'],
          "city": json['PostOffice'][0]['District'],
          "country": json['PostOffice'][0]['Country']
        };
      });
      Navigator.pop(context);
    });
  }

  handleSelectState() async {
    dynamic selectedState =
        await Navigator.of(context).pushNamed('/selectState');
    if (selectedState == null) {
      print("NULL RETURNED");
    } else {
      setState(() {
        widget.address = {
          ...widget.address,
          "state": selectedState['state'],
          "stateCode": selectedState['code']
        };
      });
    }
  }

  handleCountrySelect({size}) async {
    String selectedValue = widget.address['country'];
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
      widget.address['country'] = selectedCountry;
    });
  }

  handleSubmit() async {
    final prefs = await SharedPreferences.getInstance();

    var uid = FirebaseAuth.instance.currentUser?.uid;
    if (widget.address['state'].isEmpty ||
        widget.address['stateCode'].isEmpty ||
        widget.address['pincode'].isEmpty ||
        completeAddressController.text.isEmpty ||
        widget.address['city'].isEmpty ||
        widget.address['name'].isEmpty ||
        widget.address['phoneNo'].isEmpty) {
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

    if (regionCodes.isNotEmpty) {
      var check = regionCodes
          .contains(int.parse(widget.address['pincode'].toString().trim()));
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
        ...widget.address,
        "address": completeAddressController.text,
        "country": widget.address['country'],
        "createdAt": DateTime.now(),
      };
      print("ADADAD $data");
      String res = await DatabaseService().updateAddressOfUser(data);
      if (res.isNotEmpty) {
        await DatabaseService().updateDefaultAddress(data);
        await Provider.of<Auth>(context, listen: false).fetchUser('');
        setState(() {
          loading = false;
        });
        if (widget.isPop) {
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

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    if (widget.address['phoneNo'] == "") {
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
                          title: "Edit Address",
                          isBackButton: true,
                        ),
                        Center(
                          child: CircularProgressIndicator(
                            color: AppTheme().secondaryColor,
                          ),
                        )
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      );
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
                      title: "Edit Address",
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
                              style: AppTheme().outfitStyle(),
                            ),
                            const SizedBox(height: 5),
                            SizedBox(
                              height: 40,
                              child: TextFormField(
                                initialValue: widget.address['name'],
                                onChanged: (value) {
                                  setState(() {
                                    widget.address = {
                                      ...widget.address,
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
                            Text(
                              'Complete Address',
                              style: AppTheme().outfitStyle(),
                            ),
                            const SizedBox(height: 5),
                            TextFormField(
                              // initialValue: widget.address['address'],
                              controller: completeAddressController,
                              // onChanged: (value) {
                              //   setState(() {
                              //     widget.address = {
                              //       ...widget.address,
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
                                  Text(
                                    'Pincode',
                                    style: AppTheme().outfitStyle(),
                                  ),
                                  const SizedBox(height: 5),
                                  SizedBox(
                                    height: 40,
                                    child: TextFormField(
                                      initialValue: widget.address['pincode'],
                                      onChanged: (value) {
                                        setState(() {
                                          widget.address = {
                                            ...widget.address,
                                            "pincode": value.toString(),
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
                                  Text(
                                    'City',
                                    style: AppTheme().outfitStyle(),
                                  ),
                                  const SizedBox(height: 5),
                                  SizedBox(
                                    height: 40,
                                    child: TextFormField(
                                      controller: cityController,
                                      // initialValue:
                                      //     widget.address['city'],
                                      onChanged: (value) {
                                        setState(() {
                                          widget.address = {
                                            ...widget.address,
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
                                  Text(
                                    'State',
                                    style: AppTheme().outfitStyle(),
                                  ),
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
                                              child: widget.address['state'] ==
                                                      ""
                                                  ? const Text('Select State')
                                                  : Text(
                                                      widget.address['state']),
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
                                  Text(
                                    'Country',
                                    style: AppTheme().outfitStyle(),
                                  ),
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
                                                child:
                                                    widget.address['country'] ==
                                                            ""
                                                        ? const Text(
                                                            'Select Country')
                                                        : Text(widget.address[
                                                            'country']),
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
                            Text(
                              'Phone No',
                              style: AppTheme().outfitStyle(),
                            ),
                            const SizedBox(height: 5),
                            SizedBox(
                              height: 40,
                              child: TextFormField(
                                onChanged: (value) {
                                  setState(() {
                                    widget.address = {
                                      ...widget.address,
                                      "phoneNo": value.toString()
                                    };
                                  });
                                },
                                initialValue: widget.address['phoneNo'],
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
                  )),
            )
          ],
        ),
      ),
    ));
  }
}
