import React from 'react';

function HighScores({ scores }) {
  if (!scores || scores.length === 0) {
    return null;
  }

  return (
    <div className="high-scores">
      <h3>High Scores</h3>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Moves</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{score.name}</td>
              <td>{score.score}</td>
              <td>{score.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HighScores; 