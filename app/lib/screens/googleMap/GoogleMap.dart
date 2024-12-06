import 'dart:async';

import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geocoding/geocoding.dart';
import 'package:shein/theme/AppTheme.dart';

class GoogleMapScreen extends StatefulWidget {
  const GoogleMapScreen({super.key});

  @override
  State<GoogleMapScreen> createState() => _GoogleMapScreenState();
}

class _GoogleMapScreenState extends State<GoogleMapScreen> {
  final Completer<GoogleMapController> _controller =
      Completer<GoogleMapController>();
  GoogleMapController? mapController;
  final GlobalKey<FormState> _formKey = GlobalKey();

  late double lat;
  late double long;
  String userAddress = "";

  bool isMapLoading = false;
  bool isLocationChanged = false;

  Future<Position> _getCurrentLocation() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      Fluttertoast.showToast(msg: "Location services are disabled.");
    }

    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        Fluttertoast.showToast(msg: "Access Denied");
      }
      if (permission == LocationPermission.deniedForever) {
        Fluttertoast.showToast(
            msg:
                "Location permissions are permanently denied, Can not access Maps");
      }
    }
    return await Geolocator.getCurrentPosition();
  }

  void getUserLocation(bool isFirstTime) async {
    if (isFirstTime) {
      setState(() {
        isMapLoading = true;
      });
    }
    var posi = await _getCurrentLocation();
    // var userData = Provider.of<Auth>(context, listen: false).getUserData;

    List<Placemark> placemarks =
        await placemarkFromCoordinates(posi.latitude, posi.longitude);
    if (mapController.runtimeType != Null) {
      mapController!.animateCamera(CameraUpdate.newCameraPosition(
          CameraPosition(
              target: LatLng(posi.latitude, posi.longitude), zoom: 20)
          //17 is new zoom level
          ));
    }
    setState(() {
      lat = posi.latitude;
      long = posi.longitude;
      isMapLoading = false;
      userAddress =
          "${placemarks[0].name}, ${placemarks[0].street}, ${placemarks[0].subLocality}, ${placemarks[0].locality}, ${placemarks[0].postalCode}, ${placemarks[0].country}";
      // userAddress = {
      //   "address":
      //       "${placemarks[0].name}, ${placemarks[0].street}, ${placemarks[0].subLocality}, ${placemarks[0].locality}, ${placemarks[0].postalCode}, ${placemarks[0].country}",
      //   "city": "${placemarks[0].locality}",
      //   "email": "${userData['email']}",
      //   "phone": "",
      //   "pinCode": "${placemarks[0].postalCode}",
      //   "state": "${placemarks[0].administrativeArea}",
      //   "userName": "${userData['name']}",
      // };
    });
  }

  Future<void> setUserSelectedLocation(LatLng argument) async {
    setState(() {
      isLocationChanged = true;
    });
    List<Placemark> placemarks =
        await placemarkFromCoordinates(argument.latitude, argument.longitude);
    if (mapController.runtimeType != Null) {
      mapController!.animateCamera(CameraUpdate.newCameraPosition(
          CameraPosition(
              target: LatLng(argument.latitude, argument.longitude), zoom: 20)
          //17 is new zoom level
          ));
    }
    setState(() {
      lat = argument.latitude;
      long = argument.longitude;
      isLocationChanged = false;
      userAddress =
          "${placemarks[0].name}, ${placemarks[0].street}, ${placemarks[0].subLocality}, ${placemarks[0].locality}, ${placemarks[0].postalCode}, ${placemarks[0].country}";
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    getUserLocation(true);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        body: SizedBox(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding:
                    const EdgeInsets.symmetric(vertical: 15, horizontal: 15),
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
                        "Select Location",
                        style: TextStyle(
                            fontSize: 17, fontWeight: FontWeight.w500),
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
              const SizedBox(height: 5),
              Expanded(
                child: isMapLoading
                    ? Container(
                        child: Center(
                            child: CircularProgressIndicator(
                        color: AppTheme().secondaryColor,
                      )))
                    : Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 0),
                        child: Center(
                          child: ClipRRect(
                            borderRadius: const BorderRadius.only(
                              topLeft: Radius.circular(15),
                              topRight: Radius.circular(15),
                              bottomRight: Radius.circular(0),
                              bottomLeft: Radius.circular(0),
                            ),
                            child: Align(
                              alignment: Alignment.bottomRight,
                              child: GoogleMap(
                                compassEnabled: false,
                                initialCameraPosition: CameraPosition(
                                  bearing: 192.8334901395799,
                                  target: LatLng(lat, long),
                                  zoom: 20,
                                ),
                                myLocationEnabled: true,
                                myLocationButtonEnabled: true,
                                markers: {
                                  Marker(
                                      markerId: const MarkerId('123'),
                                      position: LatLng(lat, long)),
                                },
                                onTap: (argument) {
                                  setUserSelectedLocation(argument);
                                },
                                onMapCreated: (GoogleMapController controller) {
                                  _controller.complete(controller);
                                  setState(() {
                                    mapController = controller;
                                  });
                                },
                              ),
                            ),
                          ),
                        ),
                      ),
              ),
              Align(
                alignment: Alignment.bottomCenter,
                child: InkWell(
                  onTap: () => Navigator.of(context).pop(userAddress),
                  child: Container(
                      height: 40,
                      alignment: Alignment.center,
                      color: AppTheme().secondaryColor,
                      child: const Text(
                        'Save',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      )),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
