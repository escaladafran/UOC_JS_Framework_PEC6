import { Component } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomValidator } from '../../services/custom-validator';
import { Article } from '../models/articulo';
import { ArticleService } from '../../services/article-service.service';
import { HttpClientModule  } from '@angular/common/http';


@Component({
  selector: 'app-article-new-reactive',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,HttpClientModule],
  templateUrl: './article-new-reactive.component.html',
  styleUrl: './article-new-reactive.component.css'
})
export class ArticleNewReactiveComponent {

  myReactiveForm: FormGroup;  
  Filed: any;


//getters

  get articleName(){
    return this.myReactiveForm.get('articleName')
  }

  get articlePrice(){
    return this.myReactiveForm.get('articlePrice')
  }

  get imageUrl(){
    return this.myReactiveForm.get('imageUrl')
  }


   urlPattern =  /^https:\/\/www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}(\/[a-zA-Z0-9-_\/\.]+)\.(jpg|jpeg|png)$/;

   
  



constructor(private fb: FormBuilder, private articleService: ArticleService) {
    //Inicializamos el FormGroup en el constructor
    this.myReactiveForm = this.fb.group({
      articleName: ['',[Validators.required,CustomValidator.NameArticleValidator(/^(prueba|test|mock|fake)$/i)]],              
      articlePrice: [null,[Validators.required,Validators.min(0.1)]],           
      //imageUrl: ['',[Validators.required,Validators.pattern(this.urlPattern)]],   
      imageUrl:'',              
      isOnSale: [false]               
    
    });
  }


 // Método para enviar los datos al servidor
 onSubmit() {

  console.log('Formulario enviado:', this.myReactiveForm);


  if (this.myReactiveForm.valid) {
    const newArticle: Article = {
      id: 0, // Asignado por el servidor
      name: this.articleName?.value,
      price: this.articlePrice?.value,
      imageUrl: this.imageUrl?.value,
      isOnSale: this.myReactiveForm.value.isOnSale,
      quantityInCart: 0, // Por defecto
    };


    console.log('Datos a enviar:', newArticle);


    // Llamar al servicio para crear el artículo
    this.articleService.create(newArticle).subscribe({
      next: (response) => {
        console.log('Artículo creado:', response);
       
        this.myReactiveForm.reset(); // Resetea el formulario
      },
      error: (err) => {
        console.error('Error al crear el artículo:', err);
      },
    });
  } else {
    console.error('Formulario inválido');
    console.log('Estado de los controles:', this.myReactiveForm.controls);
  }
}


}