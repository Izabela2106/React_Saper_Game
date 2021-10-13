import React from 'react';
import GameField from './components/GameField';
import { useGlobalContext } from './context';

function App() {
  const { height, width, cellSize } = useGlobalContext();
  return <GameField width={width} height={height} cellSize={cellSize} />;
}

export default App;
