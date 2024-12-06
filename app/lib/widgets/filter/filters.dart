import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_svg/flutter_svg.dart';

enum TabType { Filters, Sort, TopRated, New }

class FiltersList extends StatefulWidget {
  const FiltersList({Key? key}) : super(key: key);

  @override
  _FiltersListState createState() => _FiltersListState();
}

class _FiltersListState extends State<FiltersList> {
  int? _selectedTabIndex;
  int _selectedCategoryIndex = 0;

  final List<TabType> _tabTypes = [
    TabType.Filters,
    TabType.Sort,
    TabType.TopRated,
    TabType.New,
  ];
  List<Map<String, dynamic>> metafields = [
    {
      'key': 'size',
      'namespace': 'custom',
      'value': '',
      'options': [
        'XXS',
        'XS',
        'S',
        'M',
        'L',
        'XL',
        'XXL',
        '3XL',
        '4XL',
        '5XL',
        '6XL',
        '7XL',
        '8XL',
        'OneSize',
      ]
    },
    {
      'key': 'color',
      'namespace': 'custom',
      'value': '',
      'options': [
        'Pink',
        'Navy Blue',
        'Blue',
        'Beige',
        'Black',
        'Bronze',
      ]
    },
    {
      'key': 'discount',
      'namespace': 'custom',
      'value': '',
      'options': [
        '10% and above',
        '20% and above',
        '30% and above',
        '40% and above',
        '50% and above',
        '60% and above',
        '70% and above',
        '80% and above',
        '90% and above'
      ]
    },
    {
      'key': 'rating',
      'namespace': 'custom',
      'value': '',
      'options': [
        '1 to 5',
        '2 to 5',
        '3 to 5',
        '4 to 5',
      ]
    },
    {
      'key': 'delivery_time',
      'namespace': 'custom',
      'value': '',
      'options': [
        'Within 2 days',
        'Within 3 days',
        'Within 4 days',
      ]
    },
    {
      'key': 'dupatta_fabric',
      'namespace': 'custom',
      'value': '',
      'options': [
        'NA',
        'Pure cotton',
        'Poly chiffon',
        'Art silk',
        'Cotton blend',
      ]
    },
    {
      'key': 'occasion',
      'namespace': 'custom',
      'value': '',
      'options': [
        'Festive',
        'Daily',
        'Fusion',
        'Maternity',
      ]
    },
    {
      'key': 'print_or_pattern_type',
      'namespace': 'custom',
      'value': '',
      'options': [
        'Ethnic Motifs',
        'Solid',
        'Floral',
        'Abstract',
        'Animal',
        'Bandhani',
        'Checked',
        'Chevron',
        'Colourblocked',
        'Geometric',
        'Leheria',
        'Ombre',
        'Paisley',
        'Quirky',
        'Striped',
        'Textured',
        'Tribal',
        'Woven design',
      ]
    },
    {
      'key': 'top_design_styling',
      'namespace': 'custom',
      'value': '',
      'options': [
        'Regular',
        'Panelled',
        'Layered',
        'Angrakha',
        'Empire',
        'High Slit',
        'Pleated',
        'Tiered',
        'Kaftan',
      ]
    },
    {
      'key': 'neck',
      'namespace': 'custom',
      'value': '',
      'options': [
        'Band Collar',
        'Boat Neck',
        'Cowl Neck',
        'Halter Neck',
        'keyhole Neck',
        'Off-Shoulder',
        'Scoop Neck',
        'Shawl Neck',
        'Shirt Collar',
        'Shoulder Strap',
        'Square Neck',
        'Stylized Neck',
        'Sweetheart Neck',
        'Tie-up Neck',
      ]
    },
    {
      'key': 'top_length',
      'namespace': 'custom',
      'value': '',
      'options': ['Floor length']
    },
    {
      'key': 'top_fabric',
      'namespace': 'custom',
      'value': '',
      'options': [
        'Acrylic',
        'Art Silk',
        'Chanderi Cotton',
        'Chanderi Silk',
        'Cotton Blend',
        'Dupion Silk',
        'Georgette',
        'Jute Cotton',
        'Jute Silk',
        'Linene',
        'Liva',
        'Net',
        'Nylon',
        'Organic Cotton',
        'Organza',
        'Poly Chanderi',
        'Poly Chiffon',
        'Poly Crepe',
        'Poly Georgette',
        'Poly Silk',
        'Pure Silk',
        'Pure Wool',
        'Raw Silk',
        'Satin',
        'Shantoon',
        'Silk Blend',
        'Silk Chiffon',
        'Silk Crepe',
        'Silk Georgette',
        'Supernet',
        'Tissue',
        'Tussar Silk',
        'Velvet',
        'Voile',
        'Wool Blend'
      ]
    },
    {
      'key': 'bottom_type',
      'namespace': 'custom',
      'value': '',
      'options': [
        'Dhoti Pants',
        'Harem Pants',
        'Leggings',
        'Patiala',
        'Pyjamas',
        'Salwar',
        'Sharara',
        'Skirt',
      ]
    },
    {
      'key': 'dupatta',
      'namespace': 'custom',
      'value': '',
      'options': ['NA', 'With Dupatta']
    },
    {
      'key': 'sleeve_length',
      'namespace': 'custom',
      'value': '',
      'options': [
        'Three quarter sleeves',
        'Short Sleeves',
        'Long Sleeves',
        'Sleeveless'
      ]
    },
    {
      'key': 'wash_care',
      'namespace': 'custom',
      'value': '',
      'options': ['Machine Wash', 'Dry Clean', 'Hand Wash']
    },
    {
      'key': 'ornamentation',
      'namespace': 'custom',
      'value': '',
      'options': [
        'Thread Work',
        'Gotta Patti',
        'Sequinned',
        'Aari Work ',
        'Beads and Stones',
        'Chikankari',
        'Kantha Work',
        'Mirror Work',
        'Mukaish',
        'NA',
        'Patchwork',
        'Phulkari',
        'Zardozi',
        'Zari',
      ]
    },
    {
      'key': 'no_of_pockets',
      'namespace': 'custom',
      'value': '',
      'options': ['1', '2', 'NA']
    },
    {
      'key': 'weave_type',
      'namespace': 'custom',
      'value': '',
      'options': ['Machine Weave', 'Knitted and Woven', 'Knitted', 'Handloom']
    },
    {
      'key': 'top_shape',
      'namespace': 'custom',
      'value': '',
      'options': [
        'Straight',
        'A-Line',
        'Anarkali',
        'Kaftan',
        'Pathani',
      ]
    }
  ];

