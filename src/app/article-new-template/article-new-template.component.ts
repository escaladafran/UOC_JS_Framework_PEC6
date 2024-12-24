import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Article} from '../models/articulo';



@Component({
  selector: 'app-article-new-template',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './article-new-template.component.html',
  styleUrls: ['./article-new-template.component.css']
})





export class ArticleNewTemplateComponent {

  //No usamos el constructor ya que declaramos Article como una interfaz y no como una clase
  article: Article ={
    id:0,
    name: '',
    imageUrl: '',
    price: null,
    isOnSale: false,
    quantityInCart: 0 ,
  }; 





//metodo para mostrar por consola el objeto json 
toConsole(userForm:any) {

  if(userForm.valid){
    this.article = userForm.value.article; //'queda unido a la plantilla mediante la directiva ngModelGroup : <div ngModelGroup="article">
    console.log('Article object:', this.article);
  }else{
      console.error('Article is in invalid state');
  }

}

}
