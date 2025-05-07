import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Accesorio, Accesorios } from '../interfaces/accesorios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccesoriosService {
 private readonly http: HttpClient = inject(HttpClient);
   constructor() {}
   private readonly URL = 'http://localhost:3000/accesorios/';
 
   getAccesorios(): Observable<Accesorio[]> {
     //Mostrar accesorios
     return this.http.get<Accesorio[]>(this.URL);
   }
 
   getAccesorio(id: string): Observable<Accesorio> {
     //Mostrar un accesorio
     return this.http.get<Accesorio>(this.URL + id);
   }
 
   addAccesorio(accesorio: Accesorio): Observable<Accesorio> {
     //Añadir un accesorio
     return this.http.post<Accesorio>(this.URL, accesorio);
   }
 
   updateAccesorio(accesorio: Accesorio): Observable<Accesorio> {
     //Modificar un accesorio
     return this.http.patch<any>(this.URL + accesorio._id, accesorio);
   }
 
   deleteAccesorio(id: string): Observable<Accesorio> {
     //Eliminar un accesorio
     return this.http.delete<Accesorio>(this.URL + id);
   }
}
