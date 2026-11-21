# Práctica: presentación de un producto en Angular

**Estudiante:** Lizbeth Cruz Choque · **GitHub:** lizzy-sys

Una ficha de producto para **Lizzy Store**, una tienda ficticia de artículos para estudiar y llevar a diario. Presenta la **Mochila Aurora**, su precio en bolivianos, la disponibilidad, las categorías y la información de la sucursal. Es una práctica de presentación de datos; no procesa compras.

## Ejecutar

Requisitos: Node.js 24.21.0 (o una versión compatible con Angular 21) y npm.

```bash
npm ci
npm start
```

Abrir `http://localhost:4200/`. Los cambios guardados en los archivos fuente se reflejan en el navegador.

```bash
npm test -- --watch=false
npm run build
```

La compilación de producción queda en `dist/practica-angular-producto/browser/`.

## Requisitos implementados

| Requisito | Implementación |
| --- | --- |
| Datos en la clase App | `src/app/app.ts`: `nombreTienda: string`, `encargado: string`, `numeroSucursal: number`, `tiendaAbierta: boolean` y `categorias: string[]` |
| Interfaz antes de @Component | `Producto`: `nombre: string`, `precio: number`, `disponible: boolean` |
| Objeto tipado | `producto: Producto` en App |
| Mostrar datos | Interpolación `{{ }}` en `src/app/app.html` |
| Tienda abierta o cerrada | `@if (tiendaAbierta)` y `@else` |
| Categorías en una lista | `<ul>` y `@for` con un `<li>` por categoría |
| Nombre, precio y disponibilidad | Interpolación y `@if (producto.disponible)` |
| Cuatro cambios de comprobación | Pasos de abajo y pruebas de renderizado en `src/app/app.spec.ts` |
| Cinco respuestas teóricas | Sección Respuestas |

## Comprobación de los cambios

Con `npm start` en ejecución, editar **`src/app/app.ts`**, guardar y observar la página después de cada cambio:

1. Cambiar `tiendaAbierta: boolean = true` a `false`: debe aparecer **Tienda cerrada**.
2. Cambiar `disponible: true` a `false` en producto: debe aparecer **Producto agotado**.
3. Agregar `'Papelería'` al final de categorias: deben aparecer **cuatro categorías**.
4. Cambiar el nombre a `'Mochila Aurora Plus'` y el precio a `229.50`: deben aparecer **Mochila Aurora Plus** y **Bs 229.50**.

El estado modificado queda así:

```typescript
tiendaAbierta: boolean = false;
categorias: string[] = ['Mochilas', 'Cuadernos', 'Accesorios', 'Papelería'];
producto: Producto = {
  nombre: 'Mochila Aurora Plus',
  precio: 229.50,
  disponible: false,
};
```

La entrega conserva el estado inicial: tienda abierta, producto disponible, tres categorías y precio de Bs 189.90. Las pruebas verifican cada cambio y la independencia de los estados de la tienda y del producto.

## Respuestas

### 1. ¿Qué función cumple @Component?

Es el decorador que indica a Angular que una clase representa un componente de la interfaz. Aquí conecta la clase App con su plantilla `app.html`, sus estilos `app.css` y el selector `app-root`, que se coloca en `index.html`.

### 2. ¿Para qué sirve la interfaz Producto?

Define la forma que debe tener un producto: un nombre string, un precio number y una disponibilidad boolean. Al declarar `producto: Producto`, TypeScript avisa si falta una propiedad o si se asigna un tipo incorrecto. Ayuda durante el desarrollo; no valida por sí sola datos externos al ejecutar la aplicación.

### 3. ¿Qué hace {{ }}?

Realiza una interpolación: evalúa una expresión de la clase y muestra su resultado como texto. Por ejemplo, `{{ nombreTienda }}` muestra Lizzy Store. Cuando Angular detecta un cambio en ese dato, actualiza el texto. Para el precio también se usa DecimalPipe para mostrar siempre dos decimales.

### 4. ¿Qué diferencia existe entre @if y @for?

`@if` elige qué contenido mostrar según una condición: aquí muestra Tienda abierta o Tienda cerrada. `@for` repite una parte de la plantilla por cada elemento de una colección: aquí crea un elemento de lista por categoría. Se usa `track $index` porque esta lista sencilla solo se modifica al final y no necesita reordenar elementos.

### 5. ¿Por qué tiendaAbierta utiliza el tipo boolean?

Porque representa dos estados: true significa abierta y false significa cerrada. Así puede usarse directamente como condición de @if, sin comparar textos como sí o no.

## Estructura

```text
public/mochila.svg        Ilustración propia del producto
src/app/app.ts           Datos tipados e interfaz Producto
src/app/app.html         Interpolación y bloques @if / @for
src/app/app.css          Diseño adaptable a móvil y escritorio
src/app/app.spec.ts       Comprobaciones de la práctica
src/styles.css           Estilos globales
```

## Referencias

- [Instalación de Angular](https://angular.dev/installation)
- [Control de flujo](https://angular.dev/guide/templates/control-flow)
- [Interpolación](https://angular.dev/guide/templates/binding)

El proyecto usa Angular CLI 21 y TypeScript. `package-lock.json` fija las versiones instaladas para reproducir la entrega con `npm ci`.
