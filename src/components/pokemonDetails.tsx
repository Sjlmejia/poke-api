import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPokemonToCombat } from '../store/combatSlice';
import { getPokemon } from '../services/getPokemon';

interface PokemonDetailsProps {
  name: string;
  id: number;
  height: number;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: { front_default: string };
}

export const PokemonDetails = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetailsProps | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPokemon = async () => {
      if (name) {
        const data = await getPokemon(name);
        setPokemon(data);
      }
    };
    fetchPokemon();
  }, [name]);

  const handleAddToCombat = () => {
    if (pokemon) {
      dispatch(addPokemonToCombat({ name: pokemon.name, url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/` }));
    }
  };

  if (!pokemon) return <div>Cargando...</div>;

  return (
    <div className="flex flex-col md:flex-row items-start p-8 w-full max-w-4xl mx-auto space-x-6 justify-center">
      <button onClick={() => navigate(-1)} className="self-start mb-4 text-blue-500">
        ← Volver
      </button>
      <div className="flex flex-col items-start space-y-4">
        <div className="flex items-start space-x-4">
          <div className="p-6 rounded-lg">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-48 h-48" />
          </div>
          <button
            onClick={handleAddToCombat}
            className="px-4 py-2 border rounded border-gray-500 text-gray-700 hover:bg-gray-100"
          >
            Agregar a la lista
          </button>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-md w-full">
          <h2 className="text-xl font-semibold capitalize mb-2">{pokemon.name}</h2>
          <p><strong>Número:</strong> {pokemon.id}</p>
          <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
          <p><strong>Tipo:</strong> {pokemon.types.map(type => type.type.name).join(', ')}</p>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-md w-full">
          <h3 className="text-lg font-semibold mb-4">Estadísticas base</h3>
          <ul className="space-y-1">
            {pokemon.stats.map((stat, index) => (
              <li key={index} className="capitalize">
                <strong>{stat.stat.name.replace('special-', 'Special ')}:</strong> {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
