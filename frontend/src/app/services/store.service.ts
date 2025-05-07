import { Injectable } from '@angular/core';
import { GuitarrasService } from './guitarras.service';
import { Guitarra } from '../interfaces/guitarras';
import { max } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Store {
  guitarras: Guitarra[] = [];

  constructor(private readonly guitarraService: GuitarrasService) {
    this.guitarraService.getGuitarras().subscribe({
      next: (value) => {
        this.guitarras = value;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Guitarras cargadas');
      },
    });
  }

  minimo() {
    return Math.min(...this.guitarras.map((guitarra) => guitarra.price));
  }

  maximo() {
    return Math.max(...this.guitarras.map((guitarra) => guitarra.price));
  }

  filtrar() {
    return this.guitarras.filter(
      (guitarra) => guitarra.price >= this.minimo() && guitarra.price <= this.maximo()
    );
  }


}
