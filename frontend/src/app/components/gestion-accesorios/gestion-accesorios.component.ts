import { Component, OnInit } from '@angular/core';
import { Accesorio } from './../../interfaces/accesorios';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccesoriosService } from '../../services/accesorios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-accesorios',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, CommonModule, FormsModule],
  templateUrl: './gestion-accesorios.component.html',
  styleUrl: './gestion-accesorios.component.css'
})
export class GestionAccesoriosComponent implements OnInit {
  accesorio: Accesorio[] = [];
  currentImage: number[] = [];

  constructor(private readonly accesorioService: AccesoriosService) {}

  ngOnInit(): void {
    this.loadAccesorios();
  }

  loadAccesorios() {
    this.accesorioService.getAccesorios().subscribe({
      next: (value) => {
        this.accesorio = value;
        this.currentImage = value.map(() => 0);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Accesorios cargados');
      },
    });
  }

  deleteAccesorio(id: string) {
    const accesorioAEliminar = this.accesorio.find((a) => a._id === id);
    if (!accesorioAEliminar) return;

    Swal.fire({
      title: `¿Eliminar accesorio "${accesorioAEliminar.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745', // Verde
      cancelButtonColor: '#dc3545', // Rojo
    }).then((result) => {
      if (result.isConfirmed) {
        this.accesorioService.deleteAccesorio(id).subscribe({
          next: () => {
            this.accesorio = this.accesorio.filter((a) => a._id !== id);
            this.showSuccessToast(`"${accesorioAEliminar.name}" eliminado correctamente`);
          },
          error: (err) => {
            console.error('Error al eliminar accesorio:', err);
            Swal.fire('Error', 'No se pudo eliminar el accesorio.', 'error');
          },
        });
      }
    });
  }

  private showSuccessToast(message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      iconColor: '#28a745',
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: 'success',
      title: message,
    });
  }
}
