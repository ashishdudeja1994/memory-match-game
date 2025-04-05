import React from 'react';

function ScorePanel({ moves, resetGame }) {
  return (
    <div className="score-panel">
      <div className="moves">
        <span>Moves: {moves}</span>
      </div>
      <div className="reset">
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
}

export default ScorePanel; 