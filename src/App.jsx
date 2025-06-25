import React, { useState } from "react";
import "./index.css";

export default function BacBoApp() {
  const [result, setResult] = useState({
    azul: 35,
    empate: 15,
    vermelho: 50,
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
      <img src="/bacbo-logo.png" alt="Logo Bac Bo" className="w-32 mb-6" />

      <h1 className="text-xl font-bold mb-4">Bac Bo Pro IA</h1>

      <div className="flex gap-4 mb-6">
        <div className="bg-blue-600 w-24 h-24 rounded-full flex flex-col items-center justify-center">
          <span className="font-bold">AZUL</span>
          <span>{result.azul}%</span>
        </div>
        <div className="bg-yellow-300 text-black w-24 h-24 rounded-full flex flex-col items-center justify-center">
          <span className="font-bold">EMPATE</span>
          <span>{result.empate}%</span>
        </div>
        <div className="bg-red-600 w-24 h-24 rounded-full flex flex-col items-center justify-center">
          <span className="font-bold">VERMELHO</span>
          <span>{result.vermelho}%</span>
        </div>
      </div>

      <button
        className="bg-green-500 rounded-lg px-6 py-2"
        onClick={() =>
          setResult({
            azul: Math.floor(Math.random() * 40 + 20),
            empate: Math.floor(Math.random() * 20),
            vermelho: Math.floor(Math.random() * 40 + 20),
          })
        }
      >
        Atualizar Previsão
      </button>
    </div>
  );
}
