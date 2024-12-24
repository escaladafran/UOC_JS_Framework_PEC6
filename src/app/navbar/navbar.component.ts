import { Component, EventEmitter ,Output} from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  actualView:string ='inicio';

  @Output() viewSelected = new EventEmitter<string>();

  selectView(view:string){
    this.actualView = view;
    return this.viewSelected.emit(view);
  }


  // Controla si el menú está abierto o cerrado
  isMenuOpen: boolean = false;

  // Método para alternar el estado del menú
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }




}
