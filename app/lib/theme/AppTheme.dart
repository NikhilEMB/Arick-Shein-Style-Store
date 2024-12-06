import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  Color mainBackgroundColor = const Color(0xffFFFFFF);
  Color dividerColor = const Color(0xffF3F5FF);
  // Color secondaryColor = const Color(0xff7CB340);
  // Color secondaryColor = const Color(0xff000000);
  Color secondaryColor = const Color(0xFF000000);

  Color themeColor = const Color(0xFFEB4897);

  Color mainColor = const Color(0xFFEB4897);

  Color gradientMainColor = const Color(0xFFEB4897);
  Color scaffoldColor = const Color.fromARGB(255, 243, 245, 245);

  TextStyle outfitStyle({
    FontWeight fontWeight = FontWeight.w400,
    double fontSize = 14,
    Color color = Colors.black,
  }) {
    return GoogleFonts.outfit(
      textStyle: TextStyle(
        fontWeight: fontWeight,
        fontSize: fontSize,
        color: color,
      ),
    );
  }

  
  TextStyle phoneNumberStyle({
    FontWeight fontWeight = FontWeight.w400,
    double fontSize = 16,
    Color color = Colors.black,
  }) {
    return GoogleFonts.outfit(
      textStyle: TextStyle(
        fontWeight: fontWeight,
        fontSize: fontSize,
        color: color,
      ),
    );
  }
}
