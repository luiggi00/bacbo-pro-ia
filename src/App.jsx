import { useState } from "react";
import "./index.css";

function BacBoApp() {
  const [result, setResult] = useState({
    azul: 25,
    empate: 10,
    vermelho: 65,
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
      <img src="/bacbo-logo.png" alt="Bac Bo logo" className="w-48 mb-4" />
      <h1 className="text-2xl font-bold text-center mb-2">Aplicativo do Luiggi</h1>
      <h2 className="text-xl font-semibold text-center mb-6">Bac Bo Pro IA</h2>

      <div className="flex gap-4 mb-6">
        <div className="bg-blue-600 w-24 h-24 rounded-full flex flex-col items-center justify-center">
          <span className="text-lg font-bold">Azul</span>
          <span className="text-xl">{result.azul}%</span>
        </div>
        <div className="bg-yellow-400 text-black w-24 h-24 rounded-full flex flex-col items-center justify-center">
          <span className="text-lg font-bold">Empate</span>
          <span className="text-xl">{result.empate}%</span>
        </div>
        <div className="bg-red-600 w-24 h-24 rounded-full flex flex-col items-center justify-center">
          <span className="text-lg font-bold">Vermelho</span>
          <span className="text-xl">{result.vermelho}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 w-full max-w-xs">
        <button className="bg-green-600 rounded-xl py-2">Atualizar previsão</button>
        <button className="bg-blue-500 rounded-xl py-2">Ver as estratégias</button>
        <button className="bg-yellow-400 text-black rounded-xl py-2">Cobrir empate</button>
        <button className="bg-red-500 rounded-xl py-2">Fazer 1 martingale</button>
      </div>
    </div>
  );
}

export default BacBoApp;
