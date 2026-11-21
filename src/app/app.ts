import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

// La interfaz comprueba la estructura del producto durante el desarrollo.
export interface Producto {
  nombre: string;
  precio: number;
  disponible: boolean;
}

@Component({
  selector: 'app-root',
  imports: [DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  nombreTienda: string = 'Lizzy Store';
  encargado: string = 'Lizbeth Cruz Choque';
  numeroSucursal: number = 1;
  tiendaAbierta: boolean = true;
  categorias: string[] = ['Mochilas', 'Cuadernos', 'Accesorios'];

  producto: Producto = {
    nombre: 'Mochila Aurora',
    precio: 189.90,
    disponible: true,
  };
}
