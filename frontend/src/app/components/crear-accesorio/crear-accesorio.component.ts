import { Component, Input, OnInit } from '@angular/core';
import { AccesoriosService } from '../../services/accesorios.service';
import { Accesorio } from '../../interfaces/accesorios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-accesorio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-accesorio.component.html',
  styleUrls: ['./crear-accesorio.component.css'],
})
export class CrearAccesorioComponent implements OnInit {
  @Input('id') id!: string;

  // Inicializamos el objeto para nuevo accesorio
  nuevaAccesorio: Partial<Accesorio> = {
    name: '',
    price: 0,
    rating: 0,
    description: '',
    image: '',
  };

  edit: boolean = false;
  imagen1: string = '';

  constructor(private accesoriosService: AccesoriosService) {}

  ngOnInit(): void {
    if (this.id) {
      this.edit = true;
      this.accesoriosService.getAccesorio(this.id).subscribe({
        next: (value) => {
          this.nuevaAccesorio = value;
          this.imagen1 = value.image || '';
        },
        error(err) {
          console.error(err);
        },
      });
    } else {
      this.edit = false;
    }
  }

  onSubmit(): void {
    this.nuevaAccesorio.image = this.imagen1;

    if (this.id) {
      const updatedAccesorio: Accesorio = {
        ...this.nuevaAccesorio,
        _id: this.id,
      } as Accesorio;

      this.accesoriosService.updateAccesorio(updatedAccesorio).subscribe({
        next: (res) => {
          console.log('Accesorio actualizado:', res);
          this.showSuccessModal(); // Mostrar el modal de éxito
        },
        error: (err) => {
          console.error('Error al actualizar el accesorio', err);
          alert('Error al actualizar el accesorio.');
        },
      });
    } else {
      this.accesoriosService.addAccesorio(this.nuevaAccesorio as Accesorio).subscribe({
        next: (res) => {
          console.log('Accesorio añadido:', res);
          this.showSuccessModal(); // Mostrar el modal de éxito

          // Limpiar los campos después de agregar el accesorio
          this.nuevaAccesorio = {
            name: '',
            price: 0,
            rating: 0,
            description: '',
            image: '',
          };
          this.imagen1 = '';
        },
        error: (err) => {
          console.error('Error al crear el accesorio', err);
          alert('Error al crear el accesorio.');
        },
      });
    }
  }
  showSuccessModal() {
    Swal.fire({
      title: '¡Accesorio agregado correctamente!',
      icon: 'success',
      draggable: true,
    }).then(() => {
      window.location.href = '/gestionAccesorios'; 
    });
  }
}
