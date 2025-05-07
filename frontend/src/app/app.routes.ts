import { AccesoriosListComponent } from './components/accesorios-list/accesorios-list.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ApiListComponent } from './components/api-list/api-list.component';
import { ApiDetailComponent } from './components/api-detail/api-detail.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ContactComponent } from './components/contact/contact.component';
import { FAQComponent } from './components/faq/faq.component';
import { TerminosComponent } from './components/terminos/terminos.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccesorioDetailComponent } from './components/accesorio-detail/accesorio-detail.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { GestionProductosComponent } from './components/gestion-productos/gestion-productos.component';
import { GestionGuitarrasComponent } from './components/gestion-guitarras/gestion-guitarras.component';
import { GestionAccesoriosComponent } from './components/gestion-accesorios/gestion-accesorios.component';
import { CrearGuitarraComponent } from './components/crear-guitarra/crear-guitarra.component';
import { CrearAccesorioComponent } from './components/crear-accesorio/crear-accesorio.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio',
  },
  {
    path: 'inicio',
    title: 'Inicio',
    component: HomeComponent,
  },
  {
    path: 'guitarras',
    title: 'Guitarras',
    component: ApiListComponent,
  },
  {
    path: 'accesorios',
    title: 'Accesorios',
    component: AccesoriosListComponent,
  },
  {
    path: 'producto/:id',
    title: 'Información de la guitarra',
    component: ApiDetailComponent,
  },
  {
    path: 'articulo/:id',
    title: 'Información del accesorio',
    component: AccesorioDetailComponent,
  },
  {
    path: 'contacto',
    title: 'Contacto',
    component: ContactComponent,
  },
  {
    path: 'faq',
    title: 'Preguntas Frecuentes',
    component: FAQComponent,
  },
  {
    path: 'terminos-y-condiciones',
    title: 'Términos y Condiciones',
    component: TerminosComponent,
  },
  {
    path: 'sobrenosotros',
    title: 'Sobre Nosotros',
    component: AboutusComponent,
  },
  {
    path: 'login',
    title: 'Iniciar Sesión',
    component: LoginComponent,
  },
  {
    path: 'registro',
    title: 'Regístrate',
    component: RegisterComponent,
  },
  {
    path: 'checkout',
    title: 'Pago',
    component: CheckoutComponent,
  },
  {
    path: 'asistente-virtual',
    title: 'Asistente Virtual',
    component: ChatbotComponent,
  },
  {
    path: 'carrito',
    title: 'Carrito',
    component: CarritoComponent,
  },
  {
    path: 'gestion',
    title: 'Gestionar Productos',
    component: GestionProductosComponent,
  },
  {
    path: 'gestionGuitarras',
    title: 'Gestionar Guitarras',
    component: GestionGuitarrasComponent,
  },
  {
    path: 'addGuitarra',
    title: 'Añadir Guitarras',
    component: CrearGuitarraComponent,
  },
  {
    path: 'editGuitarra/:id',
    title: 'Editar Guitarra',
    component: CrearGuitarraComponent,
  },
  {
    path: 'gestionAccesorios',
    title: 'Gestionar Accesorios',
    component: GestionAccesoriosComponent,
  },
  {
    path: 'addAccesorio',
    title: 'Añadir Accesorio',
    component: CrearAccesorioComponent,
  },
  {
    path: 'editAccesorio/:id',
    title: 'Editar Accesorio',
    component: CrearAccesorioComponent,
  },
  {
    path: '**',
    title: 'Página No Encontrada',
    component: PagenotfoundComponent,
  },
];
