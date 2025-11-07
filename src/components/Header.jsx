// src/components/Header.jsx
import { useContext } from 'react';
import { DarkModeContext } from '../App.jsx'; // ← ¡AHORA SÍ EXISTE!
import { Link } from 'react-router-dom';

function Header() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <header className="bg-blue-600 dark:bg-blue-900 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Wordle Clone</h1>
      <nav className="flex items-center gap-4">
        <Link to="/" className="hover:underline">Inicio</Link>
        <Link to="/historial" className="hover:underline">Historial</Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded text-sm"
        >
          {darkMode ? 'Claro' : 'Oscuro'}
        </button>
      </nav>
    </header>
  );
}

export default Header;