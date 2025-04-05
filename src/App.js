import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import ScorePanel from './components/ScorePanel';
import HighScores from './components/HighScores';

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [highScores, setHighScores] = useState([]);

  // Array of emojis to use as card content
  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🦁', '🐮', '🐸', '🐵'];

  // Initialize the game and load high scores
  useEffect(() => {
    initializeCards();
    loadHighScores();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load high scores from localStorage
  const loadHighScores = () => {
    const savedScores = localStorage.getItem('memoryGameHighScores');
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
  };

  // Save high scores to localStorage
  const saveHighScore = (name, score) => {
    const formatDateTime = (date) => {
      const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      };
      return date.toLocaleDateString('en-US', options);
    };

    const newScore = { 
      name, 
      score, 
      date: formatDateTime(new Date()) 
    };
    const updatedScores = [...highScores, newScore].sort((a, b) => a.score - b.score).slice(0, 10);
    setHighScores(updatedScores);
    localStorage.setItem('memoryGameHighScores', JSON.stringify(updatedScores));
  };

  // Initialize the cards array with shuffled pairs of emojis
  const initializeCards = () => {
    // Take only 8 emojis for 16 cards (8 pairs)
    const selectedEmojis = emojis.slice(0, 8);
    
    // Double the emojis to create pairs
    let newCards = [...selectedEmojis, ...selectedEmojis]
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false
      }));
    
    // Shuffle the cards
    newCards.sort(() => Math.random() - 0.5);
    
    setCards(newCards);
    setFlippedCount(0);
    setFlippedIndexes([]);
    setMoves(0);
    setGameOver(false);
    setShowNameInput(false);
  };

  // Handle card click
  const handleCardClick = (id) => {
    // Prevent clicking if game is over or more than 2 cards are flipped
    if (gameOver || flippedCount >= 2) return;

    // Find the card that was clicked
    const newCards = [...cards];
    const cardIndex = newCards.findIndex(card => card.id === id);

    // Prevent clicking on already flipped or matched cards
    if (newCards[cardIndex].flipped || newCards[cardIndex].matched) return;

    // Flip the card
    newCards[cardIndex].flipped = true;
    setCards(newCards);

    // Add to flipped cards
    const newFlippedIndexes = [...flippedIndexes, cardIndex];
    setFlippedIndexes(newFlippedIndexes);
    setFlippedCount(newFlippedIndexes.length);

    // If two cards are flipped, check for a match
    if (newFlippedIndexes.length === 2) {
      setMoves(moves + 1);
      
      const [firstIndex, secondIndex] = newFlippedIndexes;
      
      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        // Cards match
        newCards[firstIndex].matched = true;
        newCards[secondIndex].matched = true;
        setCards(newCards);
        
        // Reset flipped cards
        setFlippedCount(0);
        setFlippedIndexes([]);
        
        // Check if game is over (all cards matched)
        if (newCards.every(card => card.matched)) {
          setGameOver(true);
          setShowNameInput(true);
        }
      } else {
        // Cards don't match, flip them back after a delay
        setTimeout(() => {
          newCards[firstIndex].flipped = false;
          newCards[secondIndex].flipped = false;
          setCards(newCards);
          setFlippedCount(0);
          setFlippedIndexes([]);
        }, 1000);
      }
    }
  };

  // Handle name input submission
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      saveHighScore(playerName, moves);
      setShowNameInput(false);
    }
  };

  // Reset the game
  const resetGame = () => {
    initializeCards();
  };

  return (
    <div className="App">
      <h1>Memory Match Game</h1>
      <ScorePanel moves={moves} resetGame={resetGame} />
      <GameBoard cards={cards} handleCardClick={handleCardClick} />
      
      {gameOver && (
        <div className="game-over">
          <h2>Congratulations! You Won!</h2>
          <p>You completed the game in {moves} moves.</p>
          
          {showNameInput ? (
            <form onSubmit={handleNameSubmit} className="name-form">
              <h3>Enter your name for the high score table:</h3>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Your name"
                maxLength={20}
                required
              />
              <button type="submit">Save Score</button>
            </form>
          ) : (
            <>
              <button onClick={resetGame}>Play Again</button>
              <HighScores scores={highScores} />
            </>
          )}
        </div>
      )}
      
      {!gameOver && highScores.length > 0 && (
        <div className="high-scores-container">
          <HighScores scores={highScores} />
        </div>
      )}
    </div>
  );
}

export default App;
