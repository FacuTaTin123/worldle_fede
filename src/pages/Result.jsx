import { useLocation, useNavigate } from 'react-router-dom';

function Result() {
  const { state } = useLocation();
  const { win, word } = state || {};
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
      <h2 className="text-4xl mb-4">
        {win ? '¡Ganaste!' : 'Perdiste'}
      </h2>
      {!win && <p className="text-xl">La palabra era: <strong>{word}</strong></p>}
      <button 
        onClick={() => navigate('/')} 
        className="bg-blue-500 text-white px-6 py-3 rounded text-xl mt-4"
      >
        Volver al Inicio
      </button>
    </div>
  );
}

export default Result;