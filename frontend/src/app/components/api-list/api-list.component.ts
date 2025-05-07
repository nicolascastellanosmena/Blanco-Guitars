import { Store } from './../../services/store.service';
import { Component, OnInit, inject } from '@angular/core';
import { GuitarrasService } from '../../services/guitarras.service';
import { Guitarra } from './../../interfaces/guitarras';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CarritoGuitarrasService } from '../../services/carrito.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatSliderModule } from '@angular/material/slider';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-api-list',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, FaIconComponent, MatSliderModule],
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.css'],
})
export class ApiListComponent implements OnInit {
  guitarra: Guitarra[] = [];
  currentImage: number[] = [];

  private readonly carritoService = inject(CarritoGuitarrasService);

  faCartShopping = faCartShopping;

  constructor(
    private readonly guitarraService: GuitarrasService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.loadGuitarras();
  }

  loadGuitarras() {
    this.guitarraService.getGuitarras().subscribe({
      next: (value) => {
        this.guitarra = value;
        this.currentImage = value.map(() => 0);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Guitarras cargadas');
      },
    });
  }

  changeImage(direction: string, guitar: Guitarra) {
    const index = this.guitarra.indexOf(guitar);
    if (direction === 'next') {
      this.currentImage[index] =
        (this.currentImage[index] + 1) % guitar.image.length;
    } else if (direction === 'prev') {
      this.currentImage[index] =
        (this.currentImage[index] - 1 + guitar.image.length) %
        guitar.image.length;
    }
  }

 
  addToCart(guitar: Guitarra) {
    this.carritoService.addToCart(guitar);
  }

  scrollToGuitarras() {
    const guitarsSection = document.getElementById('guitarras-section');
    if (guitarsSection) {
      guitarsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  formatLabel(value: number): string {
    if (value > 1000) {
      return value + 'k' + '€';
    } else {
      return value + '€';
    }
  }

  minimo() {
    return this.store.minimo();
  }
  maximo() {
    return this.store.maximo();
  }
  
  onChange() {
    const min = this.minimo();
    const max = this.maximo();
  
    this.guitarra = this.store.guitarras.filter(guitarra => 
      guitarra.price >= min && guitarra.price <= max
    );
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
