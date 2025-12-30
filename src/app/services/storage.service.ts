import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { firebaseApp } from '../config/firebase.config';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storage = getStorage(firebaseApp);

  async uploadTransactionImage(
    userId: string,
    file: File
  ): Promise<{ url: string; name: string }> {

    const path = `transactions/${userId}/${Date.now()}_${file.name}`;
    const fileRef = ref(this.storage, path);

    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    return {
      url,
      name: file.name
    };
  }
}
