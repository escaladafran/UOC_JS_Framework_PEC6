import { Injectable } from '@angular/core';
import {of, Observable } from 'rxjs';
import { Article } from '../app/models/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor() { }


  private articles: Article[] = [
    { id: 1, name: 'Fender Custom Shop American Custom', imageUrl: 'https://fast-images.static-thomann.de/pics/bdb/_52/525037/16988847_800.jpg', price: 850, isOnSale: true, quantityInCart: 2 },
    { id: 2, name: 'Gibson Les Paul', imageUrl: 'https://fast-images.static-thomann.de/pics/bdb/_59/591160/19286086_800.jpg', price: 2500, isOnSale: true, quantityInCart: 1 },
    { id: 3, name: 'Fender Kurt Cobain Jaguar', imageUrl:'https://fast-images.static-thomann.de/pics/bdb/_33/330952/8419411_800.jpg', price: 750, isOnSale: false, quantityInCart: 0 },
    { id: 4, name: 'Epiphone Casino Vintage Sunburst', imageUrl:'https://fast-images.static-thomann.de/pics/bdb/_56/568059/19102558_800.jpg', price: 649, isOnSale: false, quantityInCart: 0 } 
  ];



  // Método para obtener los artículos como observable
  getArticles(): Observable<Article[]> {
    return of(this.articles);
  }


  // Método para cambiar la cantidad en el carrito de un artículo
  changeQuantity(articleID:number, changeInQuantity: number):Observable<Article | null>{
    const article = this.articles.find(a => a.id === articleID);
    if (article) {
      article.quantityInCart += changeInQuantity;
      return of(article);
    }
    return of(null);
}

  // Método para agregar un nuevo artículo
  create(article: Article): Observable<any> {
    article.id = this.articles.length + 1; // Generar un ID simple
    this.articles.push(article);
    return of(article);
  }




}






