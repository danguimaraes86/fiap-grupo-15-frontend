import 'dart:io';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/foundation.dart' show kIsWeb;

class StorageService {
  final FirebaseStorage _storage = FirebaseStorage.instance;

  /// Upload de arquivo para o Firebase Storage
  Future<String> uploadFile({
    required String userId,
    required String transactionId,
    required dynamic file, // File para mobile, Uint8List para web
    required String fileName,
  }) async {
    try {
      final String path = 'transactions/$userId/$transactionId/$fileName';
      final Reference ref = _storage.ref().child(path);

      // Determinar o content-type baseado na extensão do arquivo
      String contentType = _getContentType(fileName);
      
      final metadata = SettableMetadata(
        contentType: contentType,
        customMetadata: {
          'uploaded': DateTime.now().toIso8601String(),
        },
      );

      UploadTask uploadTask;
      
      if (kIsWeb) {
        // Upload para Web - envia como binary
        uploadTask = ref.putData(file, metadata);
      } else {
        // Upload para Mobile - envia como binary
        uploadTask = ref.putFile(file as File, metadata);
      }

      final TaskSnapshot snapshot = await uploadTask;
      final String downloadUrl = await snapshot.ref.getDownloadURL();
      
      return downloadUrl;
    } catch (e) {
      throw Exception('Erro ao fazer upload do arquivo: $e');
    }
  }

  /// Determina o content-type baseado na extensão do arquivo
  String _getContentType(String fileName) {
    final extension = fileName.toLowerCase().split('.').last;
    
    switch (extension) {
      case 'pdf':
        return 'application/pdf';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'doc':
        return 'application/msword';
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      default:
        return 'application/octet-stream'; // Binary genérico
    }
  }

  /// Deletar arquivo do Firebase Storage
  Future<void> deleteFile(String fileUrl) async {
    try {
      final Reference ref = _storage.refFromURL(fileUrl);
      await ref.delete();
    } catch (e) {
      throw Exception('Erro ao deletar arquivo: $e');
    }
  }

  /// Obter URL de download do arquivo
  Future<String> getDownloadUrl(String path) async {
    try {
      final Reference ref = _storage.ref().child(path);
      return await ref.getDownloadURL();
    } catch (e) {
      throw Exception('Erro ao obter URL do arquivo: $e');
    }
  }
}
