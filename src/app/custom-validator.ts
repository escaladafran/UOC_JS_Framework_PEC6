

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidator {

    static NameArticleValidator(forbiddenName: RegExp): ValidatorFn{

    return (control: AbstractControl): { [key: string]: any; } | null => {
           // Si el control no tiene valor, no hay que validarlo
    if (!control.value) {
        return null;
      }
  
      // Validación con la expresión regular
      const forbidden = forbiddenName.test(control.value.trim());
  
      // Si el nombre es prohibido, devolvemos el error
      return forbidden ? { forbidden: { value: control.value } } : null;
    };
  }



     static patterValidator(pattern:RegExp):ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null =>{
        if (!control.value) {
            return null; // No validamos si no hay valor (puedes modificar esto si es obligatorio)
          }
      
    // Verifica si el valor coincide con la expresión regular
    const valid = pattern.test(control.value);
    return valid ? null : { invalidPattern: { value: control.value } 
        };
    }
  }


}
