import { Routes, Route, Link } from "react-router-dom"
import Inicio from "./pages/Inicio"
import Juego from "./pages/Juego"
import Resultado from "./pages/Resultado"

export default function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ margin: "10px" }}>Inicio</Link>
        <Link to="/juego" style={{ margin: "10px" }}>Jugar</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/juego" element={<Juego />} />
        <Route path="/resultado" element={<Resultado />} />
      </Routes>
    </div>
  )
}
