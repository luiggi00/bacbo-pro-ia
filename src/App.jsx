import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDiVH2QhyH8BIy99sJAb8FIZzc66pkJvlY",
  authDomain: "bacbo-pro-ia.firebaseapp.com",
  projectId: "bacbo-pro-ia",
  storageBucket: "bacbo-pro-ia.appspot.com",
  messagingSenderId: "79435953320",
  appId: "1:79435953320:web:ea1fc844ef73126be93e9d",
  measurementId: "G-3G6EZGTL9G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const getRandomPrediction = () => {
  const roll = Math.random() * 100;
  if (roll < 10) return { azul: 15, empate: 70, vermelho: 15 };
  if (roll < 55) return { azul: 65, empate: 10, vermelho: 25 };
  return { azul: 25, empate: 10, vermelho: 65 };
};

export default function BacBoApp() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [percentages, setPercentages] = useState(getRandomPrediction());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const loginWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Falha no login. Verifique seus dados.");
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError("Erro no login com Google.");
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updatePrediction = () => {
    setPercentages(getRandomPrediction());
  };

  const redirect = () => {
    window.location.href = "https://go.aff.lotogreen.com/oj1663mr";
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Entrar no Bac Bo Pro IA</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 rounded w-64 text-black"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 rounded w-64 text-black"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          onClick={loginWithEmail}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded mb-2"
        >
          Entrar
        </button>
        <button
          onClick={loginWithGoogle}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Entrar com Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
      <div className="flex justify-between w-full max-w-2xl items-center mb-4">
        <h1 className="text-2xl font-bold">Aplicativo do Luiggi | Bac Bo Pro IA</h1>
        <button onClick={logout} className="text-sm text-teal-400 underline">Sair</button>
      </div>

      <div className="mb-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Casino_Dice.png/600px-Casino_Dice.png"
          alt="Bac Bo logo"
          className="w-32 h-auto mx-auto"
        />
      </div>

      <h2 className="text-xl mb-4">Previsão da próxima cor:</h2>
      <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-md">
        <div className="bg-blue-600 rounded-2xl p-4 text-center shadow-xl">
          <p className="text-lg font-semibold">Azul</p>
          <p className="text-2xl font-bold">{percentages.azul}%</p>
        </div>
        <div className="bg-yellow-500 rounded-2xl p-4 text-center shadow-xl">
          <p className="text-lg font-semibold">Empate</p>
          <p className="text-2xl font-bold">{percentages.empate}%</p>
        </div>
        <div className="bg-red-600 rounded-2xl p-4 text-center shadow-xl">
          <p className="text-lg font-semibold">Vermelho</p>
          <p className="text-2xl font-bold">{percentages.vermelho}%</p>
        </div>
      </div>

      <button
        onClick={updatePrediction}
        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-xl mb-4"
      >
        Atualizar previsão
      </button>

      <div className="grid grid-cols-1 gap-3 w-full max-w-md">
        <button onClick={redirect} className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-xl">
          Ver as estratégias
        </button>
        <button onClick={redirect} className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-xl">
          Cobrir empate
        </button>
        <button onClick={redirect} className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-xl">
          Fazer 1 martingale
        </button>
      </div>
    </div>
  );
}
