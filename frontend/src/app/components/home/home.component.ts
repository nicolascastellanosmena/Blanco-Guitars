import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Guitarra } from '../../interfaces/guitarras';
import { GuitarrasService } from '../../services/guitarras.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  guitarra: Guitarra[] = [];
  
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;

    constructor(private readonly guitarraService: GuitarrasService) {}
  
    ngOnInit(): void {
      this.loadGuitarras();
    }
    loadGuitarras() {
      this.guitarraService.getGuitarras().subscribe({
        next: (value) => {
          this.guitarra = value;
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.log('Guitarras cargadas');
        },
      });
    }

  onCanPlay() {
    this.videoElement.nativeElement.muted = true;
    this.videoElement.nativeElement.play();
  }

  // Manejar desplazamiento con la rueda del ratón
  onWheel(event: WheelEvent): void {
    event.preventDefault();
    const container = this.scrollContainer.nativeElement;
    container.scrollLeft += event.deltaY;
  }

  // Desplazamiento al hacer clic en el botón "Atrás"
  scrollBack(): void {
    const container = this.scrollContainer.nativeElement;
    container.scrollLeft -= 900;
  }

  // Desplazamiento al hacer clic en el botón "Siguiente"
  scrollNext(): void {
    const container = this.scrollContainer.nativeElement;
    container.scrollLeft += 900;
  }
}
