import { Component, OnInit } from '@angular/core';
import { Accesorio } from '../../interfaces/accesorios';
import { AccesoriosService } from '../../services/accesorios.service';
import { CarritoGuitarrasService } from '../../services/carrito.service'; // Importamos el servicio del carrito
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accesorios-list',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, FaIconComponent],
  templateUrl: './accesorios-list.component.html',
  styleUrls: ['./accesorios-list.component.css'],
})
export class AccesoriosListComponent implements OnInit {
  accesorio: Accesorio[] = [];
  faCartShopping = faCartShopping;

  constructor(
    private readonly accesorioService: AccesoriosService,
    private readonly carritoService: CarritoGuitarrasService
  ) {}

  ngOnInit(): void {
    this.loadAccesorios();
  }

  loadAccesorios() {
    this.accesorioService.getAccesorios().subscribe({
      next: (value) => {
        this.accesorio = value;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Accesorios cargados');
      },
    });
  }

  addToCart(producto: Accesorio) {
    this.carritoService.addToCart(producto);  
  }

  scrollToAccesorios() {
    const accesorySection = document.getElementById('accesorios-section');
    if (accesorySection) {
      accesorySection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  showSuccessToast(nombre: string) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#4caf50',
        color: '#fff',
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
    
      Toast.fire({
        icon: 'success',
        title: `${nombre} añadido correctamente al carrito`
      });
    }
}
