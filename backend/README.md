# 🧠 Blanco Guitars – Backend

> [!NOTE]  
> Este repositorio contiene la **parte backend** del proyecto **Blanco Guitars**, desarrollado con **NestJS**. Proporciona la API necesaria para gestionar las guitarras y accesorios de la tienda online de guitarras eléctricas artesanales hechas en Valencia. Su contenido queda guardado en http://localhost:3000/guitarras y http://localhost:3000/accesorios

---

## 🚀 Inicio rápido

> ℹ️ El servidor se ejecuta localmente en [`http://localhost:3000`](http://localhost:3000)

### ✅ Requisitos previos

> [!WARNING]  
- Node.js instalado
- Nest CLI (`npm install -g @nestjs/cli`)
- MongoDB en ejecución 

### ▶️ Iniciar servidor

> [!NOTE]  
> Desplegar el servidor con el comando nest start


## Añadir una guitarra con HTTPie

> [!WARNING]
> Para poder incluir una guitarra o accesorio desde HTTPie, sigue este ejemplo:

Guitarra:
```json
{
  "name": "Blanco Prueba",
  "brand": "Blanco Guitars",
  "type": "Guitarra Eléctrica 6 Cuerdas",
  "price": 150,
  "rating": 2,
  "description": "Guitarra eléctrica de 7 cuerdas con un diseño impresionante que combina una textura lila suave con la riqueza visual de la madera tigrada oscura. Esto es una prueba.",
  "image": [
    "https://i.postimg.cc/WNZmFqmh/1.png",
    "https://i.postimg.cc/ZY76XP4s/2.png",
    "https://i.imghippo.com/files/ZQW7961LU.png"
  ]
}

Accesorio:
```json

{
  "name": "Pedal naranja",
  "price": 158.00,
  "rating": 4,
  "description": "Pedal guitarra.",
  "image": "https://i.postimg.cc/hjkM2Zcf/81-XIEGNB2x-L-AC-SL1500-removebg-preview.png"
}