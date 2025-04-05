import React from 'react';

function Card({ id, emoji, flipped, matched, onClick }) {
  const cardClassName = `card ${flipped ? 'flipped' : ''} ${matched ? 'matched' : ''}`;

  const handleClick = () => {
    if (!flipped && !matched) {
      onClick(id);
    }
  };

  return (
    <div className={cardClassName} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">{emoji}</div>
      </div>
    </div>
  );
}

export default Card; 