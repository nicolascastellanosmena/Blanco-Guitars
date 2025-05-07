import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GuitarrasService } from '../../services/guitarras.service';
import { Guitarra } from '../../interfaces/guitarras';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-guitarra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-guitarra.component.html',
  styleUrl: './crear-guitarra.component.css',
})
export class CrearGuitarraComponent implements OnInit {
  @Input('id') id!: string;
  nuevaGuitarra: Partial <Guitarra> = {
    name: '',
    brand: '',
    type: '',
    price: 0,
    rating: 0,
    description: '',
    image: [],
  };

  imagen1: string = '';
  imagen2: string = '';
  imagen3: string = '';

  constructor(private guitarrasService: GuitarrasService) {}

  edit: boolean = false;

  ngOnInit(): void {
    if (this.id) {
      this.edit = true;
      this.guitarrasService.getGuitarra(this.id).subscribe({
        next: (value) => {
          this.nuevaGuitarra = value;
          this.imagen1 = value.image?.[0] || '';
          this.imagen2 = value.image?.[1] || '';
          this.imagen3 = value.image?.[2] || '';
        },
        error(err) {
          console.log(err);
        }
      });
    } else {
      this.edit = false;
    }
  }

  onSubmit(): void {
    this.nuevaGuitarra.image = [this.imagen1, this.imagen2, this.imagen3];
  
    if (this.id) {
      const ultimateGuitar: Guitarra = {
        ...this.nuevaGuitarra,
        _id: this.id
      } as Guitarra;
  
      this.guitarrasService.updateGuitarra(ultimateGuitar).subscribe({
        next: (res) => {
          console.log('Guitarra actualizada:', res);
          this.showSuccessModal(); // Mostramos el modal de éxito
        },
        error: (err) => {
          console.error('Error al actualizar la guitarra', err);
          alert('Error al actualizar la guitarra.');
        }
      });
    } else {
      this.guitarrasService.addGuitarra(this.nuevaGuitarra as Guitarra).subscribe({
        next: (res) => {
          console.log('Guitarra añadida:', res);
          this.showSuccessModal(); // Mostramos el modal de éxito
  
          // Limpiar los campos después de agregar la guitarra
          this.nuevaGuitarra = {
            name: '',
            brand: '',
            type: '',
            price: 0,
            rating: 0,
            description: '',
            image: [],
          };
          this.imagen1 = '';
          this.imagen2 = '';
          this.imagen3 = '';
        },
        error: (err) => {
          console.error('Error al crear la guitarra', err);
          alert('Error al crear la guitarra.');
        },
      });
    }
  }

  // Método para mostrar el modal de éxito
  showSuccessModal() {
    Swal.fire({
      title: '¡Guitarra agregada correctamente!',
      icon: 'success',
      draggable: true,
    }).then(() => {
      window.location.href = '/gestionGuitarras'; // Redirigir a la página de gestión de guitarras
    });
  }
}
