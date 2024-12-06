
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class FiltersBottomSheet extends StatefulWidget {
  final Function(Map<String, dynamic>) onFilterApplied;

  const FiltersBottomSheet({super.key, required this.onFilterApplied});

  @override
  _FiltersBottomSheetState createState() => _FiltersBottomSheetState();
}

class _FiltersBottomSheetState extends State<FiltersBottomSheet> {
  late int selectedCategoryIndex;
  Map<String, Set<String>> selectedFilters = {};
  List<Map<String, dynamic>>? metafields; // Make it nullable

  @override
  void initState() {
    super.initState();
    selectedCategoryIndex = 0;
    fetchMetafields();
  }

  Future<void> fetchMetafields() async {
  try {
    final QuerySnapshot<Map<String, dynamic>> filtersCollection =
        await FirebaseFirestore.instance
            .collection('features')
            .doc('filters')
            .collection('list')
            .get();

    print("Filters Collection: ${filtersCollection.docs.toString()}");

    final List<Map<String, dynamic>> list = [];

    for (final doc in filtersCollection.docs) {
      final data = doc.data();
      if (data.containsKey('name') && data.containsKey('values')) {
        list.add({
          'name': data['name'],
          'values': List<String>.from(data['values']),
        });
      } else {
        print("Error: Invalid document structure in 'list'");
      }
    }

    setState(() {
      metafields = list;
    });
  } catch (e) {
    print("Error fetching filters: $e");
  }
}

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: MediaQuery.of(context).size.height * 0.7,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(14.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Filters',
                  style: TextStyle(
                    fontSize: 20.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                ElevatedButton(
                  onPressed: () {
                    widget.onFilterApplied(selectedFilters);
                    Navigator.of(context).pop();
                    print("selected: $selectedFilters");
                  },
                  child: const Text('Apply' , style: TextStyle(color: Colors.pink),),
                ),
              ],
            ),
          ),
          Expanded(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Expanded(
                  child: ListView.builder(
                    shrinkWrap: true,
                    itemCount: metafields?.length ?? 0, // Null check
                    itemBuilder: (context, index) {
                      final category = metafields![index]['name'];

                      return InkWell(
                        onTap: () {
                          setState(() {
                            selectedCategoryIndex = index;
                          });
                        },
                        child: Container(
                          padding: const EdgeInsets.all(8.0),
                          color: selectedCategoryIndex == index
                              ? Colors.grey.withOpacity(0.2)
                              : Colors.transparent,
                          child: Text(
                            category,
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: selectedCategoryIndex == index
                                  ? Colors.blue
                                  : Colors.black,
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
                const SizedBox(width: 8.0),
                Expanded(
                  child: ListView.builder(
                    shrinkWrap: true,
                    itemCount: metafields?[selectedCategoryIndex]['values'].length ?? 0, // Null check
                    itemBuilder: (context, index) {
                      final option =
                          metafields![selectedCategoryIndex]['values'][index];
                      final optionKey = metafields![selectedCategoryIndex]['name'];

                      return CheckboxListTile(
                        title: Text(option),
                        value: selectedFilters.containsKey(optionKey)
                            ? selectedFilters[optionKey]!.contains(option)
                            : false,
                        onChanged: (value) {
                          setState(() {
                            if (selectedFilters.containsKey(optionKey)) {
                              if (value == true) {
                                selectedFilters[optionKey]!.add(option);
                              } else {
                                selectedFilters[optionKey]!.remove(option);
                              }
                            } else {
                              selectedFilters[optionKey] = {option};
                            }
                          });
                        },
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}