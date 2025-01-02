import { Component, OnInit} from '@angular/core';
import {Article, ArticleQuantityChange} from '../models/articulo';
import { ArticleItemComponent } from '../article-item/article-item.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ArticleNewTemplateComponent } from '../article-new-template/article-new-template.component';
import { ArticleNewReactiveComponent } from '../article-new-reactive/article-new-reactive.component';
import { ArticleService } from '../../services/article-service.service';
//import { Observable } from 'rxjs/internal/Observable';
import { HttpClientModule  } from '@angular/common/http';


@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [ArticleItemComponent, CommonModule, NavbarComponent, ArticleNewTemplateComponent, ArticleNewReactiveComponent, HttpClientModule ],
  templateUrl: './article-list.component.html',
  styleUrls:['./article-list.component.css']
})


export class ArticleListComponent implements OnInit{
  articles: Article[] = []; //Lista de articulos obtenidos del servidor
  // articles$!: Observable<Article[]> ; // Observable para usar async pipe

   searchString: string = ''; //string buscado
   currentView:string = 'inicio';


  constructor(private articleService:ArticleService){}
  ngOnInit(): void {
    this.fetchArticles(); // Llama al método que obtiene los artículos
  }


  //Para mostrar la pagina inicial
  onViewSelected(view:string){
  this.currentView = view;
 }


// Obtener artículos desde el servicio
fetchArticles(query: string = ''): void {
  this.articleService.getArticles(query).subscribe({
    next: (articles) => {
      this.articles = articles;
    },
    error: (err) => {
      console.error('Error al obtener los artículos:', err);
    },
  });
}

// Manejar búsqueda
onSearch(event: Event): void {
  const inputElement = event.target as HTMLInputElement; // para asegurar que es un InputElement
  this.searchString = inputElement.value;  // Obtén el valor del input
  this.fetchArticles(this.searchString);  // Actualiza la lista de artículos con el término de búsqueda
}

 onQuantityChange(change: ArticleQuantityChange) {
  const { articleId, newQuantity } = change;

  // Calcular el cambio en cantidad relativo
  const currentArticle = this.articles.find((a) => a.id === articleId);
  if (!currentArticle) {
    console.error('Artículo no encontrado:', articleId);
    return;
  }

   // Calcular el cambio relativo en cantidad
  const changeInQuantity = newQuantity - currentArticle.quantityInCart;

  // Llamar al servicio para actualizar la cantidad en el servidor
  this.articleService.changeQuantity(articleId, changeInQuantity).subscribe({
    //'next' se ejecuta si la solicitud PATCH HTTP se resuelve con exito
    //'updatedArticle'  Es el articulo devuelto por el servidor después de actualizar el artículo
    next: (response) => {
      console.log(response.msg)

     // Actualiza la cantidad local del artículo
      currentArticle.quantityInCart = newQuantity;
     
    },
    error: (err) => {
      console.error('Error actualizando cantidad:', err);
    },
  });
}

         
//función que devuelve el elemento que cambia del array
trackItemId(index: number, article: Article): number {
  return article.id;
}





}








