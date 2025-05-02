import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const equipmentCards = [
  { name: "Steamer", description: "Uses pure steam to cook food gently without pressure." },
  { name: "Convection Steamer", description: "Uses fans to circulate steam for even, faster cooking." },
  { name: "Pressure Steamer", description: "Cooks food with steam under pressure for faster results." },
  { name: "Steam-Jacketed Kettle", description: "Large kettle with steam between layers for soups and sauces." },
  { name: "Tilting Fry Pan", description: "Versatile pan that can fry, braise, boil, and tilts to pour." },
  { name: "Charbroiler", description: "Grills food over open flame or heated elements; smoky flavor." },
  { name: "Hotel Broiler", description: "Large broiler for high-volume kitchens with adjustable heat." },
  { name: "Countertop Broiler", description: "Small, portable broiler ideal for quick tasks." },
  { name: "Rotisserie", description: "Rotates meat slowly near heat for juicy, even roasting." },
  { name: "Salamander", description: "Overhead broiler for browning, melting, and finishing dishes." },
];

const challengeCards = [
  {
    question: "Which piece of equipment uses pressure to steam food quickly?",
    options: ["Steamer", "Convection Steamer", "Pressure Steamer"],
    answer: "Pressure Steamer",
  },
  {
    question: "Which equipment is best for melting cheese on top of a dish?",
    options: ["Salamander", "Charbroiler", "Tilting Fry Pan"],
    answer: "Salamander",
  },
  {
    question: "Which machine rotates food to baste it naturally while cooking?",
    options: ["Rotisserie", "Hotel Broiler", "Pressure Steamer"],
    answer: "Rotisserie",
  },
  {
    question: "Which steamer uses fans to cook food more evenly?",
    options: ["Convection Steamer", "Pressure Steamer", "Steam-Jacketed Kettle"],
    answer: "Convection Steamer",
  },
  {
    question: "Which equipment is used to prepare large batches of soup?",
    options: ["Salamander", "Steam-Jacketed Kettle", "Rotisserie"],
    answer: "Steam-Jacketed Kettle",
  },
];

export default function KitchenGame() {
  const [showEquipment, setShowEquipment] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState(null);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState("");

  const getRandomEquipment = () => {
    const random = equipmentCards[Math.floor(Math.random() * equipmentCards.length)];
    setCurrentEquipment(random);
    setShowEquipment(true);
    setShowChallenge(false);
    setResult("");
  };

  const getRandomChallenge = () => {
    const random = challengeCards[Math.floor(Math.random() * challengeCards.length)];
    setCurrentChallenge(random);
    setShowChallenge(true);
    setShowEquipment(false);
    setSelectedOption(null);
    setResult("");
  };

  const checkAnswer = () => {
    if (selectedOption === currentChallenge.answer) {
      setResult("Correct!");
    } else {
      setResult(`Wrong! Correct answer: ${currentChallenge.answer}`);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Kitchen Equipment Quest</h1>
      <div className="space-x-4 mb-4">
        <button onClick={getRandomEquipment}>Draw Equipment Card</button>
        <button onClick={getRandomChallenge}>Draw Challenge Card</button>
      </div>

      {showEquipment && currentEquipment && (
        <div className="my-4 border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{currentEquipment.name}</h2>
          <p>{currentEquipment.description}</p>
        </div>
      )}

      {showChallenge && currentChallenge && (
        <div className="my-4 border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">{currentChallenge.question}</h2>
          <div className="space-y-2">
            {currentChallenge.options.map((option, index) => (
              <button
                key={index}
                className={selectedOption === option ? "bg-blue-500 text-white p-2" : "border p-2"}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button className="mt-4" onClick={checkAnswer} disabled={!selectedOption}>
            Submit Answer
          </button>
          {result && <p className="mt-2 font-bold">{result}</p>}
        </div>
      )}
    </div>
  );
}