  List<String> _categoryNames = [];
  List<List<String>> _categoryOptions = [];
  @override
  void initState() {
    super.initState();

    _categoryNames =
        metafields.map((metafield) => metafield['key'] as String).toList();
    _categoryOptions = metafields
        .map((metafield) =>
            List<String>.from(metafield['options'] as List<dynamic>))
        .toList();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 8, bottom: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.04,
            width: double.infinity,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: _tabTypes.length,
              itemBuilder: (context, index) {
                return _buildTabItem(_tabTypes[index], index);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTabItem(TabType tabType, int index) {
    final isSelected = index == _selectedTabIndex;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10.0),
      child: GestureDetector(
        onTap: () {
          setState(() {
            _selectedTabIndex = index;
          });
          _showBottomSheet(context, index);
        },
        child: Container(
          padding: const EdgeInsets.symmetric(
            horizontal: 12,
            vertical: 6,
          ),
          decoration: BoxDecoration(
            color: Colors.transparent,
            borderRadius: BorderRadius.circular(26),
            border: Border.all(
              color: isSelected ? Colors.black : Colors.grey,
              width: 1.0,
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (tabType != TabType.Filters) _getTabTitle(tabType),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4.0),
                child: _getTabIcon(tabType),
              ),
              if (tabType == TabType.Filters) _getTabTitle(tabType),
            ],
          ),
        ),
      ),
    );
  }

  Widget _getTabIcon(TabType tabType) {
    final iconPath = _getIconPath(tabType);
    return SvgPicture.asset(
      iconPath,
      height: 16,
      width: 16,
      color: _selectedTabIndex == _tabTypes.indexOf(tabType)
          ? Colors.black
          : Colors.grey,
    );
  }

  String _getIconPath(TabType tabType) {
    switch (tabType) {
      case TabType.Filters:
        return 'assets/icons/filter.svg';
      case TabType.Sort:
        return 'assets/icons/downarrow.svg';
      case TabType.TopRated:
        return 'assets/icons/star.svg';
      case TabType.New:
        return 'assets/icons/startwo.svg';
    }
  }

  Widget _getTabTitle(TabType tabType) {
    final titles = {
      TabType.Filters: 'Filters',
      TabType.Sort: 'Sort',
      TabType.TopRated: 'Top Rated',
      TabType.New: 'New',
    };

    return Text(
      titles[tabType]!,
      style: GoogleFonts.assistant(
        color: Colors.black,
        fontSize: 14,
        fontWeight: FontWeight.w500,
      ),
    );
  }

  void _showBottomSheet(BuildContext context, int tabIndex) {
    showModalBottomSheet<void>(
      context: context,
      builder: (BuildContext context) {
        return YourBottomSheetContentWidget(
          categoryOptions: _categoryOptions,
          tabIndex: tabIndex,
          categoryNames: _categoryNames,
          selectedCategoryIndex: _selectedCategoryIndex,
          onCategorySelected: (index) {
            setState(() {
              _selectedCategoryIndex = index;
            });
          },
        );
      },
    );
  }
}

