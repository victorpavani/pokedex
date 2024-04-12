import React from 'react';
import PokemonList from './components/PokemonList';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

function App() {
  return (
    <div className="App">
      <div className="countdown-container">
      </div>
      <PokemonList />
    </div>
  );
}

export default App;

