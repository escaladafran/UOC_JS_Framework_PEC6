import { Component } from '@angular/core';
import {Article} from '../models/articulo';
import { ArticleItemComponent } from '../article-item/article-item.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ArticleNewTemplateComponent } from '../article-new-template/article-new-template.component';
import { ArticleNewReactiveComponent } from '../article-new-reactive/article-new-reactive.component';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [ArticleItemComponent, CommonModule, NavbarComponent, ArticleNewTemplateComponent, ArticleNewReactiveComponent],
  templateUrl: './article-list.component.html',
  styleUrls:['./article-list.component.css']
})


export class ArticleListComponent {
  articles: Article[] = [
    { id: 1, name: 'Fender Custom Shop American Custom', imageUrl: 'https://fast-images.static-thomann.de/pics/bdb/_52/525037/16988847_800.jpg', price: 850, isOnSale: true, quantityInCart: 2 },
    { id: 2, name: 'Gibson Les Paul', imageUrl: 'https://fast-images.static-thomann.de/pics/bdb/_59/591160/19286086_800.jpg', price: 2500, isOnSale: true, quantityInCart: 1 },
    { id: 3, name: 'Fender Kurt Cobain Jaguar', imageUrl:'https://fast-images.static-thomann.de/pics/bdb/_33/330952/8419411_800.jpg', price: 750, isOnSale: false, quantityInCart: 0 },
    { id: 4, name: 'Epiphone Casino Vintage Sunburst', imageUrl:'https://fast-images.static-thomann.de/pics/bdb/_56/568059/19102558_800.jpg', price: 649, isOnSale: false, quantityInCart: 0 }
  ];

  currentView:string = 'inicio';

 
  onViewSelected(view:string){
  this.currentView = view;
 }


// Esta función manejará el cambio de cantidad
onQuantityChange(event: { articleId: number, newQuantity: number }) {
  const article = this.articles.find(a => a.id === event.articleId);
  if (article) {
    article.quantityInCart = event.newQuantity;
  }
}

//función que devuelve el elemento que cambia del array
trackItemId(index: number, article: Article): number {
  return article.id;
}


}