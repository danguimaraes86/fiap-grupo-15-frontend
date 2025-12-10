import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [],
  templateUrl: './graphic.html',
  styleUrl: './graphic.css',
})
export class Graphic implements OnInit {

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    // Liste aqui os nomes das coleções que você quer buscar do Firebase
    // Exemplo: ['users', 'transactions', 'products']
    const collectionNames = ['users', 'transactions']; // Ajuste conforme suas coleções

    this.firestoreService.getAllData(collectionNames).subscribe({
      next: (data) => {
        console.log('Todos os dados do Firebase:', data);
        // data será um objeto com as chaves sendo os nomes das coleções
        // e os valores sendo arrays com os documentos
      },
      error: (error) => {
        console.error('Erro ao buscar dados:', error);
      }
    });

    // Ou se quiser buscar uma coleção específica:
    this.firestoreService.getCollection('users').subscribe({
      next: (users) => {
        console.log('Usuários:', users);
      },
      error: (error) => {
        console.error('Erro:', error);
      }
    });
  }
}
