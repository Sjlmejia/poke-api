import './App.css';
import { CombatMenu } from './components/combatMenu';
import { ListPokemons } from './components/listPokemons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonDetails } from './components/pokemonDetails';

function App() {
  return (
    <Router>
      <div className="flex flex-col md:flex-row h-screen">
        <Routes>
          <Route path="/" element={<ListPokemons />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
        <CombatMenu />
      </div>
    </Router>
  );
}

export default App;
