import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shein/theme/AppTheme.dart';

Widget loader(BuildContext context) {
  return Dialog(
    child: SizedBox(
      height: 100,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        mainAxisSize: MainAxisSize.min,
        children: [
          CupertinoActivityIndicator(
            color: AppTheme().secondaryColor,
          ),
          // CircularProgressIndicator(
          //   color: Colors.black,
          // ),
          const SizedBox(
            width: 10,
          ),
          const Text(
            'Please wait...',
            style: TextStyle(fontFamily: 'Lexend'),
          )
        ],
      ),
    ),
  );
}
