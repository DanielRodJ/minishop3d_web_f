// src/types/models/ProductoModels

export interface BaseProduct {
  id: string;
  name: string;
  price: number;
  category: string; // picante, normal, personalizada
  tags: string[]; 
  includeShipping: boolean;
  imageUrl: string;
  disponibility: boolean;
}

export interface Miniature extends BaseProduct {
  autorSTL: string;
  scale: '28mm' | '32mm' | '54mm' | '75mm';
  includeBase: boolean;
}

export interface Scenography extends BaseProduct {
  dimensions: string; 
  pieces: number;
}

export interface Character extends Miniature {
  characterName: string;
  franchise?: string;
  description?: string;
  colors: string[];
}