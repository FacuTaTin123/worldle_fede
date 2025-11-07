import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, createContext } from 'react';
import Home from './pages/Home.jsx';
import Game from './pages/Game.jsx';
import Result from './pages/Result.jsx';
import History from './pages/History.jsx';
import Header from './components/Header.jsx';

export const DarkModeContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={darkMode ? 'dark' : ''}>
        <Router>  {/* ← BrowserRouter DENTRO de App */}
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/juego" element={<Game />} />
            <Route path="/resultado" element={<Result />} />
            <Route path="/historial" element={<History />} />
          </Routes>
        </Router>
      </div>
    </DarkModeContext.Provider>
  );
}

export default App;