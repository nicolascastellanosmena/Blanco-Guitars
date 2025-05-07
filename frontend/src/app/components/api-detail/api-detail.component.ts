import { Component, OnInit } from '@angular/core';
import { GuitarrasService } from '../../services/guitarras.service';
import { ActivatedRoute } from '@angular/router';
import { Guitarra } from '../../interfaces/guitarras';
import { CarritoGuitarrasService } from '../../services/carrito.service'; // Importa el servicio
import { CurrencyPipe } from '@angular/common';
import { ImageModule } from 'primeng/image';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-api-detail',
  standalone: true,
  imports: [CurrencyPipe, ImageModule],
  templateUrl: './api-detail.component.html',
  styleUrls: ['./api-detail.component.css'],
})
export class ApiDetailComponent implements OnInit {
  guitarra?: Guitarra;
  currentImageIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private guitarrasService: GuitarrasService,
    private carritoService: CarritoGuitarrasService
  ) {}

  ngOnInit(): void {
    this.loadGuitarra();
  }

  loadGuitarra(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.guitarrasService.getGuitarra(id).subscribe({
        next: (data) => {
          this.guitarra = data;
        },
        error: (err) => console.error('Error cargando guitarra:', err),
      });
    }
  }

  changeImage(index: number): void {
    if (this.guitarra) {
      this.currentImageIndex = index;
    }
  }

  addToCart(): void {
    if (this.guitarra) {
      this.carritoService.addToCart(this.guitarra);
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
      title: `${nombre || 'Guitarra desconocida'} añadida correctamente al carrito`
    });
  }
  
}
