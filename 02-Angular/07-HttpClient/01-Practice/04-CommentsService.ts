// src/app/services/comments.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  // URL de la API de comentarios
 // private commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
    private commentsUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {}

  /**
   * getComments:
   * Obtiene todos los comentarios de la API.
   * Retorna un Observable con un array de comentarios.
   */
  getComments(): Observable<any[]> {
    return this.http.get<any[]>(this.commentsUrl);
  }
}
