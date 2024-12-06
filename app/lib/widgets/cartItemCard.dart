import 'package:flutter/material.dart';
import 'package:shein/providers/cartProvider.dart';
import 'package:shein/theme/AppTheme.dart';
import 'package:provider/provider.dart';

Widget CartItemCard({
  context,
  value,
  size,
  handleUpdateQuantity,
  index,
  cartData,
}) {
  print('img:${value['img']}');

  var size = MediaQuery.of(context).size;
  var size2 = size;
  return Stack(
    children: [
      Container(
        margin: const EdgeInsets.only(top: 20),
        padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 8),
        width: double.infinity,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(5),
          color: Colors.white,
          border: Border.all(
            color: Colors.black, // Specify your border color
            width: 1.0, // Specify your border width
          ),

        ),
        child: Row(
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  width: size.width * 0.3,
                  height: size.width * 0.3,
                  child: Stack(
                    children: [
                      if (value['img'] != null)
                        Image.network(
                            value['img'].runtimeType.toString() ==
                                    '_Map<String, dynamic>'
                                ? value['img']['url']
                                : value['img'],
                            errorBuilder: (BuildContext context, Object exception,
                                StackTrace? stackTrace) {
                          return Image.network(
                            'https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-19.jpg',
                            // width: Provider.of<HomeData>(context).isTablet
                            //     ? size.width * 0.5
                            //     : size.width,
                            // height: Provider.of<HomeData>(context).isTablet
                            //     ? null
                            //     : size.width * 1,
                          );
                        }, fit: BoxFit.cover)
                      else
                        Image.network(
                          'https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-19.jpg',
                          width: size.width * 0.3,
                          height: size.width * 0.3,
                        ),
                      value['status'] == false || (value['totalQty'] == "0")
                          ? Positioned(
                              top: 45,
                              child: Container(
                                color: Colors.white.withOpacity(0.8),
                                padding: const EdgeInsets.symmetric(vertical: 5),
                                width: size.width * 0.3,
                                child: const Center(
                                  child: Text(
                                    "OUT OF STOCK",
                                    style: TextStyle(
                                      color: Colors.red,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 13,
                                    ),
                                  ),
                                ),
                              ))
                          : const SizedBox()
                    ],
                  ),
                ),
                const SizedBox(height: 10,),
                InkWell(
                          onTap: () {
                            showDialog(
                              context: context,
                              builder: (context) {
                                return Dialog(
                                  child: SizedBox(
                                    // height: size.height * 0.22,
                                    // alignment: Alignment.center,
                                    child: Padding(
                                      padding: const EdgeInsets.all(16.0),
                                      child: SingleChildScrollView(
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          mainAxisSize: MainAxisSize.min,
                                          children: [
                                            const Text(
                                              'Are you sure you want to remove this product from your cart?',
                                              textAlign: TextAlign.start,
                                              style: TextStyle(fontSize: 16),
                                            ),
                                            const SizedBox(height: 25),
                                            Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.end,
                                              children: [
                                                TextButton(
                                                  onPressed: () {
                                                    Navigator.pop(context);
                                                  },
                                                  child: Text(
                                                    'CANCEL',
                                                    style:
                                                        AppTheme().outfitStyle(
                                                      fontSize: 14,
                                                      color: AppTheme()
                                                          .secondaryColor,
                                                    ),
                                                  ),
                                                ),
                                                TextButton(
                                                  onPressed: () {
                                                    Provider.of<Cart>(context,
                                                            listen: false)
                                                        .removeItemFromCart(
                                                            index: index);
                                                    Navigator.pop(context);
                                                  },
                                                  child: Text(
                                                    'DELETE',
                                                    style:
                                                        AppTheme().outfitStyle(
                                                      fontSize: 14,
                                                      color: AppTheme()
                                                          .secondaryColor,
                                                    ),
                                                  ),
                                                )
                                              ],
                                            )
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                );
                              },
                            );
                          },
                          child: Container(
                            
                            child: Row(
                              children: [
                                const Icon(
                                  Icons.close,
                                  color: Color(0xffFF0000),
                                  size: 17,
                                ),
                                Text(
                                  'Remove Item',
                                  style: AppTheme()
                                      .outfitStyle(color: const Color(0xffFF0000)),
                                )
                              ],
                            ),
                          ),
                        ),
              ],
            ),
            // const SizedBox(
            //   width: 10,
            // ),
            Expanded(
                child: Container(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Row(
                  //   children: [
                  //     value['mrpPrice'] != null &&
                  //             value['mrpPrice'] != value['price']
                  //         ? Text(
                  //             "Rs ${value['price'].toString()}",
                  //             style: const TextStyle(
                  //               decoration: TextDecoration.lineThrough,
                  //             ),
                  //           )
                  //         : const SizedBox(),
                  //     SizedBox(
                  //         width: value['mrpPrice'] != null &&
                  //                 value['mrpPrice'] != value['price']
                  //             ? 5
                  //             : 0),
                  //   ],
                  // ),
                  // const SizedBox(
                  //   height: 10,
                  // ),
                 Text(
                      value['name'],
                      style: const TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w500,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    
                  ),
                  const SizedBox(
                    height: 10,
                  ),  
                  const Text(
                    // "Size: ${value['pack']['weight']}",
                    "",
                    style: TextStyle(
                      fontSize: 13,
                      color: Color(0xff555555),
                    ),
                  ),
                   SizedBox(
                    height: size.height * 0.07,
                    ),
                  

                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        "Rs ${value['price'].toDouble().toString()}",
                        style: AppTheme().outfitStyle(
                          fontSize: 16,
                          color: AppTheme().secondaryColor,
                        ),
                      ),
                      const Spacer(),
                      SizedBox(
                    child: Row(
                      children: [
                        InkWell(
                          onTap: () => handleUpdateQuantity(
                            type: 'dec',
                            index: index,
                            cartData: cartData,
                          ),
                          child: Container(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(2),
                              color: const Color.fromARGB(255, 241, 249, 253),
                            ),
                            width: 25,
                            height: 25,
                            child: const Icon(
                              Icons.remove,
                              size: 16,
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 15),
                          child: Text(value['quantity'].toString()),
                        ),
                        InkWell(
                          onTap: () => handleUpdateQuantity(
                            type: 'inc',
                            index: index,
                            cartData: cartData,
                          ),
                          child: Container(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(2),
                              color: const Color.fromARGB(255, 241, 249, 253),
                            ),
                            width: 25,
                            height: 25,
                            child: const Icon(
                              Icons.add,
                              size: 16,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                      
                    ],
                  ),
                ],
              ),
            )),
          ],
        ),
      ),

    ],
  );
}
