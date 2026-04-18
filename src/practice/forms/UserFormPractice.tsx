type Product = {
  id: number;
  nombreProducto: string;
  precio?: number;
}

function TsPractice(productos: Product[]) : Product[] {
  return productos.filter(p => p.precio !== undefined);
}