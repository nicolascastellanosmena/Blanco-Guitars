import { Component, OnInit } from '@angular/core';
import { GuitarrasService } from '../../services/guitarras.service';
import { Guitarra } from '../../interfaces/guitarras';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-guitarras',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, CommonModule, FormsModule],
  templateUrl: './gestion-guitarras.component.html',
  styleUrl: './gestion-guitarras.component.css'
})
export class GestionGuitarrasComponent implements OnInit {
  guitarra: Guitarra[] = [];
  currentImage: number[] = [];

  constructor(private readonly guitarraService: GuitarrasService) {}

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

  deleteGuitarra(id: string) {
    const guitarraAEliminar = this.guitarra.find((g) => g._id === id);
    if (!guitarraAEliminar) return;

    Swal.fire({
      title: `¿Eliminar guitarra "${guitarraAEliminar.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745',   
      cancelButtonColor: '#dc3545',  
    }).then((result) => {
      if (result.isConfirmed) {
        this.guitarraService.deleteGuitarra(id).subscribe({
          next: () => {
            this.guitarra = this.guitarra.filter((g) => g._id !== id);
            this.showSuccessToast(`"${guitarraAEliminar.name}" eliminada correctamente`);
          },
          error: (err) => {
            console.error('Error al eliminar guitarra:', err);
            Swal.fire('Error', 'No se pudo eliminar la guitarra.', 'error');
          },
        });
      }
      // Si se pulsa "Cancelar", no hace falta hacer nada
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
