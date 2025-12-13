import { useState } from 'react'
import { clsx } from 'clsx'
import './App.css'
import languages from './languages.js'

function App() {
  // State values
  const [currentWord, setCurrentWord] = useState('harshil')
  const [guessedLetters, setGuessedLetters] = useState([])

  // Derived values
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = languages.length - wrongGuessCount <= 1
  const isGameOver = isGameWon || isGameLost

  // Static values
  const alphabets = "qwertyuiopasdfghjklzxcvbnm"

  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const spanStyles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    };

    const className = clsx({
      langTag: true,
      lost: isLanguageLost
    })

    return (
      <span key={lang.name} style={spanStyles} className={className}>{lang.name}</span>
    )
  })

  const letterElements = currentWord.split("").map((letter, index) => {
    return (
      <span key={index} className="letter">{guessedLetters.includes(letter) ? letter.toUpperCase() : ""}</span>
    )
  });

  const keyboardElements = alphabets.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)

    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
      keyboardButtons: true
    })

    return (
      <button key={letter} className={className} onClick={() => handleLetterClick(letter)}>{letter.toUpperCase()}</button>
    )
  })

  function handleLetterClick(letter) {
    setGuessedLetters(prevLetters => {
      return prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    })
  }

  return (
    <main>
      <header>
        <h1>Assembly Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section className="game-status">
        <h3>Game over!</h3>
        <p>You lose! Better start learning Assembly 😭</p>
      </section>

      <section className="languages-list">
        {languageElements}
      </section>

      <section className="word">
        {letterElements}
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>

      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  )
}

export default App
