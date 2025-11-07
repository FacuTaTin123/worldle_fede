import { useEffect, useState } from 'react';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wordleHistory')) || [];
    setHistory(stored);
  }, []);

  return (
    <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl mb-4">Historial de Partidas</h2>
      {history.length === 0 ? (
        <p>No hay partidas guardadas.</p>
      ) : (
        <ul className="w-full max-w-md space-y-2">
          {history.map((game, i) => (
            <li key={i} className="border p-3 rounded bg-gray-50 dark:bg-gray-800">
              <p><strong>Fecha:</strong> {game.date}</p>
              <p><strong>Resultado:</strong> {game.win ? 'Ganó' : 'Perdió'}</p>
              <p><strong>Intentos:</strong> {game.guesses}</p>
              <p><strong>Palabra:</strong> {game.word}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;