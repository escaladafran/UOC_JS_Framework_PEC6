import { Component} from '@angular/core';
import {Article} from '../models/articulo';
import { ArticleItemComponent } from '../article-item/article-item.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ArticleNewTemplateComponent } from '../article-new-template/article-new-template.component';
import { ArticleNewReactiveComponent } from '../article-new-reactive/article-new-reactive.component';
import { ArticleService } from '../../services/article-service.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [ArticleItemComponent, CommonModule, NavbarComponent, ArticleNewTemplateComponent, ArticleNewReactiveComponent],
  templateUrl: './article-list.component.html',
  styleUrls:['./article-list.component.css']
})


export class ArticleListComponent{
  //articles: Article[] = [];
  articles$!: Observable<Article[]> ; // Observable para usar async pipe
  currentView:string = 'inicio';


  constructor(private articleService:ArticleService){
      // Obtén los artículos directamente como un observable
      this.articles$ = this.articleService.getArticles();
  }


  onViewSelected(view:string){
  this.currentView = view;
 }





// Esta función manejará el cambio de cantidad
onQuantityChange(event: { articleId: number, newQuantity: number }): void {
  this.articleService.changeQuantity(event.articleId, event.newQuantity).subscribe(updatedArticle => {
    if (updatedArticle) {
      console.log('Quantity updated:', updatedArticle);
    }
  });
}

//función que devuelve el elemento que cambia del array
trackItemId(index: number, article: Article): number {
  return article.id;
}
}

