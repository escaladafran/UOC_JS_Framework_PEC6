import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {

  //ruta de la iamgen por defecto 
  private defaultImageUrl = '../assets/images/default.png'


  transform(value: string | null): string {
  //si la cadena esta vacía devuelve la ruta por defecto 
   if(!value || value.trim() === ''){
    return this.defaultImageUrl;
   }
   //si no devuleve la url del recurso
   return value
  }

}
