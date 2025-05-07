import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CarritoGuitarrasService } from '../../services/carrito.service';
import { Guitarra } from '../../interfaces/guitarras';
import { Accesorio } from '../../interfaces/accesorios';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2'; // Asegúrate de tener SweetAlert2 instalado

type Producto = (Guitarra | Accesorio) & { cantidad: number };

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterModule, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  carrito: Producto[] = [];
  precioTotal: number = 0;

  constructor(private carritoService: CarritoGuitarrasService, private router: Router) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(productos => {
      this.carrito = productos;
    });

    this.carritoService.carritoPrice$.subscribe(precio => {
      this.precioTotal = precio;
    });
  }

  getTotalItems(): number {
    return this.carrito.reduce((total, producto) => total + producto.cantidad, 0);
  }
  
  mostrarAlerta() {
    
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('form input');
  
    let hayVacios = false;
  
    inputs.forEach(input => {
      if (!input.value.trim()) {
        hayVacios = true;
      }
    });
  
    if (hayVacios) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, rellena todos los campos antes de continuar.',
        confirmButtonColor: '#d33'
      });
      return;
    }
  
    
    Swal.fire({
      icon: 'success',
      title: '¡Felicidades!',
      text: 'Has hecho tu compra en Blanco Guitars.',
      confirmButtonText: 'Volver al inicio',
      confirmButtonColor: '#3085d6',
    }).then(() => {
      
      window.location.href = '/inicio';  
    });
  }
  
}
