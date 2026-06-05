// src/pages/shop/ShopPage.tsx

// Assets.
import miniatureSample from "@/assets/miniature_sample.webp";

// Componentes.
import HeroCarousel from "@/components/shared/HeroCarousel";
import ProductSection from "@/components/ProductSection";

// Types.
import type { Character } from "@/types/models/ProductoModels";

function ShopPage() {

  const sampleCharacter: Character = {
    id: '1',
    name: 'Figura de Goku',
    price: 299.99,
    imageUrl: miniatureSample,
    autorSTL: 'Juan Pérez',
    scale: '32mm',
    includeBase: true,
    characterName: 'Goku',
    franchise: 'Dragon Ball',
    description: 'Figura detallada de Goku en su forma Super Saiyan.',
    category: 'normal',
    tags: ['anime', 'dbz'],
    includeShipping: false,
    colors: ['Gris'],
    disponibility: true,
  }

  const sampleCharacter2: Character = {
    id: '2',
    name: 'Figura de Goku',
    price: 299.99,
    imageUrl: miniatureSample,
    autorSTL: 'Juan Pérez',
    scale: '32mm',
    includeBase: true,
    characterName: 'Goku',
    franchise: 'Dragon Ball',
    description: 'Figura detallada de Goku en su forma Super Saiyan.',
    category: 'normal',
    tags: ['anime', 'dbz'],
    includeShipping: false,
    colors: ['Gris'],
    disponibility: true,
  }

  const sampleCharacter3: Character = {
    id: '3',
    name: 'Figura de Goku',
    price: 299.99,
    imageUrl: miniatureSample,
    autorSTL: 'Juan Pérez',
    scale: '32mm',
    includeBase: true,
    characterName: 'Goku',
    franchise: 'Dragon Ball',
    description: 'Figura detallada de Goku en su forma Super Saiyan.',
    category: 'normal',
    tags: ['anime', 'dbz'],
    includeShipping: false,
    colors: ['Gris'],
    disponibility: true,
  }

  return (
    <>
      <HeroCarousel />
      <ProductSection
        products={[sampleCharacter, sampleCharacter2, sampleCharacter3]}
        title="Novedades de la Semana"
      />
    </>
  );
}

export default ShopPage;