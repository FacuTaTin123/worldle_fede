import { useLocation, Link } from "react-router-dom"

export default function Resultado() {
  const { state } = useLocation()
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {state?.won ? <h1>Ganaste!</h1> : <h1>Perdiste!</h1>}
      <p>La palabra era: {state?.word}</p>
      <Link to="/">
        <button>Volver al inicio</button>
      </Link>
    </div>
  )
}
