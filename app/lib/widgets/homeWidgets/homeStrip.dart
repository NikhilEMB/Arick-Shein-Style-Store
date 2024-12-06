import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shein/theme/AppTheme.dart';

class HomeStrip extends StatelessWidget {
  const HomeStrip({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppTheme().themeColor,
      child: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 12.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              
               Text(
                'Refer and Earn ₹500 + Get 10% Off user CODE - SHEINAPP10',
                style: GoogleFonts.montserrat(
                      textStyle: const TextStyle(
                          color: Colors.white,
                          fontSize: 10.0,
                          fontWeight: FontWeight.w500)),
              ),
              
            ],
          ),
        ),
      ),
    );
  }
}