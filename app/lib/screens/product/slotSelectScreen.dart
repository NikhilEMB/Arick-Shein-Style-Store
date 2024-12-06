// ignore_for_file: unused_local_variable, use_build_context_synchronously

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:intl/intl.dart';
import 'package:shein/providers/userProvider.dart';
import 'package:shein/screens/appointments/MyAppointments.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:shein/widgets/loadingModal.dart';
import 'package:provider/provider.dart';

class SlotSelect extends StatefulWidget {
  final dynamic slotData;

  const SlotSelect({super.key, this.slotData});

  @override
  State<SlotSelect> createState() => _SlotSelectState();
}

class _SlotSelectState extends State<SlotSelect> {
  List<dynamic> slotSchedules = [];
  dynamic selectedTime;

  void getSchedules() {
    var today = DateTime.now();
    var arr = [];
    for (var index = 0; index < widget.slotData['maxDays']; index++) {
      var dayToCheck = today.add(Duration(days: index));
      var schedule = widget.slotData['schedules']
          .where((s) => s['day'] == DateFormat('EEEE').format(dayToCheck));
      if (schedule.isNotEmpty) {
        if (schedule.first['active'] && schedule.first['schedule'].isNotEmpty) {
          arr.add({
            'date': dayToCheck,
            'schedules': schedule.first['schedule'],
            'day': schedule.first['day'],
            'active': false,
          });
        }
      }
    }
    if (arr.isNotEmpty) {
      arr[0]['active'] = true;
    }

    print(arr);
    setState(() {
      slotSchedules = arr;
    });
  }

  void selectSchedule(index) {
    print(index);
    var schedules = slotSchedules;

    schedules[index]['active'] = true;

    for (var slot in schedules) {
      if (schedules.indexOf(slot) != index) {
        slot['active'] = false;
      }
    }

    print(schedules);

    setState(() {
      slotSchedules = schedules;
      selectedTime = null;
    });
  }

