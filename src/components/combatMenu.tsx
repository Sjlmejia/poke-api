import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removePokemonFromCombat } from '../store/combatSlice';

export const CombatMenu = () => {
  const combatList = useSelector((state: RootState) => state.combat.combatList);
  const dispatch = useDispatch();

  const handleRemoveFromCombat = (name: string) => {
    dispatch(removePokemonFromCombat(name));
  };

  return (
    <div className="bg-gray-300 w-full md:w-1/4 p-4 flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">LISTOS PARA EL COMBATE</h2>
      {combatList.length === 0 ? (
        <div className="text-sm text-center">Lista vacía, no hay ningún Pokémon listo</div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {combatList.map((pokemon, index) => (
            <div key={index} className="relative bg-gray-400 w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center rounded">
              <div
                className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => handleRemoveFromCombat(pokemon.name)}
              >
                ✕
              </div>
              <div className="text-xs mt-2">{pokemon.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
