import { Link } from "react-router-dom"

export default function Inicio() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>WORDLE</h1>
      <Link to="/juego">
        <button>Empezar</button>
      </Link>
    </div>
  )
}