  getActiveTimeSchedules() {
    if (slotSchedules.isNotEmpty) {
      var res = slotSchedules.firstWhere(
        (slot) => slot['active'] == true,
      )['schedules'];
      print("RESSSSSSSSSSSS $res");
      if (res != null) {
        return res;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  Future<DocumentSnapshot> getVendorData(String vendorId) async {
    return await FirebaseFirestore.instance
        .collection('features')
        .doc('multiVendor')
        .collection('vendors')
        .doc(vendorId)
        .get();
  }

  createBooking(data, slotLimit) async {
    try {
      // Check slot availability
      bool slotAvailable = false;
      var appointments = [];
      print("BEFORE");
      final CollectionReference afsCollection =
          FirebaseFirestore.instance.collection('appointments');
      print("AFTER");
      if (data['item']['variant'] != null) {
        print('BEFORE IF');
        QuerySnapshot variantAppointmentsSnapshot = await afsCollection
            .where('item.id', isEqualTo: data['item']['id'])
            .where('item.variant', isEqualTo: data['item']['variant'])
            .where('schedule.date', isEqualTo: data['schedule']['date'])
            .where('schedule.slot.start',
                isEqualTo: data['schedule']['slot']['start'])
            .where('schedule.slot.end',
                isEqualTo: data['schedule']['slot']['end'])
            .where('status', isEqualTo: 'accepted')
            .limit(slotLimit)
            .get();
        appointments =
            variantAppointmentsSnapshot.docs.map((doc) => doc.data()).toList();
      } else {
        QuerySnapshot appointmentsSnapshot = await afsCollection
            .where('item.id', isEqualTo: data['item']['id'])
            .where('schedule.date', isEqualTo: data['schedule']['date'])
            .where('schedule.slot.start',
                isEqualTo: data['schedule']['slot']['start'])
            .where('schedule.slot.end',
                isEqualTo: data['schedule']['slot']['end'])
            .where('status', isEqualTo: 'accepted')
            .limit(slotLimit)
            .get();

        appointments =
            appointmentsSnapshot.docs.map((doc) => doc.data()).toList();
      }
      if (appointments.length < slotLimit) {
        if (data['vendor']['id'] != null && data['vendor']['id'] != "") {
          final vendorDetailsSnapshot =
              await getVendorData(data['vendor']['id']);
          dynamic vendorDetails = vendorDetailsSnapshot.data();
          if (vendorDetails != null &&
              vendorDetails['appointmentSlotLimit'] != null) {
            QuerySnapshot vendorAppointmentsSnapshot = await afsCollection
                .where('vendor.id', isEqualTo: data['vendor']['id'])
                .where('schedule.date', isEqualTo: data['schedule']['date'])
                .where('schedule.slot.start',
                    isEqualTo: data['schedule']['slot']['start'])
                .where('schedule.slot.end',
                    isEqualTo: data['schedule']['slot']['end'])
                .where('status', isEqualTo: 'accepted')
                .limit(vendorDetails['appointmentSlotLimit'])
                .get();

            var vendorAppointments = vendorAppointmentsSnapshot.docs
                .map((doc) => doc.data())
                .toList();

            if (vendorAppointments.length <
                vendorDetails['appointmentSlotLimit']) {
              slotAvailable = true;
            } else {
              slotAvailable = false;
            }
          } else {
            slotAvailable = true;
          }
        } else {
          slotAvailable = true;
        }
      } else {
        slotAvailable = false;
      }
      if (slotAvailable) {
        await afsCollection.add(data);
        return 'added';
      } else {
        return 'not_available';
      }
    } catch (error) {
      print(error);
      return 'error';
    }
  }

  handleBooking() async {
    showDialog(
      barrierDismissible: false,
      context: context,
      builder: (context) => loader(context),
    );
    if (Provider.of<Auth>(context, listen: false).userData == null) {
      print('FETCHING');
      await Provider.of<Auth>(context, listen: false).fetchUser('userId');
    }

    print(Provider.of<Auth>(context, listen: false).userData);
    var scheduleSlot = slotSchedules.firstWhere(
      (slot) => slot['active'] == true,
    );
    // print(scheduleSlot);
    var data = {
      'item': widget.slotData['item'],
      'schedule': {
        "date": DateFormat('dd-MM-yyyy').format(scheduleSlot['date']),
        'slot': {
          'start': selectedTime['start'],
          'end': selectedTime['end'],
        },
        "day": scheduleSlot['day']
      },
      "vendor": widget.slotData['vendor'],
      "user": {
        "id": FirebaseAuth.instance.currentUser?.uid,
        "name": Provider.of<Auth>(context, listen: false).userData['name']
      },
      "status": 'accepted',
    };

    int slotLimit = selectedTime['slotLimit'];

    print("DATA $data");
    print("LIMIT $slotLimit");
// var res = 'added';
    var res = await createBooking(data, slotLimit);
    if (res == "added") {
      Navigator.pop(context);

      var userRes = await showDialog(
        barrierDismissible: false,
        context: context,
        builder: (context) {
          return Dialog(
            child: Container(
              // height: MediaQuery.of(context).size.width * 0.3,
              padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Your appointment is booked successfully!",
                      style: TextStyle(
                        fontSize: 16,
                      ),
                    ),
                    const SizedBox(
                      height: 15,
                    ),
                    SizedBox(
                      width: double.infinity,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          InkWell(
                            onTap: () {
                              Navigator.of(context, rootNavigator: true)
                                  .pushAndRemoveUntil(
                                CupertinoPageRoute(
                                  builder: (context) => const MyAppointments(),
                                ),
                                (route) =>
                                    route.isFirst ||
                                    route.settings.name == '/home',
                              );
                            },
                            child: Container(
                              padding: const EdgeInsets.symmetric(
                                  vertical: 5, horizontal: 15),
                              child: const Text('Ok'),
                            ),
                          )
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
    } else {
      Fluttertoast.showToast(
          msg:
              "The selected slot is not available currently. Please select another slot or try again later.");
      Navigator.pop(context);
    }
  }

  getUserInfo() async {
    if (Provider.of<Auth>(context, listen: false).userData == null) {
      Provider.of<Auth>(context, listen: false).fetchUser('userId');
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    getUserInfo();
    getSchedules();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    // getActiveTimeSchedules();
    return SafeArea(
        child: Scaffold(
      body: SizedBox(
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
                              "Appointment Schedule",
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
                    const SizedBox(height: 20),
                    slotSchedules.isNotEmpty
                        ? SizedBox(
                            width: double.infinity,
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  ...(slotSchedules.asMap().entries.map((e) {
                                    var index = e.key;
                                    var schedule = e.value;
                                    return Stack(
                                      children: [
                                        InkWell(
                                          onTap: () {
                                            selectSchedule(index);
                                          },
                                          child: Container(
                                            margin: const EdgeInsets.only(right: 2),
                                            width: 110,
                                            padding: const EdgeInsets.symmetric(
                                                vertical: 24),
                                            decoration: BoxDecoration(
                                              border: Border.all(
                                                  width: 1, color: Colors.grey),
                                              color: schedule['active']
                                                  ? const Color.fromARGB(
                                                      255, 20, 100, 237)
                                                  : Colors.white,
                                            ),
                                            child: Center(
                                              child: Column(
                                                children: [
                                                  Text(
                                                    schedule['day'],
                                                    style: TextStyle(
                                                        color:
                                                            schedule['active']
                                                                ? Colors.white
                                                                : Colors.black,
                                                        fontWeight:
                                                            FontWeight.bold),
                                                  ),
                                                  const SizedBox(height: 3),
                                                  Text(
                                                    DateFormat('dd MMM').format(
                                                        schedule['date']),
                                                    style: TextStyle(
                                                        color:
                                                            schedule['active']
                                                                ? Colors.white
                                                                : Colors.black,
                                                        fontWeight:
                                                            FontWeight.w500),
                                                  )
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                        schedule['active']
                                            ? Positioned(
                                                bottom: -15,
                                                left: 40,
                                                child: Align(
                                                  alignment:
                                                      Alignment.bottomCenter,
                                                  child: Row(
                                                    mainAxisAlignment:
                                                        MainAxisAlignment
                                                            .center,
                                                    children: [
                                                      Transform.rotate(
                                                        angle: -3.14 /
                                                            4, // Rotate by 45 degrees in radians (pi/4)
                                                        child: Container(
                                                          width: 25,
                                                          height: 25,
                                                          decoration:
                                                              const BoxDecoration(
                                                            color: Colors.white,
                                                          ),
                                                        ),
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                              )
                                            : const SizedBox(),
                                      ],
                                    );
                                  })),
                                ],
                              ),
                            ),
                          )
                        : const SizedBox(),
                    const SizedBox(
                      height: 20,
                    ),
                    getActiveTimeSchedules().isEmpty
                        ? const SizedBox(
                            width: double.infinity,
                            child: Center(
                                child: Text(
                              "No slots available.",
                              style: TextStyle(
                                  fontWeight: FontWeight.bold, fontSize: 18),
                            )),
                          )
                        : const SizedBox(),
                    ...(getActiveTimeSchedules().map((time) {
                      return Container(
                          padding: const EdgeInsets.only(left: 15),
                          child: Row(
                            children: [
                              Radio(
                                  fillColor: time['slotLimit'] > 0
                                      ? MaterialStatePropertyAll(
                                          AppTheme().secondaryColor)
                                      : const MaterialStatePropertyAll(Colors.grey),
                                  value: time,
                                  groupValue: selectedTime,
                                  onChanged: (value) {
                                    if (time['slotLimit'] > 0) {
                                      setState(() {
                                        selectedTime = value;
                                      });
                                    } else {
                                      Fluttertoast.showToast(
                                          msg: 'Slot Not Available');
                                    }
                                  }),
                              Text('${time['start']} to ${time['end']}'),
                            ],
                          ));
                    }).toList())
                  ],
                ),
              ),
            ),
            getActiveTimeSchedules().isEmpty
                ? const SizedBox()
                : Align(
                    alignment: Alignment.bottomCenter,
                    child: Padding(
                        padding: const EdgeInsets.only(
                          bottom: 5,
                        ),
                        child: ElevatedButton(
                            onPressed: () {
                              if (Provider.of<Auth>(context, listen: false)
                                          .userData ==
                                      null ||
                                  FirebaseAuth.instance.currentUser?.uid ==
                                      null) {
                                Fluttertoast.showToast(msg: 'Login First');
                                return;
                              }
                              if (selectedTime == null) {
                                if (getActiveTimeSchedules().isEmpty) {
                                  Fluttertoast.showToast(
                                      msg: 'Slots not available');
                                  return;
                                } else {
                                  Fluttertoast.showToast(
                                      msg: 'Select time slot.');
                                  return;
                                }
                              }

                              handleBooking();

                              // handleBooking();
                            },
                            style: ButtonStyle(
                                shape: const MaterialStatePropertyAll(
                                  RoundedRectangleBorder(
                                      borderRadius: BorderRadius.zero),
                                ),
                                backgroundColor: selectedTime != null
                                    ? MaterialStatePropertyAll(
                                        AppTheme().secondaryColor)
                                    : const MaterialStatePropertyAll(
                                        Color.fromARGB(255, 175, 223, 123))
                                //  RoundedRectangleBorder(
                                //   borderRadius: BorderRadius.zero,
                                // ),
                                ),
                            child: const Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [Text("Book Now")],
                            ))),
                  ),
          ],
        ),
      ),
    ));
  }
}
