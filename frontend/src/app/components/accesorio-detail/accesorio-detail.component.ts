import { Component, OnInit } from '@angular/core';
import { Accesorio } from '../../interfaces/accesorios';
import { AccesoriosService } from '../../services/accesorios.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { CarritoGuitarrasService } from '../../services/carrito.service'; // Importamos el servicio del carrito
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accesorio-detail',
  standalone: true,
  imports: [CurrencyPipe, ImageModule],
  templateUrl: './accesorio-detail.component.html',
  styleUrls: ['./accesorio-detail.component.css'],
})
export class AccesorioDetailComponent implements OnInit {
  accesorio?: Accesorio;

  constructor(
    private route: ActivatedRoute,
    private accesoriosService: AccesoriosService,
    private carritoService: CarritoGuitarrasService  
  ) {}

  ngOnInit(): void {
    this.loadAccesorio();
  }

  loadAccesorio(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.accesoriosService.getAccesorio(id).subscribe({
        next: (data) => (this.accesorio = data),
        error: (err) => console.error('Error cargando accesorio:', err),
      });
    }
  }

  // Método para añadir al carrito
  addToCart(): void {
    if (this.accesorio) {
      this.carritoService.addToCart(this.accesorio); // Llamamos al servicio para añadir el accesorio al carrito
    }
  }
  showSuccessToast(nombre: string | undefined) {
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
      title: `${nombre || 'Producto desconocido'} añadido correctamente al carrito`
    });
  }
}
