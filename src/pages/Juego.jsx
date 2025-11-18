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
          //con estos me vi obligado a usar ia para evitar los errores de la api
          const timestamp = Date.now() + Math.random() // evita caché
          const controller = new AbortController() // para abortar fetch si demora
          const timeoutId = setTimeout(() => controller.abort(), 8000) // timeout de 8s

          const res = await fetch( //el awiat espera a que la api funcione, sino no tira la palabra, serian promesas
            `https://random-words-api.kushcreates.com/api?lang=es&number=10&length=5&t=${timestamp}`,
            { signal: controller.signal } // conecta el abort a la request
          )

          clearTimeout(timeoutId)

          if (!res.ok) throw new Error(`HTTP ${res.status}`) //tira error si la respuesta no es valida

          const data = await res.json() //espera a que el json se convierta en un objeto

          if (data && Array.isArray(data) && data.length > 0) {
            const candidatas = data.filter(item => 
              item.word && item.word.length === 5
            )
            //filtra para que las palabras sean de 5 letras
            
            if (candidatas.length > 0) {
              const indiceRandom = Math.floor(Math.random() * candidatas.length) //elige una palabra random
              const palabrita = candidatas[indiceRandom].word.toUpperCase() //hace que la palabra este en mayusculas
              console.log(palabrita)
              if (juega) {
                setPalabra(palabrita)
              }
              return
            } 
          } 
        } catch (err) {
          console.warn(`error en el intento ${contador}`) 
          //aprendi que el console.warn muestra las cosas de otro color, y lo uso para el error
          if (juega) {
          }
          await new Promise(resolve => setTimeout(resolve, 2000)) //espera 2 segundos antes de volver a intentar
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
      setIntentos([...intentos, intento]) //toma el intento del input cuando se presiona enter
      if (intento === palabra) {
        nav("/resultado", { state: { won: true, word: palabra } }) 
      } else if (intentos.length >= 10) {
        nav("/resultado", { state: { won: false, word: palabra } })
      } else {
        setIntento("")
      }
      //aprendi a manejar state en rutas, y lo use por si ganas o perdes
    }
  }

  function color(l, i) {
    if (!palabra) return ""
    if (i < palabra.length && palabra[i] === l) return "green"
    if (palabra.includes(l)) return "orange"
    return "gray"
    //aca lo busque en una ia para pintar las letras si es que son correctas
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
    </div>
  )
}