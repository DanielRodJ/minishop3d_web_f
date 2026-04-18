import type { Character } from "../../types/ProductType";
import { Footer } from "../../components/shared/Footer";
import { Navbar } from "../../components/shared/Navbar";
import HeroCarousel from "../../components/shared/HeroCarousel";
import ProductSection from "../../components/ProductSection";
import miniatureSample from '../../assets/miniature_sample.webp';

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
      <Navbar />
      <main className="bg-zinc-950">
        <HeroCarousel />
        
        {/* Aquí maquetamos la sección completa pasando el objeto dentro de un array */}
        <ProductSection 
          products={[sampleCharacter, sampleCharacter2, sampleCharacter3]} 
          title="Novedades de la Semana" 
        />

      </main>
      <Footer />
    </>
  );
}

export default ShopPage;