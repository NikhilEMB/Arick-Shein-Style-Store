import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:shein/theme/AppTheme.dart';

class StateSelectScreen extends StatefulWidget {
  const StateSelectScreen({super.key});

  @override
  State<StateSelectScreen> createState() => _StateSelectScreenState();
}

class _StateSelectScreenState extends State<StateSelectScreen> {
  List<dynamic> states = [];
  String searchQuery = '';

  fetchAllStates() async {
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
    setState(() {
      states = arr!['codes'];
    });
  }

  handleStateSelect(state) {
    Navigator.of(context).pop(state);
  }

  @override
  void initState() {
    // TODO: implement initState
    fetchAllStates();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    if (states.isEmpty) {
      return SafeArea(
        child: Scaffold(
          body: SizedBox(
            // padding: EdgeInsets.symmetric(horizontal: 15),
            height: size.height * 0.8,
            child: Column(
              children: [
                const SizedBox(height: 20),
                Container(
                  decoration: BoxDecoration(
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.5),
                        spreadRadius: -7,
                        blurRadius: 5,
                        offset: const Offset(0,
                            10), // Set the offset to give shadow at the bottom
                      ),
                    ],
                  ),
                  child: Stack(
                    children: [
                      Container(
                        padding: const EdgeInsets.only(
                            bottom: 10, left: 15, right: 15),
                        color: AppTheme().mainBackgroundColor,
                        width: double.infinity,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text(
                              "STATES",
                              style: TextStyle(fontWeight: FontWeight.w500),
                            ),
                            InkWell(
                              onTap: () {
                                Navigator.of(context).pop(null);
                              },
                              child: const Icon(Icons.close),
                            ),
                          ],
                        ),
                      ),
                      // Your container content goes here
                      // This can be a child widget or a column with multiple children
                    ],
                  ),
                ),
                Expanded(
                  child: SizedBox(
                    width: double.infinity,
                    child: Center(
                        child: CircularProgressIndicator(
                      color: AppTheme().secondaryColor,
                    )),
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
        // padding: EdgeInsets.symmetric(horizontal: 15),
        child: Column(
          children: [
            const SizedBox(height: 20),
            Container(
              decoration: BoxDecoration(
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    spreadRadius: -7,
                    blurRadius: 5,
                    offset: const Offset(
                        0, 10), // Set the offset to give shadow at the bottom
                  ),
                ],
              ),
              child: Stack(
                children: [
                  Container(
                    padding:
                        const EdgeInsets.only(bottom: 10, left: 15, right: 15),
                    color: AppTheme().mainBackgroundColor,
                    width: double.infinity,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          "STATES",
                          style: TextStyle(fontWeight: FontWeight.w500),
                        ),
                        InkWell(
                          onTap: () {
                            Navigator.of(context).pop(null);
                          },
                          child: const Icon(Icons.close),
                        ),
                      ],
                    ),
                  ),
                  // Your container content goes here
                  // This can be a child widget or a column with multiple children
                ],
              ),
            ),
            const SizedBox(height: 20),
            Expanded(
                child: SingleChildScrollView(
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 15),
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(5),
                        color: const Color.fromARGB(255, 235, 234, 234),
                      ),
                      width: double.infinity,
                      height: 40,
                      child: TextFormField(
                        onChanged: (value) {
                          setState(() {
                            searchQuery = value.toString();
                          });
                        },
                        style: const TextStyle(color: Colors.black),
                        cursorColor: const Color.fromARGB(255, 160, 159, 159),
                        decoration: InputDecoration(
                          focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                                color: AppTheme().mainBackgroundColor,
                                width: 1),
                          ),
                          contentPadding:
                              const EdgeInsets.symmetric(horizontal: 10.0),
                          prefixIcon: const Icon(Icons.search),
                          prefixIconColor: const Color.fromARGB(255, 136, 136, 136),
                          border: OutlineInputBorder(
                            borderSide: BorderSide(
                                color: AppTheme().mainBackgroundColor,
                                width: 1),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                                color: AppTheme().mainBackgroundColor,
                                width: 1),
                          ),
                          hintText: "Search any state",
                          hintStyle: const TextStyle(
                            color: Color.fromARGB(255, 104, 104, 104),
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 15),
                    child: SingleChildScrollView(
                      child: Column(
                        children: [
                          ...(states
                              .where((e) => e['state']
                                  .toString()
                                  .toLowerCase()
                                  .contains(searchQuery.toLowerCase()))
                              .toList()
                              .map((state) => InkWell(
                                    onTap: () => handleStateSelect(state),
                                    child: Container(
                                      margin: const EdgeInsets.only(bottom: 0),
                                      child: Row(
                                        children: [
                                          Expanded(
                                            child: Text(
                                              state['state'],
                                              style: const TextStyle(
                                                  fontWeight: FontWeight.w400,
                                                  fontSize: 17),
                                            ),
                                          ),
                                          Radio(
                                            value: '',
                                            groupValue: '_',
                                            onChanged: (_) {
                                              handleStateSelect(state);
                                            },
                                          )
                                        ],
                                      ),
                                    ),
                                  ))
                              .toList()),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            )),
          ],
        ),
      ),
    ));
  }
}
