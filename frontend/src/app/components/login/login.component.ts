import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'; // Asegúrate de tener SweetAlert2 instalado
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ''; // Para almacenar el email
  password: string = ''; // Para almacenar la contraseña
  errorMessage: string = ''; // Para almacenar cualquier mensaje de error

  constructor(private authService: AuthService) {}

  onLogin(): void {
    // Verificar si los campos están vacíos
    if (!this.username || !this.password) {
      Swal.fire({
        title: '¡Atención!',
        text: 'Rellena todos los campos',
        icon: 'warning',
      });
      return; // Detener la ejecución si los campos están vacíos
    }

    // Llamar al servicio de autenticación para hacer el login
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Almacenar el token en el almacenamiento local (localStorage o sessionStorage)
        localStorage.setItem('jwtToken', response.access_token);
        console.log('Login exitoso', response);

        // Mostrar un modal de éxito con redirección
        Swal.fire({
          title: 'Bienvenido!',
          text: 'Inicio de sesión exitoso',
          icon: 'success',
        }).then(() => {
          // Redirigir a /gestion después de cerrar el modal
          window.location.href = '/gestion'; // Redirigir a la página de gestión
        });
      },
      error: (err) => {
        console.error('Error de autenticación', err);
        this.errorMessage = 'Usuario o contraseña incorrectos';

        // Mostrar el modal de error si las credenciales son incorrectas
        Swal.fire({
          title: 'Error',
          text: this.errorMessage,
          icon: 'error',
        });
      }
    });
  }
}
