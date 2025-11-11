import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Juego() {
  const [word, setWord] = useState("")
  const [guess, setGuess] = useState("")
  const [tries, setTries] = useState([])
  const [message, setMessage] = useState("")
  const nav = useNavigate()

  useEffect(() => {
    async function getWord() {
      try {
        const res = await fetch("https://random-word-api.herokuapp.com/word?lang=es")
        const data = await res.json()
        if (data && data[0]) {
          setWord(data[0].toUpperCase())
        } 
      } catch {
        const arr = ["CASA", "PERRO", "NIÑO", "SUEÑO", "CIELO", "ARBOL"]
        setWord(arr[Math.floor(Math.random() * arr.length)])
      }
    }
    getWord()
  }, [])

  console.log(word);
  

  function handleChange(e) {
    setGuess(e.target.value.toUpperCase())
  }

  function handleEnter(e) {
    if (e.key === "Enter" && guess.length > 0) {
      setTries([...tries, guess])
      if (guess === word) {
        nav("/resultado", { state: { won: true, word } })
      } else if (tries.length >= 5) {
        nav("/resultado", { state: { won: false, word } })
      } else {
        setGuess("")
        setMessage("Volvé a intentarlo")
      }
    }
  }

  function getColor(l, i) {
    if (!word) return ""
    if (i < word.length && word[i] === l) return "green"
    if (word.includes(l)) return "orange"
    return "gray"
  }

  return (
    <div style={{ textAlign:"center", marginTop:40 }}>
      <h2>wordle</h2>
      <h3>la palabra tiene {word.length} letras</h3>
      <input value={guess} onChange={handleChange} onKeyDown={handleEnter} />
      <p>{message}</p>
      <div>
        {tries.map((t,i)=>(
          <div key={i}>
            {t.split("").map((l,j)=>(
              <span key={j} style={{ display:"inline-block", width:30, height:30, margin:3, background:getColor(l,j), color:"white", lineHeight:"30px" }}>
                {l}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
