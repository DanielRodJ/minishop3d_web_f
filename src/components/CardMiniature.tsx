import type { Character } from '../types/ProductType';
import { ButtonCustom } from './ui/Buttons';

interface Props {
  item: Character;
}

export const CardMiniature = ({ item }: Props) => {
  return (
    <div className="border p-4 rounded-xl w-56 bg-zinc-900 text-white">
      <img src={item.imageUrl} alt={item.characterName} className="w-full rounded-md" />
      <div className="mt-4">
        <h3 className="font-bold">{item.characterName}</h3>
        <p className="text-sm text-zinc-300">Escala: {item.scale}</p>
        <p className="text-orange-200 font-bold">${item.price} MXN</p>
        {item.franchise && <p className="text-xs italic">De: {item.franchise}</p>}
        <div className="w-full bg-grey-200 bg-transparent border border-zinc-700 rounded-md mt-2 p-1 text-center">
          {item.disponibility ? (
            <p className="text-green-400 text-xs">Disponible</p>
          ) : (
            <p className="text-red-400 text-xs">No Disponible</p>
          )}
        </div>
      </div>
      <ButtonCustom preset="shoppingCart" className="mx-auto mt-4" onClick={() => alert(`Agregando al carrito: ${item.characterName}`)} disabled={!item.disponibility} />  
    </div>
  );
};

export default CardMiniature;