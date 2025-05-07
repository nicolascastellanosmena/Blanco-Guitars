import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guitarra } from '../interfaces/guitarras';

@Injectable({
  providedIn: 'root',
})
export class GuitarrasService {
  private readonly http: HttpClient = inject(HttpClient);
  constructor() {}
  private readonly URL = 'http://localhost:3000/guitarras/';

  getGuitarras(): Observable<Guitarra[]> {
    //Mostrar guitarras
    return this.http.get<Guitarra[]>(this.URL);
  }

  getGuitarra(id: string): Observable<Guitarra> {
    //Mostrar una guitarra
    return this.http.get<Guitarra>(this.URL + id);
  }

  addGuitarra(guitarra: Guitarra): Observable<Guitarra> {
    //Añadir una guitarra
    return this.http.post<Guitarra>(this.URL, guitarra);
  }

  updateGuitarra(guitarra: Guitarra): Observable<Guitarra> {
    //Modificar una guitarra
    return this.http.patch<any>(this.URL + guitarra._id, guitarra);
  }

  deleteGuitarra(id: string): Observable<Guitarra> {
    //Eliminar una guitarra
    return this.http.delete<Guitarra>(this.URL + id);
  }

  
}
