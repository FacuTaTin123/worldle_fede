import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Juego() {
  const [palabra, setPalabra] = useState("")
  const [intento, setIntento] = useState("")
  const [intentos, setIntentos] = useState([])
  const nav = useNavigate()

  useEffect(() => {
    //el juega es para que sepa si el jugador sigue vivo o perdio
    let juega = true
    let contador = 0 //cuenta cuantos intentos de fetch se hicieron, pq la api por ahi falla

    async function pedirPalabra() {
      while (juega) {
        contador++

        try {
         
          const timestamp = Date.now() + Math.random() // evita caché
          const controller = new AbortController() // para abortar fetch si demora
          const timeoutId = setTimeout(() => controller.abort(), 8000) // timeout de 8s

          const res = await fetch(
            `https://random-words-api.vercel.app/word/spanish?t=${timestamp}`,
            { signal: controller.signal }
          )

          clearTimeout(timeoutId)

          if (!res.ok) throw new Error(`HTTP ${res.status}`)

          const data = await res.json() // la api devuelve un array con 1 objeto

          if (data && Array.isArray(data) && data.length > 0) {
            const palabraApi = data[0].word

            if (palabraApi && palabraApi.length > 0) {
              // limpio acentos para no ser tan especifico
              let palabrita = palabraApi
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toUpperCase()

              console.log(palabrita)

              if (juega) {
                setPalabra(palabrita)
              }

              return
            }
          }
        } catch (err) {
          console.warn(`error en el intento ${contador}`)
          if (juega) {
          }
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
      }
    }

    pedirPalabra()

    return () => {
      juega = false
    }
  }, [])

  function handleChange(e) {
    setIntento(e.target.value.toUpperCase())
  }

  function handleEnter(e) {
    if (e.key === "Enter" && intento.length > 0) {
      setIntentos([...intentos, intento])
      if (intento === palabra) {
        nav("/resultado", { state: { won: true, word: palabra } })
      } else if (intentos.length >= 5) {
        nav("/resultado", { state: { won: false, word: palabra } })
      } else {
        setIntento("")
      }
    }
  }

  //para los colores
  function color(l, i) {
    if (!palabra) return ""
    if (i < palabra.length && palabra[i] === l) return "green"
    if (palabra.includes(l)) return "orange"
    return "gray"
  }

  function reiniciar() {
    // intente llevar todo a cero pero no funciono asi que hice esto
    window.location.reload()
  }

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>wordle</h2>
      <h3>la palabra tiene {palabra.length} letras</h3>

      <input value={intento} onChange={handleChange} onKeyDown={handleEnter} />

      <div>
        {intentos.map((t, i) => (
          <div key={i}>
            {t.split("").map((l, j) => (
              <span
                key={j}
                style={{
                  display: "inline-block",
                  width: 30,
                  height: 30,
                  margin: 3,
                  background: color(l, j),
                  color: "white",
                  lineHeight: "30px"
                }}
              >
                {l}
              </span>
            ))}
          </div>
        ))}
      </div>

      <button
        style={{
          marginTop: 20,
          padding: "10px 20px",
          background: "black",
          color: "white",
          borderRadius: 6,
          border: "none",
          cursor: "pointer"
        }}
        onClick={reiniciar}
      >
        Reiniciar
      </button>
      <h3>llevas haciendo {intentos.length} intentos</h3>
    </div>
  )
}
