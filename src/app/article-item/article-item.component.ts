import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article,ArticleQuantityChange } from '../models/articulo';


@Component({
  selector: 'app-article-item',
  standalone: true, 
  imports: [CommonModule], // Importa CommonModule para usar directivas como ngClass
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})


export class ArticleItemComponent {

  //Recibe el articulo como entrada
    @Input() article!: Article 

  // Emite los cambios de cantidad al padre
  @Output() quantityChange = new EventEmitter<ArticleQuantityChange>();

  getCssClass(): string {
    return this.article.isOnSale ? 'on-sale' : 'outOfStock';
  }


  increase() {
    this.quantityChange.emit({ articleId: this.article.id, newQuantity: this.article.quantityInCart + 1 });
  }

  decrease() {
    if (this.article.quantityInCart > 0) {
      this.quantityChange.emit({ articleId: this.article.id, newQuantity: this.article.quantityInCart - 1 });
    }
  }



}


