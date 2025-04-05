import React from 'react';
import Card from './Card';

function GameBoard({ cards, handleCardClick }) {
  return (
    <div className="game-board">
      {cards.map(card => (
        <Card
          key={card.id}
          id={card.id}
          emoji={card.emoji}
          flipped={card.flipped}
          matched={card.matched}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
}

export default GameBoard; 