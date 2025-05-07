import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Offcanvas } from 'bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('offcanvas', { static: false }) offcanvas!: ElementRef;

  constructor(private router: Router) {}

  closeMenuAndNavigate(route: string) {
    // Cerrar el menú inmediatamente
    const offcanvasElement = this.offcanvas.nativeElement;
    const bsOffcanvas = Offcanvas.getInstance(offcanvasElement) || new Offcanvas(offcanvasElement);

    // Eliminar el fondo gris (backdrop) y restaurar el overflow del body
    const backdrop = document.querySelector('.offcanvas-backdrop');
    if (backdrop) {
      backdrop.remove(); // Eliminar el fondo gris
    }

    // Restaurar el overflow del body para permitir el scroll
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    // Cerrar el menú
    bsOffcanvas.hide();

    // Navegar al enlace que se hizo clic
    this.router.navigate([route]);
  }
}
