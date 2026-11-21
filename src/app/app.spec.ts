import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('Presentación del producto', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  function preparar() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    return { fixture, app: fixture.componentInstance, page: fixture.nativeElement as HTMLElement };
  }

  it('presenta los datos y estados iniciales', () => {
    const { page } = preparar();
    expect(page.textContent).toContain('Lizzy Store');
    expect(page.textContent).toContain('Lizbeth Cruz Choque');
    expect(page.textContent).toContain('Sucursal 1');
    expect(page.querySelector('[data-testid="producto-nombre"]')?.textContent).toBe('Mochila Aurora');
    expect(page.querySelector('[data-testid="producto-precio"]')?.textContent).toContain('189.90');
    expect(page.querySelector('[data-testid="tienda-estado"]')?.textContent).toContain('Tienda abierta');
    expect(page.querySelector('[data-testid="producto-estado"]')?.textContent).toContain('Producto disponible');
    expect(page.querySelectorAll('[data-testid="categorias"] li')).toHaveLength(3);
  });

  it('muestra Tienda cerrada cuando tiendaAbierta es false', () => {
    const { fixture, app, page } = preparar();
    app.tiendaAbierta = false;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    const text = page.querySelector('[data-testid="tienda-estado"]')?.textContent;
    expect(text).toContain('Tienda cerrada');
    expect(text).not.toContain('Tienda abierta');
  });

  it('muestra Producto agotado cuando disponible es false', () => {
    const { fixture, app, page } = preparar();
    app.producto.disponible = false;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    const text = page.querySelector('[data-testid="producto-estado"]')?.textContent;
    expect(text).toContain('Producto agotado');
    expect(text).not.toContain('Producto disponible');
  });

  it('muestra la cuarta categoría al agregarla al arreglo', () => {
    const { fixture, app, page } = preparar();
    app.categorias.push('Papelería');
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    const items = page.querySelectorAll('[data-testid="categorias"] li');
    expect(items).toHaveLength(4);
    expect(items[3].textContent).toContain('Papelería');
  });

  it('actualiza el nombre y el precio del producto', () => {
    const { fixture, app, page } = preparar();
    app.producto.nombre = 'Mochila Aurora Plus';
    app.producto.precio = 229.50;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    expect(page.querySelector('[data-testid="producto-nombre"]')?.textContent).toBe('Mochila Aurora Plus');
    expect(page.querySelector('[data-testid="producto-precio"]')?.textContent).toContain('229.50');
  });

  it('mantiene independientes los estados de tienda y producto', () => {
    const { fixture, app, page } = preparar();
    app.tiendaAbierta = false;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    expect(page.querySelector('[data-testid="tienda-estado"]')?.textContent).toContain('Tienda cerrada');
    expect(page.querySelector('[data-testid="producto-estado"]')?.textContent).toContain('Producto disponible');
  });
});
