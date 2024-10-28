import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPokemonToCombat } from '../store/combatSlice';
import { useNavigate } from 'react-router-dom';
import { getPokemons } from '../services/getPokemos';

interface Pokemon {
  name: string;
  url: string;
}

export const ListPokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getPokemonsList();
  }, []);

  const getPokemonsList = async () => {
    const response = await getPokemons();
    setPokemons(response);
  };

  const handleAddToCombat = (pokemon: Pokemon) => {
    dispatch(addPokemonToCombat(pokemon));
  };

  const handleViewDetails = (name: string) => {
    navigate(`/pokemon/${name}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredPokemons = pokemons.filter((pokemon) => {
    const pokemonNumber = pokemon.url.split('/').slice(-2, -1)[0];
    return (
      pokemon.name.toLowerCase().includes(searchTerm) ||
      pokemonNumber.includes(searchTerm)
    );
  });

  return (
    <div className="flex flex-col items-center p-4 w-full md:w-3/4">
      <input
        type="text"
        placeholder="Que pokemon buscas..."
        className="mb-4 w-full md:w-1/2 p-2 border rounded bg-gray-200 text-center"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredPokemons.map((pokemon, index) => (
          <div
            key={index}
            className="relative bg-gray-300 w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center rounded cursor-pointer"
            onClick={() => handleViewDetails(pokemon.name)}
          >
            <div
              className="absolute top-2 right-2 bg-gray-600 text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCombat(pokemon);
              }}
            >
              +
            </div>
            <div className="text-xs mt-2">{pokemon.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
