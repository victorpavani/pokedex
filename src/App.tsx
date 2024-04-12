import React from 'react';
import PokemonList from './components/PokemonList';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import MyFlipClock from './components/Clock/ClockDown';

function App() {
  return (
    <div className="App">
      <div className="countdown-container">
        {/* <p>Novos pokemons em:</p>
        <MyFlipClock /> */}
      </div>
      <PokemonList />
    </div>
  );
}

export default App;

