import React, { useState } from 'react';

const boardLayout = [
  "Start", "1", "2", "Steamer Shortcut", "3", "4",
  "5", "Broiler Burn", "6", "7", "8", "Quiz",
  "9", "10", "Steamer Shortcut", "11", "12", "13",
  "14", "15", "Broiler Burn", "16", "17", "Quiz",
  "18", "19", "20", "21", "22", "Executive Chef"
];

const equipmentCards = [
  { question: "Uses fans to circulate steam for faster cooking.", answer: "Convection Steamer" },
  { question: "Rotates meat slowly for even roasting.", answer: "Rotisserie" },
  { question: "Overhead broiler for browning or finishing.", answer: "Salamander" }
];

const challengeCards = [
  {
    question: "Which equipment is best for melting cheese?",
    choices: ["Rotisserie", "Salamander", "Charbroiler"],
    answer: "Salamander"
  },
  {
    question: "Which uses pressure to steam food quickly?",
    choices: ["Steamer", "Convection Steamer", "Pressure Steamer"],
    answer: "Pressure Steamer"
  }
];

function App() {
  const [playerPos, setPlayerPos] = useState(0);
  const [message, setMessage] = useState("Roll to begin!");

  const rollDie = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    let newPos = playerPos + roll;
    if (newPos >= boardLayout.length) newPos = boardLayout.length - 1;
    const space = boardLayout[newPos];
    let msg = `Rolled a ${roll}. Landed on ${space}.`;

    if (space === "Steamer Shortcut") {
      newPos = Math.min(newPos + 2, boardLayout.length - 1);
      msg += " Shortcut! Move ahead 2.";
    } else if (space === "Broiler Burn") {
      msg += " Burned! Lose next turn.";
    } else if (space === "Quiz") {
      const card = challengeCards[Math.floor(Math.random() * challengeCards.length)];
      msg += `
Quiz: ${card.question}`;
    }

    setPlayerPos(newPos);
    setMessage(msg);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Kitchen Equipment Quest</h1>
      <button onClick={rollDie}>🎲 Roll Dice</button>
      <p>{message}</p>
      <div className="board">
        {boardLayout.map((space, idx) => (
          <div
            key={idx}
            className={`space ${
              space.includes("Shortcut") ? "shortcut" :
              space.includes("Burn") ? "burn" :
              space === "Quiz" ? "special" : ""
            }`}
          >
            {playerPos === idx ? "👨‍🍳" : ""}<br />{space}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;