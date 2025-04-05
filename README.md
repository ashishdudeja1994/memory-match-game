# Memory Match Game

A React-based memory card matching game where players flip cards to find matching pairs. Test your memory and try to complete the game in as few moves as possible!

## Live Demo

Play the game online: [Memory Match Game](https://whimsical-meerkat-eecc60.netlify.app)

## Features

- 4x4 grid of cards (8 pairs)
- Cards flip with smooth animations
- Matching logic to check if flipped cards match
- Score tracking to count the number of moves
- High score table with local storage persistence
- Reset functionality to start a new game

## Technologies Used

- React.js
- React Hooks (useState, useEffect)
- CSS for styling and animations
- Local Storage API for saving high scores

## Getting Started

These instructions will help you set up a copy of the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/ashishdudeja1994/memory-match-game.git
   ```

2. Navigate to the project directory
   ```
   cd memory-match-game
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Start the development server
   ```
   npm start
   ```

5. Open your browser and navigate to http://localhost:3000

## How to Play

1. Click on any card to flip it and reveal its symbol
2. Click on a second card to find a match
3. If the cards match, they stay flipped; if not, they flip back after a short delay
4. Continue until all cards are matched
5. Try to complete the game in as few moves as possible
6. Enter your name when prompted to save your score

## Deployment

The game is deployed on Netlify. Visit [https://whimsical-meerkat-eecc60.netlify.app](https://whimsical-meerkat-eecc60.netlify.app) to play!

## License

This project is open source and available under the MIT License.