class YourBottomSheetContentWidget extends StatefulWidget {
  final int tabIndex;
  List<String> categoryNames;
  List<List<String>> categoryOptions;

  final int selectedCategoryIndex;
  final ValueChanged<int> onCategorySelected;

  YourBottomSheetContentWidget({super.key, 
    required this.tabIndex,
    required this.categoryNames,
    required this.selectedCategoryIndex,
    required this.onCategorySelected,
    required this.categoryOptions,
  });

  @override
  State<YourBottomSheetContentWidget> createState() =>
      _YourBottomSheetContentWidgetState();
}

class _YourBottomSheetContentWidgetState
    extends State<YourBottomSheetContentWidget> {
  List<bool> selectedOptions = [];

  @override
  void initState() {
    super.initState();
    // Initialize the selectedOptions list with false values for each option.
    selectedOptions = List.filled(widget.categoryOptions[0].length, false);
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Filters',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  child: const Text('Clear All'),
                ),
              ],
            ),
          ),
          const Divider(),
          Row(
            // mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                flex: 1,
                child: _buildCategoryList(),
              ),
              Expanded(
                flex: 2,
                child: _buildOptionList(widget.selectedCategoryIndex),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryList() {
    return ListView.builder(
      itemCount: widget.categoryNames.length,
      shrinkWrap: true,
      itemBuilder: (context, index) {
        return Column(
          children: [
            ListTile(
              title: Text(
                widget.categoryNames[index],
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              ),
              onTap: () {
                setState(() {
                  // Update the selected category index.
                  widget.onCategorySelected(index);
                  // Reset the selected options for the new category.
                  selectedOptions =
                      List.filled(widget.categoryOptions[index].length, false);
                });
              },
            ),
            const Divider(),
          ],
        );
      },
    );
  }

  Widget _buildOptionList(int selectedCategoryIndex) {
    List<String> options = widget.categoryOptions[selectedCategoryIndex];

    List<bool> selectedOptions = List.filled(options.length, false);

    return ListView.builder(
      itemCount: options.length,
      shrinkWrap: true,
      itemBuilder: (context, index) {
        return ListTile(
          leading: GestureDetector(
            onTap: () {
              setState(() {
                selectedOptions[index] = !selectedOptions[index];

                onOptionSelected(selectedOptions);
              });
            },
            child: Container(
              width: 20,
              height: 20,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: selectedOptions[index] ? Colors.black : Colors.grey,
                  width: 2,
                ),
                color:
                    selectedOptions[index] ? Colors.black : Colors.transparent,
              ),
              child: selectedOptions[index]
                  ? Center(
                      child: Container(
                        width: 10,
                        height: 10,
                        decoration: const BoxDecoration(
                          shape: BoxShape.circle,
                          color: Colors.black,
                        ),
                      ),
                    )
                  : null,
            ),
          ),
          title: Text(options[index]),
          onTap: () {},
        );
      },
    );
  }

  void onOptionSelected(List<bool> selectedOptions) {}
}
