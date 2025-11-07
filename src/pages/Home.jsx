import { useNavigate } from 'react-router-dom';

// Home page with play button
function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
      <h2 className="text-4xl mb-4">Bienvenido a Wordle Clone</h2>
      <button 
        onClick={() => navigate('/juego')} 
        className="bg-blue-500 text-white px-6 py-3 rounded text-xl"
      >
        Jugar
      </button>
    </div>
  );
}

export default Home;