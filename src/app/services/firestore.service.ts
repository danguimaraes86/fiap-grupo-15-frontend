import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { firebaseApp } from '../config/firebase.config';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private db = getFirestore(firebaseApp);

  // Busca todos os documentos de uma coleção
  getCollection(collectionName: string): Observable<any[]> {
    return from(
      getDocs(collection(this.db, collectionName))
        .then(querySnapshot => {
          const data: any[] = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          return data;
        })
    );
  }

  // Busca todas as coleções (requer listCollections do Admin SDK)
  // Para listar todas as coleções, você precisaria usar o Admin SDK no backend
  // Aqui vou criar um método que busca coleções específicas conhecidas
  getAllData(collectionNames: string[]): Observable<Record<string, any[]>> {
    return from(
      Promise.all(
        collectionNames.map(name =>
          getDocs(collection(this.db, name))
            .then(querySnapshot => {
              const data: any[] = [];
              querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
              });
              return { collection: name, data };
            })
        )
      ).then(results => {
        const allData: Record<string, any[]> = {};
        results.forEach(result => {
          allData[result.collection] = result.data;
        });
        return allData;
      })
    );
  }

  // Busca documentos de uma coleção com filtro
  getCollectionWhere(collectionName: string, field: string, value: any): Observable<any[]> {
    return from(
      getDocs(query(collection(this.db, collectionName), where(field, '==', value)))
        .then(querySnapshot => {
          const data: any[] = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          return data;
        })
    );
  }

  // Adiciona um novo documento em uma coleção
  addDocument(collectionName: string, data: any): Observable<string> {
    return from(
      addDoc(collection(this.db, collectionName), data)
        .then(docRef => docRef.id)
    );
  }

  // Busca um documento por ID
  getDocumentById(collectionName: string, docId: string): Observable<any> {
    const docRef = doc(this.db, collectionName, docId);
    return from(
      getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
        } else {
          throw new Error('Documento não encontrado');
        }
      })
    );
  }

  // Atualiza um documento existente
  updateDocument(collectionName: string, docId: string, data: any): Observable<void> {
    const docRef = doc(this.db, collectionName, docId);
    return from(updateDoc(docRef, data));
  }

  // Deleta um documento
  deleteDocument(collectionName: string, docId: string): Observable<void> {
    const docRef = doc(this.db, collectionName, docId);
    return from(deleteDoc(docRef));
  }
}
