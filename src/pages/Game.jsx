import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Board from '../components/Board.jsx';

function Game() {
  const [guesses, setGuesses] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [word, setWord] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= 5 && /^[A-Z]*$/.test(value)) {
      setCurrentInput(value);
    }
  };

  const handleSubmit = async () => {
    if (currentInput.length !== 5 || attempts >= 6) return;

    try {
      const res = await fetch('https://wordle-api.vercel.app/api/wordle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guess: currentInput.toLowerCase() }),
      });
      const data = await res.json();

      setGuesses([...guesses, { word: currentInput, info: data.character_info }]);
      setAttempts(attempts + 1);
      setCurrentInput('');

      if (data.was_correct) {
        setWin(true);
        setGameOver(true);
      } else if (attempts + 1 === 6) {
        setGameOver(true);
        const wordRes = await fetch('https://wordle-api.vercel.app/');
        const wordText = await wordRes.text();
        setWord(wordText.trim());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  useEffect(() => {
    if (gameOver) {
      const date = new Date().toISOString().split('T')[0];
      const history = JSON.parse(localStorage.getItem('wordleHistory')) || [];
      history.push({ date, win, guesses: guesses.length, word: word || 'desconocida' });
      localStorage.setItem('wordleHistory', JSON.stringify(history));

      navigate('/resultado', { state: { win, word: word || 'desconocida' } });
    }
  }, [gameOver, win, word, guesses, navigate]);

  return (
    <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl mb-4">Juego de Wordle</h2>
      <Board guesses={guesses} currentInput={currentInput} attempts={attempts} />
      <input 
        type="text"
        value={currentInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={5}
        className="border p-2 text-xl uppercase text-center mb-4 dark:bg-gray-700 dark:text-white"
        disabled={gameOver}
      />
      <button 
        onClick={handleSubmit} 
        className="bg-green-500 text-white px-4 py-2 rounded"
        disabled={currentInput.length !== 5 || gameOver}
      >
        Enviar
      </button>
      <p className="mt-2">Intentos: {attempts}/6</p>
    </div>
  );
}

export default Game;