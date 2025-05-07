import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { Guitarra } from '../../interfaces/guitarras';
import { Accesorio } from '../../interfaces/accesorios';
import { CarritoGuitarrasService } from '../../services/carrito.service';
import { RouterLink } from '@angular/router';

type Producto = (Guitarra | Accesorio) & { cantidad: number };

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  cart: boolean = false;
  private readonly carritoService = inject(CarritoGuitarrasService);
  productos: Producto[] = [];
  productPrice = 0;

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe((productos) => {
      this.productos = productos;
      this.cart = productos.length > 0;
    });

    this.carritoService.carritoPrice$.subscribe((price) => {
      this.productPrice = price;
    });
  }

  removeFromCart(producto: Producto) {
    this.carritoService.removeFromCart(producto);
  }

  actualizarCantidad(producto: Producto, nuevaCantidad: number) {
    const cantidad = Number(nuevaCantidad);
    if (cantidad < 1) return;

    producto.cantidad = cantidad;
    this.carritoService.updateCantidad(producto._id, cantidad);
  }
}
