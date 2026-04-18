import { CardMiniature } from "./CardMiniature";
import type { Character } from "../types/ProductType";

interface Props {
  products: Character[];
  title?: string;
}

export const ProductSection = ({ products, title = "Productos Destacados" }: Props) => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {/* Título de la sección */}
      <div className="flex items-center justify-between mb-10 border-l-4 border-orange-500 pl-4">
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">
          {title}
        </h2>
        <span className="text-zinc-500 text-sm font-medium">
          {products.length} productos encontrados
        </span>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {products.map((product) => (
          <CardMiniature key={product.id} item={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;