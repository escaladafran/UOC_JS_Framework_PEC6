import { Injectable } from '@angular/core';
import {of, Observable } from 'rxjs';
import { Article } from '../app/models/articulo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  private apiUrl = '/api/articles';
  constructor(private http: HttpClient) { }


  // Obtener artículos con un filtro opcional por nombre
  getArticles(query?: string): Observable<any[]>{
    const url =  query ? `${this.apiUrl}?q=${query}` : this.apiUrl;
    return this.http.get<any[]>(url);
  }


  create(article: Article): Observable<any> {
    return this.http.post<any>(this.apiUrl, article);
  }


  changeQuantity(articleID: number, changeInQuantity: number): Observable<any> {
    // Para que el cambio de cantidad sea un número válido
    if (changeInQuantity === null || isNaN(changeInQuantity)) {
      changeInQuantity = 0; // Inicializa la cantidad en 0 si es inválida
    }
  
    return this.http.patch<any>(`${this.apiUrl}/${articleID}`, {changeInQuantity});
  }
  

}










