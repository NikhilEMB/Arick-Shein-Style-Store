import 'package:flutter/material.dart';
import 'package:flutter_cached_pdfview/flutter_cached_pdfview.dart';
import 'package:shein/widgets/screenHeader.dart';
import 'package:url_launcher/url_launcher.dart';

class MyPdf extends StatefulWidget {
  final String url;
  final String orderId;
  const MyPdf({super.key, required this.url, required this.orderId});

  @override
  State<MyPdf> createState() => _MyPdfState();
}

class _MyPdfState extends State<MyPdf> {
  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
          body: Column(
        children: [
          ScreenHeader(size: size, title: widget.orderId, isBackButton: true),
          Expanded(
            child: Container(
                child: const PDF().cachedFromUrl(
              widget.url,
              maxAgeCacheObject: const Duration(days: 30), //duration of cache
              placeholder: (progress) => Center(child: Text('$progress %')),
              errorWidget: (error) => Center(child: Text(error.toString())),
            )),
          ),
          ElevatedButton(
              style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  minimumSize: const Size(double.infinity, 50)),
              onPressed: () {
                downloadPDF(url: widget.url);
              },
              child: const Text('Download Pdf'))
        ],
      )),
    );
  }
Future<void> downloadPDF({required String url}) async {
  if (await canLaunchUrl(Uri.parse(url))) {
      await launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication);
    } else {
      throw 'Could not launch';
    }


  // Map<Permission, PermissionStatus> statuses = await [
  //   Permission.storage,
  //   // add more permissions to request here.
  // ].request();

  // if (statuses[Permission.storage]!.isGranted) {
  //   final status = await Permission.storage.request();
  //   try {
  //     if (status.isGranted) {
  //       Fluttertoast.showToast(msg: 'Downloading...');
  //       try {
  //         var request = await http.get(Uri.parse(widget.url));
  //         var bytes = request.bodyBytes;

  //         Directory? dir;

  //         if (defaultTargetPlatform == TargetPlatform.android) {
  //           // On Android, use getExternalStorageDirectory
  //           dir = await getExternalStorageDirectory();
  //         } else {
  //           // On iOS, use getApplicationDocumentsDirectory
  //           dir = await getApplicationDocumentsDirectory();
  //         }

  //         print(dir);

  //         String fileName =
  //             'Invoice-${widget.orderId}${DateFormat('ss').format(DateTime.now())}.pdf';
  //         String filePath = '${dir?.path}/$fileName';

  //         // Create the directory if it doesn't exist
  //         if (!(await Directory(dir!.path).exists())) {
  //           await Directory(dir.path).create(recursive: true);
  //         }

  //         File file = File(filePath);
  //         await file.writeAsBytes(bytes, mode: FileMode.write);

  //         Fluttertoast.showToast(msg: 'File saved: $filePath');
  //         print(filePath);  
  //       } catch (error) {
  //         print('Failed to download PDF: $error');
  //       }
  //     } else {
  //       print('Permission Denied');
  //     }
  //   } catch (e) {
  //     print('$e');
  //     Fluttertoast.showToast(msg: '$e');
  //   }
  // }
}



}
