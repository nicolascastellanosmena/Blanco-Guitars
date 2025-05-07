import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Guitarra } from '../interfaces/guitarras';
import { Accesorio } from '../interfaces/accesorios';

type Producto = Guitarra | Accesorio;
type ProductoConCantidad = Producto & { cantidad: number };

@Injectable({
  providedIn: 'root',
})
export class CarritoGuitarrasService {
  private carrito = new BehaviorSubject<ProductoConCantidad[]>([]);
  private carritoPrice = new BehaviorSubject<number>(0);
  private carritoTotal = new BehaviorSubject<number>(0);

  carrito$ = this.carrito.asObservable();
  carritoPrice$ = this.carritoPrice.asObservable();
  carritoTotal$ = this.carritoTotal.asObservable();

  constructor() {}

  addToCart(producto: Producto) {
    const carritoActual = this.carrito.value;
    const existente = carritoActual.find(p => p._id === producto._id);

    let nuevoCarrito: ProductoConCantidad[];

    if (existente) {
      existente.cantidad += 1;
      nuevoCarrito = [...carritoActual];
    } else {
      const nuevoProducto: ProductoConCantidad = { ...producto, cantidad: 1 };
      nuevoCarrito = [...carritoActual, nuevoProducto];
    }

    this.carrito.next(nuevoCarrito);
    this.actualizarTotales(nuevoCarrito);
  }

  removeFromCart(producto: Producto) {
    let nuevoCarrito = this.carrito.value.map(p => {
      if (p._id === producto._id) {
        return { ...p, cantidad: p.cantidad - 1 };
      }
      return p;
    }).filter(p => p.cantidad > 0);

    this.carrito.next(nuevoCarrito);
    this.actualizarTotales(nuevoCarrito);
  }

  updateCantidad(productoId: string, nuevaCantidad: number) {
    const nuevoCarrito = this.carrito.value.map(p => {
      if (p._id === productoId) {
        return { ...p, cantidad: nuevaCantidad };
      }
      return p;
    });

    this.carrito.next(nuevoCarrito);
    this.actualizarTotales(nuevoCarrito);
  }

  private actualizarTotales(carrito: ProductoConCantidad[]) {
    const totalPrecio = carrito.reduce((acc, p) => acc + (p.price * p.cantidad), 0);
    const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);

    this.carritoPrice.next(totalPrecio);
    this.carritoTotal.next(totalItems);
  }
}
